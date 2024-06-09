import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  
  const LOGIN_PAGE_ROUTE = '/';
  const LOGGED_IN_USER_REDIRECT_ROUTE = '/incident-rate';
  const authProtectedRoutes = ['/incident-rate', '/fasilitas-kesehatan-terdekat', '/informasi-seputar-dbd'];
  const isAccessingAuthProtectedRoute = authProtectedRoutes.includes(pathname);

  const redirect = (destination) => {
    const url = req.nextUrl.clone();
    url.pathname = destination;
    const urlWithoutParams = new URL(url);
    urlWithoutParams.search = '';
    return NextResponse.redirect(urlWithoutParams);
  }

  // Jika belum login, redirect ke homepage / login page
  if (!token && isAccessingAuthProtectedRoute) {
    return redirect(LOGIN_PAGE_ROUTE);
  }
  // Jika sudah login dan sedang di halaman login, redirect ke halaman incident rate
  if (token && pathname === LOGIN_PAGE_ROUTE) {
    return redirect(LOGGED_IN_USER_REDIRECT_ROUTE);
  }

  return NextResponse.next();
}
