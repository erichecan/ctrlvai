import { NextResponse } from 'next/server';
import { getAllBlogPosts, getBlogPostBySlug } from '@/utils/markdown';

// 获取所有博客文章的API
export async function GET() {
  try {
    const posts = getAllBlogPosts();
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// 创建新博客文章的API
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // 在实际应用中，这里应该将数据保存到文件系统或数据库
    // 由于这是一个简化的示例，我们只返回成功
    return NextResponse.json({ success: true, message: 'Blog post created successfully' });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
