/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    webpack: (config) => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    }
};

export default nextConfig;
