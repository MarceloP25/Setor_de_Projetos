import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../componentes/InputSelect";
import InputTexto from "../../componentes/InputText";
import Botao from "../../componentes/Botao";
import RadioInput from "../../componentes/RadioInput";
import { salvarDados } from "../../utils/firebaseUtils";
import "./selecaoprojeto.css";

function TelaSelecionarProjeto() {
  const [projetos, setProjetos] = useState("");
  const [vinculo, setVinculo] = useState("");
  const [valorBolsa, setValorBolsa] = useState("");
  const [valorOutro, setValorOutro] = useState("");
  const [erro, setErro] = useState(false);

  const navigate = useNavigate();

  const opcoesProjetos = [
    { valor: "projeto1", label: "Projeto 1" },
    { valor: "projeto2", label: "Projeto 2" },
    { valor: "projeto3", label: "Projeto 3" },
    { valor: "projeto4", label: "Projeto 4" },
  ];

  const tipoVinculoOptions = [
    { label: "Bolsista - Nível Médio", value: "bolsista_medio" },
    { label: "Bolsista - Nível Superior", value: "bolsista_superior" },
    { label: "Voluntário", value: "voluntario" },
    { label: "Colaborador Externo", value: "colaborador_externo" },
  ];

  const valorBolsaOptions = {
    bolsista_medio: [{ label: "R$ 350,00", value: "350" }],
    bolsista_superior: [
      { label: "R$ 350,00", value: "350" },
      { label: "R$ 700,00", value: "700" },
    ],
    colaborador_externo: [
      { label: "R$ 900,00", value: "900" },
      { label: "Outro valor", value: "" },
    ],
  };

  const bolsaOptions =
    valorBolsaOptions[vinculo as keyof typeof valorBolsaOptions] || [];

  const handleSalvar = () => {
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
          opcoes={opcoesProjetos}
          valorSelecionado={projetos}
          onChange={(valor) => {
            setProjetos(valor);
            setErro(false);
          }}
        />

        <RadioInput
          label="Qual o seu tipo de participação no projeto?"
          options={tipoVinculoOptions}
          selectedValue={vinculo}
          onChange={(value) => {
            setVinculo(value);
            setValorBolsa("");
            setValorOutro("");
            setErro(false);
          }}
        />

        {(vinculo === "bolsista_medio" ||
          vinculo === "bolsista_superior" ||
          vinculo === "colaborador_externo") && (
          <>
            <p className="curso-texto">Selecione o valor da bolsa:</p>
            <RadioInput
              label="Valor da Bolsa"
              options={bolsaOptions}
              selectedValue={valorBolsa}
              onChange={(value) => {
                setValorBolsa(value);
                setValorOutro("");
                setErro(false);
              }}
            />
          </>
        )}

        {vinculo === "colaborador_externo" && valorBolsa === "" && (
          <InputTexto
            label="Digite o valor da bolsa:"
            value={valorOutro}
            onChange={(valor) => {
              setValorOutro(valor);
              setErro(false);
            }}
            placeholder="Ex: 100 para R$100,00"
          />
        )}

        {vinculo && (
          <p className="modalidade-lembrete">
            ✅ Vínculo selecionado:{" "}
            <strong>
              {tipoVinculoOptions.find((op) => op.value === vinculo)?.label}
            </strong>
            {valorBolsa && (
              <>
                {" "}
                → Valor da bolsa:{" "}
                <strong>
                  {bolsaOptions.find((op) => op.value === valorBolsa)?.label}
                </strong>
              </>
            )}
            {vinculo === "colaborador_externo" &&
              valorBolsa === "" &&
              valorOutro && (
                <>
                  {" "}
                  → Valor digitado: <strong>R$ {valorOutro},00</strong>
                </>
              )}
          </p>
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
