import { updateRole } from '../../../../actions';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const roleId = parseInt(id);

    if (isNaN(roleId)) {
        notFound();
    }

    const role = await prisma.role.findUnique({
        where: { id: roleId },
        include: {
            _count: {
                select: { members: true }
            }
        }
    });

    if (!role) {
        notFound();
    }

    const updateRoleWithId = updateRole.bind(null, roleId);

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/console-2024/roles" className="text-accent hover:text-accent-hover mb-6 inline-block">
                    ← Rollere Dön
                </Link>

                <div className="bg-primary-light border border-gray-800 rounded-xl p-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Rolü Düzenle</h1>
                    <p className="text-gray-400 text-sm mb-6">
                        {role._count.members} üye bu role sahip
                    </p>

                    <form action={updateRoleWithId} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-white font-medium mb-2">
                                Rol Adı (İngilizce)
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                defaultValue={role.name}
                                required
                                className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="nameTr" className="block text-white font-medium mb-2">
                                Rol Adı (Türkçe)
                            </label>
                            <input
                                type="text"
                                name="nameTr"
                                id="nameTr"
                                defaultValue={role.nameTr}
                                required
                                className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="order" className="block text-white font-medium mb-2">
                                Sıralama
                            </label>
                            <input
                                type="number"
                                name="order"
                                id="order"
                                min="0"
                                defaultValue={role.order}
                                required
                                className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            />
                            <p className="text-sm text-gray-400 mt-1">
                                Düşük sayı = Üstte gösterilir
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-lg font-medium transition-colors"
                        >
                            Rolü Güncelle
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
