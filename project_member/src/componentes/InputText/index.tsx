import React from 'react';

interface InputTextProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  disabled = false,
}) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid var(--verde)',
          width: '300px',
        }}
      />
    </div>
  );
};

export default InputText;
