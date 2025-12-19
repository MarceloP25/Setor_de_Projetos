import React, { useState, useEffect } from 'react';
import { fetchEditais } from '../../services/views/fetchEditais';
import { Link } from 'react-router-dom';
import './styles.css';
import type { Edital } from '../../interfaces/Edital';
import SelectInput from '../SelectInput';
import {Modal} from '../Modal';
import { useNavigate } from 'react-router-dom';
import { exportEditais } from '../../utils/excel/exportEditais';
import Button from '../Button';


const EditalList: React.FC = () => {
    const [editais, setEditais] = useState<Edital[]>([]);
    const [selectedAno, setSelectedAno] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

     useEffect(() => {
    async function loadData() {
      try {
        const [ editais] = await Promise.all([
          fetchEditais()
        ]);
        setEditais(editais);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      }
    }

    loadData();
  }, []);

    const handleExport = () => {
          const editaisFiltrados =
            selectedAno === ''
            ? editais
            : editais.filter(e => e.anoVigente === selectedAno);

        if (!editaisFiltrados.length) {
            setShowModal(true);
            return;
        }

        exportEditais(editaisFiltrados);
      };

    return (
        <div className="home-edital-list-container">
            <h2>Editais de Extensão</h2>
            <div className="buttons-container">
                <Button 
                    to="/edital/cadastrar"
                    text='Novo edital'
                />
                <Button 
                    text='Extrair dados'
                    onClick={handleExport}
                />
            </div>
            <div className="filter-container">
                <SelectInput
                    label="Ano"
                    name="anoSelect"
                    value={selectedAno}
                    onChange={(e) => setSelectedAno(e.target.value)}
                    options={[...editais.map(edital => edital.anoVigente)]}
                />
            </div>
                <p className='bold'>Para extrair uma planilha com os editais, 
                    selecione o ano e clique no botão, caso não seja selecionado um ano, 
                    será extraido os dados de todos os editais.
                </p>

            <div className="projects-list">
                {editais.filter(
                    edital => selectedAno === '' || edital.anoVigente === selectedAno
                ).map(edital => (
                    <div key={edital.id} className="project-item">
                        <Link to={`/edital/${edital.id}`}>
                            <div className='info-card'>
                                <h4>{edital.nomeEdital}</h4>
                                <h4>{edital.status}</h4>
                                <h4>{edital.anoVigente}</h4>
                            </div>
                        </Link>
                        </div>
                    ))
                }
            </div>
            <Modal
                isOpen={showModal}
                title="Nenhum edital encontrado!"
                message="Cadastrar um novo edital."
                onClose={() => setShowModal(false)}
                onAfterClose={() => navigate("/edital/cadastrar")}
            />
        </div>
    );
};

export default EditalList;