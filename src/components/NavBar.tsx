// src/components/NavBar.tsx
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import './NavBar.css'; // NavBar 스타일링 파일
//import {useAuth} from '../contexts/AuthContext'

const NavBar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const navigate=useNavigate();
  //const {isLoggedIn}=useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCartClick= ()=>{
    navigate('/cart');
  };

  const handleProfileClick=()=>{
    navigate('/profile');
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">웹이름</Link>
      </div>
      <div className="navbar-icons">
        <FontAwesomeIcon icon={faShoppingCart} onClick={handleCartClick} />
        <FontAwesomeIcon icon={faUser} onClick={handleProfileClick} />
        <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
};

export default NavBar;
