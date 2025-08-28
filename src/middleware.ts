import { NextRequest, NextResponse } from "next/server";
import { getLocale } from "./server/utils/locale";
import { handleUnauthorized } from "./server/utils/auth";
import { getSession } from "./server/utils/auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (/\.(png|svg|jpg|webp|mp3|geojson)$/.test(pathname)) return;
  let locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl);

  if (pathname.startsWith("/admin")) {
    const session = await getSession(request);
    console.log("session received is", session);
    if (!session) {
      return handleUnauthorized(request);
    }

    return NextResponse.rewrite(newUrl);
  }

  const response = NextResponse.rewrite(newUrl);
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
