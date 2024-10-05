import { NextRequest, NextResponse } from 'next/server';

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

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Manually check for the presence of a token in the headers or cookies
  const token = req.cookies.get('medbank_user_token')?.value;
  console.log("Token:", token);

  // Check if the path includes the locale
  const localeFromPathname = pathname.split('/')[1]; // Extract the first segment after the slash
  const isValidLocale = locales.includes(localeFromPathname);
  console.log("Locale from pathname:", localeFromPathname, "Valid:", isValidLocale);

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

  // Check for admin restricted access
  if (isValidLocale && pathname.startsWith(`/${localeFromPathname}/Admin_Restricted`)) {
    if (!token) {
      console.log("No token found, redirecting to Admin_Login");
      return NextResponse.redirect(new URL(`/${localeFromPathname}/Admin_Login`, req.url));
    }
    // Optionally, you can add additional checks to see if the user is an admin
  }

  // If the page is not public and the user does not have a token, redirect to login
  if (!isPublicPage && !token) {
    console.log("no token found")
    return NextResponse.redirect(new URL(`/${localeFromPathname}/Login`,req.nextUrl.origin));
  }

  // Allow the request to continue if it's a public page or if a valid token is present
  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Apply middleware to all paths except those that should be skipped
};
