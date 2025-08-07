import { Link, useLocation } from 'react-router-dom';
import './styles.css';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { id: 'visao_geral', label: 'Visão Geral' },
    { id: 'edital', label: 'Editais' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'orcamentos', label: 'Orçamentos' },
  ];

  return (
    <div className="sidebar">
      <h2>Setor de Projetos IFRP</h2>
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
    </div>
  );
};

export default Sidebar;