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
  
  const relatedProducts = (products.filter(p => p.category === product.category && p.photoId !== product.photoId)).slice(0,5);



  return (
    <div className="product-detail">
      <h1>제목</h1>
      <div className="product-main">
        <img src={'/' + product.imgUri} alt={`Product ${product.photoId}`} />
        <div className="product-info">
          <p className="product-price">{product.price} 원</p>
          <div className="button=group">
            <button className="btn">문의하기</button>
            <button className="btn">구매하기</button>
            <button className="btn">장바구니</button>
          </div>        
        </div>
      </div>
      <div className="product-description">
        <h2>상품 상세 설명</h2>
        <p>{product.detail}</p>
      </div>
      {products.length > 0 && (
        <div className="related-products">
          <h2>연관 상품</h2>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.photoId} className="related-product-card">
                <img src={'/' + relatedProduct.imgUri} alt={`Product ${relatedProduct.photoId}`} />
                <p>{relatedProduct.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
