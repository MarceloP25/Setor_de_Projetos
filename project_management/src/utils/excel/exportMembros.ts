import { useAuth } from '../../contexts/AuthContext';
import type { Membro } from '../../interfaces/Membro';
import { logAction } from '../LogAction';
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

    const { user } = useAuth();
    if (!user) return;
    logAction({
      user,
      action: 'Exportação de Excel',
      objectType: 'Excel',
      objectId: `${nomeArquivo}-${user.nome}`
    });
}
