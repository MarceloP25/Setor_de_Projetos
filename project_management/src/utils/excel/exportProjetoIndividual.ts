import type { Projeto } from '../../interfaces/Projeto';
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
}

