'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { parseMarkdown } from '@/utils/markdown'

interface BlogPost {
  id: string // 修改为字符串类型以匹配路由
  title: string
  content: string
  category: string
  date: string
  image?: string
  excerpt: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  tags: string[]
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 确保ID格式一致
        const formattedId = params.id.padStart(3, '0')
        const res = await fetch(`/api/blogs/${formattedId}`)
        if (!res.ok) throw new Error('Failed to fetch post')
        const data = await res.json()
        setPost({
          ...data,
          id: data.id.toString().padStart(3, '0') // 统一ID格式
        })
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (!post) {
    return <ErrorDisplay message="Blog post not found" />
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="prose prose-lg max-w-none dark:prose-invert">
        {/* 详情页内容保持不变 */}
      </article>
    </div>
  )
}

// 保持LoadingSkeleton和ErrorDisplay组件不变