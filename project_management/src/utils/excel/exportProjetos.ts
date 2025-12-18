import type { Projeto } from '../../interfaces/Projeto';
import { exportToExcel } from './exportBase';
import { normalizeProjeto } from './normalizers';

export function exportProjetos(projetos: Projeto[]) {
  exportToExcel(
    [{ sheetName: 'Projetos', rows: projetos.map(normalizeProjeto) }],
    'todos_os_projetos'
  );
}
