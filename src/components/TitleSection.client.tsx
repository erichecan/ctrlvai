'use client';

import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function TitleSection() {
  return (
    <section className="bg-[#F5F5F5] rounded-lg p-8 text-center mb-16">
      <Title level={2}>Ready to Master AI Tools?</Title>
      <Paragraph className="text-lg mb-6 max-w-2xl mx-auto">
        Join our community to discover the best AI tools, learn from expert tutorials, and stay updated with the latest AI trends.
      </Paragraph>
    </section>
  );
}