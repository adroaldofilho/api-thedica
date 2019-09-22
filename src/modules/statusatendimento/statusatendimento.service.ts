import { IStatusAtendimento, createStatusAtendimento, createStatusAtendimentos } from './statusatendimento.model';
import * as BlueBird from 'bluebird';
const model = require('../../entities');

class StatusAtendimentoService implements IStatusAtendimento {
    public id: number;
    public nome: string;
    public responsavel: string;

    constructor(){

    }
    create(StatusAtendimento: any){
        // console.log('StatusAtendimento: ', StatusAtendimento);
        return model.StatusAtendimento.create(StatusAtendimento);
    }

    getAll(): BlueBird<IStatusAtendimento[]> {
        return model.StatusAtendimento.findAll({
            order: ['nome']
            // ,
            // include: [ { model: model.Post } ]
        })
        .then(createStatusAtendimentos);
    }

    getById(id: number): BlueBird<IStatusAtendimento> {
        return model.StatusAtendimento.findOne({
            where: {id}
            // ,
            // include: [ { model: model.Post } ]
        })
        .then(createStatusAtendimento);
    }

    update(id: number, StatusAtendimento: any){
        return model.StatusAtendimento.update(StatusAtendimento, {
            where: {id},
            fields: ['nome', 'responsavel'],
            hooks: true,
            individualHooks: true
          });
    }
    
    delete(id: number){
        return model.StatusAtendimento.destroy({
            where: {id}
          });
    }
}
export default new StatusAtendimentoService();
