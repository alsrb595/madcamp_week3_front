// src/components/Sidebar.tsx
//import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // Sidebar 스타일링 파일
import {useAuth} from '../contexts/AuthContext';

interface SidebarProps{
    isOpen: boolean;
    toggleSidebar: ()=>void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const {isLoggedIn}= useAuth();
  const navigate =useNavigate();

  const handleLoginLogout = () =>{
    if(isLoggedIn){
      navigate('/logout');
    }
    else{
      navigate('/login');
    }
    toggleSidebar();
  }
  
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar}>Close</button>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLoginLogout}>{isLoggedIn ? 'Logout' : 'Login'}</button>
      </div>
      <nav className="sidebar-nav">
        <h3>My Page</h3>
        <Link to="/profile">Personal Info</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/sales">Sales</Link>
        <Link to="/purchases">Purchases</Link>
        <h3>Buy / Sell</h3>
        <Link to="/categories">Category-wise Products</Link>
        <Link to="/product-types">Product Types</Link>
        <Link to="/sell">Post for Sale</Link>
        <h3>Board</h3>
        <Link to="/photo-spots">Photo Spots</Link>
        <Link to="/photo-tips">Photo Tips</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
