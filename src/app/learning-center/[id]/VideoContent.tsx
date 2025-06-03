'use client';

import React from 'react';
import { Typography, Tag, Button } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';
import { LearningVideo } from '@/types';

const { Title, Paragraph } = Typography;

interface VideoContentProps {
  video: LearningVideo;
}

const VideoContent: React.FC<VideoContentProps> = ({ video }) => {
  return (
    <section className="container mx-auto py-12 px-4">
      <Title level={1} className="mb-4">
        {video.title}
      </Title>
      <Paragraph className="text-gray-600 mb-4">
        {video.desc}
      </Paragraph>

      {video.category && (
        <Tag color="purple" className="mb-2">
          {video.category}
        </Tag>
      )}

      {video.tags && video.tags.map((tag, index) => (
        <Tag key={index} className="mb-2 mr-1">
          {tag}
        </Tag>
      ))}

      <div className="mt-6">
        <a href={video.youtube_url} target="_blank" rel="noopener noreferrer">
          <Button type="primary" icon={<YoutubeOutlined />} className="bg-[#1976D2]">
            Watch on YouTube
          </Button>
        </a>
      </div>
    </section>
  );
};

export default VideoContent; 