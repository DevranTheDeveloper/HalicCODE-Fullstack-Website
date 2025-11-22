import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { createRole } from '../../../actions';

const prisma = new PrismaClient();

export default async function AddRolePage() {
    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/console-2024" className="text-accent hover:text-accent-hover mb-6 inline-block">
                    ← Panele Dön
                </Link>

                <div className="bg-primary-light border border-gray-800 rounded-xl p-8">
                    <h1 className="text-2xl font-bold text-white mb-6">Yeni Rol Ekle</h1>

                    <form action={createRole} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-white font-medium mb-2">
                                Rol Adı (İngilizce)
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                placeholder="örn: Developer"
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
                                required
                                placeholder="örn: Geliştirici"
                                className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="order" className="block text-white font-medium mb-2">
                                Sıralama (Küçükten büyüğe)
                            </label>
                            <input
                                type="number"
                                name="order"
                                id="order"
                                min="0"
                                defaultValue="5"
                                required
                                className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            />
                            <p className="text-sm text-gray-400 mt-1">
                                Düşük sayı = Üstte gösterilir (örn: Lider=1, Üye=4)
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-lg font-medium transition-colors"
                        >
                            Rol Ekle
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
