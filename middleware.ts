import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const AUTH_PATHS = ["/auth/login", "/auth/register"];
const HOME_PATH = "/note";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && (path === HOME_PATH || path === "/")) {
    return NextResponse.redirect(new URL(AUTH_PATHS[0], req.url));
  } else if (session && (AUTH_PATHS.includes(path) || path === "/")) {
    return NextResponse.redirect(new URL(HOME_PATH, req.url));
  }

  return NextResponse.next();
}
