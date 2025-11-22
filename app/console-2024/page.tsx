import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { deleteMember, deleteEvent, deleteNews } from '../actions';
import LogoutButton from '../../components/LogoutButton';

const prisma = new PrismaClient();

export const revalidate = 0;

async function getData() {
    const members = await prisma.member.findMany({
        include: { role: true },
        orderBy: { id: 'desc' }
    });
    const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
    const news = await prisma.news.findMany({ orderBy: { date: 'desc' } });
    return { members, events, news };
}

export default async function AdminPage() {
    const { members, events, news } = await getData();
    const roles = await prisma.role.findMany();

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white">Yönetim Paneli</h1>
                    <LogoutButton />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Link
                        href="/console-2024/roles"
                        className="bg-primary-light border border-gray-800 rounded-xl p-6 hover:border-accent transition-colors"
                    >
                        <h2 className="text-xl font-bold text-white mb-2">Roller</h2>
                        <p className="text-4xl font-bold text-accent mb-1">{roles.length}</p>
                        <p className="text-gray-400 text-sm">Rol yönetimi →</p>
                    </Link>

                    <div className="bg-primary-light border border-gray-800 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-2">Üyeler</h2>
                        <p className="text-4xl font-bold text-accent mb-1">{members.length}</p>
                        <p className="text-gray-400 text-sm">Toplam üye sayısı</p>
                    </div>

                    <div className="bg-primary-light border border-gray-800 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-2">Etkinlikler</h2>
                        <p className="text-4xl font-bold text-accent mb-1">{events.length}</p>
                        <p className="text-gray-400 text-sm">Toplam etkinlik sayısı</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Members Section */}
                    <section className="bg-primary-light rounded-xl border border-gray-800 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Üyeler</h2>
                            <Link href="/console-2024/members/add" className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                + Üye Ekle
                            </Link>
                        </div>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                            {members.map((member) => (
                                <div key={member.id} className="flex items-center justify-between bg-primary-dark p-4 rounded-lg border border-gray-700">
                                    <div>
                                        <h3 className="font-bold text-white">{member.name}</h3>
                                        <p className="text-sm text-gray-400">{member.role.nameTr}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Link href={`/console-2024/members/${member.id}/edit`} className="text-blue-400 hover:text-blue-300">
                                            Düzenle
                                        </Link>
                                        <form action={deleteMember.bind(null, member.id)}>
                                            <button type="submit" className="text-red-400 hover:text-red-300">
                                                Sil
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                            {members.length === 0 && (
                                <p className="text-gray-500 text-center py-4">Üye bulunamadı.</p>
                            )}
                        </div>
                    </section>

                    {/* Events Section */}
                    <section className="bg-primary-light rounded-xl border border-gray-800 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Etkinlikler</h2>
                            <Link href="/console-2024/events/add" className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                + Etkinlik Ekle
                            </Link>
                        </div>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
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
                                        <Link href={`/console-2024/events/${event.id}/edit`} className="text-blue-400 hover:text-blue-300">
                                            Düzenle
                                        </Link>
                                        <form action={deleteEvent.bind(null, event.id)}>
                                            <button type="submit" className="text-red-400 hover:text-red-300">
                                                Sil
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                            {events.length === 0 && (
                                <p className="text-gray-500 text-center py-4">Etkinlik bulunamadı.</p>
                            )}
                        </div>
                    </section>
                </div>

                {/* News Section */}
                <section className="bg-primary-light rounded-xl border border-gray-800 p-6 mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Haberler</h2>
                        <Link href="/console-2024/news/add" className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            + Haber Ekle
                        </Link>
                    </div>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {news.map((item) => (
                            <div key={item.id} className="flex items-center justify-between bg-primary-dark p-4 rounded-lg border border-gray-700">
                                <div>
                                    <h3 className="font-bold text-white">{item.title}</h3>
                                    <p className="text-sm text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link href={`/console-2024/news/${item.id}/edit`} className="text-blue-400 hover:text-blue-300">
                                        Düzenle
                                    </Link>
                                    <form action={deleteNews.bind(null, item.id)}>
                                        <button type="submit" className="text-red-400 hover:text-red-300">
                                            Sil
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                        {news.length === 0 && (
                            <p className="text-gray-500 text-center py-4">Haber bulunamadı.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
