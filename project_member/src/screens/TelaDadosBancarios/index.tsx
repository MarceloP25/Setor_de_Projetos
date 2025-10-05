import React from "react";
import { salvarDados } from "../../utils/firebaseUtils";
import { enviarDadosParaSheetDB } from "../../utils/sheetdbUtils";

import InputText from "../../componentes/InputText/index.tsx";
import Botao from "../../componentes/Botao/index.tsx";
import "./bancarios.css";

function TelaDadosBancarios() {
  const [banco, setBanco] = React.useState("");
  const [agencia, setAgencia] = React.useState("");
  const [conta, setConta] = React.useState("");
  const handleSalvar = async () => {
  localStorage.setItem("banco", banco);
  localStorage.setItem("agencia", agencia);
  localStorage.setItem("conta", conta);

  salvarDados({ banco, agencia, conta });

  try {
    await enviarDadosParaSheetDB();
    alert("✅ Dados enviados com sucesso!");
  } catch (erro) {
    alert("❌ Erro ao enviar os dados. Tente novamente.");
    console.error(erro);
  }
};

  return (
    <>
      <div className="dadosBancarios-background">
        <h1 className="dadosBancarios-titulo">Setor de Projetos IFMG - RP</h1>
        <div className="dadosBancarios-container">
          <p className="dadosBancarios-texto">Cadastre seus dados bancários</p>
          <p className="dadosBancarios-lembrete">
            lembre-se de que eles devem ser de uma conta pessoal, não sendo
            aceito contas de terceiros. E ser uma conta do tipo corrente
          </p>
          <InputText
            label="Nome do seu banco"
            value={banco}
            onChange={setBanco}
            placeholder="Digite o nome do seu banco"
          />
          <InputText
            label="Número de sua Agência"
            value={agencia}
            onChange={setAgencia}
            placeholder="Digite o número da sua agência"
          />
          <InputText
            label="Número da sua Conta"
            value={conta}
            onChange={setConta}
            placeholder="Digite o número da sua conta"
          />
          <Botao label="Proximo" onClick={handleSalvar} tipo="secundario" />{" "}
        </div>
      </div>
    </>
  );
}

export default TelaDadosBancarios;
