const nextConfig= {
    outputFileTracingIncludes: {
    "*": [
      "node_modules/@emotion/react/**/*",
      "node_modules/@emotion/styled/**/*", 
      "node_modules/@emotion/utils/**/*",
      "node_modules/@emotion/use-insertion-effect-with-fallbacks/**/*"
    ]
  }
};
 
export default nextConfig;
 
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();