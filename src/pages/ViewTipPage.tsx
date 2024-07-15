import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewTipPage.css';

interface Post {
  post_id: number;
  displayName: string;
  post_by: string;
  title: string;
  content: string;
  urls: string[];
  created_at: string;
}

function ViewTipPage() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    axios.get('/src/assets/jsons/posts.json')
      .then(response => {
        const post = response.data.find((p: Post) => p.post_id === Number(postId));
        setPost(post);
      })
      .catch(error => console.error('Error fetching post:', error));
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-tip-page">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>by {post.displayName} on {new Date(post.created_at).toLocaleDateString()}</small>
      <div className="post-images">
        {post.urls.map((url, index) => (
          <img key={index} src={url} alt={`Post image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default ViewTipPage;
