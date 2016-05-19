(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*istanbul ignore next*/"use strict";

/*istanbul ignore next*/require("core-js/shim");

/*istanbul ignore next*/require("babel-regenerator-runtime");

/*istanbul ignore next*/require("core-js/fn/regexp/escape");

/* eslint max-len: 0 */

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

// Should be removed in the next major release:

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"babel-regenerator-runtime":2,"core-js/fn/regexp/escape":3,"core-js/shim":297}],2:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            return result;
          });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return invoke(method, arg);
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : new Promise(function (resolve) {
          resolve(callInvokeWithMethodAndArg());
        });
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          context._sent = arg;

          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":298}],3:[function(require,module,exports){
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;
},{"../../modules/_core":24,"../../modules/core.regexp.escape":121}],4:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],5:[function(require,module,exports){
var cof = require('./_cof');
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};
},{"./_cof":19}],6:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"./_hide":41,"./_wks":118}],7:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],8:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":50}],9:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"./_to-index":106,"./_to-length":109,"./_to-object":110}],10:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"./_to-index":106,"./_to-length":109,"./_to-object":110}],11:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":38}],12:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":106,"./_to-iobject":108,"./_to-length":109}],13:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = require('./_ctx')
  , IObject  = require('./_iobject')
  , toObject = require('./_to-object')
  , toLength = require('./_to-length')
  , asc      = require('./_array-species-create');
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./_array-species-create":16,"./_ctx":26,"./_iobject":46,"./_to-length":109,"./_to-object":110}],14:[function(require,module,exports){
var aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , IObject   = require('./_iobject')
  , toLength  = require('./_to-length');

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};
},{"./_a-function":4,"./_iobject":46,"./_to-length":109,"./_to-object":110}],15:[function(require,module,exports){
var isObject = require('./_is-object')
  , isArray  = require('./_is-array')
  , SPECIES  = require('./_wks')('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};
},{"./_is-array":48,"./_is-object":50,"./_wks":118}],16:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};
},{"./_array-species-constructor":15}],17:[function(require,module,exports){
'use strict';
var aFunction  = require('./_a-function')
  , isObject   = require('./_is-object')
  , invoke     = require('./_invoke')
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};
},{"./_a-function":4,"./_invoke":45,"./_is-object":50}],18:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":19,"./_wks":118}],19:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],20:[function(require,module,exports){
'use strict';
var dP          = require('./_object-dp').f
  , create      = require('./_object-create')
  , hide        = require('./_hide')
  , redefineAll = require('./_redefine-all')
  , ctx         = require('./_ctx')
  , anInstance  = require('./_an-instance')
  , defined     = require('./_defined')
  , forOf       = require('./_for-of')
  , $iterDefine = require('./_iter-define')
  , step        = require('./_iter-step')
  , setSpecies  = require('./_set-species')
  , DESCRIPTORS = require('./_descriptors')
  , fastKey     = require('./_meta').fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./_an-instance":7,"./_ctx":26,"./_defined":28,"./_descriptors":29,"./_for-of":38,"./_hide":41,"./_iter-define":54,"./_iter-step":56,"./_meta":63,"./_object-create":67,"./_object-dp":68,"./_redefine-all":87,"./_set-species":92}],21:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof')
  , from    = require('./_array-from-iterable');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
},{"./_array-from-iterable":11,"./_classof":18}],22:[function(require,module,exports){
'use strict';
var redefineAll       = require('./_redefine-all')
  , getWeak           = require('./_meta').getWeak
  , anObject          = require('./_an-object')
  , isObject          = require('./_is-object')
  , anInstance        = require('./_an-instance')
  , forOf             = require('./_for-of')
  , createArrayMethod = require('./_array-methods')
  , $has              = require('./_has')
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
},{"./_an-instance":7,"./_an-object":8,"./_array-methods":13,"./_for-of":38,"./_has":40,"./_is-object":50,"./_meta":63,"./_redefine-all":87}],23:[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , $export           = require('./_export')
  , redefine          = require('./_redefine')
  , redefineAll       = require('./_redefine-all')
  , meta              = require('./_meta')
  , forOf             = require('./_for-of')
  , anInstance        = require('./_an-instance')
  , isObject          = require('./_is-object')
  , fails             = require('./_fails')
  , $iterDetect       = require('./_iter-detect')
  , setToStringTag    = require('./_set-to-string-tag')
  , inheritIfRequired = require('./_inherit-if-required');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./_an-instance":7,"./_export":33,"./_fails":35,"./_for-of":38,"./_global":39,"./_inherit-if-required":44,"./_is-object":50,"./_iter-detect":55,"./_meta":63,"./_redefine":88,"./_redefine-all":87,"./_set-to-string-tag":93}],24:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],25:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp')
  , createDesc      = require('./_property-desc');

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
},{"./_object-dp":68,"./_property-desc":86}],26:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":4}],27:[function(require,module,exports){
'use strict';
var anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive')
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};
},{"./_an-object":8,"./_to-primitive":111}],28:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],29:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":35}],30:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":39,"./_is-object":50}],31:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],32:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":74,"./_object-keys":77,"./_object-pie":78}],33:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , hide      = require('./_hide')
  , redefine  = require('./_redefine')
  , ctx       = require('./_ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":24,"./_ctx":26,"./_global":39,"./_hide":41,"./_redefine":88}],34:[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"./_wks":118}],35:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],36:[function(require,module,exports){
'use strict';
var hide     = require('./_hide')
  , redefine = require('./_redefine')
  , fails    = require('./_fails')
  , defined  = require('./_defined')
  , wks      = require('./_wks');

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};
},{"./_defined":28,"./_fails":35,"./_hide":41,"./_redefine":88,"./_wks":118}],37:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"./_an-object":8}],38:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":8,"./_ctx":26,"./_is-array-iter":47,"./_iter-call":52,"./_to-length":109,"./core.get-iterator-method":119}],39:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],40:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],41:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":29,"./_object-dp":68,"./_property-desc":86}],42:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":39}],43:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":29,"./_dom-create":30,"./_fails":35}],44:[function(require,module,exports){
var isObject       = require('./_is-object')
  , setPrototypeOf = require('./_set-proto').set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};
},{"./_is-object":50,"./_set-proto":91}],45:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],46:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":19}],47:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":57,"./_wks":118}],48:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":19}],49:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"./_is-object":50}],50:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],51:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object')
  , cof      = require('./_cof')
  , MATCH    = require('./_wks')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"./_cof":19,"./_is-object":50,"./_wks":118}],52:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":8}],53:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":41,"./_object-create":67,"./_property-desc":86,"./_set-to-string-tag":93,"./_wks":118}],54:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":33,"./_has":40,"./_hide":41,"./_iter-create":53,"./_iterators":57,"./_library":59,"./_object-gpo":75,"./_redefine":88,"./_set-to-string-tag":93,"./_wks":118}],55:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":118}],56:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],57:[function(require,module,exports){
module.exports = {};
},{}],58:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":77,"./_to-iobject":108}],59:[function(require,module,exports){
module.exports = false;
},{}],60:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;
},{}],61:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],62:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],63:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":35,"./_has":40,"./_is-object":50,"./_object-dp":68,"./_uid":115}],64:[function(require,module,exports){
var Map     = require('./es6.map')
  , $export = require('./_export')
  , shared  = require('./_shared')('metadata')
  , store   = shared.store || (shared.store = new (require('./es6.weak-map')));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};
},{"./_export":33,"./_shared":95,"./es6.map":151,"./es6.weak-map":257}],65:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":19,"./_global":39,"./_task":105}],66:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":35,"./_iobject":46,"./_object-gops":74,"./_object-keys":77,"./_object-pie":78,"./_to-object":110}],67:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};
},{"./_an-object":8,"./_dom-create":30,"./_enum-bug-keys":31,"./_html":42,"./_object-dps":69,"./_shared-key":94}],68:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":8,"./_descriptors":29,"./_ie8-dom-define":43,"./_to-primitive":111}],69:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":8,"./_descriptors":29,"./_object-dp":68,"./_object-keys":77}],70:[function(require,module,exports){
// Forced replacement prototype accessors methods
module.exports = require('./_library')|| !require('./_fails')(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete require('./_global')[K];
});
},{"./_fails":35,"./_global":39,"./_library":59}],71:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":29,"./_has":40,"./_ie8-dom-define":43,"./_object-pie":78,"./_property-desc":86,"./_to-iobject":108,"./_to-primitive":111}],72:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":73,"./_to-iobject":108}],73:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":31,"./_object-keys-internal":76}],74:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],75:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":40,"./_shared-key":94,"./_to-object":110}],76:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":12,"./_has":40,"./_shared-key":94,"./_to-iobject":108}],77:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":31,"./_object-keys-internal":76}],78:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],79:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":24,"./_export":33,"./_fails":35}],80:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject')
  , isEnum    = require('./_object-pie').f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./_object-keys":77,"./_object-pie":78,"./_to-iobject":108}],81:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN     = require('./_object-gopn')
  , gOPS     = require('./_object-gops')
  , anObject = require('./_an-object')
  , Reflect  = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./_an-object":8,"./_global":39,"./_object-gopn":73,"./_object-gops":74}],82:[function(require,module,exports){
var $parseFloat = require('./_global').parseFloat
  , $trim       = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;
},{"./_global":39,"./_string-trim":103,"./_string-ws":104}],83:[function(require,module,exports){
var $parseInt = require('./_global').parseInt
  , $trim     = require('./_string-trim').trim
  , ws        = require('./_string-ws')
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;
},{"./_global":39,"./_string-trim":103,"./_string-ws":104}],84:[function(require,module,exports){
'use strict';
var path      = require('./_path')
  , invoke    = require('./_invoke')
  , aFunction = require('./_a-function');
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
},{"./_a-function":4,"./_invoke":45,"./_path":85}],85:[function(require,module,exports){
module.exports = require('./_global');
},{"./_global":39}],86:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],87:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};
},{"./_redefine":88}],88:[function(require,module,exports){
var global    = require('./_global')
  , hide      = require('./_hide')
  , has       = require('./_has')
  , SRC       = require('./_uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./_core":24,"./_global":39,"./_has":40,"./_hide":41,"./_uid":115}],89:[function(require,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],90:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],91:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":8,"./_ctx":26,"./_is-object":50,"./_object-gopd":71}],92:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_descriptors":29,"./_global":39,"./_object-dp":68,"./_wks":118}],93:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":40,"./_object-dp":68,"./_wks":118}],94:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":95,"./_uid":115}],95:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":39}],96:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":4,"./_an-object":8,"./_wks":118}],97:[function(require,module,exports){
var fails = require('./_fails');

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};
},{"./_fails":35}],98:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":28,"./_to-integer":107}],99:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp')
  , defined  = require('./_defined');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./_defined":28,"./_is-regexp":51}],100:[function(require,module,exports){
var $export = require('./_export')
  , fails   = require('./_fails')
  , defined = require('./_defined')
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};
},{"./_defined":28,"./_export":33,"./_fails":35}],101:[function(require,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length')
  , repeat   = require('./_string-repeat')
  , defined  = require('./_defined');

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_defined":28,"./_string-repeat":102,"./_to-length":109}],102:[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./_defined":28,"./_to-integer":107}],103:[function(require,module,exports){
var $export = require('./_export')
  , defined = require('./_defined')
  , fails   = require('./_fails')
  , spaces  = require('./_string-ws')
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"./_defined":28,"./_export":33,"./_fails":35,"./_string-ws":104}],104:[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
},{}],105:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":19,"./_ctx":26,"./_dom-create":30,"./_global":39,"./_html":42,"./_invoke":45}],106:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":107}],107:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],108:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":28,"./_iobject":46}],109:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":107}],110:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":28}],111:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":50}],112:[function(require,module,exports){
'use strict';
if(require('./_descriptors')){
  var LIBRARY             = require('./_library')
    , global              = require('./_global')
    , fails               = require('./_fails')
    , $export             = require('./_export')
    , $typed              = require('./_typed')
    , $buffer             = require('./_typed-buffer')
    , ctx                 = require('./_ctx')
    , anInstance          = require('./_an-instance')
    , propertyDesc        = require('./_property-desc')
    , hide                = require('./_hide')
    , redefineAll         = require('./_redefine-all')
    , isInteger           = require('./_is-integer')
    , toInteger           = require('./_to-integer')
    , toLength            = require('./_to-length')
    , toIndex             = require('./_to-index')
    , toPrimitive         = require('./_to-primitive')
    , has                 = require('./_has')
    , same                = require('./_same-value')
    , classof             = require('./_classof')
    , isObject            = require('./_is-object')
    , toObject            = require('./_to-object')
    , isArrayIter         = require('./_is-array-iter')
    , create              = require('./_object-create')
    , getPrototypeOf      = require('./_object-gpo')
    , gOPN                = require('./_object-gopn').f
    , isIterable          = require('./core.is-iterable')
    , getIterFn           = require('./core.get-iterator-method')
    , uid                 = require('./_uid')
    , wks                 = require('./_wks')
    , createArrayMethod   = require('./_array-methods')
    , createArrayIncludes = require('./_array-includes')
    , speciesConstructor  = require('./_species-constructor')
    , ArrayIterators      = require('./es6.array.iterator')
    , Iterators           = require('./_iterators')
    , $iterDetect         = require('./_iter-detect')
    , setSpecies          = require('./_set-species')
    , arrayFill           = require('./_array-fill')
    , arrayCopyWithin     = require('./_array-copy-within')
    , $DP                 = require('./_object-dp')
    , $GOPD               = require('./_object-gopd')
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };
},{"./_an-instance":7,"./_array-copy-within":9,"./_array-fill":10,"./_array-includes":12,"./_array-methods":13,"./_classof":18,"./_ctx":26,"./_descriptors":29,"./_export":33,"./_fails":35,"./_global":39,"./_has":40,"./_hide":41,"./_is-array-iter":47,"./_is-integer":49,"./_is-object":50,"./_iter-detect":55,"./_iterators":57,"./_library":59,"./_object-create":67,"./_object-dp":68,"./_object-gopd":71,"./_object-gopn":73,"./_object-gpo":75,"./_property-desc":86,"./_redefine-all":87,"./_same-value":90,"./_set-species":92,"./_species-constructor":96,"./_to-index":106,"./_to-integer":107,"./_to-length":109,"./_to-object":110,"./_to-primitive":111,"./_typed":114,"./_typed-buffer":113,"./_uid":115,"./_wks":118,"./core.get-iterator-method":119,"./core.is-iterable":120,"./es6.array.iterator":132}],113:[function(require,module,exports){
'use strict';
var global         = require('./_global')
  , DESCRIPTORS    = require('./_descriptors')
  , LIBRARY        = require('./_library')
  , $typed         = require('./_typed')
  , hide           = require('./_hide')
  , redefineAll    = require('./_redefine-all')
  , fails          = require('./_fails')
  , anInstance     = require('./_an-instance')
  , toInteger      = require('./_to-integer')
  , toLength       = require('./_to-length')
  , gOPN           = require('./_object-gopn').f
  , dP             = require('./_object-dp').f
  , arrayFill      = require('./_array-fill')
  , setToStringTag = require('./_set-to-string-tag')
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , parseInt       = global.parseInt
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , min            = Math.min
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
},{"./_an-instance":7,"./_array-fill":10,"./_descriptors":29,"./_fails":35,"./_global":39,"./_hide":41,"./_library":59,"./_object-dp":68,"./_object-gopn":73,"./_redefine-all":87,"./_set-to-string-tag":93,"./_to-integer":107,"./_to-length":109,"./_typed":114}],114:[function(require,module,exports){
var global = require('./_global')
  , hide   = require('./_hide')
  , uid    = require('./_uid')
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};
},{"./_global":39,"./_hide":41,"./_uid":115}],115:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],116:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":24,"./_global":39,"./_library":59,"./_object-dp":68,"./_wks-ext":117}],117:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":118}],118:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":39,"./_shared":95,"./_uid":115}],119:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":18,"./_core":24,"./_iterators":57,"./_wks":118}],120:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};
},{"./_classof":18,"./_core":24,"./_iterators":57,"./_wks":118}],121:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export')
  , $re     = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"./_export":33,"./_replacer":89}],122:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {copyWithin: require('./_array-copy-within')});

require('./_add-to-unscopables')('copyWithin');
},{"./_add-to-unscopables":6,"./_array-copy-within":9,"./_export":33}],123:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $every  = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":13,"./_export":33,"./_strict-method":97}],124:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {fill: require('./_array-fill')});

require('./_add-to-unscopables')('fill');
},{"./_add-to-unscopables":6,"./_array-fill":10,"./_export":33}],125:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":13,"./_export":33,"./_strict-method":97}],126:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":6,"./_array-methods":13,"./_export":33}],127:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":6,"./_array-methods":13,"./_export":33}],128:[function(require,module,exports){
'use strict';
var $export  = require('./_export')
  , $forEach = require('./_array-methods')(0)
  , STRICT   = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":13,"./_export":33,"./_strict-method":97}],129:[function(require,module,exports){
'use strict';
var ctx            = require('./_ctx')
  , $export        = require('./_export')
  , toObject       = require('./_to-object')
  , call           = require('./_iter-call')
  , isArrayIter    = require('./_is-array-iter')
  , toLength       = require('./_to-length')
  , createProperty = require('./_create-property')
  , getIterFn      = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":25,"./_ctx":26,"./_export":33,"./_is-array-iter":47,"./_iter-call":52,"./_iter-detect":55,"./_to-length":109,"./_to-object":110,"./core.get-iterator-method":119}],130:[function(require,module,exports){
'use strict';
var $export       = require('./_export')
  , $indexOf      = require('./_array-includes')(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});
},{"./_array-includes":12,"./_export":33,"./_strict-method":97}],131:[function(require,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', {isArray: require('./_is-array')});
},{"./_export":33,"./_is-array":48}],132:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":6,"./_iter-define":54,"./_iter-step":56,"./_iterators":57,"./_to-iobject":108}],133:[function(require,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});
},{"./_export":33,"./_iobject":46,"./_strict-method":97,"./_to-iobject":108}],134:[function(require,module,exports){
'use strict';
var $export       = require('./_export')
  , toIObject     = require('./_to-iobject')
  , toInteger     = require('./_to-integer')
  , toLength      = require('./_to-length')
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});
},{"./_export":33,"./_strict-method":97,"./_to-integer":107,"./_to-iobject":108,"./_to-length":109}],135:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $map    = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":13,"./_export":33,"./_strict-method":97}],136:[function(require,module,exports){
'use strict';
var $export        = require('./_export')
  , createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});
},{"./_create-property":25,"./_export":33,"./_fails":35}],137:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});
},{"./_array-reduce":14,"./_export":33,"./_strict-method":97}],138:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});
},{"./_array-reduce":14,"./_export":33,"./_strict-method":97}],139:[function(require,module,exports){
'use strict';
var $export    = require('./_export')
  , html       = require('./_html')
  , cof        = require('./_cof')
  , toIndex    = require('./_to-index')
  , toLength   = require('./_to-length')
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
},{"./_cof":19,"./_export":33,"./_fails":35,"./_html":42,"./_to-index":106,"./_to-length":109}],140:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $some   = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":13,"./_export":33,"./_strict-method":97}],141:[function(require,module,exports){
'use strict';
var $export   = require('./_export')
  , aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , fails     = require('./_fails')
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});
},{"./_a-function":4,"./_export":33,"./_fails":35,"./_strict-method":97,"./_to-object":110}],142:[function(require,module,exports){
require('./_set-species')('Array');
},{"./_set-species":92}],143:[function(require,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});
},{"./_export":33}],144:[function(require,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export')
  , fails   = require('./_fails')
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"./_export":33,"./_fails":35}],145:[function(require,module,exports){
'use strict';
var $export     = require('./_export')
  , toObject    = require('./_to-object')
  , toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});
},{"./_export":33,"./_fails":35,"./_to-object":110,"./_to-primitive":111}],146:[function(require,module,exports){
var TO_PRIMITIVE = require('./_wks')('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));
},{"./_date-to-primitive":27,"./_hide":41,"./_wks":118}],147:[function(require,module,exports){
var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  require('./_redefine')(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}
},{"./_redefine":88}],148:[function(require,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', {bind: require('./_bind')});
},{"./_bind":17,"./_export":33}],149:[function(require,module,exports){
'use strict';
var isObject       = require('./_is-object')
  , getPrototypeOf = require('./_object-gpo')
  , HAS_INSTANCE   = require('./_wks')('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))require('./_object-dp').f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});
},{"./_is-object":50,"./_object-dp":68,"./_object-gpo":75,"./_wks":118}],150:[function(require,module,exports){
var dP         = require('./_object-dp').f
  , createDesc = require('./_property-desc')
  , has        = require('./_has')
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});
},{"./_descriptors":29,"./_has":40,"./_object-dp":68,"./_property-desc":86}],151:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.1 Map Objects
module.exports = require('./_collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./_collection":23,"./_collection-strong":20}],152:[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export')
  , log1p   = require('./_math-log1p')
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"./_export":33,"./_math-log1p":61}],153:[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export')
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});
},{"./_export":33}],154:[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export')
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"./_export":33}],155:[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export')
  , sign    = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"./_export":33,"./_math-sign":62}],156:[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./_export":33}],157:[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"./_export":33}],158:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export')
  , $expm1  = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});
},{"./_export":33,"./_math-expm1":60}],159:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = require('./_export')
  , sign      = require('./_math-sign')
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"./_export":33,"./_math-sign":62}],160:[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export')
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"./_export":33}],161:[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export')
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"./_export":33,"./_fails":35}],162:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./_export":33}],163:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', {log1p: require('./_math-log1p')});
},{"./_export":33,"./_math-log1p":61}],164:[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"./_export":33}],165:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', {sign: require('./_math-sign')});
},{"./_export":33,"./_math-sign":62}],166:[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"./_export":33,"./_fails":35,"./_math-expm1":60}],167:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./_export":33,"./_math-expm1":60}],168:[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"./_export":33}],169:[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , has               = require('./_has')
  , cof               = require('./_cof')
  , inheritIfRequired = require('./_inherit-if-required')
  , toPrimitive       = require('./_to-primitive')
  , fails             = require('./_fails')
  , gOPN              = require('./_object-gopn').f
  , gOPD              = require('./_object-gopd').f
  , dP                = require('./_object-dp').f
  , $trim             = require('./_string-trim').trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(require('./_object-create')(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}
},{"./_cof":19,"./_descriptors":29,"./_fails":35,"./_global":39,"./_has":40,"./_inherit-if-required":44,"./_object-create":67,"./_object-dp":68,"./_object-gopd":71,"./_object-gopn":73,"./_redefine":88,"./_string-trim":103,"./_to-primitive":111}],170:[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"./_export":33}],171:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./_export')
  , _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./_export":33,"./_global":39}],172:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', {isInteger: require('./_is-integer')});
},{"./_export":33,"./_is-integer":49}],173:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./_export":33}],174:[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = require('./_export')
  , isInteger = require('./_is-integer')
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"./_export":33,"./_is-integer":49}],175:[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./_export":33}],176:[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"./_export":33}],177:[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});
},{"./_export":33,"./_parse-float":82}],178:[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});
},{"./_export":33,"./_parse-int":83}],179:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , anInstance   = require('./_an-instance')
  , toInteger    = require('./_to-integer')
  , aNumberValue = require('./_a-number-value')
  , repeat       = require('./_string-repeat')
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});
},{"./_a-number-value":5,"./_an-instance":7,"./_export":33,"./_fails":35,"./_string-repeat":102,"./_to-integer":107}],180:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $fails       = require('./_fails')
  , aNumberValue = require('./_a-number-value')
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});
},{"./_a-number-value":5,"./_export":33,"./_fails":35}],181:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":33,"./_object-assign":66}],182:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":33,"./_object-create":67}],183:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperties: require('./_object-dps')});
},{"./_descriptors":29,"./_export":33,"./_object-dps":69}],184:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":29,"./_export":33,"./_object-dp":68}],185:[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});
},{"./_is-object":50,"./_meta":63,"./_object-sap":79}],186:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":71,"./_object-sap":79,"./_to-iobject":108}],187:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function(){
  return require('./_object-gopn-ext').f;
});
},{"./_object-gopn-ext":72,"./_object-sap":79}],188:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":75,"./_object-sap":79,"./_to-object":110}],189:[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"./_is-object":50,"./_object-sap":79}],190:[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"./_is-object":50,"./_object-sap":79}],191:[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"./_is-object":50,"./_object-sap":79}],192:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', {is: require('./_same-value')});
},{"./_export":33,"./_same-value":90}],193:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":77,"./_object-sap":79,"./_to-object":110}],194:[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});
},{"./_is-object":50,"./_meta":63,"./_object-sap":79}],195:[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});
},{"./_is-object":50,"./_meta":63,"./_object-sap":79}],196:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":33,"./_set-proto":91}],197:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof')
  , test    = {};
test[require('./_wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./_redefine')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./_classof":18,"./_redefine":88,"./_wks":118}],198:[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});
},{"./_export":33,"./_parse-float":82}],199:[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});
},{"./_export":33,"./_parse-int":83}],200:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , anObject           = require('./_an-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , setProto           = require('./_set-proto').set
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":4,"./_an-instance":7,"./_an-object":8,"./_classof":18,"./_core":24,"./_ctx":26,"./_export":33,"./_for-of":38,"./_global":39,"./_is-object":50,"./_iter-detect":55,"./_library":59,"./_microtask":65,"./_redefine-all":87,"./_set-proto":91,"./_set-species":92,"./_set-to-string-tag":93,"./_species-constructor":96,"./_task":105,"./_wks":118}],201:[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = require('./_export')
  , aFunction = require('./_a-function')
  , anObject  = require('./_an-object')
  , _apply    = Function.apply;

$export($export.S, 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(aFunction(target), thisArgument, anObject(argumentsList));
  }
});
},{"./_a-function":4,"./_an-object":8,"./_export":33}],202:[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export   = require('./_export')
  , create    = require('./_object-create')
  , aFunction = require('./_a-function')
  , anObject  = require('./_an-object')
  , isObject  = require('./_is-object')
  , bind      = require('./_bind');

// MS Edge supports only 2 arguments
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
$export($export.S + $export.F * require('./_fails')(function(){
  function F(){}
  return !(Reflect.construct(function(){}, [], F) instanceof F);
}), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"./_a-function":4,"./_an-object":8,"./_bind":17,"./_export":33,"./_fails":35,"./_is-object":50,"./_object-create":67}],203:[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = require('./_object-dp')
  , $export     = require('./_export')
  , anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":8,"./_export":33,"./_fails":35,"./_object-dp":68,"./_to-primitive":111}],204:[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = require('./_export')
  , gOPD     = require('./_object-gopd').f
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"./_an-object":8,"./_export":33,"./_object-gopd":71}],205:[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = require('./_export')
  , anObject = require('./_an-object');
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"./_an-object":8,"./_export":33,"./_iter-create":53}],206:[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = require('./_object-gopd')
  , $export  = require('./_export')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});
},{"./_an-object":8,"./_export":33,"./_object-gopd":71}],207:[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = require('./_export')
  , getProto = require('./_object-gpo')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"./_an-object":8,"./_export":33,"./_object-gpo":75}],208:[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , isObject       = require('./_is-object')
  , anObject       = require('./_an-object');

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"./_an-object":8,"./_export":33,"./_has":40,"./_is-object":50,"./_object-gopd":71,"./_object-gpo":75}],209:[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"./_export":33}],210:[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = require('./_export')
  , anObject      = require('./_an-object')
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"./_an-object":8,"./_export":33}],211:[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', {ownKeys: require('./_own-keys')});
},{"./_export":33,"./_own-keys":81}],212:[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = require('./_export')
  , anObject           = require('./_an-object')
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":8,"./_export":33}],213:[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = require('./_export')
  , setProto = require('./_set-proto');

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_export":33,"./_set-proto":91}],214:[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = require('./_object-dp')
  , gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , createDesc     = require('./_property-desc')
  , anObject       = require('./_an-object')
  , isObject       = require('./_is-object');

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"./_an-object":8,"./_export":33,"./_has":40,"./_is-object":50,"./_object-dp":68,"./_object-gopd":71,"./_object-gpo":75,"./_property-desc":86}],215:[function(require,module,exports){
var global            = require('./_global')
  , inheritIfRequired = require('./_inherit-if-required')
  , dP                = require('./_object-dp').f
  , gOPN              = require('./_object-gopn').f
  , isRegExp          = require('./_is-regexp')
  , $flags            = require('./_flags')
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function(){
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');
},{"./_descriptors":29,"./_fails":35,"./_flags":37,"./_global":39,"./_inherit-if-required":44,"./_is-regexp":51,"./_object-dp":68,"./_object-gopn":73,"./_redefine":88,"./_set-species":92,"./_wks":118}],216:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if(require('./_descriptors') && /./g.flags != 'g')require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});
},{"./_descriptors":29,"./_flags":37,"./_object-dp":68}],217:[function(require,module,exports){
// @@match logic
require('./_fix-re-wks')('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});
},{"./_fix-re-wks":36}],218:[function(require,module,exports){
// @@replace logic
require('./_fix-re-wks')('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});
},{"./_fix-re-wks":36}],219:[function(require,module,exports){
// @@search logic
require('./_fix-re-wks')('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});
},{"./_fix-re-wks":36}],220:[function(require,module,exports){
// @@split logic
require('./_fix-re-wks')('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = require('./_is-regexp')
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});
},{"./_fix-re-wks":36,"./_is-regexp":51}],221:[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject    = require('./_an-object')
  , $flags      = require('./_flags')
  , DESCRIPTORS = require('./_descriptors')
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(require('./_fails')(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}
},{"./_an-object":8,"./_descriptors":29,"./_fails":35,"./_flags":37,"./_redefine":88,"./es6.regexp.flags":216}],222:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.2 Set Objects
module.exports = require('./_collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./_collection":23,"./_collection-strong":20}],223:[function(require,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});
},{"./_string-html":100}],224:[function(require,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});
},{"./_string-html":100}],225:[function(require,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});
},{"./_string-html":100}],226:[function(require,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});
},{"./_string-html":100}],227:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $at     = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./_export":33,"./_string-at":98}],228:[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = require('./_export')
  , toLength  = require('./_to-length')
  , context   = require('./_string-context')
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"./_export":33,"./_fails-is-regexp":34,"./_string-context":99,"./_to-length":109}],229:[function(require,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});
},{"./_string-html":100}],230:[function(require,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});
},{"./_string-html":100}],231:[function(require,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});
},{"./_string-html":100}],232:[function(require,module,exports){
var $export        = require('./_export')
  , toIndex        = require('./_to-index')
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./_export":33,"./_to-index":106}],233:[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = require('./_export')
  , context  = require('./_string-context')
  , INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"./_export":33,"./_fails-is-regexp":34,"./_string-context":99}],234:[function(require,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});
},{"./_string-html":100}],235:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":54,"./_string-at":98}],236:[function(require,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});
},{"./_string-html":100}],237:[function(require,module,exports){
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"./_export":33,"./_to-iobject":108,"./_to-length":109}],238:[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});
},{"./_export":33,"./_string-repeat":102}],239:[function(require,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});
},{"./_string-html":100}],240:[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = require('./_export')
  , toLength    = require('./_to-length')
  , context     = require('./_string-context')
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"./_export":33,"./_fails-is-regexp":34,"./_string-context":99,"./_to-length":109}],241:[function(require,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});
},{"./_string-html":100}],242:[function(require,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});
},{"./_string-html":100}],243:[function(require,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});
},{"./_string-html":100}],244:[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"./_string-trim":103}],245:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":8,"./_descriptors":29,"./_enum-keys":32,"./_export":33,"./_fails":35,"./_global":39,"./_has":40,"./_hide":41,"./_is-array":48,"./_keyof":58,"./_library":59,"./_meta":63,"./_object-create":67,"./_object-dp":68,"./_object-gopd":71,"./_object-gopn":73,"./_object-gopn-ext":72,"./_object-gops":74,"./_object-keys":77,"./_object-pie":78,"./_property-desc":86,"./_redefine":88,"./_set-to-string-tag":93,"./_shared":95,"./_to-iobject":108,"./_to-primitive":111,"./_uid":115,"./_wks":118,"./_wks-define":116,"./_wks-ext":117}],246:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $typed       = require('./_typed')
  , buffer       = require('./_typed-buffer')
  , anObject     = require('./_an-object')
  , toIndex      = require('./_to-index')
  , toLength     = require('./_to-length')
  , isObject     = require('./_is-object')
  , TYPED_ARRAY  = require('./_wks')('typed_array')
  , ArrayBuffer  = require('./_global').ArrayBuffer
  , speciesConstructor = require('./_species-constructor')
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);
},{"./_an-object":8,"./_export":33,"./_fails":35,"./_global":39,"./_is-object":50,"./_set-species":92,"./_species-constructor":96,"./_to-index":106,"./_to-length":109,"./_typed":114,"./_typed-buffer":113,"./_wks":118}],247:[function(require,module,exports){
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});
},{"./_export":33,"./_typed":114,"./_typed-buffer":113}],248:[function(require,module,exports){
require('./_typed-array')('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":112}],249:[function(require,module,exports){
require('./_typed-array')('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":112}],250:[function(require,module,exports){
require('./_typed-array')('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":112}],251:[function(require,module,exports){
require('./_typed-array')('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":112}],252:[function(require,module,exports){
require('./_typed-array')('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":112}],253:[function(require,module,exports){
require('./_typed-array')('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":112}],254:[function(require,module,exports){
require('./_typed-array')('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":112}],255:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":112}],256:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);
},{"./_typed-array":112}],257:[function(require,module,exports){
'use strict';
var each         = require('./_array-methods')(0)
  , redefine     = require('./_redefine')
  , meta         = require('./_meta')
  , assign       = require('./_object-assign')
  , weak         = require('./_collection-weak')
  , isObject     = require('./_is-object')
  , has          = require('./_has')
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./_array-methods":13,"./_collection":23,"./_collection-weak":22,"./_has":40,"./_is-object":50,"./_meta":63,"./_object-assign":66,"./_redefine":88}],258:[function(require,module,exports){
'use strict';
var weak = require('./_collection-weak');

// 23.4 WeakSet Objects
require('./_collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./_collection":23,"./_collection-weak":22}],259:[function(require,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export   = require('./_export')
  , $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');
},{"./_add-to-unscopables":6,"./_array-includes":12,"./_export":33}],260:[function(require,module,exports){
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = require('./_export')
  , microtask = require('./_microtask')()
  , process   = require('./_global').process
  , isNode    = require('./_cof')(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});
},{"./_cof":19,"./_export":33,"./_global":39,"./_microtask":65}],261:[function(require,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export')
  , cof     = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});
},{"./_cof":19,"./_export":33}],262:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Map', {toJSON: require('./_collection-to-json')('Map')});
},{"./_collection-to-json":21,"./_export":33}],263:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});
},{"./_export":33}],264:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});
},{"./_export":33}],265:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});
},{"./_export":33}],266:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});
},{"./_export":33}],267:[function(require,module,exports){
'use strict';
var $export         = require('./_export')
  , toObject        = require('./_to-object')
  , aFunction       = require('./_a-function')
  , $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});
},{"./_a-function":4,"./_descriptors":29,"./_export":33,"./_object-dp":68,"./_object-forced-pam":70,"./_to-object":110}],268:[function(require,module,exports){
'use strict';
var $export         = require('./_export')
  , toObject        = require('./_to-object')
  , aFunction       = require('./_a-function')
  , $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});
},{"./_a-function":4,"./_descriptors":29,"./_export":33,"./_object-dp":68,"./_object-forced-pam":70,"./_to-object":110}],269:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export  = require('./_export')
  , $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./_export":33,"./_object-to-array":80}],270:[function(require,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = require('./_export')
  , ownKeys        = require('./_own-keys')
  , toIObject      = require('./_to-iobject')
  , gOPD           = require('./_object-gopd')
  , createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key, D;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});
},{"./_create-property":25,"./_export":33,"./_object-gopd":71,"./_own-keys":81,"./_to-iobject":108}],271:[function(require,module,exports){
'use strict';
var $export                  = require('./_export')
  , toObject                 = require('./_to-object')
  , toPrimitive              = require('./_to-primitive')
  , getPrototypeOf           = require('./_object-gpo')
  , getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});
},{"./_descriptors":29,"./_export":33,"./_object-forced-pam":70,"./_object-gopd":71,"./_object-gpo":75,"./_to-object":110,"./_to-primitive":111}],272:[function(require,module,exports){
'use strict';
var $export                  = require('./_export')
  , toObject                 = require('./_to-object')
  , toPrimitive              = require('./_to-primitive')
  , getPrototypeOf           = require('./_object-gpo')
  , getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});
},{"./_descriptors":29,"./_export":33,"./_object-forced-pam":70,"./_object-gopd":71,"./_object-gpo":75,"./_to-object":110,"./_to-primitive":111}],273:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export')
  , $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"./_export":33,"./_object-to-array":80}],274:[function(require,module,exports){
'use strict';
// https://github.com/zenparsing/es-observable
var $export     = require('./_export')
  , global      = require('./_global')
  , core        = require('./_core')
  , microtask   = require('./_microtask')()
  , OBSERVABLE  = require('./_wks')('observable')
  , aFunction   = require('./_a-function')
  , anObject    = require('./_an-object')
  , anInstance  = require('./_an-instance')
  , redefineAll = require('./_redefine-all')
  , hide        = require('./_hide')
  , forOf       = require('./_for-of')
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

require('./_set-species')('Observable');
},{"./_a-function":4,"./_an-instance":7,"./_an-object":8,"./_core":24,"./_export":33,"./_for-of":38,"./_global":39,"./_hide":41,"./_microtask":65,"./_redefine-all":87,"./_set-species":92,"./_wks":118}],275:[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});
},{"./_an-object":8,"./_metadata":64}],276:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});
},{"./_an-object":8,"./_metadata":64}],277:[function(require,module,exports){
var Set                     = require('./es6.set')
  , from                    = require('./_array-from-iterable')
  , metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , getPrototypeOf          = require('./_object-gpo')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":8,"./_array-from-iterable":11,"./_metadata":64,"./_object-gpo":75,"./es6.set":222}],278:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":8,"./_metadata":64,"./_object-gpo":75}],279:[function(require,module,exports){
var metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":8,"./_metadata":64}],280:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":8,"./_metadata":64}],281:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":8,"./_metadata":64,"./_object-gpo":75}],282:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":8,"./_metadata":64}],283:[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , aFunction                 = require('./_a-function')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});
},{"./_a-function":4,"./_an-object":8,"./_metadata":64}],284:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Set', {toJSON: require('./_collection-to-json')('Set')});
},{"./_collection-to-json":21,"./_export":33}],285:[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export')
  , $at     = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./_export":33,"./_string-at":98}],286:[function(require,module,exports){
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export     = require('./_export')
  , defined     = require('./_defined')
  , toLength    = require('./_to-length')
  , isRegExp    = require('./_is-regexp')
  , getFlags    = require('./_flags')
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});
},{"./_defined":28,"./_export":33,"./_flags":37,"./_is-regexp":51,"./_iter-create":53,"./_to-length":109}],287:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"./_export":33,"./_string-pad":101}],288:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"./_export":33,"./_string-pad":101}],289:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');
},{"./_string-trim":103}],290:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');
},{"./_string-trim":103}],291:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":116}],292:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":116}],293:[function(require,module,exports){
// https://github.com/ljharb/proposal-global
var $export = require('./_export');

$export($export.S, 'System', {global: require('./_global')});
},{"./_export":33,"./_global":39}],294:[function(require,module,exports){
var $iterators    = require('./es6.array.iterator')
  , redefine      = require('./_redefine')
  , global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , wks           = require('./_wks')
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}
},{"./_global":39,"./_hide":41,"./_iterators":57,"./_redefine":88,"./_wks":118,"./es6.array.iterator":132}],295:[function(require,module,exports){
var $export = require('./_export')
  , $task   = require('./_task');
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./_export":33,"./_task":105}],296:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = require('./_global')
  , $export    = require('./_export')
  , invoke     = require('./_invoke')
  , partial    = require('./_partial')
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"./_export":33,"./_global":39,"./_invoke":45,"./_partial":84}],297:[function(require,module,exports){
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.umulh');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');
},{"./modules/_core":24,"./modules/es6.array.copy-within":122,"./modules/es6.array.every":123,"./modules/es6.array.fill":124,"./modules/es6.array.filter":125,"./modules/es6.array.find":127,"./modules/es6.array.find-index":126,"./modules/es6.array.for-each":128,"./modules/es6.array.from":129,"./modules/es6.array.index-of":130,"./modules/es6.array.is-array":131,"./modules/es6.array.iterator":132,"./modules/es6.array.join":133,"./modules/es6.array.last-index-of":134,"./modules/es6.array.map":135,"./modules/es6.array.of":136,"./modules/es6.array.reduce":138,"./modules/es6.array.reduce-right":137,"./modules/es6.array.slice":139,"./modules/es6.array.some":140,"./modules/es6.array.sort":141,"./modules/es6.array.species":142,"./modules/es6.date.now":143,"./modules/es6.date.to-iso-string":144,"./modules/es6.date.to-json":145,"./modules/es6.date.to-primitive":146,"./modules/es6.date.to-string":147,"./modules/es6.function.bind":148,"./modules/es6.function.has-instance":149,"./modules/es6.function.name":150,"./modules/es6.map":151,"./modules/es6.math.acosh":152,"./modules/es6.math.asinh":153,"./modules/es6.math.atanh":154,"./modules/es6.math.cbrt":155,"./modules/es6.math.clz32":156,"./modules/es6.math.cosh":157,"./modules/es6.math.expm1":158,"./modules/es6.math.fround":159,"./modules/es6.math.hypot":160,"./modules/es6.math.imul":161,"./modules/es6.math.log10":162,"./modules/es6.math.log1p":163,"./modules/es6.math.log2":164,"./modules/es6.math.sign":165,"./modules/es6.math.sinh":166,"./modules/es6.math.tanh":167,"./modules/es6.math.trunc":168,"./modules/es6.number.constructor":169,"./modules/es6.number.epsilon":170,"./modules/es6.number.is-finite":171,"./modules/es6.number.is-integer":172,"./modules/es6.number.is-nan":173,"./modules/es6.number.is-safe-integer":174,"./modules/es6.number.max-safe-integer":175,"./modules/es6.number.min-safe-integer":176,"./modules/es6.number.parse-float":177,"./modules/es6.number.parse-int":178,"./modules/es6.number.to-fixed":179,"./modules/es6.number.to-precision":180,"./modules/es6.object.assign":181,"./modules/es6.object.create":182,"./modules/es6.object.define-properties":183,"./modules/es6.object.define-property":184,"./modules/es6.object.freeze":185,"./modules/es6.object.get-own-property-descriptor":186,"./modules/es6.object.get-own-property-names":187,"./modules/es6.object.get-prototype-of":188,"./modules/es6.object.is":192,"./modules/es6.object.is-extensible":189,"./modules/es6.object.is-frozen":190,"./modules/es6.object.is-sealed":191,"./modules/es6.object.keys":193,"./modules/es6.object.prevent-extensions":194,"./modules/es6.object.seal":195,"./modules/es6.object.set-prototype-of":196,"./modules/es6.object.to-string":197,"./modules/es6.parse-float":198,"./modules/es6.parse-int":199,"./modules/es6.promise":200,"./modules/es6.reflect.apply":201,"./modules/es6.reflect.construct":202,"./modules/es6.reflect.define-property":203,"./modules/es6.reflect.delete-property":204,"./modules/es6.reflect.enumerate":205,"./modules/es6.reflect.get":208,"./modules/es6.reflect.get-own-property-descriptor":206,"./modules/es6.reflect.get-prototype-of":207,"./modules/es6.reflect.has":209,"./modules/es6.reflect.is-extensible":210,"./modules/es6.reflect.own-keys":211,"./modules/es6.reflect.prevent-extensions":212,"./modules/es6.reflect.set":214,"./modules/es6.reflect.set-prototype-of":213,"./modules/es6.regexp.constructor":215,"./modules/es6.regexp.flags":216,"./modules/es6.regexp.match":217,"./modules/es6.regexp.replace":218,"./modules/es6.regexp.search":219,"./modules/es6.regexp.split":220,"./modules/es6.regexp.to-string":221,"./modules/es6.set":222,"./modules/es6.string.anchor":223,"./modules/es6.string.big":224,"./modules/es6.string.blink":225,"./modules/es6.string.bold":226,"./modules/es6.string.code-point-at":227,"./modules/es6.string.ends-with":228,"./modules/es6.string.fixed":229,"./modules/es6.string.fontcolor":230,"./modules/es6.string.fontsize":231,"./modules/es6.string.from-code-point":232,"./modules/es6.string.includes":233,"./modules/es6.string.italics":234,"./modules/es6.string.iterator":235,"./modules/es6.string.link":236,"./modules/es6.string.raw":237,"./modules/es6.string.repeat":238,"./modules/es6.string.small":239,"./modules/es6.string.starts-with":240,"./modules/es6.string.strike":241,"./modules/es6.string.sub":242,"./modules/es6.string.sup":243,"./modules/es6.string.trim":244,"./modules/es6.symbol":245,"./modules/es6.typed.array-buffer":246,"./modules/es6.typed.data-view":247,"./modules/es6.typed.float32-array":248,"./modules/es6.typed.float64-array":249,"./modules/es6.typed.int16-array":250,"./modules/es6.typed.int32-array":251,"./modules/es6.typed.int8-array":252,"./modules/es6.typed.uint16-array":253,"./modules/es6.typed.uint32-array":254,"./modules/es6.typed.uint8-array":255,"./modules/es6.typed.uint8-clamped-array":256,"./modules/es6.weak-map":257,"./modules/es6.weak-set":258,"./modules/es7.array.includes":259,"./modules/es7.asap":260,"./modules/es7.error.is-error":261,"./modules/es7.map.to-json":262,"./modules/es7.math.iaddh":263,"./modules/es7.math.imulh":264,"./modules/es7.math.isubh":265,"./modules/es7.math.umulh":266,"./modules/es7.object.define-getter":267,"./modules/es7.object.define-setter":268,"./modules/es7.object.entries":269,"./modules/es7.object.get-own-property-descriptors":270,"./modules/es7.object.lookup-getter":271,"./modules/es7.object.lookup-setter":272,"./modules/es7.object.values":273,"./modules/es7.observable":274,"./modules/es7.reflect.define-metadata":275,"./modules/es7.reflect.delete-metadata":276,"./modules/es7.reflect.get-metadata":278,"./modules/es7.reflect.get-metadata-keys":277,"./modules/es7.reflect.get-own-metadata":280,"./modules/es7.reflect.get-own-metadata-keys":279,"./modules/es7.reflect.has-metadata":281,"./modules/es7.reflect.has-own-metadata":282,"./modules/es7.reflect.metadata":283,"./modules/es7.set.to-json":284,"./modules/es7.string.at":285,"./modules/es7.string.match-all":286,"./modules/es7.string.pad-end":287,"./modules/es7.string.pad-start":288,"./modules/es7.string.trim-left":289,"./modules/es7.string.trim-right":290,"./modules/es7.symbol.async-iterator":291,"./modules/es7.symbol.observable":292,"./modules/es7.system.global":293,"./modules/web.dom.iterable":294,"./modules/web.immediate":295,"./modules/web.timers":296}],298:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],299:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.2.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-04-05T19:26Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the 1.x branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

},{}],300:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 12/14/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _LayerItsInventory = require('../layers/LayerItsInventory');

var _LayerItsInventory2 = _interopRequireDefault(_LayerItsInventory);

var _colors = require('../util/colors');

var colors = _interopRequireWildcard(_colors);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('collections');

var itsConfig = [{ name: 'Camera', itsType: 'cctv', minZoom: 11, itsIcon: 'cctv.png' }, {
    name: 'Message Signs',
    itsType: 'DMS',
    minZoom: 11,
    itsIconConfig: {
        prop: 'dmsType',
        defaultName: 'DMS',
        defaultIcon: 'dms.png',
        iconArray: [['pcms', 'PCMS', 'pcms.png']]
    }
}, { name: 'Lighting', itsType: 'light', minZoom: 16, itsIcon: 'streetlight.png', visible: false, onDemand: true }, { name: 'Bluetooth', itsType: 'blue', minZoom: 10, itsIcon: 'bluetooth.png', visible: false }, { name: 'Cabinets', itsType: 'cabinet', minZoom: 10, itsIcon: 'cabinet.png', visible: false }, { name: 'Hut', itsType: 'hut', minZoom: 10, itsIcon: 'hut.png', visible: false }, { name: 'Vault', itsType: 'vault', minZoom: 13, itsIcon: 'vault.png', visible: false }, { name: 'Advisory Radio', itsType: 'har', minZoom: 10, itsIcon: 'har.png', visible: false }, {
    name: 'Loop Detectors',
    itsType: 'loop',
    legendCollapse: true,
    minZoom: 14,
    visible: false,
    itsIconConfig: {
        prop: 'dtctrType',
        defaultName: 'Other',
        defaultIcon: 'loopdetectorother.png',
        iconArray: [['detector', 'Detector', 'loopdetector.png'], ['long', 'Long', 'loopdetectorlong.png'], ['zone', 'Zone', 'loopdetectorzone.png']]
    },
    onDemand: true
}, { name: 'Microwave', itsType: 'microwave', minZoom: 14, itsIcon: 'microwave.png', visible: false }, { name: 'Pull Box', itsType: 'pull', minZoom: 14, itsIcon: 'pullbox.png', visible: false, onDemand: true }, { name: 'RWIS', itsType: 'rwis', minZoom: 7, itsIcon: 'rwis.png', visible: false }, { name: 'Ramp Gates', itsType: 'gate', minZoom: 10, itsIcon: 'rampgate.png', visible: false }, { name: 'Ramp Meter', itsType: 'meter', minZoom: 10, itsIcon: 'rampmeter.png', visible: false }, { name: 'Signal', itsType: 'signal', minZoom: 13, itsIcon: 'signal.png', visible: false, onDemand: true }, { name: 'Tower', itsType: 'tower', minZoom: 10, itsIcon: 'tower.png', visible: false }, {
    name: 'Trench',
    itsType: 'trench',
    onDemand: true,
    visible: false,
    onDemandDelay: 500,
    minZoom: 15,
    legendCollapse: true,
    itsLineConfig: {
        prop: 'owner',
        //defaultName: 'Other',
        //defaultWidth: 7,
        defaultColor: colors.hexAlphaToRgbOrRgba('#747474', 0.8),
        lineArray: [['WisDOT', 'WisDOT', colors.hexAlphaToRgbOrRgba('#FF032F', 0.7)], ['WIN', 'WIN', colors.hexAlphaToRgbOrRgba('#FFC632', 0.7)], ['USXchange', 'USXchange', colors.hexAlphaToRgbOrRgba('#2DFF46', 0.7)], ['AT&T', 'AT&T', colors.hexAlphaToRgbOrRgba('#ff2be5', 0.7)], ['Touch America', 'Touch America', colors.hexAlphaToRgbOrRgba('#52f3ff', 0.7)], ['Qwest', 'Qwest', colors.hexAlphaToRgbOrRgba('#9278ff', 0.7)], ['McLeodUSA', 'McLeodUSA', colors.hexAlphaToRgbOrRgba('#2926FF', 0.7)], ['CINC', 'CINC', colors.hexAlphaToRgbOrRgba('#CB00FF', 0.7)], ['City of Madison', 'Madison', colors.hexAlphaToRgbOrRgba('#000380', 0.7)]]
    }
}];

var ItsLayerCollection = function () {

    /**
     * Create a collection of all ITS layers
     * @param {ol.Map} theMap the openlayers map
     * @param {Array} [exclude=[]] array of Its layer identifiers to exclude
     *
     * BLUE Bluetooth Detector - Bluetooth Detector
     * CABINET Cabinets - The cabinets
     * CCTV Camera - Traffic Cameras
     * HUT Communication Hut - Communication Hut
     * VAULT Communication Vault - The communication vaults
     * HAR Highway Advisory Radio - Advisory Radios
     * LIGHT Lighting - Lighting
     * LOOP Loop Detectors - Loop Detectors
     * DMS Message Board - Message Boards and Signs
     * MICROWAVE Microwave Detector - Microwave Detectors
     * PULL Pull Box - A pull box
     * RWIS RWIS - Road weather information system
     * GATE Ramp Gate - The ramp Gates
     * METER Ramp Meter - The ramp meters
     * SIGNAL Signal - Traffic Signal
     * TOWER Tower - The towers
     * TRENCH
     */

    function ItsLayerCollection(theMap, exclude) {
        _classCallCheck(this, ItsLayerCollection);

        this.map = theMap;
        this._layers = [];

        exclude = (typeof exclude === 'undefined' ? 'undefined' : _typeof(exclude)) == 'object' ? exclude : [];

        for (var i = 0; i < itsConfig.length; i++) {
            var lyrConfig = itsConfig[i];
            var addLayer = true;

            for (var j = 0; j < exclude.length; j++) {
                if (exclude[j] == lyrConfig.itsType) {
                    addLayer = false;
                    break;
                }
            }

            if (addLayer) {
                var inventLyr = new _LayerItsInventory2.default(lyrConfig);
                this['map'].addLayer(inventLyr.olLayer);
                this._layers.push(inventLyr);
            }
        }
    }

    /**
     * Return the array of layers in this collection
     * @returns {Array<LayerItsInventory>} an array of layers
     */


    _createClass(ItsLayerCollection, [{
        key: 'layers',
        get: function get() {
            return this._layers;
        }
    }]);

    return ItsLayerCollection;
}();

nm.ItsLayerCollection = ItsLayerCollection;
exports.default = ItsLayerCollection;

},{"../layers/LayerItsInventory":307,"../util/colors":321,"../util/provide":323}],301:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 12/16/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _makeGuid = require('../util/makeGuid');

var _makeGuid2 = _interopRequireDefault(_makeGuid);

var _mapMove = require('../olHelpers/mapMove');

var _mapMove2 = _interopRequireDefault(_mapMove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('collections');

var LayerGroup = function () {

    /**
     *
     * @param {object} [groupConfig={}] - group configuration object
     * @param {string} groupConfig.groupName - the group name
     * @param {boolean} [groupConfig.collapse=false] - if the group should be collapsed initially
     * @param {boolean} [groupConfig.addCheck=true] - if the group should have a checkbox controlling visibility of all layers
     * @param {LayerGroup} [parent=undefined] - the parent group
     */

    function LayerGroup(groupConfig, parent) {
        _classCallCheck(this, LayerGroup);

        this.groupLayers = [];
        this.groupLayersLookup = {};
        this.groupGroups = [];
        this.groupGroupsLookup = {};
        this.itemIdArray = [];

        if (typeof groupConfig == 'undefined') {
            this.parent = null;
            this.groupId = 'root';
            this.groupName = 'root';
            this.allGroupLookup = { root: this };
            this.allGroupArray = [this];
            this.allLayerArray = [];
            this.allLayerLookup = {};
            this.layerParentLookup = {};
            this.collapse = false;
            this.addCheck = false;
        } else {
            this.groupId = (0, _makeGuid2.default)();
            this.parent = parent;
            this.groupName = groupConfig.groupName;
            this.collapse = typeof groupConfig.collapse == 'boolean' ? groupConfig.collapse : false;
            this.addCheck = typeof groupConfig.addCheck == 'boolean' ? groupConfig.addCheck : true;
        }
    }

    /**
     *
     * @param {object} groupConfig - configuration object
     * @param {string} groupConfig.groupName - the group name
     * @param {boolean} groupConfig.collapse if the group should be collapsed initially
     * @param {boolean} groupConfig.addCheck if the group should have a checkbox controlling visibility of all layers
     * @param {Array<LayerGroup>} parents parent groups
     * @returns {LayerGroup} the layer group just added
     */


    _createClass(LayerGroup, [{
        key: 'addGroup',
        value: function addGroup(groupConfig, parents) {
            var parent = void 0;
            if (parents.length > 0) {
                parent = parents[parents.length - 1];
            } else {
                parent = 'root';
            }

            /**
             * @type {LayerGroup}
             */
            var parentGroup = this.allGroupLookup[parent];
            var newGroup = new LayerGroup(groupConfig, parentGroup);
            this.allGroupLookup[newGroup.groupId] = newGroup;
            this.allGroupArray.push(newGroup);

            parentGroup.groupGroups.push(newGroup);
            parentGroup.groupGroupsLookup[newGroup.groupId] = newGroup;

            if (parentGroup.itemIdArray.indexOf(newGroup.groupId) > 0) {
                console.log(newGroup.groupId);
                throw 'layer and group ids must be unique';
            }
            parentGroup.itemIdArray.push(newGroup.groupId);

            return newGroup;
        }

        /**
         *
         * @param {LayerBase} newLayer the layer to be added
         * @param {Array} parents array
         */

    }, {
        key: 'addLegendLayer',
        value: function addLegendLayer(newLayer, parents) {
            var parent = void 0;
            if (parents.length > 0) {
                parent = parents[parents.length - 1];
            } else {
                parent = 'root';
            }

            this.allLayerLookup[newLayer.id] = newLayer;
            this.allLayerArray.push(newLayer);

            /**
             * @type {LayerGroup}
             */
            var parentGroup = this.allGroupLookup[parent];

            parentGroup.groupLayers.push(newLayer);
            parentGroup.groupLayersLookup[newLayer.id] = newLayer;
            if (parentGroup.itemIdArray.indexOf(newLayer.id) > 0) {
                console.log(newLayer.id);
                throw 'layer and group ids must be unique';
            }
            parentGroup.itemIdArray.push(newLayer.id);

            this.layerParentLookup[newLayer.id] = parentGroup;
        }
    }, {
        key: 'getLegendHtml',
        value: function getLegendHtml(legendId, options) {

            var legendHtml = '<ul id="' + legendId + '" class="legend-container">';

            legendHtml += '<li>' + options.legendTitle + '<input type="checkbox" checked id="suppress-by-extent-' + legendId + '" class="suppress-by-extent">' + ('<label title="Suppress layers not visible at this zoom level" for="suppress-by-extent-' + legendId + '">') + '<span></span>' + '</label></li>';

            legendHtml += this._buildLegend(this.itemIdArray, this, options.layerDivClasses) + '</ul>';

            return legendHtml;
        }

        /**
         * @param {Array} itemIds the items to process
         * @param {LayerGroup} theGroup new group
         * @param {Array} [layerDivClasses=[]] optional classes to apply to the layer divs
         * @static
         * @returns {string} html string
         */

    }, {
        key: '_buildLegend',
        value: function _buildLegend(itemIds, theGroup, layerDivClasses) {

            if (itemIds.length == 0) {
                return '';
            }

            var theHml = '';

            var itemId = itemIds[0];

            if (theGroup.groupLayersLookup[itemId]) {

                /**
                 * @type {LayerBase}
                 */
                var lyr = theGroup.groupLayersLookup[itemId];
                theHml += '<li id="' + lyr.id + '-layer-li" class="legend-layer-li ' + layerDivClasses.join(' ') + '">' + lyr.getLegendDiv() + '</li>';
            } else if (theGroup.groupGroupsLookup[itemId]) {
                /**
                 * type {LayerGroup}
                 */
                var otherGroup = theGroup.groupGroupsLookup[itemId];

                theHml += '<li>';
                theHml += '<div id="' + otherGroup.groupId + '-legend-layer-div" ' + ('class="legend-layer-group  ' + layerDivClasses.join(' ') + '">');

                if (otherGroup.addCheck) {
                    theHml += '<input type="checkbox" checked id="' + otherGroup.groupId + '-group-chck">' + ('<label for="' + otherGroup.groupId + '-group-chck" title="Click arrow to expand or collapse">' + otherGroup.groupName + '</label>');
                } else {
                    theHml += '<label title="Click arrow to expand or collapse">' + otherGroup.groupName + '</label>';
                }

                theHml += '<span title="Expand/Collapse" class="layer-group-expander';
                theHml += (otherGroup.collapse ? ' legend-layer-group-initial-collapse' : '') + '">';
                theHml += otherGroup.collapse ? '&#9654;' : '&#9660;';
                theHml += '</span>';

                //parents.push(groupId);
                theHml += '<ul>' + this._buildLegend(otherGroup.itemIdArray, otherGroup, layerDivClasses) + '</ul>';
                theHml += '</div>';
                theHml += '</li>';
            }

            return theHml + this._buildLegend(itemIds.slice(1), theGroup, layerDivClasses);
        }
    }]);

    return LayerGroup;
}();

/**
 * a wrapper to make a legend
 */


var LayerLegend = function () {

    /**
     *
     * @param {Array} legendItems array of layers or objects with {groupName:  {string}, collapse: {boolean}, addCheck: {boolean}, items: {Array}}
     * @param {string} divId the div where the legend should be added
     * @param {object} options for legend
     * @param {Array} [options.layerDivClasses=[]] optional array of classes to be applied to the layer legend divs for custom styling
     * @param {string} [options.legendTitle=Legend] the legend title
     * @param {bool} [options.scaleDependent=true] if legend display is scale dependent
     */

    function LayerLegend(legendItems, divId, options) {
        _classCallCheck(this, LayerLegend);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = legendItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                if (typeof i == 'undefined') {
                    throw 'undefined item passed in array to legend constructor';
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        options = options || {};

        options.legendTitle = typeof options.legendTitle == 'string' ? options.legendTitle : 'Legend';
        options.scaleDependent = typeof options.scaleDependent == 'boolean' ? options.scaleDependent : true;
        options.layerDivClasses = options.layerDivClasses || [];

        // if legend display is scale dependent, make sure the mapMove object is initialized first
        if (options.scaleDependent) {
            _mapMove2.default.checkInit();
        }

        this.$divElement = (0, _jquery2.default)('#' + divId);

        this._legendItems = legendItems;

        this.layerGroup = new LayerGroup();

        this._buildTree(legendItems);

        this.legendId = (0, _makeGuid2.default)();

        this.$divElement.append(this.layerGroup.getLegendHtml(this.legendId, options));

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.layerGroup.allLayerArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var l = _step2.value;

                l.applyCollapse();
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var _this = this;

        //// if legend display is scale dependent, make sure the mapMove object is initialized first
        if (options.scaleDependent) {
            _mapMove2.default.checkInit();

            _mapMove2.default.addCallback(function (ext, zoom, evt) {
                if (typeof evt == 'undefined' || evt == 'change:resolution') {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = this.layerGroup.allLayerArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var lyr = _step3.value;

                            var $lyrLi = (0, _jquery2.default)('#' + lyr.id + '-layer-li');
                            if (zoom > lyr.maxZoom || zoom < lyr.minZoom) {
                                $lyrLi.addClass('layer-not-visible');
                            } else {
                                $lyrLi.removeClass('layer-not-visible');
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                }
            }, this, 100, true, 'legend1');
        }

        // <editor-fold desc="add event listeners">

        this.$divElement.find(".suppress-by-extent").change(function () {
            var legendLayerLis = (0, _jquery2.default)('.legend-layer-li');
            if (this.checked) {
                legendLayerLis.removeClass('layer-force-show');
            } else {
                legendLayerLis.addClass('layer-force-show');
            }
        });

        this.$divElement.find('.legend-check').change(function () {
            var lyrId = this.id.replace('-legend-layer-check', '');
            _this.layerGroup.allLayerLookup[lyrId].visible = this.checked;
        });

        this.$divElement.find('.legend-layer-group > input[type=checkbox]').change(function () {
            (0, _jquery2.default)(this).siblings('ul').find('input[type=checkbox]').prop('checked', this.checked).trigger('change');
        });

        this.$divElement.find('.layer-group-expander').click(function () {
            var $this = (0, _jquery2.default)(this);
            $this.removeClass('legend-layer-group-initial-collapse');

            $this.siblings('ul').slideToggle();

            if ($this.hasClass('legend-layer-group-collapsed')) {
                $this.removeClass('legend-layer-group-collapsed');
                $this.html('&#9660;');
            } else {
                $this.addClass('legend-layer-group-collapsed');
                $this.html('&#9654;');
            }
        });

        this.$divElement.find('.legend-layer-group-initial-collapse').trigger('click');
        // </editor-fold>
    }

    /**
     * @param {Array} [legendItems=this._layerConfig] the legend items
     * @param {Array} [parents=[]] the ordered list of groups in which this item is a member
     * @private
     */


    _createClass(LayerLegend, [{
        key: '_buildTree',
        value: function _buildTree(legendItems, parents) {

            if (legendItems.length == 0) {
                return;
            }

            var oneItem = legendItems[0];

            //reset the parent if the item is in the base array
            if (this._legendItems.indexOf(oneItem) > -1 || typeof parents == 'undefined') {
                parents = [];
            }

            if (typeof oneItem['groupName'] !== 'undefined') {
                var groupItem = legendItems[0];
                var newGroup = this.layerGroup.addGroup(groupItem, parents);
                parents.push(newGroup.groupId);
                this._buildTree(groupItem.items, parents);
            } else {
                /**
                 * @type {LayerBase}
                 */
                var layerItem = legendItems[0];

                this.layerGroup.addLegendLayer(layerItem, parents);
            }

            this._buildTree(legendItems.slice(1), parents);
        }
    }, {
        key: 'showAll',
        set: function set(val) {}
    }]);

    return LayerLegend;
}();

nm.LayerLegend = LayerLegend;
exports.default = LayerLegend;

},{"../jquery":302,"../olHelpers/mapMove":310,"../util/makeGuid":322,"../util/provide":323}],302:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by gavorhes on 5/3/2016.
 */
global.jQuery = require('jquery');

exports.default = global.jQuery;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"jquery":299}],303:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _makeGuid = require('../util/makeGuid');

var _makeGuid2 = _interopRequireDefault(_makeGuid);

var _zoomResolutionConvert = require('../olHelpers/zoomResolutionConvert');

var zoomResolutionConvert = _interopRequireWildcard(_zoomResolutionConvert);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('layers');

/**
 * The base layer class
 * @abstract
 */

var LayerBase = function () {
    /**
     * The base layer for all others
     * @param {string} url - url for source
     * @param {object} options - config
     * @param {string} [options.id=makeGuid()] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] - the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] - the z index for the layer
     * @param {function} [options.loadCallback] - function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] - if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] - if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent=undefined] - additional content to add to the legend
     */

    function LayerBase(url, options) {
        _classCallCheck(this, LayerBase);

        options = options || {};

        if (typeof url !== 'string') {
            throw 'Invalid URL';
        }
        this._url = url;

        this._params = _typeof(options.params) == 'object' ? options.params : {};
        this._legendCollapse = typeof options.legendCollapse == 'boolean' ? options.legendCollapse : false;
        this._legendCheckbox = typeof options.legendCheckbox == 'boolean' ? options.legendCheckbox : true;

        this.id = options.id || (0, _makeGuid2.default)();
        this._name = options.name || 'Unnamed Layer';
        this.animate = false;
        this._opacity = typeof options.opacity == 'number' ? options.opacity : 1;

        if (this._opacity > 1) {
            this._opacity = 1;
        } else if (this._opacity < 0) {
            this._opacity = 0;
        }

        this._visible = typeof options.visible === 'boolean' ? options.visible : true;

        this._source = undefined;
        this.olLayer = undefined;
        this._loaded = false;

        this._maxResolution = zoomResolutionConvert.zoomToResolution(options.minZoom);
        if (typeof this._maxResolution !== 'undefined') {
            this._maxResolution += 0.00001;
        }
        this._minResolution = zoomResolutionConvert.zoomToResolution(options.maxZoom);

        this._minZoom = typeof options.minZoom == 'number' ? options.minZoom : undefined;
        this._maxZoom = typeof options.maxZoom == 'number' ? options.maxZoom : undefined;
        this._zIndex = typeof options.zIndex == 'number' ? options.zIndex : 0;

        this.loadCallback = typeof options.loadCallback == 'function' ? options.loadCallback : function () {};

        this._legendContent = '';

        if (this._legendCheckbox) {
            this._legendContent += '<input type="checkbox" ' + (this.visible ? 'checked' : '') + ' ' + ('class="legend-check" id="' + this.id + '-legend-layer-check"><span></span>');
            this._legendContent += '<label for="' + this.id + '-legend-layer-check" class="legend-layer-name">' + this.name + '</label>';
        } else {
            this._legendContent += '<label class="legend-layer-name">' + this.name + '</label>';
        }

        this._$legendDiv = null;
        this._applyCollapseCalled = false;
        this._addLegendContent(typeof options.legendContent === 'string' ? options.legendContent : undefined);
    }

    /**
     * base load function, sets _loaded = true if it is not already
     * @protected
     * @returns {boolean} if already loaded
     */


    _createClass(LayerBase, [{
        key: '_load',
        value: function _load() {
            if (this.loaded == true) {
                return true;
            } else {
                this._loaded = true;

                return false;
            }
        }

        /**
         * Get the legend html, be sure to only add to the DOM once
         * @returns {string} html for layer wrapped in a div
         */

    }, {
        key: 'getLegendDiv',
        value: function getLegendDiv() {
            return '<div class="legend-layer-div" id="' + this.id + '-legend-layer-div">' + this._legendContent + '</div>';
        }

        /**
         *
         * @param {string|undefined} additionalContent - additional content to add to legend
         * @private
         */

    }, {
        key: '_addLegendContent',
        value: function _addLegendContent(additionalContent) {
            additionalContent = typeof additionalContent == 'string' ? additionalContent : '';

            var addCollapse = additionalContent.indexOf('<ul>') > -1;

            if (addCollapse) {
                additionalContent = '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>' + additionalContent;
            }

            this._legendContent += additionalContent;

            this._$legendDiv = (0, _jquery2.default)('#' + this.id + '-legend-layer-div');

            if (this._$legendDiv.length > 0) {
                this._$legendDiv.append(additionalContent);
                this.applyCollapse();
            }
        }

        /**
         * add additional content to the legend
         * @param {string} [additionalContent=] - additonal content to add
         */

    }, {
        key: 'addLegendContent',
        value: function addLegendContent(additionalContent) {
            this._addLegendContent(additionalContent);
        }
    }, {
        key: 'applyCollapse',
        value: function applyCollapse() {
            if (this._applyCollapseCalled) {
                console.log('collapse already applied');

                return undefined;
            }

            this._$legendDiv = (0, _jquery2.default)('#' + this.id + '-legend-layer-div');

            if (this._$legendDiv.length > 0) {

                var $expander = this._$legendDiv.find('.legend-items-expander');

                if ($expander.length > 0) {
                    this._applyCollapseCalled = true;

                    $expander.click(function () {
                        var $this = (0, _jquery2.default)(this);

                        $this.siblings('ul').slideToggle();

                        if ($this.hasClass('legend-layer-group-collapsed')) {
                            $this.removeClass('legend-layer-group-collapsed');
                            $this.html('&#9660;');
                        } else {
                            $this.addClass('legend-layer-group-collapsed');
                            $this.html('&#9654;');
                        }
                    });

                    if (this._legendCollapse) {
                        $expander.trigger('click');
                    }
                }
            }
        }

        /**
         * trick to refresh the layer
         */

    }, {
        key: 'refresh',
        value: function refresh() {
            if (this.source) {
                this.source.refresh();
                //let src = this.source;
                //this.olLayer.setSource(undefined);
                //this.olLayer.setSource(src);
            }
        }

        /**
         * get the legend content
         * @type {string}
         */

    }, {
        key: 'legendContent',
        get: function get() {
            return this._legendContent;
        }

        /**
         * set the legend content directly
         * @param {string} newVal - new content
         * @protected
         */
        ,
        set: function set(newVal) {
            this._legendContent = newVal;
        }

        /**
         * get the map get params
         * @type {object}
         */

    }, {
        key: 'params',
        get: function get() {
            return this._params;
        }

        /**
         * set the map get params
         * @param {object} newParams - new get params
         * @protected
         */
        ,
        set: function set(newParams) {
            this._params = newParams;
        }

        /**
         * get the minimum resolution
         * @type {number|*}
         */

    }, {
        key: 'minResolution',
        get: function get() {
            return this._minResolution;
        }

        /**
         * get the maximum resolution
         * @type {number|*}
         */

    }, {
        key: 'maxResolution',
        get: function get() {
            return this._maxResolution;
        }

        /**
         * get min zoom
         * @type {number|*}
         */

    }, {
        key: 'minZoom',
        get: function get() {
            return this._minZoom;
        }

        /**
         * get max zoom
         * @type {number|*}
         */

    }, {
        key: 'maxZoom',
        get: function get() {
            return this._maxZoom;
        }

        /**
         * get the url
         * @type {string}
         */

    }, {
        key: 'url',
        get: function get() {
            return this._url;
        }

        /**
         * Get the layer visibility
         * @type {boolean}
         */

    }, {
        key: 'visible',
        get: function get() {
            return this._visible;
        }

        /**
         * Set the layer visibility
         * @param {boolean} visibility - layer visibility
         */
        ,
        set: function set(visibility) {
            this._visible = visibility;
            if (this.olLayer) {
                this.olLayer.setVisible(this._visible);
                if (visibility && !this._loaded) {
                    this._load();
                }
            }
        }

        /**
         * Get the layer opacity
         * @type {number}
         */

    }, {
        key: 'opacity',
        get: function get() {
            return this._opacity;
        }

        /**
         * Set the layer opacity
         * @param {number} opacity - layer opacity
         */
        ,
        set: function set(opacity) {
            this._opacity = opacity;
            if (this.olLayer) {
                this.olLayer.setOpacity(this._opacity);
            }
        }

        /**
         * Get the layer name
         * @type {string}
         */

    }, {
        key: 'name',
        get: function get() {
            return this._name;
        }

        /**
         * set the layer name
         * @param {string} newName - the new name
         */
        ,
        set: function set(newName) {
            this._name = newName;
        }

        /**
         * Check if the layer is loaded
         * @type {boolean}
         */

    }, {
        key: 'loaded',
        get: function get() {
            return this._loaded;
        }

        /**
         * get the layer source
         * @type {*}
         */

    }, {
        key: 'source',
        get: function get() {
            return this._source;
        }

        /**
         * get the z index
         * @type {number}
         */

    }, {
        key: 'zIndex',
        get: function get() {
            return this._zIndex;
        }

        /**
         * set the z index
         * @param {number} newZ - new Z index
         */
        ,
        set: function set(newZ) {
            this._zIndex = newZ;
            this.olLayer.setZIndex(this.zIndex);
        }
    }]);

    return LayerBase;
}();

nm.LayerBase = LayerBase;
exports.default = LayerBase;

},{"../jquery":302,"../olHelpers/zoomResolutionConvert":317,"../util/makeGuid":322,"../util/provide":323}],304:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LayerBase2 = require('./LayerBase');

var _LayerBase3 = _interopRequireDefault(_LayerBase2);

var _mapMove = require('../olHelpers/mapMove');

var _mapMove2 = _interopRequireDefault(_mapMove);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nm = (0, _provide2.default)('layers');

/**
 * The make mapMoveGetParams function takes the extent and the zoom level
 * context is 'this' object, probably want to do something with this.mapMoveParams
 * @callback mapMoveMakeGetParams
 * @param {LayerBaseVector} lyr
 * @param {object} extent
 * @param {number} extent.minX
 * @param {number} extent.minY
 * @param {number} extent.maxX
 * @param {number} extent.maxY
 * @param {number} zoomLevel
 */

/**
 * The Vector layer base
 * @augments LayerBase
 * @abstract
 */

var LayerBaseVector = function (_LayerBase) {
    _inherits(LayerBaseVector, _LayerBase);

    /**
     * The base vector layer
     * @param {string} url - pass an empty string to prevent default load and add from a json source
     * @param {object} options - config
     * @param {string} [options.id] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] the z index for the layer
     * @param {function} [options.loadCallback] function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent] additional content to add to the legend
     *
     * @param {boolean} [options.autoLoad=false] if the layer should auto load if not visible
     * @param {object} [options.style=undefined] the layer style, use openlayers default style if not defined
     * @param {boolean} [options.onDemand=false] if the layer should be loaded by extent on map move
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     * @param {mapMoveMakeGetParams} [options.mapMoveMakeGetParams=function(lyr, extent, zoomLevel){}] function to create additional map move params
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     *
     */

    function LayerBaseVector(url, options) {
        _classCallCheck(this, LayerBaseVector);

        //prevent regular load if no url has been provided

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerBaseVector).call(this, url, options));

        if (_this.url.trim() == '') {
            _this._loaded = true;
        }

        _this._style = typeof options.style == 'undefined' ? undefined : options.style;

        if (_this.visible) {
            _this._autoLoad = true;
        } else {
            _this._autoLoad = typeof options['autoLoad'] == 'boolean' ? options['autoLoad'] : false;
        }

        _this._onDemand = typeof options.onDemand == 'boolean' ? options.onDemand : false;
        _this._onDemandDelay = typeof options.onDemandDelay == 'number' ? options.onDemandDelay : 300;

        if (options.mapMoveObj) {
            _this._mapMove = options.mapMoveObj;
        } else {
            _this._mapMove = _this._onDemand ? _mapMove2.default : undefined;
        }

        _this._mapMoveMakeGetParams = typeof options.mapMoveMakeGetParams == 'function' ? options.mapMoveMakeGetParams : function (lyr, extent, zoomLevel) {
            return {};
        };

        if (_this._onDemand) {
            _this._loaded = true;
            _this._mapMoveParams = {};
            _this._mapMove.checkInit();
            _this._mapMove.addVectorLayer(_this);
        }

        _this._source = new _ol2.default.source.Vector();

        /**
         *
         * @type {ol.layer.Vector|ol.layer.Base}
         */
        _this.olLayer = new _ol2.default.layer.Vector({
            source: _this._source,
            visible: _this.visible,
            style: _this.style,
            minResolution: _this._minResolution,
            maxResolution: _this._maxResolution,
            zIndex: _this._zIndex
        });
        return _this;
    }

    /**
     * dummy to be overridden
     * @param {object} featureCollection - geojson or esrijson object
     */


    _createClass(LayerBaseVector, [{
        key: 'addFeatures',
        value: function addFeatures(featureCollection) {
            console.log('Layer vector base addFeatures is a placeholder and does nothing');
        }

        /**
         * Before call to map move callback, can prevent call by returning false
         * @param {number} zoom - zoom level
         * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
         * @returns {boolean} if the call should proceed
         */

    }, {
        key: 'mapMoveBefore',
        value: function mapMoveBefore(zoom, evtType) {
            if (this.minZoom !== undefined) {
                if (zoom < this.minZoom) {
                    return false;
                }
            }

            if (this.maxZoom !== undefined) {
                if (zoom > this.maxZoom) {
                    return false;
                }
            }

            return this.visible;
        }

        /**
         * callback to generate the parameters passed in the get request
         * @param {object} extent - extent object
         * @param {number} extent.minX - minX
         * @param {number} extent.minY - minY
         * @param {number} extent.maxX - maxX
         * @param {number} extent.maxY - maxY
         * @param {number} zoomLevel - zoom level
         */

    }, {
        key: 'mapMoveMakeGetParams',
        value: function mapMoveMakeGetParams(extent, zoomLevel) {
            this._mapMoveParams = {};
            _jquery2.default.extend(this._mapMoveParams, this.params);
            _jquery2.default.extend(this._mapMoveParams, this._mapMoveMakeGetParams(this, extent, zoomLevel));
        }

        /**
         * callback function on map move
         * @param {object} d - the json response
         */

    }, {
        key: 'mapMoveCallback',
        value: function mapMoveCallback(d) {
            if (this.source) {
                this._source.clear();
            }
        }

        /**
         * clear features in the layer
         */

    }, {
        key: 'clear',
        value: function clear() {
            if (this._source) {
                this._source.clear();
            }
        }

        /**
         * get on demand delay in miliseconds
         * @type {number|*}
         */

    }, {
        key: 'onDemandDelay',
        get: function get() {
            return this._onDemandDelay;
        }

        /**
         * get if the layer is autoloaded
         * @type {boolean}
         */

    }, {
        key: 'autoLoad',
        get: function get() {
            return this._autoLoad;
        }

        /**
         * get the style definition
         * @type {ol.Style|styleFunc}
         */

    }, {
        key: 'style',
        get: function get() {
            return this._style;
        }

        /**
         * set the style
         * @param {ol.Style|styleFunc} style - the style or function
         */
        ,
        set: function set(style) {
            this._style = style;
            this.olLayer.setStyle(this._style);
        }

        /**
         * get the map CRS if it is defined by the map move object
         * @type {string|*}
         */

    }, {
        key: 'mapCrs',
        get: function get() {
            if (this._mapMove) {
                return this._mapMove.map.getView().getProjection().getCode();
            } else {
                return undefined;
            }
        }

        /**
         * get the map move object
         * @type {MapMoveCls|*}
         */

    }, {
        key: 'mapMove',
        get: function get() {
            return this._mapMove;
        }

        /**
         * map move params
         * @type {object}
         */

    }, {
        key: 'mapMoveParams',
        get: function get() {
            return this._mapMoveParams;
        }

        /**
        * Get the layer visibility
        * @type {boolean}
        */

    }, {
        key: 'visible',
        get: function get() {
            return _get(Object.getPrototypeOf(LayerBaseVector.prototype), 'visible', this);
        }

        /**
         * Set the layer visibility
         * @type {boolean}
         * @override
         */
        ,
        set: function set(visibility) {
            _set(Object.getPrototypeOf(LayerBaseVector.prototype), 'visible', visibility, this);

            if (this._onDemand) {
                this.mapMove.triggerLyrLoad(this);
            }
        }

        /**
         * get the layer vector source
         * @override
         * @type {ol.source.Vector}
         */

    }, {
        key: 'source',
        get: function get() {
            return _get(Object.getPrototypeOf(LayerBaseVector.prototype), 'source', this);
        }

        /**
         * array of ol features
         * @type {Array.<ol.Feature>}
         */

    }, {
        key: 'features',
        get: function get() {
            return this.source.getFeatures();
        }
    }]);

    return LayerBaseVector;
}(_LayerBase3.default);

nm.LayerBaseVector = LayerBaseVector;
exports.default = LayerBaseVector;

},{"../jquery":302,"../ol/ol":319,"../olHelpers/mapMove":310,"../util/provide":323,"./LayerBase":303}],305:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LayerBaseVector2 = require('./LayerBaseVector');

var _LayerBaseVector3 = _interopRequireDefault(_LayerBaseVector2);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 11/2/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var nm = (0, _provide2.default)('layers');

/**
 * The Vector GeoJson Layer
 * @augments LayerBaseVector
 */

var LayerBaseVectorGeoJson = function (_LayerBaseVector) {
    _inherits(LayerBaseVectorGeoJson, _LayerBaseVector);

    /**
     * @param {string|undefined|null} url - resource url, set to '' to make blank layer
     * @param {object} options - config
     * @param {string} [options.id] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] the z index for the layer
     * @param {function} [options.loadCallback] function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent] additional content to add to the legend
     *
     * @param {boolean} [options.autoLoad=false] if the layer should auto load if not visible
     * @param {object} [options.style=undefined] the layer style, use openlayers default style if not defined
     * @param {boolean} [options.onDemand=false] if the layer should be loaded by extent on map move
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     *
     * @param {object} [options.transform={}] SR transform, set as false for no transform
     * @param {string} options.transform.dataProjection=EPSG:4326 the data CRS
     * @param {string} options.transform.featureProjection=EPSG:3857 the feature/map CRS
     * @param {mapMoveMakeGetParams} [options.mapMoveMakeGetParams=function(lyr, extent, zoomLevel){}] function to create additional map move params
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     */

    function LayerBaseVectorGeoJson(url, options) {
        _classCallCheck(this, LayerBaseVectorGeoJson);

        url = typeof url == 'string' ? url : '';

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerBaseVectorGeoJson).call(this, url, options));

        _this._geoJsonFormat = new _ol2.default.format.GeoJSON();

        _this._transform = options.transform || {};
        _this._transform.dataProjection = _this._transform.dataProjection || "EPSG:4326";
        _this._transform.featureProjection = _this._transform.featureProjection || "EPSG:3857";

        if (_this.autoLoad || _this.visible) {
            _this._load();
        }
        return _this;
    }

    /**
     * add feature collection
     * @param {object} featureCollection - as geojson object
     */


    _createClass(LayerBaseVectorGeoJson, [{
        key: 'addFeatures',
        value: function addFeatures(featureCollection) {
            if (this._transform.dataProjection == 'EPSG:3857' && this._transform.featureProjection == 'EPSG:3857') {
                this._source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection));
            } else {
                this._source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection, this._transform));
            }
        }

        /**
         * trigger load features
         * @protected
         * @returns {boolean} if already loaded
         */

    }, {
        key: '_load',
        value: function _load() {
            var _this2 = this;

            if (_get(Object.getPrototypeOf(LayerBaseVectorGeoJson.prototype), '_load', this).call(this)) {
                return true;
            }

            _jquery2.default.get(this._url, this._params, function (d) {
                _this2.addFeatures(d);
                _this2.loadCallback(_this2);
            }, 'json').fail(function () {
                this._loaded = false;
            });

            return false;
        }

        /**
         * callback function on map move
         * @param {object} d the json response
         * @override
         */

    }, {
        key: 'mapMoveCallback',
        value: function mapMoveCallback(d) {
            _get(Object.getPrototypeOf(LayerBaseVectorGeoJson.prototype), 'mapMoveCallback', this).call(this, d);
            this._source.addFeatures(this._geoJsonFormat.readFeatures(d, this._transform));
        }
    }]);

    return LayerBaseVectorGeoJson;
}(_LayerBaseVector3.default);

nm.LayerBaseVectorGeoJson = LayerBaseVectorGeoJson;
exports.default = LayerBaseVectorGeoJson;

},{"../jquery":302,"../ol/ol":319,"../util/provide":323,"./LayerBaseVector":304}],306:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LayerBase2 = require('./LayerBase');

var _LayerBase3 = _interopRequireDefault(_LayerBase2);

var _esriToOlStyle = require('../olHelpers/esriToOlStyle');

var esriToOl = _interopRequireWildcard(_esriToOlStyle);

var _mapPopup = require('../olHelpers/mapPopup');

var _mapPopup2 = _interopRequireDefault(_mapPopup);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 12/7/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var nm = (0, _provide2.default)('layers');

/**
 * esri mapserver layer
 * @augments LayerBase
 */

var LayerEsriMapServer = function (_LayerBase) {
    _inherits(LayerEsriMapServer, _LayerBase);

    /**
     * The base layer for all others
     * @param {string} url - resource url
     * @param {object} options - config
     * @param {string} [options.id] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] the z index for the layer
     * @param {function} [options.loadCallback] function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent] additional content to add to the legend
     * @param {boolean} [options.addPopup=false] if a popup should be added
     */

    function LayerEsriMapServer(url, options) {
        _classCallCheck(this, LayerEsriMapServer);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerEsriMapServer).call(this, url, options));

        _this2._source = new _ol2.default.source.TileArcGISRest({ url: _this2.url == '' ? undefined : _this2.url });

        _this2.olLayer = new _ol2.default.layer.Tile({
            source: _this2._source,
            visible: _this2.visible,
            opacity: _this2.opacity,
            minResolution: _this2._minResolution,
            maxResolution: _this2._maxResolution,
            zIndex: _this2._zIndex
        });

        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : false;

        _this2._esriFormat = new _ol2.default.format.EsriJSON();
        _this2._popupRequest = null;

        _this2.addLegendContent();

        if (options.addPopup) {
            _mapPopup2.default.addMapServicePopup(_this2);
        }
        return _this2;
    }

    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */


    _createClass(LayerEsriMapServer, [{
        key: 'addLegendContent',
        value: function addLegendContent(additionalContent) {
            var urlCopy = this.url;

            if (urlCopy[urlCopy.length - 1] !== '/') {
                urlCopy += '/';
            }

            urlCopy += 'legend?f=pjson&callback=?';

            var _this = this;
            var superAddLegend = _get(Object.getPrototypeOf(LayerEsriMapServer.prototype), 'addLegendContent', this);

            _jquery2.default.get(urlCopy, {}, function (d) {
                var newHtml = esriToOl.makeMapServiceLegend(d);
                superAddLegend.call(_this, newHtml);
            }, 'json');
        }
    }, {
        key: 'getPopupInfo',
        value: function getPopupInfo(queryParams) {
            if (!this.visible) {
                return;
            }

            var urlCopy = this.url;

            if (urlCopy[urlCopy.length - 1] != '/') {
                urlCopy += '/';
            }

            urlCopy += 'identify?callback=?';

            var _this = this;

            if (this._popupRequest != null) {
                this._popupRequest.abort();
            }

            this._popupRequest = _jquery2.default.get(urlCopy, queryParams, function (d) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = d['results'][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var r = _step.value;


                        var popupHtml = '<table class="esri-popup-table">';

                        for (var a in r['attributes']) {
                            if (r['attributes'].hasOwnProperty(a)) {
                                var attrVal = r['attributes'][a];

                                if (attrVal == null || attrVal.toString().toLowerCase() == 'null') {
                                    continue;
                                }

                                var attr = a;
                                if (attr.length > 14) {
                                    attr = attr.slice(0, 11) + '...';
                                }

                                popupHtml += '<tr><td>' + attr + '</td><td>' + attrVal + '</td></tr>';
                            }
                        }

                        popupHtml += '</table>';

                        _mapPopup2.default.addMapServicePopupContent(_this._esriFormat.readFeature(r), _this, popupHtml, r['layerName']);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }, 'json').always(function () {
                _this._popupRequest = null;
            });
        }

        /**
         * overwrite the base load
         * @protected
         */

    }, {
        key: '_load',
        value: function _load() {}

        /**
         *
         * @returns {ol.source.TileArcGISRest} the vector source
         */

    }, {
        key: 'source',
        get: function get() {
            return _get(Object.getPrototypeOf(LayerEsriMapServer.prototype), 'source', this);
        }
    }]);

    return LayerEsriMapServer;
}(_LayerBase3.default);

nm.LayerEsriMapServer = LayerEsriMapServer;
exports.default = LayerEsriMapServer;

},{"../jquery":302,"../ol/ol":319,"../olHelpers/esriToOlStyle":308,"../olHelpers/mapPopup":312,"../util/provide":323,"./LayerBase":303}],307:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                   * Created by gavorhes on 12/8/2015.
                                                                                                                                                                                                                                                   */

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LayerBaseVectorGeoJson = require('./LayerBaseVectorGeoJson');

var _LayerBaseVectorGeoJson2 = _interopRequireDefault(_LayerBaseVectorGeoJson);

var _mapMove = require('../olHelpers/mapMove');

var _mapMove2 = _interopRequireDefault(_mapMove);

var _mapPopup = require('../olHelpers/mapPopup');

var _mapPopup2 = _interopRequireDefault(_mapPopup);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nm = (0, _provide2.default)('layers');

function checkStyleNumber(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig) {
    "use strict";

    //make sure one and only one configuration is defined;

    var configCount = 0;
    if (typeof itsIcon == 'string') {
        configCount++;
    }

    if ((typeof itsLineStyle === 'undefined' ? 'undefined' : _typeof(itsLineStyle)) == 'object') {
        itsLineStyle.width = typeof itsLineStyle.width == 'number' ? itsLineStyle.width : 5;
        itsLineStyle.color = typeof itsLineStyle.color == 'string' ? itsLineStyle.color : 'red';
        configCount++;
    }

    if ((typeof itsIconConfig === 'undefined' ? 'undefined' : _typeof(itsIconConfig)) == 'object') {
        itsIconConfig.defaultName = itsIconConfig.defaultName || 'Other';

        if (typeof itsIconConfig.iconArray == 'undefined') {
            itsIconConfig.iconArray = [];
        }

        configCount++;
    }

    if ((typeof itsLineConfig === 'undefined' ? 'undefined' : _typeof(itsLineConfig)) == 'object') {
        itsLineConfig.defaultName = itsLineConfig.defaultName || 'Other';
        itsLineConfig.defaultWidth = itsLineConfig.defaultWidth || 5;
        itsLineConfig.defaultColor = itsLineConfig.defaultColor || 'red';

        if (typeof itsLineConfig.lineArray == 'undefined') {
            itsLineConfig.lineArray = [];
        }

        // set the width if not defined
        for (var i = 0; i < itsLineConfig.lineArray.length; i++) {
            if (itsLineConfig.lineArray[i].length == 3) {
                itsLineConfig.lineArray[i].push(5);
            }
        }

        configCount++;
    }

    if (configCount > 1) {
        throw 'Only one style config can be defined';
    }
}

/**
 *
 * @param {string} [itsIcon=undefined] the ITS device type icon image see http://transportal.cee.wisc.edu/its/inventory/icons/
 *
 * @param {object} [itsLineStyle=undefined] A single line style
 * @param {string} itsLineStyle.color the line color as rgb or hex
 * @param {number} [itsLineStyle.width=5] the line width
 *
 * @param {object} [itsIconConfig=undefined] The icon subtype configuration
 * @param {string} itsIconConfig.prop The property used to define icon attribute symbolization
 * @param {string} itsIconConfig.defaultName The default name to be used if no other match is found
 * @param {string} itsIconConfig.defaultIcon The default icon to be used for no other matches
 * @param {object} [itsIconConfig.iconArray=[]] an array, items with format [property, name, img]
 *
 * @param {object} [itsLineConfig=undefined] The property used to define icon attribute symbolization
 * @param {string} itsLineConfig.prop The property used to define icon attribute symbolization
 * @param {string} [itsLineConfig.defaultName=Other] The default name to be used if no other match is found
 * @param {string} [itsLineConfig.defaultColor=red] The default line color to be used for no other matches
 * @param {number} [itsLineConfig.defaultWidth=5] The default line width to be used for no other matches
 * @param {object} [itsLineConfig.lineArray=[]] an array, items with format [property, name, color, optional width]
 * @returns {*} undefined, style, or style function
 */
function defineStyle(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig) {
    "use strict";

    checkStyleNumber(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig);

    var _iconUrlRoot = 'http://transportal.cee.wisc.edu/its/inventory/icons/';

    if (itsIcon) {
        return new _ol2.default.style.Style({
            image: new _ol2.default.style.Icon({ src: _iconUrlRoot + itsIcon })
        });
    } else if (itsLineStyle) {
        return new _ol2.default.style.Style({
            stroke: new _ol2.default.style.Stroke({
                color: itsLineStyle.color,
                width: itsLineStyle.width
            })
        });
    } else if (itsIconConfig) {
        return function (feature) {
            var symbolProp = feature.getProperties()[itsIconConfig.prop];
            var iconUrl = _iconUrlRoot + itsIconConfig.defaultIcon;

            for (var i = 0; i < itsIconConfig.iconArray.length; i++) {
                var thisProp = itsIconConfig.iconArray[i];

                if (symbolProp.trim().toLocaleLowerCase() == thisProp[0].trim().toLocaleLowerCase()) {
                    iconUrl = _iconUrlRoot + thisProp[2];
                    break;
                }
            }

            return [new _ol2.default.style.Style({
                image: new _ol2.default.style.Icon({ src: iconUrl })
            })];
        };
    } else if (itsLineConfig) {
        return function (feature) {
            var symbolProp = feature.getProperties()[itsLineConfig.prop];
            var colr = itsLineConfig.defaultColor || 'red';
            var width = itsLineConfig.defaultWidth || 5;

            for (var i = 0; i < itsLineConfig.lineArray.length; i++) {
                var thisProp = itsLineConfig.lineArray[i];

                if (symbolProp.trim().toLocaleLowerCase() == thisProp[0].trim().toLocaleLowerCase()) {
                    colr = thisProp[2];
                    width = thisProp[3];
                    break;
                }
            }

            return [new _ol2.default.style.Style({
                stroke: new _ol2.default.style.Stroke({
                    color: colr,
                    width: width
                })
            })];
        };
    } else {
        return undefined;
    }
}

/**
 *
 * @param {string} [itsIcon=undefined] the ITS device type icon image see http://transportal.cee.wisc.edu/its/inventory/icons/
 *
 * @param {object} [itsLineStyle=undefined] A single line style
 * @param {string} itsLineStyle.color the line color as rgb or hex
 * @param {number} [itsLineStyle.width=5] the line width
 *
 * @param {object} [itsIconConfig=undefined] The icon subtype configuration
 * @param {string} itsIconConfig.prop The property used to define icon attribute symbolization
 * @param {string} itsIconConfig.defaultName The default name to be used if no other match is found
 * @param {string} itsIconConfig.defaultIcon The default icon to be used for no other matches
 * @param {object} [itsIconConfig.iconArray=[]] an array, items with format [property, name, img]
 *
 * @param {object} [itsLineConfig=undefined] The property used to define icon attribute symbolization
 * @param {string} itsLineConfig.prop The property used to define icon attribute symbolization
 * @param {string} [itsLineConfig.defaultName=Other] The default name to be used if no other match is found
 * @param {string} [itsLineConfig.defaultColor=red] The default line color to be used for no other matches
 * @param {number} [itsLineConfig.defaultWidth=5] The default line width to be used for no other matches
 * @param {object} [itsLineConfig.lineArray=[]] an array, items with format [property, name, color, optional width]
 * @returns {string} html to be added to the legend
 */
function defineLegend(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig) {
    "use strict";

    var iconHeight = 17;

    checkStyleNumber(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig);

    var _iconUrlRoot = 'http://transportal.cee.wisc.edu/its/inventory/icons/';

    if (itsIcon) {
        return '<img src="' + (_iconUrlRoot + itsIcon) + '" class="legend-layer-icon" height="' + iconHeight + '">';
    } else if (itsLineStyle) {
        return '<hr style="height: ' + itsLineStyle.width + 'px; background-color: ' + itsLineStyle.color + '">';
    } else if (itsIconConfig) {
        var outHtml = '';
        outHtml += '<ul>';

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = itsIconConfig.iconArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var a = _step.value;

                outHtml += '<li><span class="legend-layer-subitem">' + a[1] + '</span><img src="' + (_iconUrlRoot + a[2]) + '" class="legend-layer-icon" height="' + iconHeight + '">';
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        outHtml += '<li><span class="legend-layer-subitem">' + itsIconConfig.defaultName + '</span>' + ('<img src="' + (_iconUrlRoot + itsIconConfig.defaultIcon) + '" class="legend-layer-icon" height="' + iconHeight + '"></li>');
        outHtml += '</ul>';

        return outHtml;
    } else if (itsLineConfig) {
        var _outHtml = '';
        _outHtml += '<ul>';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = itsLineConfig.lineArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var ls = _step2.value;

                _outHtml += '<li><span class="legend-layer-subitem">' + ls[1] + '</span>' + ('<hr style="height: ' + ls[3] + 'px; background-color: ' + ls[2] + '">');
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        _outHtml += '<li><span class="legend-layer-subitem">' + itsLineConfig.defaultName + '</span>' + ('<hr style="height: ' + itsLineConfig.defaultWidth + 'px; background-color: ' + itsLineConfig.defaultColor + '"></li>');
        _outHtml += '</ul>';

        return _outHtml;
    } else {
        return '';
    }
}

/**
 * Its Layer class
 * @augments LayerBaseVectorGeoJson
 */

var LayerItsInventory = function (_LayerBaseVectorGeoJs) {
    _inherits(LayerItsInventory, _LayerBaseVectorGeoJs);

    /**
     * ITS device layer, types available at http://transportal.cee.wisc.edu/its/inventory/
     * @param {object} options - config
     * @param {string} [options.id] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] the z index for the layer
     * @param {function} [options.loadCallback] function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent] additional content to add to the legend
     *
     * @param {boolean} [options.autoLoad=false] if the layer should auto load if not visible
     * @param {object|*} [options.style=undefined] the layer style, use openlayers default style if not defined
     * @param {boolean} [options.onDemand=false] if the layer should be loaded by extent on map move
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     *
     * @param {string} options.itsType the ITS device type, use the url flag at http://transportal.cee.wisc.edu/its/inventory/
     * @param {boolean} [options.addPopup=true] if the popup should be added automatically
     *
     * @param {string} [options.itsIcon=undefined] the ITS device type icon image see http://transportal.cee.wisc.edu/its/inventory/icons/
     *
     * @param {object} [options.itsLineStyle=undefined] A single line style
     * @param {string} options.itsLineStyle.color the line color as rgb or hex
     * @param {number} [options.itsLineStyle.width=5] the line width
     *
     * @param {object} [options.itsIconConfig=undefined] The icon subtype configuration
     * @param {string} options.itsIconConfig.prop The property used to define icon attribute symbolization
     * @param {string} options.itsIconConfig.defaultName The default name to be used if no other match is found
     * @param {string} options.itsIconConfig.defaultIcon The default icon to be used for no other matches
     * @param {object} [options.itsIconConfig.iconArray=[]] an array, items with format [property, name, img]
     *
     * @param {object} [options.itsLineConfig=undefined] The property used to define icon attribute symbolization
     * @param {string} options.itsLineConfig.prop The property used to define icon attribute symbolization
     * @param {string} [options.itsLineConfig.defaultName=Other] The default name to be used if no other match is found
     * @param {string} [options.itsLineConfig.defaultColor=red] The default line color to be used for no other matches
     * @param {number} [options.itsLineConfig.defaultWidth] The default line width to be used for no other matches
     * @param {object} [options.itsLineConfig.lineArray=[]] an array, items with format [property, name, color, optional width = 5]
     */

    function LayerItsInventory(options) {
        _classCallCheck(this, LayerItsInventory);

        if (typeof options.itsType !== 'string') {
            throw 'its type must be defined';
        }

        var addToLegend = '';

        // define a style with the helper function if it is not explicitly defined
        if (typeof options.style == 'undefined') {
            options.style = defineStyle(options.itsIcon, options.itsLineStyle, options.itsIconConfig, options.itsLineConfig);
            addToLegend = defineLegend(options.itsIcon, options.itsLineStyle, options.itsIconConfig, options.itsLineConfig);
        }

        options.params = _typeof(options.params) == 'object' ? options.params : {};
        _jquery2.default.extend(options.params, { format: 'JSON', resource: options.itsType });

        //add any additional content to the legend

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerItsInventory).call(this, 'http://transportal.cee.wisc.edu/its/inventory/', options));

        _this.addLegendContent(addToLegend);

        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : true;

        if (options.addPopup) {
            _mapPopup2.default.addVectorPopup(_this, function (props) {
                return '<iframe src="http://transportal.cee.wisc.edu/its/inventory/?feature=' + props['featureGuid'] + '" ' + 'height="250" width="350"></iframe>';
            });
        }
        return _this;
    }

    /**
     * callback to generate the parameters passed in the get request
     * @callback makeGetParams
     * @param {object} extent - extent object
     * @param {number} extent.minX - minX
     * @param {number} extent.minY - minY
     * @param {number} extent.maxX - maxX
     * @param {number} extent.maxY - maxY
     * @param {number} zoomLevel - zoom level
     */


    _createClass(LayerItsInventory, [{
        key: 'mapMoveMakeGetParams',
        value: function mapMoveMakeGetParams(extent, zoomLevel) {
            _get(Object.getPrototypeOf(LayerItsInventory.prototype), 'mapMoveMakeGetParams', this).call(this, extent, zoomLevel);
            var lowerLeft = new _ol2.default.geom.Point([extent.minX, extent.minY]);
            lowerLeft.transform(this.mapCrs, "EPSG:4326");
            var lowerLeftCoordinates = lowerLeft.getCoordinates();
            var upperRight = new _ol2.default.geom.Point([extent.maxX, extent.maxY]);
            upperRight.transform(this.mapCrs, "EPSG:4326");
            var upperRightCoordinates = upperRight.getCoordinates();

            _jquery2.default.extend(this.mapMoveParams, {
                L: lowerLeftCoordinates[0],
                R: upperRightCoordinates[0],
                B: lowerLeftCoordinates[1],
                T: upperRightCoordinates[1]
            });
        }
    }]);

    return LayerItsInventory;
}(_LayerBaseVectorGeoJson2.default);

nm.LayerItsInventory = LayerItsInventory;
exports.default = LayerItsInventory;

},{"../jquery":302,"../ol/ol":319,"../olHelpers/mapMove":310,"../olHelpers/mapPopup":312,"../util/provide":323,"./LayerBaseVectorGeoJson":305}],308:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;
exports.makeMapServiceLegend = makeMapServiceLegend;

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by gavorhes on 1/4/2016.
                                                                                                                                                           */


var nm = (0, _provide2.default)('olHelpers.esriToOlStyle');

/**
 * This callback is displayed as part of the Requester class.
 * @callback styleFunc
 * @param {ol.Feature} feat - openlayers feature
 * @param {number} resolution - map resolution
 */

/**
 *
 * @param {Array<number>} colorArray - input color array
 * @param {number} opacity - the opacity 0 to 1
 * @returns {string} rgba string
 * @private
 */
function _colorArrayToRgba(colorArray, opacity) {
    "use strict";

    return 'rgba(' + colorArray[0] + ',' + colorArray[1] + ',' + colorArray[2] + ',' + opacity + ')';
}

/**
 * escape html charcters
 * @param {string} str - input string
 * @returns {string} escaped string
 */
function htmlEscape(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

nm.htmlEscape = htmlEscape;

var CommonSymbol =

/**
 * 
 * @param symbolObj
 * @param {number} opacity
 */
function CommonSymbol(symbolObj, opacity) {
    _classCallCheck(this, CommonSymbol);

    this.symbolObj = symbolObj;
    this.opacity = opacity;
    this.olStyle = undefined;
    this.legendHtml = '';
};

var PointSymbol = function (_CommonSymbol) {
    _inherits(PointSymbol, _CommonSymbol);

    function PointSymbol(symbolObj, opacity) {
        _classCallCheck(this, PointSymbol);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(PointSymbol).call(this, symbolObj, opacity));

        switch (_this2.symbolObj['type']) {
            case 'esriSMS':
                var innerColor = _colorArrayToRgba(_this2.symbolObj.color, _this2.opacity);
                var outerColor = _colorArrayToRgba(_this2.symbolObj.outline.color, _this2.opacity);
                var outlineWidth = _this2.symbolObj.outline.width;
                var radius = _this2.symbolObj.size;

                _this2.olStyle = new _ol2.default.style.Style({
                    image: new _ol2.default.style.Circle({
                        radius: radius,
                        fill: new _ol2.default.style.Fill({
                            color: innerColor
                        }),
                        stroke: new _ol2.default.style.Stroke({ color: outerColor, width: outlineWidth })
                    })
                });
                _this2.legendHtml = '<span class="legend-layer-icon" style="color: ' + innerColor + '">&#9679;</span>';
                break;
            case 'esriPMS':
                _this2.olStyle = new _ol2.default.style.Style({
                    image: new _ol2.default.style.Icon({ src: 'data:image/png;base64,' + _this2.symbolObj['imageData'] })
                });
                _this2.legendHtml = '<img class="legend-layer-icon" height="17" src="data:image/png;base64,' + _this2.symbolObj['imageData'] + '">';
                break;
            default:
                console.log(_this2.symbolObj);
                alert('Point symbol does not handle symbol type: ' + _this2.symbolObj['type']);
        }
        return _this2;
    }

    return PointSymbol;
}(CommonSymbol);

var LineSymbol = function (_CommonSymbol2) {
    _inherits(LineSymbol, _CommonSymbol2);

    function LineSymbol(symbolObj, opacity) {
        _classCallCheck(this, LineSymbol);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(LineSymbol).call(this, symbolObj, opacity));

        switch (_this3.symbolObj['type']) {
            case 'esriSLS':
                var innerColor = _colorArrayToRgba(_this3.symbolObj.color, _this3.opacity);
                var lineWidth = _this3.symbolObj.width;

                _this3.olStyle = new _ol2.default.style.Style({
                    stroke: new _ol2.default.style.Stroke({
                        color: innerColor,
                        //lineDash: [4],
                        width: lineWidth
                    })
                });

                _this3.legendHtml = '<span class="legend-layer-icon" ';
                _this3.legendHtml += 'style="';
                _this3.legendHtml += 'background-color: ' + innerColor + ';';
                _this3.legendHtml += 'width: 40px;';
                _this3.legendHtml += 'height: 4px;';
                _this3.legendHtml += 'position: relative;';
                _this3.legendHtml += 'display: inline-block;';
                _this3.legendHtml += 'top: -1px;';
                _this3.legendHtml += '"></span>';
                break;
            default:
                console.log(_this3.symbolObj);
                alert('Line symbol does not handle symbol type: ' + _this3.symbolObj['type']);
        }
        return _this3;
    }

    return LineSymbol;
}(CommonSymbol);

var PolygonSymbol = function (_CommonSymbol3) {
    _inherits(PolygonSymbol, _CommonSymbol3);

    function PolygonSymbol(symbolObj, opacity) {
        _classCallCheck(this, PolygonSymbol);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(PolygonSymbol).call(this, symbolObj, opacity));

        switch (_this4.symbolObj['type']) {
            case 'esriSFS':
                var innerColor = _colorArrayToRgba(_this4.symbolObj.color, _this4.opacity);
                var outerColor = _colorArrayToRgba(_this4.symbolObj.outline.color, _this4.opacity);
                var outlineWidth = _this4.symbolObj.outline.width;

                _this4.olStyle = new _ol2.default.style.Style({
                    stroke: new _ol2.default.style.Stroke({
                        color: outerColor,
                        //lineDash: [4],
                        width: outlineWidth
                    }),
                    fill: new _ol2.default.style.Fill({
                        color: innerColor
                    })
                });

                _this4.legendHtml = '<span class="legend-layer-icon" ';
                _this4.legendHtml += 'style="';
                _this4.legendHtml += 'background-color: ' + innerColor + ';';
                _this4.legendHtml += 'border: solid ' + outerColor + ' 1px;';
                _this4.legendHtml += 'width: 40px;';
                _this4.legendHtml += 'height: 9px;';
                _this4.legendHtml += 'position: relative;';
                _this4.legendHtml += 'display: inline-block;';
                _this4.legendHtml += 'top: 2px;';
                _this4.legendHtml += '"></span>';
                break;

            default:
                console.log(_this4.symbolObj);
                alert('Polygon symbol does handle symbol type: ' + _this4.symbolObj['type']);
        }
        return _this4;
    }

    return PolygonSymbol;
}(CommonSymbol);

var SymbolGenerator = function SymbolGenerator(esriResponse) {
    _classCallCheck(this, SymbolGenerator);

    this.opacity = (100 - (esriResponse['drawingInfo']['transparency'] || 0)) / 100;
    this.renderer = esriResponse['drawingInfo']['renderer'];
    this.olStyle = undefined;
    this.legendHtml = '';
};

var SingleSymbol = function (_SymbolGenerator) {
    _inherits(SingleSymbol, _SymbolGenerator);

    /**
     *
     * @param {object} esriResponse - layer info
     * @param {Constructor|*} SymbolClass - the symbol class to use
     */

    function SingleSymbol(esriResponse, SymbolClass) {
        _classCallCheck(this, SingleSymbol);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(SingleSymbol).call(this, esriResponse));

        _this5.symbol = _this5.renderer['symbol'];
        var symbolObj = new SymbolClass(_this5.symbol, _this5.opacity);
        _this5.olStyle = symbolObj.olStyle;
        _this5.legendHtml = symbolObj.legendHtml;
        return _this5;
    }

    return SingleSymbol;
}(SymbolGenerator);

var UniqueValueSymbol = function (_SymbolGenerator2) {
    _inherits(UniqueValueSymbol, _SymbolGenerator2);

    /**
     *
     * @param {object} esriResponse - layer info
     * @param {Constructor|*} SymbolClass - the Symbol class definition
     */

    function UniqueValueSymbol(esriResponse, SymbolClass) {
        _classCallCheck(this, UniqueValueSymbol);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(UniqueValueSymbol).call(this, esriResponse));

        _this6.uniqueValueInfos = _this6.renderer['uniqueValueInfos'];
        _this6.propertyName = _this6.renderer['field1'];
        _this6.defaultSymbol = _this6.renderer['defaultSymbol'];

        if (_this6.defaultSymbol) {
            var symbolObj = new SymbolClass(_this6.defaultSymbol, _this6.opacity);
            _this6.defaultStyle = symbolObj.olStyle;
            _this6.defaultLabelHtml = '<span class="legend-layer-subitem">' + htmlEscape(_this6.renderer['defaultLabel']) + '</span>' + symbolObj.legendHtml;
        } else {
            _this6.defaultStyle = undefined;
            _this6.defaultLabelHtml = 'other';
        }

        _this6.valueArray = [];
        _this6.labelArray = [];
        _this6.legendArray = [];
        _this6.propertyStyleLookup = {};

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _this6.uniqueValueInfos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var uniqueVal = _step.value;

                _this6.labelArray.push(uniqueVal['label']);
                _this6.valueArray.push(uniqueVal['value']);
                var uniqueSym = new SymbolClass(uniqueVal.symbol, _this6.opacity);
                _this6.legendArray.push('<span class="legend-layer-subitem">' + htmlEscape(uniqueVal['label']) + '</span>' + uniqueSym.legendHtml);
                _this6.propertyStyleLookup[uniqueVal['value']] = uniqueSym.olStyle;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var _this = _this6;

        _this6.olStyle = function (feature, resolution) {
            var checkProperties = feature.getProperties();
            var checkProperty = checkProperties[_this.propertyName];

            var returnValue = void 0;
            if (_this.propertyStyleLookup[checkProperty] !== undefined) {
                returnValue = [_this.propertyStyleLookup[checkProperty]];
            } else {
                returnValue = [_this.defaultStyle];
            }

            return returnValue;
        };

        if (_this6.defaultLabelHtml !== null) {
            _this6.legendArray.push(_this6.defaultLabelHtml);
        }

        _this6.legendHtml = '<ul>';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = _this6.legendArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var h = _step2.value;

                _this6.legendHtml += '<li>' + h + '</li>';
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        _this6.legendHtml += '</ul>';
        return _this6;
    }

    return UniqueValueSymbol;
}(SymbolGenerator);

/**
 * style and legend object
 * @typedef {object} styleAndLegend
 * @property {styleFunc} style - style function
 * @property {string} legend - legend content
 */

/**
 *
 * @param {object} esriResponse - layer info
 * @returns {styleAndLegend} style and legend object
 */


function makeFeatureServiceLegendAndSymbol(esriResponse) {
    "use strict";

    var renderer = esriResponse['drawingInfo']['renderer'];
    var symbolLegendOut = null;

    switch (renderer['type']) {
        case 'simple':
            switch (esriResponse['geometryType']) {
                case 'esriGeometryPoint':
                    symbolLegendOut = new SingleSymbol(esriResponse, PointSymbol);
                    break;
                case 'esriGeometryPolyline':
                    symbolLegendOut = new SingleSymbol(esriResponse, LineSymbol);
                    break;
                case 'esriGeometryPolygon':
                    symbolLegendOut = new SingleSymbol(esriResponse, PolygonSymbol);
                    break;
                default:
                    console.log(esriResponse);
                    alert(esriResponse['geometryType'] + ' not handled');
            }
            break;
        case 'uniqueValue':
            switch (esriResponse['geometryType']) {
                case 'esriGeometryPoint':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, PointSymbol);
                    break;
                case 'esriGeometryPolyline':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, LineSymbol);
                    break;
                case 'esriGeometryPolygon':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, PolygonSymbol);
                    break;
                default:
                    console.log(esriResponse);
                    alert(esriResponse['geometryType'] + ' not handled');
            }
            break;
        default:
            alert('not handled renderer type: ' + renderer['type']);
    }

    if (symbolLegendOut == null) {
        return { style: undefined, legend: '' };
    } else {
        return { style: symbolLegendOut.olStyle, legend: symbolLegendOut.legendHtml };
    }
}

nm.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;

/**
 *
 * @param {object} lyrObject - the layer as defined in the response
 * @param {boolean} [iconsOnly=false] use only icons
 * @returns {string} legend html
 */
function mapServiceLegendItem(lyrObject, iconsOnly) {

    iconsOnly = typeof iconsOnly == 'boolean' ? iconsOnly : false;
    var layerName = lyrObject['layerName'];
    var legendItems = lyrObject['legend'];
    var legendHtml = '';

    if (legendItems.length == 1) {
        legendHtml = '<img class="legend-layer-icon" height="17" src="data:image/png;base64,' + legendItems[0]['imageData'] + '">';
    } else {
        legendHtml += '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span><ul>';
        for (var i = 0; i < legendItems.length; i++) {
            legendHtml += '<li>';
            legendHtml += '<span class="legend-layer-subitem">' + htmlEscape(legendItems[i]['label']) + '</span>';
            legendHtml += '<img class="legend-layer-icon" height="17" src="data:image/png;base64,' + legendItems[i]['imageData'] + '">';
            legendHtml += '</li>';
        }
        legendHtml += '</ul>';
    }

    if (!iconsOnly) {
        legendHtml = '<span class="legend-layer-subitem">' + layerName + '</span>' + legendHtml;
    }

    return legendHtml;
}

/**
 * make map service legent
 * @param {object} esriResponse - layer info
 * @returns {string} legend content
 */
function makeMapServiceLegend(esriResponse) {
    "use strict";

    var newLegendHtml = '';

    var layers = esriResponse['layers'];

    if (layers.length == 1) {
        newLegendHtml += mapServiceLegendItem(layers[0], true);
    } else {
        newLegendHtml += '<ul>';
        for (var i = 0; i < layers.length; i++) {
            newLegendHtml += '<li>' + mapServiceLegendItem(layers[i]) + '</li>';
        }
        newLegendHtml += '</ul>';
    }

    return newLegendHtml;
}

nm.makeMapServiceLegend = makeMapServiceLegend;

},{"../ol/ol":319,"../util/provide":323}],309:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 12/8/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('olHelpers');

/**
 * base interaction
 */

var MapInteractionBase = function () {

    /**
     * map interaction base
     * @param {string} subtype - the interaction subtype
     */

    function MapInteractionBase(subtype) {
        _classCallCheck(this, MapInteractionBase);

        this._map = undefined;
        this._initialized = false;
        this._subtype = subtype;
    }

    /**
     * base initializer, returns true for already initialized
     * @param {ol.Map} theMap - the ol Map
     * @returns {boolean} true for already initialized
     */


    _createClass(MapInteractionBase, [{
        key: 'init',
        value: function init(theMap) {
            if (!this._initialized) {
                this._map = theMap;
                this._initialized = true;

                return false;
            }

            return true;
        }

        /**
         * get reference to the ol map object
         * @returns {ol.Map} the map object
         */

    }, {
        key: '_checkInit',


        /**
         * Check the initialization status and throw exception if not valid yet
         * @protected
         */
        value: function _checkInit() {
            if (!this.initialized) {
                var msg = this._subtype + ' object not initialized';
                alert(msg);
                console.log(msg);
                throw msg;
            }
        }

        /**
         * Check the initialization status and throw exception if not valid yet
         */

    }, {
        key: 'checkInit',
        value: function checkInit() {
            this._checkInit();
        }
    }, {
        key: 'map',
        get: function get() {
            return this._map;
        }

        /**
         * get if is initialized
         * @returns {boolean} is initialized
         */

    }, {
        key: 'initialized',
        get: function get() {
            return this._initialized;
        }
    }]);

    return MapInteractionBase;
}();

nm.MapInteractionBase = MapInteractionBase;
exports.default = MapInteractionBase;

},{"../util/provide":323}],310:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapMoveCls = require('./mapMoveCls');

var _mapMoveCls2 = _interopRequireDefault(_mapMoveCls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The single map move object catch is that it is common to multimap pages
 * @type {MapMoveCls}
 */
exports.default = new _mapMoveCls2.default(); /**
                                               * Created by gavorhes on 11/3/2015.
                                               */

},{"./mapMoveCls":311}],311:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _mapInteractionBase = require('./mapInteractionBase');

var _mapInteractionBase2 = _interopRequireDefault(_mapInteractionBase);

var _checkDefined = require('../util/checkDefined');

var checkDefined = _interopRequireWildcard(_checkDefined);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _makeGuid = require('../util/makeGuid');

var _makeGuid2 = _interopRequireDefault(_makeGuid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 11/3/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var nm = (0, _provide2.default)('olHelpers');

/**
 * assists with map move interactions, trigger callback functions
 * @augments MapInteractionBase
 */

var MapMoveCls = function (_MapInteractionBase) {
    _inherits(MapMoveCls, _MapInteractionBase);

    /**
     * constructor called implicitly
     */

    function MapMoveCls() {
        _classCallCheck(this, MapMoveCls);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(MapMoveCls).call(this, 'map move'));

        _this2._arrLyrRequest = [];
        _this2._arrLyrTimeout = [];
        _this2._arrLayer = [];
        _this2._lookupLayer = {};

        _this2._mapMoveCallbacks = [];
        _this2._mapMoveCallbacksLookup = {};
        _this2._mapMoveCallbackDelays = [];
        _this2._mapMoveCallbackContext = [];
        _this2._mapMoveCallbackTimeout = [];

        _this2._mapExtent = undefined;
        _this2._zoomLevel = undefined;
        return _this2;
    }

    /**
     * initialize the map move object
     * @param {ol.Map} theMap - the ol map
     */


    _createClass(MapMoveCls, [{
        key: 'init',
        value: function init(theMap) {
            if (_get(Object.getPrototypeOf(MapMoveCls.prototype), 'init', this).call(this, theMap)) {
                return;
            }

            var _this = this;

            this.map.getView().on(['change:center', 'change:resolution'], function (e) {

                _this._updateMapExtent();

                // trigger the layer updates
                for (var i = 0; i < _this._arrLayer.length; i++) {
                    _this.triggerLyrLoad(_this._arrLayer[i], i, e.type);
                }

                // trigger the map callbacks
                for (var _i = 0; _i < _this._mapMoveCallbacks.length; _i++) {
                    _this.triggerMoveCallback(_i, e.type);
                }
            });
        }
    }, {
        key: '_updateMapExtent',
        value: function _updateMapExtent() {
            var theView = this.map.getView();
            this._zoomLevel = theView.getZoom();

            var extentArray = theView.calculateExtent(this.map.getSize());

            this._mapExtent = {
                minX: extentArray[0],
                minY: extentArray[1],
                maxX: extentArray[2],
                maxY: extentArray[3]
            };
        }

        /**
         * return the map extent
         */

    }, {
        key: 'triggerLyrLoad',


        /**
         * Trigger the layer load
         * @param {LayerBaseVector|*} lyr - the layer being acted on
         * @param {number} [index=undefined] - index of the layer
         * @param {string|*} [eventType=undefined] the event triggering the load, as 'change:center' or 'change:resolution'
         */
        value: function triggerLyrLoad(lyr, index, eventType) {
            var _this3 = this;

            if (checkDefined.undefinedOrNull(lyr) && checkDefined.undefinedOrNull(index)) {
                throw 'need to define lyr or index';
            } else if (checkDefined.definedAndNotNull(lyr) && checkDefined.undefinedOrNull(index)) {
                index = this._arrLayer.indexOf(lyr);
            } else if (checkDefined.undefinedOrNull(lyr) && checkDefined.definedAndNotNull(index)) {
                lyr = this._arrLayer[index];
            }

            // clear the timeout
            if (this._arrLyrTimeout[index] != null) {
                clearTimeout(this._arrLyrTimeout[index]);
                this._arrLyrTimeout[index] = null;
            }

            // abort if necessary and clear the request
            if (this._arrLyrRequest[index] != null && this._arrLyrRequest[index] != 4) {
                this._arrLyrRequest[index].abort();
                this._arrLyrRequest[index] = null;
            }

            // dummy callback used if before load returns false
            var callbackFunc = function callbackFunc() {};

            if (lyr.mapMoveBefore(this._zoomLevel, eventType)) {
                (function () {
                    lyr.mapMoveMakeGetParams(_this3._mapExtent, _this3._zoomLevel);

                    var _this = _this3;

                    callbackFunc = function callbackFunc() {
                        function innerFunction(theLayer, theIndex) {
                            var _innerThis = this;
                            this._arrLyrRequest[theIndex] = _jquery2.default.get(theLayer.url, theLayer.mapMoveParams, function (d) {
                                /**
                                 * @type {LayerBaseVector}
                                 */
                                theLayer.mapMoveCallback(d);
                                theLayer.loadCallback();
                            }, 'json').fail(function (jqXHR) {
                                if (jqXHR.statusText != 'abort') {
                                    console.log('failed');
                                    console.log(theLayer.url);
                                    console.log(theLayer.mapMoveParams);
                                }
                            }).always(function () {
                                _innerThis._arrLyrTimeout[theIndex] = null;
                                _innerThis._arrLyrRequest[theIndex] = null;
                            });
                        }
                        innerFunction.call(_this, lyr, index);
                    };
                })();
            } else {
                lyr.clear();
            }
            this._arrLyrTimeout[index] = setTimeout(callbackFunc, lyr.onDemandDelay);
        }

        /**
         * trigger the map move call back at the given index
         * @param {number} ind - the index of the layer
         * @param {string|*} [eventType=undefined] the event triggering the load as 'change:center' or 'change:resolution'
         * @param {string} [functionId=undefined] the function id used to reference the added callback function
         */

    }, {
        key: 'triggerMoveCallback',
        value: function triggerMoveCallback(ind, eventType, functionId) {

            if (typeof ind == 'undefined' && typeof functionId == 'undefined') {
                throw 'either the function index or the id must be defined';
            }

            if (typeof ind !== 'number') {
                ind = this._mapMoveCallbacks.indexOf(this._mapMoveCallbacksLookup[functionId]);
            }

            if (ind < 0) {
                console.log('function not found');

                return;
            }

            // clear the timeout
            if (this._mapMoveCallbackTimeout[ind] != null) {
                clearTimeout(this._mapMoveCallbackTimeout[ind]);
                this._mapMoveCallbackTimeout[ind] = null;
            }

            var ctx = this._mapMoveCallbackContext[ind];
            var theFunc = this._mapMoveCallbacks[ind];

            var _this = this;

            var f = function f() {
                if (ctx !== null) {
                    theFunc.call(ctx, _this._mapExtent, _this._zoomLevel, eventType);
                } else {
                    theFunc(_this._mapExtent, _this._zoomLevel, eventType);
                }
            };

            this._mapMoveCallbackTimeout[ind] = setTimeout(f, this._mapMoveCallbackDelays[ind]);
        }

        /**
         * Add a layer to the interaction
         * @param {LayerBaseVector|*} lyr - layer to add
         * @param {boolean} [triggerOnAdd=true] - if the layer should be loaded on add
         */

    }, {
        key: 'addVectorLayer',
        value: function addVectorLayer(lyr, triggerOnAdd) {
            if (this._arrLayer.indexOf(lyr) > -1) {
                console.log('already added ' + lyr.name + ' to map move');

                return;
            }
            this._checkInit();

            this._arrLyrRequest.push(null);
            this._arrLyrTimeout.push(null);
            this._arrLayer.push(lyr);
            this._lookupLayer[lyr.id] = lyr;

            triggerOnAdd = typeof triggerOnAdd == 'boolean' ? triggerOnAdd : true;

            if (triggerOnAdd) {
                if (this._mapExtent === undefined) {
                    this._updateMapExtent();
                }
                this.triggerLyrLoad(lyr, this._arrLayer.length - 1);
            }
        }

        /**
         * This callback is displayed as a global member.
         * @callback mapMoveCallbackFunction
         * @param {object} extent - extent object
         * @param {number} extent.minX - minX
         * @param {number} extent.minY - minY
         * @param {number} extent.maxX - maxX
         * @param {number} extent.maxY - maxY
         * @param {number} zoomLevel - zoom level
         * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
         */

        /**
         * add a callback to the map move event
         * @param {mapMoveCallbackFunction} func - callback function
         * @param {*} context - the context to use for this function
         * @param {number} [delay=50] the delay before call load
         * @param {boolean} [triggerOnAdd=true] if the layer should be loaded on add to mapMove
         * @param {string} [functionId=undefined] optional id to reference the function later for outside triggering
         */

    }, {
        key: 'addCallback',
        value: function addCallback(func, context, delay, triggerOnAdd, functionId) {

            if (this._mapMoveCallbacks.indexOf(func) > -1) {
                console.log('this function already added to map move');

                return;
            }
            this._checkInit();
            if (!functionId) {
                functionId = (0, _makeGuid2.default)();
            }

            this._mapMoveCallbacks.push(func);
            this._mapMoveCallbacksLookup[functionId] = func;
            this._mapMoveCallbackDelays.push(typeof delay == 'number' ? delay : 50);
            this._mapMoveCallbackContext.push(checkDefined.definedAndNotNull(context) ? context : null);
            this._mapMoveCallbackTimeout.push(null);

            triggerOnAdd = typeof triggerOnAdd == 'boolean' ? triggerOnAdd : true;

            if (triggerOnAdd) {
                if (this._mapExtent === undefined) {
                    this._updateMapExtent();
                }
                this.triggerMoveCallback(this._mapMoveCallbacks.length - 1);
            }
        }
    }, {
        key: 'mapExtent',
        get: function get() {
            if (!this._mapExtent) {
                this._updateMapExtent();
            }

            return this._mapExtent;
        }
    }]);

    return MapMoveCls;
}(_mapInteractionBase2.default);

nm.MapMoveCls = MapMoveCls;
exports.default = MapMoveCls;

},{"../jquery":302,"../util/checkDefined":320,"../util/makeGuid":322,"../util/provide":323,"./mapInteractionBase":309}],312:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapPopupCls = require('./mapPopupCls');

var _mapPopupCls2 = _interopRequireDefault(_mapPopupCls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The single popup object catch is that it is common to multimap pages
 * @type {MapPopupCls}
 */
exports.default = new _mapPopupCls2.default(); /**
                                                * Created by gavorhes on 11/3/2015.
                                                */

},{"./mapPopupCls":313}],313:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 11/3/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _mapInteractionBase = require('./mapInteractionBase');

var _mapInteractionBase2 = _interopRequireDefault(_mapInteractionBase);

var _propertiesZoomStyle = require('../olHelpers/propertiesZoomStyle');

var _propertiesZoomStyle2 = _interopRequireDefault(_propertiesZoomStyle);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('olHelpers');

var _FeatureLayerProperties = function () {

    /**
     *
     * @param {ol.Feature} feature the feature
     * @param {LayerBaseVector|*} layer - the layer in the popup
     * @param {number} layerIndex - index of the layer
     * @param {ol.layer.Vector} selectionLayer - the ol selection layer
     * @param {string} [esriLayerName=undefined] - esri layer name
     */

    function _FeatureLayerProperties(feature, layer, layerIndex, selectionLayer, esriLayerName) {
        _classCallCheck(this, _FeatureLayerProperties);

        this.feature = feature;
        this.layer = layer;
        this.layerIndex = layerIndex;
        this.selectionLayer = selectionLayer;
        this.popupContent = '';
        this.esriLayerName = typeof esriLayerName == 'string' ? esriLayerName : undefined;
    }

    _createClass(_FeatureLayerProperties, [{
        key: 'layerName',
        get: function get() {
            if (typeof this.esriLayerName == 'string') {
                return this.esriLayerName;
            } else {
                return this.layer.name;
            }
        }
    }]);

    return _FeatureLayerProperties;
}();

/**
 * map popup class
 * @augments MapInteractionBase
 */


var MapPopupCls = function (_MapInteractionBase) {
    _inherits(MapPopupCls, _MapInteractionBase);

    /**
     * Definition for openlayers style function
     * @callback olStyleFunction
     * &param feature the openlayers vector feature
     * $param
     */

    /**
     * Definition for popup changed callback functions
     * @callback popupChangedFunction
     * @param $popContent jquery reference to the popup content
     */

    /**
     * map popup constructor
     */

    function MapPopupCls() {
        _classCallCheck(this, MapPopupCls);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapPopupCls).call(this, 'map popup'));

        _this._arrPopupLayerIds = [];
        _this._arrPopupLayerNames = [];
        /**
         *
         * @type {Array<LayerBaseVector>}
         * @private
         */
        _this._arrPopupLayers = [];
        _this._arrPopupOlLayers = [];
        _this._arrPopupContentFunction = [];
        _this._$popupContainer = undefined;
        _this._$popupContent = undefined;
        _this._$popupCloser = undefined;
        _this._popupOverlay = undefined;
        _this._selectionLayers = [];
        _this._selectionLayerLookup = {};
        _this._mapClickFunctions = [];

        //let a = function($jqueryContent){console.log($jqueryContent)};
        //this._popupChangedLookup = {'a': a};
        _this._popupChangedFunctions = [];
        /**
         *
         * @type {Array<LayerEsriMapServer>}
         * @private
         */
        _this._esriMapServiceLayers = [];

        _this._popupOpen = false;
        _this._popupCoordinate = null;

        /**
         *
         * @type {Array.<_FeatureLayerProperties>}
         */
        _this._passThroughLayerFeatureArray = [];

        _this._currentPopupIndex = -1;
        _this._popupContentLength = 0;

        return _this;
    }

    /**
     * map popup initialization
     * @param {ol.Map} theMap - the ol map
     */


    _createClass(MapPopupCls, [{
        key: 'init',
        value: function init(theMap) {
            var _this2 = this;

            if (_get(Object.getPrototypeOf(MapPopupCls.prototype), 'init', this).call(this, theMap)) {
                return;
            }
            var $map = (0, _jquery2.default)('#' + this.map.getTarget());

            $map.append('<div class="ol-popup">' + '<a href="#" class="ol-popup-closer"></a>' + '<div class="popup-content"></div>' + '</div>');

            this._$popupContainer = $map.find('.ol-popup');
            this._$popupContent = $map.find('.popup-content');
            this._$popupCloser = $map.find('.ol-popup-closer');

            this._popupOverlay = new _ol2.default.Overlay({
                element: this._$popupContainer[0],
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });

            this._map.addOverlay(this._popupOverlay);

            this._$popupCloser.click(function () {
                _this2.closePopup();
            });

            // display popup on click
            this._map.on('singleclick', function (evt) {
                _this2.closePopup();
                _this2._popupCoordinate = evt.coordinate;

                if (_this2._esriMapServiceLayers.length > 0) {
                    var queryParams = {
                        geometry: evt.coordinate.join(','),
                        geometryType: 'esriGeometryPoint',
                        layers: 'all',
                        sr: _this2._map.getView().getProjection().getCode().split(':')[1],
                        mapExtent: _this2._map.getView().calculateExtent(_this2._map.getSize()).join(','),
                        imageDisplay: _this2._map.getSize().join(',') + ',96',
                        returnGeometry: true,
                        tolerance: 15,
                        f: 'pjson'
                    };

                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = _this2._esriMapServiceLayers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var l = _step.value;

                            l.getPopupInfo(queryParams, _this2._selectionLayerLookup[l.id]);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }

                var layerFeatureObjectArray = _this2._featuresAtPixel(evt.pixel);

                /**
                 *
                 * @type {Array.<_FeatureLayerProperties>}
                 */
                _this2._passThroughLayerFeatureArray = [];
                _this2._currentPopupIndex = -1;

                for (var i = 0; i < layerFeatureObjectArray.length; i++) {
                    var featObj = layerFeatureObjectArray[i];

                    var props = featObj.feature.getProperties();

                    var popupContentResponse = _this2._arrPopupContentFunction[featObj.layerIndex](props, _this2._$popupContent);

                    //skip if return was false
                    if (popupContentResponse === false) {
                        //continue;
                    } else if (typeof popupContentResponse == 'string') {
                            featObj.popupContent = popupContentResponse;
                            _this2._passThroughLayerFeatureArray.push(featObj);
                        } else {
                            featObj.selectionLayer.getSource().addFeature(featObj.feature);
                        }
                }

                _this2._popupContentLength = _this2._passThroughLayerFeatureArray.length;

                _this2._currentPopupIndex = -1;

                var popupHtml = '<div class="ol-popup-nav">';
                popupHtml += '<span class="previous-popup ol-popup-nav-arrow">&#9664;</span>';
                popupHtml += '<span class="next-popup ol-popup-nav-arrow">&#9654;</span>';
                popupHtml += '<span class="current-popup-item-number" style="font-weight: bold;"></span>';
                popupHtml += '<span>&nbsp;of&nbsp;</span>';
                popupHtml += '<span class="popup-content-length" style="font-weight: bold;">' + _this2._popupContentLength + '</span>';
                popupHtml += '<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
                popupHtml += '<span class="current-popup-layer-name"></span>';
                popupHtml += '</div>';
                popupHtml += '<div class="ol-popup-inner">';

                popupHtml += '</div>';

                _this2._$popupContent.html(popupHtml);

                _this2._$popupContent.find('.previous-popup').click(function () {
                    if (_this2._popupContentLength == 1) {
                        return;
                    }

                    if (_this2._currentPopupIndex == 0) {
                        _this2._currentPopupIndex = _this2._popupContentLength - 1;
                    } else {
                        _this2._currentPopupIndex--;
                    }
                    _this2._triggerFeatSelect();
                });

                var nextPopup = _this2._$popupContent.find('.next-popup');

                nextPopup.click(function () {
                    if (_this2._popupContentLength == 1 && _this2._currentPopupIndex > -1) {
                        return;
                    }

                    if (_this2._currentPopupIndex == _this2._popupContentLength - 1) {
                        _this2._currentPopupIndex = 0;
                    } else {
                        _this2._currentPopupIndex++;
                    }
                    _this2._triggerFeatSelect();
                });

                if (_this2._popupContentLength > 0) {
                    nextPopup.trigger('click');
                    _this2._popupOverlay.setPosition(_this2._popupCoordinate);
                    _this2._$popupContent.scrollTop(0);
                    _this2._popupOpen = true;
                }
            });

            //change mouse cursor when over marker
            this._map.on('pointermove', function (e) {
                if (e.dragging) {
                    return;
                }
                var pixel = _this2.map.getEventPixel(e.originalEvent);
                var hit = _this2.map.hasFeatureAtPixel(pixel, function (lyrCandidate) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = _this2._arrPopupOlLayers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var olLayer = _step2.value;

                            if (lyrCandidate == olLayer) {
                                return true;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    return false;
                });
                _this2.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
            });
        }

        /**
         * helper to select features
         * @private
         */

    }, {
        key: '_triggerFeatSelect',
        value: function _triggerFeatSelect() {
            var $currentPopupItemNumber = this._$popupContent.find('.current-popup-item-number');
            var $innerPopup = this._$popupContent.find('.ol-popup-inner');
            var $layerNameSpan = this._$popupContent.find('.current-popup-layer-name');
            this.clearSelection();
            var lyrFeatObj = this._passThroughLayerFeatureArray[this._currentPopupIndex];
            $currentPopupItemNumber.html((this._currentPopupIndex + 1).toFixed());
            $layerNameSpan.html(lyrFeatObj.layerName);
            $innerPopup.html(lyrFeatObj.popupContent);
            lyrFeatObj.selectionLayer.getSource().addFeature(lyrFeatObj.feature);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._popupChangedFunctions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var f = _step3.value;

                    f(this._$popupContent);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }

        /**
         *
         * @param {ol.Feature} feature - the ol feature
         * @param {LayerEsriMapServer} lyr - the map server layer
         * @param {string} popupContent - popup content
         * @param {string} esriName - esri layer name
         */

    }, {
        key: 'addMapServicePopupContent',
        value: function addMapServicePopupContent(feature, lyr, popupContent, esriName) {

            var featLayerObject = new _FeatureLayerProperties(feature, lyr, this._popupContentLength, this._selectionLayerLookup[lyr.id], esriName);
            featLayerObject.popupContent = popupContent;

            this._passThroughLayerFeatureArray.push(featLayerObject);
            this._popupContentLength++;

            (0, _jquery2.default)('.popup-content-length').html(this._popupContentLength.toFixed());

            if (!this._popupOpen) {
                this._$popupContent.find('.next-popup').trigger('click');

                this._popupOverlay.setPosition(this._popupCoordinate);
                this._$popupContent.scrollTop(0);
                this._popupOpen = true;
            }
        }

        /**
         *
         * @param {ol.Pixel} pixel - the ol pixel
         * @returns {Array.<_FeatureLayerProperties>} - feature layer properties
         * @private
         */

    }, {
        key: '_featuresAtPixel',
        value: function _featuresAtPixel(pixel) {
            var _this3 = this;

            var layerFeatureObjectArray = [];
            this.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                var lyrIndex = _this3._arrPopupOlLayers.indexOf(layer);

                if (lyrIndex > -1) {
                    layerFeatureObjectArray.push(new _FeatureLayerProperties(feature, _this3._arrPopupLayers[lyrIndex], lyrIndex, _this3._selectionLayers[lyrIndex]));
                }
            });

            return layerFeatureObjectArray;
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            this._checkInit();
            this._popupOpen = false;
            this._popupOverlay.setPosition(undefined);
            this._$popupCloser[0].blur();
            this.clearSelection();
            this._$popupContent.html('');

            return false;
        }
    }, {
        key: 'addPopupChangedFunction',


        /**
         *
         * @param {popupChangedFunction} chgFunction - popup change function
         */
        value: function addPopupChangedFunction(chgFunction) {
            this._popupChangedFunctions.push(chgFunction);
        }

        /**
         *
         * @param {LayerBase|*} lyr - the layer being acted on
         * @param {object} [selectionStyle={}] the selection style configuration
         * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
         * @param {number} [selectionStyle.width=10] the selection width for linear features
         * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
         * @returns {ol.layer.Vector} the new selection layer
         * @private
         */

    }, {
        key: '_addPopupLayer',
        value: function _addPopupLayer(lyr, selectionStyle) {
            this._checkInit();

            selectionStyle = selectionStyle || {};
            selectionStyle.color = selectionStyle.color || 'rgba(255,170,0,0.5)';
            selectionStyle.width = selectionStyle.width || 10;

            var theStyle = void 0;

            if (selectionStyle.olStyle) {
                theStyle = selectionStyle.olStyle;
            } else {
                theStyle = new _ol2.default.style.Style({
                    stroke: new _ol2.default.style.Stroke({
                        color: selectionStyle.color,
                        width: selectionStyle.width
                    }),
                    image: new _ol2.default.style.Circle({
                        radius: 7,
                        fill: new _ol2.default.style.Fill({ color: selectionStyle.color }),
                        stroke: new _ol2.default.style.Stroke({ color: selectionStyle.color, width: 1 })
                    }),
                    fill: new _ol2.default.style.Fill({
                        color: selectionStyle.color
                    })
                });
            }

            var selectionLayer = new _ol2.default.layer.Vector({
                source: new _ol2.default.source.Vector(),
                style: theStyle,
                zIndex: 100
            });

            this._selectionLayers.push(selectionLayer);
            this._selectionLayerLookup[lyr.id] = selectionLayer;
            this.map.addLayer(selectionLayer);

            return selectionLayer;
        }

        /**
         * The popup callback function
         * @callback popupCallback
         * @param {object} featureProperties - the feature properties
         * @param {jQuery} jqRef reference to the div content to do some async stuff inside the div
         * @returns {string} the html content to be added to the popup
         */

        /**
         * Add popup to the map
         * @param {LayerBase|*} lyr The layer that the popup with act on
         * @param {popupCallback} popupContentFunction - popup content function that makes popup info
         * @param {object} [selectionStyle={}] the selection style configuration
         * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
         * @param {number} [selectionStyle.width=10] the selection width for linear features
         * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
         * @returns {object} a reference to the ol selection layer
         */

    }, {
        key: 'addVectorPopup',
        value: function addVectorPopup(lyr, popupContentFunction, selectionStyle) {
            var selectionLayer = this._addPopupLayer(lyr, selectionStyle);
            this._arrPopupLayerIds.push(lyr.id);
            this._arrPopupLayerNames.push(lyr.name);
            this._arrPopupLayers.push(lyr);
            this._arrPopupOlLayers.push(lyr.olLayer);
            this._arrPopupContentFunction.push(popupContentFunction);

            return selectionLayer;
        }
    }, {
        key: 'removeVectorPopup',


        /**
         *
         * @param {LayerBase} lyr - layer
         */
        value: function removeVectorPopup(lyr) {
            var idx = this._arrPopupLayerIds.indexOf(lyr.id);

            if (idx > -1) {
                this._arrPopupLayerIds.splice(idx, 1);
                this._arrPopupLayerNames.splice(idx, 1);
                this._arrPopupLayers.splice(idx, 1);
                this._arrPopupOlLayers.splice(idx, 1);
                this._arrPopupContentFunction.splice(idx, 1);
                this._selectionLayers.splice(idx, 1);
                delete this._selectionLayerLookup[lyr.id];
            }
        }

        /**
         *
         * @param {LayerEsriMapServer} lyr - map server layer
         * @param {object} [selectionStyle={}] the selection style configuration
         * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
         * @param {number} [selectionStyle.width=10] the selection width for linear features
         * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
         * @returns {object} a reference to the ol selection layer
         */

    }, {
        key: 'addMapServicePopup',
        value: function addMapServicePopup(lyr, selectionStyle) {
            var selectionLayer = this._addPopupLayer(lyr, selectionStyle);
            this._esriMapServiceLayers.push(lyr);

            return selectionLayer;
        }
    }, {
        key: 'clearSelection',
        value: function clearSelection() {
            this._checkInit();
            for (var i = 0; i < this._selectionLayers.length; i++) {
                this._selectionLayers[i].getSource().clear();
            }
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this._mapClickFunctions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var f = _step4.value;

                    f();
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: 'addMapClickFunction',


        /**
         * Add a function to be called when the map is clicked but before any popups are implemented
         * @param {function} func - the map click function
         */
        value: function addMapClickFunction(func) {
            this._mapClickFunctions.push(func);
        }
    }]);

    return MapPopupCls;
}(_mapInteractionBase2.default);

nm.MapPopupCls = MapPopupCls;
exports.default = MapPopupCls;

},{"../jquery":302,"../ol/ol":319,"../olHelpers/propertiesZoomStyle":314,"../util/provide":323,"./mapInteractionBase":309}],314:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _zoomResolutionConvert = require('./zoomResolutionConvert');

var zoomResolutionConvert = _interopRequireWildcard(_zoomResolutionConvert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by gavorhes on 12/14/2015.
 */

var nm = (0, _provide2.default)('olHelpers');

/**
 * A style function based on properties and zoom level, wraps normal feature, resolution function
 * @callback propertiesZoomStyle
 * @param {object} properties the feature properties
 * @param {number} zoom level
 *
 */

/**
 * wrapper to define a style function by properties and zoom level
 * @param {propertiesZoomStyle|*} styleFunc - style function
 * @returns {function|*} new function
 */
function propertiesZoomStyle(styleFunc) {
    if (styleFunc == undefined) {
        return undefined;
    }

    return function (feature, resolution) {
        styleFunc(feature.getProperties(), zoomResolutionConvert.resolutionToZoom(resolution));
    };
}

nm.propertiesZoomStyle = propertiesZoomStyle;
exports.default = propertiesZoomStyle;

},{"../util/provide":323,"./zoomResolutionConvert":317}],315:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _quickMapBase = require('./quickMapBase');

var _quickMapBase2 = _interopRequireDefault(_quickMapBase);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _mapMove = require('./mapMove');

var _mapMove2 = _interopRequireDefault(_mapMove);

var _mapPopup = require('./mapPopup');

var _mapPopup2 = _interopRequireDefault(_mapPopup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by gavorhes on 12/15/2015.
 */

var nm = (0, _provide2.default)('olHelpers');

/**
 * Sets up a map with some default parameters and initializes
 * mapMove and mapPopup
 *
 * @param {object} [options={}] config options
 * @param {string} [options.divId=map] map div id
 * @param {object} [options.center={}] center config object
 * @param {number} [options.center.x=-10018378] center x, web mercator x or lon
 * @param {number} [options.center.y=5574910] center y, web mercator y or lat
 * @param {number} [options.zoom=7] zoom level
 * @param {number} [options.minZoom=undefined] min zoom
 * @param {number} [options.maxZoom=undefined] max zoom
 * @param {boolean} [options.baseSwitcher=true] if add base map switcher
 * @param {boolean} [options.fullScreen=false] if add base map switcher
 * @returns {ol.Map} the ol map
 */
function quickMap(options) {
  var m = (0, _quickMapBase2.default)(options);
  _mapMove2.default.init(m);
  _mapPopup2.default.init(m);

  return m;
}

nm.quickMap = quickMap;
exports.default = quickMap;

},{"../util/provide":323,"./mapMove":310,"./mapPopup":312,"./quickMapBase":316}],316:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nm = (0, _provide2.default)('olHelpers');

/**
 * Sets up a map with some default parameters and initializes
 * mapMove and mapPopup
 *
 * @param {object} [options={}] config options
 * @param {string} [options.divId=map] map div id
 * @param {object} [options.center={}] center config object
 * @param {number} [options.center.x=-10018378] center x, web mercator x or lon
 * @param {number} [options.center.y=5574910] center y, web mercator y or lat
 * @param {number} [options.zoom=7] zoom level
 * @param {number} [options.minZoom=undefined] min zoom
 * @param {number} [options.maxZoom=undefined] max zoom
 * @param {boolean} [options.baseSwitcher=true] if add base map switcher
 * @param {boolean} [options.fullScreen=false] if add base map switcher
 * @returns {ol.Map} the ol map
 */
/**
 * Created by gavorhes on 3/25/2016.
 */

/**
 * Created by gavorhes on 12/15/2015.
 */

function quickMapBase(options) {
    options = options || {};
    options.divId = options.divId || 'map';
    options.center = options.center || {};
    options.center.x = typeof options.center.x == 'number' ? options.center.x : -10018378;
    options.center.y = typeof options.center.y == 'number' ? options.center.y : 5574910;
    options.zoom = typeof options.zoom == 'number' ? options.zoom : 7;
    options.baseSwitcher = typeof options.baseSwitcher == 'boolean' ? options.baseSwitcher : true;
    options.fullScreen = typeof options.fullScreen == 'boolean' ? options.fullScreen : false;

    var $mapDiv = (0, _jquery2.default)('#' + options.divId);
    $mapDiv.css('position', 'relative');

    var osmLayer = new _ol2.default.layer.Tile({ source: new _ol2.default.source.OSM() });
    var satLayer = new _ol2.default.layer.Tile({ visible: false, source: new _ol2.default.source.MapQuest({ layer: 'sat' }) });

    var osmCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAADQ1NDk5OURFREtLS1FHSFlZWGJRVGJiYWdmZWxsbHRmaXBpanN0c3V0dHp5eX5+fIVzd4F3eeV0jud5juZ8k4aHhomHhoyGh5eGj5OVlJiVlZiYl5qZmJydnKOTlaKZmqKdnaOioaqqqKuzsbOvrrSysLa3tbW4uLm6ub27ub+/vbGXwbCZwbCgxLKlxrOqyLStybO3yrSxyrWzzbW2y7a1zbK4y7W6zbW8y760yrTAzbTFzrPKzrLOzrTJzrTOzr7CwbXC0LXK0LTO0L3I0bPQz7TQz7PS0bXQ0LnR0brW1bzT0r7U077V1Lzc2dqNqteUsdyXscaquuOHneaGmueHnOeJnuiBleiKn+eNoOiOoOWUpOiRo+iSpeiUpeqYpumaqOmdrPSynemgruSqtOmisOmlsuuqtequuOW1vOuxu+uxvOq1ve+xvPK0pvW3o/W5pfO5qvS7qfCwvMOuwc2/wNenxNyyzNe/0Nq31Nq51dy72Oy3wOu4wOu+xey4wO+6xO2+xfTAr/TCsvfFtPHLvvTJuMPDwMfHxcXKyc3DxMvFyMvLyM3PzcDV08DV1MTX1cbY1s7X1sjZ1sra2Mnd3M7b2c7c2tfH1tnB1t7F2d7M29fX1tLY1tDd2tHe3NTf3NnS19rZ1tva2Nnf3t3d28rh3tXg3Nnh3tzj393k39ni4N7k4N7n5uXDyOfLz+zAxu3CyOzEyezKzeDJ3eLM3uvP0u3P0ePf2+7R0u7Q1u/U0+7U1ezc0+7a2e/d2+3f3vbFzvLOwfHN0PPQw/TUx/LWyvLYzPDQ1fPe0ubc4vve4uHh3+nh3+/h2u/h3vHj2vHl3uHm4eTn4uDp5ebo4+Xo5ODq6ebq6OTv6+nl4+/j4O7l4e7n5ujp4+np5Ozq5e7s5urt6O7t6Orw6u7x6u3x7vPj5PDl4fDo4vDq5fDt5vDu6PDv7PTv6fDx6vHx7fH17fXw6fXy7fb07/bz8fT18vn38vr39fr48/r59Pr6+P3++//+/gAAALNTSk0AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAFNElEQVRIS1VVCZxVUxi/9l0UIUT2bMnY43bVI2c0Y01kSWIaS0j2JEtkN41piomZrPPKQ2aQ7JKImOZlnm2493TJzDufuU1Zi+v/fee+mZ//793vnPOd7zvfes5zDBEZkBBjAcIjb+Iiotqgdhat8AMK0vl7/R9N7GiWtshqIr+EZ5gYKibyUsXY1l/mfFpssvUlWQ0FkU3gy4+RB/+kwYcO8pRSnldcOU/r2lAHARSwk2ORgEmOdC1EsuRiYSqMPwwroMIraZk5V2fYJQjCKfZrRmh3gSAZi2i4b7wSylWu8EqZwS59JkFUaW96JbNSc+CEUmt4rorwuZmWdDaoc+uZETuQlTCU5xYzR7muUnVUVo+BcRhre/VwUpasgJwhH7JkYIYA0sNxhmCwUK+lw6vCKBZehw01dEiyw4Q4aE0Z4ahDhKaFQsGnJ2BgqKoTBsNjFy0SlW6whRAZTdm8DBJmkBZhDi1j4xJQBk6ywrWUTymaCxac8lROcdauRGzQSNtA7EHUYhXyEwhhgjFUqRuO+rauhF1awFpzCsmwUbjIFBR0u1bKtyGpulW/H/cVVzkyGaIWTIR9pFAV6GK2gPMXMX8gPk9zzxXgI1kimcAltEYr+cjio1imlKpEa9rOipLm+p+CZ6Bw//qd1/f/O+GwMxbSLpyoZEcwkyh2jIks+3hmdd2jWUw4scxNysnHxU7nSspTRcJjCZGL3IsjsYJMMg5mwgx7gaIOLBFCogAgBBoNa9w+DE6I+Bs7FTgwwrJbHjWDgpYo2KwtBTcYEDuloC9geQw+k2RGnPGpTaOlq7AS+YICUz4DZVaX2TiNDhuYfTtY4geLi0IoCm3XccwM9hx4kU28StQEljDs3ZEpFGA+8dKzLmV9ymIwF5FOGn2GdJM8KLHDJbXyiYVMG9MRTLiXGGg2QKaxM3khPSRrwM9zEIardxU2w/EiA0gOeYKHzDR0V7/QGV3lKIA9ktrDArxO3gdA+k6SKoBiVwcm7NjZb9+Hnztg282TuHVZ9LOISFNt9MgyCetZVczSxnyDbl17Penq6mqpg1IhRaEO2aVLUO4/r17H8tTv6f13h71dduvZI3Y+uMdWksNSauLovJw5hsqiPIUvt0ku7/iBeUR3sksmomYWtRbAjbiLfv2lX9/V7LVG4uYnUZXhQ7f2OPCZEx9wrYWTcePEQqPEML8pl4mMdr/jlXlvHiRiJ2+MSTFY4TTSYStuvz2R/JXh+PPeGXm055J+3/YDWuNu3R3DArPutyg0ZgykMVDU9Ndm22+wYalr2rse48CnsTIFcMn73vfhNrktx1EUcZnPv6ah3Yy5cDTRdBEoGoBeah71dqFyjZDJLkWk3N3v4uuktssjWpzciMPxQeHj8nMKzcGuB0tAyzFhdCKOYWv4HwOQVwIxLG99a6uvH3sJCyO3h+k4EZ+G7+xj5f4XXksoaGrdMRzSc8ARA8+cdOuk2x6fffNNt5x+Ro1omPlrT/CQDlcNlpx4NBIWXhkx7Y3Zp3ofNR7Uv89Om/beW0TLIynHv3vs1VsOFpSWSXvfuPUf9BrRFyxgXdHoKJnQFegPOovvzz59ntrzye240ig8UQ3lDI2VqwagrKIQcLXNFL3wglN2OHdBQ6/vI3kENDVBwRb3k1XtczFbjWn4EzMYi7CF3129+JTYuRSdrGuS92g5dpqn6qXoJQs5xmL8p+Wt4hLbt0mx2OLNZR2bbPy8zJNQGFM/f/CfXZekRYFjGCWjIJpM+WiCzGBPWHhoyaAsjRT/B2Gy5yzYJkwUAAAAAElFTkSuQmCC')";
    var aerialCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQALBgIMDQgOBwQOEQcTBwUSCwoVDAwdBw8ZDgUREwYUGAYZFQYZGgkTFQoVGQsZFAwZHBMeDhIbFBEbHAwWIA4bIREcIQ4hCQwjFw4lHBgkDB8sDxUiExIiGhAoGxohFRshGRorHQcrKQsiIQwmKgooJA0pKQ81Jw8yLRMiIxImKxUrJREuKhslJB0rIhooKRUuMBMyLhkwJhozKh48LxUzMRM9MBwzMiUvFCMtGiMwEiwzFCgzHDI+GSIsISkvJSQxIiM2LiY5Jic+Lyk0JSo0Ky49JSs9KSU1NSM7NCs2NS8+NDM1JzU9Ljg7IDJCHS1DLSNAMitCMSxIOjREITZLIDZJKDlFIjpFKztKJT1LKzJBMzpHMD1JMjpKPD1RKjlQNC1DQj5QQEA8MEJGJkBKJUJNK0lLLEJMMkVMPEpONENSLUdZL0pTLkpaLkRUMkRSPEVZMktUM0pVOklZMklZNEpcNU1ZMk1ZNUxfMk5dNkxcOVFUM1RUOFJbNVFZOVNYPVFdOVJdPFVaOVVaPVVdOlVdPVpaNlpdO0phN01hOlBiN1NhPFNoP1piPWFbPmRjPENOQEtPSURTQkJVS0xVQk1VSkxbQkxcS0heUVFXRFRcQlJfTFxeQlpeS05lQk1kSFRjQVRjSlZpQ1tkQlxlSlxpRF1rSVVnUVtlU1llXF9tU1xoXlxwSl9ramRfQmJlQ2FhSWFlSWFlTmVlSWRmTGFoQWFpRWFsRmVpRWVtRmNsSmtlRGpqRmpsS2BmWGRsUmFrW2ptUmZyR2RxTGpxTWVyU2RyW2d5V2tzUmt0WW15VG15WXFuTHNtVnFxTXF4T3h0TnJzUnJ1XHJ4VXN6Wnp0VHx1W315VXp8XGR0YGx0YHVzZXJ0aHR9ZXV+aHl9YHOCXXqBXXeCYHyCY3iEaHyIYn+JaXqKcYB5WIN6Y4SCXoCDZIGEaYCIZoOLa4iCaImJbIOOdYuMco6OeIuVcpOKbZKPc5aQb5eXe5ufg6KjhAAAAAAAAAAAAAAAAOGCeQgAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAH80lEQVRISy1WbXQUVxm+6wqnk3Zmpxl2FG2EGg92C8GDlWptVTwa+uF3xcKmDfFzCUzDsJNsunXipglJXJbrtJWmwZNSnHD3jojRgUIm2UumIZ0JZ7JByrALbMWW0IBW8aRa4+cf76TeX3Nm3uc+z/s+7/vugl4r/aMTrT4e1pPTqnnmJNn5AyUzRnrRle/qE33dsvrBtAQVoxtpZNK3zSzYjUjviWO2Ag+R77dl7W36n/1Ep9KBPG/S+Py0PkjU/gPKQGqwTHryiWYFAXSvMairsio7SjyNsnCzh0qKImV9/7mhfHQZx2yN1O+7rXUm33MUPaboOkAJHaoIdXfJj2xWeyD8jMFEXkvIu5qzpU988gWB5zl+GS+sFe55trEVPdWZB2miq8bBVkNFO2R0qnrfkiXhcJhtDNXE6tbW97/s9O9/7ZfVhx86/CwrROpfvvxboMqeLsuqPr1j44qEwDNMOBximUiYoU8sw7BC/a7T72uEnyJDlGxZ9KcglZRyuqqrv/tSZErgOI4NgRBTIw9EmHAoFGZZnp6aGaJ2GTxfxYs8kKVUQh7WB5hQeC3LsUxoxVKW14l3BX2WcoUYPiZyLLe8teZ+iuT4GGhvV5KpKWkpyzxEr2MZgQ1xdRjfRBoH+2k6lIHjKTHPPBo8CSJISqqq4wGGOcWylIGlgvgNX1Gd8vF5f+IUIwb30ng+Gg2QfBRIMvy0jG8SVkYo4N0zvUXVRztbJ/L6xL7lUZEXBEHkuZqlS6gEAUgKJurnhFtfpACOYd8b/hVbJPqwi44a6KA0sPVjIi/SIyxb3u8KlAJ0S8jRVgrlW+nVHPdrhiXCxu42d86ByksDc80P3MkJFBFQ8Ho1lQegpWJRWFGsDsRwwv7pIyvuQW0ZkrX6NDVFbqcvaQI8vbyqzt5AARrsbKx5yhQEGs+wPO56bOK+0rcwMrOKkpUbZWYxV04UeZZv/cBKFhRL6Qdv9y4LfEDA7/thg7tTmv1a5/GnO0wl0dQg80wglZaHUmxRvjwAHOfyN0mxrpqLUpcjsK3NHYMo4R1o6eho2ZyIb2FoeOC3ILK8kZ2HQMOuWywGXUkJBCeTbYFS0+ym1h2/6UgmvnrvKYZZtIEXGf75C2cIAp5LHNd71x7uPoTjakrWH9e3KFpaatjUvJUysFw0KrLMYMW2lTg4PeUQx6kJEALvxXEmCdVyPLHtCSjBhc01XCjIgafxou+PE6KC1dhxSCwoBCc+N4P3btM84pmdSSjJnjO/nvY4LQfVyz5/I+v6IwjUOMjy+MVCxIbKupTJaEktp7cTKU42Pvjh2m/8cSpC6aPsaX/MHSuUQLVVsIa4RUTs/r/BVAexNdjdnsNG7j/rV93xheLMzKnFrPeTEQchCyCcKb25aAIn7lrAertrZwyNXM8N6zfWrFo3d2SmOEcF83x/r+OOFgrAHYWF7cELjhV7UQo/6WAIUVl9JFl8a//HZ66VpbY3I9QKZqPru77lA+iOWAIr0hKxHCmmr0othSyeIl5y3qt4xT8gSNrKEZozs8Els67rgsLOZ+ygzwMfbtNhobfgzpEyGnz7htPtzUi6PuOoj7K0WF/MXiUFxwGajRD1hjYXHXI9p406qOyinp5/tiWcDHY0jIu4n64Qfq7kliB2gemag9QbOia0PbbDMbd43SHuvxFxrAocxins7MX5Kqbe1QixKBxoV4//PfAgGCu+Rlm4SvZizyDH+0reDHp92iO0BuX3bCfItl0PEwvYLqpwXG2MHlGsQ4S8pMJZv1JGmHiEoHQDdOjwmVlEP/nE9ADKjI8xLI0OOGITfy0SbeG/C2jKUDGSlDhM9I3IpK9iup6XnbRNC7yqueNsJCCIiXzdQhnaGN+46umnEdy5U5UbUJ48LFM9GkJo8BdDOiAZ7ZIQbKhYLMqvhU2wmNxjEAsS2AI7y4nWF64duePbk7YV3zvAVLEMD9AxJRNa3KDUibV7DjnkuprMEYjScFNcaR2ceP2u9R/5k1052Ryme5phAFRswlHjAudiP4dOy7CaxLgdJh9vUlU1702/+LPa1U9fvPi9qlA4XEUBJc3dFlpsR457IDl1iPqLp7o81NQgyV19iYU38uTiv975Pd3SiwQcsGjx+v4/6fl5T7EOOMTCtpbKxfemsQq/3olQZcminADAAI0cuGLHaHOFxbuGvRk/Z9u7CULqoVR6NE0yx1avj30oRhc/jWUoIALGxkz0dg1Dl9iaI7LqOOXKsXJFwjiuEAi70Jra2nW1PL08zLBhZsMABpW5csI7TPfew9ipFKcn5k1i+1KyCWKjC3W/8dF1d666+RaabBVTFTHacjoojBNDh0NDxk+IPTlwfqJkWpbnpFHXIbLbmpxEQ3ff/Z0g/mauXsoln9wDRjy/NHsQFw3P6vWuTJ43/+FZrk2cvAFRipCKdfD9y2+pjRj78s0KdCUDKJvdV91ChngV38T20TM+gghjpJaPlpFr2xbEz5g4A/NGt5rNwdwmYGeeeMXBSLHHUIc+6RsojRH9VTUm3/mLf/64b470XvoxoTKhlMBQ2jMEzo2PjxdGMppmn1RM24bWFJqaQv4BcuJa2Sam7Zokq1ldCsz06NCBHrhwqVQYpfFj42NZexz1EW9SR/kT58nEeQKJb2fPXjjp0u/YUkwHEgLeOnf2nOuf1TRTM02CLKLTPy60/x1CCztqn7Ev+BdsC3m+30decQvW/wBNTwU+CfUQAQAAAABJRU5ErkJggg==')";

    if (options.baseSwitcher) {
        var switcherContent = '<div class="base-map-switcher" title="Toggle Base Layer" style="';
        switcherContent += 'position: absolute; top: 70px; left: 4px; border: solid black 1px; ';
        switcherContent += 'height: 50px; width: 50px; z-index: 10; border-radius: 4px; background: ' + aerialCss + ';';
        switcherContent += '"></div>';
        $mapDiv.append(switcherContent);

        $mapDiv.find('.base-map-switcher').click(function () {
            "use strict";

            osmLayer.setVisible(!osmLayer.getVisible());
            satLayer.setVisible(!satLayer.getVisible());

            if (osmLayer.getVisible()) {
                (0, _jquery2.default)(this).css('background', aerialCss);
            } else {
                (0, _jquery2.default)(this).css('background', osmCss);
            }
        });
    }

    if (options.zoom < 0 || options.zoom > 28) {
        throw 'zoom out of range';
    }

    if (options.center.x >= -180 && options.center.x <= 180 && options.center.y >= -90 && options.center.y <= 90) {
        var p = new _ol2.default.geom.Point([options.center.x, options.center.y]);
        p.transform("EPSG:4326", "EPSG:3857");
        var coordinates = p.getCoordinates();
        options.center.x = coordinates[0];
        options.center.y = coordinates[1];
    }

    var map = new _ol2.default.Map({
        layers: [osmLayer, satLayer],
        target: options.divId,
        controls: _ol2.default.control.defaults({
            attributionOptions: { collapsible: false }
        }),
        view: new _ol2.default.View({
            center: [options.center.x, options.center.y],
            zoom: options.zoom,
            minZoom: options.minZoom,
            maxZoom: options.maxZoom
        })
    });

    if (options.fullScreen) {
        map.addControl(new _ol2.default.control.FullScreen());
    }

    return map;
}

nm.quickMapBase = quickMapBase;
exports.default = quickMapBase;

},{"../jquery":302,"../ol/ol":319,"../util/provide":323}],317:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.zoomToResolution = zoomToResolution;
exports.resolutionToZoom = resolutionToZoom;

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nm = (0, _provide2.default)('olHelpers.zoomResolutionConvert'); /**
                                                                     * Created by gavorhes on 12/14/2015.
                                                                     */

var _zoomResLookup = [156543.03392804097, //0
78271.51696402048, //1
39135.75848201024, //2
19567.87924100512, //3
9783.93962050256, //4
4891.96981025128, //5
2445.98490512564, //6
1222.99245256282, //7
611.49622628141, //8
305.748113140705, //9
152.8740565703525, //10
76.43702828517625, //11
38.21851414258813, //12
19.109257071294063, //13
9.554628535647032, //14
4.777314267823516, //15
2.388657133911758, //16
1.194328566955879, //17
0.5971642834779395, //18
0.29858214173896974, //19
0.14929107086948487, //20
0.07464553543474244, //21
0.03732276771737122, //22
0.01866138385868561, //23
0.009330691929342804, //24
0.004665345964671402, //25
0.002332672982335701, //26
0.0011663364911678506, //27
0.0005831682455839253 //28
];

/**
 * Get the resolution given the zoom level
 * @param {number} zoomLevel - the zoom level
 * @returns {number|*} the map resolution
 */
function zoomToResolution(zoomLevel) {
    "use strict";

    if (typeof zoomLevel == 'number') {
        if (zoomLevel % 1 === 0 && zoomLevel >= 0 && zoomLevel <= 28) {
            return _zoomResLookup[zoomLevel];
        } else {
            console.log('invalid zoom level provided: ' + zoomLevel);

            return undefined;
        }
    } else {
        return undefined;
    }
}
nm.zoomToResolution = zoomToResolution;

/**
 * Get resolution from the zoom level
 * @param {number} resolution - the resolution
 * @returns {number|*} the zoom level
 */
function resolutionToZoom(resolution) {
    for (var i = 0; i < _zoomResLookup.length; i++) {
        if (resolution >= _zoomResLookup[i]) {
            return i;
        }
    }

    return 0;
}

nm.resolutionToZoom = resolutionToZoom;

},{"../util/provide":323}],318:[function(require,module,exports){
// OpenLayers 3. See http://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/ol3/master/LICENSE.md
(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.ol = factory();
  }
}(this, function () {
  var OPENLAYERS = {};
  var p,x=this;function F(b,c,d){b=b.split(".");d=d||x;b[0]in d||!d.execScript||d.execScript("var "+b[0]);for(var e;b.length&&(e=b.shift());)b.length||void 0===c?d[e]?d=d[e]:d=d[e]={}:d[e]=c}function aa(b){b.ua=function(){return b.Ac?b.Ac:b.Ac=new b}}
function ba(b){var c=typeof b;if("object"==c)if(b){if(b instanceof Array)return"array";if(b instanceof Object)return c;var d=Object.prototype.toString.call(b);if("[object Window]"==d)return"object";if("[object Array]"==d||"number"==typeof b.length&&"undefined"!=typeof b.splice&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("splice"))return"array";if("[object Function]"==d||"undefined"!=typeof b.call&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==c&&"undefined"==typeof b.call)return"object";return c}function ca(b){var c=ba(b);return"array"==c||"object"==c&&"number"==typeof b.length}function da(b){return"string"==typeof b}function ea(b){return"number"==typeof b}function ga(b){return"function"==ba(b)}function ha(b){var c=typeof b;return"object"==c&&null!=b||"function"==c}function I(b){return b[ia]||(b[ia]=++ja)}var ia="closure_uid_"+(1E9*Math.random()>>>0),ja=0;function ka(b,c,d){return b.call.apply(b.bind,arguments)}
function la(b,c,d){if(!b)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var d=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(d,e);return b.apply(c,d)}}return function(){return b.apply(c,arguments)}}function ma(b,c,d){ma=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ka:la;return ma.apply(null,arguments)}
function na(b,c){var d=Array.prototype.slice.call(arguments,1);return function(){var c=d.slice();c.push.apply(c,arguments);return b.apply(this,c)}}function M(b,c){function d(){}d.prototype=c.prototype;b.X=c.prototype;b.prototype=new d;b.prototype.constructor=b;b.We=function(b,d,g){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return c.prototype[d].apply(b,h)}};var oa;function pa(){};var qa;var sa=String.prototype.trim?function(b){return b.trim()}:function(b){return b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function ta(b){if(!ua.test(b))return b;-1!=b.indexOf("&")&&(b=b.replace(va,"&amp;"));-1!=b.indexOf("<")&&(b=b.replace(wa,"&lt;"));-1!=b.indexOf(">")&&(b=b.replace(xa,"&gt;"));-1!=b.indexOf('"')&&(b=b.replace(ya,"&quot;"));-1!=b.indexOf("'")&&(b=b.replace(za,"&#39;"));-1!=b.indexOf("\x00")&&(b=b.replace(Aa,"&#0;"));return b}var va=/&/g,wa=/</g,xa=/>/g,ya=/"/g,za=/'/g,Aa=/\x00/g,ua=/[\x00&<>"']/;
function Ba(b,c){return b<c?-1:b>c?1:0};function Ca(b,c,d){return Math.min(Math.max(b,c),d)}var Da=function(){var b;"cosh"in Math?b=Math.cosh:b=function(b){b=Math.exp(b);return(b+1/b)/2};return b}();function Ea(b,c){var d=b%c;return 0>d*c?d+c:d};function Fa(b){return function(c){if(c)return[Ca(c[0],b[0],b[2]),Ca(c[1],b[1],b[3])]}}function Ga(b){return b};function Ha(b,c){return b>c?1:b<c?-1:0}function Ia(b,c,d){var e=b.length;if(b[0]<=c)return 0;if(!(c<=b[e-1]))if(0<d)for(d=1;d<e;++d){if(b[d]<c)return d-1}else if(0>d)for(d=1;d<e;++d){if(b[d]<=c)return d}else for(d=1;d<e;++d){if(b[d]==c)return d;if(b[d]<c)return b[d-1]-c<c-b[d]?d-1:d}return e-1}function Ja(b){return b.reduce(function(b,d){return Array.isArray(d)?b.concat(Ja(d)):b.concat(d)},[])}function Ka(b,c){var d,e=ca(c)?c:[c],f=e.length;for(d=0;d<f;d++)b[b.length]=e[d]}
function La(b,c){var d=b.indexOf(c),e=-1<d;e&&b.splice(d,1);return e}function Ma(b,c){var d=b.length;if(d!==c.length)return!1;for(var e=0;e<d;e++)if(b[e]!==c[e])return!1;return!0}function Na(b){var c=Oa,d=b.length,e=Array(b.length),f;for(f=0;f<d;f++)e[f]={index:f,value:b[f]};e.sort(function(b,d){return c(b.value,d.value)||b.index-d.index});for(f=0;f<b.length;f++)b[f]=e[f].value};function Pa(b){return function(c,d,e){if(void 0!==c)return c=Ia(b,c,e),c=Ca(c+d,0,b.length-1),b[c]}}function Qa(b,c,d){return function(e,f,g){if(void 0!==e)return e=Math.max(Math.floor(Math.log(c/e)/Math.log(b)+(0<g?0:0>g?1:.5))+f,0),void 0!==d&&(e=Math.min(e,d)),c/Math.pow(b,e)}};function Ra(b){if(void 0!==b)return 0}function Sa(b,c){if(void 0!==b)return b+c}function Ta(b){var c=2*Math.PI/b;return function(b,e){if(void 0!==b)return b=Math.floor((b+e)/c+.5)*c}}function Ua(){var b=5*Math.PI/180;return function(c,d){if(void 0!==c)return Math.abs(c+d)<=b?0:c+d}};function Va(b,c,d){this.center=b;this.resolution=c;this.rotation=d};var Wa="function"===typeof Object.assign?Object.assign:function(b,c){if(void 0===b||null===b)throw new TypeError("Cannot convert undefined or null to object");for(var d=Object(b),e=1,f=arguments.length;e<f;++e){var g=arguments[e];if(void 0!==g&&null!==g)for(var h in g)g.hasOwnProperty(h)&&(d[h]=g[h])}return d};function Ya(b){for(var c in b)delete b[c]}function Za(b){var c=[],d;for(d in b)c.push(b[d]);return c}function $a(b){for(var c in b)return!1;return!c};var ab="olm_"+(1E4*Math.random()|0);function bb(b){function c(c){var e=b.listener,f=b.hc||b.target;b.kc&&N(b);return e.call(f,c)}return b.ic=c}function cb(b,c,d,e){for(var f,g=0,h=b.length;g<h;++g)if(f=b[g],f.listener===c&&f.hc===d)return e&&(f.deleteIndex=g),f}function db(b,c){var d=b[ab];return d?d[c]:void 0}function eb(b){var c=b[ab];c||(c=b[ab]={});return c}
function fb(b,c){var d=db(b,c);if(d){for(var e=0,f=d.length;e<f;++e)b.removeEventListener(c,d[e].ic),Ya(d[e]);d.length=0;if(d=b[ab])delete d[c],0===Object.keys(d).length&&delete b[ab]}}function Q(b,c,d,e,f){var g=eb(b),h=g[c];h||(h=g[c]=[]);(g=cb(h,d,e,!1))?f||(g.kc=!1):(g={hc:e,kc:!!f,listener:d,target:b,type:c},b.addEventListener(c,bb(g)),h.push(g));return g}function gb(b,c,d,e){(b=db(b,c))&&(d=cb(b,d,e,!0))&&N(d)}
function N(b){if(b&&b.target){b.target.removeEventListener(b.type,b.ic);var c=db(b.target,b.type);if(c){var d="deleteIndex"in b?b.deleteIndex:c.indexOf(b);-1!==d&&c.splice(d,1);0===c.length&&fb(b.target,b.type)}Ya(b)}}function hb(b){var c=eb(b),d;for(d in c)fb(b,d)};function ib(){}ib.prototype.ja=!1;function jb(b){b.ja||(b.ja=!0,b.J())}ib.prototype.J=pa;function R(b,c){this.type=b;this.target=c||null}R.prototype.preventDefault=R.prototype.stopPropagation=function(){this.xe=!0};function kb(b){b.stopPropagation()}function lb(b){b.preventDefault()};function mb(){this.H={};this.A={}}M(mb,ib);mb.prototype.addEventListener=function(b,c){var d=this.A[b];d||(d=this.A[b]=[]);-1===d.indexOf(c)&&d.push(c)};function S(b,c){var d="string"===typeof c?new R(c):c,e=d.type;d.target=b;var f=b.A[e],g;if(f){e in b.H||(b.H[e]=0);for(var h=0,k=f.length;h<k;++h)if(!1===f[h].call(b,d)||d.xe){g=!1;break}d=b.H[e];for(delete b.H[e];d--;)b.removeEventListener(e,pa);return g}}mb.prototype.J=function(){hb(this)};
function nb(b,c){return c?c in b.A:0<Object.keys(b.A).length}mb.prototype.removeEventListener=function(b,c){var d=this.A[b];if(d){var e=d.indexOf(c);b in this.H?(d[e]=pa,++this.H[b]):(d.splice(e,1),0===d.length&&delete this.A[b])}};function ob(){mb.call(this);this.f=0}M(ob,mb);ob.prototype.v=function(){++this.f;S(this,"change")};ob.prototype.ba=function(b,c,d){if(Array.isArray(b)){for(var e=b.length,f=Array(e),g=0;g<e;++g)f[g]=Q(this,b[g],c,d);return f}return Q(this,b,c,d)};function pb(b,c,d){R.call(this,b);this.key=c;this.oldValue=d}M(pb,R);function T(b){ob.call(this);I(this);this.K={};void 0!==b&&this.l(b)}M(T,ob);var qb={};function rb(b){return qb.hasOwnProperty(b)?qb[b]:qb[b]="change:"+b}T.prototype.get=function(b){var c;this.K.hasOwnProperty(b)&&(c=this.K[b]);return c};T.prototype.za=function(){return Wa({},this.K)};T.prototype.set=function(b,c,d){d?this.K[b]=c:(d=this.K[b],this.K[b]=c,d!==c&&(c=rb(b),S(this,new pb(c,b,d)),S(this,new pb("propertychange",b,d))))};
T.prototype.l=function(b,c){for(var d in b)this.set(d,b[d],c)};function sb(b,c,d){void 0===d&&(d=[0,0]);d[0]=b[0]*c+.5|0;d[1]=b[1]*c+.5|0;return d}function tb(b,c){if(Array.isArray(b))return b;void 0===c?c=[b,b]:(c[0]=b,c[1]=b);return c};function ub(b,c){b[0]+=c[0];b[1]+=c[1]}function vb(b,c){var d=Math.cos(c),e=Math.sin(c),f=b[1]*d+b[0]*e;b[0]=b[0]*d-b[1]*e;b[1]=f};function wb(b){this.length=b.length||b;for(var c=0;c<this.length;c++)this[c]=b[c]||0}wb.prototype.BYTES_PER_ELEMENT=4;wb.prototype.set=function(b,c){c=c||0;for(var d=0;d<b.length&&c+d<this.length;d++)this[c+d]=b[d]};wb.prototype.toString=Array.prototype.join;"undefined"==typeof Float32Array&&(wb.BYTES_PER_ELEMENT=4,wb.prototype.BYTES_PER_ELEMENT=wb.prototype.BYTES_PER_ELEMENT,wb.prototype.set=wb.prototype.set,wb.prototype.toString=wb.prototype.toString,F("Float32Array",wb,void 0));function xb(b){this.length=b.length||b;for(var c=0;c<this.length;c++)this[c]=b[c]||0}xb.prototype.BYTES_PER_ELEMENT=8;xb.prototype.set=function(b,c){c=c||0;for(var d=0;d<b.length&&c+d<this.length;d++)this[c+d]=b[d]};xb.prototype.toString=Array.prototype.join;if("undefined"==typeof Float64Array){try{xb.BYTES_PER_ELEMENT=8}catch(b){}xb.prototype.BYTES_PER_ELEMENT=xb.prototype.BYTES_PER_ELEMENT;xb.prototype.set=xb.prototype.set;xb.prototype.toString=xb.prototype.toString;F("Float64Array",xb,void 0)};function yb(b,c,d,e,f){b[0]=c;b[1]=d;b[2]=e;b[3]=f};function zb(){var b=Array(16);Ab(b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);return b}function Bb(){var b=Array(16);Ab(b,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return b}function Ab(b,c,d,e,f,g,h,k,l,m,n,q,r,u,w,y,z){b[0]=c;b[1]=d;b[2]=e;b[3]=f;b[4]=g;b[5]=h;b[6]=k;b[7]=l;b[8]=m;b[9]=n;b[10]=q;b[11]=r;b[12]=u;b[13]=w;b[14]=y;b[15]=z}
function Cb(b,c){b[0]=c[0];b[1]=c[1];b[2]=c[2];b[3]=c[3];b[4]=c[4];b[5]=c[5];b[6]=c[6];b[7]=c[7];b[8]=c[8];b[9]=c[9];b[10]=c[10];b[11]=c[11];b[12]=c[12];b[13]=c[13];b[14]=c[14];b[15]=c[15]}function Db(b){b[0]=1;b[1]=0;b[2]=0;b[3]=0;b[4]=0;b[5]=1;b[6]=0;b[7]=0;b[8]=0;b[9]=0;b[10]=1;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1}
function Eb(b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],k=b[5],l=b[6],m=b[7],n=b[8],q=b[9],r=b[10],u=b[11],w=b[12],y=b[13],z=b[14],D=b[15],t=d*k-e*h,v=d*l-f*h,B=d*m-g*h,E=e*l-f*k,C=e*m-g*k,G=f*m-g*l,J=n*y-q*w,A=n*z-r*w,H=n*D-u*w,O=q*z-r*y,P=q*D-u*y,L=r*D-u*z,K=t*L-v*P+B*O+E*H-C*A+G*J;0!=K&&(K=1/K,c[0]=(k*L-l*P+m*O)*K,c[1]=(-e*L+f*P-g*O)*K,c[2]=(y*G-z*C+D*E)*K,c[3]=(-q*G+r*C-u*E)*K,c[4]=(-h*L+l*H-m*A)*K,c[5]=(d*L-f*H+g*A)*K,c[6]=(-w*G+z*B-D*v)*K,c[7]=(n*G-r*B+u*v)*K,c[8]=(h*P-k*H+m*J)*K,c[9]=(-d*P+
e*H-g*J)*K,c[10]=(w*C-y*B+D*t)*K,c[11]=(-n*C+q*B-u*t)*K,c[12]=(-h*O+k*A-l*J)*K,c[13]=(d*O-e*A+f*J)*K,c[14]=(-w*E+y*v-z*t)*K,c[15]=(n*E-q*v+r*t)*K)}function Fb(b,c,d){var e=b[1]*c+b[5]*d+0*b[9]+b[13],f=b[2]*c+b[6]*d+0*b[10]+b[14],g=b[3]*c+b[7]*d+0*b[11]+b[15];b[12]=b[0]*c+b[4]*d+0*b[8]+b[12];b[13]=e;b[14]=f;b[15]=g}function Gb(b,c,d){Ab(b,b[0]*c,b[1]*c,b[2]*c,b[3]*c,b[4]*d,b[5]*d,b[6]*d,b[7]*d,1*b[8],1*b[9],1*b[10],1*b[11],b[12],b[13],b[14],b[15])}
function Hb(b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],k=b[5],l=b[6],m=b[7],n=Math.cos(c),q=Math.sin(c);b[0]=d*n+h*q;b[1]=e*n+k*q;b[2]=f*n+l*q;b[3]=g*n+m*q;b[4]=d*-q+h*n;b[5]=e*-q+k*n;b[6]=f*-q+l*n;b[7]=g*-q+m*n}new Float64Array(3);new Float64Array(3);new Float64Array(4);new Float64Array(4);new Float64Array(4);new Float64Array(16);function Ib(b){for(var c=Jb(),d=0,e=b.length;d<e;++d)Kb(c,b[d]);return c}function Lb(b,c,d){return d?(d[0]=b[0]-c,d[1]=b[1]-c,d[2]=b[2]+c,d[3]=b[3]+c,d):[b[0]-c,b[1]-c,b[2]+c,b[3]+c]}function Mb(b,c){return c?(c[0]=b[0],c[1]=b[1],c[2]=b[2],c[3]=b[3],c):b.slice()}function Nb(b,c){return b[0]<=c[0]&&c[2]<=b[2]&&b[1]<=c[1]&&c[3]<=b[3]}function Jb(){return[Infinity,Infinity,-Infinity,-Infinity]}function Ob(b,c,d,e,f){return f?(f[0]=b,f[1]=c,f[2]=d,f[3]=e,f):[b,c,d,e]}
function Pb(b){return Ob(Infinity,Infinity,-Infinity,-Infinity,b)}function Qb(b,c){var d=b[0],e=b[1];return Ob(d,e,d,e,c)}function Rb(b,c){return b[0]==c[0]&&b[2]==c[2]&&b[1]==c[1]&&b[3]==c[3]}function Sb(b,c){c[0]<b[0]&&(b[0]=c[0]);c[2]>b[2]&&(b[2]=c[2]);c[1]<b[1]&&(b[1]=c[1]);c[3]>b[3]&&(b[3]=c[3])}function Kb(b,c){c[0]<b[0]&&(b[0]=c[0]);c[0]>b[2]&&(b[2]=c[0]);c[1]<b[1]&&(b[1]=c[1]);c[1]>b[3]&&(b[3]=c[1])}
function Tb(b,c,d,e,f){for(;d<e;d+=f){var g=b,h=c[d],k=c[d+1];g[0]=Math.min(g[0],h);g[1]=Math.min(g[1],k);g[2]=Math.max(g[2],h);g[3]=Math.max(g[3],k)}return b}function Ub(b){var c=0;b[2]<b[0]||b[3]<b[1]||(c=Vb(b)*Wb(b));return c}function Xb(b){return[b[0],b[1]]}function Yb(b){return[(b[0]+b[2])/2,(b[1]+b[3])/2]}
function Zb(b,c,d,e){var f=c*e[0]/2;e=c*e[1]/2;c=Math.cos(d);var g=Math.sin(d);d=f*c;f*=g;c*=e;var h=e*g,k=b[0],l=b[1];b=k-d+h;e=k-d-h;g=k+d-h;d=k+d+h;var h=l-f-c,k=l-f+c,m=l+f+c,f=l+f-c;return Ob(Math.min(b,e,g,d),Math.min(h,k,m,f),Math.max(b,e,g,d),Math.max(h,k,m,f),void 0)}function Wb(b){return b[3]-b[1]}function $b(b,c){var d=Jb();ac(b,c)&&(d[0]=b[0]>c[0]?b[0]:c[0],d[1]=b[1]>c[1]?b[1]:c[1],d[2]=b[2]<c[2]?b[2]:c[2],d[3]=b[3]<c[3]?b[3]:c[3]);return d}function bc(b){return[b[0],b[3]]}
function Vb(b){return b[2]-b[0]}function ac(b,c){return b[0]<=c[2]&&b[2]>=c[0]&&b[1]<=c[3]&&b[3]>=c[1]};function cc(){return!0}function dc(){return!1};/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function ec(b){this.radius=b}function fc(b,c){var d=b[1]*Math.PI/180,e=c[1]*Math.PI/180,f=(e-d)/2,g=(c[0]-b[0])*Math.PI/180/2,d=Math.sin(f)*Math.sin(f)+Math.sin(g)*Math.sin(g)*Math.cos(d)*Math.cos(e);return 2*gc.radius*Math.atan2(Math.sqrt(d),Math.sqrt(1-d))}
ec.prototype.offset=function(b,c,d){var e=b[1]*Math.PI/180;c/=this.radius;var f=Math.asin(Math.sin(e)*Math.cos(c)+Math.cos(e)*Math.sin(c)*Math.cos(d));return[180*(b[0]*Math.PI/180+Math.atan2(Math.sin(d)*Math.sin(c)*Math.cos(e),Math.cos(c)-Math.sin(e)*Math.sin(f)))/Math.PI,180*f/Math.PI]};var gc=new ec(6370997);var hc={};hc.degrees=2*Math.PI*gc.radius/360;hc.ft=.3048;hc.m=1;hc["us-ft"]=1200/3937;
function ic(b){this.qa=b.code;this.b=b.units;this.h=void 0!==b.extent?b.extent:null;this.f=void 0!==b.global?b.global:!1;this.a=!(!this.f||!this.h);this.i=void 0!==b.getPointResolution?b.getPointResolution:this.j;this.c=null;this.g=b.metersPerUnit;var c=jc,d=b.code,e=kc||x.proj4;if("function"==typeof e&&void 0===c[d]){var f=e.defs(d);if(void 0!==f){void 0===b.metersPerUnit&&(this.g=f.to_meter);void 0===b.units&&(this.b=f.units);var g,h;for(g in c)if(b=e.defs(g),void 0!==b)if(c=lc(g),b===f)mc([c,this]);
else{h=e(g,d);b=h.forward;h=h.inverse;var c=lc(c),k=lc(this);nc(c,k,oc(b));nc(k,c,oc(h))}}}}ic.prototype.l=function(){return this.qa};ic.prototype.C=function(){return this.h};function pc(b){return b.g||hc[b.b]}ic.prototype.j=function(b,c){if("degrees"==this.b)return b;var d=qc(this,lc("EPSG:4326")),e=[c[0]-b/2,c[1],c[0]+b/2,c[1],c[0],c[1]-b/2,c[0],c[1]+b/2],e=d(e,e,2),d=(fc(e.slice(0,2),e.slice(2,4))+fc(e.slice(4,6),e.slice(6,8)))/2,e=pc(this);void 0!==e&&(d/=e);return d};
ic.prototype.getPointResolution=function(b,c){return this.i(b,c)};var jc={},rc={},kc=null;function mc(b){sc(b);b.forEach(function(c){b.forEach(function(b){c!==b&&nc(c,b,tc)})})}function uc(b){jc[b.qa]=b;nc(b,b,tc)}function sc(b){var c=[];b.forEach(function(b){c.push(uc(b))})}function vc(b){return b?"string"===typeof b?lc(b):b:lc("EPSG:3857")}function nc(b,c,d){b=b.qa;c=c.qa;b in rc||(rc[b]={});rc[b][c]=d}
function oc(b){return function(c,d,e){var f=c.length;e=void 0!==e?e:2;d=void 0!==d?d:Array(f);var g,h;for(h=0;h<f;h+=e)for(g=b([c[h],c[h+1]]),d[h]=g[0],d[h+1]=g[1],g=e-1;2<=g;--g)d[h+g]=c[h+g];return d}}function lc(b){var c;if(b instanceof ic)c=b;else if("string"===typeof b){c=jc[b];var d=kc||x.proj4;void 0===c&&"function"==typeof d&&void 0!==d.defs(b)&&(c=new ic({code:b}),uc(c))}else c=null;return c}function wc(b,c){if(b===c)return!0;var d=b.b===c.b;return b.qa===c.qa?d:qc(b,c)===tc&&d}
function xc(b,c){var d=lc(b),e=lc(c);return qc(d,e)}function qc(b,c){var d=b.qa,e=c.qa,f;d in rc&&e in rc[d]&&(f=rc[d][e]);void 0===f&&(f=yc);return f}function yc(b,c){if(void 0!==c&&b!==c){for(var d=0,e=b.length;d<e;++d)c[d]=b[d];b=c}return b}function tc(b,c){var d;if(void 0!==c){d=0;for(var e=b.length;d<e;++d)c[d]=b[d];d=c}else d=b.slice();return d};function zc(){T.call(this);this.u=Jb();this.w=-1;this.h={};this.s=this.i=0}M(zc,T);zc.prototype.C=function(b){this.w!=this.f&&(this.u=this.ib(this.u),this.w=this.f);var c=this.u;b?(b[0]=c[0],b[1]=c[1],b[2]=c[2],b[3]=c[3]):b=c;return b};zc.prototype.o=function(b,c){this.Eb(xc(b,c));return this};function Ac(b,c,d,e,f,g){var h=f[0],k=f[1],l=f[4],m=f[5],n=f[12];f=f[13];for(var q=g?g:[],r=0;c<d;c+=e){var u=b[c],w=b[c+1];q[r++]=h*u+l*w+n;q[r++]=k*u+m*w+f}g&&q.length!=r&&(q.length=r);return q};function Bc(){zc.call(this);this.g="XY";this.b=2;this.a=null}M(Bc,zc);function Cc(b){if("XY"==b)return 2;if("XYZ"==b||"XYM"==b)return 3;if("XYZM"==b)return 4}p=Bc.prototype;p.ib=function(b){var c=this.a,d=this.a.length,e=this.b;b=Pb(b);return Tb(b,c,0,d,e)};
p.Ob=function(b){this.s!=this.f&&(Ya(this.h),this.i=0,this.s=this.f);if(0>b||0!==this.i&&b<=this.i)return this;var c=b.toString();if(this.h.hasOwnProperty(c))return this.h[c];var d=this.Ma(b);if(d.a.length<this.a.length)return this.h[c]=d;this.i=b;return this};p.Ma=function(){return this};function U(b,c,d){b.b=Cc(c);b.g=c;b.a=d}function Dc(b,c,d,e){if(c)d=Cc(c);else{for(c=0;c<e;++c){if(0===d.length){b.g="XY";b.b=2;return}d=d[0]}d=d.length;c=2==d?"XY":3==d?"XYZ":4==d?"XYZM":void 0}b.g=c;b.b=d}
p.Eb=function(b){this.a&&(b(this.a,this.a,this.b),this.v())};p.rotate=function(b,c){var d=this.a;if(d){for(var e=d.length,f=this.b,g=d?d:[],h=Math.cos(b),k=Math.sin(b),l=c[0],m=c[1],n=0,q=0;q<e;q+=f){var r=d[q]-l,u=d[q+1]-m;g[n++]=l+r*h-u*k;g[n++]=m+r*k+u*h;for(r=q+2;r<q+f;++r)g[n++]=d[r]}d&&g.length!=n&&(g.length=n);this.v()}};function Ec(b,c){var d=0,e,f;e=0;for(f=c.length;e<f;++e)b[d++]=c[e];return d}function Fc(b,c,d,e){var f,g;f=0;for(g=d.length;f<g;++f){var h=d[f],k;for(k=0;k<e;++k)b[c++]=h[k]}return c}function Gc(b,c,d,e,f){f=f?f:[];var g=0,h,k;h=0;for(k=d.length;h<k;++h)c=Fc(b,c,d[h],e),f[g++]=c;f.length=g;return f};function Hc(b,c,d,e,f){f=void 0!==f?f:[];for(var g=0;c<d;c+=e)f[g++]=b.slice(c,c+e);f.length=g;return f}function Ic(b,c,d,e,f){f=void 0!==f?f:[];var g=0,h,k;h=0;for(k=d.length;h<k;++h){var l=d[h];f[g++]=Hc(b,c,l,e,f[g]);c=l}f.length=g;return f};function Jc(b,c,d,e,f,g,h){var k=(d-c)/e;if(3>k){for(;c<d;c+=e)g[h++]=b[c],g[h++]=b[c+1];return h}var l=Array(k);l[0]=1;l[k-1]=1;d=[c,d-e];for(var m=0,n;0<d.length;){var q=d.pop(),r=d.pop(),u=0,w=b[r],y=b[r+1],z=b[q],D=b[q+1];for(n=r+e;n<q;n+=e){var t,v=b[n];t=b[n+1];var B=w,E=y,C=z-B,G=D-E;if(0!==C||0!==G){var J=((v-B)*C+(t-E)*G)/(C*C+G*G);1<J?(B=z,E=D):0<J&&(B+=C*J,E+=G*J)}v=B-v;t=E-t;t=v*v+t*t;t>u&&(m=n,u=t)}u>f&&(l[(m-c)/e]=1,r+e<m&&d.push(r,m),m+e<q&&d.push(m,q))}for(n=0;n<k;++n)l[n]&&(g[h++]=
b[c+n*e],g[h++]=b[c+n*e+1]);return h}
function Kc(b,c,d,e,f,g,h,k){var l,m;l=0;for(m=d.length;l<m;++l){var n=d[l];a:{var q=b,r=n,u=e,w=f,y=g;if(c!=r){var z=w*Math.round(q[c]/w),D=w*Math.round(q[c+1]/w);c+=u;y[h++]=z;y[h++]=D;var t=void 0,v=void 0;do if(t=w*Math.round(q[c]/w),v=w*Math.round(q[c+1]/w),c+=u,c==r){y[h++]=t;y[h++]=v;break a}while(t==z&&v==D);for(;c<r;){var B,E;B=w*Math.round(q[c]/w);E=w*Math.round(q[c+1]/w);c+=u;if(B!=t||E!=v){var C=t-z,G=v-D,J=B-z,A=E-D;C*A==G*J&&(0>C&&J<C||C==J||0<C&&J>C)&&(0>G&&A<G||G==A||0<G&&A>G)||(y[h++]=
t,y[h++]=v,z=t,D=v);t=B;v=E}}y[h++]=t;y[h++]=v}}k.push(h);c=n}return h};function Lc(b,c){Bc.call(this);this.W(b,c)}M(Lc,Bc);p=Lc.prototype;p.clone=function(){var b=new Lc(null);U(b,this.g,this.a.slice());b.v();return b};p.ra=function(){return Hc(this.a,0,this.a.length,this.b)};p.Ma=function(b){var c=[];c.length=Jc(this.a,0,this.a.length,this.b,b,c,0);b=new Lc(null);U(b,"XY",c);b.v();return b};p.U=function(){return"LinearRing"};p.W=function(b,c){b?(Dc(this,c,b,1),this.a||(this.a=[]),this.a.length=Fc(this.a,0,b,this.b)):U(this,"XY",null);this.v()};function Mc(b,c){Bc.call(this);this.W(b,c)}M(Mc,Bc);p=Mc.prototype;p.clone=function(){var b=new Mc(null);U(b,this.g,this.a.slice());b.v();return b};p.ra=function(){return this.a?this.a.slice():[]};p.ib=function(b){return Qb(this.a,b)};p.U=function(){return"Point"};p.W=function(b,c){b?(Dc(this,c,b,0),this.a||(this.a=[]),this.a.length=Ec(this.a,b)):U(this,"XY",null);this.v()};function Nc(b,c,d,e,f,g){for(var h=!1,k=b[d-e],l=b[d-e+1];c<d;c+=e){var m=b[c],n=b[c+1];l>g!=n>g&&f<(m-k)*(g-l)/(n-l)+k&&(h=!h);k=m;l=n}return h};function Oc(b,c,d,e,f,g,h){var k,l,m,n,q,r=f[g+1],u=[],w=d[0];m=b[w-e];q=b[w-e+1];for(k=c;k<w;k+=e){n=b[k];l=b[k+1];if(r<=q&&l<=r||q<=r&&r<=l)m=(r-q)/(l-q)*(n-m)+m,u.push(m);m=n;q=l}w=NaN;q=-Infinity;u.sort(Ha);m=u[0];k=1;for(l=u.length;k<l;++k){n=u[k];var y=Math.abs(n-m);if(y>q){m=(m+n)/2;var z;a:if(0!==d.length&&Nc(b,c,d[0],e,m,r)){var D=z=void 0;z=1;for(D=d.length;z<D;++z)if(Nc(b,d[z-1],d[z],e,m,r)){z=!1;break a}z=!0}else z=!1;z&&(w=m,q=y)}m=n}isNaN(w)&&(w=f[g]);return h?(h.push(w,r),h):[w,r]}
;function Pc(b,c,d,e){for(var f=0,g=b[d-e],h=b[d-e+1];c<d;c+=e)var k=b[c],l=b[c+1],f=f+(k-g)*(l+h),g=k,h=l;return 0<f}function Qc(b,c,d,e){var f=0;e=void 0!==e?e:!1;var g,h;g=0;for(h=c.length;g<h;++g){var k=c[g],f=Pc(b,f,k,d);if(0===g){if(e&&f||!e&&!f)return!1}else if(e&&!f||!e&&f)return!1;f=k}return!0}
function Rc(b,c,d,e,f){f=void 0!==f?f:!1;var g,h;g=0;for(h=d.length;g<h;++g){var k=d[g],l=Pc(b,c,k,e);if(0===g?f&&l||!f&&!l:f&&!l||!f&&l)for(var l=b,m=k,n=e;c<m-n;){var q;for(q=0;q<n;++q){var r=l[c+q];l[c+q]=l[m-n+q];l[m-n+q]=r}c+=n;m-=n}c=k}return c}function Sc(b,c,d,e){var f=0,g,h;g=0;for(h=c.length;g<h;++g)f=Rc(b,f,c[g],d,e);return f};function Tc(b,c){Bc.call(this);this.c=[];this.B=-1;this.D=null;this.G=-1;this.j=null;this.W(b,c)}M(Tc,Bc);p=Tc.prototype;p.clone=function(){var b=new Tc(null);Uc(b,this.g,this.a.slice(),this.c.slice());return b};p.ra=function(b){var c;void 0!==b?(c=Vc(this).slice(),Rc(c,0,this.c,this.b,b)):c=this.a;return Ic(c,0,this.c,this.b)};p.ab=function(){return this.c};function Wc(b){if(b.B!=b.f){var c=Yb(b.C());b.D=Oc(Vc(b),0,b.c,b.b,c,0);b.B=b.f}return b.D}
function Vc(b){if(b.G!=b.f){var c=b.a;Qc(c,b.c,b.b)?b.j=c:(b.j=c.slice(),b.j.length=Rc(b.j,0,b.c,b.b));b.G=b.f}return b.j}p.Ma=function(b){var c=[],d=[];c.length=Kc(this.a,0,this.c,this.b,Math.sqrt(b),c,0,d);b=new Tc(null);Uc(b,"XY",c,d);return b};p.U=function(){return"Polygon"};p.W=function(b,c){if(b){Dc(this,c,b,2);this.a||(this.a=[]);var d=Gc(this.a,0,b,this.b,this.c);this.a.length=0===d.length?0:d[d.length-1];this.v()}else Uc(this,"XY",null,this.c)};function Uc(b,c,d,e){U(b,c,d);b.c=e;b.v()};function V(b){T.call(this);b=b||{};this.g=[0,0];var c={};c.center=void 0!==b.center?b.center:null;this.h=vc(b.projection);var d,e,f,g=void 0!==b.minZoom?b.minZoom:0;d=void 0!==b.maxZoom?b.maxZoom:28;var h=void 0!==b.zoomFactor?b.zoomFactor:2;if(void 0!==b.resolutions)d=b.resolutions,e=d[0],f=d[d.length-1],d=Pa(d);else{e=vc(b.projection);f=e.C();var k=(f?Math.max(Vb(f),Wb(f)):360*hc.degrees/pc(e))/256/Math.pow(2,0),l=k/Math.pow(2,28);e=b.maxResolution;void 0!==e?g=0:e=k/Math.pow(h,g);f=b.minResolution;
void 0===f&&(f=void 0!==b.maxZoom?void 0!==b.maxResolution?e/Math.pow(h,d):k/Math.pow(h,d):l);d=g+Math.floor(Math.log(e/f)/Math.log(h));f=e/Math.pow(h,d-g);d=Qa(h,e,d-g)}this.b=e;this.i=f;this.c=g;g=void 0!==b.extent?Fa(b.extent):Ga;(void 0!==b.enableRotation?b.enableRotation:1)?(e=b.constrainRotation,e=void 0===e||!0===e?Ua():!1===e?Sa:ea(e)?Ta(e):Sa):e=Ra;this.a=new Va(g,d,e);void 0!==b.resolution?c.resolution=b.resolution:void 0!==b.zoom&&(c.resolution=this.constrainResolution(this.b,b.zoom-this.c));
c.rotation=void 0!==b.rotation?b.rotation:0;this.l(c)}M(V,T);p=V.prototype;p.constrainResolution=function(b,c,d){return this.a.resolution(b,c||0,d||0)};p.constrainRotation=function(b,c){return this.a.rotation(b,c||0)};p.ia=function(){return this.get("center")};p.jc=function(b){var c=this.ia(),d=this.I(),e=this.Z();return Zb(c,d,e,b)};p.le=function(){return this.h};p.I=function(){return this.get("resolution")};function Xc(b,c){return Math.max(Vb(b)/c[0],Wb(b)/c[1])}p.Z=function(){return this.get("rotation")};
p.N=function(){var b=this.ia(),c=this.h,d=this.I(),e=this.Z();return{center:[Math.round(b[0]/d)*d,Math.round(b[1]/d)*d],projection:void 0!==c?c:null,resolution:d,rotation:e}};p.wd=function(){var b,c=this.I();if(void 0!==c){var d,e=0;do{d=this.constrainResolution(this.b,e);if(d==c){b=e;break}++e}while(d>this.i)}return void 0!==b?this.c+b:b};
p.nd=function(b,c,d){if(!(b instanceof Bc)){var e=b[0],f=b[1],g=b[2],h=b[3],e=[e,f,e,h,g,h,g,f,e,f],f=new Tc(null);Uc(f,"XY",e,[e.length]);b=f}e=d||{};d=void 0!==e.padding?e.padding:[0,0,0,0];var h=void 0!==e.constrainResolution?e.constrainResolution:!0,f=void 0!==e.nearest?e.nearest:!1,k;void 0!==e.minResolution?k=e.minResolution:void 0!==e.maxZoom?k=this.constrainResolution(this.b,e.maxZoom-this.c,0):k=0;var l=b.a,g=this.Z(),e=Math.cos(-g),g=Math.sin(-g),m=Infinity,n=Infinity,q=-Infinity,r=-Infinity;
b=b.b;for(var u=0,w=l.length;u<w;u+=b)var y=l[u]*e-l[u+1]*g,z=l[u]*g+l[u+1]*e,m=Math.min(m,y),n=Math.min(n,z),q=Math.max(q,y),r=Math.max(r,z);c=Xc([m,n,q,r],[c[0]-d[1]-d[3],c[1]-d[0]-d[2]]);c=isNaN(c)?k:Math.max(c,k);h&&(k=this.constrainResolution(c,0,0),!f&&k<c&&(k=this.constrainResolution(k,-1,0)),c=k);Yc(this,c);g=-g;k=(m+q)/2+(d[1]-d[3])/2*c;c=(n+r)/2+(d[0]-d[2])/2*c;this.oa([k*e-c*g,c*e+k*g])};
p.rotate=function(b,c){if(void 0!==c){var d,e=this.ia();void 0!==e&&(d=[e[0]-c[0],e[1]-c[1]],vb(d,b-this.Z()),ub(d,c));this.oa(d)}this.set("rotation",b)};p.oa=function(b){this.set("center",b)};function Zc(b,c){b.g[1]+=c}function Yc(b,c){b.set("resolution",c)}p.Ee=function(b){b=this.constrainResolution(this.b,b-this.c,0);Yc(this,b)};function $c(b){return 1-Math.pow(1-b,3)}function ad(b){return 3*b*b-2*b*b*b}function bd(b){return b};function cd(b){var c=b.source,d=b.start?b.start:Date.now(),e=c[0],f=c[1],g=void 0!==b.duration?b.duration:1E3,h=b.easing?b.easing:ad;return function(b,c){if(c.time<d)return c.animate=!0,c.viewHints[0]+=1,!0;if(c.time<d+g){var m=1-h((c.time-d)/g),n=e-c.viewState.center[0],q=f-c.viewState.center[1];c.animate=!0;c.viewState.center[0]+=m*n;c.viewState.center[1]+=m*q;c.viewHints[0]+=1;return!0}return!1}}
function dd(b){var c=b.rotation?b.rotation:0,d=b.start?b.start:Date.now(),e=void 0!==b.duration?b.duration:1E3,f=b.easing?b.easing:ad,g=b.anchor?b.anchor:null;return function(b,k){if(k.time<d)return k.animate=!0,k.viewHints[0]+=1,!0;if(k.time<d+e){var l=1-f((k.time-d)/e),l=(c-k.viewState.rotation)*l;k.animate=!0;k.viewState.rotation+=l;if(g){var m=k.viewState.center;m[0]-=g[0];m[1]-=g[1];vb(m,l);ub(m,g)}k.viewHints[0]+=1;return!0}return!1}}
function ed(b){var c=b.resolution,d=b.start?b.start:Date.now(),e=void 0!==b.duration?b.duration:1E3,f=b.easing?b.easing:ad;return function(b,h){if(h.time<d)return h.animate=!0,h.viewHints[0]+=1,!0;if(h.time<d+e){var k=1-f((h.time-d)/e),l=c-h.viewState.resolution;h.animate=!0;h.viewState.resolution+=k*l;h.viewHints[0]+=1;return!0}return!1}};function fd(b,c,d,e){this.a=b;this.f=c;this.b=d;this.c=e}function gd(b,c,d){return b.a<=c&&c<=b.f&&b.b<=d&&d<=b.c}function hd(b,c){return b.a==c.a&&b.b==c.b&&b.f==c.f&&b.c==c.c}fd.prototype.ha=function(){return this.f-this.a+1};function id(b,c){return b.a<=c.f&&b.f>=c.a&&b.b<=c.c&&b.c>=c.b};function jd(b){this.b=b.html;this.a=b.tileRanges?b.tileRanges:null};function kd(b,c,d){R.call(this,b,d);this.element=c}M(kd,R);function ld(b){T.call(this);this.a=b?b:[];md(this)}M(ld,T);p=ld.prototype;p.clear=function(){for(;0<this.get("length");)this.pop()};function nd(b,c,d){b.a.forEach(c,d)}p.item=function(b){return this.a[b]};p.pop=function(){return od(this,this.get("length")-1)};p.push=function(b){var c=this.a.length;this.a.splice(c,0,b);md(this);S(this,new kd("add",b,this));return c};
p.remove=function(b){var c=this.a,d,e;d=0;for(e=c.length;d<e;++d)if(c[d]===b)return od(this,d)};function od(b,c){var d=b.a[c];b.a.splice(c,1);md(b);S(b,new kd("remove",d,b));return d}function md(b){b.set("length",b.a.length)};function pd(b,c){Array.prototype.forEach.call(b,c,void 0)}function qd(b){var c=b.length;if(0<c){for(var d=Array(c),e=0;e<c;e++)d[e]=b[e];return d}return[]}function rd(b,c,d){return 2>=arguments.length?Array.prototype.slice.call(b,c):Array.prototype.slice.call(b,c,d)};var sd=/^#(?:[0-9a-f]{3}){1,2}$/i,td=/^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i,ud=/^(?:rgba)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|1|0\.\d{0,10})\)$/i;function vd(b){if("string"!==typeof b){var c=b[0];c!=(c|0)&&(c=c+.5|0);var d=b[1];d!=(d|0)&&(d=d+.5|0);var e=b[2];e!=(e|0)&&(e=e+.5|0);b="rgba("+c+","+d+","+e+","+(void 0===b[3]?1:b[3])+")"}return b}
var xd=function(){var b={},c=0;return function(d){var e;if(b.hasOwnProperty(d))e=b[d];else{if(1024<=c){e=0;for(var f in b)0===(e++&3)&&(delete b[f],--c)}var g,h;sd.exec(d)?(h=3==d.length-1?1:2,e=parseInt(d.substr(1+0*h,h),16),f=parseInt(d.substr(1+1*h,h),16),g=parseInt(d.substr(1+2*h,h),16),1==h&&(e=(e<<4)+e,f=(f<<4)+f,g=(g<<4)+g),e=[e,f,g,1]):(h=ud.exec(d))?(e=Number(h[1]),f=Number(h[2]),g=Number(h[3]),h=Number(h[4]),e=[e,f,g,h],e=wd(e,e)):(h=td.exec(d))?(e=Number(h[1]),f=Number(h[2]),g=Number(h[3]),
e=[e,f,g,1],e=wd(e,e)):e=void 0;b[d]=e;++c}return e}}();function wd(b,c){var d=c||[];d[0]=Ca(b[0]+.5|0,0,255);d[1]=Ca(b[1]+.5|0,0,255);d[2]=Ca(b[2]+.5|0,0,255);d[3]=Ca(b[3],0,1);return d};function yd(b){return"string"===typeof b||b instanceof CanvasPattern||b instanceof CanvasGradient?b:vd(b)};var zd;a:{var Ad=x.navigator;if(Ad){var Bd=Ad.userAgent;if(Bd){zd=Bd;break a}}zd=""}function W(b){return-1!=zd.indexOf(b)};function Cd(b,c){for(var d in b)c.call(void 0,b[d],d,b)}var Dd="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ed(b,c){for(var d,e,f=1;f<arguments.length;f++){e=arguments[f];for(d in e)b[d]=e[d];for(var g=0;g<Dd.length;g++)d=Dd[g],Object.prototype.hasOwnProperty.call(e,d)&&(b[d]=e[d])}};var Fd=W("Opera")||W("OPR"),Gd=W("Trident")||W("MSIE"),Hd=W("Edge"),Id=W("Gecko")&&!(-1!=zd.toLowerCase().indexOf("webkit")&&!W("Edge"))&&!(W("Trident")||W("MSIE"))&&!W("Edge"),Jd=-1!=zd.toLowerCase().indexOf("webkit")&&!W("Edge");function Kd(){var b=x.document;return b?b.documentMode:void 0}var Ld;
a:{var Md="",Nd=function(){var b=zd;if(Id)return/rv\:([^\);]+)(\)|;)/.exec(b);if(Hd)return/Edge\/([\d\.]+)/.exec(b);if(Gd)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(b);if(Jd)return/WebKit\/(\S+)/.exec(b);if(Fd)return/(?:Version)[ \/]?(\S+)/.exec(b)}();Nd&&(Md=Nd?Nd[1]:"");if(Gd){var Od=Kd();if(null!=Od&&Od>parseFloat(Md)){Ld=String(Od);break a}}Ld=Md}var Pd={};
function Qd(b){var c;if(!(c=Pd[b])){c=0;for(var d=sa(String(Ld)).split("."),e=sa(String(b)).split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var h=d[g]||"",k=e[g]||"",l=RegExp("(\\d*)(\\D*)","g"),m=RegExp("(\\d*)(\\D*)","g");do{var n=l.exec(h)||["","",""],q=m.exec(k)||["","",""];if(0==n[0].length&&0==q[0].length)break;c=Ba(0==n[1].length?0:parseInt(n[1],10),0==q[1].length?0:parseInt(q[1],10))||Ba(0==n[2].length,0==q[2].length)||Ba(n[2],q[2])}while(0==c)}c=Pd[b]=0<=c}return c}
var Rd=x.document,Sd=Rd&&Gd?Kd()||("CSS1Compat"==Rd.compatMode?parseInt(Ld,10):5):void 0;var Td=!Gd||9<=Number(Sd);!Id&&!Gd||Gd&&9<=Number(Sd)||Id&&Qd("1.9.1");Gd&&Qd("9");function Ud(b,c){this.x=void 0!==b?b:0;this.y=void 0!==c?c:0}p=Ud.prototype;p.clone=function(){return new Ud(this.x,this.y)};p.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};p.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};p.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};p.scale=function(b,c){var d=ea(c)?c:b;this.x*=b;this.y*=d;return this};function Vd(b,c){this.width=b;this.height=c}p=Vd.prototype;p.clone=function(){return new Vd(this.width,this.height)};p.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};p.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};p.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};p.scale=function(b,c){var d=ea(c)?c:b;this.width*=b;this.height*=d;return this};function Wd(b){return b?new Xd(Yd(b)):qa||(qa=new Xd)}function Zd(b){var c=document;return da(b)?c.getElementById(b):b}function $d(b,c){Cd(c,function(c,e){"style"==e?b.style.cssText=c:"class"==e?b.className=c:"for"==e?b.htmlFor=c:ae.hasOwnProperty(e)?b.setAttribute(ae[e],c):0==e.lastIndexOf("aria-",0)||0==e.lastIndexOf("data-",0)?b.setAttribute(e,c):b[e]=c})}
var ae={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
function be(b,c,d){var e=arguments,f=document,g=e[0],h=e[1];if(!Td&&h&&(h.name||h.type)){g=["<",g];h.name&&g.push(' name="',ta(h.name),'"');if(h.type){g.push(' type="',ta(h.type),'"');var k={};Ed(k,h);delete k.type;h=k}g.push(">");g=g.join("")}g=f.createElement(g);h&&(da(h)?g.className=h:"array"==ba(h)?g.className=h.join(" "):$d(g,h));2<e.length&&ce(f,g,e);return g}
function ce(b,c,d){function e(d){d&&c.appendChild(da(d)?b.createTextNode(d):d)}for(var f=2;f<d.length;f++){var g=d[f];!ca(g)||ha(g)&&0<g.nodeType?e(g):pd(de(g)?qd(g):g,e)}}function ee(b){for(var c;c=b.firstChild;)b.removeChild(c)}function fe(b,c,d){b.insertBefore(c,b.childNodes[d]||null)}function ge(b){b&&b.parentNode&&b.parentNode.removeChild(b)}function he(b,c){var d=c.parentNode;d&&d.replaceChild(b,c)}
function ie(b,c){if(!b||!c)return!1;if(b.contains&&1==c.nodeType)return b==c||b.contains(c);if("undefined"!=typeof b.compareDocumentPosition)return b==c||!!(b.compareDocumentPosition(c)&16);for(;c&&b!=c;)c=c.parentNode;return c==b}function Yd(b){return 9==b.nodeType?b:b.ownerDocument||b.document}function de(b){if(b&&"number"==typeof b.length){if(ha(b))return"function"==typeof b.item||"string"==typeof b.item;if(ga(b))return"function"==typeof b.item}return!1}
function Xd(b){this.a=b||x.document||document}Xd.prototype.appendChild=function(b,c){b.appendChild(c)};function je(b,c,d,e){this.top=b;this.right=c;this.bottom=d;this.left=e}p=je.prototype;p.ha=function(){return this.right-this.left};p.clone=function(){return new je(this.top,this.right,this.bottom,this.left)};p.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};
p.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};p.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};p.scale=function(b,c){var d=ea(c)?c:b;this.left*=b;this.right*=b;this.top*=d;this.bottom*=d;return this};function ke(b,c){var d=Yd(b);return d.defaultView&&d.defaultView.getComputedStyle&&(d=d.defaultView.getComputedStyle(b,null))?d[c]||d.getPropertyValue(c)||"":""}function le(b){var c;try{c=b.getBoundingClientRect()}catch(d){return{left:0,top:0,right:0,bottom:0}}Gd&&b.ownerDocument.body&&(b=b.ownerDocument,c.left-=b.documentElement.clientLeft+b.body.clientLeft,c.top-=b.documentElement.clientTop+b.body.clientTop);return c}
function me(b){var c=ne;if("none"!=(ke(b,"display")||(b.currentStyle?b.currentStyle.display:null)||b.style&&b.style.display))return c(b);var d=b.style,e=d.display,f=d.visibility,g=d.position;d.visibility="hidden";d.position="absolute";d.display="inline";b=c(b);d.display=e;d.position=g;d.visibility=f;return b}function ne(b){var c=b.offsetWidth,d=b.offsetHeight,e=Jd&&!c&&!d;return(void 0===c||e)&&b.getBoundingClientRect?(b=le(b),new Vd(b.right-b.left,b.bottom-b.top)):new Vd(c,d)}
function oe(b,c){b.style.display=c?"":"none"}function pe(b,c,d,e){if(/^\d+px?$/.test(c))return parseInt(c,10);var f=b.style[d],g=b.runtimeStyle[d];b.runtimeStyle[d]=b.currentStyle[d];b.style[d]=c;c=b.style[e];b.style[d]=f;b.runtimeStyle[d]=g;return c}function qe(b,c){var d=b.currentStyle?b.currentStyle[c]:null;return d?pe(b,d,"left","pixelLeft"):0}var re={thin:2,medium:4,thick:6};
function se(b,c){if("none"==(b.currentStyle?b.currentStyle[c+"Style"]:null))return 0;var d=b.currentStyle?b.currentStyle[c+"Width"]:null;return d in re?re[d]:pe(b,d,"left","pixelLeft")};function te(b,c,d){R.call(this,b);this.map=c;this.frameState=void 0!==d?d:null}M(te,R);function ue(b){T.call(this);this.element=b.element?b.element:null;this.c=this.B=null;this.h=[];this.render=b.render?b.render:pa;b.target&&(this.B=Zd(b.target))}M(ue,T);ue.prototype.J=function(){ge(this.element);ue.X.J.call(this)};ue.prototype.setMap=function(b){this.c&&ge(this.element);for(var c=0,d=this.h.length;c<d;++c)N(this.h[c]);this.h.length=0;if(this.c=b)(this.B?this.B:b.j).appendChild(this.element),this.render!==pa&&this.h.push(Q(b,"postrender",this.render,this)),b.render()};function ve(){this.f=0;this.c={};this.b=this.a=null}p=ve.prototype;p.clear=function(){this.f=0;this.c={};this.b=this.a=null};function we(b,c){return b.c.hasOwnProperty(c)}function xe(b,c){for(var d=b.a;d;)c.call(void 0,d.Ia,d.Rb,b),d=d.ma}p.get=function(b){b=this.c[b];if(b===this.b)return b.Ia;b===this.a?(this.a=this.a.ma,this.a.Ra=null):(b.ma.Ra=b.Ra,b.Ra.ma=b.ma);b.ma=null;b.Ra=this.b;this.b=this.b.ma=b;return b.Ia};
p.pop=function(){var b=this.a;delete this.c[b.Rb];b.ma&&(b.ma.Ra=null);this.a=b.ma;this.a||(this.b=null);--this.f;return b.Ia};p.replace=function(b,c){this.get(b);this.c[b].Ia=c};p.set=function(b,c){var d={Rb:b,ma:null,Ra:this.b,Ia:c};this.b?this.b.ma=d:this.a=d;this.b=d;this.c[b]=d;++this.f};function ye(b){ve.call(this);this.g=void 0!==b?b:2048}M(ye,ve);function ze(b){return b.f>b.g}function Ae(b,c){for(var d,e;ze(b);){d=b.a.Ia;e=d.L[0].toString();var f;if(f=e in c)d=d.L,f=gd(c[e],d[1],d[2]);if(f)break;else jb(b.pop())}};function Be(b,c){mb.call(this);this.L=b;this.state=c;this.a=null;this.key=""}M(Be,mb);function Ce(b){S(b,"change")}Be.prototype.getKey=function(){return I(this).toString()};Be.prototype.N=function(){return this.state};function De(b){T.call(this);this.c=lc(b.projection);this.i=Ee(b.attributions);this.w=b.logo;this.B=void 0!==b.state?b.state:"ready";this.j=void 0!==b.wrapX?b.wrapX:!1}M(De,T);function Ee(b){if("string"===typeof b)return[new jd({html:b})];if(b instanceof jd)return[b];if(Array.isArray(b)){for(var c=b.length,d=Array(c),e=0;e<c;e++){var f=b[e];d[e]="string"===typeof f?new jd({html:f}):f}return d}return null}De.prototype.N=function(){return this.B};De.prototype.wa=function(){this.v()};function Fe(b){this.minZoom=void 0!==b.minZoom?b.minZoom:0;this.b=b.resolutions;this.maxZoom=this.b.length-1;this.f=void 0!==b.origin?b.origin:null;this.g=null;void 0!==b.origins&&(this.g=b.origins);var c=b.extent;void 0===c||this.f||this.g||(this.f=bc(c));this.h=null;void 0!==b.tileSizes&&(this.h=b.tileSizes);this.l=void 0!==b.tileSize?b.tileSize:this.h?null:256;this.i=void 0!==c?c:null;this.a=null;void 0!==b.sizes?this.a=b.sizes.map(function(b){return new fd(Math.min(0,b[0]),Math.max(b[0]-1,-1),
Math.min(0,b[1]),Math.max(b[1]-1,-1))},this):c&&Ge(this,c);this.c=[0,0]}var He=[0,0,0];function Ie(b,c,d,e,f){f=Je(b,c,f);for(c=c[0]-1;c>=b.minZoom;){if(d.call(null,c,Ke(b,f,c,e)))return!0;--c}return!1}Fe.prototype.C=function(){return this.i};Fe.prototype.ka=function(b){return this.f?this.f:this.g[b]};Fe.prototype.I=function(b){return this.b[b]};Fe.prototype.Nb=function(){return this.b};function Le(b,c,d,e){return c[0]<b.maxZoom?(e=Je(b,c,e),Ke(b,e,c[0]+1,d)):null}
function Me(b,c,d,e){Ne(b,c[0],c[1],d,!1,He);var f=He[1],g=He[2];Ne(b,c[2],c[3],d,!0,He);b=He[1];c=He[2];void 0!==e?(e.a=f,e.f=b,e.b=g,e.c=c):e=new fd(f,b,g,c);return e}function Ke(b,c,d,e){d=b.I(d);return Me(b,c,d,e)}function Oe(b,c){var d=b.ka(c[0]),e=b.I(c[0]),f=tb(Pe(b,c[0]),b.c);return[d[0]+(c[1]+.5)*f[0]*e,d[1]+(c[2]+.5)*f[1]*e]}function Je(b,c,d){var e=b.ka(c[0]),f=b.I(c[0]);b=tb(Pe(b,c[0]),b.c);var g=e[0]+c[1]*b[0]*f;c=e[1]+c[2]*b[1]*f;return Ob(g,c,g+b[0]*f,c+b[1]*f,d)}
function Ne(b,c,d,e,f,g){var h=Qe(b,e),k=e/b.I(h),l=b.ka(h);b=tb(Pe(b,h),b.c);c=k*Math.floor((c-l[0])/e+(f?.5:0))/b[0];d=k*Math.floor((d-l[1])/e+(f?0:.5))/b[1];f?(c=Math.ceil(c)-1,d=Math.ceil(d)-1):(c=Math.floor(c),d=Math.floor(d));f=c;void 0!==g?(g[0]=h,g[1]=f,g[2]=d):g=[h,f,d];return g}function Re(b,c,d){d=b.I(d);return Ne(b,c[0],c[1],d,!1,void 0)}function Pe(b,c){return b.l?b.l:b.h[c]}function Qe(b,c){var d=Ia(b.b,c,0);return Ca(d,b.minZoom,b.maxZoom)}
function Ge(b,c){for(var d=b.b.length,e=Array(d),f=b.minZoom;f<d;++f)e[f]=Ke(b,c,f);b.a=e}function Se(b){var c=b.c;if(!c){var c=Te(b),d=Ue(c,void 0,void 0),c=new Fe({extent:c,origin:bc(c),resolutions:d,tileSize:void 0});b.c=c}return c}function Ue(b,c,d){c=void 0!==c?c:42;var e=Wb(b);b=Vb(b);d=tb(void 0!==d?d:256);d=Math.max(b/d[0],e/d[1]);c+=1;e=Array(c);for(b=0;b<c;++b)e[b]=d/Math.pow(2,b);return e}function Te(b){b=lc(b);var c=b.C();c||(b=180*hc.degrees/pc(b),c=Ob(-b,-b,b,b));return c};function Ve(b){De.call(this,{attributions:b.attributions,extent:b.extent,logo:b.logo,projection:b.projection,state:b.state,wrapX:b.wrapX});this.G=void 0!==b.opaque?b.opaque:!1;this.Y=void 0!==b.tilePixelRatio?b.tilePixelRatio:1;this.tileGrid=void 0!==b.tileGrid?b.tileGrid:null;this.a=new ye(b.cacheSize);this.h=[0,0]}M(Ve,De);p=Ve.prototype;p.Qc=function(){return ze(this.a)};p.Rc=function(b,c){var d=this.bb(b);d&&Ae(d,c)};
function We(b,c,d,e,f){c=b.bb(c);if(!c)return!1;for(var g=!0,h,k,l=e.a;l<=e.f;++l)for(var m=e.b;m<=e.c;++m)h=b.lb(d,l,m),k=!1,we(c,h)&&(h=c.get(h),(k=2===h.N())&&(k=!1!==f(h))),k||(g=!1);return g}p.kb=function(){return 0};p.lb=function(b,c,d){return b+"/"+c+"/"+d};p.Mb=function(){return this.G};p.Nb=function(){return this.tileGrid.Nb()};p.la=function(b){return this.tileGrid?this.tileGrid:Se(b)};p.bb=function(b){var c=this.c;return c&&!wc(c,b)?null:this.a};p.mb=function(){return this.Y};
function Xe(b,c,d,e){e=b.la(e);d=b.mb(d);c=tb(Pe(e,c),b.h);return 1==d?c:sb(c,d,b.h)}function Ye(b,c,d){var e=void 0!==d?d:b.c;d=b.la(e);if(b.j&&e.f){var f=c;c=f[0];b=Oe(d,f);var e=Te(e),g=b[0],h=b[1];e[0]<=g&&g<=e[2]&&e[1]<=h&&h<=e[3]?c=f:(f=Vb(e),b[0]+=f*Math.ceil((e[0]-b[0])/f),c=Re(d,b,c))}e=c[0];b=c[1];f=c[2];d=d.minZoom>e||e>d.maxZoom?!1:(d=(g=d.C())?Ke(d,g,e):d.a?d.a[e]:null)?gd(d,b,f):!0;return d?c:null}p.wa=function(){this.a.clear();this.v()};p.Yc=pa;
function Ze(b,c){R.call(this,b);this.tile=c}M(Ze,R);function $e(b){b=b?b:{};this.s=document.createElement("UL");this.j=document.createElement("LI");this.s.appendChild(this.j);oe(this.j,!1);this.g=void 0!==b.collapsed?b.collapsed:!0;this.i=void 0!==b.collapsible?b.collapsible:!0;this.i||(this.g=!1);var c=void 0!==b.className?b.className:"ol-attribution",d=void 0!==b.tipLabel?b.tipLabel:"Attributions",e=void 0!==b.collapseLabel?b.collapseLabel:"\u00bb";this.u="string"===typeof e?be("SPAN",{},e):e;e=void 0!==b.label?b.label:"i";this.w="string"===typeof e?
be("SPAN",{},e):e;d=be("BUTTON",{type:"button",title:d},this.i&&!this.g?this.u:this.w);Q(d,"click",this.G,this);c=be("DIV",c+" ol-unselectable ol-control"+(this.g&&this.i?" ol-collapsed":"")+(this.i?"":" ol-uncollapsible"),this.s,d);ue.call(this,{element:c,render:b.render?b.render:af,target:b.target});this.o=!0;this.b={};this.a={};this.D={}}M($e,ue);
function af(b){if(b=b.frameState){var c,d,e,f,g,h,k,l,m,n,q,r=b.layerStatesArray,u=Wa({},b.attributions),w={},y=b.viewState.projection;d=0;for(c=r.length;d<c;d++)if(h=r[d].layer.V())if(n=I(h).toString(),m=h.i)for(e=0,f=m.length;e<f;e++)if(k=m[e],l=I(k).toString(),!(l in u)){if(g=b.usedTiles[n]){var z=h.la(y);a:{q=k;var D=y;if(q.a){var t=void 0,v=void 0,B=void 0,E=void 0;for(E in g)if(E in q.a)for(var B=g[E],C,t=0,v=q.a[E].length;t<v;++t){C=q.a[E][t];if(id(C,B)){q=!0;break a}var G=Ke(z,Te(D),parseInt(E,
10)),J=G.ha();if(B.a<G.a||B.f>G.f)if(id(C,new fd(Ea(B.a,J),Ea(B.f,J),B.b,B.c))||B.ha()>J&&id(C,G)){q=!0;break a}}q=!1}else q=!0}}else q=!1;q?(l in w&&delete w[l],u[l]=k):w[l]=k}c=[u,w];d=c[0];c=c[1];for(var A in this.b)A in d?(this.a[A]||(oe(this.b[A],!0),this.a[A]=!0),delete d[A]):A in c?(this.a[A]&&(oe(this.b[A],!1),delete this.a[A]),delete c[A]):(ge(this.b[A]),delete this.b[A],delete this.a[A]);for(A in d)e=document.createElement("LI"),e.innerHTML=d[A].b,this.s.appendChild(e),this.b[A]=e,this.a[A]=
!0;for(A in c)e=document.createElement("LI"),e.innerHTML=c[A].b,oe(e,!1),this.s.appendChild(e),this.b[A]=e;A=!$a(this.a)||!$a(b.logos);this.o!=A&&(oe(this.element,A),this.o=A);A&&$a(this.a)?this.element.classList.add("ol-logo-only"):this.element.classList.remove("ol-logo-only");var H;b=b.logos;A=this.D;for(H in A)H in b||(ge(A[H]),delete A[H]);for(var O in b)O in A||(H=new Image,H.src=O,d=b[O],""===d?d=H:(d=be("A",{href:d}),d.appendChild(H)),this.j.appendChild(d),A[O]=d);oe(this.j,!$a(b))}else this.o&&
(oe(this.element,!1),this.o=!1)}$e.prototype.G=function(b){b.preventDefault();this.element.classList.toggle("ol-collapsed");this.g?he(this.u,this.w):he(this.w,this.u);this.g=!this.g};function bf(b){b=b?b:{};var c=void 0!==b.className?b.className:"ol-rotate",d=void 0!==b.label?b.label:"\u21e7";this.a=null;"string"===typeof d?this.a=be("SPAN","ol-compass",d):(this.a=d,this.a.classList.add(this.a,"ol-compass"));d=be("BUTTON",{"class":c+"-reset",type:"button",title:b.tipLabel?b.tipLabel:"Reset rotation"},this.a);Q(d,"click",bf.prototype.o,this);c=be("DIV",c+" ol-unselectable ol-control",d);d=b.render?b.render:cf;this.g=b.resetNorth?b.resetNorth:void 0;ue.call(this,{element:c,render:d,
target:b.target});this.i=void 0!==b.duration?b.duration:250;this.b=void 0!==b.autoHide?b.autoHide:!0;this.j=void 0;this.b&&this.element.classList.add("ol-hidden")}M(bf,ue);bf.prototype.o=function(b){b.preventDefault();if(void 0!==this.g)this.g();else{b=this.c;var c=b.O();if(c){var d=c.Z();void 0!==d&&(0<this.i&&(d%=2*Math.PI,d<-Math.PI&&(d+=2*Math.PI),d>Math.PI&&(d-=2*Math.PI),b.fa(dd({rotation:d,duration:this.i,easing:$c}))),c.set("rotation",0))}}};
function cf(b){if(b=b.frameState){b=b.viewState.rotation;if(b!=this.j){var c="rotate("+b+"rad)";if(this.b){var d=this.element.classList.contains("ol-hidden");d||0!==b?d&&0!==b&&this.element.classList.remove("ol-hidden"):this.element.classList.add("ol-hidden")}this.a.style.msTransform=c;this.a.style.webkitTransform=c;this.a.style.transform=c}this.j=b}};function df(b){b=b?b:{};var c=void 0!==b.className?b.className:"ol-zoom",d=void 0!==b.delta?b.delta:1,e=void 0!==b.zoomOutLabel?b.zoomOutLabel:"\u2212",f=void 0!==b.zoomOutTipLabel?b.zoomOutTipLabel:"Zoom out",g=be("BUTTON",{"class":c+"-in",type:"button",title:void 0!==b.zoomInTipLabel?b.zoomInTipLabel:"Zoom in"},void 0!==b.zoomInLabel?b.zoomInLabel:"+");Q(g,"click",na(df.prototype.b,d),this);e=be("BUTTON",{"class":c+"-out",type:"button",title:f},e);Q(e,"click",na(df.prototype.b,-d),this);c=be("DIV",
c+" ol-unselectable ol-control",g,e);ue.call(this,{element:c,target:b.target});this.a=void 0!==b.duration?b.duration:250}M(df,ue);df.prototype.b=function(b,c){c.preventDefault();var d=this.c,e=d.O();if(e){var f=e.I();f&&(0<this.a&&d.fa(ed({resolution:f,duration:this.a,easing:$c})),d=e.constrainResolution(f,b),Yc(e,d))}};function ef(b){b=b?b:{};var c=new ld;(void 0!==b.zoom?b.zoom:1)&&c.push(new df(b.zoomOptions));(void 0!==b.rotate?b.rotate:1)&&c.push(new bf(b.rotateOptions));(void 0!==b.attribution?b.attribution:1)&&c.push(new $e(b.attributionOptions));return c};var ff=Jd?"webkitfullscreenchange":Id?"mozfullscreenchange":Gd?"MSFullscreenChange":"fullscreenchange";function gf(){var b=Wd().a,c=b.body;return!!(c.webkitRequestFullscreen||c.mozRequestFullScreen&&b.mozFullScreenEnabled||c.msRequestFullscreen&&b.msFullscreenEnabled||c.requestFullscreen&&b.fullscreenEnabled)}
function hf(b){b.webkitRequestFullscreen?b.webkitRequestFullscreen():b.mozRequestFullScreen?b.mozRequestFullScreen():b.msRequestFullscreen?b.msRequestFullscreen():b.requestFullscreen&&b.requestFullscreen()}function jf(){var b=Wd().a;return!!(b.webkitIsFullScreen||b.mozFullScreen||b.msFullscreenElement||b.fullscreenElement)};function kf(b){b=b?b:{};this.a=void 0!==b.className?b.className:"ol-full-screen";var c=void 0!==b.label?b.label:"\u2922";this.b="string"===typeof c?document.createTextNode(c):c;c=void 0!==b.labelActive?b.labelActive:"\u00d7";this.g="string"===typeof c?document.createTextNode(c):c;c=b.tipLabel?b.tipLabel:"Toggle full-screen";c=be("BUTTON",{"class":this.a+"-"+jf(),type:"button",title:c},this.b);Q(c,"click",this.s,this);var d=this.a+" ol-unselectable ol-control "+(gf()?"":"ol-unsupported"),c=be("DIV",
d,c);ue.call(this,{element:c,target:b.target});this.o=void 0!==b.keys?b.keys:!1;this.i=b.source}M(kf,ue);
kf.prototype.s=function(b){b.preventDefault();gf()&&(b=this.c)&&(jf()?(b=Wd().a,b.webkitCancelFullScreen?b.webkitCancelFullScreen():b.mozCancelFullScreen?b.mozCancelFullScreen():b.msExitFullscreen?b.msExitFullscreen():b.exitFullscreen&&b.exitFullscreen()):(b=this.i?Zd(this.i):b.Na(),this.o?b.mozRequestFullScreenWithKeys?b.mozRequestFullScreenWithKeys():b.webkitRequestFullscreen?b.webkitRequestFullscreen():hf(b):hf(b)))};
kf.prototype.j=function(){var b=this.element.firstElementChild,c=this.c;jf()?(b.className=this.a+"-true",he(this.g,this.b)):(b.className=this.a+"-false",he(this.b,this.g));c&&c.vb()};kf.prototype.setMap=function(b){kf.X.setMap.call(this,b);b&&this.h.push(Q(x.document,ff,this.j,this))};var lf;
function mf(){var b=x.MessageChannel;"undefined"===typeof b&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!W("Presto")&&(b=function(){var b=document.createElement("IFRAME");b.style.display="none";b.src="";document.documentElement.appendChild(b);var c=b.contentWindow,b=c.document;b.open();b.write("");b.close();var d="callImmediate"+Math.random(),e="file:"==c.location.protocol?"*":c.location.protocol+"//"+c.location.host,b=ma(function(b){if(("*"==e||b.origin==e)&&b.data==
d)this.port1.onmessage()},this);c.addEventListener("message",b,!1);this.port1={};this.port2={postMessage:function(){c.postMessage(d,e)}}});if("undefined"!==typeof b&&!W("Trident")&&!W("MSIE")){var c=new b,d={},e=d;c.port1.onmessage=function(){if(void 0!==d.next){d=d.next;var b=d.lc;d.lc=null;b()}};return function(b){e.next={lc:b};e=e.next;c.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(b){var c=document.createElement("SCRIPT");
c.onreadystatechange=function(){c.onreadystatechange=null;c.parentNode.removeChild(c);c=null;b();b=null};document.documentElement.appendChild(c)}:function(b){x.setTimeout(b,0)}};function nf(b,c,d){R.call(this,b);this.a=c;b=d?d:{};this.buttons=of(b);this.pressure=pf(b,this.buttons);this.bubbles="bubbles"in b?b.bubbles:!1;this.cancelable="cancelable"in b?b.cancelable:!1;this.view="view"in b?b.view:null;this.detail="detail"in b?b.detail:null;this.screenX="screenX"in b?b.screenX:0;this.screenY="screenY"in b?b.screenY:0;this.clientX="clientX"in b?b.clientX:0;this.clientY="clientY"in b?b.clientY:0;this.button="button"in b?b.button:0;this.relatedTarget="relatedTarget"in b?b.relatedTarget:
null;this.pointerId="pointerId"in b?b.pointerId:0;this.width="width"in b?b.width:0;this.height="height"in b?b.height:0;this.pointerType="pointerType"in b?b.pointerType:"";this.isPrimary="isPrimary"in b?b.isPrimary:!1;c.preventDefault&&(this.preventDefault=function(){c.preventDefault()})}M(nf,R);function of(b){if(b.buttons||qf)b=b.buttons;else switch(b.which){case 1:b=1;break;case 2:b=4;break;case 3:b=2;break;default:b=0}return b}function pf(b,c){var d=0;b.pressure?d=b.pressure:d=c?.5:0;return d}
var qf=!1;try{qf=1===(new MouseEvent("click",{buttons:1})).buttons}catch(b){};function rf(b,c){var d=document.createElement("CANVAS");b&&(d.width=b);c&&(d.height=c);return d.getContext("2d")}
var sf=function(){var b;return function(){if(void 0===b){var c=document.createElement("P"),d,e={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.appendChild(c);for(var f in e)f in c.style&&(c.style[f]="translate(1px,1px)",d=x.getComputedStyle(c).getPropertyValue(e[f]));document.body.removeChild(c);b=d&&"none"!==d}return b}}(),tf=function(){var b;return function(){if(void 0===b){var c=document.createElement("P"),
d,e={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.appendChild(c);for(var f in e)f in c.style&&(c.style[f]="translate3d(1px,1px,1px)",d=x.getComputedStyle(c).getPropertyValue(e[f]));document.body.removeChild(c);b=d&&"none"!==d}return b}}();
function uf(b,c){var d=b.style;d.WebkitTransform=c;d.MozTransform=c;d.a=c;d.msTransform=c;d.transform=c;Gd&&Qd("9.0")&&(b.style.transformOrigin="0 0")}function vf(b,c){var d;if(tf()){var e=Array(16);for(d=0;16>d;++d)e[d]=c[d].toFixed(6);uf(b,"matrix3d("+e.join(",")+")")}else if(sf()){var e=[c[0],c[1],c[4],c[5],c[12],c[13]],f=Array(6);for(d=0;6>d;++d)f[d]=e[d].toFixed(6);uf(b,"matrix("+f.join(",")+")")}else b.style.left=Math.round(c[12])+"px",b.style.top=Math.round(c[13])+"px"};var wf=["experimental-webgl","webgl","webkit-3d","moz-webgl"];function xf(b,c){var d,e,f=wf.length;for(e=0;e<f;++e)try{if(d=b.getContext(wf[e],c))return d}catch(g){}return null};var yf,zf="undefined"!==typeof navigator?navigator.userAgent.toLowerCase():"",Af=-1!==zf.indexOf("firefox"),Bf=-1!==zf.indexOf("safari")&&-1===zf.indexOf("chrom"),Cf=-1!==zf.indexOf("macintosh"),Df=x.devicePixelRatio||1,Ef=!1,Ff=function(){if(!("HTMLCanvasElement"in x))return!1;try{var b=rf();return b?(void 0!==b.setLineDash&&(Ef=!0),!0):!1}catch(c){return!1}}(),Gf="ontouchstart"in x,Hf="PointerEvent"in x,If=!!x.navigator.msPointerEnabled,Jf=!1,Kf=[];
if("WebGLRenderingContext"in x)try{var Lf=xf(document.createElement("CANVAS"),{failIfMajorPerformanceCaveat:!0});Lf&&(Jf=!0,Kf=Lf.getSupportedExtensions())}catch(b){}yf=Jf;oa=Kf;function Mf(b,c){this.a=b;this.g=c};function Nf(b){Mf.call(this,b,{mousedown:this.Vd,mousemove:this.Wd,mouseup:this.Zd,mouseover:this.Yd,mouseout:this.Xd});this.b=b.b;this.f=[]}M(Nf,Mf);function Of(b,c){for(var d=b.f,e=c.clientX,f=c.clientY,g=0,h=d.length,k;g<h&&(k=d[g]);g++){var l=Math.abs(f-k[1]);if(25>=Math.abs(e-k[0])&&25>=l)return!0}return!1}function Pf(b){var c=Qf(b,b),d=c.preventDefault;c.preventDefault=function(){b.preventDefault();d()};c.pointerId=1;c.isPrimary=!0;c.pointerType="mouse";return c}p=Nf.prototype;
p.Vd=function(b){if(!Of(this,b)){if((1).toString()in this.b){var c=Pf(b);Rf(this.a,Sf,c,b);delete this.b[(1).toString()]}c=Pf(b);this.b[(1).toString()]=b;Rf(this.a,Tf,c,b)}};p.Wd=function(b){if(!Of(this,b)){var c=Pf(b);Rf(this.a,Uf,c,b)}};p.Zd=function(b){if(!Of(this,b)){var c=this.b[(1).toString()];c&&c.button===b.button&&(c=Pf(b),Rf(this.a,Vf,c,b),delete this.b[(1).toString()])}};p.Yd=function(b){if(!Of(this,b)){var c=Pf(b);Wf(this.a,c,b)}};
p.Xd=function(b){if(!Of(this,b)){var c=Pf(b);Xf(this.a,c,b)}};function Yf(b){Mf.call(this,b,{MSPointerDown:this.de,MSPointerMove:this.ee,MSPointerUp:this.he,MSPointerOut:this.fe,MSPointerOver:this.ge,MSPointerCancel:this.ce,MSGotPointerCapture:this.ae,MSLostPointerCapture:this.be});this.b=b.b;this.f=["","unavailable","touch","pen","mouse"]}M(Yf,Mf);function Zf(b,c){var d=c;ea(c.pointerType)&&(d=Qf(c,c),d.pointerType=b.f[c.pointerType]);return d}p=Yf.prototype;p.de=function(b){this.b[b.pointerId.toString()]=b;var c=Zf(this,b);Rf(this.a,Tf,c,b)};
p.ee=function(b){var c=Zf(this,b);Rf(this.a,Uf,c,b)};p.he=function(b){var c=Zf(this,b);Rf(this.a,Vf,c,b);delete this.b[b.pointerId.toString()]};p.fe=function(b){var c=Zf(this,b);Xf(this.a,c,b)};p.ge=function(b){var c=Zf(this,b);Wf(this.a,c,b)};p.ce=function(b){var c=Zf(this,b);Rf(this.a,Sf,c,b);delete this.b[b.pointerId.toString()]};p.be=function(b){S(this.a,new nf("lostpointercapture",b,b))};p.ae=function(b){S(this.a,new nf("gotpointercapture",b,b))};function $f(b){Mf.call(this,b,{pointerdown:this.se,pointermove:this.te,pointerup:this.we,pointerout:this.ue,pointerover:this.ve,pointercancel:this.re,gotpointercapture:this.xd,lostpointercapture:this.Ud})}M($f,Mf);p=$f.prototype;p.se=function(b){ag(this.a,b)};p.te=function(b){ag(this.a,b)};p.we=function(b){ag(this.a,b)};p.ue=function(b){ag(this.a,b)};p.ve=function(b){ag(this.a,b)};p.re=function(b){ag(this.a,b)};p.Ud=function(b){ag(this.a,b)};p.xd=function(b){ag(this.a,b)};function bg(b,c){Mf.call(this,b,{touchstart:this.Ie,touchmove:this.He,touchend:this.Ge,touchcancel:this.Fe});this.b=b.b;this.l=c;this.f=void 0;this.h=0;this.c=void 0}M(bg,Mf);p=bg.prototype;p.Vc=function(){this.h=0;this.c=void 0};
function cg(b,c,d){c=Qf(c,d);c.pointerId=d.identifier+2;c.bubbles=!0;c.cancelable=!0;c.detail=b.h;c.button=0;c.buttons=1;c.width=d.webkitRadiusX||d.radiusX||0;c.height=d.webkitRadiusY||d.radiusY||0;c.pressure=d.webkitForce||d.force||.5;c.isPrimary=b.f===d.identifier;c.pointerType="touch";c.clientX=d.clientX;c.clientY=d.clientY;c.screenX=d.screenX;c.screenY=d.screenY;return c}
function dg(b,c,d){function e(){c.preventDefault()}var f=Array.prototype.slice.call(c.changedTouches),g=f.length,h,k;for(h=0;h<g;++h)k=cg(b,c,f[h]),k.preventDefault=e,d.call(b,c,k)}
p.Ie=function(b){var c=b.touches,d=Object.keys(this.b),e=d.length;if(e>=c.length){var f=[],g,h,k;for(g=0;g<e;++g){h=d[g];k=this.b[h];var l;if(!(l=1==h))a:{l=c.length;for(var m=void 0,n=0;n<l;n++)if(m=c[n],m.identifier===h-2){l=!0;break a}l=!1}l||f.push(k.out)}for(g=0;g<f.length;++g)this.Fb(b,f[g])}c=b.changedTouches[0];d=Object.keys(this.b).length;if(0===d||1===d&&(1).toString()in this.b)this.f=c.identifier,void 0!==this.c&&x.clearTimeout(this.c);eg(this,b);this.h++;dg(this,b,this.qe)};
p.qe=function(b,c){this.b[c.pointerId]={target:c.target,out:c,Sc:c.target};var d=this.a;c.bubbles=!0;Rf(d,fg,c,b);d=this.a;c.bubbles=!1;Rf(d,gg,c,b);Rf(this.a,Tf,c,b)};p.He=function(b){b.preventDefault();dg(this,b,this.$d)};p.$d=function(b,c){var d=this.b[c.pointerId];if(d){var e=d.out,f=d.Sc;Rf(this.a,Uf,c,b);e&&f!==c.target&&(e.relatedTarget=c.target,c.relatedTarget=f,e.target=f,c.target?(Xf(this.a,e,b),Wf(this.a,c,b)):(c.target=f,c.relatedTarget=null,this.Fb(b,c)));d.out=c;d.Sc=c.target}};
p.Ge=function(b){eg(this,b);dg(this,b,this.Je)};p.Je=function(b,c){Rf(this.a,Vf,c,b);this.a.out(c,b);var d=this.a;c.bubbles=!1;Rf(d,hg,c,b);delete this.b[c.pointerId];c.isPrimary&&(this.f=void 0,this.c=x.setTimeout(this.Vc.bind(this),200))};p.Fe=function(b){dg(this,b,this.Fb)};p.Fb=function(b,c){Rf(this.a,Sf,c,b);this.a.out(c,b);var d=this.a;c.bubbles=!1;Rf(d,hg,c,b);delete this.b[c.pointerId];c.isPrimary&&(this.f=void 0,this.c=x.setTimeout(this.Vc.bind(this),200))};
function eg(b,c){var d=b.l.f,e=c.changedTouches[0];if(b.f===e.identifier){var f=[e.clientX,e.clientY];d.push(f);x.setTimeout(function(){La(d,f)},2500)}};function ig(b){mb.call(this);this.g=b;this.b={};this.c={};this.a=[];Hf?jg(this,new $f(this)):If?jg(this,new Yf(this)):(b=new Nf(this),jg(this,b),Gf&&jg(this,new bg(this,b)));b=this.a.length;for(var c,d=0;d<b;d++)c=this.a[d],kg(this,Object.keys(c.g))}M(ig,mb);function jg(b,c){var d=Object.keys(c.g);d&&(d.forEach(function(b){var d=c.g[b];d&&(this.c[b]=d.bind(c))},b),b.a.push(c))}ig.prototype.f=function(b){var c=this.c[b.type];c&&c(b)};
function kg(b,c){c.forEach(function(b){Q(this.g,b,this.f,this)},b)}function lg(b,c){c.forEach(function(b){gb(this.g,b,this.f,this)},b)}function Qf(b,c){for(var d={},e,f=0,g=mg.length;f<g;f++)e=mg[f][0],d[e]=b[e]||c[e]||mg[f][1];return d}ig.prototype.out=function(b,c){b.bubbles=!0;Rf(this,ng,b,c)};function Xf(b,c,d){b.out(c,d);var e=c.relatedTarget;e&&ie(c.target,e)||(c.bubbles=!1,Rf(b,hg,c,d))}
function Wf(b,c,d){c.bubbles=!0;Rf(b,fg,c,d);var e=c.relatedTarget;e&&ie(c.target,e)||(c.bubbles=!1,Rf(b,gg,c,d))}function Rf(b,c,d,e){S(b,new nf(c,e,d))}function ag(b,c){S(b,new nf(c.type,c,c))}ig.prototype.J=function(){for(var b=this.a.length,c,d=0;d<b;d++)c=this.a[d],lg(this,Object.keys(c.g));ig.X.J.call(this)};
var Uf="pointermove",Tf="pointerdown",Vf="pointerup",fg="pointerover",ng="pointerout",gg="pointerenter",hg="pointerleave",Sf="pointercancel",mg=[["bubbles",!1],["cancelable",!1],["view",null],["detail",null],["screenX",0],["screenY",0],["clientX",0],["clientY",0],["ctrlKey",!1],["altKey",!1],["shiftKey",!1],["metaKey",!1],["button",0],["relatedTarget",null],["buttons",0],["pointerId",0],["width",0],["height",0],["pressure",0],["tiltX",0],["tiltY",0],["pointerType",""],["hwTimestamp",0],["isPrimary",
!1],["type",""],["target",null],["currentTarget",null],["which",0]];function og(b,c,d,e,f){te.call(this,b,c,f);this.originalEvent=d;this.pixel=c.vc(d);this.coordinate=c.ta(this.pixel);this.dragging=void 0!==e?e:!1}M(og,te);og.prototype.preventDefault=function(){og.X.preventDefault.call(this);this.originalEvent.preventDefault()};og.prototype.stopPropagation=function(){og.X.stopPropagation.call(this);this.originalEvent.stopPropagation()};function pg(b,c,d,e,f){og.call(this,b,c,d.a,e,f);this.a=d}M(pg,og);
function qg(b){mb.call(this);this.f=b;this.h=0;this.l=!1;this.c=[];this.b=null;b=this.f.a;this.s=0;this.o={};this.g=new ig(b);this.a=null;this.i=Q(this.g,Tf,this.Jd,this);this.j=Q(this.g,Uf,this.ye,this)}M(qg,mb);function rg(b,c){var d;d=new pg(sg,b.f,c);S(b,d);0!==b.h?(x.clearTimeout(b.h),b.h=0,d=new pg(tg,b.f,c),S(b,d)):b.h=x.setTimeout(function(){this.h=0;var b=new pg(ug,this.f,c);S(this,b)}.bind(b),250)}
function vg(b,c){c.type==wg||c.type==xg?delete b.o[c.pointerId]:c.type==yg&&(b.o[c.pointerId]=!0);b.s=Object.keys(b.o).length}p=qg.prototype;p.zc=function(b){vg(this,b);var c=new pg(wg,this.f,b);S(this,c);!this.l&&0===b.button&&rg(this,this.b);0===this.s&&(this.c.forEach(N),this.c.length=0,this.l=!1,this.b=null,jb(this.a),this.a=null)};
p.Jd=function(b){vg(this,b);var c=new pg(yg,this.f,b);S(this,c);this.b=b;0===this.c.length&&(this.a=new ig(document),this.c.push(Q(this.a,zg,this.ke,this),Q(this.a,wg,this.zc,this),Q(this.g,xg,this.zc,this)))};p.ke=function(b){if(b.clientX!=this.b.clientX||b.clientY!=this.b.clientY){this.l=!0;var c=new pg(Ag,this.f,b,this.l);S(this,c)}b.preventDefault()};p.ye=function(b){S(this,new pg(b.type,this.f,b,!(!this.b||b.clientX==this.b.clientX&&b.clientY==this.b.clientY)))};
p.J=function(){this.j&&(N(this.j),this.j=null);this.i&&(N(this.i),this.i=null);this.c.forEach(N);this.c.length=0;this.a&&(jb(this.a),this.a=null);this.g&&(jb(this.g),this.g=null);qg.X.J.call(this)};var ug="singleclick",sg="click",tg="dblclick",Ag="pointerdrag",zg="pointermove",yg="pointerdown",wg="pointerup",xg="pointercancel",Bg={Ve:ug,Ke:sg,Le:tg,Oe:Ag,Re:zg,Ne:yg,Ue:wg,Te:"pointerover",Se:"pointerout",Pe:"pointerenter",Qe:"pointerleave",Me:xg};function Cg(b){T.call(this);var c=Wa({},b);c.opacity=void 0!==b.opacity?b.opacity:1;c.visible=void 0!==b.visible?b.visible:!0;c.zIndex=void 0!==b.zIndex?b.zIndex:0;c.maxResolution=void 0!==b.maxResolution?b.maxResolution:Infinity;c.minResolution=void 0!==b.minResolution?b.minResolution:0;this.l(c)}M(Cg,T);
function Dg(b){var c=b.Ub(),d=b.Pb(),e=b.cb(),f=b.C(),g=b.Vb(),h=b.get("maxResolution"),k=b.get("minResolution");return{layer:b,opacity:Ca(c,0,1),$b:d,visible:e,eb:!0,extent:f,zIndex:g,maxResolution:h,minResolution:Math.max(k,0)}}p=Cg.prototype;p.C=function(){return this.get("extent")};p.Ub=function(){return this.get("opacity")};p.cb=function(){return this.get("visible")};p.Vb=function(){return this.get("zIndex")};p.Fc=function(b){this.set("opacity",b)};p.Gc=function(b){this.set("visible",b)};
p.Hc=function(b){this.set("zIndex",b)};function Eg(){};function Fg(b,c,d,e,f,g){R.call(this,b,c);this.vectorContext=d;this.frameState=e;this.context=f;this.glContext=g}M(Fg,R);function Gg(b){var c=Wa({},b);delete c.source;Cg.call(this,c);this.h=this.c=this.b=null;b.map&&this.setMap(b.map);Q(this,rb("source"),this.Od,this);this.Zb(b.source?b.source:null)}M(Gg,Cg);function Hg(b,c){return b.visible&&c>=b.minResolution&&c<b.maxResolution}p=Gg.prototype;p.Lb=function(b){b=b?b:[];b.push(Dg(this));return b};p.V=function(){return this.get("source")||null};p.Pb=function(){var b=this.V();return b?b.N():"undefined"};p.me=function(){this.v()};
p.Od=function(){this.h&&(N(this.h),this.h=null);var b=this.V();b&&(this.h=Q(b,"change",this.me,this));this.v()};p.setMap=function(b){this.b&&(N(this.b),this.b=null);b||this.v();this.c&&(N(this.c),this.c=null);b&&(this.b=Q(b,"precompose",function(b){var d=Dg(this);d.eb=!1;d.zIndex=Infinity;b.frameState.layerStatesArray.push(d);b.frameState.layerStates[I(this)]=d},this),this.c=Q(this,"change",b.render,b),this.v())};p.Zb=function(b){this.set("source",b)};function Ig(b,c,d,e,f,g,h,k){Db(b);0===c&&0===d||Fb(b,c,d);1==e&&1==f||Gb(b,e,f);0!==g&&Hb(b,g);0===h&&0===k||Fb(b,h,k);return b}function Jg(b,c){return b[0]==c[0]&&b[1]==c[1]&&b[4]==c[4]&&b[5]==c[5]&&b[12]==c[12]&&b[13]==c[13]}function Kg(b,c,d){var e=b[1],f=b[5],g=b[13],h=c[0];c=c[1];d[0]=b[0]*h+b[4]*c+b[12];d[1]=e*h+f*c+g;return d};function Lg(b){ob.call(this);this.a=b}M(Lg,ob);Lg.prototype.fb=pa;Lg.prototype.Ic=dc;Lg.prototype.l=function(b,c,d){return function(e,f){return We(b,c,e,f,function(b){d[e]||(d[e]={});d[e][b.L.toString()]=b})}};function Mg(b){var c=b.a;c.cb()&&"ready"==c.Pb()&&b.v()}function Ng(b,c){c.Qc()&&b.postRenderFunctions.push(na(function(b,c,f){c=I(b).toString();b.Rc(f.viewState.projection,f.usedTiles[c])},c))}function Og(b,c){if(c){var d,e,f;e=0;for(f=c.length;e<f;++e)d=c[e],b[I(d).toString()]=d}}
function Pg(b,c){var d=c.w;void 0!==d&&("string"===typeof d?b.logos[d]="":ha(d)&&(b.logos[d.src]=d.href))}function Qg(b,c,d,e){c=I(c).toString();d=d.toString();c in b?d in b[c]?(b=b[c][d],e.a<b.a&&(b.a=e.a),e.f>b.f&&(b.f=e.f),e.b<b.b&&(b.b=e.b),e.c>b.c&&(b.c=e.c)):b[c][d]=e:(b[c]={},b[c][d]=e)}function Rg(b,c,d){return[c*(Math.round(b[0]/c)+d[0]%2/2),c*(Math.round(b[1]/c)+d[1]%2/2)]}
function Sg(b,c,d,e,f,g,h,k,l,m){var n=I(c).toString();n in b.wantedTiles||(b.wantedTiles[n]={});var q=b.wantedTiles[n];b=b.tileQueue;var r=d.minZoom,u,w,y,z,D,t;for(t=h;t>=r;--t)for(w=Ke(d,g,t,w),y=d.I(t),z=w.a;z<=w.f;++z)for(D=w.b;D<=w.c;++D)h-t<=k?(u=Tg(c,t,z,D,e,f),0==u.N()&&(q[u.L.toString()]=!0,u.getKey()in b.f||b.c([u,n,Oe(d,u.L),y])),void 0!==l&&l.call(m,u)):c.Yc(t,z,D,f)};function Ug(b){this.l=b.opacity;this.i=b.rotateWithView;this.H=b.rotation;this.gb=b.scale;this.u=b.snapToPixel}Ug.prototype.Z=function(){return this.H};function Vg(b){b=b||{};this.g=void 0!==b.anchor?b.anchor:[.5,.5];this.c=null;this.b=void 0!==b.anchorOrigin?b.anchorOrigin:"top-left";this.j=void 0!==b.anchorXUnits?b.anchorXUnits:"fraction";this.A=void 0!==b.anchorYUnits?b.anchorYUnits:"fraction";var c=void 0!==b.crossOrigin?b.crossOrigin:null,d=void 0!==b.img?b.img:null,e=void 0!==b.imgSize?b.imgSize:null,f=b.src;void 0!==f&&0!==f.length||!d||(f=d.src||I(d).toString());var g=void 0!==b.src?0:2,h;void 0!==b.color?(h=b.color,h=Array.isArray(h)?h:
xd(h)):h=null;var k=Wg.ua(),l=k.get(f,c,h);l||(l=new Xg(d,f,e,c,g,h),k.set(f,c,h,l));this.a=l;this.s=void 0!==b.offset?b.offset:[0,0];this.f=void 0!==b.offsetOrigin?b.offsetOrigin:"top-left";this.h=null;this.o=void 0!==b.size?b.size:null;Ug.call(this,{opacity:void 0!==b.opacity?b.opacity:1,rotation:void 0!==b.rotation?b.rotation:0,scale:void 0!==b.scale?b.scale:1,snapToPixel:void 0!==b.snapToPixel?b.snapToPixel:!0,rotateWithView:void 0!==b.rotateWithView?b.rotateWithView:!1})}M(Vg,Ug);p=Vg.prototype;
p.jb=function(){if(this.c)return this.c;var b=this.g,c=this.Qa();if("fraction"==this.j||"fraction"==this.A){if(!c)return null;b=this.g.slice();"fraction"==this.j&&(b[0]*=c[0]);"fraction"==this.A&&(b[1]*=c[1])}if("top-left"!=this.b){if(!c)return null;b===this.g&&(b=this.g.slice());if("top-right"==this.b||"bottom-right"==this.b)b[0]=-b[0]+c[0];if("bottom-left"==this.b||"bottom-right"==this.b)b[1]=-b[1]+c[1]}return this.c=b};p.T=function(b){return this.a.T(b)};p.wc=function(){return this.a.b};p.rb=function(){return this.a.f};
p.Xb=function(){var b=this.a;if(!b.l)if(b.i){var c=b.b[0],d=b.b[1],e=rf(c,d);e.fillRect(0,0,c,d);b.l=e.canvas}else b.l=b.a;return b.l};p.ka=function(){if(this.h)return this.h;var b=this.s;if("top-left"!=this.f){var c=this.Qa(),d=this.a.b;if(!c||!d)return null;b=b.slice();if("top-right"==this.f||"bottom-right"==this.f)b[0]=d[0]-c[0]-b[0];if("bottom-left"==this.f||"bottom-right"==this.f)b[1]=d[1]-c[1]-b[1]}return this.h=b};p.Qa=function(){return this.o?this.o:this.a.b};
p.Bc=function(b,c){return Q(this.a,"change",b,c)};p.load=function(){this.a.load()};p.Xc=function(b,c){gb(this.a,"change",b,c)};function Xg(b,c,d,e,f,g){mb.call(this);this.l=null;this.a=b?b:new Image;null!==e&&(this.a.crossOrigin=e);this.c=g?document.createElement("CANVAS"):null;this.h=g;this.g=null;this.f=f;this.b=d;this.o=c;this.i=!1;2==this.f&&Yg(this)}M(Xg,mb);function Yg(b){var c=rf(1,1);try{c.drawImage(b.a,0,0),c.getImageData(0,0,1,1)}catch(d){b.i=!0}}
Xg.prototype.j=function(){this.f=3;this.g.forEach(N);this.g=null;S(this,"change")};
Xg.prototype.s=function(){this.f=2;this.b&&(this.a.width=this.b[0],this.a.height=this.b[1]);this.b=[this.a.width,this.a.height];this.g.forEach(N);this.g=null;Yg(this);if(!this.i&&null!==this.h){this.c.width=this.a.width;this.c.height=this.a.height;var b=this.c.getContext("2d");b.drawImage(this.a,0,0);for(var c=b.getImageData(0,0,this.a.width,this.a.height),d=c.data,e=this.h[0]/255,f=this.h[1]/255,g=this.h[2]/255,h=0,k=d.length;h<k;h+=4)d[h]*=e,d[h+1]*=f,d[h+2]*=g;b.putImageData(c,0,0)}S(this,"change")};
Xg.prototype.T=function(){return this.c?this.c:this.a};Xg.prototype.load=function(){if(0==this.f){this.f=1;this.g=[Q(this.a,"error",this.j,this,!0),Q(this.a,"load",this.s,this,!0)];try{this.a.src=this.o}catch(b){this.j()}}};function Wg(){this.a={};this.b=0}aa(Wg);Wg.prototype.clear=function(){this.a={};this.b=0};Wg.prototype.get=function(b,c,d){b=c+":"+b+":"+(d?vd(d):"null");return b in this.a?this.a[b]:null};Wg.prototype.set=function(b,c,d,e){this.a[c+":"+b+":"+(d?vd(d):"null")]=e;++this.b};function Zg(b,c){this.h=c;this.f={};this.A={}}M(Zg,ib);function $g(b){var c=b.viewState,d=b.coordinateToPixelMatrix;Ig(d,b.size[0]/2,b.size[1]/2,1/c.resolution,-1/c.resolution,-c.rotation,-c.center[0],-c.center[1]);Eb(d,b.pixelToCoordinateMatrix)}p=Zg.prototype;p.J=function(){for(var b in this.f)jb(this.f[b])};function ah(){var b=Wg.ua();if(32<b.b){var c=0,d,e;for(d in b.a)e=b.a[d],0!==(c++&3)||nb(e)||(delete b.a[d],--b.b)}}
p.Wb=function(b,c,d,e,f,g){function h(b,f){var g=I(b).toString(),h=c.layerStates[I(f)].eb;if(!(g in c.skippedFeatureUids)||h)return d.call(e,b,h?f:null)}var k,l=c.viewState,m=l.resolution,n=l.projection,l=b;if(n.a){var n=n.C(),q=Vb(n),r=b[0];if(r<n[0]||r>n[2])l=[r+q*Math.ceil((n[0]-r)/q),b[1]]}n=c.layerStatesArray;for(q=n.length-1;0<=q;--q){var u=n[q],r=u.layer;if(Hg(u,m)&&f.call(g,r)&&(u=bh(this,r),r.V()&&(k=u.fb(r.V().j?l:b,c,h,e)),k))return k}};
p.Jc=function(b,c,d,e){return void 0!==this.Wb(b,c,cc,this,d,e)};function bh(b,c){var d=I(c).toString();if(d in b.f)return b.f[d];var e=b.Jb(c);b.f[d]=e;b.A[d]=Q(e,"change",b.Dd,b);return e}p.Dd=function(){this.h.render()};p.sb=pa;p.Be=function(b,c){for(var d in this.f)if(!(c&&d in c.layerStates)){var e=d,f=this.f[e];delete this.f[e];N(this.A[e]);delete this.A[e];jb(f)}};function ch(b,c){for(var d in b.f)if(!(d in c.layerStates)){c.postRenderFunctions.push(b.Be.bind(b));break}}
function Oa(b,c){return b.zIndex-c.zIndex};function dh(b,c){this.j=b;this.l=c;this.a=[];this.b=[];this.f={}}dh.prototype.clear=function(){this.a.length=0;this.b.length=0;Ya(this.f)};function eh(b){var c=b.a,d=b.b,e=c[0];1==c.length?(c.length=0,d.length=0):(c[0]=c.pop(),d[0]=d.pop(),fh(b,0));c=b.l(e);delete b.f[c];return e}dh.prototype.c=function(b){var c=this.j(b);return Infinity!=c?(this.a.push(b),this.b.push(c),this.f[this.l(b)]=!0,gh(this,0,this.a.length-1),!0):!1};
function fh(b,c){for(var d=b.a,e=b.b,f=d.length,g=d[c],h=e[c],k=c;c<f>>1;){var l=2*c+1,m=2*c+2,l=m<f&&e[m]<e[l]?m:l;d[c]=d[l];e[c]=e[l];c=l}d[c]=g;e[c]=h;gh(b,k,c)}function gh(b,c,d){var e=b.a;b=b.b;for(var f=e[d],g=b[d];d>c;){var h=d-1>>1;if(b[h]>g)e[d]=e[h],b[d]=b[h],d=h;else break}e[d]=f;b[d]=g}function hh(b){var c=b.j,d=b.a,e=b.b,f=0,g=d.length,h,k,l;for(k=0;k<g;++k)h=d[k],l=c(h),Infinity==l?delete b.f[b.l(h)]:(e[f]=l,d[f++]=h);d.length=f;e.length=f;for(c=(b.a.length>>1)-1;0<=c;c--)fh(b,c)};function ih(b,c){dh.call(this,function(c){return b.apply(null,c)},function(b){return b[0].getKey()});this.A=c;this.h=0;this.g={}}M(ih,dh);ih.prototype.c=function(b){var c=ih.X.c.call(this,b);c&&Q(b[0],"change",this.i,this);return c};ih.prototype.i=function(b){b=b.target;var c=b.N();if(2===c||3===c||4===c||5===c)gb(b,"change",this.i,this),b=b.getKey(),b in this.g&&(delete this.g[b],--this.h),this.A()};function jh(){this.a=[];this.b=this.f=0}function kh(b,c){var d=b.b,e=.05-d,f=Math.log(.05/b.b)/-.005;return cd({source:c,duration:f,easing:function(b){return d*(Math.exp(-.005*b*f)-1)/e}})};function lh(b){T.call(this);this.S=null;this.set("active",!0);this.handleEvent=b.handleEvent}M(lh,T);lh.prototype.setMap=function(b){this.S=b};function mh(b,c,d,e,f){if(void 0!==d){var g=c.Z(),h=c.ia();void 0!==g&&h&&f&&0<f&&(b.fa(dd({rotation:g,duration:f,easing:$c})),e&&b.fa(cd({source:h,duration:f,easing:$c})));c.rotate(d,e)}}function nh(b,c,d,e,f){var g=c.I();d=c.constrainResolution(g,d,0);oh(b,c,d,e,f)}
function oh(b,c,d,e,f){if(d){var g=c.I(),h=c.ia();void 0!==g&&h&&d!==g&&f&&0<f&&(b.fa(ed({resolution:g,duration:f,easing:$c})),e&&b.fa(cd({source:h,duration:f,easing:$c})));if(e){var k;b=c.ia();f=c.I();void 0!==b&&void 0!==f&&(k=[e[0]-d*(e[0]-b[0])/f,e[1]-d*(e[1]-b[1])/f]);c.oa(k)}Yc(c,d)}};function ph(b){b=b?b:{};this.a=b.delta?b.delta:1;lh.call(this,{handleEvent:qh});this.b=void 0!==b.duration?b.duration:250}M(ph,lh);function qh(b){var c=!1,d=b.originalEvent;if(b.type==tg){var c=b.map,e=b.coordinate,d=d.shiftKey?-this.a:this.a,f=c.O();nh(c,f,d,e,this.b);b.preventDefault();c=!0}return!c};function rh(b){b=b.originalEvent;return b.altKey&&!(b.metaKey||b.ctrlKey)&&b.shiftKey}function sh(b){b=b.originalEvent;return 0==b.button&&!(Jd&&Cf&&b.ctrlKey)}function th(b){b=b.originalEvent;return!b.altKey&&!(b.metaKey||b.ctrlKey)&&!b.shiftKey}function uh(b){b=b.originalEvent;return!b.altKey&&!(b.metaKey||b.ctrlKey)&&b.shiftKey}function vh(b){b=b.originalEvent.target.tagName;return"INPUT"!==b&&"SELECT"!==b&&"TEXTAREA"!==b}function wh(b){return"mouse"==b.a.pointerType};function xh(b){b=b?b:{};lh.call(this,{handleEvent:b.handleEvent?b.handleEvent:yh});this.wb=b.handleDownEvent?b.handleDownEvent:dc;this.xb=b.handleDragEvent?b.handleDragEvent:pa;this.yb=b.handleMoveEvent?b.handleMoveEvent:pa;this.zb=b.handleUpEvent?b.handleUpEvent:dc;this.s=!1;this.G={};this.c=[]}M(xh,lh);function zh(b){for(var c=b.length,d=0,e=0,f=0;f<c;f++)d+=b[f].clientX,e+=b[f].clientY;return[d/c,e/c]}
function yh(b){if(!(b instanceof pg))return!0;var c=!1,d=b.type;if(d===yg||d===Ag||d===wg)d=b.a,b.type==wg?delete this.G[d.pointerId]:b.type==yg?this.G[d.pointerId]=d:d.pointerId in this.G&&(this.G[d.pointerId]=d),this.c=Za(this.G);this.s&&(b.type==Ag?this.xb(b):b.type==wg&&(this.s=this.zb(b)));b.type==yg?(this.s=b=this.wb(b),c=this.w(b)):b.type==zg&&this.yb(b);return!c}xh.prototype.w=function(b){return b};function Ah(b){xh.call(this,{handleDownEvent:Bh,handleDragEvent:Ch,handleUpEvent:Dh});b=b?b:{};this.a=b.kinetic;this.b=this.g=null;this.i=b.condition?b.condition:th;this.h=!1}M(Ah,xh);function Ch(b){var c=zh(this.c);this.a&&this.a.a.push(c[0],c[1],Date.now());if(this.b){var d=this.b[0]-c[0],e=c[1]-this.b[1];b=b.map;var f=b.O(),g=f.N(),e=d=[d,e],h=g.resolution;e[0]*=h;e[1]*=h;vb(d,g.rotation);ub(d,g.center);d=f.a.center(d);b.render();f.oa(d)}this.b=c}
function Dh(b){b=b.map;var c=b.O();if(0===this.c.length){var d;if(d=!this.h&&this.a)if(d=this.a,6>d.a.length)d=!1;else{var e=Date.now()-100,f=d.a.length-3;if(d.a[f+2]<e)d=!1;else{for(var g=f-3;0<g&&d.a[g+2]>e;)g-=3;var e=d.a[f+2]-d.a[g+2],h=d.a[f]-d.a[g],f=d.a[f+1]-d.a[g+1];d.f=Math.atan2(f,h);d.b=Math.sqrt(h*h+f*f)/e;d=.05<d.b}}d&&(d=(.05-this.a.b)/-.005,f=this.a.f,g=c.ia(),this.g=kh(this.a,g),b.fa(this.g),g=Eh(b,g),d=b.ta([g[0]-d*Math.cos(f),g[1]-d*Math.sin(f)]),d=c.a.center(d),c.oa(d));Zc(c,-1);
b.render();return!1}this.b=null;return!0}function Bh(b){if(0<this.c.length&&this.i(b)){var c=b.map,d=c.O();this.b=null;this.s||Zc(d,1);c.render();this.g&&La(c.B,this.g)&&(d.oa(b.frameState.viewState.center),this.g=null);this.a&&(b=this.a,b.a.length=0,b.f=0,b.b=0);this.h=1<this.c.length;return!0}return!1}Ah.prototype.w=dc;function Fh(b){b=b?b:{};xh.call(this,{handleDownEvent:Gh,handleDragEvent:Hh,handleUpEvent:Ih});this.b=b.condition?b.condition:rh;this.a=void 0;this.g=void 0!==b.duration?b.duration:250}M(Fh,xh);function Hh(b){if(wh(b)){var c=b.map,d=c.Pa();b=b.pixel;d=Math.atan2(d[1]/2-b[1],b[0]-d[0]/2);if(void 0!==this.a){b=d-this.a;var e=c.O(),f=e.Z();c.render();mh(c,e,f-b)}this.a=d}}
function Ih(b){if(!wh(b))return!0;b=b.map;var c=b.O();Zc(c,-1);var d=c.Z(),e=this.g,d=c.constrainRotation(d,0);mh(b,c,d,void 0,e);return!1}function Gh(b){return wh(b)&&sh(b)&&this.b(b)?(b=b.map,Zc(b.O(),1),b.render(),this.a=void 0,!0):!1}Fh.prototype.w=dc;function Jh(b){this.c=null;this.b=document.createElement("div");this.b.style.position="absolute";this.b.className="ol-box "+b;this.f=this.g=this.a=null}M(Jh,ib);Jh.prototype.J=function(){this.setMap(null)};function Kh(b){var c=b.g,d=b.f;b=b.b.style;b.left=Math.min(c[0],d[0])+"px";b.top=Math.min(c[1],d[1])+"px";b.width=Math.abs(d[0]-c[0])+"px";b.height=Math.abs(d[1]-c[1])+"px"}
Jh.prototype.setMap=function(b){if(this.a){this.a.o.removeChild(this.b);var c=this.b.style;c.left=c.top=c.width=c.height="inherit"}(this.a=b)&&this.a.o.appendChild(this.b)};function Lh(b){var c=b.g,d=b.f,c=[c,[c[0],d[1]],d,[d[0],c[1]]].map(b.a.ta,b.a);c[4]=c[0].slice();b.c?b.c.W([c]):b.c=new Tc([c])}Jh.prototype.M=function(){return this.c};function Mh(b,c,d){R.call(this,b);this.coordinate=c;this.mapBrowserEvent=d}M(Mh,R);function Nh(b){xh.call(this,{handleDownEvent:Oh,handleDragEvent:Ph,handleUpEvent:Qh});b=b?b:{};this.a=new Jh(b.className||"ol-dragbox");this.b=null;this.j=b.condition?b.condition:cc;this.i=b.boxEndCondition?b.boxEndCondition:Rh}M(Nh,xh);function Rh(b,c,d){b=d[0]-c[0];c=d[1]-c[1];return 64<=b*b+c*c}
function Ph(b){if(wh(b)){var c=this.a,d=b.pixel;c.g=this.b;c.f=d;Lh(c);Kh(c);S(this,new Mh("boxdrag",b.coordinate,b))}}Nh.prototype.M=function(){return this.a.M()};Nh.prototype.h=pa;function Qh(b){if(!wh(b))return!0;this.a.setMap(null);this.i(b,this.b,b.pixel)&&(this.h(b),S(this,new Mh("boxend",b.coordinate,b)));return!1}
function Oh(b){if(wh(b)&&sh(b)&&this.j(b)){this.b=b.pixel;this.a.setMap(b.map);var c=this.a,d=this.b;c.g=this.b;c.f=d;Lh(c);Kh(c);S(this,new Mh("boxstart",b.coordinate,b));return!0}return!1};function Sh(b){b=b?b:{};var c=b.condition?b.condition:uh;this.g=void 0!==b.duration?b.duration:200;this.o=void 0!==b.out?b.out:!1;Nh.call(this,{condition:c,className:b.className||"ol-dragzoom"})}M(Sh,Nh);
Sh.prototype.h=function(){var b=this.S,c=b.O(),d=b.Pa(),e=this.M().C();if(this.o){var f=c.jc(d),e=[Eh(b,Xb(e)),Eh(b,[e[2],e[3]])],g=Pb(void 0),h,k;h=0;for(k=e.length;h<k;++h)Kb(g,e[h]);g=1/Xc(g,d);e=(f[2]-f[0])/2*(g-1);g=(f[3]-f[1])/2*(g-1);f[0]-=e;f[2]+=e;f[1]-=g;f[3]+=g;e=f}d=c.constrainResolution(Xc(e,d));f=c.I();g=c.ia();b.fa(ed({resolution:f,duration:this.g,easing:$c}));b.fa(cd({source:g,duration:this.g,easing:$c}));c.oa(Yb(e));Yc(c,d)};function Th(b){lh.call(this,{handleEvent:Uh});b=b||{};this.a=function(b){return th.call(this,b)&&vh.call(this,b)};this.b=void 0!==b.condition?b.condition:this.a;this.c=void 0!==b.duration?b.duration:100;this.g=void 0!==b.pixelDelta?b.pixelDelta:128}M(Th,lh);
function Uh(b){var c=!1;if("keydown"==b.type){var d=b.originalEvent.keyCode;if(this.b(b)&&(40==d||37==d||39==d||38==d)){var e=b.map,c=e.O(),f=c.I()*this.g,g=0,h=0;40==d?h=-f:37==d?g=-f:39==d?g=f:h=f;d=[g,h];vb(d,c.Z());f=this.c;if(g=c.ia())f&&0<f&&e.fa(cd({source:g,duration:f,easing:bd})),e=c.a.center([g[0]+d[0],g[1]+d[1]]),c.oa(e);b.preventDefault();c=!0}}return!c};function Vh(b){lh.call(this,{handleEvent:Wh});b=b?b:{};this.b=b.condition?b.condition:vh;this.a=b.delta?b.delta:1;this.c=void 0!==b.duration?b.duration:100}M(Vh,lh);function Wh(b){var c=!1;if("keydown"==b.type||"keypress"==b.type){var d=b.originalEvent.charCode;if(this.b(b)&&(43==d||45==d)){c=b.map;d=43==d?this.a:-this.a;c.render();var e=c.O();nh(c,e,d,void 0,this.c);b.preventDefault();c=!0}}return!c};function Xh(b){lh.call(this,{handleEvent:Yh});b=b||{};this.a=0;this.i=void 0!==b.duration?b.duration:250;this.j=void 0!==b.useAnchor?b.useAnchor:!0;this.c=null;this.g=this.b=void 0}M(Xh,lh);
function Yh(b){var c=!1;if("wheel"==b.type||"mousewheel"==b.type){var c=b.map,d=b.originalEvent;this.j&&(this.c=b.coordinate);var e;"wheel"==b.type?(e=d.deltaY,Af&&d.deltaMode===x.WheelEvent.DOM_DELTA_PIXEL&&(e/=Df),d.deltaMode===x.WheelEvent.DOM_DELTA_LINE&&(e*=40)):"mousewheel"==b.type&&(e=-d.wheelDeltaY,Bf&&(e/=3));this.a+=e;void 0===this.b&&(this.b=Date.now());e=Math.max(80-(Date.now()-this.b),0);x.clearTimeout(this.g);this.g=x.setTimeout(this.h.bind(this,c),e);b.preventDefault();c=!0}return!c}
Xh.prototype.h=function(b){var c=Ca(this.a,-1,1),d=b.O();b.render();nh(b,d,-c,this.c,this.i);this.a=0;this.c=null;this.g=this.b=void 0};function Zh(b){xh.call(this,{handleDownEvent:$h,handleDragEvent:ai,handleUpEvent:bi});b=b||{};this.b=null;this.g=void 0;this.a=!1;this.h=0;this.j=void 0!==b.threshold?b.threshold:.3;this.i=void 0!==b.duration?b.duration:250}M(Zh,xh);
function ai(b){var c=0,d=this.c[0],e=this.c[1],d=Math.atan2(e.clientY-d.clientY,e.clientX-d.clientX);void 0!==this.g&&(c=d-this.g,this.h+=c,!this.a&&Math.abs(this.h)>this.j&&(this.a=!0));this.g=d;b=b.map;d=b.a.getBoundingClientRect();e=zh(this.c);e[0]-=d.left;e[1]-=d.top;this.b=b.ta(e);this.a&&(d=b.O(),e=d.Z(),b.render(),mh(b,d,e+c,this.b))}
function bi(b){if(2>this.c.length){b=b.map;var c=b.O();Zc(c,-1);if(this.a){var d=c.Z(),e=this.b,f=this.i,d=c.constrainRotation(d,0);mh(b,c,d,e,f)}return!1}return!0}function $h(b){return 2<=this.c.length?(b=b.map,this.b=null,this.g=void 0,this.a=!1,this.h=0,this.s||Zc(b.O(),1),b.render(),!0):!1}Zh.prototype.w=dc;function ci(b){xh.call(this,{handleDownEvent:di,handleDragEvent:ei,handleUpEvent:fi});b=b?b:{};this.b=null;this.h=void 0!==b.duration?b.duration:400;this.a=void 0;this.g=1}M(ci,xh);function ei(b){var c=1,d=this.c[0],e=this.c[1],f=d.clientX-e.clientX,d=d.clientY-e.clientY,f=Math.sqrt(f*f+d*d);void 0!==this.a&&(c=this.a/f);this.a=f;1!=c&&(this.g=c);b=b.map;var f=b.O(),d=f.I(),e=b.a.getBoundingClientRect(),g=zh(this.c);g[0]-=e.left;g[1]-=e.top;this.b=b.ta(g);b.render();oh(b,f,d*c,this.b)}
function fi(b){if(2>this.c.length){b=b.map;var c=b.O();Zc(c,-1);var d=c.I(),e=this.b,f=this.h,d=c.constrainResolution(d,0,this.g-1);oh(b,c,d,e,f);return!1}return!0}function di(b){return 2<=this.c.length?(b=b.map,this.b=null,this.a=void 0,this.g=1,this.s||Zc(b.O(),1),b.render(),!0):!1}ci.prototype.w=dc;function gi(b){var c=b||{};b=Wa({},c);delete b.layers;c=c.layers;Cg.call(this,b);this.b=[];this.a={};Q(this,rb("layers"),this.Fd,this);c?Array.isArray(c)&&(c=new ld(c.slice())):c=new ld;this.set("layers",c)}M(gi,Cg);p=gi.prototype;p.ob=function(){this.cb()&&this.v()};
p.Fd=function(){this.b.forEach(N);this.b.length=0;var b=this.get("layers");this.b.push(Q(b,"add",this.Ed,this),Q(b,"remove",this.Gd,this));for(var c in this.a)this.a[c].forEach(N);Ya(this.a);var b=b.a,d,e;c=0;for(d=b.length;c<d;c++)e=b[c],this.a[I(e).toString()]=[Q(e,"propertychange",this.ob,this),Q(e,"change",this.ob,this)];this.v()};p.Ed=function(b){b=b.element;var c=I(b).toString();this.a[c]=[Q(b,"propertychange",this.ob,this),Q(b,"change",this.ob,this)];this.v()};
p.Gd=function(b){b=I(b.element).toString();this.a[b].forEach(N);delete this.a[b];this.v()};p.Lb=function(b){var c=void 0!==b?b:[],d=c.length;nd(this.get("layers"),function(b){b.Lb(c)});b=Dg(this);var e,f;for(e=c.length;d<e;d++)f=c[d],f.opacity*=b.opacity,f.visible=f.visible&&b.visible,f.maxResolution=Math.min(f.maxResolution,b.maxResolution),f.minResolution=Math.max(f.minResolution,b.minResolution),void 0!==b.extent&&(f.extent=void 0!==f.extent?$b(f.extent,b.extent):b.extent);return c};p.Pb=function(){return"ready"};function hi(b){ic.call(this,{code:b,units:"m",extent:ii,global:!0,worldExtent:ji})}M(hi,ic);hi.prototype.getPointResolution=function(b,c){return b/Da(c[1]/6378137)};var ki=6378137*Math.PI,ii=[-ki,-ki,ki,ki],ji=[-180,-85,180,85],li="EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" ").map(function(b){return new hi(b)});
function mi(b,c,d){var e=b.length;d=1<d?d:2;void 0===c&&(2<d?c=b.slice():c=Array(e));for(var f=0;f<e;f+=d)c[f]=6378137*Math.PI*b[f]/180,c[f+1]=6378137*Math.log(Math.tan(Math.PI*(b[f+1]+90)/360));return c}function ni(b,c,d){var e=b.length;d=1<d?d:2;void 0===c&&(2<d?c=b.slice():c=Array(e));for(var f=0;f<e;f+=d)c[f]=180*b[f]/(6378137*Math.PI),c[f+1]=360*Math.atan(Math.exp(b[f+1]/6378137))/Math.PI-90;return c};var oi=new ec(6378137);function pi(b,c){ic.call(this,{code:b,units:"degrees",extent:qi,axisOrientation:c,global:!0,metersPerUnit:ri,worldExtent:qi})}M(pi,ic);pi.prototype.getPointResolution=function(b){return b};
var qi=[-180,-90,180,90],ri=Math.PI*oi.radius/180,si=[new pi("CRS:84"),new pi("EPSG:4326","neu"),new pi("urn:ogc:def:crs:EPSG::4326","neu"),new pi("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new pi("urn:ogc:def:crs:OGC:1.3:CRS84"),new pi("urn:ogc:def:crs:OGC:2:84"),new pi("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new pi("urn:x-ogc:def:crs:EPSG:4326","neu")];function X(b){b=b?b:{};var c=Wa({},b);delete c.preload;delete c.useInterimTilesOnError;Gg.call(this,c);this.set("preload",void 0!==b.preload?b.preload:0);this.set("useInterimTilesOnError",void 0!==b.useInterimTilesOnError?b.useInterimTilesOnError:!0)}M(X,Gg);function ti(b){return b.get("useInterimTilesOnError")};var ui=[0,0,0,1],vi=[],wi=[0,0,0,1];function xi(b,c,d,e){0!==c&&(b.translate(d,e),b.rotate(c),b.translate(-d,-e))};function yi(b){b=b||{};this.a=void 0!==b.color?b.color:null;this.b=void 0}yi.prototype.ga=function(){return this.a};function zi(){this.b=-1};function Ai(){this.b=-1;this.b=64;this.a=Array(4);this.g=Array(this.b);this.c=this.f=0;this.a[0]=1732584193;this.a[1]=4023233417;this.a[2]=2562383102;this.a[3]=271733878;this.c=this.f=0}M(Ai,zi);
function Bi(b,c,d){d||(d=0);var e=Array(16);if(da(c))for(var f=0;16>f;++f)e[f]=c.charCodeAt(d++)|c.charCodeAt(d++)<<8|c.charCodeAt(d++)<<16|c.charCodeAt(d++)<<24;else for(f=0;16>f;++f)e[f]=c[d++]|c[d++]<<8|c[d++]<<16|c[d++]<<24;c=b.a[0];d=b.a[1];var f=b.a[2],g=b.a[3],h=0,h=c+(g^d&(f^g))+e[0]+3614090360&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[1]+3905402710&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+(d^g&(c^d))+e[2]+606105819&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^
c))+e[3]+3250441966&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(g^d&(f^g))+e[4]+4118548399&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[5]+1200080426&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+(d^g&(c^d))+e[6]+2821735955&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^c))+e[7]+4249261313&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(g^d&(f^g))+e[8]+1770035416&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[9]+2336552879&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+
(d^g&(c^d))+e[10]+4294925233&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^c))+e[11]+2304563134&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(g^d&(f^g))+e[12]+1804603682&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[13]+4254626195&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+(d^g&(c^d))+e[14]+2792965006&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^c))+e[15]+1236535329&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(f^g&(d^f))+e[1]+4129170786&4294967295;c=d+(h<<5&4294967295|
h>>>27);h=g+(d^f&(c^d))+e[6]+3225465664&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[11]+643717713&4294967295;f=g+(h<<14&4294967295|h>>>18);h=d+(g^c&(f^g))+e[0]+3921069994&4294967295;d=f+(h<<20&4294967295|h>>>12);h=c+(f^g&(d^f))+e[5]+3593408605&4294967295;c=d+(h<<5&4294967295|h>>>27);h=g+(d^f&(c^d))+e[10]+38016083&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[15]+3634488961&4294967295;f=g+(h<<14&4294967295|h>>>18);h=d+(g^c&(f^g))+e[4]+3889429448&4294967295;d=f+(h<<20&4294967295|
h>>>12);h=c+(f^g&(d^f))+e[9]+568446438&4294967295;c=d+(h<<5&4294967295|h>>>27);h=g+(d^f&(c^d))+e[14]+3275163606&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[3]+4107603335&4294967295;f=g+(h<<14&4294967295|h>>>18);h=d+(g^c&(f^g))+e[8]+1163531501&4294967295;d=f+(h<<20&4294967295|h>>>12);h=c+(f^g&(d^f))+e[13]+2850285829&4294967295;c=d+(h<<5&4294967295|h>>>27);h=g+(d^f&(c^d))+e[2]+4243563512&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[7]+1735328473&4294967295;f=g+(h<<14&4294967295|
h>>>18);h=d+(g^c&(f^g))+e[12]+2368359562&4294967295;d=f+(h<<20&4294967295|h>>>12);h=c+(d^f^g)+e[5]+4294588738&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[8]+2272392833&4294967295;g=c+(h<<11&4294967295|h>>>21);h=f+(g^c^d)+e[11]+1839030562&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[14]+4259657740&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(d^f^g)+e[1]+2763975236&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[4]+1272893353&4294967295;g=c+(h<<11&4294967295|h>>>21);h=f+(g^
c^d)+e[7]+4139469664&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[10]+3200236656&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(d^f^g)+e[13]+681279174&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[0]+3936430074&4294967295;g=c+(h<<11&4294967295|h>>>21);h=f+(g^c^d)+e[3]+3572445317&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[6]+76029189&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(d^f^g)+e[9]+3654602809&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[12]+3873151461&4294967295;
g=c+(h<<11&4294967295|h>>>21);h=f+(g^c^d)+e[15]+530742520&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[2]+3299628645&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(f^(d|~g))+e[0]+4096336452&4294967295;c=d+(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[7]+1126891415&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[14]+2878612391&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[5]+4237533241&4294967295;d=f+(h<<21&4294967295|h>>>11);h=c+(f^(d|~g))+e[12]+1700485571&4294967295;c=d+
(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[3]+2399980690&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[10]+4293915773&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[1]+2240044497&4294967295;d=f+(h<<21&4294967295|h>>>11);h=c+(f^(d|~g))+e[8]+1873313359&4294967295;c=d+(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[15]+4264355552&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[6]+2734768916&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[13]+1309151649&4294967295;
d=f+(h<<21&4294967295|h>>>11);h=c+(f^(d|~g))+e[4]+4149444226&4294967295;c=d+(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[11]+3174756917&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[2]+718787259&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[9]+3951481745&4294967295;b.a[0]=b.a[0]+c&4294967295;b.a[1]=b.a[1]+(f+(h<<21&4294967295|h>>>11))&4294967295;b.a[2]=b.a[2]+f&4294967295;b.a[3]=b.a[3]+g&4294967295}
function Ci(b,c){var d;void 0===d&&(d=c.length);for(var e=d-b.b,f=b.g,g=b.f,h=0;h<d;){if(0==g)for(;h<=e;)Bi(b,c,h),h+=b.b;if(da(c))for(;h<d;){if(f[g++]=c.charCodeAt(h++),g==b.b){Bi(b,f);g=0;break}}else for(;h<d;)if(f[g++]=c[h++],g==b.b){Bi(b,f);g=0;break}}b.f=g;b.c+=d};function Di(b){b=b||{};this.f=void 0!==b.color?b.color:null;this.Da=b.lineCap;this.a=void 0!==b.lineDash?b.lineDash:null;this.Ea=b.lineJoin;this.Fa=b.miterLimit;this.c=b.width;this.b=void 0}Di.prototype.ga=function(){return this.f};Di.prototype.getLineDash=function(){return this.a};Di.prototype.ha=function(){return this.c};function Ei(b){b=b||{};this.h=this.a=this.g=null;this.f=void 0!==b.fill?b.fill:null;this.b=void 0!==b.stroke?b.stroke:null;this.c=b.radius;this.o=[0,0];this.j=this.s=this.A=null;var c=b.atlasManager,d,e=null,f,g=0;this.b&&(f=vd(this.b.ga()),g=this.b.ha(),void 0===g&&(g=1),e=this.b.getLineDash(),Ef||(e=null));var h=2*(this.c+g)+1;f={strokeStyle:f,Wc:g,size:h,lineDash:e};if(void 0===c)this.a=document.createElement("CANVAS"),this.a.height=h,this.a.width=h,d=h=this.a.width,c=this.a.getContext("2d"),this.tc(f,
c,0,0),this.f?this.h=this.a:(c=this.h=document.createElement("CANVAS"),c.height=f.size,c.width=f.size,c=c.getContext("2d"),this.oc(f,c,0,0));else{h=Math.round(h);(e=!this.f)&&(d=this.oc.bind(this,f));if(this.b){g=this.b;if(void 0===g.b){var k="s"+(g.f?vd(g.f):"-")+","+(void 0!==g.Da?g.Da.toString():"-")+","+(g.a?g.a.toString():"-")+","+(void 0!==g.Ea?g.Ea:"-")+","+(void 0!==g.Fa?g.Fa.toString():"-")+","+(void 0!==g.c?g.c.toString():"-"),l=new Ai;Ci(l,k);var m=Array((56>l.f?l.b:2*l.b)-l.f);m[0]=128;
for(k=1;k<m.length-8;++k)m[k]=0;for(var n=8*l.c,k=m.length-8;k<m.length;++k)m[k]=n&255,n/=256;Ci(l,m);m=Array(16);for(k=n=0;4>k;++k)for(var q=0;32>q;q+=8)m[n++]=l.a[k]>>>q&255;if(8192>=m.length)l=String.fromCharCode.apply(null,m);else for(l="",k=0;k<m.length;k+=8192)l+=String.fromCharCode.apply(null,rd(m,k,k+8192));g.b=l}g=g.b}else g="-";this.f?(l=this.f,void 0===l.b&&(l.b=l.a instanceof CanvasPattern||l.a instanceof CanvasGradient?I(l.a).toString():"f"+(l.a?vd(l.a):"-")),l=l.b):l="-";this.g&&g==
this.g[1]&&l==this.g[2]&&this.c==this.g[3]||(this.g=["c"+g+l+(void 0!==this.c?this.c.toString():"-"),g,l,this.c]);f=c.add(this.g[0],h,h,this.tc.bind(this,f),d);this.a=f.image;this.o=[f.offsetX,f.offsetY];d=f.image.width;e?this.h=f.Ye:this.h=this.a}this.A=[h/2,h/2];this.s=[h,h];this.j=[d,d];Ug.call(this,{opacity:1,rotateWithView:!1,rotation:0,scale:1,snapToPixel:void 0!==b.snapToPixel?b.snapToPixel:!0})}M(Ei,Ug);p=Ei.prototype;p.jb=function(){return this.A};p.Ka=function(){return this.f};p.Xb=function(){return this.h};
p.T=function(){return this.a};p.rb=function(){return 2};p.wc=function(){return this.j};p.ka=function(){return this.o};p.Qa=function(){return this.s};p.va=function(){return this.b};p.Bc=pa;p.load=pa;p.Xc=pa;p.tc=function(b,c,d,e){c.setTransform(1,0,0,1,0,0);c.translate(d,e);c.beginPath();c.arc(b.size/2,b.size/2,this.c,0,2*Math.PI,!0);this.f&&(c.fillStyle=yd(this.f.ga()),c.fill());this.b&&(c.strokeStyle=b.strokeStyle,c.lineWidth=b.Wc,b.lineDash&&c.setLineDash(b.lineDash),c.stroke());c.closePath()};
p.oc=function(b,c,d,e){c.setTransform(1,0,0,1,0,0);c.translate(d,e);c.beginPath();c.arc(b.size/2,b.size/2,this.c,0,2*Math.PI,!0);c.fillStyle=vd(ui);c.fill();this.b&&(c.strokeStyle=b.strokeStyle,c.lineWidth=b.Wc,b.lineDash&&c.setLineDash(b.lineDash),c.stroke());c.closePath()};function Fi(b){b=b||{};this.f=null;this.b=Gi;void 0!==b.geometry&&Hi(this,b.geometry);this.c=void 0!==b.fill?b.fill:null;this.g=void 0!==b.image?b.image:null;this.h=void 0!==b.stroke?b.stroke:null;this.sa=void 0!==b.text?b.text:null;this.a=b.zIndex}Fi.prototype.M=function(){return this.f};Fi.prototype.Ka=function(){return this.c};Fi.prototype.T=function(){return this.g};Fi.prototype.va=function(){return this.h};
function Hi(b,c){ga(c)?b.b=c:"string"===typeof c?b.b=function(b){return b.get(c)}:c?void 0!==c&&(b.b=function(){return c}):b.b=Gi;b.f=c}function Ii(b){if(!ga(b)){var c;c=Array.isArray(b)?b:[b];b=function(){return c}}return b}var Ji=null;function Ki(){if(!Ji){var b=new yi({color:"rgba(255,255,255,0.4)"}),c=new Di({color:"#3399CC",width:1.25});Ji=[new Fi({image:new Ei({fill:b,stroke:c,radius:5}),fill:b,stroke:c})]}return Ji}
function Li(){var b={},c=[255,255,255,1],d=[0,153,255,1];b.Polygon=[new Fi({fill:new yi({color:[255,255,255,.5]})})];b.MultiPolygon=b.Polygon;b.LineString=[new Fi({stroke:new Di({color:c,width:5})}),new Fi({stroke:new Di({color:d,width:3})})];b.MultiLineString=b.LineString;b.Circle=b.Polygon.concat(b.LineString);b.Point=[new Fi({image:new Ei({radius:6,fill:new yi({color:d}),stroke:new Di({color:c,width:1.5})}),zIndex:Infinity})];b.MultiPoint=b.Point;b.GeometryCollection=b.Polygon.concat(b.LineString,
b.Point);return b}function Gi(b){return b.M()};function Y(b){b=b?b:{};var c=Wa({},b);delete c.style;delete c.renderBuffer;delete c.updateWhileAnimating;delete c.updateWhileInteracting;Gg.call(this,c);this.a=void 0!==b.renderBuffer?b.renderBuffer:100;this.o=null;this.g=void 0;this.s(b.style);this.i=void 0!==b.updateWhileAnimating?b.updateWhileAnimating:!1;this.j=void 0!==b.updateWhileInteracting?b.updateWhileInteracting:!1}M(Y,Gg);Y.prototype.s=function(b){this.o=void 0!==b?b:Ki;this.g=null===b?void 0:Ii(this.o);this.v()};function Mi(b,c,d,e,f){this.c=b;this.u=c;this.l=d;this.w=e;this.Ja=f;this.g=this.a=this.b=this.Y=this.ba=this.S=null;this.aa=this.ja=this.o=this.D=this.K=this.B=0;this.ea=!1;this.h=this.na=0;this.za=!1;this.G=0;this.f="";this.j=this.H=this.Aa=this.pa=0;this.P=this.A=this.i=null;this.s=[];this.Ba=zb()}M(Mi,Eg);
function Ni(b,c,d){if(b.g){c=Ac(c,0,d,2,b.w,b.s);d=b.c;var e=b.Ba,f=d.globalAlpha;1!=b.o&&(d.globalAlpha=f*b.o);var g=b.na;b.ea&&(g+=b.Ja);var h,k;h=0;for(k=c.length;h<k;h+=2){var l=c[h]-b.B,m=c[h+1]-b.K;b.za&&(l=Math.round(l),m=Math.round(m));if(0!==g||1!=b.h){var n=l+b.B,q=m+b.K;Ig(e,n,q,b.h,b.h,g,-n,-q);d.setTransform(e[0],e[1],e[4],e[5],e[12],e[13])}d.drawImage(b.g,b.ja,b.aa,b.G,b.D,l,m,b.G,b.D)}0===g&&1==b.h||d.setTransform(1,0,0,1,0,0);1!=b.o&&(d.globalAlpha=f)}}
function Oi(b,c,d,e){var f=0;if(b.P&&""!==b.f){b.i&&Pi(b,b.i);b.A&&Qi(b,b.A);var g=b.P,h=b.c,k=b.Y;k?(k.font!=g.font&&(k.font=h.font=g.font),k.textAlign!=g.textAlign&&(k.textAlign=h.textAlign=g.textAlign),k.textBaseline!=g.textBaseline&&(k.textBaseline=h.textBaseline=g.textBaseline)):(h.font=g.font,h.textAlign=g.textAlign,h.textBaseline=g.textBaseline,b.Y={font:g.font,textAlign:g.textAlign,textBaseline:g.textBaseline});c=Ac(c,f,d,e,b.w,b.s);for(g=b.c;f<d;f+=e){h=c[f]+b.pa;k=c[f+1]+b.Aa;if(0!==b.H||
1!=b.j){var l=Ig(b.Ba,h,k,b.j,b.j,b.H,-h,-k);g.setTransform(l[0],l[1],l[4],l[5],l[12],l[13])}b.A&&g.strokeText(b.f,h,k);b.i&&g.fillText(b.f,h,k)}0===b.H&&1==b.j||g.setTransform(1,0,0,1,0,0)}}function Ri(b,c,d,e,f,g){var h=b.c;b=Ac(c,d,e,f,b.w,b.s);h.moveTo(b[0],b[1]);c=b.length;g&&(c-=2);for(d=2;d<c;d+=2)h.lineTo(b[d],b[d+1]);g&&h.closePath();return e}function Si(b,c,d,e,f){var g,h;g=0;for(h=e.length;g<h;++g)d=Ri(b,c,d,e[g],f,!0);return d}p=Mi.prototype;
p.nc=function(b){if(ac(this.l,b.C())){if(this.b||this.a){this.b&&Pi(this,this.b);this.a&&Qi(this,this.a);var c;c=this.w;var d=this.s,e=b.a;c=e?Ac(e,0,e.length,b.b,c,d):null;d=c[2]-c[0];e=c[3]-c[1];d=Math.sqrt(d*d+e*e);e=this.c;e.beginPath();e.arc(c[0],c[1],d,0,2*Math.PI);this.b&&e.fill();this.a&&e.stroke()}""!==this.f&&Oi(this,b.a.slice(0,b.b),2,2)}};p.$a=function(b){var c=b.a;b=b.b;this.g&&Ni(this,c,c.length);""!==this.f&&Oi(this,c,c.length,b)};
p.Za=function(b){var c=b.a;b=b.b;this.g&&Ni(this,c,c.length);""!==this.f&&Oi(this,c,c.length,b)};p.pc=function(b){if(ac(this.l,b.C())){if(this.a){Qi(this,this.a);var c=this.c,d=b.a;c.beginPath();Ri(this,d,0,d.length,b.b,!1);c.stroke()}""!==this.f&&(b=Ti(b),Oi(this,b,2,2))}};
p.qc=function(b){var c=b.C();if(ac(this.l,c)){if(this.a){Qi(this,this.a);var c=this.c,d=b.a,e=0,f=b.ab(),g=b.b;c.beginPath();var h,k;h=0;for(k=f.length;h<k;++h)e=Ri(this,d,e,f[h],g,!1);c.stroke()}""!==this.f&&(b=Ui(b),Oi(this,b,b.length,2))}};p.sc=function(b){if(ac(this.l,b.C())){if(this.a||this.b){this.b&&Pi(this,this.b);this.a&&Qi(this,this.a);var c=this.c;c.beginPath();Si(this,Vc(b),0,b.ab(),b.b);this.b&&c.fill();this.a&&c.stroke()}""!==this.f&&(b=Wc(b),Oi(this,b,2,2))}};
p.rc=function(b){if(ac(this.l,b.C())){if(this.a||this.b){this.b&&Pi(this,this.b);this.a&&Qi(this,this.a);var c=this.c,d=Vi(b),e=0,f=b.c,g=b.b,h,k;h=0;for(k=f.length;h<k;++h){var l=f[h];c.beginPath();e=Si(this,d,e,l,g);this.b&&c.fill();this.a&&c.stroke()}}""!==this.f&&(b=Wi(b),Oi(this,b,b.length,2))}};function Pi(b,c){var d=b.c,e=b.S;e?e.fillStyle!=c.fillStyle&&(e.fillStyle=d.fillStyle=c.fillStyle):(d.fillStyle=c.fillStyle,b.S={fillStyle:c.fillStyle})}
function Qi(b,c){var d=b.c,e=b.ba;e?(e.lineCap!=c.lineCap&&(e.lineCap=d.lineCap=c.lineCap),Ef&&!Ma(e.lineDash,c.lineDash)&&d.setLineDash(e.lineDash=c.lineDash),e.lineJoin!=c.lineJoin&&(e.lineJoin=d.lineJoin=c.lineJoin),e.lineWidth!=c.lineWidth&&(e.lineWidth=d.lineWidth=c.lineWidth),e.miterLimit!=c.miterLimit&&(e.miterLimit=d.miterLimit=c.miterLimit),e.strokeStyle!=c.strokeStyle&&(e.strokeStyle=d.strokeStyle=c.strokeStyle)):(d.lineCap=c.lineCap,Ef&&d.setLineDash(c.lineDash),d.lineJoin=c.lineJoin,d.lineWidth=
c.lineWidth,d.miterLimit=c.miterLimit,d.strokeStyle=c.strokeStyle,b.ba={lineCap:c.lineCap,lineDash:c.lineDash,lineJoin:c.lineJoin,lineWidth:c.lineWidth,miterLimit:c.miterLimit,strokeStyle:c.strokeStyle})}
p.Ga=function(b,c){if(b){var d=b.ga();this.b={fillStyle:yd(d?d:ui)}}else this.b=null;if(c){var d=c.ga(),e=c.Da,f=c.getLineDash(),g=c.Ea,h=c.ha(),k=c.Fa;this.a={lineCap:void 0!==e?e:"round",lineDash:f?f:vi,lineJoin:void 0!==g?g:"round",lineWidth:this.u*(void 0!==h?h:1),miterLimit:void 0!==k?k:10,strokeStyle:vd(d?d:wi)}}else this.a=null};
p.Ha=function(b){if(b){var c=b.jb(),d=b.T(1),e=b.ka(),f=b.Qa();this.B=c[0];this.K=c[1];this.D=f[1];this.g=d;this.o=b.l;this.ja=e[0];this.aa=e[1];this.ea=b.i;this.na=b.Z();this.h=b.gb;this.za=b.u;this.G=f[0]}else this.g=null};
p.xa=function(b){if(b){var c=b.Ka();c?(c=c.ga(),this.i={fillStyle:yd(c?c:ui)}):this.i=null;var d=b.va();if(d){var c=d.ga(),e=d.Da,f=d.getLineDash(),g=d.Ea,h=d.ha(),d=d.Fa;this.A={lineCap:void 0!==e?e:"round",lineDash:f?f:vi,lineJoin:void 0!==g?g:"round",lineWidth:void 0!==h?h:1,miterLimit:void 0!==d?d:10,strokeStyle:vd(c?c:wi)}}else this.A=null;var c=b.qd(),e=b.rd(),f=b.sd(),g=b.Z(),h=b.gb,d=b.sa,k=b.td();b=b.ud();this.P={font:void 0!==c?c:"10px sans-serif",textAlign:void 0!==k?k:"center",textBaseline:void 0!==
b?b:"middle"};this.f=void 0!==d?d:"";this.pa=void 0!==e?this.u*e:0;this.Aa=void 0!==f?this.u*f:0;this.H=void 0!==g?g:0;this.j=this.u*(void 0!==h?h:1)}else this.f=""};function Xi(b){Lg.call(this,b);this.K=zb()}M(Xi,Lg);
Xi.prototype.g=function(b,c,d){Yi(this,"precompose",d,b,void 0);var e=this.T();if(e){var f=c.extent,g=void 0!==f;if(g){var h=b.pixelRatio,k=b.size[0]*h,l=b.size[1]*h,m=b.viewState.rotation,n=bc(f),q=[f[2],f[3]],r=[f[2],f[1]],f=Xb(f);Kg(b.coordinateToPixelMatrix,n,n);Kg(b.coordinateToPixelMatrix,q,q);Kg(b.coordinateToPixelMatrix,r,r);Kg(b.coordinateToPixelMatrix,f,f);d.save();xi(d,-m,k/2,l/2);d.beginPath();d.moveTo(n[0]*h,n[1]*h);d.lineTo(q[0]*h,q[1]*h);d.lineTo(r[0]*h,r[1]*h);d.lineTo(f[0]*h,f[1]*
h);d.clip();xi(d,m,k/2,l/2)}h=this.D;k=d.globalAlpha;d.globalAlpha=c.opacity;d.drawImage(e,0,0,+e.width,+e.height,Math.round(h[12]),Math.round(h[13]),Math.round(e.width*h[0]),Math.round(e.height*h[5]));d.globalAlpha=k;g&&d.restore()}Yi(this,"postcompose",d,b,void 0)};
function Yi(b,c,d,e,f){var g=b.a;if(nb(g,c)){var h=e.size[0]*e.pixelRatio,k=e.size[1]*e.pixelRatio,l=e.viewState.rotation;xi(d,-l,h/2,k/2);b=void 0!==f?f:Zi(b,e,0);b=new Mi(d,e.pixelRatio,e.extent,b,e.viewState.rotation);S(g,new Fg(c,g,b,e,d,null));xi(d,l,h/2,k/2)}}function Zi(b,c,d){var e=c.viewState,f=c.pixelRatio;return Ig(b.K,f*c.size[0]/2,f*c.size[1]/2,f/e.resolution,-f/e.resolution,-e.rotation,-e.center[0]+d,-e.center[1])};var $i=["Polygon","LineString","Image","Text"];function aj(b,c,d){this.aa=b;this.P=c;this.c=null;this.g=0;this.resolution=d;this.D=this.K=null;this.b=[];this.coordinates=[];this.ba=zb();this.a=[];this.S=[];this.Y=zb();this.ja=zb()}M(aj,Eg);
function bj(b,c,d,e,f,g){var h=b.coordinates.length,k=b.Kb(),l=[c[d],c[d+1]],m=[NaN,NaN],n=!0,q,r,u;for(q=d+f;q<e;q+=f){m[0]=c[q];m[1]=c[q+1];u=k[1];var w=k[2],y=k[3],z=m[0],D=m[1],t=0;z<k[0]?t=t|16:z>w&&(t=t|4);D<u?t|=8:D>y&&(t|=2);0===t&&(t=1);u=t;u!==r?(n&&(b.coordinates[h++]=l[0],b.coordinates[h++]=l[1]),b.coordinates[h++]=m[0],b.coordinates[h++]=m[1],n=!1):1===u?(b.coordinates[h++]=m[0],b.coordinates[h++]=m[1],n=!1):n=!0;l[0]=m[0];l[1]=m[1];r=u}q===d+f&&(b.coordinates[h++]=l[0],b.coordinates[h++]=
l[1]);g&&(b.coordinates[h++]=c[d],b.coordinates[h++]=c[d+1]);return h}function cj(b,c){b.K=[0,c,0];b.b.push(b.K);b.D=[0,c,0];b.a.push(b.D)}
function dj(b,c,d,e,f,g,h,k,l){var m;Jg(e,b.ba)?m=b.S:(m=Ac(b.coordinates,0,b.coordinates.length,2,e,b.S),Cb(b.ba,e));e=!$a(g);var n=0,q=h.length,r=0,u,w=b.Y;b=b.ja;for(var y,z,D,t;n<q;){var v=h[n],B,E,C,G;switch(v[0]){case 0:r=v[1];e&&g[I(r).toString()]||!r.M()?n=v[2]:void 0===l||ac(l,r.M().C())?++n:n=v[2];break;case 1:c.beginPath();++n;break;case 2:r=v[1];u=m[r];v=m[r+1];D=m[r+2]-u;r=m[r+3]-v;c.arc(u,v,Math.sqrt(D*D+r*r),0,2*Math.PI,!0);++n;break;case 3:c.closePath();++n;break;case 4:r=v[1];u=v[2];
B=v[3];C=v[4]*d;var J=v[5]*d,A=v[6];E=v[7];var H=v[8],O=v[9];D=v[11];t=v[12];var P=v[13],L=v[14];for(v[10]&&(D+=f);r<u;r+=2){v=m[r]-C;G=m[r+1]-J;P&&(v=Math.round(v),G=Math.round(G));if(1!=t||0!==D){var K=v+C,fa=G+J;Ig(w,K,fa,t,t,D,-K,-fa);c.transform(w[0],w[1],w[4],w[5],w[12],w[13])}K=c.globalAlpha;1!=E&&(c.globalAlpha=K*E);var fa=L+H>B.width?B.width-H:L,ra=A+O>B.height?B.height-O:A;c.drawImage(B,H,O,fa,ra,v,G,fa*d,ra*d);1!=E&&(c.globalAlpha=K);if(1!=t||0!==D)Eb(w,b),c.transform(b[0],b[1],b[4],b[5],
b[12],b[13])}++n;break;case 5:r=v[1];u=v[2];C=v[3];J=v[4]*d;A=v[5]*d;D=v[6];t=v[7]*d;B=v[8];for(E=v[9];r<u;r+=2){v=m[r]+J;G=m[r+1]+A;if(1!=t||0!==D)Ig(w,v,G,t,t,D,-v,-G),c.transform(w[0],w[1],w[4],w[5],w[12],w[13]);H=C.split("\n");O=H.length;1<O?(P=Math.round(1.5*c.measureText("M").width),G-=(O-1)/2*P):P=0;for(L=0;L<O;L++)K=H[L],E&&c.strokeText(K,v,G),B&&c.fillText(K,v,G),G+=P;if(1!=t||0!==D)Eb(w,b),c.transform(b[0],b[1],b[4],b[5],b[12],b[13])}++n;break;case 6:if(void 0!==k&&(r=v[1],r=k(r)))return r;
++n;break;case 7:c.fill();++n;break;case 8:r=v[1];u=v[2];v=m[r];G=m[r+1];D=v+.5|0;t=G+.5|0;if(D!==y||t!==z)c.moveTo(v,G),y=D,z=t;for(r+=2;r<u;r+=2)if(v=m[r],G=m[r+1],D=v+.5|0,t=G+.5|0,D!==y||t!==z)c.lineTo(v,G),y=D,z=t;++n;break;case 9:c.fillStyle=v[1];++n;break;case 10:y=void 0!==v[7]?v[7]:!0;z=v[2];c.strokeStyle=v[1];c.lineWidth=y?z*d:z;c.lineCap=v[3];c.lineJoin=v[4];c.miterLimit=v[5];Ef&&c.setLineDash(v[6]);z=y=NaN;++n;break;case 11:c.font=v[1];c.textAlign=v[2];c.textBaseline=v[3];++n;break;case 12:c.stroke();
++n;break;default:++n}}}function ej(b){var c=b.a;c.reverse();var d,e=c.length,f,g,h=-1;for(d=0;d<e;++d)if(f=c[d],g=f[0],6==g)h=d;else if(0==g){f[2]=d;f=b.a;for(g=d;h<g;){var k=f[h];f[h]=f[g];f[g]=k;++h;--g}h=-1}}function fj(b,c){b.K[2]=b.b.length;b.K=null;b.D[2]=b.a.length;b.D=null;var d=[6,c];b.b.push(d);b.a.push(d)}aj.prototype.qb=pa;aj.prototype.Kb=function(){return this.P};
function gj(b,c,d){aj.call(this,b,c,d);this.i=this.G=null;this.B=this.w=this.H=this.u=this.s=this.o=this.A=this.j=this.l=this.h=this.f=void 0}M(gj,aj);gj.prototype.$a=function(b,c){if(this.i){cj(this,c);var d=b.a,e=this.coordinates.length,d=bj(this,d,0,d.length,b.b,!1);this.b.push([4,e,d,this.i,this.f,this.h,this.l,this.j,this.A,this.o,this.s,this.u,this.H,this.w,this.B]);this.a.push([4,e,d,this.G,this.f,this.h,this.l,this.j,this.A,this.o,this.s,this.u,this.H,this.w,this.B]);fj(this,c)}};
gj.prototype.Za=function(b,c){if(this.i){cj(this,c);var d=b.a,e=this.coordinates.length,d=bj(this,d,0,d.length,b.b,!1);this.b.push([4,e,d,this.i,this.f,this.h,this.l,this.j,this.A,this.o,this.s,this.u,this.H,this.w,this.B]);this.a.push([4,e,d,this.G,this.f,this.h,this.l,this.j,this.A,this.o,this.s,this.u,this.H,this.w,this.B]);fj(this,c)}};gj.prototype.qb=function(){ej(this);this.h=this.f=void 0;this.i=this.G=null;this.B=this.w=this.u=this.s=this.o=this.A=this.j=this.H=this.l=void 0};
gj.prototype.Ha=function(b){var c=b.jb(),d=b.Qa(),e=b.Xb(1),f=b.T(1),g=b.ka();this.f=c[0];this.h=c[1];this.G=e;this.i=f;this.l=d[1];this.j=b.l;this.A=g[0];this.o=g[1];this.s=b.i;this.u=b.Z();this.H=b.gb;this.w=b.u;this.B=d[0]};function hj(b,c,d){aj.call(this,b,c,d);this.f={Ya:void 0,Ta:void 0,Ua:null,Va:void 0,Wa:void 0,Xa:void 0,Sb:0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}M(hj,aj);
function ij(b,c,d,e,f){var g=b.coordinates.length;c=bj(b,c,d,e,f,!1);g=[8,g,c];b.b.push(g);b.a.push(g);return e}p=hj.prototype;p.Kb=function(){this.c||(this.c=Mb(this.P),0<this.g&&Lb(this.c,this.resolution*(this.g+1)/2,this.c));return this.c};
function jj(b){var c=b.f,d=c.strokeStyle,e=c.lineCap,f=c.lineDash,g=c.lineJoin,h=c.lineWidth,k=c.miterLimit;c.Ya==d&&c.Ta==e&&Ma(c.Ua,f)&&c.Va==g&&c.Wa==h&&c.Xa==k||(c.Sb!=b.coordinates.length&&(b.b.push([12]),c.Sb=b.coordinates.length),b.b.push([10,d,h,e,g,k,f],[1]),c.Ya=d,c.Ta=e,c.Ua=f,c.Va=g,c.Wa=h,c.Xa=k)}
p.pc=function(b,c){var d=this.f,e=d.lineWidth;void 0!==d.strokeStyle&&void 0!==e&&(jj(this),cj(this,c),this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash],[1]),d=b.a,ij(this,d,0,d.length,b.b),this.a.push([12]),fj(this,c))};
p.qc=function(b,c){var d=this.f,e=d.lineWidth;if(void 0!==d.strokeStyle&&void 0!==e){jj(this);cj(this,c);this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash],[1]);var d=b.ab(),e=b.a,f=b.b,g=0,h,k;h=0;for(k=d.length;h<k;++h)g=ij(this,e,g,d[h],f);this.a.push([12]);fj(this,c)}};p.qb=function(){this.f.Sb!=this.coordinates.length&&this.b.push([12]);ej(this);this.f=null};
p.Ga=function(b,c){var d=c.ga();this.f.strokeStyle=vd(d?d:wi);d=c.Da;this.f.lineCap=void 0!==d?d:"round";d=c.getLineDash();this.f.lineDash=d?d:vi;d=c.Ea;this.f.lineJoin=void 0!==d?d:"round";d=c.ha();this.f.lineWidth=void 0!==d?d:1;d=c.Fa;this.f.miterLimit=void 0!==d?d:10;this.f.lineWidth>this.g&&(this.g=this.f.lineWidth,this.c=null)};
function kj(b,c,d){aj.call(this,b,c,d);this.f={mc:void 0,Ya:void 0,Ta:void 0,Ua:null,Va:void 0,Wa:void 0,Xa:void 0,fillStyle:void 0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}M(kj,aj);
function lj(b,c,d,e,f){var g=b.f,h=[1];b.b.push(h);b.a.push(h);var k,h=0;for(k=e.length;h<k;++h){var l=e[h],m=b.coordinates.length;d=bj(b,c,d,l,f,!0);d=[8,m,d];m=[3];b.b.push(d,m);b.a.push(d,m);d=l}c=[7];b.a.push(c);void 0!==g.fillStyle&&b.b.push(c);void 0!==g.strokeStyle&&(g=[12],b.b.push(g),b.a.push(g));return d}p=kj.prototype;
p.nc=function(b,c){var d=this.f,e=d.strokeStyle;if(void 0!==d.fillStyle||void 0!==e){mj(this);cj(this,c);this.a.push([9,vd(ui)]);void 0!==d.strokeStyle&&this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash]);var f=b.a,e=this.coordinates.length;bj(this,f,0,f.length,b.b,!1);f=[1];e=[2,e];this.b.push(f,e);this.a.push(f,e);e=[7];this.a.push(e);void 0!==d.fillStyle&&this.b.push(e);void 0!==d.strokeStyle&&(d=[12],this.b.push(d),this.a.push(d));fj(this,c)}};
p.sc=function(b,c){var d=this.f,e=d.strokeStyle;if(void 0!==d.fillStyle||void 0!==e)mj(this),cj(this,c),this.a.push([9,vd(ui)]),void 0!==d.strokeStyle&&this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash]),d=b.ab(),e=Vc(b),lj(this,e,0,d,b.b),fj(this,c)};
p.rc=function(b,c){var d=this.f,e=d.strokeStyle;if(void 0!==d.fillStyle||void 0!==e){mj(this);cj(this,c);this.a.push([9,vd(ui)]);void 0!==d.strokeStyle&&this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash]);var d=b.c,e=Vi(b),f=b.b,g=0,h,k;h=0;for(k=d.length;h<k;++h)g=lj(this,e,g,d[h],f);fj(this,c)}};p.qb=function(){ej(this);this.f=null;var b=this.aa;if(0!==b){var c=this.coordinates,d,e;d=0;for(e=c.length;d<e;++d)c[d]=b*Math.round(c[d]/b)}};
p.Kb=function(){this.c||(this.c=Mb(this.P),0<this.g&&Lb(this.c,this.resolution*(this.g+1)/2,this.c));return this.c};
p.Ga=function(b,c){var d=this.f;if(b){var e=b.ga();d.fillStyle=yd(e?e:ui)}else d.fillStyle=void 0;c?(e=c.ga(),d.strokeStyle=vd(e?e:wi),e=c.Da,d.lineCap=void 0!==e?e:"round",e=c.getLineDash(),d.lineDash=e?e.slice():vi,e=c.Ea,d.lineJoin=void 0!==e?e:"round",e=c.ha(),d.lineWidth=void 0!==e?e:1,e=c.Fa,d.miterLimit=void 0!==e?e:10,d.lineWidth>this.g&&(this.g=d.lineWidth,this.c=null)):(d.strokeStyle=void 0,d.lineCap=void 0,d.lineDash=null,d.lineJoin=void 0,d.lineWidth=void 0,d.miterLimit=void 0)};
function mj(b){var c=b.f,d=c.fillStyle,e=c.strokeStyle,f=c.lineCap,g=c.lineDash,h=c.lineJoin,k=c.lineWidth,l=c.miterLimit;void 0!==d&&c.mc!=d&&(b.b.push([9,d]),c.mc=c.fillStyle);void 0===e||c.Ya==e&&c.Ta==f&&c.Ua==g&&c.Va==h&&c.Wa==k&&c.Xa==l||(b.b.push([10,e,k,f,h,l,g]),c.Ya=e,c.Ta=f,c.Ua=g,c.Va=h,c.Wa=k,c.Xa=l)}function nj(b,c,d){aj.call(this,b,c,d);this.w=this.H=this.u=null;this.i="";this.s=this.o=this.A=this.j=0;this.l=this.h=this.f=null}M(nj,aj);
function oj(b,c,d,e,f){if(""!==b.i&&b.l&&(b.f||b.h)){if(b.f){var g=b.f,h=b.u;if(!h||h.fillStyle!=g.fillStyle){var k=[9,g.fillStyle];b.b.push(k);b.a.push(k);h?h.fillStyle=g.fillStyle:b.u={fillStyle:g.fillStyle}}}b.h&&(g=b.h,h=b.H,h&&h.lineCap==g.lineCap&&h.lineDash==g.lineDash&&h.lineJoin==g.lineJoin&&h.lineWidth==g.lineWidth&&h.miterLimit==g.miterLimit&&h.strokeStyle==g.strokeStyle||(k=[10,g.strokeStyle,g.lineWidth,g.lineCap,g.lineJoin,g.miterLimit,g.lineDash,!1],b.b.push(k),b.a.push(k),h?(h.lineCap=
g.lineCap,h.lineDash=g.lineDash,h.lineJoin=g.lineJoin,h.lineWidth=g.lineWidth,h.miterLimit=g.miterLimit,h.strokeStyle=g.strokeStyle):b.H={lineCap:g.lineCap,lineDash:g.lineDash,lineJoin:g.lineJoin,lineWidth:g.lineWidth,miterLimit:g.miterLimit,strokeStyle:g.strokeStyle}));g=b.l;h=b.w;h&&h.font==g.font&&h.textAlign==g.textAlign&&h.textBaseline==g.textBaseline||(k=[11,g.font,g.textAlign,g.textBaseline],b.b.push(k),b.a.push(k),h?(h.font=g.font,h.textAlign=g.textAlign,h.textBaseline=g.textBaseline):b.w=
{font:g.font,textAlign:g.textAlign,textBaseline:g.textBaseline});cj(b,f);g=b.coordinates.length;c=bj(b,c,0,d,e,!1);c=[5,g,c,b.i,b.j,b.A,b.o,b.s,!!b.f,!!b.h];b.b.push(c);b.a.push(c);fj(b,f)}}
nj.prototype.xa=function(b){if(b){var c=b.Ka();c?(c=c.ga(),c=yd(c?c:ui),this.f?this.f.fillStyle=c:this.f={fillStyle:c}):this.f=null;var d=b.va();if(d){var c=d.ga(),e=d.Da,f=d.getLineDash(),g=d.Ea,h=d.ha(),d=d.Fa,e=void 0!==e?e:"round",f=f?f.slice():vi,g=void 0!==g?g:"round",h=void 0!==h?h:1,d=void 0!==d?d:10,c=vd(c?c:wi);if(this.h){var k=this.h;k.lineCap=e;k.lineDash=f;k.lineJoin=g;k.lineWidth=h;k.miterLimit=d;k.strokeStyle=c}else this.h={lineCap:e,lineDash:f,lineJoin:g,lineWidth:h,miterLimit:d,strokeStyle:c}}else this.h=
null;var l=b.qd(),c=b.rd(),e=b.sd(),f=b.Z(),h=b.gb,d=b.sa,g=b.td(),k=b.ud();b=void 0!==l?l:"10px sans-serif";g=void 0!==g?g:"center";k=void 0!==k?k:"middle";this.l?(l=this.l,l.font=b,l.textAlign=g,l.textBaseline=k):this.l={font:b,textAlign:g,textBaseline:k};this.i=void 0!==d?d:"";this.j=void 0!==c?c:0;this.A=void 0!==e?e:0;this.o=void 0!==f?f:0;this.s=void 0!==h?h:1}else this.i=""};function pj(b,c,d,e){this.o=b;this.h=c;this.A=d;this.l=e;this.b={};this.i=rf(1,1);this.j=zb()}
function qj(b){for(var c in b.b){var d=b.b[c],e;for(e in d)d[e].qb()}}pj.prototype.g=function(b,c,d,e,f){var g=this.j;Ig(g,.5,.5,1/c,-1/c,-d,-b[0],-b[1]);var h=this.i;h.clearRect(0,0,1,1);var k;void 0!==this.l&&(k=Jb(),Kb(k,b),Lb(k,c*this.l,k));return rj(this,h,g,d,e,function(b){if(0<h.getImageData(0,0,1,1).data[3]){if(b=f(b))return b;h.clearRect(0,0,1,1)}},k)};
pj.prototype.a=function(b,c){var d=void 0!==b?b.toString():"0",e=this.b[d];void 0===e&&(e={},this.b[d]=e);d=e[c];void 0===d&&(d=new sj[c](this.o,this.h,this.A),e[c]=d);return d};pj.prototype.c=function(){return $a(this.b)};
pj.prototype.f=function(b,c,d,e,f,g){var h=Object.keys(this.b).map(Number);h.sort(Ha);if(!1!==g){var k=this.h;g=k[0];var l=k[1],m=k[2],k=k[3];g=[g,l,g,k,m,k,m,l];Ac(g,0,8,2,d,g);b.save();b.beginPath();b.moveTo(g[0],g[1]);b.lineTo(g[2],g[3]);b.lineTo(g[4],g[5]);b.lineTo(g[6],g[7]);b.closePath();b.clip()}var n,q;g=0;for(l=h.length;g<l;++g)for(n=this.b[h[g].toString()],m=0,k=$i.length;m<k;++m)q=n[$i[m]],void 0!==q&&dj(q,b,c,d,e,f,q.b,void 0);b.restore()};
function rj(b,c,d,e,f,g,h){var k=Object.keys(b.b).map(Number);k.sort(function(b,c){return c-b});var l,m,n,q,r;l=0;for(m=k.length;l<m;++l)for(q=b.b[k[l].toString()],n=$i.length-1;0<=n;--n)if(r=q[$i[n]],void 0!==r&&(r=dj(r,c,1,d,e,f,r.a,g,h)))return r}var sj={Image:gj,LineString:hj,Polygon:kj,Text:nj};function tj(b,c){return I(b)-I(c)}function uj(b,c){var d=.5*b/c;return d*d}function vj(b,c,d,e,f,g){var h=!1,k,l;if(k=d.T())l=k.rb(),2==l||3==l?k.Xc(f,g):(0==l&&k.load(),k.Bc(f,g),h=!0);if(f=(0,d.b)(c))e=f.Ob(e),(0,wj[e.U()])(b,e,d,c);return h}
var wj={Point:function(b,c,d,e){var f=d.T();if(f){if(2!=f.rb())return;var g=b.a(d.a,"Image");g.Ha(f);g.$a(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),oj(b,c.a,2,2,e)},LineString:function(b,c,d,e){var f=d.va();if(f){var g=b.a(d.a,"LineString");g.Ga(null,f);g.pc(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),oj(b,Ti(c),2,2,e)},Polygon:function(b,c,d,e){var f=d.Ka(),g=d.va();if(f||g){var h=b.a(d.a,"Polygon");h.Ga(f,g);h.sc(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),oj(b,Wc(c),2,2,e)},MultiPoint:function(b,c,d,
e){var f=d.T();if(f){if(2!=f.rb())return;var g=b.a(d.a,"Image");g.Ha(f);g.Za(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),d=c.a,oj(b,d,d.length,c.b,e)},MultiLineString:function(b,c,d,e){var f=d.va();if(f){var g=b.a(d.a,"LineString");g.Ga(null,f);g.qc(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),c=Ui(c),oj(b,c,c.length,2,e)},MultiPolygon:function(b,c,d,e){var f=d.Ka(),g=d.va();if(g||f){var h=b.a(d.a,"Polygon");h.Ga(f,g);h.rc(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),c=Wi(c),oj(b,c,c.length,2,e)},GeometryCollection:function(b,
c,d,e){c=c.a;var f,g;f=0;for(g=c.length;f<g;++f)(0,wj[c[f].U()])(b,c[f],d,e)},Circle:function(b,c,d,e){var f=d.Ka(),g=d.va();if(f||g){var h=b.a(d.a,"Polygon");h.Ga(f,g);h.nc(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),oj(b,c.a.slice(0,c.b),2,2,e)}};var xj=!((W("Chrome")||W("CriOS"))&&!W("Opera")&&!W("OPR")&&!W("Edge"))||W("iPhone")&&!W("iPod")&&!W("iPad")||W("iPad")||W("iPod");function yj(b,c,d,e){b=d-b;c=e-c;var f=Math.sqrt(b*b+c*c);return[Math.round(d+b/f),Math.round(e+c/f)]}
function zj(b,c,d,e,f,g,h,k,l,m,n){var q=rf(Math.round(d*b),Math.round(d*c));if(0===l.length)return q.canvas;q.scale(d,d);var r=Jb();l.forEach(function(b){Sb(r,b.extent)});var u=rf(Math.round(d*Vb(r)/e),Math.round(d*Wb(r)/e)),w=d/e;l.forEach(function(b){u.drawImage(b.image,m,m,b.image.width-2*m,b.image.height-2*m,(b.extent[0]-r[0])*w,-(b.extent[3]-r[3])*w,Vb(b.extent)*w,Wb(b.extent)*w)});var y=bc(h);k.c.forEach(function(b){var c=b.source,f=b.target,h=c[1][0],k=c[1][1],l=c[2][0],m=c[2][1];b=(f[0][0]-
y[0])/g;var w=-(f[0][1]-y[1])/g,n=(f[1][0]-y[0])/g,A=-(f[1][1]-y[1])/g,H=(f[2][0]-y[0])/g,O=-(f[2][1]-y[1])/g,f=c[0][0],c=c[0][1],h=h-f,k=k-c,l=l-f,m=m-c;a:{h=[[h,k,0,0,n-b],[l,m,0,0,H-b],[0,0,h,k,A-w],[0,0,l,m,O-w]];k=h.length;for(l=0;l<k;l++){for(var m=l,P=Math.abs(h[l][l]),L=l+1;L<k;L++){var K=Math.abs(h[L][l]);K>P&&(P=K,m=L)}if(0===P){h=null;break a}P=h[m];h[m]=h[l];h[l]=P;for(m=l+1;m<k;m++)for(P=-h[m][l]/h[l][l],L=l;L<k+1;L++)h[m][L]=l==L?0:h[m][L]+P*h[l][L]}l=Array(k);for(m=k-1;0<=m;m--)for(l[m]=
h[m][k]/h[m][m],P=m-1;0<=P;P--)h[P][k]-=h[P][m]*l[m];h=l}h&&(q.save(),q.beginPath(),xj?(l=(b+n+H)/3,m=(w+A+O)/3,k=yj(l,m,b,w),n=yj(l,m,n,A),H=yj(l,m,H,O),q.moveTo(k[0],k[1]),q.lineTo(n[0],n[1]),q.lineTo(H[0],H[1])):(q.moveTo(b,w),q.lineTo(n,A),q.lineTo(H,O)),q.closePath(),q.clip(),q.transform(h[0],h[2],h[1],h[3],b,w),q.translate(r[0]-f,r[3]-c),q.scale(e/d,-e/d),q.drawImage(u.canvas,0,0),q.restore())});n&&(q.save(),q.strokeStyle="black",q.lineWidth=1,k.c.forEach(function(b){var c=b.target;b=(c[0][0]-
y[0])/g;var d=-(c[0][1]-y[1])/g,e=(c[1][0]-y[0])/g,f=-(c[1][1]-y[1])/g,h=(c[2][0]-y[0])/g,c=-(c[2][1]-y[1])/g;q.beginPath();q.moveTo(b,d);q.lineTo(e,f);q.lineTo(h,c);q.closePath();q.stroke()}),q.restore());return q.canvas};function Aj(b,c,d,e,f){this.f=b;this.g=c;var g={},h=xc(this.g,this.f);this.b=function(b){var c=b[0]+"/"+b[1];g[c]||(g[c]=h(b));return g[c]};this.h=e;this.A=f*f;this.c=[];this.i=!1;this.j=this.f.a&&!!e&&!!this.f.C()&&Vb(e)==Vb(this.f.C());this.a=this.f.C()?Vb(this.f.C()):null;this.l=this.g.C()?Vb(this.g.C()):null;b=bc(d);c=[d[2],d[3]];e=[d[2],d[1]];d=Xb(d);f=this.b(b);var k=this.b(c),l=this.b(e),m=this.b(d);Bj(this,b,c,e,d,f,k,l,m,10);if(this.i){var n=Infinity;this.c.forEach(function(b){n=Math.min(n,
b.source[0][0],b.source[1][0],b.source[2][0])});this.c.forEach(function(b){if(Math.max(b.source[0][0],b.source[1][0],b.source[2][0])-n>this.a/2){var c=[[b.source[0][0],b.source[0][1]],[b.source[1][0],b.source[1][1]],[b.source[2][0],b.source[2][1]]];c[0][0]-n>this.a/2&&(c[0][0]-=this.a);c[1][0]-n>this.a/2&&(c[1][0]-=this.a);c[2][0]-n>this.a/2&&(c[2][0]-=this.a);Math.max(c[0][0],c[1][0],c[2][0])-Math.min(c[0][0],c[1][0],c[2][0])<this.a/2&&(b.source=c)}},this)}g={}}
function Bj(b,c,d,e,f,g,h,k,l,m){var n=Ib([g,h,k,l]),q=b.a?Vb(n)/b.a:null,r=b.f.a&&.5<q&&1>q,u=!1;if(0<m){if(b.g.f&&b.l)var w=Ib([c,d,e,f]),u=u|.25<Vb(w)/b.l;!r&&b.f.f&&q&&(u|=.25<q)}if(u||!b.h||ac(n,b.h)){if(!(u||isFinite(g[0])&&isFinite(g[1])&&isFinite(h[0])&&isFinite(h[1])&&isFinite(k[0])&&isFinite(k[1])&&isFinite(l[0])&&isFinite(l[1])))if(0<m)u=!0;else return;if(0<m&&(u||(q=b.b([(c[0]+e[0])/2,(c[1]+e[1])/2]),n=r?(Ea(g[0],b.a)+Ea(k[0],b.a))/2-Ea(q[0],b.a):(g[0]+k[0])/2-q[0],q=(g[1]+k[1])/2-q[1],
u=n*n+q*q>b.A),u)){Math.abs(c[0]-e[0])<=Math.abs(c[1]-e[1])?(r=[(d[0]+e[0])/2,(d[1]+e[1])/2],n=b.b(r),q=[(f[0]+c[0])/2,(f[1]+c[1])/2],u=b.b(q),Bj(b,c,d,r,q,g,h,n,u,m-1),Bj(b,q,r,e,f,u,n,k,l,m-1)):(r=[(c[0]+d[0])/2,(c[1]+d[1])/2],n=b.b(r),q=[(e[0]+f[0])/2,(e[1]+f[1])/2],u=b.b(q),Bj(b,c,r,q,f,g,n,u,l,m-1),Bj(b,r,d,e,q,n,h,k,u,m-1));return}if(r){if(!b.j)return;b.i=!0}b.c.push({source:[g,k,l],target:[c,e,f]});b.c.push({source:[g,h,k],target:[c,d,e]})}}
function Cj(b){var c=Jb();b.c.forEach(function(b){b=b.source;Kb(c,b[0]);Kb(c,b[1]);Kb(c,b[2])});return c};function Dj(b){T.call(this);this.g=void 0;this.a="geometry";this.h=null;this.c=void 0;this.b=null;Q(this,rb(this.a),this.nb,this);void 0!==b&&(b instanceof zc||!b?Ej(this,b):this.l(b))}M(Dj,T);p=Dj.prototype;p.clone=function(){var b=new Dj(this.za());Fj(b,this.a);var c=this.M();c&&Ej(b,c.clone());if(c=this.h)b.h=c,b.c=c?Gj(c):void 0,b.v();return b};p.M=function(){return this.get(this.a)};p.La=function(){return this.g};p.zd=function(){this.v()};
p.nb=function(){this.b&&(N(this.b),this.b=null);var b=this.M();b&&(this.b=Q(b,"change",this.zd,this));this.v()};function Ej(b,c){b.set(b.a,c)}function Fj(b,c){gb(b,rb(b.a),b.nb,b);b.a=c;Q(b,rb(b.a),b.nb,b);b.nb()}function Gj(b){if(!ga(b)){var c;c=Array.isArray(b)?b:[b];b=function(){return c}}return b};function Hj(b,c,d){return function(e,f,g){var h=new XMLHttpRequest;h.open("GET",ga(b)?b(e,f,g):b,!0);"arraybuffer"==c.U()&&(h.responseType="arraybuffer");h.onload=function(){if(200<=h.status&&300>h.status){var b=c.U(),e;"json"==b||"text"==b?e=h.responseText:"xml"==b?(e=h.responseXML,e||(b=h.responseText,e=(new DOMParser).parseFromString(b,"application/xml"))):"arraybuffer"==b&&(e=h.response);e&&d.call(this,c.b(e,{featureProjection:g}),c.f(Ij(e)))}}.bind(this);h.send()}}
function Jj(b,c){return Hj(b,c,function(b){this.Db(b)})};function Kj(){return[[-Infinity,-Infinity,Infinity,Infinity]]};var Lj;
(function(){var b={uc:{}};(function(){function c(b,d){if(!(this instanceof c))return new c(b,d);this.Bb=Math.max(4,b||9);this.ec=Math.max(2,Math.ceil(.4*this.Bb));d&&this.ed(d);this.clear()}function d(b,c){b.bbox=e(b,0,b.children.length,c)}function e(b,c,d,e){for(var g=[Infinity,Infinity,-Infinity,-Infinity],h;c<d;c++)h=b.children[c],f(g,b.$?e(h):h.bbox);return g}function f(b,c){b[0]=Math.min(b[0],c[0]);b[1]=Math.min(b[1],c[1]);b[2]=Math.max(b[2],c[2]);b[3]=Math.max(b[3],c[3])}function g(b,c){return b.bbox[0]-
c.bbox[0]}function h(b,c){return b.bbox[1]-c.bbox[1]}function k(b){return(b[2]-b[0])*(b[3]-b[1])}function l(b){return b[2]-b[0]+(b[3]-b[1])}function m(b,c){return b[0]<=c[0]&&b[1]<=c[1]&&c[2]<=b[2]&&c[3]<=b[3]}function n(b,c){return c[0]<=b[2]&&c[1]<=b[3]&&c[2]>=b[0]&&c[3]>=b[1]}function q(b,c,d,e,f){for(var g=[c,d],h;g.length;)d=g.pop(),c=g.pop(),d-c<=e||(h=c+Math.ceil((d-c)/e/2)*e,r(b,c,d,h,f),g.push(c,h,h,d))}function r(b,c,d,e,f){for(var g,h,k,l,m;d>c;){600<d-c&&(g=d-c+1,h=e-c+1,k=Math.log(g),
l=.5*Math.exp(2*k/3),m=.5*Math.sqrt(k*l*(g-l)/g)*(0>h-g/2?-1:1),k=Math.max(c,Math.floor(e-h*l/g+m)),h=Math.min(d,Math.floor(e+(g-h)*l/g+m)),r(b,k,h,e,f));g=b[e];h=c;l=d;u(b,c,e);for(0<f(b[d],g)&&u(b,c,d);h<l;){u(b,h,l);h++;for(l--;0>f(b[h],g);)h++;for(;0<f(b[l],g);)l--}0===f(b[c],g)?u(b,c,l):(l++,u(b,l,d));l<=e&&(c=l+1);e<=l&&(d=l-1)}}function u(b,c,d){var e=b[c];b[c]=b[d];b[d]=e}c.prototype={all:function(){return this.ac(this.data,[])},search:function(b){var c=this.data,d=[],e=this.da;if(!n(b,c.bbox))return d;
for(var f=[],g,h,k,l;c;){g=0;for(h=c.children.length;g<h;g++)k=c.children[g],l=c.$?e(k):k.bbox,n(b,l)&&(c.$?d.push(k):m(b,l)?this.ac(k,d):f.push(k));c=f.pop()}return d},load:function(b){if(!b||!b.length)return this;if(b.length<this.ec){for(var c=0,d=b.length;c<d;c++)this.Ca(b[c]);return this}b=this.cc(b.slice(),0,b.length-1,0);this.data.children.length?this.data.height===b.height?this.fc(this.data,b):(this.data.height<b.height&&(c=this.data,this.data=b,b=c),this.dc(b,this.data.height-b.height-1,!0)):
this.data=b;return this},Ca:function(b){b&&this.dc(b,this.data.height-1);return this},clear:function(){this.data={children:[],height:1,bbox:[Infinity,Infinity,-Infinity,-Infinity],$:!0};return this},remove:function(b){if(!b)return this;for(var c=this.data,d=this.da(b),e=[],f=[],g,h,k,l;c||e.length;){c||(c=e.pop(),h=e[e.length-1],g=f.pop(),l=!0);if(c.$&&(k=c.children.indexOf(b),-1!==k)){c.children.splice(k,1);e.push(c);this.dd(e);break}l||c.$||!m(c.bbox,d)?h?(g++,c=h.children[g],l=!1):c=null:(e.push(c),
f.push(g),g=0,h=c,c=c.children[0])}return this},da:function(b){return b},Hb:function(b,c){return b[0]-c[0]},Ib:function(b,c){return b[1]-c[1]},toJSON:function(){return this.data},ac:function(b,c){for(var d=[];b;)b.$?c.push.apply(c,b.children):d.push.apply(d,b.children),b=d.pop();return c},cc:function(b,c,e,f){var g=e-c+1,h=this.Bb,k;if(g<=h)return k={children:b.slice(c,e+1),height:1,bbox:null,$:!0},d(k,this.da),k;f||(f=Math.ceil(Math.log(g)/Math.log(h)),h=Math.ceil(g/Math.pow(h,f-1)));k={children:[],
height:f,bbox:null,$:!1};var g=Math.ceil(g/h),h=g*Math.ceil(Math.sqrt(h)),l,m,n;for(q(b,c,e,h,this.Hb);c<=e;c+=h)for(m=Math.min(c+h-1,e),q(b,c,m,g,this.Ib),l=c;l<=m;l+=g)n=Math.min(l+g-1,m),k.children.push(this.cc(b,l,n,f-1));d(k,this.da);return k},cd:function(b,c,d,e){for(var f,g,h,l,m,n,q,r;;){e.push(c);if(c.$||e.length-1===d)break;q=r=Infinity;f=0;for(g=c.children.length;f<g;f++)h=c.children[f],m=k(h.bbox),n=h.bbox,n=(Math.max(n[2],b[2])-Math.min(n[0],b[0]))*(Math.max(n[3],b[3])-Math.min(n[1],
b[1]))-m,n<r?(r=n,q=m<q?m:q,l=h):n===r&&m<q&&(q=m,l=h);c=l}return c},dc:function(b,c,d){var e=this.da;d=d?b.bbox:e(b);var e=[],g=this.cd(d,this.data,c,e);g.children.push(b);for(f(g.bbox,d);0<=c;)if(e[c].children.length>this.Bb)this.fd(e,c),c--;else break;this.$c(d,e,c)},fd:function(b,c){var e=b[c],f=e.children.length,g=this.ec;this.ad(e,g,f);f=this.bd(e,g,f);f={children:e.children.splice(f,e.children.length-f),height:e.height,bbox:null,$:!1};e.$&&(f.$=!0);d(e,this.da);d(f,this.da);c?b[c-1].children.push(f):
this.fc(e,f)},fc:function(b,c){this.data={children:[b,c],height:b.height+1,bbox:null,$:!1};d(this.data,this.da)},bd:function(b,c,d){var f,g,h,l,m,n,q;m=n=Infinity;for(f=c;f<=d-c;f++)g=e(b,0,f,this.da),h=e(b,f,d,this.da),l=Math.max(0,Math.min(g[2],h[2])-Math.max(g[0],h[0]))*Math.max(0,Math.min(g[3],h[3])-Math.max(g[1],h[1])),g=k(g)+k(h),l<m?(m=l,q=f,n=g<n?g:n):l===m&&g<n&&(n=g,q=f);return q},ad:function(b,c,d){var e=b.$?this.Hb:g,f=b.$?this.Ib:h,k=this.bc(b,c,d,e);c=this.bc(b,c,d,f);k<c&&b.children.sort(e)},
bc:function(b,c,d,g){b.children.sort(g);g=this.da;var h=e(b,0,c,g),k=e(b,d-c,d,g),m=l(h)+l(k),n,q;for(n=c;n<d-c;n++)q=b.children[n],f(h,b.$?g(q):q.bbox),m+=l(h);for(n=d-c-1;n>=c;n--)q=b.children[n],f(k,b.$?g(q):q.bbox),m+=l(k);return m},$c:function(b,c,d){for(;0<=d;d--)f(c[d].bbox,b)},dd:function(b){for(var c=b.length-1,e;0<=c;c--)0===b[c].children.length?0<c?(e=b[c-1].children,e.splice(e.indexOf(b[c]),1)):this.clear():d(b[c],this.da)},ed:function(b){var c=["return a"," - b",";"];this.Hb=new Function("a",
"b",c.join(b[0]));this.Ib=new Function("a","b",c.join(b[1]));this.da=new Function("a","return [a"+b.join(", a")+"];")}};"undefined"!==typeof b?b.uc=c:"undefined"!==typeof self?self.a=c:window.a=c})();Lj=b.uc})();function Mj(b){this.a=Lj(b);this.b={}}p=Mj.prototype;p.Ca=function(b,c){var d=[b[0],b[1],b[2],b[3],c];this.a.Ca(d);this.b[I(c)]=d};p.load=function(b,c){for(var d=Array(c.length),e=0,f=c.length;e<f;e++){var g=b[e],h=c[e],g=[g[0],g[1],g[2],g[3],h];d[e]=g;this.b[I(h)]=g}this.a.load(d)};p.remove=function(b){b=I(b);var c=this.b[b];delete this.b[b];return null!==this.a.remove(c)};function Nj(b){return b.a.all().map(function(b){return b[4]})}
function Oj(b,c){return b.a.search(c).map(function(b){return b[4]})}function Pj(b,c,d,e){return Qj(Oj(b,c),d,e)}function Qj(b,c,d){for(var e,f=0,g=b.length;f<g&&!(e=c.call(d,b[f]));f++);return e}p.clear=function(){this.a.clear();this.b={}};p.C=function(){return this.a.data.bbox};function Rj(b){b=b||{};De.call(this,{attributions:b.attributions,logo:b.logo,projection:void 0,state:"ready",wrapX:void 0!==b.wrapX?b.wrapX:!0});this.o=pa;this.D=b.format;this.u=b.url;void 0!==b.loader?this.o=b.loader:void 0!==this.u&&(this.o=Jj(this.u,this.D));this.G=void 0!==b.strategy?b.strategy:Kj;var c=void 0!==b.useSpatialIndex?b.useSpatialIndex:!0;this.R=c?new Mj:null;this.s=new Mj;this.ca={};this.b={};this.g={};this.h={};this.a=null;var d,e;b.features instanceof ld?(d=b.features,e=d.a):Array.isArray(b.features)&&
(e=b.features);c||void 0!==d||(d=new ld(e));void 0!==e&&Sj(this,e);void 0!==d&&Tj(this,d)}M(Rj,De);p=Rj.prototype;p.Cb=function(b){var c=I(b).toString();if(Uj(this,c,b)){Vj(this,c,b);var d=b.M();d?(c=d.C(),this.R&&this.R.Ca(c,b)):this.ca[c]=b;S(this,new Wj("addfeature",b))}this.v()};function Vj(b,c,d){b.h[c]=[Q(d,"change",b.xc,b),Q(d,"propertychange",b.xc,b)]}function Uj(b,c,d){var e=!0,f=d.La();void 0!==f?f.toString()in b.b?e=!1:b.b[f.toString()]=d:b.g[c]=d;return e}p.Db=function(b){Sj(this,b);this.v()};
function Sj(b,c){var d,e,f,g,h=[],k=[],l=[];e=0;for(f=c.length;e<f;e++)g=c[e],d=I(g).toString(),Uj(b,d,g)&&k.push(g);e=0;for(f=k.length;e<f;e++){g=k[e];d=I(g).toString();Vj(b,d,g);var m=g.M();m?(d=m.C(),h.push(d),l.push(g)):b.ca[d]=g}b.R&&b.R.load(h,l);e=0;for(f=k.length;e<f;e++)S(b,new Wj("addfeature",k[e]))}
function Tj(b,c){var d=!1;Q(b,"addfeature",function(b){d||(d=!0,c.push(b.feature),d=!1)});Q(b,"removefeature",function(b){d||(d=!0,c.remove(b.feature),d=!1)});Q(c,"add",function(b){d||(b=b.element,d=!0,this.Cb(b),d=!1)},b);Q(c,"remove",function(b){if(!d){b=b.element;d=!0;var c=I(b).toString();c in this.ca?delete this.ca[c]:this.R&&this.R.remove(b);this.Yb(b);this.v();d=!1}},b);b.a=c}
p.clear=function(b){if(b){for(var c in this.h)this.h[c].forEach(N);this.a||(this.h={},this.b={},this.g={})}else if(this.R){b=this.Yb;Qj(Nj(this.R),b,this);for(var d in this.ca)this.Yb(this.ca[d])}this.a&&this.a.clear();this.R&&this.R.clear();this.s.clear();this.ca={};S(this,new Wj("clear"));this.v()};p.od=function(b,c){if(this.R)return Qj(Nj(this.R),b,c);if(this.a)return nd(this.a,b,c)};function Xj(b,c,d,e){b.R?Pj(b.R,c,d,e):b.a&&nd(b.a,d,e)}
p.pe=function(){var b;this.a?b=this.a.a:this.R&&(b=Nj(this.R),$a(this.ca)||Ka(b,Za(this.ca)));return b};p.C=function(){return this.R.C()};
p.xc=function(b){b=b.target;var c=I(b).toString(),d=b.M();if(d)if(d=d.C(),c in this.ca)delete this.ca[c],this.R&&this.R.Ca(d,b);else{if(this.R){var e=this.R,f=I(b);Rb(e.b[f].slice(0,4),d)||(e.remove(b),e.Ca(d,b))}}else c in this.ca||(this.R&&this.R.remove(b),this.ca[c]=b);d=b.La();void 0!==d?(d=d.toString(),c in this.g?(delete this.g[c],this.b[d]=b):this.b[d]!==b&&(Yj(this,b),this.b[d]=b)):c in this.g||(Yj(this,b),this.g[c]=b);this.v();S(this,new Wj("changefeature",b))};
function Zj(b,c,d,e){var f=b.s;c=b.G(c,d);var g,h;g=0;for(h=c.length;g<h;++g){var k=c[g];Pj(f,k,function(b){return Nb(b.extent,k)})||(b.o.call(b,k,d,e),f.Ca(k,{extent:k.slice()}))}}p.Yb=function(b){var c=I(b).toString();this.h[c].forEach(N);delete this.h[c];var d=b.La();void 0!==d?delete this.b[d.toString()]:delete this.g[c];S(this,new Wj("removefeature",b))};function Yj(b,c){for(var d in b.b)if(b.b[d]===c){delete b.b[d];break}}function Wj(b,c){R.call(this,b);this.feature=c}M(Wj,R);function ak(b){Xi.call(this,b);this.c=rf();this.b=null;this.j=Jb();this.h=zb()}M(ak,Xi);
ak.prototype.g=function(b,c,d){var e=b.pixelRatio,f=b.viewState,g=f.center,h=f.projection,k=f.rotation,l=b.size,m=Math.round(e*l[0]/2),n=Math.round(e*l[1]/2),q=e/f.resolution,r=this.a,u=r.V(),w=u.kb(h),f=Zi(this,b,0);Yi(this,"precompose",d,b,f);var l=d,r=nb(r,"render"),y,z,D,t;if(k||r){l=this.c;y=l.canvas;D=u.mb(e)/e;var v=d.canvas.width*D;z=d.canvas.height*D;t=Math.round(Math.sqrt(v*v+z*z));y.width!=t?y.width=y.height=t:l.clearRect(0,0,t,t);y=(t-v)/2/D;z=(t-z)/2/D;q*=D;m=Math.round(D*(m+y));n=Math.round(D*
(n+z))}v=l.globalAlpha;l.globalAlpha=c.opacity;var B=u.la(h),E=this.b,C;c=u.Mb(h)&&1==c.opacity;c||(E.reverse(),C=[]);for(var G=0,J=E.length;G<J;++G){var A=E[G],H=A.L,O=Je(B,H,this.j),P=H[0],L=Xb(Je(B,Re(B,g,P))),H=Math.round(Vb(O)*q),K=Math.round(Wb(O)*q),fa=Math.round((O[0]-L[0])*q/H)*H+m+Math.round((L[0]-g[0])*q),O=Math.round((L[1]-O[3])*q/K)*K+n+Math.round((g[1]-L[1])*q);if(!c){L=[fa,O,fa+H,O+K];l.save();for(var ra=0,Wl=C.length;ra<Wl;++ra){var Xa=C[ra];ac(L,Xa)&&(l.beginPath(),l.moveTo(L[0],
L[1]),l.lineTo(L[0],L[3]),l.lineTo(L[2],L[3]),l.lineTo(L[2],L[1]),l.moveTo(Xa[0],Xa[1]),l.lineTo(Xa[2],Xa[1]),l.lineTo(Xa[2],Xa[3]),l.lineTo(Xa[0],Xa[3]),l.closePath(),l.clip())}C.push(L)}P=Xe(u,P,e,h);l.drawImage(A.T(),w,w,P[0],P[1],fa,O,H,K);c||l.restore()}r&&(e=y-m/D+m,h=z-n/D+n,g=Ig(this.h,t/2-e,t/2-h,q,-q,-k,-g[0]+e/q,-g[1]-h/q),Yi(this,"render",l,b,g));(k||r)&&d.drawImage(l.canvas,-Math.round(y),-Math.round(z),t/D,t/D);l.globalAlpha=v;Yi(this,"postcompose",d,b,f)};
ak.prototype.i=function(b,c){function d(b){b=b.N();return 2==b||4==b||3==b&&!u}var e=b.pixelRatio,f=b.viewState,g=f.projection,h=this.a,k=h.V(),l=k.la(g),m=Qe(l,f.resolution),n=l.I(m),q=f.center;n==f.resolution?(q=Rg(q,n,b.size),f=Zb(q,n,f.rotation,b.size)):f=b.extent;void 0!==c.extent&&(f=$b(f,c.extent));if(f[2]<f[0]||f[3]<f[1])return!1;n=Me(l,f,n);q={};q[m]={};var r=this.l(k,g,q),u=ti(h),w=Jb(),y=new fd(0,0,0,0),z,D,t,v;for(t=n.a;t<=n.f;++t)for(v=n.b;v<=n.c;++v)z=Tg(k,m,t,v,e,g),!d(z)&&z.a&&(z=
z.a),d(z)?q[m][z.L.toString()]=z:(D=Ie(l,z.L,r,y,w),D||(z=Le(l,z.L,y,w))&&r(m+1,z));r=Object.keys(q).map(Number);r.sort(Ha);var w=[],B,y=0;for(t=r.length;y<t;++y)for(B in z=r[y],v=q[z],v)z=v[B],2==z.N()&&w.push(z);this.b=w;Qg(b.usedTiles,k,m,n);Sg(b,k,l,e,g,f,m,h.get("preload"));Ng(b,k);Pg(b,k);return!0};function bk(b){Xi.call(this,b);this.b=!1;this.w=-1;this.u=NaN;this.j=Jb();this.c=this.o=null;this.h=rf()}M(bk,Xi);
bk.prototype.g=function(b,c,d){var e=b.extent,f=b.pixelRatio,g=c.eb?b.skippedFeatureUids:{},h=b.viewState,k=h.projection,h=h.rotation,l=k.C(),m=this.a.V(),n=Zi(this,b,0);Yi(this,"precompose",d,b,n);var q=this.c;if(q&&!q.c()){var r;nb(this.a,"render")?(this.h.canvas.width=d.canvas.width,this.h.canvas.height=d.canvas.height,r=this.h):r=d;var u=r.globalAlpha;r.globalAlpha=c.opacity;c=b.size[0]*f;var w=b.size[1]*f;xi(r,-h,c/2,w/2);q.f(r,f,n,h,g);if(m.j&&k.a&&!Nb(l,e)){for(var k=e[0],m=Vb(l),y=0;k<l[0];)--y,
n=m*y,n=Zi(this,b,n),q.f(r,f,n,h,g),k+=m;y=0;for(k=e[2];k>l[2];)++y,n=m*y,n=Zi(this,b,n),q.f(r,f,n,h,g),k-=m;n=Zi(this,b,0)}xi(r,h,c/2,w/2);r!=d&&(Yi(this,"render",r,b,n),d.drawImage(r.canvas,0,0));r.globalAlpha=u}Yi(this,"postcompose",d,b,n)};bk.prototype.fb=function(b,c,d,e){if(this.c){var f=this.a,g={};return this.c.g(b,c.viewState.resolution,c.viewState.rotation,{},function(b){var c=I(b).toString();if(!(c in g))return g[c]=!0,d.call(e,b,f)})}};bk.prototype.B=function(){Mg(this)};
bk.prototype.i=function(b){function c(b){var c,e=b.c;e?c=e.call(b,m):(e=d.g)&&(c=e(b,m));if(c){if(c){e=!1;if(Array.isArray(c))for(var f=0,g=c.length;f<g;++f)e=vj(r,b,c[f],uj(m,n),this.B,this)||e;else e=vj(r,b,c,uj(m,n),this.B,this)||e;b=e}else b=!1;this.b=this.b||b}}var d=this.a,e=d.V();Og(b.attributions,e.i);Pg(b,e);var f=b.viewHints[0],g=b.viewHints[1],h=d.i,k=d.j;if(!this.b&&!h&&f||!k&&g)return!0;var l=b.extent,k=b.viewState,f=k.projection,m=k.resolution,n=b.pixelRatio,g=d.f,q=d.a,h=d.get("renderOrder");
void 0===h&&(h=tj);l=Lb(l,q*m);q=k.projection.C();e.j&&k.projection.a&&!Nb(q,b.extent)&&(b=Math.max(Vb(l)/2,Vb(q)),l[0]=q[0]-b,l[2]=q[2]+b);if(!this.b&&this.u==m&&this.w==g&&this.o==h&&Nb(this.j,l))return!0;this.c=null;this.b=!1;var r=new pj(.5*m/n,l,m,d.a);Zj(e,l,m,f);if(h){var u=[];Xj(e,l,function(b){u.push(b)},this);u.sort(h);u.forEach(c,this)}else Xj(e,l,c,this);qj(r);this.u=m;this.w=g;this.o=h;this.j=l;this.c=r;return!0};function ck(b,c){var d=/\{z\}/g,e=/\{x\}/g,f=/\{y\}/g,g=/\{-y\}/g;return function(h){if(h)return b.replace(d,h[0].toString()).replace(e,h[1].toString()).replace(f,function(){return(-h[2]-1).toString()}).replace(g,function(){var b=c.a?c.a[h[0]]:null;return(b.c-b.b+1+h[2]).toString()})}}function dk(b,c){for(var d=b.length,e=Array(d),f=0;f<d;++f)e[f]=ck(b[f],c);return ek(e)}function ek(b){return 1===b.length?b[0]:function(c,d,e){if(c)return b[Ea((c[1]<<c[0])+c[2],b.length)](c,d,e)}}function fk(){};function gk(b){Ve.call(this,{attributions:b.attributions,cacheSize:b.cacheSize,extent:b.extent,logo:b.logo,opaque:b.opaque,projection:b.projection,state:b.state,tileGrid:b.tileGrid,tilePixelRatio:b.tilePixelRatio,wrapX:b.wrapX});this.tileLoadFunction=b.tileLoadFunction;this.tileUrlFunction=this.g?this.g.bind(this):fk;this.urls=null;if(b.urls){var c=b.urls;this.urls=c;hk(this,this.g?this.g.bind(this):dk(c,this.tileGrid))}else b.url&&this.s(b.url);b.tileUrlFunction&&hk(this,b.tileUrlFunction)}
M(gk,Ve);gk.prototype.D=function(b){b=b.target;switch(b.N()){case 1:S(this,new Ze("tileloadstart",b));break;case 2:S(this,new Ze("tileloadend",b));break;case 3:S(this,new Ze("tileloaderror",b))}};function hk(b,c){b.a.clear();b.tileUrlFunction=c;b.v()}
gk.prototype.s=function(b){var c=[],d=/\{(\d)-(\d)\}/.exec(b)||/\{([a-z])-([a-z])\}/.exec(b);if(d){var e=d[2].charCodeAt(0),f;for(f=d[1].charCodeAt(0);f<=e;++f)c.push(b.replace(d[0],String.fromCharCode(f)))}else c.push(b);b=this.urls=c;hk(this,this.g?this.g.bind(this):dk(b,this.tileGrid))};gk.prototype.Yc=function(b,c,d){b=this.lb(b,c,d);we(this.a,b)&&this.a.get(b)};function ik(b,c){Zg.call(this,0,c);this.c=rf();rf();this.a=this.c.canvas;this.a.style.width="100%";this.a.style.height="100%";this.a.className="ol-unselectable";fe(b,this.a,0);this.b=!0;this.g=zb()}M(ik,Zg);ik.prototype.Jb=function(b){return b instanceof X?new ak(b):b instanceof Y?new bk(b):null};
function jk(b,c,d){var e=b.h,f=b.c;if(nb(e,c)){var g=d.extent,h=d.pixelRatio,k=d.viewState.rotation,l=d.pixelRatio,m=d.viewState,n=m.resolution;b=Ig(b.g,b.a.width/2,b.a.height/2,l/n,-l/n,-m.rotation,-m.center[0],-m.center[1]);g=new Mi(f,h,g,b,k);S(e,new Fg(c,e,g,d,f,null))}}ik.prototype.U=function(){return"canvas"};
ik.prototype.sb=function(b){if(b){var c=this.c,d=b.pixelRatio,e=Math.round(b.size[0]*d),d=Math.round(b.size[1]*d);this.a.width!=e||this.a.height!=d?(this.a.width=e,this.a.height=d):c.clearRect(0,0,e,d);var f=b.viewState.rotation;$g(b);jk(this,"precompose",b);var g=b.layerStatesArray;Na(g);xi(c,f,e/2,d/2);var h=b.viewState.resolution,k,l,m,n;k=0;for(l=g.length;k<l;++k)n=g[k],m=n.layer,m=bh(this,m),Hg(n,h)&&"ready"==n.$b&&m.i(b,n)&&m.g(b,n,c);xi(c,-f,e/2,d/2);jk(this,"postcompose",b);this.b||(oe(this.a,
!0),this.b=!0);ch(this,b);b.postRenderFunctions.push(ah)}else this.b&&(oe(this.a,!1),this.b=!1)};function kk(b,c){Lg.call(this,b);this.target=c}M(kk,Lg);kk.prototype.Gb=pa;kk.prototype.Kc=pa;function lk(b){var c=document.createElement("DIV");c.style.position="absolute";kk.call(this,b,c);this.c=!0;this.h=1;this.g=0;this.b={}}M(lk,kk);lk.prototype.Gb=function(){ee(this.target);this.g=0};
lk.prototype.Lc=function(b,c){if(!c.visible)return this.c&&(oe(this.target,!1),this.c=!1),!0;var d=b.pixelRatio,e=b.viewState,f=e.projection,g=this.a,h=g.V(),k=h.la(f),l=h.kb(f),m=Qe(k,e.resolution),n=k.I(m),q=e.center,r;n==e.resolution?(q=Rg(q,n,b.size),r=Zb(q,n,e.rotation,b.size)):r=b.extent;void 0!==c.extent&&(r=$b(r,c.extent));var n=Me(k,r,n),u={};u[m]={};var w=this.l(h,f,u),y=ti(g),z=Jb(),D=new fd(0,0,0,0),t,v,B,E;for(B=n.a;B<=n.f;++B)for(E=n.b;E<=n.c;++E)t=Tg(h,m,B,E,d,f),v=t.N(),v=2==v||4==
v||3==v&&!y,!v&&t.a&&(t=t.a),v=t.N(),2==v?u[m][t.L.toString()]=t:4==v||3==v&&!y||(v=Ie(k,t.L,w,D,z),v||(t=Le(k,t.L,D,z))&&w(m+1,t));var C;if(this.g!=h.f){for(C in this.b)y=this.b[+C],ge(y.target);this.b={};this.g=h.f}z=Object.keys(u).map(Number);z.sort(Ha);var w={},G;B=0;for(E=z.length;B<E;++B){C=z[B];C in this.b?y=this.b[C]:(y=Re(k,q,C),y=new mk(k,y),w[C]=!0,this.b[C]=y);C=u[C];for(G in C){t=y;v=C[G];var J=l,A=v.L,H=A[0],O=A[1],P=A[2],A=A.toString();if(!(A in t.b)){var H=tb(Pe(t.g,H),t.i),L=v.T(t),
K=L.style;K.maxWidth="none";var fa=void 0,ra=void 0;0<J?(fa=document.createElement("DIV"),ra=fa.style,ra.overflow="hidden",ra.width=H[0]+"px",ra.height=H[1]+"px",K.position="absolute",K.left=-J+"px",K.top=-J+"px",K.width=H[0]+2*J+"px",K.height=H[1]+2*J+"px",fa.appendChild(L)):(K.width=H[0]+"px",K.height=H[1]+"px",fa=L,ra=K);ra.position="absolute";ra.left=(O-t.f[1])*H[0]+"px";ra.top=(t.f[2]-P)*H[1]+"px";t.a||(t.a=document.createDocumentFragment());t.a.appendChild(fa);t.b[A]=v}}y.a&&(y.target.appendChild(y.a),
y.a=null)}l=Object.keys(this.b).map(Number);l.sort(Ha);B=zb();G=0;for(z=l.length;G<z;++G)if(C=l[G],y=this.b[C],C in u)if(t=y.I(),E=y.ka(),Ig(B,b.size[0]/2,b.size[1]/2,t/e.resolution,t/e.resolution,e.rotation,(E[0]-q[0])/t,(q[1]-E[1])/t),y.setTransform(B),C in w){for(--C;0<=C;--C)if(C in this.b){E=this.b[C].target;E.parentNode&&E.parentNode.insertBefore(y.target,E.nextSibling);break}0>C&&fe(this.target,y.target,0)}else{if(!b.viewHints[0]&&!b.viewHints[1]){v=Ke(y.g,r,y.f[0],D);C=[];t=E=void 0;for(t in y.b)E=
y.b[t],J=E.L,gd(v,J[1],J[2])||C.push(E);J=v=void 0;v=0;for(J=C.length;v<J;++v)E=C[v],t=E.L.toString(),ge(E.T(y)),delete y.b[t]}}else ge(y.target),delete this.b[C];c.opacity!=this.h&&(this.h=this.target.style.opacity=c.opacity);c.visible&&!this.c&&(oe(this.target,!0),this.c=!0);Qg(b.usedTiles,h,m,n);Sg(b,h,k,d,f,r,m,g.get("preload"));Ng(b,h);Pg(b,h);return!0};
function mk(b,c){this.target=document.createElement("DIV");this.target.style.position="absolute";this.target.style.width="100%";this.target.style.height="100%";this.g=b;this.f=c;this.h=bc(Je(b,c));this.l=b.I(c[0]);this.b={};this.a=null;this.c=Bb();this.i=[0,0]}mk.prototype.ka=function(){return this.h};mk.prototype.I=function(){return this.l};mk.prototype.setTransform=function(b){Jg(b,this.c)||(vf(this.target,b),Cb(this.c,b))};function nk(b){this.g=rf();var c=this.g.canvas;c.style.maxWidth="none";c.style.position="absolute";kk.call(this,b,c);this.b=!1;this.h=-1;this.o=NaN;this.i=Jb();this.c=this.j=null;this.w=zb();this.u=zb()}M(nk,kk);p=nk.prototype;p.Gb=function(){var b=this.g.canvas;b.width=b.width;this.h=0};
p.Kc=function(b,c){var d=b.viewState,e=d.center,f=d.rotation,g=d.resolution,d=b.pixelRatio,h=b.size[0],k=b.size[1],l=h*d,m=k*d,e=Ig(this.w,d*h/2,d*k/2,d/g,-d/g,-f,-e[0],-e[1]),g=this.g;g.canvas.width=l;g.canvas.height=m;h=Ig(this.u,0,0,1/d,1/d,0,-(l-h)/2*d,-(m-k)/2*d);vf(g.canvas,h);ok(this,"precompose",b,e);(h=this.c)&&!h.c()&&(g.globalAlpha=c.opacity,h.f(g,d,e,f,c.eb?b.skippedFeatureUids:{}),ok(this,"render",b,e));ok(this,"postcompose",b,e)};
function ok(b,c,d,e){var f=b.g;b=b.a;nb(b,c)&&(e=new Mi(f,d.pixelRatio,d.extent,e,d.viewState.rotation),S(b,new Fg(c,b,e,d,f,null)))}p.fb=function(b,c,d,e){if(this.c){var f=this.a,g={};return this.c.g(b,c.viewState.resolution,c.viewState.rotation,{},function(b){var c=I(b).toString();if(!(c in g))return g[c]=!0,d.call(e,b,f)})}};p.Mc=function(){Mg(this)};
p.Lc=function(b){function c(b){var c,e=b.c;e?c=e.call(b,l):(e=d.g)&&(c=e(b,l));if(c){if(c){e=!1;if(Array.isArray(c))for(var f=0,g=c.length;f<g;++f)e=vj(n,b,c[f],uj(l,m),this.Mc,this)||e;else e=vj(n,b,c,uj(l,m),this.Mc,this)||e;b=e}else b=!1;this.b=this.b||b}}var d=this.a,e=d.V();Og(b.attributions,e.i);Pg(b,e);var f=b.viewHints[0],g=b.viewHints[1],h=d.i,k=d.j;if(!this.b&&!h&&f||!k&&g)return!0;var g=b.extent,h=b.viewState,f=h.projection,l=h.resolution,m=b.pixelRatio;b=d.f;k=d.a;h=d.get("renderOrder");
void 0===h&&(h=tj);g=Lb(g,k*l);if(!this.b&&this.o==l&&this.h==b&&this.j==h&&Nb(this.i,g))return!0;this.c=null;this.b=!1;var n=new pj(.5*l/m,g,l,d.a);Zj(e,g,l,f);if(h){var q=[];Xj(e,g,function(b){q.push(b)},this);q.sort(h);q.forEach(c,this)}else Xj(e,g,c,this);qj(n);this.o=l;this.h=b;this.j=h;this.i=g;this.c=n;return!0};function pk(b,c){Zg.call(this,0,c);this.c=rf();var d=this.c.canvas;d.style.position="absolute";d.style.width="100%";d.style.height="100%";d.className="ol-unselectable";fe(b,d,0);this.g=zb();this.a=document.createElement("DIV");this.a.className="ol-unselectable";d=this.a.style;d.position="absolute";d.width="100%";d.height="100%";Q(this.a,"touchstart",lb);fe(b,this.a,0);this.b=!0}M(pk,Zg);pk.prototype.J=function(){ge(this.a);pk.X.J.call(this)};
pk.prototype.Jb=function(b){if(b instanceof X)b=new lk(b);else if(b instanceof Y)b=new nk(b);else return null;return b};function qk(b,c,d){var e=b.h;if(nb(e,c)){var f=d.extent,g=d.pixelRatio,h=d.viewState,k=h.rotation,l=b.c,m=l.canvas;Ig(b.g,m.width/2,m.height/2,g/h.resolution,-g/h.resolution,-h.rotation,-h.center[0],-h.center[1]);b=new Mi(l,g,f,b.g,k);S(e,new Fg(c,e,b,d,l,null))}}pk.prototype.U=function(){return"dom"};
pk.prototype.sb=function(b){if(b){var c=this.h;if(nb(c,"precompose")||nb(c,"postcompose")){var c=this.c.canvas,d=b.pixelRatio;c.width=b.size[0]*d;c.height=b.size[1]*d}qk(this,"precompose",b);c=b.layerStatesArray;Na(c);var d=b.viewState.resolution,e,f,g,h;e=0;for(f=c.length;e<f;++e)h=c[e],g=h.layer,g=bh(this,g),fe(this.a,g.target,e),Hg(h,d)&&"ready"==h.$b?g.Lc(b,h)&&g.Kc(b,h):g.Gb();var c=b.layerStates,k;for(k in this.f)k in c||(g=this.f[k],ge(g.target));this.b||(oe(this.a,!0),this.b=!0);$g(b);ch(this,
b);b.postRenderFunctions.push(ah);qk(this,"postcompose",b)}else this.b&&(oe(this.a,!1),this.b=!1)};function rk(b){this.a=b}function sk(b){this.a=b}M(sk,rk);sk.prototype.U=function(){return 35632};function tk(b){this.a=b}M(tk,rk);tk.prototype.U=function(){return 35633};function uk(){this.a="precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"}M(uk,sk);aa(uk);
function vk(){this.a="varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"}M(vk,tk);aa(vk);
function wk(b,c){this.i=b.getUniformLocation(c,"j");this.j=b.getUniformLocation(c,"i");this.h=b.getUniformLocation(c,"k");this.l=b.getUniformLocation(c,"h");this.a=b.getAttribLocation(c,"e");this.b=b.getAttribLocation(c,"f");this.c=b.getAttribLocation(c,"c");this.f=b.getAttribLocation(c,"g");this.g=b.getAttribLocation(c,"d")};function xk(b){this.a=void 0!==b?b:[]};function yk(b,c){this.A=b;this.a=c;this.b={};this.g={};this.c={};this.i=this.j=this.h=this.l=null;(this.f=0<=oa.indexOf("OES_element_index_uint"))&&c.getExtension("OES_element_index_uint");Q(this.A,"webglcontextlost",this.o,this);Q(this.A,"webglcontextrestored",this.s,this)}M(yk,ib);
function zk(b,c,d){var e=b.a,f=d.a,g=String(I(d));if(g in b.b)e.bindBuffer(c,b.b[g].buffer);else{var h=e.createBuffer();e.bindBuffer(c,h);var k;34962==c?k=new Float32Array(f):34963==c&&(k=b.f?new Uint32Array(f):new Uint16Array(f));e.bufferData(c,k,35044);b.b[g]={Xe:d,buffer:h}}}function Ak(b,c){var d=b.a,e=String(I(c)),f=b.b[e];d.isContextLost()||d.deleteBuffer(f.buffer);delete b.b[e]}
yk.prototype.J=function(){hb(this.A);var b=this.a;if(!b.isContextLost()){for(var c in this.b)b.deleteBuffer(this.b[c].buffer);for(c in this.c)b.deleteProgram(this.c[c]);for(c in this.g)b.deleteShader(this.g[c]);b.deleteFramebuffer(this.h);b.deleteRenderbuffer(this.i);b.deleteTexture(this.j)}};
function Bk(b){if(!b.h){var c=b.a,d=c.createFramebuffer();c.bindFramebuffer(c.FRAMEBUFFER,d);var e=Ck(c,1,1),f=c.createRenderbuffer();c.bindRenderbuffer(c.RENDERBUFFER,f);c.renderbufferStorage(c.RENDERBUFFER,c.DEPTH_COMPONENT16,1,1);c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,e,0);c.framebufferRenderbuffer(c.FRAMEBUFFER,c.DEPTH_ATTACHMENT,c.RENDERBUFFER,f);c.bindTexture(c.TEXTURE_2D,null);c.bindRenderbuffer(c.RENDERBUFFER,null);c.bindFramebuffer(c.FRAMEBUFFER,null);b.h=d;
b.j=e;b.i=f}return b.h}function Dk(b,c){var d=String(I(c));if(d in b.g)return b.g[d];var e=b.a,f=e.createShader(c.U());e.shaderSource(f,c.a);e.compileShader(f);return b.g[d]=f}function Ek(b,c,d){var e=I(c)+"/"+I(d);if(e in b.c)return b.c[e];var f=b.a,g=f.createProgram();f.attachShader(g,Dk(b,c));f.attachShader(g,Dk(b,d));f.linkProgram(g);return b.c[e]=g}yk.prototype.o=function(){Ya(this.b);Ya(this.g);Ya(this.c);this.i=this.j=this.h=this.l=null};yk.prototype.s=function(){};
function Fk(b,c){if(c==b.l)return!1;b.a.useProgram(c);b.l=c;return!0}function Gk(b,c,d){var e=b.createTexture();b.bindTexture(b.TEXTURE_2D,e);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR);void 0!==c&&b.texParameteri(3553,10242,c);void 0!==d&&b.texParameteri(3553,10243,d);return e}function Ck(b,c,d){var e=Gk(b,void 0,void 0);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,c,d,0,b.RGBA,b.UNSIGNED_BYTE,null);return e};function Hk(b,c){this.H=this.u=void 0;this.j=Yb(c);this.s=[];this.h=[];this.B=void 0;this.g=[];this.c=[];this.D=this.K=void 0;this.b=[];this.w=this.i=null;this.G=void 0;this.na=Bb();this.za=Bb();this.S=this.P=void 0;this.pa=Bb();this.ja=this.Y=this.ba=void 0;this.ea=[];this.l=[];this.a=[];this.o=null;this.f=[];this.A=[];this.aa=void 0}M(Hk,Eg);
function Ik(b,c){var d=b.o,e=b.i,f=b.ea,g=b.l,h=c.a;return function(){if(!h.isContextLost()){var b,l;b=0;for(l=f.length;b<l;++b)h.deleteTexture(f[b]);b=0;for(l=g.length;b<l;++b)h.deleteTexture(g[b])}Ak(c,d);Ak(c,e)}}
function Jk(b,c,d,e){var f=b.u,g=b.H,h=b.B,k=b.K,l=b.D,m=b.G,n=b.P,q=b.S,r=b.ba?1:0,u=b.Y,w=b.ja,y=b.aa,z=Math.cos(u),u=Math.sin(u),D=b.b.length,t=b.a.length,v,B,E,C,G,J;for(v=0;v<d;v+=e)G=c[v]-b.j[0],J=c[v+1]-b.j[1],B=t/8,E=-w*f,C=-w*(h-g),b.a[t++]=G,b.a[t++]=J,b.a[t++]=E*z-C*u,b.a[t++]=E*u+C*z,b.a[t++]=n/l,b.a[t++]=(q+h)/k,b.a[t++]=m,b.a[t++]=r,E=w*(y-f),C=-w*(h-g),b.a[t++]=G,b.a[t++]=J,b.a[t++]=E*z-C*u,b.a[t++]=E*u+C*z,b.a[t++]=(n+y)/l,b.a[t++]=(q+h)/k,b.a[t++]=m,b.a[t++]=r,E=w*(y-f),C=w*g,b.a[t++]=
G,b.a[t++]=J,b.a[t++]=E*z-C*u,b.a[t++]=E*u+C*z,b.a[t++]=(n+y)/l,b.a[t++]=q/k,b.a[t++]=m,b.a[t++]=r,E=-w*f,C=w*g,b.a[t++]=G,b.a[t++]=J,b.a[t++]=E*z-C*u,b.a[t++]=E*u+C*z,b.a[t++]=n/l,b.a[t++]=q/k,b.a[t++]=m,b.a[t++]=r,b.b[D++]=B,b.b[D++]=B+1,b.b[D++]=B+2,b.b[D++]=B,b.b[D++]=B+2,b.b[D++]=B+3}Hk.prototype.Za=function(b,c){this.f.push(this.b.length);this.A.push(c);var d=b.a;Jk(this,d,d.length,b.b)};Hk.prototype.$a=function(b,c){this.f.push(this.b.length);this.A.push(c);var d=b.a;Jk(this,d,d.length,b.b)};
function Kk(b,c){var d=c.a;b.s.push(b.b.length);b.h.push(b.b.length);b.o=new xk(b.a);zk(c,34962,b.o);b.i=new xk(b.b);zk(c,34963,b.i);var e={};Lk(b.ea,b.g,e,d);Lk(b.l,b.c,e,d);b.u=void 0;b.H=void 0;b.B=void 0;b.g=null;b.c=null;b.K=void 0;b.D=void 0;b.b=null;b.G=void 0;b.P=void 0;b.S=void 0;b.ba=void 0;b.Y=void 0;b.ja=void 0;b.a=null;b.aa=void 0}
function Lk(b,c,d,e){var f,g,h,k,l=c.length;for(k=0;k<l;++k){g=c[k];h=I(g).toString();if(h in d)f=d[h];else{f=e;var m=Gk(f,33071,33071);f.texImage2D(f.TEXTURE_2D,0,f.RGBA,f.RGBA,f.UNSIGNED_BYTE,g);f=m;d[h]=f}b[k]=f}}
function Mk(b,c,d,e,f,g,h,k,l,m,n){var q=c.a;zk(c,34962,b.o);zk(c,34963,b.i);var r=uk.ua(),u=vk.ua(),u=Ek(c,r,u);b.w?r=b.w:(r=new wk(q,u),b.w=r);Fk(c,u);q.enableVertexAttribArray(r.c);q.vertexAttribPointer(r.c,2,5126,!1,32,0);q.enableVertexAttribArray(r.a);q.vertexAttribPointer(r.a,2,5126,!1,32,8);q.enableVertexAttribArray(r.g);q.vertexAttribPointer(r.g,2,5126,!1,32,16);q.enableVertexAttribArray(r.b);q.vertexAttribPointer(r.b,1,5126,!1,32,24);q.enableVertexAttribArray(r.f);q.vertexAttribPointer(r.f,
1,5126,!1,32,28);u=b.pa;Ig(u,0,0,2/(e*g[0]),2/(e*g[1]),-f,-(d[0]-b.j[0]),-(d[1]-b.j[1]));d=b.za;e=2/g[0];g=2/g[1];Db(d);d[0]=e;d[5]=g;d[10]=1;d[15]=1;g=b.na;Db(g);0!==f&&Hb(g,-f);q.uniformMatrix4fv(r.l,!1,u);q.uniformMatrix4fv(r.j,!1,d);q.uniformMatrix4fv(r.i,!1,g);q.uniform1f(r.h,h);var w;if(void 0===l)Nk(b,q,c,k,b.ea,b.s);else{if(m)a:{f=c.f?5125:5123;c=c.f?4:2;g=b.f.length-1;for(h=b.l.length-1;0<=h;--h)for(q.bindTexture(3553,b.l[h]),m=0<h?b.h[h-1]:0,u=b.h[h];0<=g&&b.f[g]>=m;){w=b.f[g];d=b.A[g];
e=I(d).toString();if(void 0===k[e]&&d.M()&&(void 0===n||ac(n,d.M().C()))&&(q.clear(q.COLOR_BUFFER_BIT|q.DEPTH_BUFFER_BIT),q.drawElements(4,u-w,f,w*c),u=l(d))){b=u;break a}u=w;g--}b=void 0}else q.clear(q.COLOR_BUFFER_BIT|q.DEPTH_BUFFER_BIT),Nk(b,q,c,k,b.l,b.h),b=(b=l(null))?b:void 0;w=b}q.disableVertexAttribArray(r.c);q.disableVertexAttribArray(r.a);q.disableVertexAttribArray(r.g);q.disableVertexAttribArray(r.b);q.disableVertexAttribArray(r.f);return w}
function Nk(b,c,d,e,f,g){var h=d.f?5125:5123;d=d.f?4:2;if($a(e)){var k;b=0;e=f.length;for(k=0;b<e;++b){c.bindTexture(3553,f[b]);var l=g[b];c.drawElements(4,l-k,h,k*d);k=l}}else{k=0;var m,l=0;for(m=f.length;l<m;++l){c.bindTexture(3553,f[l]);for(var n=0<l?g[l-1]:0,q=g[l],r=n;k<b.f.length&&b.f[k]<=q;){var u=I(b.A[k]).toString();void 0!==e[u]?(r!==n&&c.drawElements(4,n-r,h,r*d),n=r=k===b.f.length-1?q:b.f[k+1]):n=k===b.f.length-1?q:b.f[k+1];k++}r!==n&&c.drawElements(4,n-r,h,r*d)}}}
Hk.prototype.Ha=function(b){var c=b.jb(),d=b.T(1),e=b.wc(),f=b.Xb(1),g=b.l,h=b.ka(),k=b.i,l=b.Z(),m=b.Qa();b=b.gb;var n;0===this.g.length?this.g.push(d):(n=this.g[this.g.length-1],I(n)!=I(d)&&(this.s.push(this.b.length),this.g.push(d)));0===this.c.length?this.c.push(f):(n=this.c[this.c.length-1],I(n)!=I(f)&&(this.h.push(this.b.length),this.c.push(f)));this.u=c[0];this.H=c[1];this.B=m[1];this.K=e[1];this.D=e[0];this.G=g;this.P=h[0];this.S=h[1];this.Y=l;this.ba=k;this.ja=b;this.aa=m[0]};
function Ok(b,c,d){this.l=c;this.i=b;this.h=d;this.b={}}function Pk(b,c){var d=[],e;for(e in b.b)d.push(Ik(b.b[e],c));return function(){for(var b=d.length,c,e=0;e<b;e++)c=d[e].apply(this,arguments);return c}}function Qk(b,c){for(var d in b.b)Kk(b.b[d],c)}Ok.prototype.a=function(b,c){var d=this.b[c];void 0===d&&(d=new Rk[c](this.i,this.l),this.b[c]=d);return d};Ok.prototype.c=function(){return $a(this.b)};
Ok.prototype.f=function(b,c,d,e,f,g,h,k){var l,m;g=0;for(l=$i.length;g<l;++g)m=this.b[$i[g]],void 0!==m&&Mk(m,b,c,d,e,f,h,k,void 0,!1)};function Sk(b,c,d,e,f,g,h,k,l,m){var n=Tk,q,r;for(q=$i.length-1;0<=q;--q)if(r=b.b[$i[q]],void 0!==r&&(r=Mk(r,c,d,e,f,n,g,h,k,l,m)))return r}
Ok.prototype.g=function(b,c,d,e,f,g,h,k,l,m){var n=c.a;n.bindFramebuffer(n.FRAMEBUFFER,Bk(c));var q;void 0!==this.h&&(q=Lb(Qb(b),e*this.h));return Sk(this,c,b,e,f,k,l,function(b){var c=new Uint8Array(4);n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,c);if(0<c[3]&&(b=m(b)))return b},!0,q)};function Uk(b,c,d,e,f,g,h){var k=d.a;k.bindFramebuffer(k.FRAMEBUFFER,Bk(d));return void 0!==Sk(b,d,c,e,f,g,h,function(){var b=new Uint8Array(4);k.readPixels(0,0,1,1,k.RGBA,k.UNSIGNED_BYTE,b);return 0<b[3]},!1)}
var Rk={Image:Hk},Tk=[1,1];function Vk(b,c,d,e,f,g){this.a=b;this.f=c;this.c=g;this.l=f;this.h=e;this.g=d;this.b=null}M(Vk,Eg);Vk.prototype.$a=function(b,c){var d=this.a,e=(new Ok(1,this.c)).a(0,"Image");e.Ha(this.b);e.$a(b,c);Kk(e,d);Mk(e,this.a,this.f,this.g,this.h,this.l,1,{},void 0,!1);Ik(e,d)()};Vk.prototype.Za=function(b,c){var d=this.a,e=(new Ok(1,this.c)).a(0,"Image");e.Ha(this.b);e.Za(b,c);Kk(e,d);Mk(e,this.a,this.f,this.g,this.h,this.l,1,{},void 0,!1);Ik(e,d)()};Vk.prototype.Ha=function(b){this.b=b};function Wk(){this.a="precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"}M(Wk,sk);aa(Wk);function Xk(){this.a="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"}M(Xk,tk);aa(Xk);
function Yk(b,c){this.f=b.getUniformLocation(c,"f");this.c=b.getUniformLocation(c,"e");this.h=b.getUniformLocation(c,"d");this.g=b.getUniformLocation(c,"g");this.a=b.getAttribLocation(c,"b");this.b=b.getAttribLocation(c,"c")};function Zk(b,c){Lg.call(this,c);this.c=b;this.G=new xk([-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,1,1,1]);this.i=this.ya=null;this.j=void 0;this.D=zb();this.P=Bb();this.o=null}M(Zk,Lg);
function $k(b,c,d){var e=b.c.c;if(void 0===b.j||b.j!=d){c.postRenderFunctions.push(na(function(b,c,d){b.isContextLost()||(b.deleteFramebuffer(c),b.deleteTexture(d))},e,b.i,b.ya));c=Ck(e,d,d);var f=e.createFramebuffer();e.bindFramebuffer(36160,f);e.framebufferTexture2D(36160,36064,3553,c,0);b.ya=c;b.i=f;b.j=d}else e.bindFramebuffer(36160,b.i)}
Zk.prototype.Nc=function(b,c,d){al(this,"precompose",d,b);zk(d,34962,this.G);var e=d.a,f=Wk.ua(),g=Xk.ua(),f=Ek(d,f,g);this.o?g=this.o:this.o=g=new Yk(e,f);Fk(d,f)&&(e.enableVertexAttribArray(g.a),e.vertexAttribPointer(g.a,2,5126,!1,16,0),e.enableVertexAttribArray(g.b),e.vertexAttribPointer(g.b,2,5126,!1,16,8),e.uniform1i(g.g,0));e.uniformMatrix4fv(g.h,!1,this.D);e.uniformMatrix4fv(g.c,!1,this.P);e.uniform1f(g.f,c.opacity);e.bindTexture(3553,this.ya);e.drawArrays(5,0,4);al(this,"postcompose",d,b)};
function al(b,c,d,e){b=b.a;if(nb(b,c)){var f=e.viewState;S(b,new Fg(c,b,new Vk(d,f.center,f.resolution,f.rotation,e.size,e.extent),e,null,d))}}Zk.prototype.s=function(){this.i=this.ya=null;this.j=void 0};function bl(){this.a="precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"}M(bl,sk);aa(bl);function cl(){this.a="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"}M(cl,tk);aa(cl);function dl(b,c){this.f=b.getUniformLocation(c,"e");this.c=b.getUniformLocation(c,"d");this.a=b.getAttribLocation(c,"b");this.b=b.getAttribLocation(c,"c")};function el(b,c){Zk.call(this,b,c);this.B=bl.ua();this.S=cl.ua();this.b=null;this.w=new xk([0,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0]);this.u=this.g=null;this.h=-1;this.K=[0,0]}M(el,Zk);el.prototype.J=function(){Ak(this.c.g,this.w);el.X.J.call(this)};el.prototype.l=function(b,c,d){var e=this.c;return function(f,g){return We(b,c,f,g,function(b){var c=we(e.b,b.getKey());c&&(d[f]||(d[f]={}),d[f][b.L.toString()]=b);return c})}};el.prototype.s=function(){el.X.s.call(this);this.b=null};
el.prototype.Oc=function(b,c,d){var e=this.c,f=d.a,g=b.viewState,h=g.projection,k=this.a,l=k.V(),m=l.la(h),n=Qe(m,g.resolution),q=m.I(n),r=Xe(l,n,b.pixelRatio,h),u=r[0]/tb(Pe(m,n),this.K)[0],w=q/u,y=l.kb(h),z=g.center,D;q==g.resolution?(z=Rg(z,q,b.size),D=Zb(z,q,g.rotation,b.size)):D=b.extent;q=Me(m,D,q);if(this.g&&hd(this.g,q)&&this.h==l.f)w=this.u;else{var t=[q.ha(),q.c-q.b+1],v=Math.pow(2,Math.ceil(Math.log(Math.max(t[0]*r[0],t[1]*r[1]))/Math.LN2)),t=w*v,B=m.ka(n),E=B[0]+q.a*r[0]*w,w=B[1]+q.b*
r[1]*w,w=[E,w,E+t,w+t];$k(this,b,v);f.viewport(0,0,v,v);f.clearColor(0,0,0,0);f.clear(16384);f.disable(3042);v=Ek(d,this.B,this.S);Fk(d,v);this.b||(this.b=new dl(f,v));zk(d,34962,this.w);f.enableVertexAttribArray(this.b.a);f.vertexAttribPointer(this.b.a,2,5126,!1,16,0);f.enableVertexAttribArray(this.b.b);f.vertexAttribPointer(this.b.b,2,5126,!1,16,8);f.uniform1i(this.b.f,0);d={};d[n]={};var C=this.l(l,h,d),G=ti(k),v=!0,E=Jb(),J=new fd(0,0,0,0),A,H,O;for(H=q.a;H<=q.f;++H)for(O=q.b;O<=q.c;++O){B=Tg(l,
n,H,O,u,h);if(void 0!==c.extent&&(A=Je(m,B.L,E),!ac(A,c.extent)))continue;A=B.N();A=2==A||4==A||3==A&&!G;!A&&B.a&&(B=B.a);A=B.N();if(2==A){if(we(e.b,B.getKey())){d[n][B.L.toString()]=B;continue}}else if(4==A||3==A&&!G)continue;v=!1;A=Ie(m,B.L,C,J,E);A||(B=Le(m,B.L,J,E))&&C(n+1,B)}c=Object.keys(d).map(Number);c.sort(Ha);for(var C=new Float32Array(4),P,L,K,G=0,J=c.length;G<J;++G)for(P in L=d[c[G]],L)B=L[P],A=Je(m,B.L,E),H=2*(A[2]-A[0])/t,O=2*(A[3]-A[1])/t,K=2*(A[0]-w[0])/t-1,A=2*(A[1]-w[1])/t-1,yb(C,
H,O,K,A),f.uniform4fv(this.b.c,C),fl(e,B,r,y*u),f.drawArrays(5,0,4);v?(this.g=q,this.u=w,this.h=l.f):(this.u=this.g=null,this.h=-1,b.animate=!0)}Qg(b.usedTiles,l,n,q);var fa=e.i;Sg(b,l,m,u,h,D,n,k.get("preload"),function(b){var c;(c=2!=b.N()||we(e.b,b.getKey()))||(c=b.getKey()in fa.f);c||fa.c([b,Oe(m,b.L),m.I(b.L[0]),r,y*u])},this);Ng(b,l);Pg(b,l);f=this.D;Db(f);Fb(f,(z[0]-w[0])/(w[2]-w[0]),(z[1]-w[1])/(w[3]-w[1]));0!==g.rotation&&Hb(f,g.rotation);Gb(f,b.size[0]*g.resolution/(w[2]-w[0]),b.size[1]*
g.resolution/(w[3]-w[1]));Fb(f,-.5,-.5);return!0};function gl(b,c){Zk.call(this,b,c);this.h=!1;this.K=-1;this.B=NaN;this.u=Jb();this.g=this.b=this.w=null}M(gl,Zk);p=gl.prototype;p.Nc=function(b,c,d){this.g=c;var e=b.viewState,f=this.b;f&&!f.c()&&f.f(d,e.center,e.resolution,e.rotation,b.size,b.pixelRatio,c.opacity,c.eb?b.skippedFeatureUids:{})};p.J=function(){var b=this.b;b&&(Pk(b,this.c.g)(),this.b=null);gl.X.J.call(this)};
p.fb=function(b,c,d,e){if(this.b&&this.g){var f=c.viewState,g=this.a,h={};return this.b.g(b,this.c.g,f.center,f.resolution,f.rotation,c.size,c.pixelRatio,this.g.opacity,{},function(b){var c=I(b).toString();if(!(c in h))return h[c]=!0,d.call(e,b,g)})}};p.Ic=function(b,c){if(this.b&&this.g){var d=c.viewState;return Uk(this.b,b,this.c.g,d.resolution,d.rotation,this.g.opacity,c.skippedFeatureUids)}return!1};p.Pc=function(){Mg(this)};
p.Oc=function(b,c,d){function e(b){var c,d=b.c;d?c=d.call(b,m):(d=f.g)&&(c=d(b,m));if(c){if(c){d=!1;if(Array.isArray(c))for(var e=0,g=c.length;e<g;++e)d=vj(r,b,c[e],uj(m,n),this.Pc,this)||d;else d=vj(r,b,c,uj(m,n),this.Pc,this)||d;b=d}else b=!1;this.h=this.h||b}}var f=this.a;c=f.V();Og(b.attributions,c.i);Pg(b,c);var g=b.viewHints[0],h=b.viewHints[1],k=f.i,l=f.j;if(!this.h&&!k&&g||!l&&h)return!0;var h=b.extent,k=b.viewState,g=k.projection,m=k.resolution,n=b.pixelRatio,k=f.f,q=f.a,l=f.get("renderOrder");
void 0===l&&(l=tj);h=Lb(h,q*m);if(!this.h&&this.B==m&&this.K==k&&this.w==l&&Nb(this.u,h))return!0;this.b&&b.postRenderFunctions.push(Pk(this.b,d));this.h=!1;var r=new Ok(.5*m/n,h,f.a);Zj(c,h,m,g);if(l){var u=[];Xj(c,h,function(b){u.push(b)},this);u.sort(l);u.forEach(e,this)}else Xj(c,h,e,this);Qk(r,d);this.B=m;this.K=k;this.w=l;this.u=h;this.b=r;return!0};function hl(b,c){Zg.call(this,0,c);this.a=document.createElement("CANVAS");this.a.style.width="100%";this.a.style.height="100%";this.a.className="ol-unselectable";fe(b,this.a,0);this.s=this.u=0;this.H=rf();this.j=!0;this.c=xf(this.a,{antialias:!0,depth:!1,failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1,stencil:!0});this.g=new yk(this.a,this.c);Q(this.a,"webglcontextlost",this.ne,this);Q(this.a,"webglcontextrestored",this.oe,this);this.b=new ve;this.o=null;this.i=new dh(function(b){var c=
b[1];b=b[2];var f=c[0]-this.o[0],c=c[1]-this.o[1];return 65536*Math.log(b)+Math.sqrt(f*f+c*c)/b}.bind(this),function(b){return b[0].getKey()});this.w=function(){if(0!==this.i.a.length){hh(this.i);var b=eh(this.i);fl(this,b[0],b[3],b[4])}return!1}.bind(this);this.l=0;il(this)}M(hl,Zg);
function fl(b,c,d,e){var f=b.c,g=c.getKey();if(we(b.b,g))b=b.b.get(g),f.bindTexture(3553,b.ya),9729!=b.Cc&&(f.texParameteri(3553,10240,9729),b.Cc=9729),9729!=b.Dc&&(f.texParameteri(3553,10240,9729),b.Dc=9729);else{var h=f.createTexture();f.bindTexture(3553,h);if(0<e){var k=b.H.canvas,l=b.H;b.u!==d[0]||b.s!==d[1]?(k.width=d[0],k.height=d[1],b.u=d[0],b.s=d[1]):l.clearRect(0,0,d[0],d[1]);l.drawImage(c.T(),e,e,d[0],d[1],0,0,d[0],d[1]);f.texImage2D(3553,0,6408,6408,5121,k)}else f.texImage2D(3553,0,6408,
6408,5121,c.T());f.texParameteri(3553,10240,9729);f.texParameteri(3553,10241,9729);f.texParameteri(3553,10242,33071);f.texParameteri(3553,10243,33071);b.b.set(g,{ya:h,Cc:9729,Dc:9729})}}p=hl.prototype;p.Jb=function(b){return b instanceof X?new el(this,b):b instanceof Y?new gl(this,b):null};function jl(b,c,d){var e=b.h;if(nb(e,c)){b=b.g;var f=d.viewState;S(e,new Fg(c,e,new Vk(b,f.center,f.resolution,f.rotation,d.size,d.extent),d,null,b))}}
p.J=function(){var b=this.c;b.isContextLost()||xe(this.b,function(c){c&&b.deleteTexture(c.ya)});jb(this.g);hl.X.J.call(this)};p.md=function(b,c){for(var d=this.c,e;1024<this.b.f-this.l;){if(e=this.b.a.Ia)d.deleteTexture(e.ya);else if(+this.b.a.Rb==c.index)break;else--this.l;this.b.pop()}};p.U=function(){return"webgl"};p.ne=function(b){b.preventDefault();this.b.clear();this.l=0;b=this.f;for(var c in b)b[c].s()};p.oe=function(){il(this);this.h.render()};
function il(b){b=b.c;b.activeTexture(33984);b.blendFuncSeparate(770,771,1,771);b.disable(2884);b.disable(2929);b.disable(3089);b.disable(2960)}
p.sb=function(b){var c=this.g,d=this.c;if(d.isContextLost())return!1;if(!b)return this.j&&(oe(this.a,!1),this.j=!1),!1;this.o=b.focus;this.b.set((-b.index).toString(),null);++this.l;jl(this,"precompose",b);var e=[],f=b.layerStatesArray;Na(f);var g=b.viewState.resolution,h,k,l,m;h=0;for(k=f.length;h<k;++h)m=f[h],Hg(m,g)&&"ready"==m.$b&&(l=bh(this,m.layer),l.Oc(b,m,c)&&e.push(m));f=b.size[0]*b.pixelRatio;g=b.size[1]*b.pixelRatio;if(this.a.width!=f||this.a.height!=g)this.a.width=f,this.a.height=g;d.bindFramebuffer(36160,
null);d.clearColor(0,0,0,0);d.clear(16384);d.enable(3042);d.viewport(0,0,this.a.width,this.a.height);h=0;for(k=e.length;h<k;++h)m=e[h],l=bh(this,m.layer),l.Nc(b,m,c);this.j||(oe(this.a,!0),this.j=!0);$g(b);1024<this.b.f-this.l&&b.postRenderFunctions.push(this.md.bind(this));0!==this.i.a.length&&(b.postRenderFunctions.push(this.w),b.animate=!0);jl(this,"postcompose",b);ch(this,b);b.postRenderFunctions.push(ah)};
p.Wb=function(b,c,d,e,f,g){var h;if(this.c.isContextLost())return!1;var k=c.viewState,l=c.layerStatesArray,m;for(m=l.length-1;0<=m;--m){h=l[m];var n=h.layer;if(Hg(h,k.resolution)&&f.call(g,n)&&(h=bh(this,n).fb(b,c,d,e)))return h}};p.Jc=function(b,c,d,e){var f=!1;if(this.c.isContextLost())return!1;var g=c.viewState,h=c.layerStatesArray,k;for(k=h.length-1;0<=k;--k){var l=h[k],m=l.layer;if(Hg(l,g.resolution)&&d.call(e,m)&&(f=bh(this,m).Ic(b,c)))return!0}return f};var kl=["canvas","webgl","dom"];
function Z(b){T.call(this);var c=ll(b);this.Ja=void 0!==b.loadTilesWhileAnimating?b.loadTilesWhileAnimating:!1;this.wb=void 0!==b.loadTilesWhileInteracting?b.loadTilesWhileInteracting:!1;this.yb=void 0!==b.pixelRatio?b.pixelRatio:Df;this.xb=c.logos;this.pa=function(){this.h=void 0;this.Ce.call(this,Date.now())}.bind(this);this.Aa=zb();this.zb=zb();this.Ba=0;this.b=null;this.ea=Jb();this.u=this.G=null;this.a=document.createElement("DIV");this.a.className="ol-viewport"+(Gf?" ol-touch":"");this.a.style.position=
"relative";this.a.style.overflow="hidden";this.a.style.width="100%";this.a.style.height="100%";this.a.style.msTouchAction="none";this.a.style.touchAction="none";this.o=document.createElement("DIV");this.o.className="ol-overlaycontainer";this.a.appendChild(this.o);this.j=document.createElement("DIV");this.j.className="ol-overlaycontainer-stopevent";b=["click","dblclick","mousedown","touchstart","mspointerdown",yg,"mousewheel","wheel"];for(var d=0,e=b.length;d<e;++d)Q(this.j,b[d],kb);this.a.appendChild(this.j);
this.Y=new qg(this);for(var f in Bg)Q(this.Y,Bg[f],this.yc,this);this.S=c.keyboardEventTarget;this.i=null;Q(this.a,"wheel",this.Oa,this);Q(this.a,"mousewheel",this.Oa,this);this.s=c.controls;this.g=c.interactions;this.w=c.overlays;this.Tc={};this.D=new c.De(this.a,this);this.P=null;this.B=[];this.aa=[];this.na=new ih(this.vd.bind(this),this.Qd.bind(this));this.Ab={};Q(this,rb("layergroup"),this.Ad,this);Q(this,rb("view"),this.Rd,this);Q(this,rb("size"),this.Nd,this);Q(this,rb("target"),this.Pd,this);
this.l(c.values);nd(this.s,function(b){b.setMap(this)},this);Q(this.s,"add",function(b){b.element.setMap(this)},this);Q(this.s,"remove",function(b){b.element.setMap(null)},this);nd(this.g,function(b){b.setMap(this)},this);Q(this.g,"add",function(b){b.element.setMap(this)},this);Q(this.g,"remove",function(b){b.element.setMap(null)},this);nd(this.w,this.gc,this);Q(this.w,"add",function(b){this.gc(b.element)},this);Q(this.w,"remove",function(b){var c=b.element.La();void 0!==c&&delete this.Tc[c.toString()];
b.element.setMap(null)},this)}M(Z,T);p=Z.prototype;p.hd=function(b){this.s.push(b)};p.jd=function(b){this.g.push(b)};p.kd=function(b){ml(this).get("layers").push(b)};p.ld=function(b){this.w.push(b)};p.gc=function(b){var c=b.La();void 0!==c&&(this.Tc[c.toString()]=b);b.setMap(this)};p.fa=function(b){this.render();Array.prototype.push.apply(this.B,arguments)};
p.J=function(){jb(this.Y);jb(this.D);gb(this.a,"wheel",this.Oa,this);gb(this.a,"mousewheel",this.Oa,this);void 0!==this.c&&(x.removeEventListener("resize",this.c,!1),this.c=void 0);this.h&&(x.cancelAnimationFrame(this.h),this.h=void 0);this.set("target",null);Z.X.J.call(this)};p.pd=function(b,c,d,e,f){if(this.b)return b=this.ta(b),this.D.Wb(b,this.b,c,void 0!==d?d:null,void 0!==e?e:cc,void 0!==f?f:null)};
p.Td=function(b,c,d){if(!this.b)return!1;b=this.ta(b);return this.D.Jc(b,this.b,void 0!==c?c:cc,void 0!==d?d:null)};p.vc=function(b){var c=this.a.getBoundingClientRect();b=b.changedTouches?b.changedTouches[0]:b;return[b.clientX-c.left,b.clientY-c.top]};p.Tb=function(){return this.get("target")};p.Na=function(){var b=this.Tb();return void 0!==b?Zd(b):null};p.ta=function(b){var c=this.b;return c?(b=b.slice(),Kg(c.pixelToCoordinateMatrix,b,b)):null};function ml(b){return b.get("layergroup")}
function Eh(b,c){var d=b.b;if(d){var e=c.slice(0,2);return Kg(d.coordinateToPixelMatrix,e,e)}return null}p.Pa=function(){return this.get("size")};p.O=function(){return this.get("view")};p.vd=function(b,c,d,e){var f=this.b;if(!(f&&c in f.wantedTiles&&f.wantedTiles[c][b.L.toString()]))return Infinity;b=d[0]-f.focus[0];d=d[1]-f.focus[1];return 65536*Math.log(e)+Math.sqrt(b*b+d*d)/e};p.Oa=function(b,c){var d=new og(c||b.type,this,b);this.yc(d)};
p.yc=function(b){if(this.b){this.P=b.coordinate;b.frameState=this.b;var c=this.g.a,d;if(!1!==S(this,b))for(d=c.length-1;0<=d;d--){var e=c[d];if(e.get("active")&&!e.handleEvent(b))break}}};
p.Md=function(){var b=this.b,c=this.na;if(0!==c.a.length){var d=16,e=d;if(b){var f=b.viewHints;f[0]&&(d=this.Ja?8:0,e=2);f[1]&&(d=this.wb?8:0,e=2)}if(c.h<d){hh(c);for(var f=0,g,h;c.h<d&&f<e&&0<c.a.length;)g=eh(c)[0],h=g.getKey(),0!==g.N()||h in c.g||(c.g[h]=!0,++c.h,++f,g.load())}}c=this.aa;d=0;for(e=c.length;d<e;++d)c[d](this,b);c.length=0};p.Nd=function(){this.render()};
p.Pd=function(){var b;this.Tb()&&(b=this.Na());if(this.i){for(var c=0,d=this.i.length;c<d;++c)N(this.i[c]);this.i=null}b?(b.appendChild(this.a),b=this.S?this.S:b,this.i=[Q(b,"keydown",this.Oa,this),Q(b,"keypress",this.Oa,this)],this.c||(this.c=this.vb.bind(this),x.addEventListener("resize",this.c,!1))):(ge(this.a),void 0!==this.c&&(x.removeEventListener("resize",this.c,!1),this.c=void 0));this.vb()};p.Qd=function(){this.render()};p.Sd=function(){this.render()};
p.Rd=function(){this.G&&(N(this.G),this.G=null);var b=this.O();b&&(this.G=Q(b,"propertychange",this.Sd,this));this.render()};p.Bd=function(){this.render()};p.Cd=function(){this.render()};p.Ad=function(){this.u&&(this.u.forEach(N),this.u=null);var b=ml(this);b&&(this.u=[Q(b,"propertychange",this.Cd,this),Q(b,"change",this.Bd,this)]);this.render()};p.render=function(){void 0===this.h&&(this.h=x.requestAnimationFrame(this.pa))};p.ze=function(b){return this.g.remove(b)};p.Ae=function(b){return ml(this).get("layers").remove(b)};
p.Ce=function(b){var c,d,e,f=this.Pa(),g=this.O(),h=null;if(c=void 0!==f&&0<f[0]&&0<f[1]&&g)c=!!g.ia()&&void 0!==g.I();if(c){var h=g.g.slice(),k=ml(this).Lb(),l={};c=0;for(d=k.length;c<d;++c)l[I(k[c].layer)]=k[c];e=g.N();h={animate:!1,attributions:{},coordinateToPixelMatrix:this.Aa,extent:null,focus:this.P?this.P:e.center,index:this.Ba++,layerStates:l,layerStatesArray:k,logos:Wa({},this.xb),pixelRatio:this.yb,pixelToCoordinateMatrix:this.zb,postRenderFunctions:[],size:f,skippedFeatureUids:this.Ab,
tileQueue:this.na,time:b,usedTiles:{},viewState:e,viewHints:h,wantedTiles:{}}}if(h){b=this.B;c=f=0;for(d=b.length;c<d;++c)g=b[c],g(this,h)&&(b[f++]=g);b.length=f;h.extent=Zb(e.center,e.resolution,e.rotation,h.size)}this.b=h;this.D.sb(h);h&&(h.animate&&this.render(),Array.prototype.push.apply(this.aa,h.postRenderFunctions),0!==this.B.length||h.viewHints[0]||h.viewHints[1]||Rb(h.extent,this.ea)||(S(this,new te("moveend",this,h)),Mb(h.extent,this.ea)));S(this,new te("postrender",this,h));c=e=this.Md;
this&&(c=ma(e,this));!ga(x.setImmediate)||x.Window&&x.Window.prototype&&!W("Edge")&&x.Window.prototype.setImmediate==x.setImmediate?(lf||(lf=mf()),lf(c)):x.setImmediate(c)};
p.vb=function(){var b=this.Na();if(b){var c=Yd(b),d=Gd&&b.currentStyle,e;if(e=d)Wd(c),e=!0;if(e&&"auto"!=d.width&&"auto"!=d.height&&!d.boxSizing)c=pe(b,d.width,"width","pixelWidth"),b=pe(b,d.height,"height","pixelHeight"),b=new Vd(c,b);else{d=new Vd(b.offsetWidth,b.offsetHeight);if(Gd){c=qe(b,"paddingLeft");e=qe(b,"paddingRight");var f=qe(b,"paddingTop"),g=qe(b,"paddingBottom"),c=new je(f,e,g,c)}else c=ke(b,"paddingLeft"),e=ke(b,"paddingRight"),f=ke(b,"paddingTop"),g=ke(b,"paddingBottom"),c=new je(parseFloat(f),
parseFloat(e),parseFloat(g),parseFloat(c));!Gd||9<=Number(Sd)?(e=ke(b,"borderLeftWidth"),f=ke(b,"borderRightWidth"),g=ke(b,"borderTopWidth"),b=ke(b,"borderBottomWidth"),b=new je(parseFloat(g),parseFloat(f),parseFloat(b),parseFloat(e))):(e=se(b,"borderLeft"),f=se(b,"borderRight"),g=se(b,"borderTop"),b=se(b,"borderBottom"),b=new je(g,f,b,e));b=new Vd(d.width-b.left-c.left-c.right-b.right,d.height-b.top-c.top-c.bottom-b.bottom)}this.set("size",[b.width,b.height])}else this.set("size",void 0)};
function ll(b){var c=null;void 0!==b.keyboardEventTarget&&(c="string"===typeof b.keyboardEventTarget?document.getElementById(b.keyboardEventTarget):b.keyboardEventTarget);var d={},e={};if(void 0===b.logo||"boolean"===typeof b.logo&&b.logo)e["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"]=
"http://openlayers.org/";else{var f=b.logo;"string"===typeof f?e[f]="":ha(f)&&(e[f.src]=f.href)}f=b.layers instanceof gi?b.layers:new gi({layers:b.layers});d.layergroup=f;d.target=b.target;d.view=void 0!==b.view?b.view:new V;var f=Zg,g;void 0!==b.renderer?Array.isArray(b.renderer)?g=b.renderer:"string"===typeof b.renderer&&(g=[b.renderer]):g=kl;var h,k;h=0;for(k=g.length;h<k;++h){var l=g[h];if("canvas"==l){if(Ff){f=ik;break}}else if("dom"==l){f=pk;break}else if("webgl"==l&&yf){f=hl;break}}var m;void 0!==
b.controls?m=Array.isArray(b.controls)?new ld(b.controls.slice()):b.controls:m=ef();if(void 0!==b.interactions)g=Array.isArray(b.interactions)?new ld(b.interactions.slice()):b.interactions;else{g={};h=new ld;k=new jh;(void 0!==g.altShiftDragRotate?g.altShiftDragRotate:1)&&h.push(new Fh);(void 0!==g.doubleClickZoom?g.doubleClickZoom:1)&&h.push(new ph({delta:g.zoomDelta,duration:g.zoomDuration}));(void 0!==g.dragPan?g.dragPan:1)&&h.push(new Ah({kinetic:k}));(void 0!==g.pinchRotate?g.pinchRotate:1)&&
h.push(new Zh);(void 0!==g.pinchZoom?g.pinchZoom:1)&&h.push(new ci({duration:g.zoomDuration}));if(void 0!==g.keyboard?g.keyboard:1)h.push(new Th),h.push(new Vh({delta:g.zoomDelta,duration:g.zoomDuration}));(void 0!==g.mouseWheelZoom?g.mouseWheelZoom:1)&&h.push(new Xh({duration:g.zoomDuration}));(void 0!==g.shiftDragZoom?g.shiftDragZoom:1)&&h.push(new Sh({duration:g.zoomDuration}));g=h}b=void 0!==b.overlays?Array.isArray(b.overlays)?new ld(b.overlays.slice()):b.overlays:new ld;return{controls:m,interactions:g,
keyboardEventTarget:c,logos:e,overlays:b,De:f,values:d}}mc(li);mc(si);si.forEach(function(b){li.forEach(function(c){nc(b,c,mi);nc(c,b,ni)})});function nl(b){T.call(this);this.j=b.id;this.i=void 0!==b.insertFirst?b.insertFirst:!0;this.o=void 0!==b.stopEvent?b.stopEvent:!0;this.b=document.createElement("DIV");this.b.className="ol-overlay-container";this.b.style.position="absolute";this.autoPan=void 0!==b.autoPan?b.autoPan:!1;this.g=void 0!==b.autoPanAnimation?b.autoPanAnimation:{};this.h=void 0!==b.autoPanMargin?b.autoPanMargin:20;this.a={hb:"",pb:"",tb:"",ub:"",visible:!0};this.c=null;Q(this,rb("element"),this.yd,this);Q(this,rb("map"),
this.Hd,this);Q(this,rb("offset"),this.Id,this);Q(this,rb("position"),this.Kd,this);Q(this,rb("positioning"),this.Ld,this);void 0!==b.element&&this.set("element",b.element);this.set("offset",void 0!==b.offset?b.offset:[0,0]);this.set("positioning",void 0!==b.positioning?b.positioning:"top-left");void 0!==b.position&&this.Ec(b.position)}M(nl,T);p=nl.prototype;p.La=function(){return this.j};p.yd=function(){ee(this.b);var b=this.get("element");b&&this.b.appendChild(b)};
p.Hd=function(){this.c&&(ge(this.b),N(this.c),this.c=null);var b=this.get("map");b&&(this.c=Q(b,"postrender",this.render,this),pl(this),b=this.o?b.j:b.o,this.i?fe(b,this.b,0):b.appendChild(this.b))};p.render=function(){pl(this)};p.Id=function(){pl(this)};
p.Kd=function(){pl(this);if(void 0!==this.get("position")&&this.autoPan){var b=this.get("map");if(void 0!==b&&b.Na()){var c=ql(b.Na(),b.Pa()),d=this.get("element"),e=d.offsetWidth,f=d.currentStyle||x.getComputedStyle(d),e=e+(parseInt(f.marginLeft,10)+parseInt(f.marginRight,10)),f=d.offsetHeight,g=d.currentStyle||x.getComputedStyle(d),f=f+(parseInt(g.marginTop,10)+parseInt(g.marginBottom,10)),h=ql(d,[e,f]),d=this.h;Nb(c,h)||(e=h[0]-c[0],f=c[2]-h[2],g=h[1]-c[1],h=c[3]-h[3],c=[0,0],0>e?c[0]=e-d:0>f&&
(c[0]=Math.abs(f)+d),0>g?c[1]=g-d:0>h&&(c[1]=Math.abs(h)+d),0===c[0]&&0===c[1])||(d=b.O().ia(),e=Eh(b,d),c=[e[0]+c[0],e[1]+c[1]],this.g&&(this.g.source=d,b.fa(cd(this.g))),b.O().oa(b.ta(c)))}}};p.Ld=function(){pl(this)};p.setMap=function(b){this.set("map",b)};p.Ec=function(b){this.set("position",b)};
function ql(b,c){var d=Yd(b),e=new Ud(0,0),f;f=d?Yd(d):document;var g;(g=!Gd||9<=Number(Sd))||(Wd(f),g=!0);b!=(g?f.documentElement:f.body)&&(f=le(b),g=Wd(d).a,d=g.scrollingElement?g.scrollingElement:Jd?g.body||g.documentElement:g.documentElement,g=g.parentWindow||g.defaultView,d=Gd&&Qd("10")&&g.pageYOffset!=d.scrollTop?new Ud(d.scrollLeft,d.scrollTop):new Ud(g.pageXOffset||d.scrollLeft,g.pageYOffset||d.scrollTop),e.x=f.left+d.x,e.y=f.top+d.y);return[e.x,e.y,e.x+c[0],e.y+c[1]]}
function rl(b,c){b.a.visible!==c&&(oe(b.b,c),b.a.visible=c)}
function pl(b){var c=b.get("map"),d=b.get("position");if(void 0!==c&&c.b&&void 0!==d){var d=Eh(c,d),e=c.Pa(),c=b.b.style,f=b.get("offset"),g=b.get("positioning"),h=f[0],f=f[1];if("bottom-right"==g||"center-right"==g||"top-right"==g)""!==b.a.pb&&(b.a.pb=c.left=""),h=Math.round(e[0]-d[0]-h)+"px",b.a.tb!=h&&(b.a.tb=c.right=h);else{""!==b.a.tb&&(b.a.tb=c.right="");if("bottom-center"==g||"center-center"==g||"top-center"==g)h-=me(b.b).width/2;h=Math.round(d[0]+h)+"px";b.a.pb!=h&&(b.a.pb=c.left=h)}if("bottom-left"==
g||"bottom-center"==g||"bottom-right"==g)""!==b.a.ub&&(b.a.ub=c.top=""),d=Math.round(e[1]-d[1]-f)+"px",b.a.hb!=d&&(b.a.hb=c.bottom=d);else{""!==b.a.hb&&(b.a.hb=c.bottom="");if("center-left"==g||"center-center"==g||"center-right"==g)f-=me(b.b).height/2;d=Math.round(d[1]+f)+"px";b.a.ub!=d&&(b.a.ub=c.top=d)}rl(b,!0)}else rl(b,!1)};function sl(){this.defaultDataProjection=null}function tl(b,c,d){var e;d&&(e={dataProjection:d.dataProjection?d.dataProjection:b.f(Ij(c)),featureProjection:d.featureProjection});var f;e&&(f={featureProjection:e.featureProjection,dataProjection:e.dataProjection?e.dataProjection:b.defaultDataProjection,rightHanded:e.rightHanded},e.decimals&&(f.decimals=e.decimals));return f}
function ul(b,c){var d=c?lc(c.featureProjection):null,e=c?lc(c.dataProjection):null;if(d&&e&&!wc(d,e))if(b instanceof zc)d=b.o(e,d);else{e=xc(e,d);d=[b[0],b[1],b[0],b[3],b[2],b[1],b[2],b[3]];e(d,d,2);var f=[d[0],d[2],d[4],d[6]],g=[d[1],d[3],d[5],d[7]],d=Math.min.apply(null,f),e=Math.min.apply(null,g),f=Math.max.apply(null,f),g=Math.max.apply(null,g),d=Ob(d,e,f,g,void 0)}else d=b;return d};function vl(){this.defaultDataProjection=null}M(vl,sl);function Ij(b){return ha(b)?b:"string"===typeof b?(b=JSON.parse(b))?b:null:null}vl.prototype.U=function(){return"json"};vl.prototype.g=function(b,c){return this.a(Ij(b),tl(this,b,c))};vl.prototype.b=function(b,c){return this.h(Ij(b),tl(this,b,c))};function wl(b,c,d,e,f){var g=NaN,h=NaN,k=(d-c)/e;if(0!==k)if(1==k)g=b[c],h=b[c+1];else if(2==k)g=.5*b[c]+.5*b[c+e],h=.5*b[c+1]+.5*b[c+e+1];else{var h=b[c],k=b[c+1],l=0,g=[0],m;for(m=c+e;m<d;m+=e){var n=b[m],q=b[m+1],l=l+Math.sqrt((n-h)*(n-h)+(q-k)*(q-k));g.push(l);h=n;k=q}d=.5*l;l=0;m=g.length;for(n=!1;l<m;)h=l+(m-l>>1),k=+Ha(g[h],d),0>k?l=h+1:(m=h,n=!k);h=n?l:~l;0>h?(d=(d-g[-h-2])/(g[-h-1]-g[-h-2]),c+=(-h-2)*e,g=b[c],g=g+d*(b[c+e]-g),h=b[c+1],h=h+d*(b[c+e+1]-h)):(g=b[c+h*e],h=b[c+h*e+1])}return f?
(f[0]=g,f[1]=h,f):[g,h]};function xl(b,c){Bc.call(this);this.c=null;this.j=-1;this.W(b,c)}M(xl,Bc);p=xl.prototype;p.clone=function(){var b=new xl(null);U(b,this.g,this.a.slice());b.v();return b};p.ra=function(){return Hc(this.a,0,this.a.length,this.b)};function Ti(b){if(b.j!=b.f){var c;c=wl(b.a,0,b.a.length,b.b,b.c);b.c=c;b.j=b.f}return b.c}p.Ma=function(b){var c=[];c.length=Jc(this.a,0,this.a.length,this.b,b,c,0);b=new xl(null);U(b,"XY",c);b.v();return b};p.U=function(){return"LineString"};
p.W=function(b,c){b?(Dc(this,c,b,1),this.a||(this.a=[]),this.a.length=Fc(this.a,0,b,this.b)):U(this,"XY",null);this.v()};function yl(b,c){Bc.call(this);this.c=[];this.W(b,c)}M(yl,Bc);p=yl.prototype;p.clone=function(){var b=new yl(null),c=this.c.slice();U(b,this.g,this.a.slice());b.c=c;b.v();return b};p.ra=function(){return Ic(this.a,0,this.c,this.b)};p.ab=function(){return this.c};function Ui(b){var c=[],d=b.a,e=0,f=b.c;b=b.b;var g,h;g=0;for(h=f.length;g<h;++g){var k=f[g],e=wl(d,e,k,b);Ka(c,e);e=k}return c}
p.Ma=function(b){var c=[],d=[],e=this.a,f=this.c,g=this.b,h=0,k=0,l,m;l=0;for(m=f.length;l<m;++l){var n=f[l],k=Jc(e,h,n,g,b,c,k);d.push(k);h=n}c.length=k;b=new yl(null);U(b,"XY",c);b.c=d;b.v();return b};p.U=function(){return"MultiLineString"};p.W=function(b,c){if(b){Dc(this,c,b,2);this.a||(this.a=[]);var d=Gc(this.a,0,b,this.b,this.c);this.a.length=0===d.length?0:d[d.length-1]}else d=this.c,U(this,"XY",null),this.c=d;this.v()};function zl(b,c){Bc.call(this);this.W(b,c)}M(zl,Bc);zl.prototype.clone=function(){var b=new zl(null);U(b,this.g,this.a.slice());b.v();return b};zl.prototype.ra=function(){return Hc(this.a,0,this.a.length,this.b)};zl.prototype.U=function(){return"MultiPoint"};zl.prototype.W=function(b,c){b?(Dc(this,c,b,1),this.a||(this.a=[]),this.a.length=Fc(this.a,0,b,this.b)):U(this,"XY",null);this.v()};function Al(b,c){Bc.call(this);this.c=[];this.B=-1;this.D=null;this.G=-1;this.j=null;this.W(b,c)}M(Al,Bc);p=Al.prototype;p.clone=function(){for(var b=new Al(null),c=this.c.length,d=Array(c),e=0;e<c;++e)d[e]=this.c[e].slice();U(b,this.g,this.a.slice());b.c=d;b.v();return b};p.ra=function(b){var c;void 0!==b?(c=Vi(this).slice(),Sc(c,this.c,this.b,b)):c=this.a;b=c;c=this.c;var d=this.b,e=0,f=[],g=0,h,k;h=0;for(k=c.length;h<k;++h){var l=c[h];f[g++]=Ic(b,e,l,d,f[g]);e=l[l.length-1]}f.length=g;return f};
function Wi(b){if(b.B!=b.f){var c=b.a,d=b.c,e=b.b,f=0,g=[],h,k,l=Jb();h=0;for(k=d.length;h<k;++h){var m=d[h],l=c,n=m[0],q=e,r=Pb(void 0),l=Tb(r,l,f,n,q);g.push((l[0]+l[2])/2,(l[1]+l[3])/2);f=m[m.length-1]}c=Vi(b);d=b.c;e=b.b;h=0;k=[];m=0;for(l=d.length;m<l;++m)f=d[m],k=Oc(c,h,f,e,g,2*m,k),h=f[f.length-1];b.D=k;b.B=b.f}return b.D}
function Vi(b){if(b.G!=b.f){var c=b.a,d;a:{d=b.c;var e,f;e=0;for(f=d.length;e<f;++e)if(!Qc(c,d[e],b.b,void 0)){d=!1;break a}d=!0}d?b.j=c:(b.j=c.slice(),b.j.length=Sc(b.j,b.c,b.b));b.G=b.f}return b.j}p.Ma=function(b){var c=[],d=[],e=this.a,f=this.c,g=this.b;b=Math.sqrt(b);var h=0,k=0,l,m;l=0;for(m=f.length;l<m;++l){var n=f[l],q=[],k=Kc(e,h,n,g,b,c,k,q);d.push(q);h=n[n.length-1]}c.length=k;e=new Al(null);U(e,"XY",c);e.c=d;e.v();return e};p.U=function(){return"MultiPolygon"};
p.W=function(b,c){if(b){Dc(this,c,b,3);this.a||(this.a=[]);var d=this.a,e=this.b,f=this.c,g=0,f=f?f:[],h=0,k,l;k=0;for(l=b.length;k<l;++k)g=Gc(d,g,b[k],e,f[h]),f[h++]=g,g=g[g.length-1];f.length=h;0===f.length?this.a.length=0:(d=f[f.length-1],this.a.length=0===d.length?0:d[d.length-1])}else d=this.c,U(this,"XY",null),this.c=d;this.v()};function Bl(b){b=b?b:{};this.defaultDataProjection=null;this.c=b.geometryName}M(Bl,vl);function Cl(b){var c="XY";!0===b.hasZ&&!0===b.hasM?c="XYZM":!0===b.hasZ?c="XYZ":!0===b.hasM&&(c="XYM");return c}
var Dl={Point:function(b){return void 0!==b.m&&void 0!==b.z?new Mc([b.x,b.y,b.z,b.m],"XYZM"):void 0!==b.z?new Mc([b.x,b.y,b.z],"XYZ"):void 0!==b.m?new Mc([b.x,b.y,b.m],"XYM"):new Mc([b.x,b.y])},LineString:function(b){return new xl(b.paths[0],Cl(b))},Polygon:function(b){return new Tc(b.rings,Cl(b))},MultiPoint:function(b){return new zl(b.points,Cl(b))},MultiLineString:function(b){return new yl(b.paths,Cl(b))},MultiPolygon:function(b){return new Al(b.rings,Cl(b))}};
Bl.prototype.a=function(b,c){var d;if(d=b.geometry){var e;if(ea(d.x)&&ea(d.y))e="Point";else if(d.points)e="MultiPoint";else if(d.paths)e=1===d.paths.length?"LineString":"MultiLineString";else if(d.rings){var f=d.rings,g=Cl(d),h=[];e=[];var k,l;k=0;for(l=f.length;k<l;++k){var m=Ja(f[k]);Pc(m,0,m.length,g.length)?h.push([f[k]]):e.push(f[k])}for(;e.length;){f=e.shift();g=!1;for(k=h.length-1;0<=k;k--)if(Nb((new Lc(h[k][0])).C(),(new Lc(f)).C())){h[k].push(f);g=!0;break}g||h.push([f.reverse()])}d=Wa({},
d);1===h.length?(e="Polygon",d.rings=h[0]):(e="MultiPolygon",d.rings=h)}d=ul((0,Dl[e])(d),c)}else d=null;h=new Dj;this.c&&Fj(h,this.c);Ej(h,d);c&&c.Qb&&b.attributes[c.Qb]&&(h.g=b.attributes[c.Qb],h.v());b.attributes&&h.l(b.attributes);return h};Bl.prototype.h=function(b,c){var d=c?c:{};if(b.features){var e=[],f=b.features,g,h;d.Qb=b.objectIdFieldName;g=0;for(h=f.length;g<h;++g)e.push(this.a(f[g],d));return e}return[this.a(b,d)]};
Bl.prototype.f=function(b){return b.spatialReference&&b.spatialReference.wkid?lc("EPSG:"+b.spatialReference.wkid):null};function El(b){zc.call(this);this.a=b?b:null;Fl(this)}M(El,zc);function Gl(b){var c,d;if(b.a)for(c=0,d=b.a.length;c<d;++c)gb(b.a[c],"change",b.v,b)}function Fl(b){var c,d;if(b.a)for(c=0,d=b.a.length;c<d;++c)Q(b.a[c],"change",b.v,b)}p=El.prototype;p.clone=function(){var b=new El(null),c=this.a,d=[],e,f;e=0;for(f=c.length;e<f;++e)d.push(c[e].clone());Gl(b);b.a=d;Fl(b);b.v();return b};p.ib=function(b){Pb(b);for(var c=this.a,d=0,e=c.length;d<e;++d)Sb(b,c[d].C());return b};
p.Ob=function(b){this.s!=this.f&&(Ya(this.h),this.i=0,this.s=this.f);if(0>b||0!==this.i&&b<this.i)return this;var c=b.toString();if(this.h.hasOwnProperty(c))return this.h[c];var d=[],e=this.a,f=!1,g,h;g=0;for(h=e.length;g<h;++g){var k=e[g],l=k.Ob(b);d.push(l);l!==k&&(f=!0)}if(f)return b=new El(null),Gl(b),b.a=d,Fl(b),b.v(),this.h[c]=b;this.i=b;return this};p.U=function(){return"GeometryCollection"};p.rotate=function(b,c){for(var d=this.a,e=0,f=d.length;e<f;++e)d[e].rotate(b,c);this.v()};
p.Eb=function(b){var c=this.a,d,e;d=0;for(e=c.length;d<e;++d)c[d].Eb(b);this.v()};p.J=function(){Gl(this);El.X.J.call(this)};function Hl(b){b=b?b:{};this.defaultDataProjection=null;this.defaultDataProjection=lc(b.defaultDataProjection?b.defaultDataProjection:"EPSG:4326");this.c=b.geometryName}M(Hl,vl);function Il(b,c){return b?ul((0,Jl[b.type])(b),c):null}
var Jl={Point:function(b){return new Mc(b.coordinates)},LineString:function(b){return new xl(b.coordinates)},Polygon:function(b){return new Tc(b.coordinates)},MultiPoint:function(b){return new zl(b.coordinates)},MultiLineString:function(b){return new yl(b.coordinates)},MultiPolygon:function(b){return new Al(b.coordinates)},GeometryCollection:function(b,c){var d=b.geometries.map(function(b){return Il(b,c)});return new El(d)}};
Hl.prototype.a=function(b,c){var d=Il(b.geometry,c),e=new Dj;this.c&&Fj(e,this.c);Ej(e,d);void 0!==b.id&&(e.g=b.id,e.v());b.properties&&e.l(b.properties);return e};Hl.prototype.h=function(b,c){if("Feature"==b.type)return[this.a(b,c)];if("FeatureCollection"==b.type){var d=[],e=b.features,f,g;f=0;for(g=e.length;f<g;++f)d.push(this.a(e[f],c));return d}return[]};Hl.prototype.f=function(b){return(b=b.crs)?"name"==b.type?lc(b.properties.name):"EPSG"==b.type?lc("EPSG:"+b.properties.code):null:this.defaultDataProjection};function Kl(b,c,d){if("array"==ba(c))for(var e=0;e<c.length;e++)Kl(b,String(c[e]),d);else null!=c&&d.push("&",b,""===c?"":"=",encodeURIComponent(String(c)))};function Ll(b,c,d){Bc.call(this);Ml(this,b,c?c:0,d)}M(Ll,Bc);Ll.prototype.clone=function(){var b=new Ll(null);U(b,this.g,this.a.slice());b.v();return b};Ll.prototype.ib=function(b){var c=this.a,d=c[this.b]-c[0];return Ob(c[0]-d,c[1]-d,c[0]+d,c[1]+d,b)};Ll.prototype.U=function(){return"Circle"};function Ml(b,c,d,e){if(c){Dc(b,e,c,0);b.a||(b.a=[]);e=b.a;c=Ec(e,c);e[c++]=e[0]+d;var f;d=1;for(f=b.b;d<f;++d)e[c++]=e[d];e.length=c}else U(b,"XY",null);b.v()};function Nl(b,c,d,e,f){Be.call(this,b,c);this.g=d;this.b=new Image;null!==e&&(this.b.crossOrigin=e);this.f={};this.c=null;this.h=f}M(Nl,Be);p=Nl.prototype;p.J=function(){1==this.state&&Ol(this);this.a&&jb(this.a);this.state=5;Ce(this);Nl.X.J.call(this)};p.T=function(b){if(void 0!==b){var c=I(b);if(c in this.f)return this.f[c];b=$a(this.f)?this.b:this.b.cloneNode(!1);return this.f[c]=b}return this.b};p.getKey=function(){return this.g};p.ie=function(){this.state=3;Ol(this);Ce(this)};
p.je=function(){this.state=this.b.naturalWidth&&this.b.naturalHeight?2:4;Ol(this);Ce(this)};p.load=function(){0==this.state&&(this.state=1,Ce(this),this.c=[Q(this.b,"error",this.ie,this,!0),Q(this.b,"load",this.je,this,!0)],this.h(this,this.g))};function Ol(b){b.c.forEach(N);b.c=null};function Pl(b,c){R.call(this,b);this.feature=c}M(Pl,R);
function Ql(b){xh.call(this,{handleDownEvent:Rl,handleEvent:Sl,handleUpEvent:Tl});this.P=null;this.o=!1;this.Ba=b.source?b.source:null;this.pa=b.features?b.features:null;this.Zc=b.snapTolerance?b.snapTolerance:12;this.D=b.type;this.b=Ul(this.D);this.na=b.minPoints?b.minPoints:this.b===Vl?3:2;this.ea=b.maxPoints?b.maxPoints:Infinity;var c=b.geometryFunction;if(!c)if("Circle"===this.D)c=function(b,c){var d=c?c:new Ll([NaN,NaN]),h=b[0],k=b[1],l=h[0]-k[0],h=h[1]-k[1];Ml(d,b[0],Math.sqrt(l*l+h*h));return d};
else{var d,c=this.b;c===Xl?d=Mc:c===Yl?d=xl:c===Vl&&(d=Tc);c=function(b,c){var g=c;g?g.W(b):g=new d(b);return g}}this.u=c;this.B=this.i=this.a=this.j=this.g=this.h=null;this.gd=b.clickTolerance?b.clickTolerance*b.clickTolerance:36;this.Y=new Y({source:new Rj({useSpatialIndex:!1,wrapX:b.wrapX?b.wrapX:!1}),style:b.style?b.style:Zl()});this.Aa=b.geometryName;this.Ab=b.condition?b.condition:th;this.aa=b.freehandCondition?b.freehandCondition:uh;Q(this,rb("active"),this.Ja,this)}M(Ql,xh);
function Zl(){var b=Li();return function(c){return b[c.M().U()]}}Ql.prototype.setMap=function(b){Ql.X.setMap.call(this,b);this.Ja()};function Sl(b){this.b!==Yl&&this.b!==Vl||!this.aa(b)||(this.o=!0);var c=!this.o;this.o&&b.type===Ag?($l(this,b),c=!1):b.type===zg?c=am(this,b):b.type===tg&&(c=!1);return yh.call(this,b)&&c}function Rl(b){return this.Ab(b)?(this.P=b.pixel,!0):this.o?(this.P=b.pixel,this.h||bm(this,b),!0):!1}
function Tl(b){this.o=!1;var c=this.P,d=b.pixel,e=c[0]-d[0],c=c[1]-d[1],d=!0;e*e+c*c<=this.gd&&(am(this,b),this.h?this.b===cm?dm(this):em(this,b)?dm(this):$l(this,b):(bm(this,b),this.b===Xl&&dm(this)),d=!1);return d}
function am(b,c){if(b.h){var d=c.coordinate,e=b.g.M(),f;b.b===Xl?f=b.a:b.b===Vl?(f=b.a[0],f=f[f.length-1],em(b,c)&&(d=b.h.slice())):(f=b.a,f=f[f.length-1]);f[0]=d[0];f[1]=d[1];b.u(b.a,e);b.j&&b.j.M().W(d);e instanceof Tc&&b.b!==Vl?(b.i||(b.i=new Dj(new xl(null))),0>=e.c.length?e=null:(d=new Lc(null),U(d,e.g,e.a.slice(0,e.c[0])),d.v(),e=d),d=b.i.M(),U(d,e.g,e.a),d.v()):b.B&&(d=b.i.M(),d.W(b.B));fm(b)}else e=c.coordinate.slice(),b.j?b.j.M().W(e):(b.j=new Dj(new Mc(e)),fm(b));return!0}
function em(b,c){var d=!1;if(b.g){var e=!1,f=[b.h];b.b===Yl?e=b.a.length>b.na:b.b===Vl&&(e=b.a[0].length>b.na,f=[b.a[0][0],b.a[0][b.a[0].length-2]]);if(e)for(var e=c.map,g=0,h=f.length;g<h;g++){var k=f[g],l=Eh(e,k),m=c.pixel,d=m[0]-l[0],l=m[1]-l[1],m=b.o&&b.aa(c)?1:b.Zc;if(d=Math.sqrt(d*d+l*l)<=m){b.h=k;break}}}return d}
function bm(b,c){var d=c.coordinate;b.h=d;b.b===Xl?b.a=d.slice():b.b===Vl?(b.a=[[d.slice(),d.slice()]],b.B=b.a[0]):(b.a=[d.slice(),d.slice()],b.b===cm&&(b.B=b.a));b.B&&(b.i=new Dj(new xl(b.B)));d=b.u(b.a);b.g=new Dj;b.Aa&&Fj(b.g,b.Aa);Ej(b.g,d);fm(b);S(b,new Pl("drawstart",b.g))}
function $l(b,c){var d=c.coordinate,e=b.g.M(),f,g;if(b.b===Yl)b.h=d.slice(),g=b.a,g.push(d.slice()),f=g.length>b.ea,b.u(g,e);else if(b.b===Vl){g=b.a[0];g.push(d.slice());if(f=g.length>b.ea)b.h=g[0];b.u(b.a,e)}fm(b);f&&dm(b)}
function dm(b){var c=gm(b),d=b.a,e=c.M();b.b===Yl?(d.pop(),b.u(d,e)):b.b===Vl&&(d[0].pop(),d[0].push(d[0][0]),b.u(d,e));"MultiPoint"===b.D?Ej(c,new zl([d])):"MultiLineString"===b.D?Ej(c,new yl([d])):"MultiPolygon"===b.D&&Ej(c,new Al([d]));S(b,new Pl("drawend",c));b.pa&&b.pa.push(c);b.Ba&&b.Ba.Cb(c)}function gm(b){b.h=null;var c=b.g;c&&(b.g=null,b.j=null,b.i=null,b.Y.V().clear(!0));return c}Ql.prototype.w=dc;
function fm(b){var c=[];b.g&&c.push(b.g);b.i&&c.push(b.i);b.j&&c.push(b.j);b=b.Y.V();b.clear(!0);b.Db(c)}Ql.prototype.Ja=function(){var b=this.S,c=this.get("active");b&&c||gm(this);this.Y.setMap(c?b:null)};function Ul(b){var c;"Point"===b||"MultiPoint"===b?c=Xl:"LineString"===b||"MultiLineString"===b?c=Yl:"Polygon"===b||"MultiPolygon"===b?c=Vl:"Circle"===b&&(c=cm);return c}var Xl="Point",Yl="LineString",Vl="Polygon",cm="Circle";function hm(b,c,d,e,f,g,h,k,l,m,n){Be.call(this,f,0);this.u=void 0!==n?n:!1;this.s=h;this.o=k;this.c=null;this.f={};this.g=c;this.l=e;this.i=g?g:f;this.b=[];this.Sa=null;this.h=0;g=Je(e,this.i);k=this.l.C();f=this.g.C();g=k?$b(g,k):g;if(0===Ub(g))this.state=4;else if((k=b.C())&&(f?f=$b(f,k):f=k),k=e.I(this.i[0]),n=Yb(g),e=xc(d,b)(n,void 0,n.length),k=d.getPointResolution(k,n),n=pc(d),void 0!==n&&(k*=n),n=pc(b),void 0!==n&&(k/=n),e=b.getPointResolution(k,e)/k,isFinite(e)&&0<e&&(k/=e),e=k,!isFinite(e)||
0>=e)this.state=4;else if(this.j=new Aj(b,d,g,f,e*(void 0!==m?m:.5)),0===this.j.c.length)this.state=4;else if(this.h=Qe(c,e),d=Cj(this.j),f&&(b.a?(d[1]=Ca(d[1],f[1],f[3]),d[3]=Ca(d[3],f[1],f[3])):d=$b(d,f)),Ub(d))if(b=Ke(c,d,this.h),100>b.ha()*(b.c-b.b+1)){for(c=b.a;c<=b.f;c++)for(d=b.b;d<=b.c;d++)(m=l(this.h,c,d,h))&&this.b.push(m);0===this.b.length&&(this.state=4)}else this.state=3;else this.state=4}M(hm,Be);hm.prototype.J=function(){1==this.state&&(this.Sa.forEach(N),this.Sa=null);hm.X.J.call(this)};
hm.prototype.T=function(b){if(void 0!==b){var c=I(b);if(c in this.f)return this.f[c];b=$a(this.f)?this.c:this.c.cloneNode(!1);return this.f[c]=b}return this.c};
hm.prototype.Uc=function(){var b=[];this.b.forEach(function(c){c&&2==c.N()&&b.push({extent:Je(this.g,c.L),image:c.T()})},this);this.b.length=0;if(0===b.length)this.state=3;else{var c=this.i[0],d=Pe(this.l,c),e=ea(d)?d:d[0],d=ea(d)?d:d[1],c=this.l.I(c),f=this.g.I(this.h),g=Je(this.l,this.i);this.c=zj(e,d,this.s,f,this.g.C(),c,g,this.j,b,this.o,this.u);this.state=2}Ce(this)};
hm.prototype.load=function(){if(0==this.state){this.state=1;Ce(this);var b=0;this.Sa=[];this.b.forEach(function(c){var d=c.N();if(0==d||1==d){b++;var e;e=Q(c,"change",function(){var d=c.N();if(2==d||3==d||4==d)N(e),b--,0===b&&(this.Sa.forEach(N),this.Sa=null,this.Uc())},this);this.Sa.push(e)}},this);this.b.forEach(function(b){0==b.N()&&b.load()});0===b&&x.setTimeout(this.Uc.bind(this),0)}};function im(b){gk.call(this,{attributions:b.attributions,cacheSize:b.cacheSize,extent:b.extent,logo:b.logo,opaque:b.opaque,projection:b.projection,state:b.state,tileGrid:b.tileGrid,tileLoadFunction:b.tileLoadFunction?b.tileLoadFunction:jm,tilePixelRatio:b.tilePixelRatio,tileUrlFunction:b.tileUrlFunction,url:b.url,urls:b.urls,wrapX:b.wrapX});this.crossOrigin=void 0!==b.crossOrigin?b.crossOrigin:null;this.tileClass=void 0!==b.tileClass?b.tileClass:Nl;this.b={};this.o={};this.S=b.reprojectionErrorThreshold}
M(im,gk);p=im.prototype;p.Qc=function(){if(ze(this.a))return!0;for(var b in this.b)if(ze(this.b[b]))return!0;return!1};p.Rc=function(b,c){var d=this.bb(b);Ae(this.a,this.a==d?c:{});for(var e in this.b){var f=this.b[e];Ae(f,f==d?c:{})}};p.kb=function(){return 0};p.Mb=function(b){return this.c&&b&&!wc(this.c,b)?!1:im.X.Mb.call(this,b)};p.la=function(b){var c=this.c;return!this.tileGrid||c&&!wc(c,b)?(c=I(b).toString(),c in this.o||(this.o[c]=Se(b)),this.o[c]):this.tileGrid};
p.bb=function(b){var c=this.c;if(!c||wc(c,b))return this.a;b=I(b).toString();b in this.b||(this.b[b]=new ye);return this.b[b]};function km(b,c,d,e,f,g){c=[c,d,e];f=(d=Ye(b,c,g))?b.tileUrlFunction(d,f,g):void 0;f=new b.tileClass(c,void 0!==f?0:4,void 0!==f?f:"",b.crossOrigin,b.tileLoadFunction);f.key="";Q(f,"change",b.D,b);return f}
function Tg(b,c,d,e,f,g){if(b.c&&g&&!wc(b.c,g)){var h=b.bb(g);d=[c,d,e];c=b.lb.apply(b,d);if(we(h,c))return h.get(c);var k=b.c;e=b.la(k);var l=b.la(g),m=Ye(b,d,g);b=new hm(k,e,g,l,d,m,b.mb(f),0,function(b,c,d,e){return lm(this,b,c,d,e,k)}.bind(b),b.S,!1);h.set(c,b);return b}return lm(b,c,d,e,f,g)}
function lm(b,c,d,e,f,g){var h=null,k=b.lb(c,d,e);if(we(b.a,k)){if(h=b.a.get(k),""!=h.key){var l=h;h.a&&""==h.a.key?(h=h.a,2==l.N()&&(h.a=l)):(h=km(b,c,d,e,f,g),2==l.N()?h.a=l:l.a&&2==l.a.N()&&(h.a=l.a,l.a=null));h.a&&(h.a.a=null);b.a.replace(k,h)}}else h=km(b,c,d,e,f,g),b.a.set(k,h);return h}function jm(b,c){b.T().src=c};function mm(b){var c=void 0!==b.projection?b.projection:"EPSG:3857",d;if(void 0!==b.tileGrid)d=b.tileGrid;else{d={extent:Te(c),maxZoom:b.maxZoom,minZoom:b.minZoom,tileSize:b.tileSize};var e={};Wa(e,void 0!==d?d:{});void 0===e.extent&&(e.extent=lc("EPSG:3857").C());e.resolutions=Ue(e.extent,e.maxZoom,e.tileSize);delete e.maxZoom;d=new Fe(e)}im.call(this,{attributions:b.attributions,cacheSize:b.cacheSize,crossOrigin:b.crossOrigin,logo:b.logo,opaque:b.opaque,projection:c,reprojectionErrorThreshold:b.reprojectionErrorThreshold,
tileGrid:d,tileLoadFunction:b.tileLoadFunction,tilePixelRatio:b.tilePixelRatio,tileUrlFunction:b.tileUrlFunction,url:b.url,urls:b.urls,wrapX:void 0!==b.wrapX?b.wrapX:!0})}M(mm,im);function nm(b){b=b||{};var c;void 0!==b.attributions?c=b.attributions:c=[om];mm.call(this,{attributions:c,cacheSize:b.cacheSize,crossOrigin:void 0!==b.crossOrigin?b.crossOrigin:"anonymous",opaque:void 0!==b.opaque?b.opaque:!0,maxZoom:void 0!==b.maxZoom?b.maxZoom:19,reprojectionErrorThreshold:b.reprojectionErrorThreshold,tileLoadFunction:b.tileLoadFunction,url:void 0!==b.url?b.url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",wrapX:b.wrapX})}M(nm,mm);var om=new jd({html:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'});function pm(b){b=b||{};var c=qm[b.layer];this.u=b.layer;mm.call(this,{attributions:c.attributions,cacheSize:b.cacheSize,crossOrigin:"anonymous",logo:"https://developer.mapquest.com/content/osm/mq_logo.png",maxZoom:c.maxZoom,reprojectionErrorThreshold:b.reprojectionErrorThreshold,opaque:c.opaque,tileLoadFunction:b.tileLoadFunction,url:void 0!==b.url?b.url:"https://otile{1-4}-s.mqcdn.com/tiles/1.0.0/"+this.u+"/{z}/{x}/{y}.jpg"})}M(pm,mm);
var rm=new jd({html:'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a>'}),qm={osm:{maxZoom:19,opaque:!0,attributions:[rm,om]},sat:{maxZoom:18,opaque:!0,attributions:[rm,new jd({html:"Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency"})]},hyb:{maxZoom:18,opaque:!1,attributions:[rm,om]}};function sm(b){b=b||{};im.call(this,{attributions:b.attributions,cacheSize:b.cacheSize,crossOrigin:b.crossOrigin,logo:b.logo,projection:b.projection,reprojectionErrorThreshold:b.reprojectionErrorThreshold,tileGrid:b.tileGrid,tileLoadFunction:b.tileLoadFunction,url:b.url,urls:b.urls,wrapX:void 0!==b.wrapX?b.wrapX:!0});this.P=b.params||{};this.u=Jb()}M(sm,im);sm.prototype.mb=function(b){return b};
sm.prototype.g=function(b,c,d){var e=this.tileGrid;e||(e=this.la(d));if(!(e.Nb().length<=b[0])){var f=Je(e,b,this.u),g=tb(Pe(e,b[0]),this.h);1!=c&&(g=sb(g,c,this.h));e={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};Wa(e,this.P);var h;var k=this.urls;if(k){d=d.qa.split(":").pop();e.SIZE=g[0]+","+g[1];e.BBOX=f.join(",");e.BBOXSR=d;e.IMAGESR=d;e.DPI=Math.round(e.DPI?e.DPI*c:90*c);b=[(1==k.length?k[0]:k[Ea((b[1]<<b[0])+b[2],k.length)]).replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,
"ImageServer/exportImage")];for(h in e)Kl(h,e[h],b);b[1]&&(h=b[0],c=h.indexOf("#"),0<=c&&(b.push(h.substr(c)),b[0]=h=h.substr(0,c)),c=h.indexOf("?"),0>c?b[1]="?":c==h.length-1&&(b[1]=void 0));h=b.join("")}else h=void 0;return h}};F("ol.format.GeoJSON",Hl,OPENLAYERS);Hl.prototype.readFeatures=Hl.prototype.b;Hl.prototype.readFeature=Hl.prototype.g;F("ol.format.EsriJSON",Bl,OPENLAYERS);Bl.prototype.readFeatures=Bl.prototype.b;Bl.prototype.readFeature=Bl.prototype.g;F("ol.style.Style",Fi,OPENLAYERS);F("ol.style.Circle",Ei,OPENLAYERS);F("ol.style.Fill",yi,OPENLAYERS);F("ol.style.Stroke",Di,OPENLAYERS);F("ol.style.Icon",Vg,OPENLAYERS);F("ol.View",V,OPENLAYERS);V.prototype.on=V.prototype.ba;V.prototype.getZoom=V.prototype.wd;
V.prototype.setZoom=V.prototype.Ee;V.prototype.getCenter=V.prototype.ia;V.prototype.setCenter=V.prototype.oa;V.prototype.calculateExtent=V.prototype.jc;V.prototype.getProjection=V.prototype.le;V.prototype.fit=V.prototype.nd;F("ol.control.defaults",ef,OPENLAYERS);F("ol.layer.Tile",X,OPENLAYERS);X.prototype.getVisible=X.prototype.cb;X.prototype.setVisible=X.prototype.Gc;X.prototype.getZIndex=X.prototype.Vb;X.prototype.setZIndex=X.prototype.Hc;X.prototype.getOpacity=X.prototype.Ub;
X.prototype.setOpacity=X.prototype.Fc;X.prototype.getSource=X.prototype.V;X.prototype.setSource=X.prototype.Zb;F("ol.layer.Vector",Y,OPENLAYERS);Y.prototype.getVisible=Y.prototype.cb;Y.prototype.setVisible=Y.prototype.Gc;Y.prototype.getSource=Y.prototype.V;Y.prototype.setStyle=Y.prototype.s;Y.prototype.getZIndex=Y.prototype.Vb;Y.prototype.setZIndex=Y.prototype.Hc;Y.prototype.getOpacity=Y.prototype.Ub;Y.prototype.setOpacity=Y.prototype.Fc;Y.prototype.getSource=Y.prototype.V;Y.prototype.setSource=Y.prototype.Zb;
F("ol.source.OSM",nm,OPENLAYERS);nm.prototype.refresh=nm.prototype.wa;F("ol.source.MapQuest",pm,OPENLAYERS);pm.prototype.refresh=pm.prototype.wa;F("ol.source.XYZ",mm,OPENLAYERS);mm.prototype.refresh=mm.prototype.wa;mm.prototype.setUrl=mm.prototype.s;mm.prototype.refresh=mm.prototype.wa;F("ol.Map",Z,OPENLAYERS);Z.prototype.on=Z.prototype.ba;Z.prototype.getTarget=Z.prototype.Tb;Z.prototype.getTargetElement=Z.prototype.Na;Z.prototype.getView=Z.prototype.O;Z.prototype.addOverlay=Z.prototype.ld;
Z.prototype.addLayer=Z.prototype.kd;Z.prototype.removeLayer=Z.prototype.Ae;Z.prototype.getEventPixel=Z.prototype.vc;Z.prototype.hasFeatureAtPixel=Z.prototype.Td;Z.prototype.getSize=Z.prototype.Pa;Z.prototype.updateSize=Z.prototype.vb;Z.prototype.forEachFeatureAtPixel=Z.prototype.pd;Z.prototype.addInteraction=Z.prototype.jd;Z.prototype.removeInteraction=Z.prototype.ze;Z.prototype.beforeRender=Z.prototype.fa;Z.prototype.addControl=Z.prototype.hd;F("ol.source.Vector",Rj,OPENLAYERS);
Rj.prototype.getFeatures=Rj.prototype.pe;Rj.prototype.getExtent=Rj.prototype.C;Rj.prototype.refresh=Rj.prototype.wa;Rj.prototype.addFeatures=Rj.prototype.Db;Rj.prototype.addFeature=Rj.prototype.Cb;Rj.prototype.clear=Rj.prototype.clear;Rj.prototype.forEachFeature=Rj.prototype.od;Rj.prototype.refresh=Rj.prototype.wa;F("ol.source.TileArcGISRest",sm,OPENLAYERS);sm.prototype.refresh=sm.prototype.wa;F("ol.Overlay",nl,OPENLAYERS);nl.prototype.setPosition=nl.prototype.Ec;F("ol.Feature",Dj,OPENLAYERS);
Dj.prototype.getProperties=Dj.prototype.za;Dj.prototype.setProperties=Dj.prototype.l;Dj.prototype.getGeometry=Dj.prototype.M;F("ol.geom.Point",Mc,OPENLAYERS);Mc.prototype.transform=Mc.prototype.o;Mc.prototype.getCoordinates=Mc.prototype.ra;Mc.prototype.getExtent=Mc.prototype.C;F("ol.geom.Polygon",Tc,OPENLAYERS);Tc.prototype.getCoordinates=Tc.prototype.ra;Tc.prototype.getExtent=Tc.prototype.C;Tc.prototype.transform=Tc.prototype.o;F("ol.geom.LineString",xl,OPENLAYERS);xl.prototype.getCoordinates=xl.prototype.ra;
xl.prototype.getExtent=xl.prototype.C;xl.prototype.transform=xl.prototype.o;F("ol.proj.Projection",ic,OPENLAYERS);ic.prototype.getCode=ic.prototype.l;F("ol.interaction.Draw",Ql,OPENLAYERS);Ql.prototype.on=Ql.prototype.ba;F("ol.animation.pan",cd,OPENLAYERS);F("ol.control.FullScreen",kf,OPENLAYERS);
  return OPENLAYERS.ol;
}));


},{}],319:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ol = require('./ol-build');

exports.default = ol;

},{"./ol-build":318}],320:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.undefinedOrNull = undefinedOrNull;
exports.definedAndNotNull = definedAndNotNull;

var _provide = require('./provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nm = (0, _provide2.default)('util.checkDefined');

/**
 * check if the input is undefined or null
 * @param {*} input - input pointer
 * @returns {boolean} true undefined or null
 */
/**
 * Created by gavorhes on 12/11/2015.
 */
function undefinedOrNull(input) {
    "use strict";

    return typeof input === 'undefined' || input === null;
}

nm.undefinedOrNull = undefinedOrNull;

/**
 * check if the input is defined and not null
 * @param {*} input - input pointer
 * @returns {boolean} true defined and not null
 */
function definedAndNotNull(input) {
    "use strict";

    return !undefinedOrNull(input);
}

nm.definedAndNotNull = definedAndNotNull;

},{"./provide":323}],321:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rgb2hex = rgb2hex;
exports.hexAlphaToRgbOrRgba = hexAlphaToRgbOrRgba;
exports.rgbToRgba = rgbToRgba;
exports.makeBlueGreenRedGradient = makeBlueGreenRedGradient;
exports.makeBlueGreenRedGradientZScore = makeBlueGreenRedGradientZScore;

var _provide = require('./provide');

var _provide2 = _interopRequireDefault(_provide);

var _checkDefined = require('./checkDefined');

var chk = _interopRequireWildcard(_checkDefined);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by gavorhes on 11/3/2015.
 */

var nm = (0, _provide2.default)('util.colors');

/**
 * helper function to convert to hex
 * @param {number|string} x - the number to convert to hex
 * @returns {string} number as hex
 * @private
 */
function _hex(x) {
    var hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

/**
 * converts an RGB string to hex
 * @param {string} rgb - rgb color
 * @returns {string} rbg as hex
 */
function rgb2hex(rgb) {
    var rgb1 = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    return ("#" + _hex(rgb1[1]) + _hex(rgb1[2]) + _hex(rgb1[3])).toUpperCase();
}

nm.rgb2hex = rgb2hex;

/**
 * Convert hex string to RGB or RGBA string
 * @param {string} hexString - hex color string
 * @param {number} [alphaVal=undefined] Alpha value
 * @returns {string} - rgb or rgba color
 */
function hexAlphaToRgbOrRgba(hexString, alphaVal) {
    hexString = hexString.charAt(0) == "#" ? hexString.substring(1, 7) : hexString;
    var r = parseInt(hexString.substring(0, 2), 16).toString() || '0';
    var g = parseInt(hexString.substring(2, 4), 16).toString() || '0';
    var b = parseInt(hexString.substring(4, 6), 16).toString() || '0';
    if (alphaVal) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + alphaVal + ')';
    } else {
        return 'rgba(' + r + ',' + g + ',' + b + ')';
    }
}

nm.hexAlphaToRgbOrRgba = hexAlphaToRgbOrRgba;

/**
 * adds alpha value to rgb string 'rgb(r, b, g)', returns 'rgba(r, g, b, a)'
 * @param {string} rgb - rgb color
 * @param {number} alpha - alpha value 0 to 1
 * @returns {string} rgba color
 */
function rgbToRgba(rgb, alpha) {
    var pieces = rgb.split(',');
    pieces[0] = pieces[0].replace('rgb', 'rgba');
    pieces[2] = pieces[2].replace(')', '');
    pieces.push(' ' + alpha.toFixed(1) + ')');

    return pieces.join(',');
}

nm.rgbToRgba = rgbToRgba;

/**
 * @typedef {function} colorLookupByNumber
 * @param {number} num - the number to use to retrieve the color
 * @returns {string} rgb color
 */

/**
 * Make a blue green red gradient
 * @param {number} minVal - minimum value
 * @param {number} maxVal - maximum value
 * @param {boolean} flipColors - if the colors should be flipped
 * @returns {colorLookupByNumber} color lookup function
 */
function makeBlueGreenRedGradient(minVal, maxVal, flipColors) {

    if (typeof flipColors != "boolean") {
        flipColors = false;
    }

    return function (theVal) {
        var r = void 0,
            g = void 0,
            b = void 0;
        var ratio = void 0;

        if (chk.undefinedOrNull(theVal)) {
            return 'rgb(100,100,100)';
        }

        var percent = (theVal - minVal) / (maxVal - minVal);

        if (flipColors == true) {
            percent = 1 - percent;
        }

        if (percent >= 1) {
            r = 255;
            g = 0;
            b = 0;
        } else if (percent <= 0) {
            r = 0;
            g = 0;
            b = 255;
        } else if (percent < .25) {
            // green up, blue constant
            r = 0;
            g = Math.floor(255 * percent / 0.25);
            b = 255;
        } else if (percent < 0.50) {
            //blue down, green constant
            ratio = (percent - 0.25) / 0.25;
            r = 0;
            g = 255;
            b = 255 - Math.floor(255 * ratio);
        } else if (percent < 0.75) {
            // red up, green constant
            ratio = (percent - 0.5) / 0.25;
            r = Math.floor(255 * ratio);
            g = 255;
            b = 0;
        } else {
            // green down, red constant
            ratio = (percent - 0.75) / 0.25;
            r = 255;
            g = 255 - Math.floor(255 * ratio);
            b = 0;
        }

        r = r.toFixed();
        g = g.toFixed();
        b = b.toFixed();

        return 'rgb(' + r + ',' + g + ',' + b + ')';
    };
}

nm.makeBlueGreenRedGradient = makeBlueGreenRedGradient;

/**
 * Create a function that will return colors based on a gradient
 * @param {number} median - median value
 * @param {number} stdDev - standard deviation
 * @param {boolean} flipColors - if the colors should be flipped
 * @returns {colorLookupByNumber} color lookup function
 */
function makeBlueGreenRedGradientZScore(median, stdDev, flipColors) {

    var grd = makeBlueGreenRedGradient(-2.5, 2.5, flipColors);

    return function (theVal) {

        var zScore = void 0;
        if (theVal == null) {
            zScore = null;
        } else {
            zScore = (theVal - median) / stdDev;
        }

        return grd(zScore);
    };
}

nm.makeBlueGreenRedGradientZScore = makeBlueGreenRedGradientZScore;

},{"./checkDefined":320,"./provide":323}],322:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _provide = require('./provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nm = (0, _provide2.default)('util');

/**
 * guids are used to uniquely identify groups and features
 * @returns {string} a new guid
 */
/**
 * Created by gavorhes on 11/3/2015.
 */

function makeGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}
nm.makeGuid = makeGuid;
exports.default = makeGuid;

},{"./provide":323}],323:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by gavorhes on 12/10/2015.
 */

/**
 * create a namespace on the gv object
 * @param {string} namespace to create
 * @returns {object} object representing the namespace
 */
function provide(namespace) {
    "use strict";

    if (typeof window.gv == 'undefined') {
        window.gv = {};
    }

    var parts = namespace.split('.');
    var nameSpace = window.gv;

    for (var i = 0; i < parts.length; i++) {
        var newObject = nameSpace[parts[i]];

        if (typeof newObject == 'undefined') {
            nameSpace[parts[i]] = {};
        }

        nameSpace = nameSpace[parts[i]];
    }

    return nameSpace;
}

provide('util');
window.gv.util.provide = provide;

exports.default = provide;

},{}],324:[function(require,module,exports){
'use strict';

require('babel-polyfill');

var _quickMap = require('../src/olHelpers/quickMap');

var _quickMap2 = _interopRequireDefault(_quickMap);

var _ItsLayerCollection = require('../src/collections/ItsLayerCollection');

var _ItsLayerCollection2 = _interopRequireDefault(_ItsLayerCollection);

var _LayerLegend = require('../src/collections/LayerLegend');

var _LayerLegend2 = _interopRequireDefault(_LayerLegend);

var _LayerItsInventory = require('../src/layers/LayerItsInventory');

var _LayerItsInventory2 = _interopRequireDefault(_LayerItsInventory);

var _LayerBaseVectorGeoJson = require('../src/layers/LayerBaseVectorGeoJson');

var _LayerBaseVectorGeoJson2 = _interopRequireDefault(_LayerBaseVectorGeoJson);

var _LayerEsriMapServer = require('../src/layers/LayerEsriMapServer');

var _LayerEsriMapServer2 = _interopRequireDefault(_LayerEsriMapServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = (0, _quickMap2.default)({ fullScreen: true });

//
// let inventLyr = new LayerItsInventory({name: 'Camera', itsType: 'cctv', minZoom: 4, itsIcon: 'cctv.png'});
// map.addLayer(inventLyr.olLayer);
//
// inventLyr.visible = true;
//
// let newLayer = new LayerBaseVectorGeoJson('', {});
//
//
//         let metamanagerSegments = new LayerEsriMapServer(
//             'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer',
//             {
//                 minZoom: 3,
//                 visible: true,
//                 name: 'Metamanager Segments',
//                 opacity: 0.6
//             });
//
// // console.log(metamanagerSegments.visible);
//
// map.addLayer(metamanagerSegments.olLayer);

/**
 * Created by gavorhes on 5/19/2016.
 */

var itsLayerCollection = new _ItsLayerCollection2.default(map);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = itsLayerCollection.layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var l = _step.value;

        console.log(l.visible);
        console.log(l);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

var layerArray = [{
    groupName: 'ITS Inventory Layers',
    collapse: false,
    addCheck: true,
    items: itsLayerCollection.layers
}];

var legend = new _LayerLegend2.default(layerArray, 'legend-container', {});

},{"../src/collections/ItsLayerCollection":300,"../src/collections/LayerLegend":301,"../src/layers/LayerBaseVectorGeoJson":305,"../src/layers/LayerEsriMapServer":306,"../src/layers/LayerItsInventory":307,"../src/olHelpers/quickMap":315,"babel-polyfill":1}]},{},[324])


//# sourceMappingURL=legend-test.js.map
