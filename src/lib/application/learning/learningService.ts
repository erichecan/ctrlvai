import type { LearningItemDTO } from '@/types/api'

export class LearningService {
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

  async getLearningData(): Promise<LearningItemDTO[]> {
    const response = await fetch(`${this.getApiBaseUrl()}/api/learning-center`)
    if (!response.ok) {
      return []
    }
    return response.json()
  }
}