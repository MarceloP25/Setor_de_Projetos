import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/config";

export const salvarDados = async (dados: object) => {
  const cpf = localStorage.getItem("cpf");
  if (!cpf) {
    alert("CPF não encontrado. Volte à tela de cadastro básico.");
    return;
  }

  try {
    await setDoc(doc(db, "membros", cpf), dados, { merge: true });
    console.log("Dados salvos com sucesso:", dados);
  } catch (erro) {
    console.error("Erro ao salvar dados:", erro);
    alert("Erro ao salvar dados.");
  }
};
