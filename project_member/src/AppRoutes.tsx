// src/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import TelaInicial from "./screens/TelaInicial"
import TelaCadastroBasico from "./screens/TelaCadastroBasico";
import TelaSelecionarProjeto from "./screens/TelaSelecionarProjeto";
import TelaModalidadeCurso from "./screens/TelaModalidadeCurso";
import TelaDadosBancarios from "./screens/TelaDadosBancarios";
import TelaSelecaoEdital from "./screens/TelaSeleçãoEdital";
import TelaAgradecimento from "./screens/TelaAgradecimento"
import TelaDados from "./screens/TelaMostraDadosAlunos"


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TelaInicial/>} />
      <Route path="/SelecaoEdital" element={<TelaSelecaoEdital/>} />
      <Route path="/CadastroBasico" element={<TelaCadastroBasico />} />
      <Route path="/SelecionarProjeto" element={<TelaSelecionarProjeto />} />
      <Route path="/ModalidadeCurso" element={<TelaModalidadeCurso />} />
      <Route path="/DadosBancarios" element={<TelaDadosBancarios />} />
      <Route path="/Agradecimento" element={<TelaAgradecimento />} />
      <Route path="/TelaDados" element={<TelaDados/>} />
    </Routes>
  );
};

export default AppRoutes;
