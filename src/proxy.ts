import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'fr', 'ar'] as const
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language') ?? ''
  const preferred = acceptLang.split(',')[0].split('-')[0].trim().toLowerCase()
  return locales.includes(preferred as (typeof locales)[number]) ? preferred : defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip Next.js internals and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )

  if (!pathnameHasLocale) {
    const lang = getLocale(request)
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = `/${lang}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
