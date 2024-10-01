import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

const locales = ["en", "jn"];
const publicPages = [
  '/',
  '/Login',
  '/Signup',
  '/about',
  '/CancellationPolicy',
  '/Orderflow',
  '/Personal-Information',
  '/PrivacyPolicy',
  '/RecentAnnouncement',
  '/SampleShipping',
  '/Services',
  '/SitePolicy',
  '/strength',
  '/Admin_Login',
  '/Admin_Signup',
];

// Create authorization middleware
const authMiddleware = withAuth({
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized: async ({ token }) => !!token,
  },
  pages: {
    signIn: '/en/Login',
  },
});

// Extend NextRequest to include nextauth
type NextRequestWithAuth = NextRequest & {
  nextauth?: any; // Specify the type based on your authentication payload if needed
};

export default async function middleware(req: NextRequestWithAuth, event) {
  const { pathname } = req.nextUrl;

  // Check if the path includes the locale
  const hasLocale = locales.some(locale => pathname.startsWith(`/${locale}`));

  // Regular expression to match public paths
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );

  // Check if the current path is public
  const isPublicPage = publicPathnameRegex.test(pathname);

  // Redirect to /en if the path is /
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', req.url));
  }

  // If path is not public and does not contain locale, redirect to /en
  if (!isPublicPage && !hasLocale) {
    return NextResponse.redirect(new URL('/en', req.url));
  }

  // If not a public page, apply the auth middleware
  if (!isPublicPage) {
    return authMiddleware(req, event); // Pass event
  }

  // Allow the request to continue if it's a public page
  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Apply middleware to all paths except those that should be skipped
};
