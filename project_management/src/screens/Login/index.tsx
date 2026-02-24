import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { logAction } from '../../utils/LogAction';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) return;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      
      await logAction({
        user,
        action: 'Login',
        objectType: 'Login',
        objectId: `login-${user.nome}`
      });

      navigate('/visao_geral');
    } catch (error: any) {
      console.error('Erro no login:', error);
      
      // Traduzir mensagens de erro do Firebase
      if (error.code === 'auth/invalid-credential') {
        setError('Email ou senha inválidos');
      } else if (error.code === 'auth/user-not-found') {
        setError('Usuário não encontrado');
      } else if (error.code === 'auth/wrong-password') {
        setError('Senha incorreta');
      } else if (error.code === 'auth/invalid-email') {
        setError('Email inválido');
      } else if (error.code === 'auth/user-disabled') {
        setError('Este usuário foi desabilitado');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Setor de Projetos</h1>
        <p className="login-subtitle">Sistema de Gerenciamento</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          
          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="login-footer">
            <span>Não tem conta?</span>
            <Link to="/cadastro">Cadastre-se</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
