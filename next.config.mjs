/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
    'lh3.googleusercontent.com',
    'developers.google.com',
    'upload.wikimedia.org',
    'firebasestorage.googleapis.com'
  ],
  },
  compress: true,
  matcher: ["/:pages*"],
};

export default nextConfig;
