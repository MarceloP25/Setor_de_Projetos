import  { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/config';
import Button from '../Button';
import './styles.css';
import type { Projeto } from '../../interfaces/Projeto';
import { useParams } from 'react-router-dom';

// Funções utilitárias simples
const formatCurrency = (valor: number | undefined): string =>
  valor !== undefined ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-';

const formatDate = (data: string | undefined): string => {
  if (!data) return '-';
  const d = new Date(data);
  return !isNaN(d.getTime()) ? d.toLocaleDateString('pt-BR') : data;
};

function DetalhesProjeto({ projectId }: { projectId: string | undefined }) {
  const { projectId: id = projectId } = useParams<{ projectId: string }>();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const buscarProjeto = async () => {
      if (!id) {
        setErro('ID do projeto não fornecido.');
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'projetos', id);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setProjeto(snap.data() as Projeto);
        } else {
          setErro('Projeto não encontrado.');
        }
      } catch (err) {
        console.error('Erro ao buscar projeto:', err);
        setErro('Falha ao carregar o projeto.');
      } finally {
        setLoading(false);
      }
    };

    buscarProjeto();
  }, [id]);

  if (loading) {
    return (
      <div className="details-project-container">
        <div className="title">Detalhes do Projeto</div>
        <p className='bold'>Carregando informações...</p>
      </div>
    );
  }

  if (erro || !projeto) {
    return (
      <div className="details-project-container">
        <div className="title">Detalhes do Projeto</div>
        <p className="erro">{erro ?? 'Dados não disponíveis.'}</p>
      </div>
    );
  }

  return (
    <div className="details-project-container">
      <div className="title">Detalhes do Projeto</div>

      {/* Bloco 1 - Identificação */}
      <div className="infoBloco">
        <div className="info"><h4>Edital</h4><p className='bold'>{projeto.edital}</p></div>
        <div className="info"><h4>Código do Projeto</h4><p className='bold'>{projeto.codigoProjeto}</p></div>
        <div className="info"><h4>Nome do Projeto</h4><p className='bold'>{projeto.nomeProjeto}</p></div>
        <div className="info"><h4>Nome da Ação</h4><p className='bold'>{projeto.nomeDaAcao}</p></div>
        <div className="info"><h4>Cadastrado em</h4><p className='bold'>{formatDate(projeto.criadoEm)}</p></div>
        <div className="info"><h4>Última Edição</h4><p className='bold'>{formatDate(projeto.alteradoEm)}</p></div>
      </div>

      {/* Bloco 2 - Coordenação */}
      <div className="infoBloco">
        <div className="info"><h4>Coordenador</h4><p className='bold'>{projeto.nomeCoordenador}</p></div>
        <div className="info"><h4>Email Coordenador</h4><p className='bold'>{projeto.emailCoordenador}</p></div>
        <div className="info"><h4>CoCoordenador</h4><p className='bold'>{projeto.nomeCoCoordenador}</p></div>
        <div className="info"><h4>Email CoCoordenador</h4><p className='bold'>{projeto.emailCoCoordenador}</p></div>
      </div>

      {/* Bloco 3 - Duração e abrangência */}
      <div className="infoBloco">
        <div className="info"><h4>Ano da Submissão</h4><p className='bold'>{projeto.ano}</p></div>
        <div className="info"><h4>Período de Realização</h4><p className='bold'>{formatDate(projeto.periodoInicio)} a {formatDate(projeto.periodoFim)}</p></div>
        <div className="info"><h4>Abrangência</h4><p className='bold'>{projeto.abrangencia}</p></div>
      </div>

      {/* Bloco 4 - Público Alvo */}
      <div className="infoBloco">
        <div className="info"><h4>Público Interno</h4><p className='bold'>{projeto.publicoInternoDescricao ?? '-'}</p></div>
        <div className="info"><h4>Quant. Interno</h4><p className='bold'>{projeto.publicoInternoQuantidade ?? 0}</p></div>
        <div className="info"><h4>Público Externo</h4><p className='bold'>{projeto.publicoExternoDescricao ?? '-'}</p></div>
        <div className="info"><h4>Quant. Externo</h4><p className='bold'>{projeto.publicoExternoQuantidade ?? 0}</p></div>
      </div>

      {/* Bloco 5 - Local */}
      <div className="infoBloco">
        <div className="info"><h4>Estado</h4><p className='bold'>{projeto.estado ?? '-'}</p></div>
        <div className="info"><h4>Município</h4><p className='bold'>{projeto.municipio ?? '-'}</p></div>
        <div className="info"><h4>Bairro</h4><p className='bold'>{projeto.bairro ?? '-'}</p></div>
        <div className="info"><h4>Espaço</h4><p className='bold'>{projeto.espaco ?? '-'}</p></div>
      </div>

      {/* Bloco 6 - Financiamento */}
      <div className="infoBloco">
        <div className="info"><h4>Valor Solicitado</h4><p className='bold'>{formatCurrency(projeto.valorSolicitado)}</p></div>
        <div className="info"><h4>Valor Disponibilizado</h4><p className='bold'>{formatCurrency(projeto.valorDisponibilizado)}</p></div>
        <div className="info"><h4>Quantidade de Bolsas</h4><p className='bold'>{projeto.quantidade}</p></div>
        <div className="info">
          <h4>Bolsas</h4>
          {projeto.tipoBolsa?.length > 0 ? (
            <ul>
              {projeto.tipoBolsa.map((tipo, i) => (
                <li key={i}>
                  {tipo} — {projeto.valorBolsa[i] ? formatCurrency(Number(projeto.valorBolsa[i])) : '-'}
                </li>
              ))}
            </ul>
          ) : (
            <p className='bold'>Nenhuma bolsa registrada</p>
          )}
          <p className='bold'><strong>Total:</strong> {formatCurrency(projeto.valorTotalBolsas)}</p>
        </div>
      </div>

      {/* Bloco 7 - Temas */}
      <div className="infoBloco">
        <div className="info"><h4>Área Temática</h4><p className='bold'>{projeto.areaTematica}</p></div>
        <div className="info"><h4>Linha de Extensão</h4><p className='bold'>{projeto.linhaExtensao}</p></div>
        <div className="info"><h4>Detalhes da Ação</h4><p className='bold'>{projeto.detalhesAcao ?? '-'}</p></div>
      </div>

      {/* Bloco 8 - Anexos e alunos */}
      <div className="infoBloco">
        <div className="info">
          <h4>Documentos Anexados</h4>
          {projeto.documentosAnexados?.length ? (
            <ul>
              {projeto.documentosAnexados.map((doc, i) => (
                <li key={i}>
                  {doc.startsWith('http')
                    ? <a href={doc} target="_blank" rel="noreferrer">{doc}</a>
                    : doc}
                </li>
              ))}
            </ul>
          ) : <p className='bold'>Nenhum documento anexado</p>}
            <Button text="DOCUMENTOS" variant="medium" to={`/projetos/${id}/documentos`} />
        </div>

      {/* Bloco 9 - Avaliação e status */}
      <div className="infoBloco">
        <div className="info">
          <h4>Status do Projeto</h4>
          <p className='bold'>{projeto.statusEtapa1 ?? '-'}</p>

          {projeto.statusEtapa1 === 'Desclassificado' && projeto.classificacaoDetalhe && (
            <p className='bold'><em>Justificativa:</em> {projeto.classificacaoDetalhe}</p>
          )}
        </div>

        <div className="info">
          <h4>Notas dos Avaliadores</h4>
          {projeto.notasAvaliadores && projeto.notasAvaliadores.length > 0 ? (
            <ul>
              {projeto.notasAvaliadores.map((nota, i) => (
                <li key={i}>Avaliador {i + 1}: {nota}</li>
              ))}
            </ul>
          ) : <p className='bold'>Sem notas registradas</p>}
        </div>

        <div className="info">
          <h4>Média Final</h4>
          <p className='bold'>{projeto.notaEtapa2 ?? '-'}</p>
        </div>

        <div className="info">
          <h4>Comentários Avaliadores</h4>
          {projeto.comentariosAvaliadores?.length ? (
            <ul>
              {projeto.comentariosAvaliadores.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          ) : <p className='bold'>-</p>}
        <Button to={`/projetos/${id}/avaliacao`} text="AVALIAÇÃO" variant="medium" />
        </div>
      </div>


        <div className="info">
          <h4>Alunos Vinculados</h4>
          {projeto.alunosParticipantes?.length ? (
            <>
              <p className='bold'>{projeto.alunosParticipantes.join(', ')}</p>
              <Button text="LISTA" variant="medium" to={`/projetos/${id}/alunos`} />
            </>
          ) : <p className='bold'>Sem alunos vinculados</p>}
        </div>
      </div>
      <div className="info">
        <Button text="EDITAR" variant="medium" to={`/projetos/${id}/editar`} />
      </div>
    </div>
  );
}

export default DetalhesProjeto;