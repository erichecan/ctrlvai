import { NextResponse } from 'next/server';
import { getAllTools, getToolById } from '@/utils/tools';

// 获取所有AI工具的API
export async function GET() {
  try {
    const tools = getAllTools();
    return NextResponse.json({ success: true, tools });
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}

// 创建新AI工具的API
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // 在实际应用中，这里应该将数据保存到文件系统或数据库
    // 由于这是一个简化的示例，我们只返回成功
    return NextResponse.json({ success: true, message: 'Tool created successfully' });
  } catch (error) {
    console.error('Error creating tool:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create tool' },
      { status: 500 }
    );
  }
}
