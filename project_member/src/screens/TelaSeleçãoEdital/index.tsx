import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import InputSelect from "../../componentes/InputSelect";
import Botao from "../../componentes/Botao";
import type { Edital } from "../../interfaces/Edital";
import "./selecaoedital.css";

function TelaSelecaoEdital() {
  const [editaisList, setEditaisList] = useState<Edital[]>([]);
  const [edital, setEdital] = useState<string>(""); // controle do select
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();

  // Busca os editais do Firestore
  const fetchEditais = async () => {
    try {
      const editaisRef = collection(db, "editais");
      const querySnapshot = await getDocs(editaisRef);
      const editais = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nomeEdital: doc.data().nomeEdital,
        orcamentoEdital: doc.data().orcamentoEdital,
        valorDisponivel: doc.data().valorDisponivel,
        status: doc.data().status,
        projetosVinculados: doc.data().projetosVinculados,
        anoVigente: doc.data().anoVigente,
        dataInicio: doc.data().dataInicio,
        dataFim: doc.data().dataFim,
        dataInicioSubmissao: doc.data().dataInicioSubmissao,
        dataFimSubmissao: doc.data().dataFimSubmissao,
        dataInicioDocumentos: doc.data().dataInicioDocumentos,
        dataFimDocumentos: doc.data().dataFimDocumentos,
        dataInicioRecurso: doc.data().dataInicioRecurso,
        dataFimRecurso: doc.data().dataFimRecurso,
        dataInicioAvaliacao: doc.data().dataInicioAvaliacao,
        dataFimAvaliacao: doc.data().dataFimAvaliacao,
        dataInicioEnvioRelatorio: doc.data().dataInicioEnvioRelatorio,
        dataFimEnvioRelatorio: doc.data().dataFimEnvioRelatorio,
        dataPagamentoInicio: doc.data().dataPagamentoInicio,
        dataPagamentoFim: doc.data().dataPagamentoFim,
        linkAcessoEdital: doc.data().linkAcessoEdital,
        criadoEm: doc.data().criadoEm,
        criadoPor: doc.data().criadoPor,
        alteradoEm: doc.data().alteradoEm,
        alteradoPor: doc.data().alteradoPor,
      }));
      setEditaisList(editais);
    } catch (error) {
      console.error("Erro ao buscar editais:", error);
    }
  };

  useEffect(() => {
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

  // Transforma a lista de editais em opções para o select
  const opcoes = editaisList.map((e) => ({
    valor: e.id, // você pode usar o nome se quiser
    label: e.nomeEdital,
  }));

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

export default TelaSelecaoEdital;
