import { Request, Response } from 'express';
import { BaseRouterModule, ModuleEndpointMap } from '../../core/router/base-router-module';
import UserService from '../user/user.service';
import { IUser } from './user.model';
import ResponseHandlers from '../../core/handlers/response-handlers';


export class UserRouterModule  extends BaseRouterModule {
    private email: string;

    constructor(){
        super('user');
    }

    protected MODULES_ENDPOINT_MAP: ModuleEndpointMap = { 
        [this.moduleName]: {
            get: [
                {
                    endpoint: `${ this.context }/${ this.version }/${ this.moduleName }/all`,
                    callback: this.index,
                    isProtected: true
                },
                {
                    endpoint: `${ this.context }/${ this.version }/${ this.moduleName }/:id`,
                    callback: this.findOne,
                    isProtected: true
                }
            ],
            post: [
                {
                    endpoint: `${ this.context }/${ this.version }/${ this.moduleName }/create`,
                    callback: this.create,
                    isProtected: false
                },
                {
                    endpoint: `${ this.context }/${ this.version }/${ this.moduleName }/createadmin`,
                    callback: this.createadmin,
                    isProtected: false
                }
            ],
            put: [
                {
                    endpoint: `${ this.context }/${ this.version }/${ this.moduleName }/:id/update`,
                    callback: this.update,
                    isProtected: true
                }
            ],
            delete: [
                {
                    endpoint: `${ this.context }/${ this.version }/${ this.moduleName }/:id/destroy`,
                    callback: this.destroy,
                    isProtected: true
                }
            ]
            
        }
    };

    async index(req: Request, res: Response){
        
        try {
            const user: Array<IUser> = await UserService.getAll(); 
            return ResponseHandlers.onSuccess(res, user);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar todos os usuários', error);
        }
    }

    async findOne(req: Request, res: Response){
        try {
            const userId = parseInt(req.params.id);
            const user: IUser = await UserService.getById(userId);
            return ResponseHandlers.onSuccess(res, user);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar o usuário', error);
        }
    }

    async create(req: Request, res: Response){
        try {
            const user: IUser = await UserService.create(req.body);
            return ResponseHandlers.onSuccess(res, user);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao incluir usuário', error);
        }
    }

    async createadmin(req: Request, res: Response){
        try {
            const user: IUser = await UserService.create(req.body);
            return ResponseHandlers.onSuccess(res, user);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao incluir usuário', error);
        }
    }

    async update(req: Request, res: Response){
        try {
            const userId = parseInt(req.params.id);
            const props = req.body;
            const user: IUser = await UserService.update(userId, props);
            return ResponseHandlers.onSuccess(res, user);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao atualizar usuário', error);
        }
    }

    async destroy(req: Request, res: Response){
        try {
            const userId = parseInt(req.params.id);
            const user: IUser = await UserService.delete(userId); 
            return ResponseHandlers.onSuccess(res, user);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao excluir o usuário', error);
        }
    }

}
