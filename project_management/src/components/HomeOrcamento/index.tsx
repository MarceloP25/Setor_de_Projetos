import React, { useState, useEffect } from 'react';
import type { Projeto } from '../../interfaces/Projeto';
import { fetchProjetos } from '../../services/views/fetchProjetos';
import { fetchEditais } from '../../services/views/fetchEditais';
import './styles.css';
import SelectInput from '../SelectInput';
import Button from '../Button';
import { exportOrcamento } from '../../utils/excel/exportOrcamento';


const HomeOrcamento: React.FC = () => {
    const [projects, setProjects] = useState<Projeto[]>([]);
    const [editaisList, setEditaisList] = useState<any[]>([]);
    const [selectedEdital, setSelectedEdital] = useState<string>('');


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
        if (!selectedEdital) return;

        const editalSelecionado = editaisList.find(
        edital => edital.id === selectedEdital
        );

        if (!editalSelecionado) return;

        const projetosDoEdital = projects.filter(
        projeto => projeto.edital === selectedEdital
        );

        exportOrcamento(
        projetosDoEdital,
        editalSelecionado.nomeEdital
        );
  }

    return (
        <div className="home-project-list-container">
            <h2>Orçamento da Extensão</h2>
            <div className="buttons-container">
                <Button to="/orcamento/gestao" 
                    text="Distribuir Orçamento"
                />
                <Button
                text="Extrair Relatório"
                onClick={handleExport}
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

            <div className="projects-list">
                {projects.filter(
                    project => selectedEdital === '' || project.edital === selectedEdital
                    ).map(project => (
                        <div key={project.id} className="project-item">
                                <div className='info-card'> 
                                    <h5>{project.nomeProjeto}</h5>
                                    <h5> Solicitado: R${project.valorSolicitado}</h5>
                                    <h5> Disponibilizado: R${project.valorDisponibilizado}</h5>
                                    <h5> Total das bolsas: R${project.valorTotalBolsas}</h5>
                                </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default HomeOrcamento;