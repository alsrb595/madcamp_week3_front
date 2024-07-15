// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';


interface AuthContextType{
  isLoggedIn:boolean;
  userEmail: string;
  userGoogleId: string;
  userDisplayName: string;
  userProfileImage:string;
  login:(user:User)=>void;
  logout:()=>void;
  changeDisplayName:(name: string)=>void ;
  changeUserProfileImage:(uri: string)=> void;
}

interface User{
  email: string;
  googleId: string;
  displayName: string;
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
  const [userGoogleId, setUserGoogleId]=useState<string>("");
  const [userDisplayName, setUserDisplayName]=useState<string>("");
  const [userProfileImage, setUserProfileImage]=useState <string>("");
  const login = (userProfile: User) => {
    //add login logic
    setIsLoggedIn(true);
    setUserEmail(userProfile.email);
    setUserGoogleId(userProfile.googleId);
    setUserDisplayName(userProfile.displayName);
    setUserProfileImage("/src/assets/images/profile.jpg");
  }
  const logout = () => {
    //add logout logic
    setIsLoggedIn(false);
    setUserEmail("");
    setUserGoogleId("");
    setUserDisplayName("");
    setUserProfileImage("");
  }

  const changeDisplayName =(name: string)=>{
    setUserDisplayName(name);
  }
  const changeUserProfileImage=(uri: string)=>{
    setUserProfileImage(uri);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, userGoogleId, userDisplayName, userProfileImage, login, logout,changeDisplayName,changeUserProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
};
