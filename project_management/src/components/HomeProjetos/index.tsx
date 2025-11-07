import React, { useState, useEffect } from 'react';
import { db } from '../../services/config'
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import type { Projeto } from '../../interfaces/Projeto';
import './styles.css';
import SelectInput from '../SelectInput';


const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Projeto[]>([]);
    const [editaisList, setEditaisList] = useState<any[]>([]);
    const [selectedEdital, setSelectedEdital] = useState<string>('');


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsRef = collection(db, "projetos");
                const querySnapshot = await getDocs(projectsRef);
                const projectsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    nomeProjeto: doc.data().nomeProjeto,
                    nomeDaAcao: doc.data().nomeDaAcao,
                    codigoProjeto: doc.data().codigoProjeto,
                    edital: doc.data().edital,
                    ano: doc.data().ano,
                    periodoInicio: doc.data().periodoInicio,
                    periodoFim: doc.data().periodoFim,
                    nomeCoordenador: doc.data().nomeCoordenador,
                    emailCoordenador: doc.data().emailCoordenador,
                    nomeCoCoordenador: doc.data().nomeCoCoordenador,
                    emailCoCoordenador: doc.data().emailCoCoordenador,
                    publicoInternoDescricao: doc.data().publicoInternoDescricao,
                    publicoInternoQuantidade: doc.data().publicoInternoQuantidade,
                    publicoExternoDescricao: doc.data().publicoExternoDescricao,
                    publicoExternoQuantidade: doc.data().publicoExternoQuantidade,
                    abrangencia: doc.data().abrangencia,
                    estado: doc.data().estado,
                    municipio: doc.data().municipio,
                    bairro: doc.data().bairro,
                    espaco: doc.data().espaco,
                    valorSolicitado: doc.data().valorSolicitado,
                    valorDisponibilizado: doc.data().valorDisponibilizado,
                    tipoBolsa: doc.data().tipoBolsa,
                    valorBolsa: doc.data().valorBolsa,
                    quantidade: doc.data().quantidade,
                    valorTotalBolsas: doc.data().valorTotalBolsas,
                    areaTematica: doc.data().areaTematica,
                    linhaExtensao: doc.data().linhaExtensao,
                    detalhesAcao: doc.data().detalhesAcao,
                    documentosAnexados: doc.data().documentosAnexados,
                    statusEtapa1: doc.data().statusEtapa1,
                    classificacaoDetalhe: doc.data().classificacaoDetalhe,
                    notasAvaliadores: doc.data().notasAvaliadores,
                    comentariosAvaliadores: doc.data().comentariosAvaliadores,
                    notaEtapa2: doc.data().notaEtapa2,
                    alunosParticipantes: doc.data().alunosParticipantes,
                    relatorioProjeto: doc.data().relatorioProjeto,
                    criadoEm: doc.data().criadoEm,
                    criadoPor: doc.data().criadoPor,
                    alteradoEm: doc.data().alteradoEm,
                    alteradoPor: doc.data().alteradoPor,
                }));
                setProjects(projectsData);
            } catch (error) {
                console.error("Erro ao buscar projetos:", error);
            }   
        };

        const fetchEditais = async () => {
            try {
              const editaisRef = collection(db, "editais");
              const querySnapshot = await getDocs(editaisRef);
              const editais = querySnapshot.docs.map(doc => ({
                id: doc.id,
                nomeEdital: doc.data().nomeEdital,
                orcamentoEdital: doc.data().orcamentoEdital,
                valorDisponivel:  doc.data().valorDisponivel,
                status:  doc.data().status,
                projetosVinculados:  doc.data().projetosVinculados,
                anoVigente:  doc.data().anoVigente,
                dataInicio:  doc.data().dataInicio,
                dataFim:  doc.data().dataFim,
                dataInicioSubmissao:  doc.data().dataInicioSubmissao,
                dataFimSubmissao:  doc.data().dataFimSubmissao,
                dataInicioDocumentos:  doc.data().dataInicioDocumentos,
                dataFimDocumentos:  doc.data().dataFimDocumentos,
                dataInicioRecurso:  doc.data().dataInicioRecurso,
                dataFimRecurso:  doc.data().dataFimRecurso,
                dataInicioAvaliacao:  doc.data().dataInicioAvaliacao,
                dataFimAvaliacao:  doc.data().dataFimAvaliacao,
                dataInicioEnvioRelatorio:  doc.data().dataFimEnvioRelatorio,
                dataFimEnvioRelatorio: doc.data().dataFimEnvioRelatorio,
                dataPagamentoInicio:  doc.data().dataPagamentoInicio,
                dataPagamentoFim:  doc.data().dataPagamentoFim,
                linkAcessoEdital: doc.data().linkAcessoEdital,
                criadoEm:  doc.data().criadoEm,
                criadoPor:  doc.data().criadoPor,
                alteradoEm:  doc.data().alteradoEm,
                alteradoPor:  doc.data().alteradoPor,
              }));
              setEditaisList(editais);
            } catch (error) {
              console.error("Erro ao buscar editais:", error);
            }
          };
        fetchProjects();
        fetchEditais();
    }, []);

    return (
        <div className="container">
            <h2>Projetos de Extensão</h2>
            <div className="buttons-container">
                <Link to="/projetos/cadastrar" className="btn primary">
                    Novo Projeto
                </Link>
                <Link to="/projetos/classificacao" className="btn primary">
                    Classificação
                </Link>
            </div>
            <div className="filter-container">
                <SelectInput
                    label="Edital"
                    name="editalSelect"
                    value={selectedEdital}
                    onChange={(e) => setSelectedEdital(e.target.value)}
                    options={[...editaisList.map(edital => edital.nomeEdital)]}
                />
            </div>

            <div className="projects-list">
                {projects.filter(
                    project => selectedEdital === '' || project.edital === selectedEdital
                    ).map(project => (
                        <div key={project.id} className="project-item">
                            <Link to={`/projetos/${project.id}`}>
                                <div className='info-card'> 
                                    <h4>{project.nomeProjeto}</h4>
                                    <h4>{project.nomeCoordenador}</h4>
                                    <h4>{project.areaTematica}</h4>
                                    <h4>{project.edital}</h4>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ProjectList;