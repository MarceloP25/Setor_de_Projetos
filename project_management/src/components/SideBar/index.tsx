import { Link, useLocation } from 'react-router-dom';
import './styles.css';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { id: 'visao_geral', label: 'VISÃO GERAL' },
    { id: 'edital', label: 'EDITAIS' },
    { id: 'projetos', label: 'PROJETOS' },
    { id: 'orcamento', label: 'ORÇAMENTO' },
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