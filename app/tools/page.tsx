// Tools Center Page
'use client';
import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Row, Col, Typography, Button, Tag } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

export default function ToolsPage() {
  const [tools, setTools] = React.useState<any[]>([]);
  React.useEffect(() => {
    fetch('/api/tools').then(res => res.json()).then(setTools);
  }, []);
  return (
    <MainLayout>
      <section className="section bg-gray-50 min-h-screen">
        <div className="container">
          <Title level={2} className="mb-8">AI Tools</Title>
          <Row gutter={[24, 24]}>
            {tools.map((tool) => (
              <Col xs={24} sm={12} lg={8} key={tool.id}>
                <Link href={tool.link}>
                  <Card
                    hoverable
                    className="h-full flex flex-col justify-between"
                    bodyStyle={{ display: 'flex', flexDirection: 'column', height: '180px', justifyContent: 'space-between', padding: 16 }}
                  >
                    <div className="flex items-start mb-2">
                      <div className="mr-4">
                        <div className="relative h-12 w-12">
                          <Image
                            src={tool.logo || tool.icon}
                            alt={tool.name || tool.title}
                            fill
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Title level={4} className="mb-1" style={{ minHeight: 32 }}>{tool.name || tool.title}</Title>
                        <Tag color="blue" className="mb-2">{tool.category}</Tag>
                        <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600" style={{ minHeight: 48 }}>
                          {tool.description}
                        </Paragraph>
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-2">
                      <Button type="primary" size="large">View Tool</Button>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </MainLayout>
  );
}
