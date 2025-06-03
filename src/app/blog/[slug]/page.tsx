import { BlogPostResponse } from '@/types';
import Image from 'next/image';
import { getBlogPostBySlug, getRelatedPosts } from '@/utils/markdown';
import { notFound } from 'next/navigation';
import BlogPostWrapper from '@/app/blog/[slug]/BlogPostWrapper';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    return notFound();
  }

  const relatedPosts = await getRelatedPosts(post);

  return (
    <BlogPostWrapper>
      <article className="max-w-4xl mx-auto py-12 px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post.title || 'Untitled Post'}</h1>
          <div className="flex items-center text-gray-500">
            <span>{post.author || 'Anonymous'}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.date || ''}>
              {post.date ? new Date(post.date).toLocaleDateString() : 'Unknown date'}
            </time>
          </div>
          {(post.tags || []).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {(post.tags || []).map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="mb-8">
          <Image 
            src={post.coverImage || 'https://placehold.co/800x400/e2e8f0/1e293b?text=Blog+Image'}
            alt={post.title || 'Blog post cover'}
            width={1200}
            height={630}
            className="w-full rounded-lg"
            style={{ height: 'auto' }}
            priority
          />
        </div>
        <div className="prose max-w-none">
          {post.content ? (
            <ReactMarkdown
              children={post.content}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ className, children, ...props }: { className?: any; children?: any; [key: string]: any }) {
                  const match = /language-(\w+)/.exec(className || '');
                  if (match) {
                    const SyntaxHighlighterAny = SyntaxHighlighter as any;
                    return (<SyntaxHighlighterAny style={ ( dracula as any ) } language={match[1]} PreTag="div" { ... ( props as any ) }> { String(children).replace(/\n$/, '') } </SyntaxHighlighterAny>);
                  } else {
                     return (<code className={className} { ... ( props as any ) }> { children } </code>);
                  }
                },
              }}
            />
          ) : (
            <p className="text-gray-500">No content available for this post.</p>
          )}
        </div>
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
    </BlogPostWrapper>
  );
}