import React from 'react';

import './styles.css';
import Sidebar from '../../components/SideBar';




const VisaoGeral: React.FC = () => {

    return (
        <div className="container">
            <Sidebar />
            <div>
                <h1>Visão Geral</h1>
                <h3>Bem-vindo à página de Visão Geral do Sistema de Gerenciamento de Projetos!</h3>
                <p>Aqui você terá futuramente uma visão consolidada dos principais indicadores e métricas relacionadas aos projetos em andamento, editais e orçamentos.</p>
                <p>Utilize o menu lateral para navegar entre as diferentes seções do sistema e acessar funcionalidades específicas.</p>
            </div>
        </div>  
    );
};

export default VisaoGeral;