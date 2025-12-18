import type { Membro } from '../../interfaces/Membro';
import { exportToExcel } from './exportBase';
import { normalizeMembro } from './normalizers';

export function exportTodosMembros(membros: Membro[]) {
  exportToExcel(
    [{ sheetName: 'Membros', rows: membros.map(normalizeMembro) }],
    'todos_os_membros'
  );
}
