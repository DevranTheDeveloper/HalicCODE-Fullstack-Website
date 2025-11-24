export function transformGoogleDriveUrl(url: string): string {
    if (!url) return url;

    // Check if it's a Google Drive URL
    if (url.includes('drive.google.com')) {
        // Extract File ID
        let fileId = '';
        const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);

        if (fileIdMatch && fileIdMatch[1]) {
            fileId = fileIdMatch[1];
        } else {
            const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            if (idParamMatch && idParamMatch[1]) {
                fileId = idParamMatch[1];
            }
        }

        if (fileId) {
            return `https://drive.google.com/uc?export=view&id=${fileId}`;
        }
    }

    // Check if it's already a CDN or direct image URL (these usually work fine)
    const directImageDomains = [
        'cloudinary.com',
        'unsplash.com',
        'images.unsplash.com',
        'cdn.',
        'imgur.com',
        'i.imgur.com',
        'githubusercontent.com',
        'imagekit.io',
        'imgix.net'
    ];

    const isDirectImage = directImageDomains.some(domain => url.includes(domain));

    if (isDirectImage) {
        return url;
    }

    // For other URLs (Google Images, random sites, etc.), use a CORS proxy
    // wsrv.nl is a free image proxy that helps bypass CORS and hotlink protection
    // It also optimizes images automatically
    try {
        const encodedUrl = encodeURIComponent(url);
        return `https://wsrv.nl/?url=${encodedUrl}`;
    } catch (error) {
        // If encoding fails, return original URL
        return url;
    }
}
