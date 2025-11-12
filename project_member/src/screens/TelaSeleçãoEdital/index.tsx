import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import InputSelect from "../../componentes/InputSelect";
import Botao from "../../componentes/Botao";

import "./selecaoedital.css";

type OpcaoEdital = {
  valor: string;
  label: string;
};

function TelaSeleçãoEdital() {
  const [edital, setEdital] = useState("");
  const [erro, setErro] = useState(false);
  const [opcoes, setOpcoes] = useState<OpcaoEdital[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEditais = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "editais"));
        const lista: OpcaoEdital[] = querySnapshot.docs.map((doc) => {
          const dados = doc.data();
          return {
            valor: doc.id,
            label: dados.nomeEdital,
          };
        });
        setOpcoes(lista);
      } catch (error) {
        console.error("Erro ao buscar editais:", error);
      }
    };

    fetchEditais();
  }, []);

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
