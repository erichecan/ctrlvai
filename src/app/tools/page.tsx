import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { getAllTools, getAllToolCategories, getAllToolTags } from '@/utils/tools';
import ToolCard from '@/components/tools/ToolCard';
import { Pagination, Select, Typography, Input, Tag, Divider, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph } = Typography;
const { Option } = Select;

export const metadata: Metadata = {
  title: 'AI Tools - CtrlV AI',
  description: 'Discover and compare the best AI tools for various tasks and use cases.',
  keywords: 'AI tools, artificial intelligence tools, AI software, AI applications',
};

export default function ToolsPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; tag?: string; q?: string; paid?: string };
}) {
  // Get all tools
  const allTools = getAllTools();
  
  // Get all categories and tags
  const categories = getAllToolCategories();
  const tags = getAllToolTags();
  
  // Parse query parameters
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const selectedCategory = searchParams.category || '';
  const selectedTag = searchParams.tag || '';
  const searchQuery = searchParams.q || '';
  const paidFilter = searchParams.paid || 'all';
  
  // Filter tools based on query parameters
  let filteredTools = allTools;
  
  if (selectedCategory) {
    filteredTools = filteredTools.filter(tool => tool.category === selectedCategory);
  }
  
  if (selectedTag) {
    filteredTools = filteredTools.filter(tool => tool.tags.includes(selectedTag));
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTools = filteredTools.filter(tool => 
      tool.name.toLowerCase().includes(query) || 
      tool.description.toLowerCase().includes(query)
    );
  }
  
  if (paidFilter === 'free') {
    filteredTools = filteredTools.filter(tool => !tool.isPaid);
  } else if (paidFilter === 'paid') {
    filteredTools = filteredTools.filter(tool => tool.isPaid);
  }
  
  // Pagination
  const toolsPerPage = 9;
  const totalTools = filteredTools.length;
  const totalPages = Math.ceil(totalTools / toolsPerPage);
  
  // Get current page tools
  const currentTools = filteredTools.slice(
    (currentPage - 1) * toolsPerPage,
    currentPage * toolsPerPage
  );
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] text-white py-12 px-4 rounded-lg mb-8">
        <div className="container mx-auto">
          <Title level={1} className="text-white text-center mb-4">
            AI Tools Directory
          </Title>
          <Paragraph className="text-white text-center text-lg max-w-3xl mx-auto">
            Discover and compare the best AI tools for various tasks. Find the perfect tool for your specific needs.
          </Paragraph>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Input 
              placeholder="Search tools..." 
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
        
        <div className="flex justify-center mb-4">
          <Radio.Group 
            defaultValue={paidFilter}
            buttonStyle="solid"
            onChange={(e) => {
              // In a real app, this would use client-side routing
              const url = new URL(window.location.href);
              url.searchParams.set('paid', e.target.value);
              url.searchParams.delete('page');
              window.history.pushState({}, '', url);
            }}
          >
            <Radio.Button value="all">All Tools</Radio.Button>
            <Radio.Button value="free">Free Only</Radio.Button>
            <Radio.Button value="paid">Paid Only</Radio.Button>
          </Radio.Group>
        </div>
      </section>
      
      {/* Active Filters */}
      {(selectedCategory || selectedTag || searchQuery || paidFilter !== 'all') && (
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
            
            {paidFilter !== 'all' && (
              <Tag 
                color={paidFilter === 'free' ? 'green' : 'gold'}
                closable
                onClose={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('paid');
                  window.history.pushState({}, '', url);
                }}
              >
                {paidFilter === 'free' ? 'Free Only' : 'Paid Only'}
              </Tag>
            )}
            
            <Link 
              href="/tools"
              className="text-[#1976D2] hover:underline ml-auto"
            >
              Clear all filters
            </Link>
          </div>
        </section>
      )}
      
      {/* Tools Grid */}
      <section className="mb-8">
        {currentTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTools.map((tool) => (
              <ToolCard
                key={tool.id}
                id={tool.id}
                name={tool.name}
                description={tool.description}
                logo={tool.logo}
                url={tool.url}
                isPaid={tool.isPaid}
                tags={tool.tags}
                category={tool.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Title level={3}>No tools found</Title>
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
            total={totalTools}
            pageSize={toolsPerPage}
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
      
      {/* Categories Section */}
      <section className="mb-8">
        <Divider>
          <Title level={4}>Browse by Category</Title>
        </Divider>
        
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {categories.map((category) => (
            <Link 
              key={category} 
              href={`/tools?category=${encodeURIComponent(category)}`}
            >
              <Tag color="purple" className="text-base py-1 px-3 cursor-pointer">
                {category}
              </Tag>
            </Link>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
