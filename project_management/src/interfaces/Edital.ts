export interface Edital {
    id: string;
    nomeEdital: string;
    valorDisponivel: string;
    status: boolean;

    projetosVinculados?: string[];

    anoVigente: number;
    dataInicio: string;
    dataFim: string;

    dataInicioSubmissao: string;
    dataFimSubmissao: string;

    dataInicioDocumentos: string;
    dataFimDocumentos: string;

    dataInicioRecurso: string;
    dataFimRecurso: string;

    dataInicioAvaliacao: string;
    dataFimAvaliacao: string;

    dataInicioEnvioRelatorio: string;
    dataFimEnvioRelatorio: string;

    dataPagamentoInicio: string;
    dataPagamentoFim: string;

    criadoEm: string;
    criadoPor?: string;
    alteradoEm?: string;
    alteradoPor?: string;
}