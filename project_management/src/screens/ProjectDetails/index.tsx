import React, { useState, useEffect } from 'react';
import { db } from '../../services/config'
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import './styles.css';

interface ProjectData {
    edital: string;
    nomeProjeto: string;
    ano: string;
    periodoInicio: string;
    periodoFim: string;
    abrangencia: string;
    nomeAcao: string;
    nomeCoordenador: string;
    emailCoordenador: string;
    nomeCoCoordenador: string;
    emailCoCoordenador: string;
    publicoInterno: string;
    qtdInterno: string;
    publicoExterno: string;
    qtdExterno: string;
    estado: string;
    municipio: string;
    bairro: string;
    espaco: string;
    financiamento: string;
    bolsas: Array<{ tipo: string; quantidade: number }>;
    areaTematica: string;
    linhaExtensao: string;
    detalhes: string;
    classificado: string;
    avaliador1: string;
    avaliador2: string;
    avaliador3: string;
    editaisList?: Array<{ id: string; nome: string }> | null;
}

const ProjectDisplay: React.FC = () => {
    const [project, setProject] = useState<ProjectData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const docRef = doc(db, "projetos", params.projectId);
                const docSnap = await getDoc(docRef);
                
                if (!docSnap.exists()) {
                    throw new Error('Projeto não encontrado');
                }
                
                const projectData = {
                    ...docSnap.data(),
                    id: docSnap.id
                } as unknown as ProjectData;
                
                setProject(projectData);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar o projeto');
                setLoading(false);
            }
        };
        fetchProject();
    }, [params.projectId]);

    return (
        <div className="container">
            {error ? (
                <div className="error-message">{error}</div>
            ) : loading ? (
                <div className="loading">Carregando projeto...</div>
            ) : project ? (
                <div className="project-display-container">
                    <div className="card-header">
                        <h3>{project.nomeProjeto}</h3>
                    </div>
                    <div className="card-content">
                        <div className="project-info">
                            <strong>Edital:</strong> {project.edital}
                        </div>
                        <div className="project-info">
                            <strong>Ano:</strong> {project.ano}
                        </div>
                        <div className="project-info">
                            <strong>Período de Realização:</strong> {project.periodoInicio} a {project.periodoFim}
                        </div>
                        <div className="project-info">
                            <strong>Abrangência:</strong> {project.abrangencia}
                        </div>
                        <div className="project-info">
                            <strong>Nome da Ação:</strong> {project.nomeAcao}
                        </div>
                        <div className="project-info">
                            <strong>Coordenador:</strong> {project.nomeCoordenador}
                        </div>
                        <div className="project-info">
                            <strong>Email do Coordenador:</strong> {project.emailCoordenador}
                        </div>
                        <div className="project-info">
                            <strong>Co-coordenador:</strong> {project.nomeCoCoordenador}
                        </div>
                        <div className="project-info">
                            <strong>Email do Co-coordenador:</strong> {project.emailCoCoordenador}
                        </div>
                        <div className="project-info">
                            <strong>Público Interno:</strong> {project.publicoInterno}
                        </div>
                        <div className="project-info">
                            <strong>Quantidade Interno:</strong> {project.qtdInterno}
                        </div>
                        <div className="project-info">
                            <strong>Público Externo:</strong> {project.publicoExterno}
                        </div>
                        <div className="project-info">
                            <strong>Quantidade Externo:</strong> {project.qtdExterno}
                        </div>
                        <div className="project-info">
                            <strong>Estado:</strong> {project.estado}
                        </div>
                        <div className="project-info">
                            <strong>Município:</strong> {project.municipio}
                        </div>
                        <div className="project-info">
                            <strong>Bairro:</strong> {project.bairro}
                        </div>
                        <div className="project-info">
                            <strong>Espaço de Realização:</strong> {project.espaco}
                        </div>
                        <div className="project-info">
                            <strong>Financiamento:</strong> {project.financiamento}
                        </div>
                        <div className="project-bolsas">
                            <strong>Bolsas Solicitadas:</strong>
                            <ul>
                                {project.bolsas?.map(bolsa => (
                                    <li key={bolsa.tipo}>
                                        {bolsa.tipo}: {bolsa.quantidade} unidades
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="project-info">
                            <strong>Área Temática:</strong> {project.areaTematica}
                        </div>
                        <div className="project-info">
                            <strong>Linha de Extensão:</strong> {project.linhaExtensao}
                        </div>
                        <div className="project-info">
                            <strong>Detalhes da Ação:</strong> {project.detalhes}
                        </div>
                        <div className="project-info">
                            <strong>Classificação:</strong> {project.classificado}
                        </div>
                        <div className="project-info">
                            <strong>Avaliador 1:</strong> {project.avaliador1}
                        </div>
                        <div className="project-info">
                            <strong>Avaliador 2:</strong> {project.avaliador2}
                        </div>
                        <div className="project-info">
                            <strong>Avaliador 3:</strong> {project.avaliador3}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ProjectDisplay;