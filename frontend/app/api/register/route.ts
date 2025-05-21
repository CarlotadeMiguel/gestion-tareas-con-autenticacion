import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  try {

    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}
