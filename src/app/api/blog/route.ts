import { NextResponse } from 'next/server';
import { getAllBlogPosts, getBlogPostBySlug } from '@/utils/markdown';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// 获取所有博客文章的API
export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// 创建新博客文章的API
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate slug from title if not provided
    const slug = data.slug || data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const filePath = path.join(process.cwd(), 'blogs', `${slug}.md`);

    // Check if file already exists
    try {
      await fs.access(filePath);
      return NextResponse.json(
        { success: false, message: 'A blog post with this slug already exists' },
        { status: 409 }
      );
    } catch (error) {
      // File doesn't exist, we can proceed
    }

    // Create frontmatter
    const frontmatter = {
      title: data.title,
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category,
      tags: data.tags,
      excerpt: data.excerpt,
      author: data.author || 'AI Analysis Team',
      image: data.image || '/images/blog/default.png',
      draft: data.draft || false,
    };

    // Create markdown content
    const markdownContent = matter.stringify(data.content, frontmatter);

    // Write to file
    await fs.writeFile(filePath, markdownContent, 'utf-8');

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
