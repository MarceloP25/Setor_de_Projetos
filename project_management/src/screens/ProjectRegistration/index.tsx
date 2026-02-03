import React from 'react';
import './styles.css';
import FormCadProjeto from '../../components/FormCadProjeto';
import BackButton from '../../components/Backbutton';


const ProjectRegistration: React.FC = () => {

  return (
    <div className='cad-container'>
      <BackButton/>
      <FormCadProjeto />
    </div>
  );
};

export default ProjectRegistration;