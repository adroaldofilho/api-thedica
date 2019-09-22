import { IDetalheAtendimento, createDetalheAtendimento, createDetalheAtendimentos } from './detalheatendimento.model';
import * as BlueBird from 'bluebird';
import { IUser } from '../user/user.model';
import { IAtendimento } from '../atendimento/atendimento.model';
import { IStatusAtendimento } from '../statusatendimento/statusatendimento.model';
const model = require('../../entities');

class DetalheAtendimentoService implements IDetalheAtendimento {
    readonly id: number;
    idAtendimento?: number;
    Atendimento?: IAtendimento;
    idStatusAtendimento?: number;
    StatusAtendimento?: IStatusAtendimento;
    idUsuarioResponsavel?: number;
    UsuarioResponsavel?: IUser;
    textoAtendimento: number;
    dataHoraStatus: Date
    
    constructor(){

    }
    create(DetalheAtendimento: any){
        return model.DetalheAtendimento.create(DetalheAtendimento);
    }

    getAll(): BlueBird<IDetalheAtendimento[]> {
        return model.DetalheAtendimento.findAll({
            order: ['idUsuario']
            , include: [ { model: model.User},
                         { model: model.StatusAtendimento},
                         { model: model.Atendimento} ]
        })
        .then(createDetalheAtendimentos);
    }

    getByIdAtendimento(idAtendimento: number): BlueBird<IDetalheAtendimento[]> {
        return model.DetalheAtendimento.findAll({
            where: {idAtendimento}
            , include: [ { model: model.User},
                         { model: model.StatusAtendimento},
                         { model: model.AvaliacaoAtendimento } ]
        })
        .then(createDetalheAtendimentos);
    }

    getById(id: number): BlueBird<IDetalheAtendimento> {
        return model.DetalheAtendimento.findOne({
            where: {id}
            , include: [ { model: model.User},
                         { model: model.StatusAtendimento},
                         { model: model.Atendimento} ]
        })
        .then(createDetalheAtendimento);
    }

    update(id: number, DetalheAtendimento: any){
        return model.DetalheAtendimento.update(DetalheAtendimento, {
            where: {id},
            fields: ['textoAtendimento', 'idStatusAtendimento'],
            hooks: true,
            individualHooks: true
          });
    }
    
    delete(id: number){
        return model.DetalheAtendimento.destroy({
            where: {id}
          });
    }
}
export default new DetalheAtendimentoService();
