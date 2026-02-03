import React from 'react';
import './styles.css';

interface SelectInputProps {
  options: string[] | { label: string; value: string }[]  | number[];
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
          <option key={idx} value={typeof opt === 'string' || typeof opt === 'number' ? opt : opt.value}>
            {typeof opt === 'string' || typeof opt === 'number' ? opt : opt.label}
          </option>
        ))}

      </select>
    </div>
  );
};

export default SelectInput;
