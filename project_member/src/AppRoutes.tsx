// src/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import TelaCadastroBasico from "./screens/TelaCadastroBasico";
import TelaSelecionarProjeto from "./screens/TelaSelecionarProjeto";
import TelaModalidadeCurso from "./screens/TelaModalidadeCurso";
import TelaDadosBancarios from "./screens/TelaDadosBancarios";
import TelaSeleçãoEdital from "./screens/TelaSeleçãoEdital";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TelaSeleçãoEdital/>} />
      <Route path="/CadastroBasico" element={<TelaCadastroBasico />} />
      <Route path="/SelecionarProjeto" element={<TelaSelecionarProjeto />} />
      <Route path="/ModalidadeCurso" element={<TelaModalidadeCurso />} />
      <Route path="/DadosBancarios" element={<TelaDadosBancarios />} />
    </Routes>
  );
};

export default AppRoutes;
