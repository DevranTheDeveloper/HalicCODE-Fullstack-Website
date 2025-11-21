import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { deleteMember, deleteEvent } from '../actions';

const prisma = new PrismaClient();

export const revalidate = 0;

async function getData() {
    const members = await prisma.member.findMany({ orderBy: { id: 'desc' } });
    const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
    return { members, events };
}

import LogoutButton from '../../components/LogoutButton';

// ... imports

export default async function AdminPage() {
    const { members, events } = await getData();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-12 border-b border-gray-800 pb-4">
                <h1 className="text-3xl font-bold text-white">
                    Admin Dashboard
                </h1>
                <LogoutButton />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Members Management */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Members ({members.length})</h2>
                        <Link
                            href="/admin/members/add"
                            className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            + Add Member
                        </Link>
                    </div>

                    <div className="bg-primary-light rounded-xl border border-gray-800 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="bg-gray-800/50 text-gray-200 uppercase font-medium">
                                    <tr>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">Role</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {members.map((member) => (
                                        <tr key={member.id} className="hover:bg-gray-800/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">{member.name}</td>
                                            <td className="px-6 py-4">{member.role}</td>
                                            <td className="px-6 py-4 text-right flex justify-end gap-3">
                                                <Link
                                                    href={`/admin/members/${member.id}/edit`}
                                                    className="text-accent hover:text-accent-hover transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <form action={deleteMember.bind(null, member.id)}>
                                                    <button className="text-red-400 hover:text-red-300 transition-colors">
                                                        Delete
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))}
                                    {members.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                                No members found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Events Management */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Events ({events.length})</h2>
                        <Link
                            href="/admin/events/add"
                            className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            + Add Event
                        </Link>
                    </div>

                    <div className="bg-primary-light rounded-xl border border-gray-800 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="bg-gray-800/50 text-gray-200 uppercase font-medium">
                                    <tr>
                                        <th className="px-6 py-3">Title</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {events.map((event) => (
                                        <tr key={event.id} className="hover:bg-gray-800/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">{event.title}</td>
                                            <td className="px-6 py-4">
                                                {new Date(event.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${event.status === 'Active'
                                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                    : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                                    }`}>
                                                    {event.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right flex justify-end gap-3">
                                                <Link
                                                    href={`/admin/events/${event.id}/edit`}
                                                    className="text-accent hover:text-accent-hover transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <form action={deleteEvent.bind(null, event.id)}>
                                                    <button className="text-red-400 hover:text-red-300 transition-colors">
                                                        Delete
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))}
                                    {events.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                                No events found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
