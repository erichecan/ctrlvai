'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Button, Tabs, message } from 'antd';
import { 
  DashboardOutlined, 
  FileTextOutlined, 
  VideoCameraOutlined, 
  ToolOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

interface AdminLayoutProps {
  children: React.ReactNode;
  selectedKey: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, selectedKey }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // 检查用户是否已登录
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      message.error('Please login to access admin panel');
      router.push('/admin');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      router.push('/admin');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    message.success('Logged out successfully');
    router.push('/admin');
  };

  if (!user) {
    return null; // 或者显示加载中状态
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        theme="light"
        className="shadow-md"
      >
        <div className="p-4 flex items-center justify-center">
          <Title level={collapsed ? 5 : 4} className="m-0 text-[#6A1B9A]">
            {collapsed ? 'CMS' : 'ctrlvAI CMS'}
          </Title>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: <Link href="/admin/dashboard">Dashboard</Link>,
            },
            {
              key: 'blog',
              icon: <FileTextOutlined />,
              label: <Link href="/admin/blog">Blog Posts</Link>,
            },
            {
              key: 'learning',
              icon: <VideoCameraOutlined />,
              label: <Link href="/admin/learning">Learning Videos</Link>,
            },
            {
              key: 'tools',
              icon: <ToolOutlined />,
              label: <Link href="/admin/tools">AI Tools</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="bg-white p-0 px-4 flex justify-between items-center shadow-sm">
          <div>
            <Button 
              type="text"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? '☰' : '☰'}
            </Button>
          </div>
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user.username}</span>
            <Button 
              type="primary" 
              danger 
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content className="m-4 p-6 bg-white rounded-lg shadow-sm">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
