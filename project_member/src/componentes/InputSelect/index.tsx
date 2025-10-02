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
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{ fontFamily: "var(--texto)",fontSize: "18px" }}>
        {label}
      </label>
      <select
        value={valorSelecionado}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "5px 8px",
          width: "320px",
          marginBottom: "16px",
          borderRadius: "4px",
          border: "1px solid var(--verde)",
          cursor: "pointer",
          fontSize: "18px",
          fontFamily: "var(--texto)",
          textAlign: "center",
          textAlignLast: "center",
          backgroundColor: "#f9f9f9",
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
