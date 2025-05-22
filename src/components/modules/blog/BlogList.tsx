'use client'

import { useEffect, useState } from 'react'
import { BlogCard } from './BlogCard'
import { Pagination } from '../../ui/Pagination'
import { BlogService } from '../../../lib/application/api/blog'
import type { BlogPostDTO } from '../../../types'

export function BlogList() {
  const [posts, setPosts] = useState<BlogPostDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 6

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await BlogService.getPosts({
          page: currentPage,
          pageSize
        })
        setPosts(data)
        // TODO: 获取总页数
        setTotalPages(Math.ceil(/* 总数据量 */ / pageSize))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [currentPage])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(pageSize)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-64 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}