import React, { useEffect, useMemo, useState } from 'react';
import type { Projeto } from '../../interfaces/Projeto';
import type { Edital } from '../../interfaces/Edital';
import type { Membro } from '../../interfaces/Membro';
import { fetchProjetos } from '../../services/views/fetchProjetos';
import { fetchEditais } from '../../services/views/fetchEditais';
import { fetchMembros } from '../../services/views/fetchMembros';
import { exportMembros } from '../../utils/excel/exportMembros';
import SelectInput from '../SelectInput';
import Button from '../Button';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../Modal';

const HomeMembros: React.FC = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [editais, setEditais] = useState<Edital[]>([]);
  const [membros, setMembros] = useState<Membro[]>([]);

  const [selectedEdital, setSelectedEdital] = useState('');
  const [selectedProjeto, setSelectedProjeto] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();


  useEffect(() => {
    async function loadData() {
      const [projetosData, editaisData, membrosData] = await Promise.all([
        fetchProjetos(),
        fetchEditais(),
        fetchMembros()
      ]);

      setProjetos(projetosData);
      setEditais(editaisData);
      setMembros(membrosData);
    }

    loadData();
  }, []);

  /* ================== FILTROS ================== */

  const projetosFiltradosPorEdital = useMemo(() => {
    if (!selectedEdital) return projetos;
    return projetos.filter(p => p.edital === selectedEdital);
  }, [projetos, selectedEdital]);

  const membrosFiltrados = useMemo(() => {
    let lista = membros;

    if (selectedEdital) {
      const projetosDoEdital = projetos
        .filter(p => p.edital === selectedEdital)
        .map(p => p.id);

      lista = lista.filter(m =>
        m.projetoVinculado.some(id => projetosDoEdital.includes(id))
      );
    }

    if (selectedProjeto) {
      lista = lista.filter(m =>
        m.projetoVinculado.includes(selectedProjeto)
      );
    }

    return lista;
  }, [membros, projetos, selectedEdital, selectedProjeto]);


    const handleExport = () => {
    if (membrosFiltrados.length === 0) {
        setShowModal(true);
        return;
    }

    let nomeArquivo = 'membros';

    if (selectedEdital && selectedProjeto) {
        nomeArquivo = `membros_projeto_${selectedProjeto}`;
    } else if (selectedEdital) {
        nomeArquivo = `membros_edital_${selectedEdital}`;
    }

    exportMembros(membrosFiltrados, nomeArquivo);
    };


  return (
    <div className="home-membros-list-container">
      <h2>Membros de Projetos de Extensão</h2>

        <div className="buttons-container">
            <Button
                text="Extrair Dados"
                onClick={handleExport}
            />
        </div>

        <div className="filter-container">
            <SelectInput
                label="Edital"
                name='editalSelect'
                value={selectedEdital}
                onChange={e => {
                    setSelectedEdital(e.target.value);
                    setSelectedProjeto('');
                } }
                options={editais.map(e => ({
                    label: e.nomeEdital,
                    value: e.id
                }))}
            />
        </div>
        <div className="filter-container">
            {selectedEdital && (
                <SelectInput
                    label="Projeto"
                    name='projectSelect'
                    value={selectedProjeto}
                    onChange={e => setSelectedProjeto(e.target.value)}
                    options={projetosFiltradosPorEdital.map(p => ({
                    label: p.nomeProjeto,
                    value: p.id
                    }))}
                />
                )}
        </div>

      <div className="list-container">
        {membrosFiltrados.map(membro => (
          <div key={membro.id} className="list-item">
            <div className="info-card">
                <h5>{membro.nome}</h5>
                <h5>{membro.tipoVinculo}</h5>
                <h5>{membro.curso}</h5>
            </div>
          </div>
        ))}

        {membrosFiltrados.length === 0 && (
          <p className="empty">Nenhum membro encontrado.</p>
        )}
      </div>
    <Modal
        isOpen={showModal}
        title="Nenhum membro encontrado!"
        message="Não há membros para exportar com os filtros selecionados."
        onClose={() => setShowModal(false)}
        onAfterClose={() => navigate("/membros")}
    />
    </div>
  );
};

export default HomeMembros;
