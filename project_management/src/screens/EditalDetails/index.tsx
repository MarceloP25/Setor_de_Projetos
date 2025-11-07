import React from 'react';

import { useParams } from 'react-router-dom';
import './styles.css';
import DetalhesEdital from '../../components/DetalhesEdital';


const EditalDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <DetalhesEdital id={id} />
    );
};

export default EditalDetails;