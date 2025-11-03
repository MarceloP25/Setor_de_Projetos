import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/SideBar';
// import VisaoGeral from './pages/VisaoGeral';
import Projetos from '../screens/ProjectRegistration';
import ProjectList from '../screens/Project';
// import Orcamentos from './pages/Orcamentos';
// import Editais from '../screens/Edital';
// import ProjectEdit from '../screens/ProjectEdit';
import ProjectDetails from '../screens/ProjectDetails';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            {/* <Route path="/visao_geral" element={<VisaoGeral />} /> */}
            <Route path="/projetos" element={<ProjectList />} />
            <Route path="/projetos/cadastrar" element={<Projetos />} />
            <Route path="/projetos/:projectId" element={<ProjectDetails />} />
            {/* <Route path="/orcamentos" element={<Orcamentos />} /> */}
            {/* <Route path="/edital" element={<Editais />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;