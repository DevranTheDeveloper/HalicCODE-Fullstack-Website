'use server'

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { transformGoogleDriveUrl } from './lib/utils';

const prisma = new PrismaClient();

// --- Members ---

export async function createMember(formData: FormData) {
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const bio = formData.get('bio') as string;
    const imageUrl = transformGoogleDriveUrl(formData.get('imageUrl') as string);
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
    const imageUrl = transformGoogleDriveUrl(formData.get('imageUrl') as string);
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
    const date = new Date(formData.get('date') as string);
    const location = formData.get('location') as string;
    const imageUrl = transformGoogleDriveUrl(formData.get('imageUrl') as string);
    const status = formData.get('status') as string;
    const registrationLink = formData.get('registrationLink') as string;

    await prisma.event.create({
        data: {
            title,
            description,
            date,
            status,
            location,
            imageUrl: imageUrl || null,
            registrationLink: registrationLink || null,
        },
    });

    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function updateEvent(id: number, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = new Date(formData.get('date') as string);
    const location = formData.get('location') as string;
    const imageUrl = transformGoogleDriveUrl(formData.get('imageUrl') as string);
    const status = formData.get('status') as string;
    const registrationLink = formData.get('registrationLink') as string;

    await prisma.event.update({
        where: { id },
        data: {
            title,
            description,
            date,
            status,
            location,
            imageUrl: imageUrl || null,
            registrationLink: registrationLink || null,
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

// --- News ---

export async function createNews(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageUrl = transformGoogleDriveUrl(formData.get('imageUrl') as string);
    const date = new Date(formData.get('date') as string);

    await prisma.news.create({
        data: {
            title,
            content,
            imageUrl: imageUrl || null,
            date: date || new Date(),
        },
    });

    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function updateNews(id: number, formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageUrl = transformGoogleDriveUrl(formData.get('imageUrl') as string);
    const date = new Date(formData.get('date') as string);

    await prisma.news.update({
        where: { id },
        data: {
            title,
            content,
            imageUrl: imageUrl || null,
            date: date || new Date(),
        },
    });

    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function deleteNews(id: number) {
    await prisma.news.delete({
        where: { id },
    });

    revalidatePath('/');
    revalidatePath('/admin');
}
