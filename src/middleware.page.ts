import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const isLogged = req.cookies.get('userToken');
  const url = req.nextUrl;
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/fonts/') ||
    url.pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  if (isLogged && url.pathname === '/login') {
    url.pathname = '/mypage';
    return NextResponse.redirect(url);
  }
}
