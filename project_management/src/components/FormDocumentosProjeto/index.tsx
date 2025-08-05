import { useState } from 'react';
import './styles.css'
import RadioInput from '../RadioInput';
import TextAreaInput from '../TextAreaInput';

function FormDocumentosProjeto() {
    const [Classificacao, setClassificacao] = useState([ 'Classificado', 'Desclassificado' ]);

    const [documentos, setDocumentos] = useState([
        { text: 'Plano de trabalho do(s) bolsista(s)', valor: 'N/A' },
        { text: 'Currículo do(s) bolsista(s)', valor: 'N/A' },
        { text: 'Comprovante de matrícula do(s) bolsista(s)', valor: 'N/A' },
    ]);


    const options = ['Sim', 'N/A', 'Não'];

    const status = ['Classificado', 'Desclassificado'];

    const handleDocsListUpdate = (index: number, valor: string | null) => {
        const novos = [...documentos];
        novos[index].valor = valor ?? 'N/A';
        setDocumentos(novos);
    };

    const handleClassificaoUpdate = () => {
        
    };

    return (
        <div className="container">
            <div className="title">Documentos Anexados ao Projeto</div>
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
                <div>
                    <h4>Classifique o Projeto</h4>
                    {/* variavel na interface chama statusEtapa1 */}
                    {Classificacao.map((doc, index) => (
                    <RadioInput
                        key={index}
                        label={doc}
                        options={options}
                        defaultValue={doc}
                        onChange={() => handleClassificaoUpdate()}
                    />
                    ))}
                </div>
                {/* Campo condicional caso seja selecionado a opcao de Desclassificacao do projeto */}
                {/* variavel na interface chama classificacaoDetalhe */}
                {/*<div>
                    <h4>Caso não esteja classificado, justifique</h4>
                    <TextAreaInput/>
                </div>*/}
            </div>
        </div>
    );
}

export default FormDocumentosProjeto;