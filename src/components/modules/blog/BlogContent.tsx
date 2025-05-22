'use client'

import { parseMarkdown } from '@/utils/markdown'
import { EditButton } from './EditButton'
import { AuthorInfo } from './AuthorInfo'

interface BlogContentProps {
  post: BlogPostDTO
  isAuthor: boolean
}

export function BlogContent({ post, isAuthor }: BlogContentProps) {
  const htmlContent = parseMarkdown(post.content)

  return (
    <article className="prose prose-lg max-w-none dark:prose-invert">
      <header className="mb-12">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
          {isAuthor && <EditButton postId={post.id} />}
        </div>

        <AuthorInfo 
          author={post.author} 
          date={post.createdAt}
          category={post.category}
        />
      </header>

      {post.imageUrl && (
        <div className="relative w-full h-96 mb-12 rounded-xl overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div 
        className="[&>pre]:bg-gray-800 [&>pre]:p-4 [&>pre]:rounded-lg"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  )
}