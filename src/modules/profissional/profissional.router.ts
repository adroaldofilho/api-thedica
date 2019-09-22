import { Request, Response } from 'express';
import { BaseRouterModule, ModuleEndpointMap } from '../../core/router/base-router-module';
import ProfissionalService from './profissional.service';
import { IProfissional } from './profissional.model';
import ResponseHandlers from '../../core/handlers/response-handlers';


export class ProfissionalRouterModule  extends BaseRouterModule {

    constructor(){
        super('profissional');
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
            const profissional: Array<IProfissional> = await ProfissionalService.getAll(); 
            return ResponseHandlers.onSuccess(res, profissional);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar todos os profissonais', error);
        }
    }

    async findOne(req: Request, res: Response){
        try {
            const profissionalId = parseInt(req.params.id);
            const profissional: IProfissional = await ProfissionalService.getById(profissionalId);
            return ResponseHandlers.onSuccess(res, profissional);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar o profissional', error);
        }
    }

    async create(req: Request, res: Response){
        try {
            // console.log(req.body);
            const profissional: IProfissional = await ProfissionalService.create(req.body);
            return ResponseHandlers.onSuccess(res, profissional);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao incluir o profissional', error);
        }
    }

    async update(req: Request, res: Response){
        try {
            const profissionalId = parseInt(req.params.id);
            const props = req.body;
            const profissional: IProfissional = await ProfissionalService.update(profissionalId, props);
            return ResponseHandlers.onSuccess(res, profissional);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao atualizar o profissional', error);
        }
    }

    async destroy(req: Request, res: Response){
        try {
            const profissionalId = parseInt(req.params.id);
            const profissional: IProfissional = await ProfissionalService.delete(profissionalId); 
            return ResponseHandlers.onSuccess(res, profissional);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao excluir o profissional', error);
        }
    }

}
