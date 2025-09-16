const nextConfig = {
  outputFileTracingIncludes: {
    "*": [
      "node_modules/@emotion/react/**/*",
      "node_modules/@emotion/styled/**/*", 
      "node_modules/@emotion/utils/**/*",
      "node_modules/@emotion/cache/**/*",
      "node_modules/@emotion/use-insertion-effect-with-fallbacks/**/*",
      "node_modules/next-auth/**/*",
      "node_modules/next-auth/react/**/*",
      "node_modules/next-auth/providers/**/*",
      "node_modules/@panva/hkdf/**/*",
      "node_modules/jose/**/*",
      "node_modules/openid-client/**/*",
    ],
  },
  transpilePackages: ["next-auth"],
  serverExternalPackages: [
    "@emotion/cache",
    "@panva/hkdf",
    "jose", 
    "openid-client"
  ],
  experimental: {
    esmExternals: true,
  },
  // Disable problematic webpack optimizations for Cloudflare
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), '_http_common'];
    }
    
    // Fix for "Cannot read properties of undefined (reading 'custom')"
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
};
 
export default nextConfig;
 
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();