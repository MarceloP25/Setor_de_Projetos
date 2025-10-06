import Botao from "../../componentes/Botao";
import { useNavigate } from "react-router-dom";

import "./agradecimento.css";

function TelaAgradecimento() {
  return (
    <>
      <div className="agradecimento-background">
        <h1 className="agradecimento-titulo">
          IFSUDESTEMG - RP
        </h1>
        <div className="agradecimento-container">
          <p className="agradecimento-texto">
            Obrigado por responder o formulario!
          </p>
          <p className="agradecimento-lembrete">
            Seus dados foram salvos, pode fechar agora.
          </p>

        </div>
      </div>
    </>
  );
}

export default TelaAgradecimento;
