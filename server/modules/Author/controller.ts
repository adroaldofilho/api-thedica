import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
import Author from './service';
import Handlers from '../../api/responses/handlers';
import * as _ from 'lodash';
class AuthorController {
    
    constructor(){
    }

    getAll(req: Request, res: Response){
        Author
            .getAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os autores'));
    }

    createAuthor(req: Request, res: Response){
        Author
            .create(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao incluir autor'));
    }

    getById(req: Request, res: Response){
        const authorId = parseInt(req.params.id);
        Author
            .getById(authorId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Autor não encontrado'));
    }

    updateAuthor(req: Request, res: Response){
        const authorId = parseInt(req.params.id);
        const props = req.body;
        Author
        .update(authorId, props)
        .then(_.partial(Handlers.onSuccess, res))
        .catch(_.partial(Handlers.onError, res, 'Erro ao atualizar o autor'));
    }
    deleteAuthor(req: Request, res: Response){
        const autorId = parseInt(req.params.id);
        Author
            .delete(autorId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao excluir o autor'));
    }
}

export default new AuthorController();