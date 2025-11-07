import React, { useState, useEffect } from 'react';
import { db } from '../../services/config'
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './styles.css';
import type { Edital } from '../../interfaces/Edital';
import SelectInput from '../SelectInput';


const EditalList: React.FC = () => {
    const [editais, setEditais] = useState<Edital[]>([]);
    const [selectedAno, setSelectedAno] = useState<string>('');


    useEffect(() => {
        const fetchEditais = async () => {
            try {
              const editaisRef = collection(db, "editais");
              const querySnapshot = await getDocs(editaisRef);
              const editais = querySnapshot.docs.map(doc => ({
                id: doc.data().id,
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
              setEditais(editais);
            } catch (error) {
              console.error("Erro ao buscar editais:", error);
            }
          };
        fetchEditais();
    }, []);

    return (
        <div className="container">
            <h2>Editais de Extensão</h2>
            <div className="buttons-container">
                <Link to="/edital/cadastrar" className="btn primary">
                    Novo Edital
                </Link>
                <Link to="/edital/dados" className="btn primary">
                    Extrair Dados
                </Link>
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
        </div>
    );
};

export default EditalList;