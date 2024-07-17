// src/components/LoginPage.tsx
import React, { useState } from 'react';

//const serverURl='https://witty-lovely-killdeer.ngrok-free.app';

interface LoginPageProps{
  baseroute: string;
}

const LoginPage: React.FC<LoginPageProps> = ({baseroute}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
 

  const handleGoogleLogin =()=>{
    const serverURl=import.meta.env.VITE_API_URL;
    const googleAuthUrl =serverURl+'/auth/google';
    window.location.href = googleAuthUrl;
  }


  return (
    <div>
      <h1>Login</h1>
      <form >
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
      <button onClick={handleGoogleLogin}> Google로 로그인하기</button>
    </div>
  );
};

export default LoginPage;
