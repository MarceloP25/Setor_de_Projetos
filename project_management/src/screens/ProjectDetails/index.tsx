import React from 'react';

import { useParams } from 'react-router-dom';
import './styles.css';
import DetalhesProjeto from '../../components/DetalhesProjeto';


const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <DetalhesProjeto projectId={id} />
    );
};

export default ProjectDetails;