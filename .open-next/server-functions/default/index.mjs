globalThis.monorepoPackagePath = "";import process from 'node:process';import { Buffer } from 'node:buffer';import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);import bannerUrl from 'url';const __dirname = bannerUrl.fileURLToPath(new URL('.', import.meta.url));globalThis.openNextDebug = true;globalThis.openNextVersion = "3.7.6";
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
var __toESM = (mod3, isNodeMode, target) => (target = mod3 != null ? __create(__getProtoOf(mod3)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod3 || !mod3.__esModule ? __defProp(target, "default", { value: mod3, enumerable: true }) : target,
  mod3
));

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
import path2 from "node:path";

// node_modules/@opennextjs/aws/dist/adapters/config/util.js
import fs from "node:fs";
import path from "node:path";
function loadConfig(nextDir) {
  const filePath = path.join(nextDir, "required-server-files.json");
  const json = fs.readFileSync(filePath, "utf-8");
  const { config } = JSON.parse(json);
  return config;
}
function loadBuildId(nextDir) {
  const filePath = path.join(nextDir, "BUILD_ID");
  return fs.readFileSync(filePath, "utf-8").trim();
}
function loadPagesManifest(nextDir) {
  const filePath = path.join(nextDir, "server/pages-manifest.json");
  const json = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(json);
}
function loadHtmlPages(nextDir) {
  return Object.entries(loadPagesManifest(nextDir)).filter(([_, value]) => value.endsWith(".html")).map(([key]) => key);
}
function loadRoutesManifest(nextDir) {
  const filePath = path.join(nextDir, "routes-manifest.json");
  const json = fs.readFileSync(filePath, "utf-8");
  const routesManifest = JSON.parse(json);
  const _dataRoutes = routesManifest.dataRoutes ?? [];
  const dataRoutes = {
    static: _dataRoutes.filter((r) => r.routeKeys === void 0),
    dynamic: _dataRoutes.filter((r) => r.routeKeys !== void 0)
  };
  return {
    basePath: routesManifest.basePath,
    rewrites: Array.isArray(routesManifest.rewrites) ? { beforeFiles: [], afterFiles: routesManifest.rewrites, fallback: [] } : {
      beforeFiles: routesManifest.rewrites.beforeFiles ?? [],
      afterFiles: routesManifest.rewrites.afterFiles ?? [],
      fallback: routesManifest.rewrites.fallback ?? []
    },
    redirects: routesManifest.redirects ?? [],
    routes: {
      static: routesManifest.staticRoutes ?? [],
      dynamic: routesManifest.dynamicRoutes ?? [],
      data: dataRoutes
    },
    locales: routesManifest.i18n?.locales ?? []
  };
}
function loadAppPathRoutesManifest(nextDir) {
  const appPathRoutesManifestPath = path.join(nextDir, "app-path-routes-manifest.json");
  if (fs.existsSync(appPathRoutesManifestPath)) {
    return JSON.parse(fs.readFileSync(appPathRoutesManifestPath, "utf-8"));
  }
  return {};
}
function loadMiddlewareManifest(nextDir) {
  const filePath = path.join(nextDir, "server/middleware-manifest.json");
  const json = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(json);
}
function loadFunctionsConfigManifest(nextDir) {
  const filePath = path.join(nextDir, "server/functions-config-manifest.json");
  try {
    const json = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(json);
  } catch (e) {
    return { functions: {}, version: 1 };
  }
}

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
var NEXT_DIR = path2.join(__dirname, ".next");
var OPEN_NEXT_DIR = path2.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = /* @__PURE__ */ loadConfig(NEXT_DIR);
var BuildId = /* @__PURE__ */ loadBuildId(NEXT_DIR);
var HtmlPages = /* @__PURE__ */ loadHtmlPages(NEXT_DIR);
var RoutesManifest = /* @__PURE__ */ loadRoutesManifest(NEXT_DIR);
var PagesManifest = /* @__PURE__ */ loadPagesManifest(NEXT_DIR);
var MiddlewareManifest = /* @__PURE__ */ loadMiddlewareManifest(NEXT_DIR);
var AppPathRoutesManifest = /* @__PURE__ */ loadAppPathRoutesManifest(NEXT_DIR);
var FunctionsConfigManifest = /* @__PURE__ */ loadFunctionsConfigManifest(NEXT_DIR);

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
var mod = __require("node:module");
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
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
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
var mod2 = __require("node:module");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L3V0aWxzL2Vycm9yLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9hZGFwdGVycy9sb2dnZXIuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2h0dHAvdXRpbC5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvdXRpbHMvc3RyZWFtLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9vdmVycmlkZXMvY29udmVydGVycy91dGlscy5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29va2llL3NyYy9pbmRleC50cyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3Qvb3ZlcnJpZGVzL2NvbnZlcnRlcnMvZWRnZS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3Qvb3ZlcnJpZGVzL3dyYXBwZXJzL2Nsb3VkZmxhcmUtbm9kZS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3Qvb3ZlcnJpZGVzL3RhZ0NhY2hlL2R1bW15LmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9vdmVycmlkZXMvcXVldWUvZHVtbXkuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L292ZXJyaWRlcy9pbmNyZW1lbnRhbENhY2hlL2R1bW15LmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9vdmVycmlkZXMvYXNzZXRSZXNvbHZlci9kdW1teS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3Qvb3ZlcnJpZGVzL3Byb3h5RXh0ZXJuYWxSZXF1ZXN0L2ZldGNoLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9vdmVycmlkZXMvY2RuSW52YWxpZGF0aW9uL2R1bW15LmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9hZGFwdGVycy9jb25maWcvaW5kZXguanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2FkYXB0ZXJzL2NvbmZpZy91dGlsLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9jb3JlL2NyZWF0ZU1haW5IYW5kbGVyLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9hZGFwdGVycy91dGlsLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9jb3JlL3JlcXVlc3RIYW5kbGVyLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9odHRwL29wZW5OZXh0UmVzcG9uc2UuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2h0dHAvcmVxdWVzdC5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvdXRpbHMvcHJvbWlzZS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9wYXRjaEFzeW5jU3RvcmFnZS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nL3V0aWwuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L3V0aWxzL2JpbmFyeS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nL2kxOG4vaW5kZXguanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvcm91dGluZy9pMThuL2FjY2VwdC1oZWFkZXIuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvcm91dGluZy9xdWV1ZS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nSGFuZGxlci5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nL2NhY2hlSW50ZXJjZXB0b3IuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L3V0aWxzL2NhY2hlLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9jb3JlL3JvdXRpbmcvbWF0Y2hlci5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nL3JvdXRlTWF0Y2hlci5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yb3V0aW5nL21pZGRsZXdhcmUuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2NvcmUvdXRpbC5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yZXF1aXJlLWhvb2tzLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9jb3JlL3Jlc29sdmUuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2FkYXB0ZXJzL3NlcnZlci1hZGFwdGVyLmpzIl0sCiAgIm1hcHBpbmdzIjog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dUJBQXVCLE9BQU87QUFFL0MsYUFBVyxRQUFRLE1BQU0sYUFBYSxhQUFhLFVBQVUsS0FBSztBQUNsRSxhQUFXLG1CQUFtQixNQUFNLHdCQUF3QixhQUFhLFVBQVUsZ0JBQWdCO0FBQ25HLGFBQVcsV0FBVyxNQUFNLGdCQUFnQixhQUFhLFVBQVUsUUFBUTtBQUMzRSxNQUFJLE9BQU8sWUFBWSxhQUFhLE1BQU07QUFDdEMsZUFBVyxnQkFBZ0IsTUFBTSxxQkFBcUIsV0FBVyxlQUFlLFlBQVksYUFBYTtBQUFBLEVBQzdHO0FBQ0EsYUFBVyx1QkFBdUIsTUFBTSxvQkFBb0IsYUFBYSxVQUFVLG9CQUFvQjtBQUN2RyxhQUFXLHlCQUF5QixNQUFNLHVCQUF1QixhQUFhLFVBQVUsZUFBZTtBQUV2RyxRQUFNQyxhQUFZLE1BQU0saUJBQWlCLGFBQWEsVUFBVSxTQUFTO0FBRXpFLFFBQU0sRUFBRSxTQUFTLEtBQUssSUFBSSxNQUFNLGVBQWUsYUFBYSxVQUFVLE9BQU87QUFDN0UsUUFBTSxpQkFBaUIsSUFBSTtBQUMzQixTQUFPLFFBQVEsaUJBQWlCQSxVQUFTO0FBQzdDOzs7QXFCdEJBLFdBQVc7QUFDWCxjQUFjO0FBQ2QsZ0NBQWdDO0FBRWhDLFdBQVcsZ0JBQWdCO0FBSXBCLElBQU1DLFdBQVUsTUFBTSxrQkFBa0I7QUFJL0MsU0FBUyxrQ0FBa0M7QUFHdkMsVUFBUSxNQUFNLFNBQVM7QUFDM0I7QUFDQSxTQUFTLGdCQUFnQjtBQUdyQixVQUFRLElBQUksZ0JBQWdCO0FBQ2hDOyIsCiAgIm5hbWVzIjogWyJlcnJvciIsICJwYXJzZSIsICJCdWZmZXIiLCAiY29va2llUGFyc2VyIiwgIk5VTExfQk9EWV9TVEFUVVNFUyIsICJoYW5kbGVyIiwgImNvbnZlcnRlciIsICJkdW1teV9leHBvcnRzIiwgImR1bW15X2RlZmF1bHQiLCAiaW5pdF9kdW1teSIsICJkdW1teV9leHBvcnRzIiwgImR1bW15X2RlZmF1bHQiLCAiaW5pdF9kdW1teSIsICJkdW1teV9leHBvcnRzIiwgImR1bW15X2RlZmF1bHQiLCAiaW5pdF9kdW1teSIsICJkdW1teV9leHBvcnRzIiwgImR1bW15X2RlZmF1bHQiLCAiaW5pdF9kdW1teSIsICJwYXRoIiwgInBhdGgiLCAiUmVhZGFibGUiLCAicGFydHMiLCAicGF0aCIsICJwYXRoIiwgIlJlYWRhYmxlIiwgIm1pZGRsZXdhcmVNYW5pZmVzdCIsICJDb21tb25IZWFkZXJzIiwgInBhdGgiLCAibW9kIiwgInJlc29sdmVGaWxlbmFtZSIsICJjb252ZXJ0ZXIiLCAiY29udmVydGVyIiwgImhhbmRsZXIiXQp9Cg==
