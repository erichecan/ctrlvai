import fs from 'fs';
import path from 'path';
import { LearningVideo } from '../types';

// 从samples.json文件中读取视频数据
export function getAllVideos(): LearningVideo[] {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'samples.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    // 提取视频数据
    const videos: LearningVideo[] = [];
    
    // 遍历sections中的learningcenter类型
    Object.values(data.sections).forEach((section: any) => {
      if (section.type === 'learningcenter') {
        // 遍历blocks中的card类型
        section.block_order.forEach((blockId: string) => {
          const block = section.blocks[blockId];
          if (block.type === 'card') {
            videos.push({
              id: blockId,
              title: block.settings.title,
              desc: block.settings.desc,
              youtube_url: block.settings.youtube_url,
              tags: block.settings.tags || [],
              category: block.settings.category || 'General'
            });
          }
        });
      }
    });
    
    return videos;
  } catch (error) {
    console.error('Error loading videos:', error);
    return [];
  }
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
