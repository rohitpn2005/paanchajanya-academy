/** @type {import('next').NextConfig} */
// Static build for free hosting on Cloudflare Pages (commercial use allowed).
// Sheet content is read at build time and baked in; rebuild to publish edits.
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
};
export default nextConfig;
