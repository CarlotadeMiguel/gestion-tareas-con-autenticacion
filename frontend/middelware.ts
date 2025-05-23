import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register');

  // Si está en ruta protegida y no tiene token, redirigir a login
  if (request.nextUrl.pathname.startsWith('/tasks') && (!token || token.value === '')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si está en página de auth pero ya tiene token, redirigir a tasks
  if (isAuthPage && token && token.value !== '') {
    return NextResponse.redirect(new URL('/tasks', request.url));
  }

  return NextResponse.next();
}
