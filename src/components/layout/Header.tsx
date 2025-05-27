'use client';

import React from 'react';
import { Layout } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { key: '/', label: 'Home' },
    { key: '/blog', label: 'Blog' },
    { key: '/learning-center', label: 'Learning Center' },
    { key: '/tools', label: 'AI Tools' },
    { key: '/about', label: 'About' },
    { key: '/contact', label: 'Contact' },
  ];

  return (
    <Header 
      className="bg-transparent shadow-none p-0 h-24 flex items-center justify-between"
      style={{ background: 'transparent !important', borderBottom: 'none' }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between w-full">
        <div className="flex items-center flex-shrink-0" style={{ minWidth: 178, minHeight: 72, maxWidth: 178, maxHeight: 72 }}>
          <Link href="/">
            <img
              src="/images/logo.png"
              alt="CtrlV AI Logo"
              width={178}
              height={72}
              style={{ width: 178, height: 72, minWidth: 178, minHeight: 72, maxWidth: 178, maxHeight: 72, display: 'block' }}
            />
          </Link>
        </div>
        <nav className="flex gap-8 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.key}
              className={`text-base font-medium px-2 py-1 rounded transition-colors duration-150 ${pathname === item.key ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </Header>
  );
};

export default HeaderComponent;