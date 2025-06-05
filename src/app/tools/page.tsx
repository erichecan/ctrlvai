"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import MainLayoutWrapper from '@/components/layout/MainLayoutWrapper';
import { Typography, Input, Select, Radio, Tag, Card, Row, Col, Spin, Alert } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { AITool } from '@/types';
import { loadTools, getCategories, getTags, filterTools } from '@/utils/tools';

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function ToolsPage() {
  // 状态管理
  const [tools, setTools] = useState<AITool[]>([]);
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载工具数据
  const fetchTools = async () => {
    setLoading(true);
    setError(null);
    try {
      const toolsData = await loadTools();
      setTools(toolsData);
      setFilteredTools(toolsData);
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
    console.log('Filtering tools...');
    console.log('Current tools:', tools);
    console.log('Current filter parameters:', { searchQuery, selectedCategory, selectedTags, priceFilter });

    const filtered = filterTools(
      tools,
      searchQuery,
      selectedCategory,
      selectedTags,
      priceFilter
    );

    console.log('Filtered tools result:', filtered);
    setFilteredTools(filtered);
  }, [tools, searchQuery, selectedCategory, selectedTags, priceFilter]);

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
        {/* Pagination */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Input
            placeholder="Search tools..."
            prefix={<SearchOutlined />}
            className="max-w-xs"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <Select
            placeholder="Select category"
            style={{ width: 200 }}
            value={selectedCategory}
            onChange={setSelectedCategory}
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
            onChange={setSelectedTags}
          >
            {tags.map(tag => (
              <Option key={tag} value={tag}>{tag}</Option>
            ))}
          </Select>

          <Radio.Group value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="free">Free</Radio.Button>
            <Radio.Button value="paid">Paid</Radio.Button>
          </Radio.Group>
        </div>

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
        ) : (
          <Row gutter={[16, 16]}>
          {filteredTools.map(tool => (
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
        )}
      </div>
    </MainLayoutWrapper>
  );
}