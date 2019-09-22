import { Request, Response } from 'express';
import { BaseRouterModule, ModuleEndpointMap } from '../../core/router/base-router-module';
import ProfissaoService from './profissao.service';
import { IProfissao } from './profissao.model';
import ResponseHandlers from '../../core/handlers/response-handlers';


export class ProfissaoRouterModule  extends BaseRouterModule {

    constructor(){
        super('profissao');
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
            const profissao: Array<IProfissao> = await ProfissaoService.getAll(); 
            return ResponseHandlers.onSuccess(res, profissao);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar todas as profissoes', error);
        }
    }

    async findOne(req: Request, res: Response){
        try {
            const profissaoId = parseInt(req.params.id);
            const profissao: IProfissao = await ProfissaoService.getById(profissaoId);
            return ResponseHandlers.onSuccess(res, profissao);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar a profissao', error);
        }
    }

    async create(req: Request, res: Response){
        try {
            console.log(req.body);
            const profissao: IProfissao = await ProfissaoService.create(req.body);
            return ResponseHandlers.onSuccess(res, profissao);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao incluir profissao', error);
        }
    }

    async update(req: Request, res: Response){
        try {
            const profissaoId = parseInt(req.params.id);
            const props = req.body;
            const profissao: IProfissao = await ProfissaoService.update(profissaoId, props);
            return ResponseHandlers.onSuccess(res, profissao);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao atualizar a profissao', error);
        }
    }

    async destroy(req: Request, res: Response){
        try {
            const profissaoId = parseInt(req.params.id);
            const profissao: IProfissao = await ProfissaoService.delete(profissaoId); 
            return ResponseHandlers.onSuccess(res, profissao);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao excluir a profissao', error);
        }
    }

}
