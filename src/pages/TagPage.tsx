// src/pages/TagPage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './TagPage.css';
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

function TagPage() {
  const[products, setProducts] =useState<Product[]>([]);
  const[tags, setTags]= useState<Set<string>>(new Set());
  const[users, setUsers]= useState<User[]>([]);
  const navigate=useNavigate();
  const [selectedTag, setSelectedTag]=useState<string>("");

  useEffect(()=>{
    axios.get('/src/assets/jsons/products.json')
      .then(response=> {
        setProducts(response.data);
        const newTags= new Set<string>();
        response.data.forEach((p:Product)=>{
          p.tags.forEach((t:string)=>{
            newTags.add(t);
          });
        });
        setTags(newTags);
      })
      .catch(error=> console.error('Error fetching data: ', error));
       
      axios.get('/src/assets/jsons/users.json')
      .then(response=> setUsers(response.data))
      .catch(error=> console.error('Error fetching data: ', error));
    },[]);
  
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
        <h1>웹 로고</h1>
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
                users.find(user => product.pictured_by === user.email)?.displayName
              }</p>
              <p>price: {product.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default TagPage;