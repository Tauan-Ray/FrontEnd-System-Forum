import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { USER_TOKEN } from '@/lib/constants'
import { decrypt, updateSession } from '@/app/auth/lib/sessions'

const protectedRoutes = ['/user']

export default async function middleware(req: NextRequest) {
  let session;

  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((prefix) => path.startsWith(prefix))

  const cookie = (await cookies()).get(USER_TOKEN)?.value
  session = await decrypt(cookie);

  if (!session) {
    await updateSession();
    const cookie = (await cookies()).get(USER_TOKEN)?.value

    session = await decrypt(cookie)
  }

  if (isProtectedRoute && !session?.payload) {
    const route = path ? '/auth/signin?redirect=' + path + req.nextUrl.search : '/auth/signin'
    return NextResponse.redirect(new URL(route, req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
