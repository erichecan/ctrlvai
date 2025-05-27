'use client';

import React from 'react';
import { Card, Tag, Typography, Button } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  slug: string;
  image?: string;
  author?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  date,
  category,
  tags,
  slug,
  image = '/images/blog/default.png',
  author
}) => {
  // 格式化日期
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card 
      hoverable
      className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
      cover={
        <div className="relative h-48 overflow-hidden">
          <Image 
            src={image && image.trim() !== '' ? image : '/images/blog/default.png'}
            alt={title || 'Blog image'}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      }
    >
      <div className="flex flex-col flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <Tag color="purple">{category}</Tag>
          <span className="text-gray-500 text-sm">{formatDate(date)}</span>
        </div>
        
        <Title level={4} className="mb-2 line-clamp-2" style={{ minHeight: '3rem' }}>
          {title}
        </Title>
        
        {author && (
          <p className="text-gray-600 text-sm mb-2">By {author}</p>
        )}
        
        <Paragraph className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {excerpt}
        </Paragraph>
        
        <div className="mt-auto">
          <div className="mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Tag key={index} className="mr-1">
                {tag}
              </Tag>
            ))}
            {tags.length > 3 && <Tag>+{tags.length - 3}</Tag>}
          </div>
          
          <Link href={`/blog/${slug}`}>
            <Button type="primary" className="bg-[#1976D2]">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
