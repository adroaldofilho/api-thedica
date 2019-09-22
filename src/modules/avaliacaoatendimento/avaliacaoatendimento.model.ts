export interface IAvaliacaoAtendimento {
    readonly idDetalheAtendimento: number,
    nota: number,
    texto: string
}

export function createAvaliacaoAtendimento({idDetalheAtendimento, nota, texto}: any): IAvaliacaoAtendimento {
    return {
        idDetalheAtendimento, nota, texto
    }
}

export function createAvaliacaoAtendimentos(data: any[]): IAvaliacaoAtendimento[] {
    return data.map(createAvaliacaoAtendimento);
}


