import Botao from "../../componentes/Botao";
import InputTexto from "../../componentes/InputText";
import InputSelect from "../../componentes/InputSelect";
import { useNavigate } from "react-router-dom";
import { salvarDados } from "../../utils/firebaseUtils";

import React from "react";
import "./basico.css";

function TelaCadastroBasico() {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [sexo, setSexo] = React.useState("");
  const [erro, setErro] = React.useState(false);

  const opcoes = [
    { valor: "feminino", label: "Feminino" },
    { valor: "masculino", label: "Masculino" },
    { valor: "outro", label: "Outro" },
    { valor: "nao-informar", label: "Prefiro não informar" },
  ];
  const formatarCPF = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const formatarTelefone = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  };

  const navigate = useNavigate();
  const edital = localStorage.getItem("edital");

  const handleSalvar = () => {
    if (!nome || !email || !telefone || !cpf || !sexo) {
      setErro(true);
      return;
    }

    localStorage.setItem("nome", nome);
    localStorage.setItem("email", email);
    localStorage.setItem("telefone", telefone);
    localStorage.setItem("sexo", sexo);
    localStorage.setItem("cpf", cpf);
    salvarDados({ nome, email, telefone, cpf, sexo, edital });
    navigate("/ModalidadeCurso");
  };

  return (
    <div className="basico-background">
      <h1 className="basico-titulo">Setor de Projetos IFMG - RP</h1>
      <div className="basico-container">
        <p className="basico-texto">
          Preencha as informações abaixo para continuar o cadastro:
        </p>

        <InputTexto
          label="Nome Completo"
          value={nome}
          onChange={(valor) => {
            setNome(valor);
            setErro(false);
          }}
          placeholder="Digite seu nome"
        />
        <InputTexto
          label="E-mail"
          value={email}
          onChange={(valor) => {
            setEmail(valor);
            setErro(false);
          }}
          placeholder="Digite seu e-mail"
        />
        <InputTexto
  label="CPF | 000.000.000-00"
  value={cpf}
  onChange={(valor) => {
    setCpf(formatarCPF(valor));
    setErro(false);
  }}
  placeholder="Digite seu CPF"
/>

<InputTexto
  label="Telefone | (DDD) 00000-0000"
  value={telefone}
  onChange={(valor) => {
    setTelefone(formatarTelefone(valor));
    setErro(false);
  }}
  placeholder="Digite seu telefone"
/>

        <InputSelect
          label="Selecione seu sexo:"
          opcoes={opcoes}
          valorSelecionado={sexo}
          onChange={(valor) => {
            setSexo(valor);
            setErro(false);
          }}
        />

        {erro && (
          <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>
            ⚠️ Preencha todos os campos antes de continuar.
          </p>
        )}

        <Botao label="Próximo" onClick={handleSalvar} tipo="secundario" />

        <p className="basico-lembrete">
          Clique no botão acima para continuar o processo de se cadastrar.
          Lembre-se de preencher cuidadosamente os dados.
        </p>
      </div>
    </div>
  );
}

export default TelaCadastroBasico;
