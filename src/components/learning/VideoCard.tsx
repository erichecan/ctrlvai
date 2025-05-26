'use client';

import React from 'react';
import { Card, Tag, Button, Typography } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

interface VideoCardProps {
  id: string;
  title: string;
  desc: string;
  youtube_url: string;
  tags?: string[];
  category?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ id, title, desc, youtube_url, tags, category }) => {
  // 从YouTube URL中提取视频ID
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(youtube_url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/images/placeholder.jpg';

  return (
    <Card 
      hoverable
      className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
      cover={
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <YoutubeOutlined className="text-white text-5xl" />
          </div>
          <Image 
            src={thumbnailUrl} 
            alt={title}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      }
    >
      <div className="flex flex-col flex-grow">
        <Title level={4} className="mb-2 line-clamp-2" style={{ minHeight: '3rem' }}>
          {title}
        </Title>
        
        <Paragraph className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {desc}
        </Paragraph>
        
        <div className="mt-auto">
          {category && (
            <Tag color="purple" className="mb-2">
              {category}
            </Tag>
          )}
          
          {tags && tags.map((tag, index) => (
            <Tag key={index} className="mb-2 mr-1">
              {tag}
            </Tag>
          ))}
          
          <div className="mt-3 flex justify-between items-center">
            <Link href={`/learning-center/${id}`}>
              <Button type="primary" className="bg-[#1976D2]">
                Learn More
              </Button>
            </Link>
            
            <a href={youtube_url} target="_blank" rel="noopener noreferrer">
              <Button icon={<YoutubeOutlined />}>
                Watch
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;
