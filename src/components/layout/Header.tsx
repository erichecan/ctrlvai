'use client';

import React from 'react';
import { Layout, Menu, Button, Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const menuItems = [
    { key: '/', label: 'Home' },
    { key: '/blog', label: 'Blog' },
    { key: '/learning-center', label: 'Learning Center' },
    { key: '/tools', label: 'AI Tools' },
    { key: '/about', label: 'About' },
    { key: '/contact', label: 'Contact' },
  ];

  return (
    <Header className="bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] p-0 h-16 flex items-center justify-between">
      <div className="container mx-auto px-4 flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/" className="text-white text-xl font-bold">
            CtrlV AI
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[pathname]}
            style={{ background: 'transparent', borderBottom: 'none' }}
            className="flex items-center"
            items={menuItems.map((item) => ({
              key: item.key,
              label: <Link href={item.key}>{item.label}</Link>,
            }))}
          />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Dropdown
            menu={{
              items: menuItems.map((item) => ({
                key: item.key,
                label: (
                  <Link href={item.key}>
                    {item.label}
                  </Link>
                ),
              })),
            }}
            placement="bottomRight"
            trigger={['click']}
            open={menuVisible}
            onOpenChange={setMenuVisible}
          >
            <Button
              type="text"
              icon={<MenuOutlined style={{ color: 'white', fontSize: '20px' }} />}
              onClick={() => setMenuVisible(!menuVisible)}
            />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;