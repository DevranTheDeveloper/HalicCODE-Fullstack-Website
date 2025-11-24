import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Google Services
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },

      // GitHub
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
      },

      // Unsplash
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },

      // Instagram
      {
        protocol: 'https',
        hostname: 'instagram.com',
      },
      {
        protocol: 'https',
        hostname: 'cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent-dus1-1.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com', // Wildcard for all CDN regions
      },

      // Facebook
      {
        protocol: 'https',
        hostname: 'scontent.xx.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: '**.fbcdn.net', // Wildcard for all Facebook CDNs
      },

      // LinkedIn
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'media-exp1.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'static.licdn.com',
      },

      // Twitter
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'abs.twimg.com',
      },

      // Cloudinary
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },

      // Imgur
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'imgur.com',
      },

      // Image Proxy
      {
        protocol: 'https',
        hostname: 'wsrv.nl',
      },

      // Other CDNs
      {
        protocol: 'https',
        hostname: 'imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'imgix.net',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net', // Contentful
      },

      // AWS & Cloud Storage
      {
        protocol: 'https',
        hostname: '**.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net', // AWS CloudFront
      },

      // Others
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
      {
        protocol: 'https',
        hostname: 'media.discordapp.net',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // YouTube thumbnails
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com', // YouTube profile pics
      },
    ],
  },
};

export default nextConfig;

