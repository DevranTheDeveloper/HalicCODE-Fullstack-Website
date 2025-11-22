import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if the path starts with /console-2024
    if (request.nextUrl.pathname.startsWith('/console-2024')) {
        const token = request.cookies.get('admin_token');

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/console-2024', '/console-2024/:path*'],
};
