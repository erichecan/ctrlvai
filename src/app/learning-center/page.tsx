'use client';

import MainLayout from '@/components/layout/MainLayout';
import { getAllVideos, getAllVideoTags } from '@/utils/videos';
import VideoCard from '@/components/learning/VideoCard';
import { Pagination, Select, Tag, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Typography, Input } from 'antd';
import { metadata } from './metadata';

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function LearningCenterPage({
  searchParams,
}: {
  searchParams: { page?: string; tag?: string; q?: string };
}) {
  // Get all videos
  const allVideos = getAllVideos();
  
  // Get all tags
  const tags = getAllVideoTags();
  
  // Parse query parameters
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const selectedTag = searchParams.tag || '';
  const searchQuery = searchParams.q || '';
  
  // Filter videos based on query parameters
  let filteredVideos = allVideos;
  
  if (selectedTag) {
    filteredVideos = filteredVideos.filter(video => video.tags?.includes(selectedTag));
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredVideos = filteredVideos.filter(video => 
      video.title.toLowerCase().includes(query) || 
      video.desc.toLowerCase().includes(query)
    );
  }
  
  // Pagination
  const videosPerPage = 6;
  const totalVideos = filteredVideos.length;
  const totalPages = Math.ceil(totalVideos / videosPerPage);
  
  // Get current page videos
  const currentVideos = filteredVideos.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] text-white py-12 px-4 rounded-lg mb-8">
        <div className="container mx-auto">
          <Typography.Title level={1} className="text-white text-center mb-4">
            CtrlV AI Academy
          </Typography.Title>
          <Typography.Paragraph className="text-white text-center text-lg max-w-3xl mx-auto">
            Master AI tools with our expert-led video tutorials and guides. Learn practical skills to boost your productivity.
          </Typography.Paragraph>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input 
              placeholder="Search tutorials..." 
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
      {(selectedTag || searchQuery) && (
        <section className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-600">Active filters:</span>
            
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
              href="/learning-center"
              className="text-[#1976D2] hover:underline ml-auto"
            >
              Clear all filters
            </Link>
          </div>
        </section>
      )}
      
      {/* Videos Grid */}
      <section className="mb-8">
        {currentVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentVideos.map((video) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                desc={video.desc}
                youtube_url={video.youtube_url}
                tags={video.tags}
                category={video.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Title level={3}>No tutorials found</Title>
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
            total={totalVideos}
            pageSize={videosPerPage}
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
      
      {/* Popular Topics Section */}
      <section className="mb-8">
        <Divider>
          <Title level={4}>Popular Topics</Title>
        </Divider>
        
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {tags.slice(0, 10).map((tag) => (
            <Link 
              key={tag} 
              href={`/learning-center?tag=${encodeURIComponent(tag)}`}
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
