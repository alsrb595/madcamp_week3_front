import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PostTipPage.css';
import {useAuth} from '../contexts/AuthContext';

const PostTipPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {userDisplayName, userEmail} = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    if (file) {
      formData.append('files', file);
    }
    formData.append('post_by', userEmail);
    formData.append('displayName', userDisplayName);
    formData.append('title', title);
    formData.append('content', content);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/community/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      console.log('Post submitted successfully:', response.data);
      navigate('/photo-tips');
    } catch (error) {
      console.error('Error submitting post:', error);
      setError('Error submitting post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-tip-page">
      <h1>Write a New Tip</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PostTipPage;
