import path from "path"

const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
   eslint: {
    ignoreDuringBuilds: true,
  }
  ,
  reactStrictMode: false,
  // removeConsole: true
}
 
export default nextConfig