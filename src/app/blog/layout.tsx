import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'Blog - CtrlV AI',
  description: 'Read the latest articles about AI tools, resources, trends, and usage tips.',
  keywords: 'AI blog, artificial intelligence articles, AI tools tips, AI trends',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}