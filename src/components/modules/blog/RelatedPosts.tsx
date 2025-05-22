import { BlogCard } from './BlogCard'
import type { BlogPostDTO } from '@/types'

interface RelatedPostsProps {
  posts: BlogPostDTO[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <BlogCard 
          key={post.id} 
          post={post}
          layout="horizontal"
        />
      ))}
    </div>
  )
}