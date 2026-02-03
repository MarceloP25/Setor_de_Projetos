import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config';
import type { Edital } from '../../interfaces/Edital';



export async function fetchEditais(): Promise<Edital[]> {
  const editaisRef = collection(db, 'editais');
  const querySnapshot = await getDocs(editaisRef);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    nomeEdital: doc.data().nomeEdital,
    numeroProcessoEdital: doc.data().numeroProcessoEdital,
    orcamentoEdital: doc.data().orcamentoEdital,
    valorDisponivel:  doc.data().valorDisponivel,
    status:  doc.data().status,
    projetosVinculados:  doc.data().projetosVinculados,
    anoVigente:  doc.data().anoVigente,
    dataInicio:  doc.data().dataInicio,
    dataFim:  doc.data().dataFim,
    dataInicioSubmissao:  doc.data().dataInicioSubmissao,
    dataFimSubmissao:  doc.data().dataFimSubmissao,
    dataInicioDocumentos:  doc.data().dataInicioDocumentos,
    dataFimDocumentos:  doc.data().dataFimDocumentos,
    dataInicioRecursoSubimissao:  doc.data().dataInicioRecursoSubimissao,
    dataFimRecursoSubimissao:  doc.data().dataFimRecursoSubimissao,
    dataInicioAvaliacao:  doc.data().dataInicioAvaliacao,
    dataFimAvaliacao:  doc.data().dataFimAvaliacao,
    dataInicioEnvioRelatorioMensal:  doc.data().dataInicioEnvioRelatorioMensal,
    dataFimEnvioRelatorioMensal:  doc.data().dataFimEnvioRelatorioMensal,
    dataInicioEnvioRelatorioFinal:  doc.data().dataInicioEnvioRelatorioFinal,
    dataFimEnvioRelatorioFinal:  doc.data().dataFimEnvioRelatorioFinal,
    dataPagamentoInicio:  doc.data().dataPagamentoInicio,
    dataPagamentoFim:  doc.data().dataPagamentoFim,
    linkAcessoEdital: doc.data().linkAcessoEdital,
    criadoEm:  doc.data().criadoEm,
    criadoPor:  doc.data().criadoPor,
    alteradoEm:  doc.data().alteradoEm,
    alteradoPor:  doc.data().alteradoPor,
  })) as Edital[];
}
