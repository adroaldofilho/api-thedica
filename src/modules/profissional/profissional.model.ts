import { IUser } from "../user/user.model";
import { IProfissao } from "../profissao/profissao.model";

export interface IProfissional {
    readonly id: number,
    idUsuario?: number,
    User?: IUser,
    idProfissao?: number,
    Profissao?: IProfissao,
    emailProfissional: string,
    numeroConselho: string,
    ufConselho: string,
    telefone1: string,
    telefone2: string 
} 

export function createProfissional(
    {
        id, 
        User, 
        Profissao,
        emailProfissional,
        numeroConselho,
        ufConselho,
        telefone1,
        telefone2 
    }: any): IProfissional {

    return {
        id, 
        User, 
        Profissao,
        emailProfissional,
        numeroConselho,
        ufConselho,
        telefone1,
        telefone2 
    }
}

export function createProfissionais(data: any[]): IProfissional[] {
    return data.map(createProfissional);
}


