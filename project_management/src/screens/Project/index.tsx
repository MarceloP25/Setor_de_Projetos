import React from 'react';

import './styles.css';

import HomeProjetos from '../../components/HomeProjetos';



const ProjectList: React.FC = () => {

    return (
        <div className="home-project-container">
            <HomeProjetos/>
        </div>  
    );
};

export default ProjectList;