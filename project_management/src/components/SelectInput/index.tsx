import React from 'react';
import './styles.css';

interface SelectInputProps {
  options: string[];
  value: string;
  name: string;
  onChange: (value: string) => void;
  label?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ name, options, value, onChange, label }) => {
  return (
    <div className="select-container">
      {label && <label>{label}</label>}
      <select
        value={value}
        name={name}
        onChange={(e) => onChange(e.target.value)}
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
