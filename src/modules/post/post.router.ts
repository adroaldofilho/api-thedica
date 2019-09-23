import { Request, Response } from 'express';
import { BaseRouterModule, ModuleEndpointMap } from '../../core/router/base-router-module';
import PostService from './post.service';
import AuthorService from '../author/author.service';
import { IPost } from './post.model';
import ResponseHandlers from '../../core/handlers/response-handlers';
import { IAuthor } from '../author/author.model';
import { json } from 'body-parser';


export class PostRouterModule  extends BaseRouterModule {

    constructor(){
        super('post');
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
            const post: Array<IPost> = await PostService.getAll(); 
            return ResponseHandlers.onSuccess(res, post);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar todos as publicações', error);
        }
    }

    async findOne(req: Request, res: Response){
        try {
            const postId = parseInt(req.params.id);
            const post: IPost = await PostService.getById(postId);
            return ResponseHandlers.onSuccess(res, post);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar a publicação', error);
        }
    }

    async create(req: Request, res: Response){
        try {
            if (req.body.hasOwnProperty('name')){
                const name: string = req.body.name;
                let authorPost = {};
                authorPost['name'] = name;
                const author: IAuthor = await AuthorService.create(req.body);
                req.body.authorId = author.id;
            }
            const post: IPost = await PostService.create(req.body);
            
            return ResponseHandlers.onSuccess(res, post);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao incluir a publicação', error);
        }
    }

    // createAuthor(name: string): number{
    //     try {
    //         var reqAuthor = {};
    //         reqAuthor['name'] = name;
    //         console.log(reqAuthor);
    //         const author: IAuthor = AuthorService.create(reqAuthor);
    //         console.log(author);
    //         return author.id;
    //     } catch (error) {
    //         return error;
    //     }
    // }

    async update(req: Request, res: Response){
        try {
            const postId = parseInt(req.params.id);
            const props = req.body;
            const post: IPost = await PostService.update(postId, props);
            return ResponseHandlers.onSuccess(res, post);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao atualizar a publicação', error);
        }
    }

    async destroy(req: Request, res: Response){
        try {
            const postId = parseInt(req.params.id);
            const post: IPost = await PostService.delete(postId); 
            return ResponseHandlers.onSuccess(res, post);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao excluir a publicação', error);
        }
    }

}
