'use client';
import { useEffect, useState, Suspense } from 'react';
import BlogCard from '@/components/blog/BlogCard';
import { Pagination, Select, Input, Tag, Divider, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Typography } from 'antd';
import { BlogPost } from '@/types';
import { useSearchParams } from 'next/navigation';

// Helper function to safely get string from searchParams
function getStringParam(param: string | string[] | undefined): string {
  if (!param) {
    return '';
  }
  return Array.isArray(param) ? param[0] : param;
}

// Separate the main content into a new component
function BlogContent() {
  const searchParams = useSearchParams();
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const postsResponse = await fetch('/api/blogs');
        const posts: BlogPost[] = await postsResponse.json();
        setAllPosts(posts);

        // Mock categories and tags fetching for now
        setCategories(['Category1', 'Category2']);
        setTags(['Tag1', 'Tag2']);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  if (!searchParams) {
    return <div>Error: Unable to fetch search parameters.</div>;
  }

  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page') || '1') : 1;
  const selectedCategory = searchParams.get('category') || '';
  const selectedTag = searchParams.get('tag') || '';
  const queryParam = searchParams.get('q') || '';

  // Filter posts based on query parameters
  let filteredPosts: BlogPost[] = allPosts;

  if (selectedCategory) {
    filteredPosts = filteredPosts.filter((post: BlogPost) => post.category === selectedCategory);
  }
  if (selectedTag) {
    filteredPosts = filteredPosts.filter((post: BlogPost) => post.tags.includes(selectedTag));
  }
  if (queryParam) {
    const query = queryParam.toLowerCase();
    filteredPosts = filteredPosts.filter((post: BlogPost) =>
      post.title.toLowerCase().includes(query) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(query)) ||
      post.content.toLowerCase().includes(query)
    );
  }

  // Pagination
  const postsPerPage = 9;
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <>
      {/* Filters Section */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input 
              placeholder="Search articles..." 
              prefix={<SearchOutlined />} 
              size="large"
              defaultValue={queryParam}
              onChange={(e) => {
                const url = new URL(window.location.href);
                url.searchParams.set('q', e.target.value);
                url.searchParams.delete('page');
                window.history.pushState({}, '', url);
              }}
            />
          </div>
          
          <div>
            <Select
              placeholder="Filter by Category"
              style={{ width: '100%' }}
              size="large"
              allowClear
              defaultValue={selectedCategory || undefined}
              onChange={(value) => {
                const url = new URL(window.location.href);
                if (value) {
                  url.searchParams.set('category', value);
                } else {
                  url.searchParams.delete('category');
                }
                url.searchParams.delete('page');
                window.history.pushState({}, '', url);
              }}
              options={categories.map((category) => ({ label: category, value: category }))}
            />
          </div>
          
          <div>
            <Select
              placeholder="Filter by Tag"
              style={{ width: '100%' }}
              size="large"
              allowClear
              defaultValue={selectedTag || undefined}
              onChange={(value) => {
                const url = new URL(window.location.href);
                if (value) {
                  url.searchParams.set('tag', value);
                } else {
                  url.searchParams.delete('tag');
                }
                url.searchParams.delete('page');
                window.history.pushState({}, '', url);
              }}
              options={tags.map((tag) => ({ label: tag, value: tag }))}
            />
          </div>
        </div>
      </section>
      
      {/* Active Filters */}
      {(selectedCategory || selectedTag || queryParam) && (
        <section className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-600">Active filters:</span>
            
            {selectedCategory && (
              <Tag 
                color="purple" 
                closable
                onClose={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('category');
                  window.history.pushState({}, '', url);
                }}
              >
                Category: {selectedCategory}
              </Tag>
            )}
            
            {selectedTag && (
              <Tag 
                closable
                onClose={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('tag');
                  window.history.pushState({}, '', url);
                }}
              >
                Tag: {selectedTag}
              </Tag>
            )}
            
            {queryParam && (
              <Tag 
                closable
                onClose={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('q');
                  window.history.pushState({}, '', url);
                }}
              >
                Search: {queryParam}
              </Tag>
            )}
            
            <Link 
              href="/blog"
              className="text-[#1976D2] hover:underline ml-auto"
            >
              Clear all filters
            </Link>
          </div>
        </section>
      )}
      
      {/* Blog Posts Grid */}
      <section className="mb-8">
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <BlogCard
                key={post.slug}
                id={post.slug}
                title={post.title || 'Untitled'}
                excerpt={post.excerpt || ''}
                date={post.date || new Date().toISOString()}
                category={post.category || 'Uncategorized'}
                tags={post.tags || []}
                slug={post.slug}
                image={post.coverImage || '/images/blog/default.png'}
                author={post.author || 'Anonymous'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Typography.Title level={3}>No articles found</Typography.Title>
            <Typography.Paragraph className="text-gray-600">
              Try adjusting your filters or search query.
            </Typography.Paragraph>
          </div>
        )}
      </section>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <section className="flex justify-center mb-8">
          <Pagination
            current={currentPage}
            total={totalPosts}
            pageSize={postsPerPage}
            onChange={(page) => {
              const url = new URL(window.location.href);
              url.searchParams.set('page', page.toString());
              window.history.pushState({}, '', url);
            }}
            showSizeChanger={false}
          />
        </section>
      )}
      
      {/* Popular Tags Section */}
      <section className="mb-8">
        <Divider>
          <Typography.Title level={4}>Popular Tags</Typography.Title>
        </Divider>
        
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {tags.slice(0, 15).map((tag) => (
            <Link 
              key={tag} 
              href={`/blog?tag=${encodeURIComponent(tag)}`}
            >
              <Tag className="text-base py-1 px-3 cursor-pointer">
                {tag}
              </Tag>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

// Main component with Suspense boundary
export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] text-white py-12 px-4 rounded-lg mb-8">
        <div className="container mx-auto">
          <Typography.Title level={1} className="text-white text-center mb-4">
            AI Blog
          </Typography.Title>
          <Typography.Paragraph className="text-white text-center text-lg max-w-3xl mx-auto">
            Discover the latest insights, tips, and trends in the world of AI tools and technologies.
          </Typography.Paragraph>
        </div>
      </section>

      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[400px]">
          <Spin size="large" />
        </div>
      }>
        <BlogContent />
      </Suspense>
    </>
  );
}