import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputSelect from "/home/serafim/FormularioDeDadosIFSUDESTEMG/FomularioIFSUDESTEMGRP/src/componentes/InputSelect/index.tsx";
import Botao from "/home/serafim/FormularioDeDadosIFSUDESTEMG/FomularioIFSUDESTEMGRP/src/componentes/Botao/index.tsx";

import "./selecaoedital.css";
function TelaSeleçãoEdital() {
  const [edital, setEdital] = useState("");

  const navigate = useNavigate();

  const opcoes = [
    { valor: "piaex", label: "Discentes PIAEX" },
    { valor: "arteecultura", label: "Discentes Arte e Cultura" },
  ];

  const handleSalvar = () => {
    localStorage.setItem("edital", edital);
    navigate("/CadastroBasico");
  };

  return (
    <>
      <div className="selecaoedital-background">
        <h1 className="selecaoedital-titulo">Setor de Projetos IFMG - RP</h1>
        <div className="selecaoedital-container">
          <p className="selecaoedital-texto">
            Selecione o edital que o projeto que voce participa esta cadastrado:
          </p>
          <InputSelect
            label="Selecione o edital:"
            opcoes={opcoes}
            valorSelecionado={edital}
            onChange={setEdital}
          />
          <p className="selecaoedital-lembrete">
            Clique no botão abaixo para continuar o processo de se cadastrar,
            lembre-se de preencher cuidadosamente os dados.
          </p>
          <Botao label="Proximo" onClick={handleSalvar} tipo="secundario" />{" "}
        </div>
      </div>
    </>
  );
}

export default TelaSeleçãoEdital;
