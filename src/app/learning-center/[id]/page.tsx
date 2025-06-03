import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { getVideoById, getAllVideos } from '@/utils/videos';
import VideoContent from './VideoContent';
import RecommendedVideos from './RecommendedVideos';

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const video = await getVideoById(params.id);
  return {
    title: `${video?.title || 'Video'} - CtrlV AI`,
    description: video?.desc || 'Learn more about this video.',
    keywords: 'AI tools, artificial intelligence, AI navigation, AI learning, AI blog',
  };
};

export default async function VideoDetailPage({ params }: { params: { id: string } }) {
  const video = await getVideoById(params.id);
  const allVideos = getAllVideos();

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-8 py-8">
        <VideoContent video={video} />
        <div className="w-full md:w-80 flex-shrink-0">
          <RecommendedVideos videos={allVideos} currentId={video.id} />
        </div>
      </div>
    </MainLayout>
  );
}
