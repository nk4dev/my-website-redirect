globalThis.disableIncrementalCache = false;globalThis.disableDynamoDBCache = false;globalThis.isNextAfter15 = true;globalThis.openNextDebug = true;globalThis.openNextVersion = "3.7.6";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/adapters/cache.js
var cache_exports = {};
__export(cache_exports, {
  SOFT_TAG_PREFIX: () => SOFT_TAG_PREFIX,
  default: () => Cache
});
module.exports = __toCommonJS(cache_exports);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
var DOWNPLAYED_ERROR_LOGS = [
  {
    clientName: "S3Client",
    commandName: "GetObjectCommand",
    errorName: "NoSuchKey"
  }
];
var isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
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

// node_modules/@opennextjs/aws/dist/utils/cache.js
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
function getTagKey(tag) {
  if (typeof tag === "string") {
    return tag;
  }
  return JSON.stringify({
    tag: tag.tag,
    path: tag.path
  });
}
async function writeTags(tags) {
  const store = globalThis.__openNextAls.getStore();
  debug("Writing tags", tags, store);
  if (!store || globalThis.openNextConfig.dangerous?.disableTagCache) {
    return;
  }
  const tagsToWrite = tags.filter((t) => {
    const tagKey = getTagKey(t);
    const shouldWrite = !store.writtenTags.has(tagKey);
    if (shouldWrite) {
      store.writtenTags.add(tagKey);
    }
    return shouldWrite;
  });
  if (tagsToWrite.length === 0) {
    return;
  }
  await globalThis.tagCache.writeTags(tagsToWrite);
}

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

// node_modules/@opennextjs/aws/dist/adapters/cache.js
var SOFT_TAG_PREFIX = "_N_T_/";
function isFetchCache(options) {
  if (typeof options === "boolean") {
    return options;
  }
  if (typeof options === "object") {
    return options.kindHint === "fetch" || options.fetchCache || options.kind === "FETCH";
  }
  return false;
}
var Cache = class {
  async get(key, options) {
    if (globalThis.openNextConfig.dangerous?.disableIncrementalCache) {
      return null;
    }
    const softTags = typeof options === "object" ? options.softTags : [];
    const tags = typeof options === "object" ? options.tags : [];
    return isFetchCache(options) ? this.getFetchCache(key, softTags, tags) : this.getIncrementalCache(key);
  }
  async getFetchCache(key, softTags, tags) {
    debug("get fetch cache", { key, softTags, tags });
    try {
      const cachedEntry = await globalThis.incrementalCache.get(key, "fetch");
      if (cachedEntry?.value === void 0)
        return null;
      const _tags = [...tags ?? [], ...softTags ?? []];
      const _lastModified = cachedEntry.lastModified ?? Date.now();
      const _hasBeenRevalidated = cachedEntry.shouldBypassTagCache ? false : await hasBeenRevalidated(key, _tags, cachedEntry);
      if (_hasBeenRevalidated)
        return null;
      if ((tags ?? []).length === 0) {
        const path = softTags?.find((tag) => tag.startsWith(SOFT_TAG_PREFIX) && !tag.endsWith("layout") && !tag.endsWith("page"));
        if (path) {
          const hasPathBeenUpdated = cachedEntry.shouldBypassTagCache ? false : await hasBeenRevalidated(path.replace(SOFT_TAG_PREFIX, ""), [], cachedEntry);
          if (hasPathBeenUpdated) {
            return null;
          }
        }
      }
      return {
        lastModified: _lastModified,
        value: cachedEntry.value
      };
    } catch (e) {
      debug("Failed to get fetch cache", e);
      return null;
    }
  }
  async getIncrementalCache(key) {
    try {
      const cachedEntry = await globalThis.incrementalCache.get(key, "cache");
      if (!cachedEntry?.value) {
        return null;
      }
      const cacheData = cachedEntry.value;
      const meta = cacheData.meta;
      const tags = getTagsFromValue(cacheData);
      const _lastModified = cachedEntry.lastModified ?? Date.now();
      const _hasBeenRevalidated = cachedEntry.shouldBypassTagCache ? false : await hasBeenRevalidated(key, tags, cachedEntry);
      if (_hasBeenRevalidated)
        return null;
      const store = globalThis.__openNextAls.getStore();
      if (store) {
        store.lastModified = _lastModified;
      }
      if (cacheData?.type === "route") {
        return {
          lastModified: _lastModified,
          value: {
            kind: globalThis.isNextAfter15 ? "APP_ROUTE" : "ROUTE",
            body: Buffer.from(cacheData.body ?? Buffer.alloc(0), isBinaryContentType(String(meta?.headers?.["content-type"])) ? "base64" : "utf8"),
            status: meta?.status,
            headers: meta?.headers
          }
        };
      }
      if (cacheData?.type === "page" || cacheData?.type === "app") {
        if (globalThis.isNextAfter15 && cacheData?.type === "app") {
          return {
            lastModified: _lastModified,
            value: {
              kind: "APP_PAGE",
              html: cacheData.html,
              rscData: Buffer.from(cacheData.rsc),
              status: meta?.status,
              headers: meta?.headers,
              postponed: meta?.postponed
            }
          };
        }
        return {
          lastModified: _lastModified,
          value: {
            kind: globalThis.isNextAfter15 ? "PAGES" : "PAGE",
            html: cacheData.html,
            pageData: cacheData.type === "page" ? cacheData.json : cacheData.rsc,
            status: meta?.status,
            headers: meta?.headers
          }
        };
      }
      if (cacheData?.type === "redirect") {
        return {
          lastModified: _lastModified,
          value: {
            kind: "REDIRECT",
            props: cacheData.props
          }
        };
      }
      warn("Unknown cache type", cacheData);
      return null;
    } catch (e) {
      debug("Failed to get body cache", e);
      return null;
    }
  }
  async set(key, data, ctx) {
    if (globalThis.openNextConfig.dangerous?.disableIncrementalCache) {
      return;
    }
    const detachedPromise = globalThis.__openNextAls.getStore()?.pendingPromiseRunner.withResolvers();
    try {
      if (data === null || data === void 0) {
        await globalThis.incrementalCache.delete(key);
      } else {
        const revalidate = this.extractRevalidateForSet(ctx);
        switch (data.kind) {
          case "ROUTE":
          case "APP_ROUTE": {
            const { body, status, headers } = data;
            await globalThis.incrementalCache.set(key, {
              type: "route",
              body: body.toString(isBinaryContentType(String(headers["content-type"])) ? "base64" : "utf8"),
              meta: {
                status,
                headers
              },
              revalidate
            }, "cache");
            break;
          }
          case "PAGE":
          case "PAGES": {
            const { html, pageData, status, headers } = data;
            const isAppPath = typeof pageData === "string";
            if (isAppPath) {
              await globalThis.incrementalCache.set(key, {
                type: "app",
                html,
                rsc: pageData,
                meta: {
                  status,
                  headers
                },
                revalidate
              }, "cache");
            } else {
              await globalThis.incrementalCache.set(key, {
                type: "page",
                html,
                json: pageData,
                revalidate
              }, "cache");
            }
            break;
          }
          case "APP_PAGE": {
            const { html, rscData, headers, status } = data;
            await globalThis.incrementalCache.set(key, {
              type: "app",
              html,
              rsc: rscData.toString("utf8"),
              meta: {
                status,
                headers
              },
              revalidate
            }, "cache");
            break;
          }
          case "FETCH":
            await globalThis.incrementalCache.set(key, data, "fetch");
            break;
          case "REDIRECT":
            await globalThis.incrementalCache.set(key, {
              type: "redirect",
              props: data.props,
              revalidate
            }, "cache");
            break;
          case "IMAGE":
            break;
        }
      }
      await this.updateTagsOnSet(key, data, ctx);
      debug("Finished setting cache");
    } catch (e) {
      error("Failed to set cache", e);
    } finally {
      detachedPromise?.resolve();
    }
  }
  async revalidateTag(tags) {
    const config = globalThis.openNextConfig.dangerous;
    if (config?.disableTagCache || config?.disableIncrementalCache) {
      return;
    }
    const _tags = Array.isArray(tags) ? tags : [tags];
    if (_tags.length === 0) {
      return;
    }
    try {
      if (globalThis.tagCache.mode === "nextMode") {
        const paths = await globalThis.tagCache.getPathsByTags?.(_tags) ?? [];
        await writeTags(_tags);
        if (paths.length > 0) {
          await globalThis.cdnInvalidationHandler.invalidatePaths(paths.map((path) => ({
            initialPath: path,
            rawPath: path,
            resolvedRoutes: [
              {
                route: path,
                // TODO: ideally here we should check if it's an app router page or route
                type: "app"
              }
            ]
          })));
        }
        return;
      }
      for (const tag of _tags) {
        debug("revalidateTag", tag);
        const paths = await globalThis.tagCache.getByTag(tag);
        debug("Items", paths);
        const toInsert = paths.map((path) => ({
          path,
          tag
        }));
        if (tag.startsWith(SOFT_TAG_PREFIX)) {
          for (const path of paths) {
            const _tags2 = await globalThis.tagCache.getByPath(path);
            const hardTags = _tags2.filter((t) => !t.startsWith(SOFT_TAG_PREFIX));
            for (const hardTag of hardTags) {
              const _paths = await globalThis.tagCache.getByTag(hardTag);
              debug({ hardTag, _paths });
              toInsert.push(..._paths.map((path2) => ({
                path: path2,
                tag: hardTag
              })));
            }
          }
        }
        await writeTags(toInsert);
        const uniquePaths = Array.from(new Set(toInsert.filter((t) => t.tag.startsWith(SOFT_TAG_PREFIX)).map((t) => `/${t.path}`)));
        if (uniquePaths.length > 0) {
          await globalThis.cdnInvalidationHandler.invalidatePaths(uniquePaths.map((path) => ({
            initialPath: path,
            rawPath: path,
            resolvedRoutes: [
              {
                route: path,
                // TODO: ideally here we should check if it's an app router page or route
                type: "app"
              }
            ]
          })));
        }
      }
    } catch (e) {
      error("Failed to revalidate tag", e);
    }
  }
  // TODO: We should delete/update tags in this method
  // This will require an update to the tag cache interface
  async updateTagsOnSet(key, data, ctx) {
    if (globalThis.openNextConfig.dangerous?.disableTagCache || globalThis.tagCache.mode === "nextMode" || // Here it means it's a delete
    !data) {
      return;
    }
    const derivedTags = data?.kind === "FETCH" ? (
      //@ts-expect-error - On older versions of next, ctx was a number, but for these cases we use data?.data?.tags
      ctx?.tags ?? data?.data?.tags ?? []
    ) : data?.kind === "PAGE" ? data.headers?.["x-next-cache-tags"]?.split(",") ?? [] : [];
    debug("derivedTags", derivedTags);
    const storedTags = await globalThis.tagCache.getByPath(key);
    const tagsToWrite = derivedTags.filter((tag) => !storedTags.includes(tag));
    if (tagsToWrite.length > 0) {
      await writeTags(tagsToWrite.map((tag) => ({
        path: key,
        tag,
        // In case the tags are not there we just need to create them
        // but we don't want them to return from `getLastModified` as they are not stale
        revalidatedAt: 1
      })));
    }
  }
  extractRevalidateForSet(ctx) {
    if (ctx === void 0) {
      return void 0;
    }
    if (typeof ctx === "number" || ctx === false) {
      return ctx;
    }
    if ("revalidate" in ctx) {
      return ctx.revalidate;
    }
    if ("cacheControl" in ctx) {
      return ctx.cacheControl?.revalidate;
    }
    return void 0;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SOFT_TAG_PREFIX
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2FkYXB0ZXJzL2NhY2hlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC91dGlscy9lcnJvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvYWRhcHRlcnMvbG9nZ2VyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC91dGlscy9jYWNoZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvdXRpbHMvYmluYXJ5LmpzIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ2dDTyxTQUFTLGdCQUFnQixHQUFHO0FBQy9CLE1BQUk7QUFDQSxXQUFPLHdCQUF3QjtBQUFBLEVBQ25DLFFBQ007QUFDRixXQUFPO0FBQUEsRUFDWDtBQUNKOzs7QUN0Q08sU0FBUyxTQUFTLE1BQU07QUFDM0IsTUFBSSxXQUFXLGVBQWU7QUFDMUIsWUFBUSxJQUFJLEdBQUcsSUFBSTtBQUFBLEVBQ3ZCO0FBQ0o7QUFDTyxTQUFTLFFBQVEsTUFBTTtBQUMxQixVQUFRLEtBQUssR0FBRyxJQUFJO0FBQ3hCO0FBQ0EsSUFBTSx3QkFBd0I7QUFBQSxFQUMxQjtBQUFBLElBQ0ksWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLEVBQ2Y7QUFDSjtBQUNBLElBQU0sdUJBQXVCLENBQUMsYUFBYSxzQkFBc0IsS0FBSyxDQUFDLG9CQUFvQixnQkFBZ0IsZUFBZSxVQUFVLGNBQ2hJLGdCQUFnQixnQkFBZ0IsVUFBVSxnQkFDekMsZ0JBQWdCLGNBQWMsVUFBVSxPQUFPLFFBQzVDLGdCQUFnQixjQUFjLFVBQVUsT0FBTyxLQUFLO0FBQ3JELFNBQVMsU0FBUyxNQUFNO0FBRTNCLE1B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ZUFBZSxDQUFDLEVBQy9DLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlCLFlBQUksWUFBWSxTQUFTLEdBQUc7QUFDeEIsZ0JBQU0sV0FBVyx1QkFBdUIsZ0JBQWdCLFlBQVksSUFBSSxDQUFDLFVBQVU7QUFBQSxZQUMvRSxhQUFhO0FBQUEsWUFDYixTQUFTO0FBQUEsWUFDVCxnQkFBZ0I7QUFBQSxjQUNaO0FBQUEsZ0JBQ0ksT0FBTztBQUFBO0FBQUEsZ0JBRVAsTUFBTTtBQUFBLGNBQ1Y7QUFBQSxZQUNKO0FBQUEsVUFDSixFQUFFLENBQUM7QUFBQSxRQUNQO0FBQUEsTUFDSjtBQUFBLElBQ0osU0FDTyxHQUFHO0FBQ04sWUFBTSw0QkFBNEIsQ0FBQztBQUFBLElBQ3ZDO0FBQUEsRUFDSjtBQUFBO0FBQUE7QUFBQSxFQUdBLE1BQU0sZ0JBQWdCLEtBQUssTUFBTSxLQUFLO0FBQ2xDLFFBQUksV0FBVyxlQUFlLFdBQVcsbUJBQ3JDLFdBQVcsU0FBUyxTQUFTO0FBQUEsSUFFN0IsQ0FBQyxNQUFNO0FBQ1A7QUFBQSxJQUNKO0FBR0EsVUFBTSxjQUFjLE1BQU0sU0FBUztBQUFBO0FBQUEsTUFFMUIsS0FBSyxRQUFRLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFBQSxRQUNyQyxNQUFNLFNBQVMsU0FDVixLQUFLLFVBQVUsbUJBQW1CLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUNyRCxDQUFDO0FBQ1gsVUFBTSxlQUFlLFdBQVc7QUFHaEMsVUFBTSxhQUFhLE1BQU0sV0FBVyxTQUFTLFVBQVUsR0FBRztBQUMxRCxVQUFNLGNBQWMsWUFBWSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsU0FBUyxHQUFHLENBQUM7QUFDekUsUUFBSSxZQUFZLFNBQVMsR0FBRztBQUN4QixZQUFNLFVBQVUsWUFBWSxJQUFJLENBQUMsU0FBUztBQUFBLFFBQ3RDLE1BQU07QUFBQSxRQUNOO0FBQUE7QUFBQTtBQUFBLFFBR0EsZUFBZTtBQUFBLE1BQ25CLEVBQUUsQ0FBQztBQUFBLElBQ1A7QUFBQSxFQUNKO0FBQUEsRUFDQSx3QkFBd0IsS0FBSztBQUN6QixRQUFJLFFBQVEsUUFBVztBQUNuQixhQUFPO0FBQUEsSUFDWDtBQUNBLFFBQUksT0FBTyxRQUFRLFlBQVksUUFBUSxPQUFPO0FBQzFDLGFBQU87QUFBQSxJQUNYO0FBQ0EsUUFBSSxnQkFBZ0IsS0FBSztBQUNyQixhQUFPLElBQUk7QUFBQSxJQUNmO0FBQ0EsUUFBSSxrQkFBa0IsS0FBSztBQUN2QixhQUFPLElBQUksY0FBYztBQUFBLElBQzdCO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFDSjsiLAogICJuYW1lcyI6IFsiZXJyb3IiLCAiX3RhZ3MiLCAicGF0aCJdCn0K
