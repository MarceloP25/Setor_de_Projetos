// src/components/Formulario.tsx
import { useState } from "react";

const TelaTeste = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");

    const dados = { nome, email };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbx4E1OLqDz_ntwkHdYzya4IaAoFZWkpg8kM35NbxpSotpcEobHOm54aFXljpwV_1GEo/exec",
        {
          method: "POST",
          body: JSON.stringify({ nome, email }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStatus("Dados enviados com sucesso!");
      setNome("");
      setEmail("");
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setStatus("Erro ao enviar os dados.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button type="submit">Enviar</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default TelaTeste;
