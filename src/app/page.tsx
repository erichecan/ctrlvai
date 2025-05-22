import { BlogSection } from '@/components/home/BlogSection'
import { LearningCenter } from '@/components/home/LearningCenter'
import { ToolCenter } from '@/components/home/ToolCenter'
import { BlogService } from '@/lib/application/blog/blogService'
import { LearningService } from '@/lib/application/learning/learningService'
import { ToolService } from '@/lib/application/tool/toolService'

export default async function Home() {
  try {
    // 初始化服务
    const blogService = new BlogService()
    const learningService = new LearningService()
    const toolService = new ToolService()

    // 获取最新博客
    const latestBlog = await blogService.getLatestPost()

    // 获取学习中心数据
    const learningData = await learningService.getLearningData()

    // 获取工具中心数据
    const toolsData = await toolService.getToolData()

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogSection 
          latestBlog={{
            ...latestBlog,
            id: latestBlog.id.toString().padStart(3, '0')
          }} 
        />
        
        <LearningCenter data={learningData} />
        
        <ToolCenter data={toolsData} />
      </div>
    )
  } catch (error) {
    console.error('Home page data loading failed:', error)
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <h2 className="text-lg font-medium text-red-800">
            Data loading failed
          </h2>
          <p className="text-red-700">
            Please check your network connection or contact support
          </p>
        </div>
      </div>
    )
  }
}