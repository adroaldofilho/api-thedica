"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_map_1 = require("./router-map");
var auth_service_1 = require("../../modules/auth/auth-service");
var RouterModule = /** @class */ (function () {
    function RouterModule(app) {
        this.express = app;
        this.routerFactory = new router_map_1.RouterModuleFactory();
        this.auth = new auth_service_1.AuthService();
    }
    RouterModule.prototype.exposeRoutes = function (authenticate) {
        console.log('RouterModule exposeRoutes - PASSEI AQUI 1');
        var registeredModules = this.routerFactory.getRegisteredModules();
        if (registeredModules && Array.isArray(registeredModules)) {
            registeredModules
                .forEach(this.extractRouterInfoFromModule.bind(this, authenticate));
        }
    };
    RouterModule.prototype.extractRouterInfoFromModule = function (authenticate, routerFeatModule) {
        if (routerFeatModule) {
            var registeredVerbs = Object.keys(routerFeatModule);
            registeredVerbs
                .forEach(this.extractInfoByVerb.bind(this, authenticate, routerFeatModule));
        }
    };
    RouterModule.prototype.extractInfoByVerb = function (authenticate, routerFeatModule, registeredVerb) {
        routerFeatModule[registeredVerb]
            .forEach(this.mountRoutes.bind(this, authenticate, registeredVerb));
    };
    RouterModule.prototype.mountRoutes = function (authenticate, registeredVerb, routerInfo) {
        if (routerInfo) {
            var isProtected = routerInfo.isProtected, callback = routerInfo.callback, endpoint = routerInfo.endpoint;
            console.log(isProtected, callback, endpoint, registeredVerb);
            if (isProtected) {
                this.express.route(endpoint).all(this.auth.config().authenticate())[registeredVerb](callback);
            }
            else {
                this.express.route(endpoint)[registeredVerb](callback);
            }
        }
    };
    return RouterModule;
}());
exports.RouterModule = RouterModule;
