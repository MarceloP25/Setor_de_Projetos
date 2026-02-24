import type { Projeto } from '../../interfaces/Projeto';
import type { Edital } from '../../interfaces/Edital';
import { exportToExcel } from './exportBase';
import { normalizeProjetoAvaliacao } from './normalizers';
import { useAuth } from '../../contexts/AuthContext';
import { logAction } from '../LogAction';

export function exportClassificacaoProjetos(
  edital: Edital,
  projetos: Projeto[]
) {
  const projetosValidos = projetos.filter(
    p =>
      p.edital === edital.id &&
      typeof p.notaEtapa2 === 'number' &&
      p.notaEtapa2 >= 6
  );

  if (!projetosValidos.length) {
    alert('Nenhum projeto classificado (nota ≥ 6) para este edital.');
    return;
  }

  const rows = projetosValidos.map(p =>
    normalizeProjetoAvaliacao(p, edital.nomeEdital)
  );

  exportToExcel(
    [
      {
        sheetName: 'Projetos Classificados',
        rows
      }
    ],
    `avaliacao_projetos_${edital.nomeEdital}`
  );

    const { user } = useAuth();
    if (!user) return;
    logAction({
      user,
      action: 'Exportação de Excel',
      objectType: 'Excel',
      objectId: `avaliacao_projetos_${edital.nomeEdital}-${user.nome}`
    });
}
