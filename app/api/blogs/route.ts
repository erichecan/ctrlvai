import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const mockBlog = {
    id: "1",
    title: "Sample Blog Post",
    content: "This is a sample blog post",
    category: "Technology",
    date: new Date().toISOString(),
    image: "/images/sample.jpg",
    excerpt: "Sample excerpt",
    slug: "sample-blog-post",
    author: {
      name: "John Doe",
      avatar: "/images/avatar.jpg",
      bio: "Sample bio"
    },
    tags: ["sample", "test"]
  };

  return NextResponse.json(mockBlog);
}