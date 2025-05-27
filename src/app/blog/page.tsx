import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/utils/markdown';
import BlogCard from '@/components/blog/BlogCard';
import { Pagination, Select, Input, Tag, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;
const { Option } = Select;

export const metadata: Metadata = {
  title: 'Blog - CtrlV AI',
  description: 'Read the latest articles about AI tools, resources, trends, and usage tips.',
  keywords: 'AI blog, artificial intelligence articles, AI tools tips, AI trends',
};

// Helper function to safely get string from searchParams
function getStringParam(param: string | string[] | undefined): string {
  if (!param) return '';
  return Array.isArray(param) ? param[0] : param;
}

export default async function BlogPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  // Get all blog posts
  const allPosts = await getAllBlogPosts();
  // Get all categories and tags
  const categories = await getAllCategories();
  const tags = await getAllTags();

  // Parse query parameters
  const currentPage = searchParams.page ? parseInt(getStringParam(searchParams.page)) : 1;
  const selectedCategory = getStringParam(searchParams.category);
  const selectedTag = getStringParam(searchParams.tag);
  const searchQuery = getStringParam(searchParams.q);

  // Filter posts based on query parameters
  let filteredPosts = allPosts;

  if (selectedCategory) {
    filteredPosts = filteredPosts.filter((post: any) => post.category === selectedCategory);
  }
  if (selectedTag) {
    filteredPosts = filteredPosts.filter((post: any) => post.tags.includes(selectedTag));
  }
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter((post: any) =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    );
  }

  // Pagination
  const postsPerPage = 9;
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  // Get current page posts
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] text-white py-12 px-4 rounded-lg mb-8">
        <div className="container mx-auto">
          <Title level={1} className="text-white text-center mb-4">
            AI Blog
          </Title>
          <Paragraph className="text-white text-center text-lg max-w-3xl mx-auto">
            Discover the latest insights, tips, and trends in the world of AI tools and technologies.
          </Paragraph>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input 
              placeholder="Search articles..." 
              prefix={<SearchOutlined />} 
              size="large"
              defaultValue={searchQuery}
              onChange={(e) => {
                // In a real app, this would use client-side routing
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
                // In a real app, this would use client-side routing
                const url = new URL(window.location.href);
                if (value) {
                  url.searchParams.set('category', value);
                } else {
                  url.searchParams.delete('category');
                }
                url.searchParams.delete('page');
                window.history.pushState({}, '', url);
              }}
            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </div>
          
          <div>
            <Select
              placeholder="Filter by Tag"
              style={{ width: '100%' }}
              size="large"
              allowClear
              defaultValue={selectedTag || undefined}
              onChange={(value) => {
                // In a real app, this would use client-side routing
                const url = new URL(window.location.href);
                if (value) {
                  url.searchParams.set('tag', value);
                } else {
                  url.searchParams.delete('tag');
                }
                url.searchParams.delete('page');
                window.history.pushState({}, '', url);
              }}
            >
              {tags.map((tag) => (
                <Option key={tag} value={tag}>
                  {tag}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </section>
      
      {/* Active Filters */}
      {(selectedCategory || selectedTag || searchQuery) && (
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
            
            {searchQuery && (
              <Tag 
                closable
                onClose={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('q');
                  window.history.pushState({}, '', url);
                }}
              >
                Search: {searchQuery}
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
            <Title level={3}>No articles found</Title>
            <Paragraph className="text-gray-600">
              Try adjusting your filters or search query.
            </Paragraph>
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
              // In a real app, this would use client-side routing
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
          <Title level={4}>Popular Tags</Title>
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
    </MainLayout>
  );
}