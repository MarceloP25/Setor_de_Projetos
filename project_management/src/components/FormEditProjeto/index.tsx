import React, { useState, useEffect } from 'react';
import { db } from '../../services/config';
import { doc, collection, getDoc, updateDoc, getDocs, arrayUnion } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import InputText from '../InputText';
import InputNumber from '../InputNumber';
import SelectInput from '../SelectInput';
import type { Edital } from '../../interfaces/Edital';
import type { Projeto } from '../../interfaces/Projeto';


import './styles.css';
import TextAreaInput from '../TextAreaInput';

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
    comentariosAvaliadores: [''] as string[],
    notaEtapa2: 0,
    alunosParticipantes: [] as string[],
    relatorioProjeto: [] as object[],
    criadoEm: '',
    criadoPor: '',
    alteradoEm: '',
    alteradoPor: ''
};

const sanitizeName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\\s]/g, '')
    .replace(/\\s+/g, '-'); // dentro de utils tambem
};


function FormEditProjeto({ projectId }: { projectId: string | undefined }) {
  const { projectId: id = projectId } = useParams<{ projectId: string }>();
  const [editaisList, setEditaisList] = useState<Edital[]>([]);
  const [showModal, setShowModal] = useState(false);

  if (!id) {
    return <div>Projeto não encontrado!</div>;
  }

  const [formData, setFormData] = useState<Projeto>({
    ...initialProjectState,
    id: id,
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
    "Segurança Alimentar e Nutricional", "Turismo", "Desenvolvimento Humano"
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
    let novaValorBolsa = [...prev.valorBolsa];
    const tipoIndex = novaValorBolsa.findIndex(item => item.startsWith(tipo));

    if (tipoIndex >= 0) {
      // Atualiza a bolsa existente
      novaValorBolsa[tipoIndex] = `${tipo}: R$ ${valorTotalTipo.toFixed(2).replace('.', ',')} (Qtd: ${quantidade})`;
    } else {
      // Adiciona a bolsa se ainda não existir
      novaValorBolsa.push(`${tipo}: R$ ${valorTotalTipo.toFixed(2).replace('.', ',')} (Qtd: ${quantidade})`);
    }

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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;


    setFormData(prev => {
      // Campos monetários
      if (name === "valorSolicitado" || name === "valorDisponibilizado") {
       return { ...prev, [name]: parseFloat(value) || 0 };
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
        const projetoId = id || sanitizeName(formData.nomeProjeto);
        const rawValorSolicitado = formData.valorSolicitado;
        const rawValorDisponibilizado = formData.valorDisponibilizado;

        await updateDoc(doc(db, "projetos", projetoId), {
          ...formData,
          valorSolicitado: rawValorSolicitado,
          valorDisponibilizado: rawValorDisponibilizado,
          alteradoEm: new Date().toISOString()
        });

        await updateDoc(doc(db, "editais", formData.edital), {
            projetosVinculados: arrayUnion(formData.nomeProjeto)
        });

        setShowModal(true);

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

        dataInicioEnvioRelatorioMensal:  doc.data().dataInicioEnvioRelatorioMensal,
        dataFimEnvioRelatorioMensal:  doc.data().dataFimEnvioRelatorioMensal,
        dataInicioEnvioRelatorioFinal:  doc.data().dataInicioEnvioRelatorioFinal,
        dataFimEnvioRelatorioFinal:  doc.data().dataFimEnvioRelatorioFinal,

        dataPagamentoInicio:  doc.data().dataPagamentoInicio,
        dataPagamentoFim:  doc.data().dataPagamentoFim,
        linkAcessoEdital: doc.data().linkAcessoEdital,
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
    const fetchProjetoData = async () => {
      if(id) {
        const projetoRef = doc(db, 'projetos', id);
        const projetoSnap = await getDoc(projetoRef);

        if (projetoSnap.exists()) {
          setFormData(projetoSnap.data() as Projeto);
        } else {
          alert('Projeto não encontrado!');
          setFormData({ ...initialProjectState, id: id });
        }
      }
    };
    fetchEditais();
    fetchProjetoData();
  }, [id]);

  return (
        <div className="form-container">
          <div className="form-title">Edição de Dados do Projeto</div>
          <form onSubmit={handleSubmit}>

            {/* DADOS DE IDENTIFICAÇÃO */}
            <div className="form-row">
              <SelectInput
                label="Selecione o Edital"
                name="edital"
                value={formData.edital}
                onChange={handleChange}
                options={editaisList.map((edital) => ({
                  label: edital.nomeEdital,
                  value: edital.id
                }))}
              />
            </div>
            <div className="form-row">
                <InputText
                  label="Código do Projeto"
                  type="text"
                  name="codigoProjeto"
                  value={formData.codigoProjeto}
                  onChange={handleChange}
                  placeholder="Código do Projeto"
                />
            </div>
            <div className="form-row">
                <InputText
                  label="Nome do Projeto"
                  type="text"
                  name="nomeProjeto"
                  value={formData.nomeProjeto}
                  onChange={handleChange}
                  placeholder="Nome do Projeto"
                />
            </div>
            <div className="form-row">
                <InputText
                  label="Nome da Ação"
                  type="text"
                  name="nomeDaAcao"
                  value={formData.nomeDaAcao}
                  onChange={handleChange}
                  placeholder="Nome da Ação"
                />
            </div>
            
            {/*DATAS E PERIODO DE DURACAO */}
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

            {/*COORDENADOR E COORDENADOR ADJUNTO */}
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

            {/*REALIZACAO*/}
            <div className="form-row">
              <div className="form-col">
                <InputText
                  label="Abrangência"
                  type="text"
                  name="abrangencia"
                  value={formData.abrangencia}
                  onChange={handleChange}
                  placeholder="Abrangência"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <InputText
                  label="Espaço de Realização"
                  type="text"
                  name="espaco"
                  value={formData.espaco || ''}
                  onChange={handleChange}
                  placeholder="Espaço de Realização"
                />
                <InputText
                  label="Bairro"
                  type="text"
                  name="bairro"
                  value={formData.bairro || ''}
                  onChange={handleChange}
                  placeholder="Bairro"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <InputText
                  label="Cidade/Município"
                  type="text"
                  name="municipio"
                  value={formData.municipio || ''}
                  onChange={handleChange}
                  placeholder="Cidade/Município"
                />
                <InputText
                  label="Estado"
                  type="text"
                  name="estado"
                  value={formData.estado || ''}
                  onChange={handleChange}
                  placeholder="Estado"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <InputText
                  label="Público Interno - Descrição"
                  type="text"
                  name="publicoInternoDescricao"
                  value={formData.publicoInternoDescricao || ''}
                  onChange={handleChange}
                  placeholder="Público Interno - Descrição"
                />
                <InputNumber
                  label="Público Interno - Quantidade"
                  type="number"
                  name="publicoInternoQuantidade"
                  value={formData.publicoInternoQuantidade || 0}
                  onChange={handleChange}
                  placeholder="Público Interno - Quantidade"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <InputText
                  label="Público Externo - Descrição"
                  type="text"
                  name="publicoExternoDescricao"
                  value={formData.publicoExternoDescricao || ''}
                  onChange={handleChange}
                  placeholder="Público Externo - Descrição"
                />
                <InputNumber
                  label="Público Externo - Quantidade"
                  type="number"
                  name="publicoExternoQuantidade"
                  value={formData.publicoExternoQuantidade || 0}
                  onChange={handleChange}
                  placeholder="Público Externo - Quantidade"
                />
              </div>
            </div>


            {/*DETALHAMENTO*/}
            <div className="form-row">
              <div className="form-col">
                <TextAreaInput
                  label="Detalhes da Ação"
                  name="detalhesAcao"
                  value={formData.detalhesAcao || ''}
                  onChange={handleChange}
                  placeholder="Detalhes da Ação"
                />
              </div>
            </div>

            {/*FINANCIAMENTO E BOLSAS */}
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


                <div className="form-row">
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

          {/* Modal de sucesso */}
            {showModal && (
              <div className="modal-overlay" onClick={() => setShowModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <h2>🎉 Projeto atualizado com sucesso!</h2>
                  <p>Os dados foram salvos no banco de dados.</p>
                  <button className="modal-button" onClick={() => setShowModal(false)}>Fechar</button>
                </div>
              </div>
            )}
        </div>
  );
};


export default FormEditProjeto;