import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { decrypt, getSession } from "./helpers/helpers";
import jwt from "jsonwebtoken";
import { publicRoutes } from "./var/route";
import { TrendingUpIcon } from "lucide-react";
import { JoseHeaderParameters } from "jose";

export async function middleware(request: NextRequest) {
  const token = await getSession()

  if(!(publicRoutes.includes(request.nextUrl.pathname))) {
    if(!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const data = await decrypt(token) as any

    if(!data) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if(data!.role !== "admin") {

      return NextResponse.redirect(new URL("/", request.url));
    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',],
};
