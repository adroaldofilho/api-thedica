// import { IPost } from "../Post/interface";

export interface IStatusAtendimento {
    readonly id: number,
    nome: string,
    responsavel: string
    // Posts?: IPost[];
}

export function createStatusAtendimento({id, nome, responsavel}: any): IStatusAtendimento {
    return {
        id, nome, responsavel
        // , Posts
    }
}

export function createStatusAtendimentos(data: any[]): IStatusAtendimento[] {
    return data.map(createStatusAtendimento);
}


