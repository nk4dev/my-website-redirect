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

// node_modules/@opennextjs/aws/dist/adapters/composable-cache.js
var composable_cache_exports = {};
__export(composable_cache_exports, {
  default: () => composable_cache_default
});
module.exports = __toCommonJS(composable_cache_exports);

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
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

// node_modules/@opennextjs/aws/dist/utils/stream.js
var import_node_stream = require("node:stream");
function fromReadableStream(stream, base64) {
  const reader = stream.getReader();
  const chunks = [];
  return new Promise((resolve, reject) => {
    function pump() {
      reader.read().then(({ done, value }) => {
        if (done) {
          resolve(Buffer.concat(chunks).toString(base64 ? "base64" : "utf8"));
          return;
        }
        chunks.push(value);
        pump();
      }).catch(reject);
    }
    pump();
  });
}
function toReadableStream(value, isBase64) {
  return import_node_stream.Readable.toWeb(import_node_stream.Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}

// node_modules/@opennextjs/aws/dist/adapters/composable-cache.js
var pendingWritePromiseMap = /* @__PURE__ */ new Map();
var composable_cache_default = {
  async get(cacheKey) {
    try {
      if (pendingWritePromiseMap.has(cacheKey)) {
        const stored = pendingWritePromiseMap.get(cacheKey);
        if (stored) {
          return stored.then((entry) => ({
            ...entry,
            value: toReadableStream(entry.value)
          }));
        }
      }
      const result = await globalThis.incrementalCache.get(cacheKey, "composable");
      if (!result?.value?.value) {
        return void 0;
      }
      debug("composable cache result", result);
      if (globalThis.tagCache.mode === "nextMode" && result.value.tags.length > 0) {
        const hasBeenRevalidated = result.shouldBypassTagCache ? false : await globalThis.tagCache.hasBeenRevalidated(result.value.tags, result.lastModified);
        if (hasBeenRevalidated)
          return void 0;
      } else if (globalThis.tagCache.mode === "original" || globalThis.tagCache.mode === void 0) {
        const hasBeenRevalidated = result.shouldBypassTagCache ? false : await globalThis.tagCache.getLastModified(cacheKey, result.lastModified) === -1;
        if (hasBeenRevalidated)
          return void 0;
      }
      return {
        ...result.value,
        value: toReadableStream(result.value.value)
      };
    } catch (e) {
      debug("Cannot read composable cache entry");
      return void 0;
    }
  },
  async set(cacheKey, pendingEntry) {
    const promiseEntry = pendingEntry.then(async (entry2) => ({
      ...entry2,
      value: await fromReadableStream(entry2.value)
    }));
    pendingWritePromiseMap.set(cacheKey, promiseEntry);
    const entry = await promiseEntry.finally(() => {
      pendingWritePromiseMap.delete(cacheKey);
    });
    await globalThis.incrementalCache.set(cacheKey, {
      ...entry,
      value: entry.value
    }, "composable");
    if (globalThis.tagCache.mode === "original") {
      const storedTags = await globalThis.tagCache.getByPath(cacheKey);
      const tagsToWrite = entry.tags.filter((tag) => !storedTags.includes(tag));
      if (tagsToWrite.length > 0) {
        await writeTags(tagsToWrite.map((tag) => ({ tag, path: cacheKey })));
      }
    }
  },
  async refreshTags() {
    return;
  },
  async getExpiration(...tags) {
    if (globalThis.tagCache.mode === "nextMode") {
      return globalThis.tagCache.getLastRevalidated(tags);
    }
    return 0;
  },
  async expireTags(...tags) {
    if (globalThis.tagCache.mode === "nextMode") {
      return writeTags(tags);
    }
    const tagCache = globalThis.tagCache;
    const revalidatedAt = Date.now();
    const pathsToUpdate = await Promise.all(tags.map(async (tag) => {
      const paths = await tagCache.getByTag(tag);
      return paths.map((path) => ({
        path,
        tag,
        revalidatedAt
      }));
    }));
    const setToWrite = /* @__PURE__ */ new Set();
    for (const entry of pathsToUpdate.flat()) {
      setToWrite.add(entry);
    }
    await writeTags(Array.from(setToWrite));
  },
  // This one is necessary for older versions of next
  async receiveExpiredTags(...tags) {
    return;
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2FkYXB0ZXJzL2NvbXBvc2FibGUtY2FjaGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L2FkYXB0ZXJzL2xvZ2dlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvdXRpbHMvY2FjaGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L3V0aWxzL3N0cmVhbS5qcyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQ08sU0FBUyxTQUFTLE1BQU07QUFDM0IsTUFBSSxXQUFXLGVBQWU7QUFDMUIsWUFBUSxJQUFJLEdBQUcsSUFBSTtBQUFBLEVBQ3ZCO0FBQ0o7OztBQzRCQSxTQUFTLFVBQVUsS0FBSztBQUNwQixNQUFJLE9BQU8sUUFBUSxVQUFVO0FBQ3pCLFdBQU87QUFBQSxFQUNYO0FBQ0EsU0FBTyxLQUFLLFVBQVU7QUFBQSxJQUNsQixLQUFLLElBQUk7QUFBQSxJQUNULE1BQU0sSUFBSTtBQUFBLEVBQ2QsQ0FBQztBQUNMO0FBQ0EsZUFBc0IsVUFBVSxNQUFNO0FBQ2xDLFFBQU0sUUFBUSxXQUFXLGNBQWMsU0FBUztBQUNoRCxRQUFNLGdCQUFnQixNQUFNLEtBQUs7QUFDakMsTUFBSSxDQUFDLFNBQVMsV0FBVyxlQUFlLFdBQVcsaUJBQWlCO0FBQ2hFO0FBQUEsRUFDSjtBQUNBLFFBQU0sY0FBYyxLQUFLLE9BQU8sQ0FBQyxNQUFNO0FBQ25DLFVBQU0sU0FBUyxVQUFVLENBQUM7QUFDMUIsVUFBTSxjQUFjLENBQUMsTUFBTSxZQUFZLElBQUksTUFBTTtBQUdqRCxRQUFJLGFBQWE7QUFDYixZQUFNLFlBQVksSUFBSSxNQUFNO0FBQUEsSUFDaEM7QUFDQSxXQUFPO0FBQUEsRUFDWCxDQUFDO0FB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
