import { IHabilidade, createHabilidade, createHabilidades } from './habilidade.model';
import * as BlueBird from 'bluebird';
const model = require('../../entities');

class HabilidadeService implements IHabilidade {
    public id: number;
    public nome: string;

    constructor(){

    }
    create(habilidade: any){
        // console.log('Habilidade: ', habilidade);
        return model.Habilidade.create(habilidade);
    }

    getAll(): BlueBird<IHabilidade[]> {
        return model.Habilidade.findAll({
            order: ['nome']
            // ,
            // include: [ { model: model.Post } ]
        })
        .then(createHabilidades);
    }

    getById(id: number): BlueBird<IHabilidade> {
        return model.Habilidade.findOne({
            where: {id}
            // ,
            // include: [ { model: model.Post } ]
        })
        .then(createHabilidade);
    }

    update(id: number, habilidade: any){
        return model.Habilidade.update(habilidade, {
            where: {id},
            fields: ['nome'],
            hooks: true,
            individualHooks: true
          });
    }
    
    delete(id: number){
        return model.Habilidade.destroy({
            where: {id}
          });
    }
}
export default new HabilidadeService();
