import React from 'react';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioInputProps {
  label?: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  disabled = false,
}) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <p style={{ marginBottom: '0.5rem' }}>{label}</p>}
      {options.map((option) => (
        <label key={option.value} style={{ display: 'block', marginBottom: '0.25rem' }}>
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            disabled={disabled}
            style={{ marginRight: '0.5rem' }}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioInput;