import React from 'react';
import { Layout } from 'antd';
import Navbar from '../Navbar';
import AppFooter from '../Footer';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Navbar />
      <Content className="flex-grow">
        {children}
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default MainLayout;