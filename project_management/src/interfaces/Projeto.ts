export interface Projeto {
    id: string;
    edital: string;
    nomeProjeto: string;
    ano: number;
    periodoInicio: string;
    periodoFim: string;
    abrangencia: string;
    nomeAcao: string;

    nomeCoordenador: string;
    emailCoordenador: string;
    nomeCoCoordenador?: string;
    emailCoCoordenador?: string;

    publicoInternoDescricao?: string;
    publicoInternoQuantidade?: number;
    publicoExternoDescricao?: string;
    publicoExternoQuantidade?: number;

    estado?: string;
    municipio?: string;
    bairro?: string;
    espaco?: string;

    valorSolicitado: string;
    tipoBolsa: string[];
    valorBolsa: string[];
    quantidade: number;
    valorTotalBolsas: number;

    areaTematica: string[];
    linhaExtensao: string[];
    detalhesAcao: string;

    documentosAnexados?: string[];
    statusEtapa1?: string;

    /**
     * Notas atribuídas por até 3 avaliadores (0 a 10).
     * A média das notas define a nota final do projeto.
     */
    notasAvaliadores?: number[];

    /** Média calculada automaticamente com base nas notas dos avaliadores */
    notaEtapa2?: number;

    /**
     * Lista de alunos vinculados ao projeto.
     * Cada aluno será cadastrado individualmente e vinculado pelo sistema.
     */
    alunosParticipantes?: string[];

    relatorioProjeto?: string[];

    criadoEm: string;
}