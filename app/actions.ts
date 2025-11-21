'use server'

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

// --- Members ---

export async function createMember(formData: FormData) {
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const bio = formData.get('bio') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const linkedin = formData.get('linkedin') as string;
    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;
    const email = formData.get('email') as string;

    await prisma.member.create({
        data: {
            name,
            role,
            bio,
            imageUrl: imageUrl || null,
            linkedin: linkedin || null,
            twitter: twitter || null,
            instagram: instagram || null,
            email: email || null,
        },
    });

    revalidatePath('/members');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function deleteMember(id: number) {
    await prisma.member.delete({
        where: { id },
    });

    revalidatePath('/members');
    revalidatePath('/admin');
}

export async function updateMember(id: number, formData: FormData) {
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const bio = formData.get('bio') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const linkedin = formData.get('linkedin') as string;
    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;
    const email = formData.get('email') as string;

    await prisma.member.update({
        where: { id },
        data: {
            name,
            role,
            bio,
            imageUrl: imageUrl || null,
            linkedin: linkedin || null,
            twitter: twitter || null,
            instagram: instagram || null,
            email: email || null,
        },
    });

    revalidatePath('/members');
    revalidatePath('/admin');
    redirect('/admin');
}

// --- Events ---

export async function createEvent(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const dateStr = formData.get('date') as string;
    const status = formData.get('status') as string;
    const location = formData.get('location') as string;
    const imageUrl = formData.get('imageUrl') as string;

    await prisma.event.create({
        data: {
            title,
            description,
            date: new Date(dateStr),
            status,
            location,
            imageUrl: imageUrl || null,
        },
    });

    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function updateEvent(id: number, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const dateStr = formData.get('date') as string;
    const status = formData.get('status') as string;
    const location = formData.get('location') as string;
    const imageUrl = formData.get('imageUrl') as string;

    await prisma.event.update({
        where: { id },
        data: {
            title,
            description,
            date: new Date(dateStr),
            status,
            location,
            imageUrl: imageUrl || null,
        },
    });

    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function deleteEvent(id: number) {
    await prisma.event.delete({
        where: { id },
    });

    revalidatePath('/');
    revalidatePath('/admin');
}
