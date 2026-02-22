import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Botao from "../../componentes/Botao";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [secaoAtiva, setSecaoAtiva] = useState("home");
  const [secaoRelatorios, setSecaoRelatorios] = useState(false);

  useEffect(() => {
    const fetchDados = async () => {
      if (!user) return;

      const q = query(collection(db, "membros"), where("uid", "==", user.uid));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const dados = snap.docs[0].data();
        setNome(dados.nome);
        setCpf(dados.cpf);
      }
    };
    fetchDados();
  }, [user]);

  function relatorioAction() {
    setSecaoRelatorios(!secaoRelatorios);
  }

  return (
    <div className="dashboard-background">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <h2 className="dashboard-navbar-title">Menu</h2>
        <ul className="dashboard-navbar-list">
          <li>
            <a
              href="#"
              className="dashboard-navbar-link"
              onClick={(e) => {
                e.preventDefault();
                setSecaoAtiva("relatorios");
              }}
            >
              Relatórios
            </a>
          </li>
          <li>
            <a
              href="#"
              className="dashboard-navbar-link"
              onClick={(e) => {
                e.preventDefault();
                setSecaoAtiva("meusDados");
              }}
            >
              Meus Dados
            </a>
          </li>
          <li>
            <a
              href="#"
              className="dashboard-navbar-link"
              onClick={(e) => {
                e.preventDefault();
                setSecaoAtiva("home");
              }}
            >
              Home
            </a>
          </li>
        </ul>
      </nav>

      {/* Conteúdo da dashboard */}
      <div className="dashboard-content-container">
        {secaoAtiva === "home" && (
          <>
            <h1 className="dashboard-title">Bem-vindo, {nome}!</h1>
            <p className="dashboard-text">
              Este é o seu painel de controle onde você pode acessar suas
              informações e relatórios.
            </p>
          </>
        )}

        {secaoAtiva === "relatorios" && (
          <>
            <h1 className="dashboard-title">Relatórios</h1>
            <p className="dashboard-text">
              Aqui você acessa e envia seus relatórios.
            </p>

            {!secaoRelatorios ? (
              <Botao
                label="Novo Relatório"
                onClick={relatorioAction}
                tipo="secundario"
              />
            ) : (
              <Botao
                label="Fechar Relatório"
                onClick={relatorioAction}
                tipo="secundario"
              />
            )}

            {secaoRelatorios && (
              <div className="dashboard-relatorio-form">
                <h2>Formulário de Relatório</h2>
              </div>
            )}
          </>
        )}

        {secaoAtiva === "meusDados" && (
          <>
            <h1 className="dashboard-title">Meus Dados</h1>
            {!nome ? (
              <>
                <p className="dashboard-text">
                  Complete o cadastro para acessar todas as funcionalidades.
                </p>
                <Botao
                  label="Completar Cadastro"
                  onClick={() => navigate("/TelaInicial")}
                  tipo="secundario"
                />
              </>
            ) : (
              <p className="dashboard-text">
                CPF cadastrado: {cpf}. Seus dados já estão completos.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
