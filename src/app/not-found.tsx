'use client';

import React from 'react';
import { Button, Typography } from 'antd';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Paragraph } = Typography;

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6A1B9A"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        
        <Title level={1} className="text-4xl md:text-5xl mb-4">
          404 - Page Not Found
        </Title>
        
        <Paragraph className="text-lg text-gray-600 mb-8 max-w-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track to discover amazing AI tools.
        </Paragraph>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button type="primary" size="large" className="bg-[#1976D2]">
              Back to Home
            </Button>
          </Link>
          
          <Link href="/tools">
            <Button size="large">
              Explore AI Tools
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
