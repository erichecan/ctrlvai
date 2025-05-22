import { db } from './database'
import type { BlogPostDTO } from '../../types'

export class BlogCMS {
  // 创建博客文章
  async create(post: Omit<BlogPostDTO, 'id'>): Promise<BlogPostDTO> {
    const result = await db
      .insertInto('blog_posts')
      .values({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        image_url: post.imageUrl || null,
        category: post.category,
        tags: JSON.stringify(post.tags || []),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .returningAll()
      .executeTakeFirstOrThrow()

    return {
      id: result.id.toString().padStart(3, '0'),
      title: result.title,
      content: result.content,
      excerpt: result.excerpt,
      imageUrl: result.image_url || undefined,
      category: result.category,
      tags: JSON.parse(result.tags),
      createdAt: result.created_at,
      updatedAt: result.updated_at
    }
  }

  // 获取分页列表
  async getList(page: number, pageSize: number): Promise<BlogPostDTO[]> {
    const results = await db
      .selectFrom('blog_posts')
      .selectAll()
      .orderBy('created_at', 'desc')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .execute()

    return results.map(post => ({
      id: post.id.toString().padStart(3, '0'),
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      imageUrl: post.image_url || undefined,
      category: post.category,
      tags: JSON.parse(post.tags),
      createdAt: post.created_at,
      updatedAt: post.updated_at
    }))
  }

  // 获取单篇文章
  async getById(id: string): Promise<BlogPostDTO | null> {
    const numericId = parseInt(id)
    if (isNaN(numericId)) return null

    const result = await db
      .selectFrom('blog_posts')
      .selectAll()
      .where('id', '=', numericId)
      .executeTakeFirst()

    return result ? {
      id: result.id.toString().padStart(3, '0'),
      title: result.title,
      content: result.content,
      excerpt: result.excerpt,
      imageUrl: result.image_url || undefined,
      category: result.category,
      tags: JSON.parse(result.tags),
      createdAt: result.created_at,
      updatedAt: result.updated_at
    } : null
  }
}