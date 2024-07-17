// src/pages/HomePage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import{Product} from '../interfaces/types';

/*interface User{
  email: string;
  googleId: string;
  displayName: string;
}*/

function HomePage() {
  
  const[products, setProducts] =useState<Product[]>([]);
  const[users, setUsers]= useState<string[]>([]);
  const navigate=useNavigate();


  //const [message, setMessage] = useState('');
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/photo`,
        {
          headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          }
        })
      .then(response=> setProducts(response.data))
      .catch(error=> console.error('Error fetching data: ', error));
    products.forEach(p=> 
      axios.get(`${import.meta.env.VITE_API_URL}/auth/${p.pictured_by}`,
        {
          headers:{
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          }
        }
      )
      .then(response=> setUsers([...users, response.data.displayName]))
      .catch(error=> console.error('Error fetching data: ',error))
    );
    },[products, users]);
  

  const handleItemClick = (photo_id:number)=>{
    navigate('/product/'+photo_id);
  };
  return (
    <div className="home-page">
      <h1>  <img src="/src/assets/images/pixelTrade_logo.png" alt="Logo" className="logo-image" /> </h1>
      <div className="grid-container">
        {products.map((product, index) => (
          <div key={index}
            className="grid-item"
            onClick={()=> handleItemClick(product.photo_id)}>
            <img src={product.url} alt={`Product ${index + 1}`} />
            <p>photo by {
            users[index]
            }</p>
            <p>price:{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;