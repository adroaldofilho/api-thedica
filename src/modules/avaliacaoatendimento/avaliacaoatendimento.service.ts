import { IAvaliacaoAtendimento, createAvaliacaoAtendimento, createAvaliacaoAtendimentos } from './avaliacaoatendimento.model';
import * as BlueBird from 'bluebird';
const model = require('../../entities');

class AvaliacaoAtendimentoService implements IAvaliacaoAtendimento {
    idDetalheAtendimento: number;
    nota: number;
    texto: string;

    constructor(){

    }
    create(AvaliacaoAtendimento: any){
        return model.AvaliacaoAtendimento.create(AvaliacaoAtendimento);
    }

    getAll(): BlueBird<IAvaliacaoAtendimento[]> {
        return model.AvaliacaoAtendimento.findAll({
            order: ['idDetalheAtendimento']
        })
        .then(createAvaliacaoAtendimentos);
    }

    getById(idDetalheAtendimento: number): BlueBird<IAvaliacaoAtendimento> {
        return model.AvaliacaoAtendimento.findOne({
            where: {idDetalheAtendimento}
        })
        .then(createAvaliacaoAtendimento);
    }

    update(idDetalheAtendimento: number, AvaliacaoAtendimento: any){
        return model.AvaliacaoAtendimento.update(AvaliacaoAtendimento, {
            where: {idDetalheAtendimento},
            fields: ['nota', 'texto'],
            hooks: true,
            individualHooks: true
          });
    }
    
    delete(idDetalheAtendimento: number){
        return model.AvaliacaoAtendimento.destroy({
            where: {idDetalheAtendimento}
          });
    }
}
export default new AvaliacaoAtendimentoService();
