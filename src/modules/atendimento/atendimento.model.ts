import { IUser } from "../user/user.model";
import { IProfissao } from "../profissao/profissao.model";
import { IProfissional } from "../profissional/profissional.model";
import { IDetalheAtendimento } from "../detalheatendimento/detalheatendimento.model";

export interface IAtendimento {
    readonly id: number,
    idUsuario?: number,
    User?: IUser,
    idProfissao?: number,
    Profissao?: IProfissao,
    idProfissional?: number,
    Profissional?: IProfissional,
    idDetalheAtendimentoAtual?: number,
    DetalheAtendimentoAtual?: IDetalheAtendimento,
    DetalhesAtendimento?: IDetalheAtendimento[];
} 

export function createAtendimento(
    {
        id, 
        User, 
        Profissao,
        Profissional,
        DetalheAtendimentoAtual,
        DetalhesAtendimento
    }: any): IAtendimento {

    return {
        id, 
        User, 
        Profissao,
        Profissional,
        DetalheAtendimentoAtual,
        DetalhesAtendimento
    }
}

export function createAtendimentos(data: any[]): IAtendimento[] {
    return data.map(createAtendimento);
}


