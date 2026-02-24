import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/config';
import type { Admin } from '../../interfaces/Admin';
import './styles.css';

const Cadastro = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState<Admin>({
    id: '',
    nome: '',
    matricula: '',
    cpf: '',
    telefone: '',
    departamento: '',
    emailInstitucional: '',
    criadoEm: "",
    alteradoEm: ""
  });

  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        admin.emailInstitucional,
        senha
      );

      const { user } = userCredential;

      await updateProfile(user, { displayName: admin.nome });

      const adminData: Admin = {
        ...admin,
        id: user.uid,
        criadoEm: new Date().toISOString(),
      };

      await setDoc(doc(db, 'administradores', user.uid), adminData);

      navigate('/login');

    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Este email já está em uso');
      } else if (error.code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres');
      } else {
        setError('Erro ao cadastrar administrador');
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
              name="nome" 
              placeholder="Nome completo" 
              value={admin.nome} 
              onChange={handleChange} 
              required
              disabled={loading}
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="matricula">Matrícula</label>
            <input
              name="matricula"
              placeholder="Matrícula" 
              value={admin.matricula} 
              onChange={handleChange} 
              required
              disabled={loading}
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="cpf">CPF</label>
            <input
              name="cpf"
              placeholder="CPF" 
              value={admin.cpf}
              onChange={handleChange} 
              required
              disabled={loading}
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              name="telefone"
              placeholder="Telefone" 
              value={admin.telefone}
              onChange={handleChange} 
              disabled={loading}
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="departamento">Departamento</label>
            <input
              name="departamento"
              placeholder="Departamento" 
              value={admin.departamento}
              onChange={handleChange} 
              required
              disabled={loading}
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="email">Email Institucional</label>
            <input
              name="emailInstitucional"
              placeholder="Email Institucional" 
              value={admin.emailInstitucional}
              onChange={handleChange} 
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
