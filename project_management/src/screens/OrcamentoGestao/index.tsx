import React from 'react';

import './styles.css';
import FormOrcamentoGestao from '../../components/FormOrcamentoGestao';
import BackButton from '../../components/Backbutton';





const OrcamentoGestao: React.FC = () => {

    return (
        <div className="orcamento-gestao-container">
            <BackButton />
            <FormOrcamentoGestao />
        </div>  
    );
};

export default OrcamentoGestao;