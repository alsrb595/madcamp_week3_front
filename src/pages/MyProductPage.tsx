// src/components/MyProductPage.tsx
import React, { useEffect, useState } from 'react';
// React 라이브러리에서 useEffect와 useState 훅을 import 합니다. useEffect는 컴포넌트가 렌더링될 때와 특정 값이 변경될 때 수행할 동작을 정의할 수 있게 해주고, useState는 상태 변수를 선언하게 해줍니다.

import axios from 'axios';
// HTTP 요청을 수행하기 위해 axios 라이브러리를 import 합니다.

import { useNavigate } from 'react-router-dom';
// useNavigate 훅을 import 해서 컴포넌트 내에서 페이지 이동을 가능하게 합니다.

import { useAuth } from '../contexts/AuthContext';
// useAuth 훅을 import 해서 인증 컨텍스트를 사용할 수 있게 합니다.

import './MyProductPage.css';  // 추가된 부분
// CSS 스타일링 파일을 import 합니다.

import { Product } from '../interfaces/types';
// Product 타입을 정의한 인터페이스 파일을 import 합니다.

const MyProductPage: React.FC = () => {
// MyProductPage라는 이름의 함수형 컴포넌트를 정의합니다. React.FC는 React Function Component의 약자로, TypeScript에서 함수형 컴포넌트를 타입으로 지정합니다.

  const { userEmail } = useAuth();
  // useAuth 훅을 사용하여 현재 로그인된 사용자의 이메일을 가져옵니다.

  const [products, setProducts] = useState<Product[]>([]);
  // products라는 상태 변수를 선언하고, 이를 갱신하기 위한 setProducts 함수를 선언합니다. 초기값은 빈 배열입니다. 상태 변수의 타입은 Product 인터페이스 배열입니다.

  const navigate = useNavigate();
  // navigate 함수를 선언하여 페이지 이동 기능을 사용합니다.

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/photo/all/${userEmail}`
        );
        setProducts(response.data);
        // 비동기 함수 fetchProducts를 선언하여 사용자 이메일에 해당하는 제품 목록을 가져옵니다. 데이터를 가져오는데 성공하면 products 상태를 업데이트 합니다.
      } catch (error) {
        console.error('Error fetching products:', error);
        // 오류가 발생하면 콘솔에 오류 메시지를 출력합니다.
      }
    };

    if (userEmail) {
      fetchProducts();
      // userEmail이 있을 경우 fetchProducts 함수를 호출합니다.
    }
  }, [userEmail]);
  // useEffect 훅을 사용하여 userEmail이 변경될 때마다 fetchProducts 함수를 호출합니다.

  const handleUploadButtonClick = () => {
    navigate('/upload');
    // 업로드 버튼이 클릭되면 /upload 페이지로 이동합니다.
  };

  return (
    <div>
      <h1>My Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.photo_id} className="product-item">
            <img src={product.url} alt={product.filename} className="product-image" />
            <div className="product-details">
              <h2>{product.pictured_by}</h2>
              <p>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="upload-button" onClick={handleUploadButtonClick}>+</button>
    </div>
  );
  // 컴포넌트의 JSX 반환 부분입니다. 제품 목록을 표시하고, 각 제품에 대해 이미지와 세부 정보를 렌더링합니다. 업로드 버튼도 포함되어 있습니다.
};

export default MyProductPage;
// MyProductPage 컴포넌트를 기본으로 export 합니다.
