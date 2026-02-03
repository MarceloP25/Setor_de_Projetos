export interface Edital {
    id: string;
    nomeEdital: string;
    numeroProcessoEdital: string;

    orcamentoEdital: number;
    valorDisponivel?: number;
    status: boolean;

    projetosVinculados?: string[];

    anoVigente: string;
    dataInicio: string;
    dataFim: string;

    dataInicioSubmissao: string;
    dataFimSubmissao: string;

    dataInicioDocumentos: string;
    dataFimDocumentos: string;

    dataInicioRecursoSubimissao: string;
    dataFimRecursoSubimissao: string;

    dataInicioAvaliacao: string;
    dataFimAvaliacao: string;

    dataInicioRecursoAvaliacao: string;
    dataFimRecursoAvaliacao: string;

    dataInicioEnvioRelatorioMensal: number;
    dataFimEnvioRelatorioMensal: number;

    dataInicioEnvioRelatorioFinal: string;
    dataFimEnvioRelatorioFinal: string;

    dataPagamentoInicio: number;
    dataPagamentoFim: number;

    linkAcessoEdital: string;

    criadoEm: string;
    criadoPor?: string;
    alteradoEm?: string;
    alteradoPor?: string;
}