import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'videos.json');

export async function GET() {
  const videos = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  return NextResponse.json(videos);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  let videos = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const newId = videos.length ? Math.max(...videos.map((v: any) => v.id)) + 1 : 1;
  const newVideo = { ...body, id: newId };
  videos.unshift(newVideo);
  fs.writeFileSync(DATA_PATH, JSON.stringify(videos, null, 2));
  return NextResponse.json(newVideo);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  let videos = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  videos = videos.map((v: any) => v.id === body.id ? { ...v, ...body } : v);
  fs.writeFileSync(DATA_PATH, JSON.stringify(videos, null, 2));
  return NextResponse.json(body);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  let videos = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  videos = videos.filter((v: any) => v.id !== id);
  fs.writeFileSync(DATA_PATH, JSON.stringify(videos, null, 2));
  return NextResponse.json({ success: true });
}
