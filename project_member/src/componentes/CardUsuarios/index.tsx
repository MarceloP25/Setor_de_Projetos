import type { Aluno } from "../../types/types";
import "./cardUsuarios.css";
import { useNavigate } from "react-router-dom";

type Props = {
  aluno: Aluno;
};

function CardUsuarios({ aluno }: Props) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>{aluno.nome}</h3>
      <p><strong>Curso:</strong> {aluno.cursoSelecionado}</p>
      <p><strong>Email:</strong> {aluno.email}</p>
      <p><strong>Telefone:</strong> {aluno.telefone}</p>
      <p><strong>CPF:</strong> {aluno.cpf}</p>
      <p><strong>Vínculo:</strong> {aluno.vinculo}</p>
      <p><strong>Bolsa:</strong> R$ {aluno.valorBolsa}</p>
      <p><strong>Edital:</strong> {aluno.edital}</p>
      <p><strong>Projeto:</strong> {aluno.projetos}</p>
      <p><strong>Data de Cadastro:</strong> {aluno.dataCadastro.toLocaleString("pt-BR")}</p>

      <button
        className="btn-editar"
        onClick={() => navigate(`/editar/${aluno.id}`)}
      >
        Editar
      </button>
    </div>
  );
}

export default CardUsuarios;
