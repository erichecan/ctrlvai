import React from 'react';
import { Layout, Divider } from 'antd';
import Link from 'next/link';

const { Footer } = Layout;

const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Footer className="bg-gray-100 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">About ctrlvAI</h3>
            <p className="text-gray-600 mb-4">
              ctrlvAI is your one-stop AI learning and tool navigation platform, offering AI tool recommendations, tutorials, and industry trend analysis to help you quickly master AI skills.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-purple-700">Home</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-purple-700">Blog</Link></li>
              <li><Link href="/academy" className="text-gray-600 hover:text-purple-700">AI Academy</Link></li>
              <li><Link href="/tools" className="text-gray-600 hover:text-purple-700">AI Tools</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/blog/category/ai-tools" className="text-gray-600 hover:text-purple-700">AI Tool Recommendations</Link></li>
              <li><Link href="/blog/category/ai-tips" className="text-gray-600 hover:text-purple-700">AI Tips</Link></li>
              <li><Link href="/blog/category/ai-trends" className="text-gray-600 hover:text-purple-700">AI Trends</Link></li>
              <li><Link href="/blog/category/ai-cases" className="text-gray-600 hover:text-purple-700">AI Case Studies</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-600 hover:text-purple-700">Contact</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-purple-700">About Us</Link></li>
            </ul>
            <div className="mt-4">
              <form className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  Subscribe Updates
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <Divider className="my-6" />
        
        <div className="text-center text-gray-600">
          <p>© {currentYear} ctrlvAI. All rights reserved.</p>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
