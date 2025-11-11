import React from 'react';

import { useParams } from 'react-router-dom';
import './styles.css';
import DetalhesProjeto from '../../components/DetalhesProjeto';
import BackButton from '../../components/Backbutton';


const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className='container'>
            <BackButton />
            <DetalhesProjeto projectId={id} />
        </div>
    );
};

export default ProjectDetails;