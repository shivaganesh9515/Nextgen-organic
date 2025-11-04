export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: {
    id: string;
    name: string;
  };
  tags: string[];
  featuredImage: string;
  publishedAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

export interface BlogComment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  replies: BlogComment[];
}