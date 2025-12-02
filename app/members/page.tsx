import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Starfield from '../../components/Starfield';

const prisma = new PrismaClient();

export const revalidate = 0; // Disable caching for this page to see admin updates immediately

async function getMembers() {
    return await prisma.member.findMany({
        include: {
            role: true,
        },
        orderBy: { id: 'asc' },
    });
}

async function getRoles() {
    return await prisma.role.findMany({
        orderBy: { order: 'asc' },
    });
}

export default async function MembersPage() {
    const members = await getMembers();
    const roles = await getRoles();

    // Group members by role
    const membersByRole = roles.map(role => ({
        role,
        members: members.filter(m => m.roleId === role.id)
    })).filter(group => group.members.length > 0);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/90 via-primary/95 to-background z-0" />
                <div className="absolute inset-0 bg-grid-pattern z-0 opacity-30" />

                {/* Starfield */}
                <Starfield />

                {/* Ambient Blobs */}
                <div className="absolute top-20 -left-4 w-96 h-96 bg-purple-500 blob-shape animate-blob z-10"></div>
                <div className="absolute top-40 -right-4 w-96 h-96 bg-accent blob-shape animate-blob animation-delay-2000 z-10"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-600 blob-shape animate-blob animation-delay-4000 z-10"></div>
            </div>

            <div className="members-page-wrapper relative z-10">
                <div className="page-header">
                    <h1 className="page-title">
                        Topluluğumuz
                    </h1>
                    <p className="page-subtitle">
                        Haliç CODE'u mümkün kılan özverili bireylerle tanışın.
                    </p>
                </div>

                <div className="space-y-20">
                    {/* Dynamic Role Sections */}
                    {membersByRole.map(({ role, members }) => (
                        <section key={role.id} className="role-section">
                            <h2 className={role.order === 1 ? "role-title" : "role-title-secondary"}>
                                {role.nameTr}
                            </h2>
                            <div className={role.order === 1 ? "members-grid-heads" : "members-grid-regular"}>
                                {members.map((member) => (
                                    <MemberCard key={member.id} member={member} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MemberCard({ member }: { member: any }) {
    return (
        <div className="member-card group">
            <div className="member-image-wrapper">
                {member.imageUrl ? (
                    <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="member-image"
                    />
                ) : (
                    <div className="member-placeholder">
                        <svg
                            className="w-20 h-20 text-gray-600 group-hover:text-accent/50 transition-colors"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                )}
            </div>

            <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role.nameTr}</p>
            </div>

            {/* Full Card Overlay on Hover */}
            <div className="member-overlay flex-col text-center p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-accent text-sm mb-4">{member.role.nameTr}</p>

                {member.bio && (
                    <p className="text-gray-300 text-sm mb-4 line-clamp-4">
                        {member.bio}
                    </p>
                )}

                <div className="flex flex-wrap justify-center gap-4 mt-auto">
                    {member.email && (
                        <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-white transition-colors" title="Email">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </a>
                    )}
                    {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors" title="LinkedIn">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                    )}
                    {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-colors" title="Twitter">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                        </a>
                    )}
                    {member.instagram && (
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors" title="Instagram">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
