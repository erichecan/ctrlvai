import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'subscribers.json');

export async function GET() {
  const subs = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  return NextResponse.json(subs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  let subs = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  if (!subs.find((s: any) => s.email === body.email)) {
    subs.push({ email: body.email, date: new Date().toISOString() });
    fs.writeFileSync(DATA_PATH, JSON.stringify(subs, null, 2));
  }
  return NextResponse.json({ success: true });
}
