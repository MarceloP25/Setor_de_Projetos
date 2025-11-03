import React, { useState, useEffect } from 'react';
import { db } from '../../services/config'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import './styles.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

interface FormData {
  [key: string]: string | number | Bolsa[] | null;
  edital: string;
  nomeProjeto: string;
  ano: string;
  periodoInicio: string;
  periodoFim: string;
  abrangencia: string;
  nomeAcao: string;
  nomeCoordenador: string;
  emailCoordenador: string;
  nomeCoCoordenador: string;
  emailCoCoordenador: string;
  publicoInterno: string;
  qtdInterno: string;
  publicoExterno: string;
  qtdExterno: string;
  estado: string;
  municipio: string;
  bairro: string;
  espaco: string;
  financiamento: string;
  bolsas: Bolsa[];
  areaTematica: string;
  linhaExtensao: string;
  detalhes: string;
  classificado: string;
  avaliador1: string;
  avaliador2: string;
  avaliador3: string;
  editaisList?: Array<{id: string; nome: string}> | null;
}

interface Bolsa {
  tipo: string;
  quantidade: number;
}

const formatMoney = (value: string): string => {
  const cleanValue = value.replace(/[^0-9]/g, '');
  if (!cleanValue || cleanValue === '0') {
    return 'R$ 0,00';
  }
  const number = parseFloat(cleanValue) / 100;
  return `R$ ${number.toFixed(2).replace('.', ',')}`;
};

const sanitizeName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\\s]/g, '')
    .replace(/\\s+/g, '-');
};

const ProjectRegistration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    edital: '',
    nomeProjeto: '',
    ano: '',
    periodoInicio: '',
    periodoFim: '',
    abrangencia: '',
    nomeAcao: '',
    nomeCoordenador: '',
    emailCoordenador: '',
    nomeCoCoordenador: '',
    emailCoCoordenador: '',
    publicoInterno: '',
    qtdInterno: '',
    publicoExterno: '',
    qtdExterno: '',
    estado: '',
    municipio: '',
    bairro: '',
    espaco: '',
    financiamento: 'R$ 0,00',
    bolsas: [],
    areaTematica: '',
    linhaExtensao: '',
    detalhes: '',
    classificado: '',
    avaliador1: '',
    avaliador2: '',
    avaliador3: '',
    editaisList: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'financiamento') {
      const formattedValue = formatMoney(value);
      setFormData(prev => ({ ...prev, financiamento: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBolsaChange = (tipo: string, quantidade: string) => {
    setFormData(prev => {
      const bolsasAtualizadas = prev.bolsas.map(bolsa =>
        bolsa.tipo === tipo ? { ...bolsa, quantidade: parseInt(quantidade) || 0 } : bolsa
      );
      const bolsasFiltradas = bolsasAtualizadas.filter(bolsa => bolsa.quantidade > 0);
      return {
        ...prev,
        bolsas: bolsasFiltradas
      };
    });
  };

  const toggleBolsaTipo = (tipo: string) => {
    setFormData(prev => {
      const jaPossui = prev.bolsas.some(bolsa => bolsa.tipo === tipo);
      if (jaPossui) {
        return {
          ...prev,
          bolsas: prev.bolsas.filter(bolsa => bolsa.tipo !== tipo)
        };
      }
      return {
        ...prev,
        bolsas: [...prev.bolsas, { tipo, quantidade: 0 }]
      };
    });
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      'edital',
      'nomeProjeto',
      'nomeCoordenador',
      'emailCoordenador',
      'financiamento',
      'areaTematica',
      'linhaExtensao',
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`O campo ${field} é obrigatório!`);
        return false;
      }
    }
    if (!formData.nomeProjeto.replace(/\s/g, '').length) {
      alert('Nome do projeto inválido para ID!');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const rawFinanciamento = formData.financiamento.replace(/\\D/g, '');
        const projetoId = sanitizeName(formData.nomeProjeto);
        await setDoc(doc(db, "projetos", projetoId), {
          ...formData,
          financiamento: rawFinanciamento,
          createdAt: new Date()
        });
        alert('Projeto cadastrado com sucesso!');
        setFormData({
          edital: '',
          nomeProjeto: '',
          ano: '',
          periodoInicio: '',
          periodoFim: '',
          abrangencia: '',
          nomeAcao: '',
          nomeCoordenador: '',
          emailCoordenador: '',
          nomeCoCoordenador: '',
          emailCoCoordenador: '',
          publicoInterno: '',
          qtdInterno: '',
          publicoExterno: '',
          qtdExterno: '',
          estado: '',
          municipio: '',
          bairro: '',
          espaco: '',
          financiamento: 'R$ 0,00',
          bolsas: [],
          areaTematica: '',
          linhaExtensao: '',
          detalhes: '',
          classificado: '',
          avaliador1: '',
          avaliador2: '',
          avaliador3: '',
          editaisList: formData.editaisList
        });
      } catch (error) {
        if ((error as firebase.FirebaseError).code === 'already-exists') {
          alert('Já existe um projeto com este nome!');
        } else {
          alert('Erro ao cadastrar projeto: ' + (error as Error).message);
        }
      }
    }
  };

  const fetchEditais = async () => {
    try {
      const editaisRef = collection(db, "editais");
      const querySnapshot = await getDocs(editaisRef);
      const editais = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome
      }));
      setFormData(prev => ({
        ...prev,
        editaisList: editais
      }));
    } catch (error) {
      console.error("Erro ao buscar editais:", error);
    }
  };

  useEffect(() => {
    fetchEditais();
  }, []);

  return (
    <div className="container">
      {/* <Sidebar /> */}
      <div className="main-content">
        <Header />
        <div className="form-container">
          <div className="form-title">Cadastro de Projeto</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Selecione o Edital</label>
              <select
                className="form-control"
                name="edital"
                value={formData.edital}
                onChange={handleChange}
              >
                <option value="">Selecione o Edital</option>
                {formData.editaisList?.map(edital => (
                  <option key={edital.id} value={edital.nome}>{edital.nome}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Nome do Projeto</label>
              <input
                type="text"
                className="form-control"
                name="nomeProjeto"
                value={formData.nomeProjeto}
                onChange={handleChange}
                placeholder="Nome do Projeto"
              />
            </div>
            <div className="form-row">
              <div className="form-col">
                <label className="form-label">Ano</label>
                <input
                  type="text"
                  className="form-control"
                  name="ano"
                  value={formData.ano}
                  onChange={handleChange}
                  placeholder="Ano"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label className="form-label">Período de Realização</label>
                <div className="period-container">
                  <input
                    type="date"
                    className="form-control"
                    name="periodoInicio"
                    value={formData.periodoInicio}
                    onChange={handleChange}
                  />
                  <span className="period-separator">a</span>
                  <input
                    type="date"
                    className="form-control"
                    name="periodoFim"
                    value={formData.periodoFim}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label className="form-label">Nome do Coordenador</label>
                <input
                  type="text"
                  className="form-control"
                  name="nomeCoordenador"
                  value={formData.nomeCoordenador}
                  onChange={handleChange}
                  placeholder="Nome do Coordenador"
                />
              </div>
              <div className="form-col">
                <label className="form-label">Email do Coordenador</label>
                <input
                  type="email"
                  className="form-control"
                  name="emailCoordenador"
                  value={formData.emailCoordenador}
                  onChange={handleChange}
                  placeholder="Email do Coordenador"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label className="form-label">Nome do Co-coordenador</label>
                <input
                  type="text"
                  className="form-control"
                  name="nomeCoCoordenador"
                  value={formData.nomeCoCoordenador}
                  onChange={handleChange}
                  placeholder="Nome do Co-coordenador"
                />
              </div>
              <div className="form-col">
                <label className="form-label">Email do Co-coordenador</label>
                <input
                  type="email"
                  className="form-control"
                  name="emailCoCoordenador"
                  value={formData.emailCoCoordenador}
                  onChange={handleChange}
                  placeholder="Email do Co-coordenador"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label className="form-label">Valor solicitado para financiamento do Projeto</label>
                <input
                  type="text"
                  className="form-control"
                  name="financiamento"
                  value={formData.financiamento}
                  onChange={handleChange}
                  placeholder="Financiamento"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label className="form-label">Tipos de bolsas solicitadas</label>
                <div className="checkbox-group">
                  {[
                    { id: 'supi', value: 'SUP I (20h) - R$ 700,00', label: 'SUP I (20h) - R$ 700,00' },
                    { id: 'supii', value: 'SUP II (10h) - R$ 350,00', label: 'SUP II (10h) - R$ 350,00' },
                    { id: 'bexmed10', value: 'BEXMED (10h) - R$ 350,00', label: 'BEXMED (10h) - R$ 350,00' },
                    { id: 'bexcol', value: 'BEXCOL (até 15h) - R$ 900,00', label: 'BEXCOL (até 15h) - R$ 900,00' }
                  ].map((bolsa) => {
                    const selectedBolsa = formData.bolsas.find(b => b.tipo === bolsa.value);
                    return (
                      <div key={bolsa.id} className="checkbox-option">
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`tipo-${bolsa.id}`}
                              checked={!!selectedBolsa}
                              onChange={() => toggleBolsaTipo(bolsa.value)}
                              className="w-5 h-5"
                            />
                            <label htmlFor={`tipo-${bolsa.id}`} className="font-normal">
                              {bolsa.label}
                            </label>
                          </div>
                          {selectedBolsa && (
                            <input
                              type="number"
                              id={`quantidade-${bolsa.id}`}
                              value={selectedBolsa.quantidade}
                              onChange={(e) => handleBolsaChange(bolsa.value, e.target.value)}
                              min="0"
                              max="10"
                              className="w-[80px] px-2 py-1 border rounded"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="form-section">
              <div className="form-section-title">Área Temática</div>
              <select
                className="form-control"
                name="areaTematica"
                value={formData.areaTematica}
                onChange={handleChange}
              >
                <option value="">Selecione a Área Temática</option>
                <option value="Comunicação">Comunicação</option>
                <option value="Cultura">Cultura</option>
                <option value="Direitos Humanos e Justiça">Direitos Humanos e Justiça</option>
                <option value="Educação">Educação</option>
                <option value="Meio Ambiente">Meio Ambiente</option>
                <option value="Saúde">Saúde</option>
                <option value="Tecnologia e Produção">Tecnologia e Produção</option>
                <option value="Trabalho">Trabalho</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Linha de Extensão</label>
              <select
                className="form-control"
                name="linhaExtensao"
                value={formData.linhaExtensao}
                onChange={handleChange}
              >
                <option value="">Selecione a Linha de Extensão</option>
                <option value="Alfabetizacao">Alfabetização, Leitura e Escrita</option>
                <option value="Comunicacao">Comunicação Estratégica</option>
                <option value="DesenvolvimentoRural">Desenvolvimento Rural e Questão Agrária</option>
                <option value="Direitos">Direitos Individuais e Coletivos</option>
                <option value="Emprego">Emprego e Renda</option>
                <option value="Esporte">Esporte e Lazer</option>
                <option value="FormacaoProfessores">Formação de Professores</option>
                <option value="GestaoInstitucional">Gestão Institucional</option>
                <option value="Infancia">Infância e Adolescência</option>
                <option value="JovensAdultos">Jovens e Adultos</option>
                <option value="Midiaartes">Mídiaartes</option>
                <option value="Organizacoes">Organizações da Sociedade e Movimentos Sociais e Populares</option>
                <option value="PropriedadeIntelectual">Propriedade Intelectual e Patente</option>
                <option value="ResiduosSolidos">Resíduos Sólidos</option>
                <option value="SaudeTrabalho">Saúde e Proteção no Trabalho</option>
                <option value="SegurancaPublica">Segurança Pública e Defesa Social</option>
                <option value="TerceiraIdade">Terceira Idade</option>
                <option value="DesenvolvimentoProdutos">Desenvolvimento de Produtos</option>
                <option value="DesenvolvimentoTecnologico">Desenvolvimento Tecnológico</option>
                <option value="EducacaoProfissional">Educação Profissional</option>
                <option value="EndemiasEpidemias">Endemias e Epidemias</option>
                <option value="Estilismo">Estilismo</option>
                <option value="GestaoTrabalho">Gestão do Trabalho</option>
                <option value="GestaoPublica">Gestão Pública</option>
                <option value="InovacaoTecnologica">Inovação Tecnológica</option>
                <option value="LinguasEstrangeiras">Línguas Estrangeiras</option>
                <option value="Midias">Mídias</option>
                <option value="Patrimonio">Patrimônio Cultural, Histórico e Natural</option>
                <option value="QuestoesAmbientais">Questões Ambientais</option>
                <option value="SaudeAnimal">Saúde Animal</option>
                <option value="SaudeHumana">Saúde Humana</option>
                <option value="TecnologiaInformacao">Tecnologia da Informação</option>
                <option value="UsoDrogas">Uso de Drogas e Dependência Química</option>
                <option value="DesenvolvimentoRegional">Desenvolvimento Regional</option>
                <option value="DesenvolvimentoUrbano">Desenvolvimento Urbano</option>
                <option value="Empreendedorismo">Empreendedorismo</option>
                <option value="DivulgacaoCientifica">Divulgação Científica e Tecnológica</option>
                <option value="Farmacos">Fármacos e Medicamentos</option>
                <option value="GestaoInformacional">Gestão Informacional</option>
                <option value="GruposVulneraveis">Grupos Sociais Vulneráveis</option>
                <option value="Jornalismo">Jornalismo</option>
                <option value="Metodologias">Metodologias e Estratégias de Ensino/Aprendizagem</option>
                <option value="Musica">Música</option>
                <option value="PessoaDeficiencia">Pessoa com Deficiências, Incapacidades e Necessidades Especiais</option>
                <option value="RecursosHidricos">Recursos Hídricos</option>
                <option value="SaudeFamilia">Saúde da Família</option>
                <option value="SegurancaAlimentar">Segurança Alimentar e Nutricional</option>
                <option value="Turismo">Turismo</option>
                <option value="DesenvolvimentoHumano">Desenvolvimento Humano</option>
              </select>
            </div>
            <div className="form-note">
              Antes de finalizar a operação, revise todo o documento.
            </div>
            <button className="submit-button" type="submit">CADASTRAR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectRegistration;