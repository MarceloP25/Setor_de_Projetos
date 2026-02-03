import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import AlunoCard from "../../componentes/CardUsuarios";
import type { Aluno } from "../../types/types";
import "./mostraDadosAlunos.css";

const db = getFirestore();

export default function ListaDeAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [alunosPorLetra, setAlunosPorLetra] = useState<Record<string, Aluno[]>>(
    {}
  );
  const [letrasDisponiveis, setLetrasDisponiveis] = useState<string[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const carregar = async () => {

      const snapshot = await getDocs(collection(db, "membros"));

      const snapshot = await getDocs(collection(db, "usuarios"));

      const lista: Aluno[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          dataCadastro: data.dataCadastro?.toDate?.() || new Date(),
        } as Aluno;
      });

      lista.sort((a, b) => a.nome.localeCompare(b.nome));
      setAlunos(lista);
      agruparPorLetra(lista);
    };

    carregar();
  }, []);

  const agruparPorLetra = (lista: Aluno[]) => {
    const agrupado: Record<string, Aluno[]> = {};
    lista.forEach((aluno) => {
      const letra = aluno.nome.charAt(0).toUpperCase();
      if (!agrupado[letra]) agrupado[letra] = [];
      agrupado[letra].push(aluno);
    });

    setAlunosPorLetra(agrupado);
    setLetrasDisponiveis(Object.keys(agrupado).sort());
  };

  const alunosFiltrados = busca
    ? alunos.filter(
        (aluno) =>
          aluno.nome.toLowerCase().includes(busca.toLowerCase()) ||
          aluno.cpf?.includes(busca)
      )
    : null;

  return (
    <div className="lista-container">
      <h1 className="lista-titulo">Usuários Cadastrados</h1>

      <input
        type="text"
        placeholder="Buscar por nome ou CPF..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="barra-pesquisa"
      />

      {alunosFiltrados ? (
        <div className="alunos-grid">
          {alunosFiltrados.length > 0 ? (
            alunosFiltrados.map((aluno) => (
              <AlunoCard key={aluno.id} aluno={aluno} />
            ))
          ) : (
            <p style={{ marginTop: "1rem" }}>Nenhum aluno encontrado.</p>
          )}
        </div>
      ) : (
        <>
          <div className="letras-barra">
            {letrasDisponiveis.map((letra) => (
              <a key={letra} href={`#letra-${letra}`}>
                {letra}
              </a>
            ))}
          </div>

          {letrasDisponiveis.map((letra) => (
            <div key={letra} id={`letra-${letra}`} className="letra-secao">
              <h2>{letra}</h2>
              <div className="alunos-grid">
                {alunosPorLetra[letra].map((aluno) => (
                  <AlunoCard key={aluno.id} aluno={aluno} />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
