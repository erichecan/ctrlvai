import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { getVideoById } from '@/utils/videos';
import VideoContent from './VideoContent';

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

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <MainLayout>
      <VideoContent video={video} />
    </MainLayout>
  );
}
