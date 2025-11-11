import React from 'react';

import { useParams } from 'react-router-dom';
import './styles.css';

import BackButton from '../../components/Backbutton';
import FormEditEdital from '../../components/FormEditEdital';

const ProjectEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className='edit-container'>
            <BackButton />
            <FormEditEdital editalId={id} />
        </div>
    );
};

export default ProjectEdit;