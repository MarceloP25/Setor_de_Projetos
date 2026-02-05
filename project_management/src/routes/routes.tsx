import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
//import Sidebar from '../components/SideBar';

// Autenticação
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import PrivateRoute from '../components/PrivateRoute';

// Visão Geral
import VisaoGeral from '../screens/VisaoGeral';

// Projetos
import Project from '../screens/Project';
import ProjetosRegister from '../screens/ProjectRegistration';
import ProjectDetails from '../screens/ProjectDetails';
import ProjectEdit from '../screens/ProjectEdit';
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
import OrcamentoGestao from '../screens/OrcamentoGestao';
import MainLayout from '../layout/MainLayout';

// Membros
import Membros from '../screens/Membros';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública de login */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Rotas protegidas */}
        <Route path="/" element={<Navigate to="/visao_geral" replace />} />
        
        <Route path="/visao_geral" element={
          <PrivateRoute>
            <MainLayout><VisaoGeral /></MainLayout>
          </PrivateRoute>
        } />

        {/* Projetos */}
        <Route path="/projetos" element={
          <PrivateRoute>
            <MainLayout><Project /></MainLayout>
          </PrivateRoute>
        } />
        <Route path="/projetos/cadastrar" element={
          <PrivateRoute>
            <MainLayout><ProjetosRegister /></MainLayout>
          </PrivateRoute>
        } />
        <Route path="/projetos/:projectId" element={
          <PrivateRoute>
            <MainLayout><ProjectDetails /></MainLayout>
          </PrivateRoute>
        } />
        <Route path="/projetos/:projectId/editar" element={
          <PrivateRoute>
            <MainLayout><ProjectEdit /></MainLayout>
          </PrivateRoute>
        } />
        <Route path="/projetos/:projectId/documentos" element={
          <PrivateRoute>
            <MainLayout><ProjectDocuments /></MainLayout>
          </PrivateRoute>
        } />
        <Route path="/projetos/:projectId/avaliacao" element={
          <PrivateRoute>
            <MainLayout><ProjectAvaliacoes /></MainLayout>
          </PrivateRoute>
        } />
        {/* <Route path="/projetos/:projectId/alunos" element={
          <PrivateRoute>
            <MainLayout><ProjectAlunos /></MainLayout>
          </PrivateRoute>
        } /> */}

        {/* Editais */}
        <Route path="/edital" element={
          <PrivateRoute>
            <MainLayout><Editais /></MainLayout>
          </PrivateRoute>
        } />
        <Route path="/edital/cadastrar" element={
          <PrivateRoute>
            <MainLayout><EditalRegister /></MainLayout>
          </PrivateRoute>
        } />
        <Route path="/edital/:editalId" element={
          <PrivateRoute>
            <MainLayout><EditalDetails /></MainLayout>
          </PrivateRoute>
        } />
        <Route path="/edital/:editalId/editar" element={
          <PrivateRoute>
            <MainLayout><EditalEdit /></MainLayout>
          </PrivateRoute>
        } />

        {/* Orçamentos */}
        <Route path="/orcamento" element={
          <PrivateRoute>
            <MainLayout><Orcamento /></MainLayout>
          </PrivateRoute>
        } />

        <Route path="/orcamento/gestao" element={
          <PrivateRoute>
            <MainLayout><OrcamentoGestao /></MainLayout>
          </PrivateRoute>
        } />


        {/* Membros */}
        <Route path="/membros" element={
          <PrivateRoute>
            <MainLayout><Membros /></MainLayout>
          </PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
