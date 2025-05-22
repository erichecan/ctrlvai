import React from 'react';
import { Layout, Menu, Button, Input, Dropdown } from 'antd';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

const { Header } = Layout;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'blog', label: 'Blog', href: '/blog' },
    { key: 'academy', label: 'AI Academy', href: '/academy' },
    { key: 'tools', label: 'AI Tools', href: '/tools' },
    { key: 'about', label: 'About Us', href: '/about' },
    { key: 'contact', label: 'Contact', href: '/contact' },
  ];

  const mobileMenu = (
    <Menu>
      {menuItems.map((item) => (
        <Menu.Item key={item.key}>
          <Link href={item.href} legacyBehavior>
            <a>{item.label}</a>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Header className="bg-white shadow-sm py-4 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" legacyBehavior>
          <a className="flex items-center">
            <div className="logo-container mr-4">
              <Image
                src="/images/logo.png"
                alt="Website Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          </a>
        </Link>
        <div className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link 
              key={item.key} 
              href={item.href}
              legacyBehavior
            >
              <a className="nav-link">{item.label}</a>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <div className="hidden md:block mr-4">
          <Input
            placeholder="Search AI tools and tutorials..."
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
