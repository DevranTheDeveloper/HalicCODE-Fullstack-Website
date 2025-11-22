import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { deleteMember, deleteEvent, deleteNews } from '../actions';
import LogoutButton from '../../components/LogoutButton';

const prisma = new PrismaClient();

export const revalidate = 0;

async function getData() {
    const members = await prisma.member.findMany({ orderBy: { id: 'desc' } });
    const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
    const news = await prisma.news.findMany({ orderBy: { date: 'desc' } });
    return { members, events, news };
}

export default async function AdminPage() {
    const { members, events, news } = await getData();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                        View Site
                    </Link>
                    <LogoutButton />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Members Section */}
                <section className="bg-primary-light rounded-xl border border-gray-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Members</h2>
                        <Link href="/admin/members/add" className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            + Add Member
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {members.map((member) => (
                            <div key={member.id} className="flex items-center justify-between bg-primary-dark p-4 rounded-lg border border-gray-700">
                                <div>
                                    <h3 className="font-bold text-white">{member.name}</h3>
                                    <p className="text-sm text-gray-400">{member.role}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link href={`/admin/members/${member.id}/edit`} className="text-blue-400 hover:text-blue-300">
                                        Edit
                                    </Link>
                                    <form action={deleteMember.bind(null, member.id)}>
                                        <button type="submit" className="text-red-400 hover:text-red-300">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                        {members.length === 0 && (
                            <p className="text-gray-500 text-center py-4">No members found.</p>
                        )}
                    </div>
                </section>

                {/* Events Section */}
                <section className="bg-primary-light rounded-xl border border-gray-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Events</h2>
                        <Link href="/admin/events/add" className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            + Add Event
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {events.map((event) => (
                            <div key={event.id} className="flex items-center justify-between bg-primary-dark p-4 rounded-lg border border-gray-700">
                                <div>
                                    <h3 className="font-bold text-white">{event.title}</h3>
                                    <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString()}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${event.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                        {event.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link href={`/admin/events/${event.id}/edit`} className="text-blue-400 hover:text-blue-300">
                                        Edit
                                    </Link>
                                    <form action={deleteEvent.bind(null, event.id)}>
                                        <button type="submit" className="text-red-400 hover:text-red-300">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                        {events.length === 0 && (
                            <p className="text-gray-500 text-center py-4">No events found.</p>
                        )}
                    </div>
                </section>

                {/* News Section */}
                <section className="bg-primary-light rounded-xl border border-gray-800 p-6 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">CODE Haberler</h2>
                        <Link href="/admin/news/add" className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            + Add News
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {news.map((item) => (
                            <div key={item.id} className="flex items-center justify-between bg-primary-dark p-4 rounded-lg border border-gray-700">
                                <div>
                                    <h3 className="font-bold text-white">{item.title}</h3>
                                    <p className="text-sm text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link href={`/admin/news/${item.id}/edit`} className="text-blue-400 hover:text-blue-300">
                                        Edit
                                    </Link>
                                    <form action={deleteNews.bind(null, item.id)}>
                                        <button type="submit" className="text-red-400 hover:text-red-300">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                        {news.length === 0 && (
                            <p className="text-gray-500 text-center py-4">No news items yet.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
