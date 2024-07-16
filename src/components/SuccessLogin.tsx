//src/components/SuccessLogin.tsx

import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { UserInfo } from '../interfaces/types';

const SuccessLogin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {login}=useAuth();

  useEffect(() => {
    const email = searchParams.get('email');
    if (email) {
      console.log('User:', email); // 여기서 user 값을 변수에 저장하거나 상태 관리

      axios.get(`${import.meta.env.VITE_API_URL}/auth/${email}`,
        {
          headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          }
        }
      )
        .then(response => {
          const userInfo: UserInfo= response.data;
          login({email: email, displayName: userInfo.displayName, googleId:userInfo.googleId});
        })
        .catch(error => console.error('Error fetching data:', error));



      setTimeout(() => {
        navigate('/');
      }, 100); 
    }
  },[login, navigate, searchParams]);

  return (
    <div>
      <h1>로그인중</h1>
      <p>...</p>
    </div>
  );
};

export default SuccessLogin;