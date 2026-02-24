import { useAuth } from '../../contexts/AuthContext';
import type { Edital } from '../../interfaces/Edital';
import { logAction } from '../LogAction';
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

    const { user } = useAuth();
    if (!user) return;
    logAction({
      user,
      action: 'Exportação de Excel',
      objectType: 'Excel',
      objectId: `edital_${edital.nomeEdital}-${user.nome}`
    });
}
