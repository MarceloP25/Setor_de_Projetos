import React from 'react';
import Sidebar from '../components/SideBar';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <aside className="layout-sidebar">
        <Sidebar />
      </aside>
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
