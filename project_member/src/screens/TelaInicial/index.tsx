import Botao from "../../componentes/Botao";
import { useNavigate } from "react-router-dom";

import "./inicial.css";

function TelaInicial() {
  const navigate = useNavigate();
  return (
    <>
      <div className="inicial-background">
        <h1 className="inicial-titulo">
          Bem-vindo ao Formulário do IFSUDESTEMG - RP
        </h1>
        <div className="inicial-container">
          <p className="inicial-texto">
            Bem-vindo ao sistema de projetos do Instituto Federal do Sudeste de
            Minas Gerais Campus Rio Pomba!
          </p>
          <p className="inicial-lembrete">
            Clique no botão abaixo para iniciar o processo de se cadastrar,
            lembre-se de preencher cuidadosamente os dados.
          </p>
          <Botao
            label="Cadastre-se"
            onClick={() => navigate("/SelecaoEdital")}
            tipo="secundario"
          />{" "}
        </div>
      </div>
    </>
  );
}

export default TelaInicial;
