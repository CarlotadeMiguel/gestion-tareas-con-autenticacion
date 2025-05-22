import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 });
  }

  const response = await fetch('http://localhost:5000/api/tasks', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(data);
}


export async function POST(request: Request) {
    const body = await request.json();
    const { title, description } = body;
  
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
  
    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }
  
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body : JSON.stringify({ title, description }),
    });
    
    if (!response.ok) {
      return NextResponse.json(response, { status: response.status });
    }
  
    return NextResponse.json({ success: true });
  }