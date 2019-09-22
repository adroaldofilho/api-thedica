import { IProfissao, createProfissao, createProfissoes } from './profissao.model';
import * as BlueBird from 'bluebird';
const model = require('../../entities');

class ProfissaoService implements IProfissao {
    public id: number;
    public nome: string;
    public conselho: string;

    constructor(){

    }
    create(profissao: any){
        // console.log('Profissao: ', Profissao);
        return model.Profissao.create(profissao);
    }

    getAll(): BlueBird<IProfissao[]> {
        return model.Profissao.findAll({
            order: ['nome']
            // ,
            // include: [ { model: model.Post } ]
        })
        .then(createProfissoes);
    }

    getById(id: number): BlueBird<IProfissao> {
        return model.Profissao.findOne({
            where: {id}
            // ,
            // include: [ { model: model.Post } ]
        })
        .then(createProfissao);
    }

    update(id: number, profissao: any){
        return model.Profissao.update(profissao, {
            where: {id},
            fields: ['nome', 'conselho'],
            hooks: true,
            individualHooks: true
          });
    }
    
    delete(id: number){
        return model.Profissao.destroy({
            where: {id}
          });
    }
}
export default new ProfissaoService();
