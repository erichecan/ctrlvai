import fs from 'fs';
import path from 'path';
import { AITool } from '../types';

// 模拟AI工具数据
// 在实际项目中，这些数据可以从API或数据库中获取
const toolsData: AITool[] = [
  {
    id: "tool-1",
    name: "ChatGPT",
    description: "OpenAI's powerful language model that can understand and generate human-like text based on context.",
    logo: "/images/tools/chatgpt-logo.png",
    url: "https://chat.openai.com/",
    isPaid: true,
    features: [
      "Natural language processing",
      "Content generation",
      "Question answering",
      "Conversation"
    ],
    tags: ["AI Chat", "Text Generation", "OpenAI"],
    category: "Text Generation"
  },
  {
    id: "tool-2",
    name: "DALL-E",
    description: "AI system by OpenAI that can create realistic images and art from natural language descriptions.",
    logo: "/images/tools/dalle-logo.png",
    url: "https://openai.com/dall-e/",
    isPaid: true,
    features: [
      "Image generation from text",
      "Creative artwork",
      "Visual concept rendering"
    ],
    tags: ["Image Generation", "AI Art", "OpenAI"],
    category: "Image Generation"
  },
  {
    id: "tool-3",
    name: "Midjourney",
    description: "AI art generator that creates images from textual descriptions using advanced machine learning techniques.",
    logo: "/images/tools/midjourney-logo.png",
    url: "https://www.midjourney.com/",
    isPaid: true,
    features: [
      "High-quality image generation",
      "Artistic style control",
      "Discord integration"
    ],
    tags: ["Image Generation", "AI Art", "Creative Tools"],
    category: "Image Generation"
  },
  {
    id: "tool-4",
    name: "Claude",
    description: "Anthropic's AI assistant designed to be helpful, harmless, and honest in its interactions.",
    logo: "/images/tools/claude-logo.png",
    url: "https://www.anthropic.com/claude",
    isPaid: true,
    features: [
      "Natural conversation",
      "Content generation",
      "Research assistance",
      "Ethical AI design"
    ],
    tags: ["AI Chat", "Text Generation", "Anthropic"],
    category: "Text Generation"
  },
  {
    id: "tool-5",
    name: "Stable Diffusion",
    description: "Open-source AI art generator that creates detailed images based on text descriptions.",
    logo: "/images/tools/stable-diffusion-logo.png",
    url: "https://stability.ai/",
    isPaid: false,
    features: [
      "Text-to-image generation",
      "Open-source framework",
      "Local installation option",
      "Community extensions"
    ],
    tags: ["Image Generation", "AI Art", "Open Source"],
    category: "Image Generation"
  },
  {
    id: "tool-6",
    name: "Jasper",
    description: "AI content platform that helps create marketing copy, social media posts, and long-form content.",
    logo: "/images/tools/jasper-logo.png",
    url: "https://www.jasper.ai/",
    isPaid: true,
    features: [
      "Marketing copy generation",
      "Blog post writing",
      "Social media content",
      "SEO optimization"
    ],
    tags: ["Content Creation", "Marketing", "Writing Assistant"],
    category: "Content Creation"
  },
  {
    id: "tool-7",
    name: "Runway",
    description: "Creative toolkit powered by AI that offers video editing, generation, and visual effects capabilities.",
    logo: "/images/tools/runway-logo.png",
    url: "https://runwayml.com/",
    isPaid: true,
    features: [
      "Video generation",
      "Visual effects",
      "Image editing",
      "Green screen removal"
    ],
    tags: ["Video Generation", "Visual Effects", "Creative Tools"],
    category: "Video Generation"
  },
  {
    id: "tool-8",
    name: "Synthesia",
    description: "AI video generation platform that creates professional videos with virtual presenters from text.",
    logo: "/images/tools/synthesia-logo.png",
    url: "https://www.synthesia.io/",
    isPaid: true,
    features: [
      "AI video avatars",
      "Text-to-video generation",
      "Multiple languages",
      "Custom backgrounds"
    ],
    tags: ["Video Generation", "AI Avatars", "Business"],
    category: "Video Generation"
  },
  {
    id: "tool-9",
    name: "Notion AI",
    description: "AI writing assistant integrated with Notion that helps draft, edit, and summarize content.",
    logo: "/images/tools/notion-ai-logo.png",
    url: "https://www.notion.so/product/ai",
    isPaid: true,
    features: [
      "Content drafting",
      "Summarization",
      "Translation",
      "Notion integration"
    ],
    tags: ["Writing Assistant", "Productivity", "Note-taking"],
    category: "Writing Assistant"
  },
  {
    id: "tool-10",
    name: "Otter.ai",
    description: "AI-powered meeting assistant that records, transcribes, and summarizes conversations.",
    logo: "/images/tools/otter-logo.png",
    url: "https://otter.ai/",
    isPaid: true,
    features: [
      "Real-time transcription",
      "Meeting summaries",
      "Speaker identification",
      "Integration with video conferencing"
    ],
    tags: ["Transcription", "Meeting Assistant", "Productivity"],
    category: "Transcription"
  },
  {
    id: "tool-11",
    name: "Descript",
    description: "All-in-one audio and video editing platform with AI-powered transcription and editing tools.",
    logo: "/images/tools/descript-logo.png",
    url: "https://www.descript.com/",
    isPaid: true,
    features: [
      "Audio transcription",
      "Video editing",
      "Podcast production",
      "Text-based editing"
    ],
    tags: ["Audio Editing", "Video Editing", "Transcription"],
    category: "Audio & Video Editing"
  },
  {
    id: "tool-12",
    name: "Copy.ai",
    description: "AI copywriting tool that generates marketing copy, social media content, and more.",
    logo: "/images/tools/copyai-logo.png",
    url: "https://www.copy.ai/",
    isPaid: true,
    features: [
      "Marketing copy generation",
      "Email writing",
      "Social media content",
      "Product descriptions"
    ],
    tags: ["Content Creation", "Marketing", "Writing Assistant"],
    category: "Content Creation"
  }
];

// 保存工具数据到JSON文件
export function saveToolsData() {
  const dataDir = path.join(process.cwd(), 'public', 'data');
  
  // 确保目录存在
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const filePath = path.join(dataDir, 'tools.json');
  fs.writeFileSync(filePath, JSON.stringify(toolsData, null, 2));
}

// 获取所有AI工具
export function getAllTools(): AITool[] {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'tools.json');
    
    // 如果文件不存在，创建并保存默认数据
    if (!fs.existsSync(filePath)) {
      saveToolsData();
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading tools:', error);
    return toolsData; // 返回默认数据
  }
}

// 根据ID获取工具
export function getToolById(id: string): AITool | null {
  const tools = getAllTools();
  return tools.find(tool => tool.id === id) || null;
}

// 获取随机工具
export function getRandomTools(count: number = 6): AITool[] {
  const allTools = getAllTools();
  return allTools
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}

// 获取所有工具分类
export function getAllToolCategories(): string[] {
  const tools = getAllTools();
  const categories = new Set<string>();
  
  tools.forEach(tool => {
    categories.add(tool.category);
  });
  
  return Array.from(categories);
}

// 根据分类获取工具
export function getToolsByCategory(category: string): AITool[] {
  const tools = getAllTools();
  return tools.filter(tool => tool.category === category);
}

// 根据标签获取工具
export function getToolsByTag(tag: string): AITool[] {
  const tools = getAllTools();
  return tools.filter(tool => tool.tags.includes(tag));
}

// 获取所有工具标签
export function getAllToolTags(): string[] {
  const tools = getAllTools();
  const tags = new Set<string>();
  
  tools.forEach(tool => {
    tool.tags.forEach(tag => {
      tags.add(tag);
    });
  });
  
  return Array.from(tags);
}
