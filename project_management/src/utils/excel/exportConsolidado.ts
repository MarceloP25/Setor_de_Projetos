import type { Edital } from '../../interfaces/Edital';
import type { Projeto } from '../../interfaces/Projeto';
import type { Membro } from '../../interfaces/Membro';

import { exportToExcel } from './exportBase';
import {
  normalizeEdital,
  normalizeProjeto,
  normalizeMembro
} from './normalizers';

export function exportConsolidadoEdital(
  edital: Edital,
  projetos: Projeto[],
  membros: Membro[]
) {
  const projetosDoEdital = projetos.filter(
    p => p.edital === edital.id
  );

  const idsProjetos = projetosDoEdital.map(p => p.id);

  const membrosDoEdital = membros.filter(m =>
    m.projetoVinculado.some(id => idsProjetos.includes(id))
  );

  exportToExcel(
    [
      {
        sheetName: 'Edital',
        rows: [normalizeEdital(edital)]
      },
      {
        sheetName: 'Projetos',
        rows: projetosDoEdital.map(p => normalizeProjeto(p))
      },
      {
        sheetName: 'Membros',
        rows: membrosDoEdital.map(normalizeMembro)
      }
    ],
    `consolidado_${edital.nomeEdital}`
  );
}
