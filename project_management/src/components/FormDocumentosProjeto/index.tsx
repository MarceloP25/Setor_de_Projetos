import { useState } from 'react';
import './styles.css';
import RadioInput from '../RadioInput';
import TextAreaInput from '../TextAreaInput';
import ActionButton from '../Button';
import type { Projeto } from '../../interfaces/Projeto';
import { db } from '../../services/config';
import { doc, updateDoc } from 'firebase/firestore';

function FormDocumentosProjeto({ projetoId }: { projetoId: string }) {
  const [formData, setFormData] = useState<Projeto>({
    id: projetoId,
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
    statusEtapa1: '',
    documentosAnexados: [],
    classificacaoDetalhe: '',
    notasAvaliadores: [0],
    comentariosAvaliadores: [''],
    notaEtapa2: 0,
    alunosParticipantes: [],
    relatorioProjeto: [],
    criadoEm: '',
    criadoPor: '',
    alteradoEm: '',
    alteradoPor: '',
  });

  const [documentos, setDocumentos] = useState([
    { text: 'Plano de trabalho do(s) bolsista(s)', valor: 'N/A' },
    { text: 'Plano de trabalho do bolsista Colaborador Externo', valor: 'N/A' },
    { text: 'Declaração de entrega de documentação', valor: 'N/A' },
    { text: 'Carta de Anuência assinada', valor: 'N/A' },
    { text: 'Plano de Ensino para os projetos de extensão em forma de curso', valor: 'N/A' },
    { text: 'Declaração ou e-mail do setor competente do respectivo campus indicando ciência e disponibilidade do recurso solicitado', valor: 'N/A' },
  ]);

  const options = ['Sim', 'N/A', 'Não'];
  const status = ['Classificado', 'Desclassificado'];

  const handleDocsListUpdate = (index: number, valor: string | null) => {
    const novos = [...documentos];
    novos[index].valor = valor ?? 'N/A';
    setDocumentos(novos);

    setFormData(prev => ({
      ...prev,
      documentosAnexados: novos.map(d => `${d.text}: ${d.valor}`),
    }));
  };

  const handleClassificacaoUpdate = (valor: string) => {
    setFormData(prev => ({
      ...prev,
      statusEtapa1: valor,
      classificacaoDetalhe: valor === 'Desclassificado' ? prev.classificacaoDetalhe : '',
    }));
  };

  const handleChangeDetalhe = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      classificacaoDetalhe: value,
    }));
  };

  const handleSummit = async () => {
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
              label={doc.text}
              options={options}
              defaultValue={doc.valor}
              onChange={val => handleDocsListUpdate(index, val)}
            />
          ))}

          <div className="checklist">
            <h4>Classifique o Projeto</h4>
            <RadioInput
              label={'Classificação do Projeto'}
              options={status}
              defaultValue={formData.statusEtapa1}
              onChange={val => handleClassificacaoUpdate(val)}
            />
          </div>

          {formData.statusEtapa1 === 'Desclassificado' && (
            <div className="checklist">
              <TextAreaInput
                label='Caso não esteja classificado, justifique'
                name="classificacaoDetalhe"
                value={formData.classificacaoDetalhe}
                onChange={handleChangeDetalhe}
                placeholder="Descreva o motivo da desclassificação"
              />
            </div>
          )}
        </div>
        <div className="button-container">
            <ActionButton text="CONFIRMAR" variant='medium' onClick={handleSummit} />
        </div>
      </div>
    </div>
  );
}

export default FormDocumentosProjeto;
