import React from 'react';
import './styles.css';

interface TextAreaProps {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
}

const TextAreaInput: React.FC<TextAreaProps> = ({ value, name, onChange, placeholder, label }) => {
  return (
    <div className="textarea-container">
      {label && <label>{label}</label>}
      <textarea
        className="textarea-input"
        value={value}
        name={name}
        onChange={onChange} 
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextAreaInput;
