// src/contexts/CartContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { Cart} from '../interfaces/types';
//import { useEffect } from 'react';

interface CartContextType {
  cartlist: Cart[],
  loginCart: (googleId: string) => void,
  addToCart: (photo_id: number, userEmail: string) =>void,
  removeFromCart: (photo_id: number, userEmail: string) => void,
  initCart:()=>void
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartlist, setCartlist] = useState<Cart[]>([]);

  const fetchCart= async (userEmail: string)=>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/wishlist/${userEmail}`,{
          headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          }} 
      );
      console.log('API 응답:', response.data); // 응답 데이터를 로그에 출력
      if (Array.isArray(response.data)) {
        setCartlist(response.data);
      } else {
        console.error('배열이 아닌 응답:', response.data);
      }
    } catch (error) {
      console.error('장바구니를 가져오는 중 오류 발생:', error);
    }
  }

  const loginCart = async (userEmail: string) => {
    fetchCart(userEmail);
  }

  const addToCart =async (photo_id: number, userEmail: string)=>{
    const formData= new FormData();
    formData.append("email", userEmail);
    formData.append("photo_id", String(photo_id));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/wishlist`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420'
          }
        }
      );
      console.log('Cart added successfully:', response.data);
      fetchCart(userEmail);
    } catch (error) {
      console.error('Error adding cart:', error);
    }
  }

  const removeFromCart = async (photo_id: number, userEmail: string)=>{
    const formData= new FormData();
    formData.append("email", userEmail);
    formData.append("photo_id", String(photo_id));

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/wishlist/delete`,{
          data:{
            "email": userEmail,
            "photo_id": photo_id
          }
        });
      console.log('Cart deleted successfully:', response.data);
      fetchCart(userEmail);
    } catch (error) {
      console.error('Error deleting:', error);
    }


  }
  const initCart= ()=>{
    setCartlist([]);
  }
  return (
    <CartContext.Provider value={{ cartlist, loginCart, addToCart, removeFromCart ,initCart}}>
      {children}
    </CartContext.Provider>
  );
};