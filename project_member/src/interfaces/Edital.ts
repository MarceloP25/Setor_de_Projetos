export interface Edital {
    id: string;
    nomeEdital: string;

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
}