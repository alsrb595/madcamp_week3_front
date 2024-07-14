// src/components/LoginPage.tsx
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import mockUsers from '../assets/jsons/mockUser.json'
import axios from 'axios';



interface LoginPageProps{
  baseroute: string;
}

/*interface MockUser{
  id: string;
  pw: string;
}*/

interface User{
  id: string;
  email: string;
  nickname: string;
  profileImage: string;
  thumbnailImage: string;
}


const LoginPage: React.FC<LoginPageProps> = ({baseroute}) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [users, setUsers]= useState<User[]>([]);

  useEffect(()=>{
    axios.get('/src/assets/jsons/users.json')
      .then(response=> setUsers(response.data))
      .catch(error=> console.error('Error fetching data: ',error));
  },[]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const mockuser= mockUsers.find(u=>(u.id == username));
    if( !! mockuser && mockuser.pw == password){
      const userProfile= users.find(user=> user.id==username);
      if(! userProfile){
        throw new Error("no user info found");
      }
      else {
        login(userProfile);
      }
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
