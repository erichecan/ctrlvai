import Link from 'next/link'
import { BlogSection } from '@/components/home/BlogSection'
import { LearningCenter } from '@/components/home/LearningCenter'
import { ToolCenter } from '@/components/home/ToolCenter'

export default async function Home() {
  try {
    // 获取最新博客
    const latestBlogRes = await fetch('http://localhost:3000/api/blogs/latest', {
      next: { revalidate: 3600 } // 1小时缓存
    })
    
    if (!latestBlogRes.ok) {
      throw new Error(`Failed to fetch blog: ${latestBlogRes.statusText}`)
    }

    const latestBlog = await latestBlogRes.json()

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogSection latestBlog={latestBlog} />
        <LearningCenter />
        <ToolCenter />
      </div>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">暂时无法加载数据</h2>
          <p className="text-gray-600">请稍后重试</p>
        </div>
      </div>
    )
  }
}