// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

interface Product{
  photoId: string;
  pictured_by: string;
  imgUri: string;
  price: string;
  category: string;
  detail:string;
}

function HomePage() {
  //const [message, setMessage] = useState('');
  const[products, setProducts] =useState<Product[]>([]);
  const navigate=useNavigate();

  useEffect(()=>{
    axios.get('src/assets/jsons/products.json')
      .then(response=> setProducts(response.data))
      .catch(error=> console.error('Error fetching data: ', error));
    },[]);
  
  /*(() => {
  **  axios.get('/api')
  **    .then(response => setMessage(response.data))
  **    .catch(error => console.error('Error fetching data:', error));
  **}, []);*/
  const handleItemClick = (photoId:string)=>{
    navigate('/product/'+photoId);
  };
  return (
    <div className="home-page">
      <h1> 웹 로고 </h1>
      <div className="grid-container">
        {products.map((product, index) => (
          <div key={index}
            className="grid-item"
            onClick={()=> handleItemClick(product.photoId)}>
            <img src={product.imgUri} alt={`Product ${index + 1}`} />
            <p>photo by {product.pictured_by}</p>
            <p>price:{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;