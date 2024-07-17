// src/pages/HomePage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { Product } from '../interfaces/types';

/*interface User{
  email: string;
  googleId: string;
  displayName: string;
}*/

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/photo`, {
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      }
    })
    .then(response => {
      setProducts(response.data);
    })
    .catch(error => console.error('Error fetching data: ', error));
  }, []);

  useEffect(() => {
    const fetchUsernames = async () => {
      const usersData: { [key: string]: string } = {};
      await Promise.all(products.map(async (p) => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/${p.pictured_by}`, {
            headers: {
              'Content-Type': `application/json`,
              'ngrok-skip-browser-warning': '69420',
            }
          });
          usersData[p.pictured_by] = response.data.displayName;
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      }));
      setUsers(usersData);
    };

    if (products.length > 0) {
      fetchUsernames();
    }
  }, [products]);

  const handleItemClick = (photo_id: number) => {
    navigate('/product/' + photo_id);
  };

  return (
    <div className="home-page">
      <h1>  <img src="/src/assets/images/pixelTrade_logo.png" alt="Logo" className="logo-image" /> </h1>
      <div className="grid-container">
        {products.map((product, index) => (
          <div key={index}
            className="grid-item"
            onClick={() => handleItemClick(product.photo_id)}>
            <img src={product.url} alt={`Product ${index + 1}`} />
            <p>photo by {users[product.pictured_by]}</p>
            <p>price: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
