import React from 'react';

import './styles.css';

import HomeEdital from '../../components/HomeEdital';
import Sidebar from '../../components/SideBar';


const Edital: React.FC = () => {

    return (
        <div className="container">
            <Sidebar />
            <HomeEdital/>
        </div>  
    );
};

export default Edital;