import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { getAllBlogPosts } from '@/utils/markdown';
import { getRandomVideos } from '@/utils/videos';
import { getRandomTools } from '@/utils/tools';
import BlogCard from '@/components/blog/BlogCard';
import VideoCard from '@/components/learning/VideoCard';
import ToolCard from '@/components/tools/ToolCard';
import Link from 'next/link';
import { Button } from 'antd';
import TitleSection from '@/components/TitleSection.client';

export const metadata: Metadata = {
  title: 'CtrlV AI - Your AI Tools Navigation Hub',
  description: 'Discover the best AI tools, learn how to use them effectively, and stay updated with the latest AI trends and resources.',
  keywords: 'AI tools, artificial intelligence, AI navigation, AI learning, AI blog',
};

export default async function Home() {
  // Get latest blog posts
  const allPosts = await getAllBlogPosts();
  const latestPosts = allPosts.slice(0, 3);
  
  // Get featured videos (random selection)
  const featuredVideos = await getRandomVideos(2);
  
  // Get popular tools (random selection)
  const popularTools = getRandomTools(6);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] text-white py-16 px-4 rounded-lg mb-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Navigate the World of AI Tools</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover the best AI tools, learn how to use them effectively, and stay updated with the latest AI trends and resources.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tools">
              <Button type="primary" size="large" className="bg-[#1976D2] h-12 px-8">
                Explore AI Tools
              </Button>
            </Link>
            <Link href="/learning-center">
              <Button size="large" className="h-12 px-8">
                Start Learning
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Latest Blog Posts Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Articles</h2>
          <Link href="/blog">
            <Button type="link">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post, idx) => (
            <BlogCard
              key={post.slug || idx}
              id={idx}
              title={post.title}
              excerpt={post.excerpt || ''}
              date={post.date}
              category={post.category || ''}
              tags={post.tags || []}
              slug={post.slug || ''}
              image={post.coverImage || ''}
              author={post.author}
            />
          ))}
        </div>
      </section>
      
      {/* Featured Videos Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Tutorials</h2>
          <Link href="/learning-center">
            <Button type="link">View All</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredVideos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              desc={video.desc}
              youtube_url={video.youtube_url}
              tags={video.tags}
              category={video.category}
            />
          ))}
        </div>
      </section>
      
      {/* Popular AI Tools Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular AI Tools</h2>
          <Link href="/tools">
            <Button type="link">View All</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool) => (
            <ToolCard
              key={tool.id}
              id={tool.id}
              name={tool.name}
              description={tool.description}
              logo={tool.logo}
              url={tool.url}
              isPaid={tool.isPaid}
              tags={tool.tags}
              category={tool.category}
            />
          ))}
        </div>
      </section>
      
      {/* Call to Action Section */}
      <TitleSection />
    </MainLayout>
  );
}