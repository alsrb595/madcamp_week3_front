// src/components/Sidebar.tsx
//import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // Sidebar 스타일링 파일
import {useAuth} from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps{
    isOpen: boolean;
    toggleSidebar: ()=>void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const {isLoggedIn,userThumbnailImage}= useAuth();
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
        {isLoggedIn?(
          <img
            src={userThumbnailImage}
            alt="User Thumbnail"
            className="sidebar-thumbnail"
            onClick={()=>navigate('/profile')}
          />
          )
          :
          <FontAwesomeIcon icon={faUser} onClick={()=>navigate('/profile')} />
        }
        <button onClick={handleLoginLogout}>{isLoggedIn ? 'Logout' : 'Login'}</button>
        <button onClick={toggleSidebar} style={{marginRight:'10px'}}>Close</button>
      </div>
      <nav className="sidebar-nav">
        <h3>My Page</h3>
        <Link to="/profile">내 정보</Link>
        <Link to="/cart">장바구니</Link>
        <Link to="/sales">판매 내역</Link>
        <Link to="/purchases">구매 내역</Link>
        <h3>Buy / Sell</h3>
        <Link to="/">모든 상품 조회</Link>
        <Link to="/product-types">태그별 상품 찾기</Link>
        <Link to="/sell">상품 등록하기</Link>
        <h3>Board</h3>
        <Link to="/photo-spots">사진 명소</Link>
        <Link to="/photo-tips">사진 꿀팁</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
