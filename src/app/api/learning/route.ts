import { NextResponse } from 'next/server';
import { getAllVideos, getVideoById } from '@/utils/videos';

// 获取所有学习视频的API
export async function GET() {
  try {
    const videos = getAllVideos();
    return NextResponse.json({ success: true, videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

// 创建新视频的API
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // 在实际应用中，这里应该将数据保存到文件系统或数据库
    // 由于这是一个简化的示例，我们只返回成功
    return NextResponse.json({ success: true, message: 'Video created successfully' });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create video' },
      { status: 500 }
    );
  }
}
