import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import './ProfilePage.css';

function ProfilePage() {
  const {isLoggedIn,userEmail, userGoogleId, userDisplayName,userProfileImage} = useAuth();
  
  const navigate =useNavigate();


  const handleLogout = () =>{
    if(isLoggedIn){
      navigate('/logout');
    }
    else{
      navigate('/profile');
    }
  }
  
  const handleLogin = ()=>{
    if (isLoggedIn){
      navigate('/profile');
    }
    else{
      navigate('/profile/login');
    }
  }

  if(isLoggedIn){
    return (
      <div className="profile-card">
        <h1>{userDisplayName}</h1>
        <img className="profile-image" src={userProfileImage} alt="Profile"/>
        <p>닉네임: {userDisplayName}</p>
        <p>Google ID: {userGoogleId}</p>
        <p>Email: {userEmail}</p>
        <button className="edit-button" onClick={() => navigate('/editprofile')}>정보 수정하기</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  else{
    return(
      <div className="login-prompt">
        <h1>로그인 해주세요</h1>
        <h2>프로필 보기는 로그인 후 가능합니다.</h2>
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }
}
  
  export default ProfilePage;