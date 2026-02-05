import { useNavigate } from "react-router-dom";
import Botao from "../../componentes/Botao";
import "./agradecimento.css";

function TelaAgradecimento() {

  const navigate = useNavigate();
  return (
    <>
      <div className="agradecimento-background">
        <h1 className="agradecimento-titulo">
          IFSUDESTEMG - RP
        </h1>
        <div className="agradecimento-container">
          <p className="agradecimento-texto">
            Obrigado por responder o formulário!
          </p>
          <p className="agradecimento-lembrete">
            Seus dados foram salvos, aperte o botao abaixo para retornar à página inicial.
          </p>
          <Botao
          label="Voltar à página inicial"
          onClick={() => navigate("/Dashboard")}
          tipo="secundario"
           />
        </div>
      </div>
    </>
  );
}

export default TelaAgradecimento;
