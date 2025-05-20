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
            <h3 className="text-lg font-bold mb-4">关于 ctrlvAI</h3>
            <p className="text-gray-600 mb-4">
              ctrlvAI 是您的一站式 AI 学习与工具导航平台，提供 AI 工具推荐、使用教程和行业趋势分析，助您快速掌握 AI 技能。
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-purple-700">首页</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-purple-700">博客</Link></li>
              <li><Link href="/academy" className="text-gray-600 hover:text-purple-700">AI学习中心</Link></li>
              <li><Link href="/tools" className="text-gray-600 hover:text-purple-700">AI工具导航</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">热门分类</h3>
            <ul className="space-y-2">
              <li><Link href="/blog/category/ai-tools" className="text-gray-600 hover:text-purple-700">AI 工具推荐</Link></li>
              <li><Link href="/blog/category/ai-tips" className="text-gray-600 hover:text-purple-700">AI 使用技巧</Link></li>
              <li><Link href="/blog/category/ai-trends" className="text-gray-600 hover:text-purple-700">AI 行业趋势</Link></li>
              <li><Link href="/blog/category/ai-cases" className="text-gray-600 hover:text-purple-700">AI 案例研究</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-600 hover:text-purple-700">联系方式</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-purple-700">关于我们</Link></li>
            </ul>
            <div className="mt-4">
              <form className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="您的邮箱" 
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  订阅更新
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <Divider className="my-6" />
        
        <div className="text-center text-gray-600">
          <p>© {currentYear} ctrlvAI. 保留所有权利。</p>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
