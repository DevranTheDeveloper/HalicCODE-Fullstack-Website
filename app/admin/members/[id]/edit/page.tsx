import { updateMember } from '../../../../actions';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const memberId = parseInt(id);

    if (isNaN(memberId)) {
        notFound();
    }

    const member = await prisma.member.findUnique({
        where: { id: memberId },
    });

    if (!member) {
        notFound();
    }

    const updateMemberWithId = updateMember.bind(null, memberId);

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <Link href="/admin" className="text-accent hover:text-accent-hover text-sm mb-2 inline-block">
                    &larr; Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-white">Edit Member</h1>
            </div>

            <form action={updateMemberWithId} className="space-y-6 bg-primary-light p-8 rounded-xl border border-gray-800">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={member.name}
                        required
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                        Role
                    </label>
                    <select
                        name="role"
                        id="role"
                        defaultValue={member.role}
                        required
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    >
                        <option value="Member">Member</option>
                        <option value="Head">Head</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Sponsor Finder">Sponsor Finder</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
                        Image URL (Optional)
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        id="imageUrl"
                        defaultValue={member.imageUrl || ''}
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                        Bio (Optional)
                    </label>
                    <textarea
                        name="bio"
                        id="bio"
                        rows={3}
                        defaultValue={member.bio || ''}
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email (Optional)
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={member.email || ''}
                            className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="instagram" className="block text-sm font-medium text-gray-300 mb-1">
                            Instagram URL (Optional)
                        </label>
                        <input
                            type="url"
                            name="instagram"
                            id="instagram"
                            defaultValue={member.instagram || ''}
                            className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            placeholder="https://instagram.com/..."
                        />
                    </div>
                    <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300 mb-1">
                            LinkedIn URL (Optional)
                        </label>
                        <input
                            type="url"
                            name="linkedin"
                            id="linkedin"
                            defaultValue={member.linkedin || ''}
                            className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>
                    <div>
                        <label htmlFor="twitter" className="block text-sm font-medium text-gray-300 mb-1">
                            Twitter URL (Optional)
                        </label>
                        <input
                            type="url"
                            name="twitter"
                            id="twitter"
                            defaultValue={member.twitter || ''}
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
                        Update Member
                    </button>
                </div>
            </form>
        </div>
    );
}
