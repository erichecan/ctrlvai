// 博客文章基础类型
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category?: string;
  tags: string[];
  excerpt?: string;
  content: string;
  coverImage?: string;
  draft?: boolean;
}

// 博客文章元数据 (用于列表展示)
export type BlogPostMeta = Omit<BlogPost, 'content'>;

// 博客文章列表响应类型
export interface BlogPostsResponse {
  posts: BlogPostMeta[];
  total: number;
  page: number;
  limit: number;
  categories: string[];
  tags: string[];
}

// 博客文章详情响应类型
export interface BlogPostResponse {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
}

// 课程视频基础类型
export interface LearningVideo {
  id: string;
  title: string;
  desc: string;
  youtube_url: string;
  tags?: string[];
  category?: string;
}