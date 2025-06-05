import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'public/data/tools.json');

// Helper function to read tools data
async function readToolsData() {
  try {
    console.log('Attempting to read file from path:', DATA_FILE_PATH);
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    console.log('Successfully read data from file. Content length:', data.length);
    // You might want to log part of the content for verification, e.g., data.substring(0, 200)
    const parsedData = JSON.parse(data);
    console.log('Successfully parsed JSON data. Tools array length:', parsedData.tools.length);
    return parsedData;
  } catch (error) {
    // If file doesn't exist or is invalid, return empty tools array
    console.error('Error reading or parsing tools.json:', error);
    return { tools: [] };
  }
}

// Helper function to write tools data
async function writeToolsData(data: any) {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
}

// GET /api/tools
export async function GET() {
  try {
    const data = await readToolsData();
    return NextResponse.json({ success: true, tools: data.tools });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}

// POST /api/tools
export async function POST(request: Request) {
  try {
    const tool = await request.json();
    const data = await readToolsData();
    
    // Generate a new ID if not provided
    if (!tool.id) {
      tool.id = `tool_${Date.now()}`;
    }
    
    // Add the new tool
    data.tools.push(tool);
    await writeToolsData(data);
    
    return NextResponse.json({ success: true, tool });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create tool' },
      { status: 500 }
    );
  }
}

// PUT /api/tools
export async function PUT(request: Request) {
  try {
    const updatedTool = await request.json();
    const data = await readToolsData();
    
    const index = data.tools.findIndex((t: any) => t.id === updatedTool.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Tool not found' },
        { status: 404 }
      );
    }
    
    data.tools[index] = updatedTool;
    await writeToolsData(data);
    
    return NextResponse.json({ success: true, tool: updatedTool });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update tool' },
      { status: 500 }
    );
  }
}

// DELETE /api/tools
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const data = await readToolsData();
    
    const index = data.tools.findIndex((t: any) => t.id === id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Tool not found' },
        { status: 404 }
      );
    }
    
    data.tools.splice(index, 1);
    await writeToolsData(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete tool' },
      { status: 500 }
    );
  }
}