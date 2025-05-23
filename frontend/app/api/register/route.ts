import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  // Llama al backend Flask
  const flaskResponse = await fetch('http://localhost:5000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await flaskResponse.json();

  if (!flaskResponse.ok) {
    return NextResponse.json({ error: data.message }, { status: flaskResponse.status });
  }

  // Crea la respuesta de Next.js
  const response = NextResponse.json({ success: true });

  // Transfiere la cookie del backend Flask al navegador
  const setCookie = flaskResponse.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }

  return response;
}