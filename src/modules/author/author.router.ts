import { Request, Response } from 'express';
import { BaseRouterModule, ModuleEndpointMap } from '../../core/router/base-router-module';
import AuthorService from './author.service';
import { IAuthor } from './author.model';
import ResponseHandlers from '../../core/handlers/response-handlers';


export class AuthorRouterModule  extends BaseRouterModule {

    constructor(){
        super('author');
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
                    isProtected: true
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
            const author: Array<IAuthor> = await AuthorService.getAll(); 
            return ResponseHandlers.onSuccess(res, author);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar todos os autores', error);
        }
    }

    async findOne(req: Request, res: Response){
        try {
            const authorId = parseInt(req.params.id);
            const author: IAuthor = await AuthorService.getById(authorId);
            return ResponseHandlers.onSuccess(res, author);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar o autor', error);
        }
    }

    async create(req: Request, res: Response){
        try {
            const author: IAuthor = await AuthorService.create(req.body);
            return ResponseHandlers.onSuccess(res, author);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao incluir autor', error);
        }
    }

    async update(req: Request, res: Response){
        try {
            const authorId = parseInt(req.params.id);
            const props = req.body;
            const author: IAuthor = await AuthorService.update(authorId, props);
            return ResponseHandlers.onSuccess(res, author);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao atualizar autor', error);
        }
    }

    async destroy(req: Request, res: Response){
        try {
            const authorId = parseInt(req.params.id);
            const author: IAuthor = await AuthorService.delete(authorId); 
            return ResponseHandlers.onSuccess(res, author);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao excluir o autor', error);
        }
    }

}
