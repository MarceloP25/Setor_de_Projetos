import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RadioInput from "../../componentes/RadioInput";
import Botao from "../../componentes/Botao";
import { salvarDados } from "../../utils/firebaseUtils";
import "./style.css";

const nivelEnsinoOptions = [
  { label: "Técnico integrado", value: "tecnico_integrado" },
  {
    label: "Técnico concomitante/subsequente",
    value: "tecnico_concomitante_subsequente",
  },
  { label: "Técnico subsequente EAD", value: "tecnico_subsequente_ead" },
  { label: "Graduação", value: "graduacao" },
  { label: "Pós-graduação lato sensu", value: "pos_lato_sensu" },
  { label: "Pós-graduação stricto sensu", value: "pos_stricto_sensu" },
  {
    label:
      "Não sou aluno do IFSudesteMG (casos aplicados ao COLABORADOR EXTERNO)",
    value: "nao_sou_aluno",
  },
];

const cursosPorNivel: Record<string, { label: string; value: string }[]> = {
  tecnico_integrado: [
    { label: "Agropecuária", value: "agropecuaria" },
    { label: "Alimentos", value: "alimentos" },
    { label: "Informática", value: "informatica" },
    { label: "Meio Ambiente", value: "meio_ambiente" },
    { label: "Comércio - EJA/EPT", value: "comercio_eja_ept" },
    { label: "Química", value: "quimica" },
    { label: "Zootecnia", value: "zootecnia" },
  ],
  tecnico_concomitante_subsequente: [
    { label: "Administração", value: "administracao" },
    { label: "Segurança do Trabalho", value: "seguranca_do_trabalho" },
    { label: "Serviços Jurídicos", value: "servicos_juridicos" },
  ],
  tecnico_subsequente_ead: [
    { label: "Alimentos", value: "alimentos" },
    { label: "Meio Ambiente", value: "meio_ambiente" },
    { label: "Secretaria Escolar", value: "secretaria_escolar" },
    { label: "Zootecnia", value: "zootecnia" },
    { label: "Segurança do Trabalho", value: "seguranca_do_trabalho" },
  ],
  graduacao: [
    { label: "Agronomia", value: "agronomia" },
    { label: "Administração", value: "administracao" },
    { label: "Agroecologia", value: "agroecologia" },
    { label: "Ciência da Computação", value: "ciencia_da_computacao" },
    {
      label: "Ciência e Tecnologia de Alimentos",
      value: "ciencia_tecnologia_alimentos",
    },
    {
      label: "Ciência e Tecnologia de Laticínios",
      value: "ciencia_tecnologia_laticinios",
    },
    { label: "Direito", value: "direito" },
    {
      label: "Educação Física - Bacharelado",
      value: "educacao_fisica_bacharelado",
    },
    {
      label: "Licenciatura em Educação Física",
      value: "licenciatura_educacao_fisica",
    },
    { label: "Licenciatura em Matemática", value: "licenciatura_matematica" },
    {
      label: "Tecnologia de Laticínios - EAD",
      value: "tecnologia_laticinios_ead",
    },
    { label: "Zootecnia", value: "zootecnia" },
  ],

  pos_lato_sensu: [
    { label: "Agroecologia - 2023", value: "agroecologia_2023" },
    {
      label: "Desenvolvimento Web e Mobile - 2023",
      value: "desenvolvimento_web_mobile_2023",
    },
    {
      label: "Docência na Educação Profissional e Tecnológica - 2024",
      value: "docencia_ept_2024",
    },
    {
      label: "Ensino de Matemática e Física - EAD - 2024",
      value: "matematica_fisica_ead_2024",
    },
    { label: "MBA em Gestão Empreendedora", value: "mba_gestao_empreendedora" },
  ],
  pos_stricto_sensu: [
    {
      label: "Mestrado Profissional em Ciência e Tecnologia de Alimentos",
      value: "mestrado_cta",
    },
    {
      label: "Mestrado Profissional em Educação Profissional e Tecnológica",
      value: "mestrado_ept",
    },
    {
      label: "Mestrado Profissional em Nutrição e Produção Animal",
      value: "mestrado_nutricao_producao_animal",
    },
    {
      label: "Mestrado Profissional em Educação Física",
      value: "mestrado_educacao_fisica",
    },
    {
      label: "Doutorado Profissional em Ciência e Tecnologia de Alimentos",
      value: "doutorado_cta",
    },
  ],
};

const FormularioCursos: React.FC = () => {
  const [nivelEnsino, setNivelEnsino] = useState("");
  const [cursoSelecionado, setCursoSelecionado] = useState("");

  const cursosOptions = cursosPorNivel[nivelEnsino] || [];
  const handleSalvar = () => {
  salvarDados({ nivelEnsino, cursoSelecionado });
  navigate("/SelecionarProjeto");
};
  const navigate = useNavigate();

  return (
    <div className="modalidade-background">
      <h1 className="modalidade-titulo">
        Bem-vindo ao Formulário do IFSUDESTEMG - RP
      </h1>
      <div className="modalidade-container">
        <p className="modalidade-texto">
          Por favor, selecione o nível de ensino e o curso que você está
          realizando no IFSudesteMG - Campus Rio Pomba.
        </p>
        <div className="modalidade-curso-container">
          <RadioInput
            label="Nível de Ensino"
            options={nivelEnsinoOptions}
            selectedValue={nivelEnsino}
            onChange={(value) => {
              setNivelEnsino(value);
              setCursoSelecionado("");
            }}
          />

          {cursosOptions.length > 0 && (
            <RadioInput
              label="Curso que está Realizando:"
              options={cursosOptions}
              selectedValue={cursoSelecionado}
              onChange={setCursoSelecionado}
            />
          )}
        </div>
        {nivelEnsino && cursoSelecionado && (
          <p className="modalidade-lembrete">
            ✅ Você selecionou:{" "}
            <strong>
              {nivelEnsinoOptions.find((op) => op.value === nivelEnsino)?.label}
            </strong>{" "}
            →{" "}
            <strong>
              {
                cursosOptions.find((curso) => curso.value === cursoSelecionado)
                  ?.label
              }
            </strong>
          </p>
        )}
        <Botao
          label="Proximo"
          onClick={handleSalvar}
          tipo="secundario"
        />{" "}
      </div>
    </div>
  );
};

export default FormularioCursos;
