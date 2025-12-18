import type { Edital } from '../../interfaces/Edital';
import { exportToExcel } from './exportBase';
import { normalizeEdital } from './normalizers';

export function exportEditais(editais: Edital[]) {
  exportToExcel(
    [{ sheetName: 'Editais', rows: editais.map(normalizeEdital) }],
    'todos_os_editais'
  );
}
