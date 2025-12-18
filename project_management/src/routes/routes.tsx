import { Routes, Route, BrowserRouter } from 'react-router-dom';
//import Sidebar from '../components/SideBar';

// Visão Geral
import VisaoGeral from '../screens/VisaoGeral';

// Projetos
import Project from '../screens/Project';
import ProjetosRegister from '../screens/ProjectRegistration';
import ProjectDetails from '../screens/ProjectDetails';
import ProjectEdit from '../screens/ProjectEdit'
import ProjectDocuments from '../screens/ProjectDocuments';
import ProjectAvaliacoes from '../screens/ProjectAvaliacoes';
// import ProjectAlunos from '../screens/ProjectAlunos';

// Editais
import Editais from '../screens/Edital';
import EditalRegister from '../screens/EditalRegistration';
import EditalDetails from '../screens/EditalDetails';
import EditalEdit from '../screens/EditalEdit';

// Orçamentos
import Orcamento from '../screens/Orcamento';
import MainLayout from '../layout/MainLayout';
import OrcamentoGestao from '../screens/OrcamentoGestao';

// Membros
import Membros from '../screens/Membros';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      
        <MainLayout >
        
          <Routes>
            <Route path="/visao_geral" element={<VisaoGeral />} />

            <Route path="/projetos" element={<Project />} />
            <Route path="/projetos/cadastrar" element={<ProjetosRegister />} />
            <Route path="/projetos/:projectId" element={<ProjectDetails />} />
            <Route path="/projetos/:projectId/editar" element={<ProjectEdit />} /> 
            <Route path="/projetos/:projectId/documentos" element={<ProjectDocuments />} /> 
            <Route path="/projetos/:projectId/avaliacao" element={<ProjectAvaliacoes />} /> 
            {/* <Route path="/projetos/:projectId/membros" element={<ProjectAlunos />} /> */}


            <Route path="/edital" element={<Editais />} />
            <Route path="/edital/cadastrar" element={<EditalRegister />} />
            <Route path="/edital/:editalId" element={<EditalDetails />} />
            <Route path="/edital/:editalId/editar" element={<EditalEdit />} />


            <Route path="/orcamento" element={<Orcamento />} />
            <Route path="/orcamento/gestao" element={<OrcamentoGestao />} />


            <Route path="/membros" element={<Membros />} />
          </Routes>
       
        </MainLayout>
      
    </BrowserRouter>
  );
};

export default AppRoutes;