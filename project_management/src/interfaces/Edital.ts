export interface Edital {
    id: string;
    nomeEdital: string;
    numeroProcessoEdital: string;

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

    dataInicioRecursoSubimissao: string;
    dataFimRecursoSubimissao: string;

    dataInicioAvaliacao: string;
    dataFimAvaliacao: string;

    dataInicioRecursoAvaliacao: string;
    dataFimRecursoAvaliacao: string;

    dataInicioEnvioRelatorioMensal: string;
    dataFimEnvioRelatorioMensal: string;

    dataInicioEnvioRelatorioFinal: string;
    dataFimEnvioRelatorioFinal: string;

    dataPagamentoInicio: string;
    dataPagamentoFim: string;

    linkAcessoEdital: string;

    criadoEm: string;
    criadoPor?: string;
    alteradoEm?: string;
    alteradoPor?: string;
}