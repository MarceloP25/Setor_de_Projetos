import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputSelect from "../../componentes/InputSelect";
import Botao from "../../componentes/Botao";

import "./selecaoedital.css";

function TelaSeleçãoEdital() {
  const [edital, setEdital] = useState("");
  const [erro, setErro] = useState(false);

  const navigate = useNavigate();

  const opcoes = [
    { valor: "piaex", label: "Discentes PIAEX" },
    { valor: "arteecultura", label: "Discentes Arte e Cultura" },
  ];

  const handleSalvar = () => {
    if (!edital) {
      setErro(true);
      return;
    }

    localStorage.setItem("edital", edital);
    navigate("/CadastroBasico");
  };

  return (
    <div className="selecaoedital-background">
      <h1 className="selecaoedital-titulo">Setor de Projetos IFMG - RP</h1>
      <div className="selecaoedital-container">
        <p className="selecaoedital-texto">
          Selecione o edital que o projeto que você participa está cadastrado:
        </p>

        <InputSelect
          label="Selecione o edital:"
          opcoes={opcoes}
          valorSelecionado={edital}
          onChange={(valor) => {
            setEdital(valor);
            setErro(false);
          }}
        />

        {erro && (
          <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>
            ⚠️ Você precisa selecionar um edital antes de continuar.
          </p>
        )}

        <p className="selecaoedital-lembrete">
          Clique no botão abaixo para continuar o processo de se cadastrar.
          Lembre-se de preencher cuidadosamente os dados.
        </p>

        <Botao label="Próximo" onClick={handleSalvar} tipo="secundario" />
      </div>
    </div>
  );
}

export default TelaSeleçãoEdital;
