import Botao from "../../componentes/Botao";
import InputTexto from "../../componentes/InputText";
import InputSelect from "../../componentes/InputSelect";
import { useNavigate } from "react-router-dom";
import { salvarDados } from "../../utils/firebaseUtils";

import React from "react";
import "./style.css";

function TelaCadastroBasico() {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [sexo, setSexo] = React.useState("");
  const opcoes = [
    { valor: "feminino", label: "Feminino" },
    { valor: "masculino", label: "Masculino" },
    { valor: "outro", label: "Outro" },
    { valor: "nao-informar", label: "Prefiro não informar" },
  ];

  const navigate = useNavigate();
  const edital = localStorage.getItem("edital");
  const handleSalvar = () => {
    localStorage.setItem("nome", nome);
    localStorage.setItem("email", email);
    localStorage.setItem("telefone", telefone);
    localStorage.setItem("sexo", sexo);
    localStorage.setItem("cpf", cpf);
    salvarDados({ nome, email, telefone, cpf, sexo, edital });
    navigate("/ModalidadeCurso");
  };

  return (
    <>
      <div className="basico-background">
        <h1 className="basico-titulo">Setor de Projetos IFMG - RP</h1>
        <div className="basico-container">
          <p className="basico-texto">
            Preencha as informações abaixo para continuar o cadastro:
          </p>
          <InputTexto
            label="Nome Completo"
            value={nome}
            onChange={setNome}
            placeholder="Digite seu nome"
          />
          <InputTexto
            label="E-mail"
            value={email}
            onChange={setEmail}
            placeholder="Digite seu e-mail"
          />
          <InputTexto
            label="Telefone | Dessa forma (DDD) 00000-0000"
            value={telefone}
            onChange={setTelefone}
            placeholder="Digite seu telefone"
          />
          <InputTexto
            label="CPF | Dessa forma 000.000.000-00"
            value={cpf}
            onChange={setCpf}
            placeholder="Digite seu CPF"
          />
          <InputSelect
            label="Selecione seu sexo:"
            opcoes={opcoes}
            valorSelecionado={sexo}
            onChange={setSexo}
          />
          <Botao label="Proximo" onClick={handleSalvar} tipo="secundario" />{" "}
          <p className="basico-lembrete">
            Clique no botão abaixo para continuar o processo de se cadastrar,
            lembre-se de preencher cuidadosamente os dados.
          </p>
        </div>
      </div>
    </>
  );
}

export default TelaCadastroBasico;
