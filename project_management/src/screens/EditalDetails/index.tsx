import React from 'react';

import { useParams } from 'react-router-dom';
import './styles.css';
import DetalhesEdital from '../../components/DetalhesEdital';
import BackButton from '../../components/Backbutton';


const EditalDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="details-container">
            <BackButton />
            <DetalhesEdital editalId={id} />
        </div>
    );
};

export default EditalDetails;