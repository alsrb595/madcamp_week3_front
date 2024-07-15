// src/pages/PostTipPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostTipPage.css';

function PostTipPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [urls, setUrls] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newPost = {
      post_id: Date.now(),
      displayName: 'Current User', // 예시로 사용. 실제로는 인증된 사용자의 이름을 사용해야 함
      post_by: 'current.user@example.com', // 예시로 사용. 실제로는 인증된 사용자의 이메일을 사용해야 함
      title,
      content,
      urls: urls.split(','),
      created_at: new Date().toISOString()
    };

    try {
      const response = await axios.get('/src/assets/jsons/posts.json');
      const posts = response.data;
      posts.push(newPost);

      // JSON 파일에 새 게시물을 추가 (이 부분은 실제로는 서버에서 처리되어야 합니다)
      await axios.put('/src/assets/jsons/posts.json', posts);

      setTitle('');
      setContent('');
      setUrls('');
      navigate('/photo-tips');
    } catch (error) {
      console.error('Error saving the post:', error);
    }
  };

  return (
    <div className="post-tip-page">
      <h1>Write a New Tip</h1>
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
        type="text"
        placeholder="Image URLs (comma separated)"
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default PostTipPage;
