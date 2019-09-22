import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
import Post from './service';
import Handlers from '../../api/responses/handlers';
import * as _ from 'lodash';
class PostController {
    
    constructor(){
    }

    getAll(req: Request, res: Response){
        Post
            .getAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os posts'));
    }

    createPost(req: Request, res: Response){
        Post
            .create(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao incluir post'));
    }

    getById(req: Request, res: Response){
        const postId = parseInt(req.params.id);
        Post
            .getById(postId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Post não encontrado'));
    }

    updatePost(req: Request, res: Response){
        const postId = parseInt(req.params.id);
        const props = req.body;
        Post
        .update(postId, props)
        .then(_.partial(Handlers.onSuccess, res))
        .catch(_.partial(Handlers.onError, res, 'Erro ao atualizar o post'));
    }
    deletePost(req: Request, res: Response){
        const postId = parseInt(req.params.id);
        Post
            .delete(postId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao excluir o post'));
    }
}

export default new PostController();