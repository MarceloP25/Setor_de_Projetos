import { useState } from 'react';
import './styles.css';
import RadioInput from '../RadioInput';
import TextAreaInput from '../TextAreaInput';
import ActionButton from '../Button';
import type { Projeto } from '../../interfaces/Projeto';
import { db } from '../../services/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

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

function FormDocumentosProjeto({ projectId }: { projectId: string | undefined }) {
  const { projectId: id = projectId } = useParams<{ projectId: string }>();

  if (!id) {
    return <div>ID do projeto não fornecido.</div>;
  }

  const [formData, setFormData] = useState<Projeto>({
    ...initialProjectState,
    id: id,
  });


  const [documentos, setDocumentos] = useState([
    { label: 'Plano de trabalho do(s) bolsista(s)', value: '' },
    { label: 'Plano de trabalho do bolsista Colaborador Externo', value: '' },
    { label: 'Declaração de entrega de documentação', value: '' },
    { label: 'Carta de Anuência assinada', value: '' },
    { label: 'Plano de Ensino para os projetos de extensão em forma de curso', value: '' },
    { label: 'Declaração ou e-mail do setor competente do respectivo campus indicando ciência e disponibilidade do recurso solicitado', value: '' },
  ]);

  const options = [
    { label: 'Sim', value: 'Sim' },
    { label: 'N/A', value: 'N/A' },
    { label: 'Não', value: 'Não' },
  ];

  const status = [
    { label: 'Classificado', value: 'Classificado' },
    { label: 'Desclassificado', value: 'Desclassificado' },
  ];


  const handleDocsListUpdate = (index: number, valor: string | null) => {
    const novos = [...documentos];
    novos[index].value = valor ?? 'N/A';
    setDocumentos(novos);
    
    setFormData(prev => ({
      ...prev,
      documentosAnexados: novos.map(d => `${d.label}: ${d.value}`),
    }));
  };

  const handleClassificacaoUpdate = (valor: string | null) => {
    const validValue = valor ?? '';
    setFormData(prev => ({
      ...prev,
      statusEtapa1: validValue,
      classificacaoDetalhe: validValue === 'Desclassificado' ? prev.classificacaoDetalhe : '',
    }));
  };

  const handleChangeDetalhe = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      classificacaoDetalhe: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const projetoRef = doc(db, 'projetos', formData.id);
      await updateDoc(projetoRef, {
        documentosAnexados: formData.documentosAnexados,
        statusEtapa1: formData.statusEtapa1,
        classificacaoDetalhe: formData.classificacaoDetalhe,
        alteradoEm: new Date().toISOString(),
      });
      alert('Checklist salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar checklist:', error);
      alert('Erro ao salvar checklist.');
    }
  };

  return (
    <div className="container">
      <div className="title">Documentos Anexados ao Projeto</div>
      <div className="list">
        <div className="checklist">
          {documentos.map((doc, index) => (
            <RadioInput
              key={index}
              label={doc.label}
              options={options}
              name={`documento-${index}`}         // nome único por grupo
              value={doc.value}                  // valor atual do grupo
              defaultValue={doc.value}
              onChange={val => handleDocsListUpdate(index, val)}
            />

          ))}

          <div className="checklist">
            <h4>Classifique o Projeto</h4>
              <RadioInput
                label="Classificação do Projeto"
                options={status}
                name="classificacao"              // nome fixo
                value={formData.statusEtapa1}
                defaultValue={formData.statusEtapa1}
                onChange={val => handleClassificacaoUpdate(val)}
              />

          </div>

          {formData.statusEtapa1 === 'Desclassificado' && (
            <div className="checklist">
              <TextAreaInput
                label='Caso não esteja classificado, justifique'
                name="classificacaoDetalhe"
                value={formData.classificacaoDetalhe || ''}
                onChange={handleChangeDetalhe}
                placeholder="Descreva o motivo da desclassificação"
              />
            </div>
          )}
        </div>
        <div className="button-container">
            <ActionButton text="CONFIRMAR" variant='medium' onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default FormDocumentosProjeto;
