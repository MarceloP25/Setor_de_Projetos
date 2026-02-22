import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/config';
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

import InputText from '../InputText';
import InputNumber from '../InputNumber';
import SelectInput from '../SelectInput';
import { Modal } from '../Modal';

import type { Edital } from '../../interfaces/Edital';
import type { Projeto } from '../../interfaces/Projeto';

import { fetchEditais } from '../../services/views/fetchEditais';

import './styles.css';

const initialProjectState: Projeto = {
  id: '',
  edital: '',
  nomeProjeto: '',
  nomeDaAcao: '',
  codigoProjeto: '',

  ano: 0,
  periodoInicio: '',
  periodoFim: '',
  abrangencia: '',

  nomeCoordenador: '',
  emailCoordenador: '',
  nomeCoCoordenador: '',
  emailCoCoordenador: '',

  publicoInternoDescricao: '',
  publicoInternoQuantidade: 0,
  publicoExternoDescricao: '',
  publicoExternoQuantidade: 0,

  estado: '',
  municipio: '',
  bairro: '',
  espaco: '',

  valorSolicitado: 0,
  valorDisponibilizado: 0,

  tipoBolsa: [],
  quantidadeIndividualBolsas: [],
  valorUnitarioBolsa: [],
  valorBolsa: [],
  quantidade: 0,
  valorTotalBolsas: 0,

  areaTematica: '',
  linhaExtensao: '',

  detalhesAcao: '',
  documentosAnexados: [],
  classificacaoDetalhe: '',

  statusEtapa1: '',
  notasAvaliadores: [0],
  comentariosAvaliadores: [''],
  notaEtapa2: 0,

  alunosParticipantes: [],
  relatorioProjeto: [],

  criadoEm: '',
  criadoPor: '',
  alteradoEm: '',
  alteradoPor: ''
};


function FormCadProjeto()  {
  const navigate = useNavigate();

  const [editaisList, setEditaisList] = useState<Edital[]>([]);
  const [formData, setFormData] = useState<Projeto>(initialProjectState);
  const [showModal, setShowModal] = useState(false);

  const [bolsaSelecionada, setBolsaSelecionada] = useState('');
  const [quantidadeBolsa, setQuantidadeBolsa] = useState<number>(0);

  const areaTematicaList = [
    'Comunicação', "Cultura", "Direitos Humanos e Justiça", 
    "Educação", "Meio Ambiente", "Saúde", 
    "Tecnologia e Produção", "Trabalho"
  ]; // criar constants pra isso depois


  const linhaExtensaoList = [
    "Alfabetizacao", "Comunicacao", "Desenvolvimento Rural",
    "Direitos", "Emprego e Renda", "Esporte e Lazer",
    "Formação de Professores", "Gestão Institucional",
    "Infância", "Jovens e Adultos", "Midia e Artes",
    "Organizações da Sociedade e Movimentos Sociais e Populares", "Propriedade Intelectual e Patente",
    "Resíduos Sólidos", "Saúde e Proteção no Trabalho", "Segurança Pública e Defesa Social",
    "Terceira Idade", "Desenvolvimento De Produtos", "Desenvolvimento Tecnológico",
    "Educacao Profissional", "Endemias e Epidemias", "Estilismo",
    "Gestão do Trabalho", "Gestão Pública", "Inovação Tecnológica",
    "Línguas Estrangeiras", "Mídias", "Patrimônio Cultural, Histórico e Natural",
    "Questões Ambientais", "Saúde Animal", "Saúde Humana", 
    "Tecnologia da Informação", "Uso de Drogas e Dependência Química", "Desenvolvimento Regional",
    "Desenvolvimento Urbano", "Empreendedorismo", "Divulgação Científica e Tecnológica",
    "Fármacos e Medicamentos", "Gestão Informacional", "Grupos Sociais Vulneráveis",
    "Jornalismo", "Metodologias e Estratégias de Ensino/Aprendizagem", "Música",
    "Pessoa com Deficiências, Incapacidades e Necessidades Especiais", "Recursos Hídricos", "Saúde da Família",
    "Segurança Alimentar e Nutricional", "Turismo<", "Desenvolvimento Humano"
  ]; // dentro de constants



  const bolsasList = [
    { tipo: 'SUP I (20h)', valorUnitario: 700 },
    { tipo: 'SUP II (10h)', valorUnitario: 350 },
    { tipo: 'BEXMED (10h)', valorUnitario: 375 },
    { tipo: 'BEXCOL (até 16h)', valorUnitario: 900 }
  ]; // constants


  const addBolsa = () => {
    if (!bolsaSelecionada || quantidadeBolsa <= 0) return;

    const bolsaInfo = bolsasList.find(b => b.tipo === bolsaSelecionada);
    if (!bolsaInfo) return;

    const valorUnitario = bolsaInfo.valorUnitario;
    const valorTotal = quantidadeBolsa * valorUnitario;

    setFormData(prev => {
      const tipoBolsa = [...prev.tipoBolsa, bolsaSelecionada];
      const quantidadeIndividualBolsas = [
        ...prev.quantidadeIndividualBolsas,
        quantidadeBolsa
      ];
      const valorUnitarioBolsa = [
        ...prev.valorUnitarioBolsa,
        valorUnitario
      ];
      const valorBolsa = [...prev.valorBolsa, valorTotal];

      const quantidade = quantidadeIndividualBolsas.reduce(
        (acc, q) => acc + q,
        0
      );

      const valorTotalBolsas = valorBolsa.reduce(
        (acc, v) => acc + v,
        0
      );

      return {
        ...prev,
        tipoBolsa,
        quantidadeIndividualBolsas,
        valorUnitarioBolsa,
        valorBolsa,
        quantidade,
        valorTotalBolsas
      };
    });

    // reset UX
    setBolsaSelecionada('');
    setQuantidadeBolsa(0);
  };

  const removerBolsa = (index: number) => {
    setFormData(prev => {
      const tipoBolsa = prev.tipoBolsa.filter((_, i) => i !== index);
      const quantidadeIndividualBolsas =
        prev.quantidadeIndividualBolsas.filter((_, i) => i !== index);
      const valorUnitarioBolsa =
        prev.valorUnitarioBolsa.filter((_, i) => i !== index);
      const valorBolsa =
        prev.valorBolsa.filter((_, i) => i !== index);

      const quantidade = quantidadeIndividualBolsas.reduce(
        (acc, q) => acc + q,
        0
      );
      
      const valorTotalBolsas = valorBolsa.reduce(
        (acc, v) => acc + v,
        0
      );
      
      return {
        ...prev,
        tipoBolsa,
        quantidadeIndividualBolsas,
        valorUnitarioBolsa,
        valorBolsa,
        quantidade,
        valorTotalBolsas
      };
    });
  };
  
  useEffect(() => {
    async function loadEditais() {
      try {
        const editais = await fetchEditais();
        setEditaisList(editais);
      } catch (error) {
        console.error('Erro ao carregar editais:', error);
      }
    }

    loadEditais();
  }, []);
  
const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData(prev => {
      if (name === 'valorSolicitado' || name === 'valorDisponibilizado') {
        return { ...prev, [name]: parseFloat(value) || 0 };
      }

      if (type === 'number') {
        return { ...prev, [name]: parseInt(value) || 0 };
      }

      return { ...prev, [name]: value };
    });
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      'edital',
      'nomeProjeto',
      'ano',
      'periodoInicio',
      'periodoFim',
      'nomeCoordenador',
      'emailCoordenador',
      'valorSolicitado',
      'areaTematica',
      'linhaExtensao'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof Projeto]) {
        alert(`O campo ${field} é obrigatório!`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const projetoId = crypto.randomUUID();

      await setDoc(doc(db, 'projetos', projetoId), {
        ...formData,
        nomeProjeto: formData.nomeProjeto.trim(),
        id: projetoId,
        criadoEm: new Date().toISOString(),
        alteradoEm: new Date().toISOString()
      });

      await updateDoc(doc(db, 'editais', formData.edital), {
        projetosVinculados: arrayUnion(projetoId)
      });

      setShowModal(true);
      setFormData(initialProjectState);
    } catch (error) {
      alert('Erro ao cadastrar projeto: ' + (error as Error).message);
    }
  };
  
  return (
        <div className="form-container">
          <div className="form-title">Cadastro de Projeto</div>
          <form onSubmit={handleSubmit}>

            <div className="form-row">
              <div className="form-col">
              <h3>Selecione o Edital</h3>
              <p>{formData.edital}</p>
              <SelectInput
                name="edital"
                value={formData.edital}
                onChange={handleChange}
                options={editaisList.map((edital) => ({
                  label: edital.nomeEdital,
                  value: edital.id
                }))}
              />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <h3>Código do Projeto</h3>
                <InputText  
                  label="Código do Projeto (opcional neste momento)"
                  type="text"
                  name="codigoProjeto"
                  value={formData.codigoProjeto}
                  onChange={handleChange}
                  placeholder="Código do Projeto"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <h3>Nome do Projeto</h3>
                <InputText
                  label="Nome simplificado do projeto"
                  type="text"
                  name="nomeProjeto"
                  value={formData.nomeProjeto}
                  onChange={handleChange}
                  placeholder="Nome do Projeto"
                />
                </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <h3>Nome da Ação</h3>
                <InputText
                  label="Nome do projeto presente no SIGAA"
                  type="text"
                  name="nomeDaAcao"
                  value={formData.nomeDaAcao}
                  onChange={handleChange}
                  placeholder="Nome da Ação"
                />
                </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <h3>Vigência do Projeto</h3>
                <InputNumber
                  label="Ano de realização do projeto, geralmente a mesma do edital"
                  type="text"
                  name="ano"
                  value={formData.ano}
                  onChange={handleChange} 
                  placeholder="Ano"

                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="period-container">
                <h3>Período de realização do projeto</h3>
                <InputText
                  label="Início do projeto"
                  type="date"
                  name="periodoInicio"
                  value={formData.periodoInicio}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
                  label="Fim do projeto"
                  type="date"
                  name="periodoFim"
                  value={formData.periodoFim}
                  onChange={handleChange}
                  placeholder="Fim"
                />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <h3>Dados do Coordenador</h3>
                <InputText
                  type="text"
                  name="nomeCoordenador"
                  value={formData.nomeCoordenador}
                  onChange={handleChange}
                  placeholder="Nome do Coordenador"
                />
                <InputText
                  type="text"
                  name="emailCoordenador"
                  value={formData.emailCoordenador}
                  onChange={handleChange}
                  placeholder="Email do Coordenador"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <h3>Dados do CoCoordenador</h3>
                <InputText
                  type="text"
                  name="nomeCoCoordenador"
                  value={formData.nomeCoCoordenador}
                  onChange={handleChange}
                  placeholder="Nome do CoCoordenador"
                />
                <InputText
                  type="text"
                  name="emailCoCoordenador"
                  value={formData.emailCoCoordenador}
                  onChange={handleChange}
                  placeholder="Email do CoCoordenador"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <h3>Valor para Financiamento do Projeto</h3>
                <InputNumber
                  type="number"
                  name="valorSolicitado"
                  value={formData.valorSolicitado}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <h3>Bolsas do Projeto</h3>
                <label className="form-label">Adicione o tipo de bolsa e depois informe a quantidade de bolsas que serão necessárias. 
                  Lembre-se, a quantidade de bolsas é contabilizada como uma unidade por mês, logo uma bolsa de 6 meses corresponde a 6 unidades. 
                  O valor total de cada tipo de bolsa é calculado automaticamente com base na quantidade e no valor unitário.
                </label>

                <div className="flex gap-4 items-end">
                  <select
                    value={bolsaSelecionada}
                    onChange={(e) => setBolsaSelecionada(e.target.value)}
                  >
                    <option value="">Selecione o tipo</option>
                    {bolsasList.map(b => (
                      <option key={b.tipo} value={b.tipo}>
                        {b.tipo} (R$ {b.valorUnitario})
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min={0}
                    placeholder="Qtd."
                    value={quantidadeBolsa}
                    onChange={(e) => setQuantidadeBolsa(Number(e.target.value))}
                  />

                  <button type="button" onClick={addBolsa}>
                    Adicionar
                  </button>
                </div>

                <div className="mt-4">
                  <h4>Bolsas adicionadas</h4>

                  {formData.tipoBolsa.length === 0 && (
                    <p>Nenhuma bolsa adicionada</p>
                  )}

                  <ul className="list-disc ml-6">
                    {formData.tipoBolsa.map((tipo, index) => (
                      <li key={index} className="mb-2">
                        <strong>{tipo}</strong>: Quantidade: {formData.quantidadeIndividualBolsas[index]} — 
                        Valor unitário: R$ {formData.valorUnitarioBolsa[index]} — 
                        Valor Total: R$ {formData.valorBolsa[index]}

                        <button
                          type="button"
                          className="ml-4 text-red-600"
                          onClick={() => removerBolsa(index)}
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <p><strong>Total de bolsas:</strong> {formData.quantidade}</p>
                  <p>
                    <strong>Total geral:</strong> R${" "}
                    {formData.valorTotalBolsas.toFixed(2).replace(".", ",")}
                  </p>
                </div>


              </div>
            </div>


              {/* */}
              <div className="form-row">
                <div className="form-col">
                  <h3>Área Temática</h3>
                      <SelectInput
                        value={formData.areaTematica}
                        name='areaTematica'
                        onChange={handleChange}
                        options={areaTematicaList}
                      />
                </div>
              </div>

              <div className="form-row">
                  <div className="form-col">
                    <h3>Linha de Extensão</h3>
                      <SelectInput
                        value={formData.linhaExtensao}
                        name='linhaExtensao'
                        onChange={handleChange}
                        options={linhaExtensaoList}
                      />
                  </div>
                </div>
            <div className="form-note">
              Antes de finalizar a operação, revise todo o documento.
            </div>
            <button className="submit-button" type="submit">CADASTRAR</button>
          </form>

          {/* Modal de sucesso */}
          <Modal
              isOpen={showModal}
              title="🎉 Projeto cadastrado com sucesso!"
              message="Os dados foram salvos no banco de dados."
              onClose={() => setShowModal(false)}
              onAfterClose={() => navigate("/projetos")}
            />
        </div>
  );
};


export default FormCadProjeto;