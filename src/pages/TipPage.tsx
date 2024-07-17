import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './TipPage.css';
import {Post} from '../interfaces/types';

const TipPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/community`, {
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      }
    })
    .then(response => {
      setPosts(response.data);
    })
    .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handlePostClick = (post_id: number) => {
    navigate('/viewtip/' + post_id);
  };

  return (
    <div className="tip-page">
      <h1>Tips</h1>
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.post_id} className="post-item" onClick={() => handlePostClick(post.post_id)}>
            <h2>{post.title}</h2>
            <small>by {post.displayName} on {new Date(post.created_at).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
      <button className="new-tip-button" onClick={() => navigate('/posttip')}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default TipPage;
