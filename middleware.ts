import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fallbackLng, locales } from "@/app/i18n/settings";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  //console.log("pathname from middleware ", request.nextUrl)

  if (
    pathname.startsWith(`/${fallbackLng}/`) ||
    pathname === `/${fallbackLng}`
  ) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${fallbackLng}`,
          pathname === `/${fallbackLng}` ? "/" : ""
        ),
        request.url
      ),
      301
    );
  } 

  if (pathname.startsWith('/products')) {
    //console.log("Request NextUrl Search", request.nextUrl.search)
    //console.log("pathname", pathname)
    //const fileUrl = new URL(request.nextUrl.search, pathname);
    //return NextResponse.redirect(fileUrl);
  }
  // //return NextResponse.next() - doesn't work


  // Check if the pathname is missing any locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const RewriteUrl = request.nextUrl;
    RewriteUrl.pathname = `/${fallbackLng}${pathname}`;

    return NextResponse.rewrite(new URL(RewriteUrl, request.url));
  }

}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!api|_next|_vercel|static|_next/image|images|favicon.ico).*)"],
};