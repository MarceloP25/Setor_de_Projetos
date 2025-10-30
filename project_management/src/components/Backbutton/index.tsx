import React from 'react';
//import { useNavigate } from 'react-router-dom';
import './styles.css';

const BackButton: React.FC = () => {
  //const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => {/*navigate(-1)*/}}>
      <span className="arrow">&lt;</span>
    </button>
  );
};

export default BackButton;
