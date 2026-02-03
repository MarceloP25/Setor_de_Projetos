import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import './editarMembro.css';
const db = getFirestore();

export default function EditarMembro() {
  const { id } = useParams();
  const [membro, setMembro] = useState<any>(null);

  useEffect(() => {
    const carregarMembro = async () => {
      if (!id) return;
      const ref = doc(db, "membros", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setMembro({ id: snapshot.id, ...snapshot.data() });
      }
    };
    carregarMembro();
  }, [id]);

  const salvar = async () => {
    if (!id || !membro) return;
    const ref = doc(db, "membros", id);
    await updateDoc(ref, membro);
    alert("Dados do membro atualizados com sucesso!");
  };

  if (!membro) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Membro</h1>
      <input
        type="text"
        value={membro.nome}
        onChange={(e) => setMembro({ ...membro, nome: e.target.value })}
      />
      <input
        type="text"
        value={membro.email}
        onChange={(e) => setMembro({ ...membro, email: e.target.value })}
      />
      {/* demais campos... */}

      <button onClick={salvar}>Salvar</button>
    </div>
  );
}
