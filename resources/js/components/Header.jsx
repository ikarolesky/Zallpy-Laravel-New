import { Link } from "react-router-dom";
import "./Header.css"; 

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <h1><Link to="/">Zallpy Cooperados</Link></h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/cooperados">Lista de Cooperados</Link>
          </li>
          <li>
            <Link to="/cooperados/add">Adicionar Cooperado</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
