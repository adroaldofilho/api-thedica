import { IAtendimento, createAtendimento, createAtendimentos } from './atendimento.model';
import * as BlueBird from 'bluebird';
import { IUser } from '../user/user.model';
import { IProfissao } from '../profissao/profissao.model';
import { IProfissional } from '../profissional/profissional.model';
import { IDetalheAtendimento } from '../detalheatendimento/detalheatendimento.model';
const model = require('../../entities');

class AtendimentoService implements IAtendimento {
    id: number;
    idUsuario?: number;
    User?: IUser;
    idProfissao?: number;
    Profissao?: IProfissao;
    idProfissional?: number;
    Profissional?: IProfissional;
    idDetalheAtendimentoAtual?: number;
    DetalheAtendimentoAtual?: IDetalheAtendimento;
    DetalhesAtendimento?: IDetalheAtendimento[];
    
    constructor(){

    }
    create(atendimento: any){
        return model.Atendimento.create(atendimento);
    }

    getAll(): BlueBird<IAtendimento[]> {
        return model.Atendimento.findAll({
            order: ['idUsuario']
            , include: [ { model: model.Profissao },
                { model: model.User},
                { model: model.DetalheAtendimento, as: 'DetalheAtendimentoAtual'},
                { model: model.DetalheAtendimento  },
                { model: model.Profissional} ]
        })
        .then(createAtendimentos);
    }

    getById(id: number): BlueBird<IAtendimento> {
        return model.Atendimento.findOne({
            where: {id}
            , include: [ { model: model.Profissao },
                         { model: model.User},
                         { model: model.DetalheAtendimento, as: 'DetalheAtendimentoAtual'},
                         { model: model.DetalheAtendimento },
                         { model: model.Profissional } ]
        })
        .then(createAtendimento);
    }

    getByUsuario(idUsuario: number): BlueBird<IAtendimento[]> {
        return model.Atendimento.findAll({
            where: {idUsuario}
            , include: [ { model: model.Profissao },
                         { model: model.User},
                         { model: model.DetalheAtendimento, as: 'DetalheAtendimentoAtual'},
                         { model: model.DetalheAtendimento },
                         { model: model.Profissional } ]
        })
        .then(createAtendimentos);
    }

    getByProfissional(idProfissional: number): BlueBird<IAtendimento[]> {
        return model.Atendimento.findAll({
            where: {idProfissional}
            , include: [ { model: model.Profissao },
                         { model: model.User},
                         { model: model.DetalheAtendimento, as: 'DetalheAtendimentoAtual'},
                         { model: model.DetalheAtendimento },
                         { model: model.Profissional } ]
        })
        .then(createAtendimentos);
    }

    getByProfissao(idProfissao: number): BlueBird<IAtendimento[]> {
        return model.Atendimento.findAll({
            where: {idProfissao}
            , include: [ { model: model.Profissao },
                         { model: model.User},
                         { model: model.DetalheAtendimento, as: 'DetalheAtendimentoAtual'},
                         { model: model.DetalheAtendimento },
                         { model: model.Profissional } ]
        })
        .then(createAtendimentos);
    }

    update(id: number, Atendimento: any){
        return model.Atendimento.update(Atendimento, {
            where: {id},
            fields: ['idProfissao', 'idProfissional', 'idDetalheAtendimentoAtual'],
            hooks: true,
            individualHooks: true
          });
    }
    
    delete(id: number){
        return model.Atendimento.destroy({
            where: {id}
          });
    }
}
export default new AtendimentoService();
