import React from 'react';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import './ProductDetailPage.css';
import {useCart} from '../contexts/CartContext';
import { useTransaction } from '../contexts/TransactionContext';
import { useAuth } from '../contexts/AuthContext';


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

interface User{
  email: string;
  googleId: string;
  displayName: string;
}

interface Transaction{
  photo_id:number;
  consumer_email: string;
  is_delivered:boolean;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string}>();
  const photo_id=Number(id);
  console.log('id is '+id);
  const[products, setProducts] =useState<Product[]>([]);
  const[users, setUsers]=useState<User[]>([]);
  const[whichPopup, setWhichPopup] =useState<number>(0);
  //0=> nothing, 1=> 문의하기, 2=>구매하기, 3=>장바구니
  //const navigate=useNavigate();
  const {isLoggedIn,userEmail}=useAuth();
  const {addToCart,cartlist}=useCart();
  const {startTransaction,userBuying}=useTransaction();

  useEffect(()=>{
    axios.get('/src/assets/jsons/products.json')
      .then(response=> setProducts(response.data))
      .catch(error=> console.error('Error fetching data: ', error));
    axios.get('/src/assets/jsons/users.json')
      .then(response=> setUsers(response.data))
      .catch(error=> console.error('Error fetching data: ', error));
    },[]);
    
  const product = products.find(p =>( p.photo_id == photo_id));
  const photoBy = users.find(u=> u.email==product?.pictured_by);

  if (!product) {
    return <div>Product not found</div>;
  }
  
  const relatedProducts = products
    .filter((p) =>
      p.tags.some((tag) => product.tags.includes(tag))
    )
    .slice(0, 5);
  console.log(relatedProducts);
  const togglePopup= (whichpopup: number)=>{
    setWhichPopup(whichpopup);
  }


  return(
    <div className="product-detail">
      <h1>Photo by {photoBy?.displayName}</h1>
      <div className="product-main">
        <img src={'/' + product.url} alt={`Product ${product.photo_id}`} />
        <div className="product-info">
          <p className="product-price">{product.price} 원</p>
          <div className="button=group">
            <button className="btn" onClick={()=>togglePopup(1)}>문의하기</button>
            <button className="btn" onClick={()=>togglePopup(2)}>구매하기</button>
            <button className="btn" onClick={()=>togglePopup(3)}>장바구니</button>
          </div>        
        </div>
      </div>
      <div className="product-description">
        <h2>상품 상세 설명</h2>
        <p>{product.description}</p>
      </div>
      {products.length > 0 && (
        <div className="related-products">
          <h2>연관 상품</h2>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.photo_id} className="related-product-card">
                <img src={'/' + relatedProduct.url} alt={`Product ${relatedProduct.photo_id}`} />
                <p>{relatedProduct.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {(whichPopup)&&(!isLoggedIn)&&
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={()=>togglePopup(0)}>X</button>
            <h2>{["error","문의하기","구매하기","장바구니"][whichPopup]}</h2>
            <p>로그인 후 이용 가능한 서비스입니다.</p>
          </div>
        </div>
      }
      {(whichPopup== 1)&&isLoggedIn&&
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={()=>togglePopup(0)}>X</button>
            <h2>문의하기</h2>
            <p>아래 판매자 연락처로</p><p>문의하실 수 있습니다.</p>
            <p>{photoBy?.email}</p>
          </div>
        </div>
      }
      {(whichPopup== 2)&& isLoggedIn &&
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={()=>togglePopup(0)}>X</button>
            <h2>구매하기</h2>
            {userBuying.some((t) => t.photo_id==product.photo_id)?     
             <p>이미 구매 신청중인 상품입니다.</p> 
            :
            <div>
              <p>구매하시겠습니까?</p>
              <button className="btn" onClick= {()=>{
              startTransaction(
                {photo_id: product.photo_id,
                  consumer_email: userEmail,
                  is_delivered: false} as Transaction
              );
              togglePopup(0);              
              }}>구매신청</button>
            </div>}
          </div>
        </div>
      }
      {(whichPopup== 3)&&isLoggedIn&&
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={()=>togglePopup(0)}>X</button>
            <h2>장바구니</h2>
              {(cartlist.find(p=>p.photo_id==product.photo_id))?
                <p>이미 장바구니에 있는 상품입니다.</p>
                :
                <div>
                  <p>장바구니에 추가하시겠습니까?</p> 
                  <button className="btn" onClick={
                    ()=>{addToCart(product); togglePopup(0)}
                    }> 장바구니
                  </button>
                </div>
            }
          </div>
        </div>
      }


    </div>
  );
};

export default ProductDetailPage;
