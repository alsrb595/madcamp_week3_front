import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewTipPage.css';
import {Post} from '../interfaces/types';
import {useAuth} from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


function ViewTipPage() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const {userDisplayName,userEmail}=useAuth();
  const navigate=useNavigate();

  const fetchPostData = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/community/${postId}`, {
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      }
    })
    .then(response => {
      setPost(response.data);
    })
    .catch(error => console.error('Error fetching data: ', error));
  };

  useEffect(() => {
    fetchPostData();
  }, [postId]);

  const handleCommentSubmit = () => {  
    const formData = new FormData(); 
   
      const post_id=String(postId);
      const displayName=userDisplayName;// 사용자의 displayName으로 대체
      const email=userEmail; // 사용자의 이메일로 대체    
      const content=newComment;

      formData.append('post_id',post_id);
      formData.append('displayName', displayName);
      
      formData.append('email',email);
      formData.append('content',content);
      axios.post(`${import.meta.env.VITE_API_URL}/community/comment/upload`,formData,{
          headers:{
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        })
        .then(response=>{
        console.log('Comment submitted successfully', response);
        fetchPostData(); 
        setNewComment(""); // Clear the textarea})
      })
      .catch(error=>{
        console.error('Error submitting comment:', error);}
      );
      } 

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
      <div className="comments-section">
        <h2>Comments</h2>
        {post.comments.map(comment => (
          <div key={comment.comment_id} className="comment">
            <small>{comment.content}</small>
            <small>by {comment.displayName} on {new Date(comment.created_at).toLocaleDateString()}</small>
          </div>
        ))}
        <div className="new-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button onClick={handleCommentSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ViewTipPage;

