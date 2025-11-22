// Role translation helper
export function translateRole(role: string): string {
    const translations: { [key: string]: string } = {
        'Head': 'Lider',
        'Social Media': 'Sosyal Medya',
        'Sponsor Finder': 'Sponsor Bulucu',
        'Member': 'Üye'
    };

    return translations[role] || role;
}
