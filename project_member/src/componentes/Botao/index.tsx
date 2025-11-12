import React, { useState, useEffect } from "react";

type BotaoProps = {
  label: string;
  onClick?: () => void;
  tipo?: "primario" | "secundario";
};

export function Botao({ label, onClick, tipo = "primario" }: BotaoProps) {
  const [larguraTela, setLarguraTela] = useState(window.innerWidth);

  useEffect(() => {
    const atualizarLargura = () => setLarguraTela(window.innerWidth);
    window.addEventListener("resize", atualizarLargura);
    return () => window.removeEventListener("resize", atualizarLargura);
  }, []);

  const estiloResponsivo: React.CSSProperties =
    larguraTela < 480
      ? { width: "220px", fontSize: "14px", padding: "15px 0" }
      : larguraTela < 768
      ? { width: "280px", fontSize: "16px", padding: "17px 0" }
      : { width: "320px", fontSize: "18px", padding: "19px 0" };

  const estiloBase: React.CSSProperties = {
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontFamily: "Roboto, sans-serif",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  };

  const estilosPorTipo: Record<string, React.CSSProperties> = {
    primario: {
      backgroundColor: "var(--verde-escuro)",
      color: "white",
    },
    secundario: {
      backgroundColor: "var(--verde)",
      color: "white",
    },
  };

  const estiloFinal = {
    ...estiloBase,
    ...estiloResponsivo,
    ...estilosPorTipo[tipo],
  };

  return (
    <button style={estiloFinal} onClick={onClick}>
      {label}
    </button>
  );
}

export default Botao;
