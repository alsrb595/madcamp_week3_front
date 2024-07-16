import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {UserInfo} from '../interfaces/types'

const SuccessLogin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {login}=useAuth();
  const serverUrl=import.meta.env.VITE_API_URL;
  const [userInfo, setUserInfo]= useState<UserInfo|null>(null);

  useEffect(() => {

    const email = searchParams.get('email');
    if (email) {
      console.log('User:', email);

      axios
        .get<UserInfo>(`${serverUrl}/auth/${email}`)
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => console.error('Error fetching data:', error));

      // userInfo가 업데이트되기를 기다린 후 로그인 및 네비게이션
      const loginAndNavigate = async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); // userInfo가 업데이트되도록 지연시간 추가
        if (userInfo) {
          login({
            email: email,
            displayName: userInfo.displayName,
            googleId: userInfo.googleId
          });
        }
        navigate('/');
      };

      loginAndNavigate();
    }
  },[login, navigate, searchParams, userInfo]);

  return (
    <div>
      <h1>로그인중</h1>
      <p>...</p>
    </div>
  );
};

export default SuccessLogin;
