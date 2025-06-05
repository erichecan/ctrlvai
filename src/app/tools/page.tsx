"use client";

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import MainLayoutWrapper from '@/components/layout/MainLayoutWrapper';
import { Typography, Input, Select, Radio, Tag, Card, Row, Col, Spin, Alert, Pagination } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { AITool } from '@/types';
import { loadTools, getCategories, getTags, filterTools } from '@/utils/tools';
import { useSearchParams } from 'next/navigation';

const { Title, Paragraph } = Typography;
const { Option } = Select;

// Helper function to safely get string from searchParams
function getStringParam(param: string | string[] | undefined): string {
  if (!param) {
    return '';
  }
  return Array.isArray(param) ? param[0] : param;
}

export default function ToolsPage() {
  const searchParams = useSearchParams();
  
  // 状态管理
  const [tools, setTools] = useState<AITool[]>([]);
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get filter parameters from URL with null checks
  const currentPage = searchParams?.get('page') ? parseInt(searchParams.get('page') || '1') : 1;
  const searchQuery = searchParams?.get('q') || '';
  const selectedCategory = searchParams?.get('category') || 'All';
  const priceFilter = searchParams?.get('price') || 'all';

  // Memoize selectedTags to prevent unnecessary useEffect runs
  const selectedTags = useMemo(() => {
    const tagsParam = searchParams?.get('tags');
    return tagsParam ? tagsParam.split(',') : [];
  }, [searchParams]);

  // 加载工具数据
  const fetchTools = async () => {
    setLoading(true);
    setError(null);
    try {
      const toolsData = await loadTools();
      console.log('Loaded tools data:', toolsData.length, toolsData);
      setTools(toolsData);
      setCategories(['All', ...getCategories(toolsData)]);
      setTags(getTags(toolsData));
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载工具数据失败');
      console.error('Error loading tools:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  // 处理过滤
  useEffect(() => {
    console.log('Applying filters with:', { searchQuery, selectedCategory, selectedTags, priceFilter });
    const filtered = filterTools(
      tools,
      searchQuery,
      selectedCategory,
      selectedTags || [],
      priceFilter
    );
    console.log('Filtered tools result count:', filtered.length);
    setFilteredTools(filtered);
  }, [tools, searchQuery, selectedCategory, selectedTags, priceFilter]);

  // Pagination
  const toolsPerPage = 12;
  const totalTools = filteredTools.length;
  const totalPages = Math.ceil(totalTools / toolsPerPage);
  const currentTools = filteredTools.slice(
    (currentPage - 1) * toolsPerPage,
    currentPage * toolsPerPage
  );

  console.log('Pagination details:', { currentPage, toolsPerPage, totalTools, totalPages, currentToolsCount: currentTools.length });

  // Helper function to update URL parameters
  const updateUrlParams = (params: Record<string, string | null>) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
    window.history.pushState({}, '', url);
  };

  return (
    <MainLayoutWrapper>
      <section className="bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] text-white py-12 px-4 rounded-lg mb-8">
        <div className="container mx-auto">
          <Title level={1} className="text-white text-center mb-4">
            AI Tools Directory
          </Title>
          <Paragraph className="text-white text-center text-lg max-w-3xl mx-auto">
            Discover and compare the best AI tools for various tasks and use cases.
            From language models to image generation, find the perfect tool for your needs.
          </Paragraph>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Input
            placeholder="Search tools..."
            prefix={<SearchOutlined />}
            className="max-w-xs"
            value={searchQuery}
            onChange={(e) => updateUrlParams({ q: e.target.value, page: '1' })}
          />
          
          <Select
            placeholder="Select category"
            style={{ width: 200 }}
            value={selectedCategory}
            onChange={(value) => updateUrlParams({ category: value, page: '1' })}
          >
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>

          <Select
            mode="multiple"
            placeholder="Select tags"
            style={{ minWidth: 200 }}
            value={selectedTags}
            onChange={(value) => updateUrlParams({ tags: value.join(','), page: '1' })}
          >
            {tags.map(tag => (
              <Option key={tag} value={tag}>{tag}</Option>
            ))}
          </Select>

          <Radio.Group 
            value={priceFilter} 
            onChange={(e) => updateUrlParams({ price: e.target.value, page: '1' })}
          >
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="free">Free</Radio.Button>
            <Radio.Button value="paid">Paid</Radio.Button>
          </Radio.Group>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory !== 'All' || (selectedTags && selectedTags.length > 0) || priceFilter !== 'all') && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-gray-600">Active filters:</span>
            
            {selectedCategory !== 'All' && (
              <Tag 
                color="purple" 
                closable
                onClose={() => updateUrlParams({ category: null })}
              >
                Category: {selectedCategory}
              </Tag>
            )}
            
            {selectedTags && selectedTags.map(tag => (
              <Tag 
                key={tag}
                closable
                onClose={() => {
                  const newTags = selectedTags.filter(t => t !== tag);
                  updateUrlParams({ tags: newTags.length ? newTags.join(',') : null });
                }}
              >
                Tag: {tag}
              </Tag>
            ))}
            
            {searchQuery && (
              <Tag 
                closable
                onClose={() => updateUrlParams({ q: null })}
              >
                Search: {searchQuery}
              </Tag>
            )}
            
            {priceFilter !== 'all' && (
              <Tag 
                closable
                onClose={() => updateUrlParams({ price: null })}
              >
                Price: {priceFilter}
              </Tag>
            )}
            
            <button 
              onClick={() => {
                const url = new URL(window.location.href);
                url.search = '';
                window.history.pushState({}, '', url);
              }}
              className="text-[#1976D2] hover:underline ml-auto"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* 加载状态和错误提示 */}
        {error && (
          <Alert
            message="Error"
            description={
              <div className="flex items-center justify-between">
                <span>{error}</span>
                <button
                  onClick={fetchTools}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <ReloadOutlined /> Retry
                </button>
              </div>
            }
            type="error"
            className="mb-4"
            showIcon
          />
        )}

        {/* 工具列表 */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spin size="large" tip="Loading tools..." />
          </div>
        ) : currentTools.length > 0 ? (
          <>
            <Row gutter={[16, 16]}>
              {currentTools.map(tool => (
                <Col xs={24} sm={12} md={8} lg={6} key={tool.id}>
                  <Card
                    hoverable
                    cover={
                      <div className="p-4 flex items-center justify-center h-48 bg-gray-50">
                        <Image
                          src={tool.logo}
                          alt={tool.name}
                          width={150}
                          height={150}
                          className="max-h-full max-w-full object-contain"
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                    }
                    className="h-full flex flex-col"
                  >
                    <Card.Meta
                      title={
                        <div className="flex items-center justify-between">
                          <span>{tool.name}</span>
                          {tool.isPaid ? (
                            <Tag color="blue">Paid</Tag>
                          ) : (
                            <Tag color="green">Free</Tag>
                          )}
                        </div>
                      }
                      description={tool.description}
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tool.tags.map(tag => (
                        <Tag key={tag} color="purple">{tag}</Tag>
                      ))}
                    </div>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                    >
                      Visit Tool
                    </a>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 mb-8">
                <Pagination
                  current={currentPage}
                  total={totalTools}
                  pageSize={toolsPerPage}
                  onChange={(page) => updateUrlParams({ page: page.toString() })}
                  showSizeChanger={false}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Title level={3}>No tools found</Title>
            <Paragraph className="text-gray-600">
              Try adjusting your filters or search query.
            </Paragraph>
          </div>
        )}
      </div>
    </MainLayoutWrapper>
  );
}