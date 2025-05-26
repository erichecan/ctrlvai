'use client';

import React from 'react';
import { Card, Tag, Typography, Button } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  logo: string;
  url: string;
  isPaid: boolean;
  tags: string[];
  category: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  id,
  name,
  description,
  logo,
  url,
  isPaid,
  tags,
  category
}) => {
  return (
    <Card 
      hoverable
      className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex flex-col flex-grow">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 mr-3 relative flex-shrink-0">
            <Image 
              src={logo || '/images/tool-placeholder.png'} 
              alt={name}
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <Title level={4} className="mb-0">
              {name}
            </Title>
            <div className="flex items-center">
              <Tag color={isPaid ? "gold" : "green"} className="mr-2">
                {isPaid ? "Paid" : "Free"}
              </Tag>
              <Tag color="purple">{category}</Tag>
            </div>
          </div>
        </div>
        
        <Paragraph className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {description}
        </Paragraph>
        
        <div className="mt-auto">
          <div className="mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Tag key={index} className="mr-1 mb-1">
                {tag}
              </Tag>
            ))}
            {tags.length > 3 && <Tag className="mb-1">+{tags.length - 3}</Tag>}
          </div>
          
          <div className="flex justify-between">
            <Link href={`/tools/${id}`}>
              <Button type="primary" className="bg-[#1976D2]">
                Details
              </Button>
            </Link>
            
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button>
                Visit Tool
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ToolCard;
