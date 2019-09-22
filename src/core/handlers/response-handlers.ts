import * as HTTPStatus from 'http-status';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt';
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
const { secret } = require('../../config/env');

class ResponseHandlers{
    authFail(req: Request, res: Response){
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    authSuccess(res: Response, password: string, user: any){
        
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            const payload = { id: user.id };
            res.json({
                token: jwt.encode(payload, secret)
            });
        } else {
            res.sendStatus(HTTPStatus.UNAUTHORIZED);
        }
    }

    onError (res: Response, message: string, err: any){
        console.log(err);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
    }

    onSuccess (res: Response, data: any){
        res.status(HTTPStatus.OK).json({payload: data});
    }

    errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction){
            res.status(500).json({
            errorCode: 'ERR-001',
            message: 'Erro interno do servidor'
        });
    }

    dbErrorHandler (res: Response, err: any){
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            code: 'ERRO-001',
            message: 'Erro ao criar usuário'
        });
    }
}

export default new ResponseHandlers();