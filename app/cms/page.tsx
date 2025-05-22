// Simple CMS Page (with password login, blog/video/tool management)
'use client';
import React from 'react';
import { Tabs, Input, Button, message, Form, Card, Row, Col, Typography, Tag } from 'antd';
import dynamic from 'next/dynamic';

const { Title, Paragraph } = Typography;

const PASSWORD = 'admin123'; // 可改为 .env 变量

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthed(localStorage.getItem('cms_authed') === '1');
    }
  }, []);
  const login = (pwd: string) => {
    if (pwd === PASSWORD) {
      localStorage.setItem('cms_authed', '1');
      setAuthed(true);
    } else {
      message.error('Wrong password');
    }
  };
  const logout = () => {
    localStorage.removeItem('cms_authed');
    setAuthed(false);
  };
  return { authed, login, logout };
}

const BlogManager = dynamic(() => import('../../components/cms/BlogManager'), { ssr: false });
const VideoManager = dynamic(() => import('../../components/cms/VideoManager'), { ssr: false });
const ToolManager = dynamic(() => import('../../components/cms/ToolManager'), { ssr: false });

export default function CMSPage() {
  const { authed, login, logout } = useAuth();
  const [pwd, setPwd] = React.useState('');
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-sm">
          <Title level={3}>CMS Login</Title>
          <Input.Password
            placeholder="Enter password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            onPressEnter={() => login(pwd)}
          />
          <Button type="primary" className="mt-4 w-full" onClick={() => login(pwd)}>
            Login
          </Button>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <Title level={3}>CMS Management</Title>
        <Button onClick={logout}>Logout</Button>
      </div>
      <Tabs
        defaultActiveKey="blog"
        items={[
          { key: 'blog', label: 'Blog Management', children: <BlogManager /> },
          { key: 'video', label: 'Video Management', children: <VideoManager /> },
          { key: 'tool', label: 'AI Tool Management', children: <ToolManager /> },
        ]}
      />
    </div>
  );
}
