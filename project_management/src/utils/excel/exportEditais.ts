import { useAuth } from '../../contexts/AuthContext';
import type { Edital } from '../../interfaces/Edital';
import { logAction } from '../LogAction';
import { exportToExcel } from './exportBase';
import { normalizeEdital } from './normalizers';

export function exportEditais(editais: Edital[]) {
  exportToExcel(
    [{ sheetName: 'Editais', rows: editais.map(normalizeEdital) }],
    'todos_os_editais'
  );

    const { user } = useAuth();
    if (!user) return;
    logAction({
      user,
      action: 'Exportação de Excel',
      objectType: 'Excel',
      objectId: `todos_os_editais-${user.nome}`
    });
}
