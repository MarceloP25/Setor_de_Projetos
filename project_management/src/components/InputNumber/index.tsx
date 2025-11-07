import React from 'react';
import './styles.css';

interface InputNumberProps {
  type: string;
  value: number;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
}

const InputNumber: React.FC<InputNumberProps> = ({ type, value, name, onChange, placeholder, label }) => {
  return (
    <div className="input-container">
      {label && <h3>{label}</h3>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange} 
        placeholder={placeholder}
        className="input-text"
      />
    </div>
  );
};


export default InputNumber;
