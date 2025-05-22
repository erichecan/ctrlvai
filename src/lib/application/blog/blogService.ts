import type { BlogPostDTO } from '@/types/api'

export class BlogService {
  private getApiBaseUrl(): string {
    if (typeof window !== 'undefined') {
      return '/api' // 浏览器环境使用相对路径
    }
    // 服务端环境必须配置API_URL
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error('NEXT_PUBLIC_API_URL environment variable is not set')
    }
    return process.env.NEXT_PUBLIC_API_URL
  }

  async getLatestPost(): Promise<BlogPostDTO> {
    const response = await fetch(`${this.getApiBaseUrl()}/api/blogs/latest`)
    if (!response.ok) {
      throw new Error('Failed to fetch latest blog')
    }
    return response.json()
  }
}