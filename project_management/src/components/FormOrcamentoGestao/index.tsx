import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

import SelectInput from '../SelectInput';
import InputNumber from '../InputNumber';
import { Modal } from '../Modal';

import type { Edital } from '../../interfaces/Edital';
import type { Projeto } from '../../interfaces/Projeto';

import './styles.css';

type ProjetoDistribuicao = Projeto & {
  valorDistribuir: number;
};

function FormOrcamentoGestao() {
  const navigate = useNavigate();

  const [editaisList, setEditaisList] = useState<Edital[]>([]);
  const [projects, setProjects] = useState<ProjetoDistribuicao[]>([]);
  const [selectedEdital, setSelectedEdital] = useState('');

  const [valorDisponivelOriginalEdital, setValorDisponivelOriginalEdital] = useState(0);
  const [saldoDistribuicao, setSaldoDistribuicao] = useState(0);

  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      const projetosSnap = await getDocs(collection(db, 'projetos'));
      const editaisSnap = await getDocs(collection(db, 'editais'));

      const projetos = projetosSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        valorDistribuir: 0
      })) as ProjetoDistribuicao[];

      const editais = editaisSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Edital[];

      setProjects(projetos);
      setEditaisList(editais);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedEdital) {
      setValorDisponivelOriginalEdital(0);
      setSaldoDistribuicao(0);
      return;
    }

    const edital = editaisList.find(e => e.id === selectedEdital);
    if (!edital) return;

    const valorBase = Number(edital.valorDisponivel) || 0;

    setValorDisponivelOriginalEdital(valorBase);
    setSaldoDistribuicao(valorBase);

    setProjects(prev =>
      prev.map(p =>
        p.edital === selectedEdital
          ? { ...p, valorDistribuir: 0 }
          : p
      )
    );
  }, [selectedEdital, editaisList]);



  const handleValorChange = (projectId: string, value: number) => {
    setProjects(prev => {
      const atualizados = prev.map(p =>
        p.id === projectId
          ? { ...p, valorDistribuir: value }
          : p
      );

      const totalDistribuido = atualizados
        .filter(p => p.edital === selectedEdital)
        .reduce((acc, p) => acc + (p.valorDistribuir || 0), 0);

      const novoSaldo = valorDisponivelOriginalEdital - totalDistribuido;
      setSaldoDistribuicao(novoSaldo > 0 ? novoSaldo : 0);

      return atualizados;
    });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projetosDoEdital = projects.filter(
      p => p.edital === selectedEdital && p.valorDistribuir > 0
    );

    try {
      for (const projeto of projetosDoEdital) {
        await updateDoc(doc(db, 'projetos', projeto.id), {
          valorDisponibilizado: projeto.valorDistribuir,
          alteradoEm: new Date().toISOString()
        });
      }

      setShowModal(true);
    } catch (error) {
      alert('Erro ao salvar distribuição');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">Gestão do Orçamento do Edital</div>

      <form onSubmit={handleSubmit}>
        <button className="submit-button" type="submit">
          CONFIRMAR
        </button>

        <div className="form-row">
          <div className="form-col">
            <h3>Selecione o Edital</h3>
            <SelectInput
              name="editalSelect"
              value={selectedEdital}
              onChange={e => setSelectedEdital(e.target.value)}
              options={editaisList.map(edital => ({
                label: edital.nomeEdital,
                value: edital.id
              }))}
            />
          </div>
        </div>

        {selectedEdital && (
          <>
            <h4>
              Valor base do edital:{' '}
              R$ {valorDisponivelOriginalEdital.toLocaleString('pt-BR')}
            </h4>
            <h4 style={{ color: saldoDistribuicao === 0 ? 'red' : 'inherit' }}>
              Saldo disponível:{' '}
              R$ {saldoDistribuicao.toLocaleString('pt-BR')}
            </h4>
          </>
        )}

        <div className="projects-list">
          {projects
            .filter(p => p.edital === selectedEdital)
            .map(project => (
              <div key={project.id} className="project-item">
                <div className="info-card">
                  <h5>{project.nomeProjeto}</h5>
                  <h5>Nota: {project.notaEtapa2}</h5>
                  <h5>
                    Solicitado: R${project.valorSolicitado} / Atual: R$
                    {project.valorDisponibilizado}
                  </h5>
                </div>

                <div className="input-group">
                  <InputNumber
                    label="Valor a distribuir"
                    type="number"
                    min={0}
                    max={project.valorSolicitado}
                    value={project.valorDistribuir}
                    disabled={
                      saldoDistribuicao <= 0 &&
                      project.valorDistribuir === 0
                    }
                    onChange={e =>
                      handleValorChange(
                        project.id,
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            ))}
        </div>
      </form>

      <Modal
        isOpen={showModal}
        title="Distribuição concluída"
        message="Os valores foram salvos com sucesso."
        onClose={() => setShowModal(false)}
        onAfterClose={() => navigate('/orcamento')}
      />
    </div>
  );
}

export default FormOrcamentoGestao;
