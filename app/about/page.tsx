// About Us Page
'use client';
import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Typography, Row, Col, Image } from 'antd';

const { Title, Paragraph } = Typography;

export default function AboutPage() {
  return (
    <MainLayout>
      <section className="section bg-gray-50 min-h-screen">
        <div className="container max-w-4xl mx-auto py-12">
          <Title level={1} className="text-center mb-8">About Us</Title>
          <Paragraph className="text-lg mb-6">
            Welcome to ctrlvAI, your ultimate destination for exploring the infinite possibilities of artificial intelligence. Our mission is to empower individuals and businesses by providing access to cutting-edge AI tools, tutorials, and industry insights.
          </Paragraph>
          <Paragraph className="text-lg mb-6">
            At ctrlvAI, we believe that AI is not just a technology but a transformative force that can unlock human potential. Whether you are a beginner looking to learn the basics or an expert seeking advanced tools, we have something for everyone.
          </Paragraph>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Image
                src="/images/team/mission.jpg"
                alt="Our Mission"
                preview={false}
                className="rounded-lg"
              />
              <Title level={3} className="mt-4">Our Mission</Title>
              <Paragraph>
                To democratize AI by making it accessible, understandable, and actionable for everyone.
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <Image
                src="/images/team/vision.jpg"
                alt="Our Vision"
                preview={false}
                className="rounded-lg"
              />
              <Title level={3} className="mt-4">Our Vision</Title>
              <Paragraph>
                To be the leading platform for AI education and tool navigation, fostering innovation and growth.
              </Paragraph>
            </Col>
          </Row>
          <div className="mt-12">
            <Title level={2} className="text-center mb-4">Meet Our Team</Title>
            <Paragraph className="text-center mb-8">
              Our team is composed of AI enthusiasts, developers, and educators dedicated to helping you succeed in the AI-driven world.
            </Paragraph>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} md={8}>
                <Image
                  src="/images/team/member1.jpg"
                  alt="Team Member 1"
                  preview={false}
                  className="rounded-full"
                />
                <Title level={4} className="text-center mt-4">John Doe</Title>
                <Paragraph className="text-center">Founder & CEO</Paragraph>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Image
                  src="/images/team/member2.jpg"
                  alt="Team Member 2"
                  preview={false}
                  className="rounded-full"
                />
                <Title level={4} className="text-center mt-4">Jane Smith</Title>
                <Paragraph className="text-center">CTO</Paragraph>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Image
                  src="/images/team/member3.jpg"
                  alt="Team Member 3"
                  preview={false}
                  className="rounded-full"
                />
                <Title level={4} className="text-center mt-4">Alice Johnson</Title>
                <Paragraph className="text-center">Head of AI Research</Paragraph>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
