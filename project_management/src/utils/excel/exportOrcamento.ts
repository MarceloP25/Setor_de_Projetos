import { useAuth } from '../../contexts/AuthContext';
import type { Projeto } from '../../interfaces/Projeto';
import { logAction } from '../LogAction';
import { exportToExcel } from './exportBase';
import { normalizeProjetoOrcamento } from './normalizers';

/**
 * Exporta a planilha de orçamento apenas com projetos
 * classificados com notaEtapa2 >= 6.
 */
export function exportOrcamento(
  projetos: Projeto[],
  nomeEdital: string
) {
  const projetosClassificados = projetos.filter(
    projeto =>
      typeof projeto.notaEtapa2 === 'number' &&
      projeto.notaEtapa2 >= 6
  );

  exportToExcel(
    [
      {
        sheetName: 'Orçamento',
        rows: projetosClassificados.map(projeto =>
          normalizeProjetoOrcamento(projeto, nomeEdital)
        )
      }
    ],
    `orcamento_${nomeEdital}`
  );

    const { user } = useAuth();
    if (!user) return;
    logAction({
      user,
      action: 'Exportação de Excel',
      objectType: 'Excel',
      objectId: `orcamento_${nomeEdital}-${user.nome}`
    });
}
