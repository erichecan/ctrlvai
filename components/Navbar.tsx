import React from 'react';
import { Layout, Menu, Button, Input, Dropdown } from 'antd';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

const { Header } = Layout;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { key: 'home', label: '首页', href: '/' },
    { key: 'blog', label: '博客', href: '/blog' },
    { key: 'academy', label: 'AI学习中心', href: '/academy' },
    { key: 'tools', label: 'AI工具导航', href: '/tools' },
    { key: 'about', label: '关于我们', href: '/about' },
    { key: 'contact', label: '联系我们', href: '/contact' },
  ];

  const mobileMenu = (
    <Menu>
      {menuItems.map((item) => (
        <Menu.Item key={item.key}>
          <Link href={item.href}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Header className="bg-white shadow-sm py-4 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="flex items-center mr-8">
          <Image
            src="/logo.svg"
            alt="ctrlvAI Logo"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <div className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link 
              key={item.key} 
              href={item.href}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <div className="hidden md:block mr-4">
          <Input
            placeholder="搜索AI工具和教程..."
            prefix={<SearchOutlined />}
            className="w-64"
          />
        </div>
        <div className="md:hidden">
          <Dropdown 
            overlay={mobileMenu} 
            trigger={['click']}
            open={isMenuOpen}
            onOpenChange={setIsMenuOpen}
          >
            <Button 
              icon={<MenuOutlined />} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
