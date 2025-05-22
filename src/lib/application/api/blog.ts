import { BlogCMS } from '../infrastructure/cms/blog'
import type { BlogPostDTO, PaginationParams } from '../../types'

const cms = new BlogCMS()

export class BlogService {
  // 获取博客列表
  static async getPosts(params: PaginationParams): Promise<BlogPostDTO[]> {
    try {
      return await cms.getList(params.page, params.pageSize)
    } catch (error) {
      console.error('Failed to fetch blog posts:', error)
      throw new Error('BLOG_LOAD_FAILED')
    }
  }

  // 获取单篇博客
  static async getPost(id: string): Promise<BlogPostDTO | null> {
    try {
      const post = await cms.getById(id)
      if (!post) throw new Error('POST_NOT_FOUND')
      return post
    } catch (error) {
      console.error(`Failed to fetch blog post ${id}:`, error)
      throw new Error('POST_LOAD_FAILED')
    }
  }

  // 创建博客
  static async createPost(postData: Omit<BlogPostDTO, 'id'>, session: any): Promise<BlogPostDTO> {
    if (!session?.user?.id) throw new Error('UNAUTHORIZED')
    
    try {
      return await cms.create({
        ...postData,
        authorId: session.user.id
      })
    } catch (error) {
      console.error('Failed to create blog post:', error)
      throw new Error('POST_CREATE_FAILED')
    }
  }
}