import { AITool } from '@/types';

// 验证工具数据的格式
function isValidTool(tool: any): tool is AITool {
  return (
    typeof tool === 'object' &&
    typeof tool.name === 'string' &&
    typeof tool.description === 'string' &&
    // Making logo optional for now
    (typeof tool.logo === 'string' || typeof tool.logo === 'undefined') &&
    typeof tool.category === 'string' &&
    Array.isArray(tool.tags) &&
    tool.tags.every((tag: any) => typeof tag === 'string') &&
    typeof tool.isPaid === 'boolean' &&
    typeof tool.url === 'string'
  );
}

// 从JSON文件加载工具数据
export async function loadTools(): Promise<AITool[]> {
  try {
    // 设置超时时间为 5 秒
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // 从 API 加载工具数据
    const response = await fetch('/api/tools', {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.tools)) {
      throw new Error('Invalid API response format');
    }

    // 验证每个工具的数据格式
    const validTools = data.tools.filter((tool: any) => {
      if (!isValidTool(tool)) {
        console.warn(`Invalid tool data found:`, tool);
        return false;
      }
      return true;
    });

    return validTools;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Request timeout while loading tools');
      } else {
        console.error('Error loading tools:', error.message);
      }
    } else {
      console.error('Unknown error while loading tools');
    }
    return [];
  }
}

// 获取所有可用的工具类别
export function getCategories(tools: AITool[]): string[] {
  const categories = new Set(tools.map(tool => tool.category));
  return Array.from(categories);
}

// 获取所有可用的标签
export function getTags(tools: AITool[]): string[] {
  const tags = new Set(tools.flatMap(tool => tool.tags));
  return Array.from(tags);
}

// 过滤工具
// 获取所有工具
export async function getAllTools(): Promise<AITool[]> {
  return await loadTools();
}

// 获取随机工具
export async function getRandomTools(count: number = 3): Promise<AITool[]> {
  const tools = await loadTools();
  const shuffled = [...tools].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function filterTools(
  tools: AITool[],
  searchQuery: string,
  selectedCategory: string,
  selectedTags: string[],
  priceFilter: string
): AITool[] {
  return tools.filter(tool => {
    // 搜索过滤
    const searchMatch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 类别过滤
    const categoryMatch = selectedCategory === 'All' || tool.category === selectedCategory;
    
    // 标签过滤
    const tagMatch = selectedTags.length === 0 || 
      selectedTags.some(tag => tool.tags.includes(tag));
    
    // 价格过滤
    const priceMatch = priceFilter === 'all' ||
      (priceFilter === 'free' && !tool.isPaid) ||
      (priceFilter === 'paid' && tool.isPaid);
    
    return searchMatch && categoryMatch && tagMatch && priceMatch;
  });
}