// 博客文章类型定义
export interface BlogPost {
  /** 文章ID，可能不存在 */
  id?: number;
  /** 文章标题 */
  title: string;
  /** 发布日期，ISO格式字符串 */
  date: string;
  /** 文章分类 */
  category: string;
  /** 文章标签数组 */
  tags: string[];
  /** 文章摘要 */
  excerpt: string;
  /** 作者名称，可选 */
  author?: string;
  /** URL友好slug，可选 */
  slug?: string;
  /** 封面图片URL，可选 */
  coverImage?: string;
  /** 旧版图片URL别名，保持兼容 */
  image?: string;
  /** 是否为草稿，可选 */
  draft?: boolean;
  /** 展示优先级，可选 */
  priority?: number;
  /** 关联视频URL，可选 */
  video?: string;
  /** 文章HTML内容，可选 */
  content?: string;
}

// 学习中心视频类型定义
export interface LearningVideo {
  id: string;
  title: string;
  desc: string;
  youtube_url: string;
  tags?: string[];
  category?: string;
  thumbnailUrl?: string;
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