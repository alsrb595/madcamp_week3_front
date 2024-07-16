// src/components/MyProductPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
}

const MyProductPage: React.FC = () => {
  const { userEmail } = useAuth();
  //const userEmail="alsrb595@gmail.com";
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?email=${userEmail}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (userEmail) {
      fetchProducts();
    }
  }, [userEmail]);

  const handleUploadButtonClick = () => {
    navigate('/upload');
  };

  return (
    <div>
      <h1>My Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.imageUrl} alt={product.title} className="product-image" />
            <div className="product-details">
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="upload-button" onClick={handleUploadButtonClick}>+</button>
    </div>
  );
};

export default MyProductPage;
