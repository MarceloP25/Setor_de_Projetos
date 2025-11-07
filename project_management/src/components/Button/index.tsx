import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

interface ActionButtonProps {
  text: string;
  onClick?: () => void | Promise<void>; // pode ser assíncrona
  to?: string; // rota opcional
  variant?: 'dark' | 'medium' | 'light';
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  onClick,
  to,
  variant = 'medium',
}) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    // 1. Executa a ação (sincrona ou assíncrona)
    if (onClick) {
      await onClick();
    }

    // 2. Navega para a rota (se existir)
    if (to) {
      navigate(to);
    }
  };

  return (
    <button className={`action-button ${variant}`} onClick={handleClick}>
      {text}
    </button>
  );
};

export default ActionButton;
