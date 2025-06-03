import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    console.log('PUT API called for slug:', slug);
    const filePath = path.join(process.cwd(), 'blogs', `${slug}.md`);
    console.log('File path:', filePath);
    
    const data = await request.json();
    console.log('Received data:', JSON.stringify(data, null, 2));

    // Validate required fields
    if (!data.title?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Title is required' },
        { status: 400 }
      );
    }
    if (!data.content?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Content is required' },
        { status: 400 }
      );
    }
    if (!data.category?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Category is required' },
        { status: 400 }
      );
    }
    if (!Array.isArray(data.tags) || data.tags.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one tag is required' },
        { status: 400 }
      );
    }

    // Check if file exists
    try {
      await fs.access(filePath);
      console.log('File exists, proceeding with update');
    } catch (error) {
      console.log('File not found:', error);
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Create frontmatter
    const frontmatter = {
      title: data.title.trim(),
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category.trim(),
      tags: data.tags.map((tag: string) => tag.trim()),
      excerpt: data.excerpt?.trim() || '',
      author: data.author?.trim() || 'AI Analysis Team',
      image: data.image?.trim() || '/images/blog/default.png',
      draft: data.draft || false,
    };
    console.log('Created frontmatter:', JSON.stringify(frontmatter, null, 2));

    // Create markdown content
    const markdownContent = matter.stringify(data.content.trim(), frontmatter);
    console.log('Generated markdown content length:', markdownContent.length);

    // Write to file
    await fs.writeFile(filePath, markdownContent, 'utf-8');
    console.log('File successfully updated');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, message: `Failed to update blog post: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    console.log('Delete API called for slug:', slug);
    const filePath = path.join(process.cwd(), 'blogs', `${slug}.md`);
    console.log('Attempting to delete file at:', filePath);

    // Check if file exists
    try {
      await fs.access(filePath);
      console.log('File exists, proceeding with deletion');
    } catch (error) {
      console.log('File not found:', error);
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Delete the file
    await fs.unlink(filePath);
    console.log('File successfully deleted');

    // Verify deletion
    try {
      await fs.access(filePath);
      console.log('Warning: File still exists after deletion');
    } catch (error) {
      console.log('File successfully verified as deleted');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, message: `Failed to delete blog post: ${error.message}` },
      { status: 500 }
    );
  }
} 