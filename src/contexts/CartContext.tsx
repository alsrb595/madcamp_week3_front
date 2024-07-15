// src/contexts/CartContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
//import { useEffect } from 'react';

interface Product{
  photo_id:number;
  filename: string;
  pictured_by: string;
  url: string;
  mimetype: string;
  price: number;
  description: string;
  tags: string[];
  location:string;
}

interface Wish {
  id: string;
  photo_id: number;
}

interface CartContextType {
  cartlist: Product[],
  loginCart: (googleId: string) => void,
  addToCart: (product: Product) =>void,
  removeFromCart: (photo_id: number) => void,
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
  const [cartlist, setCartlist] = useState<Product[]>([]);

  const loginCart = async (googleId: string) => {
    try {
      const [wishlistResponse, productlistResponse] = await Promise.all([
        axios.get('/src/assets/jsons/wishlist.json'),
        axios.get('/src/assets/jsons/products.json')
      ]);

      const wishlistData = wishlistResponse.data as Wish[];
      const productlistData = productlistResponse.data as Product[];

      const userWishlist = wishlistData.filter(wish => wish.id === googleId);
      const userCart = userWishlist.map(wish => 
        productlistData.find(product => product.photo_id === wish.photo_id)
      ).filter(product => product !== undefined) as Product[];

      setCartlist(userCart);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  const addToCart =async (product: Product)=>{
    setCartlist([...cartlist, product]);
  }

  const removeFromCart = (photo_id: number) => {
    setCartlist(prevCartlist => prevCartlist.filter(product => product.photo_id !== photo_id));
  }

  return (
    <CartContext.Provider value={{ cartlist, loginCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};