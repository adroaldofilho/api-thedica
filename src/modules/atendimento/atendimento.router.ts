import { Request, Response } from 'express';
import { BaseRouterModule, ModuleEndpointMap } from '../../core/router/base-router-module';
import AtendimentoService from './atendimento.service';
import { IAtendimento } from './atendimento.model';
import ResponseHandlers from '../../core/handlers/response-handlers';
import { IDetalheAtendimento } from '../detalheatendimento/detalheatendimento.model';
import DetalheAtendimentoService from '../detalheatendimento/detalheatendimento.service';
import detalheatendimentoService from '../detalheatendimento/detalheatendimento.service';


export class AtendimentoRouterModule  extends BaseRouterModule {

    constructor(){
        super('atendimento');
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
                },
                {
                    endpoint: `${ this.context }/${ this.version }/${ this.moduleName }/:idUsuario/getByUsuario`,
                    callback: this.findByUsuario,
                    isProtected: true
                },
                {
                    endpoint: `${ this.context }/${ this.version }/${ this.moduleName }/:idProfissional/getByProfissional`,
                    callback: this.findByProfissional,
                    isProtected: true
                },
                {
                    endpoint: `${ this.context }/${ this.version }/${ this.moduleName }/:idProfissao/getByProfissao`,
                    callback: this.findByProfissao,
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
            const atendimento: Array<IAtendimento> = await AtendimentoService.getAll(); 
            return ResponseHandlers.onSuccess(res, atendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar todos os atendimentos', error);
        }
    }

    async findByUsuario(req: Request, res: Response){
        const idUsuario = parseInt(req.params.idUsuario);
        try {
            const atendimento: Array<IAtendimento> = await AtendimentoService.getByUsuario(idUsuario); 
            return ResponseHandlers.onSuccess(res, atendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar todos os atendimentos do Usuário', error);
        }
    }

    async findByProfissional(req: Request, res: Response){
        const idProfissional = parseInt(req.params.idUsuario);
        try {
            const atendimento: Array<IAtendimento> = await AtendimentoService.getByProfissional(idProfissional); 
            return ResponseHandlers.onSuccess(res, atendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar todos os atendimentos do Usuário', error);
        }
    }

    async findByProfissao(req: Request, res: Response){
        const idUsuario = parseInt(req.params.idUsuario);
        try {
            const atendimento: Array<IAtendimento> = await AtendimentoService.getByProfissao(idUsuario); 
            return ResponseHandlers.onSuccess(res, atendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar todos os atendimentos do Usuário', error);
        }
    }

    async findOne(req: Request, res: Response){
        try {
            const atendimentoId = parseInt(req.params.id);
            const atendimento: IAtendimento = await AtendimentoService.getById(atendimentoId);
            const detalhesAtendimento: Array<IDetalheAtendimento> = 
                await DetalheAtendimentoService.getByIdAtendimento(atendimentoId);
            atendimento['detalhesAtendimento'] = detalhesAtendimento;
            return ResponseHandlers.onSuccess(res, atendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao buscar o atendimento', error);
        }
    }

    async create(req: Request, res: Response){
        try {
            // console.log(req.body);
            let atendimento: IAtendimento = await AtendimentoService.create(req.body);
            req.body['idAtendimento'] = atendimento.id;
            req.body['idUsuarioResponsavel'] = atendimento.idUsuario;
            req.body['idStatusAtendimento'] = 1;
            const detalheAtendimento: IDetalheAtendimento = await DetalheAtendimentoService.create(req.body);
            req.body['idDetalheAtendimentoAtual'] = detalheAtendimento.id;
            // let props = {};
            // props['idDetalheAtendimentoAtual'] = detalheAtendimento.id;
            // console.log(req.body);
            atendimento = await AtendimentoService.update(atendimento.id, req.body);
            return ResponseHandlers.onSuccess(res, atendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao incluir o atendimento', error);
        }
    }

    async update(req: Request, res: Response){
        try {
            const atendimentoId = parseInt(req.params.id);
            req.body['idAtendimento'] = atendimentoId;
            console.log(req.body);
            const detalheAtendimento: IDetalheAtendimento = await DetalheAtendimentoService.create(req.body);
            
            req.body['idDetalheAtendimentoAtual'] = detalheAtendimento.id;
            const props = req.body;
            const atendimento: IAtendimento = await AtendimentoService.update(atendimentoId, props);
            return ResponseHandlers.onSuccess(res, atendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao atualizar o atendimento', error);
        }
    }

    async destroy(req: Request, res: Response){
        try {
            const atendimentoId = parseInt(req.params.id);
            const atendimento: IAtendimento = await AtendimentoService.delete(atendimentoId); 
            return ResponseHandlers.onSuccess(res, atendimento);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao excluir o Atendimento', error);
        }
    }

}
