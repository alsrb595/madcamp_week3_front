// src/contexts/CartContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
//import { useEffect } from 'react';

interface Product {
  photoId: string,
  pictured_by: string,
  imgUri: string,
  price: string,
  category: string,
  detail: string
}

interface Wish {
  id: string,
  photoId: string
}

interface CartContextType {
  cartlist: Product[],
  loginCart: (userId: string) => void,
  removeFromCart: (photoId: string) => void,
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
  //const [wishlist, setWishlist] = useState<Wish[]>([]);
  //const [productlist, setProductlist] = useState<Product[]>([]);

  const loginCart = async (userId: string) => {
    try {
      const [wishlistResponse, productlistResponse] = await Promise.all([
        axios.get('/src/assets/jsons/whishlist.json'),
        axios.get('/src/assets/jsons/products.json')
      ]);

      const wishlistData = wishlistResponse.data as Wish[];
      const productlistData = productlistResponse.data as Product[];

      //setWishlist(wishlistData);
      //setProductlist(productlistData);

      const userWishlist = wishlistData.filter(wish => wish.id === userId);
      const userCart = userWishlist.map(wish => 
        productlistData.find(product => product.photoId === wish.photoId)
      ).filter(product => product !== undefined) as Product[];

      setCartlist(userCart);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  const removeFromCart = (photoId: string) => {
    setCartlist(prevCartlist => prevCartlist.filter(product => product.photoId !== photoId));
  }

  return (
    <CartContext.Provider value={{ cartlist, loginCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};