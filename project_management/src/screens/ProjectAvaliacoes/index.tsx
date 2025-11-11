import React from 'react';

import { useParams } from 'react-router-dom';
import './styles.css';
import BackButton from '../../components/Backbutton';
import FormAvaliadores from '../../components/FormAvaliadores';


const ProjectAvaliacoes: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className='container'>
            <BackButton />
            <FormAvaliadores projectId={id} />
        </div>
    );
};

export default ProjectAvaliacoes;