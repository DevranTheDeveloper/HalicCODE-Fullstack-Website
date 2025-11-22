import { createMember } from '../../../actions';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

async function getRoles() {
    return await prisma.role.findMany({
        orderBy: { order: 'asc' }
    });
}

export default async function AddMemberPage() {
    const roles = await getRoles();

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <Link href="/console-2024" className="text-accent hover:text-accent-hover text-sm mb-2 inline-block">
                    ← Panele Dön
                </Link>
                <h1 className="text-3xl font-bold text-white">Yeni Üye Ekle</h1>
            </div>

            <form action={createMember} className="space-y-6 bg-primary-light p-8 rounded-xl border border-gray-800">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Ad Soyad
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="örn: Ahmet Yılmaz"
                    />
                </div>

                <div>
                    <label htmlFor="roleId" className="block text-sm font-medium text-gray-300 mb-1">
                        Rol
                    </label>
                    <select
                        name="roleId"
                        id="roleId"
                        required
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Rol seçiniz...</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.nameTr} ({role.name})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
                        Resim URL (Opsiyonel)
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        id="imageUrl"
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="https://..."
                    />
                </div>

                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                        Biyografi (Opsiyonel)
                    </label>
                    <textarea
                        name="bio"
                        id="bio"
                        rows={3}
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="Kısa biyografi..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            E-posta (Opsiyonel)
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            placeholder="ahmet@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="instagram" className="block text-sm font-medium text-gray-300 mb-1">
                            Instagram URL (Opsiyonel)
                        </label>
                        <input
                            type="url"
                            name="instagram"
                            id="instagram"
                            className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            placeholder="https://instagram.com/..."
                        />
                    </div>
                    <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300 mb-1">
                            LinkedIn URL (Opsiyonel)
                        </label>
                        <input
                            type="url"
                            name="linkedin"
                            id="linkedin"
                            className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>
                    <div>
                        <label htmlFor="twitter" className="block text-sm font-medium text-gray-300 mb-1">
                            Twitter URL (Opsiyonel)
                        </label>
                        <input
                            type="url"
                            name="twitter"
                            id="twitter"
                            className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            placeholder="https://twitter.com/..."
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        Üye Ekle
                    </button>
                </div>
            </form>
        </div>
    );
}
