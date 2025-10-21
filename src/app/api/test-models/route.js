import { NextResponse } from 'next/server';

export async function GET(req) {
  const apiKey = req.nextUrl.searchParams.get('apiKey');
  
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing apiKey' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}