// 博客文章类型定义
export interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  author?: string;
  slug?: string;
  image?: string;
  draft?: boolean;
  priority?: number;
  video?: string;
  content: string;
}

// 学习中心视频类型定义
export interface LearningVideo {
  id: string;
  title: string;
  desc: string;
  youtube_url: string;
  tags?: string[];
  category?: string;
}

// AI工具类型定义
export interface AITool {
  id: string;
  name: string;
  description: string;
  logo: string;
  url: string;
  isPaid: boolean;
  features: string[];
  tags: string[];
  category: string;
  relatedBlogs?: number[];
  relatedVideos?: string[];
}

// 分类类型定义
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// 标签类型定义
export interface Tag {
  id: string;
  name: string;
  slug: string;
}

// 用户类型定义
export interface User {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
}
