import type { ToolItemDTO } from '@/types/api'

export class ToolService {
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

  async getToolData(): Promise<ToolItemDTO[]> {
    const response = await fetch(`${this.getApiBaseUrl()}/api/tool-center`)
    if (!response.ok) {
      return []
    }
    return response.json()
  }
}