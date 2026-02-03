import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config';
import type { Projeto } from '../../interfaces/Projeto';

export async function fetchProjetos(): Promise<Projeto[]> {
  const projectsRef = collection(db, 'projetos');
  const querySnapshot = await getDocs(projectsRef);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    nomeProjeto: doc.data().nomeProjeto,
    nomeDaAcao: doc.data().nomeDaAcao,
    codigoProjeto: doc.data().codigoProjeto,
    edital: doc.data().edital,
    ano: doc.data().ano,
    periodoInicio: doc.data().periodoInicio,
    periodoFim: doc.data().periodoFim,
    nomeCoordenador: doc.data().nomeCoordenador,
    emailCoordenador: doc.data().emailCoordenador,
    nomeCoCoordenador: doc.data().nomeCoCoordenador,
    emailCoCoordenador: doc.data().emailCoCoordenador,
    publicoInternoDescricao: doc.data().publicoInternoDescricao,
    publicoInternoQuantidade: doc.data().publicoInternoQuantidade,
    publicoExternoDescricao: doc.data().publicoExternoDescricao,
    publicoExternoQuantidade: doc.data().publicoExternoQuantidade,
    abrangencia: doc.data().abrangencia,
    estado: doc.data().estado,
    municipio: doc.data().municipio,
    bairro: doc.data().bairro,
    espaco: doc.data().espaco,
    valorSolicitado: doc.data().valorSolicitado,
    valorDisponibilizado: doc.data().valorDisponibilizado,
    tipoBolsa: doc.data().tipoBolsa,
    valorBolsa: doc.data().valorBolsa,
    quantidade: doc.data().quantidade,
    valorTotalBolsas: doc.data().valorTotalBolsas,
    valorUnitarioBolsa: doc.data().valorUnitarioBolsa,
    quantidadeIndividualBolsas: doc.data().quantidadeIndividualBolsas,
    areaTematica: doc.data().areaTematica,
    linhaExtensao: doc.data().linhaExtensao,
    detalhesAcao: doc.data().detalhesAcao,
    documentosAnexados: doc.data().documentosAnexados,
    statusEtapa1: doc.data().statusEtapa1,
    classificacaoDetalhe: doc.data().classificacaoDetalhe,
    notasAvaliadores: doc.data().notasAvaliadores,
    comentariosAvaliadores: doc.data().comentariosAvaliadores,
    notaEtapa2: doc.data().notaEtapa2,
    alunosParticipantes: doc.data().alunosParticipantes,
    relatorioProjeto: doc.data().relatorioProjeto,
    criadoEm: doc.data().criadoEm,
    criadoPor: doc.data().criadoPor,
    alteradoEm: doc.data().alteradoEm,
    alteradoPor: doc.data().alteradoPor,
  })) as Projeto[];
}
