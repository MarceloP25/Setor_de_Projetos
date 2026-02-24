import { useAuth } from '../../contexts/AuthContext';
import type { Projeto } from '../../interfaces/Projeto';
import { logAction } from '../LogAction';
import { exportToExcel } from './exportBase';
import {
  normalizeProjeto,
  normalizeProjetoAvaliacao
} from './normalizers';
export function exportProjetoIndividual(
  projeto: Projeto,
  nomeEdital?: string
) {
  const sheets = [
    {
      sheetName: 'Projeto',
      rows: [
        normalizeProjeto(projeto, nomeEdital)
      ]
    },
    {
      sheetName: 'Avaliação',
      rows: [
        normalizeProjetoAvaliacao(projeto, nomeEdital)
      ]
    }
  ];

  exportToExcel(
    sheets,
    `projeto_${projeto.nomeProjeto}`
  );

    const { user } = useAuth();
    if (!user) return;
    logAction({
      user,
      action: 'Exportação de Excel',
      objectType: 'Excel',
      objectId: `projeto_${projeto.nomeProjeto}-${user.nome}`
    });
}

