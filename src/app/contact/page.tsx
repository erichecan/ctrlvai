import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { Typography, Form, Input, Button, Card, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export const metadata: Metadata = {
  title: 'Contact Us - CtrlV AI',
  description: 'Get in touch with the CtrlV AI team for questions, feedback, or collaboration opportunities.',
  keywords: 'contact CtrlV AI, AI tools support, feedback, collaboration',
};

export default function ContactPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] text-white py-12 px-4 rounded-lg mb-8">
        <div className="container mx-auto">
          <Title level={1} className="text-white text-center mb-4">
            Contact Us
          </Title>
          <Paragraph className="text-white text-center text-lg max-w-3xl mx-auto">
            Have questions, feedback, or collaboration ideas? We'd love to hear from you!
          </Paragraph>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="mb-16">
        <div className="container mx-auto">
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={12}>
              <Card className="shadow-lg h-full">
                <Title level={2}>Get in Touch</Title>
                <Paragraph className="text-lg mb-6">
                  Fill out the form below and we'll get back to you as soon as possible.
                </Paragraph>
                
                <Form layout="vertical">
                  <Form.Item
                    name="name"
                    label="Your Name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input size="large" placeholder="John Doe" />
                  </Form.Item>
                  
                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input size="large" placeholder="john@example.com" />
                  </Form.Item>
                  
                  <Form.Item
                    name="subject"
                    label="Subject"
                    rules={[{ required: true, message: 'Please enter a subject' }]}
                  >
                    <Input size="large" placeholder="How can we help you?" />
                  </Form.Item>
                  
                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[{ required: true, message: 'Please enter your message' }]}
                  >
                    <TextArea rows={6} placeholder="Your message here..." />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button 
                      type="primary" 
                      size="large" 
                      className="bg-[#1976D2]"
                      htmlType="submit"
                    >
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            
            <Col xs={24} lg={12}>
              <Card className="shadow-lg h-full">
                <Title level={2}>Connect With Us</Title>
                <Paragraph className="text-lg mb-6">
                  We're always looking for ways to improve our platform and services. Your feedback is valuable to us!
                </Paragraph>
                
                <div className="space-y-6">
                  <div>
                    <Title level={4}>Email</Title>
                    <Paragraph className="text-lg">
                      <a href="mailto:contact@ctrlvai.com" className="text-[#1976D2] hover:underline">
                        contact@ctrlvai.com
                      </a>
                    </Paragraph>
                  </div>
                  
                  <div>
                    <Title level={4}>Follow Us</Title>
                    <div className="flex space-x-4">
                      <a href="https://twitter.com/ctrlvai" target="_blank" rel="noopener noreferrer" className="text-[#1976D2] hover:text-[#1565C0]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </a>
                      <a href="https://linkedin.com/company/ctrlvai" target="_blank" rel="noopener noreferrer" className="text-[#1976D2] hover:text-[#1565C0]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      <a href="https://github.com/ctrlvai" target="_blank" rel="noopener noreferrer" className="text-[#1976D2] hover:text-[#1565C0]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <Title level={4}>Office Hours</Title>
                    <Paragraph className="text-lg">
                      Monday - Friday: 9:00 AM - 5:00 PM (EST)
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="mb-16 bg-[#F5F5F5] py-12 rounded-lg">
        <div className="container mx-auto">
          <Title level={2} className="text-center mb-8">Frequently Asked Questions</Title>
          
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card className="h-full shadow-md">
                <Title level={4}>How can I suggest a new AI tool to be added?</Title>
                <Paragraph>
                  We're always looking to expand our directory! Please use the contact form and include details about the tool you'd like to suggest, including its name, website, and key features.
                </Paragraph>
              </Card>
            </Col>
            
            <Col xs={24} md={12}>
              <Card className="h-full shadow-md">
                <Title level={4}>Do you offer consulting services for AI implementation?</Title>
                <Paragraph>
                  While our primary focus is providing information and resources, we do have partnerships with AI consultants. Contact us with your specific needs, and we'll connect you with the right experts.
                </Paragraph>
              </Card>
            </Col>
            
            <Col xs={24} md={12}>
              <Card className="h-full shadow-md">
                <Title level={4}>How often is the content updated?</Title>
                <Paragraph>
                  We update our blog and tool directory regularly to ensure you have access to the latest information. Our team is constantly researching new tools and developments in the AI space.
                </Paragraph>
              </Card>
            </Col>
            
            <Col xs={24} md={12}>
              <Card className="h-full shadow-md">
                <Title level={4}>Can I contribute content to your blog?</Title>
                <Paragraph>
                  Yes! We welcome guest contributions from AI experts and enthusiasts. Please reach out through the contact form with your proposed topic and a brief outline of your article.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </MainLayout>
  );
}
