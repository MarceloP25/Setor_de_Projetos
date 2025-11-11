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
    value: string;
    defaultValue?: string | null; 
    onChange?: (value: string | null) => void;
};

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
    options,
    label,
    defaultValue = null, 
    onChange
    }) => {
    const [selected, setSelected] = useState<string | null>(defaultValue);

    useEffect(() => {
        if (onChange) {
            onChange(defaultValue);
        }
    }, [defaultValue, onChange]);

    const handleClick = (value: string) => {
        const newValue = selected === value ? null : value;
        setSelected(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

return (
    <div className="radio-group-container">
    <div className="radio-options">
        {options.map((option, index) => (
        <div
            key={index}
            className="radio-option"
            onClick={() => handleClick(option.value)}
        >
            <div
            className={`radio-circle ${selected === option.value ? 'selected' : ''}`}
            >
            {selected === option.value && <div className="radio-dot" />}
            </div>
            <span className="radio-label">{option.label}</span>
        </div>
        ))}
    </div>
    <span className="radio-description">{label}</span>
    </div>
);
};

export default CustomRadioGroup;