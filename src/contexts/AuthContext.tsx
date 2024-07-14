// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';


interface AuthContextType {
  isLoggedIn: boolean;
  userNickname: string;
  userEmail: string;
  userId: string;
  userProfileImage: string;
  userThumbnailImage: string;
  login: (userProfile: User) => void;
  logout: () => void;
  changeNickname: (nickname: string)=> void;
}

interface User{
  id: string;
  email: string;
  nickname: string;
  profileImage: string;
  thumbnailImage: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] =useState<string>("");
  const [userId, setUserId]=useState<string>("");
  const [userNickname, setUserNickname]=useState<string>("");
  const [userProfileImage, setUserProfileImage]=useState <string>("");
  const [userThumbnailImage, setUserThumbnail]=useState <string>("");

  const login = (userProfile: User) => {
    //add login logic
    setIsLoggedIn(true);
    setUserEmail(userProfile.email);
    setUserId(userProfile.id);
    setUserNickname(userProfile.nickname);
    setUserProfileImage(userProfile.profileImage);
    setUserThumbnail(userProfile.thumbnailImage);
  }
  const logout = () => {
    //add logout logic
    setIsLoggedIn(false);}

  const changeNickname =(nickname: string)=>{
    setUserNickname(nickname);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, userId, userNickname, userProfileImage, userThumbnailImage, login, logout,changeNickname }}>
      {children}
    </AuthContext.Provider>
  );
};
