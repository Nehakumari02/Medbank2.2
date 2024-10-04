import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

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

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // Manually check for the presence of a token in the headers or cookies
  const token = req.headers.get('Authorization')?.split(' ')[1] || req.cookies.get('medbank_user_token')?.value;
  console.log("Token:", token);

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

  // If the page is not public and the user does not have a token, redirect to login
  // if (!isPublicPage && !token) {
  //   console.log("no token found")
  //   return NextResponse.redirect(new URL('/en/Login', req.url));
  // }

  // Allow the request to continue if it's a public page or if a valid token is present
  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Apply middleware to all paths except those that should be skipped
};
