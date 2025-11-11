import React from 'react';
import './styles.css';
import BackButton from '../../components/Backbutton';
import FormCadEdital from '../../components/FormCadEdital';


const EditalRegistration: React.FC = () => {

  return (
    <div className='cad-container'>
      <BackButton/>
      <FormCadEdital />
    </div>
  );
};

export default EditalRegistration;