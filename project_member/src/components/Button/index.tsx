import React from 'react';
import './styles.css';

interface ActionButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'dark' | 'medium' | 'light'; // controla a cor
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick, variant = 'dark' }) => {
  return (
    <button className={`action-button ${variant}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default ActionButton;
