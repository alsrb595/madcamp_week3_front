// src/components/NavBar.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import './NavBar.css'; // NavBar 스타일링 파일

const NavBar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">웹이름</Link>
      </div>
      <div className="navbar-icons">
        <Link to= "/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
        <FontAwesomeIcon icon={faUser} />
        <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
};

export default NavBar;
