/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Sheet images (Google Drive, Cloudinary, etc.) are optimized + cached by
    // Next.js after first load. "**" allows any HTTPS host so owners can paste
    // any public image URL. To lock this down, replace with specific hosts,
    // e.g. { protocol: "https", hostname: "**.googleusercontent.com" }.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};
export default nextConfig;
