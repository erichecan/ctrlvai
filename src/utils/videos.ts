import videosData from '../../public/data/videos.json';
import path from 'path';
import { LearningVideo } from '../types';

// 替换 getAllVideos 函数
export function getAllVideos(): LearningVideo[] {
  return videosData;
}

// 根据ID获取视频
export function getVideoById(id: string): LearningVideo | null {
  const videos = getAllVideos();
  return videos.find(video => video.id === id) || null;
}

// 获取相关视频
export function getRelatedVideos(currentVideo: LearningVideo, count: number = 3): LearningVideo[] {
  const allVideos = getAllVideos();
  
  // 过滤掉当前视频
  const otherVideos = allVideos.filter(video => video.id !== currentVideo.id);
  
  // 如果有标签，按标签匹配度排序
  if (currentVideo.tags && currentVideo.tags.length > 0) {
    const relatedVideos = otherVideos.map(video => {
      // 计算共同标签数量
      const commonTags = (video.tags || []).filter(tag => 
        currentVideo.tags?.includes(tag)
      );
      return {
        ...video,
        relevance: commonTags.length + (video.category === currentVideo.category ? 1 : 0)
      };
    }).sort((a, b) => (b as any).relevance - (a as any).relevance);
    
    return relatedVideos.slice(0, count);
  }
  
  // 如果没有标签，随机选择
  return otherVideos
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}

// 获取随机视频
export function getRandomVideos(count: number = 2): LearningVideo[] {
  const allVideos = getAllVideos();
  return allVideos
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}

// 获取所有视频标签
export function getAllVideoTags(): string[] {
  const videos = getAllVideos();
  const tags = new Set<string>();
  
  videos.forEach(video => {
    if (video.tags) {
      video.tags.forEach(tag => {
        tags.add(tag);
      });
    }
  });
  
  return Array.from(tags);
}

// 根据标签获取视频
export function getVideosByTag(tag: string): LearningVideo[] {
  const videos = getAllVideos();
  return videos.filter(video => video.tags?.includes(tag));
}
