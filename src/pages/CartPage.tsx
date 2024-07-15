//src/pages/CartPage.tsx

import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {useCart} from "../contexts/CartContext";
//import { useEffect } from 'react';

function CartPage() {
  const {isLoggedIn} = useAuth();
  const {cartlist, removeFromCart} =useCart();
  const [selectedItems, setSelectedItems]= useState<{[key:string]:boolean}>({});
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
      navigate('/cart/login');
    }
  }

  const handleCheckboxChange = (photo_id: number) => {
    setSelectedItems({
      ...selectedItems,
      [photo_id]: !selectedItems[photo_id]
    });
  }

  const calculateTotal = () => {
    return cartlist
      .filter(item => selectedItems[item.photo_id])
      .reduce((sum, item) => sum +item.price, 0)
      .toFixed(0);
  }

  if(isLoggedIn){
    return  (
      <div>
        <h1>장바구니</h1>
        
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
              <tr key={item.photo_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={!!selectedItems[item.photo_id]}
                    onChange={() => handleCheckboxChange(item.photo_id)}
                  />
                </td>
                <td><img src={item.url} alt={item.description} width="50" /></td>
                <td>{item.price}</td>
                <td>{item.pictured_by}</td>
                <td>
                  <button onClick={() => removeFromCart(item.photo_id)}>Delete</button>
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
  
  export default CartPage;