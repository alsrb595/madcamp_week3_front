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

interface Comment {
  comment_id: number;
  post_id: number;
  displayName: string;
  email: string;
  content: string;
  created_at: string;
}

function ViewTipPage() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    axios.get('/src/assets/jsons/posts.json')
      .then(response => {
        const post = response.data.find((p: Post) => p.post_id === Number(postId));
        setPost(post);
      })
      .catch(error => console.error('Error fetching post:', error));

    axios.get('/src/assets/jsons/comments.json')
      .then(response => {
        const postComments = response.data.filter((c: Comment) => c.post_id === Number(postId));
        setComments(postComments);
      })
      .catch(error => console.error('Error fetching comments:', error));
  }, [postId]);

  const handleCommentSubmit = () => {
    const newCommentData: Comment = {
      comment_id: comments.length + 1,
      post_id: Number(postId),
      displayName: "currentUser", // 사용자의 displayName으로 대체
      email: "currentUser@gmail.com", // 사용자의 이메일로 대체
      content: newComment,
      created_at: new Date().toISOString()
    };

    setComments([...comments, newCommentData]);
    setNewComment("");
  };

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
        {comments.map(comment => (
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
