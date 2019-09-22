import { IProfissional, createProfissional, createProfissionais } from './profissional.model';
import * as BlueBird from 'bluebird';
import { IUser } from '../user/user.model';
import { IProfissao } from '../profissao/profissao.model';
const model = require('../../entities');

class ProfissionalService implements IProfissional {
    id: number;
    idUsuario?: number;
    User?: IUser;
    idProfissao?: number;
    Profissao?: IProfissao;
    emailProfissional: string;
    numeroConselho: string;
    ufConselho: string;
    telefone1: string;
    telefone2: string;
    
    constructor(){

    }
    create(profissional: any){
        return model.Profissional.create(profissional);
    }

    getAll(): BlueBird<IProfissional[]> {
        return model.Profissional.findAll({
            order: ['idUsuario']
            , include: [ { model: model.Profissao },
                         { model: model.User} ]
        })
        .then(createProfissionais);
    }

    getById(id: number): BlueBird<IProfissional> {
        return model.Profissional.findOne({
            where: {id}
            , include: [ { model: model.Profissao },
                         { model: model.User} ]
        })
        .then(createProfissional);
    }

    update(id: number, profissional: any){
        return model.Profissional.update(profissional, {
            where: {id},
            fields: ['idProfissao', 'emailProfissional', 'numeroConselho', 'ufConselho', 'telefone1', 'telefone2'],
            hooks: true,
            individualHooks: true
          });
    }
    
    delete(id: number){
        return model.Profissional.destroy({
            where: {id}
          });
    }
}
export default new ProfissionalService();
