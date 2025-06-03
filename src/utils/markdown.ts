import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '../types';

// 简单的内存缓存
const cache = {
  posts: null as BlogPost[] | null,
  lastUpdated: 0,
  ttl: 60 * 60 * 1000, // 1小时缓存
};

const blogsDirectory = path.join(process.cwd(), 'blogs');

// 获取所有博客文章
// 根据slug获取单个博客文章
export async function getRelatedPosts(currentPost: BlogPost, limit = 3): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllBlogPosts();
    
    // 计算每篇文章的相关性分数
    const postsWithScores = allPosts
      .filter(post => post.slug !== currentPost.slug) // 排除当前文章
      .map(post => {
        let score = 0;
        
        // 标签匹配加分
        const commonTags = currentPost.tags.filter(tag => 
          post.tags.includes(tag)
        ).length;
        score += commonTags * 2;
        
        // 标题相似度加分
        const titleSimilarity = currentPost.title
          .split(' ')
          .filter(word => post.title.includes(word))
          .length;
        score += titleSimilarity;
        
        return { post, score };
      })
      .filter(({ score }) => score > 0) // 只保留有相关性的文章
      .sort((a, b) => b.score - a.score) // 按分数降序排序
      .slice(0, limit) // 限制返回数量
      .map(({ post }) => post); // 只返回文章对象
    
    return postsWithScores;
  } catch (error) {
    console.error('Error getting related posts:', error);
    return [];
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (typeof window !== 'undefined') {
    throw new Error('getAllBlogPosts can only be called on the server side.');
  }

  // 检查缓存
  const now = Date.now();
  if (cache.posts && now - cache.lastUpdated < cache.ttl) {
    return cache.posts;
  }

  try {
    const fileNames = await fs.promises.readdir(blogsDirectory);
    const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = await fs.promises.readFile(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const data = matterResult.data as Omit<BlogPost, 'content'>;
      // 兼容 image 字段和 coverImage 字段
      const coverImage = data.coverImage || data.image || undefined;
      return {
        slug: fileName.replace(/\.md$/, ''),
        content: matterResult.content,
        ...data,
        coverImage, // 优先 coverImage，没有则用 image
      };
    }));
    cache.posts = allPostsData;
    cache.lastUpdated = Date.now();
    return allPostsData;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

// 获取所有博客文章的路径
export function getAllBlogSlugs() {
  const fileNames = fs.readdirSync(blogsDirectory);
  
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// 根据slug获取博客文章
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const allPosts = await getAllBlogPosts();
    return allPosts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error(`Error getting blog post by slug ${slug}:`, error);
    return null;
  }
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const categories = new Set<string>();
  posts.forEach(post => {
    if (post.category) {
      categories.add(post.category);
    }
  });
  return Array.from(categories);
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const tags = new Set<string>();
  posts.forEach(post => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        tags.add(tag);
      });
    }
  });
  return Array.from(tags);
}

// 根据分类获取文章
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.category === category);
}

// 根据标签获取文章
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.tags.includes(tag));
}