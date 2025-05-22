declare global {
  interface BlogPost {
    id: number;
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
}

declare module '@/lib/blogs' {
  export function getAllBlogIds(): string[]
  export function getBlogPost(id: string): BlogPost | null
}

export {};