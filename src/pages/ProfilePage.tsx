import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const {isLoggedIn} = useAuth();
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
      navigate('/login');
    }
  }

  if(isLoggedIn){
    return (
      <div>
        <h1>Profile Page</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  else{
    return(
      <div>
        <h1>로그인 해주세요</h1>
        <h2>프로필 보기는 로그인 후 가능합니다.</h2>
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }
}
  
  export default ProfilePage;