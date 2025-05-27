import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'blogs');
const cache = {
  posts: null,
  lastUpdated: 0,
  ttl: 1000 * 60 * 5, // 5 minutes
};

export async function getAllBlogPosts() {
  const now = Date.now();
  if (cache.posts && now - cache.lastUpdated < cache.ttl) {
    return cache.posts;
  }

  try {
    const fileNames = await fs.promises.readdir(blogsDirectory);
    const allPostsData = await Promise.all(
      fileNames.map(async (fileName) => {
        const fullPath = path.join(blogsDirectory, fileName);
        const fileContents = await fs.promises.readFile(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        return {
          slug: fileName.replace(/\.md$/, ''),
          content: matterResult.content,
          ...(matterResult.data as Omit<BlogPost, 'content'>),
        };
      })
    );
    cache.posts = allPostsData;
    cache.lastUpdated = Date.now();
    return allPostsData;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}
