//src/pages/CartPage.tsx

import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {useCart} from "../contexts/CartContext";
import { useEffect } from 'react';

function ProfilePage() {
  const {isLoggedIn, userId} = useAuth();
  const {cartlist, removeFromCart,loginCart} =useCart();
  const [selectedItems, setSelectedItems]= useState<{[key:string]:boolean}>({});
  const navigate =useNavigate();


  useEffect(()=>{
    if (isLoggedIn && userId){
      loginCart(userId);
    }
  }, [isLoggedIn,userId, loginCart]);

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
      navigate('/cart/login');
    }
  }

  const handleCheckboxChange = (photoId: string) => {
    setSelectedItems({
      ...selectedItems,
      [photoId]: !selectedItems[photoId]
    });
  }

  const calculateTotal = () => {
    return cartlist
      .filter(item => selectedItems[item.photoId])
      .reduce((sum, item) => sum + parseFloat(item.price), 0)
      .toFixed(0);
  }

  if(isLoggedIn){
    return  (
      <div>
        <h1>Cart Page</h1>
        
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Price</th>
              <th>Photographer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartlist.map(item => (
              <tr key={item.photoId}>
                <td>
                  <input
                    type="checkbox"
                    checked={!!selectedItems[item.photoId]}
                    onChange={() => handleCheckboxChange(item.photoId)}
                  />
                </td>
                <td><img src={item.imgUri} alt={item.detail} width="50" /></td>
                <td>{item.price}</td>
                <td>{item.pictured_by}</td>
                <td>
                  <button onClick={() => removeFromCart(item.photoId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <strong>Total: {calculateTotal()}원</strong>
                <button onClick={() => alert(`Purchasing items for $${calculateTotal()}`)}>Purchase</button>
              </td>
            </tr>
          </tfoot>
        </table>
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