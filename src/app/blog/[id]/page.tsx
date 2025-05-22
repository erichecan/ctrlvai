import { BlogContent } from '@/components/modules/blog/BlogContent'
import { RelatedPosts } from '@/components/modules/blog/RelatedPosts'
import { BlogService } from '@/lib/application/api/blog'
import { auth } from '@/lib/infrastructure/auth/service'

export default async function BlogDetailPage({
  params
}: {
  params: { id: string }
}) {
  const session = await auth()
  const post = await BlogService.getPost(params.id)
  const relatedPosts = post ? await BlogService.getRelatedPosts(post.id) : []

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Blog post not found
        </h1>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BlogContent 
        post={post} 
        isAuthor={session?.user?.id === post.authorId}
      />
      
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
          <RelatedPosts posts={relatedPosts} />
        </div>
      )}
    </div>
  )
}