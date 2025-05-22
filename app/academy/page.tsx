// Academy (Learning Center) Page
'use client';
import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Row, Col, Typography, Button } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

export default function AcademyPage() {
  const [courses, setCourses] = React.useState<any[]>([]);
  React.useEffect(() => {
    fetch('/api/videos').then(res => res.json()).then(setCourses);
  }, []);
  return (
    <MainLayout>
      <section className="section bg-gray-50 min-h-screen">
        <div className="container">
          <Title level={2} className="mb-8">AI Academy</Title>
          <Row gutter={[24, 24]}>
            {courses.map((course) => (
              <Col xs={24} md={12} key={course.id}>
                <Link href={course.link}>
                  <Card
                    hoverable
                    className="h-full flex flex-col justify-between"
                    cover={
                      <div className="relative h-64 w-full">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    }
                    bodyStyle={{ display: 'flex', flexDirection: 'column', height: '180px', justifyContent: 'space-between', padding: 16 }}
                  >
                    <div>
                      <Title level={4} className="mb-2" style={{ minHeight: 48 }}>{course.title}</Title>
                      <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600" style={{ minHeight: 48 }}>
                        {course.description}
                      </Paragraph>
                    </div>
                    <div className="flex items-center justify-end mt-2">
                      <Button type="primary" size="large">View Course</Button>
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
