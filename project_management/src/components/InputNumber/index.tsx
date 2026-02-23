import React from 'react';
import './styles.css';

interface InputNumberProps {
  type: string;
  value: number;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  dft?: number;
}

const InputNumber: React.FC<InputNumberProps> = ({ type, value, name, onChange, placeholder, label, min, max, dft }) => {
  return (
    <div className="input-container">
      {label && <h5>{label}</h5>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange} 
        placeholder={placeholder}
        min={min}
        max={max}
        step="any"
        className="input-text"
        defaultValue={dft}
      />
    </div>
  );
};


export default InputNumber;
