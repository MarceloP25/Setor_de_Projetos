import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";
import InputText from "../../componentes/InputText";
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

    localStorage.removeItem("projetos");
    localStorage.removeItem("vinculo");
    localStorage.removeItem("valorBolsa");

    navigate("/DadosBancarios");
  };
  const tipoBolsa = localStorage.getItem("tipoBolsa") || "";
  let optionsBolsa: { label: string; value: string }[] = [];
  if (tipoBolsa === "bolsista_medio") {
    optionsBolsa = [
      { label: "Bolsista - Nível Médio", value: "bolsista_medio" },
      { label: "Voluntário", value: "voluntario" },
    ];
  } else if (tipoBolsa === "bolsista_superior") {
    optionsBolsa = [
      { label: "Bolsista - Nível Superior", value: "bolsista_superior" },
      { label: "Voluntário", value: "voluntario" },
    ];
  } else if (tipoBolsa === "colaborador_externo") {
    optionsBolsa = [
      { label: "Colaborador Externo", value: "colaborador_externo" },
      { label: "Voluntário", value: "voluntario" },
    ];
  }

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
          options={optionsBolsa}
          selectedValue={vinculo}
          onChange={(value) => {
            setVinculo(value);
            setValorBolsa("");
            setValorOutro("");
            setErro(false);
          }}
        />

        {/* Renderização condicional dos valores de bolsa */}
        {vinculo === "bolsista_medio" && (
          <RadioInput
            label="Selecione o valor da bolsa:"
            options={[
              { label: "R$ 350", value: "350" },
              { label: "R$ 700", value: "700" },
            ]}
            selectedValue={valorBolsa}
            onChange={(value) => setValorBolsa(value)}
          />
        )}

        {vinculo === "bolsista_superior" && (
          <RadioInput
            label="Selecione o valor da bolsa:"
            options={[
              { label: "R$ 350", value: "350" },
              { label: "R$ 700", value: "700" },
            ]}
            selectedValue={valorBolsa}
            onChange={(value) => setValorBolsa(value)}
          />
        )}

        {vinculo === "colaborador_externo" && (
          <>
            <RadioInput
              label="Selecione o valor da bolsa:"
              options={[
                { label: "R$ 900", value: "900" },
                { label: "Outro", value: "outro" },
              ]}
              selectedValue={valorBolsa || (valorOutro ? "outro" : "")}
              onChange={(value) => {
                if (value === "outro") {
                  setValorBolsa(""); // limpa valorBolsa
                } else {
                  setValorBolsa(value);
                  setValorOutro(""); // limpa campo de outro
                }
              }}
            />

            {/* Se o usuário escolher "Outro", renderiza o InputText */}
            {valorBolsa === "" && (
              <InputText
                label="Digite o valor da bolsa:"
                value={valorOutro}
                onChange={(val) => setValorOutro(val)}
                placeholder="Ex: 1200"
                type="number"
                id="valorOutro"
              />
            )}
          </>
        )}

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
