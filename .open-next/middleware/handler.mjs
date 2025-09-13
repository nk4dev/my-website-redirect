
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = true;globalThis.openNextVersion = "3.7.6";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
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

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse3;
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
    function parse3(str, options) {
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
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
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

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
var envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          const origin = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
          for (const [key, value] of Object.entries(globalThis.openNextConfig.functions ?? {}).filter(([key2]) => key2 !== "default")) {
            if (value.patterns.some((pattern) => {
              return new RegExp(
                // transform glob pattern to regex
                `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`
              ).test(_path);
            })) {
              debug("Using origin", key, value.patterns);
              return origin[key];
            }
          }
          if (_path.startsWith("/_next/image") && origin.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return origin.imageOptimizer;
          }
          if (origin.default) {
            debug("Using default origin", origin.default, _path);
            return origin.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { Readable } from "node:stream";
function toReadableStream(value, isBase64) {
  return Readable.toWeb(Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}
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

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [];
  }
});

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

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

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
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";
import { Readable as Readable2 } from "node:stream";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.js", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/mnt/c/Users/nknig/_varius/blog-shorter", "experimental": { "useSkewCookie": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "clientParamParsing": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 11, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "viewTransition": false, "routerBFCache": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "cacheComponents": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "devtoolSegmentExplorer": true, "browserDebugInfoInTerminal": false, "optimizeRouterScrolling": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.js", "outputFileTracingIncludes": { "*": ["node_modules/@emotion/react/**/*", "node_modules/@emotion/styled/**/*", "node_modules/@emotion/utils/**/*", "node_modules/@emotion/cache/**/*", "node_modules/@emotion/use-insertion-effect-with-fallbacks/**/*", "node_modules/next-auth/**/*", "node_modules/next-auth/react/**/*", "node_modules/next-auth/providers/**/*", "node_modules/@panva/hkdf/**/*", "node_modules/jose/**/*", "node_modules/openid-client/**/*"] }, "transpilePackages": ["next-auth"], "serverExternalPackages": ["@emotion/cache", "@panva/hkdf", "jose", "openid-client"], "turbopack": { "root": "/mnt/c/Users/nknig/_varius/blog-shorter" } };
var BuildId = "X0hyJxXO_xuRT-Tl9EXdI";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/layout/main", "regex": "^/layout/main(?:/)?$", "routeKeys": {}, "namedRegex": "^/layout/main(?:/)?$" }, { "page": "/url/create", "regex": "^/url/create(?:/)?$", "routeKeys": {}, "namedRegex": "^/url/create(?:/)?$" }, { "page": "/user/dash", "regex": "^/user/dash(?:/)?$", "routeKeys": {}, "namedRegex": "^/user/dash(?:/)?$" }, { "page": "/user/signin", "regex": "^/user/signin(?:/)?$", "routeKeys": {}, "namedRegex": "^/user/signin(?:/)?$" }, { "page": "/user/signup", "regex": "^/user/signup(?:/)?$", "routeKeys": {}, "namedRegex": "^/user/signup(?:/)?$" }], "dynamic": [{ "page": "/api/auth/[...nextauth]", "regex": "^/api/auth/(.+?)(?:/)?$", "routeKeys": { "nxtPnextauth": "nxtPnextauth" }, "namedRegex": "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$" }], "data": { "static": [{ "page": "/user/dash", "dataRouteRegex": "^/_next/data/X0hyJxXO_xuRT\\-Tl9EXdI/user/dash\\.json$" }], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": {}, "dynamicRoutes": {}, "preview": { "previewModeId": "03fc5f9d414f80b3cf6c20416aaa9e9c", "previewModeSigningKey": "7a0b9d13100fc8fc0ab81334793b699dad886cbc3ba24538e8aeab1110bbc6ef", "previewModeEncryptionKey": "ed896a9e9682cd3bce88a90db79c252fb5f369c6517d560886e2c92649a367aa" }, "notFoundRoutes": [] };
var MiddlewareManifest = { "version": 3, "middleware": {}, "functions": {}, "sortedMiddleware": [] };
var AppPathRoutesManifest = {};
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/api/delete": "pages/api/delete.js", "/_error": "pages/_error.js", "/api/redirect": "pages/api/redirect.js", "/": "pages/index.html", "/api/auth/signup": "pages/api/auth/signup.js", "/layout/main": "pages/layout/main.html", "/api/shorter": "pages/api/shorter.js", "/url/create": "pages/url/create.html", "/user/signin": "pages/user/signin.html", "/user/signup": "pages/user/signup.html", "/api/auth/[...nextauth]": "pages/api/auth/[...nextauth].js", "/_document": "pages/_document.js", "/user/dash": "pages/user/dash.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
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
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
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
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
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
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (host) {
    return pattern.test(url) && !url.includes(host);
  }
  return pattern.test(url);
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
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
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
  return readable;
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    return value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest.routes).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  switch (cachedValue.type) {
    case "app":
      isDataRequest = Boolean(event.headers.rsc);
      body = isDataRequest ? cachedValue.rsc : cachedValue.html;
      type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
      break;
    case "page":
      isDataRequest = Boolean(event.query.__nextDataReq);
      body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
      type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
      break;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    statusCode: cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest.routes).includes(localizedPath ?? "/") || Object.values(PrerenderManifest.dynamicRoutes).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

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
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
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

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes, routes } = prerenderManifest;
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest.preview.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: statusCode
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    headers = {
      ...middlewareEventOrResult.responseHeaders,
      ...headers
    };
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L3V0aWxzL2Vycm9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9hZGFwdGVycy9sb2dnZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2Nvb2tpZS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2h0dHAvdXRpbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3Qvb3ZlcnJpZGVzL2NvbnZlcnRlcnMvdXRpbHMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L292ZXJyaWRlcy9jb252ZXJ0ZXJzL2VkZ2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L292ZXJyaWRlcy93cmFwcGVycy9jbG91ZGZsYXJlLWVkZ2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L292ZXJyaWRlcy9vcmlnaW5SZXNvbHZlci9wYXR0ZXJuLWVudi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3Qvb3ZlcnJpZGVzL2Fzc2V0UmVzb2x2ZXIvZHVtbXkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L3V0aWxzL3N0cmVhbS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3Qvb3ZlcnJpZGVzL3Byb3h5RXh0ZXJuYWxSZXF1ZXN0L2ZldGNoLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9jb3JlL2VkZ2VGdW5jdGlvbkhhbmRsZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L3V0aWxzL3Byb21pc2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2FkYXB0ZXJzL21pZGRsZXdhcmUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvY3JlYXRlR2VuZXJpY0hhbmRsZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvcmVzb2x2ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nL3V0aWwuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2FkYXB0ZXJzL2NvbmZpZy9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvaHR0cC9vcGVuTmV4dFJlc3BvbnNlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC91dGlscy9iaW5hcnkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvcm91dGluZy9pMThuL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9jb3JlL3JvdXRpbmcvaTE4bi9hY2NlcHQtaGVhZGVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9jb3JlL3JvdXRpbmcvcXVldWUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvcm91dGluZ0hhbmRsZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvcm91dGluZy9jYWNoZUludGVyY2VwdG9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC91dGlscy9jYWNoZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGF0aC10by1yZWdleHAvc3JjL2luZGV4LnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC91dGlscy9ub3JtYWxpemUtcGF0aC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nL21hdGNoZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvcm91dGluZy9yb3V0ZU1hdGNoZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvcm91dGluZy9taWRkbGV3YXJlLmpzIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ08sU0FBUyxnQkFBZ0IsR0FBRztBQUMvQixNQUFJO0FBQ0EsV0FBTyx3QkFBd0I7QUFBQSxFQUNuQyxRQUNNO0FBQ0YsV0FBTztBQUFBLEVBQ1g7QUFDSjtBQXZDQTtBQUFBO0FBQUE7QUFBQTs7O0FDQ08sU0FBUyxTQUFTLE1BQU07QUFDM0IsTUFBSSxXQUFXLGVBQWU7QUFDMUIsWUFBUSxJQUFJLEdBQUcsSUFBSTtBQUFBLEVBQ3ZCO0FBQ0o7QUFDTyxTQUFTLFFBQVEsTUFBTTtBQUMxQixVQUFRLEtBQUssR0FBRyxJQUFJO0FBQ3hCO0FBWU8sU0FBUyxTQUFTLE1BQU07QUFFM0IsTUFBSSxLQUFLLEtBQUssQ0FBQyxRQUFRLHFCQUFxQixHQUFHLENBQUMsR0FBRztBQUMvQyxXQUFPLE1BQU0sR0FBRyxJQUFJO0FBQUEsRUFDeEI7QUFDQSxNQUFJLEtBQUssS0FBSyxDQUFDLFFBQVEsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHO0FBRTFDLFVBQU1BLFNBQVEsS0FBSyxLQUFLLENBQUMsUUFBUSxnQkFBZ0IsR0FBRyxDQUFDO0FBQ3JELFFBQUlBLE9BQU0sV0FBVyx5QkFBeUIsR0FBRztBQUM3QztBQUFBLElBQ0o7QUFDQSxRQUFJQSxP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Q3BEO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFDQSxXQUFPLFFBQVEseUJBQXlCLElBQUk7QUFDNUMsVUFBTSx1QkFBdUIsTUFBTTtBQUNuQyxXQUFPO0FBQUEsRUFDWCxDQUFDO0FBQ0w7QUFDTyxJQUFNQyxXQUFVLE1BQU0scUJBQXFCO0FBQUEsRUFDOUMsU0FBUztBQUFBLEVBQ1QsTUFBTTtBQUNWLENBQUM7QUFDRCxJQUFPLHFCQUFRO0FBQUEsRUFDWCxPQUFPQTtBQUNYOyIsCiAgIm5hbWVzIjogWyJlcnJvciIsICJwYXJzZSIsICJCdWZmZXIiLCAiY29va2llUGFyc2VyIiwgImhhbmRsZXIiLCAiY29udmVydGVyIiwgImtleSIsICJwYXRoIiwgImNvbnZlcnRlciIsICJoYW5kbGVyIiwgImNvbnZlcnRlciIsICJSZWFkYWJsZSIsICJwYXJ0cyIsICJwYXRoIiwgImlzRXh0ZXJuYWwiLCAicmVnZXgiLCAibWF0Y2giLCAicGF0aCIsICJtaWRkbGV3YXJlTWFuaWZlc3QiLCAiQ29tbW9uSGVhZGVycyIsICJwYXRoIiwgInBhcnNlIiwgInBhdGgiLCAidmFsdWUiLCAiX2EiLCAicmVzdWx0IiwgImNoYXIiLCAicHJlZml4IiwgImkiLCAicGF0aCIsICJwYXRoIiwgIm1hdGNoIiwgInBhdGgiLCAiaGFuZGxlciJdCn0K
