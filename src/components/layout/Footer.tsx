'use client';

import React from 'react';
import { Layout } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const { Footer } = Layout;

const FooterComponent: React.FC = () => {
  return (
    <Footer className="bg-[#424242] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center flex-shrink-0 mb-4" style={{ minWidth: 178, minHeight: 72, maxWidth: 178, maxHeight: 72 }}>
              <Image src="/images/logo.png" alt="CtrlV AI Logo" width={178} height={72} style={{ width: 178, height: 72, minWidth: 178, minHeight: 72, maxWidth: 178, maxHeight: 72, display: 'block' }} />
            </div>
            <p className="text-gray-300">
              Your one-stop destination for mastering AI and discovering the best tools to boost your productivity.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link href="/learning-center" className="text-gray-300 hover:text-white">Learning Center</Link></li>
              <li><Link href="/tools" className="text-gray-300 hover:text-white">AI Tools</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/tools/category/text-generation" className="text-gray-300 hover:text-white">Text Generation</Link></li>
              <li><Link href="/tools/category/image-generation" className="text-gray-300 hover:text-white">Image Generation</Link></li>
              <li><Link href="/tools/category/video-generation" className="text-gray-300 hover:text-white">Video Generation</Link></li>
              <li><Link href="/tools/category/content-creation" className="text-gray-300 hover:text-white">Content Creation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3">Connect</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><a href="https://twitter.com/ctrlvai" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Twitter</a></li>
              <li><a href="https://linkedin.com/company/ctrlvai" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CtrlV AI. All rights reserved.</p>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
