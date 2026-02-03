import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './styles.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  
  const menuItems = [
    { id: 'visao_geral', label: 'VISÃO GERAL' },
    { id: 'edital', label: 'EDITAIS' },
    { id: 'projetos', label: 'PROJETOS' },
    { id: 'orcamento', label: 'ORÇAMENTO' },
    { id: 'membros', label: 'MEMBROS' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="sidebar">
      <h2>Setor de Projetos IFRP</h2>
      
      {user && (
        <div className="sidebar-user-info">
          <p className="sidebar-user-email">{user.email}</p>
        </div>
      )}
      
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li
            key={item.id}
            className={location.pathname.includes(item.id) ? 'active' : ''}
          >
            <Link to={`/${item.id}`}>{item.label}</Link>
          </li>
        ))}
      </ul>
      
      <button className="sidebar-logout-button" onClick={handleLogout}>
        SAIR
      </button>
    </div>
  );
};

export default Sidebar;