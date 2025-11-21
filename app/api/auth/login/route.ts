import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const body = await request.json();
    const { password } = body;

    // Simple hardcoded password for demonstration. 
    // In a real app, use environment variables.
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === ADMIN_PASSWORD) {
        // Set a cookie to indicate authentication
        const cookieStore = await cookies();
        cookieStore.set('admin_token', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
