import React from 'react';
import './styles.css';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

const TextAreaInput: React.FC<TextAreaProps> = ({ value, onChange, label, placeholder }) => {
  return (
    <div className="textarea-container">
      {label && <label>{label}</label>}
      <textarea
        className="textarea-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextAreaInput;
