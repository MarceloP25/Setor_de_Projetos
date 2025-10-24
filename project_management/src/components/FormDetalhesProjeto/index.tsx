//import React, { useState, useEffect } from 'react';
//import { db } from '../../firebase/firebaseUtil';
//import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
//import { useParams } from 'react-router-dom';
import Button from '../Button';
import './styles.css';
//import type {Projeto} from '../../interfaces/Projeto'


function FormDetalhesProjeto() {


    return(
        <div className='container'>
            <div className="title">Detalhes do Projeto</div>
            <div className='infoBloco'>
                <div className='info'>
                    <h4>Edital</h4>
                    <p>edital</p>
                </div>

                <div className='info'>
                    <h4>Código do Projeto</h4>
                    <p>codigo</p>
                </div>

                <div className='info'>
                    <h4>Nome do Projeto</h4>
                    <p>nome do projeto</p>
                </div>

                <div className='info'>
                    <h4>Nome da Ação</h4>
                    <p>nome da acao</p>
                </div>

                <div className='info'>
                    <h4>Cadastrado em</h4>
                    <p>data</p>
                </div>

                <div className='info'>
                    <h4>Última edição</h4>
                    <p>data</p>
                </div>
                
                <div className='info'>
                    <h4>Nome do Coordenador</h4>
                    <p>nome coordenador</p>
                </div>

                <div className='info'>
                    <h4>Email do Coordenador</h4>
                    <p>email@email.com</p>
                </div>

                <div className='info'>
                    <h4>Nome do CoCoordenador</h4>
                    <p>nome do cocoordenador</p>
                </div>

                <div className='info'>
                    <h4>Email do CoCoordenador</h4>
                    <p>email@emaail.com</p>
                </div>
            </div>

            <div className='infoBloco'>
                <div className='info'>
                    <h4>Ano da Submissão</h4>
                    <p>xxxx</p>
                </div>

                <div className='info'>
                    <h4>Período de Realização</h4>
                    <p>De xx/xx/xxx a xx/xx/xxx</p>
                </div>
            </div>

            <div className='infoBloco'>
                <div className='info'>
                    <h4>Abrangência</h4>
                    <p>abrangencia</p>
                </div>

                <div className='info'>
                    <h4>Discriminar Público Alvo Interno</h4>
                    <p>Discriminar Público Alvo Interno</p>
                </div>

                <div className='info'>
                    <h4>Quantificar Público Alvo Interno</h4>
                    <p>xxx pessoas</p>
                </div>

                <div className='info'>
                    <h4>Discriminar Público Alvo Externo</h4>
                    <p>Discriminar Público Alvo Externo</p>
                </div>

                <div className='info'>
                    <h4>Quantificar Público Alvo Externo</h4>
                    <p>xxx pessoas</p>
                </div>

                <div className='info'>
                    <h4>Local de Realização</h4>
                </div>

                <div className='info'>
                    <h4>Estado</h4>
                    <p>estado</p>
                </div>

                <div className='info'>
                    <h4>Cidade</h4>
                    <p>cidade</p>
                </div>

                <div className='info'>
                    <h4>Bairro</h4>
                    <p>bairro</p>
                </div>

                <div className='info'>
                    <h4>Espaço para Realização</h4>
                    <p>espaço</p>
                </div>
            </div>

            <div className='infoBloco'>
                <div className='info'>
                    <h4>Valor de Financiamento Solicitado</h4>
                    <p>R$xx.xxx,xx</p>
                </div>

                <div className='info'>
                    <h4>Valor Disponibilizado</h4>
                    <p>R$xx.xxx,xxx</p>
                </div>

                <div className='info'>
                    <h4>Quantidade de Bolsas</h4>
                    <p>xx</p>
                </div>

                <div className='info'>
                    <h4>Bolsas</h4>
                    <p>Lista de bolsas com o tipo, quantidade e seu valor individual e valor total</p>
                    <p>Valor total de verba para bolsas</p>
                </div>
            </div>

            <div className='infoBloco'>
                <div className='info'>
                    <h4>Área Temática</h4>
                    <p>area tematica</p>
                </div>

                <div className='info'>
                    <h4>Linha de Extensão</h4>
                    <p>linha de extensao</p>
                </div>

                <div className='info'>
                    <h4>Detalhes da Ação</h4>
                    <p>detalhamento</p>
                </div>
            </div>

            <div className='infoBloco'>
                <div className='info'>
                    <h4>Classificação do Projeto</h4>
                    <p>statusEtapa1</p>
                    {/* Colocar renderizacao condicional caso o projeto seja desclassificado, para mostra o texto de justificativa
                        if(statusEtapa1 === 'Desclassificado')
                    */}
                    {/*<Button text='EDITAR' variant='medium' onClick={}/>*/}
                </div>

                <div className='info'>
                    <h4>Documentos Anexados</h4>
                    <p>documentosAnexados</p>
                    {/*<Button text='EDITAR' variant='medium' onClick={}/>*/}
                </div>

                <div className='info'>
                    <h4>Notas Avaliadores</h4>
                    <p>notasAvaliadores</p>
                    {/*<Button text='EDITAR' variant='medium' onClick={}/>*/}
                </div>

                <div className='info'>
                    <h4>Nota de Classificação</h4>
                    <p>notaEtapa2</p>
                </div>

                <div className='info'>
                    <h4>Alunos Vinculados</h4>
                    <p>alunosParticipantes.nome</p>
                    {/*<Button text='LISTA' variant='medium' onClick={}/>*/}
                </div>
            </div>
            {/* Botao para edicao dos dados */}
            {/*<Button text='EDITAR' variant='medium' onClick={}/>*/}
        </div>
    );
}

export default FormDetalhesProjeto;