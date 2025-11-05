export interface Edital {
    id: string;
    nomeEdital: string;

    orcamentoEdital: string;
    valorDisponivel?: string;
    status: boolean;

    projetosVinculados?: string[];

    anoVigente: string;
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

    linkAcessoEdital: string;

    criadoEm: string;
    criadoPor?: string;
    alteradoEm?: string;
    alteradoPor?: string;
}