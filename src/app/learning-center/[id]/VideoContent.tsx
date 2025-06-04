'use client';

import React from 'react';
import { Typography, Tag } from 'antd';
import { LearningVideo } from '@/types';

const { Title, Paragraph } = Typography;

interface VideoContentProps {
  video: LearningVideo;
}

const comments = [
  { user: 'Alice', text: 'Great video! Very helpful.' },
  { user: 'Bob', text: 'Thanks for sharing this.' },
];

const getYoutubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:\/|%3D|v=)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};

const VideoContent: React.FC<VideoContentProps> = ({ video }) => {
  // Calculate padding-top percentage for 16:9 aspect ratio
  const aspectRatioPadding = (9 / 16) * 100; // 56.25

  return (
    <div className="w-full max-w-3xl">
      {/* Container using padding hack for aspect ratio with min-height */}
      <div className="relative w-full overflow-hidden rounded-lg mb-6" style={{ paddingTop: `${aspectRatioPadding}%`, minHeight: '400px' }}>
        <iframe
          src={getYoutubeEmbedUrl(video.youtube_url)}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
      <Title level={3} className="mb-2">{video.title}</Title>
      <Paragraph className="text-gray-600 mb-2">{video.desc}</Paragraph>
      {video.category && (
        <Tag color="purple" className="mb-2">{video.category}</Tag>
      )}
      {video.tags && video.tags.map((tag, index) => (
        <Tag key={index} className="mb-2 mr-1">{tag}</Tag>
      ))}
      <div className="mt-8">
        <Title level={4} className="mb-2">Comments</Title>
        <div className="space-y-4">
          {comments.map((c, i) => (
            <div key={i} className="bg-gray-100 rounded p-3">
              <span className="font-semibold mr-2">{c.user}:</span>
              <span>{c.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoContent; 