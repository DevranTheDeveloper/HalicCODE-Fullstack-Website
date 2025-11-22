import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET || 'secret-key-change-me'
);

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
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/console-2024', '/console-2024/:path*'],
};

