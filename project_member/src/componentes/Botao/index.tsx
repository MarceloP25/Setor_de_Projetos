import React from "react";

type BotaoProps = {
  label: string;
  onClick?: () => void;
  tipo?: "primario" | "secundario";
};

export function Botao({ label, onClick, tipo = "primario" }: BotaoProps) {
  const estiloBase: React.CSSProperties = {
    padding: "16px 150px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    fontFamily: "Roboto, sans-serif",
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

  const estiloFinal = { ...estiloBase, ...estilosPorTipo[tipo] };

  return (
    <button style={estiloFinal} onClick={onClick}>
      {label}
    </button>
  );
}

export default Botao;
