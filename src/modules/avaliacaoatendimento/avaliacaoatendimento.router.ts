import { Request, Response } from 'express';
import { BaseRouterModule, ModuleEndpointMap } from '../../core/router/base-router-module';
import AvaliacaoAtendimentoService from './avaliacaoatendimento.service';
import { IAvaliacaoAtendimento } from './avaliacaoatendimento.model';
import ResponseHandlers from '../../core/handlers/response-handlers';


export class AvaliacaoAtendimentoRouterModule  extends BaseRouterModule {

    constructor(){
        super('avaliacaoatendimento');
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
            const avaliacaoAtendimento: Array<IAvaliacaoAtendimento> = await AvaliacaoAtendimentoService.getAll(); 
            return ResponseHandlers.onSuccess(res, avaliacaoAtendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar todas as avaliações de atendimento', error);
        }
    }

    async findOne(req: Request, res: Response){
        try {
            const avaliacaoAtendimentoId = parseInt(req.params.id);
            const avaliacaoAtendimento: IAvaliacaoAtendimento = await AvaliacaoAtendimentoService.getById(avaliacaoAtendimentoId);
            return ResponseHandlers.onSuccess(res, avaliacaoAtendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar a avaliação de atendimento', error);
        }
    }

    async create(req: Request, res: Response){
        try {
            console.log(req.body);
            const avaliacaoAtendimento: IAvaliacaoAtendimento = await AvaliacaoAtendimentoService.create(req.body);
            return ResponseHandlers.onSuccess(res, avaliacaoAtendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao incluir a avaliação de atendimento', error);
        }
    }

    async update(req: Request, res: Response){
        try {
            const avaliacaoAtendimentoId = parseInt(req.params.id);
            const props = req.body;
            const avaliacaoAtendimento: IAvaliacaoAtendimento = await AvaliacaoAtendimentoService.update(avaliacaoAtendimentoId, props);
            return ResponseHandlers.onSuccess(res, avaliacaoAtendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao atualizar a avaliação de atendimento', error);
        }
    }

    async destroy(req: Request, res: Response){
        try {
            const avaliacaoAtendimentoId = parseInt(req.params.id);
            const avaliacaoAtendimento: IAvaliacaoAtendimento = await AvaliacaoAtendimentoService.delete(avaliacaoAtendimentoId); 
            return ResponseHandlers.onSuccess(res, avaliacaoAtendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao excluir a avaliação de atendimento', error);
        }
    }

}
