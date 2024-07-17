// Define Product interface
export interface Product {
    photo_id: number;
    filename: string;
    pictured_by: string;
    url: string;
    mimetype: string;
    price: number;
    description: string;
    tags: string[];
    location: string;
  }
  
  // Define Post interface
  export interface Post {
    post_id: number;
    displayName: string;
    post_by: string;
    title: string;
    content: string;
    urls: string[];
    created_at: string;
  }
  
  export interface UserInfo {
    email: string;
    googleId: string;
    displayName: string;
    photos: Product[];
    posts: Post[];
  }

  export interface Comment{
    comment_id:number;
    post_id: number;
    displayName: string;
    email: string;
    content: string;
    created_at: string;
  }

  export interface Post{
    post_id: number;
    displayName: string;
    post_by: string;
    title: string;
    content: string;
    urls: string[];
    comments: Comment[];
  }