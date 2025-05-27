import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { Card, Row, Col } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';

export const metadata: Metadata = {
  title: 'About Us - CtrlV AI',
  description: 'Learn more about CtrlV AI, your one-stop destination for AI tools navigation and learning resources.',
  keywords: 'about CtrlV AI, AI tools navigation, AI learning platform',
};

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] text-white py-12 px-4 rounded-lg mb-8">
        <div className="container mx-auto">
          <Title level={1} className="text-white text-center mb-4">
            About CtrlV AI
          </Title>
          <Paragraph className="text-white text-center text-lg max-w-3xl mx-auto">
            Your one-stop destination for discovering, learning, and mastering AI tools to boost your productivity.
          </Paragraph>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="mb-16">
        <div className="container mx-auto">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title level={2}>Our Mission</Title>
              <Paragraph className="text-lg">
                At CtrlV AI, we believe that artificial intelligence should be accessible to everyone. Our mission is to help people navigate the rapidly evolving landscape of AI tools, providing clear guidance, practical tutorials, and in-depth resources.
              </Paragraph>
              <Paragraph className="text-lg">
                We strive to demystify AI technology and empower users to leverage these powerful tools to enhance their productivity, creativity, and problem-solving capabilities.
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <Card className="shadow-lg">
                <img 
                  src="/images/about/mission.jpg" 
                  alt="CtrlV AI Mission" 
                  className="w-full rounded-lg"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </section>
      
      {/* What We Offer Section */}
      <section className="mb-16 bg-[#F5F5F5] py-12 rounded-lg">
        <div className="container mx-auto">
          <Title level={2} className="text-center mb-8">What We Offer</Title>
          
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6A1B9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <Title level={4} className="text-center">Comprehensive Blog</Title>
                <Paragraph className="text-center">
                  In-depth articles about AI tools, trends, and practical applications to keep you informed and inspired.
                </Paragraph>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6A1B9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <Title level={4} className="text-center">Video Tutorials</Title>
                <Paragraph className="text-center">
                  Step-by-step video guides to help you master AI tools quickly and effectively.
                </Paragraph>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6A1B9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <Title level={4} className="text-center">AI Tools Directory</Title>
                <Paragraph className="text-center">
                  Curated collection of the best AI tools organized by category and use case to help you find exactly what you need.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="mb-16">
        <div className="container mx-auto">
          <Title level={2} className="text-center mb-8">Our Values</Title>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} md={6}>
              <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                <Title level={4}>Accessibility</Title>
                <Paragraph>
                  Making AI tools and knowledge accessible to everyone, regardless of technical background.
                </Paragraph>
              </Card>
            </Col>
            
            <Col xs={24} md={6}>
              <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                <Title level={4}>Quality</Title>
                <Paragraph>
                  Providing thoroughly researched, accurate, and practical information you can trust.
                </Paragraph>
              </Card>
            </Col>
            
            <Col xs={24} md={6}>
              <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                <Title level={4}>Innovation</Title>
                <Paragraph>
                  Staying at the forefront of AI developments to bring you the latest tools and techniques.
                </Paragraph>
              </Card>
            </Col>
            
            <Col xs={24} md={6}>
              <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                <Title level={4}>Community</Title>
                <Paragraph>
                  Building a supportive community of AI enthusiasts, learners, and professionals.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
      
      {/* Join Us Section */}
      <section className="mb-16 bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] text-white py-12 px-4 rounded-lg">
        <div className="container mx-auto text-center">
          <Title level={2} className="text-white mb-4">Join Our Community</Title>
          <Paragraph className="text-white text-lg mb-8 max-w-3xl mx-auto">
            Be part of our growing community of AI enthusiasts. Discover new tools, learn valuable skills, and stay updated with the latest AI trends.
          </Paragraph>
          <div className="flex justify-center">
            <a href="/contact" className="bg-white text-[#6A1B9A] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}