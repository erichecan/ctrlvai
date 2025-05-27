import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { getVideoById } from '@/utils/videos';
import { Typography, Tag, Button } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const video = getVideoById(params.id);
  return {
    title: `${video?.title || 'Video'} - CtrlV AI`,
    description: video?.desc || 'Learn more about this video.',
  };
};

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  const video = getVideoById(params.id);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <MainLayout>
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
    </MainLayout>
  );
}
