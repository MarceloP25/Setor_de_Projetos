import React, { useState, useEffect } from 'react';
import './styles.css';

export type RadioOption = {
  label: string;
  value: string;
};

type CustomRadioGroupProps = {
  options: RadioOption[];
  label: string;
  name: string;
  value?: string;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
};

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  options,
  label,
  name,
  value,
  defaultValue = null,
  onChange
}) => {
  const [selected, setSelected] = useState<string | null>(defaultValue);

  // Garante sincronização se o valor externo mudar
  useEffect(() => {
    if (value !== undefined && value !== selected) {
      setSelected(value);
    }
  }, [value]);

  const handleChange = (newValue: string) => {
    const updated = selected === newValue ? null : newValue;
    setSelected(updated);
    onChange?.(updated);
  };

  return (
    <div className="radio-group">
      <div className="radio-group-label">{label}</div>
      <div className="radio-group-options">
        {options.map((option, index) => (
          <label
            key={index}
            className={`radio-option ${selected === option.value ? 'checked' : ''}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected === option.value}
              onChange={() => handleChange(option.value)}
            />
            <span className="radio-custom" />
            <span className="radio-text">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CustomRadioGroup;
