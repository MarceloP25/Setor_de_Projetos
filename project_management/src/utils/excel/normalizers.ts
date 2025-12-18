import type { Projeto } from '../../interfaces/Projeto';
import type { Edital } from '../../interfaces/Edital';
import type { Membro } from '../../interfaces/Membro';

/* ================== PROJETO ================== */
export function normalizeProjeto(p: Projeto) {
  return {
    ID: p.id,
    Edital: p.edital,
    Projeto: p.nomeProjeto,
    Código: p.codigoProjeto,
    Coordenador: p.nomeCoordenador,
    Email: p.emailCoordenador,
    ValorSolicitado: p.valorSolicitado,
    ValorDisponibilizado: p.valorDisponibilizado,
    TotalBolsas: p.valorTotalBolsas,
    QuantidadeBolsas: p.quantidade,
    Bolsas: p.tipoBolsa
      .map((tipo, i) =>
        `${tipo} | Qtd ${p.quantidadeIndividualBolsas[i]} | R$ ${p.valorBolsa[i]}`
      )
      .join(' || '),
    ÁreaTemática: p.areaTematica,
    LinhaExtensão: p.linhaExtensao,
    NotaFinal: p.notaEtapa2 ?? '',
    CriadoEm: p.criadoEm
  };
}

/* ================== EDITAL ================== */
export function normalizeEdital(e: Edital) {
  return {
    ID: e.id,
    Nome: e.nomeEdital,
    Processo: e.numeroProcessoEdital,
    AnoVigente: e.anoVigente,
    Orçamento: e.orcamentoEdital,
    ValorDisponível: e.valorDisponivel ?? e.orcamentoEdital,
    Status: e.status ? 'Ativo' : 'Inativo',
    Início: e.dataInicio,
    Fim: e.dataFim,
    ProjetosVinculados: e.projetosVinculados?.join(', ') ?? '',
    CriadoEm: e.criadoEm
  };
}

/* ================== MEMBRO ================== */
export function normalizeMembro(m: Membro) {
  return {
    ID: m.id,
    Nome: m.nome,
    CPF: m.cpf,
    Email: m.email,
    Telefone: m.telefone,
    Sexo: m.sexo,
    ProjetoPrincipal: m.nomeProjeto,
    ProjetosVinculados: m.projetoVinculado.join(', '),
    TipoVínculo: m.tipoVinculo.join(', '),
    ValorBolsa: m.valorbolsa ?? '',
    Banco: m.bancoPagamento ?? '',
    Agência: m.agencia ?? '',
    Conta: m.contaCorrente ?? '',
    CadastradoEm: m.cadastradoEm
  };
}
