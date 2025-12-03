'use server'

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { transformGoogleDriveUrl } from './lib/utils';
import { translateContent } from './lib/translator';

const prisma = new PrismaClient();

// --- Members ---

export async function createMember(formData: FormData) {
    const name = formData.get('name') as string;
    const roleId = parseInt(formData.get('roleId') as string);
    const bio = formData.get('bio') as string;
    const imageUrl = transformGoogleDriveUrl(formData.get('imageUrl') as string);
    const linkedin = formData.get('linkedin') as string;
    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;
    const email = formData.get('email') as string;

    await prisma.member.create({
        data: {
            name,
            roleId,
            bio,
            imageUrl: imageUrl || null,
            linkedin: linkedin || null,
            twitter: twitter || null,
            instagram: instagram || null,
            email: email || null,
        },
    });

    revalidatePath('/members');
    revalidatePath('/console-2024');
    redirect('/console-2024');
}

export async function deleteMember(id: number) {
    await prisma.member.delete({
        where: { id },
    });

    revalidatePath('/members');
    revalidatePath('/console-2024');
}

export async function updateMember(id: number, formData: FormData) {
    const name = formData.get('name') as string;
    const roleId = parseInt(formData.get('roleId') as string);
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
            roleId,
            bio,
            imageUrl: imageUrl || null,
            linkedin: linkedin || null,
            twitter: twitter || null,
            instagram: instagram || null,
            email: email || null,
        },
    });

    revalidatePath('/members');
    revalidatePath('/console-2024');
    redirect('/console-2024');
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

    // Translate content
    const titleTranslations = await translateContent(title);
    const descriptionTranslations = await translateContent(description);
    const locationTranslations = await translateContent(location);

    await prisma.event.create({
        data: {
            title,
            titleTranslations,
            description,
            descriptionTranslations,
            date,
            status,
            location,
            locationTranslations,
            imageUrl: imageUrl || null,
            registrationLink: registrationLink || null,
        },
    });

    revalidatePath('/');
    revalidatePath('/console-2024');
    redirect('/console-2024');
}

export async function updateEvent(id: number, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = new Date(formData.get('date') as string);
    const location = formData.get('location') as string;
    const imageUrl = transformGoogleDriveUrl(formData.get('imageUrl') as string);
    const status = formData.get('status') as string;
    const registrationLink = formData.get('registrationLink') as string;

    // Translate content
    const titleTranslations = await translateContent(title);
    const descriptionTranslations = await translateContent(description);
    const locationTranslations = await translateContent(location);

    await prisma.event.update({
        where: { id },
        data: {
            title,
            titleTranslations,
            description,
            descriptionTranslations,
            date,
            status,
            location,
            locationTranslations,
            imageUrl: imageUrl || null,
            registrationLink: registrationLink || null,
        },
    });

    revalidatePath('/');
    revalidatePath('/console-2024');
    redirect('/console-2024');
}

export async function deleteEvent(id: number) {
    await prisma.event.delete({
        where: { id },
    });

    revalidatePath('/');
    revalidatePath('/console-2024');
}

// --- News ---

export async function createNews(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageUrl = transformGoogleDriveUrl(formData.get('imageUrl') as string);
    const date = new Date(formData.get('date') as string);
    const photos = formData.get('photos') as string || '[]';

    // Translate content
    const titleTranslations = await translateContent(title);
    const contentTranslations = await translateContent(content);

    await prisma.news.create({
        data: {
            title,
            titleTranslations,
            content,
            contentTranslations,
            imageUrl: imageUrl || null,
            date: date || new Date(),
            photos,
        },
    });

    revalidatePath('/');
    revalidatePath('/console-2024');
    redirect('/console-2024');
}

export async function updateNews(id: number, formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageUrl = transformGoogleDriveUrl(formData.get('imageUrl') as string);
    const date = new Date(formData.get('date') as string);
    const photos = formData.get('photos') as string || '[]';

    // Translate content
    const titleTranslations = await translateContent(title);
    const contentTranslations = await translateContent(content);

    await prisma.news.update({
        where: { id },
        data: {
            title,
            titleTranslations,
            content,
            contentTranslations,
            imageUrl: imageUrl || null,
            date: date || new Date(),
            photos,
        },
    });

    revalidatePath('/');
    revalidatePath('/console-2024');
    redirect('/console-2024');
}

export async function deleteNews(id: number) {
    await prisma.news.delete({
        where: { id },
    });

    revalidatePath('/');
    revalidatePath('/console-2024');
}

// --- Roles ---

export async function createRole(formData: FormData) {
    const name = formData.get('name') as string;
    const nameTr = formData.get('nameTr') as string;
    const order = parseInt(formData.get('order') as string) || 0;

    // Translate content
    const nameTranslations = await translateContent(nameTr || name);

    await prisma.role.create({
        data: {
            name,
            nameTr,
            nameTranslations,
            order,
        },
    });

    revalidatePath('/console-2024');
    revalidatePath('/members');
    redirect('/console-2024/roles');
}

export async function updateRole(id: number, formData: FormData) {
    const name = formData.get('name') as string;
    const nameTr = formData.get('nameTr') as string;
    const order = parseInt(formData.get('order') as string) || 0;

    // Translate content
    const nameTranslations = await translateContent(nameTr || name);

    await prisma.role.update({
        where: { id },
        data: {
            name,
            nameTr,
            nameTranslations,
            order,
        },
    });

    revalidatePath('/console-2024');
    revalidatePath('/members');
    redirect('/console-2024/roles');
}

export async function deleteRole(id: number) {
    // Check if any members have this role
    const count = await prisma.member.count({
        where: { roleId: id },
    });

    if (count > 0) {
        throw new Error(`Bu rol ${count} üyeye atanmış. Önce üyeleri başka bir role taşıyın.`);
    }

    await prisma.role.delete({
        where: { id },
    });

    revalidatePath('/console-2024');
    revalidatePath('/members');
}
