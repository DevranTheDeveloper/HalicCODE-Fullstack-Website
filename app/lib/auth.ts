import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET || 'secret-key-change-me'
);

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload as { role: string; username: string };
    } catch (error) {
        return null;
    }
}

export async function getRole() {
    const session = await getSession();
    return session?.role || null;
}
