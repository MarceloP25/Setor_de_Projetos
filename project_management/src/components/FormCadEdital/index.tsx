import React, { useState } from 'react';
import { db } from '../../services/config'; 
import { doc, setDoc, collection } from 'firebase/firestore';
import InputText from '../InputText';
import type { Edital } from '../../interfaces/Edital';

import './styles.css';

function FormCadEdital()  {
  const [formData, setFormData] = useState<Edital>({
    id: '',
    nomeEdital: '',

    orcamentoEdital: '',
    valorDisponivel: '',
    status: true,

    projetosVinculados: [],

    anoVigente: '',
    dataInicio: '',
    dataFim: '',

    dataInicioSubmissao: '',
    dataFimSubmissao: '',

    dataInicioDocumentos: '',
    dataFimDocumentos: '',

    dataInicioRecurso: '',
    dataFimRecurso: '',

    dataInicioAvaliacao: '',
    dataFimAvaliacao: '',

    dataInicioEnvioRelatorioMensal: '',
    dataFimEnvioRelatorioMensal: '',

    dataInicioEnvioRelatorioFinal: '',
    dataFimEnvioRelatorioFinal: '',

    dataPagamentoInicio: '',
    dataPagamentoFim: '',

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
    const editalId = formData.id || crypto.randomUUID();
    const editalRef = doc(collection(db, 'editais'), editalId);
    const agora = new Date().toISOString();

    await setDoc(editalRef, {
      ...formData,
      nomeEdital: formData.nomeEdital.trim(), // remove espaços extras
      id: editalId,
      criadoEm: formData.criadoEm || agora,
      alteradoEm: agora,
    });

    alert('Edital cadastrado com sucesso!');

    // Reset do formulário
    setFormData({
      id: '',
      nomeEdital: '',
      orcamentoEdital: '',
      valorDisponivel: '',
      status: true,
      projetosVinculados: [],
      anoVigente: '',
      dataInicio: '',
      dataFim: '',
      dataInicioSubmissao: '',
      dataFimSubmissao: '',
      dataInicioDocumentos: '',
      dataFimDocumentos: '',
      dataInicioRecurso: '',
      dataFimRecurso: '',
      dataInicioAvaliacao: '',
      dataFimAvaliacao: '',
      dataInicioEnvioRelatorioMensal: '',
      dataFimEnvioRelatorioMensal: '',
      dataInicioEnvioRelatorioFinal: '',
      dataFimEnvioRelatorioFinal: '',
      dataPagamentoInicio: '',
      dataPagamentoFim: '',
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
                <InputText
                  label="Nome do Edital"
                  type="text"
                  name="nomeEdital"
                  value={formData.nomeEdital}
                  onChange={handleChange}
                  placeholder="Nome do Edital"
                />
            </div>
            <div className="form-row">
                <InputText
                  label="Orçamento do Edital"
                  type="text"
                  name="orcamentoEdital"
                  value={formData.orcamentoEdital}
                  onChange={handleChange}
                  placeholder="Orçamento do Edital"
                />
            </div>
            <div className="form-row">
                <InputText
                  label="Orçamento Disponibilizado"
                  type="text"
                  name="valorDisponivel"
                  value={formData.valorDisponivel || ''}
                  onChange={handleChange}
                  placeholder="Orçamento Disponibilizado"
                />
            </div>
            <div className="form-row">
              <div className="form-col">
                <InputText
                  label="Ano de Vigência"
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
                
                <InputText
                  label="Período de Vigência"
                  type="date"
                  name="dataInicio"
                  value={formData.dataInicio}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
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
                
                <InputText
                  label="Período de Submissão"
                  type="date"
                  name="dataInicioSubmissao"
                  value={formData.dataInicioSubmissao}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
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
                
                <InputText
                  label="Período de Envio de Documentos"
                  type="date"
                  name="dataInicioDocumentos"
                  value={formData.dataInicioDocumentos}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
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
                
                <InputText
                  label="Período de Recurso"
                  type="date"
                  name="dataInicioRecurso"
                  value={formData.dataInicioRecurso}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
                  type="date"
                  name="dataFimRecurso"
                  value={formData.dataFimRecurso}
                  onChange={handleChange}
                  placeholder="Fim"
                />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="period-container">
                
                <InputText
                  label="Período de Avaliação"
                  type="date"
                  name="dataInicioAvaliacao"
                  value={formData.dataInicioAvaliacao}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
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
                
                <InputText
                  label="Período de Envio de Relatório Mensal"
                  type="text"
                  name="dataInicioEnvioRelatorioMensal"
                  value={formData.dataInicioEnvioRelatorioMensal}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
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
                
                <InputText
                  label="Período de Envio de Relatório Final"
                  type="text"
                  name="dataInicioEnvioRelatorioFinal"
                  value={formData.dataInicioEnvioRelatorioFinal}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
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
                
                <InputText
                  label="Período de Pagamento de Bolsas"
                  type="date"
                  name="dataPagamentoInicio"
                  value={formData.dataPagamentoInicio}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
                  type="date"
                  name="dataPagamentoFim"
                  value={formData.dataPagamentoFim}
                  onChange={handleChange}
                  placeholder="Fim"
                />
                </div>
              </div>
            </div>

            <div className="form-row">
                <InputText
                  label="Link de Acesso ao Edital"
                  type="text"
                  name="linkAcessoEdital"
                  value={formData.linkAcessoEdital}
                  onChange={handleChange}
                  placeholder="Link de Acesso ao Edital"
                />
            </div>
            <div className="form-note">
              <p>Antes de finalizar a operação, revise todo o documento.</p>
            </div>
            <button className="submit-button" type="submit">CADASTRAR</button>
          </form>
        </div>
  );
};


export default FormCadEdital;