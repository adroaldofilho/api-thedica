import { IUser } from "../user/user.model";
import { IAtendimento } from "../atendimento/atendimento.model";
import { IStatusAtendimento } from "../statusatendimento/statusatendimento.model";

export interface IDetalheAtendimento {
    readonly id: number,
    idAtendimento?: number,
    Atendimento?: IAtendimento,
    idStatusAtendimento?: number,
    StatusAtendimento?: IStatusAtendimento,
    idUsuarioResponsavel?: number,
    UsuarioResponsavel?: IUser,
    textoAtendimento: number,
    dataHoraStatus: Date
} 

export function createDetalheAtendimento(
    {
        id,
        Atendimento, 
        StatusAtendimento,
        UsuarioResponsavel, 
        textoAtendimento,
        dataHoraStatus
    }: any): IDetalheAtendimento {

    return {
        id,
        Atendimento, 
        StatusAtendimento,
        UsuarioResponsavel, 
        textoAtendimento,
        dataHoraStatus
    }
}

export function createDetalheAtendimentos(data: any[]): IDetalheAtendimento[] {
    return data.map(createDetalheAtendimento);
}


