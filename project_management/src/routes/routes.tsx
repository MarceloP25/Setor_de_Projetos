import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/SideBar';

// Visão Geral
import VisaoGeral from '../screens/VisaoGeral';

// Projetos
import Project from '../screens/Project';
import ProjetosRegister from '../screens/ProjectRegistration';
import ProjectDetails from '../screens/ProjectDetails';
import ProjectEdit from '../screens/ProjectEdit'
// import ProjectDocuments from '../screens/ProjectDocuments';
// import ProjectAvaliacoes from '../screens/ProjectAvaliacoes';

// Editais
import Editais from '../screens/Edital';
import EditalRegister from '../screens/EditalRegistration';
import EditalDetails from '../screens/EditalDetails';

// Orçamentos
import Orcamento from '../screens/Orcamento';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/visao_geral" element={<VisaoGeral />} /> {/* Tem Sidebar */}

            <Route path="/projetos" element={<Project />} /> {/* Tem Sidebar */}
            <Route path="/projetos/cadastrar" element={<ProjetosRegister />} />
            <Route path="/projetos/:projectId" element={<ProjectDetails />} />
            <Route path="/projetos/:projectId/editar" element={<ProjectEdit />} /> 
            {/* <Route path="/projetos/:projectId/documentos" element={<ProjectDocuments />} /> */}
            {/* <Route path="/projetos/:projectId/avaliacao" element={<ProjectAvaliacoes />} /> */}
            {/* <Route path="/projetos/:projectId/alunos" element={<ProjectAlunos />} /> */}

            <Route path="/edital" element={<Editais />} /> {/* Tem Sidebar */}
            <Route path="/edital/cadastrar" element={<EditalRegister />} />
            <Route path="/edital/:editalId" element={<EditalDetails />} />


            <Route path="/orcamento" element={<Orcamento />} /> {/* Tem Sidebar */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;