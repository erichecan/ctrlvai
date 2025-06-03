'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Statistic, List, Tag, Spin, Alert } from 'antd';
import { 
  FileTextOutlined, 
  VideoCameraOutlined, 
  ToolOutlined,
  EyeOutlined,
  UserOutlined
} from '@ant-design/icons';
import AdminLayout from '@/components/admin/AdminLayout';

const { Title, Paragraph } = Typography;

interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
}

interface Video {
  id: string;
  title: string;
  youtube_url: string;
}

interface Tool {
  id: string;
  name: string;
  category: string;
  isPaid: boolean;
}

interface DashboardStats {
  totalBlogs: number;
  totalVideos: number;
  totalTools: number;
  recentBlogs: BlogPost[];
  recentVideos: Video[];
  popularTools: Tool[];
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    totalVideos: 0,
    totalTools: 0,
    recentBlogs: [],
    recentVideos: [],
    popularTools: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch blog posts
      const blogResponse = await fetch('/api/blog');
      if (!blogResponse.ok) throw new Error('Failed to fetch blog posts');
      const blogData = await blogResponse.json();
      
      // Fetch videos
      const videoResponse = await fetch('/api/learning');
      if (!videoResponse.ok) throw new Error('Failed to fetch learning videos');
      const videoData = await videoResponse.json();
      
      // Fetch tools
      const toolResponse = await fetch('/api/tools');
      if (!toolResponse.ok) throw new Error('Failed to fetch AI tools');
      const toolData = await toolResponse.json();
      
      // Validate API responses
      if (!blogData.success || !videoData.success || !toolData.success) {
        throw new Error('One or more API requests returned unsuccessful');
      }

      // Validate data structure
      if (!Array.isArray(blogData.posts)) {
        console.error('Blog posts data is not an array:', blogData);
        throw new Error('Invalid blog posts data structure');
      }

      if (!Array.isArray(videoData.videos)) {
        console.error('Videos data is not an array:', videoData);
        throw new Error('Invalid videos data structure');
      }

      if (!Array.isArray(toolData.tools)) {
        console.error('Tools data is not an array:', toolData);
        throw new Error('Invalid tools data structure');
      }
      
      // Process and set the data
      setStats({
        totalBlogs: blogData.posts.length || 0,
        totalVideos: videoData.videos.length || 0,
        totalTools: toolData.tools.length || 0,
        recentBlogs: (blogData.posts || []).slice(0, 5).map((post: any) => ({
          id: post.id || post.slug || '',
          title: post.title || 'Untitled',
          date: post.date || new Date().toISOString().split('T')[0],
          category: post.category || 'Uncategorized'
        })),
        recentVideos: (videoData.videos || []).slice(0, 5).map((video: any) => ({
          id: video.id || '',
          title: video.title || 'Untitled',
          youtube_url: video.youtube_url || ''
        })),
        popularTools: (toolData.tools || []).slice(0, 5).map((tool: any) => ({
          id: tool.id || '',
          name: tool.name || 'Untitled',
          category: tool.category || 'Uncategorized',
          isPaid: Boolean(tool.isPaid)
        }))
      });
    } catch (err: unknown) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      // Set default empty state in case of error
      setStats({
        totalBlogs: 0,
        totalVideos: 0,
        totalTools: 0,
        recentBlogs: [],
        recentVideos: [],
        popularTools: []
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout selectedKey="dashboard">
      <Title level={2} className="mb-6">Dashboard</Title>
      
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      )}
      
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-6"
        />
      )}
      
      {!loading && !error && (
        <div>
          {/* Stats Cards */}
          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} sm={8}>
              <Card className="shadow-md">
                <Statistic 
                  title="Total Blog Posts" 
                  value={stats.totalBlogs} 
                  prefix={<FileTextOutlined />} 
                  valueStyle={{ color: '#1976D2' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="shadow-md">
                <Statistic 
                  title="Total Learning Videos" 
                  value={stats.totalVideos} 
                  prefix={<VideoCameraOutlined />} 
                  valueStyle={{ color: '#6A1B9A' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="shadow-md">
                <Statistic 
                  title="Total AI Tools" 
                  value={stats.totalTools} 
                  prefix={<ToolOutlined />} 
                  valueStyle={{ color: '#8E24AA' }}
                />
              </Card>
            </Col>
          </Row>
          
          {/* Recent Content */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card 
                title="Recent Blog Posts" 
                className="shadow-md h-full"
                extra={<a href="/admin/blog">View All</a>}
              >
                <List
                  dataSource={stats.recentBlogs}
                  renderItem={(item: BlogPost) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<a href={`/blog/${item.id}`} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                        description={
                          <div className="flex items-center justify-between">
                            <span>{item.date}</span>
                            <Tag color="purple">{item.category}</Tag>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                  locale={{ emptyText: "No blog posts found" }}
                />
              </Card>
            </Col>
            
            <Col xs={24} md={12}>
              <Card 
                title="Recent Learning Videos" 
                className="shadow-md h-full"
                extra={<a href="/admin/learning">View All</a>}
              >
                <List
                  dataSource={stats.recentVideos}
                  renderItem={(item: Video) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<a href={item.youtube_url} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                        description={
                          <div className="flex items-center">
                            <EyeOutlined className="mr-1" /> YouTube
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                  locale={{ emptyText: "No videos found" }}
                />
              </Card>
            </Col>
          </Row>
          
          <Row className="mt-4">
            <Col xs={24}>
              <Card 
                title="Popular AI Tools" 
                className="shadow-md"
                extra={<a href="/admin/tools">View All</a>}
              >
                <List
                  dataSource={stats.popularTools}
                  renderItem={(item: Tool) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<a href={`/tools/${item.id}`} target="_blank" rel="noopener noreferrer">{item.name}</a>}
                        description={
                          <div className="flex items-center justify-between">
                            <Tag color="purple">{item.category}</Tag>
                            <Tag color={item.isPaid ? "gold" : "green"}>
                              {item.isPaid ? "Paid" : "Free"}
                            </Tag>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                  locale={{ emptyText: "No tools found" }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </AdminLayout>
  );
};

export default DashboardPage;