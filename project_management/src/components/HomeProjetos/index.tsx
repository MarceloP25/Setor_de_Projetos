import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Projeto } from '../../interfaces/Projeto';
import { fetchProjetos } from '../../services/views/fetchProjetos';
import { fetchEditais } from '../../services/views/fetchEditais';
import './styles.css';
import SelectInput from '../SelectInput';
import Button from '../Button';
import { exportProjetos } from '../../utils/excel/exportProjetos';
import { exportClassificacaoProjetos } from '../../utils/excel/exportClassificacaoProjetos';
import {Modal} from '../Modal';
import { useNavigate } from 'react-router-dom';



const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Projeto[]>([]);
    const [editaisList, setEditaisList] = useState<any[]>([]);
    const [selectedEdital, setSelectedEdital] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

 useEffect(() => {
    async function loadData() {
      try {
        const [projetos, editais] = await Promise.all([
          fetchProjetos(),
          fetchEditais()
        ]);

        setProjects(projetos);
        setEditaisList(editais);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      }
    }

    loadData();
  }, []);

    const handleExport = () => {
        const projetosFiltrados =
            selectedEdital === ''
            ? projects
            : projects.filter(p => p.edital === selectedEdital);

        if (!projetosFiltrados.length) {
            setShowModal(true);
            return;
        }

        exportProjetos(
            projetosFiltrados,
            (idEdital: string) => {
            const edital = editaisList.find(e => e.id === idEdital);
            return edital?.nomeEdital ?? '';
            }
        );
    };


    const handleExportClassificados = () => {
    if (!selectedEdital) {
        alert('Selecione um edital.');
        return;
    }

    const editalSelecionado = editaisList.find(
        e => e.id === selectedEdital
    );

    if (!editalSelecionado) {
        alert('Edital não encontrado.');
        return;
    }

    exportClassificacaoProjetos(
        editalSelecionado,
        projects
    );
    };


    return (
        <div className="home-project-list-container">
            <h2>Projetos de Extensão</h2>
            <div className="buttons-container">
                <Button 
                    to="/projetos/cadastrar" 
                    text="Novo Projeto"
                />
                <Button 
                    onClick={handleExportClassificados}
                    text="Classificação"
                />
            </div>
            <div className="filter-container">
                <SelectInput
                    label="Edital"
                    name="editalSelect"
                    value={selectedEdital}
                    onChange={(e) => setSelectedEdital(e.target.value)}
                    options={editaisList.map((edital) => ({
                        label: edital.nomeEdital,
                        value: edital.id
                    }))}
                />
            </div>
                <p className='bold'>Para extrair uma planilha com os projetos, 
                    selecione o edital e clique no botão, caso não seja selecionado um edital, 
                    será extraido os dados de todos os projetos.
                </p>
            <div className="filter-container">
                <Button 
                    text='Extrair dados'
                    onClick={handleExport}
                />
            </div>

            <div className="projects-list">
                {projects.filter(
                    project => selectedEdital === '' || project.edital === selectedEdital
                    ).map(project => (
                        <div key={project.id} className="project-item">
                            <Link to={`/projetos/${project.id}`}>
                                <div className='info-card'> 
                                    <h5>{project.nomeProjeto}</h5>
                                    <h5>{project.nomeCoordenador}</h5>
                                    <h5>{project.areaTematica}</h5>
                                    <h5>{project.ano}</h5>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
            <Modal
                isOpen={showModal}
                title="Nenhum projeto encontrado!"
                message="Cadastrar um novo projeto."
                onClose={() => setShowModal(false)}
                onAfterClose={() => navigate("/projetos/cadastrar")}
            />
        </div>
    );
};

export default ProjectList;