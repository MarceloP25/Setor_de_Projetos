import React, { useState } from 'react';
import { db } from '../../services/config';
import { doc, updateDoc } from 'firebase/firestore';
import InputNumber from '../InputNumber';
import ActionButton from '../Button';
import type { Projeto } from '../../interfaces/Projeto';
import './styles.css';
import TextAreaInput from '../TextAreaInput';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../Modal';

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

function FormAvaliadores({ projectId }: { projectId: string | undefined }) {
  const { projectId: id = projectId } = useParams<{ projectId: string }>();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  if (!id) {
    return <div>Informação não encontrada!</div>;
  }

  const [formData, setFormData] = useState<Projeto>({
    ...initialProjectState,
    id: id,
  });



  const calcularNota = (valores: number[]) => {
    const notasValidas = valores.filter((n) => n > 0);
    if (notasValidas.length === 0) return 0;
    const soma = notasValidas.reduce((acc, val) => acc + val, 0);
    return parseFloat((soma / notasValidas.length).toFixed(2));
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    tipo: 'nota' | 'comentario'
  ) => {
    const { value } = e.target;

    setFormData((prev) => {
      const novasNotas = [...(prev.notasAvaliadores || [])];
      const novosComentarios = [...(prev.comentariosAvaliadores || [])];

      if (tipo === 'nota') {
        const valorNumerico = parseFloat(value) || 0;
        novasNotas[index] = valorNumerico;
      } else {
        novosComentarios[index] = value;
      }

      // recalcula a média com as notas atualizadas
      const novaMedia = calcularNota(novasNotas);

      return {
        ...prev,
        notasAvaliadores: novasNotas,
        comentariosAvaliadores: novosComentarios,
        notaEtapa2: novaMedia,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const projetoRef = doc(db, 'projetos', formData.id);
      await updateDoc(projetoRef, {
        notasAvaliadores: formData.notasAvaliadores,
        comentariosAvaliadores: formData.comentariosAvaliadores,
        notaEtapa2: formData.notaEtapa2,
        alteradoEm: new Date().toISOString(),
      });
      setShowModal(true);
    } catch (error) {
      console.error('Erro ao salvar avaliações:', error);
      alert('Erro ao salvar as avaliações.');
    }
  };


  return (
    <div className="form-container">
      <div className="form-title">Cadastro de Avaliações</div>
      <form onSubmit={handleSubmit}>
        {[0, 1, 2].map((index) => (
          <div className="form-row" key={index}>
            <div className="form-col">
              <InputNumber
                label={`Avaliador ${index + 1}`}
                type="number"
                min={0}
                max={10}
                step={0.01}
                value={(formData.notasAvaliadores ?? [])[index] ?? 0}
                onChange={(e) => handleChange(e, index, 'nota')}
              />
              <TextAreaInput
                label="Comentários"
                value={(formData.comentariosAvaliadores ?? [])[index] || ''}
                onChange={(e) => handleChange(e, index, 'comentario')}
              />
            </div>
          </div>
        ))}

        <div className="form-summary">
          <h4>Média Final: {(formData.notaEtapa2 ?? 0).toFixed(2)}</h4>
        </div>

        <div className="form-note">
            <ActionButton text="CONFIRMAR" variant="medium" onClick={() => {handleSubmit}} />
        </div>

      </form>

      {/* Modal de sucesso */}
      <Modal
          isOpen={showModal}
          title="🎉 Classificação da etapa 2 realizada com sucesso!"
          message="Os dados foram salvos no banco de dados."
          onClose={() => setShowModal(false)}
          onAfterClose={() => navigate("/projetos")}
        />
    </div>
  );
}

export default FormAvaliadores;
