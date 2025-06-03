'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Typography, Tag } from 'antd';
import { LearningVideo } from '@/types';

const { Title, Paragraph } = Typography;

interface RecommendedVideosProps {
  videos: LearningVideo[];
  currentId: string;
}

const RecommendedVideos: React.FC<RecommendedVideosProps> = ({ videos, currentId }) => {
  return (
    <div className="w-full max-w-xs space-y-[10px]">
      <Title level={4} className="mb-4">Recommended</Title>
      {videos.filter(v => v.id !== currentId).slice(0, 8).map(video => (
        <Link href={`/learning-center/${video.id}`} key={video.id} className="block p-2 rounded hover:bg-gray-100 transition-colors">
          <div className="flex gap-3 items-center">
            <img
              src={(video as any).thumbnailUrl || '/images/video-placeholder.png'}
              alt={video.title}
              className="w-20 h-12 object-cover rounded"
            />
            <div className="flex-1">
              <div className="font-medium text-sm line-clamp-2">{video.title}</div>
              <div className="text-xs text-gray-500 mt-1">
                {video.category && <Tag color="purple">{video.category}</Tag>}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendedVideos; 