import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('jwt_token')?.value
    const pathName = request.nextUrl.pathname

    console.log('Middleware running on:', pathName, 'Token exists?', !!token)

    if (!token && pathName === '/') {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && (pathName === '/login' || pathName === '/signup')) {
        return NextResponse.redirect(new URL('/home', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/login', '/signup'],
}
