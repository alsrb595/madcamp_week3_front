// src/components/LoginPage.tsx
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import mockUsers from '../assets/jsons/mockUser.json'
import axios from 'axios';
import {useCart} from '../contexts/CartContext';


interface LoginPageProps{
  baseroute: string;
}

interface User{
  email: string;
  googleId: string;
  displayName: string;
}


const LoginPage: React.FC<LoginPageProps> = ({baseroute}) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {loginCart} =useCart();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [users, setUsers]= useState<User[]>([]);

  useEffect(()=>{
    axios.get('/src/assets/jsons/users.json')
      .then(response=> setUsers(response.data))
      .catch(error=> console.error('Error fetching data: ',error));
  },[]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const mockuser= mockUsers.find(u=>(u.id == username));
    if( !! mockuser && mockuser.pw == password){
      const userProfile= users.find(user=> user.googleId==username);
      if(! userProfile){
        throw new Error("no user info found");
      }
      else {
        login(userProfile);
        await loginCart(userProfile.googleId);
      }
    }
    else{
     // findAllInRenderedTree('invalid username or password');
    }
    navigate(baseroute);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
