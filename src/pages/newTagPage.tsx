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

function NewTagPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const[tags, setTags]= useState<Set<string>>(new Set());
  const [users, setUsers] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag]=useState<string>("");


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/photo`, {
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      }
    })
    .then(response => {
      setProducts(response.data);
      const newTags= new Set<string>();
      response.data.forEach((p:Product)=>{
        p.tags.forEach((t:string)=>{
          newTags.add(t);
        });
      });
      setTags(newTags);      
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

    
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

const handleItemClick = (photo_id:number)=>{
  navigate('/product/'+photo_id);
};

const filteredProducts = selectedTag
  ? products.filter(product => product.tags.includes(selectedTag))
  : products;

  return (
    <div className="home-page">
      <h1> <img src="/src/assets/images/pixelTrade_logo.png" alt="Logo" className="logo-image" /></h1>
      <div className="tags-container">
        {[...tags].map((tag, index) => (
          <button key={index} onClick={() => handleTagClick(tag)} className={tag === selectedTag ? "selected" : ""}>
            {tag}
          </button>
        ))}
      </div>
      <div className="grid-container">
        {filteredProducts.map((product, index) => (
          <div key={index}
            className="grid-item"
            onClick={() => handleItemClick(product.photo_id)}>
            <img src={product.url} alt={`Product ${index + 1}`} />
            <p>photo by {
              users[product.pictured_by]
            }</p>
            <p>price: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default NewTagPage;