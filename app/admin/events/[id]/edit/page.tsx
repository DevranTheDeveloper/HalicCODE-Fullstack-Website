import { updateEvent } from '../../../../actions';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const eventId = parseInt(id);

    if (isNaN(eventId)) {
        notFound();
    }

    const event = await prisma.event.findUnique({
        where: { id: eventId },
    });

    if (!event) {
        notFound();
    }

    const updateEventWithId = updateEvent.bind(null, eventId);

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <Link href="/admin" className="text-accent hover:text-accent-hover text-sm mb-2 inline-block">
                    &larr; Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-white">Edit Event</h1>
            </div>

            <form action={updateEventWithId} className="space-y-6 bg-primary-light p-8 rounded-xl border border-gray-800">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                        Event Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={event.title}
                        required
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        required
                        rows={3}
                        defaultValue={event.description}
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            required
                            defaultValue={event.date.toISOString().split('T')[0]}
                            className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            id="status"
                            required
                            defaultValue={event.status}
                            className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        >
                            <option value="Active">Active</option>
                            <option value="Future">Future</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                        Location (Optional)
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        defaultValue={event.location || ''}
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
                        Image URL (Optional)
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        id="imageUrl"
                        defaultValue={event.imageUrl || ''}
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        Update Event
                    </button>
                </div>
            </form>
        </div>
    );
}
