import React from 'react';

import { useParams } from 'react-router-dom';
import './styles.css';

import FormEditProjeto from '../../components/FormEditProjeto';
import BackButton from '../../components/Backbutton';


const ProjectEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className='edit-container'>
            <BackButton />
            <FormEditProjeto projectId={id} />
        </div>
    );
};

export default ProjectEdit;