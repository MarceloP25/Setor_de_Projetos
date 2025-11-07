import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // volta uma página no histórico
  };

  return (
    <button className="back-button" onClick={handleBack}>
      <span className="arrow">&lt;</span>
    </button>
  );
};

export default BackButton;
