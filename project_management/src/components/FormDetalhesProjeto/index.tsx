import React, { useState, useEffect } from 'react';
//import { db } from '../../firebase/firebaseUtil';
//import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
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
                    <h4>Nome do Coornedaor</h4>
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
                    <p>detalhametno</p>
                </div>
            </div>
        </div>
    );
}

export default FormDetalhesProjeto;