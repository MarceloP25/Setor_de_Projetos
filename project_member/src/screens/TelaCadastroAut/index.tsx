import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import InputTexto from "../../componentes/InputText";
import Botao from "../../componentes/Botao";
import "./telaCadastroAut.css";

const Cadastro: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      setErro("⚠️ As senhas não coincidem.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      navigate("/");
    } catch (error: any) {
      setErro(error.message);
    }
  };

  return (
    <div className="cadastroaut-background">
      <h1 className="cadastroaut-titulo">Setor de Projetos IFMG - RP</h1>

      <div className="cadastroaut-container">
        <h2 className="cadastroaut-subtitulo">Cadastro de Usuário</h2>

        <InputTexto
          label="E-mail"
          type="email"
          value={email}
          onChange={(valor) => setEmail(valor)}
        />

        <InputTexto
          label="Senha"
          type="password"
          value={senha}
          onChange={(valor) => setSenha(valor)}
        />

        <InputTexto
          label="Confirmar Senha"
          type="password"
          value={confirmarSenha}
          onChange={(valor) => setConfirmarSenha(valor)}
        />

        <Botao label="Cadastrar" onClick={handleCadastro} tipo="secundario" />

        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </div>
    </div>
  );
};

export default Cadastro;
