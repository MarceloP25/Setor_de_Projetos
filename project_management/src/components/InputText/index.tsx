import React from 'react';
import './styles.css';

interface InputTextProps {
  type: string;
  value: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  dft?: string;
}

const InputText: React.FC<InputTextProps> = ({ type, value, name, onChange, placeholder, label, dft }) => {
  return (
    <div className="input-container">
      {label && <h5>{label}</h5>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange} 
        placeholder={placeholder}
        className="input-text"  
        defaultValue={dft}
      />
    </div>
  );
};


export default InputText;
