// src/components/LogoutPage.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useTransaction } from '../contexts/TransactionContext';

const LogoutPage: React.FC = () => {
  const { logout } = useAuth();
  const {initCart}=useCart();
  const {initTransaction}=useTransaction();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    initCart();
    initTransaction();
    navigate('/'); // 로그아웃 후 홈 페이지로 이동
  };

  return (
    <div>
      <h2>로그아웃 페이지</h2>
      <p>정말 로그아웃 하시겠습니까?</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default LogoutPage;
