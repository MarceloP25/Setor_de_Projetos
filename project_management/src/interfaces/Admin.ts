export interface Admin {
    id: string;
    nome: string;
    matricula: string;
    cpf: string;
    telefone?: string;

    departamento: string;
    emailInstitucional: string;
    emailPessoal?: string;
    
    criadoEm: string;
    criadoPor?: string;
    alteradoEm?: string;
    alteradoPor?: string; 
}

/*
bem no caso o sistema é crítico e vou encaminhar os códigos que quero modificação. Fazendo desde o início:
- cadastro: a interface do administrador não está totalmente implementada no seu cadastro mas o login está devidamente implementado com o email e senha
- authcontext: deve ser atualizado
- rastreabilidade: vamos manter a ideia da seguinte forma, nos dados dos projetos, editais e orçamento, vamos deixar salvo o nome do usuário que criou e o nome do último usuário que modificou com o que foi modificado, exemplo: criadoPor = admin, modificadoPor = admin - Edição de dados
- criação de coleção de logs: a cada ação do sistema vamos criar uma coleção que vai armazenar o histórico, no seguinte sentido: id , user (usuário que fez a ação), object (se ele fez algo em edital, projeto, orçamento, entre outros), action (a ação que foi realizada), date (a data que aconteceu com a hora e os minutos).

Abaixo envio a intertface do administrador, o arquivo de cadastro e o authContext:
export interface Admin {
    id: string;
    nome: string;
    matricula: string;
    cpf: string;
    telefone?: string;

    departamento: string;
    emailInstitucional: string;
    emailPessoal?: string;
    
    criadoEm: string;
    criadoPor?: string;
    alteradoEm?: string;
    alteradoPor?: string; 
}
---------------------------------------------------------------------------------------------------
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/config';
import './styles.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const { user } = userCredential;

      await updateProfile(user, { displayName: nome });

      await setDoc(doc(db, 'usuarios', user.uid), {
        nome,
        cpf,
        email,
        createdAt: serverTimestamp(),
      });

      navigate('/visao_geral');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);

      if (error.code === 'auth/email-already-in-use') {
        setError('Este email já está em uso');
      } else if (error.code === 'auth/invalid-email') {
        setError('Email inválido');
      } else if (error.code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres');
      } else {
        setError('Erro ao cadastrar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Setor de Projetos</h1>
        <p className="register-subtitle">Crie sua conta</p>

        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="register-error">{error}</div>}

          <div className="register-input-group">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              required
              disabled={loading}
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
              required
              disabled={loading}
            />
          </div>

          <div className="register-input-group">
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

          <div className="register-input-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <div className="register-footer">
            <span>Já tem conta?</span>
            <Link to="/login">Entrar</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
-------------------------------------------------------------------------------------------------------------------
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../services/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

*/