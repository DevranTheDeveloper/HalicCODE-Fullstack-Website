import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { deleteRole } from '../../actions';

const prisma = new PrismaClient();

export const revalidate = 0;

async function getRoles() {
    return await prisma.role.findMany({
        include: {
            _count: {
                select: { members: true }
            }
        },
        orderBy: { order: 'asc' }
    });
}

export default async function RolesPage() {
    const roles = await getRoles();

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/console-2024" className="text-accent hover:text-accent-hover mb-6 inline-block">
                    ← Panele Dön
                </Link>

                <div className="bg-primary-light border border-gray-800 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-white">Rol Yönetimi</h1>
                        <Link
                            href="/console-2024/roles/add"
                            className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            + Yeni Rol Ekle
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {roles.map((role) => (
                            <div key={role.id} className="flex items-center justify-between bg-primary-dark p-4 rounded-lg border border-gray-700">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-white">{role.nameTr}</h3>
                                        <span className="text-xs text-gray-500">({role.name})</span>
                                        <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                                            Sıra: {role.order}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {role._count.members} üye
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={`/console-2024/roles/${role.id}/edit`}
                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Düzenle
                                    </Link>
                                    {role._count.members === 0 ? (
                                        <form action={deleteRole.bind(null, role.id)}>
                                            <button
                                                type="submit"
                                                className="text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                Sil
                                            </button>
                                        </form>
                                    ) : (
                                        <span className="text-gray-500 cursor-not-allowed">
                                            Sil
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}

                        {roles.length === 0 && (
                            <p className="text-gray-500 text-center py-8">
                                Henüz rol eklenmemiş.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
