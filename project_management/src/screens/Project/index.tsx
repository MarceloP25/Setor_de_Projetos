import React from 'react';

import './styles.css';

import HomeProjetos from '../../components/HomeProjetos';
import Sidebar from '../../components/SideBar';



const ProjectList: React.FC = () => {

    return (
        <div className="container">
            <Sidebar />
            <HomeProjetos/>
        </div>  
    );
};

export default ProjectList;