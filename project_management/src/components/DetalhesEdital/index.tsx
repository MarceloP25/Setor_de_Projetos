import  { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/config';
import './styles.css';
import type { Edital } from '../../interfaces/Edital';
import ActionButton from '../Button';
import { useParams } from 'react-router-dom';
import { formatDateBR } from '../../utils/formattersDate';
import { exportEditalIndividual } from '../../utils/excel/exportEditalIndividual';
import type { Projeto } from '../../interfaces/Projeto';



function DetalhesEdital({ editalId }: { editalId: string | undefined }) { 
    const { editalId: id = editalId } = useParams<{ editalId: string }>();
    const [edital, setEdital] = useState<Edital | null>(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [projetosDetalhados, setProjetosDetalhados] = useState<Projeto[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const buscarEdital = async () => {
          if (!id) {
            setErro('ID do edital não fornecido.');
            setLoading(false);
            return;
          }

          try {
            const docRef = doc(db, 'editais', id);
            const snap = await getDoc(docRef);

            if (snap.exists()) {
              setEdital(snap.data() as Edital);
            } else {
              setErro(`Edital não encontrado. ${id}`);
            }
          } catch (err) {
            console.error('Erro ao buscar edital:', err);
            setErro('Falha ao carregar o edital.');
          } finally {
            setLoading(false);
          }
        };

        buscarEdital();
      }, [editalId]);

    const handleExportEdital = () => {
        if (!edital) return;
        exportEditalIndividual(edital);
        };

    const buscarProjetos = async () => {
        if (!edital?.projetosVinculados?.length) return;

        try {
        const projetosBuscados: Projeto[] = [];

        for (const projetoId of edital.projetosVinculados) {
            const snap = await getDoc(doc(db, 'projetos', projetoId));
            if (snap.exists()) {
            projetosBuscados.push({
                ...(snap.data() as Projeto),
                id: snap.id
            });
            }
        }

        setProjetosDetalhados(projetosBuscados);
        } catch (error) {
        console.error('Erro ao buscar projetos vinculados:', error);
        }
    };

    if (loading) {
        return (
          <div className="details-edital-container">
            <div className="title">Detalhes do Edital</div>
            <p className='bold'>Carregando informações...</p>
        </div>
        );
    }

    if (erro || !edital) {
        return (
        <div className="details-edital-container">
            <div className="title">Detalhes do Edital</div>
            <p className="erro">{erro ?? 'Dados não disponíveis.'}</p>
        </div>
        );
    }

    if (isModalOpen){
        buscarProjetos();
    }

    return (
            <div className="details-edital-container">
                <div className="title">Detalhes do Edital</div>

                {/* Bloco 1 - Identificação */}
                <div className="infoBloco">
                    <div className="info"><h4>Nome do Edital</h4><p className='bold'>{edital.nomeEdital}</p></div>
                    <div className="info"><h4>Número do Processo do Edital</h4><p className='bold'>{edital.numeroProcessoEdital}</p></div>
                    <div className="info"><h4>Status</h4><p className='bold'>{edital.status ? 'Ativo' : 'Inativo'}</p></div>
                    <div className="info">
                        <h4>Link</h4>
                        {edital.linkAcessoEdital ? (
                            <a 
                            href={edital.linkAcessoEdital.startsWith('http') 
                                ? edital.linkAcessoEdital 
                                : `https://${edital.linkAcessoEdital}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bold link-edital"
                            >
                                {edital.linkAcessoEdital}
                            </a>
                        ) : (
                            <p className="bold">Não informado</p>
                        )}
                    </div>
                    <div className="info"><h4>Ano Vigente</h4><p className='bold'>{edital.anoVigente}</p></div>
                </div>

                {/* Bloco 2 - Orçamento */}
                <div className="infoBloco">
                    <div className="info"><h4>Orçamento do Edital</h4><p className='bold'>{`R$${edital.orcamentoEdital}`}</p></div>
                    <div className="info"><h4>Valor Disponível</h4><p className='bold'>{edital.valorDisponivel ? `R$${edital.valorDisponivel}` : 'N/A'}</p></div>
                </div>

                {/* Bloco 3 - Datas */}
                <div className="infoBloco">
                    <div className="info"><h4>Início do Edital</h4><p className='bold'>{formatDateBR(edital.dataInicio)}</p></div>
                    <div className="info"><h4>Fim do Edital</h4><p className='bold'>{formatDateBR(edital.dataFim)}</p></div>
                </div>
                <div className="infoBloco">
                    <div className="info"><h4>Início da Submissão</h4><p className='bold'>{formatDateBR(edital.dataInicioSubmissao)}</p></div>
                    <div className="info"><h4>Fim da Submissão</h4><p className='bold'>{formatDateBR(edital.dataFimSubmissao)}</p></div>
                </div>
                <div className="infoBloco">
                    <div className="info"><h4>Início da Documentação (etapa 1)</h4><p className='bold'>{formatDateBR(edital.dataInicioDocumentos)}</p></div>
                    <div className="info"><h4>Fim da Documentação (etapa 1)</h4><p className='bold'>{formatDateBR(edital.dataFimDocumentos)}</p></div>
                </div>
                <div className="infoBloco">
                    <div className="info"><h4>Início do Recurso (etapa 1)</h4><p className='bold'>{formatDateBR(edital.dataInicioRecursoSubimissao)}</p></div>
                    <div className="info"><h4>Fim do Recurso (etapa 1)</h4><p className='bold'>{formatDateBR(edital.dataFimRecursoSubimissao)}</p></div>
                </div>  
                <div className="infoBloco"> 
                    <div className="info"><h4>Início da Avaliação (etapa 2)</h4><p className='bold'>{formatDateBR(edital.dataInicioAvaliacao)}</p></div>
                    <div className="info"><h4>Fim da Avaliação (etapa 2)</h4><p className='bold'>{formatDateBR(edital.dataFimAvaliacao)}</p></div>
                </div>
                <div className="infoBloco"> 
                    <div className="info"><h4>Início do Recurso da Avaliação (etapa 2)</h4><p className='bold'>{formatDateBR(edital.dataInicioRecursoAvaliacao)}</p></div>
                    <div className="info"><h4>Fim do Recurso da Avaliação (etapa 2)</h4><p className='bold'>{formatDateBR(edital.dataFimRecursoAvaliacao)}</p></div>
                </div>
                <div className="infoBloco">
                    <div className="info"><h4>Início do Envio do Relatório Mensal (Ficha de Frequência)</h4><p className='bold'>{edital.dataInicioEnvioRelatorioMensal}</p></div>
                    <div className="info"><h4>Fim do Envio do Relatório Mensal (Ficha de Frequência)</h4><p className='bold'>{edital.dataFimEnvioRelatorioMensal}</p></div>
                </div>
                <div className="infoBloco">
                    <div className="info"><h4>Início do Envio do Relatório Final</h4><p className='bold'>{formatDateBR(edital.dataInicioEnvioRelatorioFinal)}</p></div>
                    <div className="info"><h4>Fim do Envio do Relatório Final</h4><p className='bold'>{formatDateBR(edital.dataFimEnvioRelatorioFinal)}</p></div>
                </div>
                <div className="infoBloco">
                    <div className="info"><h4>Início do Pagamento</h4><p className='bold'>{edital.dataPagamentoInicio}</p></div>
                    <div className="info"><h4>Fim do Pagamento</h4><p className='bold'>{edital.dataPagamentoFim}</p></div>
                </div>

                {/* Bloco 4 - Controle de manipulação */}
                <div className="infoBloco">
                    <div className="info"><h4>Criado Em</h4><p className='bold'>{formatDateBR(edital.criadoEm)}</p></div>
                    <div className="info"><h4>Criado Por</h4><p className='bold'>{edital.criadoPor || 'N/A'}</p></div>
                    <div className="info"><h4>Alterado Em</h4><p className='bold'>{formatDateBR(edital.alteradoEm || 'N/A')}</p></div>
                    <div className="info"><h4>Alterado Por</h4><p className='bold'>{edital.alteradoPor || 'N/A'}</p></div>
                </div>

                 {/* Bloco 5 - Projetos vinculados */}
                 <div className="infoBloco">
                    <div className="info">
                        <ActionButton 
                            text="Projetos Vinculados" 
                            variant="medium" 
                            onClick={() => setIsModalOpen(true)} 
                        />
                    </div>
                </div>

                <div className="infoBloco">
                    <div className="info">
                        <ActionButton 
                            text="Extrair Dados" 
                            variant="medium" 
                            onClick={handleExportEdital}
                        />
                    </div>
                </div>

                <div className='infoBloco'>
                    <div className="info">
                        <ActionButton text="EDITAR" variant="medium" to={`/edital/${id}/editar`} />
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Projetos Vinculados</h2>
                            {projetosDetalhados.length > 0 ? (
                                <ul>
                                    {projetosDetalhados.map((proj) => (
                                    <li key={proj.id}>
                                        <h3>{proj.nomeProjeto}</h3>
                                        <p><strong>Coordenador:</strong> {proj.nomeCoordenador}</p>
                                    </li>
                                    ))}
                                </ul>
                                ) : (
                                <p className='bold'>Nenhum projeto vinculado a este edital.</p>
                                )}
                            <ActionButton text="FECHAR" variant="medium" onClick={() => setIsModalOpen(false)} />
                        </div>
                    </div>
                )}

            </div>
    );
}

export default DetalhesEdital;