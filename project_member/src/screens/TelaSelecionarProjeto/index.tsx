import React from "react";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../componentes/InputSelect";
import InputTexto from "../../componentes/InputText";
import Botao from "../../componentes/Botao";
import RadioInput from "../../componentes/RadioInput";
import { salvarDados } from "../../utils/firebaseUtils";
import "./style.css";

function TelaSelecionarProjeto() {
  const [projetos, setProjetos] = React.useState("");
  const [vinculo, setVinculo] = React.useState("");
  const [valorBolsa, setValorBolsa] = React.useState("");
  const [valorOutro, setValorOutro] = React.useState("");

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

  const handleSalvar = () => {
    localStorage.setItem("projetos", projetos);
    localStorage.setItem("vinculo", vinculo);
    localStorage.setItem("valorBolsa", valorBolsa);
    localStorage.setItem("valorOutro", valorOutro);

    salvarDados({ projetos, vinculo, valorBolsa, valorOutro });
    navigate("/DadosBancarios");
  };

  const bolsaOptions =
    valorBolsaOptions[vinculo as keyof typeof valorBolsaOptions] || [];
  const navigate = useNavigate();
  return (
    <div className="projeto-background">
      <h1 className="projeto-titulo">Setor de Projetos IFMG - RP</h1>
      <div className="projeto-container">
        <InputSelect
          label="Selecione o projeto que você participa:"
          opcoes={opcoesProjetos}
          valorSelecionado={projetos}
          onChange={setProjetos}
        />

        <RadioInput
          label="Qual o seu tipo de participação no projeto?"
          options={tipoVinculoOptions}
          selectedValue={vinculo}
          onChange={(value) => {
            setVinculo(value);
            setValorBolsa("");
            setValorOutro("");
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
              }}
            />
          </>
        )}

        {vinculo === "colaborador_externo" && valorBolsa === "" && (
          <InputTexto
            label="Digite o valor da bolsa:"
            value={valorOutro}
            onChange={setValorOutro}
            placeholder="insira o valor assim: Ex: 100 se voce recebe R$100,00"
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
                  → Valor digitado: <strong> R$: {valorOutro},00</strong>
                </>
              )}
          </p>
        )}

        <Botao label="Próximo" onClick={handleSalvar} tipo="secundario" />
      </div>
    </div>
  );
}

export default TelaSelecionarProjeto;
