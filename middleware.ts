import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET || 'secret-key-change-me'
);

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    // Check if the path starts with /console-2024
    if (request.nextUrl.pathname.startsWith('/console-2024')) {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const { payload } = await jwtVerify(token, SECRET_KEY);
            const role = payload.role as string;
            const path = request.nextUrl.pathname;

            // Role-based access control
            if (path.startsWith('/console-2024/members') && role !== 'SUPER_ADMIN' && role !== 'MEMBER_MANAGER') {
                return NextResponse.redirect(new URL('/console-2024', request.url));
            }

            if (path.startsWith('/console-2024/events') && role !== 'SUPER_ADMIN' && role !== 'EVENT_MANAGER') {
                return NextResponse.redirect(new URL('/console-2024', request.url));
            }

            if (path.startsWith('/console-2024/news') && role !== 'SUPER_ADMIN' && role !== 'NEWS_MANAGER') {
                return NextResponse.redirect(new URL('/console-2024', request.url));
            }

            if (path.startsWith('/console-2024/roles') && role !== 'SUPER_ADMIN') {
                return NextResponse.redirect(new URL('/console-2024', request.url));
            }

        } catch (error) {
            // Invalid token
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }

    // Use intl middleware for other paths
    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(tr|en|fr|it|es|ru)/:path*', '/console-2024/:path*']
};

