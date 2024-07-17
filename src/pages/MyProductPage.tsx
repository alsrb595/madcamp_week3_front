// src/components/MyProductPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './MyProductPage.css';
import { Product } from '../interfaces/types';

const MyProductPage: React.FC = () => {
  const { userEmail } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // 제품을 가져오는 함수
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/photo/all/${userEmail}`
      );
      console.log('API 응답:', response.data); // 응답 데이터를 로그에 출력
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('배열이 아닌 응답:', response.data);
      }
    } catch (error) {
      console.error('제품을 가져오는 중 오류 발생:', error);
    }
  }, [userEmail]);

  useEffect(() => {
    if (userEmail) {
      fetchProducts();
    }
  }, [userEmail, fetchProducts]);

  // 업로드 버튼 클릭 핸들러
  const handleUploadButtonClick = () => {
    navigate('/uploadproduct');
    // 업로드 버튼이 클릭되면 /upload 페이지로 이동
  };

  return (
    <div>
      <h1>My Product</h1>
      <div className="product-list">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div key={product.photo_id} className="product-item">
              <img src={product.url} alt={product.filename} className="product-image" />
              <div className="product-details">
                <h2>{product.pictured_by}</h2>
                <p>${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>상품이 없습니다.</p>
        )}
      </div>
      <button className="upload-button" onClick={handleUploadButtonClick}>+</button>
    </div>
  );
  // 컴포넌트의 JSX 반환 부분입니다. 제품 목록을 표시하고, 각 제품에 대해 이미지와 세부 정보를 렌더링합니다. 업로드 버튼도 포함되어 있습니다.
};

export default MyProductPage;
// MyProductPage 컴포넌트를 기본으로 export 합니다.
