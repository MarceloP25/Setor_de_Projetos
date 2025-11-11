import React from 'react';

import { useParams } from 'react-router-dom';
import './styles.css';

import BackButton from '../../components/Backbutton';
import FormDocumentosProjeto from '../../components/FormDocumentosProjeto';


const ProjectDocuments: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className='container'>
            <BackButton />
            <FormDocumentosProjeto projectId={id} />
        </div>
    );
};

export default ProjectDocuments;