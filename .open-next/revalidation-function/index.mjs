globalThis.openNextDebug = true;globalThis.openNextVersion = "3.7.6";
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

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

// node_modules/@opennextjs/aws/dist/overrides/converters/sqs-revalidate.js
var sqs_revalidate_exports = {};
__export(sqs_revalidate_exports, {
  default: () => sqs_revalidate_default
});
var converter, sqs_revalidate_default;
var init_sqs_revalidate = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/sqs-revalidate.js"() {
    converter = {
      convertFrom(event) {
        const records = event.Records.map((record) => {
          const { host, url } = JSON.parse(record.body);
          return { host, url, id: record.messageId };
        });
        return Promise.resolve({
          type: "revalidate",
          records
        });
      },
      convertTo(revalidateEvent) {
        return Promise.resolve({
          type: "revalidate",
          batchItemFailures: revalidateEvent.records.map((record) => ({
            itemIdentifier: record.id
          }))
        });
      },
      name: "sqs-revalidate"
    };
    sqs_revalidate_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/aws-lambda.js
var aws_lambda_exports = {};
__export(aws_lambda_exports, {
  default: () => aws_lambda_default,
  formatWarmerResponse: () => formatWarmerResponse
});
import { Writable } from "node:stream";
function formatWarmerResponse(event) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ serverId, type: "warmer" });
    }, event.delay);
  });
}
var handler, aws_lambda_default;
var init_aws_lambda = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/aws-lambda.js"() {
    handler = async (handler3, converter2) => async (event) => {
      if ("type" in event) {
        return formatWarmerResponse(event);
      }
      const internalEvent = await converter2.convertFrom(event);
      const fakeStream = {
        writeHeaders: () => {
          return new Writable({
            write: (_chunk, _encoding, callback) => {
              callback();
            }
          });
        }
      };
      const response = await handler3(internalEvent, {
        streamCreator: fakeStream
      });
      return converter2.convertTo(response, event);
    };
    aws_lambda_default = {
      wrapper: handler,
      name: "aws-lambda",
      supportStreaming: false
    };
  }
});

// node_modules/@opennextjs/aws/dist/adapters/revalidate.js
import fs from "node:fs";
import https from "node:https";
import path from "node:path";

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_sqs_revalidate(), sqs_revalidate_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_aws_lambda(), aws_lambda_exports));
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

// node_modules/@opennextjs/aws/dist/adapters/revalidate.js
init_logger();
var prerenderManifest = loadPrerenderManifest();
var defaultHandler = async (event) => {
  const failedRecords = [];
  for (const record of event.records) {
    const { host, url } = record;
    debug("Revalidating stale page", { host, url });
    try {
      await new Promise((resolve, reject) => {
        const req = https.request(`https://${host}${url}`, {
          method: "HEAD",
          headers: {
            "x-prerender-revalidate": prerenderManifest.preview.previewModeId,
            "x-isr": "1"
          }
        }, (res) => {
          debug("revalidating", {
            url,
            host,
            headers: res.headers,
            statusCode: res.statusCode
          });
          if (res.statusCode !== 200 || res.headers["x-nextjs-cache"] !== "REVALIDATED") {
            failedRecords.push(record);
          }
          resolve(res);
        });
        req.on("error", (err) => {
          error("Error revalidating page", { host, url });
          reject(err);
        });
        req.end();
      });
    } catch (err) {
      failedRecords.push(record);
    }
  }
  if (failedRecords.length > 0) {
    error(`Failed to revalidate ${failedRecords.length} pages`, {
      failedRecords
    });
  }
  return {
    type: "revalidate",
    // Records returned here are the ones that failed to revalidate
    records: failedRecords
  };
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "revalidate"
});
function loadPrerenderManifest() {
  const filePath = path.join("prerender-manifest.json");
  const json = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(json);
}
export {
  handler2 as handler
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L3V0aWxzL2Vycm9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9hZGFwdGVycy9sb2dnZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVubmV4dGpzL2F3cy9kaXN0L292ZXJyaWRlcy9jb252ZXJ0ZXJzL3Nxcy1yZXZhbGlkYXRlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9Ab3Blbm5leHRqcy9hd3MvZGlzdC9vdmVycmlkZXMvd3JhcHBlcnMvYXdzLWxhbWJkYS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvYWRhcHRlcnMvcmV2YWxpZGF0ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9jcmVhdGVHZW5lcmljSGFuZGxlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5uZXh0anMvYXdzL2Rpc3QvY29yZS9yZXNvbHZlLmpzIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7O0FBZ0NPLFNBQVMsZ0JBQWdCLEdBQUc7QUFDL0IsTUFBSTtBQUNBLFdBQU8sd0JBQXdCO0FBQUEsRUFDbkMsUUFDTTtBQUNGLFdBQU87QUFBQSxFQUNYO0FBQ0o7QUF2Q0E7QUFBQTtBQUFBO0FBQUE7OztBQ0NPLFNBQVMsU0FBUyxNQUFNO0FBQzNCLE1BQUksV0FBVyxlQUFlO0FBQzFCLFlBQVEsSUFBSSxHQUFHLElBQUk7QUFBQSxFQUN2QjtBQUNKO0FBQ08sU0FBUyxRQUFRLE1BQU07QUFDMUIsVUFBUSxLQUFLLEdBQUcsSUFBSTtBQUN4QjtBQVlPLFNBQVMsU0FBUyxNQUFNO0FBRTNCLE1BQUksS0FBSyxLQUFLLENBQUMsUUFBUSxxQkFBcUIsR0FBRyxDQUFDLEdBQUc7QUFDL0MsV0FBTyxNQUFNLEdBQUcsSUFBSTtBQUFBLEVBQ3hCO0FBQ0Es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QkFBYyxLQUFLLE1BQU07QUFBQSxJQUM3QjtBQUFBLEVBQ0o7QUFDQSxNQUFJLGNBQWMsU0FBUyxHQUFHO0FBQzFCLFVBQU0sd0JBQXdCLGNBQWMsTUFBTSxVQUFVO0FBQUEsTUFDeEQ7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUNMO0FBQ0EsU0FBTztBQUFBLElBQ0gsTUFBTTtBQUFBO0FBQUEsSUFFTixTQUFTO0FBQUEsRUFDYjtBQUNKO0FBQ08sSUFBTUMsV0FBVSxNQUFNLHFCQUFxQjtBQUFBLEVBQzlDLFNBQVM7QUFBQSxFQUNULE1BQU07QUFDVixDQUFDO0FBQ0QsU0FBUyx3QkFBd0I7QUFDN0IsUUFBTSxXQUFXLEtBQUssS0FBSyx5QkFBeUI7QUFDcEQsUUFBTSxPQUFPLEdBQUcsYUFBYSxVQUFVLE9BQU87QUFDOUMsU0FBTyxLQUFLLE1BQU0sSUFBSTtBQUMxQjsiLAogICJuYW1lcyI6IFsiZXJyb3IiLCAiaGFuZGxlciIsICJjb252ZXJ0ZXIiLCAiY29udmVydGVyIiwgImhhbmRsZXIiLCAiY29udmVydGVyIiwgImhhbmRsZXIiXQp9Cg==
