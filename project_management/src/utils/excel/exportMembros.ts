import type { Membro } from '../../interfaces/Membro';
import { exportToExcel } from './exportBase';
import { normalizeMembro } from './normalizers';

export function exportMembros(
  membros: Membro[],
  nomeArquivo: string
) {
  exportToExcel(
    [
      {
        sheetName: 'Membros',
        rows: membros.map(m => normalizeMembro(m))
      }
    ],
    nomeArquivo
  );
}
