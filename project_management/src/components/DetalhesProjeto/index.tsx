import  { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/config';
import Button from '../Button';
import './styles.css';
import type { Projeto } from '../../interfaces/Projeto';
import { useParams } from 'react-router-dom';
import { exportProjetoIndividual } from '../../utils/excel/exportProjetoIndividual';


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
  const [nomeEdital, setNomeEdital] = useState<string>('-');

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

    const buscarEdital = async () => {
      if (!projeto?.edital) return;

      try {
        const editalRef = doc(db, 'editais', projeto.edital);
        const snap = await getDoc(editalRef);
        
        if (snap.exists()) {
          setNomeEdital(snap.data().nomeEdital);
        } else {
          setNomeEdital('Edital não encontrado');
        }
      } catch (err) {
        console.error('Erro ao buscar edital:', err);
        setNomeEdital('Erro ao carregar edital');
      }
    };
    
    buscarProjeto();
    buscarEdital();
  }, [id, projeto]);

  const handleExportProjeto = () => {
    if (!projeto) return;
    exportProjetoIndividual(projeto, nomeEdital);
  };




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
        <div className="info"><h3>Edital</h3><p className='bold'>{nomeEdital}</p></div>
        <div className="info"><h3>Código do Projeto</h3><p className='bold'>{projeto.codigoProjeto}</p></div>
        <div className="info"><h3>Nome do Projeto</h3><p className='bold'>{projeto.nomeProjeto}</p></div>
        <div className="info"><h3>Nome da Ação</h3><p className='bold'>{projeto.nomeDaAcao}</p></div>
        <div className="info"><h3>Cadastrado em</h3><p className='bold'>{formatDate(projeto.criadoEm)}</p></div>
        <div className="info"><h3>Última Edição</h3><p className='bold'>{formatDate(projeto.alteradoEm)}</p></div>
      </div>

      {/* Bloco 2 - Coordenação */}
      <div className="infoBloco">
        <div className="info"><h3>Coordenador</h3><p className='bold'>{projeto.nomeCoordenador}</p></div>
        <div className="info"><h3>Email Coordenador</h3><p className='bold'>{projeto.emailCoordenador}</p></div>
        <div className="info"><h3>CoCoordenador</h3><p className='bold'>{projeto.nomeCoCoordenador ?? '-'}</p></div>
        <div className="info"><h3>Email CoCoordenador</h3><p className='bold'>{projeto.emailCoCoordenador ?? '-'}</p></div>
      </div>

      {/* Bloco 3 - Duração e abrangência */}
      <div className="infoBloco">
        <div className="info"><h3>Ano da Submissão</h3><p className='bold'>{projeto.ano}</p></div>
        <div className="info"><h3>Período de Realização</h3><p className='bold'>{formatDate(projeto.periodoInicio)} a {formatDate(projeto.periodoFim)}</p></div>
        <div className="info"><h3>Abrangência</h3><p className='bold'>{projeto.abrangencia ?? '-'}</p></div>
      </div>

      {/* Bloco 4 - Público Alvo */}
      <div className="infoBloco">
        <div className="info"><h3>Público Interno</h3><p className='bold'>{projeto.publicoInternoDescricao ?? '-'}</p></div>
        <div className="info"><h3>Quant. Interno</h3><p className='bold'>{projeto.publicoInternoQuantidade ?? 0}</p></div>
        <div className="info"><h3>Público Externo</h3><p className='bold'>{projeto.publicoExternoDescricao ?? '-'}</p></div>
        <div className="info"><h3>Quant. Externo</h3><p className='bold'>{projeto.publicoExternoQuantidade ?? 0}</p></div>
      </div>

      {/* Bloco 5 - Local */}
      <div className="infoBloco">
        <div className="info"><h3>Estado</h3><p className='bold'>{projeto.estado ?? '-'}</p></div>
        <div className="info"><h3>Município</h3><p className='bold'>{projeto.municipio ?? '-'}</p></div>
        <div className="info"><h3>Bairro</h3><p className='bold'>{projeto.bairro ?? '-'}</p></div>
        <div className="info"><h3>Espaço</h3><p className='bold'>{projeto.espaco ?? '-'}</p></div>
      </div>

      {/* Bloco 6 - Financiamento */}
      <div className="infoBloco">
        <div className="info"><h3>Valor Solicitado</h3><p className='bold'>{formatCurrency(projeto.valorSolicitado)}</p></div>
        <div className="info"><h3>Valor Disponibilizado</h3><p className='bold'>{formatCurrency(projeto.valorDisponibilizado)}</p></div>
        <div className="info"><h3>Quantidade de Bolsas</h3><p className='bold'>{projeto.quantidade}</p></div>


        <div className="info">
          <h3>Bolsas</h3>
          {projeto.tipoBolsa?.length > 0 ? (
            <ul>
              {projeto.tipoBolsa.map((tipo, i) => (
                <li key={i}>
                  <h5 className="bold">
                    {tipo}
                  </h5>
                  <p className='bold'>
                    {projeto.quantidadeIndividualBolsas?.[i] ?? 0} bolsas de {formatCurrency(projeto.valorUnitarioBolsa?.[i])}
                  </p>
                  <p className='bold'>
                    Total: {formatCurrency(projeto.valorBolsa?.[i])}
                  </p>
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
        <div className="info"><h3>Área Temática</h3><p className='bold'>{projeto.areaTematica}</p></div>
        <div className="info"><h3>Linha de Extensão</h3><p className='bold'>{projeto.linhaExtensao}</p></div>
        <div className="info"><h3>Detalhes da Ação</h3><p className='bold'>{projeto.detalhesAcao ?? '-'}</p></div>
      </div>

      {/* Bloco 8 - Anexos */}
      <div className="infoBloco">
        <div className="info">
          <h3>Documentos Anexados ao Projeto</h3>
          <div className='list'>
          {projeto.documentosAnexados?.length ? (
            <ul>
              {projeto.documentosAnexados.map((doc, i) => (
                <li key={i}>
                  <p className='bold'>{doc}</p>
                </li>
              ))}
            </ul>
          ) : <p className='bold'>Nenhum documento anexado</p>}
          </div>
          <h3>Status do Projeto na Etapa 1</h3>
            <p className='bold'>{projeto.statusEtapa1 ?? '-'}</p>

          {projeto.statusEtapa1 === 'Desclassificado' && projeto.classificacaoDetalhe && (
            <p className='bold'><em>Justificativa:</em> {projeto.classificacaoDetalhe}</p>
          )}
            <Button text="DOCUMENTOS" variant="medium" to={`/projetos/${id}/documentos`} />
        </div>
      </div>

      {/* Bloco 9 - Avaliação */}
      <div className="infoBloco">
        <div className="info">
        <h3>Notas dos Avaliadores</h3>
        
          <div className='list'>
            {projeto.notasAvaliadores && projeto.notasAvaliadores.length > 0 ? (
              <ul>
                {projeto.notasAvaliadores.map((nota, i) => (
                  <li key={i}>
                    <p className='bold'>Avaliador {i + 1}: {nota}</p>
                  </li>
                ))}
              </ul>
            ) : <p className='bold'>Sem notas registradas</p>}

          </div>
        </div>
        <div className="info">
          <h3>Média Final</h3>
          <h4>{projeto.notaEtapa2 ?? '-'} pontos</h4>
        </div>
        
        <div className="info">
          <h3>Comentários Avaliadores</h3>
          <div className='list'>
              {projeto.comentariosAvaliadores?.length ? (
                <ul>
                  {projeto.comentariosAvaliadores.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              ) : <p className='bold'>-</p>}
          </div>

          <div className="info">
            <Button to={`/projetos/${id}/avaliacao`} text="AVALIAÇÃO" variant="medium" />
          </div>
        </div>
      </div>

      <div className="infoBloco">
        <div className="info">
          <h3>Alunos Vinculados</h3>

          <div className='list'>
            {projeto.alunosParticipantes?.length ? (
              <>
                <p className='bold'>{projeto.alunosParticipantes.join(', ')}</p>
                <Button text="LISTA" variant="medium" to={`/projetos/${id}/alunos`} />
              </>
            ) : <p className='bold'>Sem alunos vinculados</p>}
          </div>
        </div>
      </div>
      
      <div className="infoBloco">
        <div className="info">
          <Button
            text="Exportar projeto"
            onClick={handleExportProjeto}
          />
        </div>

        <div className="info">
          <Button text="EDITAR" variant="medium" to={`/projetos/${id}/editar`} />
        </div>
      </div>

    </div>
  );
}

export default DetalhesProjeto;