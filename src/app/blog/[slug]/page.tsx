import { BlogPostResponse } from '@/types';
import { getBlogPostBySlug, getRelatedPosts } from '@/utils/markdown';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Loading from '@/components/Loading';

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    return notFound();
  }

  const relatedPosts = await getRelatedPosts(post);

  return (
    <ErrorBoundary 
      fallback={
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-2xl font-bold text-red-600">Failed to load blog post</h1>
          <p className="mt-2 text-gray-600">Please try again later.</p>
        </div>
      }
    >
      <Suspense fallback={<Loading />}>
        <article className="max-w-4xl mx-auto py-12 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center text-gray-500">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.coverImage && (
        <div className="mb-8">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map(post => (
              <div key={post.slug} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">
                  <a href={`/blog/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}