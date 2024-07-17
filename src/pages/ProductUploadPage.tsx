// src/pages/ProductUploadPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import './ProductUpload.css'

const ProductUploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const {userEmail}= useAuth();
  const pictured_by=userEmail;
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [tags,setTags]= useState<string[]>(["","",""]);
  const [location,setLocation]= useState("");
  const navigate = useNavigate();
  const [loading, setLoading]=useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    if (file) {
      formData.append('file', file);  
    }    
    
    formData.append('pictured_by',pictured_by);
    formData.append('price',price);
    formData.append('description',description);
    formData.append('tags',tags[0]+','+tags[1]+','+tags[2]);
    formData.append('location', location);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/photo/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'ngrok-skip-browser-warning': '69420'
          }
        }
      );
      console.log('Product uploaded successfully:', response.data);
      navigate('/my-products');
    } catch (error) {
      console.error('Error submitting post:', error);
      setError('Error submitting post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-upload-page">
      <h1>Upload New Product</h1>
      <form onSubmit={handleSubmit}>
      <input
          type="file"
          onChange={handleFileChange}
        />
      <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Discription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="tag1"
          value={tags[0]}
          onChange={(e) => setTags([e.target.value,tags[1],tags[2]])}
        />
        <input
          type="text"
          placeholder="tag2"
          value={tags[1]}
          onChange={(e) => setTags([tags[0],e.target.value,tags[2]])}
        />
        <input
          type="text"
          placeholder="tag3"
          value={tags[2]}
          onChange={(e) => setTags([tags[0],tags[1],e.target.value])}
        />
        <input
          type="text"
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />        

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ProductUploadPage;
