// src/components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const LogoNavBar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyPhotoMarket</Link>
      </div>
    </header>
  );
};

export default LogoNavBar;
