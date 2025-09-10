import React, { useState, useEffect } from 'react';
import { db } from '../../services/config';
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore';
import InputText from '../InputText';
import InputNumber from '../InputNumber';
import SelectInput from '../SelectInput';
import type { Edital } from '../../interfaces/Edital';
import type { Projeto } from '../../interfaces/Projeto';


import './styles.css';

const formatMoney = (value: number): string => {
  const cleanValue = Math.abs(value);
  if (!cleanValue || cleanValue === 0) {
  return 'R$ 0,00';
  }
  const number = cleanValue/ 100;
  return `R$ ${number.toFixed(2).replace('.', ',')}`; // isso nao fica aqui, criar um arquivo para functions chamado utils
};


const sanitizeName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\\s]/g, '')
    .replace(/\\s+/g, '-'); // dentro de utils tambem
};


function FormEditProjeto()  {
  const [editaisList, setEditaisList] = useState<Edital[]>([]);
  const [formData, setFormData] = useState<Projeto>({
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
    tipoBolsa: [] as string[],
    valorBolsa: [] as string[],
    quantidade: 0,
    valorTotalBolsas: 0,


    areaTematica: '',
    linhaExtensao: '',


    detalhesAcao: '',
    documentosAnexados: [] as string[],
    classificacaoDetalhe: '',


    statusEtapa1: '',
    notasAvaliadores: [0] as number[],
    notaEtapa2: 0,


    alunosParticipantes: [] as string[],
    relatorioProjeto: [] as object[],


    criadoEm: '',
    criadoPor: '',
    alteradoEm: '',
    alteradoPor: ''
  });



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
    { tipo: 'SUP I (20h)', valor: 'R$ 700,00'},
    { tipo: 'SUP II (10h)', valor: 'R$ 350,00'},
    { tipo: 'BEXMED (10h)', valor: 'R$ 350,00'},
    { tipo: 'BEXCOL (até 15h)', valor: 'R$ 900,00'}
  ]; // constants


  const toggleBolsaTipo = (tipo: string) => {
    setFormData(prev => {
      const jaPossui = prev.tipoBolsa.includes(tipo);


      if (jaPossui) {
        const tipoIndex = prev.tipoBolsa.indexOf(tipo);
        const novaTipoBolsa = prev.tipoBolsa.filter(b => b !== tipo);
        const novaValorBolsa = prev.valorBolsa.filter((_, i) => i !== tipoIndex);


        const novaQuantidadeTotal = novaValorBolsa.reduce((acc, item) => {
          const matchQtd = item.match(/Qtd: (\d+)/);
          return acc + (matchQtd ? parseInt(matchQtd[1]) : 0);
        }, 0);


        return {
          ...prev,
          tipoBolsa: novaTipoBolsa,
          valorBolsa: novaValorBolsa,
          valorTotalBolsas: calcularTotal(novaValorBolsa),
          quantidade: novaQuantidadeTotal,
        };
      }


      return {
        ...prev,
        tipoBolsa: [...prev.tipoBolsa, tipo],
        valorBolsa: [...prev.valorBolsa, `${tipo}: R$ 0,00 (Qtd: 0)`],
        quantidade: prev.quantidade, // não muda ainda
      };
    });
  }; // ver se encaixa em functions


  const handleBolsaChange = (tipo: string, quantidadeStr: string) => {
    const bolsaInfo = bolsasList.find(b => b.tipo === tipo);
    if (!bolsaInfo) return;


    const valorUnitario = parseFloat(bolsaInfo.valor.replace(/[^\d,]/g, '').replace(',', '.'));
    const quantidade = parseInt(quantidadeStr) || 0;
    const valorTotalTipo = quantidade * valorUnitario;


    setFormData(prev => {
      const novaValorBolsa = prev.valorBolsa.map(item =>
        item.startsWith(tipo)
          ? `${tipo}: R$ ${valorTotalTipo.toFixed(2).replace('.', ',')} (Qtd: ${quantidade})`
          : item
      );


      // Atualiza a quantidade total somando todas as quantidades registradas
      const novaQuantidadeTotal = novaValorBolsa.reduce((acc, item) => {
        const matchQtd = item.match(/Qtd: (\d+)/);
        return acc + (matchQtd ? parseInt(matchQtd[1]) : 0);
      }, 0);


      return {
        ...prev,
        valorBolsa: novaValorBolsa,
        valorTotalBolsas: calcularTotal(novaValorBolsa),
        quantidade: novaQuantidadeTotal,
      };
    });
  };



  const calcularTotal = (valores: string[]) => {
    return valores.reduce((acc, item) => {
      const match = item.match(/R\$ ([\d,.]+)/);
      if (match) {
        const valor = parseFloat(match[1].replace('.', '').replace(',', '.'));
        return acc + valor;
      }
      return acc;
    }, 0);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;


    setFormData(prev => {
      // Campos monetários
      if (name === "valorSolicitado" || name === "valorDisponibilizado") {
        const formattedValue = formatMoney(Number(value));
        return { ...prev, [name]: formattedValue };
      }

      // Campos numéricos (ano, publicoInternoQuantidade, publicoExternoQuantidade, etc.)
      if (type === "number") {
        return { ...prev, [name]: parseInt(value) || 0 };
      }

      // Campos de seleção múltipla (áreaTematica, linhaExtensao)
      if (name === "areaTematica" || name === "linhaExtensao") {
        return { ...prev, [name]: [value] }; // ou [...prev[name], value] se quiser múltipla seleção
      }

      // Campos padrão (string)
      return { ...prev, [name]: value };
    });
  };



  const validateForm = (): boolean => {
    const requiredFields = [
      'edital',
      'nomeProjeto',
      'nomeDaAcao',
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
      if (!formData[field as keyof Projeto] || formData[field as keyof Projeto] === 0) {
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
        const projetoId = sanitizeName(formData.nomeProjeto);
        const rawValorSolicitado = formData.valorSolicitado;
        const rawValorDisponibilizado = formData.valorDisponibilizado;

        await updateDoc(doc(db, "projetos", projetoId), {
          ...formData,
          valorSolicitado: rawValorSolicitado,
          valorDisponibilizado: rawValorDisponibilizado,
          criadoEm: new Date().toISOString()
        });

        alert('Projeto cadastrado com sucesso!');

        // Resetar o formulário
        setFormData({
          ...formData,
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
          valorBolsa: [],
          quantidade: 0,
          valorTotalBolsas: 0,

          areaTematica: '',
          linhaExtensao: '',

          detalhesAcao: '',
          documentosAnexados: [],
          classificacaoDetalhe: '',

          statusEtapa1: '',
          notasAvaliadores: [],
          notaEtapa2: 0,

          alunosParticipantes: [],
          relatorioProjeto: [],

          criadoEm: '',
          criadoPor: '',
          alteradoEm: '',
          alteradoPor: ''
        });
      } catch (error) {
        alert('Erro ao cadastrar projeto: ' + (error as Error).message);
      }
    }
  };

  
  const fetchEditais = async () => {
    try {
      const editaisRef = collection(db, "editais");
      const querySnapshot = await getDocs(editaisRef);
      const editais = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nomeEdital: doc.data().nomeEdital,
        orçamentoEdital: doc.data().orçamentoEdital,
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
        criadoEm:  doc.data().criadoEm,
        criadoPor:  doc.data().criadoPor,
        alteradoEm:  doc.data().alteradoEm,
        alteradoPor:  doc.data().alteradoPor,
      }));
      setEditaisList(editais);
    } catch (error) {
      console.error("Erro ao buscar editais:", error);
    }
  };


  useEffect(() => {
    fetchEditais();
  }, []);
  
  return (
        <div className="form-container">
          <div className="form-title">Cadastro de Projeto</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <SelectInput
                label="Selecione o Edital"
                name="edital"
                value={formData.edital}
                onChange={handleChange}
                options={editaisList.map(edital => edital.nomeEdital)}
              />
            </div>
            <div className="form-group">
                <InputText
                  label="Nome do Projeto"
                  type="text"
                  name="nomeProjeto"
                  value={formData.nomeProjeto}
                  onChange={handleChange}
                  placeholder="Nome do Projeto"
                />
            </div>
            <div className="form-group">
                <InputText
                  label="Nome da Ação"
                  type="text"
                  name="nomeDaAcao"
                  value={formData.nomeDaAcao}
                  onChange={handleChange}
                  placeholder="Nome da Ação"
                />
            </div>
            <div className="form-row">
              <div className="form-col">
                <InputNumber
                  label="Ano de Vigência"
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
                
                <InputText
                  label="Período de realização"
                  type="date"
                  name="periodoInicio"
                  value={formData.periodoInicio}
                  onChange={handleChange}
                  placeholder="Início"
                />
                <span className="period-separator"></span>
                <InputText
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
                <InputText
                  label="Nome do Coordenador"
                  type="text"
                  name="nomeCoordenador"
                  value={formData.nomeCoordenador}
                  onChange={handleChange}
                  placeholder="Nome do Coordenador"
                />
                <InputText
                  label="Email do Coordenador"
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
                <InputText
                  label="Nome do CoCoordenador"
                  type="text"
                  name="nomeCoCoordenador"
                  value={formData.nomeCoCoordenador}
                  onChange={handleChange}
                  placeholder="Nome do CoCoordenador"
                />
                <InputText
                  label="Email do CoCoordenador"
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
                <InputNumber
                  label='Valor para Financiamento do Projeto'
                  type="text"
                  name="valorSolicitado"
                  value={formData.valorSolicitado}
                  onChange={handleChange}
                />
              </div>
            </div>


             <div className="form-row">
              <div className="form-col">
                
                <label className="form-label">Tipos de bolsas solicitadas</label>
                <div className="checkbox-group">
                  {bolsasList.map((bolsa) => {
                    const isSelected = formData.tipoBolsa.includes(bolsa.tipo);
                    //const valorRegistrado = formData.valorBolsa.find(item => item.startsWith(bolsa.tipo));

                    
                    //const quantidade = valorRegistrado ? parseInt(valorRegistrado.match(/\d+/)?.[0] || '0') : 0; // ver se sera usado


                    return (
                      <div key={bolsa.tipo} className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleBolsaTipo(bolsa.tipo)}
                        />
                        <label>{bolsa.tipo} ({bolsa.valor})</label>


                        {isSelected && (
                          <input
                            type="number"
                            min="0"
                            className="ml-4 w-24 border px-2 py-1 rounded"
                            placeholder="Qtd."
                            onChange={(e) => handleBolsaChange(bolsa.tipo, e.target.value)}
                          />
                        )}
                      </div>
                    );
                  })}


                  <div className="mt-4">
                    <p><strong>Tipos selecionados:</strong> {formData.tipoBolsa.join(', ') || 'Nenhum'}</p>
                    <p><strong>Valores por tipo:</strong></p>
                    <ul className="list-disc ml-6">
                      {formData.valorBolsa.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    <p className="mt-2"><strong>Total de bolsas:</strong> {formData.quantidade}</p>
                    <p><strong>Total geral:</strong> R$ {formData.valorTotalBolsas.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
                


                <div className="form-section">
                    <SelectInput
                      label='Área Temática'
                      value={formData.areaTematica}
                      name='areaTematica'
                      onChange={handleChange}
                      options={areaTematicaList}
                    />
                </div>


                <div className="form-group">
                    <SelectInput
                      label='Linha de Extensão'
                      value={formData.linhaExtensao}
                      name='linhaExtensao'
                      onChange={handleChange}
                      options={linhaExtensaoList}
                    />
                </div>
              </div>
            </div>
            <div className="form-note">
              Antes de finalizar a operação, revise todo o documento.
            </div>
            <button className="submit-button" type="submit">CONFIRMAR</button>
          </form>
        </div>
  );
};


export default FormEditProjeto;