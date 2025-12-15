import React, { useState, useEffect } from 'react';
import { db } from '../../services/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import InputText from '../InputText';
import type { Edital } from '../../interfaces/Edital';
import './styles.css';
import RadioInput from '../RadioInput';
import { Modal } from '../Modal';

const initialEditalState: Edital = {
    id: '',
    nomeEdital: '',
    numeroProcessoEdital: '',

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

    dataInicioRecursoSubimissao: '',
    dataFimRecursoSubimissao: '',

    dataInicioAvaliacao: '',
    dataFimAvaliacao: '',

    dataInicioRecursoAvaliacao: '',
    dataFimRecursoAvaliacao: '',

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
};

function FormEditEdital({ editalId }: { editalId: string | undefined }) {
    const { editalId: idFromParams } = useParams<{ editalId: string }>();
    const id = editalId || idFromParams;
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    if (!id) {
        return <div>Edital não encontrado!</div>;
    }

    const [formData, setFormData] = useState<Edital>({
        ...initialEditalState,
        id: id,
    });
    
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchEditalData = async () => {
            if (id) {
                const editalRef = doc(db, 'editais', id);
                const docSnap = await getDoc(editalRef);

                if (docSnap.exists()) {
                    setFormData(docSnap.data() as Edital);
                    setIsEditing(true);
                } else {
                    console.warn(`Edital com ID ${id} não encontrado. Modo de cadastro forçado.`);
                    setFormData({...initialEditalState, id: id}); 
                    setIsEditing(false);
                }
            }
        };
        fetchEditalData();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStatusChange = (value: string | null) => {
        setFormData((prev) => ({
            ...prev,
            status: value === 'true',
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
            const editalIdToUse = formData.id || crypto.randomUUID();
            const editalRef = doc(db, 'editais', editalIdToUse);
            const agora = new Date().toISOString();

            const updateData = {
                ...formData,
                id: editalIdToUse,
                alteradoEm: agora,
                criadoEm: formData.criadoEm || agora,
            };

            await updateDoc(editalRef, updateData);
            
            setShowModal(true);
            
            
        } catch (error) {
            console.error('Erro ao salvar edital:', error);
            alert(`Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} o edital.`);
        }
    };

    return (
        <div className="form-container">
            <div className="form-title">{isEditing ? 'Edição de Edital' : 'Cadastro de Edital'}</div>
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
                    <RadioInput
                        label="Status do Edital"
                        name="status"
                        value={formData.status.toString()}
                        onChange={handleStatusChange} 
                        options={[
                            { label: 'Ativo', value: 'true' },
                            { label: 'Inativo', value: 'false' },
                        ]}
                    />
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
                        <InputText
                        label='Orçamento presente no edital no momento de sua divulgação'
                        type="text"
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
                        <InputText
                        label="Orçamento fornecido a partir do repasse para a instituição"
                        type="text"
                        name="valorDisponivel"
                        value={formData.valorDisponivel || ''}
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
                        <InputText
                        label="Início do Envio"
                        type="text"
                        name="dataInicioEnvioRelatorioMensal"
                        value={formData.dataInicioEnvioRelatorioMensal}
                        onChange={handleChange}
                        placeholder="Início"
                        />
                        <span className="period-separator"></span>
                        <InputText
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
                        <InputText
                        label="Início do Pagamento de Bolsas"
                        type="text"
                        name="dataPagamentoInicio"
                        value={formData.dataPagamentoInicio}
                        onChange={handleChange}
                        placeholder="Início"
                        />
                        <span className="period-separator"></span>
                        <InputText
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
                <button className="submit-button" type="submit">
                    CONFIRMAR
                </button>
            </form>
            {/* Modal de sucesso */}
            <Modal
                isOpen={showModal}
                title="🎉 Edital editado com sucesso!"
                message="Os dados foram salvos no banco de dados."
                onClose={() => setShowModal(false)}
                onAfterClose={() => navigate("/editais")}
                />
        </div>
    );
};

export default FormEditEdital;