// src/pages/HomePage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';


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

function HomePage() {
  //const [message, setMessage] = useState('');
  const[products, setProducts] =useState<Product[]>([]);
  const[users, setUsers]= useState<User[]>([]);
  const navigate=useNavigate();


  useEffect(()=>{
    axios.get('src/assets/jsons/products.json')
      .then(response=> setProducts(response.data))
      .catch(error=> console.error('Error fetching data: ', error));
    axios.get('src/assets/jsons/users.json')
      .then(response=> setUsers(response.data))
      .catch(error=> console.error('Error fetching data: ', error));
    },[]);
  
  /*(() => {
  **  axios.get('/api')
  **    .then(response => setMessage(response.data))
  **    .catch(error => console.error('Error fetching data:', error));
  **}, []);*/


  const handleItemClick = (photo_id:number)=>{
    navigate('/product/'+photo_id);
  };
  return (
    <div className="home-page">
      <h1> 웹 로고 </h1>
      <div className="grid-container">
        {products.map((product, index) => (
          <div key={index}
            className="grid-item"
            onClick={()=> handleItemClick(product.photo_id)}>
            <img src={product.url} alt={`Product ${index + 1}`} />
            <p>photo by {
            users.find(user=> product.pictured_by == user.email )?.displayName
            }</p>
            <p>price:{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;