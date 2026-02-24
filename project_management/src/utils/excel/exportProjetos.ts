import { useAuth } from '../../contexts/AuthContext';
import type { Projeto } from '../../interfaces/Projeto';
import { logAction } from '../LogAction';
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

    const { user } = useAuth();
    if (!user) return;
    logAction({
      user,
      action: 'Exportação de Excel',
      objectType: 'Excel',
      objectId: `todos_os_projetos-${user.nome}`
    });
}
