import { Request, Response } from 'express';
import { BaseRouterModule, ModuleEndpointMap } from '../../core/router/base-router-module';
import StatusAtendimentoService from './statusatendimento.service';
import { IStatusAtendimento } from './statusatendimento.model';
import ResponseHandlers from '../../core/handlers/response-handlers';


export class StatusAtendimentoRouterModule  extends BaseRouterModule {

    constructor(){
        super('statusatendimento');
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
            const statusAtendimento: Array<IStatusAtendimento> = await StatusAtendimentoService.getAll(); 
            return ResponseHandlers.onSuccess(res, statusAtendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar todas os estados de atendimento', error);
        }
    }

    async findOne(req: Request, res: Response){
        try {
            const statusAtendimentoId = parseInt(req.params.id);
            const statusAtendimento: IStatusAtendimento = await StatusAtendimentoService.getById(statusAtendimentoId);
            return ResponseHandlers.onSuccess(res, statusAtendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar estado de atendimento', error);
        }
    }

    async create(req: Request, res: Response){
        try {
            console.log(req.body);
            const statusAtendimento: IStatusAtendimento = await StatusAtendimentoService.create(req.body);
            return ResponseHandlers.onSuccess(res, statusAtendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao incluir estado de atendimento', error);
        }
    }

    async update(req: Request, res: Response){
        try {
            const statusAtendimentoId = parseInt(req.params.id);
            const props = req.body;
            const statusAtendimento: IStatusAtendimento = await StatusAtendimentoService.update(statusAtendimentoId, props);
            return ResponseHandlers.onSuccess(res, statusAtendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao atualizar o estado de atendimento', error);
        }
    }

    async destroy(req: Request, res: Response){
        try {
            const statusAtendimentoId = parseInt(req.params.id);
            const statusAtendimento: IStatusAtendimento = await StatusAtendimentoService.delete(statusAtendimentoId); 
            return ResponseHandlers.onSuccess(res, statusAtendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao excluir o estado de atendimento', error);
        }
    }

}
