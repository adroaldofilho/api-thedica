// import { IPost } from "../Post/interface";

export interface IHabilidade {
    readonly id: number,
    nome: string
    // Posts?: IPost[];
}

export function createHabilidade({id, nome, Posts}: any): IHabilidade {
    return {
        id, nome
        // , Posts
    }
}

export function createHabilidades(data: any[]): IHabilidade[] {
    return data.map(createHabilidade);
}


