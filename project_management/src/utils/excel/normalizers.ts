import type { Projeto } from '../../interfaces/Projeto';
import type { Edital } from '../../interfaces/Edital';
import type { Membro } from '../../interfaces/Membro';

/* ================== PROJETO ================== */
export function normalizeProjeto(
  p: Projeto,
  nomeEdital?: string
) {
  return {
    id: p.id,
    nomeProjeto: p.nomeProjeto,
    nomeDaAcao: p.nomeDaAcao,
    codigoProjeto: p.codigoProjeto,

    editalId: p.edital,
    nomeEdital: nomeEdital ?? '',

    ano: p.ano,
    periodoInicio: p.periodoInicio,
    periodoFim: p.periodoFim,

    nomeCoordenador: p.nomeCoordenador,
    emailCoordenador: p.emailCoordenador,
    nomeCoCoordenador: p.nomeCoCoordenador,
    emailCoCoordenador: p.emailCoCoordenador,

    publicoInternoDescricao: p.publicoInternoDescricao,
    publicoInternoQuantidade: p.publicoInternoQuantidade,
    publicoExternoDescricao: p.publicoExternoDescricao,
    publicoExternoQuantidade: p.publicoExternoQuantidade,

    abrangencia: p.abrangencia,
    estado: p.estado,
    municipio: p.municipio,
    bairro: p.bairro,
    espaco: p.espaco,

    valorSolicitado: p.valorSolicitado,
    valorDisponibilizado: p.valorDisponibilizado,

    tipoBolsa: p.tipoBolsa?.join(', ') ?? '',
    valorBolsa: p.valorBolsa?.join(', ') ?? '',
    valorUnitarioBolsa: p.valorUnitarioBolsa?.join(', ') ?? '',
    quantidadeIndividualBolsas: p.quantidadeIndividualBolsas?.join(', ') ?? '',

    quantidade: p.quantidade,
    valorTotalBolsas: p.valorTotalBolsas,

    areaTematica: p.areaTematica,
    linhaExtensao: p.linhaExtensao,
    detalhesAcao: p.detalhesAcao,

    documentosAnexados: p.documentosAnexados?.join(', ') ?? '',

    statusEtapa1: p.statusEtapa1,
    classificacaoDetalhe: p.classificacaoDetalhe ?? '',

    notasAvaliadores: p.notasAvaliadores?.join(', ') ?? '',
    comentariosAvaliadores: p.comentariosAvaliadores?.join(', ') ?? '',
    notaEtapa2: p.notaEtapa2 ?? '',

    alunosParticipantes: p.alunosParticipantes?.join(', ') ?? '',
    relatorioProjeto: p.relatorioProjeto?.join(', ') ?? '',

    criadoEm: p.criadoEm,
    criadoPor: p.criadoPor,
    alteradoEm: p.alteradoEm,
    alteradoPor: p.alteradoPor,
  };
}


/* ================== EDITAL ================== */
export function normalizeEdital(e: Edital) {
  return {
    id: e.id,
    nomeEdital: e.nomeEdital,
    numeroProcessoEdital: e.numeroProcessoEdital,
    orcamentoEdital: e.orcamentoEdital,
    valorDisponivel:  e.valorDisponivel,
    status:  e.status,
    projetosVinculados:  e.projetosVinculados?.join(', '),
    anoVigente:  e.anoVigente,
    dataInicio:  e.dataInicio,
    dataFim:  e.dataFim,
    dataInicioSubmissao:  e.dataInicioSubmissao,
    dataFimSubmissao:  e.dataFimSubmissao,
    dataInicioDocumentos:  e.dataInicioDocumentos,
    dataFimDocumentos:  e.dataFimDocumentos,
    dataInicioRecursoSubimissao:  e.dataInicioRecursoSubimissao,
    dataFimRecursoSubimissao:  e.dataFimRecursoSubimissao,
    dataInicioAvaliacao:  e.dataInicioAvaliacao,
    dataFimAvaliacao:  e.dataFimAvaliacao,
    dataInicioEnvioRelatorioMensal:  e.dataInicioEnvioRelatorioMensal,
    dataFimEnvioRelatorioMensal:  e.dataFimEnvioRelatorioMensal,
    dataInicioEnvioRelatorioFinal:  e.dataInicioEnvioRelatorioFinal,
    dataFimEnvioRelatorioFinal:  e.dataFimEnvioRelatorioFinal,
    dataPagamentoInicio:  e.dataPagamentoInicio,
    dataPagamentoFim:  e.dataPagamentoFim,
    linkAcessoEdital: e.linkAcessoEdital,
    criadoEm:  e.criadoEm,
    criadoPor:  e.criadoPor,
    alteradoEm:  e.alteradoEm,
    alteradoPor:  e.alteradoPor,
  };
}

/* ================== MEMBRO ================== */
export function normalizeMembro(m: Membro) {
  return {
  id: m.id,           
  nome: m.nome,
  cpf: m.cpf,
  telefone: m.telefone,
  sexo: m.sexo,
  matricula: m.matricula,
  modalidadeEnsino: m.modalidadeEnsino,
  curso: m.curso,
  projetoVinculado: m.projetoVinculado.join(', '),
  tipoVinculo: m.tipoVinculo,
  valorbolsa: m.valorbolsa,
  bancoPagamento: m.bancoPagamento,
  agencia: m.agencia,
  contaCorrente: m.contaCorrente,
  email: m.email,
  relatorio: m.relatorio,

  cadastradoEm: m.cadastradoEm,
  editadoEm: m.editadoEm,
  };
}

/* ================== Projetos classificados por edital ================== */
export function normalizeProjetoAvaliacao(
  projeto: Projeto,
  nomeEdital?: string
) {
  const notas = projeto.notasAvaliadores ?? [];
  const comentarios = projeto.comentariosAvaliadores ?? [];

  const notasColumns = notas.reduce<Record<string, number>>(
    (acc, nota, idx) => {
      acc[`Nota Avaliador ${idx + 1}`] = nota;
      return acc;
    },
    {}
  );

  const comentariosColumns = comentarios.reduce<Record<string, string>>(
    (acc, comentario, idx) => {
      acc[`Comentário Avaliador ${idx + 1}`] = comentario;
      return acc;
    },
    {}
  );

  return {
    'Nome do Projeto': projeto.nomeProjeto,
    'Nome do Edital': nomeEdital ?? projeto.edital,
    'Coordenador': projeto.nomeCoordenador,
    'Nota Final': projeto.notaEtapa2 ?? '',

    ...notasColumns,
    ...comentariosColumns
  };
}

/* ================== Orçamento de projetos classificados ================== */
export function normalizeProjetoOrcamento(
  projeto: Projeto,
  nomeEdital: string
) {
  return {
    projeto: projeto.nomeProjeto,
    coordenador: projeto.nomeCoordenador,
    valorSolicitado: projeto.valorSolicitado,
    valorDisponibilizado: projeto.valorDisponibilizado,
    edital: nomeEdital,
    notaClassificacao: projeto.notaEtapa2 ?? ''
  };
}