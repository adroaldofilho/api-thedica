import { Request, Response } from 'express';
import { BaseRouterModule, ModuleEndpointMap } from '../../core/router/base-router-module';
import HabilidadeService from './habilidade.service';
import { IHabilidade } from './habilidade.model';
import ResponseHandlers from '../../core/handlers/response-handlers';


export class HabilidadeRouterModule  extends BaseRouterModule {

    constructor(){
        super('habilidade');
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
            const habilidade: Array<IHabilidade> = await HabilidadeService.getAll(); 
            return ResponseHandlers.onSuccess(res, habilidade);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar todas as habilidades', error);
        }
    }

    async findOne(req: Request, res: Response){
        try {
            const habilidadeId = parseInt(req.params.id);
            const habilidade: IHabilidade = await HabilidadeService.getById(habilidadeId);
            return ResponseHandlers.onSuccess(res, habilidade);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar a habilidade', error);
        }
    }

    async create(req: Request, res: Response){
        try {
            console.log(req.body);
            const habilidade: IHabilidade = await HabilidadeService.create(req.body);
            return ResponseHandlers.onSuccess(res, habilidade);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao incluir habilidade', error);
        }
    }

    async update(req: Request, res: Response){
        try {
            const habilidadeId = parseInt(req.params.id);
            const props = req.body;
            const habilidade: IHabilidade = await HabilidadeService.update(habilidadeId, props);
            return ResponseHandlers.onSuccess(res, habilidade);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao atualizar a habilidade', error);
        }
    }

    async destroy(req: Request, res: Response){
        try {
            const habilidadeId = parseInt(req.params.id);
            const habilidade: IHabilidade = await HabilidadeService.delete(habilidadeId); 
            return ResponseHandlers.onSuccess(res, habilidade);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao excluir a habilidade', error);
        }
    }

}
