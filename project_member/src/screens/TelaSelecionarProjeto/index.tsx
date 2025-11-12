import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";

import InputSelect from "../../componentes/InputSelect";
import Botao from "../../componentes/Botao";
import RadioInput from "../../componentes/RadioInput";
import { salvarDados } from "../../utils/firebaseUtils";
import "./selecaoprojeto.css";

type OpcaoProjeto = {
  valor: string;
  label: string;
};

function TelaSelecionarProjeto() {
  const [projetos, setProjetos] = useState("");
  const [listaProjetos, setListaProjetos] = useState<OpcaoProjeto[]>([]);
  const [vinculo, setVinculo] = useState("");
  const [valorBolsa, setValorBolsa] = useState("");
  const [valorOutro, setValorOutro] = useState("");
  const [erro, setErro] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projetos"));
        const lista: OpcaoProjeto[] = querySnapshot.docs.map((doc) => {
          const dados = doc.data();
          return {
            valor: doc.id,
            label: dados.nomeProjeto,
          };
        });
        setListaProjetos(lista);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };

    fetchProjetos();
  }, []);

  const handleSalvar = async () => {
    const precisaValor =
      vinculo === "bolsista_medio" ||
      vinculo === "bolsista_superior" ||
      vinculo === "colaborador_externo";

    const valorFinal =
      vinculo === "colaborador_externo" && valorBolsa === ""
        ? valorOutro
        : valorBolsa;

    if (!projetos || !vinculo || (precisaValor && !valorFinal)) {
      setErro(true);
      return;
    }

    const nome = localStorage.getItem("nome");

    try {
      if (nome) {
        const projetoRef = doc(db, "projetos", projetos);
        await updateDoc(projetoRef, {
          alunosParticipantes: arrayUnion(nome),
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar aluno no projeto:", error);
    }

    localStorage.setItem("projetos", projetos);
    localStorage.setItem("vinculo", vinculo);
    localStorage.setItem("valorBolsa", valorFinal);

    salvarDados({ projetos, vinculo, valorBolsa: valorFinal });
    navigate("/DadosBancarios");
  };

  return (
    <div className="projeto-background">
      <h1 className="projeto-titulo">Setor de Projetos IFMG - RP</h1>
      <div className="projeto-container">
        <InputSelect
          label="Selecione o projeto que você participa:"
          opcoes={listaProjetos}
          valorSelecionado={projetos}
          onChange={(valor) => {
            setProjetos(valor);
            setErro(false);
          }}
        />

        <RadioInput
          label="Qual o seu tipo de participação no projeto?"
          options={[
            { label: "Bolsista - Nível Médio", value: "bolsista_medio" },
            { label: "Bolsista - Nível Superior", value: "bolsista_superior" },
            { label: "Voluntário", value: "voluntario" },
            { label: "Colaborador Externo", value: "colaborador_externo" },
          ]}
          selectedValue={vinculo}
          onChange={(value) => {
            setVinculo(value);
            setValorBolsa("");
            setValorOutro("");
            setErro(false);
          }}
        />

        {erro && (
          <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>
            ⚠️ Preencha todos os campos obrigatórios antes de continuar.
          </p>
        )}

        <Botao label="Próximo" onClick={handleSalvar} tipo="secundario" />
      </div>
    </div>
  );
}

export default TelaSelecionarProjeto;
