import { useState } from 'react';
import './styles.css'
import RadioInput from '../RadioInput';
import TextAreaInput from '../TextAreaInput';
import ActionButton from '../Button';
import type {Projeto} from '../../interfaces/Projeto'

function FormDocumentosProjeto() {
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
    
    
        statusEtapa1: '',
        documentosAnexados: [] as string[],
        classificacaoDetalhe: '',
    
    
        notasAvaliadores: [0] as number[],
        comentariosAvaliadores: [''] as string[],
        notaEtapa2: 0,
    
    
        alunosParticipantes: [] as string[],
        relatorioProjeto: [] as object[],
    
    
        criadoEm: '',
        criadoPor: '',
        alteradoEm: '',
        alteradoPor: ''
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
    };

    const handleClassificaoUpdate = () => {
        // adiciona o resultado na variavel statusEtapa1 da interface Projeto
    };

    const handleSummit = () => {

    }

    return (
        <div className="container">
            <div className="title">Documentos Anexados ao Projeto</div>
            <div className='list'>
                <div className="checklist">
                    {/* variavel na interface chama documentosAnexados */}
                    {documentos.map((doc, index) => (
                    <RadioInput
                        key={index}
                        label={doc.text}
                        options={options}
                        defaultValue={doc.valor}
                        onChange={(val) => handleDocsListUpdate(index, val)}
                    />
                    ))}
                    <div className='checklist'>
                        <h4>Classifique o Projeto</h4>
                        {/* variavel na interface chama statusEtapa1 */}
                        
                        <RadioInput
                            label={'Classificação do Projeto'}
                            options={status}
                            defaultValue={''}
                            onChange={() => handleClassificaoUpdate()}
                        />
                        
                    </div>
                    {/* Campo condicional caso seja selecionado a opcao de Desclassificacao do projeto */}
                    {/* variavel na interface chama classificacaoDetalhe */}
                    {if(statusEtapa1 === 'Desclassificado'){
                        return(
                        <div className='checklist'>
                        <h4>Caso não esteja classificado, justifique</h4>
                            <TextAreaInput
                                label="Caso não esteja classificado, justifique"
                                name="detalhesAcao" 
                                value={formData.classificacaoDetalhe}
                                onChange={handleChange}
                                placeholder="Caso não esteja classificado, justifique"
                            />
                    </div>)}
                    }
                </div>
                <ActionButton text='CONFIRMAR' variant='medium' onClick={handleSummit}/>
            </div>
        </div>
    );
}

export default FormDocumentosProjeto;