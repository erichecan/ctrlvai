import Link from 'next/link'
import Image from 'next/image'
import type { BlogPostDTO } from '../../../types'

interface BlogCardProps {
  post: BlogPostDTO
  layout?: 'horizontal' | 'vertical'
}

export function BlogCard({ post, layout = 'vertical' }: BlogCardProps) {
  const cardClasses = [
    'bg-white dark:bg-gray-800',
    'rounded-lg shadow-sm',
    'overflow-hidden',
    'transition-all hover:shadow-md',
    layout === 'horizontal' ? 'md:flex' : ''
  ].join(' ')

  return (
    <article className={cardClasses}>
      {post.imageUrl && (
        <div className={`relative ${layout === 'horizontal' ? 'md:w-1/3' : 'h-48'}`}>
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
            {post.category}
          </span>
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </time>
        </div>
        <Link href={`/blog/${post.id}`}>
          <h3 className="text-lg font-medium mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
          {post.excerpt}
        </p>
        <Link 
          href={`/blog/${post.id}`}
          className="inline-block mt-3 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
        >
          Read more
        </Link>
      </div>
    </article>
  )
}