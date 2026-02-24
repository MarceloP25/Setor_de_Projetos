import React, { useState } from 'react';
import { db } from '../../services/config'; 
import { doc, setDoc, collection } from 'firebase/firestore';
import InputText from '../InputText';
import type { Edital } from '../../interfaces/Edital';

import './styles.css';
import { Modal } from '../Modal';
import { useNavigate } from 'react-router-dom';
import InputNumber from '../InputNumber';
import { logAction } from '../../utils/LogAction';
import { useAuth } from '../../contexts/AuthContext';

function FormCadEdital()  {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return;

  const [formData, setFormData] = useState<Edital>({
    id: '',
    nomeEdital: '',
    numeroProcessoEdital: '',

    orcamentoEdital: 0,
    valorDisponivel: 0,
    status: true,

    projetosVinculados: [],

    anoVigente: '',
    dataInicio: '',
    dataFim: '',

    dataInicioSubmissao: '',
    dataFimSubmissao: '',

    dataInicioDocumentos: '',
    dataFimDocumentos: '',

    dataInicioRecursoSubimissao: '',
    dataFimRecursoSubimissao: '',

    dataInicioAvaliacao: '',
    dataFimAvaliacao: '',

    dataInicioRecursoAvaliacao: '',
    dataFimRecursoAvaliacao: '',

    dataInicioEnvioRelatorioMensal: 0,
    dataFimEnvioRelatorioMensal: 0,

    dataInicioEnvioRelatorioFinal: '',
    dataFimEnvioRelatorioFinal: '',

    dataPagamentoInicio: 0,
    dataPagamentoFim: 0,

    linkAcessoEdital: '',

    criadoEm: '',
    criadoPor: '',
    alteradoEm: '',
    alteradoPor: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const obrigatorios = [
      'nomeEdital',
      'numeroProcessoEdital',
      'orcamentoEdital',
      'anoVigente',
      'dataInicio',
      'dataFim',
      'linkAcessoEdital',
    ];

    for (const campo of obrigatorios) {
      if (!formData[campo as keyof Edital]) {
        alert(`O campo "${campo}" é obrigatório.`);
        return false;
      }
    }
    return true;
  };


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!validateForm()) return;

  // Verifica se o nome do edital contém "/"
  if (formData.nomeEdital.includes('/')) {
    alert('O nome do edital não pode conter "/" (barra). Use outro caractere, como "-".');
    return;
  }

  try {
    const editalId = crypto.randomUUID();

    await setDoc(doc(collection(db, 'editais'), editalId), {
      ...formData,
      nomeEdital: formData.nomeEdital.trim(), // remove espaços extras
      id: editalId,
      criadoEm: new Date().toISOString(),
      criadoPor: user.nome,
      alteradoEm: new Date().toISOString()
    });

    await logAction({
      user,
      action: 'Criação de Edital',
      objectType: 'Edital',
      objectId: editalId + ' - ' + formData.nomeEdital
    });

    setShowModal(true);

    // Reset do formulário
    setFormData({
      id: '',
      nomeEdital: '',
      numeroProcessoEdital: '',
      orcamentoEdital: 0,
      valorDisponivel: 0,
      status: true,
      projetosVinculados: [],
      anoVigente: '',
      dataInicio: '',
      dataFim: '',
      dataInicioSubmissao: '',
      dataFimSubmissao: '',
      dataInicioDocumentos: '',
      dataFimDocumentos: '',
      dataInicioRecursoSubimissao: '',
      dataFimRecursoSubimissao: '',
      dataInicioAvaliacao: '',
      dataFimAvaliacao: '',
      dataInicioRecursoAvaliacao: '',
      dataFimRecursoAvaliacao: '',
      dataInicioEnvioRelatorioMensal: 0,
      dataFimEnvioRelatorioMensal: 0,
      dataInicioEnvioRelatorioFinal: '',
      dataFimEnvioRelatorioFinal: '',
      dataPagamentoInicio: 0,
      dataPagamentoFim: 0,
      linkAcessoEdital: '',
      criadoEm: '',
      criadoPor: '',
      alteradoEm: '',
      alteradoPor: '',
    });
  } catch (error) {
    console.error('Erro ao cadastrar edital:', error);
    alert('Erro ao cadastrar o edital.');
  }
};



  return (
        <div className="form-container">
          <div className="form-title">Cadastro de Edital</div>
          <form onSubmit={handleSubmit}>

            <div className="form-row">
              <div className="form-col">
                <h3>Nome do Edital</h3>
                <InputText
                  type="text"
                  name="nomeEdital"
                  value={formData.nomeEdital}
                  onChange={handleChange}
                  placeholder="Nome do Edital"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <h3>Número do Processo do Edital</h3>
                <InputText
                  type="text"
                  name="numeroProcessoEdital"
                  value={formData.numeroProcessoEdital}
                  onChange={handleChange}
                  placeholder="Número do Processo do Edital"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <h3>Orçamento do Edital</h3>
                <InputNumber
                  label='Orçamento presente no edital no momento de sua divulgação'
                  type="number"
                  name="orcamentoEdital"
                  value={formData.orcamentoEdital}
                  onChange={handleChange}
                  placeholder="R$"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <h3>Orçamento Disponibilizado</h3>
                <InputNumber
                  label="Orçamento fornecido a partir do repasse para a instituição"
                  type="number"
                  name="valorDisponivel"
                  value={formData.valorDisponivel || 0}
                  onChange={handleChange}
                  placeholder="R$"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <h3>Ano Vigente do Edital</h3>
                <InputText
                  type="text"
                  name="anoVigente"
                  value={formData.anoVigente}
                  onChange={handleChange} 
                  placeholder="Ano"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="period-container">
                <h3>Período de Vigência do Edital</h3>

                <InputText
                  label="Início da Vigência"
                  type="date"
                  name="dataInicio"
                  value={formData.dataInicio}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
                  label="Fim da Vigência"
                  type="date"
                  name="dataFim"
                  value={formData.dataFim}
                  onChange={handleChange}
                  placeholder="Fim"
                />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="period-container">
                <h3>Período de Submissão de Projetos</h3>
                <InputText
                  label="Início da Submissão de Projetos"
                  type="date"
                  name="dataInicioSubmissao"
                  value={formData.dataInicioSubmissao}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
                  label="Fim da Submissão de Projetos"
                  type="date"
                  name="dataFimSubmissao"
                  value={formData.dataFimSubmissao}
                  onChange={handleChange}
                  placeholder="Fim"
                />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="period-container">
                <h3>Período de Envio de Documentos (1 etapa)</h3>
                <InputText
                  label="Início do Envio de Documentos"
                  type="date"
                  name="dataInicioDocumentos"
                  value={formData.dataInicioDocumentos}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
                  label="Fim do Envio de Documentos"
                  type="date"
                  name="dataFimDocumentos"
                  value={formData.dataFimDocumentos}
                  onChange={handleChange}
                  placeholder="Fim"
                />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="period-container">
                <h3>Período de Recurso da Submissão (1 etapa)</h3>
                <InputText
                  label="Início do Período de Recurso"
                  type="date"
                  name="dataInicioRecursoSubimissao"
                  value={formData.dataInicioRecursoSubimissao}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
                  label="Fim do Período de Recurso"
                  type="date"
                  name="dataFimRecursoSubimissao"
                  value={formData.dataFimRecursoSubimissao}
                  onChange={handleChange}
                  placeholder="Fim"
                />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="period-container">
                <h3>Período de Avaliação (2 etapa)</h3>
                <InputText
                  label="Início do Período de Avaliação"
                  type="date"
                  name="dataInicioAvaliacao"
                  value={formData.dataInicioAvaliacao}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
                  label="Fim do Período de Avaliação"
                  type="date"
                  name="dataFimAvaliacao"
                  value={formData.dataFimAvaliacao}
                  onChange={handleChange}
                  placeholder="Fim"
                />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="period-container">  
                <h3>Período de Recurso da Avaliação (2 etapa)</h3>
                <InputText
                  label="Início do Período de Recurso da Avaliação"
                  type="date"
                  name="dataInicioRecursoAvaliacao"
                  value={formData.dataInicioRecursoAvaliacao}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
                  label="Fim do Período de Recurso da Avaliação"
                  type="date"
                  name="dataFimRecursoAvaliacao"
                  value={formData.dataFimRecursoAvaliacao}
                  onChange={handleChange}
                  placeholder="Fim"
                />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="period-container">
                <h3>Período de Envio de Relatório Mensal (Ficha de Frequência)</h3>
                <InputNumber
                  label="Início do Envio"
                  type="text"
                  name="dataInicioEnvioRelatorioMensal"
                  value={formData.dataInicioEnvioRelatorioMensal}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputNumber
                  label="Fim do Envio"
                  type="text"
                  name="dataFimEnvioRelatorioMensal"
                  value={formData.dataFimEnvioRelatorioMensal}
                  onChange={handleChange}
                  placeholder="Fim"
                />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="period-container">
                <h3>Período de Envio de Relatório Final (ficha de Frequência)</h3>
                <InputText
                  label="Início do Envio"
                  type="text"
                  name="dataInicioEnvioRelatorioFinal"
                  value={formData.dataInicioEnvioRelatorioFinal}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
                  label="Fim do Envio"
                  type="text"
                  name="dataFimEnvioRelatorioFinal"
                  value={formData.dataFimEnvioRelatorioFinal}
                  onChange={handleChange}
                  placeholder="Fim"
                />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="period-container">
                <h3>Período de Pagamento de Bolsas (opicional)</h3>
                <InputNumber
                  label="Início do Pagamento de Bolsas"
                  type="text"
                  name="dataPagamentoInicio"
                  value={formData.dataPagamentoInicio}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputNumber
                  label="Fim do Pagamento de Bolsas"
                  type="text"
                  name="dataPagamentoFim"
                  value={formData.dataPagamentoFim}
                  onChange={handleChange}
                  placeholder="Fim"
                />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <h3>Link de Acesso ao Edital</h3>
                <InputText
                  label="Link de Acesso ao Edital no site do campus"
                  type="text"
                  name="linkAcessoEdital"
                  value={formData.linkAcessoEdital}
                  onChange={handleChange}
                  placeholder="Link de Acesso ao Edital"
                />
              </div>
            </div>
            <div className="form-note">
              <p>Antes de finalizar a operação, revise todo o documento.</p>
            </div>
            <button className="submit-button" type="submit">CADASTRAR</button>
          </form>
          {/* Modal de sucesso */}
          <Modal
              isOpen={showModal}
              title="🎉 Edital cadastrado com sucesso!"
              message="Os dados foram salvos no banco de dados."
              onClose={() => setShowModal(false)}
              onAfterClose={() => navigate("/edital")}
            />
        </div>
  );
};


export default FormCadEdital;