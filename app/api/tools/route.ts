import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'tools.json');

export async function GET() {
  const tools = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  return NextResponse.json(tools);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  let tools = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const newId = tools.length ? Math.max(...tools.map((v: any) => v.id)) + 1 : 1;
  const newTool = { ...body, id: newId };
  tools.unshift(newTool);
  fs.writeFileSync(DATA_PATH, JSON.stringify(tools, null, 2));
  return NextResponse.json(newTool);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  let tools = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  tools = tools.map((v: any) => v.id === body.id ? { ...v, ...body } : v);
  fs.writeFileSync(DATA_PATH, JSON.stringify(tools, null, 2));
  return NextResponse.json(body);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  let tools = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  tools = tools.filter((v: any) => v.id !== id);
  fs.writeFileSync(DATA_PATH, JSON.stringify(tools, null, 2));
  return NextResponse.json({ success: true });
}
