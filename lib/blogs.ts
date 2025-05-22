interface BlogPost {
  id: string; // 改为 string 类型
  title: string;
  content: string;
  category: string;
  date: string;
  image?: string;
  excerpt: string;
  slug: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  tags: string[];
}

export async function getAllBlogIds(): Promise<string[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/ids`);
    const data = await res.json();

    console.log('getAllBlogIds response:', data); // 添加日志记录

    if (!Array.isArray(data) || !data.every(id => typeof id === 'string')) {
      throw new Error('Invalid blog IDs format');
    }

    return data;
  } catch (error) {
    console.error('Error getting blog ids:', error);
    return [];
  }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`);
    const data = await res.json();

    console.log(`getBlogPost response for ID ${id}:`, data); // 添加日志记录

    if (!data || typeof data !== 'object' || !data.id || !data.title) {
      throw new Error('Invalid blog post format');
    }

    return data;
  } catch (error) {
    console.error(`Error getting blog post for ID ${id}:`, error);
    return null;
  }
}

export async function getRelatedPosts(id: string, tags: string[]): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/related`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, tags })
    });
    if (!res.ok) throw new Error('Failed to fetch related posts');
    return await res.json();
  } catch (error) {
    console.error('Error getting related posts:', error);
    return [];
  }
}