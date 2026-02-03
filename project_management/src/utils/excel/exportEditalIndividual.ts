import type { Edital } from '../../interfaces/Edital';
import { exportToExcel } from './exportBase';
import { normalizeEdital } from './normalizers';

export function exportEditalIndividual(edital: Edital) {
  exportToExcel(
    [
      {
        sheetName: 'Edital',
        rows: [normalizeEdital(edital)]
      }
    ],
    `edital_${edital.nomeEdital}`
  );
}
