/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/100x200',
      },
      {
        protocol: "https",
        hostname: "byetuerqszuwilbwbduk.supabase.co",
        port: '',
        pathname: "/storage/v1/**"
      }
    ],
  },
};

export default nextConfig;
