globalThis.monorepoPackagePath = "";globalThis.openNextDebug = true;globalThis.openNextVersion = "3.7.6";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod3) => function __require2() {
  return mod3 || (0, cb[__getOwnPropNames(cb)[0]])((mod3 = { exports: {} }).exports, mod3), mod3.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod3, secondTarget) => (__copyProps(target, mod3, "default"), secondTarget && __copyProps(secondTarget, mod3, "default"));
var __toESM = (mod3, isNodeMode, target) => (target = mod3 != null ? __create(__getProtoOf(mod3)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod3 || !mod3.__esModule ? __defProp(target, "default", { value: mod3, enumerable: true }) : target,
  mod3
));
var __toCommonJS = (mod3) => __copyProps(__defProp({}, "__esModule", { value: true }), mod3);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var IgnorableError, FatalError;
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
    IgnorableError = class extends Error {
      __openNextInternal = true;
      canIgnore = true;
      logLevel = 0;
      constructor(message) {
        super(message);
        this.name = "IgnorableError";
      }
    };
    FatalError = class extends Error {
      __openNextInternal = true;
      canIgnore = false;
      logLevel = 2;
      constructor(message) {
        super(message);
        this.name = "FatalError";
      }
    };
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var parseHeaders, convertHeader;
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    parseHeaders = (headers) => {
      const result = {};
      if (!headers) {
        return result;
      }
      for (const [key, value] of Object.entries(headers)) {
        if (value === void 0) {
          continue;
        }
        result[key.toLowerCase()] = convertHeader(value);
      }
      return result;
    };
    convertHeader = (header) => {
      if (typeof header === "string") {
        return header;
      }
      if (Array.isArray(header)) {
        return header.join(",");
      }
      return String(header);
    };
  }
});

// node-built-in-modules:node:module
var node_module_exports = {};
import * as node_module_star from "node:module";
var init_node_module = __esm({
  "node-built-in-modules:node:module"() {
    __reExport(node_module_exports, node_module_star);
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { Readable } from "node:stream";
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return Readable.toWeb(Readable.from([Buffer.from("SOMETHING")]));
  }
  return Readable.toWeb(Readable.from([]));
}
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse2;
    exports.serialize = serialize;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse2(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const body = await event.arrayBuffer();
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body: shouldHaveBody ? Buffer2.from(body) : void 0,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-node.js
var cloudflare_node_exports = {};
__export(cloudflare_node_exports, {
  default: () => cloudflare_node_default
});
import { Writable } from "node:stream";
var NULL_BODY_STATUSES2, handler, cloudflare_node_default;
var init_cloudflare_node = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-node.js"() {
    NULL_BODY_STATUSES2 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    handler = async (handler3, converter2) => async (request, env, ctx, abortSignal) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const url = new URL(request.url);
      const { promise: promiseResponse, resolve: resolveResponse } = Promise.withResolvers();
      const streamCreator = {
        writeHeaders(prelude) {
          const { statusCode, cookies, headers } = prelude;
          const responseHeaders = new Headers(headers);
          for (const cookie of cookies) {
            responseHeaders.append("Set-Cookie", cookie);
          }
          if (url.hostname === "localhost") {
            responseHeaders.set("Content-Encoding", "identity");
          }
          const { readable, writable } = new TransformStream({
            transform(chunk, controller) {
              controller.enqueue(Uint8Array.from(chunk.chunk ?? chunk));
            }
          });
          const body = NULL_BODY_STATUSES2.has(statusCode) ? null : readable;
          const response = new Response(body, {
            status: statusCode,
            headers: responseHeaders
          });
          resolveResponse(response);
          return Writable.fromWeb(writable);
        },
        // This is for passing along the original abort signal from the initial Request you retrieve in your worker
        // Ensures that the response we pass to NextServer is aborted if the request is aborted
        // By doing this `request.signal.onabort` will work in route handlers
        abortSignal
      };
      ctx.waitUntil(handler3(internalEvent, {
        streamCreator,
        waitUntil: ctx.waitUntil.bind(ctx)
      }));
      return promiseResponse;
    };
    cloudflare_node_default = {
      wrapper: handler,
      name: "cloudflare-node",
      supportStreaming: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/tagCache/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var dummyTagCache, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/tagCache/dummy.js"() {
    dummyTagCache = {
      name: "dummy",
      mode: "original",
      getByPath: async () => {
        return [];
      },
      getByTag: async () => {
        return [];
      },
      getLastModified: async (_, lastModified) => {
        return lastModified ?? Date.now();
      },
      writeTags: async () => {
        return;
      }
    };
    dummy_default = dummyTagCache;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/queue/dummy.js
var dummy_exports2 = {};
__export(dummy_exports2, {
  default: () => dummy_default2
});
var dummyQueue, dummy_default2;
var init_dummy2 = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/queue/dummy.js"() {
    init_error();
    dummyQueue = {
      name: "dummy",
      send: async () => {
        throw new FatalError("Dummy queue is not implemented");
      }
    };
    dummy_default2 = dummyQueue;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/incrementalCache/dummy.js
var dummy_exports3 = {};
__export(dummy_exports3, {
  default: () => dummy_default3
});
var dummyIncrementalCache, dummy_default3;
var init_dummy3 = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/incrementalCache/dummy.js"() {
    init_error();
    dummyIncrementalCache = {
      name: "dummy",
      get: async () => {
        throw new IgnorableError('"Dummy" cache does not cache anything');
      },
      set: async () => {
        throw new IgnorableError('"Dummy" cache does not cache anything');
      },
      delete: async () => {
        throw new IgnorableError('"Dummy" cache does not cache anything');
      }
    };
    dummy_default3 = dummyIncrementalCache;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports4 = {};
__export(dummy_exports4, {
  default: () => dummy_default4
});
var resolver, dummy_default4;
var init_dummy4 = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default4 = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/cdnInvalidation/dummy.js
var dummy_exports5 = {};
__export(dummy_exports5, {
  default: () => dummy_default5
});
var dummy_default5;
var init_dummy5 = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/cdnInvalidation/dummy.js"() {
    dummy_default5 = {
      name: "dummy",
      invalidatePaths: (_) => {
        return Promise.resolve();
      }
    };
  }
});

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.js", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/mnt/c/Users/nknig/_varius/blog-shorter", "experimental": { "useSkewCookie": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "clientParamParsing": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 11, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "viewTransition": false, "routerBFCache": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "cacheComponents": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "devtoolSegmentExplorer": true, "browserDebugInfoInTerminal": false, "optimizeRouterScrolling": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.js", "outputFileTracingIncludes": { "*": ["node_modules/@emotion/react/**/*", "node_modules/@emotion/styled/**/*", "node_modules/@emotion/utils/**/*", "node_modules/@emotion/cache/**/*", "node_modules/@emotion/use-insertion-effect-with-fallbacks/**/*", "node_modules/next-auth/**/*", "node_modules/next-auth/react/**/*", "node_modules/next-auth/providers/**/*", "node_modules/@panva/hkdf/**/*", "node_modules/jose/**/*", "node_modules/openid-client/**/*"] }, "transpilePackages": ["next-auth"], "serverExternalPackages": ["@emotion/cache", "@panva/hkdf", "jose", "openid-client"], "turbopack": { "root": "/mnt/c/Users/nknig/_varius/blog-shorter" } };
var BuildId = "X0hyJxXO_xuRT-Tl9EXdI";
var HtmlPages = ["/", "/layout/main", "/url/create", "/user/signin", "/user/signup", "/404"];
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/layout/main", "regex": "^/layout/main(?:/)?$", "routeKeys": {}, "namedRegex": "^/layout/main(?:/)?$" }, { "page": "/url/create", "regex": "^/url/create(?:/)?$", "routeKeys": {}, "namedRegex": "^/url/create(?:/)?$" }, { "page": "/user/dash", "regex": "^/user/dash(?:/)?$", "routeKeys": {}, "namedRegex": "^/user/dash(?:/)?$" }, { "page": "/user/signin", "regex": "^/user/signin(?:/)?$", "routeKeys": {}, "namedRegex": "^/user/signin(?:/)?$" }, { "page": "/user/signup", "regex": "^/user/signup(?:/)?$", "routeKeys": {}, "namedRegex": "^/user/signup(?:/)?$" }], "dynamic": [{ "page": "/api/auth/[...nextauth]", "regex": "^/api/auth/(.+?)(?:/)?$", "routeKeys": { "nxtPnextauth": "nxtPnextauth" }, "namedRegex": "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$" }], "data": { "static": [{ "page": "/user/dash", "dataRouteRegex": "^/_next/data/X0hyJxXO_xuRT\\-Tl9EXdI/user/dash\\.json$" }], "dynamic": [] } }, "locales": [] };
var MiddlewareManifest = { "version": 3, "middleware": {}, "functions": {}, "sortedMiddleware": [] };
var AppPathRoutesManifest = {};
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/api/delete": "pages/api/delete.js", "/_error": "pages/_error.js", "/api/redirect": "pages/api/redirect.js", "/": "pages/index.html", "/api/auth/signup": "pages/api/auth/signup.js", "/layout/main": "pages/layout/main.html", "/api/shorter": "pages/api/shorter.js", "/url/create": "pages/url/create.html", "/user/signin": "pages/user/signin.html", "/user/signup": "pages/user/signup.html", "/api/auth/[...nextauth]": "pages/api/auth/[...nextauth].js", "/_document": "pages/_document.js", "/user/dash": "pages/user/dash.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/@opennextjs/aws/dist/core/createMainHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/adapters/util.js
function setNodeEnv() {
  const processEnv = process.env;
  processEnv.NODE_ENV = process.env.NODE_ENV ?? "production";
}
function generateUniqueId() {
  return Math.random().toString(36).slice(2, 8);
}

// node_modules/@opennextjs/aws/dist/core/requestHandler.js
import { AsyncLocalStorage } from "node:async_hooks";

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";
var SET_COOKIE_HEADER = "set-cookie";
var CANNOT_BE_USED = "This cannot be used in OpenNext";
var OpenNextNodeResponse = class extends Transform {
  fixHeaders;
  onEnd;
  streamCreator;
  initialHeaders;
  statusCode;
  statusMessage = "";
  headers = {};
  _cookies = [];
  responseStream;
  headersSent = false;
  _chunks = [];
  // To comply with the ServerResponse interface :
  strictContentLength = false;
  assignSocket(_socket) {
    throw new Error(CANNOT_BE_USED);
  }
  detachSocket(_socket) {
    throw new Error(CANNOT_BE_USED);
  }
  // We might have to revisit those 3 in the future
  writeContinue(_callback) {
    throw new Error(CANNOT_BE_USED);
  }
  writeEarlyHints(_hints, _callback) {
    throw new Error(CANNOT_BE_USED);
  }
  writeProcessing() {
    throw new Error(CANNOT_BE_USED);
  }
  /**
   * This is a dummy request object to comply with the ServerResponse interface
   * It will never be defined
   */
  req;
  chunkedEncoding = false;
  shouldKeepAlive = true;
  useChunkedEncodingByDefault = true;
  sendDate = false;
  connection = null;
  socket = null;
  setTimeout(_msecs, _callback) {
    throw new Error(CANNOT_BE_USED);
  }
  addTrailers(_headers) {
    throw new Error(CANNOT_BE_USED);
  }
  constructor(fixHeaders, onEnd, streamCreator, initialHeaders, statusCode) {
    super();
    this.fixHeaders = fixHeaders;
    this.onEnd = onEnd;
    this.streamCreator = streamCreator;
    this.initialHeaders = initialHeaders;
    if (statusCode && Number.isInteger(statusCode) && statusCode >= 100 && statusCode <= 599) {
      this.statusCode = statusCode;
    }
    streamCreator?.abortSignal?.addEventListener("abort", () => {
      this.destroy();
    });
  }
  // Necessary for next 12
  // We might have to implement all the methods here
  get originalResponse() {
    return this;
  }
  get finished() {
    return this.responseStream ? this.responseStream?.writableFinished : this.writableFinished;
  }
  setHeader(name, value) {
    const key = name.toLowerCase();
    if (key === SET_COOKIE_HEADER) {
      if (Array.isArray(value)) {
        this._cookies = value;
      } else {
        this._cookies = [value];
      }
    }
    this.headers[key] = value;
    return this;
  }
  removeHeader(name) {
    const key = name.toLowerCase();
    if (key === SET_COOKIE_HEADER) {
      this._cookies = [];
    } else {
      delete this.headers[key];
    }
    return this;
  }
  hasHeader(name) {
    const key = name.toLowerCase();
    if (key === SET_COOKIE_HEADER) {
      return this._cookies.length > 0;
    }
    return this.headers[key] !== void 0;
  }
  getHeaders() {
    return this.headers;
  }
  getHeader(name) {
    return this.headers[name.toLowerCase()];
  }
  getHeaderNames() {
    return Object.keys(this.headers);
  }
  // Only used directly in next@14+
  flushHeaders() {
    this.headersSent = true;
    const mergeHeadersPriority = globalThis.__openNextAls?.getStore()?.mergeHeadersPriority ?? "middleware";
    if (this.initialHeaders) {
      this.headers = mergeHeadersPriority === "middleware" ? {
        ...this.headers,
        ...this.initialHeaders
      } : {
        ...this.initialHeaders,
        ...this.headers
      };
      const initialCookies = parseSetCookieHeader(this.initialHeaders[SET_COOKIE_HEADER]?.toString());
      this._cookies = mergeHeadersPriority === "middleware" ? [...this._cookies, ...initialCookies] : [...initialCookies, ...this._cookies];
    }
    this.fixHeaders(this.headers);
    this.fixHeadersForError();
    this.headers[SET_COOKIE_HEADER] = this._cookies;
    const parsedHeaders = parseHeaders(this.headers);
    delete parsedHeaders[SET_COOKIE_HEADER];
    if (this.streamCreator) {
      this.responseStream = this.streamCreator?.writeHeaders({
        statusCode: this.statusCode ?? 200,
        cookies: this._cookies,
        headers: parsedHeaders
      });
      this.pipe(this.responseStream);
    }
  }
  appendHeader(name, value) {
    const key = name.toLowerCase();
    if (!this.hasHeader(key)) {
      return this.setHeader(key, value);
    }
    const existingHeader = this.getHeader(key);
    const toAppend = Array.isArray(value) ? value : [value];
    const newValue = Array.isArray(existingHeader) ? [...existingHeader, ...toAppend] : [existingHeader, ...toAppend];
    return this.setHeader(key, newValue);
  }
  writeHead(statusCode, statusMessage, headers) {
    let _headers = headers;
    let _statusMessage;
    if (typeof statusMessage === "string") {
      _statusMessage = statusMessage;
    } else {
      _headers = statusMessage;
    }
    const finalHeaders = this.headers;
    if (_headers) {
      if (Array.isArray(_headers)) {
        for (let i = 0; i < _headers.length; i += 2) {
          finalHeaders[_headers[i]] = _headers[i + 1];
        }
      } else {
        for (const key of Object.keys(_headers)) {
          finalHeaders[key] = _headers[key];
        }
      }
    }
    this.statusCode = statusCode;
    if (headers) {
      this.headers = finalHeaders;
    }
    this.flushHeaders();
    return this;
  }
  /**
   * OpenNext specific method
   */
  getFixedHeaders() {
    this.fixHeaders(this.headers);
    this.fixHeadersForError();
    this.headers[SET_COOKIE_HEADER] = this._cookies;
    return this.headers;
  }
  getBody() {
    return Buffer.concat(this._chunks);
  }
  _internalWrite(chunk, encoding) {
    this._chunks.push(Buffer.from(chunk, encoding));
    this.push(chunk, encoding);
    this.streamCreator?.onWrite?.();
  }
  _transform(chunk, encoding, callback) {
    if (!this.headersSent) {
      this.flushHeaders();
    }
    this._internalWrite(chunk, encoding);
    callback();
  }
  _flush(callback) {
    if (!this.headersSent) {
      this.flushHeaders();
    }
    globalThis.__openNextAls?.getStore()?.pendingPromiseRunner.add(this.onEnd(this.headers));
    const bodyLength = this.getBody().length;
    this.streamCreator?.onFinish?.(bodyLength);
    if (bodyLength === 0 && // We use an env variable here because not all aws account have the same behavior
    // On some aws accounts the response will hang if the body is empty
    // We are modifying the response body here, this is not a good practice
    process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
      debug('Force writing "SOMETHING" to the response body');
      this.push("SOMETHING");
    }
    callback();
  }
  /**
   * New method in Node 18.15+
   * There are probably not used right now in Next.js, but better be safe than sorry
   */
  setHeaders(headers) {
    headers.forEach((value, key) => {
      this.setHeader(key, Array.isArray(value) ? value : value.toString());
    });
    return this;
  }
  /**
   * Next specific methods
   * On earlier versions of next.js, those methods are mandatory to make everything work
   */
  get sent() {
    return this.finished || this.headersSent;
  }
  getHeaderValues(name) {
    const values = this.getHeader(name);
    if (values === void 0)
      return void 0;
    return (Array.isArray(values) ? values : [values]).map((value) => value.toString());
  }
  send() {
    const body = this.getBody();
    this.end(body);
  }
  body(value) {
    this.write(value);
    return this;
  }
  onClose(callback) {
    this.on("close", callback);
  }
  redirect(destination, statusCode) {
    this.setHeader("Location", destination);
    this.statusCode = statusCode;
    if (statusCode === 308) {
      this.setHeader("Refresh", `0;url=${destination}`);
    }
    return this;
  }
  // For some reason, next returns the 500 error page with some cache-control headers
  // We need to fix that
  fixHeadersForError() {
    if (process.env.OPEN_NEXT_DANGEROUSLY_SET_ERROR_HEADERS === "true") {
      return;
    }
    if (this.statusCode === 404 || this.statusCode === 500) {
      this.headers["cache-control"] = "private, no-cache, no-store, max-age=0, must-revalidate";
    }
  }
};

// node_modules/@opennextjs/aws/dist/http/request.js
import http from "node:http";
var IncomingMessage = class extends http.IncomingMessage {
  constructor({ method, url, headers, body, remoteAddress }) {
    super({
      encrypted: true,
      readable: false,
      remoteAddress,
      address: () => ({ port: 443 }),
      end: Function.prototype,
      destroy: Function.prototype
    });
    if (body) {
      headers["content-length"] ??= String(Buffer.byteLength(body));
    }
    Object.assign(this, {
      ip: remoteAddress,
      complete: true,
      httpVersion: "1.1",
      httpVersionMajor: "1",
      httpVersionMinor: "1",
      method,
      headers,
      body,
      url
    });
    this._read = () => {
      this.push(body);
      this.push(null);
    };
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/core/requestHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/patchAsyncStorage.js
var mod = (init_node_module(), __toCommonJS(node_module_exports));
var resolveFilename = mod._resolveFilename;

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto from "node:crypto";
import { Readable as Readable2 } from "node:stream";
init_util();
init_logger();

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType?.split(";")[0] ?? "";
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path2) {
  return NextConfig.i18n?.locales.includes(path2.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function constructNextUrl(baseUrl, path2) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path2}`, baseUrl);
  return url.href;
}
function convertRes(res) {
  const statusCode = res.statusCode || 200;
  const headers = parseHeaders(res.getFixedHeaders());
  const isBase64Encoded = isBinaryContentType(headers["content-type"]) || !!headers["content-encoding"];
  const body = Readable2.toWeb(Readable2.from(res.getBody()));
  return {
    type: "core",
    statusCode,
    headers,
    body,
    isBase64Encoded
  };
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function convertToQuery(querystring) {
  const query = new URLSearchParams(querystring);
  const queryObject = {};
  for (const key of query.keys()) {
    const queries = query.getAll(key);
    queryObject[key] = queries.length > 1 ? queries : queries[0];
  }
  return queryObject;
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function fixCacheHeaderForHtmlPages(internalEvent, headers) {
  if (internalEvent.rawPath === "/404" || internalEvent.rawPath === "/500") {
    if (process.env.OPEN_NEXT_DANGEROUSLY_SET_ERROR_HEADERS === "true") {
      return;
    }
    headers[CommonHeaders.CACHE_CONTROL] = "private, no-cache, no-store, max-age=0, must-revalidate";
    return;
  }
  const localizedPath = localizePath(internalEvent);
  if (HtmlPages.includes(localizedPath) && !internalEvent.headers["x-middleware-prefetch"]) {
    headers[CommonHeaders.CACHE_CONTROL] = "public, max-age=0, s-maxage=31536000, must-revalidate";
  }
}
function fixSWRCacheHeader(headers) {
  let cacheControl = headers[CommonHeaders.CACHE_CONTROL];
  if (!cacheControl)
    return;
  if (Array.isArray(cacheControl)) {
    cacheControl = cacheControl.join(",");
  }
  if (typeof cacheControl !== "string")
    return;
  headers[CommonHeaders.CACHE_CONTROL] = cacheControl.replace(/\bstale-while-revalidate(?!=)/, "stale-while-revalidate=2592000");
}
function addOpenNextHeader(headers) {
  if (NextConfig.poweredByHeader) {
    headers["X-OpenNext"] = "1";
  }
  if (globalThis.openNextDebug) {
    headers["X-OpenNext-Version"] = globalThis.openNextVersion;
  }
  if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
    headers["X-OpenNext-RequestId"] = globalThis.__openNextAls.getStore()?.requestId;
  }
}
async function revalidateIfRequired(host, rawPath, headers, req) {
  if (headers[CommonHeaders.NEXT_CACHE] === "STALE") {
    const internalMeta = req?.[Symbol.for("NextInternalRequestMeta")];
    const revalidateUrl = internalMeta?._nextDidRewrite ? rawPath.startsWith("/_next/data/") ? `/_next/data/${BuildId}${internalMeta?._nextRewroteUrl}.json` : internalMeta?._nextRewroteUrl : rawPath;
    try {
      const hash = (str) => crypto.createHash("md5").update(str).digest("hex");
      const lastModified = globalThis.__openNextAls.getStore()?.lastModified ?? 0;
      const eTag = `${headers.etag ?? headers.ETag ?? ""}`;
      await globalThis.queue.send({
        MessageBody: { host, url: revalidateUrl, eTag, lastModified },
        MessageDeduplicationId: hash(`${rawPath}-${lastModified}-${eTag}`),
        MessageGroupId: generateMessageGroupId(rawPath)
      });
    } catch (e) {
      error(`Failed to revalidate stale page ${rawPath}`, e);
    }
  }
}
function fixISRHeaders(headers) {
  if (headers[CommonHeaders.NEXT_CACHE] === "REVALIDATED") {
    headers[CommonHeaders.CACHE_CONTROL] = "private, no-cache, no-store, max-age=0, must-revalidate";
    return;
  }
  const _lastModified = globalThis.__openNextAls.getStore()?.lastModified ?? 0;
  if (headers[CommonHeaders.NEXT_CACHE] === "HIT" && _lastModified > 0) {
    const age = Math.round((Date.now() - _lastModified) / 1e3);
    const regex = /s-maxage=(\d+)/;
    const cacheControl = headers[CommonHeaders.CACHE_CONTROL];
    debug("cache-control", cacheControl, _lastModified, Date.now());
    if (typeof cacheControl !== "string")
      return;
    const match = cacheControl.match(regex);
    const sMaxAge = match ? Number.parseInt(match[1]) : void 0;
    if (sMaxAge && sMaxAge !== 31536e3) {
      const remainingTtl = Math.max(sMaxAge - age, 1);
      headers[CommonHeaders.CACHE_CONTROL] = `s-maxage=${remainingTtl}, stale-while-revalidate=2592000`;
    }
  }
  if (headers[CommonHeaders.NEXT_CACHE] !== "STALE")
    return;
  headers[CommonHeaders.CACHE_CONTROL] = "s-maxage=2, stale-while-revalidate=2592000";
}
function createServerResponse(routingResult, headers, responseStream) {
  const internalEvent = routingResult.internalEvent;
  return new OpenNextNodeResponse((_headers) => {
    fixCacheHeaderForHtmlPages(internalEvent, _headers);
    fixSWRCacheHeader(_headers);
    addOpenNextHeader(_headers);
    fixISRHeaders(_headers);
  }, async (_headers) => {
    await revalidateIfRequired(internalEvent.headers.host, internalEvent.rawPath, _headers);
    await invalidateCDNOnRequest(routingResult, _headers);
  }, responseStream, headers, routingResult.rewriteStatusCode);
}
async function invalidateCDNOnRequest(params, headers) {
  const { internalEvent, resolvedRoutes, initialURL } = params;
  const initialPath = new URL(initialURL).pathname;
  const isIsrRevalidation = internalEvent.headers["x-isr"] === "1";
  if (!isIsrRevalidation && headers[CommonHeaders.NEXT_CACHE] === "REVALIDATED") {
    await globalThis.cdnInvalidationHandler.invalidatePaths([
      {
        initialPath,
        rawPath: internalEvent.rawPath,
        resolvedRoutes
      }
    ]);
  }
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path2) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path2));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => route.startsWith("/api/") || route === "/api" && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;

// node_modules/@opennextjs/aws/dist/core/util.js
init_logger();
import NextServer from "next/dist/server/next-server.js";

// node_modules/@opennextjs/aws/dist/core/require-hooks.js
init_logger();
var mod2 = (init_node_module(), __toCommonJS(node_module_exports));
var resolveFilename2 = mod2._resolveFilename;

// node_modules/@opennextjs/aws/dist/core/util.js
var cacheHandlerPath = __require.resolve("./cache.cjs");
var composableCacheHandlerPath = __require.resolve("./composable-cache.cjs");
var nextServer = new NextServer.default({
  conf: {
    ...NextConfig,
    // Next.js compression should be disabled because of a bug in the bundled
    // `compression` package — https://github.com/vercel/next.js/issues/11669
    compress: false,
    // By default, Next.js uses local disk to store ISR cache. We will use
    // our own cache handler to store the cache on S3.
    //#override stableIncrementalCache
    cacheHandler: cacheHandlerPath,
    cacheMaxMemorySize: 0,
    // We need to disable memory cache
    //#endOverride
    experimental: {
      ...NextConfig.experimental,
      // This uses the request.headers.host as the URL
      // https://github.com/vercel/next.js/blob/canary/packages/next/src/server/next-server.ts#L1749-L1754
      //#override trustHostHeader
      trustHostHeader: true,
      //#endOverride
      //#override composableCache
      cacheHandlers: {
        default: composableCacheHandlerPath
      }
      //#endOverride
    }
  },
  customServer: false,
  dev: false,
  dir: __dirname
});
var routesLoaded = false;
globalThis.__next_route_preloader = async (stage) => {
  if (routesLoaded) {
    return;
  }
  const thisFunction = globalThis.fnName ? globalThis.openNextConfig.functions[globalThis.fnName] : globalThis.openNextConfig.default;
  const routePreloadingBehavior = thisFunction?.routePreloadingBehavior ?? "none";
  if (routePreloadingBehavior === "none") {
    routesLoaded = true;
    return;
  }
  if (!("unstable_preloadEntries" in nextServer)) {
    debug("The current version of Next.js does not support route preloading. Skipping route preloading.");
    routesLoaded = true;
    return;
  }
  if (stage === "waitUntil" && routePreloadingBehavior === "withWaitUntil") {
    const waitUntil = globalThis.__openNextAls.getStore()?.waitUntil;
    if (!waitUntil) {
      error("You've tried to use the 'withWaitUntil' route preloading behavior, but the 'waitUntil' function is not available.");
      routesLoaded = true;
      return;
    }
    debug("Preloading entries with waitUntil");
    waitUntil?.(nextServer.unstable_preloadEntries());
    routesLoaded = true;
  } else if (stage === "start" && routePreloadingBehavior === "onStart" || stage === "warmerEvent" && routePreloadingBehavior === "onWarmerEvent" || stage === "onDemand") {
    const startTimestamp = Date.now();
    debug("Preloading entries");
    await nextServer.unstable_preloadEntries();
    debug("Preloading entries took", Date.now() - startTimestamp, "ms");
    routesLoaded = true;
  }
};
var requestHandler = (metadata) => "getRequestHandlerWithMetadata" in nextServer ? nextServer.getRequestHandlerWithMetadata(metadata) : nextServer.getRequestHandler();

// node_modules/@opennextjs/aws/dist/core/requestHandler.js
globalThis.__openNextAls = new AsyncLocalStorage();
async function openNextHandler(internalEvent, options) {
  const initialHeaders = internalEvent.headers;
  const requestId = globalThis.openNextConfig.middleware?.external ? internalEvent.headers[INTERNAL_EVENT_REQUEST_ID] : Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: initialHeaders["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    await globalThis.__next_route_preloader("waitUntil");
    if (initialHeaders["x-forwarded-host"]) {
      initialHeaders.host = initialHeaders["x-forwarded-host"];
    }
    debug("internalEvent", internalEvent);
    const internalHeaders = {
      initialPath: initialHeaders[INTERNAL_HEADER_INITIAL_URL] ?? internalEvent.rawPath,
      resolvedRoutes: initialHeaders[INTERNAL_HEADER_RESOLVED_ROUTES] ? JSON.parse(initialHeaders[INTERNAL_HEADER_RESOLVED_ROUTES]) : [],
      rewriteStatusCode: Number.parseInt(initialHeaders[INTERNAL_HEADER_REWRITE_STATUS_CODE])
    };
    let routingResult = {
      internalEvent,
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      initialURL: internalEvent.url,
      ...internalHeaders
    };
    const headers = "type" in routingResult ? routingResult.headers : routingResult.internalEvent.headers;
    const overwrittenResponseHeaders = {};
    for (const [rawKey, value] of Object.entries(headers)) {
      if (!rawKey.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        continue;
      }
      const key = rawKey.slice(MIDDLEWARE_HEADER_PREFIX_LEN);
      if (key !== "x-middleware-set-cookie") {
        overwrittenResponseHeaders[key] = value;
      }
      headers[key] = value;
      delete headers[rawKey];
    }
    if ("isExternalRewrite" in routingResult && routingResult.isExternalRewrite === true) {
      try {
        routingResult = await globalThis.proxyExternalRequest.proxy(routingResult.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        routingResult = {
          internalEvent: {
            type: "core",
            rawPath: "/500",
            method: "GET",
            headers: {},
            url: constructNextUrl(internalEvent.url, "/500"),
            query: {},
            cookies: {},
            remoteAddress: ""
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          isISR: false,
          origin: false,
          initialURL: internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if ("type" in routingResult) {
      if (options?.streamCreator) {
        const response = createServerResponse({
          internalEvent,
          isExternalRewrite: false,
          isISR: false,
          resolvedRoutes: [],
          origin: false,
          initialURL: internalEvent.url
        }, routingResult.headers, options.streamCreator);
        response.statusCode = routingResult.statusCode;
        response.flushHeaders();
        const [bodyToConsume, bodyToReturn] = routingResult.body.tee();
        for await (const chunk of bodyToConsume) {
          response.write(chunk);
        }
        response.end();
        routingResult.body = bodyToReturn;
      }
      return routingResult;
    }
    const preprocessedEvent = routingResult.internalEvent;
    debug("preprocessedEvent", preprocessedEvent);
    const { search, pathname, hash } = new URL(preprocessedEvent.url);
    const reqProps = {
      method: preprocessedEvent.method,
      url: `${pathname}${search}${hash}`,
      //WORKAROUND: We pass this header to the serverless function to mimic a prefetch request which will not trigger revalidation since we handle revalidation differently
      // There is 3 way we can handle revalidation:
      // 1. We could just let the revalidation go as normal, but due to race conditions the revalidation will be unreliable
      // 2. We could alter the lastModified time of our cache to make next believe that the cache is fresh, but this could cause issues with stale data since the cdn will cache the stale data as if it was fresh
      // 3. OUR CHOICE: We could pass a purpose prefetch header to the serverless function to make next believe that the request is a prefetch request and not trigger revalidation (This could potentially break in the future if next changes the behavior of prefetch requests)
      headers: {
        ...headers
      },
      body: preprocessedEvent.body,
      remoteAddress: preprocessedEvent.remoteAddress
    };
    const mergeHeadersPriority = globalThis.openNextConfig.dangerous?.headersAndCookiesPriority ? globalThis.openNextConfig.dangerous.headersAndCookiesPriority(preprocessedEvent) : "middleware";
    const store = globalThis.__openNextAls.getStore();
    if (store) {
      store.mergeHeadersPriority = mergeHeadersPriority;
    }
    const req = new IncomingMessage(reqProps);
    const res = createServerResponse(routingResult, overwrittenResponseHeaders, options?.streamCreator);
    await processRequest(req, res, routingResult);
    const { statusCode, headers: responseHeaders, isBase64Encoded, body } = convertRes(res);
    const internalResult = {
      type: internalEvent.type,
      statusCode,
      headers: responseHeaders,
      body,
      isBase64Encoded
    };
    return internalResult;
  });
}
async function processRequest(req, res, routingResult) {
  delete req.body;
  const initialURL = new URL(
    // We always assume that only the routing layer can set this header.
    routingResult.internalEvent.headers[INTERNAL_HEADER_INITIAL_URL] ?? routingResult.initialURL
  );
  let invokeStatus;
  if (routingResult.internalEvent.rawPath === "/500") {
    invokeStatus = 500;
  } else if (routingResult.internalEvent.rawPath === "/404") {
    invokeStatus = 404;
  }
  const requestMetadata = {
    isNextDataReq: routingResult.internalEvent.query.__nextDataReq === "1",
    initURL: routingResult.initialURL,
    initQuery: convertToQuery(initialURL.search),
    initProtocol: initialURL.protocol,
    defaultLocale: NextConfig.i18n?.defaultLocale,
    locale: routingResult.locale,
    middlewareInvoke: false,
    // By setting invokePath and invokeQuery we can bypass some of the routing logic in Next.js
    invokePath: routingResult.internalEvent.rawPath,
    invokeQuery: routingResult.internalEvent.query,
    // invokeStatus is only used for error pages
    invokeStatus
  };
  try {
    req.url = initialURL.pathname + convertToQueryString(routingResult.internalEvent.query);
    await requestHandler(requestMetadata)(req, res);
  } catch (e) {
    if (e.constructor.name === "NoFallbackError") {
      await handleNoFallbackError(req, res, routingResult, requestMetadata);
    } else {
      error("NextJS request failed.", e);
      await tryRenderError("500", res, routingResult.internalEvent);
    }
  }
}
async function handleNoFallbackError(req, res, routingResult, metadata, index = 1) {
  if (index >= 5) {
    await tryRenderError("500", res, routingResult.internalEvent);
    return;
  }
  if (index >= routingResult.resolvedRoutes.length) {
    await tryRenderError("404", res, routingResult.internalEvent);
    return;
  }
  try {
    await requestHandler({
      ...routingResult,
      invokeOutput: routingResult.resolvedRoutes[index].route,
      ...metadata
    })(req, res);
  } catch (e) {
    if (e.constructor.name === "NoFallbackError") {
      await handleNoFallbackError(req, res, routingResult, metadata, index + 1);
    } else {
      error("NextJS request failed.", e);
      await tryRenderError("500", res, routingResult.internalEvent);
    }
  }
}
async function tryRenderError(type, res, internalEvent) {
  try {
    const _req = new IncomingMessage({
      method: "GET",
      url: `/${type}`,
      headers: internalEvent.headers,
      body: internalEvent.body,
      remoteAddress: internalEvent.remoteAddress
    });
    const requestMetadata = {
      // By setting invokePath and invokeQuery we can bypass some of the routing logic in Next.js
      invokePath: type === "404" ? "/404" : "/500",
      invokeStatus: type === "404" ? 404 : 500,
      middlewareInvoke: false
    };
    await requestHandler(requestMetadata)(_req, res);
  } catch (e) {
    error("NextJS request failed.", e);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      message: "Server failed to respond.",
      details: e
    }, null, 2));
  }
}

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_node(), cloudflare_node_exports));
  return m_1.default;
}
async function resolveTagCache(tagCache) {
  if (typeof tagCache === "function") {
    return tagCache();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveQueue(queue) {
  if (typeof queue === "function") {
    return queue();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy2(), dummy_exports2));
  return m_1.default;
}
async function resolveIncrementalCache(incrementalCache) {
  if (typeof incrementalCache === "function") {
    return incrementalCache();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy3(), dummy_exports3));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy4(), dummy_exports4));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}
async function resolveCdnInvalidation(cdnInvalidation) {
  if (typeof cdnInvalidation === "function") {
    return cdnInvalidation();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy5(), dummy_exports5));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createMainHandler.js
async function createMainHandler() {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  const thisFunction = globalThis.fnName ? config.functions[globalThis.fnName] : config.default;
  globalThis.serverId = generateUniqueId();
  globalThis.openNextConfig = config;
  await globalThis.__next_route_preloader("start");
  globalThis.queue = await resolveQueue(thisFunction.override?.queue);
  globalThis.incrementalCache = await resolveIncrementalCache(thisFunction.override?.incrementalCache);
  globalThis.tagCache = await resolveTagCache(thisFunction.override?.tagCache);
  if (config.middleware?.external !== true) {
    globalThis.assetResolver = await resolveAssetResolver(globalThis.openNextConfig.middleware?.assetResolver);
  }
  globalThis.proxyExternalRequest = await resolveProxyRequest(thisFunction.override?.proxyExternalRequest);
  globalThis.cdnInvalidationHandler = await resolveCdnInvalidation(thisFunction.override?.cdnInvalidation);
  const converter2 = await resolveConverter(thisFunction.override?.converter);
  const { wrapper, name } = await resolveWrapper(thisFunction.override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(openNextHandler, converter2);
}

// node_modules/@opennextjs/aws/dist/adapters/server-adapter.js
setNodeEnv();
setBuildIdEnv();
setNextjsServerWorkingDirectory();
globalThis.internalFetch = fetch;
var handler2 = await createMainHandler();
function setNextjsServerWorkingDirectory() {
  process.chdir(__dirname);
}
function setBuildIdEnv() {
  process.env.NEXT_BUILD_ID = BuildId;
}
export {
  handler2 as handler
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L3V0aWxzL2Vycm9yLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9hZGFwdGVycy9sb2dnZXIuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2h0dHAvdXRpbC5qcyIsICJub2RlLWJ1aWx0LWluLW1vZHVsZXM6bm9kZTptb2R1bGUiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L3V0aWxzL3N0cmVhbS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3Qvb3ZlcnJpZGVzL2NvbnZlcnRlcnMvdXRpbHMuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nvb2tpZS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L292ZXJyaWRlcy9jb252ZXJ0ZXJzL2VkZ2UuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L292ZXJyaWRlcy93cmFwcGVycy9jbG91ZGZsYXJlLW5vZGUuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L292ZXJyaWRlcy90YWdDYWNoZS9kdW1teS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3Qvb3ZlcnJpZGVzL3F1ZXVlL2R1bW15LmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9vdmVycmlkZXMvaW5jcmVtZW50YWxDYWNoZS9kdW1teS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3Qvb3ZlcnJpZGVzL2Fzc2V0UmVzb2x2ZXIvZHVtbXkuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L292ZXJyaWRlcy9wcm94eUV4dGVybmFsUmVxdWVzdC9mZXRjaC5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3Qvb3ZlcnJpZGVzL2NkbkludmFsaWRhdGlvbi9kdW1teS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvYWRhcHRlcnMvY29uZmlnL2luZGV4LmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9jb3JlL2NyZWF0ZU1haW5IYW5kbGVyLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9hZGFwdGVycy91dGlsLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9jb3JlL3JlcXVlc3RIYW5kbGVyLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9odHRwL29wZW5OZXh0UmVzcG9uc2UuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2h0dHAvcmVxdWVzdC5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvdXRpbHMvcHJvbWlzZS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9wYXRjaEFzeW5jU3RvcmFnZS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nL3V0aWwuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L3V0aWxzL2JpbmFyeS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nL2kxOG4vaW5kZXguanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvcm91dGluZy9pMThuL2FjY2VwdC1oZWFkZXIuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvcm91dGluZy9xdWV1ZS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nSGFuZGxlci5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nL2NhY2hlSW50ZXJjZXB0b3IuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L3V0aWxzL2NhY2hlLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9jb3JlL3JvdXRpbmcvbWF0Y2hlci5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nL3JvdXRlTWF0Y2hlci5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nL21pZGRsZXdhcmUuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvdXRpbC5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yZXF1aXJlLWhvb2tzLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9jb3JlL3Jlc29sdmUuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2FkYXB0ZXJzL3NlcnZlci1hZGFwdGVyLmpzIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QXBCcEhBLGVBQXNCLG9CQUFvQjtBQUV0QyxRQUFNLFNBQVMsTUFBTSxPQUFPLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTztBQUMzRSxRQUFNLGVBQWUsV0FBVyxTQUMxQixPQUFPLFVBQVUsV0FBVyxNQUFNLElBQ2xDLE9BQU87QUFDYixhQUFXLFdBQVcsaUJBQWlCO0FBQ3ZDLGFBQVcsaUJBQWlCO0FBRTVCLFFBQU0sV0FBVyx1QkFBdUIsT0FBTztBQUUvQyxhQUFXLFFBQVEsTUFBTSxhQUFhLGFBQWEsVUFBVSxLQUFLO0FBQ2xFLGFBQVcsbUJBQW1CLE1BQU0sd0JBQXdCLGFBQWEsVUFBVSxnQkFBZ0I7QUFDbkcsYUFBVyxXQUFXLE1BQU0sZ0JBQWdCLGFBQWEsVUFBVSxRQUFRO0FBQzNFLE1BQUksT0FBTyxZQUFZLGFBQWEsTUFBTTtBQUN0QyxlQUFXLGdCQUFnQixNQUFNLHFCQUFxQixXQUFXLGVBQWUsWUFBWSxhQUFhO0FBQUEsRUFDN0c7QUFDQSxhQUFXLHVCQUF1QixNQUFNLG9CQUFvQixhQUFhLFVBQVUsb0JBQW9CO0FBQ3ZHLGFBQVcseUJBQXlCLE1BQU0sdUJBQXVCLGFBQWEsVUFBVSxlQUFlO0FBRXZHLFFBQU1DLGFBQVksTUFBTSxpQkFBaUIsYUFBYSxVQUFVLFNBQVM7QUFFekUsUUFBTSxFQUFFLFNBQVMsS0FBSyxJQUFJLE1BQU0sZUFBZSxhQUFhLFVBQVUsT0FBTztBQUM3RSxRQUFNLGlCQUFpQixJQUFJO0FBQzNCLFNBQU8sUUFBUSxpQkFBaUJBLFVBQVM7QUFDN0M7OztBcUJ0QkEsV0FBVztBQUNYLGNBQWM7QUFDZCxnQ0FBZ0M7QUFFaEMsV0FBVyxnQkFBZ0I7QUFJcEIsSUFBTUMsV0FBVSxNQUFNLGtCQUFrQjtBQUkvQyxTQUFTLGtDQUFrQztBQUd2QyxVQUFRLE1BQU0sU0FBUztBQUMzQjtBQUNBLFNBQVMsZ0JBQWdCO0FBR3JCLFVBQVEsSUFBSSxnQkFBZ0I7QUFDaEM7IiwKICAibmFtZXMiOiBbImVycm9yIiwgInBhcnNlIiwgIkJ1ZmZlciIsICJjb29raWVQYXJzZXIiLCAiTlVMTF9CT0RZX1NUQVRVU0VTIiwgImhhbmRsZXIiLCAiY29udmVydGVyIiwgImR1bW15X2V4cG9ydHMiLCAiZHVtbXlfZGVmYXVsdCIsICJpbml0X2R1bW15IiwgImR1bW15X2V4cG9ydHMiLCAiZHVtbXlfZGVmYXVsdCIsICJpbml0X2R1bW15IiwgImR1bW15X2V4cG9ydHMiLCAiZHVtbXlfZGVmYXVsdCIsICJpbml0X2R1bW15IiwgImR1bW15X2V4cG9ydHMiLCAiZHVtbXlfZGVmYXVsdCIsICJpbml0X2R1bW15IiwgIlJlYWRhYmxlIiwgInBhcnRzIiwgInBhdGgiLCAicGF0aCIsICJSZWFkYWJsZSIsICJtaWRkbGV3YXJlTWFuaWZlc3QiLCAiQ29tbW9uSGVhZGVycyIsICJwYXRoIiwgIm1vZCIsICJyZXNvbHZlRmlsZW5hbWUiLCAiY29udmVydGVyIiwgImNvbnZlcnRlciIsICJoYW5kbGVyIl0KfQo=
