// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';


interface AuthContextType{
  isLoggedIn:boolean;
  userEmail: string;
  userGoogleId: string;
  userDisplayName: string;
  userProfileImage:string;
  userThumbnailImage:string;
  login:(user:User)=>void;
  logout:()=>void;
  changeDisplayName:(name: string)=>void }

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
  const [userThumbnailImage, setUserThumbnail]=useState <string>("");

  const login = (userProfile: User) => {
    //add login logic
    setIsLoggedIn(true);
    setUserEmail(userProfile.email);
    setUserGoogleId(userProfile.googleId);
    setUserDisplayName(userProfile.displayName);
    setUserProfileImage("/src/assets/images/profile.jpg");
    setUserThumbnail("/src/assets/images/thumbnail.jpg");
  }
  const logout = () => {
    //add logout logic
    setIsLoggedIn(false);}

  const changeDisplayName =(name: string)=>{
    setUserDisplayName(name);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, userGoogleId, userDisplayName, userProfileImage, userThumbnailImage, login, logout,changeDisplayName }}>
      {children}
    </AuthContext.Provider>
  );
};
