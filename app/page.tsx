import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Typography, Card, Row, Col, Divider, Tag } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

export default function Home() {
  // 最新博客文章数据
  const latestBlogs = [
    {
      id: 1,
      title: 'BROKE 模型：理解 AI 思维的终极指南',
      excerpt: '探索 BROKE 模型如何帮助你理解 AI 思维模式，提升与 AI 交互的效率和质量。',
      category: 'AI 使用技巧',
      categorySlug: 'ai-tips',
      image: '/images/blog/broke-model.jpg',
      date: '2025-05-15',
    },
    {
      id: 2,
      title: '2025 年最值得关注的 10 款 AI 工具',
      excerpt: '我们精选了 2025 年最值得关注的 10 款 AI 工具，涵盖文本、图像、视频和音频处理领域。',
      category: 'AI 工具推荐',
      categorySlug: 'ai-tools',
      image: '/images/blog/top-ai-tools.jpg',
      date: '2025-05-10',
    },
    {
      id: 3,
      title: '如何创建你的 AI 数字分身',
      excerpt: '详细教程：如何使用最新技术创建你的 AI 数字分身，实现自动化内容创作和个人品牌建设。',
      category: 'AI 案例研究',
      categorySlug: 'ai-cases',
      image: '/images/blog/digital-twin.jpg',
      date: '2025-05-05',
    },
  ];

  // 热门场景数据
  const popularScenarios = [
    {
      id: 1,
      title: '内容创作',
      description: '使用 AI 工具快速生成高质量的文章、图片和视频',
      icon: '📝',
      link: '/tools/scenarios/content-creation',
    },
    {
      id: 2,
      title: '提升工作效率',
      description: '通过 AI 自动化工作流程，节省时间和精力',
      icon: '⚡',
      link: '/tools/scenarios/productivity',
    },
    {
      id: 3,
      title: '学习 AI 技能',
      description: '从入门到精通，掌握 AI 工具和技术',
      icon: '🧠',
      link: '/tools/scenarios/learning',
    },
    {
      id: 4,
      title: '创建数字人',
      description: '打造你的 AI 数字分身，实现内容自动化',
      icon: '👤',
      link: '/tools/scenarios/digital-person',
    },
  ];

  // 精选视频数据
  const featuredVideos = [
    {
      id: 1,
      title: 'The BROKE Principal: The AI Secret You\'ve Never Heard Of',
      description: '了解 AI 思维的秘密，掌握 BROKE 原则提升 AI 交互效率',
      thumbnail: '/images/videos/broke-principal.jpg',
      link: '/academy/broke-model/the-broke-principal',
    },
    {
      id: 2,
      title: 'Digital Person: Meet Your AI Doppelgänger',
      description: '探索数字人技术，了解如何创建你的 AI 分身',
      thumbnail: '/images/videos/digital-person.jpg',
      link: '/academy/digital-person/meet-your-ai-doppelganger',
    },
  ];

  // 热门工具数据
  const popularTools = [
    {
      id: 1,
      name: 'ChatGPT',
      description: '强大的 AI 对话模型，可用于写作、编程和创意生成',
      icon: '/images/tools/chatgpt.svg',
      category: '文本与写作',
      link: '/tools/text-writing/chatgpt',
    },
    {
      id: 2,
      name: 'Midjourney',
      description: '高质量 AI 图像生成工具，适合创意和商业用途',
      icon: '/images/tools/midjourney.svg',
      category: '图像',
      link: '/tools/image/midjourney',
    },
    {
      id: 3,
      name: 'DALL-E',
      description: 'OpenAI 开发的 AI 图像生成模型，可从文本描述创建图像',
      icon: '/images/tools/dalle.svg',
      category: '图像',
      link: '/tools/image/dalle',
    },
    {
      id: 4,
      name: 'Heygen',
      description: '专业的 AI 视频生成平台，可创建数字人视频',
      icon: '/images/tools/heygen.svg',
      category: '视频',
      link: '/tools/video/heygen',
    },
    {
      id: 5,
      name: 'Notion AI',
      description: '集成在 Notion 中的 AI 助手，提升写作和内容组织效率',
      icon: '/images/tools/notion.svg',
      category: '文本与写作',
      link: '/tools/text-writing/notion',
    },
    {
      id: 6,
      name: 'CapCut',
      description: 'AI 驱动的视频编辑工具，简化视频创作流程',
      icon: '/images/tools/capcut.svg',
      category: '视频',
      link: '/tools/video/capcut',
    },
  ];

  return (
    <MainLayout>
      {/* Hero 区域 */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Title level={1} className="text-white text-4xl md:text-5xl font-bold mb-6">
                探索 AI 的无限可能
              </Title>
              <Paragraph className="text-white text-lg mb-8">
                ctrlvAI 是您的一站式 AI 学习与工具导航平台，提供 AI 工具推荐、使用教程和行业趋势分析，助您快速掌握 AI 技能。
              </Paragraph>
              <div className="flex flex-wrap gap-4">
                <Link href="/blog">
                  <Button type="primary" size="large" className="bg-white text-purple-700 hover:bg-gray-100 border-none">
                    浏览博客
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button size="large" className="border-white text-white hover:bg-white hover:text-purple-700">
                    探索 AI 工具
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              {/* 这里可以放置一个 AI 相关的插图或动画 */}
              <div className="relative h-80 w-full">
                <Image
                  src="/images/hero-illustration.svg"
                  alt="AI Illustration"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 最新博客 */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <Title level={2} className="m-0">最新博客</Title>
            <Link href="/blog" className="text-purple-700 hover:text-purple-800 font-medium">
              查看更多 →
            </Link>
          </div>
          
          <Row gutter={[24, 24]}>
            {latestBlogs.map((blog) => (
              <Col xs={24} md={8} key={blog.id}>
                <Link href={`/blog/${blog.id}`}>
                  <Card 
                    hoverable 
                    className="h-full"
                    cover={
                      <div className="relative h-48 w-full">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    }
                  >
                    <Tag color="purple">{blog.category}</Tag>
                    <Title level={4} className="mt-2 mb-3">{blog.title}</Title>
                    <Paragraph ellipsis={{ rows: 3 }} className="text-gray-600">
                      {blog.excerpt}
                    </Paragraph>
                    <div className="text-gray-500 text-sm">{blog.date}</div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 热门场景 */}
      <section className="section">
        <div className="container">
          <Title level={2} className="text-center mb-12">根据您的需求探索 AI 工具</Title>
          
          <Row gutter={[24, 24]}>
            {popularScenarios.map((scenario) => (
              <Col xs={24} sm={12} lg={6} key={scenario.id}>
                <Link href={scenario.link}>
                  <Card hoverable className="text-center h-full">
                    <div className="text-4xl mb-4">{scenario.icon}</div>
                    <Title level={4}>{scenario.title}</Title>
                    <Paragraph className="text-gray-600">
                      {scenario.description}
                    </Paragraph>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 精选视频 */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <Title level={2} className="m-0">精选视频教程</Title>
            <Link href="/academy" className="text-purple-700 hover:text-purple-800 font-medium">
              查看更多 →
            </Link>
          </div>
          
          <Row gutter={[24, 24]}>
            {featuredVideos.map((video) => (
              <Col xs={24} md={12} key={video.id}>
                <Link href={video.link}>
                  <Card 
                    hoverable 
                    className="h-full"
                    cover={
                      <div className="relative h-64 w-full">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white bg-opacity-80 rounded-full p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-700">
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <Title level={4}>{video.title}</Title>
                    <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">
                      {video.description}
                    </Paragraph>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 热门工具 */}
      <section className="section">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <Title level={2} className="m-0">热门 AI 工具</Title>
            <Link href="/tools" className="text-purple-700 hover:text-purple-800 font-medium">
              查看更多 →
            </Link>
          </div>
          
          <Row gutter={[24, 24]}>
            {popularTools.map((tool) => (
              <Col xs={24} sm={12} lg={8} key={tool.id}>
                <Link href={tool.link}>
                  <Card hoverable className="h-full">
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className="relative h-12 w-12">
                          <Image
                            src={tool.icon}
                            alt={tool.name}
                            fill
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      </div>
                      <div>
                        <Title level={4} className="mb-1">{tool.name}</Title>
                        <Tag color="blue" className="mb-2">{tool.category}</Tag>
                        <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">
                          {tool.description}
                        </Paragraph>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 订阅区域 */}
      <section className="section bg-purple-100">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <Title level={2} className="mb-4">订阅我们的更新</Title>
            <Paragraph className="text-gray-600 mb-6">
              获取最新的 AI 工具推荐、使用技巧和行业趋势分析，直接发送到您的邮箱。
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="您的邮箱地址" 
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button type="primary" size="large" className="bg-purple-700">
                订阅
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}