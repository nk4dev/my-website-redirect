const nextConfig= {
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
  ]
};
 
export default nextConfig;
 
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();