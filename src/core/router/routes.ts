import { Application } from 'express';
import { RouterModuleFactory } from './router-map';
import { HttpVerbMap, FeatureModuleRouterInfo } from './base-router-module';
import  { AuthService } from '../../modules/auth/auth-service'

export class RouterModule {

    private routerFactory: RouterModuleFactory;
    private express: Application;
    private auth: AuthService;

    constructor(app: Application){
        this.express = app;
        this.routerFactory = new RouterModuleFactory();
        this.auth = new AuthService();
    }

    public exposeRoutes(authenticate?: Function): void {
        console.log('RouterModule exposeRoutes - PASSEI AQUI 1');
        const registeredModules = this.routerFactory.getRegisteredModules();
        if(registeredModules && Array.isArray(registeredModules)){
            registeredModules
                .forEach(this.extractRouterInfoFromModule.bind(this, authenticate))
        }
    }

    private extractRouterInfoFromModule(authenticate: Function, routerFeatModule: HttpVerbMap){
        if (routerFeatModule) {
            const registeredVerbs = Object.keys(routerFeatModule);
            registeredVerbs
                .forEach(this.extractInfoByVerb.bind(this, authenticate, routerFeatModule))
        }
    }

    private extractInfoByVerb(
        authenticate: Function, 
        routerFeatModule: HttpVerbMap, 
        registeredVerb: string) {
            routerFeatModule[registeredVerb]
                .forEach(this.mountRoutes.bind(this, authenticate, registeredVerb));
        }
    private mountRoutes(
        authenticate: Function,
        registeredVerb: string,
        routerInfo: FeatureModuleRouterInfo
    ) {
        if (routerInfo) {
            const { isProtected, callback, endpoint } = routerInfo;
            console.log(isProtected, callback, endpoint, registeredVerb);
            if (isProtected) {
                // this.express.route(endpoint)[registeredVerb](callback);
                this.express.route(endpoint).all(this.auth.config().authenticate())[registeredVerb](callback);
            } else {
                this.express.route(endpoint)[registeredVerb](callback);
            }
        }
    }
}