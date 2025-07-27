import { Routes, Route, BrowserRouter } from 'react-router-dom';
//import Sidebar from '../components/Sidebar';
// import VisaoGeral from './pages/VisaoGeral';
import ProjetosCad from '../screens/CadastroProjeto';
import ProjectList from '../screens/HomeProjeto';
// import Orcamentos from './pages/Orcamentos';
//import Editais from '../screens/Edital';
//import ProjectEdit from '../screens/EdicaoProjeto';
//import ProjectDetails from '../screens/DetalhesProjeto';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/edital" element={<Editais />} />
            {/* <Route path="/visao_geral" element={<VisaoGeral />} /> */}
            <Route path="/projetos" element={<ProjectList />} />
            <Route path="/projetos/cadastrar" element={<ProjetosCad />} />
            <Route path="/projetos/:projectId" element={<ProjectDetails />} />
            {/* <Route path="/orcamentos" element={<Orcamentos />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
