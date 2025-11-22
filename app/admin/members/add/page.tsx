import { createMember } from '../../../actions';
import Link from 'next/link';

export default function AddMemberPage() {
    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <Link href="/admin" className="text-accent hover:text-accent-hover text-sm mb-2 inline-block">
                    &larr; Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-white">Add New Member</h1>
            </div>

            <form action={createMember} className="space-y-6 bg-primary-light p-8 rounded-xl border border-gray-800">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="e.g. John Doe"
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                        Role
                    </label>
                    <select
                        name="role"
                        id="role"
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
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="https://..."
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
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="Short bio..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300 mb-1">
                            LinkedIn URL (Optional)
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
                            Twitter URL (Optional)
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
                        Create Member
                    </button>
                </div>
            </form>
        </div>
    );
}
