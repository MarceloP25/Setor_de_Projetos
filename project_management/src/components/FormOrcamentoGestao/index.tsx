import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/config';
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore';

import SelectInput from '../SelectInput';
import InputNumber from '../InputNumber';
import { Modal } from '../Modal';

import type { Edital } from '../../interfaces/Edital';
import type { Projeto } from '../../interfaces/Projeto';

import './styles.css';

type ProjetoDistribuicao = Projeto & {
  valorDistribuir: number; // variável intermediária (UX)
};

function FormOrcamentoGestao() {
  const navigate = useNavigate();

  const [editaisList, setEditaisList] = useState<Edital[]>([]);
  const [projects, setProjects] = useState<ProjetoDistribuicao[]>([]);
  const [selectedEdital, setSelectedEdital] = useState('');

  const [saldoDistribuicao, setSaldoDistribuicao] = useState(0);

  const [showModal, setShowModal] = useState(false);


  /* =========================
     CARREGAMENTO INICIAL
  ========================= */

  useEffect(() => {
    const fetchData = async () => {
      const projetosSnap = await getDocs(collection(db, 'projetos'));
      const editaisSnap = await getDocs(collection(db, 'editais'));

      const projetos = projetosSnap.docs.map(doc => {
        const data = doc.data() as Projeto;

        return {
          ...data,
          id: doc.id,
          // começa com o valor já persistido
          valorDistribuir: data.valorDisponibilizado || 0
        };
      });

      const editais = editaisSnap.docs.map(doc => ({
        ...(doc.data() as Edital),
        id: doc.id
      }));

      setProjects(projetos);
      setEditaisList(editais);
    };

    fetchData();
  }, []);

  /* =========================
     TROCA DE EDITAL
  ========================= */

  useEffect(() => {
    if (!selectedEdital) {
      setSaldoDistribuicao(0);
      return;
    }

    const edital = editaisList.find(e => e.id === selectedEdital);
    if (!edital) return;

    // saldo real, ponto final
    setSaldoDistribuicao(Number(edital.valorDisponivel) || 0);
  }, [selectedEdital, editaisList]);


  /* =========================
     ALTERAÇÃO DE VALOR (REVERSÍVEL)
  ========================= */

  const handleValorChange = (projectId: string, novoValor: number) => {
    setProjects(prev => {
      let delta = 0;

      const atualizados = prev.map(p => {
        if (p.id !== projectId) return p;

        const anterior = p.valorDistribuir || 0;
        const limitado = Math.min(Math.max(novoValor, 0), p.valorSolicitado);

        delta = limitado - anterior;

        return { ...p, valorDistribuir: limitado };
      });

      if (saldoDistribuicao - delta < 0) return prev;

      const novoSaldo = saldoDistribuicao - delta;
      setSaldoDistribuicao(novoSaldo);

      return atualizados;
    });
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEdital) return;

    try {
      // atualiza projetos
      const projetosDoEdital = projects.filter(
        p => p.edital === selectedEdital && (p.notaEtapa2 ?? 0) >= 6
      );

      for (const projeto of projetosDoEdital) {
        await updateDoc(doc(db, 'projetos', projeto.id), {
          valorDisponibilizado: projeto.valorDistribuir,
          alteradoEm: new Date().toISOString()
        });
      }

      // atualiza edital
      await updateDoc(doc(db, 'editais', selectedEdital), {
        valorDisponivel: saldoDistribuicao,
        alteradoEm: new Date().toISOString()
      });

      setShowModal(true);
    } catch (error) {
      alert('Erro ao salvar distribuição');
      console.error(error);
    }
  };

  /* =========================
     RENDER
  ========================= */

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
            <h4 style={{ color: saldoDistribuicao === 0 ? 'red' : 'inherit' }}>
              Saldo disponível: R$ {saldoDistribuicao.toLocaleString('pt-BR')}
            </h4>
          </>
        )}

        <div className="projects-list">
          {projects.filter(
                p =>
                  p.edital === selectedEdital &&
                  (p.notaEtapa2 ?? 0) >= 6
              ).map(project => (
              <div key={project.id} className="project-item">
                <div className="info-card">
                  <h5>{project.nomeProjeto}</h5>
                  <h5>Nota: {project.notaEtapa2}</h5>
                  <h5>
                    Solicitado: R$ {project.valorSolicitado}
                  </h5>
                  <h5>
                    Disponibilizado: R$ {project.valorDisponibilizado || 0}
                  </h5>
                </div>

                <InputNumber
                  label="Valor disponibilizado"
                  type="number"
                  min={0}
                  max={project.valorSolicitado}
                  value={project.valorDistribuir}
                  onChange={e =>
                    handleValorChange(
                      project.id,
                      Number(e.target.value)
                    )
                  }
                />
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
