import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { USER_TOKEN } from "@/lib/constants";
import { decrypt, updateSession } from "@/app/auth/lib/sessions";

type sessionType = {
  payload: {
    sub: string;
    username: string;
    role: string;
    email: string;
  };
  type: string;
  iat: number;
  exp: number;
};

const protectedRoutes = ["/perfil", "/admin"];

export default async function proxy(req: NextRequest) {
  let session: sessionType | undefined;

  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((prefix) =>
    path.startsWith(prefix),
  );
  const isAdminRoute = protectedRoutes.some((prefix) =>
    path.startsWith("/admin"),
  );

  const cookie = (await cookies()).get(USER_TOKEN)?.value;
  session = await decrypt(cookie);

  if (!session) {
    await updateSession();
    const cookie = (await cookies()).get(USER_TOKEN)?.value;

    session = await decrypt(cookie);
  }

  if (isProtectedRoute && !session?.payload) {
    const route = path
      ? "/auth/signin?redirect=" + path + req.nextUrl.search
      : "/auth/signin";
    return NextResponse.redirect(new URL(route, req.nextUrl));
  }

  if (isAdminRoute && session?.payload.role !== "ADMIN") {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
