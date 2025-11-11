import React from 'react';

import './styles.css';
import Sidebar from '../../components/SideBar';




const Orcamento: React.FC = () => {

    return (
        <div className="container">
            <Sidebar />
            <div>
                <h1>Orçamento</h1>
                <p>Esta é a futura tela de Orçamento.</p>
            </div>
        </div>  
    );
};

export default Orcamento;