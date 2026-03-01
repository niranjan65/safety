import { NextResponse } from 'next/server'

export function middleware(request) {
    // Only protect routes under /admin
    if (!request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.next()
    }

    // Allow unrestricted access to the login page and admin API
    if (
        request.nextUrl.pathname.startsWith('/admin/login') ||
        request.nextUrl.pathname.startsWith('/api/') ||
        request.nextUrl.pathname.startsWith('/_next')
    ) {
        return NextResponse.next()
    }

    // Check for the auth cookie
    const authCookie = request.cookies.get('admin_auth')
    if (!authCookie || authCookie.value !== 'true') {
        // Redirect unauthenticated users to the login page
        const loginUrl = new URL('/admin/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
