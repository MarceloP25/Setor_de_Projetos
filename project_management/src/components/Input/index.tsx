import React from 'react';
import './styles.css';

interface InputTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const InputText: React.FC<InputTextProps> = ({ value, onChange, placeholder, label }) => {
  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-text"
      />
    </div>
  );
};

export default InputText;
