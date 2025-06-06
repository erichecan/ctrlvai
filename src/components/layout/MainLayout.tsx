'use client';

import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from '@/components/layout/Header';
import FooterComponent from '@/components/layout/Footer';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="min-h-screen bg-transparent">
      <HeaderComponent />
      <Content className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default MainLayout;
