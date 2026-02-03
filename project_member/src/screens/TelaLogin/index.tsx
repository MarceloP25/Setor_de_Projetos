import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import InputTexto from "../../componentes/InputText";
import Botao from "../../componentes/Botao";
import "./telaLogin.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/Dashboard");
    } catch (error: any) {
      setErro("⚠️ E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="loginaut-background">
      <h1 className="loginaut-titulo">Setor de Projetos IFMG - RP</h1>

      <div className="loginaut-container">
        <h2 className="loginaut-subtitulo">Login</h2>

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
        <h3>Não possui cadastro? <a className="loginaut-link" href="/CadastroAut">Cadastre-se</a></h3>

        <Botao label="Entrar" onClick={handleLogin} tipo="secundario" />

        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </div>
    </div>
  );
};

export default Login;
