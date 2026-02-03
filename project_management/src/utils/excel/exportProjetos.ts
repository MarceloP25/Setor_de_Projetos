import type { Projeto } from '../../interfaces/Projeto';
import { exportToExcel } from './exportBase';
import { normalizeProjeto } from './normalizers';

export function exportProjetos(
  projetos: Projeto[],
  getNomeEdital: (idEdital: string) => string
) {
  exportToExcel(
    [
      {
        sheetName: 'Projetos',
        rows: projetos.map(projeto =>
          normalizeProjeto(projeto, getNomeEdital(projeto.edital))
        )
      }
    ],
    'todos_os_projetos'
  );
}
