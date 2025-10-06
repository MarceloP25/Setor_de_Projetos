import React, { useState, useEffect } from "react";

interface InputTextProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  disabled = false,
}) => {
  const [larguraTela, setLarguraTela] = useState(window.innerWidth);

  useEffect(() => {
    const atualizarLargura = () => setLarguraTela(window.innerWidth);
    window.addEventListener("resize", atualizarLargura);
    return () => window.removeEventListener("resize", atualizarLargura);
  }, []);

  const estiloResponsivo: React.CSSProperties =
    larguraTela < 480
      ? { width: "206px", fontSize: "14px", padding: "12px 6px" }
      : larguraTela < 768
      ? { width: "256px", fontSize: "16px", padding: "14px 10px" }
      : { width: "296px", fontSize: "18px", padding: "16px 14px" };

  return (
    <div
  style={{
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // 👈 Alinha tudo à esquerda
  }}
>
  {label && (
    <label
      style={{
        marginBottom: "0.5rem",
        fontSize: estiloResponsivo.fontSize,
        fontFamily: "var(--texto)",
      }}
    >
      {label}
    </label>
  )}
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    style={{
      borderRadius: "4px",
      border: "1px solid var(--verde)",
      fontFamily: "var(--texto)",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      ...estiloResponsivo,
    }}
  />
</div>

  );
};

export default InputText;
