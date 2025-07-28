import React from 'react';
import './styles.css';

interface InputTextProps {
  type: string;
  value: string;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}


const InputText: React.FC<InputTextProps> = ({ type, value, name, onChange, placeholder, label }) => {
  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <h3>Teste</h3>
      <input
        type={type}
        value={value}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-text"
      />
    </div>
  );
};

export default InputText;
