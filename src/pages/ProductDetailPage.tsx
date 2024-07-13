import React from 'react';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import './ProductDetailPage.css';


interface Product{
    photoId: string;
    pictured_by: string;
    imgUri: string;
    price: string;
    category: string;
    detail:string;
  }

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log('id is '+id);
  const[products, setProducts] =useState<Product[]>([]);
  //const navigate=useNavigate();

  useEffect(()=>{
    axios.get('/src/assets/jsons/products.json')
      .then(response=> setProducts(response.data))
      .catch(error=> console.error('Error fetching data: ', error));
    },[]);
    
  const product = products.find(p =>( p.photoId == id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <h1>상품 상세 설명</h1>
      <img src={'/'+product.imgUri} alt={`Product ${product.photoId}`} />
      <p>{product.detail}</p>
    </div>
  );
};

export default ProductDetailPage;
