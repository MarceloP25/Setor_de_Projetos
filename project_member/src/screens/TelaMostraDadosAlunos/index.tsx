import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import AlunoCard from "../../componentes/CardUsuarios";
import type { Aluno } from "../../types/types";

const db = getFirestore();

export default function ListaDeAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    const carregar = async () => {
      const snapshot = await getDocs(collection(db, "usuarios"));
      const lista: Aluno[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          dataCadastro: data.dataCadastro?.toDate?.() || new Date()
        } as Aluno;
      });
      setAlunos(lista);
    };
    carregar();
  }, []);

  return (
    <>
    <h1>Usuários Cadastrados</h1>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {alunos.map((aluno) => (
        <AlunoCard key={aluno.id} aluno={aluno} />
      ))}
    </div>
    </>
  );
}
