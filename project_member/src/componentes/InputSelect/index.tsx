import { useState, useEffect } from "react";

type Opcao = {
  valor: string;
  label: string;
};

type SelecaoProps = {
  label: string;
  opcoes: Opcao[];
  valorSelecionado: string;
  onChange: (valor: string) => void;
};

export function InputSelect({
  label,
  opcoes,
  valorSelecionado,
  onChange,
}: SelecaoProps) {
  const [larguraTela, setLarguraTela] = useState(window.innerWidth);

  useEffect(() => {
    const atualizarLargura = () => setLarguraTela(window.innerWidth);
    window.addEventListener("resize", atualizarLargura);
    return () => window.removeEventListener("resize", atualizarLargura);
  }, []);

  const estiloResponsivo: React.CSSProperties =
    larguraTela < 480
      ? { width: "220px", fontSize: "14px", padding: "12px 0" }
      : larguraTela < 768
      ? { width: "280px", fontSize: "16px", padding: "14px 0" }
      : { width: "320px", fontSize: "18px", padding: "16px 0" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        style={{
          fontFamily: "var(--texto)",
          fontSize: estiloResponsivo.fontSize,
        }}
      >
        {label}
      </label>
      <select
        value={valorSelecionado}
        onChange={(e) => onChange(e.target.value)}
        style={{
          marginBottom: "16px",
          borderRadius: "4px",
          border: "1px solid var(--verde)",
          cursor: "pointer",
          fontFamily: "var(--texto)",
          textAlign: "center",
          textAlignLast: "center",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          ...estiloResponsivo,
        }}
      >
        <option value="" disabled hidden>
          Selecione uma opção
        </option>
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputSelect;
