import React, { useState, useEffect } from 'react';
import './style.css';



type CustomRadioGroupProps = {
    options: string[];
    label: string;
    defaultValue?: string;
    onChange?: (value: string | null) => void;
};

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
    options,
    label,
    defaultValue = 'N/A',
    onChange
    }) => {
    const [selected, setSelected] = useState<string | null>(defaultValue);

    useEffect(() => {
        if (onChange) {
        onChange(defaultValue);
        }
    }, [defaultValue]);

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
            onClick={() => handleClick(option)}
        >
            <div
            className={`radio-circle ${selected === option ? 'selected' : ''}`}
            >
            {selected === option && <div className="radio-dot" />}
            </div>
            <span className="radio-label">{option}</span>
        </div>
        ))}
    </div>
    <span className="radio-description">{label}</span>
    </div>
);
};

export default CustomRadioGroup;
