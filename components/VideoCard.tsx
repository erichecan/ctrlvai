import React from 'react'
import Image from 'next/image'

interface VideoCardProps {
  title?: string;
  thumbnail?: string;
  duration?: string;
  youtubeUrl?: string;
  description?: string;
}

export type { VideoCardProps };

// Ensure the component is compatible with React's IntrinsicAttributes
const VideoCard: React.FC<VideoCardProps> = ({ 
  title = 'Untitled',
  thumbnail = '/images/default-thumbnail.jpg',
  duration = 'N/A',
  youtubeUrl = '#',
  description = 'No description available.'
}) => {
  return (
    <div className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
          <button className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{duration}</span>
          <a 
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center"
          >
            Watch on YouTube
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
