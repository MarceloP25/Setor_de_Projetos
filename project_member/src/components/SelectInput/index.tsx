import React from 'react';
import './styles.css';

interface SelectInputProps {
  options: string[];
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ name, options, value, onChange, label }) => {
  return (
    <div className="select-container">
      {label && <h3>{label}</h3>}
      <select
        value={value}
        name={name}
        onChange={onChange}
        className="select-input"
      >
        <option value="">Selecione</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
