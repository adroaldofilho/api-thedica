// import { IPost } from "../Post/interface";

export interface IProfissao {
    readonly id: number,
    nome: string,
    conselho: string
    // Posts?: IPost[];
}

export function createProfissao({id, nome, conselho}: any): IProfissao {
    return {
        id, nome, conselho
        // , Posts
    }
}

export function createProfissoes(data: any[]): IProfissao[] {
    return data.map(createProfissao);
}


