# OpenNext CloudFlare Sample

## Introduction

> [!WARNING]
> OpenNext doesn't work on Windows environments. For Windows users, please use WSL or another virtual machine.

## using tools
   - [Node.js](https://nodejs.org/en/) - JavaScript runtime
   - [npm](https://www.npmjs.com/) - package manager for JavaScript
   - [wrangler](https://developers.cloudflare.com/workers/wrangler/) - CLI tool for Cloudflare Workers
   - [OpenNext](https://opennext.js.org/) - Framework for building applications on Cloudflare Workers

## install 
1. run these command.
```
git clone https://github.com/nk4dev/opennext-sample.git

cd opennext-sample

npm install
```

2. create wrangler.jsonc
```wrangler.jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "<YOUR_WORKER_NAME>",
  "compatibility_date": "2024-12-30",
  "compatibility_flags": [
    // Enable Node.js API
    // see https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag
    "nodejs_compat",
    // Allow to fetch URLs in your app
    // see https://developers.cloudflare.com/workers/configuration/compatibility-flags/#global-fetch-strictly-public
    "global_fetch_strictly_public",
  ],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS",
  },
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      // The service should match the "name" of your worker
      "service": "<YOUR_WORKER_NAME>",
    },
  ],
  "r2_buckets": [
    // Create a R2 binding with the binding name "NEXT_INC_CACHE_R2_BUCKET"
    // {
    //   "binding": "NEXT_INC_CACHE_R2_BUCKET",
    //   "bucket_name": "<BUCKET_NAME>",
    // },
  ],
}
```

3. create .dev.vars
```.dev.vars
NEXTJS_ENV=development
```
## commands
- debug
```
npm run dev
```

- preview with opennext
```
npm run pewview
```
## docs 
OpenNext CloudFlare docs   
https://opennext.js.org/cloudflare/get-started

CloudFlare Wrangler docs   
https://developers.cloudflare.com/workers/wrangler

CloudFlare Workers docs   
https://developers.cloudflare.com/workers/