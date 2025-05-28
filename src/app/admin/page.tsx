'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import { useRouter } from 'next/navigation';

const { Title, Paragraph } = Typography;

const AdminLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      // 本地验证逻辑
      if (values.username === 'admin' && values.password === 'admin123') {
        // 保存用户会话
        localStorage.setItem('user', JSON.stringify({
          username: 'admin',
          role: 'admin',
          isAuthenticated: true
        }));
        message.success('Login successful!');
        router.push('/admin/dashboard');
      } else {
        message.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-md shadow-lg">
          <div className="text-center mb-6">
            <Title level={2}>Admin Login</Title>
            <Paragraph className="text-gray-500">
              Please enter your credentials to access the admin panel
            </Paragraph>
          </div>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="Username" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full bg-[#1976D2]" 
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          
          <div className="text-center text-gray-500 text-sm">
            <p>Default credentials: admin / admin123</p>
            <p className="text-xs mt-2">For demo purposes only. Change in production.</p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminLoginPage;