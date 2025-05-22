import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image?: string
  date: string
  category: string
}

export function BlogSection({ latestBlog }: { latestBlog?: BlogPost }) {
  if (!latestBlog) {
    return <div>暂无最新博客。</div>
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6">Latest Blog Post</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <Link href={`/blog/${latestBlog.id}`}>
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {latestBlog.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(latestBlog.date).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{latestBlog.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{latestBlog.excerpt}</p>
          </div>
        </Link>
      </div>
    </section>
  )
}