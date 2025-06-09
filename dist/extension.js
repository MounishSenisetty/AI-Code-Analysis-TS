"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/decamelize/index.js
var require_decamelize = __commonJS({
  "node_modules/decamelize/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(str, sep) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      sep = typeof sep === "undefined" ? "_" : sep;
      return str.replace(/([a-z\d])([A-Z])/g, "$1" + sep + "$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + sep + "$2").toLowerCase();
    };
  }
});

// node_modules/camelcase/index.js
var require_camelcase = __commonJS({
  "node_modules/camelcase/index.js"(exports2, module2) {
    "use strict";
    var UPPERCASE = /[\p{Lu}]/u;
    var LOWERCASE = /[\p{Ll}]/u;
    var LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
    var IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
    var SEPARATORS = /[_.\- ]+/;
    var LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
    var SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
    var NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
    var preserveCamelCase = (string, toLowerCase, toUpperCase) => {
      let isLastCharLower = false;
      let isLastCharUpper = false;
      let isLastLastCharUpper = false;
      for (let i = 0; i < string.length; i++) {
        const character = string[i];
        if (isLastCharLower && UPPERCASE.test(character)) {
          string = string.slice(0, i) + "-" + string.slice(i);
          isLastCharLower = false;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = true;
          i++;
        } else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
          string = string.slice(0, i - 1) + "-" + string.slice(i - 1);
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = false;
          isLastCharLower = true;
        } else {
          isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
        }
      }
      return string;
    };
    var preserveConsecutiveUppercase = (input, toLowerCase) => {
      LEADING_CAPITAL.lastIndex = 0;
      return input.replace(LEADING_CAPITAL, (m1) => toLowerCase(m1));
    };
    var postProcess = (input, toUpperCase) => {
      SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
      NUMBERS_AND_IDENTIFIER.lastIndex = 0;
      return input.replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier)).replace(NUMBERS_AND_IDENTIFIER, (m) => toUpperCase(m));
    };
    var camelCase2 = (input, options) => {
      if (!(typeof input === "string" || Array.isArray(input))) {
        throw new TypeError("Expected the input to be `string | string[]`");
      }
      options = {
        pascalCase: false,
        preserveConsecutiveUppercase: false,
        ...options
      };
      if (Array.isArray(input)) {
        input = input.map((x) => x.trim()).filter((x) => x.length).join("-");
      } else {
        input = input.trim();
      }
      if (input.length === 0) {
        return "";
      }
      const toLowerCase = options.locale === false ? (string) => string.toLowerCase() : (string) => string.toLocaleLowerCase(options.locale);
      const toUpperCase = options.locale === false ? (string) => string.toUpperCase() : (string) => string.toLocaleUpperCase(options.locale);
      if (input.length === 1) {
        return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
      }
      const hasUpperCase = input !== toLowerCase(input);
      if (hasUpperCase) {
        input = preserveCamelCase(input, toLowerCase, toUpperCase);
      }
      input = input.replace(LEADING_SEPARATORS, "");
      if (options.preserveConsecutiveUppercase) {
        input = preserveConsecutiveUppercase(input, toLowerCase);
      } else {
        input = toLowerCase(input);
      }
      if (options.pascalCase) {
        input = toUpperCase(input.charAt(0)) + input.slice(1);
      }
      return postProcess(input, toUpperCase);
    };
    module2.exports = camelCase2;
    module2.exports.default = camelCase2;
  }
});

// node_modules/retry/lib/retry_operation.js
var require_retry_operation = __commonJS({
  "node_modules/retry/lib/retry_operation.js"(exports2, module2) {
    function RetryOperation(timeouts, options) {
      if (typeof options === "boolean") {
        options = { forever: options };
      }
      this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
      this._timeouts = timeouts;
      this._options = options || {};
      this._maxRetryTime = options && options.maxRetryTime || Infinity;
      this._fn = null;
      this._errors = [];
      this._attempts = 1;
      this._operationTimeout = null;
      this._operationTimeoutCb = null;
      this._timeout = null;
      this._operationStart = null;
      this._timer = null;
      if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
      }
    }
    module2.exports = RetryOperation;
    RetryOperation.prototype.reset = function() {
      this._attempts = 1;
      this._timeouts = this._originalTimeouts.slice(0);
    };
    RetryOperation.prototype.stop = function() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timeouts = [];
      this._cachedTimeouts = null;
    };
    RetryOperation.prototype.retry = function(err) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (!err) {
        return false;
      }
      var currentTime = (/* @__PURE__ */ new Date()).getTime();
      if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error("RetryOperation timeout occurred"));
        return false;
      }
      this._errors.push(err);
      var timeout = this._timeouts.shift();
      if (timeout === void 0) {
        if (this._cachedTimeouts) {
          this._errors.splice(0, this._errors.length - 1);
          timeout = this._cachedTimeouts.slice(-1);
        } else {
          return false;
        }
      }
      var self2 = this;
      this._timer = setTimeout(function() {
        self2._attempts++;
        if (self2._operationTimeoutCb) {
          self2._timeout = setTimeout(function() {
            self2._operationTimeoutCb(self2._attempts);
          }, self2._operationTimeout);
          if (self2._options.unref) {
            self2._timeout.unref();
          }
        }
        self2._fn(self2._attempts);
      }, timeout);
      if (this._options.unref) {
        this._timer.unref();
      }
      return true;
    };
    RetryOperation.prototype.attempt = function(fn, timeoutOps) {
      this._fn = fn;
      if (timeoutOps) {
        if (timeoutOps.timeout) {
          this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
          this._operationTimeoutCb = timeoutOps.cb;
        }
      }
      var self2 = this;
      if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
          self2._operationTimeoutCb();
        }, self2._operationTimeout);
      }
      this._operationStart = (/* @__PURE__ */ new Date()).getTime();
      this._fn(this._attempts);
    };
    RetryOperation.prototype.try = function(fn) {
      console.log("Using RetryOperation.try() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = function(fn) {
      console.log("Using RetryOperation.start() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = RetryOperation.prototype.try;
    RetryOperation.prototype.errors = function() {
      return this._errors;
    };
    RetryOperation.prototype.attempts = function() {
      return this._attempts;
    };
    RetryOperation.prototype.mainError = function() {
      if (this._errors.length === 0) {
        return null;
      }
      var counts = {};
      var mainError = null;
      var mainErrorCount = 0;
      for (var i = 0; i < this._errors.length; i++) {
        var error = this._errors[i];
        var message = error.message;
        var count = (counts[message] || 0) + 1;
        counts[message] = count;
        if (count >= mainErrorCount) {
          mainError = error;
          mainErrorCount = count;
        }
      }
      return mainError;
    };
  }
});

// node_modules/retry/lib/retry.js
var require_retry = __commonJS({
  "node_modules/retry/lib/retry.js"(exports2) {
    var RetryOperation = require_retry_operation();
    exports2.operation = function(options) {
      var timeouts = exports2.timeouts(options);
      return new RetryOperation(timeouts, {
        forever: options && (options.forever || options.retries === Infinity),
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
      });
    };
    exports2.timeouts = function(options) {
      if (options instanceof Array) {
        return [].concat(options);
      }
      var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1e3,
        maxTimeout: Infinity,
        randomize: false
      };
      for (var key in options) {
        opts[key] = options[key];
      }
      if (opts.minTimeout > opts.maxTimeout) {
        throw new Error("minTimeout is greater than maxTimeout");
      }
      var timeouts = [];
      for (var i = 0; i < opts.retries; i++) {
        timeouts.push(this.createTimeout(i, opts));
      }
      if (options && options.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i, opts));
      }
      timeouts.sort(function(a, b) {
        return a - b;
      });
      return timeouts;
    };
    exports2.createTimeout = function(attempt, opts) {
      var random = opts.randomize ? Math.random() + 1 : 1;
      var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
      timeout = Math.min(timeout, opts.maxTimeout);
      return timeout;
    };
    exports2.wrap = function(obj, options, methods) {
      if (options instanceof Array) {
        methods = options;
        options = null;
      }
      if (!methods) {
        methods = [];
        for (var key in obj) {
          if (typeof obj[key] === "function") {
            methods.push(key);
          }
        }
      }
      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        var original = obj[method];
        obj[method] = function retryWrapper(original2) {
          var op = exports2.operation(options);
          var args = Array.prototype.slice.call(arguments, 1);
          var callback = args.pop();
          args.push(function(err) {
            if (op.retry(err)) {
              return;
            }
            if (err) {
              arguments[0] = op.mainError();
            }
            callback.apply(this, arguments);
          });
          op.attempt(function() {
            original2.apply(obj, args);
          });
        }.bind(obj, original);
        obj[method].options = options;
      }
    };
  }
});

// node_modules/retry/index.js
var require_retry2 = __commonJS({
  "node_modules/retry/index.js"(exports2, module2) {
    module2.exports = require_retry();
  }
});

// node_modules/p-retry/index.js
var require_p_retry = __commonJS({
  "node_modules/p-retry/index.js"(exports2, module2) {
    "use strict";
    var retry = require_retry2();
    var networkErrorMsgs = [
      "Failed to fetch",
      // Chrome
      "NetworkError when attempting to fetch resource.",
      // Firefox
      "The Internet connection appears to be offline.",
      // Safari
      "Network request failed"
      // `cross-fetch`
    ];
    var AbortError = class extends Error {
      constructor(message) {
        super();
        if (message instanceof Error) {
          this.originalError = message;
          ({ message } = message);
        } else {
          this.originalError = new Error(message);
          this.originalError.stack = this.stack;
        }
        this.name = "AbortError";
        this.message = message;
      }
    };
    var decorateErrorWithCounts = (error, attemptNumber, options) => {
      const retriesLeft = options.retries - (attemptNumber - 1);
      error.attemptNumber = attemptNumber;
      error.retriesLeft = retriesLeft;
      return error;
    };
    var isNetworkError = (errorMessage) => networkErrorMsgs.includes(errorMessage);
    var pRetry4 = (input, options) => new Promise((resolve2, reject) => {
      options = {
        onFailedAttempt: () => {
        },
        retries: 10,
        ...options
      };
      const operation = retry.operation(options);
      operation.attempt(async (attemptNumber) => {
        try {
          resolve2(await input(attemptNumber));
        } catch (error) {
          if (!(error instanceof Error)) {
            reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
            return;
          }
          if (error instanceof AbortError) {
            operation.stop();
            reject(error.originalError);
          } else if (error instanceof TypeError && !isNetworkError(error.message)) {
            operation.stop();
            reject(error);
          } else {
            decorateErrorWithCounts(error, attemptNumber, options);
            try {
              await options.onFailedAttempt(error);
            } catch (error2) {
              reject(error2);
              return;
            }
            if (!operation.retry(error)) {
              reject(operation.mainError());
            }
          }
        }
      });
    });
    module2.exports = pRetry4;
    module2.exports.default = pRetry4;
    module2.exports.AbortError = AbortError;
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports2, module2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter;
    }
  }
});

// node_modules/p-finally/index.js
var require_p_finally = __commonJS({
  "node_modules/p-finally/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (promise, onFinally) => {
      onFinally = onFinally || (() => {
      });
      return promise.then(
        (val) => new Promise((resolve2) => {
          resolve2(onFinally());
        }).then(() => val),
        (err) => new Promise((resolve2) => {
          resolve2(onFinally());
        }).then(() => {
          throw err;
        })
      );
    };
  }
});

// node_modules/p-timeout/index.js
var require_p_timeout = __commonJS({
  "node_modules/p-timeout/index.js"(exports2, module2) {
    "use strict";
    var pFinally = require_p_finally();
    var TimeoutError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "TimeoutError";
      }
    };
    var pTimeout = (promise, milliseconds, fallback) => new Promise((resolve2, reject) => {
      if (typeof milliseconds !== "number" || milliseconds < 0) {
        throw new TypeError("Expected `milliseconds` to be a positive number");
      }
      if (milliseconds === Infinity) {
        resolve2(promise);
        return;
      }
      const timer = setTimeout(() => {
        if (typeof fallback === "function") {
          try {
            resolve2(fallback());
          } catch (error) {
            reject(error);
          }
          return;
        }
        const message = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
        const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);
        if (typeof promise.cancel === "function") {
          promise.cancel();
        }
        reject(timeoutError);
      }, milliseconds);
      pFinally(
        // eslint-disable-next-line promise/prefer-await-to-then
        promise.then(resolve2, reject),
        () => {
          clearTimeout(timer);
        }
      );
    });
    module2.exports = pTimeout;
    module2.exports.default = pTimeout;
    module2.exports.TimeoutError = TimeoutError;
  }
});

// node_modules/p-queue/dist/lower-bound.js
var require_lower_bound = __commonJS({
  "node_modules/p-queue/dist/lower-bound.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function lowerBound(array, value, comparator) {
      let first = 0;
      let count = array.length;
      while (count > 0) {
        const step = count / 2 | 0;
        let it = first + step;
        if (comparator(array[it], value) <= 0) {
          first = ++it;
          count -= step + 1;
        } else {
          count = step;
        }
      }
      return first;
    }
    exports2.default = lowerBound;
  }
});

// node_modules/p-queue/dist/priority-queue.js
var require_priority_queue = __commonJS({
  "node_modules/p-queue/dist/priority-queue.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var lower_bound_1 = require_lower_bound();
    var PriorityQueue = class {
      constructor() {
        this._queue = [];
      }
      enqueue(run, options) {
        options = Object.assign({ priority: 0 }, options);
        const element = {
          priority: options.priority,
          run
        };
        if (this.size && this._queue[this.size - 1].priority >= options.priority) {
          this._queue.push(element);
          return;
        }
        const index2 = lower_bound_1.default(this._queue, element, (a, b) => b.priority - a.priority);
        this._queue.splice(index2, 0, element);
      }
      dequeue() {
        const item = this._queue.shift();
        return item === null || item === void 0 ? void 0 : item.run;
      }
      filter(options) {
        return this._queue.filter((element) => element.priority === options.priority).map((element) => element.run);
      }
      get size() {
        return this._queue.length;
      }
    };
    exports2.default = PriorityQueue;
  }
});

// node_modules/p-queue/dist/index.js
var require_dist = __commonJS({
  "node_modules/p-queue/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var EventEmitter = require_eventemitter3();
    var p_timeout_1 = require_p_timeout();
    var priority_queue_1 = require_priority_queue();
    var empty = () => {
    };
    var timeoutError = new p_timeout_1.TimeoutError();
    var PQueue = class extends EventEmitter {
      constructor(options) {
        var _a, _b, _c, _d;
        super();
        this._intervalCount = 0;
        this._intervalEnd = 0;
        this._pendingCount = 0;
        this._resolveEmpty = empty;
        this._resolveIdle = empty;
        options = Object.assign({ carryoverConcurrencyCount: false, intervalCap: Infinity, interval: 0, concurrency: Infinity, autoStart: true, queueClass: priority_queue_1.default }, options);
        if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
          throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""}\` (${typeof options.intervalCap})`);
        }
        if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
          throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""}\` (${typeof options.interval})`);
        }
        this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
        this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
        this._intervalCap = options.intervalCap;
        this._interval = options.interval;
        this._queue = new options.queueClass();
        this._queueClass = options.queueClass;
        this.concurrency = options.concurrency;
        this._timeout = options.timeout;
        this._throwOnTimeout = options.throwOnTimeout === true;
        this._isPaused = options.autoStart === false;
      }
      get _doesIntervalAllowAnother() {
        return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
      }
      get _doesConcurrentAllowAnother() {
        return this._pendingCount < this._concurrency;
      }
      _next() {
        this._pendingCount--;
        this._tryToStartAnother();
        this.emit("next");
      }
      _resolvePromises() {
        this._resolveEmpty();
        this._resolveEmpty = empty;
        if (this._pendingCount === 0) {
          this._resolveIdle();
          this._resolveIdle = empty;
          this.emit("idle");
        }
      }
      _onResumeInterval() {
        this._onInterval();
        this._initializeIntervalIfNeeded();
        this._timeoutId = void 0;
      }
      _isIntervalPaused() {
        const now = Date.now();
        if (this._intervalId === void 0) {
          const delay = this._intervalEnd - now;
          if (delay < 0) {
            this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
          } else {
            if (this._timeoutId === void 0) {
              this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, delay);
            }
            return true;
          }
        }
        return false;
      }
      _tryToStartAnother() {
        if (this._queue.size === 0) {
          if (this._intervalId) {
            clearInterval(this._intervalId);
          }
          this._intervalId = void 0;
          this._resolvePromises();
          return false;
        }
        if (!this._isPaused) {
          const canInitializeInterval = !this._isIntervalPaused();
          if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
            const job = this._queue.dequeue();
            if (!job) {
              return false;
            }
            this.emit("active");
            job();
            if (canInitializeInterval) {
              this._initializeIntervalIfNeeded();
            }
            return true;
          }
        }
        return false;
      }
      _initializeIntervalIfNeeded() {
        if (this._isIntervalIgnored || this._intervalId !== void 0) {
          return;
        }
        this._intervalId = setInterval(() => {
          this._onInterval();
        }, this._interval);
        this._intervalEnd = Date.now() + this._interval;
      }
      _onInterval() {
        if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
          clearInterval(this._intervalId);
          this._intervalId = void 0;
        }
        this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
        this._processQueue();
      }
      /**
      Executes all queued functions until it reaches the limit.
      */
      _processQueue() {
        while (this._tryToStartAnother()) {
        }
      }
      get concurrency() {
        return this._concurrency;
      }
      set concurrency(newConcurrency) {
        if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
          throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
        }
        this._concurrency = newConcurrency;
        this._processQueue();
      }
      /**
      Adds a sync or async task to the queue. Always returns a promise.
      */
      async add(fn, options = {}) {
        return new Promise((resolve2, reject) => {
          const run = async () => {
            this._pendingCount++;
            this._intervalCount++;
            try {
              const operation = this._timeout === void 0 && options.timeout === void 0 ? fn() : p_timeout_1.default(Promise.resolve(fn()), options.timeout === void 0 ? this._timeout : options.timeout, () => {
                if (options.throwOnTimeout === void 0 ? this._throwOnTimeout : options.throwOnTimeout) {
                  reject(timeoutError);
                }
                return void 0;
              });
              resolve2(await operation);
            } catch (error) {
              reject(error);
            }
            this._next();
          };
          this._queue.enqueue(run, options);
          this._tryToStartAnother();
          this.emit("add");
        });
      }
      /**
          Same as `.add()`, but accepts an array of sync or async functions.
      
          @returns A promise that resolves when all functions are resolved.
          */
      async addAll(functions, options) {
        return Promise.all(functions.map(async (function_) => this.add(function_, options)));
      }
      /**
      Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
      */
      start() {
        if (!this._isPaused) {
          return this;
        }
        this._isPaused = false;
        this._processQueue();
        return this;
      }
      /**
      Put queue execution on hold.
      */
      pause() {
        this._isPaused = true;
      }
      /**
      Clear the queue.
      */
      clear() {
        this._queue = new this._queueClass();
      }
      /**
          Can be called multiple times. Useful if you for example add additional items at a later time.
      
          @returns A promise that settles when the queue becomes empty.
          */
      async onEmpty() {
        if (this._queue.size === 0) {
          return;
        }
        return new Promise((resolve2) => {
          const existingResolve = this._resolveEmpty;
          this._resolveEmpty = () => {
            existingResolve();
            resolve2();
          };
        });
      }
      /**
          The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
      
          @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
          */
      async onIdle() {
        if (this._pendingCount === 0 && this._queue.size === 0) {
          return;
        }
        return new Promise((resolve2) => {
          const existingResolve = this._resolveIdle;
          this._resolveIdle = () => {
            existingResolve();
            resolve2();
          };
        });
      }
      /**
      Size of the queue.
      */
      get size() {
        return this._queue.size;
      }
      /**
          Size of the queue, filtered by the given options.
      
          For example, this can be used to find the number of items remaining in the queue with a specific priority level.
          */
      sizeBy(options) {
        return this._queue.filter(options).length;
      }
      /**
      Number of pending promises.
      */
      get pending() {
        return this._pendingCount;
      }
      /**
      Whether the queue is currently paused.
      */
      get isPaused() {
        return this._isPaused;
      }
      get timeout() {
        return this._timeout;
      }
      /**
      Set the timeout for future operations.
      */
      set timeout(milliseconds) {
        this._timeout = milliseconds;
      }
    };
    exports2.default = PQueue;
  }
});

// node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "node_modules/semver/internal/constants.js"(exports2, module2) {
    "use strict";
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module2.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/semver/internal/debug.js"(exports2, module2) {
    "use strict";
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});

// node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/semver/internal/re.js"(exports2, module2) {
    "use strict";
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug = require_debug();
    exports2 = module2.exports = {};
    var re = exports2.re = [];
    var safeRe = exports2.safeRe = [];
    var src = exports2.src = [];
    var safeSrc = exports2.safeSrc = [];
    var t = exports2.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index2 = R++;
      debug(name, index2, value);
      t[name] = index2;
      src[index2] = value;
      safeSrc[index2] = safe;
      re[index2] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index2] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports2.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports2.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports2.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/semver/internal/parse-options.js"(exports2, module2) {
    "use strict";
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module2.exports = parseOptions;
  }
});

// node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/semver/internal/identifiers.js"(exports2, module2) {
    "use strict";
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/semver/classes/semver.js"(exports2, module2) {
    "use strict";
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class _SemVer {
      constructor(version2, options) {
        options = parseOptions(options);
        if (version2 instanceof _SemVer) {
          if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) {
            return version2;
          } else {
            version2 = version2.version;
          }
        } else if (typeof version2 !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version2}".`);
        }
        if (version2.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version2, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version2.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version2}`);
        }
        this.raw = version2;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
            if (!match || match[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "node_modules/semver/functions/parse.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = (version2, options, throwErrors = false) => {
      if (version2 instanceof SemVer) {
        return version2;
      }
      try {
        return new SemVer(version2, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    };
    module2.exports = parse;
  }
});

// node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "node_modules/semver/functions/valid.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var valid = (version2, options) => {
      const v = parse(version2, options);
      return v ? v.version : null;
    };
    module2.exports = valid;
  }
});

// node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "node_modules/semver/functions/clean.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var clean = (version2, options) => {
      const s = parse(version2.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    };
    module2.exports = clean;
  }
});

// node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "node_modules/semver/functions/inc.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var inc = (version2, release, options, identifier, identifierBase) => {
      if (typeof options === "string") {
        identifierBase = identifier;
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version2 instanceof SemVer ? version2.version : version2,
          options
        ).inc(release, identifier, identifierBase).version;
      } catch (er) {
        return null;
      }
    };
    module2.exports = inc;
  }
});

// node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "node_modules/semver/functions/diff.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var diff = (version1, version2) => {
      const v1 = parse(version1, null, true);
      const v2 = parse(version2, null, true);
      const comparison = v1.compare(v2);
      if (comparison === 0) {
        return null;
      }
      const v1Higher = comparison > 0;
      const highVersion = v1Higher ? v1 : v2;
      const lowVersion = v1Higher ? v2 : v1;
      const highHasPre = !!highVersion.prerelease.length;
      const lowHasPre = !!lowVersion.prerelease.length;
      if (lowHasPre && !highHasPre) {
        if (!lowVersion.patch && !lowVersion.minor) {
          return "major";
        }
        if (lowVersion.compareMain(highVersion) === 0) {
          if (lowVersion.minor && !lowVersion.patch) {
            return "minor";
          }
          return "patch";
        }
      }
      const prefix = highHasPre ? "pre" : "";
      if (v1.major !== v2.major) {
        return prefix + "major";
      }
      if (v1.minor !== v2.minor) {
        return prefix + "minor";
      }
      if (v1.patch !== v2.patch) {
        return prefix + "patch";
      }
      return "prerelease";
    };
    module2.exports = diff;
  }
});

// node_modules/semver/functions/major.js
var require_major = __commonJS({
  "node_modules/semver/functions/major.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var major = (a, loose) => new SemVer(a, loose).major;
    module2.exports = major;
  }
});

// node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "node_modules/semver/functions/minor.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module2.exports = minor;
  }
});

// node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "node_modules/semver/functions/patch.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var patch = (a, loose) => new SemVer(a, loose).patch;
    module2.exports = patch;
  }
});

// node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "node_modules/semver/functions/prerelease.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var prerelease = (version2, options) => {
      const parsed = parse(version2, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module2.exports = prerelease;
  }
});

// node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "node_modules/semver/functions/compare.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var compare2 = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module2.exports = compare2;
  }
});

// node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "node_modules/semver/functions/rcompare.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var rcompare = (a, b, loose) => compare2(b, a, loose);
    module2.exports = rcompare;
  }
});

// node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "node_modules/semver/functions/compare-loose.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var compareLoose = (a, b) => compare2(a, b, true);
    module2.exports = compareLoose;
  }
});

// node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "node_modules/semver/functions/compare-build.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var compareBuild = (a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module2.exports = compareBuild;
  }
});

// node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "node_modules/semver/functions/sort.js"(exports2, module2) {
    "use strict";
    var compareBuild = require_compare_build();
    var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
    module2.exports = sort;
  }
});

// node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "node_modules/semver/functions/rsort.js"(exports2, module2) {
    "use strict";
    var compareBuild = require_compare_build();
    var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    module2.exports = rsort;
  }
});

// node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "node_modules/semver/functions/gt.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var gt = (a, b, loose) => compare2(a, b, loose) > 0;
    module2.exports = gt;
  }
});

// node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "node_modules/semver/functions/lt.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var lt = (a, b, loose) => compare2(a, b, loose) < 0;
    module2.exports = lt;
  }
});

// node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "node_modules/semver/functions/eq.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var eq = (a, b, loose) => compare2(a, b, loose) === 0;
    module2.exports = eq;
  }
});

// node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "node_modules/semver/functions/neq.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var neq = (a, b, loose) => compare2(a, b, loose) !== 0;
    module2.exports = neq;
  }
});

// node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "node_modules/semver/functions/gte.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var gte = (a, b, loose) => compare2(a, b, loose) >= 0;
    module2.exports = gte;
  }
});

// node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "node_modules/semver/functions/lte.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var lte = (a, b, loose) => compare2(a, b, loose) <= 0;
    module2.exports = lte;
  }
});

// node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "node_modules/semver/functions/cmp.js"(exports2, module2) {
    "use strict";
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module2.exports = cmp;
  }
});

// node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "node_modules/semver/functions/coerce.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = require_parse();
    var { safeRe: re, t } = require_re();
    var coerce2 = (version2, options) => {
      if (version2 instanceof SemVer) {
        return version2;
      }
      if (typeof version2 === "number") {
        version2 = String(version2);
      }
      if (typeof version2 !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version2.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version2)) && (!match || match.index + match[0].length !== version2.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      const major = match[2];
      const minor = match[3] || "0";
      const patch = match[4] || "0";
      const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
      const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
      return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    };
    module2.exports = coerce2;
  }
});

// node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "node_modules/semver/internal/lrucache.js"(exports2, module2) {
    "use strict";
    var LRUCache = class {
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module2.exports = LRUCache;
  }
});

// node_modules/semver/classes/range.js
var require_range = __commonJS({
  "node_modules/semver/classes/range.js"(exports2, module2) {
    "use strict";
    var SPACE_CHARACTERS = /\s+/g;
    var Range2 = class _Range {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached = cache2.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache2.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version2) {
        if (!version2) {
          return false;
        }
        if (typeof version2 === "string") {
          try {
            version2 = new SemVer(version2, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version2, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module2.exports = Range2;
    var LRU = require_lrucache();
    var cache2 = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var replaceTildes = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    };
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    };
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version2, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version2)) {
          return false;
        }
      }
      if (version2.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version2.major && allowed.minor === version2.minor && allowed.patch === version2.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "node_modules/semver/classes/comparator.js"(exports2, module2) {
    "use strict";
    var ANY = Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version2) {
        debug("Comparator.test", version2, this.options.loose);
        if (this.semver === ANY || version2 === ANY) {
          return true;
        }
        if (typeof version2 === "string") {
          try {
            version2 = new SemVer(version2, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version2, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range2(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range2(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module2.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range2 = require_range();
  }
});

// node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "node_modules/semver/functions/satisfies.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range();
    var satisfies = (version2, range, options) => {
      try {
        range = new Range2(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version2);
    };
    module2.exports = satisfies;
  }
});

// node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "node_modules/semver/ranges/to-comparators.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range();
    var toComparators = (range, options) => new Range2(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
    module2.exports = toComparators;
  }
});

// node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "node_modules/semver/ranges/max-satisfying.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range2 = require_range();
    var maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range2(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module2.exports = maxSatisfying;
  }
});

// node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "node_modules/semver/ranges/min-satisfying.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range2 = require_range();
    var minSatisfying = (versions, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range2(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    };
    module2.exports = minSatisfying;
  }
});

// node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "node_modules/semver/ranges/min-version.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range2 = require_range();
    var gt = require_gt();
    var minVersion = (range, loose) => {
      range = new Range2(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module2.exports = minVersion;
  }
});

// node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "node_modules/semver/ranges/valid.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range();
    var validRange = (range, options) => {
      try {
        return new Range2(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module2.exports = validRange;
  }
});

// node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "node_modules/semver/ranges/outside.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range2 = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = (version2, range, hilo, options) => {
      version2 = new SemVer(version2, options);
      range = new Range2(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version2, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version2, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version2, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module2.exports = outside;
  }
});

// node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "node_modules/semver/ranges/gtr.js"(exports2, module2) {
    "use strict";
    var outside = require_outside();
    var gtr = (version2, range, options) => outside(version2, range, ">", options);
    module2.exports = gtr;
  }
});

// node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "node_modules/semver/ranges/ltr.js"(exports2, module2) {
    "use strict";
    var outside = require_outside();
    var ltr = (version2, range, options) => outside(version2, range, "<", options);
    module2.exports = ltr;
  }
});

// node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "node_modules/semver/ranges/intersects.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range();
    var intersects = (r1, r2, options) => {
      r1 = new Range2(r1, options);
      r2 = new Range2(r2, options);
      return r1.intersects(r2, options);
    };
    module2.exports = intersects;
  }
});

// node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "node_modules/semver/ranges/simplify.js"(exports2, module2) {
    "use strict";
    var satisfies = require_satisfies();
    var compare2 = require_compare();
    module2.exports = (versions, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions.sort((a, b) => compare2(a, b, options));
      for (const version2 of v) {
        const included = satisfies(version2, range, options);
        if (included) {
          prev = version2;
          if (!first) {
            first = version2;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "node_modules/semver/ranges/subset.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare2 = require_compare();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range2(sub, options);
      dom = new Range2(dom, options);
      let sawNonNull = false;
      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) {
            continue OUTER;
          }
        }
        if (sawNonNull) {
          return false;
        }
      }
      return true;
    };
    var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
    var minimumVersion = [new Comparator(">=0.0.0")];
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = minimumVersionWithPreRelease;
        } else {
          sub = minimumVersion;
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = minimumVersion;
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt = higherGT(gt, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare2(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) {
          return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt) {
              return false;
            }
          } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    };
    var higherGT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare2(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    };
    var lowerLT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare2(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    };
    module2.exports = subset;
  }
});

// node_modules/semver/index.js
var require_semver2 = __commonJS({
  "node_modules/semver/index.js"(exports2, module2) {
    "use strict";
    var internalRe = require_re();
    var constants = require_constants();
    var SemVer = require_semver();
    var identifiers = require_identifiers();
    var parse = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major = require_major();
    var minor = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare2 = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce2 = require_coerce();
    var Comparator = require_comparator();
    var Range2 = require_range();
    var satisfies = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion = require_min_version();
    var validRange = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module2.exports = {
      parse,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare: compare2,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce: coerce2,
      Comparator,
      Range: Range2,
      satisfies,
      toComparators,
      maxSatisfying,
      minSatisfying,
      minVersion,
      validRange,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: constants.RELEASE_TYPES,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// node_modules/@langchain/core/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/@langchain/core/node_modules/ansi-styles/index.js"(exports2, module2) {
    "use strict";
    var ANSI_BACKGROUND_OFFSET = 10;
    var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
    var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles2 = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          overline: [53, 55],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles2.color.gray = styles2.color.blackBright;
      styles2.bgColor.bgGray = styles2.bgColor.bgBlackBright;
      styles2.color.grey = styles2.color.blackBright;
      styles2.bgColor.bgGrey = styles2.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles2)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles2[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles2[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles2, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles2, "codes", {
        value: codes,
        enumerable: false
      });
      styles2.color.close = "\x1B[39m";
      styles2.bgColor.close = "\x1B[49m";
      styles2.color.ansi256 = wrapAnsi256();
      styles2.color.ansi16m = wrapAnsi16m();
      styles2.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
      styles2.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
      Object.defineProperties(styles2, {
        rgbToAnsi256: {
          value: (red, green, blue) => {
            if (red === green && green === blue) {
              if (red < 8) {
                return 16;
              }
              if (red > 248) {
                return 231;
              }
              return Math.round((red - 8) / 247 * 24) + 232;
            }
            return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
          },
          enumerable: false
        },
        hexToRgb: {
          value: (hex) => {
            const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
            if (!matches) {
              return [0, 0, 0];
            }
            let { colorString } = matches.groups;
            if (colorString.length === 3) {
              colorString = colorString.split("").map((character) => character + character).join("");
            }
            const integer = Number.parseInt(colorString, 16);
            return [
              integer >> 16 & 255,
              integer >> 8 & 255,
              integer & 255
            ];
          },
          enumerable: false
        },
        hexToAnsi256: {
          value: (hex) => styles2.rgbToAnsi256(...styles2.hexToRgb(hex)),
          enumerable: false
        }
      });
      return styles2;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports2) {
    "use strict";
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray;
    exports2.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr2 = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr2[curByte++] = tmp >> 16 & 255;
        arr2[curByte++] = tmp >> 8 & 255;
        arr2[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr2[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr2[curByte++] = tmp >> 8 & 255;
        arr2[curByte++] = tmp & 255;
      }
      return arr2;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/whatwg-fetch/dist/fetch.umd.js
var require_fetch_umd = __commonJS({
  "node_modules/whatwg-fetch/dist/fetch.umd.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global2.WHATWGFetch = {});
    })(exports2, function(exports3) {
      "use strict";
      var g = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || // eslint-disable-next-line no-undef
      typeof global !== "undefined" && global || {};
      var support = {
        searchParams: "URLSearchParams" in g,
        iterable: "Symbol" in g && "iterator" in Symbol,
        blob: "FileReader" in g && "Blob" in g && function() {
          try {
            new Blob();
            return true;
          } catch (e) {
            return false;
          }
        }(),
        formData: "FormData" in g,
        arrayBuffer: "ArrayBuffer" in g
      };
      function isDataView(obj) {
        return obj && DataView.prototype.isPrototypeOf(obj);
      }
      if (support.arrayBuffer) {
        var viewClasses = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ];
        var isArrayBufferView = ArrayBuffer.isView || function(obj) {
          return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
        };
      }
      function normalizeName(name) {
        if (typeof name !== "string") {
          name = String(name);
        }
        if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === "") {
          throw new TypeError('Invalid character in header field name: "' + name + '"');
        }
        return name.toLowerCase();
      }
      function normalizeValue(value) {
        if (typeof value !== "string") {
          value = String(value);
        }
        return value;
      }
      function iteratorFor(items) {
        var iterator = {
          next: function() {
            var value = items.shift();
            return { done: value === void 0, value };
          }
        };
        if (support.iterable) {
          iterator[Symbol.iterator] = function() {
            return iterator;
          };
        }
        return iterator;
      }
      function Headers2(headers) {
        this.map = {};
        if (headers instanceof Headers2) {
          headers.forEach(function(value, name) {
            this.append(name, value);
          }, this);
        } else if (Array.isArray(headers)) {
          headers.forEach(function(header) {
            if (header.length != 2) {
              throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + header.length);
            }
            this.append(header[0], header[1]);
          }, this);
        } else if (headers) {
          Object.getOwnPropertyNames(headers).forEach(function(name) {
            this.append(name, headers[name]);
          }, this);
        }
      }
      Headers2.prototype.append = function(name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue + ", " + value : value;
      };
      Headers2.prototype["delete"] = function(name) {
        delete this.map[normalizeName(name)];
      };
      Headers2.prototype.get = function(name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null;
      };
      Headers2.prototype.has = function(name) {
        return this.map.hasOwnProperty(normalizeName(name));
      };
      Headers2.prototype.set = function(name, value) {
        this.map[normalizeName(name)] = normalizeValue(value);
      };
      Headers2.prototype.forEach = function(callback, thisArg) {
        for (var name in this.map) {
          if (this.map.hasOwnProperty(name)) {
            callback.call(thisArg, this.map[name], name, this);
          }
        }
      };
      Headers2.prototype.keys = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push(name);
        });
        return iteratorFor(items);
      };
      Headers2.prototype.values = function() {
        var items = [];
        this.forEach(function(value) {
          items.push(value);
        });
        return iteratorFor(items);
      };
      Headers2.prototype.entries = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push([name, value]);
        });
        return iteratorFor(items);
      };
      if (support.iterable) {
        Headers2.prototype[Symbol.iterator] = Headers2.prototype.entries;
      }
      function consumed(body) {
        if (body._noBody) return;
        if (body.bodyUsed) {
          return Promise.reject(new TypeError("Already read"));
        }
        body.bodyUsed = true;
      }
      function fileReaderReady(reader) {
        return new Promise(function(resolve2, reject) {
          reader.onload = function() {
            resolve2(reader.result);
          };
          reader.onerror = function() {
            reject(reader.error);
          };
        });
      }
      function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsArrayBuffer(blob);
        return promise;
      }
      function readBlobAsText(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
        var encoding = match ? match[1] : "utf-8";
        reader.readAsText(blob, encoding);
        return promise;
      }
      function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf);
        var chars = new Array(view.length);
        for (var i = 0; i < view.length; i++) {
          chars[i] = String.fromCharCode(view[i]);
        }
        return chars.join("");
      }
      function bufferClone(buf) {
        if (buf.slice) {
          return buf.slice(0);
        } else {
          var view = new Uint8Array(buf.byteLength);
          view.set(new Uint8Array(buf));
          return view.buffer;
        }
      }
      function Body() {
        this.bodyUsed = false;
        this._initBody = function(body) {
          this.bodyUsed = this.bodyUsed;
          this._bodyInit = body;
          if (!body) {
            this._noBody = true;
            this._bodyText = "";
          } else if (typeof body === "string") {
            this._bodyText = body;
          } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body;
          } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body;
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this._bodyText = body.toString();
          } else if (support.arrayBuffer && support.blob && isDataView(body)) {
            this._bodyArrayBuffer = bufferClone(body.buffer);
            this._bodyInit = new Blob([this._bodyArrayBuffer]);
          } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
            this._bodyArrayBuffer = bufferClone(body);
          } else {
            this._bodyText = body = Object.prototype.toString.call(body);
          }
          if (!this.headers.get("content-type")) {
            if (typeof body === "string") {
              this.headers.set("content-type", "text/plain;charset=UTF-8");
            } else if (this._bodyBlob && this._bodyBlob.type) {
              this.headers.set("content-type", this._bodyBlob.type);
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
            }
          }
        };
        if (support.blob) {
          this.blob = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return Promise.resolve(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as blob");
            } else {
              return Promise.resolve(new Blob([this._bodyText]));
            }
          };
        }
        this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var isConsumed = consumed(this);
            if (isConsumed) {
              return isConsumed;
            } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
              return Promise.resolve(
                this._bodyArrayBuffer.buffer.slice(
                  this._bodyArrayBuffer.byteOffset,
                  this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                )
              );
            } else {
              return Promise.resolve(this._bodyArrayBuffer);
            }
          } else if (support.blob) {
            return this.blob().then(readBlobAsArrayBuffer);
          } else {
            throw new Error("could not read as ArrayBuffer");
          }
        };
        this.text = function() {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }
          if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob);
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
          } else if (this._bodyFormData) {
            throw new Error("could not read FormData body as text");
          } else {
            return Promise.resolve(this._bodyText);
          }
        };
        if (support.formData) {
          this.formData = function() {
            return this.text().then(decode);
          };
        }
        this.json = function() {
          return this.text().then(JSON.parse);
        };
        return this;
      }
      var methods = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
      function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return methods.indexOf(upcased) > -1 ? upcased : method;
      }
      function Request(input, options) {
        if (!(this instanceof Request)) {
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        }
        options = options || {};
        var body = options.body;
        if (input instanceof Request) {
          if (input.bodyUsed) {
            throw new TypeError("Already read");
          }
          this.url = input.url;
          this.credentials = input.credentials;
          if (!options.headers) {
            this.headers = new Headers2(input.headers);
          }
          this.method = input.method;
          this.mode = input.mode;
          this.signal = input.signal;
          if (!body && input._bodyInit != null) {
            body = input._bodyInit;
            input.bodyUsed = true;
          }
        } else {
          this.url = String(input);
        }
        this.credentials = options.credentials || this.credentials || "same-origin";
        if (options.headers || !this.headers) {
          this.headers = new Headers2(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || "GET");
        this.mode = options.mode || this.mode || null;
        this.signal = options.signal || this.signal || function() {
          if ("AbortController" in g) {
            var ctrl = new AbortController();
            return ctrl.signal;
          }
        }();
        this.referrer = null;
        if ((this.method === "GET" || this.method === "HEAD") && body) {
          throw new TypeError("Body not allowed for GET or HEAD requests");
        }
        this._initBody(body);
        if (this.method === "GET" || this.method === "HEAD") {
          if (options.cache === "no-store" || options.cache === "no-cache") {
            var reParamSearch = /([?&])_=[^&]*/;
            if (reParamSearch.test(this.url)) {
              this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
            } else {
              var reQueryString = /\?/;
              this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
            }
          }
        }
      }
      Request.prototype.clone = function() {
        return new Request(this, { body: this._bodyInit });
      };
      function decode(body) {
        var form = new FormData();
        body.trim().split("&").forEach(function(bytes) {
          if (bytes) {
            var split = bytes.split("=");
            var name = split.shift().replace(/\+/g, " ");
            var value = split.join("=").replace(/\+/g, " ");
            form.append(decodeURIComponent(name), decodeURIComponent(value));
          }
        });
        return form;
      }
      function parseHeaders(rawHeaders) {
        var headers = new Headers2();
        var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
        preProcessedHeaders.split("\r").map(function(header) {
          return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
        }).forEach(function(line) {
          var parts = line.split(":");
          var key = parts.shift().trim();
          if (key) {
            var value = parts.join(":").trim();
            try {
              headers.append(key, value);
            } catch (error) {
              console.warn("Response " + error.message);
            }
          }
        });
        return headers;
      }
      Body.call(Request.prototype);
      function Response(bodyInit, options) {
        if (!(this instanceof Response)) {
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        }
        if (!options) {
          options = {};
        }
        this.type = "default";
        this.status = options.status === void 0 ? 200 : options.status;
        if (this.status < 200 || this.status > 599) {
          throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
        }
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = options.statusText === void 0 ? "" : "" + options.statusText;
        this.headers = new Headers2(options.headers);
        this.url = options.url || "";
        this._initBody(bodyInit);
      }
      Body.call(Response.prototype);
      Response.prototype.clone = function() {
        return new Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers2(this.headers),
          url: this.url
        });
      };
      Response.error = function() {
        var response = new Response(null, { status: 200, statusText: "" });
        response.ok = false;
        response.status = 0;
        response.type = "error";
        return response;
      };
      var redirectStatuses = [301, 302, 303, 307, 308];
      Response.redirect = function(url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError("Invalid status code");
        }
        return new Response(null, { status, headers: { location: url } });
      };
      exports3.DOMException = g.DOMException;
      try {
        new exports3.DOMException();
      } catch (err) {
        exports3.DOMException = function(message, name) {
          this.message = message;
          this.name = name;
          var error = Error(message);
          this.stack = error.stack;
        };
        exports3.DOMException.prototype = Object.create(Error.prototype);
        exports3.DOMException.prototype.constructor = exports3.DOMException;
      }
      function fetch2(input, init) {
        return new Promise(function(resolve2, reject) {
          var request = new Request(input, init);
          if (request.signal && request.signal.aborted) {
            return reject(new exports3.DOMException("Aborted", "AbortError"));
          }
          var xhr = new XMLHttpRequest();
          function abortXhr() {
            xhr.abort();
          }
          xhr.onload = function() {
            var options = {
              statusText: xhr.statusText,
              headers: parseHeaders(xhr.getAllResponseHeaders() || "")
            };
            if (request.url.indexOf("file://") === 0 && (xhr.status < 200 || xhr.status > 599)) {
              options.status = 200;
            } else {
              options.status = xhr.status;
            }
            options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
            var body = "response" in xhr ? xhr.response : xhr.responseText;
            setTimeout(function() {
              resolve2(new Response(body, options));
            }, 0);
          };
          xhr.onerror = function() {
            setTimeout(function() {
              reject(new TypeError("Network request failed"));
            }, 0);
          };
          xhr.ontimeout = function() {
            setTimeout(function() {
              reject(new TypeError("Network request timed out"));
            }, 0);
          };
          xhr.onabort = function() {
            setTimeout(function() {
              reject(new exports3.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function fixUrl(url) {
            try {
              return url === "" && g.location.href ? g.location.href : url;
            } catch (e) {
              return url;
            }
          }
          xhr.open(request.method, fixUrl(request.url), true);
          if (request.credentials === "include") {
            xhr.withCredentials = true;
          } else if (request.credentials === "omit") {
            xhr.withCredentials = false;
          }
          if ("responseType" in xhr) {
            if (support.blob) {
              xhr.responseType = "blob";
            } else if (support.arrayBuffer) {
              xhr.responseType = "arraybuffer";
            }
          }
          if (init && typeof init.headers === "object" && !(init.headers instanceof Headers2 || g.Headers && init.headers instanceof g.Headers)) {
            var names = [];
            Object.getOwnPropertyNames(init.headers).forEach(function(name) {
              names.push(normalizeName(name));
              xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
            });
            request.headers.forEach(function(value, name) {
              if (names.indexOf(name) === -1) {
                xhr.setRequestHeader(name, value);
              }
            });
          } else {
            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
          }
          if (request.signal) {
            request.signal.addEventListener("abort", abortXhr);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                request.signal.removeEventListener("abort", abortXhr);
              }
            };
          }
          xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
        });
      }
      fetch2.polyfill = true;
      if (!g.fetch) {
        g.fetch = fetch2;
        g.Headers = Headers2;
        g.Request = Request;
        g.Response = Response;
      }
      exports3.Headers = Headers2;
      exports3.Request = Request;
      exports3.Response = Response;
      exports3.fetch = fetch2;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  }
});

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode4 = __toESM(require("vscode"));

// node_modules/@google/generative-ai/dist/index.mjs
var SchemaType;
(function(SchemaType2) {
  SchemaType2["STRING"] = "string";
  SchemaType2["NUMBER"] = "number";
  SchemaType2["INTEGER"] = "integer";
  SchemaType2["BOOLEAN"] = "boolean";
  SchemaType2["ARRAY"] = "array";
  SchemaType2["OBJECT"] = "object";
})(SchemaType || (SchemaType = {}));
var ExecutableCodeLanguage;
(function(ExecutableCodeLanguage2) {
  ExecutableCodeLanguage2["LANGUAGE_UNSPECIFIED"] = "language_unspecified";
  ExecutableCodeLanguage2["PYTHON"] = "python";
})(ExecutableCodeLanguage || (ExecutableCodeLanguage = {}));
var Outcome;
(function(Outcome2) {
  Outcome2["OUTCOME_UNSPECIFIED"] = "outcome_unspecified";
  Outcome2["OUTCOME_OK"] = "outcome_ok";
  Outcome2["OUTCOME_FAILED"] = "outcome_failed";
  Outcome2["OUTCOME_DEADLINE_EXCEEDED"] = "outcome_deadline_exceeded";
})(Outcome || (Outcome = {}));
var POSSIBLE_ROLES = ["user", "model", "function", "system"];
var HarmCategory;
(function(HarmCategory2) {
  HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
  HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
  HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
  HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
  HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
  HarmCategory2["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
})(HarmCategory || (HarmCategory = {}));
var HarmBlockThreshold;
(function(HarmBlockThreshold2) {
  HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
  HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
  HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
})(HarmBlockThreshold || (HarmBlockThreshold = {}));
var HarmProbability;
(function(HarmProbability2) {
  HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
  HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
  HarmProbability2["LOW"] = "LOW";
  HarmProbability2["MEDIUM"] = "MEDIUM";
  HarmProbability2["HIGH"] = "HIGH";
})(HarmProbability || (HarmProbability = {}));
var BlockReason;
(function(BlockReason2) {
  BlockReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
  BlockReason2["SAFETY"] = "SAFETY";
  BlockReason2["OTHER"] = "OTHER";
})(BlockReason || (BlockReason = {}));
var FinishReason;
(function(FinishReason2) {
  FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
  FinishReason2["STOP"] = "STOP";
  FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
  FinishReason2["SAFETY"] = "SAFETY";
  FinishReason2["RECITATION"] = "RECITATION";
  FinishReason2["LANGUAGE"] = "LANGUAGE";
  FinishReason2["BLOCKLIST"] = "BLOCKLIST";
  FinishReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
  FinishReason2["SPII"] = "SPII";
  FinishReason2["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
  FinishReason2["OTHER"] = "OTHER";
})(FinishReason || (FinishReason = {}));
var TaskType;
(function(TaskType2) {
  TaskType2["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
  TaskType2["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
  TaskType2["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
  TaskType2["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
  TaskType2["CLASSIFICATION"] = "CLASSIFICATION";
  TaskType2["CLUSTERING"] = "CLUSTERING";
})(TaskType || (TaskType = {}));
var FunctionCallingMode;
(function(FunctionCallingMode2) {
  FunctionCallingMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  FunctionCallingMode2["AUTO"] = "AUTO";
  FunctionCallingMode2["ANY"] = "ANY";
  FunctionCallingMode2["NONE"] = "NONE";
})(FunctionCallingMode || (FunctionCallingMode = {}));
var DynamicRetrievalMode;
(function(DynamicRetrievalMode2) {
  DynamicRetrievalMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  DynamicRetrievalMode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
})(DynamicRetrievalMode || (DynamicRetrievalMode = {}));
var GoogleGenerativeAIError = class extends Error {
  constructor(message) {
    super(`[GoogleGenerativeAI Error]: ${message}`);
  }
};
var GoogleGenerativeAIResponseError = class extends GoogleGenerativeAIError {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
};
var GoogleGenerativeAIFetchError = class extends GoogleGenerativeAIError {
  constructor(message, status, statusText, errorDetails) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.errorDetails = errorDetails;
  }
};
var GoogleGenerativeAIRequestInputError = class extends GoogleGenerativeAIError {
};
var GoogleGenerativeAIAbortError = class extends GoogleGenerativeAIError {
};
var DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com";
var DEFAULT_API_VERSION = "v1beta";
var PACKAGE_VERSION = "0.24.1";
var PACKAGE_LOG_HEADER = "genai-js";
var Task;
(function(Task2) {
  Task2["GENERATE_CONTENT"] = "generateContent";
  Task2["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
  Task2["COUNT_TOKENS"] = "countTokens";
  Task2["EMBED_CONTENT"] = "embedContent";
  Task2["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
})(Task || (Task = {}));
var RequestUrl = class {
  constructor(model, task, apiKey, stream, requestOptions) {
    this.model = model;
    this.task = task;
    this.apiKey = apiKey;
    this.stream = stream;
    this.requestOptions = requestOptions;
  }
  toString() {
    var _a, _b;
    const apiVersion = ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) || DEFAULT_API_VERSION;
    const baseUrl = ((_b = this.requestOptions) === null || _b === void 0 ? void 0 : _b.baseUrl) || DEFAULT_BASE_URL;
    let url = `${baseUrl}/${apiVersion}/${this.model}:${this.task}`;
    if (this.stream) {
      url += "?alt=sse";
    }
    return url;
  }
};
function getClientHeaders(requestOptions) {
  const clientHeaders = [];
  if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
    clientHeaders.push(requestOptions.apiClient);
  }
  clientHeaders.push(`${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`);
  return clientHeaders.join(" ");
}
async function getHeaders(url) {
  var _a;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("x-goog-api-client", getClientHeaders(url.requestOptions));
  headers.append("x-goog-api-key", url.apiKey);
  let customHeaders = (_a = url.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders;
  if (customHeaders) {
    if (!(customHeaders instanceof Headers)) {
      try {
        customHeaders = new Headers(customHeaders);
      } catch (e) {
        throw new GoogleGenerativeAIRequestInputError(`unable to convert customHeaders value ${JSON.stringify(customHeaders)} to Headers: ${e.message}`);
      }
    }
    for (const [headerName, headerValue] of customHeaders.entries()) {
      if (headerName === "x-goog-api-key") {
        throw new GoogleGenerativeAIRequestInputError(`Cannot set reserved header name ${headerName}`);
      } else if (headerName === "x-goog-api-client") {
        throw new GoogleGenerativeAIRequestInputError(`Header name ${headerName} can only be set using the apiClient field`);
      }
      headers.append(headerName, headerValue);
    }
  }
  return headers;
}
async function constructModelRequest(model, task, apiKey, stream, body, requestOptions) {
  const url = new RequestUrl(model, task, apiKey, stream, requestOptions);
  return {
    url: url.toString(),
    fetchOptions: Object.assign(Object.assign({}, buildFetchOptions(requestOptions)), { method: "POST", headers: await getHeaders(url), body })
  };
}
async function makeModelRequest(model, task, apiKey, stream, body, requestOptions = {}, fetchFn = fetch) {
  const { url, fetchOptions } = await constructModelRequest(model, task, apiKey, stream, body, requestOptions);
  return makeRequest(url, fetchOptions, fetchFn);
}
async function makeRequest(url, fetchOptions, fetchFn = fetch) {
  let response;
  try {
    response = await fetchFn(url, fetchOptions);
  } catch (e) {
    handleResponseError(e, url);
  }
  if (!response.ok) {
    await handleResponseNotOk(response, url);
  }
  return response;
}
function handleResponseError(e, url) {
  let err = e;
  if (err.name === "AbortError") {
    err = new GoogleGenerativeAIAbortError(`Request aborted when fetching ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
  } else if (!(e instanceof GoogleGenerativeAIFetchError || e instanceof GoogleGenerativeAIRequestInputError)) {
    err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
  }
  throw err;
}
async function handleResponseNotOk(response, url) {
  let message = "";
  let errorDetails;
  try {
    const json = await response.json();
    message = json.error.message;
    if (json.error.details) {
      message += ` ${JSON.stringify(json.error.details)}`;
      errorDetails = json.error.details;
    }
  } catch (e) {
  }
  throw new GoogleGenerativeAIFetchError(`Error fetching from ${url.toString()}: [${response.status} ${response.statusText}] ${message}`, response.status, response.statusText, errorDetails);
}
function buildFetchOptions(requestOptions) {
  const fetchOptions = {};
  if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) !== void 0 || (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
    const controller = new AbortController();
    if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
      setTimeout(() => controller.abort(), requestOptions.timeout);
    }
    if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) {
      requestOptions.signal.addEventListener("abort", () => {
        controller.abort();
      });
    }
    fetchOptions.signal = controller.signal;
  }
  return fetchOptions;
}
function addHelpers(response) {
  response.text = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getText(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return "";
  };
  response.functionCall = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      console.warn(`response.functionCall() is deprecated. Use response.functionCalls() instead.`);
      return getFunctionCalls(response)[0];
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  response.functionCalls = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getFunctionCalls(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  return response;
}
function getText(response) {
  var _a, _b, _c, _d;
  const textStrings = [];
  if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
    for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
      if (part.text) {
        textStrings.push(part.text);
      }
      if (part.executableCode) {
        textStrings.push("\n```" + part.executableCode.language + "\n" + part.executableCode.code + "\n```\n");
      }
      if (part.codeExecutionResult) {
        textStrings.push("\n```\n" + part.codeExecutionResult.output + "\n```\n");
      }
    }
  }
  if (textStrings.length > 0) {
    return textStrings.join("");
  } else {
    return "";
  }
}
function getFunctionCalls(response) {
  var _a, _b, _c, _d;
  const functionCalls = [];
  if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
    for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
      if (part.functionCall) {
        functionCalls.push(part.functionCall);
      }
    }
  }
  if (functionCalls.length > 0) {
    return functionCalls;
  } else {
    return void 0;
  }
}
var badFinishReasons = [
  FinishReason.RECITATION,
  FinishReason.SAFETY,
  FinishReason.LANGUAGE
];
function hadBadFinishReason(candidate) {
  return !!candidate.finishReason && badFinishReasons.includes(candidate.finishReason);
}
function formatBlockErrorMessage(response) {
  var _a, _b, _c;
  let message = "";
  if ((!response.candidates || response.candidates.length === 0) && response.promptFeedback) {
    message += "Response was blocked";
    if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
      message += ` due to ${response.promptFeedback.blockReason}`;
    }
    if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
      message += `: ${response.promptFeedback.blockReasonMessage}`;
    }
  } else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
    const firstCandidate = response.candidates[0];
    if (hadBadFinishReason(firstCandidate)) {
      message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
      if (firstCandidate.finishMessage) {
        message += `: ${firstCandidate.finishMessage}`;
      }
    }
  }
  return message;
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function(v) {
      return new Promise(function(a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
var responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
function processStream(response) {
  const inputStream = response.body.pipeThrough(new TextDecoderStream("utf8", { fatal: true }));
  const responseStream = getResponseStream(inputStream);
  const [stream1, stream2] = responseStream.tee();
  return {
    stream: generateResponseSequence(stream1),
    response: getResponsePromise(stream2)
  };
}
async function getResponsePromise(stream) {
  const allResponses = [];
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return addHelpers(aggregateResponses(allResponses));
    }
    allResponses.push(value);
  }
}
function generateResponseSequence(stream) {
  return __asyncGenerator(this, arguments, function* generateResponseSequence_1() {
    const reader = stream.getReader();
    while (true) {
      const { value, done } = yield __await(reader.read());
      if (done) {
        break;
      }
      yield yield __await(addHelpers(value));
    }
  });
}
function getResponseStream(inputStream) {
  const reader = inputStream.getReader();
  const stream = new ReadableStream({
    start(controller) {
      let currentText = "";
      return pump();
      function pump() {
        return reader.read().then(({ value, done }) => {
          if (done) {
            if (currentText.trim()) {
              controller.error(new GoogleGenerativeAIError("Failed to parse stream"));
              return;
            }
            controller.close();
            return;
          }
          currentText += value;
          let match = currentText.match(responseLineRE);
          let parsedResponse;
          while (match) {
            try {
              parsedResponse = JSON.parse(match[1]);
            } catch (e) {
              controller.error(new GoogleGenerativeAIError(`Error parsing JSON response: "${match[1]}"`));
              return;
            }
            controller.enqueue(parsedResponse);
            currentText = currentText.substring(match[0].length);
            match = currentText.match(responseLineRE);
          }
          return pump();
        }).catch((e) => {
          let err = e;
          err.stack = e.stack;
          if (err.name === "AbortError") {
            err = new GoogleGenerativeAIAbortError("Request aborted when reading from the stream");
          } else {
            err = new GoogleGenerativeAIError("Error reading from the stream");
          }
          throw err;
        });
      }
    }
  });
  return stream;
}
function aggregateResponses(responses) {
  const lastResponse = responses[responses.length - 1];
  const aggregatedResponse = {
    promptFeedback: lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback
  };
  for (const response of responses) {
    if (response.candidates) {
      let candidateIndex = 0;
      for (const candidate of response.candidates) {
        if (!aggregatedResponse.candidates) {
          aggregatedResponse.candidates = [];
        }
        if (!aggregatedResponse.candidates[candidateIndex]) {
          aggregatedResponse.candidates[candidateIndex] = {
            index: candidateIndex
          };
        }
        aggregatedResponse.candidates[candidateIndex].citationMetadata = candidate.citationMetadata;
        aggregatedResponse.candidates[candidateIndex].groundingMetadata = candidate.groundingMetadata;
        aggregatedResponse.candidates[candidateIndex].finishReason = candidate.finishReason;
        aggregatedResponse.candidates[candidateIndex].finishMessage = candidate.finishMessage;
        aggregatedResponse.candidates[candidateIndex].safetyRatings = candidate.safetyRatings;
        if (candidate.content && candidate.content.parts) {
          if (!aggregatedResponse.candidates[candidateIndex].content) {
            aggregatedResponse.candidates[candidateIndex].content = {
              role: candidate.content.role || "user",
              parts: []
            };
          }
          const newPart = {};
          for (const part of candidate.content.parts) {
            if (part.text) {
              newPart.text = part.text;
            }
            if (part.functionCall) {
              newPart.functionCall = part.functionCall;
            }
            if (part.executableCode) {
              newPart.executableCode = part.executableCode;
            }
            if (part.codeExecutionResult) {
              newPart.codeExecutionResult = part.codeExecutionResult;
            }
            if (Object.keys(newPart).length === 0) {
              newPart.text = "";
            }
            aggregatedResponse.candidates[candidateIndex].content.parts.push(newPart);
          }
        }
      }
      candidateIndex++;
    }
    if (response.usageMetadata) {
      aggregatedResponse.usageMetadata = response.usageMetadata;
    }
  }
  return aggregatedResponse;
}
async function generateContentStream(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.STREAM_GENERATE_CONTENT,
    apiKey,
    /* stream */
    true,
    JSON.stringify(params),
    requestOptions
  );
  return processStream(response);
}
async function generateContent(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.GENERATE_CONTENT,
    apiKey,
    /* stream */
    false,
    JSON.stringify(params),
    requestOptions
  );
  const responseJson = await response.json();
  const enhancedResponse = addHelpers(responseJson);
  return {
    response: enhancedResponse
  };
}
function formatSystemInstruction(input) {
  if (input == null) {
    return void 0;
  } else if (typeof input === "string") {
    return { role: "system", parts: [{ text: input }] };
  } else if (input.text) {
    return { role: "system", parts: [input] };
  } else if (input.parts) {
    if (!input.role) {
      return { role: "system", parts: input.parts };
    } else {
      return input;
    }
  }
}
function formatNewContent(request) {
  let newParts = [];
  if (typeof request === "string") {
    newParts = [{ text: request }];
  } else {
    for (const partOrString of request) {
      if (typeof partOrString === "string") {
        newParts.push({ text: partOrString });
      } else {
        newParts.push(partOrString);
      }
    }
  }
  return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
  const userContent = { role: "user", parts: [] };
  const functionContent = { role: "function", parts: [] };
  let hasUserContent = false;
  let hasFunctionContent = false;
  for (const part of parts) {
    if ("functionResponse" in part) {
      functionContent.parts.push(part);
      hasFunctionContent = true;
    } else {
      userContent.parts.push(part);
      hasUserContent = true;
    }
  }
  if (hasUserContent && hasFunctionContent) {
    throw new GoogleGenerativeAIError("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
  }
  if (!hasUserContent && !hasFunctionContent) {
    throw new GoogleGenerativeAIError("No content is provided for sending chat message.");
  }
  if (hasUserContent) {
    return userContent;
  }
  return functionContent;
}
function formatCountTokensInput(params, modelParams) {
  var _a;
  let formattedGenerateContentRequest = {
    model: modelParams === null || modelParams === void 0 ? void 0 : modelParams.model,
    generationConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.generationConfig,
    safetySettings: modelParams === null || modelParams === void 0 ? void 0 : modelParams.safetySettings,
    tools: modelParams === null || modelParams === void 0 ? void 0 : modelParams.tools,
    toolConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.toolConfig,
    systemInstruction: modelParams === null || modelParams === void 0 ? void 0 : modelParams.systemInstruction,
    cachedContent: (_a = modelParams === null || modelParams === void 0 ? void 0 : modelParams.cachedContent) === null || _a === void 0 ? void 0 : _a.name,
    contents: []
  };
  const containsGenerateContentRequest = params.generateContentRequest != null;
  if (params.contents) {
    if (containsGenerateContentRequest) {
      throw new GoogleGenerativeAIRequestInputError("CountTokensRequest must have one of contents or generateContentRequest, not both.");
    }
    formattedGenerateContentRequest.contents = params.contents;
  } else if (containsGenerateContentRequest) {
    formattedGenerateContentRequest = Object.assign(Object.assign({}, formattedGenerateContentRequest), params.generateContentRequest);
  } else {
    const content = formatNewContent(params);
    formattedGenerateContentRequest.contents = [content];
  }
  return { generateContentRequest: formattedGenerateContentRequest };
}
function formatGenerateContentInput(params) {
  let formattedRequest;
  if (params.contents) {
    formattedRequest = params;
  } else {
    const content = formatNewContent(params);
    formattedRequest = { contents: [content] };
  }
  if (params.systemInstruction) {
    formattedRequest.systemInstruction = formatSystemInstruction(params.systemInstruction);
  }
  return formattedRequest;
}
function formatEmbedContentInput(params) {
  if (typeof params === "string" || Array.isArray(params)) {
    const content = formatNewContent(params);
    return { content };
  }
  return params;
}
var VALID_PART_FIELDS = [
  "text",
  "inlineData",
  "functionCall",
  "functionResponse",
  "executableCode",
  "codeExecutionResult"
];
var VALID_PARTS_PER_ROLE = {
  user: ["text", "inlineData"],
  function: ["functionResponse"],
  model: ["text", "functionCall", "executableCode", "codeExecutionResult"],
  // System instructions shouldn't be in history anyway.
  system: ["text"]
};
function validateChatHistory(history) {
  let prevContent = false;
  for (const currContent of history) {
    const { role, parts } = currContent;
    if (!prevContent && role !== "user") {
      throw new GoogleGenerativeAIError(`First content should be with role 'user', got ${role}`);
    }
    if (!POSSIBLE_ROLES.includes(role)) {
      throw new GoogleGenerativeAIError(`Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(POSSIBLE_ROLES)}`);
    }
    if (!Array.isArray(parts)) {
      throw new GoogleGenerativeAIError("Content should have 'parts' property with an array of Parts");
    }
    if (parts.length === 0) {
      throw new GoogleGenerativeAIError("Each Content should have at least one part");
    }
    const countFields = {
      text: 0,
      inlineData: 0,
      functionCall: 0,
      functionResponse: 0,
      fileData: 0,
      executableCode: 0,
      codeExecutionResult: 0
    };
    for (const part of parts) {
      for (const key of VALID_PART_FIELDS) {
        if (key in part) {
          countFields[key] += 1;
        }
      }
    }
    const validParts = VALID_PARTS_PER_ROLE[role];
    for (const key of VALID_PART_FIELDS) {
      if (!validParts.includes(key) && countFields[key] > 0) {
        throw new GoogleGenerativeAIError(`Content with role '${role}' can't contain '${key}' part`);
      }
    }
    prevContent = true;
  }
}
function isValidResponse(response) {
  var _a;
  if (response.candidates === void 0 || response.candidates.length === 0) {
    return false;
  }
  const content = (_a = response.candidates[0]) === null || _a === void 0 ? void 0 : _a.content;
  if (content === void 0) {
    return false;
  }
  if (content.parts === void 0 || content.parts.length === 0) {
    return false;
  }
  for (const part of content.parts) {
    if (part === void 0 || Object.keys(part).length === 0) {
      return false;
    }
    if (part.text !== void 0 && part.text === "") {
      return false;
    }
  }
  return true;
}
var SILENT_ERROR = "SILENT_ERROR";
var ChatSession = class {
  constructor(apiKey, model, params, _requestOptions = {}) {
    this.model = model;
    this.params = params;
    this._requestOptions = _requestOptions;
    this._history = [];
    this._sendPromise = Promise.resolve();
    this._apiKey = apiKey;
    if (params === null || params === void 0 ? void 0 : params.history) {
      validateChatHistory(params.history);
      this._history = params.history;
    }
  }
  /**
   * Gets the chat history so far. Blocked prompts are not added to history.
   * Blocked candidates are not added to history, nor are the prompts that
   * generated them.
   */
  async getHistory() {
    await this._sendPromise;
    return this._history;
  }
  /**
   * Sends a chat message and receives a non-streaming
   * {@link GenerateContentResult}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessage(request, requestOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
      contents: [...this._history, newContent]
    };
    const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    let finalResult;
    this._sendPromise = this._sendPromise.then(() => generateContent(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions)).then((result) => {
      var _a2;
      if (isValidResponse(result.response)) {
        this._history.push(newContent);
        const responseContent = Object.assign({
          parts: [],
          // Response seems to come back without a role set.
          role: "model"
        }, (_a2 = result.response.candidates) === null || _a2 === void 0 ? void 0 : _a2[0].content);
        this._history.push(responseContent);
      } else {
        const blockErrorMessage = formatBlockErrorMessage(result.response);
        if (blockErrorMessage) {
          console.warn(`sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
        }
      }
      finalResult = result;
    }).catch((e) => {
      this._sendPromise = Promise.resolve();
      throw e;
    });
    await this._sendPromise;
    return finalResult;
  }
  /**
   * Sends a chat message and receives the response as a
   * {@link GenerateContentStreamResult} containing an iterable stream
   * and a response promise.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessageStream(request, requestOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
      contents: [...this._history, newContent]
    };
    const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    const streamPromise = generateContentStream(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions);
    this._sendPromise = this._sendPromise.then(() => streamPromise).catch((_ignored) => {
      throw new Error(SILENT_ERROR);
    }).then((streamResult) => streamResult.response).then((response) => {
      if (isValidResponse(response)) {
        this._history.push(newContent);
        const responseContent = Object.assign({}, response.candidates[0].content);
        if (!responseContent.role) {
          responseContent.role = "model";
        }
        this._history.push(responseContent);
      } else {
        const blockErrorMessage = formatBlockErrorMessage(response);
        if (blockErrorMessage) {
          console.warn(`sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
        }
      }
    }).catch((e) => {
      if (e.message !== SILENT_ERROR) {
        console.error(e);
      }
    });
    return streamPromise;
  }
};
async function countTokens(apiKey, model, params, singleRequestOptions) {
  const response = await makeModelRequest(model, Task.COUNT_TOKENS, apiKey, false, JSON.stringify(params), singleRequestOptions);
  return response.json();
}
async function embedContent(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(model, Task.EMBED_CONTENT, apiKey, false, JSON.stringify(params), requestOptions);
  return response.json();
}
async function batchEmbedContents(apiKey, model, params, requestOptions) {
  const requestsWithModel = params.requests.map((request) => {
    return Object.assign(Object.assign({}, request), { model });
  });
  const response = await makeModelRequest(model, Task.BATCH_EMBED_CONTENTS, apiKey, false, JSON.stringify({ requests: requestsWithModel }), requestOptions);
  return response.json();
}
var GenerativeModel = class {
  constructor(apiKey, modelParams, _requestOptions = {}) {
    this.apiKey = apiKey;
    this._requestOptions = _requestOptions;
    if (modelParams.model.includes("/")) {
      this.model = modelParams.model;
    } else {
      this.model = `models/${modelParams.model}`;
    }
    this.generationConfig = modelParams.generationConfig || {};
    this.safetySettings = modelParams.safetySettings || [];
    this.tools = modelParams.tools;
    this.toolConfig = modelParams.toolConfig;
    this.systemInstruction = formatSystemInstruction(modelParams.systemInstruction);
    this.cachedContent = modelParams.cachedContent;
  }
  /**
   * Makes a single non-streaming call to the model
   * and returns an object containing a single {@link GenerateContentResponse}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContent(request, requestOptions = {}) {
    var _a;
    const formattedParams = formatGenerateContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return generateContent(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
  }
  /**
   * Makes a single streaming call to the model and returns an object
   * containing an iterable stream that iterates over all chunks in the
   * streaming response as well as a promise that returns the final
   * aggregated response.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContentStream(request, requestOptions = {}) {
    var _a;
    const formattedParams = formatGenerateContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return generateContentStream(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
  }
  /**
   * Gets a new {@link ChatSession} instance which can be used for
   * multi-turn chats.
   */
  startChat(startChatParams) {
    var _a;
    return new ChatSession(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, startChatParams), this._requestOptions);
  }
  /**
   * Counts the tokens in the provided request.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async countTokens(request, requestOptions = {}) {
    const formattedParams = formatCountTokensInput(request, {
      model: this.model,
      generationConfig: this.generationConfig,
      safetySettings: this.safetySettings,
      tools: this.tools,
      toolConfig: this.toolConfig,
      systemInstruction: this.systemInstruction,
      cachedContent: this.cachedContent
    });
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return countTokens(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
  }
  /**
   * Embeds the provided content.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async embedContent(request, requestOptions = {}) {
    const formattedParams = formatEmbedContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return embedContent(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
  }
  /**
   * Embeds an array of {@link EmbedContentRequest}s.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async batchEmbedContents(batchEmbedContentRequest, requestOptions = {}) {
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return batchEmbedContents(this.apiKey, this.model, batchEmbedContentRequest, generativeModelRequestOptions);
  }
};
var GoogleGenerativeAI = class {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  /**
   * Gets a {@link GenerativeModel} instance for the provided model name.
   */
  getGenerativeModel(modelParams, requestOptions) {
    if (!modelParams.model) {
      throw new GoogleGenerativeAIError(`Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })`);
    }
    return new GenerativeModel(this.apiKey, modelParams, requestOptions);
  }
  /**
   * Creates a {@link GenerativeModel} instance from provided content cache.
   */
  getGenerativeModelFromCachedContent(cachedContent, modelParams, requestOptions) {
    if (!cachedContent.name) {
      throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `name` field.");
    }
    if (!cachedContent.model) {
      throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `model` field.");
    }
    const disallowedDuplicates = ["model", "systemInstruction"];
    for (const key of disallowedDuplicates) {
      if ((modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) && cachedContent[key] && (modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) !== cachedContent[key]) {
        if (key === "model") {
          const modelParamsComp = modelParams.model.startsWith("models/") ? modelParams.model.replace("models/", "") : modelParams.model;
          const cachedContentComp = cachedContent.model.startsWith("models/") ? cachedContent.model.replace("models/", "") : cachedContent.model;
          if (modelParamsComp === cachedContentComp) {
            continue;
          }
        }
        throw new GoogleGenerativeAIRequestInputError(`Different value for "${key}" specified in modelParams (${modelParams[key]}) and cachedContent (${cachedContent[key]})`);
      }
    }
    const modelParamsFromCache = Object.assign(Object.assign({}, modelParams), { model: cachedContent.model, tools: cachedContent.tools, toolConfig: cachedContent.toolConfig, systemInstruction: cachedContent.systemInstruction, cachedContent });
    return new GenerativeModel(this.apiKey, modelParamsFromCache, requestOptions);
  }
};

// node_modules/@langchain/core/dist/utils/env.js
var isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
var isWebWorker = () => typeof globalThis === "object" && globalThis.constructor && globalThis.constructor.name === "DedicatedWorkerGlobalScope";
var isJsDom = () => typeof window !== "undefined" && window.name === "nodejs" || typeof navigator !== "undefined" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"));
var isDeno = () => typeof Deno !== "undefined";
var isNode = () => typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined" && !isDeno();
var getEnv = () => {
  let env;
  if (isBrowser()) {
    env = "browser";
  } else if (isNode()) {
    env = "node";
  } else if (isWebWorker()) {
    env = "webworker";
  } else if (isJsDom()) {
    env = "jsdom";
  } else if (isDeno()) {
    env = "deno";
  } else {
    env = "other";
  }
  return env;
};
var runtimeEnvironment;
async function getRuntimeEnvironment() {
  if (runtimeEnvironment === void 0) {
    const env = getEnv();
    runtimeEnvironment = {
      library: "langchain-js",
      runtime: env
    };
  }
  return runtimeEnvironment;
}
function getEnvironmentVariable(name) {
  try {
    if (typeof process !== "undefined") {
      return process.env?.[name];
    } else if (isDeno()) {
      return Deno?.env.get(name);
    } else {
      return void 0;
    }
  } catch (e) {
    return void 0;
  }
}

// node_modules/zod-to-json-schema/dist/esm/Options.js
var ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
var defaultOptions = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  allowedAdditionalProperties: true,
  rejectedAdditionalProperties: false,
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: false,
  definitions: {},
  errorMessages: false,
  markdownDescription: false,
  patternStrategy: "escape",
  applyRegexFlags: false,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
};
var getDefaultOptions = (options) => typeof options === "string" ? {
  ...defaultOptions,
  name: options
} : {
  ...defaultOptions,
  ...options
};

// node_modules/zod-to-json-schema/dist/esm/Refs.js
var getRefs = (options) => {
  const _options = getDefaultOptions(options);
  const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
  return {
    ..._options,
    currentPath,
    propertyPath: void 0,
    seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [
      def._def,
      {
        def: def._def,
        path: [..._options.basePath, _options.definitionPath, name],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
};

// node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function addErrorMessage(res, key, errorMessage, refs) {
  if (!refs?.errorMessages)
    return;
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage
    };
  }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
  res[key] = value;
  addErrorMessage(res, key, errorMessage, refs);
}

// node_modules/zod/dist/esm/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// node_modules/zod/dist/esm/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr2, checker) => {
    for (const item of arr2) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/dist/esm/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/dist/esm/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// node_modules/zod/dist/esm/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// node_modules/zod/dist/esm/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// node_modules/zod/dist/esm/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/dist/esm/v3/types.js
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _ZodEnum_cache;
var _ZodNativeEnum_cache;
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex2 = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex2 = `${regex2}(${opts.join("|")})`;
  return new RegExp(`^${regex2}$`);
}
function isValidIP(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    const base642 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base642));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex2 = datetimeRegex(check);
        if (!regex2.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex2 = dateRegex;
        if (!regex2.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex2 = timeRegex(check);
        if (!regex2.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex2, validation, message) {
    return this.refinement((data) => regex2.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex2, message) {
    return this._addCheck({
      kind: "regex",
      regex: regex2,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index2) {
    return new _ZodObject({
      ...this._def,
      catchall: index2
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index2 = 0; index2 < a.length; index2++) {
      const itemA = a[index2];
      const itemB = b[index2];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index2) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index2, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index2, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodEnum_cache.set(this, void 0);
  }
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
_ZodEnum_cache = /* @__PURE__ */ new WeakMap();
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  constructor() {
    super(...arguments);
    _ZodNativeEnum_cache.set(this, void 0);
  }
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
_ZodNativeEnum_cache = /* @__PURE__ */ new WeakMap();
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;

// node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function parseAnyDef() {
  return {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/array.js
function parseArrayDef(def, refs) {
  const res = {
    type: "array"
  };
  if (def.type?._def && def.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
  }
  if (def.maxLength) {
    setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
  }
  if (def.exactLength) {
    setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
    setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function parseBigintDef(def, refs) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var parseCatchDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy ?? refs.dateStrategy;
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def, refs);
  }
}
var integerDateParser = (def, refs) => {
  const res = {
    type: "integer",
    format: "unix-time"
  };
  if (refs.target === "openApi3") {
    return res;
  }
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        setResponseValueAndErrors(
          res,
          "minimum",
          check.value,
          // This is in milliseconds
          check.message,
          refs
        );
        break;
      case "max":
        setResponseValueAndErrors(
          res,
          "maximum",
          check.value,
          // This is in milliseconds
          check.message,
          refs
        );
        break;
    }
  }
  return res;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function parseEnumDef(def) {
  return {
    type: "string",
    enum: Array.from(def.values)
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
var isJsonSchema7AllOfType = (type) => {
  if ("type" in type && type.type === "string")
    return false;
  return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x) => !!x);
  let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
      if (schema.unevaluatedProperties === void 0) {
        unevaluatedProperties = void 0;
      }
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } else {
        unevaluatedProperties = void 0;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : void 0;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function parseLiteralDef(def, refs) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  if (refs.target === "openApi3") {
    return {
      type: parsedType === "bigint" ? "integer" : parsedType,
      enum: [def.value]
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/string.js
var emojiRegex2 = void 0;
var zodPatterns = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: () => {
    if (emojiRegex2 === void 0) {
      emojiRegex2 = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
    }
    return emojiRegex2;
  },
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(res, RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`), check.message, refs);
          break;
        case "endsWith":
          addPattern(res, RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`), check.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "date":
          addFormat(res, "date", check.message, refs);
          break;
        case "time":
          addFormat(res, "time", check.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "includes": {
          addPattern(res, RegExp(escapeLiteralCheckValue(check.value, refs)), check.message, refs);
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "base64url":
          addPattern(res, zodPatterns.base64url, check.message, refs);
          break;
        case "jwt":
          addPattern(res, zodPatterns.jwt, check.message, refs);
          break;
        case "cidr": {
          if (check.version !== "v6") {
            addPattern(res, zodPatterns.ipv4Cidr, check.message, refs);
          }
          if (check.version !== "v4") {
            addPattern(res, zodPatterns.ipv6Cidr, check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji(), check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check.message, refs);
        }
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
          /* @__PURE__ */ ((_) => {
          })(check);
      }
    }
  }
  return res;
}
function escapeLiteralCheckValue(literal, refs) {
  return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
}
var ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function escapeNonAlphaNumeric(source) {
  let result = "";
  for (let i = 0; i < source.length; i++) {
    if (!ALPHA_NUMERIC.has(source[i])) {
      result += "\\";
    }
    result += source[i];
  }
  return result;
}
function addFormat(schema, value, message, refs) {
  if (schema.format || schema.anyOf?.some((x) => x.format)) {
    if (!schema.anyOf) {
      schema.anyOf = [];
    }
    if (schema.format) {
      schema.anyOf.push({
        format: schema.format,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { format: schema.errorMessage.format }
        }
      });
      delete schema.format;
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.anyOf.push({
      format: value,
      ...message && refs.errorMessages && { errorMessage: { format: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "format", value, message, refs);
  }
}
function addPattern(schema, regex2, message, refs) {
  if (schema.pattern || schema.allOf?.some((x) => x.pattern)) {
    if (!schema.allOf) {
      schema.allOf = [];
    }
    if (schema.pattern) {
      schema.allOf.push({
        pattern: schema.pattern,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { pattern: schema.errorMessage.pattern }
        }
      });
      delete schema.pattern;
      if (schema.errorMessage) {
        delete schema.errorMessage.pattern;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.allOf.push({
      pattern: stringifyRegExpWithFlags(regex2, refs),
      ...message && refs.errorMessages && { errorMessage: { pattern: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "pattern", stringifyRegExpWithFlags(regex2, refs), message, refs);
  }
}
function stringifyRegExpWithFlags(regex2, refs) {
  if (!refs.applyRegexFlags || !regex2.flags) {
    return regex2.source;
  }
  const flags = {
    i: regex2.flags.includes("i"),
    m: regex2.flags.includes("m"),
    s: regex2.flags.includes("s")
    // `.` matches newlines
  };
  const source = flags.i ? regex2.source.toLowerCase() : regex2.source;
  let pattern = "";
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i = 0; i < source.length; i++) {
    if (isEscaped) {
      pattern += source[i];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i];
            pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i + 1] === "-" && source[i + 2]?.match(/[a-z]/)) {
            pattern += source[i];
            inCharRange = true;
          } else {
            pattern += `${source[i]}${source[i].toUpperCase()}`;
          }
          continue;
        }
      } else if (source[i].match(/[a-z]/)) {
        pattern += `[${source[i]}${source[i].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source[i] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source[i] === ".") {
      pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
      continue;
    }
    pattern += source[i];
    if (source[i] === "\\") {
      isEscaped = true;
    } else if (inCharGroup && source[i] === "]") {
      inCharGroup = false;
    } else if (!inCharGroup && source[i] === "[") {
      inCharGroup = true;
    }
  }
  try {
    new RegExp(pattern);
  } catch {
    console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
    return regex2.source;
  }
  return pattern;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function parseRecordDef(def, refs) {
  if (refs.target === "openAi") {
    console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
  }
  if (refs.target === "openApi3" && def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      type: "object",
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce((acc, key) => ({
        ...acc,
        [key]: parseDef(def.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key]
        }) ?? {}
      }), {}),
      additionalProperties: refs.rejectedAdditionalProperties
    };
  }
  const schema = {
    type: "object",
    additionalProperties: parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? refs.allowedAdditionalProperties
  };
  if (refs.target === "openApi3") {
    return schema;
  }
  if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.checks?.length) {
    const { type, ...keyType } = parseStringDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodBranded && def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.type._def.checks?.length) {
    const { type, ...keyType } = parseBrandedDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || {};
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function parseNativeEnumDef(def) {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object[object[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object[key]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function parseNeverDef() {
  return {
    not: {}
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: true
  } : {
    type: "null"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/union.js
var primitiveMappings = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function parseUnionDef(def, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def, refs);
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options.every((x) => x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length))) {
    const types = options.reduce((types2, x) => {
      const type = primitiveMappings[x._def.typeName];
      return type && !types2.includes(type) ? [...types2, type] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
    const types = options.reduce((acc, x) => {
      const type = typeof x._def.value;
      switch (type) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x._def.value === null)
            return [...acc, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return acc;
      }
    }, []);
    if (types.length === options.length) {
      const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce((acc, x) => {
          return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
        }, [])
      };
    }
  } else if (options.every((x) => x._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options.reduce((acc, x) => [
        ...acc,
        ...x._def.values.filter((x2) => !acc.includes(x2))
      ], [])
    };
  }
  return asAnyOf(def, refs);
}
var asAnyOf = (def, refs) => {
  const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i) => parseDef(x._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", `${i}`]
  })).filter((x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
  return anyOf.length ? { anyOf } : void 0;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    if (refs.target === "openApi3") {
      return {
        type: primitiveMappings[def.innerType._def.typeName],
        nullable: true
      };
    }
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  if (refs.target === "openApi3") {
    const base2 = parseDef(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    if (base2 && "$ref" in base2)
      return { allOf: [base2], nullable: true };
    return base2 && { ...base2, nullable: true };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function parseNumberDef(def, refs) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        addErrorMessage(res, "type", check.message, refs);
        break;
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function parseObjectDef(def, refs) {
  const forceOptionalIntoNullable = refs.target === "openAi";
  const result = {
    type: "object",
    properties: {}
  };
  const required = [];
  const shape = def.shape();
  for (const propName in shape) {
    let propDef = shape[propName];
    if (propDef === void 0 || propDef._def === void 0) {
      continue;
    }
    let propOptional = safeIsOptional(propDef);
    if (propOptional && forceOptionalIntoNullable) {
      if (propDef instanceof ZodOptional) {
        propDef = propDef._def.innerType;
      }
      if (!propDef.isNullable()) {
        propDef = propDef.nullable();
      }
      propOptional = false;
    }
    const parsedDef = parseDef(propDef._def, {
      ...refs,
      currentPath: [...refs.currentPath, "properties", propName],
      propertyPath: [...refs.currentPath, "properties", propName]
    });
    if (parsedDef === void 0) {
      continue;
    }
    result.properties[propName] = parsedDef;
    if (!propOptional) {
      required.push(propName);
    }
  }
  if (required.length) {
    result.required = required;
  }
  const additionalProperties = decideAdditionalProperties(def, refs);
  if (additionalProperties !== void 0) {
    result.additionalProperties = additionalProperties;
  }
  return result;
}
function decideAdditionalProperties(def, refs) {
  if (def.catchall._def.typeName !== "ZodNever") {
    return parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    });
  }
  switch (def.unknownKeys) {
    case "passthrough":
      return refs.allowedAdditionalProperties;
    case "strict":
      return refs.rejectedAdditionalProperties;
    case "strip":
      return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
  }
}
function safeIsOptional(schema) {
  try {
    return schema.isOptional();
  } catch {
    return true;
  }
}

// node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var parseOptionalDef = (def, refs) => {
  if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
    return parseDef(def.innerType._def, refs);
  }
  const innerSchema = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "1"]
  });
  return innerSchema ? {
    anyOf: [
      {
        not: {}
      },
      innerSchema
    ]
  } : {};
};

// node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js
var parsePipelineDef = (def, refs) => {
  if (refs.pipeStrategy === "input") {
    return parseDef(def.in._def, refs);
  } else if (refs.pipeStrategy === "output") {
    return parseDef(def.out._def, refs);
  }
  const a = parseDef(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", "0"]
  });
  const b = parseDef(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
  });
  return {
    allOf: [a, b].filter((x) => x !== void 0)
  };
};

// node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
  }
  if (def.maxSize) {
    setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], []),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], [])
    };
  }
}

// node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function parseUndefinedDef() {
  return {
    not: {}
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function parseUnknownDef() {
  return {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var parseReadonlyDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// node_modules/zod-to-json-schema/dist/esm/selectParser.js
var selectParser = (def, typeName, refs) => {
  switch (typeName) {
    case ZodFirstPartyTypeKind.ZodString:
      return parseStringDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNumber:
      return parseNumberDef(def, refs);
    case ZodFirstPartyTypeKind.ZodObject:
      return parseObjectDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBigInt:
      return parseBigintDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBoolean:
      return parseBooleanDef();
    case ZodFirstPartyTypeKind.ZodDate:
      return parseDateDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUndefined:
      return parseUndefinedDef();
    case ZodFirstPartyTypeKind.ZodNull:
      return parseNullDef(refs);
    case ZodFirstPartyTypeKind.ZodArray:
      return parseArrayDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUnion:
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return parseUnionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodIntersection:
      return parseIntersectionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodTuple:
      return parseTupleDef(def, refs);
    case ZodFirstPartyTypeKind.ZodRecord:
      return parseRecordDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLiteral:
      return parseLiteralDef(def, refs);
    case ZodFirstPartyTypeKind.ZodEnum:
      return parseEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNativeEnum:
      return parseNativeEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNullable:
      return parseNullableDef(def, refs);
    case ZodFirstPartyTypeKind.ZodOptional:
      return parseOptionalDef(def, refs);
    case ZodFirstPartyTypeKind.ZodMap:
      return parseMapDef(def, refs);
    case ZodFirstPartyTypeKind.ZodSet:
      return parseSetDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLazy:
      return () => def.getter()._def;
    case ZodFirstPartyTypeKind.ZodPromise:
      return parsePromiseDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNaN:
    case ZodFirstPartyTypeKind.ZodNever:
      return parseNeverDef();
    case ZodFirstPartyTypeKind.ZodEffects:
      return parseEffectsDef(def, refs);
    case ZodFirstPartyTypeKind.ZodAny:
      return parseAnyDef();
    case ZodFirstPartyTypeKind.ZodUnknown:
      return parseUnknownDef();
    case ZodFirstPartyTypeKind.ZodDefault:
      return parseDefaultDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBranded:
      return parseBrandedDef(def, refs);
    case ZodFirstPartyTypeKind.ZodReadonly:
      return parseReadonlyDef(def, refs);
    case ZodFirstPartyTypeKind.ZodCatch:
      return parseCatchDef(def, refs);
    case ZodFirstPartyTypeKind.ZodPipeline:
      return parsePipelineDef(def, refs);
    case ZodFirstPartyTypeKind.ZodFunction:
    case ZodFirstPartyTypeKind.ZodVoid:
    case ZodFirstPartyTypeKind.ZodSymbol:
      return void 0;
    default:
      return /* @__PURE__ */ ((_) => void 0)(typeName);
  }
};

// node_modules/zod-to-json-schema/dist/esm/parseDef.js
function parseDef(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def, newItem);
  const jsonSchemaOrGetter = selectParser(def, def.typeName, refs);
  const jsonSchema = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
  if (jsonSchema) {
    addMeta(def, refs, jsonSchema);
  }
  if (refs.postProcess) {
    const postProcessResult = refs.postProcess(jsonSchema, def, refs);
    newItem.jsonSchema = jsonSchema;
    return postProcessResult;
  }
  newItem.jsonSchema = jsonSchema;
  return jsonSchema;
}
var get$ref = (item, refs) => {
  switch (refs.$refStrategy) {
    case "root":
      return { $ref: item.path.join("/") };
    case "relative":
      return { $ref: getRelativePath(refs.currentPath, item.path) };
    case "none":
    case "seen": {
      if (item.path.length < refs.currentPath.length && item.path.every((value, index2) => refs.currentPath[index2] === value)) {
        console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
        return {};
      }
      return refs.$refStrategy === "seen" ? {} : void 0;
    }
  }
};
var getRelativePath = (pathA, pathB) => {
  let i = 0;
  for (; i < pathA.length && i < pathB.length; i++) {
    if (pathA[i] !== pathB[i])
      break;
  }
  return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};
var addMeta = (def, refs, jsonSchema) => {
  if (def.description) {
    jsonSchema.description = def.description;
    if (refs.markdownDescription) {
      jsonSchema.markdownDescription = def.description;
    }
  }
  return jsonSchema;
};

// node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js
var zodToJsonSchema = (schema, options) => {
  const refs = getRefs(options);
  const definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name2, schema2]) => ({
    ...acc,
    [name2]: parseDef(schema2._def, {
      ...refs,
      currentPath: [...refs.basePath, refs.definitionPath, name2]
    }, true) ?? {}
  }), {}) : void 0;
  const name = typeof options === "string" ? options : options?.nameStrategy === "title" ? void 0 : options?.name;
  const main = parseDef(schema._def, name === void 0 ? refs : {
    ...refs,
    currentPath: [...refs.basePath, refs.definitionPath, name]
  }, false) ?? {};
  const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
  if (title !== void 0) {
    main.title = title;
  }
  const combined = name === void 0 ? definitions ? {
    ...main,
    [refs.definitionPath]: definitions
  } : main : {
    $ref: [
      ...refs.$refStrategy === "relative" ? [] : refs.basePath,
      refs.definitionPath,
      name
    ].join("/"),
    [refs.definitionPath]: {
      ...definitions,
      [name]: main
    }
  };
  if (refs.target === "jsonSchema7") {
    combined.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (refs.target === "jsonSchema2019-09" || refs.target === "openAi") {
    combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
  }
  if (refs.target === "openAi" && ("anyOf" in combined || "oneOf" in combined || "allOf" in combined || "type" in combined && Array.isArray(combined.type))) {
    console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
  }
  return combined;
};

// node_modules/@langchain/core/dist/utils/json.js
function parsePartialJson(s) {
  if (typeof s === "undefined") {
    return null;
  }
  try {
    return JSON.parse(s);
  } catch (error) {
  }
  let new_s = "";
  const stack = [];
  let isInsideString = false;
  let escaped = false;
  for (let char of s) {
    if (isInsideString) {
      if (char === '"' && !escaped) {
        isInsideString = false;
      } else if (char === "\n" && !escaped) {
        char = "\\n";
      } else if (char === "\\") {
        escaped = !escaped;
      } else {
        escaped = false;
      }
    } else {
      if (char === '"') {
        isInsideString = true;
        escaped = false;
      } else if (char === "{") {
        stack.push("}");
      } else if (char === "[") {
        stack.push("]");
      } else if (char === "}" || char === "]") {
        if (stack && stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          return null;
        }
      }
    }
    new_s += char;
  }
  if (isInsideString) {
    new_s += '"';
  }
  for (let i = stack.length - 1; i >= 0; i -= 1) {
    new_s += stack[i];
  }
  try {
    return JSON.parse(new_s);
  } catch (error) {
    return null;
  }
}

// node_modules/@langchain/core/dist/load/map_keys.js
var import_decamelize = __toESM(require_decamelize(), 1);
var import_camelcase = __toESM(require_camelcase(), 1);
function keyToJson(key, map) {
  return map?.[key] || (0, import_decamelize.default)(key);
}
function mapKeys(fields, mapper, map) {
  const mapped = {};
  for (const key in fields) {
    if (Object.hasOwn(fields, key)) {
      mapped[mapper(key, map)] = fields[key];
    }
  }
  return mapped;
}

// node_modules/@langchain/core/dist/load/serializable.js
function shallowCopy(obj) {
  return Array.isArray(obj) ? [...obj] : { ...obj };
}
function replaceSecrets(root2, secretsMap) {
  const result = shallowCopy(root2);
  for (const [path, secretId] of Object.entries(secretsMap)) {
    const [last, ...partsReverse] = path.split(".").reverse();
    let current = result;
    for (const part of partsReverse.reverse()) {
      if (current[part] === void 0) {
        break;
      }
      current[part] = shallowCopy(current[part]);
      current = current[part];
    }
    if (current[last] !== void 0) {
      current[last] = {
        lc: 1,
        type: "secret",
        id: [secretId]
      };
    }
  }
  return result;
}
function get_lc_unique_name(serializableClass) {
  const parentClass = Object.getPrototypeOf(serializableClass);
  const lcNameIsSubclassed = typeof serializableClass.lc_name === "function" && (typeof parentClass.lc_name !== "function" || serializableClass.lc_name() !== parentClass.lc_name());
  if (lcNameIsSubclassed) {
    return serializableClass.lc_name();
  } else {
    return serializableClass.name;
  }
}
var Serializable = class _Serializable {
  /**
   * The name of the serializable. Override to provide an alias or
   * to preserve the serialized module name in minified environments.
   *
   * Implemented as a static method to support loading logic.
   */
  static lc_name() {
    return this.name;
  }
  /**
   * The final serialized identifier for the module.
   */
  get lc_id() {
    return [
      ...this.lc_namespace,
      get_lc_unique_name(this.constructor)
    ];
  }
  /**
   * A map of secrets, which will be omitted from serialization.
   * Keys are paths to the secret in constructor args, e.g. "foo.bar.baz".
   * Values are the secret ids, which will be used when deserializing.
   */
  get lc_secrets() {
    return void 0;
  }
  /**
   * A map of additional attributes to merge with constructor args.
   * Keys are the attribute names, e.g. "foo".
   * Values are the attribute values, which will be serialized.
   * These attributes need to be accepted by the constructor as arguments.
   */
  get lc_attributes() {
    return void 0;
  }
  /**
   * A map of aliases for constructor args.
   * Keys are the attribute names, e.g. "foo".
   * Values are the alias that will replace the key in serialization.
   * This is used to eg. make argument names match Python.
   */
  get lc_aliases() {
    return void 0;
  }
  /**
   * A manual list of keys that should be serialized.
   * If not overridden, all fields passed into the constructor will be serialized.
   */
  get lc_serializable_keys() {
    return void 0;
  }
  constructor(kwargs, ..._args) {
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "lc_kwargs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (this.lc_serializable_keys !== void 0) {
      this.lc_kwargs = Object.fromEntries(Object.entries(kwargs || {}).filter(([key]) => this.lc_serializable_keys?.includes(key)));
    } else {
      this.lc_kwargs = kwargs ?? {};
    }
  }
  toJSON() {
    if (!this.lc_serializable) {
      return this.toJSONNotImplemented();
    }
    if (
      // eslint-disable-next-line no-instanceof/no-instanceof
      this.lc_kwargs instanceof _Serializable || typeof this.lc_kwargs !== "object" || Array.isArray(this.lc_kwargs)
    ) {
      return this.toJSONNotImplemented();
    }
    const aliases = {};
    const secrets = {};
    const kwargs = Object.keys(this.lc_kwargs).reduce((acc, key) => {
      acc[key] = key in this ? this[key] : this.lc_kwargs[key];
      return acc;
    }, {});
    for (let current = Object.getPrototypeOf(this); current; current = Object.getPrototypeOf(current)) {
      Object.assign(aliases, Reflect.get(current, "lc_aliases", this));
      Object.assign(secrets, Reflect.get(current, "lc_secrets", this));
      Object.assign(kwargs, Reflect.get(current, "lc_attributes", this));
    }
    Object.keys(secrets).forEach((keyPath) => {
      let read = this;
      let write = kwargs;
      const [last, ...partsReverse] = keyPath.split(".").reverse();
      for (const key of partsReverse.reverse()) {
        if (!(key in read) || read[key] === void 0)
          return;
        if (!(key in write) || write[key] === void 0) {
          if (typeof read[key] === "object" && read[key] != null) {
            write[key] = {};
          } else if (Array.isArray(read[key])) {
            write[key] = [];
          }
        }
        read = read[key];
        write = write[key];
      }
      if (last in read && read[last] !== void 0) {
        write[last] = write[last] || read[last];
      }
    });
    return {
      lc: 1,
      type: "constructor",
      id: this.lc_id,
      kwargs: mapKeys(Object.keys(secrets).length ? replaceSecrets(kwargs, secrets) : kwargs, keyToJson, aliases)
    };
  }
  toJSONNotImplemented() {
    return {
      lc: 1,
      type: "not_implemented",
      id: this.lc_id
    };
  }
};

// node_modules/@langchain/core/dist/messages/content_blocks.js
function isDataContentBlock(content_block) {
  return typeof content_block === "object" && content_block !== null && "type" in content_block && typeof content_block.type === "string" && "source_type" in content_block && (content_block.source_type === "url" || content_block.source_type === "base64" || content_block.source_type === "text" || content_block.source_type === "id");
}
function isURLContentBlock(content_block) {
  return isDataContentBlock(content_block) && content_block.source_type === "url" && "url" in content_block && typeof content_block.url === "string";
}
function isBase64ContentBlock(content_block) {
  return isDataContentBlock(content_block) && content_block.source_type === "base64" && "data" in content_block && typeof content_block.data === "string";
}
function convertToOpenAIImageBlock(content_block) {
  if (isDataContentBlock(content_block)) {
    if (content_block.source_type === "url") {
      return {
        type: "image_url",
        image_url: {
          url: content_block.url
        }
      };
    }
    if (content_block.source_type === "base64") {
      if (!content_block.mime_type) {
        throw new Error("mime_type key is required for base64 data.");
      }
      const mime_type = content_block.mime_type;
      return {
        type: "image_url",
        image_url: {
          url: `data:${mime_type};base64,${content_block.data}`
        }
      };
    }
  }
  throw new Error("Unsupported source type. Only 'url' and 'base64' are supported.");
}

// node_modules/@langchain/core/dist/messages/base.js
function mergeContent(firstContent, secondContent) {
  if (typeof firstContent === "string") {
    if (firstContent === "") {
      return secondContent;
    }
    if (typeof secondContent === "string") {
      return firstContent + secondContent;
    } else if (Array.isArray(secondContent) && secondContent.some((c) => isDataContentBlock(c))) {
      return [
        {
          type: "text",
          source_type: "text",
          text: firstContent
        },
        ...secondContent
      ];
    } else {
      return [{ type: "text", text: firstContent }, ...secondContent];
    }
  } else if (Array.isArray(secondContent)) {
    return _mergeLists(firstContent, secondContent) ?? [
      ...firstContent,
      ...secondContent
    ];
  } else {
    if (secondContent === "") {
      return firstContent;
    } else if (Array.isArray(firstContent) && firstContent.some((c) => isDataContentBlock(c))) {
      return [
        ...firstContent,
        {
          type: "file",
          source_type: "text",
          text: secondContent
        }
      ];
    } else {
      return [...firstContent, { type: "text", text: secondContent }];
    }
  }
}
function stringifyWithDepthLimit(obj, depthLimit) {
  function helper(obj2, currentDepth) {
    if (typeof obj2 !== "object" || obj2 === null || obj2 === void 0) {
      return obj2;
    }
    if (currentDepth >= depthLimit) {
      if (Array.isArray(obj2)) {
        return "[Array]";
      }
      return "[Object]";
    }
    if (Array.isArray(obj2)) {
      return obj2.map((item) => helper(item, currentDepth + 1));
    }
    const result = {};
    for (const key of Object.keys(obj2)) {
      result[key] = helper(obj2[key], currentDepth + 1);
    }
    return result;
  }
  return JSON.stringify(helper(obj, 0), null, 2);
}
var BaseMessage = class extends Serializable {
  get lc_aliases() {
    return {
      additional_kwargs: "additional_kwargs",
      response_metadata: "response_metadata"
    };
  }
  /**
   * Get text content of the message.
   */
  get text() {
    if (typeof this.content === "string") {
      return this.content;
    }
    if (!Array.isArray(this.content))
      return "";
    return this.content.map((c) => {
      if (typeof c === "string")
        return c;
      if (c.type === "text")
        return c.text;
      return "";
    }).join("");
  }
  /** The type of the message. */
  getType() {
    return this._getType();
  }
  constructor(fields, kwargs) {
    if (typeof fields === "string") {
      fields = {
        content: fields,
        additional_kwargs: kwargs,
        response_metadata: {}
      };
    }
    if (!fields.additional_kwargs) {
      fields.additional_kwargs = {};
    }
    if (!fields.response_metadata) {
      fields.response_metadata = {};
    }
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "messages"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "content", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "additional_kwargs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "response_metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "id", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.name = fields.name;
    this.content = fields.content;
    this.additional_kwargs = fields.additional_kwargs;
    this.response_metadata = fields.response_metadata;
    this.id = fields.id;
  }
  toDict() {
    return {
      type: this._getType(),
      data: this.toJSON().kwargs
    };
  }
  static lc_name() {
    return "BaseMessage";
  }
  // Can't be protected for silly reasons
  get _printableFields() {
    return {
      id: this.id,
      content: this.content,
      name: this.name,
      additional_kwargs: this.additional_kwargs,
      response_metadata: this.response_metadata
    };
  }
  // this private method is used to update the ID for the runtime
  // value as well as in lc_kwargs for serialisation
  _updateId(value) {
    this.id = value;
    this.lc_kwargs.id = value;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.lc_name();
  }
  // Override the default behavior of console.log
  [Symbol.for("nodejs.util.inspect.custom")](depth) {
    if (depth === null) {
      return this;
    }
    const printable = stringifyWithDepthLimit(this._printableFields, Math.max(4, depth));
    return `${this.constructor.lc_name()} ${printable}`;
  }
};
function _mergeDicts(left, right) {
  const merged = { ...left };
  for (const [key, value] of Object.entries(right)) {
    if (merged[key] == null) {
      merged[key] = value;
    } else if (value == null) {
      continue;
    } else if (typeof merged[key] !== typeof value || Array.isArray(merged[key]) !== Array.isArray(value)) {
      throw new Error(`field[${key}] already exists in the message chunk, but with a different type.`);
    } else if (typeof merged[key] === "string") {
      if (key === "type") {
        continue;
      }
      merged[key] += value;
    } else if (typeof merged[key] === "object" && !Array.isArray(merged[key])) {
      merged[key] = _mergeDicts(merged[key], value);
    } else if (Array.isArray(merged[key])) {
      merged[key] = _mergeLists(merged[key], value);
    } else if (merged[key] === value) {
      continue;
    } else {
      console.warn(`field[${key}] already exists in this message chunk and value has unsupported type.`);
    }
  }
  return merged;
}
function _mergeLists(left, right) {
  if (left === void 0 && right === void 0) {
    return void 0;
  } else if (left === void 0 || right === void 0) {
    return left || right;
  } else {
    const merged = [...left];
    for (const item of right) {
      if (typeof item === "object" && "index" in item && typeof item.index === "number") {
        const toMerge = merged.findIndex((leftItem) => leftItem.index === item.index);
        if (toMerge !== -1) {
          merged[toMerge] = _mergeDicts(merged[toMerge], item);
        } else {
          merged.push(item);
        }
      } else if (typeof item === "object" && "text" in item && item.text === "") {
        continue;
      } else {
        merged.push(item);
      }
    }
    return merged;
  }
}
var BaseMessageChunk = class extends BaseMessage {
};
function _isMessageFieldWithRole(x) {
  return typeof x.role === "string";
}
function isBaseMessage(messageLike) {
  return typeof messageLike?._getType === "function";
}

// node_modules/@langchain/core/dist/messages/tool.js
var ToolMessage = class extends BaseMessage {
  static lc_name() {
    return "ToolMessage";
  }
  get lc_aliases() {
    return { tool_call_id: "tool_call_id" };
  }
  constructor(fields, tool_call_id, name) {
    if (typeof fields === "string") {
      fields = { content: fields, name, tool_call_id };
    }
    super(fields);
    Object.defineProperty(this, "lc_direct_tool_output", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "status", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "tool_call_id", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "artifact", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.tool_call_id = fields.tool_call_id;
    this.artifact = fields.artifact;
    this.status = fields.status;
  }
  _getType() {
    return "tool";
  }
  static isInstance(message) {
    return message._getType() === "tool";
  }
  get _printableFields() {
    return {
      ...super._printableFields,
      tool_call_id: this.tool_call_id,
      artifact: this.artifact
    };
  }
};
function defaultToolCallParser(rawToolCalls) {
  const toolCalls = [];
  const invalidToolCalls = [];
  for (const toolCall of rawToolCalls) {
    if (!toolCall.function) {
      continue;
    } else {
      const functionName = toolCall.function.name;
      try {
        const functionArgs = JSON.parse(toolCall.function.arguments);
        const parsed = {
          name: functionName || "",
          args: functionArgs || {},
          id: toolCall.id
        };
        toolCalls.push(parsed);
      } catch (error) {
        invalidToolCalls.push({
          name: functionName,
          args: toolCall.function.arguments,
          id: toolCall.id,
          error: "Malformed args."
        });
      }
    }
  }
  return [toolCalls, invalidToolCalls];
}

// node_modules/@langchain/core/dist/messages/ai.js
var AIMessage = class extends BaseMessage {
  get lc_aliases() {
    return {
      ...super.lc_aliases,
      tool_calls: "tool_calls",
      invalid_tool_calls: "invalid_tool_calls"
    };
  }
  constructor(fields, kwargs) {
    let initParams;
    if (typeof fields === "string") {
      initParams = {
        content: fields,
        tool_calls: [],
        invalid_tool_calls: [],
        additional_kwargs: kwargs ?? {}
      };
    } else {
      initParams = fields;
      const rawToolCalls = initParams.additional_kwargs?.tool_calls;
      const toolCalls = initParams.tool_calls;
      if (!(rawToolCalls == null) && rawToolCalls.length > 0 && (toolCalls === void 0 || toolCalls.length === 0)) {
        console.warn([
          "New LangChain packages are available that more efficiently handle",
          "tool calling.\n\nPlease upgrade your packages to versions that set",
          "message tool calls. e.g., `yarn add @langchain/anthropic`,",
          "yarn add @langchain/openai`, etc."
        ].join(" "));
      }
      try {
        if (!(rawToolCalls == null) && toolCalls === void 0) {
          const [toolCalls2, invalidToolCalls] = defaultToolCallParser(rawToolCalls);
          initParams.tool_calls = toolCalls2 ?? [];
          initParams.invalid_tool_calls = invalidToolCalls ?? [];
        } else {
          initParams.tool_calls = initParams.tool_calls ?? [];
          initParams.invalid_tool_calls = initParams.invalid_tool_calls ?? [];
        }
      } catch (e) {
        initParams.tool_calls = [];
        initParams.invalid_tool_calls = [];
      }
    }
    super(initParams);
    Object.defineProperty(this, "tool_calls", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "invalid_tool_calls", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "usage_metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (typeof initParams !== "string") {
      this.tool_calls = initParams.tool_calls ?? this.tool_calls;
      this.invalid_tool_calls = initParams.invalid_tool_calls ?? this.invalid_tool_calls;
    }
    this.usage_metadata = initParams.usage_metadata;
  }
  static lc_name() {
    return "AIMessage";
  }
  _getType() {
    return "ai";
  }
  get _printableFields() {
    return {
      ...super._printableFields,
      tool_calls: this.tool_calls,
      invalid_tool_calls: this.invalid_tool_calls,
      usage_metadata: this.usage_metadata
    };
  }
};
function isAIMessage(x) {
  return x._getType() === "ai";
}
function isAIMessageChunk(x) {
  return x._getType() === "ai";
}
var AIMessageChunk = class _AIMessageChunk extends BaseMessageChunk {
  constructor(fields) {
    let initParams;
    if (typeof fields === "string") {
      initParams = {
        content: fields,
        tool_calls: [],
        invalid_tool_calls: [],
        tool_call_chunks: []
      };
    } else if (fields.tool_call_chunks === void 0) {
      initParams = {
        ...fields,
        tool_calls: fields.tool_calls ?? [],
        invalid_tool_calls: [],
        tool_call_chunks: [],
        usage_metadata: fields.usage_metadata !== void 0 ? fields.usage_metadata : void 0
      };
    } else {
      const toolCalls = [];
      const invalidToolCalls = [];
      for (const toolCallChunk of fields.tool_call_chunks) {
        let parsedArgs = {};
        try {
          parsedArgs = parsePartialJson(toolCallChunk.args || "{}");
          if (parsedArgs === null || typeof parsedArgs !== "object" || Array.isArray(parsedArgs)) {
            throw new Error("Malformed tool call chunk args.");
          }
          toolCalls.push({
            name: toolCallChunk.name ?? "",
            args: parsedArgs,
            id: toolCallChunk.id,
            type: "tool_call"
          });
        } catch (e) {
          invalidToolCalls.push({
            name: toolCallChunk.name,
            args: toolCallChunk.args,
            id: toolCallChunk.id,
            error: "Malformed args.",
            type: "invalid_tool_call"
          });
        }
      }
      initParams = {
        ...fields,
        tool_calls: toolCalls,
        invalid_tool_calls: invalidToolCalls,
        usage_metadata: fields.usage_metadata !== void 0 ? fields.usage_metadata : void 0
      };
    }
    super(initParams);
    Object.defineProperty(this, "tool_calls", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "invalid_tool_calls", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "tool_call_chunks", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "usage_metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.tool_call_chunks = initParams.tool_call_chunks ?? this.tool_call_chunks;
    this.tool_calls = initParams.tool_calls ?? this.tool_calls;
    this.invalid_tool_calls = initParams.invalid_tool_calls ?? this.invalid_tool_calls;
    this.usage_metadata = initParams.usage_metadata;
  }
  get lc_aliases() {
    return {
      ...super.lc_aliases,
      tool_calls: "tool_calls",
      invalid_tool_calls: "invalid_tool_calls",
      tool_call_chunks: "tool_call_chunks"
    };
  }
  static lc_name() {
    return "AIMessageChunk";
  }
  _getType() {
    return "ai";
  }
  get _printableFields() {
    return {
      ...super._printableFields,
      tool_calls: this.tool_calls,
      tool_call_chunks: this.tool_call_chunks,
      invalid_tool_calls: this.invalid_tool_calls,
      usage_metadata: this.usage_metadata
    };
  }
  concat(chunk) {
    const combinedFields = {
      content: mergeContent(this.content, chunk.content),
      additional_kwargs: _mergeDicts(this.additional_kwargs, chunk.additional_kwargs),
      response_metadata: _mergeDicts(this.response_metadata, chunk.response_metadata),
      tool_call_chunks: [],
      id: this.id ?? chunk.id
    };
    if (this.tool_call_chunks !== void 0 || chunk.tool_call_chunks !== void 0) {
      const rawToolCalls = _mergeLists(this.tool_call_chunks, chunk.tool_call_chunks);
      if (rawToolCalls !== void 0 && rawToolCalls.length > 0) {
        combinedFields.tool_call_chunks = rawToolCalls;
      }
    }
    if (this.usage_metadata !== void 0 || chunk.usage_metadata !== void 0) {
      const inputTokenDetails = {
        ...(this.usage_metadata?.input_token_details?.audio !== void 0 || chunk.usage_metadata?.input_token_details?.audio !== void 0) && {
          audio: (this.usage_metadata?.input_token_details?.audio ?? 0) + (chunk.usage_metadata?.input_token_details?.audio ?? 0)
        },
        ...(this.usage_metadata?.input_token_details?.cache_read !== void 0 || chunk.usage_metadata?.input_token_details?.cache_read !== void 0) && {
          cache_read: (this.usage_metadata?.input_token_details?.cache_read ?? 0) + (chunk.usage_metadata?.input_token_details?.cache_read ?? 0)
        },
        ...(this.usage_metadata?.input_token_details?.cache_creation !== void 0 || chunk.usage_metadata?.input_token_details?.cache_creation !== void 0) && {
          cache_creation: (this.usage_metadata?.input_token_details?.cache_creation ?? 0) + (chunk.usage_metadata?.input_token_details?.cache_creation ?? 0)
        }
      };
      const outputTokenDetails = {
        ...(this.usage_metadata?.output_token_details?.audio !== void 0 || chunk.usage_metadata?.output_token_details?.audio !== void 0) && {
          audio: (this.usage_metadata?.output_token_details?.audio ?? 0) + (chunk.usage_metadata?.output_token_details?.audio ?? 0)
        },
        ...(this.usage_metadata?.output_token_details?.reasoning !== void 0 || chunk.usage_metadata?.output_token_details?.reasoning !== void 0) && {
          reasoning: (this.usage_metadata?.output_token_details?.reasoning ?? 0) + (chunk.usage_metadata?.output_token_details?.reasoning ?? 0)
        }
      };
      const left = this.usage_metadata ?? {
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0
      };
      const right = chunk.usage_metadata ?? {
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0
      };
      const usage_metadata = {
        input_tokens: left.input_tokens + right.input_tokens,
        output_tokens: left.output_tokens + right.output_tokens,
        total_tokens: left.total_tokens + right.total_tokens,
        // Do not include `input_token_details` / `output_token_details` keys in combined fields
        // unless their values are defined.
        ...Object.keys(inputTokenDetails).length > 0 && {
          input_token_details: inputTokenDetails
        },
        ...Object.keys(outputTokenDetails).length > 0 && {
          output_token_details: outputTokenDetails
        }
      };
      combinedFields.usage_metadata = usage_metadata;
    }
    return new _AIMessageChunk(combinedFields);
  }
};

// node_modules/@langchain/core/dist/messages/chat.js
var ChatMessage = class _ChatMessage extends BaseMessage {
  static lc_name() {
    return "ChatMessage";
  }
  static _chatMessageClass() {
    return _ChatMessage;
  }
  constructor(fields, role) {
    if (typeof fields === "string") {
      fields = { content: fields, role };
    }
    super(fields);
    Object.defineProperty(this, "role", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.role = fields.role;
  }
  _getType() {
    return "generic";
  }
  static isInstance(message) {
    return message._getType() === "generic";
  }
  get _printableFields() {
    return {
      ...super._printableFields,
      role: this.role
    };
  }
};

// node_modules/@langchain/core/dist/messages/human.js
var HumanMessage = class extends BaseMessage {
  static lc_name() {
    return "HumanMessage";
  }
  _getType() {
    return "human";
  }
  constructor(fields, kwargs) {
    super(fields, kwargs);
  }
};

// node_modules/@langchain/core/dist/messages/system.js
var SystemMessage = class extends BaseMessage {
  static lc_name() {
    return "SystemMessage";
  }
  _getType() {
    return "system";
  }
  constructor(fields, kwargs) {
    super(fields, kwargs);
  }
};

// node_modules/@langchain/core/dist/errors/index.js
function addLangChainErrorFields(error, lc_error_code) {
  error.lc_error_code = lc_error_code;
  error.message = `${error.message}

Troubleshooting URL: https://js.langchain.com/docs/troubleshooting/errors/${lc_error_code}/
`;
  return error;
}

// node_modules/@langchain/core/dist/tools/utils.js
function _isToolCall(toolCall) {
  return !!(toolCall && typeof toolCall === "object" && "type" in toolCall && toolCall.type === "tool_call");
}
var ToolInputParsingException = class extends Error {
  constructor(message, output) {
    super(message);
    Object.defineProperty(this, "output", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.output = output;
  }
};

// node_modules/@langchain/core/dist/messages/utils.js
function _coerceToolCall(toolCall) {
  if (_isToolCall(toolCall)) {
    return toolCall;
  } else if (typeof toolCall.id === "string" && toolCall.type === "function" && typeof toolCall.function === "object" && toolCall.function !== null && "arguments" in toolCall.function && typeof toolCall.function.arguments === "string" && "name" in toolCall.function && typeof toolCall.function.name === "string") {
    return {
      id: toolCall.id,
      args: JSON.parse(toolCall.function.arguments),
      name: toolCall.function.name,
      type: "tool_call"
    };
  } else {
    return toolCall;
  }
}
function isSerializedConstructor(x) {
  return typeof x === "object" && x != null && x.lc === 1 && Array.isArray(x.id) && x.kwargs != null && typeof x.kwargs === "object";
}
function _constructMessageFromParams(params) {
  let type;
  let rest;
  if (isSerializedConstructor(params)) {
    const className = params.id.at(-1);
    if (className === "HumanMessage" || className === "HumanMessageChunk") {
      type = "user";
    } else if (className === "AIMessage" || className === "AIMessageChunk") {
      type = "assistant";
    } else if (className === "SystemMessage" || className === "SystemMessageChunk") {
      type = "system";
    } else if (className === "FunctionMessage" || className === "FunctionMessageChunk") {
      type = "function";
    } else if (className === "ToolMessage" || className === "ToolMessageChunk") {
      type = "tool";
    } else {
      type = "unknown";
    }
    rest = params.kwargs;
  } else {
    const { type: extractedType, ...otherParams } = params;
    type = extractedType;
    rest = otherParams;
  }
  if (type === "human" || type === "user") {
    return new HumanMessage(rest);
  } else if (type === "ai" || type === "assistant") {
    const { tool_calls: rawToolCalls, ...other } = rest;
    if (!Array.isArray(rawToolCalls)) {
      return new AIMessage(rest);
    }
    const tool_calls = rawToolCalls.map(_coerceToolCall);
    return new AIMessage({ ...other, tool_calls });
  } else if (type === "system") {
    return new SystemMessage(rest);
  } else if (type === "developer") {
    return new SystemMessage({
      ...rest,
      additional_kwargs: {
        ...rest.additional_kwargs,
        __openai_role__: "developer"
      }
    });
  } else if (type === "tool" && "tool_call_id" in rest) {
    return new ToolMessage({
      ...rest,
      content: rest.content,
      tool_call_id: rest.tool_call_id,
      name: rest.name
    });
  } else {
    const error = addLangChainErrorFields(new Error(`Unable to coerce message from array: only human, AI, system, developer, or tool message coercion is currently supported.

Received: ${JSON.stringify(params, null, 2)}`), "MESSAGE_COERCION_FAILURE");
    throw error;
  }
}
function coerceMessageLikeToMessage(messageLike) {
  if (typeof messageLike === "string") {
    return new HumanMessage(messageLike);
  } else if (isBaseMessage(messageLike)) {
    return messageLike;
  }
  if (Array.isArray(messageLike)) {
    const [type, content] = messageLike;
    return _constructMessageFromParams({ type, content });
  } else if (_isMessageFieldWithRole(messageLike)) {
    const { role: type, ...rest } = messageLike;
    return _constructMessageFromParams({ ...rest, type });
  } else {
    return _constructMessageFromParams(messageLike);
  }
}
function getBufferString(messages, humanPrefix = "Human", aiPrefix = "AI") {
  const string_messages = [];
  for (const m of messages) {
    let role;
    if (m._getType() === "human") {
      role = humanPrefix;
    } else if (m._getType() === "ai") {
      role = aiPrefix;
    } else if (m._getType() === "system") {
      role = "System";
    } else if (m._getType() === "function") {
      role = "Function";
    } else if (m._getType() === "tool") {
      role = "Tool";
    } else if (m._getType() === "generic") {
      role = m.role;
    } else {
      throw new Error(`Got unsupported message type: ${m._getType()}`);
    }
    const nameStr = m.name ? `${m.name}, ` : "";
    const readableContent = typeof m.content === "string" ? m.content : JSON.stringify(m.content, null, 2);
    string_messages.push(`${role}: ${nameStr}${readableContent}`);
  }
  return string_messages.join("\n");
}

// node_modules/@langchain/core/dist/runnables/base.js
var import_p_retry3 = __toESM(require_p_retry(), 1);

// node_modules/uuid/dist/esm-node/regex.js
var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

// node_modules/uuid/dist/esm-node/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default = validate;

// node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr2, offset = 0) {
  return (byteToHex[arr2[offset + 0]] + byteToHex[arr2[offset + 1]] + byteToHex[arr2[offset + 2]] + byteToHex[arr2[offset + 3]] + "-" + byteToHex[arr2[offset + 4]] + byteToHex[arr2[offset + 5]] + "-" + byteToHex[arr2[offset + 6]] + byteToHex[arr2[offset + 7]] + "-" + byteToHex[arr2[offset + 8]] + byteToHex[arr2[offset + 9]] + "-" + byteToHex[arr2[offset + 10]] + byteToHex[arr2[offset + 11]] + byteToHex[arr2[offset + 12]] + byteToHex[arr2[offset + 13]] + byteToHex[arr2[offset + 14]] + byteToHex[arr2[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/esm-node/rng.js
var import_node_crypto = __toESM(require("node:crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_node_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm-node/native.js
var import_node_crypto2 = __toESM(require("node:crypto"));
var native_default = {
  randomUUID: import_node_crypto2.default.randomUUID
};

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// node_modules/langsmith/dist/utils/async_caller.js
var import_p_retry = __toESM(require_p_retry(), 1);
var import_p_queue = __toESM(require_dist(), 1);

// node_modules/langsmith/dist/singletons/fetch.js
var DEFAULT_FETCH_IMPLEMENTATION = (...args) => fetch(...args);
var LANGSMITH_FETCH_IMPLEMENTATION_KEY = Symbol.for("ls:fetch_implementation");
var _globalFetchImplementationIsNodeFetch = () => {
  const fetchImpl = globalThis[LANGSMITH_FETCH_IMPLEMENTATION_KEY];
  if (!fetchImpl)
    return false;
  return typeof fetchImpl === "function" && "Headers" in fetchImpl && "Request" in fetchImpl && "Response" in fetchImpl;
};
var _getFetchImplementation = (debug) => {
  return async (...args) => {
    if (debug || getLangSmithEnvironmentVariable("DEBUG") === "true") {
      const [url, options] = args;
      console.log(`\u2192 ${options?.method || "GET"} ${url}`);
    }
    const res = await (globalThis[LANGSMITH_FETCH_IMPLEMENTATION_KEY] ?? DEFAULT_FETCH_IMPLEMENTATION)(...args);
    if (debug || getLangSmithEnvironmentVariable("DEBUG") === "true") {
      console.log(`\u2190 ${res.status} ${res.statusText} ${res.url}`);
    }
    return res;
  };
};

// node_modules/langsmith/dist/utils/async_caller.js
var STATUS_NO_RETRY = [
  400,
  // Bad Request
  401,
  // Unauthorized
  403,
  // Forbidden
  404,
  // Not Found
  405,
  // Method Not Allowed
  406,
  // Not Acceptable
  407,
  // Proxy Authentication Required
  408
  // Request Timeout
];
var STATUS_IGNORE = [
  409
  // Conflict
];
var AsyncCaller = class {
  constructor(params) {
    Object.defineProperty(this, "maxConcurrency", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "maxRetries", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "queue", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "onFailedResponseHook", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "debug", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxConcurrency = params.maxConcurrency ?? Infinity;
    this.maxRetries = params.maxRetries ?? 6;
    this.debug = params.debug;
    if ("default" in import_p_queue.default) {
      this.queue = new import_p_queue.default.default({
        concurrency: this.maxConcurrency
      });
    } else {
      this.queue = new import_p_queue.default({ concurrency: this.maxConcurrency });
    }
    this.onFailedResponseHook = params?.onFailedResponseHook;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call(callable, ...args) {
    const onFailedResponseHook = this.onFailedResponseHook;
    return this.queue.add(() => (0, import_p_retry.default)(() => callable(...args).catch((error) => {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(error);
      }
    }), {
      async onFailedAttempt(error) {
        if (error.message.startsWith("Cancel") || error.message.startsWith("TimeoutError") || error.message.startsWith("AbortError")) {
          throw error;
        }
        if (error?.code === "ECONNABORTED") {
          throw error;
        }
        const response = error?.response;
        const status = response?.status;
        if (status) {
          if (STATUS_NO_RETRY.includes(+status)) {
            throw error;
          } else if (STATUS_IGNORE.includes(+status)) {
            return;
          }
          if (onFailedResponseHook) {
            await onFailedResponseHook(response);
          }
        }
      },
      // If needed we can change some of the defaults here,
      // but they're quite sensible.
      retries: this.maxRetries,
      randomize: true
    }), { throwOnTimeout: true });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callWithOptions(options, callable, ...args) {
    if (options.signal) {
      return Promise.race([
        this.call(callable, ...args),
        new Promise((_, reject) => {
          options.signal?.addEventListener("abort", () => {
            reject(new Error("AbortError"));
          });
        })
      ]);
    }
    return this.call(callable, ...args);
  }
  fetch(...args) {
    return this.call(() => _getFetchImplementation(this.debug)(...args).then((res) => res.ok ? res : Promise.reject(res)));
  }
};

// node_modules/langsmith/dist/utils/messages.js
function isLangChainMessage(message) {
  return typeof message?._getType === "function";
}
function convertLangChainMessageToExample(message) {
  const converted = {
    type: message._getType(),
    data: { content: message.content }
  };
  if (message?.additional_kwargs && Object.keys(message.additional_kwargs).length > 0) {
    converted.data.additional_kwargs = { ...message.additional_kwargs };
  }
  return converted;
}

// node_modules/langsmith/dist/utils/_uuid.js
function assertUuid(str, which) {
  if (!validate_default(str)) {
    const msg = which !== void 0 ? `Invalid UUID for ${which}: ${str}` : `Invalid UUID: ${str}`;
    throw new Error(msg);
  }
  return str;
}

// node_modules/langsmith/dist/utils/warn.js
var warnedMessages = {};
function warnOnce(message) {
  if (!warnedMessages[message]) {
    console.warn(message);
    warnedMessages[message] = true;
  }
}

// node_modules/langsmith/dist/utils/prompts.js
var import_semver = __toESM(require_semver2(), 1);
function parsePromptIdentifier(identifier) {
  if (!identifier || identifier.split("/").length > 2 || identifier.startsWith("/") || identifier.endsWith("/") || identifier.split(":").length > 2) {
    throw new Error(`Invalid identifier format: ${identifier}`);
  }
  const [ownerNamePart, commitPart] = identifier.split(":");
  const commit = commitPart || "latest";
  if (ownerNamePart.includes("/")) {
    const [owner, name] = ownerNamePart.split("/", 2);
    if (!owner || !name) {
      throw new Error(`Invalid identifier format: ${identifier}`);
    }
    return [owner, name, commit];
  } else {
    if (!ownerNamePart) {
      throw new Error(`Invalid identifier format: ${identifier}`);
    }
    return ["-", ownerNamePart, commit];
  }
}

// node_modules/langsmith/dist/utils/error.js
var LangSmithConflictError = class extends Error {
  constructor(message) {
    super(message);
    Object.defineProperty(this, "status", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.name = "LangSmithConflictError";
    this.status = 409;
  }
};
async function raiseForStatus(response, context, consume) {
  let errorBody;
  if (response.ok) {
    if (consume) {
      errorBody = await response.text();
    }
    return;
  }
  errorBody = await response.text();
  const fullMessage = `Failed to ${context}. Received status [${response.status}]: ${response.statusText}. Server response: ${errorBody}`;
  if (response.status === 409) {
    throw new LangSmithConflictError(fullMessage);
  }
  const err = new Error(fullMessage);
  err.status = response.status;
  throw err;
}

// node_modules/langsmith/dist/utils/fast-safe-stringify/index.js
var LIMIT_REPLACE_NODE = "[...]";
var CIRCULAR_REPLACE_NODE = { result: "[Circular]" };
var arr = [];
var replacerStack = [];
var encoder = new TextEncoder();
function defaultOptions2() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  };
}
function encodeString(str) {
  return encoder.encode(str);
}
function serialize(obj, errorContext, replacer, spacer, options) {
  try {
    const str = JSON.stringify(obj, replacer, spacer);
    return encodeString(str);
  } catch (e) {
    if (!e.message?.includes("Converting circular structure to JSON")) {
      console.warn(`[WARNING]: LangSmith received unserializable value.${errorContext ? `
Context: ${errorContext}` : ""}`);
      return encodeString("[Unserializable]");
    }
    console.warn(`[WARNING]: LangSmith received circular JSON. This will decrease tracer performance. ${errorContext ? `
Context: ${errorContext}` : ""}`);
    if (typeof options === "undefined") {
      options = defaultOptions2();
    }
    decirc(obj, "", 0, [], void 0, 0, options);
    let res;
    try {
      if (replacerStack.length === 0) {
        res = JSON.stringify(obj, replacer, spacer);
      } else {
        res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
      }
    } catch (_) {
      return encodeString("[unable to serialize, circular reference is too complex to analyze]");
    } finally {
      while (arr.length !== 0) {
        const part = arr.pop();
        if (part.length === 4) {
          Object.defineProperty(part[0], part[1], part[3]);
        } else {
          part[0][part[1]] = part[2];
        }
      }
    }
    return encodeString(res);
  }
}
function setReplace(replace, val, k, parent) {
  var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
  if (propertyDescriptor.get !== void 0) {
    if (propertyDescriptor.configurable) {
      Object.defineProperty(parent, k, { value: replace });
      arr.push([parent, k, val, propertyDescriptor]);
    } else {
      replacerStack.push([val, k, replace]);
    }
  } else {
    parent[k] = replace;
    arr.push([parent, k, val]);
  }
}
function decirc(val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1;
  var i;
  if (typeof val === "object" && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
        return;
      }
    }
    if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return;
    }
    if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return;
    }
    stack.push(val);
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, i, stack, val, depth, options);
      }
    } else {
      var keys = Object.keys(val);
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        decirc(val[key], key, i, stack, val, depth, options);
      }
    }
    stack.pop();
  }
}
function replaceGetterValues(replacer) {
  replacer = typeof replacer !== "undefined" ? replacer : function(k, v) {
    return v;
  };
  return function(key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i];
        if (part[1] === key && part[0] === val) {
          val = part[2];
          replacerStack.splice(i, 1);
          break;
        }
      }
    }
    return replacer.call(this, key, val);
  };
}

// node_modules/langsmith/dist/client.js
function mergeRuntimeEnvIntoRunCreate(run) {
  const runtimeEnv = getRuntimeEnvironment2();
  const envVars = getLangChainEnvVarsMetadata();
  const extra = run.extra ?? {};
  const metadata = extra.metadata;
  run.extra = {
    ...extra,
    runtime: {
      ...runtimeEnv,
      ...extra?.runtime
    },
    metadata: {
      ...envVars,
      ...envVars.revision_id || run.revision_id ? { revision_id: run.revision_id ?? envVars.revision_id } : {},
      ...metadata
    }
  };
  return run;
}
var getTracingSamplingRate = (configRate) => {
  const samplingRateStr = configRate?.toString() ?? getLangSmithEnvironmentVariable("TRACING_SAMPLING_RATE");
  if (samplingRateStr === void 0) {
    return void 0;
  }
  const samplingRate = parseFloat(samplingRateStr);
  if (samplingRate < 0 || samplingRate > 1) {
    throw new Error(`LANGSMITH_TRACING_SAMPLING_RATE must be between 0 and 1 if set. Got: ${samplingRate}`);
  }
  return samplingRate;
};
var isLocalhost = (url) => {
  const strippedUrl = url.replace("http://", "").replace("https://", "");
  const hostname = strippedUrl.split("/")[0].split(":")[0];
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
};
async function toArray(iterable) {
  const result = [];
  for await (const item of iterable) {
    result.push(item);
  }
  return result;
}
function trimQuotes(str) {
  if (str === void 0) {
    return void 0;
  }
  return str.trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}
var handle429 = async (response) => {
  if (response?.status === 429) {
    const retryAfter = parseInt(response.headers.get("retry-after") ?? "30", 10) * 1e3;
    if (retryAfter > 0) {
      await new Promise((resolve2) => setTimeout(resolve2, retryAfter));
      return true;
    }
  }
  return false;
};
function _formatFeedbackScore(score) {
  if (typeof score === "number") {
    return Number(score.toFixed(4));
  }
  return score;
}
var AutoBatchQueue = class {
  constructor() {
    Object.defineProperty(this, "items", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "sizeBytes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
  }
  peek() {
    return this.items[0];
  }
  push(item) {
    let itemPromiseResolve;
    const itemPromise = new Promise((resolve2) => {
      itemPromiseResolve = resolve2;
    });
    const size = serialize(item.item, `Serializing run with id: ${item.item.id}`).length;
    this.items.push({
      action: item.action,
      payload: item.item,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      itemPromiseResolve,
      itemPromise,
      size
    });
    this.sizeBytes += size;
    return itemPromise;
  }
  pop(upToSizeBytes) {
    if (upToSizeBytes < 1) {
      throw new Error("Number of bytes to pop off may not be less than 1.");
    }
    const popped = [];
    let poppedSizeBytes = 0;
    while (poppedSizeBytes + (this.peek()?.size ?? 0) < upToSizeBytes && this.items.length > 0) {
      const item = this.items.shift();
      if (item) {
        popped.push(item);
        poppedSizeBytes += item.size;
        this.sizeBytes -= item.size;
      }
    }
    if (popped.length === 0 && this.items.length > 0) {
      const item = this.items.shift();
      popped.push(item);
      poppedSizeBytes += item.size;
      this.sizeBytes -= item.size;
    }
    return [
      popped.map((it) => ({ action: it.action, item: it.payload })),
      () => popped.forEach((it) => it.itemPromiseResolve())
    ];
  }
};
var DEFAULT_BATCH_SIZE_LIMIT_BYTES = 20971520;
var SERVER_INFO_REQUEST_TIMEOUT = 2500;
var Client = class _Client {
  constructor(config = {}) {
    Object.defineProperty(this, "apiKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "apiUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "webUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "caller", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "batchIngestCaller", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "timeout_ms", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_tenantId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null
    });
    Object.defineProperty(this, "hideInputs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "hideOutputs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "tracingSampleRate", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "filteredPostUuids", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    Object.defineProperty(this, "autoBatchTracing", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "autoBatchQueue", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new AutoBatchQueue()
    });
    Object.defineProperty(this, "autoBatchTimeout", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "autoBatchAggregationDelayMs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 250
    });
    Object.defineProperty(this, "batchSizeBytesLimit", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "fetchOptions", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "settings", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "blockOnRootRunFinalization", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: getEnvironmentVariable2("LANGSMITH_TRACING_BACKGROUND") === "false"
    });
    Object.defineProperty(this, "traceBatchConcurrency", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5
    });
    Object.defineProperty(this, "_serverInfo", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_getServerInfoPromise", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "manualFlushMode", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "debug", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: getEnvironmentVariable2("LANGSMITH_DEBUG") === "true"
    });
    const defaultConfig = _Client.getDefaultClientConfig();
    this.tracingSampleRate = getTracingSamplingRate(config.tracingSamplingRate);
    this.apiUrl = trimQuotes(config.apiUrl ?? defaultConfig.apiUrl) ?? "";
    if (this.apiUrl.endsWith("/")) {
      this.apiUrl = this.apiUrl.slice(0, -1);
    }
    this.apiKey = trimQuotes(config.apiKey ?? defaultConfig.apiKey);
    this.webUrl = trimQuotes(config.webUrl ?? defaultConfig.webUrl);
    if (this.webUrl?.endsWith("/")) {
      this.webUrl = this.webUrl.slice(0, -1);
    }
    this.timeout_ms = config.timeout_ms ?? 9e4;
    this.caller = new AsyncCaller({
      ...config.callerOptions ?? {},
      debug: config.debug ?? this.debug
    });
    this.traceBatchConcurrency = config.traceBatchConcurrency ?? this.traceBatchConcurrency;
    if (this.traceBatchConcurrency < 1) {
      throw new Error("Trace batch concurrency must be positive.");
    }
    this.debug = config.debug ?? this.debug;
    this.batchIngestCaller = new AsyncCaller({
      maxRetries: 2,
      maxConcurrency: this.traceBatchConcurrency,
      ...config.callerOptions ?? {},
      onFailedResponseHook: handle429,
      debug: config.debug ?? this.debug
    });
    this.hideInputs = config.hideInputs ?? config.anonymizer ?? defaultConfig.hideInputs;
    this.hideOutputs = config.hideOutputs ?? config.anonymizer ?? defaultConfig.hideOutputs;
    this.autoBatchTracing = config.autoBatchTracing ?? this.autoBatchTracing;
    this.blockOnRootRunFinalization = config.blockOnRootRunFinalization ?? this.blockOnRootRunFinalization;
    this.batchSizeBytesLimit = config.batchSizeBytesLimit;
    this.fetchOptions = config.fetchOptions || {};
    this.manualFlushMode = config.manualFlushMode ?? this.manualFlushMode;
  }
  static getDefaultClientConfig() {
    const apiKey = getLangSmithEnvironmentVariable("API_KEY");
    const apiUrl = getLangSmithEnvironmentVariable("ENDPOINT") ?? "https://api.smith.langchain.com";
    const hideInputs = getLangSmithEnvironmentVariable("HIDE_INPUTS") === "true";
    const hideOutputs = getLangSmithEnvironmentVariable("HIDE_OUTPUTS") === "true";
    return {
      apiUrl,
      apiKey,
      webUrl: void 0,
      hideInputs,
      hideOutputs
    };
  }
  getHostUrl() {
    if (this.webUrl) {
      return this.webUrl;
    } else if (isLocalhost(this.apiUrl)) {
      this.webUrl = "http://localhost:3000";
      return this.webUrl;
    } else if (this.apiUrl.endsWith("/api/v1")) {
      this.webUrl = this.apiUrl.replace("/api/v1", "");
      return this.webUrl;
    } else if (this.apiUrl.includes("/api") && !this.apiUrl.split(".", 1)[0].endsWith("api")) {
      this.webUrl = this.apiUrl.replace("/api", "");
      return this.webUrl;
    } else if (this.apiUrl.split(".", 1)[0].includes("dev")) {
      this.webUrl = "https://dev.smith.langchain.com";
      return this.webUrl;
    } else if (this.apiUrl.split(".", 1)[0].includes("eu")) {
      this.webUrl = "https://eu.smith.langchain.com";
      return this.webUrl;
    } else if (this.apiUrl.split(".", 1)[0].includes("beta")) {
      this.webUrl = "https://beta.smith.langchain.com";
      return this.webUrl;
    } else {
      this.webUrl = "https://smith.langchain.com";
      return this.webUrl;
    }
  }
  get headers() {
    const headers = {
      "User-Agent": `langsmith-js/${__version__}`
    };
    if (this.apiKey) {
      headers["x-api-key"] = `${this.apiKey}`;
    }
    return headers;
  }
  async processInputs(inputs) {
    if (this.hideInputs === false) {
      return inputs;
    }
    if (this.hideInputs === true) {
      return {};
    }
    if (typeof this.hideInputs === "function") {
      return this.hideInputs(inputs);
    }
    return inputs;
  }
  async processOutputs(outputs) {
    if (this.hideOutputs === false) {
      return outputs;
    }
    if (this.hideOutputs === true) {
      return {};
    }
    if (typeof this.hideOutputs === "function") {
      return this.hideOutputs(outputs);
    }
    return outputs;
  }
  async prepareRunCreateOrUpdateInputs(run) {
    const runParams = { ...run };
    if (runParams.inputs !== void 0) {
      runParams.inputs = await this.processInputs(runParams.inputs);
    }
    if (runParams.outputs !== void 0) {
      runParams.outputs = await this.processOutputs(runParams.outputs);
    }
    return runParams;
  }
  async _getResponse(path, queryParams) {
    const paramsString = queryParams?.toString() ?? "";
    const url = `${this.apiUrl}${path}?${paramsString}`;
    const response = await this.caller.call(_getFetchImplementation(this.debug), url, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, `Failed to fetch ${path}`);
    return response;
  }
  async _get(path, queryParams) {
    const response = await this._getResponse(path, queryParams);
    return response.json();
  }
  async *_getPaginated(path, queryParams = new URLSearchParams(), transform) {
    let offset = Number(queryParams.get("offset")) || 0;
    const limit = Number(queryParams.get("limit")) || 100;
    while (true) {
      queryParams.set("offset", String(offset));
      queryParams.set("limit", String(limit));
      const url = `${this.apiUrl}${path}?${queryParams}`;
      const response = await this.caller.call(_getFetchImplementation(this.debug), url, {
        method: "GET",
        headers: this.headers,
        signal: AbortSignal.timeout(this.timeout_ms),
        ...this.fetchOptions
      });
      await raiseForStatus(response, `Failed to fetch ${path}`);
      const items = transform ? transform(await response.json()) : await response.json();
      if (items.length === 0) {
        break;
      }
      yield items;
      if (items.length < limit) {
        break;
      }
      offset += items.length;
    }
  }
  async *_getCursorPaginatedList(path, body = null, requestMethod = "POST", dataKey = "runs") {
    const bodyParams = body ? { ...body } : {};
    while (true) {
      const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}${path}`, {
        method: requestMethod,
        headers: { ...this.headers, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(this.timeout_ms),
        ...this.fetchOptions,
        body: JSON.stringify(bodyParams)
      });
      const responseBody = await response.json();
      if (!responseBody) {
        break;
      }
      if (!responseBody[dataKey]) {
        break;
      }
      yield responseBody[dataKey];
      const cursors = responseBody.cursors;
      if (!cursors) {
        break;
      }
      if (!cursors.next) {
        break;
      }
      bodyParams.cursor = cursors.next;
    }
  }
  // Allows mocking for tests
  _shouldSample() {
    if (this.tracingSampleRate === void 0) {
      return true;
    }
    return Math.random() < this.tracingSampleRate;
  }
  _filterForSampling(runs, patch = false) {
    if (this.tracingSampleRate === void 0) {
      return runs;
    }
    if (patch) {
      const sampled = [];
      for (const run of runs) {
        if (!this.filteredPostUuids.has(run.id)) {
          sampled.push(run);
        } else {
          this.filteredPostUuids.delete(run.id);
        }
      }
      return sampled;
    } else {
      const sampled = [];
      for (const run of runs) {
        const traceId = run.trace_id ?? run.id;
        if (this.filteredPostUuids.has(traceId)) {
          continue;
        }
        if (run.id === traceId) {
          if (this._shouldSample()) {
            sampled.push(run);
          } else {
            this.filteredPostUuids.add(traceId);
          }
        } else {
          sampled.push(run);
        }
      }
      return sampled;
    }
  }
  async _getBatchSizeLimitBytes() {
    const serverInfo = await this._ensureServerInfo();
    return this.batchSizeBytesLimit ?? serverInfo.batch_ingest_config?.size_limit_bytes ?? DEFAULT_BATCH_SIZE_LIMIT_BYTES;
  }
  async _getMultiPartSupport() {
    const serverInfo = await this._ensureServerInfo();
    return serverInfo.instance_flags?.dataset_examples_multipart_enabled ?? false;
  }
  drainAutoBatchQueue(batchSizeLimit) {
    const promises2 = [];
    while (this.autoBatchQueue.items.length > 0) {
      const [batch, done] = this.autoBatchQueue.pop(batchSizeLimit);
      if (!batch.length) {
        done();
        break;
      }
      const batchPromise = this._processBatch(batch, done).catch(console.error);
      promises2.push(batchPromise);
    }
    return Promise.all(promises2);
  }
  async _processBatch(batch, done) {
    if (!batch.length) {
      done();
      return;
    }
    try {
      const ingestParams = {
        runCreates: batch.filter((item) => item.action === "create").map((item) => item.item),
        runUpdates: batch.filter((item) => item.action === "update").map((item) => item.item)
      };
      const serverInfo = await this._ensureServerInfo();
      if (serverInfo?.batch_ingest_config?.use_multipart_endpoint) {
        await this.multipartIngestRuns(ingestParams);
      } else {
        await this.batchIngestRuns(ingestParams);
      }
    } finally {
      done();
    }
  }
  async processRunOperation(item) {
    clearTimeout(this.autoBatchTimeout);
    this.autoBatchTimeout = void 0;
    if (item.action === "create") {
      item.item = mergeRuntimeEnvIntoRunCreate(item.item);
    }
    const itemPromise = this.autoBatchQueue.push(item);
    if (this.manualFlushMode) {
      return itemPromise;
    }
    const sizeLimitBytes = await this._getBatchSizeLimitBytes();
    if (this.autoBatchQueue.sizeBytes > sizeLimitBytes) {
      void this.drainAutoBatchQueue(sizeLimitBytes);
    }
    if (this.autoBatchQueue.items.length > 0) {
      this.autoBatchTimeout = setTimeout(() => {
        this.autoBatchTimeout = void 0;
        void this.drainAutoBatchQueue(sizeLimitBytes);
      }, this.autoBatchAggregationDelayMs);
    }
    return itemPromise;
  }
  async _getServerInfo() {
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/info`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(SERVER_INFO_REQUEST_TIMEOUT),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "get server info");
    const json = await response.json();
    if (this.debug) {
      console.log("\n=== LangSmith Server Configuration ===\n" + JSON.stringify(json, null, 2) + "\n");
    }
    return json;
  }
  async _ensureServerInfo() {
    if (this._getServerInfoPromise === void 0) {
      this._getServerInfoPromise = (async () => {
        if (this._serverInfo === void 0) {
          try {
            this._serverInfo = await this._getServerInfo();
          } catch (e) {
            console.warn(`[WARNING]: LangSmith failed to fetch info on supported operations with status code ${e.status}. Falling back to batch operations and default limits.`);
          }
        }
        return this._serverInfo ?? {};
      })();
    }
    return this._getServerInfoPromise.then((serverInfo) => {
      if (this._serverInfo === void 0) {
        this._getServerInfoPromise = void 0;
      }
      return serverInfo;
    });
  }
  async _getSettings() {
    if (!this.settings) {
      this.settings = this._get("/settings");
    }
    return await this.settings;
  }
  /**
   * Flushes current queued traces.
   */
  async flush() {
    const sizeLimitBytes = await this._getBatchSizeLimitBytes();
    await this.drainAutoBatchQueue(sizeLimitBytes);
  }
  async createRun(run) {
    if (!this._filterForSampling([run]).length) {
      return;
    }
    const headers = { ...this.headers, "Content-Type": "application/json" };
    const session_name = run.project_name;
    delete run.project_name;
    const runCreate = await this.prepareRunCreateOrUpdateInputs({
      session_name,
      ...run,
      start_time: run.start_time ?? Date.now()
    });
    if (this.autoBatchTracing && runCreate.trace_id !== void 0 && runCreate.dotted_order !== void 0) {
      void this.processRunOperation({
        action: "create",
        item: runCreate
      }).catch(console.error);
      return;
    }
    const mergedRunCreateParam = mergeRuntimeEnvIntoRunCreate(runCreate);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/runs`, {
      method: "POST",
      headers,
      body: serialize(mergedRunCreateParam, `Creating run with id: ${mergedRunCreateParam.id}`),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "create run", true);
  }
  /**
   * Batch ingest/upsert multiple runs in the Langsmith system.
   * @param runs
   */
  async batchIngestRuns({ runCreates, runUpdates }) {
    if (runCreates === void 0 && runUpdates === void 0) {
      return;
    }
    let preparedCreateParams = await Promise.all(runCreates?.map((create) => this.prepareRunCreateOrUpdateInputs(create)) ?? []);
    let preparedUpdateParams = await Promise.all(runUpdates?.map((update) => this.prepareRunCreateOrUpdateInputs(update)) ?? []);
    if (preparedCreateParams.length > 0 && preparedUpdateParams.length > 0) {
      const createById = preparedCreateParams.reduce((params, run) => {
        if (!run.id) {
          return params;
        }
        params[run.id] = run;
        return params;
      }, {});
      const standaloneUpdates = [];
      for (const updateParam of preparedUpdateParams) {
        if (updateParam.id !== void 0 && createById[updateParam.id]) {
          createById[updateParam.id] = {
            ...createById[updateParam.id],
            ...updateParam
          };
        } else {
          standaloneUpdates.push(updateParam);
        }
      }
      preparedCreateParams = Object.values(createById);
      preparedUpdateParams = standaloneUpdates;
    }
    const rawBatch = {
      post: preparedCreateParams,
      patch: preparedUpdateParams
    };
    if (!rawBatch.post.length && !rawBatch.patch.length) {
      return;
    }
    const batchChunks = {
      post: [],
      patch: []
    };
    for (const k of ["post", "patch"]) {
      const key = k;
      const batchItems = rawBatch[key].reverse();
      let batchItem = batchItems.pop();
      while (batchItem !== void 0) {
        batchChunks[key].push(batchItem);
        batchItem = batchItems.pop();
      }
    }
    if (batchChunks.post.length > 0 || batchChunks.patch.length > 0) {
      const runIds = batchChunks.post.map((item) => item.id).concat(batchChunks.patch.map((item) => item.id)).join(",");
      await this._postBatchIngestRuns(serialize(batchChunks, `Ingesting runs with ids: ${runIds}`));
    }
  }
  async _postBatchIngestRuns(body) {
    const headers = {
      ...this.headers,
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    const response = await this.batchIngestCaller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/runs/batch`, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "batch create run", true);
  }
  /**
   * Batch ingest/upsert multiple runs in the Langsmith system.
   * @param runs
   */
  async multipartIngestRuns({ runCreates, runUpdates }) {
    if (runCreates === void 0 && runUpdates === void 0) {
      return;
    }
    const allAttachments = {};
    let preparedCreateParams = [];
    for (const create of runCreates ?? []) {
      const preparedCreate = await this.prepareRunCreateOrUpdateInputs(create);
      if (preparedCreate.id !== void 0 && preparedCreate.attachments !== void 0) {
        allAttachments[preparedCreate.id] = preparedCreate.attachments;
      }
      delete preparedCreate.attachments;
      preparedCreateParams.push(preparedCreate);
    }
    let preparedUpdateParams = [];
    for (const update of runUpdates ?? []) {
      preparedUpdateParams.push(await this.prepareRunCreateOrUpdateInputs(update));
    }
    const invalidRunCreate = preparedCreateParams.find((runCreate) => {
      return runCreate.trace_id === void 0 || runCreate.dotted_order === void 0;
    });
    if (invalidRunCreate !== void 0) {
      throw new Error(`Multipart ingest requires "trace_id" and "dotted_order" to be set when creating a run`);
    }
    const invalidRunUpdate = preparedUpdateParams.find((runUpdate) => {
      return runUpdate.trace_id === void 0 || runUpdate.dotted_order === void 0;
    });
    if (invalidRunUpdate !== void 0) {
      throw new Error(`Multipart ingest requires "trace_id" and "dotted_order" to be set when updating a run`);
    }
    if (preparedCreateParams.length > 0 && preparedUpdateParams.length > 0) {
      const createById = preparedCreateParams.reduce((params, run) => {
        if (!run.id) {
          return params;
        }
        params[run.id] = run;
        return params;
      }, {});
      const standaloneUpdates = [];
      for (const updateParam of preparedUpdateParams) {
        if (updateParam.id !== void 0 && createById[updateParam.id]) {
          createById[updateParam.id] = {
            ...createById[updateParam.id],
            ...updateParam
          };
        } else {
          standaloneUpdates.push(updateParam);
        }
      }
      preparedCreateParams = Object.values(createById);
      preparedUpdateParams = standaloneUpdates;
    }
    if (preparedCreateParams.length === 0 && preparedUpdateParams.length === 0) {
      return;
    }
    const accumulatedContext = [];
    const accumulatedParts = [];
    for (const [method, payloads] of [
      ["post", preparedCreateParams],
      ["patch", preparedUpdateParams]
    ]) {
      for (const originalPayload of payloads) {
        const { inputs, outputs, events, attachments, ...payload } = originalPayload;
        const fields = { inputs, outputs, events };
        const stringifiedPayload = serialize(payload, `Serializing for multipart ingestion of run with id: ${payload.id}`);
        accumulatedParts.push({
          name: `${method}.${payload.id}`,
          payload: new Blob([stringifiedPayload], {
            type: `application/json; length=${stringifiedPayload.length}`
            // encoding=gzip
          })
        });
        for (const [key, value] of Object.entries(fields)) {
          if (value === void 0) {
            continue;
          }
          const stringifiedValue = serialize(value, `Serializing ${key} for multipart ingestion of run with id: ${payload.id}`);
          accumulatedParts.push({
            name: `${method}.${payload.id}.${key}`,
            payload: new Blob([stringifiedValue], {
              type: `application/json; length=${stringifiedValue.length}`
            })
          });
        }
        if (payload.id !== void 0) {
          const attachments2 = allAttachments[payload.id];
          if (attachments2) {
            delete allAttachments[payload.id];
            for (const [name, attachment] of Object.entries(attachments2)) {
              let contentType;
              let content;
              if (Array.isArray(attachment)) {
                [contentType, content] = attachment;
              } else {
                contentType = attachment.mimeType;
                content = attachment.data;
              }
              if (name.includes(".")) {
                console.warn(`Skipping attachment '${name}' for run ${payload.id}: Invalid attachment name. Attachment names must not contain periods ('.'). Please rename the attachment and try again.`);
                continue;
              }
              accumulatedParts.push({
                name: `attachment.${payload.id}.${name}`,
                payload: new Blob([content], {
                  type: `${contentType}; length=${content.byteLength}`
                })
              });
            }
          }
        }
        accumulatedContext.push(`trace=${payload.trace_id},id=${payload.id}`);
      }
    }
    await this._sendMultipartRequest(accumulatedParts, accumulatedContext.join("; "));
  }
  async _createNodeFetchBody(parts, boundary) {
    const chunks = [];
    for (const part of parts) {
      chunks.push(new Blob([`--${boundary}\r
`]));
      chunks.push(new Blob([
        `Content-Disposition: form-data; name="${part.name}"\r
`,
        `Content-Type: ${part.payload.type}\r
\r
`
      ]));
      chunks.push(part.payload);
      chunks.push(new Blob(["\r\n"]));
    }
    chunks.push(new Blob([`--${boundary}--\r
`]));
    const body = new Blob(chunks);
    const arrayBuffer = await body.arrayBuffer();
    return arrayBuffer;
  }
  async _createMultipartStream(parts, boundary) {
    const encoder2 = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const writeChunk = async (chunk) => {
          if (typeof chunk === "string") {
            controller.enqueue(encoder2.encode(chunk));
          } else {
            controller.enqueue(chunk);
          }
        };
        for (const part of parts) {
          await writeChunk(`--${boundary}\r
`);
          await writeChunk(`Content-Disposition: form-data; name="${part.name}"\r
`);
          await writeChunk(`Content-Type: ${part.payload.type}\r
\r
`);
          const payloadStream = part.payload.stream();
          const reader = payloadStream.getReader();
          try {
            let result;
            while (!(result = await reader.read()).done) {
              controller.enqueue(result.value);
            }
          } finally {
            reader.releaseLock();
          }
          await writeChunk("\r\n");
        }
        await writeChunk(`--${boundary}--\r
`);
        controller.close();
      }
    });
    return stream;
  }
  async _sendMultipartRequest(parts, context) {
    try {
      const boundary = "----LangSmithFormBoundary" + Math.random().toString(36).slice(2);
      const body = await (_globalFetchImplementationIsNodeFetch() ? this._createNodeFetchBody(parts, boundary) : this._createMultipartStream(parts, boundary));
      const res = await this.batchIngestCaller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/runs/multipart`, {
        method: "POST",
        headers: {
          ...this.headers,
          "Content-Type": `multipart/form-data; boundary=${boundary}`
        },
        body,
        duplex: "half",
        signal: AbortSignal.timeout(this.timeout_ms),
        ...this.fetchOptions
      });
      await raiseForStatus(res, "ingest multipart runs", true);
    } catch (e) {
      console.warn(`${e.message.trim()}

Context: ${context}`);
    }
  }
  async updateRun(runId, run) {
    assertUuid(runId);
    if (run.inputs) {
      run.inputs = await this.processInputs(run.inputs);
    }
    if (run.outputs) {
      run.outputs = await this.processOutputs(run.outputs);
    }
    const data = { ...run, id: runId };
    if (!this._filterForSampling([data], true).length) {
      return;
    }
    if (this.autoBatchTracing && data.trace_id !== void 0 && data.dotted_order !== void 0) {
      if (run.end_time !== void 0 && data.parent_run_id === void 0 && this.blockOnRootRunFinalization && !this.manualFlushMode) {
        await this.processRunOperation({ action: "update", item: data }).catch(console.error);
        return;
      } else {
        void this.processRunOperation({ action: "update", item: data }).catch(console.error);
      }
      return;
    }
    const headers = { ...this.headers, "Content-Type": "application/json" };
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/runs/${runId}`, {
      method: "PATCH",
      headers,
      body: serialize(run, `Serializing payload to update run with id: ${runId}`),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "update run", true);
  }
  async readRun(runId, { loadChildRuns } = { loadChildRuns: false }) {
    assertUuid(runId);
    let run = await this._get(`/runs/${runId}`);
    if (loadChildRuns && run.child_run_ids) {
      run = await this._loadChildRuns(run);
    }
    return run;
  }
  async getRunUrl({ runId, run, projectOpts }) {
    if (run !== void 0) {
      let sessionId;
      if (run.session_id) {
        sessionId = run.session_id;
      } else if (projectOpts?.projectName) {
        sessionId = (await this.readProject({ projectName: projectOpts?.projectName })).id;
      } else if (projectOpts?.projectId) {
        sessionId = projectOpts?.projectId;
      } else {
        const project = await this.readProject({
          projectName: getLangSmithEnvironmentVariable("PROJECT") || "default"
        });
        sessionId = project.id;
      }
      const tenantId = await this._getTenantId();
      return `${this.getHostUrl()}/o/${tenantId}/projects/p/${sessionId}/r/${run.id}?poll=true`;
    } else if (runId !== void 0) {
      const run_ = await this.readRun(runId);
      if (!run_.app_path) {
        throw new Error(`Run ${runId} has no app_path`);
      }
      const baseUrl = this.getHostUrl();
      return `${baseUrl}${run_.app_path}`;
    } else {
      throw new Error("Must provide either runId or run");
    }
  }
  async _loadChildRuns(run) {
    const childRuns = await toArray(this.listRuns({ id: run.child_run_ids }));
    const treemap = {};
    const runs = {};
    childRuns.sort((a, b) => (a?.dotted_order ?? "").localeCompare(b?.dotted_order ?? ""));
    for (const childRun of childRuns) {
      if (childRun.parent_run_id === null || childRun.parent_run_id === void 0) {
        throw new Error(`Child run ${childRun.id} has no parent`);
      }
      if (!(childRun.parent_run_id in treemap)) {
        treemap[childRun.parent_run_id] = [];
      }
      treemap[childRun.parent_run_id].push(childRun);
      runs[childRun.id] = childRun;
    }
    run.child_runs = treemap[run.id] || [];
    for (const runId in treemap) {
      if (runId !== run.id) {
        runs[runId].child_runs = treemap[runId];
      }
    }
    return run;
  }
  /**
   * List runs from the LangSmith server.
   * @param projectId - The ID of the project to filter by.
   * @param projectName - The name of the project to filter by.
   * @param parentRunId - The ID of the parent run to filter by.
   * @param traceId - The ID of the trace to filter by.
   * @param referenceExampleId - The ID of the reference example to filter by.
   * @param startTime - The start time to filter by.
   * @param isRoot - Indicates whether to only return root runs.
   * @param runType - The run type to filter by.
   * @param error - Indicates whether to filter by error runs.
   * @param id - The ID of the run to filter by.
   * @param query - The query string to filter by.
   * @param filter - The filter string to apply to the run spans.
   * @param traceFilter - The filter string to apply on the root run of the trace.
   * @param treeFilter - The filter string to apply on other runs in the trace.
   * @param limit - The maximum number of runs to retrieve.
   * @returns {AsyncIterable<Run>} - The runs.
   *
   * @example
   * // List all runs in a project
   * const projectRuns = client.listRuns({ projectName: "<your_project>" });
   *
   * @example
   * // List LLM and Chat runs in the last 24 hours
   * const todaysLLMRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   start_time: new Date(Date.now() - 24 * 60 * 60 * 1000),
   *   run_type: "llm",
   * });
   *
   * @example
   * // List traces in a project
   * const rootRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   execution_order: 1,
   * });
   *
   * @example
   * // List runs without errors
   * const correctRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   error: false,
   * });
   *
   * @example
   * // List runs by run ID
   * const runIds = [
   *   "a36092d2-4ad5-4fb4-9c0d-0dba9a2ed836",
   *   "9398e6be-964f-4aa4-8ae9-ad78cd4b7074",
   * ];
   * const selectedRuns = client.listRuns({ run_ids: runIds });
   *
   * @example
   * // List all "chain" type runs that took more than 10 seconds and had `total_tokens` greater than 5000
   * const chainRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   filter: 'and(eq(run_type, "chain"), gt(latency, 10), gt(total_tokens, 5000))',
   * });
   *
   * @example
   * // List all runs called "extractor" whose root of the trace was assigned feedback "user_score" score of 1
   * const goodExtractorRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   filter: 'eq(name, "extractor")',
   *   traceFilter: 'and(eq(feedback_key, "user_score"), eq(feedback_score, 1))',
   * });
   *
   * @example
   * // List all runs that started after a specific timestamp and either have "error" not equal to null or a "Correctness" feedback score equal to 0
   * const complexRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   filter: 'and(gt(start_time, "2023-07-15T12:34:56Z"), or(neq(error, null), and(eq(feedback_key, "Correctness"), eq(feedback_score, 0.0))))',
   * });
   *
   * @example
   * // List all runs where `tags` include "experimental" or "beta" and `latency` is greater than 2 seconds
   * const taggedRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   filter: 'and(or(has(tags, "experimental"), has(tags, "beta")), gt(latency, 2))',
   * });
   */
  async *listRuns(props) {
    const { projectId, projectName, parentRunId, traceId, referenceExampleId, startTime, executionOrder, isRoot, runType, error, id, query, filter, traceFilter, treeFilter, limit, select, order } = props;
    let projectIds = [];
    if (projectId) {
      projectIds = Array.isArray(projectId) ? projectId : [projectId];
    }
    if (projectName) {
      const projectNames = Array.isArray(projectName) ? projectName : [projectName];
      const projectIds_ = await Promise.all(projectNames.map((name) => this.readProject({ projectName: name }).then((project) => project.id)));
      projectIds.push(...projectIds_);
    }
    const default_select = [
      "app_path",
      "child_run_ids",
      "completion_cost",
      "completion_tokens",
      "dotted_order",
      "end_time",
      "error",
      "events",
      "extra",
      "feedback_stats",
      "first_token_time",
      "id",
      "inputs",
      "name",
      "outputs",
      "parent_run_id",
      "parent_run_ids",
      "prompt_cost",
      "prompt_tokens",
      "reference_example_id",
      "run_type",
      "session_id",
      "start_time",
      "status",
      "tags",
      "total_cost",
      "total_tokens",
      "trace_id"
    ];
    const body = {
      session: projectIds.length ? projectIds : null,
      run_type: runType,
      reference_example: referenceExampleId,
      query,
      filter,
      trace_filter: traceFilter,
      tree_filter: treeFilter,
      execution_order: executionOrder,
      parent_run: parentRunId,
      start_time: startTime ? startTime.toISOString() : null,
      error,
      id,
      limit,
      trace: traceId,
      select: select ? select : default_select,
      is_root: isRoot,
      order
    };
    let runsYielded = 0;
    for await (const runs of this._getCursorPaginatedList("/runs/query", body)) {
      if (limit) {
        if (runsYielded >= limit) {
          break;
        }
        if (runs.length + runsYielded > limit) {
          const newRuns = runs.slice(0, limit - runsYielded);
          yield* newRuns;
          break;
        }
        runsYielded += runs.length;
        yield* runs;
      } else {
        yield* runs;
      }
    }
  }
  async *listGroupRuns(props) {
    const { projectId, projectName, groupBy, filter, startTime, endTime, limit, offset } = props;
    const sessionId = projectId || (await this.readProject({ projectName })).id;
    const baseBody = {
      session_id: sessionId,
      group_by: groupBy,
      filter,
      start_time: startTime ? startTime.toISOString() : null,
      end_time: endTime ? endTime.toISOString() : null,
      limit: Number(limit) || 100
    };
    let currentOffset = Number(offset) || 0;
    const path = "/runs/group";
    const url = `${this.apiUrl}${path}`;
    while (true) {
      const currentBody = {
        ...baseBody,
        offset: currentOffset
      };
      const filteredPayload = Object.fromEntries(Object.entries(currentBody).filter(([_, value]) => value !== void 0));
      const response = await this.caller.call(_getFetchImplementation(), url, {
        method: "POST",
        headers: { ...this.headers, "Content-Type": "application/json" },
        body: JSON.stringify(filteredPayload),
        signal: AbortSignal.timeout(this.timeout_ms),
        ...this.fetchOptions
      });
      await raiseForStatus(response, `Failed to fetch ${path}`);
      const items = await response.json();
      const { groups, total } = items;
      if (groups.length === 0) {
        break;
      }
      for (const thread of groups) {
        yield thread;
      }
      currentOffset += groups.length;
      if (currentOffset >= total) {
        break;
      }
    }
  }
  async getRunStats({ id, trace, parentRun, runType, projectNames, projectIds, referenceExampleIds, startTime, endTime, error, query, filter, traceFilter, treeFilter, isRoot, dataSourceType }) {
    let projectIds_ = projectIds || [];
    if (projectNames) {
      projectIds_ = [
        ...projectIds || [],
        ...await Promise.all(projectNames.map((name) => this.readProject({ projectName: name }).then((project) => project.id)))
      ];
    }
    const payload = {
      id,
      trace,
      parent_run: parentRun,
      run_type: runType,
      session: projectIds_,
      reference_example: referenceExampleIds,
      start_time: startTime,
      end_time: endTime,
      error,
      query,
      filter,
      trace_filter: traceFilter,
      tree_filter: treeFilter,
      is_root: isRoot,
      data_source_type: dataSourceType
    };
    const filteredPayload = Object.fromEntries(Object.entries(payload).filter(([_, value]) => value !== void 0));
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/runs/stats`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(filteredPayload),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const result = await response.json();
    return result;
  }
  async shareRun(runId, { shareId } = {}) {
    const data = {
      run_id: runId,
      share_token: shareId || v4_default()
    };
    assertUuid(runId);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/runs/${runId}/share`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const result = await response.json();
    if (result === null || !("share_token" in result)) {
      throw new Error("Invalid response from server");
    }
    return `${this.getHostUrl()}/public/${result["share_token"]}/r`;
  }
  async unshareRun(runId) {
    assertUuid(runId);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/runs/${runId}/share`, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "unshare run", true);
  }
  async readRunSharedLink(runId) {
    assertUuid(runId);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/runs/${runId}/share`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const result = await response.json();
    if (result === null || !("share_token" in result)) {
      return void 0;
    }
    return `${this.getHostUrl()}/public/${result["share_token"]}/r`;
  }
  async listSharedRuns(shareToken, { runIds } = {}) {
    const queryParams = new URLSearchParams({
      share_token: shareToken
    });
    if (runIds !== void 0) {
      for (const runId of runIds) {
        queryParams.append("id", runId);
      }
    }
    assertUuid(shareToken);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/public/${shareToken}/runs${queryParams}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const runs = await response.json();
    return runs;
  }
  async readDatasetSharedSchema(datasetId, datasetName) {
    if (!datasetId && !datasetName) {
      throw new Error("Either datasetId or datasetName must be given");
    }
    if (!datasetId) {
      const dataset = await this.readDataset({ datasetName });
      datasetId = dataset.id;
    }
    assertUuid(datasetId);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/datasets/${datasetId}/share`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const shareSchema = await response.json();
    shareSchema.url = `${this.getHostUrl()}/public/${shareSchema.share_token}/d`;
    return shareSchema;
  }
  async shareDataset(datasetId, datasetName) {
    if (!datasetId && !datasetName) {
      throw new Error("Either datasetId or datasetName must be given");
    }
    if (!datasetId) {
      const dataset = await this.readDataset({ datasetName });
      datasetId = dataset.id;
    }
    const data = {
      dataset_id: datasetId
    };
    assertUuid(datasetId);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/datasets/${datasetId}/share`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const shareSchema = await response.json();
    shareSchema.url = `${this.getHostUrl()}/public/${shareSchema.share_token}/d`;
    return shareSchema;
  }
  async unshareDataset(datasetId) {
    assertUuid(datasetId);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/datasets/${datasetId}/share`, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "unshare dataset", true);
  }
  async readSharedDataset(shareToken) {
    assertUuid(shareToken);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/public/${shareToken}/datasets`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const dataset = await response.json();
    return dataset;
  }
  /**
   * Get shared examples.
   *
   * @param {string} shareToken The share token to get examples for. A share token is the UUID (or LangSmith URL, including UUID) generated when explicitly marking an example as public.
   * @param {Object} [options] Additional options for listing the examples.
   * @param {string[] | undefined} [options.exampleIds] A list of example IDs to filter by.
   * @returns {Promise<Example[]>} The shared examples.
   */
  async listSharedExamples(shareToken, options) {
    const params = {};
    if (options?.exampleIds) {
      params.id = options.exampleIds;
    }
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => urlParams.append(key, v));
      } else {
        urlParams.append(key, value);
      }
    });
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/public/${shareToken}/examples?${urlParams.toString()}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const result = await response.json();
    if (!response.ok) {
      if ("detail" in result) {
        throw new Error(`Failed to list shared examples.
Status: ${response.status}
Message: ${Array.isArray(result.detail) ? result.detail.join("\n") : "Unspecified error"}`);
      }
      throw new Error(`Failed to list shared examples: ${response.status} ${response.statusText}`);
    }
    return result.map((example) => ({
      ...example,
      _hostUrl: this.getHostUrl()
    }));
  }
  async createProject({ projectName, description = null, metadata = null, upsert = false, projectExtra = null, referenceDatasetId = null }) {
    const upsert_ = upsert ? `?upsert=true` : "";
    const endpoint = `${this.apiUrl}/sessions${upsert_}`;
    const extra = projectExtra || {};
    if (metadata) {
      extra["metadata"] = metadata;
    }
    const body = {
      name: projectName,
      extra,
      description
    };
    if (referenceDatasetId !== null) {
      body["reference_dataset_id"] = referenceDatasetId;
    }
    const response = await this.caller.call(_getFetchImplementation(this.debug), endpoint, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "create project");
    const result = await response.json();
    return result;
  }
  async updateProject(projectId, { name = null, description = null, metadata = null, projectExtra = null, endTime = null }) {
    const endpoint = `${this.apiUrl}/sessions/${projectId}`;
    let extra = projectExtra;
    if (metadata) {
      extra = { ...extra || {}, metadata };
    }
    const body = {
      name,
      extra,
      description,
      end_time: endTime ? new Date(endTime).toISOString() : null
    };
    const response = await this.caller.call(_getFetchImplementation(this.debug), endpoint, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "update project");
    const result = await response.json();
    return result;
  }
  async hasProject({ projectId, projectName }) {
    let path = "/sessions";
    const params = new URLSearchParams();
    if (projectId !== void 0 && projectName !== void 0) {
      throw new Error("Must provide either projectName or projectId, not both");
    } else if (projectId !== void 0) {
      assertUuid(projectId);
      path += `/${projectId}`;
    } else if (projectName !== void 0) {
      params.append("name", projectName);
    } else {
      throw new Error("Must provide projectName or projectId");
    }
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}${path}?${params}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    try {
      const result = await response.json();
      if (!response.ok) {
        return false;
      }
      if (Array.isArray(result)) {
        return result.length > 0;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  async readProject({ projectId, projectName, includeStats }) {
    let path = "/sessions";
    const params = new URLSearchParams();
    if (projectId !== void 0 && projectName !== void 0) {
      throw new Error("Must provide either projectName or projectId, not both");
    } else if (projectId !== void 0) {
      assertUuid(projectId);
      path += `/${projectId}`;
    } else if (projectName !== void 0) {
      params.append("name", projectName);
    } else {
      throw new Error("Must provide projectName or projectId");
    }
    if (includeStats !== void 0) {
      params.append("include_stats", includeStats.toString());
    }
    const response = await this._get(path, params);
    let result;
    if (Array.isArray(response)) {
      if (response.length === 0) {
        throw new Error(`Project[id=${projectId}, name=${projectName}] not found`);
      }
      result = response[0];
    } else {
      result = response;
    }
    return result;
  }
  async getProjectUrl({ projectId, projectName }) {
    if (projectId === void 0 && projectName === void 0) {
      throw new Error("Must provide either projectName or projectId");
    }
    const project = await this.readProject({ projectId, projectName });
    const tenantId = await this._getTenantId();
    return `${this.getHostUrl()}/o/${tenantId}/projects/p/${project.id}`;
  }
  async getDatasetUrl({ datasetId, datasetName }) {
    if (datasetId === void 0 && datasetName === void 0) {
      throw new Error("Must provide either datasetName or datasetId");
    }
    const dataset = await this.readDataset({ datasetId, datasetName });
    const tenantId = await this._getTenantId();
    return `${this.getHostUrl()}/o/${tenantId}/datasets/${dataset.id}`;
  }
  async _getTenantId() {
    if (this._tenantId !== null) {
      return this._tenantId;
    }
    const queryParams = new URLSearchParams({ limit: "1" });
    for await (const projects of this._getPaginated("/sessions", queryParams)) {
      this._tenantId = projects[0].tenant_id;
      return projects[0].tenant_id;
    }
    throw new Error("No projects found to resolve tenant.");
  }
  async *listProjects({ projectIds, name, nameContains, referenceDatasetId, referenceDatasetName, referenceFree, metadata } = {}) {
    const params = new URLSearchParams();
    if (projectIds !== void 0) {
      for (const projectId of projectIds) {
        params.append("id", projectId);
      }
    }
    if (name !== void 0) {
      params.append("name", name);
    }
    if (nameContains !== void 0) {
      params.append("name_contains", nameContains);
    }
    if (referenceDatasetId !== void 0) {
      params.append("reference_dataset", referenceDatasetId);
    } else if (referenceDatasetName !== void 0) {
      const dataset = await this.readDataset({
        datasetName: referenceDatasetName
      });
      params.append("reference_dataset", dataset.id);
    }
    if (referenceFree !== void 0) {
      params.append("reference_free", referenceFree.toString());
    }
    if (metadata !== void 0) {
      params.append("metadata", JSON.stringify(metadata));
    }
    for await (const projects of this._getPaginated("/sessions", params)) {
      yield* projects;
    }
  }
  async deleteProject({ projectId, projectName }) {
    let projectId_;
    if (projectId === void 0 && projectName === void 0) {
      throw new Error("Must provide projectName or projectId");
    } else if (projectId !== void 0 && projectName !== void 0) {
      throw new Error("Must provide either projectName or projectId, not both");
    } else if (projectId === void 0) {
      projectId_ = (await this.readProject({ projectName })).id;
    } else {
      projectId_ = projectId;
    }
    assertUuid(projectId_);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/sessions/${projectId_}`, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, `delete session ${projectId_} (${projectName})`, true);
  }
  async uploadCsv({ csvFile, fileName, inputKeys, outputKeys, description, dataType, name }) {
    const url = `${this.apiUrl}/datasets/upload`;
    const formData = new FormData();
    formData.append("file", csvFile, fileName);
    inputKeys.forEach((key) => {
      formData.append("input_keys", key);
    });
    outputKeys.forEach((key) => {
      formData.append("output_keys", key);
    });
    if (description) {
      formData.append("description", description);
    }
    if (dataType) {
      formData.append("data_type", dataType);
    }
    if (name) {
      formData.append("name", name);
    }
    const response = await this.caller.call(_getFetchImplementation(this.debug), url, {
      method: "POST",
      headers: this.headers,
      body: formData,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "upload CSV");
    const result = await response.json();
    return result;
  }
  async createDataset(name, { description, dataType, inputsSchema, outputsSchema, metadata } = {}) {
    const body = {
      name,
      description,
      extra: metadata ? { metadata } : void 0
    };
    if (dataType) {
      body.data_type = dataType;
    }
    if (inputsSchema) {
      body.inputs_schema_definition = inputsSchema;
    }
    if (outputsSchema) {
      body.outputs_schema_definition = outputsSchema;
    }
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/datasets`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "create dataset");
    const result = await response.json();
    return result;
  }
  async readDataset({ datasetId, datasetName }) {
    let path = "/datasets";
    const params = new URLSearchParams({ limit: "1" });
    if (datasetId !== void 0 && datasetName !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetId !== void 0) {
      assertUuid(datasetId);
      path += `/${datasetId}`;
    } else if (datasetName !== void 0) {
      params.append("name", datasetName);
    } else {
      throw new Error("Must provide datasetName or datasetId");
    }
    const response = await this._get(path, params);
    let result;
    if (Array.isArray(response)) {
      if (response.length === 0) {
        throw new Error(`Dataset[id=${datasetId}, name=${datasetName}] not found`);
      }
      result = response[0];
    } else {
      result = response;
    }
    return result;
  }
  async hasDataset({ datasetId, datasetName }) {
    try {
      await this.readDataset({ datasetId, datasetName });
      return true;
    } catch (e) {
      if (
        // eslint-disable-next-line no-instanceof/no-instanceof
        e instanceof Error && e.message.toLocaleLowerCase().includes("not found")
      ) {
        return false;
      }
      throw e;
    }
  }
  async diffDatasetVersions({ datasetId, datasetName, fromVersion, toVersion }) {
    let datasetId_ = datasetId;
    if (datasetId_ === void 0 && datasetName === void 0) {
      throw new Error("Must provide either datasetName or datasetId");
    } else if (datasetId_ !== void 0 && datasetName !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetId_ === void 0) {
      const dataset = await this.readDataset({ datasetName });
      datasetId_ = dataset.id;
    }
    const urlParams = new URLSearchParams({
      from_version: typeof fromVersion === "string" ? fromVersion : fromVersion.toISOString(),
      to_version: typeof toVersion === "string" ? toVersion : toVersion.toISOString()
    });
    const response = await this._get(`/datasets/${datasetId_}/versions/diff`, urlParams);
    return response;
  }
  async readDatasetOpenaiFinetuning({ datasetId, datasetName }) {
    const path = "/datasets";
    if (datasetId !== void 0) {
    } else if (datasetName !== void 0) {
      datasetId = (await this.readDataset({ datasetName })).id;
    } else {
      throw new Error("Must provide either datasetName or datasetId");
    }
    const response = await this._getResponse(`${path}/${datasetId}/openai_ft`);
    const datasetText = await response.text();
    const dataset = datasetText.trim().split("\n").map((line) => JSON.parse(line));
    return dataset;
  }
  async *listDatasets({ limit = 100, offset = 0, datasetIds, datasetName, datasetNameContains, metadata } = {}) {
    const path = "/datasets";
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString()
    });
    if (datasetIds !== void 0) {
      for (const id_ of datasetIds) {
        params.append("id", id_);
      }
    }
    if (datasetName !== void 0) {
      params.append("name", datasetName);
    }
    if (datasetNameContains !== void 0) {
      params.append("name_contains", datasetNameContains);
    }
    if (metadata !== void 0) {
      params.append("metadata", JSON.stringify(metadata));
    }
    for await (const datasets of this._getPaginated(path, params)) {
      yield* datasets;
    }
  }
  /**
   * Update a dataset
   * @param props The dataset details to update
   * @returns The updated dataset
   */
  async updateDataset(props) {
    const { datasetId, datasetName, ...update } = props;
    if (!datasetId && !datasetName) {
      throw new Error("Must provide either datasetName or datasetId");
    }
    const _datasetId = datasetId ?? (await this.readDataset({ datasetName })).id;
    assertUuid(_datasetId);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/datasets/${_datasetId}`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(update),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "update dataset");
    return await response.json();
  }
  /**
   * Updates a tag on a dataset.
   *
   * If the tag is already assigned to a different version of this dataset,
   * the tag will be moved to the new version. The as_of parameter is used to
   * determine which version of the dataset to apply the new tags to.
   *
   * It must be an exact version of the dataset to succeed. You can
   * use the "readDatasetVersion" method to find the exact version
   * to apply the tags to.
   * @param params.datasetId The ID of the dataset to update. Must be provided if "datasetName" is not provided.
   * @param params.datasetName The name of the dataset to update. Must be provided if "datasetId" is not provided.
   * @param params.asOf The timestamp of the dataset to apply the new tags to.
   * @param params.tag The new tag to apply to the dataset.
   */
  async updateDatasetTag(props) {
    const { datasetId, datasetName, asOf, tag } = props;
    if (!datasetId && !datasetName) {
      throw new Error("Must provide either datasetName or datasetId");
    }
    const _datasetId = datasetId ?? (await this.readDataset({ datasetName })).id;
    assertUuid(_datasetId);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/datasets/${_datasetId}/tags`, {
      method: "PUT",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        as_of: typeof asOf === "string" ? asOf : asOf.toISOString(),
        tag
      }),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "update dataset tags");
  }
  async deleteDataset({ datasetId, datasetName }) {
    let path = "/datasets";
    let datasetId_ = datasetId;
    if (datasetId !== void 0 && datasetName !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetName !== void 0) {
      const dataset = await this.readDataset({ datasetName });
      datasetId_ = dataset.id;
    }
    if (datasetId_ !== void 0) {
      assertUuid(datasetId_);
      path += `/${datasetId_}`;
    } else {
      throw new Error("Must provide datasetName or datasetId");
    }
    const response = await this.caller.call(_getFetchImplementation(this.debug), this.apiUrl + path, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, `delete ${path}`);
    await response.json();
  }
  async indexDataset({ datasetId, datasetName, tag }) {
    let datasetId_ = datasetId;
    if (!datasetId_ && !datasetName) {
      throw new Error("Must provide either datasetName or datasetId");
    } else if (datasetId_ && datasetName) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (!datasetId_) {
      const dataset = await this.readDataset({ datasetName });
      datasetId_ = dataset.id;
    }
    assertUuid(datasetId_);
    const data = {
      tag
    };
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/datasets/${datasetId_}/index`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "index dataset");
    await response.json();
  }
  /**
   * Lets you run a similarity search query on a dataset.
   *
   * Requires the dataset to be indexed. Please see the `indexDataset` method to set up indexing.
   *
   * @param inputs      The input on which to run the similarity search. Must have the
   *                    same schema as the dataset.
   *
   * @param datasetId   The dataset to search for similar examples.
   *
   * @param limit       The maximum number of examples to return. Will return the top `limit` most
   *                    similar examples in order of most similar to least similar. If no similar
   *                    examples are found, random examples will be returned.
   *
   * @param filter      A filter string to apply to the search. Only examples will be returned that
   *                    match the filter string. Some examples of filters
   *
   *                    - eq(metadata.mykey, "value")
   *                    - and(neq(metadata.my.nested.key, "value"), neq(metadata.mykey, "value"))
   *                    - or(eq(metadata.mykey, "value"), eq(metadata.mykey, "othervalue"))
   *
   * @returns           A list of similar examples.
   *
   *
   * @example
   * dataset_id = "123e4567-e89b-12d3-a456-426614174000"
   * inputs = {"text": "How many people live in Berlin?"}
   * limit = 5
   * examples = await client.similarExamples(inputs, dataset_id, limit)
   */
  async similarExamples(inputs, datasetId, limit, { filter } = {}) {
    const data = {
      limit,
      inputs
    };
    if (filter !== void 0) {
      data["filter"] = filter;
    }
    assertUuid(datasetId);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/datasets/${datasetId}/search`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "fetch similar examples");
    const result = await response.json();
    return result["examples"];
  }
  async createExample(inputsOrUpdate, outputs, options) {
    if (isExampleCreate(inputsOrUpdate)) {
      if (outputs !== void 0 || options !== void 0) {
        throw new Error("Cannot provide outputs or options when using ExampleCreate object");
      }
    }
    let datasetId_ = outputs ? options?.datasetId : inputsOrUpdate.dataset_id;
    const datasetName_ = outputs ? options?.datasetName : inputsOrUpdate.dataset_name;
    if (datasetId_ === void 0 && datasetName_ === void 0) {
      throw new Error("Must provide either datasetName or datasetId");
    } else if (datasetId_ !== void 0 && datasetName_ !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetId_ === void 0) {
      const dataset = await this.readDataset({ datasetName: datasetName_ });
      datasetId_ = dataset.id;
    }
    const createdAt_ = (outputs ? options?.createdAt : inputsOrUpdate.created_at) || /* @__PURE__ */ new Date();
    let data;
    if (!isExampleCreate(inputsOrUpdate)) {
      data = {
        inputs: inputsOrUpdate,
        outputs,
        created_at: createdAt_?.toISOString(),
        id: options?.exampleId,
        metadata: options?.metadata,
        split: options?.split,
        source_run_id: options?.sourceRunId,
        use_source_run_io: options?.useSourceRunIO,
        use_source_run_attachments: options?.useSourceRunAttachments,
        attachments: options?.attachments
      };
    } else {
      data = inputsOrUpdate;
    }
    const response = await this._uploadExamplesMultipart(datasetId_, [data]);
    const example = await this.readExample(response.example_ids?.[0] ?? v4_default());
    return example;
  }
  async createExamples(propsOrUploads) {
    if (Array.isArray(propsOrUploads)) {
      if (propsOrUploads.length === 0) {
        return [];
      }
      const uploads = propsOrUploads;
      let datasetId_2 = uploads[0].dataset_id;
      const datasetName_2 = uploads[0].dataset_name;
      if (datasetId_2 === void 0 && datasetName_2 === void 0) {
        throw new Error("Must provide either datasetName or datasetId");
      } else if (datasetId_2 !== void 0 && datasetName_2 !== void 0) {
        throw new Error("Must provide either datasetName or datasetId, not both");
      } else if (datasetId_2 === void 0) {
        const dataset = await this.readDataset({ datasetName: datasetName_2 });
        datasetId_2 = dataset.id;
      }
      const response2 = await this._uploadExamplesMultipart(datasetId_2, uploads);
      const examples2 = await Promise.all(response2.example_ids.map((id) => this.readExample(id)));
      return examples2;
    }
    const { inputs, outputs, metadata, splits, sourceRunIds, useSourceRunIOs, useSourceRunAttachments, attachments, exampleIds, datasetId, datasetName } = propsOrUploads;
    if (inputs === void 0) {
      throw new Error("Must provide inputs when using legacy parameters");
    }
    let datasetId_ = datasetId;
    const datasetName_ = datasetName;
    if (datasetId_ === void 0 && datasetName_ === void 0) {
      throw new Error("Must provide either datasetName or datasetId");
    } else if (datasetId_ !== void 0 && datasetName_ !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetId_ === void 0) {
      const dataset = await this.readDataset({ datasetName: datasetName_ });
      datasetId_ = dataset.id;
    }
    const formattedExamples = inputs.map((input, idx) => {
      return {
        dataset_id: datasetId_,
        inputs: input,
        outputs: outputs?.[idx],
        metadata: metadata?.[idx],
        split: splits?.[idx],
        id: exampleIds?.[idx],
        attachments: attachments?.[idx],
        source_run_id: sourceRunIds?.[idx],
        use_source_run_io: useSourceRunIOs?.[idx],
        use_source_run_attachments: useSourceRunAttachments?.[idx]
      };
    });
    const response = await this._uploadExamplesMultipart(datasetId_, formattedExamples);
    const examples = await Promise.all(response.example_ids.map((id) => this.readExample(id)));
    return examples;
  }
  async createLLMExample(input, generation, options) {
    return this.createExample({ input }, { output: generation }, options);
  }
  async createChatExample(input, generations, options) {
    const finalInput = input.map((message) => {
      if (isLangChainMessage(message)) {
        return convertLangChainMessageToExample(message);
      }
      return message;
    });
    const finalOutput = isLangChainMessage(generations) ? convertLangChainMessageToExample(generations) : generations;
    return this.createExample({ input: finalInput }, { output: finalOutput }, options);
  }
  async readExample(exampleId) {
    assertUuid(exampleId);
    const path = `/examples/${exampleId}`;
    const rawExample = await this._get(path);
    const { attachment_urls, ...rest } = rawExample;
    const example = rest;
    if (attachment_urls) {
      example.attachments = Object.entries(attachment_urls).reduce((acc, [key, value]) => {
        acc[key.slice("attachment.".length)] = {
          presigned_url: value.presigned_url,
          mime_type: value.mime_type
        };
        return acc;
      }, {});
    }
    return example;
  }
  async *listExamples({ datasetId, datasetName, exampleIds, asOf, splits, inlineS3Urls, metadata, limit, offset, filter, includeAttachments } = {}) {
    let datasetId_;
    if (datasetId !== void 0 && datasetName !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetId !== void 0) {
      datasetId_ = datasetId;
    } else if (datasetName !== void 0) {
      const dataset = await this.readDataset({ datasetName });
      datasetId_ = dataset.id;
    } else {
      throw new Error("Must provide a datasetName or datasetId");
    }
    const params = new URLSearchParams({ dataset: datasetId_ });
    const dataset_version = asOf ? typeof asOf === "string" ? asOf : asOf?.toISOString() : void 0;
    if (dataset_version) {
      params.append("as_of", dataset_version);
    }
    const inlineS3Urls_ = inlineS3Urls ?? true;
    params.append("inline_s3_urls", inlineS3Urls_.toString());
    if (exampleIds !== void 0) {
      for (const id_ of exampleIds) {
        params.append("id", id_);
      }
    }
    if (splits !== void 0) {
      for (const split of splits) {
        params.append("splits", split);
      }
    }
    if (metadata !== void 0) {
      const serializedMetadata = JSON.stringify(metadata);
      params.append("metadata", serializedMetadata);
    }
    if (limit !== void 0) {
      params.append("limit", limit.toString());
    }
    if (offset !== void 0) {
      params.append("offset", offset.toString());
    }
    if (filter !== void 0) {
      params.append("filter", filter);
    }
    if (includeAttachments === true) {
      ["attachment_urls", "outputs", "metadata"].forEach((field) => params.append("select", field));
    }
    let i = 0;
    for await (const rawExamples of this._getPaginated("/examples", params)) {
      for (const rawExample of rawExamples) {
        const { attachment_urls, ...rest } = rawExample;
        const example = rest;
        if (attachment_urls) {
          example.attachments = Object.entries(attachment_urls).reduce((acc, [key, value]) => {
            acc[key.slice("attachment.".length)] = {
              presigned_url: value.presigned_url,
              mime_type: value.mime_type || void 0
            };
            return acc;
          }, {});
        }
        yield example;
        i++;
      }
      if (limit !== void 0 && i >= limit) {
        break;
      }
    }
  }
  async deleteExample(exampleId) {
    assertUuid(exampleId);
    const path = `/examples/${exampleId}`;
    const response = await this.caller.call(_getFetchImplementation(this.debug), this.apiUrl + path, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, `delete ${path}`);
    await response.json();
  }
  async updateExample(exampleIdOrUpdate, update) {
    let exampleId;
    if (update) {
      exampleId = exampleIdOrUpdate;
    } else {
      exampleId = exampleIdOrUpdate.id;
    }
    assertUuid(exampleId);
    let updateToUse;
    if (update) {
      updateToUse = { id: exampleId, ...update };
    } else {
      updateToUse = exampleIdOrUpdate;
    }
    let datasetId;
    if (updateToUse.dataset_id !== void 0) {
      datasetId = updateToUse.dataset_id;
    } else {
      const example = await this.readExample(exampleId);
      datasetId = example.dataset_id;
    }
    return this._updateExamplesMultipart(datasetId, [updateToUse]);
  }
  async updateExamples(update) {
    let datasetId;
    if (update[0].dataset_id === void 0) {
      const example = await this.readExample(update[0].id);
      datasetId = example.dataset_id;
    } else {
      datasetId = update[0].dataset_id;
    }
    return this._updateExamplesMultipart(datasetId, update);
  }
  /**
   * Get dataset version by closest date or exact tag.
   *
   * Use this to resolve the nearest version to a given timestamp or for a given tag.
   *
   * @param options The options for getting the dataset version
   * @param options.datasetId The ID of the dataset
   * @param options.datasetName The name of the dataset
   * @param options.asOf The timestamp of the dataset to retrieve
   * @param options.tag The tag of the dataset to retrieve
   * @returns The dataset version
   */
  async readDatasetVersion({ datasetId, datasetName, asOf, tag }) {
    let resolvedDatasetId;
    if (!datasetId) {
      const dataset = await this.readDataset({ datasetName });
      resolvedDatasetId = dataset.id;
    } else {
      resolvedDatasetId = datasetId;
    }
    assertUuid(resolvedDatasetId);
    if (asOf && tag || !asOf && !tag) {
      throw new Error("Exactly one of asOf and tag must be specified.");
    }
    const params = new URLSearchParams();
    if (asOf !== void 0) {
      params.append("as_of", typeof asOf === "string" ? asOf : asOf.toISOString());
    }
    if (tag !== void 0) {
      params.append("tag", tag);
    }
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/datasets/${resolvedDatasetId}/version?${params.toString()}`, {
      method: "GET",
      headers: { ...this.headers },
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "read dataset version");
    return await response.json();
  }
  async listDatasetSplits({ datasetId, datasetName, asOf }) {
    let datasetId_;
    if (datasetId === void 0 && datasetName === void 0) {
      throw new Error("Must provide dataset name or ID");
    } else if (datasetId !== void 0 && datasetName !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetId === void 0) {
      const dataset = await this.readDataset({ datasetName });
      datasetId_ = dataset.id;
    } else {
      datasetId_ = datasetId;
    }
    assertUuid(datasetId_);
    const params = new URLSearchParams();
    const dataset_version = asOf ? typeof asOf === "string" ? asOf : asOf?.toISOString() : void 0;
    if (dataset_version) {
      params.append("as_of", dataset_version);
    }
    const response = await this._get(`/datasets/${datasetId_}/splits`, params);
    return response;
  }
  async updateDatasetSplits({ datasetId, datasetName, splitName, exampleIds, remove = false }) {
    let datasetId_;
    if (datasetId === void 0 && datasetName === void 0) {
      throw new Error("Must provide dataset name or ID");
    } else if (datasetId !== void 0 && datasetName !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetId === void 0) {
      const dataset = await this.readDataset({ datasetName });
      datasetId_ = dataset.id;
    } else {
      datasetId_ = datasetId;
    }
    assertUuid(datasetId_);
    const data = {
      split_name: splitName,
      examples: exampleIds.map((id) => {
        assertUuid(id);
        return id;
      }),
      remove
    };
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/datasets/${datasetId_}/splits`, {
      method: "PUT",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "update dataset splits", true);
  }
  /**
   * @deprecated This method is deprecated and will be removed in future LangSmith versions, use `evaluate` from `langsmith/evaluation` instead.
   */
  async evaluateRun(run, evaluator, { sourceInfo, loadChildRuns, referenceExample } = { loadChildRuns: false }) {
    warnOnce("This method is deprecated and will be removed in future LangSmith versions, use `evaluate` from `langsmith/evaluation` instead.");
    let run_;
    if (typeof run === "string") {
      run_ = await this.readRun(run, { loadChildRuns });
    } else if (typeof run === "object" && "id" in run) {
      run_ = run;
    } else {
      throw new Error(`Invalid run type: ${typeof run}`);
    }
    if (run_.reference_example_id !== null && run_.reference_example_id !== void 0) {
      referenceExample = await this.readExample(run_.reference_example_id);
    }
    const feedbackResult = await evaluator.evaluateRun(run_, referenceExample);
    const [_, feedbacks] = await this._logEvaluationFeedback(feedbackResult, run_, sourceInfo);
    return feedbacks[0];
  }
  async createFeedback(runId, key, { score, value, correction, comment, sourceInfo, feedbackSourceType = "api", sourceRunId, feedbackId, feedbackConfig, projectId, comparativeExperimentId }) {
    if (!runId && !projectId) {
      throw new Error("One of runId or projectId must be provided");
    }
    if (runId && projectId) {
      throw new Error("Only one of runId or projectId can be provided");
    }
    const feedback_source = {
      type: feedbackSourceType ?? "api",
      metadata: sourceInfo ?? {}
    };
    if (sourceRunId !== void 0 && feedback_source?.metadata !== void 0 && !feedback_source.metadata["__run"]) {
      feedback_source.metadata["__run"] = { run_id: sourceRunId };
    }
    if (feedback_source?.metadata !== void 0 && feedback_source.metadata["__run"]?.run_id !== void 0) {
      assertUuid(feedback_source.metadata["__run"].run_id);
    }
    const feedback = {
      id: feedbackId ?? v4_default(),
      run_id: runId,
      key,
      score: _formatFeedbackScore(score),
      value,
      correction,
      comment,
      feedback_source,
      comparative_experiment_id: comparativeExperimentId,
      feedbackConfig,
      session_id: projectId
    };
    const url = `${this.apiUrl}/feedback`;
    const response = await this.caller.call(_getFetchImplementation(this.debug), url, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "create feedback", true);
    return feedback;
  }
  async updateFeedback(feedbackId, { score, value, correction, comment }) {
    const feedbackUpdate = {};
    if (score !== void 0 && score !== null) {
      feedbackUpdate["score"] = _formatFeedbackScore(score);
    }
    if (value !== void 0 && value !== null) {
      feedbackUpdate["value"] = value;
    }
    if (correction !== void 0 && correction !== null) {
      feedbackUpdate["correction"] = correction;
    }
    if (comment !== void 0 && comment !== null) {
      feedbackUpdate["comment"] = comment;
    }
    assertUuid(feedbackId);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/feedback/${feedbackId}`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(feedbackUpdate),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "update feedback", true);
  }
  async readFeedback(feedbackId) {
    assertUuid(feedbackId);
    const path = `/feedback/${feedbackId}`;
    const response = await this._get(path);
    return response;
  }
  async deleteFeedback(feedbackId) {
    assertUuid(feedbackId);
    const path = `/feedback/${feedbackId}`;
    const response = await this.caller.call(_getFetchImplementation(this.debug), this.apiUrl + path, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, `delete ${path}`);
    await response.json();
  }
  async *listFeedback({ runIds, feedbackKeys, feedbackSourceTypes } = {}) {
    const queryParams = new URLSearchParams();
    if (runIds) {
      queryParams.append("run", runIds.join(","));
    }
    if (feedbackKeys) {
      for (const key of feedbackKeys) {
        queryParams.append("key", key);
      }
    }
    if (feedbackSourceTypes) {
      for (const type of feedbackSourceTypes) {
        queryParams.append("source", type);
      }
    }
    for await (const feedbacks of this._getPaginated("/feedback", queryParams)) {
      yield* feedbacks;
    }
  }
  /**
   * Creates a presigned feedback token and URL.
   *
   * The token can be used to authorize feedback metrics without
   * needing an API key. This is useful for giving browser-based
   * applications the ability to submit feedback without needing
   * to expose an API key.
   *
   * @param runId The ID of the run.
   * @param feedbackKey The feedback key.
   * @param options Additional options for the token.
   * @param options.expiration The expiration time for the token.
   *
   * @returns A promise that resolves to a FeedbackIngestToken.
   */
  async createPresignedFeedbackToken(runId, feedbackKey, { expiration, feedbackConfig } = {}) {
    const body = {
      run_id: runId,
      feedback_key: feedbackKey,
      feedback_config: feedbackConfig
    };
    if (expiration) {
      if (typeof expiration === "string") {
        body["expires_at"] = expiration;
      } else if (expiration?.hours || expiration?.minutes || expiration?.days) {
        body["expires_in"] = expiration;
      }
    } else {
      body["expires_in"] = {
        hours: 3
      };
    }
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/feedback/tokens`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const result = await response.json();
    return result;
  }
  async createComparativeExperiment({ name, experimentIds, referenceDatasetId, createdAt, description, metadata, id }) {
    if (experimentIds.length === 0) {
      throw new Error("At least one experiment is required");
    }
    if (!referenceDatasetId) {
      referenceDatasetId = (await this.readProject({
        projectId: experimentIds[0]
      })).reference_dataset_id;
    }
    if (!referenceDatasetId == null) {
      throw new Error("A reference dataset is required");
    }
    const body = {
      id,
      name,
      experiment_ids: experimentIds,
      reference_dataset_id: referenceDatasetId,
      description,
      created_at: (createdAt ?? /* @__PURE__ */ new Date())?.toISOString(),
      extra: {}
    };
    if (metadata)
      body.extra["metadata"] = metadata;
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/datasets/comparative`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await response.json();
  }
  /**
   * Retrieves a list of presigned feedback tokens for a given run ID.
   * @param runId The ID of the run.
   * @returns An async iterable of FeedbackIngestToken objects.
   */
  async *listPresignedFeedbackTokens(runId) {
    assertUuid(runId);
    const params = new URLSearchParams({ run_id: runId });
    for await (const tokens of this._getPaginated("/feedback/tokens", params)) {
      yield* tokens;
    }
  }
  _selectEvalResults(results) {
    let results_;
    if ("results" in results) {
      results_ = results.results;
    } else if (Array.isArray(results)) {
      results_ = results;
    } else {
      results_ = [results];
    }
    return results_;
  }
  async _logEvaluationFeedback(evaluatorResponse, run, sourceInfo) {
    const evalResults = this._selectEvalResults(evaluatorResponse);
    const feedbacks = [];
    for (const res of evalResults) {
      let sourceInfo_ = sourceInfo || {};
      if (res.evaluatorInfo) {
        sourceInfo_ = { ...res.evaluatorInfo, ...sourceInfo_ };
      }
      let runId_ = null;
      if (res.targetRunId) {
        runId_ = res.targetRunId;
      } else if (run) {
        runId_ = run.id;
      }
      feedbacks.push(await this.createFeedback(runId_, res.key, {
        score: res.score,
        value: res.value,
        comment: res.comment,
        correction: res.correction,
        sourceInfo: sourceInfo_,
        sourceRunId: res.sourceRunId,
        feedbackConfig: res.feedbackConfig,
        feedbackSourceType: "model"
      }));
    }
    return [evalResults, feedbacks];
  }
  async logEvaluationFeedback(evaluatorResponse, run, sourceInfo) {
    const [results] = await this._logEvaluationFeedback(evaluatorResponse, run, sourceInfo);
    return results;
  }
  /**
   * API for managing annotation queues
   */
  /**
   * List the annotation queues on the LangSmith API.
   * @param options - The options for listing annotation queues
   * @param options.queueIds - The IDs of the queues to filter by
   * @param options.name - The name of the queue to filter by
   * @param options.nameContains - The substring that the queue name should contain
   * @param options.limit - The maximum number of queues to return
   * @returns An iterator of AnnotationQueue objects
   */
  async *listAnnotationQueues(options = {}) {
    const { queueIds, name, nameContains, limit } = options;
    const params = new URLSearchParams();
    if (queueIds) {
      queueIds.forEach((id, i) => {
        assertUuid(id, `queueIds[${i}]`);
        params.append("ids", id);
      });
    }
    if (name)
      params.append("name", name);
    if (nameContains)
      params.append("name_contains", nameContains);
    params.append("limit", (limit !== void 0 ? Math.min(limit, 100) : 100).toString());
    let count = 0;
    for await (const queues of this._getPaginated("/annotation-queues", params)) {
      yield* queues;
      count++;
      if (limit !== void 0 && count >= limit)
        break;
    }
  }
  /**
   * Create an annotation queue on the LangSmith API.
   * @param options - The options for creating an annotation queue
   * @param options.name - The name of the annotation queue
   * @param options.description - The description of the annotation queue
   * @param options.queueId - The ID of the annotation queue
   * @returns The created AnnotationQueue object
   */
  async createAnnotationQueue(options) {
    const { name, description, queueId, rubricInstructions } = options;
    const body = {
      name,
      description,
      id: queueId || v4_default(),
      rubric_instructions: rubricInstructions
    };
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/annotation-queues`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(Object.entries(body).filter(([_, v]) => v !== void 0))),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "create annotation queue");
    const data = await response.json();
    return data;
  }
  /**
   * Read an annotation queue with the specified queue ID.
   * @param queueId - The ID of the annotation queue to read
   * @returns The AnnotationQueueWithDetails object
   */
  async readAnnotationQueue(queueId) {
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/annotation-queues/${assertUuid(queueId, "queueId")}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "read annotation queue");
    const data = await response.json();
    return data;
  }
  /**
   * Update an annotation queue with the specified queue ID.
   * @param queueId - The ID of the annotation queue to update
   * @param options - The options for updating the annotation queue
   * @param options.name - The new name for the annotation queue
   * @param options.description - The new description for the annotation queue
   */
  async updateAnnotationQueue(queueId, options) {
    const { name, description, rubricInstructions } = options;
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/annotation-queues/${assertUuid(queueId, "queueId")}`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        rubric_instructions: rubricInstructions
      }),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "update annotation queue");
  }
  /**
   * Delete an annotation queue with the specified queue ID.
   * @param queueId - The ID of the annotation queue to delete
   */
  async deleteAnnotationQueue(queueId) {
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/annotation-queues/${assertUuid(queueId, "queueId")}`, {
      method: "DELETE",
      headers: { ...this.headers, Accept: "application/json" },
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "delete annotation queue");
  }
  /**
   * Add runs to an annotation queue with the specified queue ID.
   * @param queueId - The ID of the annotation queue
   * @param runIds - The IDs of the runs to be added to the annotation queue
   */
  async addRunsToAnnotationQueue(queueId, runIds) {
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/annotation-queues/${assertUuid(queueId, "queueId")}/runs`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(runIds.map((id, i) => assertUuid(id, `runIds[${i}]`).toString())),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "add runs to annotation queue");
  }
  /**
   * Get a run from an annotation queue at the specified index.
   * @param queueId - The ID of the annotation queue
   * @param index - The index of the run to retrieve
   * @returns A Promise that resolves to a RunWithAnnotationQueueInfo object
   * @throws {Error} If the run is not found at the given index or for other API-related errors
   */
  async getRunFromAnnotationQueue(queueId, index2) {
    const baseUrl = `/annotation-queues/${assertUuid(queueId, "queueId")}/run`;
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}${baseUrl}/${index2}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "get run from annotation queue");
    return await response.json();
  }
  /**
   * Delete a run from an an annotation queue.
   * @param queueId - The ID of the annotation queue to delete the run from
   * @param queueRunId - The ID of the run to delete from the annotation queue
   */
  async deleteRunFromAnnotationQueue(queueId, queueRunId) {
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/annotation-queues/${assertUuid(queueId, "queueId")}/runs/${assertUuid(queueRunId, "queueRunId")}`, {
      method: "DELETE",
      headers: { ...this.headers, Accept: "application/json" },
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "delete run from annotation queue");
  }
  /**
   * Get the size of an annotation queue.
   * @param queueId - The ID of the annotation queue
   */
  async getSizeFromAnnotationQueue(queueId) {
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/annotation-queues/${assertUuid(queueId, "queueId")}/size`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "get size from annotation queue");
    return await response.json();
  }
  async _currentTenantIsOwner(owner) {
    const settings = await this._getSettings();
    return owner == "-" || settings.tenant_handle === owner;
  }
  async _ownerConflictError(action, owner) {
    const settings = await this._getSettings();
    return new Error(`Cannot ${action} for another tenant.

      Current tenant: ${settings.tenant_handle}

      Requested tenant: ${owner}`);
  }
  async _getLatestCommitHash(promptOwnerAndName) {
    const res = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/commits/${promptOwnerAndName}/?limit=${1}&offset=${0}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const json = await res.json();
    if (!res.ok) {
      const detail = typeof json.detail === "string" ? json.detail : JSON.stringify(json.detail);
      const error = new Error(`Error ${res.status}: ${res.statusText}
${detail}`);
      error.statusCode = res.status;
      throw error;
    }
    if (json.commits.length === 0) {
      return void 0;
    }
    return json.commits[0].commit_hash;
  }
  async _likeOrUnlikePrompt(promptIdentifier, like) {
    const [owner, promptName, _] = parsePromptIdentifier(promptIdentifier);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/likes/${owner}/${promptName}`, {
      method: "POST",
      body: JSON.stringify({ like }),
      headers: { ...this.headers, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, `${like ? "like" : "unlike"} prompt`);
    return await response.json();
  }
  async _getPromptUrl(promptIdentifier) {
    const [owner, promptName, commitHash] = parsePromptIdentifier(promptIdentifier);
    if (!await this._currentTenantIsOwner(owner)) {
      if (commitHash !== "latest") {
        return `${this.getHostUrl()}/hub/${owner}/${promptName}/${commitHash.substring(0, 8)}`;
      } else {
        return `${this.getHostUrl()}/hub/${owner}/${promptName}`;
      }
    } else {
      const settings = await this._getSettings();
      if (commitHash !== "latest") {
        return `${this.getHostUrl()}/prompts/${promptName}/${commitHash.substring(0, 8)}?organizationId=${settings.id}`;
      } else {
        return `${this.getHostUrl()}/prompts/${promptName}?organizationId=${settings.id}`;
      }
    }
  }
  async promptExists(promptIdentifier) {
    const prompt = await this.getPrompt(promptIdentifier);
    return !!prompt;
  }
  async likePrompt(promptIdentifier) {
    return this._likeOrUnlikePrompt(promptIdentifier, true);
  }
  async unlikePrompt(promptIdentifier) {
    return this._likeOrUnlikePrompt(promptIdentifier, false);
  }
  async *listCommits(promptOwnerAndName) {
    for await (const commits of this._getPaginated(`/commits/${promptOwnerAndName}/`, new URLSearchParams(), (res) => res.commits)) {
      yield* commits;
    }
  }
  async *listPrompts(options) {
    const params = new URLSearchParams();
    params.append("sort_field", options?.sortField ?? "updated_at");
    params.append("sort_direction", "desc");
    params.append("is_archived", (!!options?.isArchived).toString());
    if (options?.isPublic !== void 0) {
      params.append("is_public", options.isPublic.toString());
    }
    if (options?.query) {
      params.append("query", options.query);
    }
    for await (const prompts of this._getPaginated("/repos", params, (res) => res.repos)) {
      yield* prompts;
    }
  }
  async getPrompt(promptIdentifier) {
    const [owner, promptName, _] = parsePromptIdentifier(promptIdentifier);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/repos/${owner}/${promptName}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (response.status === 404) {
      return null;
    }
    await raiseForStatus(response, "get prompt");
    const result = await response.json();
    if (result.repo) {
      return result.repo;
    } else {
      return null;
    }
  }
  async createPrompt(promptIdentifier, options) {
    const settings = await this._getSettings();
    if (options?.isPublic && !settings.tenant_handle) {
      throw new Error(`Cannot create a public prompt without first

        creating a LangChain Hub handle. 
        You can add a handle by creating a public prompt at:

        https://smith.langchain.com/prompts`);
    }
    const [owner, promptName, _] = parsePromptIdentifier(promptIdentifier);
    if (!await this._currentTenantIsOwner(owner)) {
      throw await this._ownerConflictError("create a prompt", owner);
    }
    const data = {
      repo_handle: promptName,
      ...options?.description && { description: options.description },
      ...options?.readme && { readme: options.readme },
      ...options?.tags && { tags: options.tags },
      is_public: !!options?.isPublic
    };
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/repos/`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "create prompt");
    const { repo } = await response.json();
    return repo;
  }
  async createCommit(promptIdentifier, object, options) {
    if (!await this.promptExists(promptIdentifier)) {
      throw new Error("Prompt does not exist, you must create it first.");
    }
    const [owner, promptName, _] = parsePromptIdentifier(promptIdentifier);
    const resolvedParentCommitHash = options?.parentCommitHash === "latest" || !options?.parentCommitHash ? await this._getLatestCommitHash(`${owner}/${promptName}`) : options?.parentCommitHash;
    const payload = {
      manifest: JSON.parse(JSON.stringify(object)),
      parent_commit: resolvedParentCommitHash
    };
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/commits/${owner}/${promptName}`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "create commit");
    const result = await response.json();
    return this._getPromptUrl(`${owner}/${promptName}${result.commit_hash ? `:${result.commit_hash}` : ""}`);
  }
  /**
   * Update examples with attachments using multipart form data.
   * @param updates List of ExampleUpdateWithAttachments objects to upsert
   * @returns Promise with the update response
   */
  async updateExamplesMultipart(datasetId, updates = []) {
    return this._updateExamplesMultipart(datasetId, updates);
  }
  async _updateExamplesMultipart(datasetId, updates = []) {
    if (!await this._getMultiPartSupport()) {
      throw new Error("Your LangSmith deployment does not allow using the multipart examples endpoint, please upgrade your deployment to the latest version.");
    }
    const formData = new FormData();
    for (const example of updates) {
      const exampleId = example.id;
      const exampleBody = {
        ...example.metadata && { metadata: example.metadata },
        ...example.split && { split: example.split }
      };
      const stringifiedExample = serialize(exampleBody, `Serializing body for example with id: ${exampleId}`);
      const exampleBlob = new Blob([stringifiedExample], {
        type: "application/json"
      });
      formData.append(exampleId, exampleBlob);
      if (example.inputs) {
        const stringifiedInputs = serialize(example.inputs, `Serializing inputs for example with id: ${exampleId}`);
        const inputsBlob = new Blob([stringifiedInputs], {
          type: "application/json"
        });
        formData.append(`${exampleId}.inputs`, inputsBlob);
      }
      if (example.outputs) {
        const stringifiedOutputs = serialize(example.outputs, `Serializing outputs whle updating example with id: ${exampleId}`);
        const outputsBlob = new Blob([stringifiedOutputs], {
          type: "application/json"
        });
        formData.append(`${exampleId}.outputs`, outputsBlob);
      }
      if (example.attachments) {
        for (const [name, attachment] of Object.entries(example.attachments)) {
          let mimeType;
          let data;
          if (Array.isArray(attachment)) {
            [mimeType, data] = attachment;
          } else {
            mimeType = attachment.mimeType;
            data = attachment.data;
          }
          const attachmentBlob = new Blob([data], {
            type: `${mimeType}; length=${data.byteLength}`
          });
          formData.append(`${exampleId}.attachment.${name}`, attachmentBlob);
        }
      }
      if (example.attachments_operations) {
        const stringifiedAttachmentsOperations = serialize(example.attachments_operations, `Serializing attachments while updating example with id: ${exampleId}`);
        const attachmentsOperationsBlob = new Blob([stringifiedAttachmentsOperations], {
          type: "application/json"
        });
        formData.append(`${exampleId}.attachments_operations`, attachmentsOperationsBlob);
      }
    }
    const datasetIdToUse = datasetId ?? updates[0]?.dataset_id;
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/v1/platform/datasets/${datasetIdToUse}/examples`, {
      method: "PATCH",
      headers: this.headers,
      body: formData
    });
    const result = await response.json();
    return result;
  }
  /**
   * Upload examples with attachments using multipart form data.
   * @param uploads List of ExampleUploadWithAttachments objects to upload
   * @returns Promise with the upload response
   * @deprecated This method is deprecated and will be removed in future LangSmith versions, please use `createExamples` instead
   */
  async uploadExamplesMultipart(datasetId, uploads = []) {
    return this._uploadExamplesMultipart(datasetId, uploads);
  }
  async _uploadExamplesMultipart(datasetId, uploads = []) {
    if (!await this._getMultiPartSupport()) {
      throw new Error("Your LangSmith deployment does not allow using the multipart examples endpoint, please upgrade your deployment to the latest version.");
    }
    const formData = new FormData();
    for (const example of uploads) {
      const exampleId = (example.id ?? v4_default()).toString();
      const exampleBody = {
        created_at: example.created_at,
        ...example.metadata && { metadata: example.metadata },
        ...example.split && { split: example.split },
        ...example.source_run_id && { source_run_id: example.source_run_id },
        ...example.use_source_run_io && {
          use_source_run_io: example.use_source_run_io
        },
        ...example.use_source_run_attachments && {
          use_source_run_attachments: example.use_source_run_attachments
        }
      };
      const stringifiedExample = serialize(exampleBody, `Serializing body for uploaded example with id: ${exampleId}`);
      const exampleBlob = new Blob([stringifiedExample], {
        type: "application/json"
      });
      formData.append(exampleId, exampleBlob);
      if (example.inputs) {
        const stringifiedInputs = serialize(example.inputs, `Serializing inputs for uploaded example with id: ${exampleId}`);
        const inputsBlob = new Blob([stringifiedInputs], {
          type: "application/json"
        });
        formData.append(`${exampleId}.inputs`, inputsBlob);
      }
      if (example.outputs) {
        const stringifiedOutputs = serialize(example.outputs, `Serializing outputs for uploaded example with id: ${exampleId}`);
        const outputsBlob = new Blob([stringifiedOutputs], {
          type: "application/json"
        });
        formData.append(`${exampleId}.outputs`, outputsBlob);
      }
      if (example.attachments) {
        for (const [name, attachment] of Object.entries(example.attachments)) {
          let mimeType;
          let data;
          if (Array.isArray(attachment)) {
            [mimeType, data] = attachment;
          } else {
            mimeType = attachment.mimeType;
            data = attachment.data;
          }
          const attachmentBlob = new Blob([data], {
            type: `${mimeType}; length=${data.byteLength}`
          });
          formData.append(`${exampleId}.attachment.${name}`, attachmentBlob);
        }
      }
    }
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/v1/platform/datasets/${datasetId}/examples`, {
      method: "POST",
      headers: this.headers,
      body: formData
    });
    await raiseForStatus(response, "upload examples");
    const result = await response.json();
    return result;
  }
  async updatePrompt(promptIdentifier, options) {
    if (!await this.promptExists(promptIdentifier)) {
      throw new Error("Prompt does not exist, you must create it first.");
    }
    const [owner, promptName] = parsePromptIdentifier(promptIdentifier);
    if (!await this._currentTenantIsOwner(owner)) {
      throw await this._ownerConflictError("update a prompt", owner);
    }
    const payload = {};
    if (options?.description !== void 0)
      payload.description = options.description;
    if (options?.readme !== void 0)
      payload.readme = options.readme;
    if (options?.tags !== void 0)
      payload.tags = options.tags;
    if (options?.isPublic !== void 0)
      payload.is_public = options.isPublic;
    if (options?.isArchived !== void 0)
      payload.is_archived = options.isArchived;
    if (Object.keys(payload).length === 0) {
      throw new Error("No valid update options provided");
    }
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/repos/${owner}/${promptName}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        ...this.headers,
        "Content-Type": "application/json"
      },
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "update prompt");
    return response.json();
  }
  async deletePrompt(promptIdentifier) {
    if (!await this.promptExists(promptIdentifier)) {
      throw new Error("Prompt does not exist, you must create it first.");
    }
    const [owner, promptName, _] = parsePromptIdentifier(promptIdentifier);
    if (!await this._currentTenantIsOwner(owner)) {
      throw await this._ownerConflictError("delete a prompt", owner);
    }
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/repos/${owner}/${promptName}`, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await response.json();
  }
  async pullPromptCommit(promptIdentifier, options) {
    const [owner, promptName, commitHash] = parsePromptIdentifier(promptIdentifier);
    const response = await this.caller.call(_getFetchImplementation(this.debug), `${this.apiUrl}/commits/${owner}/${promptName}/${commitHash}${options?.includeModel ? "?include_model=true" : ""}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "pull prompt commit");
    const result = await response.json();
    return {
      owner,
      repo: promptName,
      commit_hash: result.commit_hash,
      manifest: result.manifest,
      examples: result.examples
    };
  }
  /**
   * This method should not be used directly, use `import { pull } from "langchain/hub"` instead.
   * Using this method directly returns the JSON string of the prompt rather than a LangChain object.
   * @private
   */
  async _pullPrompt(promptIdentifier, options) {
    const promptObject = await this.pullPromptCommit(promptIdentifier, {
      includeModel: options?.includeModel
    });
    const prompt = JSON.stringify(promptObject.manifest);
    return prompt;
  }
  async pushPrompt(promptIdentifier, options) {
    if (await this.promptExists(promptIdentifier)) {
      if (options && Object.keys(options).some((key) => key !== "object")) {
        await this.updatePrompt(promptIdentifier, {
          description: options?.description,
          readme: options?.readme,
          tags: options?.tags,
          isPublic: options?.isPublic
        });
      }
    } else {
      await this.createPrompt(promptIdentifier, {
        description: options?.description,
        readme: options?.readme,
        tags: options?.tags,
        isPublic: options?.isPublic
      });
    }
    if (!options?.object) {
      return await this._getPromptUrl(promptIdentifier);
    }
    const url = await this.createCommit(promptIdentifier, options?.object, {
      parentCommitHash: options?.parentCommitHash
    });
    return url;
  }
  /**
     * Clone a public dataset to your own langsmith tenant.
     * This operation is idempotent. If you already have a dataset with the given name,
     * this function will do nothing.
  
     * @param {string} tokenOrUrl The token of the public dataset to clone.
     * @param {Object} [options] Additional options for cloning the dataset.
     * @param {string} [options.sourceApiUrl] The URL of the langsmith server where the data is hosted. Defaults to the API URL of your current client.
     * @param {string} [options.datasetName] The name of the dataset to create in your tenant. Defaults to the name of the public dataset.
     * @returns {Promise<void>}
     */
  async clonePublicDataset(tokenOrUrl, options = {}) {
    const { sourceApiUrl = this.apiUrl, datasetName } = options;
    const [parsedApiUrl, tokenUuid] = this.parseTokenOrUrl(tokenOrUrl, sourceApiUrl);
    const sourceClient = new _Client({
      apiUrl: parsedApiUrl,
      // Placeholder API key not needed anymore in most cases, but
      // some private deployments may have API key-based rate limiting
      // that would cause this to fail if we provide no value.
      apiKey: "placeholder"
    });
    const ds = await sourceClient.readSharedDataset(tokenUuid);
    const finalDatasetName = datasetName || ds.name;
    try {
      if (await this.hasDataset({ datasetId: finalDatasetName })) {
        console.log(`Dataset ${finalDatasetName} already exists in your tenant. Skipping.`);
        return;
      }
    } catch (_) {
    }
    const examples = await sourceClient.listSharedExamples(tokenUuid);
    const dataset = await this.createDataset(finalDatasetName, {
      description: ds.description,
      dataType: ds.data_type || "kv",
      inputsSchema: ds.inputs_schema_definition ?? void 0,
      outputsSchema: ds.outputs_schema_definition ?? void 0
    });
    try {
      await this.createExamples({
        inputs: examples.map((e) => e.inputs),
        outputs: examples.flatMap((e) => e.outputs ? [e.outputs] : []),
        datasetId: dataset.id
      });
    } catch (e) {
      console.error(`An error occurred while creating dataset ${finalDatasetName}. You should delete it manually.`);
      throw e;
    }
  }
  parseTokenOrUrl(urlOrToken, apiUrl, numParts = 2, kind = "dataset") {
    try {
      assertUuid(urlOrToken);
      return [apiUrl, urlOrToken];
    } catch (_) {
    }
    try {
      const parsedUrl = new URL(urlOrToken);
      const pathParts = parsedUrl.pathname.split("/").filter((part) => part !== "");
      if (pathParts.length >= numParts) {
        const tokenUuid = pathParts[pathParts.length - numParts];
        return [apiUrl, tokenUuid];
      } else {
        throw new Error(`Invalid public ${kind} URL: ${urlOrToken}`);
      }
    } catch (error) {
      throw new Error(`Invalid public ${kind} URL or token: ${urlOrToken}`);
    }
  }
  /**
   * Awaits all pending trace batches. Useful for environments where
   * you need to be sure that all tracing requests finish before execution ends,
   * such as serverless environments.
   *
   * @example
   * ```
   * import { Client } from "langsmith";
   *
   * const client = new Client();
   *
   * try {
   *   // Tracing happens here
   *   ...
   * } finally {
   *   await client.awaitPendingTraceBatches();
   * }
   * ```
   *
   * @returns A promise that resolves once all currently pending traces have sent.
   */
  awaitPendingTraceBatches() {
    if (this.manualFlushMode) {
      console.warn("[WARNING]: When tracing in manual flush mode, you must call `await client.flush()` manually to submit trace batches.");
      return Promise.resolve();
    }
    return Promise.all([
      ...this.autoBatchQueue.items.map(({ itemPromise }) => itemPromise),
      this.batchIngestCaller.queue.onIdle()
    ]);
  }
};
function isExampleCreate(input) {
  return "dataset_id" in input || "dataset_name" in input;
}

// node_modules/langsmith/dist/index.js
var __version__ = "0.3.29";

// node_modules/langsmith/dist/utils/env.js
var globalEnv;
var isBrowser2 = () => typeof window !== "undefined" && typeof window.document !== "undefined";
var isWebWorker2 = () => typeof globalThis === "object" && globalThis.constructor && globalThis.constructor.name === "DedicatedWorkerGlobalScope";
var isJsDom2 = () => typeof window !== "undefined" && window.name === "nodejs" || typeof navigator !== "undefined" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"));
var isDeno2 = () => typeof Deno !== "undefined";
var isNode2 = () => typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined" && !isDeno2();
var getEnv2 = () => {
  if (globalEnv) {
    return globalEnv;
  }
  if (isBrowser2()) {
    globalEnv = "browser";
  } else if (isNode2()) {
    globalEnv = "node";
  } else if (isWebWorker2()) {
    globalEnv = "webworker";
  } else if (isJsDom2()) {
    globalEnv = "jsdom";
  } else if (isDeno2()) {
    globalEnv = "deno";
  } else {
    globalEnv = "other";
  }
  return globalEnv;
};
var runtimeEnvironment2;
function getRuntimeEnvironment2() {
  if (runtimeEnvironment2 === void 0) {
    const env = getEnv2();
    const releaseEnv = getShas();
    runtimeEnvironment2 = {
      library: "langsmith",
      runtime: env,
      sdk: "langsmith-js",
      sdk_version: __version__,
      ...releaseEnv
    };
  }
  return runtimeEnvironment2;
}
function getLangChainEnvVarsMetadata() {
  const allEnvVars = getEnvironmentVariables() || {};
  const envVars = {};
  const excluded = [
    "LANGCHAIN_API_KEY",
    "LANGCHAIN_ENDPOINT",
    "LANGCHAIN_TRACING_V2",
    "LANGCHAIN_PROJECT",
    "LANGCHAIN_SESSION",
    "LANGSMITH_API_KEY",
    "LANGSMITH_ENDPOINT",
    "LANGSMITH_TRACING_V2",
    "LANGSMITH_PROJECT",
    "LANGSMITH_SESSION"
  ];
  for (const [key, value] of Object.entries(allEnvVars)) {
    if ((key.startsWith("LANGCHAIN_") || key.startsWith("LANGSMITH_")) && typeof value === "string" && !excluded.includes(key) && !key.toLowerCase().includes("key") && !key.toLowerCase().includes("secret") && !key.toLowerCase().includes("token")) {
      if (key === "LANGCHAIN_REVISION_ID") {
        envVars["revision_id"] = value;
      } else {
        envVars[key] = value;
      }
    }
  }
  return envVars;
}
function getEnvironmentVariables() {
  try {
    if (typeof process !== "undefined" && process.env) {
      return Object.entries(process.env).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {});
    }
    return void 0;
  } catch (e) {
    return void 0;
  }
}
function getEnvironmentVariable2(name) {
  try {
    return typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      process.env?.[name]
    ) : void 0;
  } catch (e) {
    return void 0;
  }
}
function getLangSmithEnvironmentVariable(name) {
  return getEnvironmentVariable2(`LANGSMITH_${name}`) || getEnvironmentVariable2(`LANGCHAIN_${name}`);
}
var cachedCommitSHAs;
function getShas() {
  if (cachedCommitSHAs !== void 0) {
    return cachedCommitSHAs;
  }
  const common_release_envs = [
    "VERCEL_GIT_COMMIT_SHA",
    "NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA",
    "COMMIT_REF",
    "RENDER_GIT_COMMIT",
    "CI_COMMIT_SHA",
    "CIRCLE_SHA1",
    "CF_PAGES_COMMIT_SHA",
    "REACT_APP_GIT_SHA",
    "SOURCE_VERSION",
    "GITHUB_SHA",
    "TRAVIS_COMMIT",
    "GIT_COMMIT",
    "BUILD_VCS_NUMBER",
    "bamboo_planRepository_revision",
    "Build.SourceVersion",
    "BITBUCKET_COMMIT",
    "DRONE_COMMIT_SHA",
    "SEMAPHORE_GIT_SHA",
    "BUILDKITE_COMMIT"
  ];
  const shas = {};
  for (const env of common_release_envs) {
    const envVar = getEnvironmentVariable2(env);
    if (envVar !== void 0) {
      shas[env] = envVar;
    }
  }
  cachedCommitSHAs = shas;
  return shas;
}

// node_modules/langsmith/dist/env.js
var isTracingEnabled = (tracingEnabled) => {
  if (tracingEnabled !== void 0) {
    return tracingEnabled;
  }
  const envVars = ["TRACING_V2", "TRACING"];
  return !!envVars.find((envVar) => getLangSmithEnvironmentVariable(envVar) === "true");
};

// node_modules/langsmith/dist/singletons/constants.js
var _LC_CONTEXT_VARIABLES_KEY = Symbol.for("lc:context_variables");

// node_modules/langsmith/dist/run_trees.js
function stripNonAlphanumeric(input) {
  return input.replace(/[-:.]/g, "");
}
function convertToDottedOrderFormat(epoch, runId, executionOrder = 1) {
  const paddedOrder = executionOrder.toFixed(0).slice(0, 3).padStart(3, "0");
  return stripNonAlphanumeric(`${new Date(epoch).toISOString().slice(0, -1)}${paddedOrder}Z`) + runId;
}
var Baggage = class _Baggage {
  constructor(metadata, tags, project_name) {
    Object.defineProperty(this, "metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "tags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "project_name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.metadata = metadata;
    this.tags = tags;
    this.project_name = project_name;
  }
  static fromHeader(value) {
    const items = value.split(",");
    let metadata = {};
    let tags = [];
    let project_name;
    for (const item of items) {
      const [key, uriValue] = item.split("=");
      const value2 = decodeURIComponent(uriValue);
      if (key === "langsmith-metadata") {
        metadata = JSON.parse(value2);
      } else if (key === "langsmith-tags") {
        tags = value2.split(",");
      } else if (key === "langsmith-project") {
        project_name = value2;
      }
    }
    return new _Baggage(metadata, tags, project_name);
  }
  toHeader() {
    const items = [];
    if (this.metadata && Object.keys(this.metadata).length > 0) {
      items.push(`langsmith-metadata=${encodeURIComponent(JSON.stringify(this.metadata))}`);
    }
    if (this.tags && this.tags.length > 0) {
      items.push(`langsmith-tags=${encodeURIComponent(this.tags.join(","))}`);
    }
    if (this.project_name) {
      items.push(`langsmith-project=${encodeURIComponent(this.project_name)}`);
    }
    return items.join(",");
  }
};
var RunTree = class _RunTree {
  constructor(originalConfig) {
    Object.defineProperty(this, "id", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "run_type", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "project_name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "parent_run", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "child_runs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "start_time", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "end_time", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "extra", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "tags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "error", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "serialized", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "inputs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "outputs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "reference_example_id", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "events", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "trace_id", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "dotted_order", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "tracingEnabled", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "execution_order", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "child_execution_order", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "attachments", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (isRunTree(originalConfig)) {
      Object.assign(this, { ...originalConfig });
      return;
    }
    const defaultConfig = _RunTree.getDefaultConfig();
    const { metadata, ...config } = originalConfig;
    const client2 = config.client ?? _RunTree.getSharedClient();
    const dedupedMetadata = {
      ...metadata,
      ...config?.extra?.metadata
    };
    config.extra = { ...config.extra, metadata: dedupedMetadata };
    Object.assign(this, { ...defaultConfig, ...config, client: client2 });
    if (!this.trace_id) {
      if (this.parent_run) {
        this.trace_id = this.parent_run.trace_id ?? this.id;
      } else {
        this.trace_id = this.id;
      }
    }
    this.execution_order ??= 1;
    this.child_execution_order ??= 1;
    if (!this.dotted_order) {
      const currentDottedOrder = convertToDottedOrderFormat(this.start_time, this.id, this.execution_order);
      if (this.parent_run) {
        this.dotted_order = this.parent_run.dotted_order + "." + currentDottedOrder;
      } else {
        this.dotted_order = currentDottedOrder;
      }
    }
  }
  static getDefaultConfig() {
    return {
      id: v4_default(),
      run_type: "chain",
      project_name: getLangSmithEnvironmentVariable("PROJECT") ?? getEnvironmentVariable2("LANGCHAIN_SESSION") ?? // TODO: Deprecate
      "default",
      child_runs: [],
      api_url: getEnvironmentVariable2("LANGCHAIN_ENDPOINT") ?? "http://localhost:1984",
      api_key: getEnvironmentVariable2("LANGCHAIN_API_KEY"),
      caller_options: {},
      start_time: Date.now(),
      serialized: {},
      inputs: {},
      extra: {}
    };
  }
  static getSharedClient() {
    if (!_RunTree.sharedClient) {
      _RunTree.sharedClient = new Client();
    }
    return _RunTree.sharedClient;
  }
  createChild(config) {
    const child_execution_order = this.child_execution_order + 1;
    const child = new _RunTree({
      ...config,
      parent_run: this,
      project_name: this.project_name,
      client: this.client,
      tracingEnabled: this.tracingEnabled,
      execution_order: child_execution_order,
      child_execution_order
    });
    if (_LC_CONTEXT_VARIABLES_KEY in this) {
      child[_LC_CONTEXT_VARIABLES_KEY] = this[_LC_CONTEXT_VARIABLES_KEY];
    }
    const LC_CHILD = Symbol.for("lc:child_config");
    const presentConfig = config.extra?.[LC_CHILD] ?? this.extra[LC_CHILD];
    if (isRunnableConfigLike(presentConfig)) {
      const newConfig = { ...presentConfig };
      const callbacks = isCallbackManagerLike(newConfig.callbacks) ? newConfig.callbacks.copy?.() : void 0;
      if (callbacks) {
        Object.assign(callbacks, { _parentRunId: child.id });
        callbacks.handlers?.find(isLangChainTracerLike)?.updateFromRunTree?.(child);
        newConfig.callbacks = callbacks;
      }
      child.extra[LC_CHILD] = newConfig;
    }
    const visited = /* @__PURE__ */ new Set();
    let current = this;
    while (current != null && !visited.has(current.id)) {
      visited.add(current.id);
      current.child_execution_order = Math.max(current.child_execution_order, child_execution_order);
      current = current.parent_run;
    }
    this.child_runs.push(child);
    return child;
  }
  async end(outputs, error, endTime = Date.now(), metadata) {
    this.outputs = this.outputs ?? outputs;
    this.error = this.error ?? error;
    this.end_time = this.end_time ?? endTime;
    if (metadata && Object.keys(metadata).length > 0) {
      this.extra = this.extra ? { ...this.extra, metadata: { ...this.extra.metadata, ...metadata } } : { metadata };
    }
  }
  _convertToCreate(run, runtimeEnv, excludeChildRuns = true) {
    const runExtra = run.extra ?? {};
    if (!runExtra.runtime) {
      runExtra.runtime = {};
    }
    if (runtimeEnv) {
      for (const [k, v] of Object.entries(runtimeEnv)) {
        if (!runExtra.runtime[k]) {
          runExtra.runtime[k] = v;
        }
      }
    }
    let child_runs;
    let parent_run_id;
    if (!excludeChildRuns) {
      child_runs = run.child_runs.map((child_run) => this._convertToCreate(child_run, runtimeEnv, excludeChildRuns));
      parent_run_id = void 0;
    } else {
      parent_run_id = run.parent_run?.id;
      child_runs = [];
    }
    const persistedRun = {
      id: run.id,
      name: run.name,
      start_time: run.start_time,
      end_time: run.end_time,
      run_type: run.run_type,
      reference_example_id: run.reference_example_id,
      extra: runExtra,
      serialized: run.serialized,
      error: run.error,
      inputs: run.inputs,
      outputs: run.outputs,
      session_name: run.project_name,
      child_runs,
      parent_run_id,
      trace_id: run.trace_id,
      dotted_order: run.dotted_order,
      tags: run.tags,
      attachments: run.attachments
    };
    return persistedRun;
  }
  async postRun(excludeChildRuns = true) {
    try {
      const runtimeEnv = getRuntimeEnvironment2();
      const runCreate = await this._convertToCreate(this, runtimeEnv, true);
      await this.client.createRun(runCreate);
      if (!excludeChildRuns) {
        warnOnce("Posting with excludeChildRuns=false is deprecated and will be removed in a future version.");
        for (const childRun of this.child_runs) {
          await childRun.postRun(false);
        }
      }
    } catch (error) {
      console.error(`Error in postRun for run ${this.id}:`, error);
    }
  }
  async patchRun() {
    try {
      const runUpdate = {
        end_time: this.end_time,
        error: this.error,
        inputs: this.inputs,
        outputs: this.outputs,
        parent_run_id: this.parent_run?.id,
        reference_example_id: this.reference_example_id,
        extra: this.extra,
        events: this.events,
        dotted_order: this.dotted_order,
        trace_id: this.trace_id,
        tags: this.tags,
        attachments: this.attachments,
        session_name: this.project_name
      };
      await this.client.updateRun(this.id, runUpdate);
    } catch (error) {
      console.error(`Error in patchRun for run ${this.id}`, error);
    }
  }
  toJSON() {
    return this._convertToCreate(this, void 0, false);
  }
  /**
   * Add an event to the run tree.
   * @param event - A single event or string to add
   */
  addEvent(event) {
    if (!this.events) {
      this.events = [];
    }
    if (typeof event === "string") {
      this.events.push({
        name: "event",
        time: (/* @__PURE__ */ new Date()).toISOString(),
        message: event
      });
    } else {
      this.events.push({
        ...event,
        time: event.time ?? (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  }
  static fromRunnableConfig(parentConfig, props) {
    const callbackManager = parentConfig?.callbacks;
    let parentRun;
    let projectName;
    let client2;
    let tracingEnabled = isTracingEnabled();
    if (callbackManager) {
      const parentRunId = callbackManager?.getParentRunId?.() ?? "";
      const langChainTracer = callbackManager?.handlers?.find((handler) => handler?.name == "langchain_tracer");
      parentRun = langChainTracer?.getRun?.(parentRunId);
      projectName = langChainTracer?.projectName;
      client2 = langChainTracer?.client;
      tracingEnabled = tracingEnabled || !!langChainTracer;
    }
    if (!parentRun) {
      return new _RunTree({
        ...props,
        client: client2,
        tracingEnabled,
        project_name: projectName
      });
    }
    const parentRunTree = new _RunTree({
      name: parentRun.name,
      id: parentRun.id,
      trace_id: parentRun.trace_id,
      dotted_order: parentRun.dotted_order,
      client: client2,
      tracingEnabled,
      project_name: projectName,
      tags: [
        ...new Set((parentRun?.tags ?? []).concat(parentConfig?.tags ?? []))
      ],
      extra: {
        metadata: {
          ...parentRun?.extra?.metadata,
          ...parentConfig?.metadata
        }
      }
    });
    return parentRunTree.createChild(props);
  }
  static fromDottedOrder(dottedOrder) {
    return this.fromHeaders({ "langsmith-trace": dottedOrder });
  }
  static fromHeaders(headers, inheritArgs) {
    const rawHeaders = "get" in headers && typeof headers.get === "function" ? {
      "langsmith-trace": headers.get("langsmith-trace"),
      baggage: headers.get("baggage")
    } : headers;
    const headerTrace = rawHeaders["langsmith-trace"];
    if (!headerTrace || typeof headerTrace !== "string")
      return void 0;
    const parentDottedOrder = headerTrace.trim();
    const parsedDottedOrder = parentDottedOrder.split(".").map((part) => {
      const [strTime, uuid] = part.split("Z");
      return { strTime, time: Date.parse(strTime + "Z"), uuid };
    });
    const traceId = parsedDottedOrder[0].uuid;
    const config = {
      ...inheritArgs,
      name: inheritArgs?.["name"] ?? "parent",
      run_type: inheritArgs?.["run_type"] ?? "chain",
      start_time: inheritArgs?.["start_time"] ?? Date.now(),
      id: parsedDottedOrder.at(-1)?.uuid,
      trace_id: traceId,
      dotted_order: parentDottedOrder
    };
    if (rawHeaders["baggage"] && typeof rawHeaders["baggage"] === "string") {
      const baggage = Baggage.fromHeader(rawHeaders["baggage"]);
      config.metadata = baggage.metadata;
      config.tags = baggage.tags;
      config.project_name = baggage.project_name;
    }
    return new _RunTree(config);
  }
  toHeaders(headers) {
    const result = {
      "langsmith-trace": this.dotted_order,
      baggage: new Baggage(this.extra?.metadata, this.tags, this.project_name).toHeader()
    };
    if (headers) {
      for (const [key, value] of Object.entries(result)) {
        headers.set(key, value);
      }
    }
    return result;
  }
};
Object.defineProperty(RunTree, "sharedClient", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: null
});
function isRunTree(x) {
  return x !== void 0 && typeof x.createChild === "function" && typeof x.postRun === "function";
}
function isLangChainTracerLike(x) {
  return typeof x === "object" && x != null && typeof x.name === "string" && x.name === "langchain_tracer";
}
function containsLangChainTracerLike(x) {
  return Array.isArray(x) && x.some((callback) => isLangChainTracerLike(callback));
}
function isCallbackManagerLike(x) {
  return typeof x === "object" && x != null && Array.isArray(x.handlers);
}
function isRunnableConfigLike(x) {
  return x !== void 0 && typeof x.callbacks === "object" && // Callback manager with a langchain tracer
  (containsLangChainTracerLike(x.callbacks?.handlers) || // Or it's an array with a LangChainTracerLike object within it
  containsLangChainTracerLike(x.callbacks));
}

// node_modules/langsmith/dist/singletons/traceable.js
var MockAsyncLocalStorage = class {
  getStore() {
    return void 0;
  }
  run(_, callback) {
    return callback();
  }
};
var TRACING_ALS_KEY = Symbol.for("ls:tracing_async_local_storage");
var mockAsyncLocalStorage = new MockAsyncLocalStorage();
var AsyncLocalStorageProvider = class {
  getInstance() {
    return globalThis[TRACING_ALS_KEY] ?? mockAsyncLocalStorage;
  }
  initializeGlobalInstance(instance) {
    if (globalThis[TRACING_ALS_KEY] === void 0) {
      globalThis[TRACING_ALS_KEY] = instance;
    }
  }
};
var AsyncLocalStorageProviderSingleton = new AsyncLocalStorageProvider();
function getCurrentRunTree(permitAbsentRunTree = false) {
  const runTree = AsyncLocalStorageProviderSingleton.getInstance().getStore();
  if (!permitAbsentRunTree && !isRunTree(runTree)) {
    throw new Error("Could not get the current run tree.\n\nPlease make sure you are calling this method within a traceable function and that tracing is enabled.");
  }
  return runTree;
}
var ROOT = Symbol.for("langsmith:traceable:root");
function isTraceableFunction(x) {
  return typeof x === "function" && "langsmith:traceable" in x;
}

// node_modules/@langchain/core/dist/utils/fast-json-patch/src/core.js
var core_exports = {};
__export(core_exports, {
  JsonPatchError: () => JsonPatchError,
  _areEquals: () => _areEquals,
  applyOperation: () => applyOperation,
  applyPatch: () => applyPatch,
  applyReducer: () => applyReducer,
  deepClone: () => deepClone,
  getValueByPointer: () => getValueByPointer,
  validate: () => validate2,
  validator: () => validator
});

// node_modules/@langchain/core/dist/utils/fast-json-patch/src/helpers.js
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwnProperty(obj, key) {
  return _hasOwnProperty.call(obj, key);
}
function _objectKeys(obj) {
  if (Array.isArray(obj)) {
    const keys2 = new Array(obj.length);
    for (let k = 0; k < keys2.length; k++) {
      keys2[k] = "" + k;
    }
    return keys2;
  }
  if (Object.keys) {
    return Object.keys(obj);
  }
  let keys = [];
  for (let i in obj) {
    if (hasOwnProperty(obj, i)) {
      keys.push(i);
    }
  }
  return keys;
}
function _deepClone(obj) {
  switch (typeof obj) {
    case "object":
      return JSON.parse(JSON.stringify(obj));
    //Faster than ES5 clone - http://jsperf.com/deep-cloning-of-objects/5
    case "undefined":
      return null;
    //this is how JSON.stringify behaves for array items
    default:
      return obj;
  }
}
function isInteger(str) {
  let i = 0;
  const len = str.length;
  let charCode;
  while (i < len) {
    charCode = str.charCodeAt(i);
    if (charCode >= 48 && charCode <= 57) {
      i++;
      continue;
    }
    return false;
  }
  return true;
}
function escapePathComponent(path) {
  if (path.indexOf("/") === -1 && path.indexOf("~") === -1)
    return path;
  return path.replace(/~/g, "~0").replace(/\//g, "~1");
}
function unescapePathComponent(path) {
  return path.replace(/~1/g, "/").replace(/~0/g, "~");
}
function hasUndefined(obj) {
  if (obj === void 0) {
    return true;
  }
  if (obj) {
    if (Array.isArray(obj)) {
      for (let i2 = 0, len = obj.length; i2 < len; i2++) {
        if (hasUndefined(obj[i2])) {
          return true;
        }
      }
    } else if (typeof obj === "object") {
      const objKeys = _objectKeys(obj);
      const objKeysLength = objKeys.length;
      for (var i = 0; i < objKeysLength; i++) {
        if (hasUndefined(obj[objKeys[i]])) {
          return true;
        }
      }
    }
  }
  return false;
}
function patchErrorMessageFormatter(message, args) {
  const messageParts = [message];
  for (const key in args) {
    const value = typeof args[key] === "object" ? JSON.stringify(args[key], null, 2) : args[key];
    if (typeof value !== "undefined") {
      messageParts.push(`${key}: ${value}`);
    }
  }
  return messageParts.join("\n");
}
var PatchError = class extends Error {
  constructor(message, name, index2, operation, tree) {
    super(patchErrorMessageFormatter(message, { name, index: index2, operation, tree }));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: name
    });
    Object.defineProperty(this, "index", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: index2
    });
    Object.defineProperty(this, "operation", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: operation
    });
    Object.defineProperty(this, "tree", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: tree
    });
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = patchErrorMessageFormatter(message, {
      name,
      index: index2,
      operation,
      tree
    });
  }
};

// node_modules/@langchain/core/dist/utils/fast-json-patch/src/core.js
var JsonPatchError = PatchError;
var deepClone = _deepClone;
var objOps = {
  add: function(obj, key, document) {
    obj[key] = this.value;
    return { newDocument: document };
  },
  remove: function(obj, key, document) {
    var removed = obj[key];
    delete obj[key];
    return { newDocument: document, removed };
  },
  replace: function(obj, key, document) {
    var removed = obj[key];
    obj[key] = this.value;
    return { newDocument: document, removed };
  },
  move: function(obj, key, document) {
    let removed = getValueByPointer(document, this.path);
    if (removed) {
      removed = _deepClone(removed);
    }
    const originalValue = applyOperation(document, {
      op: "remove",
      path: this.from
    }).removed;
    applyOperation(document, {
      op: "add",
      path: this.path,
      value: originalValue
    });
    return { newDocument: document, removed };
  },
  copy: function(obj, key, document) {
    const valueToCopy = getValueByPointer(document, this.from);
    applyOperation(document, {
      op: "add",
      path: this.path,
      value: _deepClone(valueToCopy)
    });
    return { newDocument: document };
  },
  test: function(obj, key, document) {
    return { newDocument: document, test: _areEquals(obj[key], this.value) };
  },
  _get: function(obj, key, document) {
    this.value = obj[key];
    return { newDocument: document };
  }
};
var arrOps = {
  add: function(arr2, i, document) {
    if (isInteger(i)) {
      arr2.splice(i, 0, this.value);
    } else {
      arr2[i] = this.value;
    }
    return { newDocument: document, index: i };
  },
  remove: function(arr2, i, document) {
    var removedList = arr2.splice(i, 1);
    return { newDocument: document, removed: removedList[0] };
  },
  replace: function(arr2, i, document) {
    var removed = arr2[i];
    arr2[i] = this.value;
    return { newDocument: document, removed };
  },
  move: objOps.move,
  copy: objOps.copy,
  test: objOps.test,
  _get: objOps._get
};
function getValueByPointer(document, pointer) {
  if (pointer == "") {
    return document;
  }
  var getOriginalDestination = { op: "_get", path: pointer };
  applyOperation(document, getOriginalDestination);
  return getOriginalDestination.value;
}
function applyOperation(document, operation, validateOperation = false, mutateDocument = true, banPrototypeModifications = true, index2 = 0) {
  if (validateOperation) {
    if (typeof validateOperation == "function") {
      validateOperation(operation, 0, document, operation.path);
    } else {
      validator(operation, 0);
    }
  }
  if (operation.path === "") {
    let returnValue = { newDocument: document };
    if (operation.op === "add") {
      returnValue.newDocument = operation.value;
      return returnValue;
    } else if (operation.op === "replace") {
      returnValue.newDocument = operation.value;
      returnValue.removed = document;
      return returnValue;
    } else if (operation.op === "move" || operation.op === "copy") {
      returnValue.newDocument = getValueByPointer(document, operation.from);
      if (operation.op === "move") {
        returnValue.removed = document;
      }
      return returnValue;
    } else if (operation.op === "test") {
      returnValue.test = _areEquals(document, operation.value);
      if (returnValue.test === false) {
        throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index2, operation, document);
      }
      returnValue.newDocument = document;
      return returnValue;
    } else if (operation.op === "remove") {
      returnValue.removed = document;
      returnValue.newDocument = null;
      return returnValue;
    } else if (operation.op === "_get") {
      operation.value = document;
      return returnValue;
    } else {
      if (validateOperation) {
        throw new JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", index2, operation, document);
      } else {
        return returnValue;
      }
    }
  } else {
    if (!mutateDocument) {
      document = _deepClone(document);
    }
    const path = operation.path || "";
    const keys = path.split("/");
    let obj = document;
    let t = 1;
    let len = keys.length;
    let existingPathFragment = void 0;
    let key;
    let validateFunction;
    if (typeof validateOperation == "function") {
      validateFunction = validateOperation;
    } else {
      validateFunction = validator;
    }
    while (true) {
      key = keys[t];
      if (key && key.indexOf("~") != -1) {
        key = unescapePathComponent(key);
      }
      if (banPrototypeModifications && (key == "__proto__" || key == "prototype" && t > 0 && keys[t - 1] == "constructor")) {
        throw new TypeError("JSON-Patch: modifying `__proto__` or `constructor/prototype` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README");
      }
      if (validateOperation) {
        if (existingPathFragment === void 0) {
          if (obj[key] === void 0) {
            existingPathFragment = keys.slice(0, t).join("/");
          } else if (t == len - 1) {
            existingPathFragment = operation.path;
          }
          if (existingPathFragment !== void 0) {
            validateFunction(operation, 0, document, existingPathFragment);
          }
        }
      }
      t++;
      if (Array.isArray(obj)) {
        if (key === "-") {
          key = obj.length;
        } else {
          if (validateOperation && !isInteger(key)) {
            throw new JsonPatchError("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", index2, operation, document);
          } else if (isInteger(key)) {
            key = ~~key;
          }
        }
        if (t >= len) {
          if (validateOperation && operation.op === "add" && key > obj.length) {
            throw new JsonPatchError("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", index2, operation, document);
          }
          const returnValue = arrOps[operation.op].call(operation, obj, key, document);
          if (returnValue.test === false) {
            throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index2, operation, document);
          }
          return returnValue;
        }
      } else {
        if (t >= len) {
          const returnValue = objOps[operation.op].call(operation, obj, key, document);
          if (returnValue.test === false) {
            throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index2, operation, document);
          }
          return returnValue;
        }
      }
      obj = obj[key];
      if (validateOperation && t < len && (!obj || typeof obj !== "object")) {
        throw new JsonPatchError("Cannot perform operation at the desired path", "OPERATION_PATH_UNRESOLVABLE", index2, operation, document);
      }
    }
  }
}
function applyPatch(document, patch, validateOperation, mutateDocument = true, banPrototypeModifications = true) {
  if (validateOperation) {
    if (!Array.isArray(patch)) {
      throw new JsonPatchError("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
    }
  }
  if (!mutateDocument) {
    document = _deepClone(document);
  }
  const results = new Array(patch.length);
  for (let i = 0, length = patch.length; i < length; i++) {
    results[i] = applyOperation(document, patch[i], validateOperation, true, banPrototypeModifications, i);
    document = results[i].newDocument;
  }
  results.newDocument = document;
  return results;
}
function applyReducer(document, operation, index2) {
  const operationResult = applyOperation(document, operation);
  if (operationResult.test === false) {
    throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index2, operation, document);
  }
  return operationResult.newDocument;
}
function validator(operation, index2, document, existingPathFragment) {
  if (typeof operation !== "object" || operation === null || Array.isArray(operation)) {
    throw new JsonPatchError("Operation is not an object", "OPERATION_NOT_AN_OBJECT", index2, operation, document);
  } else if (!objOps[operation.op]) {
    throw new JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", index2, operation, document);
  } else if (typeof operation.path !== "string") {
    throw new JsonPatchError("Operation `path` property is not a string", "OPERATION_PATH_INVALID", index2, operation, document);
  } else if (operation.path.indexOf("/") !== 0 && operation.path.length > 0) {
    throw new JsonPatchError('Operation `path` property must start with "/"', "OPERATION_PATH_INVALID", index2, operation, document);
  } else if ((operation.op === "move" || operation.op === "copy") && typeof operation.from !== "string") {
    throw new JsonPatchError("Operation `from` property is not present (applicable in `move` and `copy` operations)", "OPERATION_FROM_REQUIRED", index2, operation, document);
  } else if ((operation.op === "add" || operation.op === "replace" || operation.op === "test") && operation.value === void 0) {
    throw new JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_REQUIRED", index2, operation, document);
  } else if ((operation.op === "add" || operation.op === "replace" || operation.op === "test") && hasUndefined(operation.value)) {
    throw new JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED", index2, operation, document);
  } else if (document) {
    if (operation.op == "add") {
      var pathLen = operation.path.split("/").length;
      var existingPathLen = existingPathFragment.split("/").length;
      if (pathLen !== existingPathLen + 1 && pathLen !== existingPathLen) {
        throw new JsonPatchError("Cannot perform an `add` operation at the desired path", "OPERATION_PATH_CANNOT_ADD", index2, operation, document);
      }
    } else if (operation.op === "replace" || operation.op === "remove" || operation.op === "_get") {
      if (operation.path !== existingPathFragment) {
        throw new JsonPatchError("Cannot perform the operation at a path that does not exist", "OPERATION_PATH_UNRESOLVABLE", index2, operation, document);
      }
    } else if (operation.op === "move" || operation.op === "copy") {
      var existingValue = {
        op: "_get",
        path: operation.from,
        value: void 0
      };
      var error = validate2([existingValue], document);
      if (error && error.name === "OPERATION_PATH_UNRESOLVABLE") {
        throw new JsonPatchError("Cannot perform the operation from a path that does not exist", "OPERATION_FROM_UNRESOLVABLE", index2, operation, document);
      }
    }
  }
}
function validate2(sequence, document, externalValidator) {
  try {
    if (!Array.isArray(sequence)) {
      throw new JsonPatchError("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
    }
    if (document) {
      applyPatch(_deepClone(document), _deepClone(sequence), externalValidator || true);
    } else {
      externalValidator = externalValidator || validator;
      for (var i = 0; i < sequence.length; i++) {
        externalValidator(sequence[i], i, document, void 0);
      }
    }
  } catch (e) {
    if (e instanceof JsonPatchError) {
      return e;
    } else {
      throw e;
    }
  }
}
function _areEquals(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
    if (arrA && arrB) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!_areEquals(a[i], b[i]))
          return false;
      return true;
    }
    if (arrA != arrB)
      return false;
    var keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!b.hasOwnProperty(keys[i]))
        return false;
    for (i = length; i-- !== 0; ) {
      key = keys[i];
      if (!_areEquals(a[key], b[key]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
}

// node_modules/@langchain/core/dist/utils/fast-json-patch/index.js
var fast_json_patch_default = {
  ...core_exports,
  // ...duplex,
  JsonPatchError: PatchError,
  deepClone: _deepClone,
  escapePathComponent,
  unescapePathComponent
};

// node_modules/@langchain/core/dist/callbacks/base.js
var BaseCallbackHandlerMethodsClass = class {
};
function callbackHandlerPrefersStreaming(x) {
  return "lc_prefer_streaming" in x && x.lc_prefer_streaming;
}
var BaseCallbackHandler = class _BaseCallbackHandler extends BaseCallbackHandlerMethodsClass {
  get lc_namespace() {
    return ["langchain_core", "callbacks", this.name];
  }
  get lc_secrets() {
    return void 0;
  }
  get lc_attributes() {
    return void 0;
  }
  get lc_aliases() {
    return void 0;
  }
  get lc_serializable_keys() {
    return void 0;
  }
  /**
   * The name of the serializable. Override to provide an alias or
   * to preserve the serialized module name in minified environments.
   *
   * Implemented as a static method to support loading logic.
   */
  static lc_name() {
    return this.name;
  }
  /**
   * The final serialized identifier for the module.
   */
  get lc_id() {
    return [
      ...this.lc_namespace,
      get_lc_unique_name(this.constructor)
    ];
  }
  constructor(input) {
    super();
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "lc_kwargs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "ignoreLLM", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "ignoreChain", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "ignoreAgent", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "ignoreRetriever", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "ignoreCustomEvent", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "raiseError", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "awaitHandlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: getEnvironmentVariable("LANGCHAIN_CALLBACKS_BACKGROUND") === "false"
    });
    this.lc_kwargs = input || {};
    if (input) {
      this.ignoreLLM = input.ignoreLLM ?? this.ignoreLLM;
      this.ignoreChain = input.ignoreChain ?? this.ignoreChain;
      this.ignoreAgent = input.ignoreAgent ?? this.ignoreAgent;
      this.ignoreRetriever = input.ignoreRetriever ?? this.ignoreRetriever;
      this.ignoreCustomEvent = input.ignoreCustomEvent ?? this.ignoreCustomEvent;
      this.raiseError = input.raiseError ?? this.raiseError;
      this.awaitHandlers = this.raiseError || (input._awaitHandler ?? this.awaitHandlers);
    }
  }
  copy() {
    return new this.constructor(this);
  }
  toJSON() {
    return Serializable.prototype.toJSON.call(this);
  }
  toJSONNotImplemented() {
    return Serializable.prototype.toJSONNotImplemented.call(this);
  }
  static fromMethods(methods) {
    class Handler extends _BaseCallbackHandler {
      constructor() {
        super();
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: v4_default()
        });
        Object.assign(this, methods);
      }
    }
    return new Handler();
  }
};
var isBaseCallbackHandler = (x) => {
  const callbackHandler = x;
  return callbackHandler !== void 0 && typeof callbackHandler.copy === "function" && typeof callbackHandler.name === "string" && typeof callbackHandler.awaitHandlers === "boolean";
};

// node_modules/@langchain/core/dist/tracers/base.js
function _coerceToDict(value, defaultKey) {
  return value && !Array.isArray(value) && typeof value === "object" ? value : { [defaultKey]: value };
}
function stripNonAlphanumeric2(input) {
  return input.replace(/[-:.]/g, "");
}
function convertToDottedOrderFormat2(epoch, runId, executionOrder) {
  const paddedOrder = executionOrder.toFixed(0).slice(0, 3).padStart(3, "0");
  return stripNonAlphanumeric2(`${new Date(epoch).toISOString().slice(0, -1)}${paddedOrder}Z`) + runId;
}
function isBaseTracer(x) {
  return typeof x._addRunToRunMap === "function";
}
var BaseTracer = class extends BaseCallbackHandler {
  constructor(_fields) {
    super(...arguments);
    Object.defineProperty(this, "runMap", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
  }
  copy() {
    return this;
  }
  stringifyError(error) {
    if (error instanceof Error) {
      return error.message + (error?.stack ? `

${error.stack}` : "");
    }
    if (typeof error === "string") {
      return error;
    }
    return `${error}`;
  }
  _addChildRun(parentRun, childRun) {
    parentRun.child_runs.push(childRun);
  }
  _addRunToRunMap(run) {
    const currentDottedOrder = convertToDottedOrderFormat2(run.start_time, run.id, run.execution_order);
    const storedRun = { ...run };
    if (storedRun.parent_run_id !== void 0) {
      const parentRun = this.runMap.get(storedRun.parent_run_id);
      if (parentRun) {
        this._addChildRun(parentRun, storedRun);
        parentRun.child_execution_order = Math.max(parentRun.child_execution_order, storedRun.child_execution_order);
        storedRun.trace_id = parentRun.trace_id;
        if (parentRun.dotted_order !== void 0) {
          storedRun.dotted_order = [
            parentRun.dotted_order,
            currentDottedOrder
          ].join(".");
        } else {
        }
      } else {
      }
    } else {
      storedRun.trace_id = storedRun.id;
      storedRun.dotted_order = currentDottedOrder;
    }
    this.runMap.set(storedRun.id, storedRun);
    return storedRun;
  }
  async _endTrace(run) {
    const parentRun = run.parent_run_id !== void 0 && this.runMap.get(run.parent_run_id);
    if (parentRun) {
      parentRun.child_execution_order = Math.max(parentRun.child_execution_order, run.child_execution_order);
    } else {
      await this.persistRun(run);
    }
    this.runMap.delete(run.id);
    await this.onRunUpdate?.(run);
  }
  _getExecutionOrder(parentRunId) {
    const parentRun = parentRunId !== void 0 && this.runMap.get(parentRunId);
    if (!parentRun) {
      return 1;
    }
    return parentRun.child_execution_order + 1;
  }
  /**
   * Create and add a run to the run map for LLM start events.
   * This must sometimes be done synchronously to avoid race conditions
   * when callbacks are backgrounded, so we expose it as a separate method here.
   */
  _createRunForLLMStart(llm, prompts, runId, parentRunId, extraParams, tags, metadata, name) {
    const execution_order = this._getExecutionOrder(parentRunId);
    const start_time = Date.now();
    const finalExtraParams = metadata ? { ...extraParams, metadata } : extraParams;
    const run = {
      id: runId,
      name: name ?? llm.id[llm.id.length - 1],
      parent_run_id: parentRunId,
      start_time,
      serialized: llm,
      events: [
        {
          name: "start",
          time: new Date(start_time).toISOString()
        }
      ],
      inputs: { prompts },
      execution_order,
      child_runs: [],
      child_execution_order: execution_order,
      run_type: "llm",
      extra: finalExtraParams ?? {},
      tags: tags || []
    };
    return this._addRunToRunMap(run);
  }
  async handleLLMStart(llm, prompts, runId, parentRunId, extraParams, tags, metadata, name) {
    const run = this.runMap.get(runId) ?? this._createRunForLLMStart(llm, prompts, runId, parentRunId, extraParams, tags, metadata, name);
    await this.onRunCreate?.(run);
    await this.onLLMStart?.(run);
    return run;
  }
  /**
   * Create and add a run to the run map for chat model start events.
   * This must sometimes be done synchronously to avoid race conditions
   * when callbacks are backgrounded, so we expose it as a separate method here.
   */
  _createRunForChatModelStart(llm, messages, runId, parentRunId, extraParams, tags, metadata, name) {
    const execution_order = this._getExecutionOrder(parentRunId);
    const start_time = Date.now();
    const finalExtraParams = metadata ? { ...extraParams, metadata } : extraParams;
    const run = {
      id: runId,
      name: name ?? llm.id[llm.id.length - 1],
      parent_run_id: parentRunId,
      start_time,
      serialized: llm,
      events: [
        {
          name: "start",
          time: new Date(start_time).toISOString()
        }
      ],
      inputs: { messages },
      execution_order,
      child_runs: [],
      child_execution_order: execution_order,
      run_type: "llm",
      extra: finalExtraParams ?? {},
      tags: tags || []
    };
    return this._addRunToRunMap(run);
  }
  async handleChatModelStart(llm, messages, runId, parentRunId, extraParams, tags, metadata, name) {
    const run = this.runMap.get(runId) ?? this._createRunForChatModelStart(llm, messages, runId, parentRunId, extraParams, tags, metadata, name);
    await this.onRunCreate?.(run);
    await this.onLLMStart?.(run);
    return run;
  }
  async handleLLMEnd(output, runId, _parentRunId, _tags, extraParams) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "llm") {
      throw new Error("No LLM run to end.");
    }
    run.end_time = Date.now();
    run.outputs = output;
    run.events.push({
      name: "end",
      time: new Date(run.end_time).toISOString()
    });
    run.extra = { ...run.extra, ...extraParams };
    await this.onLLMEnd?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleLLMError(error, runId, _parentRunId, _tags, extraParams) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "llm") {
      throw new Error("No LLM run to end.");
    }
    run.end_time = Date.now();
    run.error = this.stringifyError(error);
    run.events.push({
      name: "error",
      time: new Date(run.end_time).toISOString()
    });
    run.extra = { ...run.extra, ...extraParams };
    await this.onLLMError?.(run);
    await this._endTrace(run);
    return run;
  }
  /**
   * Create and add a run to the run map for chain start events.
   * This must sometimes be done synchronously to avoid race conditions
   * when callbacks are backgrounded, so we expose it as a separate method here.
   */
  _createRunForChainStart(chain, inputs, runId, parentRunId, tags, metadata, runType, name) {
    const execution_order = this._getExecutionOrder(parentRunId);
    const start_time = Date.now();
    const run = {
      id: runId,
      name: name ?? chain.id[chain.id.length - 1],
      parent_run_id: parentRunId,
      start_time,
      serialized: chain,
      events: [
        {
          name: "start",
          time: new Date(start_time).toISOString()
        }
      ],
      inputs,
      execution_order,
      child_execution_order: execution_order,
      run_type: runType ?? "chain",
      child_runs: [],
      extra: metadata ? { metadata } : {},
      tags: tags || []
    };
    return this._addRunToRunMap(run);
  }
  async handleChainStart(chain, inputs, runId, parentRunId, tags, metadata, runType, name) {
    const run = this.runMap.get(runId) ?? this._createRunForChainStart(chain, inputs, runId, parentRunId, tags, metadata, runType, name);
    await this.onRunCreate?.(run);
    await this.onChainStart?.(run);
    return run;
  }
  async handleChainEnd(outputs, runId, _parentRunId, _tags, kwargs) {
    const run = this.runMap.get(runId);
    if (!run) {
      throw new Error("No chain run to end.");
    }
    run.end_time = Date.now();
    run.outputs = _coerceToDict(outputs, "output");
    run.events.push({
      name: "end",
      time: new Date(run.end_time).toISOString()
    });
    if (kwargs?.inputs !== void 0) {
      run.inputs = _coerceToDict(kwargs.inputs, "input");
    }
    await this.onChainEnd?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleChainError(error, runId, _parentRunId, _tags, kwargs) {
    const run = this.runMap.get(runId);
    if (!run) {
      throw new Error("No chain run to end.");
    }
    run.end_time = Date.now();
    run.error = this.stringifyError(error);
    run.events.push({
      name: "error",
      time: new Date(run.end_time).toISOString()
    });
    if (kwargs?.inputs !== void 0) {
      run.inputs = _coerceToDict(kwargs.inputs, "input");
    }
    await this.onChainError?.(run);
    await this._endTrace(run);
    return run;
  }
  /**
   * Create and add a run to the run map for tool start events.
   * This must sometimes be done synchronously to avoid race conditions
   * when callbacks are backgrounded, so we expose it as a separate method here.
   */
  _createRunForToolStart(tool, input, runId, parentRunId, tags, metadata, name) {
    const execution_order = this._getExecutionOrder(parentRunId);
    const start_time = Date.now();
    const run = {
      id: runId,
      name: name ?? tool.id[tool.id.length - 1],
      parent_run_id: parentRunId,
      start_time,
      serialized: tool,
      events: [
        {
          name: "start",
          time: new Date(start_time).toISOString()
        }
      ],
      inputs: { input },
      execution_order,
      child_execution_order: execution_order,
      run_type: "tool",
      child_runs: [],
      extra: metadata ? { metadata } : {},
      tags: tags || []
    };
    return this._addRunToRunMap(run);
  }
  async handleToolStart(tool, input, runId, parentRunId, tags, metadata, name) {
    const run = this.runMap.get(runId) ?? this._createRunForToolStart(tool, input, runId, parentRunId, tags, metadata, name);
    await this.onRunCreate?.(run);
    await this.onToolStart?.(run);
    return run;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleToolEnd(output, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "tool") {
      throw new Error("No tool run to end");
    }
    run.end_time = Date.now();
    run.outputs = { output };
    run.events.push({
      name: "end",
      time: new Date(run.end_time).toISOString()
    });
    await this.onToolEnd?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleToolError(error, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "tool") {
      throw new Error("No tool run to end");
    }
    run.end_time = Date.now();
    run.error = this.stringifyError(error);
    run.events.push({
      name: "error",
      time: new Date(run.end_time).toISOString()
    });
    await this.onToolError?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleAgentAction(action, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "chain") {
      return;
    }
    const agentRun = run;
    agentRun.actions = agentRun.actions || [];
    agentRun.actions.push(action);
    agentRun.events.push({
      name: "agent_action",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      kwargs: { action }
    });
    await this.onAgentAction?.(run);
  }
  async handleAgentEnd(action, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "chain") {
      return;
    }
    run.events.push({
      name: "agent_end",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      kwargs: { action }
    });
    await this.onAgentEnd?.(run);
  }
  /**
   * Create and add a run to the run map for retriever start events.
   * This must sometimes be done synchronously to avoid race conditions
   * when callbacks are backgrounded, so we expose it as a separate method here.
   */
  _createRunForRetrieverStart(retriever, query, runId, parentRunId, tags, metadata, name) {
    const execution_order = this._getExecutionOrder(parentRunId);
    const start_time = Date.now();
    const run = {
      id: runId,
      name: name ?? retriever.id[retriever.id.length - 1],
      parent_run_id: parentRunId,
      start_time,
      serialized: retriever,
      events: [
        {
          name: "start",
          time: new Date(start_time).toISOString()
        }
      ],
      inputs: { query },
      execution_order,
      child_execution_order: execution_order,
      run_type: "retriever",
      child_runs: [],
      extra: metadata ? { metadata } : {},
      tags: tags || []
    };
    return this._addRunToRunMap(run);
  }
  async handleRetrieverStart(retriever, query, runId, parentRunId, tags, metadata, name) {
    const run = this.runMap.get(runId) ?? this._createRunForRetrieverStart(retriever, query, runId, parentRunId, tags, metadata, name);
    await this.onRunCreate?.(run);
    await this.onRetrieverStart?.(run);
    return run;
  }
  async handleRetrieverEnd(documents, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "retriever") {
      throw new Error("No retriever run to end");
    }
    run.end_time = Date.now();
    run.outputs = { documents };
    run.events.push({
      name: "end",
      time: new Date(run.end_time).toISOString()
    });
    await this.onRetrieverEnd?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleRetrieverError(error, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "retriever") {
      throw new Error("No retriever run to end");
    }
    run.end_time = Date.now();
    run.error = this.stringifyError(error);
    run.events.push({
      name: "error",
      time: new Date(run.end_time).toISOString()
    });
    await this.onRetrieverError?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleText(text, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "chain") {
      return;
    }
    run.events.push({
      name: "text",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      kwargs: { text }
    });
    await this.onText?.(run);
  }
  async handleLLMNewToken(token, idx, runId, _parentRunId, _tags, fields) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "llm") {
      throw new Error(`Invalid "runId" provided to "handleLLMNewToken" callback.`);
    }
    run.events.push({
      name: "new_token",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      kwargs: { token, idx, chunk: fields?.chunk }
    });
    await this.onLLMNewToken?.(run, token, { chunk: fields?.chunk });
    return run;
  }
};

// node_modules/@langchain/core/dist/tracers/console.js
var import_ansi_styles = __toESM(require_ansi_styles(), 1);
function wrap(style, text) {
  return `${style.open}${text}${style.close}`;
}
function tryJsonStringify(obj, fallback) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (err) {
    return fallback;
  }
}
function formatKVMapItem(value) {
  if (typeof value === "string") {
    return value.trim();
  }
  if (value === null || value === void 0) {
    return value;
  }
  return tryJsonStringify(value, value.toString());
}
function elapsed(run) {
  if (!run.end_time)
    return "";
  const elapsed2 = run.end_time - run.start_time;
  if (elapsed2 < 1e3) {
    return `${elapsed2}ms`;
  }
  return `${(elapsed2 / 1e3).toFixed(2)}s`;
}
var { color } = import_ansi_styles.default;
var ConsoleCallbackHandler = class extends BaseTracer {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "console_callback_handler"
    });
  }
  /**
   * Method used to persist the run. In this case, it simply returns a
   * resolved promise as there's no persistence logic.
   * @param _run The run to persist.
   * @returns A resolved promise.
   */
  persistRun(_run) {
    return Promise.resolve();
  }
  // utility methods
  /**
   * Method used to get all the parent runs of a given run.
   * @param run The run whose parents are to be retrieved.
   * @returns An array of parent runs.
   */
  getParents(run) {
    const parents = [];
    let currentRun = run;
    while (currentRun.parent_run_id) {
      const parent = this.runMap.get(currentRun.parent_run_id);
      if (parent) {
        parents.push(parent);
        currentRun = parent;
      } else {
        break;
      }
    }
    return parents;
  }
  /**
   * Method used to get a string representation of the run's lineage, which
   * is used in logging.
   * @param run The run whose lineage is to be retrieved.
   * @returns A string representation of the run's lineage.
   */
  getBreadcrumbs(run) {
    const parents = this.getParents(run).reverse();
    const string = [...parents, run].map((parent, i, arr2) => {
      const name = `${parent.execution_order}:${parent.run_type}:${parent.name}`;
      return i === arr2.length - 1 ? wrap(import_ansi_styles.default.bold, name) : name;
    }).join(" > ");
    return wrap(color.grey, string);
  }
  // logging methods
  /**
   * Method used to log the start of a chain run.
   * @param run The chain run that has started.
   * @returns void
   */
  onChainStart(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.green, "[chain/start]")} [${crumbs}] Entering Chain run with input: ${tryJsonStringify(run.inputs, "[inputs]")}`);
  }
  /**
   * Method used to log the end of a chain run.
   * @param run The chain run that has ended.
   * @returns void
   */
  onChainEnd(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.cyan, "[chain/end]")} [${crumbs}] [${elapsed(run)}] Exiting Chain run with output: ${tryJsonStringify(run.outputs, "[outputs]")}`);
  }
  /**
   * Method used to log any errors of a chain run.
   * @param run The chain run that has errored.
   * @returns void
   */
  onChainError(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.red, "[chain/error]")} [${crumbs}] [${elapsed(run)}] Chain run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
  }
  /**
   * Method used to log the start of an LLM run.
   * @param run The LLM run that has started.
   * @returns void
   */
  onLLMStart(run) {
    const crumbs = this.getBreadcrumbs(run);
    const inputs = "prompts" in run.inputs ? { prompts: run.inputs.prompts.map((p) => p.trim()) } : run.inputs;
    console.log(`${wrap(color.green, "[llm/start]")} [${crumbs}] Entering LLM run with input: ${tryJsonStringify(inputs, "[inputs]")}`);
  }
  /**
   * Method used to log the end of an LLM run.
   * @param run The LLM run that has ended.
   * @returns void
   */
  onLLMEnd(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.cyan, "[llm/end]")} [${crumbs}] [${elapsed(run)}] Exiting LLM run with output: ${tryJsonStringify(run.outputs, "[response]")}`);
  }
  /**
   * Method used to log any errors of an LLM run.
   * @param run The LLM run that has errored.
   * @returns void
   */
  onLLMError(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.red, "[llm/error]")} [${crumbs}] [${elapsed(run)}] LLM run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
  }
  /**
   * Method used to log the start of a tool run.
   * @param run The tool run that has started.
   * @returns void
   */
  onToolStart(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.green, "[tool/start]")} [${crumbs}] Entering Tool run with input: "${formatKVMapItem(run.inputs.input)}"`);
  }
  /**
   * Method used to log the end of a tool run.
   * @param run The tool run that has ended.
   * @returns void
   */
  onToolEnd(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.cyan, "[tool/end]")} [${crumbs}] [${elapsed(run)}] Exiting Tool run with output: "${formatKVMapItem(run.outputs?.output)}"`);
  }
  /**
   * Method used to log any errors of a tool run.
   * @param run The tool run that has errored.
   * @returns void
   */
  onToolError(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.red, "[tool/error]")} [${crumbs}] [${elapsed(run)}] Tool run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
  }
  /**
   * Method used to log the start of a retriever run.
   * @param run The retriever run that has started.
   * @returns void
   */
  onRetrieverStart(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.green, "[retriever/start]")} [${crumbs}] Entering Retriever run with input: ${tryJsonStringify(run.inputs, "[inputs]")}`);
  }
  /**
   * Method used to log the end of a retriever run.
   * @param run The retriever run that has ended.
   * @returns void
   */
  onRetrieverEnd(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.cyan, "[retriever/end]")} [${crumbs}] [${elapsed(run)}] Exiting Retriever run with output: ${tryJsonStringify(run.outputs, "[outputs]")}`);
  }
  /**
   * Method used to log any errors of a retriever run.
   * @param run The retriever run that has errored.
   * @returns void
   */
  onRetrieverError(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.red, "[retriever/error]")} [${crumbs}] [${elapsed(run)}] Retriever run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
  }
  /**
   * Method used to log the action selected by the agent.
   * @param run The run in which the agent action occurred.
   * @returns void
   */
  onAgentAction(run) {
    const agentRun = run;
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.blue, "[agent/action]")} [${crumbs}] Agent selected action: ${tryJsonStringify(agentRun.actions[agentRun.actions.length - 1], "[action]")}`);
  }
};

// node_modules/@langchain/core/dist/singletons/tracer.js
var client;
var getDefaultLangChainClientSingleton = () => {
  if (client === void 0) {
    const clientParams = getEnvironmentVariable("LANGCHAIN_CALLBACKS_BACKGROUND") === "false" ? {
      // LangSmith has its own backgrounding system
      blockOnRootRunFinalization: true
    } : {};
    client = new Client(clientParams);
  }
  return client;
};

// node_modules/@langchain/core/dist/tracers/tracer_langchain.js
var LangChainTracer = class _LangChainTracer extends BaseTracer {
  constructor(fields = {}) {
    super(fields);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "langchain_tracer"
    });
    Object.defineProperty(this, "projectName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "exampleId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    const { exampleId, projectName, client: client2 } = fields;
    this.projectName = projectName ?? getEnvironmentVariable("LANGCHAIN_PROJECT") ?? getEnvironmentVariable("LANGCHAIN_SESSION");
    this.exampleId = exampleId;
    this.client = client2 ?? getDefaultLangChainClientSingleton();
    const traceableTree = _LangChainTracer.getTraceableRunTree();
    if (traceableTree) {
      this.updateFromRunTree(traceableTree);
    }
  }
  async _convertToCreate(run, example_id = void 0) {
    return {
      ...run,
      extra: {
        ...run.extra,
        runtime: await getRuntimeEnvironment()
      },
      child_runs: void 0,
      session_name: this.projectName,
      reference_example_id: run.parent_run_id ? void 0 : example_id
    };
  }
  async persistRun(_run) {
  }
  async onRunCreate(run) {
    const persistedRun = await this._convertToCreate(run, this.exampleId);
    await this.client.createRun(persistedRun);
  }
  async onRunUpdate(run) {
    const runUpdate = {
      end_time: run.end_time,
      error: run.error,
      outputs: run.outputs,
      events: run.events,
      inputs: run.inputs,
      trace_id: run.trace_id,
      dotted_order: run.dotted_order,
      parent_run_id: run.parent_run_id,
      extra: run.extra,
      session_name: this.projectName
    };
    await this.client.updateRun(run.id, runUpdate);
  }
  getRun(id) {
    return this.runMap.get(id);
  }
  updateFromRunTree(runTree) {
    let rootRun = runTree;
    const visited = /* @__PURE__ */ new Set();
    while (rootRun.parent_run) {
      if (visited.has(rootRun.id))
        break;
      visited.add(rootRun.id);
      if (!rootRun.parent_run)
        break;
      rootRun = rootRun.parent_run;
    }
    visited.clear();
    const queue2 = [rootRun];
    while (queue2.length > 0) {
      const current = queue2.shift();
      if (!current || visited.has(current.id))
        continue;
      visited.add(current.id);
      this.runMap.set(current.id, current);
      if (current.child_runs) {
        queue2.push(...current.child_runs);
      }
    }
    this.client = runTree.client ?? this.client;
    this.projectName = runTree.project_name ?? this.projectName;
    this.exampleId = runTree.reference_example_id ?? this.exampleId;
  }
  convertToRunTree(id) {
    const runTreeMap = {};
    const runTreeList = [];
    for (const [id2, run] of this.runMap) {
      const runTree = new RunTree({
        ...run,
        child_runs: [],
        parent_run: void 0,
        // inherited properties
        client: this.client,
        project_name: this.projectName,
        reference_example_id: this.exampleId,
        tracingEnabled: true
      });
      runTreeMap[id2] = runTree;
      runTreeList.push([id2, run.dotted_order]);
    }
    runTreeList.sort((a, b) => {
      if (!a[1] || !b[1])
        return 0;
      return a[1].localeCompare(b[1]);
    });
    for (const [id2] of runTreeList) {
      const run = this.runMap.get(id2);
      const runTree = runTreeMap[id2];
      if (!run || !runTree)
        continue;
      if (run.parent_run_id) {
        const parentRunTree = runTreeMap[run.parent_run_id];
        if (parentRunTree) {
          parentRunTree.child_runs.push(runTree);
          runTree.parent_run = parentRunTree;
        }
      }
    }
    return runTreeMap[id];
  }
  static getTraceableRunTree() {
    try {
      return (
        // The type cast here provides forward compatibility. Old versions of LangSmith will just
        // ignore the permitAbsentRunTree arg.
        getCurrentRunTree(true)
      );
    } catch {
      return void 0;
    }
  }
};

// node_modules/@langchain/core/dist/singletons/callbacks.js
var import_p_queue2 = __toESM(require_dist(), 1);

// node_modules/@langchain/core/dist/singletons/async_local_storage/globals.js
var TRACING_ALS_KEY2 = Symbol.for("ls:tracing_async_local_storage");
var _CONTEXT_VARIABLES_KEY = Symbol.for("lc:context_variables");
var setGlobalAsyncLocalStorageInstance = (instance) => {
  globalThis[TRACING_ALS_KEY2] = instance;
};
var getGlobalAsyncLocalStorageInstance = () => {
  return globalThis[TRACING_ALS_KEY2];
};

// node_modules/@langchain/core/dist/singletons/callbacks.js
var queue;
function createQueue() {
  const PQueue = "default" in import_p_queue2.default ? import_p_queue2.default.default : import_p_queue2.default;
  return new PQueue({
    autoStart: true,
    concurrency: 1
  });
}
function getQueue() {
  if (typeof queue === "undefined") {
    queue = createQueue();
  }
  return queue;
}
async function consumeCallback(promiseFn, wait) {
  if (wait === true) {
    const asyncLocalStorageInstance = getGlobalAsyncLocalStorageInstance();
    if (asyncLocalStorageInstance !== void 0) {
      await asyncLocalStorageInstance.run(void 0, async () => promiseFn());
    } else {
      await promiseFn();
    }
  } else {
    queue = getQueue();
    void queue.add(async () => {
      const asyncLocalStorageInstance = getGlobalAsyncLocalStorageInstance();
      if (asyncLocalStorageInstance !== void 0) {
        await asyncLocalStorageInstance.run(void 0, async () => promiseFn());
      } else {
        await promiseFn();
      }
    });
  }
}

// node_modules/@langchain/core/dist/utils/callbacks.js
var isTracingEnabled2 = (tracingEnabled) => {
  if (tracingEnabled !== void 0) {
    return tracingEnabled;
  }
  const envVars = [
    "LANGSMITH_TRACING_V2",
    "LANGCHAIN_TRACING_V2",
    "LANGSMITH_TRACING",
    "LANGCHAIN_TRACING"
  ];
  return !!envVars.find((envVar) => getEnvironmentVariable(envVar) === "true");
};

// node_modules/@langchain/core/dist/singletons/async_local_storage/context.js
function getContextVariable(name) {
  const asyncLocalStorageInstance = getGlobalAsyncLocalStorageInstance();
  if (asyncLocalStorageInstance === void 0) {
    return void 0;
  }
  const runTree = asyncLocalStorageInstance.getStore();
  return runTree?.[_CONTEXT_VARIABLES_KEY]?.[name];
}
var LC_CONFIGURE_HOOKS_KEY = Symbol("lc:configure_hooks");
var _getConfigureHooks = () => getContextVariable(LC_CONFIGURE_HOOKS_KEY) || [];

// node_modules/@langchain/core/dist/callbacks/manager.js
var BaseCallbackManager = class {
  setHandler(handler) {
    return this.setHandlers([handler]);
  }
};
var BaseRunManager = class {
  constructor(runId, handlers, inheritableHandlers, tags, inheritableTags, metadata, inheritableMetadata, _parentRunId) {
    Object.defineProperty(this, "runId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: runId
    });
    Object.defineProperty(this, "handlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: handlers
    });
    Object.defineProperty(this, "inheritableHandlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: inheritableHandlers
    });
    Object.defineProperty(this, "tags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: tags
    });
    Object.defineProperty(this, "inheritableTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: inheritableTags
    });
    Object.defineProperty(this, "metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: metadata
    });
    Object.defineProperty(this, "inheritableMetadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: inheritableMetadata
    });
    Object.defineProperty(this, "_parentRunId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _parentRunId
    });
  }
  get parentRunId() {
    return this._parentRunId;
  }
  async handleText(text) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      try {
        await handler.handleText?.(text, this.runId, this._parentRunId, this.tags);
      } catch (err) {
        const logFunction = handler.raiseError ? console.error : console.warn;
        logFunction(`Error in handler ${handler.constructor.name}, handleText: ${err}`);
        if (handler.raiseError) {
          throw err;
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleCustomEvent(eventName, data, _runId, _tags, _metadata) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      try {
        await handler.handleCustomEvent?.(eventName, data, this.runId, this.tags, this.metadata);
      } catch (err) {
        const logFunction = handler.raiseError ? console.error : console.warn;
        logFunction(`Error in handler ${handler.constructor.name}, handleCustomEvent: ${err}`);
        if (handler.raiseError) {
          throw err;
        }
      }
    }, handler.awaitHandlers)));
  }
};
var CallbackManagerForRetrieverRun = class extends BaseRunManager {
  getChild(tag) {
    const manager = new CallbackManager(this.runId);
    manager.setHandlers(this.inheritableHandlers);
    manager.addTags(this.inheritableTags);
    manager.addMetadata(this.inheritableMetadata);
    if (tag) {
      manager.addTags([tag], false);
    }
    return manager;
  }
  async handleRetrieverEnd(documents) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreRetriever) {
        try {
          await handler.handleRetrieverEnd?.(documents, this.runId, this._parentRunId, this.tags);
        } catch (err) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleRetriever`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleRetrieverError(err) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreRetriever) {
        try {
          await handler.handleRetrieverError?.(err, this.runId, this._parentRunId, this.tags);
        } catch (error) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleRetrieverError: ${error}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
};
var CallbackManagerForLLMRun = class extends BaseRunManager {
  async handleLLMNewToken(token, idx, _runId, _parentRunId, _tags, fields) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreLLM) {
        try {
          await handler.handleLLMNewToken?.(token, idx ?? { prompt: 0, completion: 0 }, this.runId, this._parentRunId, this.tags, fields);
        } catch (err) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleLLMNewToken: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleLLMError(err, _runId, _parentRunId, _tags, extraParams) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreLLM) {
        try {
          await handler.handleLLMError?.(err, this.runId, this._parentRunId, this.tags, extraParams);
        } catch (err2) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleLLMError: ${err2}`);
          if (handler.raiseError) {
            throw err2;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleLLMEnd(output, _runId, _parentRunId, _tags, extraParams) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreLLM) {
        try {
          await handler.handleLLMEnd?.(output, this.runId, this._parentRunId, this.tags, extraParams);
        } catch (err) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleLLMEnd: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
};
var CallbackManagerForChainRun = class extends BaseRunManager {
  getChild(tag) {
    const manager = new CallbackManager(this.runId);
    manager.setHandlers(this.inheritableHandlers);
    manager.addTags(this.inheritableTags);
    manager.addMetadata(this.inheritableMetadata);
    if (tag) {
      manager.addTags([tag], false);
    }
    return manager;
  }
  async handleChainError(err, _runId, _parentRunId, _tags, kwargs) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreChain) {
        try {
          await handler.handleChainError?.(err, this.runId, this._parentRunId, this.tags, kwargs);
        } catch (err2) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleChainError: ${err2}`);
          if (handler.raiseError) {
            throw err2;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleChainEnd(output, _runId, _parentRunId, _tags, kwargs) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreChain) {
        try {
          await handler.handleChainEnd?.(output, this.runId, this._parentRunId, this.tags, kwargs);
        } catch (err) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleChainEnd: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleAgentAction(action) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreAgent) {
        try {
          await handler.handleAgentAction?.(action, this.runId, this._parentRunId, this.tags);
        } catch (err) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleAgentAction: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleAgentEnd(action) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreAgent) {
        try {
          await handler.handleAgentEnd?.(action, this.runId, this._parentRunId, this.tags);
        } catch (err) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleAgentEnd: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
};
var CallbackManagerForToolRun = class extends BaseRunManager {
  getChild(tag) {
    const manager = new CallbackManager(this.runId);
    manager.setHandlers(this.inheritableHandlers);
    manager.addTags(this.inheritableTags);
    manager.addMetadata(this.inheritableMetadata);
    if (tag) {
      manager.addTags([tag], false);
    }
    return manager;
  }
  async handleToolError(err) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreAgent) {
        try {
          await handler.handleToolError?.(err, this.runId, this._parentRunId, this.tags);
        } catch (err2) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleToolError: ${err2}`);
          if (handler.raiseError) {
            throw err2;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleToolEnd(output) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreAgent) {
        try {
          await handler.handleToolEnd?.(output, this.runId, this._parentRunId, this.tags);
        } catch (err) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleToolEnd: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
};
var CallbackManager = class _CallbackManager extends BaseCallbackManager {
  constructor(parentRunId, options) {
    super();
    Object.defineProperty(this, "handlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "inheritableHandlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "tags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "inheritableTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "inheritableMetadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "callback_manager"
    });
    Object.defineProperty(this, "_parentRunId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.handlers = options?.handlers ?? this.handlers;
    this.inheritableHandlers = options?.inheritableHandlers ?? this.inheritableHandlers;
    this.tags = options?.tags ?? this.tags;
    this.inheritableTags = options?.inheritableTags ?? this.inheritableTags;
    this.metadata = options?.metadata ?? this.metadata;
    this.inheritableMetadata = options?.inheritableMetadata ?? this.inheritableMetadata;
    this._parentRunId = parentRunId;
  }
  /**
   * Gets the parent run ID, if any.
   *
   * @returns The parent run ID.
   */
  getParentRunId() {
    return this._parentRunId;
  }
  async handleLLMStart(llm, prompts, runId = void 0, _parentRunId = void 0, extraParams = void 0, _tags = void 0, _metadata = void 0, runName = void 0) {
    return Promise.all(prompts.map(async (prompt, idx) => {
      const runId_ = idx === 0 && runId ? runId : v4_default();
      await Promise.all(this.handlers.map((handler) => {
        if (handler.ignoreLLM) {
          return;
        }
        if (isBaseTracer(handler)) {
          handler._createRunForLLMStart(llm, [prompt], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
        }
        return consumeCallback(async () => {
          try {
            await handler.handleLLMStart?.(llm, [prompt], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
          } catch (err) {
            const logFunction = handler.raiseError ? console.error : console.warn;
            logFunction(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
            if (handler.raiseError) {
              throw err;
            }
          }
        }, handler.awaitHandlers);
      }));
      return new CallbackManagerForLLMRun(runId_, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }));
  }
  async handleChatModelStart(llm, messages, runId = void 0, _parentRunId = void 0, extraParams = void 0, _tags = void 0, _metadata = void 0, runName = void 0) {
    return Promise.all(messages.map(async (messageGroup, idx) => {
      const runId_ = idx === 0 && runId ? runId : v4_default();
      await Promise.all(this.handlers.map((handler) => {
        if (handler.ignoreLLM) {
          return;
        }
        if (isBaseTracer(handler)) {
          handler._createRunForChatModelStart(llm, [messageGroup], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
        }
        return consumeCallback(async () => {
          try {
            if (handler.handleChatModelStart) {
              await handler.handleChatModelStart?.(llm, [messageGroup], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
            } else if (handler.handleLLMStart) {
              const messageString = getBufferString(messageGroup);
              await handler.handleLLMStart?.(llm, [messageString], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
            }
          } catch (err) {
            const logFunction = handler.raiseError ? console.error : console.warn;
            logFunction(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
            if (handler.raiseError) {
              throw err;
            }
          }
        }, handler.awaitHandlers);
      }));
      return new CallbackManagerForLLMRun(runId_, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }));
  }
  async handleChainStart(chain, inputs, runId = v4_default(), runType = void 0, _tags = void 0, _metadata = void 0, runName = void 0) {
    await Promise.all(this.handlers.map((handler) => {
      if (handler.ignoreChain) {
        return;
      }
      if (isBaseTracer(handler)) {
        handler._createRunForChainStart(chain, inputs, runId, this._parentRunId, this.tags, this.metadata, runType, runName);
      }
      return consumeCallback(async () => {
        try {
          await handler.handleChainStart?.(chain, inputs, runId, this._parentRunId, this.tags, this.metadata, runType, runName);
        } catch (err) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleChainStart: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }, handler.awaitHandlers);
    }));
    return new CallbackManagerForChainRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
  }
  async handleToolStart(tool, input, runId = v4_default(), _parentRunId = void 0, _tags = void 0, _metadata = void 0, runName = void 0) {
    await Promise.all(this.handlers.map((handler) => {
      if (handler.ignoreAgent) {
        return;
      }
      if (isBaseTracer(handler)) {
        handler._createRunForToolStart(tool, input, runId, this._parentRunId, this.tags, this.metadata, runName);
      }
      return consumeCallback(async () => {
        try {
          await handler.handleToolStart?.(tool, input, runId, this._parentRunId, this.tags, this.metadata, runName);
        } catch (err) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleToolStart: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }, handler.awaitHandlers);
    }));
    return new CallbackManagerForToolRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
  }
  async handleRetrieverStart(retriever, query, runId = v4_default(), _parentRunId = void 0, _tags = void 0, _metadata = void 0, runName = void 0) {
    await Promise.all(this.handlers.map((handler) => {
      if (handler.ignoreRetriever) {
        return;
      }
      if (isBaseTracer(handler)) {
        handler._createRunForRetrieverStart(retriever, query, runId, this._parentRunId, this.tags, this.metadata, runName);
      }
      return consumeCallback(async () => {
        try {
          await handler.handleRetrieverStart?.(retriever, query, runId, this._parentRunId, this.tags, this.metadata, runName);
        } catch (err) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleRetrieverStart: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }, handler.awaitHandlers);
    }));
    return new CallbackManagerForRetrieverRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
  }
  async handleCustomEvent(eventName, data, runId, _tags, _metadata) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreCustomEvent) {
        try {
          await handler.handleCustomEvent?.(eventName, data, runId, this.tags, this.metadata);
        } catch (err) {
          const logFunction = handler.raiseError ? console.error : console.warn;
          logFunction(`Error in handler ${handler.constructor.name}, handleCustomEvent: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  addHandler(handler, inherit = true) {
    this.handlers.push(handler);
    if (inherit) {
      this.inheritableHandlers.push(handler);
    }
  }
  removeHandler(handler) {
    this.handlers = this.handlers.filter((_handler) => _handler !== handler);
    this.inheritableHandlers = this.inheritableHandlers.filter((_handler) => _handler !== handler);
  }
  setHandlers(handlers, inherit = true) {
    this.handlers = [];
    this.inheritableHandlers = [];
    for (const handler of handlers) {
      this.addHandler(handler, inherit);
    }
  }
  addTags(tags, inherit = true) {
    this.removeTags(tags);
    this.tags.push(...tags);
    if (inherit) {
      this.inheritableTags.push(...tags);
    }
  }
  removeTags(tags) {
    this.tags = this.tags.filter((tag) => !tags.includes(tag));
    this.inheritableTags = this.inheritableTags.filter((tag) => !tags.includes(tag));
  }
  addMetadata(metadata, inherit = true) {
    this.metadata = { ...this.metadata, ...metadata };
    if (inherit) {
      this.inheritableMetadata = { ...this.inheritableMetadata, ...metadata };
    }
  }
  removeMetadata(metadata) {
    for (const key of Object.keys(metadata)) {
      delete this.metadata[key];
      delete this.inheritableMetadata[key];
    }
  }
  copy(additionalHandlers = [], inherit = true) {
    const manager = new _CallbackManager(this._parentRunId);
    for (const handler of this.handlers) {
      const inheritable = this.inheritableHandlers.includes(handler);
      manager.addHandler(handler, inheritable);
    }
    for (const tag of this.tags) {
      const inheritable = this.inheritableTags.includes(tag);
      manager.addTags([tag], inheritable);
    }
    for (const key of Object.keys(this.metadata)) {
      const inheritable = Object.keys(this.inheritableMetadata).includes(key);
      manager.addMetadata({ [key]: this.metadata[key] }, inheritable);
    }
    for (const handler of additionalHandlers) {
      if (
        // Prevent multiple copies of console_callback_handler
        manager.handlers.filter((h) => h.name === "console_callback_handler").some((h) => h.name === handler.name)
      ) {
        continue;
      }
      manager.addHandler(handler, inherit);
    }
    return manager;
  }
  static fromHandlers(handlers) {
    class Handler extends BaseCallbackHandler {
      constructor() {
        super();
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: v4_default()
        });
        Object.assign(this, handlers);
      }
    }
    const manager = new this();
    manager.addHandler(new Handler());
    return manager;
  }
  static configure(inheritableHandlers, localHandlers, inheritableTags, localTags, inheritableMetadata, localMetadata, options) {
    return this._configureSync(inheritableHandlers, localHandlers, inheritableTags, localTags, inheritableMetadata, localMetadata, options);
  }
  // TODO: Deprecate async method in favor of this one.
  static _configureSync(inheritableHandlers, localHandlers, inheritableTags, localTags, inheritableMetadata, localMetadata, options) {
    let callbackManager;
    if (inheritableHandlers || localHandlers) {
      if (Array.isArray(inheritableHandlers) || !inheritableHandlers) {
        callbackManager = new _CallbackManager();
        callbackManager.setHandlers(inheritableHandlers?.map(ensureHandler) ?? [], true);
      } else {
        callbackManager = inheritableHandlers;
      }
      callbackManager = callbackManager.copy(Array.isArray(localHandlers) ? localHandlers.map(ensureHandler) : localHandlers?.handlers, false);
    }
    const verboseEnabled = getEnvironmentVariable("LANGCHAIN_VERBOSE") === "true" || options?.verbose;
    const tracingV2Enabled = LangChainTracer.getTraceableRunTree()?.tracingEnabled || isTracingEnabled2();
    const tracingEnabled = tracingV2Enabled || (getEnvironmentVariable("LANGCHAIN_TRACING") ?? false);
    if (verboseEnabled || tracingEnabled) {
      if (!callbackManager) {
        callbackManager = new _CallbackManager();
      }
      if (verboseEnabled && !callbackManager.handlers.some((handler) => handler.name === ConsoleCallbackHandler.prototype.name)) {
        const consoleHandler = new ConsoleCallbackHandler();
        callbackManager.addHandler(consoleHandler, true);
      }
      if (tracingEnabled && !callbackManager.handlers.some((handler) => handler.name === "langchain_tracer")) {
        if (tracingV2Enabled) {
          const tracerV2 = new LangChainTracer();
          callbackManager.addHandler(tracerV2, true);
          callbackManager._parentRunId = LangChainTracer.getTraceableRunTree()?.id ?? callbackManager._parentRunId;
        }
      }
    }
    for (const { contextVar, inheritable = true, handlerClass, envVar } of _getConfigureHooks()) {
      const createIfNotInContext = envVar && getEnvironmentVariable(envVar) === "true" && handlerClass;
      let handler;
      const contextVarValue = contextVar !== void 0 ? getContextVariable(contextVar) : void 0;
      if (contextVarValue && isBaseCallbackHandler(contextVarValue)) {
        handler = contextVarValue;
      } else if (createIfNotInContext) {
        handler = new handlerClass({});
      }
      if (handler !== void 0) {
        if (!callbackManager) {
          callbackManager = new _CallbackManager();
        }
        if (!callbackManager.handlers.some((h) => h.name === handler.name)) {
          callbackManager.addHandler(handler, inheritable);
        }
      }
    }
    if (inheritableTags || localTags) {
      if (callbackManager) {
        callbackManager.addTags(inheritableTags ?? []);
        callbackManager.addTags(localTags ?? [], false);
      }
    }
    if (inheritableMetadata || localMetadata) {
      if (callbackManager) {
        callbackManager.addMetadata(inheritableMetadata ?? {});
        callbackManager.addMetadata(localMetadata ?? {}, false);
      }
    }
    return callbackManager;
  }
};
function ensureHandler(handler) {
  if ("name" in handler) {
    return handler;
  }
  return BaseCallbackHandler.fromMethods(handler);
}

// node_modules/@langchain/core/dist/singletons/async_local_storage/index.js
var MockAsyncLocalStorage2 = class {
  getStore() {
    return void 0;
  }
  run(_store, callback) {
    return callback();
  }
  enterWith(_store) {
    return void 0;
  }
};
var mockAsyncLocalStorage2 = new MockAsyncLocalStorage2();
var LC_CHILD_KEY = Symbol.for("lc:child_config");
var AsyncLocalStorageProvider2 = class {
  getInstance() {
    return getGlobalAsyncLocalStorageInstance() ?? mockAsyncLocalStorage2;
  }
  getRunnableConfig() {
    const storage = this.getInstance();
    return storage.getStore()?.extra?.[LC_CHILD_KEY];
  }
  runWithConfig(config, callback, avoidCreatingRootRunTree) {
    const callbackManager = CallbackManager._configureSync(config?.callbacks, void 0, config?.tags, void 0, config?.metadata);
    const storage = this.getInstance();
    const previousValue = storage.getStore();
    const parentRunId = callbackManager?.getParentRunId();
    const langChainTracer = callbackManager?.handlers?.find((handler) => handler?.name === "langchain_tracer");
    let runTree;
    if (langChainTracer && parentRunId) {
      runTree = langChainTracer.convertToRunTree(parentRunId);
    } else if (!avoidCreatingRootRunTree) {
      runTree = new RunTree({
        name: "<runnable_lambda>",
        tracingEnabled: false
      });
    }
    if (runTree) {
      runTree.extra = { ...runTree.extra, [LC_CHILD_KEY]: config };
    }
    if (previousValue !== void 0 && previousValue[_CONTEXT_VARIABLES_KEY] !== void 0) {
      if (runTree === void 0) {
        runTree = {};
      }
      runTree[_CONTEXT_VARIABLES_KEY] = previousValue[_CONTEXT_VARIABLES_KEY];
    }
    return storage.run(runTree, callback);
  }
  initializeGlobalInstance(instance) {
    if (getGlobalAsyncLocalStorageInstance() === void 0) {
      setGlobalAsyncLocalStorageInstance(instance);
    }
  }
};
var AsyncLocalStorageProviderSingleton2 = new AsyncLocalStorageProvider2();

// node_modules/@langchain/core/dist/runnables/config.js
var DEFAULT_RECURSION_LIMIT = 25;
async function getCallbackManagerForConfig(config) {
  return CallbackManager._configureSync(config?.callbacks, void 0, config?.tags, void 0, config?.metadata);
}
function mergeConfigs(...configs) {
  const copy = {};
  for (const options of configs.filter((c) => !!c)) {
    for (const key of Object.keys(options)) {
      if (key === "metadata") {
        copy[key] = { ...copy[key], ...options[key] };
      } else if (key === "tags") {
        const baseKeys = copy[key] ?? [];
        copy[key] = [...new Set(baseKeys.concat(options[key] ?? []))];
      } else if (key === "configurable") {
        copy[key] = { ...copy[key], ...options[key] };
      } else if (key === "timeout") {
        if (copy.timeout === void 0) {
          copy.timeout = options.timeout;
        } else if (options.timeout !== void 0) {
          copy.timeout = Math.min(copy.timeout, options.timeout);
        }
      } else if (key === "signal") {
        if (copy.signal === void 0) {
          copy.signal = options.signal;
        } else if (options.signal !== void 0) {
          if ("any" in AbortSignal) {
            copy.signal = AbortSignal.any([
              copy.signal,
              options.signal
            ]);
          } else {
            copy.signal = options.signal;
          }
        }
      } else if (key === "callbacks") {
        const baseCallbacks = copy.callbacks;
        const providedCallbacks = options.callbacks;
        if (Array.isArray(providedCallbacks)) {
          if (!baseCallbacks) {
            copy.callbacks = providedCallbacks;
          } else if (Array.isArray(baseCallbacks)) {
            copy.callbacks = baseCallbacks.concat(providedCallbacks);
          } else {
            const manager = baseCallbacks.copy();
            for (const callback of providedCallbacks) {
              manager.addHandler(ensureHandler(callback), true);
            }
            copy.callbacks = manager;
          }
        } else if (providedCallbacks) {
          if (!baseCallbacks) {
            copy.callbacks = providedCallbacks;
          } else if (Array.isArray(baseCallbacks)) {
            const manager = providedCallbacks.copy();
            for (const callback of baseCallbacks) {
              manager.addHandler(ensureHandler(callback), true);
            }
            copy.callbacks = manager;
          } else {
            copy.callbacks = new CallbackManager(providedCallbacks._parentRunId, {
              handlers: baseCallbacks.handlers.concat(providedCallbacks.handlers),
              inheritableHandlers: baseCallbacks.inheritableHandlers.concat(providedCallbacks.inheritableHandlers),
              tags: Array.from(new Set(baseCallbacks.tags.concat(providedCallbacks.tags))),
              inheritableTags: Array.from(new Set(baseCallbacks.inheritableTags.concat(providedCallbacks.inheritableTags))),
              metadata: {
                ...baseCallbacks.metadata,
                ...providedCallbacks.metadata
              }
            });
          }
        }
      } else {
        const typedKey = key;
        copy[typedKey] = options[typedKey] ?? copy[typedKey];
      }
    }
  }
  return copy;
}
var PRIMITIVES = /* @__PURE__ */ new Set(["string", "number", "boolean"]);
function ensureConfig(config) {
  const implicitConfig = AsyncLocalStorageProviderSingleton2.getRunnableConfig();
  let empty = {
    tags: [],
    metadata: {},
    recursionLimit: 25,
    runId: void 0
  };
  if (implicitConfig) {
    const { runId, runName, ...rest } = implicitConfig;
    empty = Object.entries(rest).reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (currentConfig, [key, value]) => {
        if (value !== void 0) {
          currentConfig[key] = value;
        }
        return currentConfig;
      },
      empty
    );
  }
  if (config) {
    empty = Object.entries(config).reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (currentConfig, [key, value]) => {
        if (value !== void 0) {
          currentConfig[key] = value;
        }
        return currentConfig;
      },
      empty
    );
  }
  if (empty?.configurable) {
    for (const key of Object.keys(empty.configurable)) {
      if (PRIMITIVES.has(typeof empty.configurable[key]) && !empty.metadata?.[key]) {
        if (!empty.metadata) {
          empty.metadata = {};
        }
        empty.metadata[key] = empty.configurable[key];
      }
    }
  }
  if (empty.timeout !== void 0) {
    if (empty.timeout <= 0) {
      throw new Error("Timeout must be a positive number");
    }
    const timeoutSignal = AbortSignal.timeout(empty.timeout);
    if (empty.signal !== void 0) {
      if ("any" in AbortSignal) {
        empty.signal = AbortSignal.any([empty.signal, timeoutSignal]);
      }
    } else {
      empty.signal = timeoutSignal;
    }
    delete empty.timeout;
  }
  return empty;
}
function patchConfig(config = {}, { callbacks, maxConcurrency, recursionLimit, runName, configurable, runId } = {}) {
  const newConfig = ensureConfig(config);
  if (callbacks !== void 0) {
    delete newConfig.runName;
    newConfig.callbacks = callbacks;
  }
  if (recursionLimit !== void 0) {
    newConfig.recursionLimit = recursionLimit;
  }
  if (maxConcurrency !== void 0) {
    newConfig.maxConcurrency = maxConcurrency;
  }
  if (runName !== void 0) {
    newConfig.runName = runName;
  }
  if (configurable !== void 0) {
    newConfig.configurable = { ...newConfig.configurable, ...configurable };
  }
  if (runId !== void 0) {
    delete newConfig.runId;
  }
  return newConfig;
}
function pickRunnableConfigKeys(config) {
  return config ? {
    configurable: config.configurable,
    recursionLimit: config.recursionLimit,
    callbacks: config.callbacks,
    tags: config.tags,
    metadata: config.metadata,
    maxConcurrency: config.maxConcurrency,
    timeout: config.timeout,
    signal: config.signal
  } : void 0;
}

// node_modules/@langchain/core/dist/utils/signal.js
async function raceWithSignal(promise, signal) {
  if (signal === void 0) {
    return promise;
  }
  let listener;
  return Promise.race([
    promise.catch((err) => {
      if (!signal?.aborted) {
        throw err;
      } else {
        return void 0;
      }
    }),
    new Promise((_, reject) => {
      listener = () => {
        reject(new Error("Aborted"));
      };
      signal.addEventListener("abort", listener);
      if (signal.aborted) {
        reject(new Error("Aborted"));
      }
    })
  ]).finally(() => signal.removeEventListener("abort", listener));
}

// node_modules/@langchain/core/dist/utils/stream.js
var IterableReadableStream = class _IterableReadableStream extends ReadableStream {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "reader", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
  }
  ensureReader() {
    if (!this.reader) {
      this.reader = this.getReader();
    }
  }
  async next() {
    this.ensureReader();
    try {
      const result = await this.reader.read();
      if (result.done) {
        this.reader.releaseLock();
        return {
          done: true,
          value: void 0
        };
      } else {
        return {
          done: false,
          value: result.value
        };
      }
    } catch (e) {
      this.reader.releaseLock();
      throw e;
    }
  }
  async return() {
    this.ensureReader();
    if (this.locked) {
      const cancelPromise = this.reader.cancel();
      this.reader.releaseLock();
      await cancelPromise;
    }
    return { done: true, value: void 0 };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async throw(e) {
    this.ensureReader();
    if (this.locked) {
      const cancelPromise = this.reader.cancel();
      this.reader.releaseLock();
      await cancelPromise;
    }
    throw e;
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Not present in Node 18 types, required in latest Node 22
  async [Symbol.asyncDispose]() {
    await this.return();
  }
  static fromReadableStream(stream) {
    const reader = stream.getReader();
    return new _IterableReadableStream({
      start(controller) {
        return pump();
        function pump() {
          return reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            return pump();
          });
        }
      },
      cancel() {
        reader.releaseLock();
      }
    });
  }
  static fromAsyncGenerator(generator) {
    return new _IterableReadableStream({
      async pull(controller) {
        const { value, done } = await generator.next();
        if (done) {
          controller.close();
        }
        controller.enqueue(value);
      },
      async cancel(reason) {
        await generator.return(reason);
      }
    });
  }
};
function atee(iter, length = 2) {
  const buffers = Array.from({ length }, () => []);
  return buffers.map(async function* makeIter(buffer) {
    while (true) {
      if (buffer.length === 0) {
        const result = await iter.next();
        for (const buffer2 of buffers) {
          buffer2.push(result);
        }
      } else if (buffer[0].done) {
        return;
      } else {
        yield buffer.shift().value;
      }
    }
  });
}
function concat(first, second) {
  if (Array.isArray(first) && Array.isArray(second)) {
    return first.concat(second);
  } else if (typeof first === "string" && typeof second === "string") {
    return first + second;
  } else if (typeof first === "number" && typeof second === "number") {
    return first + second;
  } else if (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "concat" in first && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof first.concat === "function"
  ) {
    return first.concat(second);
  } else if (typeof first === "object" && typeof second === "object") {
    const chunk = { ...first };
    for (const [key, value] of Object.entries(second)) {
      if (key in chunk && !Array.isArray(chunk[key])) {
        chunk[key] = concat(chunk[key], value);
      } else {
        chunk[key] = value;
      }
    }
    return chunk;
  } else {
    throw new Error(`Cannot concat ${typeof first} and ${typeof second}`);
  }
}
var AsyncGeneratorWithSetup = class {
  constructor(params) {
    Object.defineProperty(this, "generator", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "setup", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "config", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "signal", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "firstResult", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "firstResultUsed", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    this.generator = params.generator;
    this.config = params.config;
    this.signal = params.signal ?? this.config?.signal;
    this.setup = new Promise((resolve2, reject) => {
      void AsyncLocalStorageProviderSingleton2.runWithConfig(pickRunnableConfigKeys(params.config), async () => {
        this.firstResult = params.generator.next();
        if (params.startSetup) {
          this.firstResult.then(params.startSetup).then(resolve2, reject);
        } else {
          this.firstResult.then((_result) => resolve2(void 0), reject);
        }
      }, true);
    });
  }
  async next(...args) {
    this.signal?.throwIfAborted();
    if (!this.firstResultUsed) {
      this.firstResultUsed = true;
      return this.firstResult;
    }
    return AsyncLocalStorageProviderSingleton2.runWithConfig(pickRunnableConfigKeys(this.config), this.signal ? async () => {
      return raceWithSignal(this.generator.next(...args), this.signal);
    } : async () => {
      return this.generator.next(...args);
    }, true);
  }
  async return(value) {
    return this.generator.return(value);
  }
  async throw(e) {
    return this.generator.throw(e);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Not present in Node 18 types, required in latest Node 22
  async [Symbol.asyncDispose]() {
    await this.return();
  }
};
async function pipeGeneratorWithSetup(to, generator, startSetup, signal, ...args) {
  const gen = new AsyncGeneratorWithSetup({
    generator,
    startSetup,
    signal
  });
  const setup = await gen.setup;
  return { output: to(gen, setup, ...args), setup };
}

// node_modules/@langchain/core/dist/tracers/log_stream.js
var RunLogPatch = class {
  constructor(fields) {
    Object.defineProperty(this, "ops", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.ops = fields.ops ?? [];
  }
  concat(other) {
    const ops = this.ops.concat(other.ops);
    const states = applyPatch({}, ops);
    return new RunLog({
      ops,
      state: states[states.length - 1].newDocument
    });
  }
};
var RunLog = class _RunLog extends RunLogPatch {
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "state", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.state = fields.state;
  }
  concat(other) {
    const ops = this.ops.concat(other.ops);
    const states = applyPatch(this.state, other.ops);
    return new _RunLog({ ops, state: states[states.length - 1].newDocument });
  }
  static fromRunLogPatch(patch) {
    const states = applyPatch({}, patch.ops);
    return new _RunLog({
      ops: patch.ops,
      state: states[states.length - 1].newDocument
    });
  }
};
var isLogStreamHandler = (handler) => handler.name === "log_stream_tracer";
async function _getStandardizedInputs(run, schemaFormat) {
  if (schemaFormat === "original") {
    throw new Error("Do not assign inputs with original schema drop the key for now. When inputs are added to streamLog they should be added with standardized schema for streaming events.");
  }
  const { inputs } = run;
  if (["retriever", "llm", "prompt"].includes(run.run_type)) {
    return inputs;
  }
  if (Object.keys(inputs).length === 1 && inputs?.input === "") {
    return void 0;
  }
  return inputs.input;
}
async function _getStandardizedOutputs(run, schemaFormat) {
  const { outputs } = run;
  if (schemaFormat === "original") {
    return outputs;
  }
  if (["retriever", "llm", "prompt"].includes(run.run_type)) {
    return outputs;
  }
  if (outputs !== void 0 && Object.keys(outputs).length === 1 && outputs?.output !== void 0) {
    return outputs.output;
  }
  return outputs;
}
function isChatGenerationChunk(x) {
  return x !== void 0 && x.message !== void 0;
}
var LogStreamCallbackHandler = class extends BaseTracer {
  constructor(fields) {
    super({ _awaitHandler: true, ...fields });
    Object.defineProperty(this, "autoClose", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "includeNames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "includeTypes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "includeTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeNames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeTypes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_schemaFormat", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "original"
    });
    Object.defineProperty(this, "rootId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "keyMapByRunId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "counterMapByRunName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "transformStream", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "writer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "receiveStream", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "log_stream_tracer"
    });
    Object.defineProperty(this, "lc_prefer_streaming", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    this.autoClose = fields?.autoClose ?? true;
    this.includeNames = fields?.includeNames;
    this.includeTypes = fields?.includeTypes;
    this.includeTags = fields?.includeTags;
    this.excludeNames = fields?.excludeNames;
    this.excludeTypes = fields?.excludeTypes;
    this.excludeTags = fields?.excludeTags;
    this._schemaFormat = fields?._schemaFormat ?? this._schemaFormat;
    this.transformStream = new TransformStream();
    this.writer = this.transformStream.writable.getWriter();
    this.receiveStream = IterableReadableStream.fromReadableStream(this.transformStream.readable);
  }
  [Symbol.asyncIterator]() {
    return this.receiveStream;
  }
  async persistRun(_run) {
  }
  _includeRun(run) {
    if (run.id === this.rootId) {
      return false;
    }
    const runTags = run.tags ?? [];
    let include = this.includeNames === void 0 && this.includeTags === void 0 && this.includeTypes === void 0;
    if (this.includeNames !== void 0) {
      include = include || this.includeNames.includes(run.name);
    }
    if (this.includeTypes !== void 0) {
      include = include || this.includeTypes.includes(run.run_type);
    }
    if (this.includeTags !== void 0) {
      include = include || runTags.find((tag) => this.includeTags?.includes(tag)) !== void 0;
    }
    if (this.excludeNames !== void 0) {
      include = include && !this.excludeNames.includes(run.name);
    }
    if (this.excludeTypes !== void 0) {
      include = include && !this.excludeTypes.includes(run.run_type);
    }
    if (this.excludeTags !== void 0) {
      include = include && runTags.every((tag) => !this.excludeTags?.includes(tag));
    }
    return include;
  }
  async *tapOutputIterable(runId, output) {
    for await (const chunk of output) {
      if (runId !== this.rootId) {
        const key = this.keyMapByRunId[runId];
        if (key) {
          await this.writer.write(new RunLogPatch({
            ops: [
              {
                op: "add",
                path: `/logs/${key}/streamed_output/-`,
                value: chunk
              }
            ]
          }));
        }
      }
      yield chunk;
    }
  }
  async onRunCreate(run) {
    if (this.rootId === void 0) {
      this.rootId = run.id;
      await this.writer.write(new RunLogPatch({
        ops: [
          {
            op: "replace",
            path: "",
            value: {
              id: run.id,
              name: run.name,
              type: run.run_type,
              streamed_output: [],
              final_output: void 0,
              logs: {}
            }
          }
        ]
      }));
    }
    if (!this._includeRun(run)) {
      return;
    }
    if (this.counterMapByRunName[run.name] === void 0) {
      this.counterMapByRunName[run.name] = 0;
    }
    this.counterMapByRunName[run.name] += 1;
    const count = this.counterMapByRunName[run.name];
    this.keyMapByRunId[run.id] = count === 1 ? run.name : `${run.name}:${count}`;
    const logEntry = {
      id: run.id,
      name: run.name,
      type: run.run_type,
      tags: run.tags ?? [],
      metadata: run.extra?.metadata ?? {},
      start_time: new Date(run.start_time).toISOString(),
      streamed_output: [],
      streamed_output_str: [],
      final_output: void 0,
      end_time: void 0
    };
    if (this._schemaFormat === "streaming_events") {
      logEntry.inputs = await _getStandardizedInputs(run, this._schemaFormat);
    }
    await this.writer.write(new RunLogPatch({
      ops: [
        {
          op: "add",
          path: `/logs/${this.keyMapByRunId[run.id]}`,
          value: logEntry
        }
      ]
    }));
  }
  async onRunUpdate(run) {
    try {
      const runName = this.keyMapByRunId[run.id];
      if (runName === void 0) {
        return;
      }
      const ops = [];
      if (this._schemaFormat === "streaming_events") {
        ops.push({
          op: "replace",
          path: `/logs/${runName}/inputs`,
          value: await _getStandardizedInputs(run, this._schemaFormat)
        });
      }
      ops.push({
        op: "add",
        path: `/logs/${runName}/final_output`,
        value: await _getStandardizedOutputs(run, this._schemaFormat)
      });
      if (run.end_time !== void 0) {
        ops.push({
          op: "add",
          path: `/logs/${runName}/end_time`,
          value: new Date(run.end_time).toISOString()
        });
      }
      const patch = new RunLogPatch({ ops });
      await this.writer.write(patch);
    } finally {
      if (run.id === this.rootId) {
        const patch = new RunLogPatch({
          ops: [
            {
              op: "replace",
              path: "/final_output",
              value: await _getStandardizedOutputs(run, this._schemaFormat)
            }
          ]
        });
        await this.writer.write(patch);
        if (this.autoClose) {
          await this.writer.close();
        }
      }
    }
  }
  async onLLMNewToken(run, token, kwargs) {
    const runName = this.keyMapByRunId[run.id];
    if (runName === void 0) {
      return;
    }
    const isChatModel = run.inputs.messages !== void 0;
    let streamedOutputValue;
    if (isChatModel) {
      if (isChatGenerationChunk(kwargs?.chunk)) {
        streamedOutputValue = kwargs?.chunk;
      } else {
        streamedOutputValue = new AIMessageChunk({
          id: `run-${run.id}`,
          content: token
        });
      }
    } else {
      streamedOutputValue = token;
    }
    const patch = new RunLogPatch({
      ops: [
        {
          op: "add",
          path: `/logs/${runName}/streamed_output_str/-`,
          value: token
        },
        {
          op: "add",
          path: `/logs/${runName}/streamed_output/-`,
          value: streamedOutputValue
        }
      ]
    });
    await this.writer.write(patch);
  }
};

// node_modules/@langchain/core/dist/outputs.js
var RUN_KEY = "__run";
var GenerationChunk = class _GenerationChunk {
  constructor(fields) {
    Object.defineProperty(this, "text", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "generationInfo", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.text = fields.text;
    this.generationInfo = fields.generationInfo;
  }
  concat(chunk) {
    return new _GenerationChunk({
      text: this.text + chunk.text,
      generationInfo: {
        ...this.generationInfo,
        ...chunk.generationInfo
      }
    });
  }
};
var ChatGenerationChunk = class _ChatGenerationChunk extends GenerationChunk {
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "message", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.message = fields.message;
  }
  concat(chunk) {
    return new _ChatGenerationChunk({
      text: this.text + chunk.text,
      generationInfo: {
        ...this.generationInfo,
        ...chunk.generationInfo
      },
      message: this.message.concat(chunk.message)
    });
  }
};

// node_modules/@langchain/core/dist/tracers/event_stream.js
function assignName({ name, serialized }) {
  if (name !== void 0) {
    return name;
  }
  if (serialized?.name !== void 0) {
    return serialized.name;
  } else if (serialized?.id !== void 0 && Array.isArray(serialized?.id)) {
    return serialized.id[serialized.id.length - 1];
  }
  return "Unnamed";
}
var isStreamEventsHandler = (handler) => handler.name === "event_stream_tracer";
var EventStreamCallbackHandler = class extends BaseTracer {
  constructor(fields) {
    super({ _awaitHandler: true, ...fields });
    Object.defineProperty(this, "autoClose", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "includeNames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "includeTypes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "includeTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeNames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeTypes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "runInfoMap", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
    Object.defineProperty(this, "tappedPromises", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
    Object.defineProperty(this, "transformStream", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "writer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "receiveStream", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "event_stream_tracer"
    });
    Object.defineProperty(this, "lc_prefer_streaming", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    this.autoClose = fields?.autoClose ?? true;
    this.includeNames = fields?.includeNames;
    this.includeTypes = fields?.includeTypes;
    this.includeTags = fields?.includeTags;
    this.excludeNames = fields?.excludeNames;
    this.excludeTypes = fields?.excludeTypes;
    this.excludeTags = fields?.excludeTags;
    this.transformStream = new TransformStream();
    this.writer = this.transformStream.writable.getWriter();
    this.receiveStream = IterableReadableStream.fromReadableStream(this.transformStream.readable);
  }
  [Symbol.asyncIterator]() {
    return this.receiveStream;
  }
  async persistRun(_run) {
  }
  _includeRun(run) {
    const runTags = run.tags ?? [];
    let include = this.includeNames === void 0 && this.includeTags === void 0 && this.includeTypes === void 0;
    if (this.includeNames !== void 0) {
      include = include || this.includeNames.includes(run.name);
    }
    if (this.includeTypes !== void 0) {
      include = include || this.includeTypes.includes(run.runType);
    }
    if (this.includeTags !== void 0) {
      include = include || runTags.find((tag) => this.includeTags?.includes(tag)) !== void 0;
    }
    if (this.excludeNames !== void 0) {
      include = include && !this.excludeNames.includes(run.name);
    }
    if (this.excludeTypes !== void 0) {
      include = include && !this.excludeTypes.includes(run.runType);
    }
    if (this.excludeTags !== void 0) {
      include = include && runTags.every((tag) => !this.excludeTags?.includes(tag));
    }
    return include;
  }
  async *tapOutputIterable(runId, outputStream) {
    const firstChunk = await outputStream.next();
    if (firstChunk.done) {
      return;
    }
    const runInfo = this.runInfoMap.get(runId);
    if (runInfo === void 0) {
      yield firstChunk.value;
      return;
    }
    function _formatOutputChunk(eventType, data) {
      if (eventType === "llm" && typeof data === "string") {
        return new GenerationChunk({ text: data });
      }
      return data;
    }
    let tappedPromise = this.tappedPromises.get(runId);
    if (tappedPromise === void 0) {
      let tappedPromiseResolver;
      tappedPromise = new Promise((resolve2) => {
        tappedPromiseResolver = resolve2;
      });
      this.tappedPromises.set(runId, tappedPromise);
      try {
        const event = {
          event: `on_${runInfo.runType}_stream`,
          run_id: runId,
          name: runInfo.name,
          tags: runInfo.tags,
          metadata: runInfo.metadata,
          data: {}
        };
        await this.send({
          ...event,
          data: {
            chunk: _formatOutputChunk(runInfo.runType, firstChunk.value)
          }
        }, runInfo);
        yield firstChunk.value;
        for await (const chunk of outputStream) {
          if (runInfo.runType !== "tool" && runInfo.runType !== "retriever") {
            await this.send({
              ...event,
              data: {
                chunk: _formatOutputChunk(runInfo.runType, chunk)
              }
            }, runInfo);
          }
          yield chunk;
        }
      } finally {
        tappedPromiseResolver();
      }
    } else {
      yield firstChunk.value;
      for await (const chunk of outputStream) {
        yield chunk;
      }
    }
  }
  async send(payload, run) {
    if (this._includeRun(run)) {
      await this.writer.write(payload);
    }
  }
  async sendEndEvent(payload, run) {
    const tappedPromise = this.tappedPromises.get(payload.run_id);
    if (tappedPromise !== void 0) {
      void tappedPromise.then(() => {
        void this.send(payload, run);
      });
    } else {
      await this.send(payload, run);
    }
  }
  async onLLMStart(run) {
    const runName = assignName(run);
    const runType = run.inputs.messages !== void 0 ? "chat_model" : "llm";
    const runInfo = {
      tags: run.tags ?? [],
      metadata: run.extra?.metadata ?? {},
      name: runName,
      runType,
      inputs: run.inputs
    };
    this.runInfoMap.set(run.id, runInfo);
    const eventName = `on_${runType}_start`;
    await this.send({
      event: eventName,
      data: {
        input: run.inputs
      },
      name: runName,
      tags: run.tags ?? [],
      run_id: run.id,
      metadata: run.extra?.metadata ?? {}
    }, runInfo);
  }
  async onLLMNewToken(run, token, kwargs) {
    const runInfo = this.runInfoMap.get(run.id);
    let chunk;
    let eventName;
    if (runInfo === void 0) {
      throw new Error(`onLLMNewToken: Run ID ${run.id} not found in run map.`);
    }
    if (this.runInfoMap.size === 1) {
      return;
    }
    if (runInfo.runType === "chat_model") {
      eventName = "on_chat_model_stream";
      if (kwargs?.chunk === void 0) {
        chunk = new AIMessageChunk({ content: token, id: `run-${run.id}` });
      } else {
        chunk = kwargs.chunk.message;
      }
    } else if (runInfo.runType === "llm") {
      eventName = "on_llm_stream";
      if (kwargs?.chunk === void 0) {
        chunk = new GenerationChunk({ text: token });
      } else {
        chunk = kwargs.chunk;
      }
    } else {
      throw new Error(`Unexpected run type ${runInfo.runType}`);
    }
    await this.send({
      event: eventName,
      data: {
        chunk
      },
      run_id: run.id,
      name: runInfo.name,
      tags: runInfo.tags,
      metadata: runInfo.metadata
    }, runInfo);
  }
  async onLLMEnd(run) {
    const runInfo = this.runInfoMap.get(run.id);
    this.runInfoMap.delete(run.id);
    let eventName;
    if (runInfo === void 0) {
      throw new Error(`onLLMEnd: Run ID ${run.id} not found in run map.`);
    }
    const generations = run.outputs?.generations;
    let output;
    if (runInfo.runType === "chat_model") {
      for (const generation of generations ?? []) {
        if (output !== void 0) {
          break;
        }
        output = generation[0]?.message;
      }
      eventName = "on_chat_model_end";
    } else if (runInfo.runType === "llm") {
      output = {
        generations: generations?.map((generation) => {
          return generation.map((chunk) => {
            return {
              text: chunk.text,
              generationInfo: chunk.generationInfo
            };
          });
        }),
        llmOutput: run.outputs?.llmOutput ?? {}
      };
      eventName = "on_llm_end";
    } else {
      throw new Error(`onLLMEnd: Unexpected run type: ${runInfo.runType}`);
    }
    await this.sendEndEvent({
      event: eventName,
      data: {
        output,
        input: runInfo.inputs
      },
      run_id: run.id,
      name: runInfo.name,
      tags: runInfo.tags,
      metadata: runInfo.metadata
    }, runInfo);
  }
  async onChainStart(run) {
    const runName = assignName(run);
    const runType = run.run_type ?? "chain";
    const runInfo = {
      tags: run.tags ?? [],
      metadata: run.extra?.metadata ?? {},
      name: runName,
      runType: run.run_type
    };
    let eventData = {};
    if (run.inputs.input === "" && Object.keys(run.inputs).length === 1) {
      eventData = {};
      runInfo.inputs = {};
    } else if (run.inputs.input !== void 0) {
      eventData.input = run.inputs.input;
      runInfo.inputs = run.inputs.input;
    } else {
      eventData.input = run.inputs;
      runInfo.inputs = run.inputs;
    }
    this.runInfoMap.set(run.id, runInfo);
    await this.send({
      event: `on_${runType}_start`,
      data: eventData,
      name: runName,
      tags: run.tags ?? [],
      run_id: run.id,
      metadata: run.extra?.metadata ?? {}
    }, runInfo);
  }
  async onChainEnd(run) {
    const runInfo = this.runInfoMap.get(run.id);
    this.runInfoMap.delete(run.id);
    if (runInfo === void 0) {
      throw new Error(`onChainEnd: Run ID ${run.id} not found in run map.`);
    }
    const eventName = `on_${run.run_type}_end`;
    const inputs = run.inputs ?? runInfo.inputs ?? {};
    const outputs = run.outputs?.output ?? run.outputs;
    const data = {
      output: outputs,
      input: inputs
    };
    if (inputs.input && Object.keys(inputs).length === 1) {
      data.input = inputs.input;
      runInfo.inputs = inputs.input;
    }
    await this.sendEndEvent({
      event: eventName,
      data,
      run_id: run.id,
      name: runInfo.name,
      tags: runInfo.tags,
      metadata: runInfo.metadata ?? {}
    }, runInfo);
  }
  async onToolStart(run) {
    const runName = assignName(run);
    const runInfo = {
      tags: run.tags ?? [],
      metadata: run.extra?.metadata ?? {},
      name: runName,
      runType: "tool",
      inputs: run.inputs ?? {}
    };
    this.runInfoMap.set(run.id, runInfo);
    await this.send({
      event: "on_tool_start",
      data: {
        input: run.inputs ?? {}
      },
      name: runName,
      run_id: run.id,
      tags: run.tags ?? [],
      metadata: run.extra?.metadata ?? {}
    }, runInfo);
  }
  async onToolEnd(run) {
    const runInfo = this.runInfoMap.get(run.id);
    this.runInfoMap.delete(run.id);
    if (runInfo === void 0) {
      throw new Error(`onToolEnd: Run ID ${run.id} not found in run map.`);
    }
    if (runInfo.inputs === void 0) {
      throw new Error(`onToolEnd: Run ID ${run.id} is a tool call, and is expected to have traced inputs.`);
    }
    const output = run.outputs?.output === void 0 ? run.outputs : run.outputs.output;
    await this.sendEndEvent({
      event: "on_tool_end",
      data: {
        output,
        input: runInfo.inputs
      },
      run_id: run.id,
      name: runInfo.name,
      tags: runInfo.tags,
      metadata: runInfo.metadata
    }, runInfo);
  }
  async onRetrieverStart(run) {
    const runName = assignName(run);
    const runType = "retriever";
    const runInfo = {
      tags: run.tags ?? [],
      metadata: run.extra?.metadata ?? {},
      name: runName,
      runType,
      inputs: {
        query: run.inputs.query
      }
    };
    this.runInfoMap.set(run.id, runInfo);
    await this.send({
      event: "on_retriever_start",
      data: {
        input: {
          query: run.inputs.query
        }
      },
      name: runName,
      tags: run.tags ?? [],
      run_id: run.id,
      metadata: run.extra?.metadata ?? {}
    }, runInfo);
  }
  async onRetrieverEnd(run) {
    const runInfo = this.runInfoMap.get(run.id);
    this.runInfoMap.delete(run.id);
    if (runInfo === void 0) {
      throw new Error(`onRetrieverEnd: Run ID ${run.id} not found in run map.`);
    }
    await this.sendEndEvent({
      event: "on_retriever_end",
      data: {
        output: run.outputs?.documents ?? run.outputs,
        input: runInfo.inputs
      },
      run_id: run.id,
      name: runInfo.name,
      tags: runInfo.tags,
      metadata: runInfo.metadata
    }, runInfo);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleCustomEvent(eventName, data, runId) {
    const runInfo = this.runInfoMap.get(runId);
    if (runInfo === void 0) {
      throw new Error(`handleCustomEvent: Run ID ${runId} not found in run map.`);
    }
    await this.send({
      event: "on_custom_event",
      run_id: runId,
      name: eventName,
      tags: runInfo.tags,
      metadata: runInfo.metadata,
      data
    }, runInfo);
  }
  async finish() {
    const pendingPromises = [...this.tappedPromises.values()];
    void Promise.all(pendingPromises).finally(() => {
      void this.writer.close();
    });
  }
};

// node_modules/@langchain/core/dist/utils/async_caller.js
var import_p_retry2 = __toESM(require_p_retry(), 1);
var import_p_queue3 = __toESM(require_dist(), 1);
var STATUS_NO_RETRY2 = [
  400,
  401,
  402,
  403,
  404,
  405,
  406,
  407,
  409
  // Conflict
];
var defaultFailedAttemptHandler = (error) => {
  if (error.message.startsWith("Cancel") || error.message.startsWith("AbortError") || error.name === "AbortError") {
    throw error;
  }
  if (error?.code === "ECONNABORTED") {
    throw error;
  }
  const status = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?.response?.status ?? error?.status
  );
  if (status && STATUS_NO_RETRY2.includes(+status)) {
    throw error;
  }
  if (error?.error?.code === "insufficient_quota") {
    const err = new Error(error?.message);
    err.name = "InsufficientQuotaError";
    throw err;
  }
};
var AsyncCaller2 = class {
  constructor(params) {
    Object.defineProperty(this, "maxConcurrency", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "maxRetries", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "onFailedAttempt", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "queue", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxConcurrency = params.maxConcurrency ?? Infinity;
    this.maxRetries = params.maxRetries ?? 6;
    this.onFailedAttempt = params.onFailedAttempt ?? defaultFailedAttemptHandler;
    const PQueue = "default" in import_p_queue3.default ? import_p_queue3.default.default : import_p_queue3.default;
    this.queue = new PQueue({ concurrency: this.maxConcurrency });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call(callable, ...args) {
    return this.queue.add(() => (0, import_p_retry2.default)(() => callable(...args).catch((error) => {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(error);
      }
    }), {
      onFailedAttempt: this.onFailedAttempt,
      retries: this.maxRetries,
      randomize: true
      // If needed we can change some of the defaults here,
      // but they're quite sensible.
    }), { throwOnTimeout: true });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callWithOptions(options, callable, ...args) {
    if (options.signal) {
      return Promise.race([
        this.call(callable, ...args),
        new Promise((_, reject) => {
          options.signal?.addEventListener("abort", () => {
            reject(new Error("AbortError"));
          });
        })
      ]);
    }
    return this.call(callable, ...args);
  }
  fetch(...args) {
    return this.call(() => fetch(...args).then((res) => res.ok ? res : Promise.reject(res)));
  }
};

// node_modules/@langchain/core/dist/tracers/root_listener.js
var RootListenersTracer = class extends BaseTracer {
  constructor({ config, onStart, onEnd, onError }) {
    super({ _awaitHandler: true });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RootListenersTracer"
    });
    Object.defineProperty(this, "rootId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "config", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "argOnStart", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "argOnEnd", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "argOnError", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.config = config;
    this.argOnStart = onStart;
    this.argOnEnd = onEnd;
    this.argOnError = onError;
  }
  /**
   * This is a legacy method only called once for an entire run tree
   * therefore not useful here
   * @param {Run} _ Not used
   */
  persistRun(_) {
    return Promise.resolve();
  }
  async onRunCreate(run) {
    if (this.rootId) {
      return;
    }
    this.rootId = run.id;
    if (this.argOnStart) {
      await this.argOnStart(run, this.config);
    }
  }
  async onRunUpdate(run) {
    if (run.id !== this.rootId) {
      return;
    }
    if (!run.error) {
      if (this.argOnEnd) {
        await this.argOnEnd(run, this.config);
      }
    } else if (this.argOnError) {
      await this.argOnError(run, this.config);
    }
  }
};

// node_modules/@langchain/core/dist/runnables/utils.js
function isRunnableInterface(thing) {
  return thing ? thing.lc_runnable : false;
}
var _RootEventFilter = class {
  constructor(fields) {
    Object.defineProperty(this, "includeNames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "includeTypes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "includeTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeNames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeTypes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.includeNames = fields.includeNames;
    this.includeTypes = fields.includeTypes;
    this.includeTags = fields.includeTags;
    this.excludeNames = fields.excludeNames;
    this.excludeTypes = fields.excludeTypes;
    this.excludeTags = fields.excludeTags;
  }
  includeEvent(event, rootType) {
    let include = this.includeNames === void 0 && this.includeTypes === void 0 && this.includeTags === void 0;
    const eventTags = event.tags ?? [];
    if (this.includeNames !== void 0) {
      include = include || this.includeNames.includes(event.name);
    }
    if (this.includeTypes !== void 0) {
      include = include || this.includeTypes.includes(rootType);
    }
    if (this.includeTags !== void 0) {
      include = include || eventTags.some((tag) => this.includeTags?.includes(tag));
    }
    if (this.excludeNames !== void 0) {
      include = include && !this.excludeNames.includes(event.name);
    }
    if (this.excludeTypes !== void 0) {
      include = include && !this.excludeTypes.includes(rootType);
    }
    if (this.excludeTags !== void 0) {
      include = include && eventTags.every((tag) => !this.excludeTags?.includes(tag));
    }
    return include;
  }
};

// node_modules/@langchain/core/dist/runnables/graph_mermaid.js
function _escapeNodeLabel(nodeLabel) {
  return nodeLabel.replace(/[^a-zA-Z-_0-9]/g, "_");
}
var MARKDOWN_SPECIAL_CHARS = ["*", "_", "`"];
function _generateMermaidGraphStyles(nodeColors) {
  let styles2 = "";
  for (const [className, color2] of Object.entries(nodeColors)) {
    styles2 += `	classDef ${className} ${color2};
`;
  }
  return styles2;
}
function drawMermaid(nodes, edges, config) {
  const { firstNode, lastNode, nodeColors, withStyles = true, curveStyle = "linear", wrapLabelNWords = 9 } = config ?? {};
  let mermaidGraph = withStyles ? `%%{init: {'flowchart': {'curve': '${curveStyle}'}}}%%
graph TD;
` : "graph TD;\n";
  if (withStyles) {
    const defaultClassLabel = "default";
    const formatDict = {
      [defaultClassLabel]: "{0}({1})"
    };
    if (firstNode !== void 0) {
      formatDict[firstNode] = "{0}([{1}]):::first";
    }
    if (lastNode !== void 0) {
      formatDict[lastNode] = "{0}([{1}]):::last";
    }
    for (const [key, node] of Object.entries(nodes)) {
      const nodeName = node.name.split(":").pop() ?? "";
      const label = MARKDOWN_SPECIAL_CHARS.some((char) => nodeName.startsWith(char) && nodeName.endsWith(char)) ? `<p>${nodeName}</p>` : nodeName;
      let finalLabel = label;
      if (Object.keys(node.metadata ?? {}).length) {
        finalLabel += `<hr/><small><em>${Object.entries(node.metadata ?? {}).map(([k, v]) => `${k} = ${v}`).join("\n")}</em></small>`;
      }
      const nodeLabel = (formatDict[key] ?? formatDict[defaultClassLabel]).replace("{0}", _escapeNodeLabel(key)).replace("{1}", finalLabel);
      mermaidGraph += `	${nodeLabel}
`;
    }
  }
  const edgeGroups = {};
  for (const edge of edges) {
    const srcParts = edge.source.split(":");
    const tgtParts = edge.target.split(":");
    const commonPrefix = srcParts.filter((src, i) => src === tgtParts[i]).join(":");
    if (!edgeGroups[commonPrefix]) {
      edgeGroups[commonPrefix] = [];
    }
    edgeGroups[commonPrefix].push(edge);
  }
  const seenSubgraphs = /* @__PURE__ */ new Set();
  function addSubgraph(edges2, prefix) {
    const selfLoop = edges2.length === 1 && edges2[0].source === edges2[0].target;
    if (prefix && !selfLoop) {
      const subgraph = prefix.split(":").pop();
      if (seenSubgraphs.has(subgraph)) {
        throw new Error(`Found duplicate subgraph '${subgraph}' -- this likely means that you're reusing a subgraph node with the same name. Please adjust your graph to have subgraph nodes with unique names.`);
      }
      seenSubgraphs.add(subgraph);
      mermaidGraph += `	subgraph ${subgraph}
`;
    }
    for (const edge of edges2) {
      const { source, target, data, conditional } = edge;
      let edgeLabel = "";
      if (data !== void 0) {
        let edgeData = data;
        const words = edgeData.split(" ");
        if (words.length > wrapLabelNWords) {
          edgeData = Array.from({ length: Math.ceil(words.length / wrapLabelNWords) }, (_, i) => words.slice(i * wrapLabelNWords, (i + 1) * wrapLabelNWords).join(" ")).join("&nbsp;<br>&nbsp;");
        }
        edgeLabel = conditional ? ` -. &nbsp;${edgeData}&nbsp; .-> ` : ` -- &nbsp;${edgeData}&nbsp; --> `;
      } else {
        edgeLabel = conditional ? " -.-> " : " --> ";
      }
      mermaidGraph += `	${_escapeNodeLabel(source)}${edgeLabel}${_escapeNodeLabel(target)};
`;
    }
    for (const nestedPrefix in edgeGroups) {
      if (nestedPrefix.startsWith(`${prefix}:`) && nestedPrefix !== prefix) {
        addSubgraph(edgeGroups[nestedPrefix], nestedPrefix);
      }
    }
    if (prefix && !selfLoop) {
      mermaidGraph += "	end\n";
    }
  }
  addSubgraph(edgeGroups[""] ?? [], "");
  for (const prefix in edgeGroups) {
    if (!prefix.includes(":") && prefix !== "") {
      addSubgraph(edgeGroups[prefix], prefix);
    }
  }
  if (withStyles) {
    mermaidGraph += _generateMermaidGraphStyles(nodeColors ?? {});
  }
  return mermaidGraph;
}
async function drawMermaidPng(mermaidSyntax, config) {
  let { backgroundColor = "white" } = config ?? {};
  const mermaidSyntaxEncoded = btoa(mermaidSyntax);
  if (backgroundColor !== void 0) {
    const hexColorPattern = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    if (!hexColorPattern.test(backgroundColor)) {
      backgroundColor = `!${backgroundColor}`;
    }
  }
  const imageUrl = `https://mermaid.ink/img/${mermaidSyntaxEncoded}?bgColor=${backgroundColor}`;
  const res = await fetch(imageUrl);
  if (!res.ok) {
    throw new Error([
      `Failed to render the graph using the Mermaid.INK API.`,
      `Status code: ${res.status}`,
      `Status text: ${res.statusText}`
    ].join("\n"));
  }
  const content = await res.blob();
  return content;
}

// node_modules/@langchain/core/dist/runnables/graph.js
function nodeDataStr(id, data) {
  if (id !== void 0 && !validate_default(id)) {
    return id;
  } else if (isRunnableInterface(data)) {
    try {
      let dataStr = data.getName();
      dataStr = dataStr.startsWith("Runnable") ? dataStr.slice("Runnable".length) : dataStr;
      return dataStr;
    } catch (error) {
      return data.getName();
    }
  } else {
    return data.name ?? "UnknownSchema";
  }
}
function nodeDataJson(node) {
  if (isRunnableInterface(node.data)) {
    return {
      type: "runnable",
      data: {
        id: node.data.lc_id,
        name: node.data.getName()
      }
    };
  } else {
    return {
      type: "schema",
      data: { ...zodToJsonSchema(node.data.schema), title: node.data.name }
    };
  }
}
var Graph = class _Graph {
  constructor(params) {
    Object.defineProperty(this, "nodes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "edges", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    this.nodes = params?.nodes ?? this.nodes;
    this.edges = params?.edges ?? this.edges;
  }
  // Convert the graph to a JSON-serializable format.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toJSON() {
    const stableNodeIds = {};
    Object.values(this.nodes).forEach((node, i) => {
      stableNodeIds[node.id] = validate_default(node.id) ? i : node.id;
    });
    return {
      nodes: Object.values(this.nodes).map((node) => ({
        id: stableNodeIds[node.id],
        ...nodeDataJson(node)
      })),
      edges: this.edges.map((edge) => {
        const item = {
          source: stableNodeIds[edge.source],
          target: stableNodeIds[edge.target]
        };
        if (typeof edge.data !== "undefined") {
          item.data = edge.data;
        }
        if (typeof edge.conditional !== "undefined") {
          item.conditional = edge.conditional;
        }
        return item;
      })
    };
  }
  addNode(data, id, metadata) {
    if (id !== void 0 && this.nodes[id] !== void 0) {
      throw new Error(`Node with id ${id} already exists`);
    }
    const nodeId = id ?? v4_default();
    const node = {
      id: nodeId,
      data,
      name: nodeDataStr(id, data),
      metadata
    };
    this.nodes[nodeId] = node;
    return node;
  }
  removeNode(node) {
    delete this.nodes[node.id];
    this.edges = this.edges.filter((edge) => edge.source !== node.id && edge.target !== node.id);
  }
  addEdge(source, target, data, conditional) {
    if (this.nodes[source.id] === void 0) {
      throw new Error(`Source node ${source.id} not in graph`);
    }
    if (this.nodes[target.id] === void 0) {
      throw new Error(`Target node ${target.id} not in graph`);
    }
    const edge = {
      source: source.id,
      target: target.id,
      data,
      conditional
    };
    this.edges.push(edge);
    return edge;
  }
  firstNode() {
    return _firstNode(this);
  }
  lastNode() {
    return _lastNode(this);
  }
  /**
   * Add all nodes and edges from another graph.
   * Note this doesn't check for duplicates, nor does it connect the graphs.
   */
  extend(graph, prefix = "") {
    let finalPrefix = prefix;
    const nodeIds = Object.values(graph.nodes).map((node) => node.id);
    if (nodeIds.every(validate_default)) {
      finalPrefix = "";
    }
    const prefixed = (id) => {
      return finalPrefix ? `${finalPrefix}:${id}` : id;
    };
    Object.entries(graph.nodes).forEach(([key, value]) => {
      this.nodes[prefixed(key)] = { ...value, id: prefixed(key) };
    });
    const newEdges = graph.edges.map((edge) => {
      return {
        ...edge,
        source: prefixed(edge.source),
        target: prefixed(edge.target)
      };
    });
    this.edges = [...this.edges, ...newEdges];
    const first = graph.firstNode();
    const last = graph.lastNode();
    return [
      first ? { id: prefixed(first.id), data: first.data } : void 0,
      last ? { id: prefixed(last.id), data: last.data } : void 0
    ];
  }
  trimFirstNode() {
    const firstNode = this.firstNode();
    if (firstNode && _firstNode(this, [firstNode.id])) {
      this.removeNode(firstNode);
    }
  }
  trimLastNode() {
    const lastNode = this.lastNode();
    if (lastNode && _lastNode(this, [lastNode.id])) {
      this.removeNode(lastNode);
    }
  }
  /**
   * Return a new graph with all nodes re-identified,
   * using their unique, readable names where possible.
   */
  reid() {
    const nodeLabels = Object.fromEntries(Object.values(this.nodes).map((node) => [node.id, node.name]));
    const nodeLabelCounts = /* @__PURE__ */ new Map();
    Object.values(nodeLabels).forEach((label) => {
      nodeLabelCounts.set(label, (nodeLabelCounts.get(label) || 0) + 1);
    });
    const getNodeId = (nodeId) => {
      const label = nodeLabels[nodeId];
      if (validate_default(nodeId) && nodeLabelCounts.get(label) === 1) {
        return label;
      } else {
        return nodeId;
      }
    };
    return new _Graph({
      nodes: Object.fromEntries(Object.entries(this.nodes).map(([id, node]) => [
        getNodeId(id),
        { ...node, id: getNodeId(id) }
      ])),
      edges: this.edges.map((edge) => ({
        ...edge,
        source: getNodeId(edge.source),
        target: getNodeId(edge.target)
      }))
    });
  }
  drawMermaid(params) {
    const { withStyles, curveStyle, nodeColors = {
      default: "fill:#f2f0ff,line-height:1.2",
      first: "fill-opacity:0",
      last: "fill:#bfb6fc"
    }, wrapLabelNWords } = params ?? {};
    const graph = this.reid();
    const firstNode = graph.firstNode();
    const lastNode = graph.lastNode();
    return drawMermaid(graph.nodes, graph.edges, {
      firstNode: firstNode?.id,
      lastNode: lastNode?.id,
      withStyles,
      curveStyle,
      nodeColors,
      wrapLabelNWords
    });
  }
  async drawMermaidPng(params) {
    const mermaidSyntax = this.drawMermaid(params);
    return drawMermaidPng(mermaidSyntax, {
      backgroundColor: params?.backgroundColor
    });
  }
};
function _firstNode(graph, exclude = []) {
  const targets = new Set(graph.edges.filter((edge) => !exclude.includes(edge.source)).map((edge) => edge.target));
  const found = [];
  for (const node of Object.values(graph.nodes)) {
    if (!exclude.includes(node.id) && !targets.has(node.id)) {
      found.push(node);
    }
  }
  return found.length === 1 ? found[0] : void 0;
}
function _lastNode(graph, exclude = []) {
  const sources = new Set(graph.edges.filter((edge) => !exclude.includes(edge.target)).map((edge) => edge.source));
  const found = [];
  for (const node of Object.values(graph.nodes)) {
    if (!exclude.includes(node.id) && !sources.has(node.id)) {
      found.push(node);
    }
  }
  return found.length === 1 ? found[0] : void 0;
}

// node_modules/@langchain/core/dist/runnables/wrappers.js
function convertToHttpEventStream(stream) {
  const encoder2 = new TextEncoder();
  const finalStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        controller.enqueue(encoder2.encode(`event: data
data: ${JSON.stringify(chunk)}

`));
      }
      controller.enqueue(encoder2.encode("event: end\n\n"));
      controller.close();
    }
  });
  return IterableReadableStream.fromReadableStream(finalStream);
}

// node_modules/@langchain/core/dist/runnables/iter.js
function isIterableIterator(thing) {
  return typeof thing === "object" && thing !== null && typeof thing[Symbol.iterator] === "function" && // avoid detecting array/set as iterator
  typeof thing.next === "function";
}
var isIterator = (x) => x != null && typeof x === "object" && "next" in x && typeof x.next === "function";
function isAsyncIterable(thing) {
  return typeof thing === "object" && thing !== null && typeof thing[Symbol.asyncIterator] === "function";
}
function* consumeIteratorInContext(context, iter) {
  while (true) {
    const { value, done } = AsyncLocalStorageProviderSingleton2.runWithConfig(pickRunnableConfigKeys(context), iter.next.bind(iter), true);
    if (done) {
      break;
    } else {
      yield value;
    }
  }
}
async function* consumeAsyncIterableInContext(context, iter) {
  const iterator = iter[Symbol.asyncIterator]();
  while (true) {
    const { value, done } = await AsyncLocalStorageProviderSingleton2.runWithConfig(pickRunnableConfigKeys(context), iterator.next.bind(iter), true);
    if (done) {
      break;
    } else {
      yield value;
    }
  }
}

// node_modules/@langchain/core/dist/runnables/base.js
function _coerceToDict2(value, defaultKey) {
  return value && !Array.isArray(value) && // eslint-disable-next-line no-instanceof/no-instanceof
  !(value instanceof Date) && typeof value === "object" ? value : { [defaultKey]: value };
}
var Runnable = class extends Serializable {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "lc_runnable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
  }
  getName(suffix) {
    const name = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.name ?? this.constructor.lc_name() ?? this.constructor.name
    );
    return suffix ? `${name}${suffix}` : name;
  }
  /**
   * Bind arguments to a Runnable, returning a new Runnable.
   * @param kwargs
   * @returns A new RunnableBinding that, when invoked, will apply the bound args.
   *
   * @deprecated Use {@link withConfig} instead. This will be removed in the next breaking release.
   */
  bind(kwargs) {
    return new RunnableBinding({ bound: this, kwargs, config: {} });
  }
  /**
   * Return a new Runnable that maps a list of inputs to a list of outputs,
   * by calling invoke() with each input.
   *
   * @deprecated This will be removed in the next breaking release.
   */
  map() {
    return new RunnableEach({ bound: this });
  }
  /**
   * Add retry logic to an existing runnable.
   * @param fields.stopAfterAttempt The number of attempts to retry.
   * @param fields.onFailedAttempt A function that is called when a retry fails.
   * @returns A new RunnableRetry that, when invoked, will retry according to the parameters.
   */
  withRetry(fields) {
    return new RunnableRetry({
      bound: this,
      kwargs: {},
      config: {},
      maxAttemptNumber: fields?.stopAfterAttempt,
      ...fields
    });
  }
  /**
   * Bind config to a Runnable, returning a new Runnable.
   * @param config New configuration parameters to attach to the new runnable.
   * @returns A new RunnableBinding with a config matching what's passed.
   */
  withConfig(config) {
    return new RunnableBinding({
      bound: this,
      config,
      kwargs: {}
    });
  }
  /**
   * Create a new runnable from the current one that will try invoking
   * other passed fallback runnables if the initial invocation fails.
   * @param fields.fallbacks Other runnables to call if the runnable errors.
   * @returns A new RunnableWithFallbacks.
   */
  withFallbacks(fields) {
    const fallbacks = Array.isArray(fields) ? fields : fields.fallbacks;
    return new RunnableWithFallbacks({
      runnable: this,
      fallbacks
    });
  }
  _getOptionsList(options, length = 0) {
    if (Array.isArray(options) && options.length !== length) {
      throw new Error(`Passed "options" must be an array with the same length as the inputs, but got ${options.length} options for ${length} inputs`);
    }
    if (Array.isArray(options)) {
      return options.map(ensureConfig);
    }
    if (length > 1 && !Array.isArray(options) && options.runId) {
      console.warn("Provided runId will be used only for the first element of the batch.");
      const subsequent = Object.fromEntries(Object.entries(options).filter(([key]) => key !== "runId"));
      return Array.from({ length }, (_, i) => ensureConfig(i === 0 ? options : subsequent));
    }
    return Array.from({ length }, () => ensureConfig(options));
  }
  async batch(inputs, options, batchOptions) {
    const configList = this._getOptionsList(options ?? {}, inputs.length);
    const maxConcurrency = configList[0]?.maxConcurrency ?? batchOptions?.maxConcurrency;
    const caller2 = new AsyncCaller2({
      maxConcurrency,
      onFailedAttempt: (e) => {
        throw e;
      }
    });
    const batchCalls = inputs.map((input, i) => caller2.call(async () => {
      try {
        const result = await this.invoke(input, configList[i]);
        return result;
      } catch (e) {
        if (batchOptions?.returnExceptions) {
          return e;
        }
        throw e;
      }
    }));
    return Promise.all(batchCalls);
  }
  /**
   * Default streaming implementation.
   * Subclasses should override this method if they support streaming output.
   * @param input
   * @param options
   */
  async *_streamIterator(input, options) {
    yield this.invoke(input, options);
  }
  /**
   * Stream output in chunks.
   * @param input
   * @param options
   * @returns A readable stream that is also an iterable.
   */
  async stream(input, options) {
    const config = ensureConfig(options);
    const wrappedGenerator = new AsyncGeneratorWithSetup({
      generator: this._streamIterator(input, config),
      config
    });
    await wrappedGenerator.setup;
    return IterableReadableStream.fromAsyncGenerator(wrappedGenerator);
  }
  _separateRunnableConfigFromCallOptions(options) {
    let runnableConfig;
    if (options === void 0) {
      runnableConfig = ensureConfig(options);
    } else {
      runnableConfig = ensureConfig({
        callbacks: options.callbacks,
        tags: options.tags,
        metadata: options.metadata,
        runName: options.runName,
        configurable: options.configurable,
        recursionLimit: options.recursionLimit,
        maxConcurrency: options.maxConcurrency,
        runId: options.runId,
        timeout: options.timeout,
        signal: options.signal
      });
    }
    const callOptions = { ...options };
    delete callOptions.callbacks;
    delete callOptions.tags;
    delete callOptions.metadata;
    delete callOptions.runName;
    delete callOptions.configurable;
    delete callOptions.recursionLimit;
    delete callOptions.maxConcurrency;
    delete callOptions.runId;
    delete callOptions.timeout;
    delete callOptions.signal;
    return [runnableConfig, callOptions];
  }
  async _callWithConfig(func, input, options) {
    const config = ensureConfig(options);
    const callbackManager_ = await getCallbackManagerForConfig(config);
    const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict2(input, "input"), config.runId, config?.runType, void 0, void 0, config?.runName ?? this.getName());
    delete config.runId;
    let output;
    try {
      const promise = func.call(this, input, config, runManager);
      output = await raceWithSignal(promise, options?.signal);
    } catch (e) {
      await runManager?.handleChainError(e);
      throw e;
    }
    await runManager?.handleChainEnd(_coerceToDict2(output, "output"));
    return output;
  }
  /**
   * Internal method that handles batching and configuration for a runnable
   * It takes a function, input values, and optional configuration, and
   * returns a promise that resolves to the output values.
   * @param func The function to be executed for each input value.
   * @param input The input values to be processed.
   * @param config Optional configuration for the function execution.
   * @returns A promise that resolves to the output values.
   */
  async _batchWithConfig(func, inputs, options, batchOptions) {
    const optionsList = this._getOptionsList(options ?? {}, inputs.length);
    const callbackManagers = await Promise.all(optionsList.map(getCallbackManagerForConfig));
    const runManagers = await Promise.all(callbackManagers.map(async (callbackManager, i) => {
      const handleStartRes = await callbackManager?.handleChainStart(this.toJSON(), _coerceToDict2(inputs[i], "input"), optionsList[i].runId, optionsList[i].runType, void 0, void 0, optionsList[i].runName ?? this.getName());
      delete optionsList[i].runId;
      return handleStartRes;
    }));
    let outputs;
    try {
      const promise = func.call(this, inputs, optionsList, runManagers, batchOptions);
      outputs = await raceWithSignal(promise, optionsList?.[0]?.signal);
    } catch (e) {
      await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(e)));
      throw e;
    }
    await Promise.all(runManagers.map((runManager) => runManager?.handleChainEnd(_coerceToDict2(outputs, "output"))));
    return outputs;
  }
  /**
   * Helper method to transform an Iterator of Input values into an Iterator of
   * Output values, with callbacks.
   * Use this to implement `stream()` or `transform()` in Runnable subclasses.
   */
  async *_transformStreamWithConfig(inputGenerator, transformer, options) {
    let finalInput;
    let finalInputSupported = true;
    let finalOutput;
    let finalOutputSupported = true;
    const config = ensureConfig(options);
    const callbackManager_ = await getCallbackManagerForConfig(config);
    async function* wrapInputForTracing() {
      for await (const chunk of inputGenerator) {
        if (finalInputSupported) {
          if (finalInput === void 0) {
            finalInput = chunk;
          } else {
            try {
              finalInput = concat(finalInput, chunk);
            } catch {
              finalInput = void 0;
              finalInputSupported = false;
            }
          }
        }
        yield chunk;
      }
    }
    let runManager;
    try {
      const pipe = await pipeGeneratorWithSetup(transformer.bind(this), wrapInputForTracing(), async () => callbackManager_?.handleChainStart(this.toJSON(), { input: "" }, config.runId, config.runType, void 0, void 0, config.runName ?? this.getName()), options?.signal, config);
      delete config.runId;
      runManager = pipe.setup;
      const streamEventsHandler = runManager?.handlers.find(isStreamEventsHandler);
      let iterator = pipe.output;
      if (streamEventsHandler !== void 0 && runManager !== void 0) {
        iterator = streamEventsHandler.tapOutputIterable(runManager.runId, iterator);
      }
      const streamLogHandler = runManager?.handlers.find(isLogStreamHandler);
      if (streamLogHandler !== void 0 && runManager !== void 0) {
        iterator = streamLogHandler.tapOutputIterable(runManager.runId, iterator);
      }
      for await (const chunk of iterator) {
        yield chunk;
        if (finalOutputSupported) {
          if (finalOutput === void 0) {
            finalOutput = chunk;
          } else {
            try {
              finalOutput = concat(finalOutput, chunk);
            } catch {
              finalOutput = void 0;
              finalOutputSupported = false;
            }
          }
        }
      }
    } catch (e) {
      await runManager?.handleChainError(e, void 0, void 0, void 0, {
        inputs: _coerceToDict2(finalInput, "input")
      });
      throw e;
    }
    await runManager?.handleChainEnd(finalOutput ?? {}, void 0, void 0, void 0, { inputs: _coerceToDict2(finalInput, "input") });
  }
  getGraph(_) {
    const graph = new Graph();
    const inputNode = graph.addNode({
      name: `${this.getName()}Input`,
      schema: external_exports.any()
    });
    const runnableNode = graph.addNode(this);
    const outputNode = graph.addNode({
      name: `${this.getName()}Output`,
      schema: external_exports.any()
    });
    graph.addEdge(inputNode, runnableNode);
    graph.addEdge(runnableNode, outputNode);
    return graph;
  }
  /**
   * Create a new runnable sequence that runs each individual runnable in series,
   * piping the output of one runnable into another runnable or runnable-like.
   * @param coerceable A runnable, function, or object whose values are functions or runnables.
   * @returns A new runnable sequence.
   */
  pipe(coerceable) {
    return new RunnableSequence({
      first: this,
      last: _coerceToRunnable(coerceable)
    });
  }
  /**
   * Pick keys from the dict output of this runnable. Returns a new runnable.
   */
  pick(keys) {
    return this.pipe(new RunnablePick(keys));
  }
  /**
   * Assigns new fields to the dict output of this runnable. Returns a new runnable.
   */
  assign(mapping) {
    return this.pipe(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      new RunnableAssign(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        new RunnableMap({ steps: mapping })
      )
    );
  }
  /**
   * Default implementation of transform, which buffers input and then calls stream.
   * Subclasses should override this method if they can start producing output while
   * input is still being generated.
   * @param generator
   * @param options
   */
  async *transform(generator, options) {
    let finalChunk;
    for await (const chunk of generator) {
      if (finalChunk === void 0) {
        finalChunk = chunk;
      } else {
        finalChunk = concat(finalChunk, chunk);
      }
    }
    yield* this._streamIterator(finalChunk, ensureConfig(options));
  }
  /**
   * Stream all output from a runnable, as reported to the callback system.
   * This includes all inner runs of LLMs, Retrievers, Tools, etc.
   * Output is streamed as Log objects, which include a list of
   * jsonpatch ops that describe how the state of the run has changed in each
   * step, and the final state of the run.
   * The jsonpatch ops can be applied in order to construct state.
   * @param input
   * @param options
   * @param streamOptions
   */
  async *streamLog(input, options, streamOptions) {
    const logStreamCallbackHandler = new LogStreamCallbackHandler({
      ...streamOptions,
      autoClose: false,
      _schemaFormat: "original"
    });
    const config = ensureConfig(options);
    yield* this._streamLog(input, logStreamCallbackHandler, config);
  }
  async *_streamLog(input, logStreamCallbackHandler, config) {
    const { callbacks } = config;
    if (callbacks === void 0) {
      config.callbacks = [logStreamCallbackHandler];
    } else if (Array.isArray(callbacks)) {
      config.callbacks = callbacks.concat([logStreamCallbackHandler]);
    } else {
      const copiedCallbacks = callbacks.copy();
      copiedCallbacks.addHandler(logStreamCallbackHandler, true);
      config.callbacks = copiedCallbacks;
    }
    const runnableStreamPromise = this.stream(input, config);
    async function consumeRunnableStream() {
      try {
        const runnableStream = await runnableStreamPromise;
        for await (const chunk of runnableStream) {
          const patch = new RunLogPatch({
            ops: [
              {
                op: "add",
                path: "/streamed_output/-",
                value: chunk
              }
            ]
          });
          await logStreamCallbackHandler.writer.write(patch);
        }
      } finally {
        await logStreamCallbackHandler.writer.close();
      }
    }
    const runnableStreamConsumePromise = consumeRunnableStream();
    try {
      for await (const log of logStreamCallbackHandler) {
        yield log;
      }
    } finally {
      await runnableStreamConsumePromise;
    }
  }
  streamEvents(input, options, streamOptions) {
    let stream;
    if (options.version === "v1") {
      stream = this._streamEventsV1(input, options, streamOptions);
    } else if (options.version === "v2") {
      stream = this._streamEventsV2(input, options, streamOptions);
    } else {
      throw new Error(`Only versions "v1" and "v2" of the schema are currently supported.`);
    }
    if (options.encoding === "text/event-stream") {
      return convertToHttpEventStream(stream);
    } else {
      return IterableReadableStream.fromAsyncGenerator(stream);
    }
  }
  async *_streamEventsV2(input, options, streamOptions) {
    const eventStreamer = new EventStreamCallbackHandler({
      ...streamOptions,
      autoClose: false
    });
    const config = ensureConfig(options);
    const runId = config.runId ?? v4_default();
    config.runId = runId;
    const callbacks = config.callbacks;
    if (callbacks === void 0) {
      config.callbacks = [eventStreamer];
    } else if (Array.isArray(callbacks)) {
      config.callbacks = callbacks.concat(eventStreamer);
    } else {
      const copiedCallbacks = callbacks.copy();
      copiedCallbacks.addHandler(eventStreamer, true);
      config.callbacks = copiedCallbacks;
    }
    const abortController = new AbortController();
    const outerThis = this;
    async function consumeRunnableStream() {
      try {
        let signal;
        if (options?.signal) {
          if ("any" in AbortSignal) {
            signal = AbortSignal.any([
              abortController.signal,
              options.signal
            ]);
          } else {
            signal = options.signal;
            options.signal.addEventListener("abort", () => {
              abortController.abort();
            }, { once: true });
          }
        } else {
          signal = abortController.signal;
        }
        const runnableStream = await outerThis.stream(input, {
          ...config,
          signal
        });
        const tappedStream = eventStreamer.tapOutputIterable(runId, runnableStream);
        for await (const _ of tappedStream) {
          if (abortController.signal.aborted)
            break;
        }
      } finally {
        await eventStreamer.finish();
      }
    }
    const runnableStreamConsumePromise = consumeRunnableStream();
    let firstEventSent = false;
    let firstEventRunId;
    try {
      for await (const event of eventStreamer) {
        if (!firstEventSent) {
          event.data.input = input;
          firstEventSent = true;
          firstEventRunId = event.run_id;
          yield event;
          continue;
        }
        if (event.run_id === firstEventRunId && event.event.endsWith("_end")) {
          if (event.data?.input) {
            delete event.data.input;
          }
        }
        yield event;
      }
    } finally {
      abortController.abort();
      await runnableStreamConsumePromise;
    }
  }
  async *_streamEventsV1(input, options, streamOptions) {
    let runLog;
    let hasEncounteredStartEvent = false;
    const config = ensureConfig(options);
    const rootTags = config.tags ?? [];
    const rootMetadata = config.metadata ?? {};
    const rootName = config.runName ?? this.getName();
    const logStreamCallbackHandler = new LogStreamCallbackHandler({
      ...streamOptions,
      autoClose: false,
      _schemaFormat: "streaming_events"
    });
    const rootEventFilter = new _RootEventFilter({
      ...streamOptions
    });
    const logStream = this._streamLog(input, logStreamCallbackHandler, config);
    for await (const log of logStream) {
      if (!runLog) {
        runLog = RunLog.fromRunLogPatch(log);
      } else {
        runLog = runLog.concat(log);
      }
      if (runLog.state === void 0) {
        throw new Error(`Internal error: "streamEvents" state is missing. Please open a bug report.`);
      }
      if (!hasEncounteredStartEvent) {
        hasEncounteredStartEvent = true;
        const state3 = { ...runLog.state };
        const event = {
          run_id: state3.id,
          event: `on_${state3.type}_start`,
          name: rootName,
          tags: rootTags,
          metadata: rootMetadata,
          data: {
            input
          }
        };
        if (rootEventFilter.includeEvent(event, state3.type)) {
          yield event;
        }
      }
      const paths = log.ops.filter((op) => op.path.startsWith("/logs/")).map((op) => op.path.split("/")[2]);
      const dedupedPaths = [...new Set(paths)];
      for (const path of dedupedPaths) {
        let eventType;
        let data = {};
        const logEntry = runLog.state.logs[path];
        if (logEntry.end_time === void 0) {
          if (logEntry.streamed_output.length > 0) {
            eventType = "stream";
          } else {
            eventType = "start";
          }
        } else {
          eventType = "end";
        }
        if (eventType === "start") {
          if (logEntry.inputs !== void 0) {
            data.input = logEntry.inputs;
          }
        } else if (eventType === "end") {
          if (logEntry.inputs !== void 0) {
            data.input = logEntry.inputs;
          }
          data.output = logEntry.final_output;
        } else if (eventType === "stream") {
          const chunkCount = logEntry.streamed_output.length;
          if (chunkCount !== 1) {
            throw new Error(`Expected exactly one chunk of streamed output, got ${chunkCount} instead. Encountered in: "${logEntry.name}"`);
          }
          data = { chunk: logEntry.streamed_output[0] };
          logEntry.streamed_output = [];
        }
        yield {
          event: `on_${logEntry.type}_${eventType}`,
          name: logEntry.name,
          run_id: logEntry.id,
          tags: logEntry.tags,
          metadata: logEntry.metadata,
          data
        };
      }
      const { state: state2 } = runLog;
      if (state2.streamed_output.length > 0) {
        const chunkCount = state2.streamed_output.length;
        if (chunkCount !== 1) {
          throw new Error(`Expected exactly one chunk of streamed output, got ${chunkCount} instead. Encountered in: "${state2.name}"`);
        }
        const data = { chunk: state2.streamed_output[0] };
        state2.streamed_output = [];
        const event = {
          event: `on_${state2.type}_stream`,
          run_id: state2.id,
          tags: rootTags,
          metadata: rootMetadata,
          name: rootName,
          data
        };
        if (rootEventFilter.includeEvent(event, state2.type)) {
          yield event;
        }
      }
    }
    const state = runLog?.state;
    if (state !== void 0) {
      const event = {
        event: `on_${state.type}_end`,
        name: rootName,
        run_id: state.id,
        tags: rootTags,
        metadata: rootMetadata,
        data: {
          output: state.final_output
        }
      };
      if (rootEventFilter.includeEvent(event, state.type))
        yield event;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isRunnable(thing) {
    return isRunnableInterface(thing);
  }
  /**
   * Bind lifecycle listeners to a Runnable, returning a new Runnable.
   * The Run object contains information about the run, including its id,
   * type, input, output, error, startTime, endTime, and any tags or metadata
   * added to the run.
   *
   * @param {Object} params - The object containing the callback functions.
   * @param {(run: Run) => void} params.onStart - Called before the runnable starts running, with the Run object.
   * @param {(run: Run) => void} params.onEnd - Called after the runnable finishes running, with the Run object.
   * @param {(run: Run) => void} params.onError - Called if the runnable throws an error, with the Run object.
   */
  withListeners({ onStart, onEnd, onError }) {
    return new RunnableBinding({
      bound: this,
      config: {},
      configFactories: [
        (config) => ({
          callbacks: [
            new RootListenersTracer({
              config,
              onStart,
              onEnd,
              onError
            })
          ]
        })
      ]
    });
  }
  /**
   * Convert a runnable to a tool. Return a new instance of `RunnableToolLike`
   * which contains the runnable, name, description and schema.
   *
   * @template {T extends RunInput = RunInput} RunInput - The input type of the runnable. Should be the same as the `RunInput` type of the runnable.
   *
   * @param fields
   * @param {string | undefined} [fields.name] The name of the tool. If not provided, it will default to the name of the runnable.
   * @param {string | undefined} [fields.description] The description of the tool. Falls back to the description on the Zod schema if not provided, or undefined if neither are provided.
   * @param {z.ZodType<T>} [fields.schema] The Zod schema for the input of the tool. Infers the Zod type from the input type of the runnable.
   * @returns {RunnableToolLike<z.ZodType<T>, RunOutput>} An instance of `RunnableToolLike` which is a runnable that can be used as a tool.
   */
  asTool(fields) {
    return convertRunnableToTool(this, fields);
  }
};
var RunnableBinding = class _RunnableBinding extends Runnable {
  static lc_name() {
    return "RunnableBinding";
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "bound", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "config", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "kwargs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "configFactories", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.bound = fields.bound;
    this.kwargs = fields.kwargs;
    this.config = fields.config;
    this.configFactories = fields.configFactories;
  }
  getName(suffix) {
    return this.bound.getName(suffix);
  }
  async _mergeConfig(...options) {
    const config = mergeConfigs(this.config, ...options);
    return mergeConfigs(config, ...this.configFactories ? await Promise.all(this.configFactories.map(async (configFactory) => await configFactory(config))) : []);
  }
  /**
   * Binds the runnable with the specified arguments.
   * @param kwargs The arguments to bind the runnable with.
   * @returns A new instance of the `RunnableBinding` class that is bound with the specified arguments.
   *
   * @deprecated Use {@link withConfig} instead. This will be removed in the next breaking release.
   */
  bind(kwargs) {
    return new this.constructor({
      bound: this.bound,
      kwargs: { ...this.kwargs, ...kwargs },
      config: this.config
    });
  }
  withConfig(config) {
    return new this.constructor({
      bound: this.bound,
      kwargs: this.kwargs,
      config: { ...this.config, ...config }
    });
  }
  withRetry(fields) {
    return new RunnableRetry({
      bound: this.bound,
      kwargs: this.kwargs,
      config: this.config,
      maxAttemptNumber: fields?.stopAfterAttempt,
      ...fields
    });
  }
  async invoke(input, options) {
    return this.bound.invoke(input, await this._mergeConfig(ensureConfig(options), this.kwargs));
  }
  async batch(inputs, options, batchOptions) {
    const mergedOptions = Array.isArray(options) ? await Promise.all(options.map(async (individualOption) => this._mergeConfig(ensureConfig(individualOption), this.kwargs))) : await this._mergeConfig(ensureConfig(options), this.kwargs);
    return this.bound.batch(inputs, mergedOptions, batchOptions);
  }
  async *_streamIterator(input, options) {
    yield* this.bound._streamIterator(input, await this._mergeConfig(ensureConfig(options), this.kwargs));
  }
  async stream(input, options) {
    return this.bound.stream(input, await this._mergeConfig(ensureConfig(options), this.kwargs));
  }
  async *transform(generator, options) {
    yield* this.bound.transform(generator, await this._mergeConfig(ensureConfig(options), this.kwargs));
  }
  streamEvents(input, options, streamOptions) {
    const outerThis = this;
    const generator = async function* () {
      yield* outerThis.bound.streamEvents(input, {
        ...await outerThis._mergeConfig(ensureConfig(options), outerThis.kwargs),
        version: options.version
      }, streamOptions);
    };
    return IterableReadableStream.fromAsyncGenerator(generator());
  }
  static isRunnableBinding(thing) {
    return thing.bound && Runnable.isRunnable(thing.bound);
  }
  /**
   * Bind lifecycle listeners to a Runnable, returning a new Runnable.
   * The Run object contains information about the run, including its id,
   * type, input, output, error, startTime, endTime, and any tags or metadata
   * added to the run.
   *
   * @param {Object} params - The object containing the callback functions.
   * @param {(run: Run) => void} params.onStart - Called before the runnable starts running, with the Run object.
   * @param {(run: Run) => void} params.onEnd - Called after the runnable finishes running, with the Run object.
   * @param {(run: Run) => void} params.onError - Called if the runnable throws an error, with the Run object.
   */
  withListeners({ onStart, onEnd, onError }) {
    return new _RunnableBinding({
      bound: this.bound,
      kwargs: this.kwargs,
      config: this.config,
      configFactories: [
        (config) => ({
          callbacks: [
            new RootListenersTracer({
              config,
              onStart,
              onEnd,
              onError
            })
          ]
        })
      ]
    });
  }
};
var RunnableEach = class _RunnableEach extends Runnable {
  static lc_name() {
    return "RunnableEach";
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "bound", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.bound = fields.bound;
  }
  /**
   * Binds the runnable with the specified arguments.
   * @param kwargs The arguments to bind the runnable with.
   * @returns A new instance of the `RunnableEach` class that is bound with the specified arguments.
   *
   * @deprecated Use {@link withConfig} instead. This will be removed in the next breaking release.
   */
  bind(kwargs) {
    return new _RunnableEach({
      bound: this.bound.bind(kwargs)
    });
  }
  /**
   * Invokes the runnable with the specified input and configuration.
   * @param input The input to invoke the runnable with.
   * @param config The configuration to invoke the runnable with.
   * @returns A promise that resolves to the output of the runnable.
   */
  async invoke(inputs, config) {
    return this._callWithConfig(this._invoke.bind(this), inputs, config);
  }
  /**
   * A helper method that is used to invoke the runnable with the specified input and configuration.
   * @param input The input to invoke the runnable with.
   * @param config The configuration to invoke the runnable with.
   * @returns A promise that resolves to the output of the runnable.
   */
  async _invoke(inputs, config, runManager) {
    return this.bound.batch(inputs, patchConfig(config, { callbacks: runManager?.getChild() }));
  }
  /**
   * Bind lifecycle listeners to a Runnable, returning a new Runnable.
   * The Run object contains information about the run, including its id,
   * type, input, output, error, startTime, endTime, and any tags or metadata
   * added to the run.
   *
   * @param {Object} params - The object containing the callback functions.
   * @param {(run: Run) => void} params.onStart - Called before the runnable starts running, with the Run object.
   * @param {(run: Run) => void} params.onEnd - Called after the runnable finishes running, with the Run object.
   * @param {(run: Run) => void} params.onError - Called if the runnable throws an error, with the Run object.
   */
  withListeners({ onStart, onEnd, onError }) {
    return new _RunnableEach({
      bound: this.bound.withListeners({ onStart, onEnd, onError })
    });
  }
};
var RunnableRetry = class extends RunnableBinding {
  static lc_name() {
    return "RunnableRetry";
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "maxAttemptNumber", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 3
    });
    Object.defineProperty(this, "onFailedAttempt", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => {
      }
    });
    this.maxAttemptNumber = fields.maxAttemptNumber ?? this.maxAttemptNumber;
    this.onFailedAttempt = fields.onFailedAttempt ?? this.onFailedAttempt;
  }
  _patchConfigForRetry(attempt, config, runManager) {
    const tag = attempt > 1 ? `retry:attempt:${attempt}` : void 0;
    return patchConfig(config, { callbacks: runManager?.getChild(tag) });
  }
  async _invoke(input, config, runManager) {
    return (0, import_p_retry3.default)((attemptNumber) => super.invoke(input, this._patchConfigForRetry(attemptNumber, config, runManager)), {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onFailedAttempt: (error) => this.onFailedAttempt(error, input),
      retries: Math.max(this.maxAttemptNumber - 1, 0),
      randomize: true
    });
  }
  /**
   * Method that invokes the runnable with the specified input, run manager,
   * and config. It handles the retry logic by catching any errors and
   * recursively invoking itself with the updated config for the next retry
   * attempt.
   * @param input The input for the runnable.
   * @param runManager The run manager for the runnable.
   * @param config The config for the runnable.
   * @returns A promise that resolves to the output of the runnable.
   */
  async invoke(input, config) {
    return this._callWithConfig(this._invoke.bind(this), input, config);
  }
  async _batch(inputs, configs, runManagers, batchOptions) {
    const resultsMap = {};
    try {
      await (0, import_p_retry3.default)(async (attemptNumber) => {
        const remainingIndexes = inputs.map((_, i) => i).filter((i) => resultsMap[i.toString()] === void 0 || // eslint-disable-next-line no-instanceof/no-instanceof
        resultsMap[i.toString()] instanceof Error);
        const remainingInputs = remainingIndexes.map((i) => inputs[i]);
        const patchedConfigs = remainingIndexes.map((i) => this._patchConfigForRetry(attemptNumber, configs?.[i], runManagers?.[i]));
        const results = await super.batch(remainingInputs, patchedConfigs, {
          ...batchOptions,
          returnExceptions: true
        });
        let firstException;
        for (let i = 0; i < results.length; i += 1) {
          const result = results[i];
          const resultMapIndex = remainingIndexes[i];
          if (result instanceof Error) {
            if (firstException === void 0) {
              firstException = result;
              firstException.input = remainingInputs[i];
            }
          }
          resultsMap[resultMapIndex.toString()] = result;
        }
        if (firstException) {
          throw firstException;
        }
        return results;
      }, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onFailedAttempt: (error) => this.onFailedAttempt(error, error.input),
        retries: Math.max(this.maxAttemptNumber - 1, 0),
        randomize: true
      });
    } catch (e) {
      if (batchOptions?.returnExceptions !== true) {
        throw e;
      }
    }
    return Object.keys(resultsMap).sort((a, b) => parseInt(a, 10) - parseInt(b, 10)).map((key) => resultsMap[parseInt(key, 10)]);
  }
  async batch(inputs, options, batchOptions) {
    return this._batchWithConfig(this._batch.bind(this), inputs, options, batchOptions);
  }
};
var RunnableSequence = class _RunnableSequence extends Runnable {
  static lc_name() {
    return "RunnableSequence";
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "first", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "middle", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "last", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "omitSequenceTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    this.first = fields.first;
    this.middle = fields.middle ?? this.middle;
    this.last = fields.last;
    this.name = fields.name;
    this.omitSequenceTags = fields.omitSequenceTags ?? this.omitSequenceTags;
  }
  get steps() {
    return [this.first, ...this.middle, this.last];
  }
  async invoke(input, options) {
    const config = ensureConfig(options);
    const callbackManager_ = await getCallbackManagerForConfig(config);
    const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict2(input, "input"), config.runId, void 0, void 0, void 0, config?.runName);
    delete config.runId;
    let nextStepInput = input;
    let finalOutput;
    try {
      const initialSteps = [this.first, ...this.middle];
      for (let i = 0; i < initialSteps.length; i += 1) {
        const step = initialSteps[i];
        const promise = step.invoke(nextStepInput, patchConfig(config, {
          callbacks: runManager?.getChild(this.omitSequenceTags ? void 0 : `seq:step:${i + 1}`)
        }));
        nextStepInput = await raceWithSignal(promise, options?.signal);
      }
      if (options?.signal?.aborted) {
        throw new Error("Aborted");
      }
      finalOutput = await this.last.invoke(nextStepInput, patchConfig(config, {
        callbacks: runManager?.getChild(this.omitSequenceTags ? void 0 : `seq:step:${this.steps.length}`)
      }));
    } catch (e) {
      await runManager?.handleChainError(e);
      throw e;
    }
    await runManager?.handleChainEnd(_coerceToDict2(finalOutput, "output"));
    return finalOutput;
  }
  async batch(inputs, options, batchOptions) {
    const configList = this._getOptionsList(options ?? {}, inputs.length);
    const callbackManagers = await Promise.all(configList.map(getCallbackManagerForConfig));
    const runManagers = await Promise.all(callbackManagers.map(async (callbackManager, i) => {
      const handleStartRes = await callbackManager?.handleChainStart(this.toJSON(), _coerceToDict2(inputs[i], "input"), configList[i].runId, void 0, void 0, void 0, configList[i].runName);
      delete configList[i].runId;
      return handleStartRes;
    }));
    let nextStepInputs = inputs;
    try {
      for (let i = 0; i < this.steps.length; i += 1) {
        const step = this.steps[i];
        const promise = step.batch(nextStepInputs, runManagers.map((runManager, j) => {
          const childRunManager = runManager?.getChild(this.omitSequenceTags ? void 0 : `seq:step:${i + 1}`);
          return patchConfig(configList[j], { callbacks: childRunManager });
        }), batchOptions);
        nextStepInputs = await raceWithSignal(promise, configList[0]?.signal);
      }
    } catch (e) {
      await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(e)));
      throw e;
    }
    await Promise.all(runManagers.map((runManager) => runManager?.handleChainEnd(_coerceToDict2(nextStepInputs, "output"))));
    return nextStepInputs;
  }
  async *_streamIterator(input, options) {
    const callbackManager_ = await getCallbackManagerForConfig(options);
    const { runId, ...otherOptions } = options ?? {};
    const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict2(input, "input"), runId, void 0, void 0, void 0, otherOptions?.runName);
    const steps = [this.first, ...this.middle, this.last];
    let concatSupported = true;
    let finalOutput;
    async function* inputGenerator() {
      yield input;
    }
    try {
      let finalGenerator = steps[0].transform(inputGenerator(), patchConfig(otherOptions, {
        callbacks: runManager?.getChild(this.omitSequenceTags ? void 0 : `seq:step:1`)
      }));
      for (let i = 1; i < steps.length; i += 1) {
        const step = steps[i];
        finalGenerator = await step.transform(finalGenerator, patchConfig(otherOptions, {
          callbacks: runManager?.getChild(this.omitSequenceTags ? void 0 : `seq:step:${i + 1}`)
        }));
      }
      for await (const chunk of finalGenerator) {
        options?.signal?.throwIfAborted();
        yield chunk;
        if (concatSupported) {
          if (finalOutput === void 0) {
            finalOutput = chunk;
          } else {
            try {
              finalOutput = concat(finalOutput, chunk);
            } catch (e) {
              finalOutput = void 0;
              concatSupported = false;
            }
          }
        }
      }
    } catch (e) {
      await runManager?.handleChainError(e);
      throw e;
    }
    await runManager?.handleChainEnd(_coerceToDict2(finalOutput, "output"));
  }
  getGraph(config) {
    const graph = new Graph();
    let currentLastNode = null;
    this.steps.forEach((step, index2) => {
      const stepGraph = step.getGraph(config);
      if (index2 !== 0) {
        stepGraph.trimFirstNode();
      }
      if (index2 !== this.steps.length - 1) {
        stepGraph.trimLastNode();
      }
      graph.extend(stepGraph);
      const stepFirstNode = stepGraph.firstNode();
      if (!stepFirstNode) {
        throw new Error(`Runnable ${step} has no first node`);
      }
      if (currentLastNode) {
        graph.addEdge(currentLastNode, stepFirstNode);
      }
      currentLastNode = stepGraph.lastNode();
    });
    return graph;
  }
  pipe(coerceable) {
    if (_RunnableSequence.isRunnableSequence(coerceable)) {
      return new _RunnableSequence({
        first: this.first,
        middle: this.middle.concat([
          this.last,
          coerceable.first,
          ...coerceable.middle
        ]),
        last: coerceable.last,
        name: this.name ?? coerceable.name
      });
    } else {
      return new _RunnableSequence({
        first: this.first,
        middle: [...this.middle, this.last],
        last: _coerceToRunnable(coerceable),
        name: this.name
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isRunnableSequence(thing) {
    return Array.isArray(thing.middle) && Runnable.isRunnable(thing);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static from([first, ...runnables], nameOrFields) {
    let extra = {};
    if (typeof nameOrFields === "string") {
      extra.name = nameOrFields;
    } else if (nameOrFields !== void 0) {
      extra = nameOrFields;
    }
    return new _RunnableSequence({
      ...extra,
      first: _coerceToRunnable(first),
      middle: runnables.slice(0, -1).map(_coerceToRunnable),
      last: _coerceToRunnable(runnables[runnables.length - 1])
    });
  }
};
var RunnableMap = class _RunnableMap extends Runnable {
  static lc_name() {
    return "RunnableMap";
  }
  getStepsKeys() {
    return Object.keys(this.steps);
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "steps", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.steps = {};
    for (const [key, value] of Object.entries(fields.steps)) {
      this.steps[key] = _coerceToRunnable(value);
    }
  }
  static from(steps) {
    return new _RunnableMap({ steps });
  }
  async invoke(input, options) {
    const config = ensureConfig(options);
    const callbackManager_ = await getCallbackManagerForConfig(config);
    const runManager = await callbackManager_?.handleChainStart(this.toJSON(), {
      input
    }, config.runId, void 0, void 0, void 0, config?.runName);
    delete config.runId;
    const output = {};
    try {
      const promises2 = Object.entries(this.steps).map(async ([key, runnable]) => {
        output[key] = await runnable.invoke(input, patchConfig(config, {
          callbacks: runManager?.getChild(`map:key:${key}`)
        }));
      });
      await raceWithSignal(Promise.all(promises2), options?.signal);
    } catch (e) {
      await runManager?.handleChainError(e);
      throw e;
    }
    await runManager?.handleChainEnd(output);
    return output;
  }
  async *_transform(generator, runManager, options) {
    const steps = { ...this.steps };
    const inputCopies = atee(generator, Object.keys(steps).length);
    const tasks = new Map(Object.entries(steps).map(([key, runnable], i) => {
      const gen = runnable.transform(inputCopies[i], patchConfig(options, {
        callbacks: runManager?.getChild(`map:key:${key}`)
      }));
      return [key, gen.next().then((result) => ({ key, gen, result }))];
    }));
    while (tasks.size) {
      const promise = Promise.race(tasks.values());
      const { key, result, gen } = await raceWithSignal(promise, options?.signal);
      tasks.delete(key);
      if (!result.done) {
        yield { [key]: result.value };
        tasks.set(key, gen.next().then((result2) => ({ key, gen, result: result2 })));
      }
    }
  }
  transform(generator, options) {
    return this._transformStreamWithConfig(generator, this._transform.bind(this), options);
  }
  async stream(input, options) {
    async function* generator() {
      yield input;
    }
    const config = ensureConfig(options);
    const wrappedGenerator = new AsyncGeneratorWithSetup({
      generator: this.transform(generator(), config),
      config
    });
    await wrappedGenerator.setup;
    return IterableReadableStream.fromAsyncGenerator(wrappedGenerator);
  }
};
var RunnableTraceable = class _RunnableTraceable extends Runnable {
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "func", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (!isTraceableFunction(fields.func)) {
      throw new Error("RunnableTraceable requires a function that is wrapped in traceable higher-order function");
    }
    this.func = fields.func;
  }
  async invoke(input, options) {
    const [config] = this._getOptionsList(options ?? {}, 1);
    const callbacks = await getCallbackManagerForConfig(config);
    const promise = this.func(patchConfig(config, { callbacks }), input);
    return raceWithSignal(promise, config?.signal);
  }
  async *_streamIterator(input, options) {
    const [config] = this._getOptionsList(options ?? {}, 1);
    const result = await this.invoke(input, options);
    if (isAsyncIterable(result)) {
      for await (const item of result) {
        config?.signal?.throwIfAborted();
        yield item;
      }
      return;
    }
    if (isIterator(result)) {
      while (true) {
        config?.signal?.throwIfAborted();
        const state = result.next();
        if (state.done)
          break;
        yield state.value;
      }
      return;
    }
    yield result;
  }
  static from(func) {
    return new _RunnableTraceable({ func });
  }
};
function assertNonTraceableFunction(func) {
  if (isTraceableFunction(func)) {
    throw new Error("RunnableLambda requires a function that is not wrapped in traceable higher-order function. This shouldn't happen.");
  }
}
var RunnableLambda = class _RunnableLambda extends Runnable {
  static lc_name() {
    return "RunnableLambda";
  }
  constructor(fields) {
    if (isTraceableFunction(fields.func)) {
      return RunnableTraceable.from(fields.func);
    }
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "func", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    assertNonTraceableFunction(fields.func);
    this.func = fields.func;
  }
  static from(func) {
    return new _RunnableLambda({
      func
    });
  }
  async _invoke(input, config, runManager) {
    return new Promise((resolve2, reject) => {
      const childConfig = patchConfig(config, {
        callbacks: runManager?.getChild(),
        recursionLimit: (config?.recursionLimit ?? DEFAULT_RECURSION_LIMIT) - 1
      });
      void AsyncLocalStorageProviderSingleton2.runWithConfig(pickRunnableConfigKeys(childConfig), async () => {
        try {
          let output = await this.func(input, {
            ...childConfig
          });
          if (output && Runnable.isRunnable(output)) {
            if (config?.recursionLimit === 0) {
              throw new Error("Recursion limit reached.");
            }
            output = await output.invoke(input, {
              ...childConfig,
              recursionLimit: (childConfig.recursionLimit ?? DEFAULT_RECURSION_LIMIT) - 1
            });
          } else if (isAsyncIterable(output)) {
            let finalOutput;
            for await (const chunk of consumeAsyncIterableInContext(childConfig, output)) {
              config?.signal?.throwIfAborted();
              if (finalOutput === void 0) {
                finalOutput = chunk;
              } else {
                try {
                  finalOutput = concat(finalOutput, chunk);
                } catch (e) {
                  finalOutput = chunk;
                }
              }
            }
            output = finalOutput;
          } else if (isIterableIterator(output)) {
            let finalOutput;
            for (const chunk of consumeIteratorInContext(childConfig, output)) {
              config?.signal?.throwIfAborted();
              if (finalOutput === void 0) {
                finalOutput = chunk;
              } else {
                try {
                  finalOutput = concat(finalOutput, chunk);
                } catch (e) {
                  finalOutput = chunk;
                }
              }
            }
            output = finalOutput;
          }
          resolve2(output);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  async invoke(input, options) {
    return this._callWithConfig(this._invoke.bind(this), input, options);
  }
  async *_transform(generator, runManager, config) {
    let finalChunk;
    for await (const chunk of generator) {
      if (finalChunk === void 0) {
        finalChunk = chunk;
      } else {
        try {
          finalChunk = concat(finalChunk, chunk);
        } catch (e) {
          finalChunk = chunk;
        }
      }
    }
    const childConfig = patchConfig(config, {
      callbacks: runManager?.getChild(),
      recursionLimit: (config?.recursionLimit ?? DEFAULT_RECURSION_LIMIT) - 1
    });
    const output = await new Promise((resolve2, reject) => {
      void AsyncLocalStorageProviderSingleton2.runWithConfig(pickRunnableConfigKeys(childConfig), async () => {
        try {
          const res = await this.func(finalChunk, {
            ...childConfig,
            config: childConfig
          });
          resolve2(res);
        } catch (e) {
          reject(e);
        }
      });
    });
    if (output && Runnable.isRunnable(output)) {
      if (config?.recursionLimit === 0) {
        throw new Error("Recursion limit reached.");
      }
      const stream = await output.stream(finalChunk, childConfig);
      for await (const chunk of stream) {
        yield chunk;
      }
    } else if (isAsyncIterable(output)) {
      for await (const chunk of consumeAsyncIterableInContext(childConfig, output)) {
        config?.signal?.throwIfAborted();
        yield chunk;
      }
    } else if (isIterableIterator(output)) {
      for (const chunk of consumeIteratorInContext(childConfig, output)) {
        config?.signal?.throwIfAborted();
        yield chunk;
      }
    } else {
      yield output;
    }
  }
  transform(generator, options) {
    return this._transformStreamWithConfig(generator, this._transform.bind(this), options);
  }
  async stream(input, options) {
    async function* generator() {
      yield input;
    }
    const config = ensureConfig(options);
    const wrappedGenerator = new AsyncGeneratorWithSetup({
      generator: this.transform(generator(), config),
      config
    });
    await wrappedGenerator.setup;
    return IterableReadableStream.fromAsyncGenerator(wrappedGenerator);
  }
};
var RunnableWithFallbacks = class extends Runnable {
  static lc_name() {
    return "RunnableWithFallbacks";
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "runnable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "fallbacks", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.runnable = fields.runnable;
    this.fallbacks = fields.fallbacks;
  }
  *runnables() {
    yield this.runnable;
    for (const fallback of this.fallbacks) {
      yield fallback;
    }
  }
  async invoke(input, options) {
    const config = ensureConfig(options);
    const callbackManager_ = await getCallbackManagerForConfig(config);
    const { runId, ...otherConfigFields } = config;
    const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict2(input, "input"), runId, void 0, void 0, void 0, otherConfigFields?.runName);
    const childConfig = patchConfig(otherConfigFields, {
      callbacks: runManager?.getChild()
    });
    const res = await AsyncLocalStorageProviderSingleton2.runWithConfig(childConfig, async () => {
      let firstError;
      for (const runnable of this.runnables()) {
        config?.signal?.throwIfAborted();
        try {
          const output = await runnable.invoke(input, childConfig);
          await runManager?.handleChainEnd(_coerceToDict2(output, "output"));
          return output;
        } catch (e) {
          if (firstError === void 0) {
            firstError = e;
          }
        }
      }
      if (firstError === void 0) {
        throw new Error("No error stored at end of fallback.");
      }
      await runManager?.handleChainError(firstError);
      throw firstError;
    });
    return res;
  }
  async *_streamIterator(input, options) {
    const config = ensureConfig(options);
    const callbackManager_ = await getCallbackManagerForConfig(config);
    const { runId, ...otherConfigFields } = config;
    const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict2(input, "input"), runId, void 0, void 0, void 0, otherConfigFields?.runName);
    let firstError;
    let stream;
    for (const runnable of this.runnables()) {
      config?.signal?.throwIfAborted();
      const childConfig = patchConfig(otherConfigFields, {
        callbacks: runManager?.getChild()
      });
      try {
        const originalStream = await runnable.stream(input, childConfig);
        stream = consumeAsyncIterableInContext(childConfig, originalStream);
        break;
      } catch (e) {
        if (firstError === void 0) {
          firstError = e;
        }
      }
    }
    if (stream === void 0) {
      const error = firstError ?? new Error("No error stored at end of fallback.");
      await runManager?.handleChainError(error);
      throw error;
    }
    let output;
    try {
      for await (const chunk of stream) {
        yield chunk;
        try {
          output = output === void 0 ? output : concat(output, chunk);
        } catch (e) {
          output = void 0;
        }
      }
    } catch (e) {
      await runManager?.handleChainError(e);
      throw e;
    }
    await runManager?.handleChainEnd(_coerceToDict2(output, "output"));
  }
  async batch(inputs, options, batchOptions) {
    if (batchOptions?.returnExceptions) {
      throw new Error("Not implemented.");
    }
    const configList = this._getOptionsList(options ?? {}, inputs.length);
    const callbackManagers = await Promise.all(configList.map((config) => getCallbackManagerForConfig(config)));
    const runManagers = await Promise.all(callbackManagers.map(async (callbackManager, i) => {
      const handleStartRes = await callbackManager?.handleChainStart(this.toJSON(), _coerceToDict2(inputs[i], "input"), configList[i].runId, void 0, void 0, void 0, configList[i].runName);
      delete configList[i].runId;
      return handleStartRes;
    }));
    let firstError;
    for (const runnable of this.runnables()) {
      configList[0].signal?.throwIfAborted();
      try {
        const outputs = await runnable.batch(inputs, runManagers.map((runManager, j) => patchConfig(configList[j], {
          callbacks: runManager?.getChild()
        })), batchOptions);
        await Promise.all(runManagers.map((runManager, i) => runManager?.handleChainEnd(_coerceToDict2(outputs[i], "output"))));
        return outputs;
      } catch (e) {
        if (firstError === void 0) {
          firstError = e;
        }
      }
    }
    if (!firstError) {
      throw new Error("No error stored at end of fallbacks.");
    }
    await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(firstError)));
    throw firstError;
  }
};
function _coerceToRunnable(coerceable) {
  if (typeof coerceable === "function") {
    return new RunnableLambda({ func: coerceable });
  } else if (Runnable.isRunnable(coerceable)) {
    return coerceable;
  } else if (!Array.isArray(coerceable) && typeof coerceable === "object") {
    const runnables = {};
    for (const [key, value] of Object.entries(coerceable)) {
      runnables[key] = _coerceToRunnable(value);
    }
    return new RunnableMap({
      steps: runnables
    });
  } else {
    throw new Error(`Expected a Runnable, function or object.
Instead got an unsupported type.`);
  }
}
var RunnableAssign = class extends Runnable {
  static lc_name() {
    return "RunnableAssign";
  }
  constructor(fields) {
    if (fields instanceof RunnableMap) {
      fields = { mapper: fields };
    }
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "mapper", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.mapper = fields.mapper;
  }
  async invoke(input, options) {
    const mapperResult = await this.mapper.invoke(input, options);
    return {
      ...input,
      ...mapperResult
    };
  }
  async *_transform(generator, runManager, options) {
    const mapperKeys = this.mapper.getStepsKeys();
    const [forPassthrough, forMapper] = atee(generator);
    const mapperOutput = this.mapper.transform(forMapper, patchConfig(options, { callbacks: runManager?.getChild() }));
    const firstMapperChunkPromise = mapperOutput.next();
    for await (const chunk of forPassthrough) {
      if (typeof chunk !== "object" || Array.isArray(chunk)) {
        throw new Error(`RunnableAssign can only be used with objects as input, got ${typeof chunk}`);
      }
      const filtered = Object.fromEntries(Object.entries(chunk).filter(([key]) => !mapperKeys.includes(key)));
      if (Object.keys(filtered).length > 0) {
        yield filtered;
      }
    }
    yield (await firstMapperChunkPromise).value;
    for await (const chunk of mapperOutput) {
      yield chunk;
    }
  }
  transform(generator, options) {
    return this._transformStreamWithConfig(generator, this._transform.bind(this), options);
  }
  async stream(input, options) {
    async function* generator() {
      yield input;
    }
    const config = ensureConfig(options);
    const wrappedGenerator = new AsyncGeneratorWithSetup({
      generator: this.transform(generator(), config),
      config
    });
    await wrappedGenerator.setup;
    return IterableReadableStream.fromAsyncGenerator(wrappedGenerator);
  }
};
var RunnablePick = class extends Runnable {
  static lc_name() {
    return "RunnablePick";
  }
  constructor(fields) {
    if (typeof fields === "string" || Array.isArray(fields)) {
      fields = { keys: fields };
    }
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "keys", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.keys = fields.keys;
  }
  async _pick(input) {
    if (typeof this.keys === "string") {
      return input[this.keys];
    } else {
      const picked = this.keys.map((key) => [key, input[key]]).filter((v) => v[1] !== void 0);
      return picked.length === 0 ? void 0 : Object.fromEntries(picked);
    }
  }
  async invoke(input, options) {
    return this._callWithConfig(this._pick.bind(this), input, options);
  }
  async *_transform(generator) {
    for await (const chunk of generator) {
      const picked = await this._pick(chunk);
      if (picked !== void 0) {
        yield picked;
      }
    }
  }
  transform(generator, options) {
    return this._transformStreamWithConfig(generator, this._transform.bind(this), options);
  }
  async stream(input, options) {
    async function* generator() {
      yield input;
    }
    const config = ensureConfig(options);
    const wrappedGenerator = new AsyncGeneratorWithSetup({
      generator: this.transform(generator(), config),
      config
    });
    await wrappedGenerator.setup;
    return IterableReadableStream.fromAsyncGenerator(wrappedGenerator);
  }
};
var RunnableToolLike = class extends RunnableBinding {
  constructor(fields) {
    const sequence = RunnableSequence.from([
      RunnableLambda.from(async (input) => {
        let toolInput;
        if (_isToolCall(input)) {
          try {
            toolInput = await this.schema.parseAsync(input.args);
          } catch (e) {
            throw new ToolInputParsingException(`Received tool input did not match expected schema`, JSON.stringify(input.args));
          }
        } else {
          toolInput = input;
        }
        return toolInput;
      }).withConfig({ runName: `${fields.name}:parse_input` }),
      fields.bound
    ]).withConfig({ runName: fields.name });
    super({
      bound: sequence,
      config: fields.config ?? {}
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "description", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "schema", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.name = fields.name;
    this.description = fields.description;
    this.schema = fields.schema;
  }
  static lc_name() {
    return "RunnableToolLike";
  }
};
function convertRunnableToTool(runnable, fields) {
  const name = fields.name ?? runnable.getName();
  const description = fields.description ?? fields.schema?.description;
  if (fields.schema.constructor === external_exports.ZodString) {
    return new RunnableToolLike({
      name,
      description,
      schema: external_exports.object({
        input: external_exports.string()
      }).transform((input) => input.input),
      bound: runnable
    });
  }
  return new RunnableToolLike({
    name,
    description,
    schema: fields.schema,
    bound: runnable
  });
}

// node_modules/@langchain/core/dist/utils/js-sha1/hash.js
var root = typeof window === "object" ? window : {};
var HEX_CHARS = "0123456789abcdef".split("");
var EXTRA = [-2147483648, 8388608, 32768, 128];
var SHIFT = [24, 16, 8, 0];
var blocks = [];
function Sha1(sharedMemory) {
  if (sharedMemory) {
    blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    this.blocks = blocks;
  } else {
    this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  this.h0 = 1732584193;
  this.h1 = 4023233417;
  this.h2 = 2562383102;
  this.h3 = 271733878;
  this.h4 = 3285377520;
  this.block = this.start = this.bytes = this.hBytes = 0;
  this.finalized = this.hashed = false;
  this.first = true;
}
Sha1.prototype.update = function(message) {
  if (this.finalized) {
    return;
  }
  var notString = typeof message !== "string";
  if (notString && message.constructor === root.ArrayBuffer) {
    message = new Uint8Array(message);
  }
  var code, index2 = 0, i, length = message.length || 0, blocks2 = this.blocks;
  while (index2 < length) {
    if (this.hashed) {
      this.hashed = false;
      blocks2[0] = this.block;
      blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
    }
    if (notString) {
      for (i = this.start; index2 < length && i < 64; ++index2) {
        blocks2[i >> 2] |= message[index2] << SHIFT[i++ & 3];
      }
    } else {
      for (i = this.start; index2 < length && i < 64; ++index2) {
        code = message.charCodeAt(index2);
        if (code < 128) {
          blocks2[i >> 2] |= code << SHIFT[i++ & 3];
        } else if (code < 2048) {
          blocks2[i >> 2] |= (192 | code >> 6) << SHIFT[i++ & 3];
          blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
        } else if (code < 55296 || code >= 57344) {
          blocks2[i >> 2] |= (224 | code >> 12) << SHIFT[i++ & 3];
          blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
          blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
        } else {
          code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index2) & 1023);
          blocks2[i >> 2] |= (240 | code >> 18) << SHIFT[i++ & 3];
          blocks2[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[i++ & 3];
          blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
          blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
        }
      }
    }
    this.lastByteIndex = i;
    this.bytes += i - this.start;
    if (i >= 64) {
      this.block = blocks2[16];
      this.start = i - 64;
      this.hash();
      this.hashed = true;
    } else {
      this.start = i;
    }
  }
  if (this.bytes > 4294967295) {
    this.hBytes += this.bytes / 4294967296 << 0;
    this.bytes = this.bytes % 4294967296;
  }
  return this;
};
Sha1.prototype.finalize = function() {
  if (this.finalized) {
    return;
  }
  this.finalized = true;
  var blocks2 = this.blocks, i = this.lastByteIndex;
  blocks2[16] = this.block;
  blocks2[i >> 2] |= EXTRA[i & 3];
  this.block = blocks2[16];
  if (i >= 56) {
    if (!this.hashed) {
      this.hash();
    }
    blocks2[0] = this.block;
    blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
  }
  blocks2[14] = this.hBytes << 3 | this.bytes >>> 29;
  blocks2[15] = this.bytes << 3;
  this.hash();
};
Sha1.prototype.hash = function() {
  var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4;
  var f, j, t, blocks2 = this.blocks;
  for (j = 16; j < 80; ++j) {
    t = blocks2[j - 3] ^ blocks2[j - 8] ^ blocks2[j - 14] ^ blocks2[j - 16];
    blocks2[j] = t << 1 | t >>> 31;
  }
  for (j = 0; j < 20; j += 5) {
    f = b & c | ~b & d;
    t = a << 5 | a >>> 27;
    e = t + f + e + 1518500249 + blocks2[j] << 0;
    b = b << 30 | b >>> 2;
    f = a & b | ~a & c;
    t = e << 5 | e >>> 27;
    d = t + f + d + 1518500249 + blocks2[j + 1] << 0;
    a = a << 30 | a >>> 2;
    f = e & a | ~e & b;
    t = d << 5 | d >>> 27;
    c = t + f + c + 1518500249 + blocks2[j + 2] << 0;
    e = e << 30 | e >>> 2;
    f = d & e | ~d & a;
    t = c << 5 | c >>> 27;
    b = t + f + b + 1518500249 + blocks2[j + 3] << 0;
    d = d << 30 | d >>> 2;
    f = c & d | ~c & e;
    t = b << 5 | b >>> 27;
    a = t + f + a + 1518500249 + blocks2[j + 4] << 0;
    c = c << 30 | c >>> 2;
  }
  for (; j < 40; j += 5) {
    f = b ^ c ^ d;
    t = a << 5 | a >>> 27;
    e = t + f + e + 1859775393 + blocks2[j] << 0;
    b = b << 30 | b >>> 2;
    f = a ^ b ^ c;
    t = e << 5 | e >>> 27;
    d = t + f + d + 1859775393 + blocks2[j + 1] << 0;
    a = a << 30 | a >>> 2;
    f = e ^ a ^ b;
    t = d << 5 | d >>> 27;
    c = t + f + c + 1859775393 + blocks2[j + 2] << 0;
    e = e << 30 | e >>> 2;
    f = d ^ e ^ a;
    t = c << 5 | c >>> 27;
    b = t + f + b + 1859775393 + blocks2[j + 3] << 0;
    d = d << 30 | d >>> 2;
    f = c ^ d ^ e;
    t = b << 5 | b >>> 27;
    a = t + f + a + 1859775393 + blocks2[j + 4] << 0;
    c = c << 30 | c >>> 2;
  }
  for (; j < 60; j += 5) {
    f = b & c | b & d | c & d;
    t = a << 5 | a >>> 27;
    e = t + f + e - 1894007588 + blocks2[j] << 0;
    b = b << 30 | b >>> 2;
    f = a & b | a & c | b & c;
    t = e << 5 | e >>> 27;
    d = t + f + d - 1894007588 + blocks2[j + 1] << 0;
    a = a << 30 | a >>> 2;
    f = e & a | e & b | a & b;
    t = d << 5 | d >>> 27;
    c = t + f + c - 1894007588 + blocks2[j + 2] << 0;
    e = e << 30 | e >>> 2;
    f = d & e | d & a | e & a;
    t = c << 5 | c >>> 27;
    b = t + f + b - 1894007588 + blocks2[j + 3] << 0;
    d = d << 30 | d >>> 2;
    f = c & d | c & e | d & e;
    t = b << 5 | b >>> 27;
    a = t + f + a - 1894007588 + blocks2[j + 4] << 0;
    c = c << 30 | c >>> 2;
  }
  for (; j < 80; j += 5) {
    f = b ^ c ^ d;
    t = a << 5 | a >>> 27;
    e = t + f + e - 899497514 + blocks2[j] << 0;
    b = b << 30 | b >>> 2;
    f = a ^ b ^ c;
    t = e << 5 | e >>> 27;
    d = t + f + d - 899497514 + blocks2[j + 1] << 0;
    a = a << 30 | a >>> 2;
    f = e ^ a ^ b;
    t = d << 5 | d >>> 27;
    c = t + f + c - 899497514 + blocks2[j + 2] << 0;
    e = e << 30 | e >>> 2;
    f = d ^ e ^ a;
    t = c << 5 | c >>> 27;
    b = t + f + b - 899497514 + blocks2[j + 3] << 0;
    d = d << 30 | d >>> 2;
    f = c ^ d ^ e;
    t = b << 5 | b >>> 27;
    a = t + f + a - 899497514 + blocks2[j + 4] << 0;
    c = c << 30 | c >>> 2;
  }
  this.h0 = this.h0 + a << 0;
  this.h1 = this.h1 + b << 0;
  this.h2 = this.h2 + c << 0;
  this.h3 = this.h3 + d << 0;
  this.h4 = this.h4 + e << 0;
};
Sha1.prototype.hex = function() {
  this.finalize();
  var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;
  return HEX_CHARS[h0 >> 28 & 15] + HEX_CHARS[h0 >> 24 & 15] + HEX_CHARS[h0 >> 20 & 15] + HEX_CHARS[h0 >> 16 & 15] + HEX_CHARS[h0 >> 12 & 15] + HEX_CHARS[h0 >> 8 & 15] + HEX_CHARS[h0 >> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h1 >> 28 & 15] + HEX_CHARS[h1 >> 24 & 15] + HEX_CHARS[h1 >> 20 & 15] + HEX_CHARS[h1 >> 16 & 15] + HEX_CHARS[h1 >> 12 & 15] + HEX_CHARS[h1 >> 8 & 15] + HEX_CHARS[h1 >> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h2 >> 28 & 15] + HEX_CHARS[h2 >> 24 & 15] + HEX_CHARS[h2 >> 20 & 15] + HEX_CHARS[h2 >> 16 & 15] + HEX_CHARS[h2 >> 12 & 15] + HEX_CHARS[h2 >> 8 & 15] + HEX_CHARS[h2 >> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h3 >> 28 & 15] + HEX_CHARS[h3 >> 24 & 15] + HEX_CHARS[h3 >> 20 & 15] + HEX_CHARS[h3 >> 16 & 15] + HEX_CHARS[h3 >> 12 & 15] + HEX_CHARS[h3 >> 8 & 15] + HEX_CHARS[h3 >> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h4 >> 28 & 15] + HEX_CHARS[h4 >> 24 & 15] + HEX_CHARS[h4 >> 20 & 15] + HEX_CHARS[h4 >> 16 & 15] + HEX_CHARS[h4 >> 12 & 15] + HEX_CHARS[h4 >> 8 & 15] + HEX_CHARS[h4 >> 4 & 15] + HEX_CHARS[h4 & 15];
};
Sha1.prototype.toString = Sha1.prototype.hex;
Sha1.prototype.digest = function() {
  this.finalize();
  var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;
  return [
    h0 >> 24 & 255,
    h0 >> 16 & 255,
    h0 >> 8 & 255,
    h0 & 255,
    h1 >> 24 & 255,
    h1 >> 16 & 255,
    h1 >> 8 & 255,
    h1 & 255,
    h2 >> 24 & 255,
    h2 >> 16 & 255,
    h2 >> 8 & 255,
    h2 & 255,
    h3 >> 24 & 255,
    h3 >> 16 & 255,
    h3 >> 8 & 255,
    h3 & 255,
    h4 >> 24 & 255,
    h4 >> 16 & 255,
    h4 >> 8 & 255,
    h4 & 255
  ];
};
Sha1.prototype.array = Sha1.prototype.digest;
Sha1.prototype.arrayBuffer = function() {
  this.finalize();
  var buffer = new ArrayBuffer(20);
  var dataView = new DataView(buffer);
  dataView.setUint32(0, this.h0);
  dataView.setUint32(4, this.h1);
  dataView.setUint32(8, this.h2);
  dataView.setUint32(12, this.h3);
  dataView.setUint32(16, this.h4);
  return buffer;
};
var insecureHash = (message) => {
  return new Sha1(true).update(message)["hex"]();
};

// node_modules/@langchain/core/dist/caches/base.js
var getCacheKey = (...strings) => insecureHash(strings.join("_"));
var BaseCache = class {
};
var GLOBAL_MAP = /* @__PURE__ */ new Map();
var InMemoryCache = class _InMemoryCache extends BaseCache {
  constructor(map) {
    super();
    Object.defineProperty(this, "cache", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.cache = map ?? /* @__PURE__ */ new Map();
  }
  /**
   * Retrieves data from the cache using a prompt and an LLM key. If the
   * data is not found, it returns null.
   * @param prompt The prompt used to find the data.
   * @param llmKey The LLM key used to find the data.
   * @returns The data corresponding to the prompt and LLM key, or null if not found.
   */
  lookup(prompt, llmKey) {
    return Promise.resolve(this.cache.get(getCacheKey(prompt, llmKey)) ?? null);
  }
  /**
   * Updates the cache with new data using a prompt and an LLM key.
   * @param prompt The prompt used to store the data.
   * @param llmKey The LLM key used to store the data.
   * @param value The data to be stored.
   */
  async update(prompt, llmKey, value) {
    this.cache.set(getCacheKey(prompt, llmKey), value);
  }
  /**
   * Returns a global instance of InMemoryCache using a predefined global
   * map as the initial cache.
   * @returns A global instance of InMemoryCache.
   */
  static global() {
    return new _InMemoryCache(GLOBAL_MAP);
  }
};

// node_modules/@langchain/core/dist/prompt_values.js
var BasePromptValue = class extends Serializable {
};
var StringPromptValue = class extends BasePromptValue {
  static lc_name() {
    return "StringPromptValue";
  }
  constructor(value) {
    super({ value });
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "prompt_values"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "value", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.value = value;
  }
  toString() {
    return this.value;
  }
  toChatMessages() {
    return [new HumanMessage(this.value)];
  }
};
var ChatPromptValue = class extends BasePromptValue {
  static lc_name() {
    return "ChatPromptValue";
  }
  constructor(fields) {
    if (Array.isArray(fields)) {
      fields = { messages: fields };
    }
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "prompt_values"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "messages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.messages = fields.messages;
  }
  toString() {
    return getBufferString(this.messages);
  }
  toChatMessages() {
    return this.messages;
  }
};

// node_modules/js-tiktoken/dist/chunk-ZDNLBERF.js
var import_base64_js = __toESM(require_base64_js(), 1);
var __defProp2 = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function bytePairMerge(piece, ranks) {
  let parts = Array.from(
    { length: piece.length },
    (_, i) => ({ start: i, end: i + 1 })
  );
  while (parts.length > 1) {
    let minRank = null;
    for (let i = 0; i < parts.length - 1; i++) {
      const slice = piece.slice(parts[i].start, parts[i + 1].end);
      const rank = ranks.get(slice.join(","));
      if (rank == null)
        continue;
      if (minRank == null || rank < minRank[0]) {
        minRank = [rank, i];
      }
    }
    if (minRank != null) {
      const i = minRank[1];
      parts[i] = { start: parts[i].start, end: parts[i + 1].end };
      parts.splice(i + 1, 1);
    } else {
      break;
    }
  }
  return parts;
}
function bytePairEncode(piece, ranks) {
  if (piece.length === 1)
    return [ranks.get(piece.join(","))];
  return bytePairMerge(piece, ranks).map((p) => ranks.get(piece.slice(p.start, p.end).join(","))).filter((x) => x != null);
}
function escapeRegex(str) {
  return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
}
var _Tiktoken = class {
  /** @internal */
  specialTokens;
  /** @internal */
  inverseSpecialTokens;
  /** @internal */
  patStr;
  /** @internal */
  textEncoder = new TextEncoder();
  /** @internal */
  textDecoder = new TextDecoder("utf-8");
  /** @internal */
  rankMap = /* @__PURE__ */ new Map();
  /** @internal */
  textMap = /* @__PURE__ */ new Map();
  constructor(ranks, extendedSpecialTokens) {
    this.patStr = ranks.pat_str;
    const uncompressed = ranks.bpe_ranks.split("\n").filter(Boolean).reduce((memo, x) => {
      const [_, offsetStr, ...tokens] = x.split(" ");
      const offset = Number.parseInt(offsetStr, 10);
      tokens.forEach((token, i) => memo[token] = offset + i);
      return memo;
    }, {});
    for (const [token, rank] of Object.entries(uncompressed)) {
      const bytes = import_base64_js.default.toByteArray(token);
      this.rankMap.set(bytes.join(","), rank);
      this.textMap.set(rank, bytes);
    }
    this.specialTokens = { ...ranks.special_tokens, ...extendedSpecialTokens };
    this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text, rank]) => {
      memo[rank] = this.textEncoder.encode(text);
      return memo;
    }, {});
  }
  encode(text, allowedSpecial = [], disallowedSpecial = "all") {
    const regexes = new RegExp(this.patStr, "ug");
    const specialRegex = _Tiktoken.specialTokenRegex(
      Object.keys(this.specialTokens)
    );
    const ret = [];
    const allowedSpecialSet = new Set(
      allowedSpecial === "all" ? Object.keys(this.specialTokens) : allowedSpecial
    );
    const disallowedSpecialSet = new Set(
      disallowedSpecial === "all" ? Object.keys(this.specialTokens).filter(
        (x) => !allowedSpecialSet.has(x)
      ) : disallowedSpecial
    );
    if (disallowedSpecialSet.size > 0) {
      const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([
        ...disallowedSpecialSet
      ]);
      const specialMatch = text.match(disallowedSpecialRegex);
      if (specialMatch != null) {
        throw new Error(
          `The text contains a special token that is not allowed: ${specialMatch[0]}`
        );
      }
    }
    let start = 0;
    while (true) {
      let nextSpecial = null;
      let startFind = start;
      while (true) {
        specialRegex.lastIndex = startFind;
        nextSpecial = specialRegex.exec(text);
        if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0]))
          break;
        startFind = nextSpecial.index + 1;
      }
      const end = nextSpecial?.index ?? text.length;
      for (const match of text.substring(start, end).matchAll(regexes)) {
        const piece = this.textEncoder.encode(match[0]);
        const token2 = this.rankMap.get(piece.join(","));
        if (token2 != null) {
          ret.push(token2);
          continue;
        }
        ret.push(...bytePairEncode(piece, this.rankMap));
      }
      if (nextSpecial == null)
        break;
      let token = this.specialTokens[nextSpecial[0]];
      ret.push(token);
      start = nextSpecial.index + nextSpecial[0].length;
    }
    return ret;
  }
  decode(tokens) {
    const res = [];
    let length = 0;
    for (let i2 = 0; i2 < tokens.length; ++i2) {
      const token = tokens[i2];
      const bytes = this.textMap.get(token) ?? this.inverseSpecialTokens[token];
      if (bytes != null) {
        res.push(bytes);
        length += bytes.length;
      }
    }
    const mergedArray = new Uint8Array(length);
    let i = 0;
    for (const bytes of res) {
      mergedArray.set(bytes, i);
      i += bytes.length;
    }
    return this.textDecoder.decode(mergedArray);
  }
};
var Tiktoken = _Tiktoken;
__publicField(Tiktoken, "specialTokenRegex", (tokens) => {
  return new RegExp(tokens.map((i) => escapeRegex(i)).join("|"), "g");
});
function getEncodingNameForModel(model) {
  switch (model) {
    case "gpt2": {
      return "gpt2";
    }
    case "code-cushman-001":
    case "code-cushman-002":
    case "code-davinci-001":
    case "code-davinci-002":
    case "cushman-codex":
    case "davinci-codex":
    case "davinci-002":
    case "text-davinci-002":
    case "text-davinci-003": {
      return "p50k_base";
    }
    case "code-davinci-edit-001":
    case "text-davinci-edit-001": {
      return "p50k_edit";
    }
    case "ada":
    case "babbage":
    case "babbage-002":
    case "code-search-ada-code-001":
    case "code-search-babbage-code-001":
    case "curie":
    case "davinci":
    case "text-ada-001":
    case "text-babbage-001":
    case "text-curie-001":
    case "text-davinci-001":
    case "text-search-ada-doc-001":
    case "text-search-babbage-doc-001":
    case "text-search-curie-doc-001":
    case "text-search-davinci-doc-001":
    case "text-similarity-ada-001":
    case "text-similarity-babbage-001":
    case "text-similarity-curie-001":
    case "text-similarity-davinci-001": {
      return "r50k_base";
    }
    case "gpt-3.5-turbo-instruct-0914":
    case "gpt-3.5-turbo-instruct":
    case "gpt-3.5-turbo-16k-0613":
    case "gpt-3.5-turbo-16k":
    case "gpt-3.5-turbo-0613":
    case "gpt-3.5-turbo-0301":
    case "gpt-3.5-turbo":
    case "gpt-4-32k-0613":
    case "gpt-4-32k-0314":
    case "gpt-4-32k":
    case "gpt-4-0613":
    case "gpt-4-0314":
    case "gpt-4":
    case "gpt-3.5-turbo-1106":
    case "gpt-35-turbo":
    case "gpt-4-1106-preview":
    case "gpt-4-vision-preview":
    case "gpt-3.5-turbo-0125":
    case "gpt-4-turbo":
    case "gpt-4-turbo-2024-04-09":
    case "gpt-4-turbo-preview":
    case "gpt-4-0125-preview":
    case "text-embedding-ada-002":
    case "text-embedding-3-small":
    case "text-embedding-3-large": {
      return "cl100k_base";
    }
    case "gpt-4o":
    case "gpt-4o-2024-05-13":
    case "gpt-4o-2024-08-06":
    case "gpt-4o-2024-11-20":
    case "gpt-4o-mini-2024-07-18":
    case "gpt-4o-mini":
    case "gpt-4o-search-preview":
    case "gpt-4o-search-preview-2025-03-11":
    case "gpt-4o-mini-search-preview":
    case "gpt-4o-mini-search-preview-2025-03-11":
    case "gpt-4o-audio-preview":
    case "gpt-4o-audio-preview-2024-12-17":
    case "gpt-4o-audio-preview-2024-10-01":
    case "gpt-4o-mini-audio-preview":
    case "gpt-4o-mini-audio-preview-2024-12-17":
    case "o1":
    case "o1-2024-12-17":
    case "o1-mini":
    case "o1-mini-2024-09-12":
    case "o1-preview":
    case "o1-preview-2024-09-12":
    case "o1-pro":
    case "o1-pro-2025-03-19":
    case "o3":
    case "o3-2025-04-16":
    case "o3-mini":
    case "o3-mini-2025-01-31":
    case "o4-mini":
    case "o4-mini-2025-04-16":
    case "chatgpt-4o-latest":
    case "gpt-4o-realtime":
    case "gpt-4o-realtime-preview-2024-10-01":
    case "gpt-4o-realtime-preview-2024-12-17":
    case "gpt-4o-mini-realtime-preview":
    case "gpt-4o-mini-realtime-preview-2024-12-17":
    case "gpt-4.1":
    case "gpt-4.1-2025-04-14":
    case "gpt-4.1-mini":
    case "gpt-4.1-mini-2025-04-14":
    case "gpt-4.1-nano":
    case "gpt-4.1-nano-2025-04-14":
    case "gpt-4.5-preview":
    case "gpt-4.5-preview-2025-02-27": {
      return "o200k_base";
    }
    default:
      throw new Error("Unknown model");
  }
}

// node_modules/@langchain/core/dist/utils/tiktoken.js
var cache = {};
var caller = /* @__PURE__ */ new AsyncCaller2({});
async function getEncoding(encoding) {
  if (!(encoding in cache)) {
    cache[encoding] = caller.fetch(`https://tiktoken.pages.dev/js/${encoding}.json`).then((res) => res.json()).then((data) => new Tiktoken(data)).catch((e) => {
      delete cache[encoding];
      throw e;
    });
  }
  return await cache[encoding];
}
async function encodingForModel(model) {
  return getEncoding(getEncodingNameForModel(model));
}

// node_modules/@langchain/core/dist/language_models/base.js
var getModelNameForTiktoken = (modelName) => {
  if (modelName.startsWith("gpt-3.5-turbo-16k")) {
    return "gpt-3.5-turbo-16k";
  }
  if (modelName.startsWith("gpt-3.5-turbo-")) {
    return "gpt-3.5-turbo";
  }
  if (modelName.startsWith("gpt-4-32k")) {
    return "gpt-4-32k";
  }
  if (modelName.startsWith("gpt-4-")) {
    return "gpt-4";
  }
  if (modelName.startsWith("gpt-4o")) {
    return "gpt-4o";
  }
  return modelName;
};
function isOpenAITool(tool) {
  if (typeof tool !== "object" || !tool)
    return false;
  if ("type" in tool && tool.type === "function" && "function" in tool && typeof tool.function === "object" && tool.function && "name" in tool.function && "parameters" in tool.function) {
    return true;
  }
  return false;
}
var getVerbosity = () => false;
var BaseLangChain = class extends Runnable {
  get lc_attributes() {
    return {
      callbacks: void 0,
      verbose: void 0
    };
  }
  constructor(params) {
    super(params);
    Object.defineProperty(this, "verbose", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "callbacks", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "tags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.verbose = params.verbose ?? getVerbosity();
    this.callbacks = params.callbacks;
    this.tags = params.tags ?? [];
    this.metadata = params.metadata ?? {};
  }
};
var BaseLanguageModel = class extends BaseLangChain {
  /**
   * Keys that the language model accepts as call options.
   */
  get callKeys() {
    return ["stop", "timeout", "signal", "tags", "metadata", "callbacks"];
  }
  constructor({ callbacks, callbackManager, ...params }) {
    const { cache: cache2, ...rest } = params;
    super({
      callbacks: callbacks ?? callbackManager,
      ...rest
    });
    Object.defineProperty(this, "caller", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cache", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_encoding", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (typeof cache2 === "object") {
      this.cache = cache2;
    } else if (cache2) {
      this.cache = InMemoryCache.global();
    } else {
      this.cache = void 0;
    }
    this.caller = new AsyncCaller2(params ?? {});
  }
  async getNumTokens(content) {
    if (typeof content !== "string") {
      return 0;
    }
    let numTokens = Math.ceil(content.length / 4);
    if (!this._encoding) {
      try {
        this._encoding = await encodingForModel("modelName" in this ? getModelNameForTiktoken(this.modelName) : "gpt2");
      } catch (error) {
        console.warn("Failed to calculate number of tokens, falling back to approximate count", error);
      }
    }
    if (this._encoding) {
      try {
        numTokens = this._encoding.encode(content).length;
      } catch (error) {
        console.warn("Failed to calculate number of tokens, falling back to approximate count", error);
      }
    }
    return numTokens;
  }
  static _convertInputToPromptValue(input) {
    if (typeof input === "string") {
      return new StringPromptValue(input);
    } else if (Array.isArray(input)) {
      return new ChatPromptValue(input.map(coerceMessageLikeToMessage));
    } else {
      return input;
    }
  }
  /**
   * Get the identifying parameters of the LLM.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _identifyingParams() {
    return {};
  }
  /**
   * Create a unique cache key for a specific call to a specific language model.
   * @param callOptions Call options for the model
   * @returns A unique cache key.
   */
  _getSerializedCacheKeyParametersForCall({ config, ...callOptions }) {
    const params = {
      ...this._identifyingParams(),
      ...callOptions,
      _type: this._llmType(),
      _model: this._modelType()
    };
    const filteredEntries = Object.entries(params).filter(([_, value]) => value !== void 0);
    const serializedEntries = filteredEntries.map(([key, value]) => `${key}:${JSON.stringify(value)}`).sort().join(",");
    return serializedEntries;
  }
  /**
   * @deprecated
   * Return a json-like object representing this LLM.
   */
  serialize() {
    return {
      ...this._identifyingParams(),
      _type: this._llmType(),
      _model: this._modelType()
    };
  }
  /**
   * @deprecated
   * Load an LLM from a json-like object describing it.
   */
  static async deserialize(_data) {
    throw new Error("Use .toJSON() instead");
  }
};

// node_modules/@langchain/core/dist/runnables/passthrough.js
var RunnablePassthrough = class extends Runnable {
  static lc_name() {
    return "RunnablePassthrough";
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "func", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (fields) {
      this.func = fields.func;
    }
  }
  async invoke(input, options) {
    const config = ensureConfig(options);
    if (this.func) {
      await this.func(input, config);
    }
    return this._callWithConfig((input2) => Promise.resolve(input2), input, config);
  }
  async *transform(generator, options) {
    const config = ensureConfig(options);
    let finalOutput;
    let finalOutputSupported = true;
    for await (const chunk of this._transformStreamWithConfig(generator, (input) => input, config)) {
      yield chunk;
      if (finalOutputSupported) {
        if (finalOutput === void 0) {
          finalOutput = chunk;
        } else {
          try {
            finalOutput = concat(finalOutput, chunk);
          } catch {
            finalOutput = void 0;
            finalOutputSupported = false;
          }
        }
      }
    }
    if (this.func && finalOutput !== void 0) {
      await this.func(finalOutput, config);
    }
  }
  /**
   * A runnable that assigns key-value pairs to the input.
   *
   * The example below shows how you could use it with an inline function.
   *
   * @example
   * ```typescript
   * const prompt =
   *   PromptTemplate.fromTemplate(`Write a SQL query to answer the question using the following schema: {schema}
   * Question: {question}
   * SQL Query:`);
   *
   * // The `RunnablePassthrough.assign()` is used here to passthrough the input from the `.invoke()`
   * // call (in this example it's the question), along with any inputs passed to the `.assign()` method.
   * // In this case, we're passing the schema.
   * const sqlQueryGeneratorChain = RunnableSequence.from([
   *   RunnablePassthrough.assign({
   *     schema: async () => db.getTableInfo(),
   *   }),
   *   prompt,
   *   new ChatOpenAI({}).withConfig({ stop: ["\nSQLResult:"] }),
   *   new StringOutputParser(),
   * ]);
   * const result = await sqlQueryGeneratorChain.invoke({
   *   question: "How many employees are there?",
   * });
   * ```
   */
  static assign(mapping) {
    return new RunnableAssign(new RunnableMap({ steps: mapping }));
  }
};

// node_modules/@langchain/core/dist/utils/types/is_zod_schema.js
function isZodSchema(input) {
  if (!input) {
    return false;
  }
  if (typeof input !== "object") {
    return false;
  }
  if (Array.isArray(input)) {
    return false;
  }
  const asZodSchema = input;
  if (asZodSchema._def) {
    return true;
  }
  const zodFirstPartyTypeKinds = Object.values(external_exports.ZodFirstPartyTypeKind);
  if (zodFirstPartyTypeKinds.includes(asZodSchema.constructor?.name ?? "NOT_INCLUDED")) {
    return true;
  }
  return typeof asZodSchema.parse === "function" && typeof asZodSchema.parseAsync === "function" && typeof asZodSchema.safeParse === "function" && typeof asZodSchema.safeParseAsync === "function";
}

// node_modules/@langchain/core/dist/language_models/chat_models.js
function _formatForTracing(messages) {
  const messagesToTrace = [];
  for (const message of messages) {
    let messageToTrace = message;
    if (Array.isArray(message.content)) {
      for (let idx = 0; idx < message.content.length; idx++) {
        const block = message.content[idx];
        if (isURLContentBlock(block) || isBase64ContentBlock(block)) {
          if (messageToTrace === message) {
            messageToTrace = new message.constructor({
              ...messageToTrace,
              content: [
                ...message.content.slice(0, idx),
                convertToOpenAIImageBlock(block),
                ...message.content.slice(idx + 1)
              ]
            });
          }
        }
      }
    }
    messagesToTrace.push(messageToTrace);
  }
  return messagesToTrace;
}
var BaseChatModel = class _BaseChatModel extends BaseLanguageModel {
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain", "chat_models", this._llmType()]
    });
    Object.defineProperty(this, "disableStreaming", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
  }
  _separateRunnableConfigFromCallOptionsCompat(options) {
    const [runnableConfig, callOptions] = super._separateRunnableConfigFromCallOptions(options);
    callOptions.signal = runnableConfig.signal;
    return [runnableConfig, callOptions];
  }
  /**
   * Invokes the chat model with a single input.
   * @param input The input for the language model.
   * @param options The call options.
   * @returns A Promise that resolves to a BaseMessageChunk.
   */
  async invoke(input, options) {
    const promptValue = _BaseChatModel._convertInputToPromptValue(input);
    const result = await this.generatePrompt([promptValue], options, options?.callbacks);
    const chatGeneration = result.generations[0][0];
    return chatGeneration.message;
  }
  // eslint-disable-next-line require-yield
  async *_streamResponseChunks(_messages, _options, _runManager) {
    throw new Error("Not implemented.");
  }
  async *_streamIterator(input, options) {
    if (this._streamResponseChunks === _BaseChatModel.prototype._streamResponseChunks || this.disableStreaming) {
      yield this.invoke(input, options);
    } else {
      const prompt = _BaseChatModel._convertInputToPromptValue(input);
      const messages = prompt.toChatMessages();
      const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptionsCompat(options);
      const inheritableMetadata = {
        ...runnableConfig.metadata,
        ...this.getLsParams(callOptions)
      };
      const callbackManager_ = await CallbackManager.configure(runnableConfig.callbacks, this.callbacks, runnableConfig.tags, this.tags, inheritableMetadata, this.metadata, { verbose: this.verbose });
      const extra = {
        options: callOptions,
        invocation_params: this?.invocationParams(callOptions),
        batch_size: 1
      };
      const runManagers = await callbackManager_?.handleChatModelStart(this.toJSON(), [_formatForTracing(messages)], runnableConfig.runId, void 0, extra, void 0, void 0, runnableConfig.runName);
      let generationChunk;
      let llmOutput;
      try {
        for await (const chunk of this._streamResponseChunks(messages, callOptions, runManagers?.[0])) {
          if (chunk.message.id == null) {
            const runId = runManagers?.at(0)?.runId;
            if (runId != null)
              chunk.message._updateId(`run-${runId}`);
          }
          chunk.message.response_metadata = {
            ...chunk.generationInfo,
            ...chunk.message.response_metadata
          };
          yield chunk.message;
          if (!generationChunk) {
            generationChunk = chunk;
          } else {
            generationChunk = generationChunk.concat(chunk);
          }
          if (isAIMessageChunk(chunk.message) && chunk.message.usage_metadata !== void 0) {
            llmOutput = {
              tokenUsage: {
                promptTokens: chunk.message.usage_metadata.input_tokens,
                completionTokens: chunk.message.usage_metadata.output_tokens,
                totalTokens: chunk.message.usage_metadata.total_tokens
              }
            };
          }
        }
      } catch (err) {
        await Promise.all((runManagers ?? []).map((runManager) => runManager?.handleLLMError(err)));
        throw err;
      }
      await Promise.all((runManagers ?? []).map((runManager) => runManager?.handleLLMEnd({
        // TODO: Remove cast after figuring out inheritance
        generations: [[generationChunk]],
        llmOutput
      })));
    }
  }
  getLsParams(options) {
    const providerName = this.getName().startsWith("Chat") ? this.getName().replace("Chat", "") : this.getName();
    return {
      ls_model_type: "chat",
      ls_stop: options.stop,
      ls_provider: providerName
    };
  }
  /** @ignore */
  async _generateUncached(messages, parsedOptions, handledOptions, startedRunManagers) {
    const baseMessages = messages.map((messageList) => messageList.map(coerceMessageLikeToMessage));
    let runManagers;
    if (startedRunManagers !== void 0 && startedRunManagers.length === baseMessages.length) {
      runManagers = startedRunManagers;
    } else {
      const inheritableMetadata = {
        ...handledOptions.metadata,
        ...this.getLsParams(parsedOptions)
      };
      const callbackManager_ = await CallbackManager.configure(handledOptions.callbacks, this.callbacks, handledOptions.tags, this.tags, inheritableMetadata, this.metadata, { verbose: this.verbose });
      const extra = {
        options: parsedOptions,
        invocation_params: this?.invocationParams(parsedOptions),
        batch_size: 1
      };
      runManagers = await callbackManager_?.handleChatModelStart(this.toJSON(), baseMessages.map(_formatForTracing), handledOptions.runId, void 0, extra, void 0, void 0, handledOptions.runName);
    }
    const generations = [];
    const llmOutputs = [];
    const hasStreamingHandler = !!runManagers?.[0].handlers.find(callbackHandlerPrefersStreaming);
    if (hasStreamingHandler && !this.disableStreaming && baseMessages.length === 1 && this._streamResponseChunks !== _BaseChatModel.prototype._streamResponseChunks) {
      try {
        const stream = await this._streamResponseChunks(baseMessages[0], parsedOptions, runManagers?.[0]);
        let aggregated;
        let llmOutput;
        for await (const chunk of stream) {
          if (chunk.message.id == null) {
            const runId = runManagers?.at(0)?.runId;
            if (runId != null)
              chunk.message._updateId(`run-${runId}`);
          }
          if (aggregated === void 0) {
            aggregated = chunk;
          } else {
            aggregated = concat(aggregated, chunk);
          }
          if (isAIMessageChunk(chunk.message) && chunk.message.usage_metadata !== void 0) {
            llmOutput = {
              tokenUsage: {
                promptTokens: chunk.message.usage_metadata.input_tokens,
                completionTokens: chunk.message.usage_metadata.output_tokens,
                totalTokens: chunk.message.usage_metadata.total_tokens
              }
            };
          }
        }
        if (aggregated === void 0) {
          throw new Error("Received empty response from chat model call.");
        }
        generations.push([aggregated]);
        await runManagers?.[0].handleLLMEnd({
          generations,
          llmOutput
        });
      } catch (e) {
        await runManagers?.[0].handleLLMError(e);
        throw e;
      }
    } else {
      const results = await Promise.allSettled(baseMessages.map((messageList, i) => this._generate(messageList, { ...parsedOptions, promptIndex: i }, runManagers?.[i])));
      await Promise.all(results.map(async (pResult, i) => {
        if (pResult.status === "fulfilled") {
          const result = pResult.value;
          for (const generation of result.generations) {
            if (generation.message.id == null) {
              const runId = runManagers?.at(0)?.runId;
              if (runId != null)
                generation.message._updateId(`run-${runId}`);
            }
            generation.message.response_metadata = {
              ...generation.generationInfo,
              ...generation.message.response_metadata
            };
          }
          if (result.generations.length === 1) {
            result.generations[0].message.response_metadata = {
              ...result.llmOutput,
              ...result.generations[0].message.response_metadata
            };
          }
          generations[i] = result.generations;
          llmOutputs[i] = result.llmOutput;
          return runManagers?.[i]?.handleLLMEnd({
            generations: [result.generations],
            llmOutput: result.llmOutput
          });
        } else {
          await runManagers?.[i]?.handleLLMError(pResult.reason);
          return Promise.reject(pResult.reason);
        }
      }));
    }
    const output = {
      generations,
      llmOutput: llmOutputs.length ? this._combineLLMOutput?.(...llmOutputs) : void 0
    };
    Object.defineProperty(output, RUN_KEY, {
      value: runManagers ? { runIds: runManagers?.map((manager) => manager.runId) } : void 0,
      configurable: true
    });
    return output;
  }
  async _generateCached({ messages, cache: cache2, llmStringKey, parsedOptions, handledOptions }) {
    const baseMessages = messages.map((messageList) => messageList.map(coerceMessageLikeToMessage));
    const inheritableMetadata = {
      ...handledOptions.metadata,
      ...this.getLsParams(parsedOptions)
    };
    const callbackManager_ = await CallbackManager.configure(handledOptions.callbacks, this.callbacks, handledOptions.tags, this.tags, inheritableMetadata, this.metadata, { verbose: this.verbose });
    const extra = {
      options: parsedOptions,
      invocation_params: this?.invocationParams(parsedOptions),
      batch_size: 1
    };
    const runManagers = await callbackManager_?.handleChatModelStart(this.toJSON(), baseMessages.map(_formatForTracing), handledOptions.runId, void 0, extra, void 0, void 0, handledOptions.runName);
    const missingPromptIndices = [];
    const results = await Promise.allSettled(baseMessages.map(async (baseMessage, index2) => {
      const prompt = _BaseChatModel._convertInputToPromptValue(baseMessage).toString();
      const result = await cache2.lookup(prompt, llmStringKey);
      if (result == null) {
        missingPromptIndices.push(index2);
      }
      return result;
    }));
    const cachedResults = results.map((result, index2) => ({ result, runManager: runManagers?.[index2] })).filter(({ result }) => result.status === "fulfilled" && result.value != null || result.status === "rejected");
    const generations = [];
    await Promise.all(cachedResults.map(async ({ result: promiseResult, runManager }, i) => {
      if (promiseResult.status === "fulfilled") {
        const result = promiseResult.value;
        generations[i] = result.map((result2) => {
          if ("message" in result2 && isBaseMessage(result2.message) && isAIMessage(result2.message)) {
            result2.message.usage_metadata = {
              input_tokens: 0,
              output_tokens: 0,
              total_tokens: 0
            };
          }
          result2.generationInfo = {
            ...result2.generationInfo,
            tokenUsage: {}
          };
          return result2;
        });
        if (result.length) {
          await runManager?.handleLLMNewToken(result[0].text);
        }
        return runManager?.handleLLMEnd({
          generations: [result]
        }, void 0, void 0, void 0, {
          cached: true
        });
      } else {
        await runManager?.handleLLMError(promiseResult.reason, void 0, void 0, void 0, {
          cached: true
        });
        return Promise.reject(promiseResult.reason);
      }
    }));
    const output = {
      generations,
      missingPromptIndices,
      startedRunManagers: runManagers
    };
    Object.defineProperty(output, RUN_KEY, {
      value: runManagers ? { runIds: runManagers?.map((manager) => manager.runId) } : void 0,
      configurable: true
    });
    return output;
  }
  /**
   * Generates chat based on the input messages.
   * @param messages An array of arrays of BaseMessage instances.
   * @param options The call options or an array of stop sequences.
   * @param callbacks The callbacks for the language model.
   * @returns A Promise that resolves to an LLMResult.
   */
  async generate(messages, options, callbacks) {
    let parsedOptions;
    if (Array.isArray(options)) {
      parsedOptions = { stop: options };
    } else {
      parsedOptions = options;
    }
    const baseMessages = messages.map((messageList) => messageList.map(coerceMessageLikeToMessage));
    const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptionsCompat(parsedOptions);
    runnableConfig.callbacks = runnableConfig.callbacks ?? callbacks;
    if (!this.cache) {
      return this._generateUncached(baseMessages, callOptions, runnableConfig);
    }
    const { cache: cache2 } = this;
    const llmStringKey = this._getSerializedCacheKeyParametersForCall(callOptions);
    const { generations, missingPromptIndices, startedRunManagers } = await this._generateCached({
      messages: baseMessages,
      cache: cache2,
      llmStringKey,
      parsedOptions: callOptions,
      handledOptions: runnableConfig
    });
    let llmOutput = {};
    if (missingPromptIndices.length > 0) {
      const results = await this._generateUncached(missingPromptIndices.map((i) => baseMessages[i]), callOptions, runnableConfig, startedRunManagers !== void 0 ? missingPromptIndices.map((i) => startedRunManagers?.[i]) : void 0);
      await Promise.all(results.generations.map(async (generation, index2) => {
        const promptIndex = missingPromptIndices[index2];
        generations[promptIndex] = generation;
        const prompt = _BaseChatModel._convertInputToPromptValue(baseMessages[promptIndex]).toString();
        return cache2.update(prompt, llmStringKey, generation);
      }));
      llmOutput = results.llmOutput ?? {};
    }
    return { generations, llmOutput };
  }
  /**
   * Get the parameters used to invoke the model
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invocationParams(_options) {
    return {};
  }
  _modelType() {
    return "base_chat_model";
  }
  /**
   * @deprecated
   * Return a json-like object representing this LLM.
   */
  serialize() {
    return {
      ...this.invocationParams(),
      _type: this._llmType(),
      _model: this._modelType()
    };
  }
  /**
   * Generates a prompt based on the input prompt values.
   * @param promptValues An array of BasePromptValue instances.
   * @param options The call options or an array of stop sequences.
   * @param callbacks The callbacks for the language model.
   * @returns A Promise that resolves to an LLMResult.
   */
  async generatePrompt(promptValues, options, callbacks) {
    const promptMessages = promptValues.map((promptValue) => promptValue.toChatMessages());
    return this.generate(promptMessages, options, callbacks);
  }
  /**
   * @deprecated Use .invoke() instead. Will be removed in 0.2.0.
   *
   * Makes a single call to the chat model.
   * @param messages An array of BaseMessage instances.
   * @param options The call options or an array of stop sequences.
   * @param callbacks The callbacks for the language model.
   * @returns A Promise that resolves to a BaseMessage.
   */
  async call(messages, options, callbacks) {
    const result = await this.generate([messages.map(coerceMessageLikeToMessage)], options, callbacks);
    const generations = result.generations;
    return generations[0][0].message;
  }
  /**
   * @deprecated Use .invoke() instead. Will be removed in 0.2.0.
   *
   * Makes a single call to the chat model with a prompt value.
   * @param promptValue The value of the prompt.
   * @param options The call options or an array of stop sequences.
   * @param callbacks The callbacks for the language model.
   * @returns A Promise that resolves to a BaseMessage.
   */
  async callPrompt(promptValue, options, callbacks) {
    const promptMessages = promptValue.toChatMessages();
    return this.call(promptMessages, options, callbacks);
  }
  /**
   * @deprecated Use .invoke() instead. Will be removed in 0.2.0.
   *
   * Predicts the next message based on the input messages.
   * @param messages An array of BaseMessage instances.
   * @param options The call options or an array of stop sequences.
   * @param callbacks The callbacks for the language model.
   * @returns A Promise that resolves to a BaseMessage.
   */
  async predictMessages(messages, options, callbacks) {
    return this.call(messages, options, callbacks);
  }
  /**
   * @deprecated Use .invoke() instead. Will be removed in 0.2.0.
   *
   * Predicts the next message based on a text input.
   * @param text The text input.
   * @param options The call options or an array of stop sequences.
   * @param callbacks The callbacks for the language model.
   * @returns A Promise that resolves to a string.
   */
  async predict(text, options, callbacks) {
    const message = new HumanMessage(text);
    const result = await this.call([message], options, callbacks);
    if (typeof result.content !== "string") {
      throw new Error("Cannot use predict when output is not a string.");
    }
    return result.content;
  }
  withStructuredOutput(outputSchema, config) {
    if (typeof this.bindTools !== "function") {
      throw new Error(`Chat model must implement ".bindTools()" to use withStructuredOutput.`);
    }
    if (config?.strict) {
      throw new Error(`"strict" mode is not supported for this model by default.`);
    }
    const schema = outputSchema;
    const name = config?.name;
    const description = schema.description ?? "A function available to call.";
    const method = config?.method;
    const includeRaw = config?.includeRaw;
    if (method === "jsonMode") {
      throw new Error(`Base withStructuredOutput implementation only supports "functionCalling" as a method.`);
    }
    let functionName = name ?? "extract";
    let tools;
    if (isZodSchema(schema)) {
      tools = [
        {
          type: "function",
          function: {
            name: functionName,
            description,
            parameters: zodToJsonSchema(schema)
          }
        }
      ];
    } else {
      if ("name" in schema) {
        functionName = schema.name;
      }
      tools = [
        {
          type: "function",
          function: {
            name: functionName,
            description,
            parameters: schema
          }
        }
      ];
    }
    const llm = this.bindTools(tools);
    const outputParser = RunnableLambda.from((input) => {
      if (!input.tool_calls || input.tool_calls.length === 0) {
        throw new Error("No tool calls found in the response.");
      }
      const toolCall = input.tool_calls.find((tc) => tc.name === functionName);
      if (!toolCall) {
        throw new Error(`No tool call found with name ${functionName}.`);
      }
      return toolCall.args;
    });
    if (!includeRaw) {
      return llm.pipe(outputParser).withConfig({
        runName: "StructuredOutput"
      });
    }
    const parserAssign = RunnablePassthrough.assign({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parsed: (input, config2) => outputParser.invoke(input.raw, config2)
    });
    const parserNone = RunnablePassthrough.assign({
      parsed: () => null
    });
    const parsedWithFallback = parserAssign.withFallbacks({
      fallbacks: [parserNone]
    });
    return RunnableSequence.from([
      {
        raw: llm
      },
      parsedWithFallback
    ]).withConfig({
      runName: "StructuredOutputRunnable"
    });
  }
};

// node_modules/@langchain/google-genai/dist/utils/zod_to_genai_parameters.js
function removeAdditionalProperties(obj) {
  if (typeof obj === "object" && obj !== null) {
    const newObj = { ...obj };
    if ("additionalProperties" in newObj) {
      delete newObj.additionalProperties;
    }
    if ("$schema" in newObj) {
      delete newObj.$schema;
    }
    for (const key in newObj) {
      if (key in newObj) {
        if (Array.isArray(newObj[key])) {
          newObj[key] = newObj[key].map(removeAdditionalProperties);
        } else if (typeof newObj[key] === "object" && newObj[key] !== null) {
          newObj[key] = removeAdditionalProperties(newObj[key]);
        }
      }
    }
    return newObj;
  }
  return obj;
}
function zodToGenerativeAIParameters(zodObj) {
  const jsonSchema = removeAdditionalProperties(zodToJsonSchema(zodObj));
  const { $schema, ...rest } = jsonSchema;
  return rest;
}
function jsonSchemaToGeminiParameters(schema) {
  const jsonSchema = removeAdditionalProperties(schema);
  const { $schema, ...rest } = jsonSchema;
  return rest;
}

// node_modules/@langchain/core/dist/tools/types.js
function isStructuredTool(tool) {
  return tool !== void 0 && Array.isArray(tool.lc_namespace);
}
function isRunnableToolLike(tool) {
  return tool !== void 0 && Runnable.isRunnable(tool) && "lc_name" in tool.constructor && typeof tool.constructor.lc_name === "function" && tool.constructor.lc_name() === "RunnableToolLike";
}
function isStructuredToolParams(tool) {
  return !!tool && typeof tool === "object" && "name" in tool && "schema" in tool && // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (isZodSchema(tool.schema) || tool.schema != null && typeof tool.schema === "object" && "type" in tool.schema && typeof tool.schema.type === "string" && ["null", "boolean", "object", "array", "number", "string"].includes(tool.schema.type));
}
function isLangChainTool(tool) {
  return isStructuredToolParams(tool) || isRunnableToolLike(tool) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isStructuredTool(tool);
}

// node_modules/@cfworker/json-schema/dist/esm/dereference.js
var initialBaseURI = typeof self !== "undefined" && self.location && self.location.origin !== "null" ? new URL(self.location.origin + self.location.pathname + location.search) : new URL("https://github.com/cfworker");

// node_modules/@cfworker/json-schema/dist/esm/format.js
var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
var HOSTNAME = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i;
var URIREF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
var URITEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
var URL_ = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
var UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
var JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
var JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
var RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
var EMAIL = (input) => {
  if (input[0] === '"')
    return false;
  const [name, host, ...rest] = input.split("@");
  if (!name || !host || rest.length !== 0 || name.length > 64 || host.length > 253)
    return false;
  if (name[0] === "." || name.endsWith(".") || name.includes(".."))
    return false;
  if (!/^[a-z0-9.-]+$/i.test(host) || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(name))
    return false;
  return host.split(".").every((part) => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i.test(part));
};
var IPV4 = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
var IPV6 = /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i;
var DURATION = (input) => input.length > 1 && input.length < 80 && (/^P\d+([.,]\d+)?W$/.test(input) || /^P[\dYMDTHS]*(\d[.,]\d+)?[YMDHS]$/.test(input) && /^P([.,\d]+Y)?([.,\d]+M)?([.,\d]+D)?(T([.,\d]+H)?([.,\d]+M)?([.,\d]+S)?)?$/.test(input));
function bind(r) {
  return r.test.bind(r);
}
var format = {
  date,
  time: time.bind(void 0, false),
  "date-time": date_time,
  duration: DURATION,
  uri,
  "uri-reference": bind(URIREF),
  "uri-template": bind(URITEMPLATE),
  url: bind(URL_),
  email: EMAIL,
  hostname: bind(HOSTNAME),
  ipv4: bind(IPV4),
  ipv6: bind(IPV6),
  regex,
  uuid: bind(UUID),
  "json-pointer": bind(JSON_POINTER),
  "json-pointer-uri-fragment": bind(JSON_POINTER_URI_FRAGMENT),
  "relative-json-pointer": bind(RELATIVE_JSON_POINTER)
};
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function date(str) {
  const matches = str.match(DATE);
  if (!matches)
    return false;
  const year = +matches[1];
  const month = +matches[2];
  const day = +matches[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month == 2 && isLeapYear(year) ? 29 : DAYS[month]);
}
function time(full, str) {
  const matches = str.match(TIME);
  if (!matches)
    return false;
  const hour = +matches[1];
  const minute = +matches[2];
  const second = +matches[3];
  const timeZone = !!matches[5];
  return (hour <= 23 && minute <= 59 && second <= 59 || hour == 23 && minute == 59 && second == 60) && (!full || timeZone);
}
var DATE_TIME_SEPARATOR = /t|\s/i;
function date_time(str) {
  const dateTime = str.split(DATE_TIME_SEPARATOR);
  return dateTime.length == 2 && date(dateTime[0]) && time(true, dateTime[1]);
}
var NOT_URI_FRAGMENT = /\/|:/;
var URI_PATTERN = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function uri(str) {
  return NOT_URI_FRAGMENT.test(str) && URI_PATTERN.test(str);
}
var Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
  if (Z_ANCHOR.test(str))
    return false;
  try {
    new RegExp(str, "u");
    return true;
  } catch (e) {
    return false;
  }
}

// node_modules/@cfworker/json-schema/dist/esm/types.js
var OutputFormat;
(function(OutputFormat2) {
  OutputFormat2[OutputFormat2["Flag"] = 1] = "Flag";
  OutputFormat2[OutputFormat2["Basic"] = 2] = "Basic";
  OutputFormat2[OutputFormat2["Detailed"] = 4] = "Detailed";
})(OutputFormat || (OutputFormat = {}));

// node_modules/@langchain/google-genai/dist/utils/common.js
function getMessageAuthor(message) {
  const type = message._getType();
  if (ChatMessage.isInstance(message)) {
    return message.role;
  }
  if (type === "tool") {
    return type;
  }
  return message.name ?? type;
}
function convertAuthorToRole(author) {
  switch (author) {
    /**
     *  Note: Gemini currently is not supporting system messages
     *  we will convert them to human messages and merge with following
     * */
    case "ai":
    case "model":
      return "model";
    case "system":
      return "system";
    case "human":
      return "user";
    case "tool":
    case "function":
      return "function";
    default:
      throw new Error(`Unknown / unsupported author: ${author}`);
  }
}
function messageContentMedia(content) {
  if ("mimeType" in content && "data" in content) {
    return {
      inlineData: {
        mimeType: content.mimeType,
        data: content.data
      }
    };
  }
  if ("mimeType" in content && "fileUri" in content) {
    return {
      fileData: {
        mimeType: content.mimeType,
        fileUri: content.fileUri
      }
    };
  }
  throw new Error("Invalid media content");
}
function convertMessageContentToParts(message, isMultimodalModel) {
  if (typeof message.content === "string" && message.content !== "") {
    return [{ text: message.content }];
  }
  let functionCalls = [];
  let functionResponses = [];
  let messageParts = [];
  if ("tool_calls" in message && Array.isArray(message.tool_calls) && message.tool_calls.length > 0) {
    functionCalls = message.tool_calls.map((tc) => ({
      functionCall: {
        name: tc.name,
        args: tc.args
      }
    }));
  } else if (message.getType() === "tool" && message.name && message.content) {
    functionResponses = [
      {
        functionResponse: {
          name: message.name,
          response: message.content
        }
      }
    ];
  } else if (Array.isArray(message.content)) {
    messageParts = message.content.map((c) => {
      if (c.type === "text") {
        return {
          text: c.text
        };
      } else if (c.type === "executableCode") {
        return {
          executableCode: c.executableCode
        };
      } else if (c.type === "codeExecutionResult") {
        return {
          codeExecutionResult: c.codeExecutionResult
        };
      }
      if (c.type === "image_url") {
        if (!isMultimodalModel) {
          throw new Error(`This model does not support images`);
        }
        let source;
        if (typeof c.image_url === "string") {
          source = c.image_url;
        } else if (typeof c.image_url === "object" && "url" in c.image_url) {
          source = c.image_url.url;
        } else {
          throw new Error("Please provide image as base64 encoded data URL");
        }
        const [dm, data] = source.split(",");
        if (!dm.startsWith("data:")) {
          throw new Error("Please provide image as base64 encoded data URL");
        }
        const [mimeType, encoding] = dm.replace(/^data:/, "").split(";");
        if (encoding !== "base64") {
          throw new Error("Please provide image as base64 encoded data URL");
        }
        return {
          inlineData: {
            data,
            mimeType
          }
        };
      } else if (c.type === "media") {
        return messageContentMedia(c);
      } else if (c.type === "tool_use") {
        return {
          functionCall: {
            name: c.name,
            args: c.input
          }
        };
      } else if (c.type?.includes("/") && // Ensure it's a single slash.
      c.type.split("/").length === 2 && "data" in c && typeof c.data === "string") {
        return {
          inlineData: {
            mimeType: c.type,
            data: c.data
          }
        };
      }
      throw new Error(`Unknown content type ${c.type}`);
    });
  }
  return [...messageParts, ...functionCalls, ...functionResponses];
}
function convertBaseMessagesToContent(messages, isMultimodalModel, convertSystemMessageToHumanContent = false) {
  return messages.reduce((acc, message, index2) => {
    if (!isBaseMessage(message)) {
      throw new Error("Unsupported message input");
    }
    const author = getMessageAuthor(message);
    if (author === "system" && index2 !== 0) {
      throw new Error("System message should be the first one");
    }
    const role = convertAuthorToRole(author);
    const prevContent = acc.content[acc.content.length];
    if (!acc.mergeWithPreviousContent && prevContent && prevContent.role === role) {
      throw new Error("Google Generative AI requires alternate messages between authors");
    }
    const parts = convertMessageContentToParts(message, isMultimodalModel);
    if (acc.mergeWithPreviousContent) {
      const prevContent2 = acc.content[acc.content.length - 1];
      if (!prevContent2) {
        throw new Error("There was a problem parsing your system message. Please try a prompt without one.");
      }
      prevContent2.parts.push(...parts);
      return {
        mergeWithPreviousContent: false,
        content: acc.content
      };
    }
    let actualRole = role;
    if (actualRole === "function" || actualRole === "system" && !convertSystemMessageToHumanContent) {
      actualRole = "user";
    }
    const content = {
      role: actualRole,
      parts
    };
    return {
      mergeWithPreviousContent: author === "system" && !convertSystemMessageToHumanContent,
      content: [...acc.content, content]
    };
  }, { content: [], mergeWithPreviousContent: false }).content;
}
function mapGenerateContentResultToChatResult(response, extra) {
  if (!response.candidates || response.candidates.length === 0 || !response.candidates[0]) {
    return {
      generations: [],
      llmOutput: {
        filters: response.promptFeedback
      }
    };
  }
  const functionCalls = response.functionCalls();
  const [candidate] = response.candidates;
  const { content: candidateContent, ...generationInfo } = candidate;
  let content;
  if (candidateContent?.parts.length === 1 && candidateContent.parts[0].text) {
    content = candidateContent.parts[0].text;
  } else {
    content = candidateContent.parts.map((p) => {
      if ("text" in p) {
        return {
          type: "text",
          text: p.text
        };
      } else if ("executableCode" in p) {
        return {
          type: "executableCode",
          executableCode: p.executableCode
        };
      } else if ("codeExecutionResult" in p) {
        return {
          type: "codeExecutionResult",
          codeExecutionResult: p.codeExecutionResult
        };
      }
      return p;
    });
  }
  let text = "";
  if (typeof content === "string") {
    text = content;
  } else if ("text" in content[0]) {
    text = content[0].text;
  }
  const generation = {
    text,
    message: new AIMessage({
      content,
      tool_calls: functionCalls?.map((fc) => ({
        ...fc,
        type: "tool_call"
      })),
      additional_kwargs: {
        ...generationInfo
      },
      usage_metadata: extra?.usageMetadata
    }),
    generationInfo
  };
  return {
    generations: [generation],
    llmOutput: {
      tokenUsage: {
        promptTokens: extra?.usageMetadata?.input_tokens,
        completionTokens: extra?.usageMetadata?.output_tokens,
        totalTokens: extra?.usageMetadata?.total_tokens
      }
    }
  };
}
function convertResponseContentToChatGenerationChunk(response, extra) {
  if (!response.candidates || response.candidates.length === 0) {
    return null;
  }
  const functionCalls = response.functionCalls();
  const [candidate] = response.candidates;
  const { content: candidateContent, ...generationInfo } = candidate;
  let content;
  if (candidateContent?.parts && candidateContent.parts.every((p) => "text" in p)) {
    content = candidateContent.parts.map((p) => p.text).join("");
  } else if (candidateContent.parts) {
    content = candidateContent.parts.map((p) => {
      if ("text" in p) {
        return {
          type: "text",
          text: p.text
        };
      } else if ("executableCode" in p) {
        return {
          type: "executableCode",
          executableCode: p.executableCode
        };
      } else if ("codeExecutionResult" in p) {
        return {
          type: "codeExecutionResult",
          codeExecutionResult: p.codeExecutionResult
        };
      }
      return p;
    });
  }
  let text = "";
  if (content && typeof content === "string") {
    text = content;
  } else if (content && typeof content === "object" && "text" in content[0]) {
    text = content[0].text;
  }
  const toolCallChunks = [];
  if (functionCalls) {
    toolCallChunks.push(...functionCalls.map((fc) => ({
      ...fc,
      args: JSON.stringify(fc.args),
      index: extra.index,
      type: "tool_call_chunk"
    })));
  }
  return new ChatGenerationChunk({
    text,
    message: new AIMessageChunk({
      content: content || "",
      name: !candidateContent ? void 0 : candidateContent.role,
      tool_call_chunks: toolCallChunks,
      // Each chunk can have unique "generationInfo", and merging strategy is unclear,
      // so leave blank for now.
      additional_kwargs: {},
      usage_metadata: extra.usageMetadata
    }),
    generationInfo
  });
}
function convertToGenerativeAITools(tools) {
  if (tools.every((tool) => "functionDeclarations" in tool && Array.isArray(tool.functionDeclarations))) {
    return tools;
  }
  return [
    {
      functionDeclarations: tools.map((tool) => {
        if (isLangChainTool(tool)) {
          const jsonSchema = zodToGenerativeAIParameters(tool.schema);
          return {
            name: tool.name,
            description: tool.description,
            parameters: jsonSchema
          };
        }
        if (isOpenAITool(tool)) {
          return {
            name: tool.function.name,
            description: tool.function.description ?? `A function available to call.`,
            parameters: jsonSchemaToGeminiParameters(tool.function.parameters)
          };
        }
        return tool;
      })
    }
  ];
}

// node_modules/@langchain/core/dist/output_parsers/base.js
var BaseLLMOutputParser = class extends Runnable {
  /**
   * Parses the result of an LLM call with a given prompt. By default, it
   * simply calls `parseResult`.
   * @param generations The generations from an LLM call.
   * @param _prompt The prompt used in the LLM call.
   * @param callbacks Optional callbacks.
   * @returns A promise of the parsed output.
   */
  parseResultWithPrompt(generations, _prompt, callbacks) {
    return this.parseResult(generations, callbacks);
  }
  _baseMessageToString(message) {
    return typeof message.content === "string" ? message.content : this._baseMessageContentToString(message.content);
  }
  _baseMessageContentToString(content) {
    return JSON.stringify(content);
  }
  /**
   * Calls the parser with a given input and optional configuration options.
   * If the input is a string, it creates a generation with the input as
   * text and calls `parseResult`. If the input is a `BaseMessage`, it
   * creates a generation with the input as a message and the content of the
   * input as text, and then calls `parseResult`.
   * @param input The input to the parser, which can be a string or a `BaseMessage`.
   * @param options Optional configuration options.
   * @returns A promise of the parsed output.
   */
  async invoke(input, options) {
    if (typeof input === "string") {
      return this._callWithConfig(async (input2, options2) => this.parseResult([{ text: input2 }], options2?.callbacks), input, { ...options, runType: "parser" });
    } else {
      return this._callWithConfig(async (input2, options2) => this.parseResult([
        {
          message: input2,
          text: this._baseMessageToString(input2)
        }
      ], options2?.callbacks), input, { ...options, runType: "parser" });
    }
  }
};
var OutputParserException = class extends Error {
  constructor(message, llmOutput, observation, sendToLLM = false) {
    super(message);
    Object.defineProperty(this, "llmOutput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "observation", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "sendToLLM", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.llmOutput = llmOutput;
    this.observation = observation;
    this.sendToLLM = sendToLLM;
    if (sendToLLM) {
      if (observation === void 0 || llmOutput === void 0) {
        throw new Error("Arguments 'observation' & 'llmOutput' are required if 'sendToLlm' is true");
      }
    }
    addLangChainErrorFields(this, "OUTPUT_PARSING_FAILURE");
  }
};

// node_modules/@langchain/google-genai/dist/output_parsers.js
var GoogleGenerativeAIToolsOutputParser = class extends BaseLLMOutputParser {
  static lc_name() {
    return "GoogleGenerativeAIToolsOutputParser";
  }
  constructor(params) {
    super(params);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain", "google_genai", "output_parsers"]
    });
    Object.defineProperty(this, "returnId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "keyName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "returnSingle", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "zodSchema", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.keyName = params.keyName;
    this.returnSingle = params.returnSingle ?? this.returnSingle;
    this.zodSchema = params.zodSchema;
  }
  async _validateResult(result) {
    if (this.zodSchema === void 0) {
      return result;
    }
    const zodParsedResult = await this.zodSchema.safeParseAsync(result);
    if (zodParsedResult.success) {
      return zodParsedResult.data;
    } else {
      throw new OutputParserException(`Failed to parse. Text: "${JSON.stringify(result, null, 2)}". Error: ${JSON.stringify(zodParsedResult.error.errors)}`, JSON.stringify(result, null, 2));
    }
  }
  async parseResult(generations) {
    const tools = generations.flatMap((generation) => {
      const { message } = generation;
      if (!("tool_calls" in message) || !Array.isArray(message.tool_calls)) {
        return [];
      }
      return message.tool_calls;
    });
    if (tools[0] === void 0) {
      throw new Error("No parseable tool calls provided to GoogleGenerativeAIToolsOutputParser.");
    }
    const [tool] = tools;
    const validatedResult = await this._validateResult(tool.args);
    return validatedResult;
  }
};

// node_modules/@langchain/google-genai/dist/utils/tools.js
function convertToolsToGenAI(tools, extra) {
  const genAITools = processTools(tools);
  const toolConfig = createToolConfig(genAITools, extra);
  return { tools: genAITools, toolConfig };
}
function processTools(tools) {
  let functionDeclarationTools = [];
  const genAITools = [];
  tools.forEach((tool) => {
    if (isLangChainTool(tool)) {
      const [convertedTool] = convertToGenerativeAITools([
        tool
      ]);
      if (convertedTool.functionDeclarations) {
        functionDeclarationTools.push(...convertedTool.functionDeclarations);
      }
    } else if (isOpenAITool(tool)) {
      const { functionDeclarations } = convertOpenAIToolToGenAI(tool);
      if (functionDeclarations) {
        functionDeclarationTools.push(...functionDeclarations);
      } else {
        throw new Error("Failed to convert OpenAI structured tool to GenerativeAI tool");
      }
    } else {
      genAITools.push(tool);
    }
  });
  const genAIFunctionDeclaration = genAITools.find((t) => "functionDeclarations" in t);
  if (genAIFunctionDeclaration) {
    return genAITools.map((tool) => {
      if (functionDeclarationTools?.length > 0 && "functionDeclarations" in tool) {
        const newTool = {
          functionDeclarations: [
            ...tool.functionDeclarations || [],
            ...functionDeclarationTools
          ]
        };
        functionDeclarationTools = [];
        return newTool;
      }
      return tool;
    });
  }
  return [
    ...genAITools,
    ...functionDeclarationTools.length > 0 ? [
      {
        functionDeclarations: functionDeclarationTools
      }
    ] : []
  ];
}
function convertOpenAIToolToGenAI(tool) {
  return {
    functionDeclarations: [
      {
        name: tool.function.name,
        description: tool.function.description,
        parameters: removeAdditionalProperties(tool.function.parameters)
      }
    ]
  };
}
function createToolConfig(genAITools, extra) {
  if (!genAITools.length || !extra)
    return void 0;
  const { toolChoice, allowedFunctionNames } = extra;
  const modeMap = {
    any: FunctionCallingMode.ANY,
    auto: FunctionCallingMode.AUTO,
    none: FunctionCallingMode.NONE
  };
  if (toolChoice && ["any", "auto", "none"].includes(toolChoice)) {
    return {
      functionCallingConfig: {
        mode: modeMap[toolChoice] ?? "MODE_UNSPECIFIED",
        allowedFunctionNames
      }
    };
  }
  if (typeof toolChoice === "string" || allowedFunctionNames) {
    return {
      functionCallingConfig: {
        mode: FunctionCallingMode.ANY,
        allowedFunctionNames: [
          ...allowedFunctionNames ?? [],
          ...toolChoice && typeof toolChoice === "string" ? [toolChoice] : []
        ]
      }
    };
  }
  return void 0;
}

// node_modules/@langchain/google-genai/dist/chat_models.js
var ChatGoogleGenerativeAI = class extends BaseChatModel {
  static lc_name() {
    return "ChatGoogleGenerativeAI";
  }
  get lc_secrets() {
    return {
      apiKey: "GOOGLE_API_KEY"
    };
  }
  get lc_aliases() {
    return {
      apiKey: "google_api_key"
    };
  }
  get _isMultimodalModel() {
    return this.model.includes("vision") || this.model.startsWith("gemini-1.5") || this.model.startsWith("gemini-2");
  }
  constructor(fields) {
    super(fields ?? {});
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain", "chat_models", "google_genai"]
    });
    Object.defineProperty(this, "modelName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "gemini-pro"
    });
    Object.defineProperty(this, "model", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "gemini-pro"
    });
    Object.defineProperty(this, "temperature", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "maxOutputTokens", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "topP", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "topK", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "stopSequences", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "safetySettings", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "apiKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "streaming", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "streamUsage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "convertSystemMessageToHumanContent", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.modelName = fields?.model?.replace(/^models\//, "") ?? fields?.modelName?.replace(/^models\//, "") ?? this.model;
    this.model = this.modelName;
    this.maxOutputTokens = fields?.maxOutputTokens ?? this.maxOutputTokens;
    if (this.maxOutputTokens && this.maxOutputTokens < 0) {
      throw new Error("`maxOutputTokens` must be a positive integer");
    }
    this.temperature = fields?.temperature ?? this.temperature;
    if (this.temperature && (this.temperature < 0 || this.temperature > 2)) {
      throw new Error("`temperature` must be in the range of [0.0,2.0]");
    }
    this.topP = fields?.topP ?? this.topP;
    if (this.topP && this.topP < 0) {
      throw new Error("`topP` must be a positive integer");
    }
    if (this.topP && this.topP > 1) {
      throw new Error("`topP` must be below 1.");
    }
    this.topK = fields?.topK ?? this.topK;
    if (this.topK && this.topK < 0) {
      throw new Error("`topK` must be a positive integer");
    }
    this.stopSequences = fields?.stopSequences ?? this.stopSequences;
    this.apiKey = fields?.apiKey ?? getEnvironmentVariable("GOOGLE_API_KEY");
    if (!this.apiKey) {
      throw new Error("Please set an API key for Google GenerativeAI in the environment variable GOOGLE_API_KEY or in the `apiKey` field of the ChatGoogleGenerativeAI constructor");
    }
    this.safetySettings = fields?.safetySettings ?? this.safetySettings;
    if (this.safetySettings && this.safetySettings.length > 0) {
      const safetySettingsSet = new Set(this.safetySettings.map((s) => s.category));
      if (safetySettingsSet.size !== this.safetySettings.length) {
        throw new Error("The categories in `safetySettings` array must be unique");
      }
    }
    this.streaming = fields?.streaming ?? this.streaming;
    this.client = new GoogleGenerativeAI(this.apiKey).getGenerativeModel({
      model: this.model,
      safetySettings: this.safetySettings,
      generationConfig: {
        candidateCount: 1,
        stopSequences: this.stopSequences,
        maxOutputTokens: this.maxOutputTokens,
        temperature: this.temperature,
        topP: this.topP,
        topK: this.topK,
        ...fields?.json ? { responseMimeType: "application/json" } : {}
      }
    }, {
      apiVersion: fields?.apiVersion,
      baseUrl: fields?.baseUrl
    });
    this.streamUsage = fields?.streamUsage ?? this.streamUsage;
  }
  useCachedContent(cachedContent, modelParams, requestOptions) {
    if (!this.apiKey)
      return;
    this.client = new GoogleGenerativeAI(this.apiKey).getGenerativeModelFromCachedContent(cachedContent, modelParams, requestOptions);
  }
  get useSystemInstruction() {
    return typeof this.convertSystemMessageToHumanContent === "boolean" ? !this.convertSystemMessageToHumanContent : this.computeUseSystemInstruction;
  }
  get computeUseSystemInstruction() {
    if (this.modelName === "gemini-1.0-pro-001") {
      return false;
    } else if (this.modelName.startsWith("gemini-pro-vision")) {
      return false;
    } else if (this.modelName.startsWith("gemini-1.0-pro-vision")) {
      return false;
    } else if (this.modelName === "gemini-pro") {
      return false;
    }
    return true;
  }
  getLsParams(options) {
    return {
      ls_provider: "google_genai",
      ls_model_name: this.model,
      ls_model_type: "chat",
      ls_temperature: this.client.generationConfig.temperature,
      ls_max_tokens: this.client.generationConfig.maxOutputTokens,
      ls_stop: options.stop
    };
  }
  _combineLLMOutput() {
    return [];
  }
  _llmType() {
    return "googlegenerativeai";
  }
  bindTools(tools, kwargs) {
    return this.bind({ tools: convertToolsToGenAI(tools)?.tools, ...kwargs });
  }
  invocationParams(options) {
    const toolsAndConfig = options?.tools?.length ? convertToolsToGenAI(options.tools, {
      toolChoice: options.tool_choice,
      allowedFunctionNames: options.allowedFunctionNames
    }) : void 0;
    return {
      ...toolsAndConfig?.tools ? { tools: toolsAndConfig.tools } : {},
      ...toolsAndConfig?.toolConfig ? { toolConfig: toolsAndConfig.toolConfig } : {}
    };
  }
  async _generate(messages, options, runManager) {
    const prompt = convertBaseMessagesToContent(messages, this._isMultimodalModel, this.useSystemInstruction);
    let actualPrompt = prompt;
    if (prompt[0].role === "system") {
      const [systemInstruction] = prompt;
      this.client.systemInstruction = systemInstruction;
      actualPrompt = prompt.slice(1);
    }
    const parameters = this.invocationParams(options);
    if (this.streaming) {
      const tokenUsage = {};
      const stream = this._streamResponseChunks(messages, options, runManager);
      const finalChunks = {};
      for await (const chunk of stream) {
        const index2 = chunk.generationInfo?.completion ?? 0;
        if (finalChunks[index2] === void 0) {
          finalChunks[index2] = chunk;
        } else {
          finalChunks[index2] = finalChunks[index2].concat(chunk);
        }
      }
      const generations = Object.entries(finalChunks).sort(([aKey], [bKey]) => parseInt(aKey, 10) - parseInt(bKey, 10)).map(([_, value]) => value);
      return { generations, llmOutput: { estimatedTokenUsage: tokenUsage } };
    }
    const res = await this.completionWithRetry({
      ...parameters,
      contents: actualPrompt
    });
    let usageMetadata;
    if ("usageMetadata" in res.response) {
      const genAIUsageMetadata = res.response.usageMetadata;
      usageMetadata = {
        input_tokens: genAIUsageMetadata.promptTokenCount ?? 0,
        output_tokens: genAIUsageMetadata.candidatesTokenCount ?? 0,
        total_tokens: genAIUsageMetadata.totalTokenCount ?? 0
      };
    }
    const generationResult = mapGenerateContentResultToChatResult(res.response, {
      usageMetadata
    });
    await runManager?.handleLLMNewToken(generationResult.generations[0].text ?? "");
    return generationResult;
  }
  async *_streamResponseChunks(messages, options, runManager) {
    const prompt = convertBaseMessagesToContent(messages, this._isMultimodalModel, this.useSystemInstruction);
    let actualPrompt = prompt;
    if (prompt[0].role === "system") {
      const [systemInstruction] = prompt;
      this.client.systemInstruction = systemInstruction;
      actualPrompt = prompt.slice(1);
    }
    const parameters = this.invocationParams(options);
    const request = {
      ...parameters,
      contents: actualPrompt
    };
    const stream = await this.caller.callWithOptions({ signal: options?.signal }, async () => {
      const { stream: stream2 } = await this.client.generateContentStream(request);
      return stream2;
    });
    let usageMetadata;
    let index2 = 0;
    for await (const response of stream) {
      if ("usageMetadata" in response && this.streamUsage !== false && options.streamUsage !== false) {
        const genAIUsageMetadata = response.usageMetadata;
        if (!usageMetadata) {
          usageMetadata = {
            input_tokens: genAIUsageMetadata.promptTokenCount ?? 0,
            output_tokens: genAIUsageMetadata.candidatesTokenCount ?? 0,
            total_tokens: genAIUsageMetadata.totalTokenCount ?? 0
          };
        } else {
          const outputTokenDiff = (genAIUsageMetadata.candidatesTokenCount ?? 0) - usageMetadata.output_tokens;
          usageMetadata = {
            input_tokens: 0,
            output_tokens: outputTokenDiff,
            total_tokens: outputTokenDiff
          };
        }
      }
      const chunk = convertResponseContentToChatGenerationChunk(response, {
        usageMetadata,
        index: index2
      });
      index2 += 1;
      if (!chunk) {
        continue;
      }
      yield chunk;
      await runManager?.handleLLMNewToken(chunk.text ?? "");
    }
  }
  async completionWithRetry(request, options) {
    return this.caller.callWithOptions({ signal: options?.signal }, async () => {
      try {
        return await this.client.generateContent(request);
      } catch (e) {
        if (e.message?.includes("400 Bad Request")) {
          e.status = 400;
        }
        throw e;
      }
    });
  }
  withStructuredOutput(outputSchema, config) {
    const schema = outputSchema;
    const name = config?.name;
    const method = config?.method;
    const includeRaw = config?.includeRaw;
    if (method === "jsonMode") {
      throw new Error(`ChatGoogleGenerativeAI only supports "functionCalling" as a method.`);
    }
    let functionName = name ?? "extract";
    let outputParser;
    let tools;
    if (isZodSchema(schema)) {
      const jsonSchema = zodToGenerativeAIParameters(schema);
      tools = [
        {
          functionDeclarations: [
            {
              name: functionName,
              description: jsonSchema.description ?? "A function available to call.",
              parameters: jsonSchema
            }
          ]
        }
      ];
      outputParser = new GoogleGenerativeAIToolsOutputParser({
        returnSingle: true,
        keyName: functionName,
        zodSchema: schema
      });
    } else {
      let geminiFunctionDefinition;
      if (typeof schema.name === "string" && typeof schema.parameters === "object" && schema.parameters != null) {
        geminiFunctionDefinition = schema;
        functionName = schema.name;
      } else {
        geminiFunctionDefinition = {
          name: functionName,
          description: schema.description ?? "",
          parameters: schema
        };
      }
      tools = [
        {
          functionDeclarations: [geminiFunctionDefinition]
        }
      ];
      outputParser = new GoogleGenerativeAIToolsOutputParser({
        returnSingle: true,
        keyName: functionName
      });
    }
    const llm = this.bind({
      tools,
      tool_choice: functionName
    });
    if (!includeRaw) {
      return llm.pipe(outputParser).withConfig({
        runName: "ChatGoogleGenerativeAIStructuredOutput"
      });
    }
    const parserAssign = RunnablePassthrough.assign({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parsed: (input, config2) => outputParser.invoke(input.raw, config2)
    });
    const parserNone = RunnablePassthrough.assign({
      parsed: () => null
    });
    const parsedWithFallback = parserAssign.withFallbacks({
      fallbacks: [parserNone]
    });
    return RunnableSequence.from([
      {
        raw: llm
      },
      parsedWithFallback
    ]).withConfig({
      runName: "StructuredOutputRunnable"
    });
  }
};

// node_modules/ollama/dist/index.mjs
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_path = require("node:path");

// node_modules/ollama/dist/browser.mjs
var import_whatwg_fetch = __toESM(require_fetch_umd(), 1);
var defaultPort = "11434";
var defaultHost = `http://127.0.0.1:${defaultPort}`;
var version = "0.5.16";
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var ResponseError = class _ResponseError extends Error {
  constructor(error, status_code) {
    super(error);
    this.error = error;
    this.status_code = status_code;
    this.name = "ResponseError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _ResponseError);
    }
  }
};
var AbortableAsyncIterator = class {
  constructor(abortController, itr, doneCallback) {
    __publicField$1(this, "abortController");
    __publicField$1(this, "itr");
    __publicField$1(this, "doneCallback");
    this.abortController = abortController;
    this.itr = itr;
    this.doneCallback = doneCallback;
  }
  abort() {
    this.abortController.abort();
  }
  async *[Symbol.asyncIterator]() {
    for await (const message of this.itr) {
      if ("error" in message) {
        throw new Error(message.error);
      }
      yield message;
      if (message.done || message.status === "success") {
        this.doneCallback();
        return;
      }
    }
    throw new Error("Did not receive done or success response in stream.");
  }
};
var checkOk = async (response) => {
  if (response.ok) {
    return;
  }
  let message = `Error ${response.status}: ${response.statusText}`;
  let errorData = null;
  if (response.headers.get("content-type")?.includes("application/json")) {
    try {
      errorData = await response.json();
      message = errorData.error || message;
    } catch (error) {
      console.log("Failed to parse error response as JSON");
    }
  } else {
    try {
      console.log("Getting text from response");
      const textResponse = await response.text();
      message = textResponse || message;
    } catch (error) {
      console.log("Failed to get text from error response");
    }
  }
  throw new ResponseError(message, response.status);
};
function getPlatform() {
  if (typeof window !== "undefined" && window.navigator) {
    const nav = navigator;
    if ("userAgentData" in nav && nav.userAgentData?.platform) {
      return `${nav.userAgentData.platform.toLowerCase()} Browser/${navigator.userAgent};`;
    }
    if (navigator.platform) {
      return `${navigator.platform.toLowerCase()} Browser/${navigator.userAgent};`;
    }
    return `unknown Browser/${navigator.userAgent};`;
  } else if (typeof process !== "undefined") {
    return `${process.arch} ${process.platform} Node.js/${process.version}`;
  }
  return "";
}
function normalizeHeaders(headers) {
  if (headers instanceof Headers) {
    const obj = {};
    headers.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  } else if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  } else {
    return headers || {};
  }
}
var fetchWithHeaders = async (fetch2, url, options = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": `ollama-js/${version} (${getPlatform()})`
  };
  options.headers = normalizeHeaders(options.headers);
  const customHeaders = Object.fromEntries(
    Object.entries(options.headers).filter(([key]) => !Object.keys(defaultHeaders).some((defaultKey) => defaultKey.toLowerCase() === key.toLowerCase()))
  );
  options.headers = {
    ...defaultHeaders,
    ...customHeaders
  };
  return fetch2(url, options);
};
var get = async (fetch2, host, options) => {
  const response = await fetchWithHeaders(fetch2, host, {
    headers: options?.headers
  });
  await checkOk(response);
  return response;
};
var post = async (fetch2, host, data, options) => {
  const isRecord = (input) => {
    return input !== null && typeof input === "object" && !Array.isArray(input);
  };
  const formattedData = isRecord(data) ? JSON.stringify(data) : data;
  const response = await fetchWithHeaders(fetch2, host, {
    method: "POST",
    body: formattedData,
    signal: options?.signal,
    headers: options?.headers
  });
  await checkOk(response);
  return response;
};
var del = async (fetch2, host, data, options) => {
  const response = await fetchWithHeaders(fetch2, host, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: options?.headers
  });
  await checkOk(response);
  return response;
};
var parseJSON = async function* (itr) {
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  const reader = itr.getReader();
  while (true) {
    const { done, value: chunk } = await reader.read();
    if (done) {
      break;
    }
    buffer += decoder.decode(chunk);
    const parts = buffer.split("\n");
    buffer = parts.pop() ?? "";
    for (const part of parts) {
      try {
        yield JSON.parse(part);
      } catch (error) {
        console.warn("invalid json: ", part);
      }
    }
  }
  for (const part of buffer.split("\n").filter((p) => p !== "")) {
    try {
      yield JSON.parse(part);
    } catch (error) {
      console.warn("invalid json: ", part);
    }
  }
};
var formatHost = (host) => {
  if (!host) {
    return defaultHost;
  }
  let isExplicitProtocol = host.includes("://");
  if (host.startsWith(":")) {
    host = `http://127.0.0.1${host}`;
    isExplicitProtocol = true;
  }
  if (!isExplicitProtocol) {
    host = `http://${host}`;
  }
  const url = new URL(host);
  let port = url.port;
  if (!port) {
    if (!isExplicitProtocol) {
      port = defaultPort;
    } else {
      port = url.protocol === "https:" ? "443" : "80";
    }
  }
  let auth = "";
  if (url.username) {
    auth = url.username;
    if (url.password) {
      auth += `:${url.password}`;
    }
    auth += "@";
  }
  let formattedHost = `${url.protocol}//${auth}${url.hostname}:${port}${url.pathname}`;
  if (formattedHost.endsWith("/")) {
    formattedHost = formattedHost.slice(0, -1);
  }
  return formattedHost;
};
var __defProp3 = Object.defineProperty;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField2 = (obj, key, value) => {
  __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var Ollama$1 = class Ollama {
  constructor(config) {
    __publicField2(this, "config");
    __publicField2(this, "fetch");
    __publicField2(this, "ongoingStreamedRequests", []);
    this.config = {
      host: "",
      headers: config?.headers
    };
    if (!config?.proxy) {
      this.config.host = formatHost(config?.host ?? defaultHost);
    }
    this.fetch = config?.fetch ?? fetch;
  }
  // Abort any ongoing streamed requests to Ollama
  abort() {
    for (const request of this.ongoingStreamedRequests) {
      request.abort();
    }
    this.ongoingStreamedRequests.length = 0;
  }
  /**
   * Processes a request to the Ollama server. If the request is streamable, it will return a
   * AbortableAsyncIterator that yields the response messages. Otherwise, it will return the response
   * object.
   * @param endpoint {string} - The endpoint to send the request to.
   * @param request {object} - The request object to send to the endpoint.
   * @protected {T | AbortableAsyncIterator<T>} - The response object or a AbortableAsyncIterator that yields
   * response messages.
   * @throws {Error} - If the response body is missing or if the response is an error.
   * @returns {Promise<T | AbortableAsyncIterator<T>>} - The response object or a AbortableAsyncIterator that yields the streamed response.
   */
  async processStreamableRequest(endpoint, request) {
    request.stream = request.stream ?? false;
    const host = `${this.config.host}/api/${endpoint}`;
    if (request.stream) {
      const abortController = new AbortController();
      const response2 = await post(this.fetch, host, request, {
        signal: abortController.signal,
        headers: this.config.headers
      });
      if (!response2.body) {
        throw new Error("Missing body");
      }
      const itr = parseJSON(response2.body);
      const abortableAsyncIterator = new AbortableAsyncIterator(
        abortController,
        itr,
        () => {
          const i = this.ongoingStreamedRequests.indexOf(abortableAsyncIterator);
          if (i > -1) {
            this.ongoingStreamedRequests.splice(i, 1);
          }
        }
      );
      this.ongoingStreamedRequests.push(abortableAsyncIterator);
      return abortableAsyncIterator;
    }
    const response = await post(this.fetch, host, request, {
      headers: this.config.headers
    });
    return await response.json();
  }
  /**
   * Encodes an image to base64 if it is a Uint8Array.
   * @param image {Uint8Array | string} - The image to encode.
   * @returns {Promise<string>} - The base64 encoded image.
   */
  async encodeImage(image) {
    if (typeof image !== "string") {
      const uint8Array = new Uint8Array(image);
      let byteString = "";
      const len = uint8Array.byteLength;
      for (let i = 0; i < len; i++) {
        byteString += String.fromCharCode(uint8Array[i]);
      }
      return btoa(byteString);
    }
    return image;
  }
  /**
   * Generates a response from a text prompt.
   * @param request {GenerateRequest} - The request object.
   * @returns {Promise<GenerateResponse | AbortableAsyncIterator<GenerateResponse>>} - The response object or
   * an AbortableAsyncIterator that yields response messages.
   */
  async generate(request) {
    if (request.images) {
      request.images = await Promise.all(request.images.map(this.encodeImage.bind(this)));
    }
    return this.processStreamableRequest("generate", request);
  }
  /**
   * Chats with the model. The request object can contain messages with images that are either
   * Uint8Arrays or base64 encoded strings. The images will be base64 encoded before sending the
   * request.
   * @param request {ChatRequest} - The request object.
   * @returns {Promise<ChatResponse | AbortableAsyncIterator<ChatResponse>>} - The response object or an
   * AbortableAsyncIterator that yields response messages.
   */
  async chat(request) {
    if (request.messages) {
      for (const message of request.messages) {
        if (message.images) {
          message.images = await Promise.all(
            message.images.map(this.encodeImage.bind(this))
          );
        }
      }
    }
    return this.processStreamableRequest("chat", request);
  }
  /**
   * Creates a new model from a stream of data.
   * @param request {CreateRequest} - The request object.
   * @returns {Promise<ProgressResponse | AbortableAsyncIterator<ProgressResponse>>} - The response object or a stream of progress responses.
   */
  async create(request) {
    return this.processStreamableRequest("create", {
      ...request
    });
  }
  /**
   * Pulls a model from the Ollama registry. The request object can contain a stream flag to indicate if the
   * response should be streamed.
   * @param request {PullRequest} - The request object.
   * @returns {Promise<ProgressResponse | AbortableAsyncIterator<ProgressResponse>>} - The response object or
   * an AbortableAsyncIterator that yields response messages.
   */
  async pull(request) {
    return this.processStreamableRequest("pull", {
      name: request.model,
      stream: request.stream,
      insecure: request.insecure
    });
  }
  /**
   * Pushes a model to the Ollama registry. The request object can contain a stream flag to indicate if the
   * response should be streamed.
   * @param request {PushRequest} - The request object.
   * @returns {Promise<ProgressResponse | AbortableAsyncIterator<ProgressResponse>>} - The response object or
   * an AbortableAsyncIterator that yields response messages.
   */
  async push(request) {
    return this.processStreamableRequest("push", {
      name: request.model,
      stream: request.stream,
      insecure: request.insecure
    });
  }
  /**
   * Deletes a model from the server. The request object should contain the name of the model to
   * delete.
   * @param request {DeleteRequest} - The request object.
   * @returns {Promise<StatusResponse>} - The response object.
   */
  async delete(request) {
    await del(
      this.fetch,
      `${this.config.host}/api/delete`,
      { name: request.model },
      { headers: this.config.headers }
    );
    return { status: "success" };
  }
  /**
   * Copies a model from one name to another. The request object should contain the name of the
   * model to copy and the new name.
   * @param request {CopyRequest} - The request object.
   * @returns {Promise<StatusResponse>} - The response object.
   */
  async copy(request) {
    await post(this.fetch, `${this.config.host}/api/copy`, { ...request }, {
      headers: this.config.headers
    });
    return { status: "success" };
  }
  /**
   * Lists the models on the server.
   * @returns {Promise<ListResponse>} - The response object.
   * @throws {Error} - If the response body is missing.
   */
  async list() {
    const response = await get(this.fetch, `${this.config.host}/api/tags`, {
      headers: this.config.headers
    });
    return await response.json();
  }
  /**
   * Shows the metadata of a model. The request object should contain the name of the model.
   * @param request {ShowRequest} - The request object.
   * @returns {Promise<ShowResponse>} - The response object.
   */
  async show(request) {
    const response = await post(this.fetch, `${this.config.host}/api/show`, {
      ...request
    }, {
      headers: this.config.headers
    });
    return await response.json();
  }
  /**
   * Embeds text input into vectors.
   * @param request {EmbedRequest} - The request object.
   * @returns {Promise<EmbedResponse>} - The response object.
   */
  async embed(request) {
    const response = await post(this.fetch, `${this.config.host}/api/embed`, {
      ...request
    }, {
      headers: this.config.headers
    });
    return await response.json();
  }
  /**
   * Embeds a text prompt into a vector.
   * @param request {EmbeddingsRequest} - The request object.
   * @returns {Promise<EmbeddingsResponse>} - The response object.
   */
  async embeddings(request) {
    const response = await post(this.fetch, `${this.config.host}/api/embeddings`, {
      ...request
    }, {
      headers: this.config.headers
    });
    return await response.json();
  }
  /**
   * Lists the running models on the server
   * @returns {Promise<ListResponse>} - The response object.
   * @throws {Error} - If the response body is missing.
   */
  async ps() {
    const response = await get(this.fetch, `${this.config.host}/api/ps`, {
      headers: this.config.headers
    });
    return await response.json();
  }
};
var browser = new Ollama$1();

// node_modules/ollama/dist/index.mjs
var import_whatwg_fetch2 = __toESM(require_fetch_umd(), 1);
var Ollama2 = class extends Ollama$1 {
  async encodeImage(image) {
    if (typeof image !== "string") {
      return Buffer.from(image).toString("base64");
    }
    try {
      if (import_node_fs.default.existsSync(image)) {
        const fileBuffer = await import_node_fs.promises.readFile((0, import_node_path.resolve)(image));
        return Buffer.from(fileBuffer).toString("base64");
      }
    } catch {
    }
    return image;
  }
  /**
   * checks if a file exists
   * @param path {string} - The path to the file
   * @private @internal
   * @returns {Promise<boolean>} - Whether the file exists or not
   */
  async fileExists(path) {
    try {
      await import_node_fs.promises.access(path);
      return true;
    } catch {
      return false;
    }
  }
  async create(request) {
    if (request.from && await this.fileExists((0, import_node_path.resolve)(request.from))) {
      throw Error("Creating with a local path is not currently supported from ollama-js");
    }
    if (request.stream) {
      return super.create(request);
    } else {
      return super.create(request);
    }
  }
};
var index = new Ollama2();

// src/llmService.ts
var vscode = __toESM(require("vscode"));
var LLMService = class {
  constructor(config) {
    this.geminiModel = null;
    this.ollamaClient = null;
    this.apiKey = "AIzaSyBEerOO5jAJRt5ccFyHjniaUptzdS3vx0I";
    console.log("AI Assistant: LLMService constructor called");
    this.currentConfig = config || {
      provider: "gemini",
      model: "gemini-2.0-flash",
      apiKey: this.apiKey
    };
    this.loadConfiguration();
    this.initializeModel();
    console.log("AI Assistant: LLMService initialized - provider:", this.currentConfig.provider, "model:", this.currentConfig.model);
  }
  loadConfiguration() {
    const config = vscode.workspace.getConfiguration("aiAssistant");
    if (!this.currentConfig.apiKey) {
      this.currentConfig.apiKey = config.get("gemini.apiKey") || this.apiKey;
    }
    console.log("AI Assistant: Configuration loaded - provider:", this.currentConfig.provider, "model:", this.currentConfig.model);
  }
  initializeModel() {
    try {
      if (this.currentConfig.provider === "gemini") {
        this.initializeGemini();
      } else if (this.currentConfig.provider === "ollama") {
        this.initializeOllama();
      }
    } catch (error) {
      console.error("AI Assistant: Failed to initialize model:", error);
      vscode.window.showErrorMessage(
        `AI Assistant: Failed to initialize ${this.currentConfig.provider} model.`
      );
    }
  }
  initializeGemini() {
    if (!this.currentConfig.apiKey) {
      console.warn("AI Assistant: No API key configured for Gemini");
      return;
    }
    console.log("AI Assistant: Initializing Gemini model:", this.currentConfig.model);
    this.geminiModel = new ChatGoogleGenerativeAI({
      apiKey: this.currentConfig.apiKey,
      model: this.currentConfig.model,
      temperature: 0,
      maxOutputTokens: 4096
    });
    console.log("AI Assistant: Gemini model initialized successfully");
  }
  initializeOllama() {
    const baseUrl = this.currentConfig.baseUrl || "http://localhost:11434";
    console.log("AI Assistant: Initializing Ollama client with baseUrl:", baseUrl);
    this.ollamaClient = new Ollama2({
      host: baseUrl
    });
    console.log("AI Assistant: Ollama client initialized successfully");
  }
  async generateResponse(prompt) {
    const model = this.isModelInitialized();
    if (!model) {
      if (this.currentConfig.provider === "gemini" && !this.currentConfig.apiKey) {
        return {
          content: "",
          error: "No API key configured. Please set your Gemini API key in settings."
        };
      } else {
        this.initializeModel();
        const retryModel = this.isModelInitialized();
        if (!retryModel) {
          return {
            content: "",
            error: `Failed to initialize ${this.currentConfig.provider} model. Please check your configuration.`
          };
        }
      }
    }
    try {
      let content;
      if (this.currentConfig.provider === "gemini" && this.geminiModel) {
        const result = await this.geminiModel.invoke(prompt);
        content = typeof result.content === "string" ? result.content : String(result.content);
      } else if (this.currentConfig.provider === "ollama" && this.ollamaClient) {
        console.log("AI Assistant: Making Ollama request with model:", this.currentConfig.model);
        const response = await this.ollamaClient.chat({
          model: this.currentConfig.model,
          messages: [{ role: "user", content: prompt }],
          stream: false
        });
        content = response.message.content;
        console.log("AI Assistant: Ollama response received, length:", content.length);
      } else {
        throw new Error(`No valid model available for provider: ${this.currentConfig.provider}`);
      }
      return { content };
    } catch (error) {
      console.error("AI Assistant: LLM request failed:", error);
      if (this.currentConfig.provider === "ollama") {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        if (errorMessage.includes("ECONNREFUSED") || errorMessage.includes("fetch")) {
          return {
            content: "",
            error: `Ollama server not running. Please start Ollama with: ollama serve`
          };
        } else if (errorMessage.includes("model")) {
          return {
            content: "",
            error: `Model '${this.currentConfig.model}' not found. Pull it with: ollama pull ${this.currentConfig.model}`
          };
        }
      }
      return {
        content: "",
        error: `AI request failed: ${error instanceof Error ? error.message : "Unknown error"}`
      };
    }
  }
  isModelInitialized() {
    if (this.currentConfig.provider === "gemini") {
      return !!this.geminiModel;
    } else if (this.currentConfig.provider === "ollama") {
      return !!this.ollamaClient;
    }
    return false;
  }
  async generateContextualSuggestions(prompt) {
    try {
      const response = await this.generateResponse(prompt);
      if (response.error) {
        console.error("AI Assistant: Failed to generate suggestions:", response.error);
        return [];
      }
      let cleanResponse = response.content.trim();
      cleanResponse = cleanResponse.replace(/^```json\s*/i, "");
      cleanResponse = cleanResponse.replace(/\s*```$/i, "");
      cleanResponse = cleanResponse.replace(/^```\s*/, "");
      cleanResponse = cleanResponse.replace(/\s*```$/, "");
      const jsonMatch = cleanResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        cleanResponse = jsonMatch[0];
      }
      try {
        const suggestions = JSON.parse(cleanResponse);
        if (Array.isArray(suggestions)) {
          return suggestions.slice(0, 3).map((suggestion) => ({
            type: suggestion.type || "explanation",
            content: suggestion.content || "No content provided",
            severity: suggestion.severity || "low"
          }));
        }
      } catch (parseError) {
        console.error("AI Assistant: Failed to parse suggestions JSON:", parseError);
        console.log("AI Assistant: Raw response:", response.content);
      }
      let fallbackContent = response.content.trim();
      fallbackContent = fallbackContent.replace(/```json\s*/gi, "");
      fallbackContent = fallbackContent.replace(/\s*```/g, "");
      fallbackContent = fallbackContent.replace(/^\[?\s*\{?/, "");
      fallbackContent = fallbackContent.replace(/\}?\s*\]?$/, "");
      fallbackContent = fallbackContent.replace(/"type":\s*"[^"]*",?\s*/gi, "");
      fallbackContent = fallbackContent.replace(/"content":\s*"/gi, "");
      fallbackContent = fallbackContent.replace(/"severity":\s*"[^"]*",?\s*/gi, "");
      fallbackContent = fallbackContent.replace(/",?\s*$/, "");
      fallbackContent = fallbackContent.replace(/^"/, "");
      if (fallbackContent && fallbackContent.length > 10) {
        return [{
          type: "explanation",
          content: fallbackContent,
          severity: "low"
        }];
      }
      return [];
    } catch (error) {
      console.error("AI Assistant: Error generating contextual suggestions:", error);
      return [];
    }
  }
  isConfigured() {
    if (this.currentConfig.provider === "gemini") {
      return !!this.currentConfig.apiKey;
    } else if (this.currentConfig.provider === "ollama") {
      return true;
    }
    return false;
  }
  refreshConfiguration() {
    this.loadConfiguration();
    this.initializeModel();
  }
  switchModel(config) {
    console.log("AI Assistant: Switching to provider:", config.provider, "model:", config.model);
    this.currentConfig = { ...config };
    if (!this.currentConfig.apiKey && config.provider === "gemini") {
      this.currentConfig.apiKey = this.apiKey;
    }
    this.initializeModel();
  }
  getCurrentProvider() {
    return this.currentConfig.provider;
  }
  getCurrentModel() {
    return this.currentConfig.model;
  }
};

// src/aiAssistantViewProvider.ts
var vscode3 = __toESM(require("vscode"));

// src/promptFactory.ts
var PromptFactory = class {
  static createContextualSuggestionPrompt(context) {
    return `You are an expert code assistant. Analyze the following code snippet and provide 1-3 brief, actionable suggestions.

Language: ${context.language}
File: ${context.fileName}
Code around cursor:
\`\`\`${context.language}
${context.cursorContext}
\`\`\`

Focus on:
- Code quality improvements
- Potential bugs or issues
- Best practices
- Performance optimizations

Respond with a JSON array of suggestions in this exact format:
[
  {
    "type": "explanation",
    "content": "Clear and helpful suggestion text",
    "severity": "low"
  }
]

Make each suggestion clear and actionable. Content should be 1-2 sentences explaining what to improve and why. Only return the JSON array, nothing else.`;
  }
  static createVulnerabilityReportPrompt(context) {
    return `You are a security expert analyzing code for vulnerabilities. Perform a comprehensive security analysis of the following ${context.language} code.

File: ${context.fileName}
Code:
\`\`\`${context.language}
${context.fullContent}
\`\`\`

Analyze for common vulnerabilities including but not limited to:
- Injection attacks (SQL, NoSQL, Command, etc.)
- Cross-Site Scripting (XSS)
- Insecure authentication/authorization
- Sensitive data exposure
- Security misconfigurations
- Insecure dependencies
- Cryptographic issues
- Buffer overflows
- Input validation issues

Provide a detailed report in the following Markdown format:

# Security Analysis Report

## Executive Summary
[Brief overview of findings]

## Vulnerabilities Found

### [Vulnerability Title]
- **Severity:** Critical/High/Medium/Low
- **Description:** [Detailed description]
- **Location:** [Code location if applicable]
- **CWE ID:** [If applicable]
- **Mitigation:** [Specific steps to fix]

## Recommendations
[General security recommendations]

If no vulnerabilities are found, state that clearly and provide general security best practices for the codebase.`;
  }
  static createCodeExplanationPrompt(context) {
    return `You are an expert code instructor. Explain the following ${context.language} code in detail.

Selected Code:
\`\`\`${context.language}
${context.selectedText}
\`\`\`

Provide a comprehensive explanation in Markdown format covering:

# Code Explanation

## Summary
[One-sentence summary of what this code does]

## Purpose
[Why this code exists and its role in the application]

## How It Works
[Step-by-step breakdown of the code's execution]

## Key Concepts
[Important programming concepts demonstrated]

## Dependencies
[External libraries, modules, or services used]

## Potential Issues
[Any concerns or areas for improvement]

Make the explanation clear for developers of varying experience levels.`;
  }
  static createRefactoringPrompt(context) {
    return `You are a senior software engineer specializing in code refactoring. Analyze the following ${context.language} code and suggest improvements.

Selected Code:
\`\`\`${context.language}
${context.selectedText}
\`\`\`

Provide refactoring suggestions in the following Markdown format:

# Refactoring Suggestions

## Overview
[Brief assessment of the current code]

## Suggested Improvements

### 1. [Improvement Title]
**Benefits:** [List of benefits]
**Complexity:** Low/Medium/High

**Current Code:**
\`\`\`${context.language}
${context.selectedText}
\`\`\`

**Refactored Code:**
\`\`\`${context.language}
[Your improved version]
\`\`\`

**Explanation:** [Why this improvement helps]

[Continue with additional improvements as needed]

## Summary
[Overall impact of suggested changes]

Focus on:
- Code readability and maintainability
- Performance optimizations
- Design patterns
- Error handling
- Code organization
- Best practices for ${context.language}`;
  }
  static createTestIdeasPrompt(context) {
    return `You are a QA engineer and testing expert. Analyze the following ${context.language} code and suggest comprehensive test cases.

Selected Code:
\`\`\`${context.language}
${context.selectedText}
\`\`\`

Provide test case ideas in the following Markdown format:

# Test Case Ideas

## Code Analysis
[Brief description of what the code does]

## Test Categories

### Unit Tests
[Test cases for individual functions/methods]

### Integration Tests
[Test cases for component interactions]

### Edge Cases
[Boundary conditions and unusual inputs]

### Error Handling Tests
[Invalid inputs and error scenarios]

### Performance Tests
[Load and performance considerations]

### Security Tests
[Security-related test scenarios if applicable]

For each test case, include:
- **Test Scenario:** [What you're testing]
- **Input:** [Test data/conditions]
- **Expected Output:** [Expected result]
- **Purpose:** [Why this test is important]

## Testing Framework Recommendations
[Suggest appropriate testing frameworks for ${context.language}]

Focus on practical, implementable test cases that provide good coverage.`;
  }
};

// src/webviewPanels.ts
var vscode2 = __toESM(require("vscode"));
var WebviewPanelManager = class {
  static {
    this.panels = /* @__PURE__ */ new Map();
  }
  static createOrShowPanel(type, title, content, viewColumn = vscode2.ViewColumn.One) {
    const columnKey = `${type}-${viewColumn}`;
    const existingPanel = this.panels.get(columnKey);
    if (existingPanel) {
      existingPanel.title = title;
      existingPanel.webview.html = this.getWebviewContent(title, content);
      existingPanel.reveal(viewColumn);
      return existingPanel;
    }
    const panel = vscode2.window.createWebviewPanel(
      type,
      title,
      viewColumn,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        enableFindWidget: true
      }
    );
    panel.webview.html = this.getWebviewContent(title, content);
    panel.onDidDispose(() => {
      this.panels.delete(columnKey);
    });
    this.panels.set(columnKey, panel);
    return panel;
  }
  static getWebviewContent(title, content) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: var(--vscode-titleBar-activeForeground);
            margin-top: 24px;
            margin-bottom: 16px;
        }
        
        h1 {
            border-bottom: 1px solid var(--vscode-panel-border);
            padding-bottom: 8px;
        }
        
        code {
            background-color: var(--vscode-textCodeBlock-background);
            color: var(--vscode-textPreformat-foreground);
            padding: 2px 4px;
            border-radius: 3px;
            font-family: var(--vscode-editor-font-family);
        }
        
        pre {
            background-color: var(--vscode-textCodeBlock-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 6px;
            padding: 16px;
            overflow-x: auto;
            margin: 16px 0;
        }
        
        pre code {
            background: none;
            padding: 0;
        }
        
        blockquote {
            border-left: 4px solid var(--vscode-textBlockQuote-border);
            background-color: var(--vscode-textBlockQuote-background);
            margin: 16px 0;
            padding: 8px 16px;
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 16px 0;
        }
        
        th, td {
            border: 1px solid var(--vscode-panel-border);
            padding: 8px 12px;
            text-align: left;
        }
        
        th {
            background-color: var(--vscode-list-hoverBackground);
            font-weight: bold;
        }
        
        ul, ol {
            padding-left: 24px;
            margin: 16px 0;
        }
        
        li {
            margin: 4px 0;
        }
        
        .vulnerability-critical {
            border-left: 4px solid #dc3545;
            background-color: rgba(220, 53, 69, 0.1);
            padding: 12px;
            margin: 8px 0;
        }
        
        .vulnerability-high {
            border-left: 4px solid #fd7e14;
            background-color: rgba(253, 126, 20, 0.1);
            padding: 12px;
            margin: 8px 0;
        }
        
        .vulnerability-medium {
            border-left: 4px solid #ffc107;
            background-color: rgba(255, 193, 7, 0.1);
            padding: 12px;
            margin: 8px 0;
        }
        
        .vulnerability-low {
            border-left: 4px solid #20c997;
            background-color: rgba(32, 201, 151, 0.1);
            padding: 12px;
            margin: 8px 0;
        }
        
        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            color: var(--vscode-descriptionForeground);
        }
        
        .error {
            color: var(--vscode-errorForeground);
            background-color: var(--vscode-inputValidation-errorBackground);
            border: 1px solid var(--vscode-inputValidation-errorBorder);
            padding: 16px;
            border-radius: 6px;
            margin: 16px 0;
        }
        
        .success {
            color: var(--vscode-gitDecoration-addedResourceForeground);
            background-color: rgba(0, 255, 0, 0.1);
            padding: 16px;
            border-radius: 6px;
            margin: 16px 0;
        }
    </style>
</head>
<body>
    <div id="content">${this.markdownToHtml(content)}</div>
</body>
</html>`;
  }
  static markdownToHtml(markdown) {
    return markdown;
  }
  static showVulnerabilityReport(content) {
    this.createOrShowPanel(
      "aiAssistant.vulnerabilityReport",
      "Security Vulnerability Report",
      content,
      vscode2.ViewColumn.One
    );
  }
  static showCodeExplanation(content) {
    this.createOrShowPanel(
      "aiAssistant.codeExplanation",
      "Code Explanation",
      content,
      vscode2.ViewColumn.One
    );
  }
  static showRefactoringSuggestions(content) {
    this.createOrShowPanel(
      "aiAssistant.refactoring",
      "Refactoring Suggestions",
      content,
      vscode2.ViewColumn.One
    );
  }
  static showTestIdeas(content) {
    this.createOrShowPanel(
      "aiAssistant.testIdeas",
      "Test Case Ideas",
      content,
      vscode2.ViewColumn.One
    );
  }
};

// src/aiAssistantViewProvider.ts
var AIAssistantViewProvider = class {
  constructor(_extensionUri, _llmService) {
    this._extensionUri = _extensionUri;
    this._llmService = _llmService;
    this._suggestions = [];
    this._isLoading = false;
  }
  static {
    this.viewType = "aiAssistant.sidebarView";
  }
  async showModelSelection() {
    const providerOptions = [
      {
        label: "Google Gemini 2.0 Flash (Cloud)",
        description: "Use Google Gemini 2.0 Flash model via API",
        provider: "gemini",
        model: "gemini-2.0-flash",
        detail: "Requires API key - Fast and powerful"
      },
      {
        label: "Google Gemini Pro (Cloud)",
        description: "Use Google Gemini Pro model via API",
        provider: "gemini",
        model: "gemini-pro",
        detail: "Requires API key - Advanced reasoning"
      },
      {
        label: "Qwen2.5 Coder 3B (Local)",
        description: "Use Qwen2.5 Coder via local Ollama server",
        provider: "ollama",
        model: "qwen2.5-coder:3b",
        detail: "Code-specialized model - Privacy focused"
      },
      {
        label: "DeepSeek R1 1.5B (Local)",
        description: "Use DeepSeek R1 via local Ollama server",
        provider: "ollama",
        model: "deepseek-r1:1.5b",
        detail: "Reasoning-optimized model - Fast"
      },
      {
        label: "Llama 3.2 1B (Local)",
        description: "Use Llama 3.2 via local Ollama server",
        provider: "ollama",
        model: "llama3.2:1b",
        detail: "Lightweight general purpose - Very fast"
      }
    ];
    const selectedOption = await vscode3.window.showQuickPick(providerOptions, {
      placeHolder: "Select an AI model provider and model",
      title: "Choose AI Model"
    });
    if (!selectedOption) {
      return void 0;
    }
    const config = {
      provider: selectedOption.provider,
      model: selectedOption.model
    };
    if (selectedOption.provider === "gemini") {
      config.apiKey = "AIzaSyBEerOO5jAJRt5ccFyHjniaUptzdS3vx0I";
    }
    if (selectedOption.provider === "ollama") {
      config.baseUrl = "http://localhost:11434";
    }
    return config;
  }
  resolveWebviewView(webviewView, context, _token) {
    this._view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.command) {
        case "generateVulnerabilityReport":
          this._generateVulnerabilityReport();
          break;
        case "explainCode":
          this._explainSelectedCode();
          break;
        case "suggestRefactoring":
          this._suggestRefactoring();
          break;
        case "getTestIdeas":
          this._getTestIdeas();
          break;
        case "refresh":
          this._refreshSuggestions();
          break;
      }
    });
    this._startListeningForChanges();
  }
  _startListeningForChanges() {
    vscode3.window.onDidChangeActiveTextEditor(() => {
      this._refreshSuggestions();
    });
    vscode3.workspace.onDidChangeTextDocument((event) => {
      if (event.document === vscode3.window.activeTextEditor?.document) {
        this._debouncedRefreshSuggestions();
      }
    });
    vscode3.window.onDidChangeTextEditorSelection(() => {
      this._debouncedRefreshSuggestions();
    });
    this._refreshSuggestions();
  }
  _debouncedRefreshSuggestions() {
    const config = vscode3.workspace.getConfiguration("aiAssistant");
    const debounceMs = config.get("suggestions.debounceMs") || 1e3;
    const suggestionsEnabled = config.get("suggestions.enabled") ?? true;
    if (!suggestionsEnabled) {
      return;
    }
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }
    this._debounceTimer = setTimeout(() => {
      this._refreshSuggestions();
    }, debounceMs);
  }
  async _refreshSuggestions() {
    const context = this._getCurrentCodeContext();
    if (!context || !context.cursorContext.trim()) {
      this._suggestions = [];
      this._updateWebview();
      return;
    }
    this._isLoading = true;
    this._updateWebview();
    try {
      const prompt = PromptFactory.createContextualSuggestionPrompt(context);
      this._suggestions = await this._llmService.generateContextualSuggestions(prompt);
    } catch (error) {
      console.error("AI Assistant: Error refreshing suggestions:", error);
      this._suggestions = [];
    } finally {
      this._isLoading = false;
      this._updateWebview();
    }
  }
  _getCurrentCodeContext() {
    const editor = vscode3.window.activeTextEditor;
    if (!editor) {
      return null;
    }
    const document = editor.document;
    const selection = editor.selection;
    const position = selection.active;
    const startLine = Math.max(0, position.line - 5);
    const endLine = Math.min(document.lineCount - 1, position.line + 5);
    const contextRange = new vscode3.Range(startLine, 0, endLine, Number.MAX_VALUE);
    const cursorContext = document.getText(contextRange);
    return {
      language: document.languageId,
      selectedText: document.getText(selection),
      fullContent: document.getText(),
      cursorContext,
      fileName: document.fileName
    };
  }
  async _generateVulnerabilityReport() {
    const context = this._getCurrentCodeContext();
    if (!context) {
      vscode3.window.showWarningMessage("Please open a code file to generate a vulnerability report.");
      return;
    }
    const modelConfig = await this.showModelSelection();
    if (!modelConfig) {
      return;
    }
    this._llmService.switchModel(modelConfig);
    if (!this._llmService.isConfigured()) {
      vscode3.window.showErrorMessage(`Please configure your ${modelConfig.provider} settings.`);
      return;
    }
    vscode3.window.withProgress({
      location: vscode3.ProgressLocation.Notification,
      title: "Generating vulnerability report...",
      cancellable: false
    }, async () => {
      try {
        const prompt = PromptFactory.createVulnerabilityReportPrompt(context);
        const response = await this._llmService.generateResponse(prompt);
        if (response.error) {
          vscode3.window.showErrorMessage(`Failed to generate vulnerability report: ${response.error}`);
          return;
        }
        WebviewPanelManager.showVulnerabilityReport(response.content);
      } catch (error) {
        vscode3.window.showErrorMessage(`Error generating vulnerability report: ${error}`);
      }
    });
  }
  async _explainSelectedCode() {
    const context = this._getCurrentCodeContext();
    if (!context || !context.selectedText.trim()) {
      vscode3.window.showWarningMessage("Please select some code to explain.");
      return;
    }
    const modelConfig = await this.showModelSelection();
    if (!modelConfig) {
      return;
    }
    this._llmService.switchModel(modelConfig);
    if (!this._llmService.isConfigured()) {
      vscode3.window.showErrorMessage(`Please configure your ${modelConfig.provider} settings.`);
      return;
    }
    vscode3.window.withProgress({
      location: vscode3.ProgressLocation.Notification,
      title: "Explaining selected code...",
      cancellable: false
    }, async () => {
      try {
        const prompt = PromptFactory.createCodeExplanationPrompt(context);
        const response = await this._llmService.generateResponse(prompt);
        if (response.error) {
          vscode3.window.showErrorMessage(`Failed to explain code: ${response.error}`);
          return;
        }
        WebviewPanelManager.showCodeExplanation(response.content);
      } catch (error) {
        vscode3.window.showErrorMessage(`Error explaining code: ${error}`);
      }
    });
  }
  async _suggestRefactoring() {
    const context = this._getCurrentCodeContext();
    if (!context || !context.selectedText.trim()) {
      vscode3.window.showWarningMessage("Please select some code to refactor.");
      return;
    }
    const modelConfig = await this.showModelSelection();
    if (!modelConfig) {
      return;
    }
    this._llmService.switchModel(modelConfig);
    if (!this._llmService.isConfigured()) {
      vscode3.window.showErrorMessage(`Please configure your ${modelConfig.provider} settings.`);
      return;
    }
    vscode3.window.withProgress({
      location: vscode3.ProgressLocation.Notification,
      title: "Generating refactoring suggestions...",
      cancellable: false
    }, async () => {
      try {
        const prompt = PromptFactory.createRefactoringPrompt(context);
        const response = await this._llmService.generateResponse(prompt);
        if (response.error) {
          vscode3.window.showErrorMessage(`Failed to generate refactoring suggestions: ${response.error}`);
          return;
        }
        WebviewPanelManager.showRefactoringSuggestions(response.content);
      } catch (error) {
        vscode3.window.showErrorMessage(`Error generating refactoring suggestions: ${error}`);
      }
    });
  }
  async _getTestIdeas() {
    const context = this._getCurrentCodeContext();
    if (!context || !context.selectedText.trim()) {
      vscode3.window.showWarningMessage("Please select some code to generate test ideas for.");
      return;
    }
    const modelConfig = await this.showModelSelection();
    if (!modelConfig) {
      return;
    }
    this._llmService.switchModel(modelConfig);
    if (!this._llmService.isConfigured()) {
      vscode3.window.showErrorMessage(`Please configure your ${modelConfig.provider} settings.`);
      return;
    }
    vscode3.window.withProgress({
      location: vscode3.ProgressLocation.Notification,
      title: "Generating test case ideas...",
      cancellable: false
    }, async () => {
      try {
        const prompt = PromptFactory.createTestIdeasPrompt(context);
        const response = await this._llmService.generateResponse(prompt);
        if (response.error) {
          vscode3.window.showErrorMessage(`Failed to generate test ideas: ${response.error}`);
          return;
        }
        WebviewPanelManager.showTestIdeas(response.content);
      } catch (error) {
        vscode3.window.showErrorMessage(`Error generating test ideas: ${error}`);
      }
    });
  }
  _updateWebview() {
    if (this._view) {
      this._view.webview.html = this._getHtmlForWebview(this._view.webview);
    }
  }
  _getHtmlForWebview(webview) {
    const isConfigured = this._llmService.isConfigured();
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Assistant</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            color: var(--vscode-foreground);
            background-color: var(--vscode-sideBar-background);
            margin: 0;
            padding: 16px;
        }
        
        .section {
            margin-bottom: 24px;
            padding: 16px;
            background-color: var(--vscode-editor-background);
            border-radius: 6px;
            border: 1px solid var(--vscode-panel-border);
        }
        
        .section-title {
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--vscode-titleBar-activeForeground);
            display: flex;
            align-items: center;
            gap: 8px;
        }        .suggestion {
            background-color: var(--vscode-list-hoverBackground);
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
            border-left: 4px solid var(--vscode-textLink-foreground);
            transition: all 0.2s ease;
        }
        
        .suggestion:hover {
            background-color: var(--vscode-list-activeSelectionBackground);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .suggestion-warning {
            border-left-color: #ff9500;
        }
        
        .suggestion-optimization {
            border-left-color: #28a745;
        }
        
        .suggestion-explanation {
            border-left-color: #17a2b8;
        }
        
        .suggestion-best-practice {
            border-left-color: #007acc;
        }
        
        .suggestion-content {
            font-size: 14px;
            line-height: 1.6;
            color: var(--vscode-foreground);
            word-wrap: break-word;
            white-space: pre-wrap;
        }
        
        .suggestion-type {
            font-size: 11px;
            color: var(--vscode-descriptionForeground);
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
        }
        
        .suggestion-expandable {
            max-height: 120px;
            overflow: hidden;
            position: relative;
        }
        
        .suggestion-expanded {
            max-height: none;
        }
        
        .suggestion-fade {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 40px;
            background: linear-gradient(transparent, var(--vscode-list-hoverBackground));
            pointer-events: none;
        }
        
        .expand-button {
            background: var(--vscode-button-secondaryBackground);
            border: none;
            color: var(--vscode-button-secondaryForeground);
            cursor: pointer;
            font-size: 12px;
            margin-top: 8px;
            padding: 6px 12px;
            border-radius: 4px;
            transition: background-color 0.2s;
            width: 100%;
        }
        
        .expand-button:hover {
            background-color: var(--vscode-button-hoverBackground);
            color: var(--vscode-button-foreground);
        }
        
        .button {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin: 4px 0;
            width: 100%;
            text-align: left;
            transition: background-color 0.2s;
        }
        
        .button:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        
        .button:disabled {
            background-color: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
            cursor: not-allowed;
        }
        
        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            color: var(--vscode-descriptionForeground);
        }
        
        .spinner {
            width: 16px;
            height: 16px;
            border: 2px solid var(--vscode-progressBar-background);
            border-top: 2px solid var(--vscode-progressBar-foreground);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 8px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .no-suggestions {
            color: var(--vscode-descriptionForeground);
            font-style: italic;
            text-align: center;
            padding: 20px;
        }
        
        .error-message {
            background-color: var(--vscode-inputValidation-errorBackground);
            color: var(--vscode-inputValidation-errorForeground);
            border: 1px solid var(--vscode-inputValidation-errorBorder);
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 16px;
        }
        
        .config-link {
            color: var(--vscode-textLink-foreground);
            text-decoration: underline;
            cursor: pointer;
        }
        
        .icon {
            width: 16px;
            height: 16px;
        }
    </style>
</head>
<body>
    ${!isConfigured ? `
    <div class="error-message">
        <strong>\u26A0\uFE0F Configuration Required</strong><br>
        Please set your Gemini API key in VS Code settings to use AI Assistant features.<br>
        Go to Settings \u2192 Extensions \u2192 AI Assistant \u2192 Gemini API Key
    </div>
    ` : ""}
    
    <div class="section">
        <div class="section-title">
            <span>\u{1F9E0}</span>
            Contextual Suggestions
            <button class="button" onclick="refresh()" style="margin-left: auto; width: auto; padding: 4px 8px;">
                \u{1F504}
            </button>
        </div>
        
        ${this._isLoading ? `
        <div class="loading">
            <div class="spinner"></div>
            Analyzing code...
        </div>        ` : this._suggestions.length > 0 ? this._suggestions.map((suggestion, index2) => {
      const content = suggestion.content || "No content provided";
      const isLong = content.length > 200;
      const displayContent = isLong ? content.substring(0, 200) + "..." : content;
      const escapedContent = content.replace(/'/g, "&#39;").replace(/"/g, "&quot;").replace(/\n/g, "\\n");
      return `
        <div class="suggestion suggestion-${suggestion.type}">
            <div class="suggestion-type">${suggestion.type.replace("-", " ")}</div>
            <div class="suggestion-content ${isLong ? "suggestion-expandable" : ""}" 
                 id="content-${index2}" 
                 data-full-content="${escapedContent}">
                ${displayContent.replace(/\n/g, "<br>")}
                ${isLong ? '<div class="suggestion-fade" id="fade-${index}"></div>' : ""}
            </div>
            ${isLong ? `
            <button class="expand-button" id="btn-${index2}" onclick="toggleExpand(${index2})">
                Show More
            </button>
            ` : ""}
        </div>`;
    }).join("") : `
        <div class="no-suggestions">
            ${isConfigured ? "Open a code file to see AI suggestions" : "Configure API key to see suggestions"}
        </div>
        `}
    </div>
    
    <div class="section">
        <div class="section-title">
            <span>\u26A1</span>
            Actions
        </div>
        
        <button class="button" onclick="generateVulnerabilityReport()" ${!isConfigured ? "disabled" : ""}>
            \u{1F512} Generate Vulnerability Report
        </button>
        
        <button class="button" onclick="explainCode()" ${!isConfigured ? "disabled" : ""}>
            \u{1F4D6} Explain Selected Code
        </button>
        
        <button class="button" onclick="suggestRefactoring()" ${!isConfigured ? "disabled" : ""}>
            \u{1F528} Suggest Refactoring
        </button>
        
        <button class="button" onclick="getTestIdeas()" ${!isConfigured ? "disabled" : ""}>
            \u{1F9EA} Get Test Case Ideas
        </button>
    </div>    <script>
        const vscode = acquireVsCodeApi();
        
        function generateVulnerabilityReport() {
            vscode.postMessage({ command: 'generateVulnerabilityReport' });
        }
        
        function explainCode() {
            vscode.postMessage({ command: 'explainCode' });
        }
        
        function suggestRefactoring() {
            vscode.postMessage({ command: 'suggestRefactoring' });
        }
        
        function getTestIdeas() {
            vscode.postMessage({ command: 'getTestIdeas' });
        }
          function refresh() {
            vscode.postMessage({ command: 'refresh' });
        }
        
        function toggleExpand(index) {
            const contentElement = document.getElementById('content-' + index);
            const fadeElement = document.getElementById('fade-' + index);
            const buttonElement = document.getElementById('btn-' + index);
            
            if (!contentElement || !buttonElement) {
                return;
            }
            
            const isExpanded = contentElement.classList.contains('suggestion-expanded');
            const fullContent = contentElement.getAttribute('data-full-content');
            
            if (isExpanded) {
                // Collapse
                contentElement.classList.remove('suggestion-expanded');
                contentElement.classList.add('suggestion-expandable');
                if (fadeElement) fadeElement.style.display = 'block';
                buttonElement.textContent = 'Show More';
                
                // Show truncated content
                if (fullContent) {
                    const truncated = fullContent.length > 200 ? fullContent.substring(0, 200) + '...' : fullContent;
                    contentElement.innerHTML = truncated.replace(/\\n/g, '<br>') + (fadeElement ? '<div class="suggestion-fade" id="fade-' + index + '"></div>' : '');
                }
            } else {
                // Expand
                contentElement.classList.remove('suggestion-expandable');
                contentElement.classList.add('suggestion-expanded');
                if (fadeElement) fadeElement.style.display = 'none';
                buttonElement.textContent = 'Show Less';
                
                // Show full content
                if (fullContent) {
                    contentElement.innerHTML = fullContent.replace(/\\n/g, '<br>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
                }
            }
        }
    </script>
</body>
</html>`;
  }
};

// src/extension.ts
var llmService;
var aiAssistantProvider;
async function showModelSelection() {
  const providerOptions = [
    {
      label: "Google Gemini 2.0 Flash (Cloud)",
      description: "Use Google Gemini 2.0 Flash model via API",
      provider: "gemini",
      model: "gemini-2.0-flash",
      detail: "Requires API key - Fast and powerful"
    },
    {
      label: "Google Gemini Pro (Cloud)",
      description: "Use Google Gemini Pro model via API",
      provider: "gemini",
      model: "gemini-pro",
      detail: "Requires API key - Advanced reasoning"
    },
    {
      label: "Qwen2.5 Coder 3B (Local)",
      description: "Use Qwen2.5 Coder via local Ollama server",
      provider: "ollama",
      model: "qwen2.5-coder:3b",
      detail: "Code-specialized model - Privacy focused"
    },
    {
      label: "DeepSeek R1 1.5B (Local)",
      description: "Use DeepSeek R1 via local Ollama server",
      provider: "ollama",
      model: "deepseek-r1:1.5b",
      detail: "Reasoning-optimized model - Fast"
    },
    {
      label: "Llama 3.2 1B (Local)",
      description: "Use Llama 3.2 via local Ollama server",
      provider: "ollama",
      model: "llama3.2:1b",
      detail: "Lightweight general purpose - Very fast"
    }
  ];
  const selectedOption = await vscode4.window.showQuickPick(providerOptions, {
    placeHolder: "Select an AI model provider and model",
    title: "Choose AI Model"
  });
  if (!selectedOption) {
    return void 0;
  }
  const config = {
    provider: selectedOption.provider,
    model: selectedOption.model
  };
  if (selectedOption.provider === "gemini") {
    config.apiKey = "AIzaSyBEerOO5jAJRt5ccFyHjniaUptzdS3vx0I";
  }
  if (selectedOption.provider === "ollama") {
    config.baseUrl = "http://localhost:11434";
  }
  return config;
}
function activate(context) {
  console.log("AI Assistant extension is now active!");
  llmService = new LLMService();
  aiAssistantProvider = new AIAssistantViewProvider(context.extensionUri, llmService);
  context.subscriptions.push(
    vscode4.window.registerWebviewViewProvider(
      AIAssistantViewProvider.viewType,
      aiAssistantProvider
    )
  );
  const commands2 = [
    vscode4.commands.registerCommand("aiAssistant.toggleView", async () => {
      await vscode4.commands.executeCommand("workbench.view.extension.aiAssistantView");
      await vscode4.commands.executeCommand("aiAssistant.sidebarView.focus");
    }),
    vscode4.commands.registerCommand("aiAssistant.generateVulnerabilityReport", async () => {
      const editor = vscode4.window.activeTextEditor;
      if (!editor) {
        vscode4.window.showWarningMessage("Please open a code file to generate a vulnerability report.");
        return;
      }
      const modelConfig = await showModelSelection();
      if (!modelConfig) {
        return;
      }
      llmService.switchModel(modelConfig);
      if (!llmService.isConfigured()) {
        vscode4.window.showErrorMessage(`Please configure your ${modelConfig.provider} settings.`);
        return;
      }
      const document = editor.document;
      const context2 = {
        language: document.languageId,
        selectedText: "",
        fullContent: document.getText(),
        cursorContext: "",
        fileName: document.fileName
      };
      vscode4.window.withProgress({
        location: vscode4.ProgressLocation.Notification,
        title: "Generating vulnerability report...",
        cancellable: false
      }, async () => {
        try {
          const prompt = PromptFactory.createVulnerabilityReportPrompt(context2);
          const response = await llmService.generateResponse(prompt);
          if (response.error) {
            vscode4.window.showErrorMessage(`Failed to generate vulnerability report: ${response.error}`);
            return;
          }
          WebviewPanelManager.showVulnerabilityReport(response.content);
        } catch (error) {
          vscode4.window.showErrorMessage(`Error generating vulnerability report: ${error}`);
        }
      });
    }),
    vscode4.commands.registerCommand("aiAssistant.explainCode", async () => {
      const editor = vscode4.window.activeTextEditor;
      if (!editor) {
        vscode4.window.showWarningMessage("Please open a code file and select some code to explain.");
        return;
      }
      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      if (!selectedText.trim()) {
        vscode4.window.showWarningMessage("Please select some code to explain.");
        return;
      }
      const modelConfig = await showModelSelection();
      if (!modelConfig) {
        return;
      }
      llmService.switchModel(modelConfig);
      if (!llmService.isConfigured()) {
        vscode4.window.showErrorMessage(`Please configure your ${modelConfig.provider} settings.`);
        return;
      }
      const document = editor.document;
      const context2 = {
        language: document.languageId,
        selectedText,
        fullContent: document.getText(),
        cursorContext: selectedText,
        fileName: document.fileName
      };
      vscode4.window.withProgress({
        location: vscode4.ProgressLocation.Notification,
        title: "Explaining selected code...",
        cancellable: false
      }, async () => {
        try {
          const prompt = PromptFactory.createCodeExplanationPrompt(context2);
          const response = await llmService.generateResponse(prompt);
          if (response.error) {
            vscode4.window.showErrorMessage(`Failed to explain code: ${response.error}`);
            return;
          }
          WebviewPanelManager.showCodeExplanation(response.content);
        } catch (error) {
          vscode4.window.showErrorMessage(`Error explaining code: ${error}`);
        }
      });
    }),
    vscode4.commands.registerCommand("aiAssistant.suggestRefactoring", async () => {
      const editor = vscode4.window.activeTextEditor;
      if (!editor) {
        vscode4.window.showWarningMessage("Please open a code file and select some code to refactor.");
        return;
      }
      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      if (!selectedText.trim()) {
        vscode4.window.showWarningMessage("Please select some code to refactor.");
        return;
      }
      const modelConfig = await showModelSelection();
      if (!modelConfig) {
        return;
      }
      llmService.switchModel(modelConfig);
      if (!llmService.isConfigured()) {
        vscode4.window.showErrorMessage(`Please configure your ${modelConfig.provider} settings.`);
        return;
      }
      const document = editor.document;
      const context2 = {
        language: document.languageId,
        selectedText,
        fullContent: document.getText(),
        cursorContext: selectedText,
        fileName: document.fileName
      };
      vscode4.window.withProgress({
        location: vscode4.ProgressLocation.Notification,
        title: "Generating refactoring suggestions...",
        cancellable: false
      }, async () => {
        try {
          const prompt = PromptFactory.createRefactoringPrompt(context2);
          const response = await llmService.generateResponse(prompt);
          if (response.error) {
            vscode4.window.showErrorMessage(`Failed to generate refactoring suggestions: ${response.error}`);
            return;
          }
          WebviewPanelManager.showRefactoringSuggestions(response.content);
        } catch (error) {
          vscode4.window.showErrorMessage(`Error generating refactoring suggestions: ${error}`);
        }
      });
    }),
    vscode4.commands.registerCommand("aiAssistant.getTestIdeas", async () => {
      const editor = vscode4.window.activeTextEditor;
      if (!editor) {
        vscode4.window.showWarningMessage("Please open a code file and select some code to generate test ideas for.");
        return;
      }
      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      if (!selectedText.trim()) {
        vscode4.window.showWarningMessage("Please select some code to generate test ideas for.");
        return;
      }
      const modelConfig = await showModelSelection();
      if (!modelConfig) {
        return;
      }
      llmService.switchModel(modelConfig);
      if (!llmService.isConfigured()) {
        vscode4.window.showErrorMessage(`Please configure your ${modelConfig.provider} settings.`);
        return;
      }
      const document = editor.document;
      const context2 = {
        language: document.languageId,
        selectedText,
        fullContent: document.getText(),
        cursorContext: selectedText,
        fileName: document.fileName
      };
      vscode4.window.withProgress({
        location: vscode4.ProgressLocation.Notification,
        title: "Generating test case ideas...",
        cancellable: false
      }, async () => {
        try {
          const prompt = PromptFactory.createTestIdeasPrompt(context2);
          const response = await llmService.generateResponse(prompt);
          if (response.error) {
            vscode4.window.showErrorMessage(`Failed to generate test ideas: ${response.error}`);
            return;
          }
          WebviewPanelManager.showTestIdeas(response.content);
        } catch (error) {
          vscode4.window.showErrorMessage(`Error generating test ideas: ${error}`);
        }
      });
    })
  ];
  context.subscriptions.push(...commands2);
  context.subscriptions.push(
    vscode4.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration("aiAssistant")) {
        llmService.refreshConfiguration();
      }
    })
  );
  vscode4.commands.executeCommand("setContext", "aiAssistant.viewVisible", true);
  const hasShownWelcome = context.globalState.get("aiAssistant.hasShownWelcome", false);
  if (!hasShownWelcome) {
    vscode4.window.showInformationMessage(
      "Welcome to AI Assistant! Configure your Gemini API key in settings to get started.",
      "Open Settings"
    ).then((selection) => {
      if (selection === "Open Settings") {
        vscode4.commands.executeCommand("workbench.action.openSettings", "aiAssistant.gemini.apiKey");
      }
    });
    context.globalState.update("aiAssistant.hasShownWelcome", true);
  }
}
function deactivate() {
  console.log("AI Assistant extension is now deactivated!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
/*! Bundled license information:

@google/generative-ai/dist/index.mjs:
@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@langchain/core/dist/utils/fast-json-patch/src/helpers.js:
  (*!
   * https://github.com/Starcounter-Jack/JSON-Patch
   * (c) 2017-2022 Joachim Wester
   * MIT licensed
   *)

@langchain/core/dist/utils/fast-json-patch/src/duplex.js:
  (*!
   * https://github.com/Starcounter-Jack/JSON-Patch
   * (c) 2013-2021 Joachim Wester
   * MIT license
   *)

@langchain/core/dist/utils/js-sha1/hash.js:
  (*
   * [js-sha1]{@link https://github.com/emn178/js-sha1}
   *
   * @version 0.6.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2017
   * @license MIT
   *)
*/
//# sourceMappingURL=extension.js.map
