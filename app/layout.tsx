import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from 'antd';
import MainLayout from '../components/layout/MainLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ctrlvAI - AI 学习与工具导航平台",
  description: "ctrlvAI 是您的一站式 AI 学习与工具导航平台，提供 AI 工具推荐、使用教程和行业趋势分析，助您快速掌握 AI 技能。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="AI工具,AI学习,AI导航,AI教程,AI资源,人工智能" />
        <meta name="author" content="ctrlvAI" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ctrlvAI - AI 学习与工具导航平台" />
        <meta property="og:description" content="ctrlvAI 是您的一站式 AI 学习与工具导航平台，提供 AI 工具推荐、使用教程和行业趋势分析，助您快速掌握 AI 技能。" />
        <meta property="og:site_name" content="ctrlvAI" />
        <link rel="canonical" href="https://ctrlvai.com" />
        {/* Google Analytics 脚本将在这里添加 */}
      </head>
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#6b46c1',
              borderRadius: 6,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
