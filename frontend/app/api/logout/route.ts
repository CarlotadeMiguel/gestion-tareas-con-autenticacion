import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
 
  cookies().set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), 
    sameSite: 'lax', 
    secure: true,     
  });

  return NextResponse.json({ message: 'Sesión cerrada' }, { status: 200 });
}
