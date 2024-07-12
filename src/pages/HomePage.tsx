// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api')
      .then(response => setMessage(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>{message}</p>
    </div>
  );
}

export default HomePage;