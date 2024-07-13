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
      navigate('/cart');
    }
  }
  
  const handleLogin = ()=>{
    if (isLoggedIn){
      navigate('/cart');
    }
    else{
      navigate('/login');
    }
  }

  if(isLoggedIn){
    return (
      <div>
        <h1>Cart Page</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  else{
    return(
      <div>
        <h1>로그인 해주세요</h1>
        <h2>장바구니 보기는 로그인 후 가능합니다.</h2>
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }
}
  
  export default ProfilePage;