import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from 'antd';
import MainLayout from '../components/layout/MainLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ctrlvAI - AI Learning & Tool Navigation Platform",
  description: "ctrlvAI is your one-stop AI learning and tool navigation platform, offering AI tool recommendations, tutorials, and industry trend analysis to help you quickly master AI skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="AI tools,AI learning,AI navigation,AI tutorials,AI resources,artificial intelligence" />
        <meta name="author" content="ctrlvAI" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ctrlvAI - AI Learning & Tool Navigation Platform" />
        <meta property="og:description" content="ctrlvAI is your one-stop AI learning and tool navigation platform, offering AI tool recommendations, tutorials, and industry trend analysis to help you quickly master AI skills." />
        <meta property="og:site_name" content="ctrlvAI" />
        <link rel="canonical" href="https://ctrlvai.com" />
        {/* Google Analytics script will be added here */}
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
