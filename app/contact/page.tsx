// Contact Us Page
'use client';
import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Typography, Form, Input, Button, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

export default function ContactPage() {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  return (
    <MainLayout>
      <section className="section bg-gray-50 min-h-screen">
        <div className="container max-w-3xl mx-auto py-12">
          <Title level={1} className="text-center mb-8">Contact Us</Title>
          <Paragraph className="text-lg mb-6 text-center">
            Have questions or need assistance? We’re here to help. Fill out the form below or reach us at <a href="mailto:support@ctrlvai.com" className="text-purple-700">support@ctrlvai.com</a>.
          </Paragraph>
          <Form layout="vertical" onFinish={onFinish} className="bg-white p-6 rounded-lg shadow-md">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: 'Please enter your first name' }]}
                >
                  <Input placeholder="John" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: 'Please enter your last name' }]}
                >
                  <Input placeholder="Doe" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
            >
              <Input placeholder="john.doe@example.com" />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <Input.TextArea rows={4} placeholder="How can we help you?" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-purple-700 w-full">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </MainLayout>
  );
}
