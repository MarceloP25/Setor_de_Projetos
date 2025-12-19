import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config';
import type { Membro } from '../../interfaces/Membro';

export async function fetchMembros(): Promise<Membro[]> {
  const membrosRef = collection(db, 'membros');
  const querySnapshot = await getDocs(membrosRef);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    nome: doc.data().nome,
    cpf: doc.data().cpf,
    telefone: doc.data().telefone,
    sexo: doc.data().sexo,
    matricula: doc.data().matricula,
    modalidadeEnsino: doc.data().modalidadeEnsino,
    curso: doc.data().curso,
    projetoVinculado: doc.data().projetoVinculado,
    tipoVinculo: doc.data().tipoVinculo,
    valorbolsa: doc.data().valorbolsa,
    bancoPagamento: doc.data().bancoPagamento,
    agencia: doc.data().agencia,
    contaCorrente: doc.data().contaCorrente,
    email: doc.data().email,
    relatorio: doc.data().relatorio,
    cadastradoEm: doc.data().cadastradoEm,
    editadoEm: doc.data().editadoEm,
  })) as Membro[];
}