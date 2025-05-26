'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Statistic, List, Tag } from 'antd';
import { 
  FileTextOutlined, 
  VideoCameraOutlined, 
  ToolOutlined,
  EyeOutlined,
  UserOutlined
} from '@ant-design/icons';
import AdminLayout from '@/components/admin/AdminLayout';

const { Title, Paragraph } = Typography;

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalVideos: 0,
    totalTools: 0,
    recentBlogs: [],
    recentVideos: [],
    popularTools: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // In a real app, these would be API calls
      // For now, we'll use mock data
      
      // Fetch blog posts
      const blogResponse = await fetch('/api/blog');
      const blogData = await blogResponse.json();
      
      // Fetch videos
      const videoResponse = await fetch('/api/learning');
      const videoData = await videoResponse.json();
      
      // Fetch tools
      const toolResponse = await fetch('/api/tools');
      const toolData = await toolResponse.json();
      
      setStats({
        totalBlogs: blogData.success ? blogData.posts.length : 0,
        totalVideos: videoData.success ? videoData.videos.length : 0,
        totalTools: toolData.success ? toolData.tools.length : 0,
        recentBlogs: blogData.success ? 
          blogData.posts.slice(0, 5).map(post => ({
            id: post.id,
            title: post.title,
            date: post.date,
            category: post.category
          })) : [],
        recentVideos: videoData.success ? 
          videoData.videos.slice(0, 5).map(video => ({
            id: video.id,
            title: video.title,
            youtube_url: video.youtube_url
          })) : [],
        popularTools: toolData.success ? 
          toolData.tools.slice(0, 5).map(tool => ({
            id: tool.id,
            name: tool.name,
            category: tool.category,
            isPaid: tool.isPaid
          })) : []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <AdminLayout selectedKey="dashboard">
      <Title level={2} className="mb-6">Dashboard</Title>
      
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
              renderItem={(item: any) => (
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
              renderItem={(item: any) => (
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
              renderItem={(item: any) => (
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
    </AdminLayout>
  );
};

export default DashboardPage;
