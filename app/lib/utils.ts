export function transformGoogleDriveUrl(url: string): string {
    if (!url) return url;

    // Check if it's a Google Drive URL
    if (url.includes('drive.google.com')) {
        // Extract File ID
        // Patterns:
        // 1. /file/d/FILE_ID/view
        // 2. id=FILE_ID

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
            // Return the direct download/view URL that works with <Image>
            // Note: 'uc?export=view&id=' is the standard way, but sometimes Next.js Image optimization 
            // works better with 'lh3.googleusercontent.com' which is what Drive uses internally.
            // However, we can't easily get the lh3 URL without fetching.
            // The 'uc?export=view' link redirects to the actual image. 
            // Next.js image optimization might fail on redirects if not configured, 
            // but let's try the standard direct link first.
            return `https://drive.google.com/uc?export=view&id=${fileId}`;
        }
    }

    return url;
}
