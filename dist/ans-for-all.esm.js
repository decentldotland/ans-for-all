import { createElement, Fragment, createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var connector = {
	login: "ANS login",
	logout: "Logout",
	swal: {
		title: "Install ArConnect to continue",
		text: "This Dapp uses ArConnect to make it easier to broadcast Arweave transactions",
		footer: "Download ArConnect here"
	}
};

var Default_Badge = function Default_Badge() {
  //will replace later
  var connector$1 = connector;

  var _useAns = useAns(),
      walletConnected = _useAns.walletConnected,
      address = _useAns.address,
      ansData = _useAns.ansData,
      shortenAddress = _useAns.shortenAddress,
      arconnectConnect = _useAns.arconnectConnect,
      arconnectDisconnect = _useAns.arconnectDisconnect;

  return /*#__PURE__*/createElement(Fragment, null, walletConnected && /*#__PURE__*/createElement(Fragment, null, /*#__PURE__*/createElement("div", {
    className: "btn btn-outline btn-secondary btn-sm md:btn-md text-sm md:text-base normal-case",
    onClick: arconnectDisconnect
  }, /*#__PURE__*/createElement("span", null, ansData != null && ansData.currentLabel ? (ansData == null ? void 0 : ansData.currentLabel) + ".ar" : shortenAddress(address)), (ansData == null ? void 0 : ansData.avatar) === "" ? /*#__PURE__*/createElement("div", {
    className: "mx-auto rounded-full h-6 w-6 ml-2 btn-secondary border-[1px]",
    style: {
      backgroundColor: ansData == null ? void 0 : ansData.address_color
    }
  }) : /*#__PURE__*/createElement("div", {
    className: "mx-auto rounded-full h-6 w-6 overflow-hidden ml-2 btn-secondary border-[1px]",
    style: {
      backgroundColor: ansData == null ? void 0 : ansData.address_color
    }
  }, /*#__PURE__*/createElement("img", {
    src: "https://arweave.net/" + (ansData == null ? void 0 : ansData.avatar),
    alt: "Profile",
    width: "100%",
    height: "100%"
  })))) || /*#__PURE__*/createElement("div", {
    className: "btn btn-primary btn-sm md:btn-md text-sm md:text-base",
    onClick: arconnectConnect
  }, /*#__PURE__*/createElement("img", {
    className: "w-3.5 h-3.5 mr-3.5 md:w-4 md:h-4 md:mr-4",
    src: "https://nanofuxion.ar.page/favicon.png"
  }), " ", connector$1.login));
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/*\n! tailwindcss v3.0.24 | MIT License | https://tailwindcss.com\n*//*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n*/\n\nhtml {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4; /* 3 */\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 4 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/*\nEnsure the default browser behavior of the `hidden` attribute.\n*/\n\n[hidden] {\n  display: none;\n}\n\n:root,\n[data-theme] {\n  background-color: hsla(var(--b1) / var(--tw-bg-opacity, 1));\n  color: hsla(var(--bc) / var(--tw-text-opacity, 1));\n}\n\nhtml {\n  -webkit-tap-highlight-color: transparent;\n}\n\n:root {\n  --p: 259 94% 51%;\n  --pf: 259 94% 41%;\n  --sf: 314 100% 38%;\n  --af: 174 60% 41%;\n  --nf: 219 14% 22%;\n  --in: 198 93% 60%;\n  --su: 158 64% 52%;\n  --wa: 43 96% 56%;\n  --er: 0 91% 71%;\n  --inc: 198 100% 12%;\n  --suc: 158 100% 10%;\n  --wac: 43 100% 11%;\n  --erc: 0 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --pc: 0 0% 100%;\n  --s: 314 100% 47%;\n  --sc: 0 0% 100%;\n  --a: 174 60% 51%;\n  --ac: 175 44% 15%;\n  --n: 219 14% 28%;\n  --nc: 0 0% 100%;\n  --b1: 0 0% 100%;\n  --b2: 0 0% 95%;\n  --b3: 180 2% 90%;\n  --bc: 215 28% 17%;\n}\n\n@media (prefers-color-scheme: dark) {\n\n  :root {\n    --p: 262 80% 50%;\n    --pf: 262 80% 40%;\n    --sf: 316 70% 40%;\n    --af: 175 70% 33%;\n    --in: 198 93% 60%;\n    --su: 158 64% 52%;\n    --wa: 43 96% 56%;\n    --er: 0 91% 71%;\n    --inc: 198 100% 12%;\n    --suc: 158 100% 10%;\n    --wac: 43 100% 11%;\n    --erc: 0 100% 14%;\n    --rounded-box: 1rem;\n    --rounded-btn: 0.5rem;\n    --rounded-badge: 1.9rem;\n    --animation-btn: 0.25s;\n    --animation-input: .2s;\n    --btn-text-case: uppercase;\n    --btn-focus-scale: 0.95;\n    --border-btn: 1px;\n    --tab-border: 1px;\n    --tab-radius: 0.5rem;\n    --pc: 0 0% 100%;\n    --s: 316 70% 50%;\n    --sc: 0 0% 100%;\n    --a: 175 70% 41%;\n    --ac: 0 0% 100%;\n    --n: 218 18% 12%;\n    --nf: 223 17% 8%;\n    --nc: 220 13% 69%;\n    --b1: 220 18% 20%;\n    --b2: 220 17% 17%;\n    --b3: 219 18% 15%;\n    --bc: 220 13% 69%;\n  }\n}\n\n[data-theme=light] {\n  --p: 259 94% 51%;\n  --pf: 259 94% 41%;\n  --sf: 314 100% 38%;\n  --af: 174 60% 41%;\n  --nf: 219 14% 22%;\n  --in: 198 93% 60%;\n  --su: 158 64% 52%;\n  --wa: 43 96% 56%;\n  --er: 0 91% 71%;\n  --inc: 198 100% 12%;\n  --suc: 158 100% 10%;\n  --wac: 43 100% 11%;\n  --erc: 0 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --pc: 0 0% 100%;\n  --s: 314 100% 47%;\n  --sc: 0 0% 100%;\n  --a: 174 60% 51%;\n  --ac: 175 44% 15%;\n  --n: 219 14% 28%;\n  --nc: 0 0% 100%;\n  --b1: 0 0% 100%;\n  --b2: 0 0% 95%;\n  --b3: 180 2% 90%;\n  --bc: 215 28% 17%;\n}\n\n[data-theme=dark] {\n  --p: 262 80% 50%;\n  --pf: 262 80% 40%;\n  --sf: 316 70% 40%;\n  --af: 175 70% 33%;\n  --in: 198 93% 60%;\n  --su: 158 64% 52%;\n  --wa: 43 96% 56%;\n  --er: 0 91% 71%;\n  --inc: 198 100% 12%;\n  --suc: 158 100% 10%;\n  --wac: 43 100% 11%;\n  --erc: 0 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --pc: 0 0% 100%;\n  --s: 316 70% 50%;\n  --sc: 0 0% 100%;\n  --a: 175 70% 41%;\n  --ac: 0 0% 100%;\n  --n: 218 18% 12%;\n  --nf: 223 17% 8%;\n  --nc: 220 13% 69%;\n  --b1: 220 18% 20%;\n  --b2: 220 17% 17%;\n  --b3: 219 18% 15%;\n  --bc: 220 13% 69%;\n}\n\n[data-theme=cupcake] {\n  --p: 183 47% 59%;\n  --pf: 183 47% 47%;\n  --sf: 338 71% 62%;\n  --af: 39 84% 46%;\n  --nf: 280 46% 11%;\n  --in: 198 93% 60%;\n  --su: 158 64% 52%;\n  --wa: 43 96% 56%;\n  --er: 0 91% 71%;\n  --pc: 183 100% 12%;\n  --sc: 338 100% 16%;\n  --ac: 39 100% 12%;\n  --nc: 280 83% 83%;\n  --inc: 198 100% 12%;\n  --suc: 158 100% 10%;\n  --wac: 43 100% 11%;\n  --erc: 0 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --s: 338 71% 78%;\n  --a: 39 84% 58%;\n  --n: 280 46% 14%;\n  --b1: 24 33% 97%;\n  --b2: 27 22% 92%;\n  --b3: 22 14% 89%;\n  --bc: 280 46% 14%;\n  --rounded-btn: 1.9rem;\n  --tab-border: 2px;\n  --tab-radius: .5rem;\n}\n\n[data-theme=bumblebee] {\n  --p: 41 74% 53%;\n  --pf: 41 74% 42%;\n  --sf: 50 94% 46%;\n  --af: 240 33% 11%;\n  --nf: 240 33% 11%;\n  --b2: 0 0% 90%;\n  --b3: 0 0% 81%;\n  --in: 198 93% 60%;\n  --su: 158 64% 52%;\n  --wa: 43 96% 56%;\n  --er: 0 91% 71%;\n  --bc: 0 0% 20%;\n  --ac: 240 60% 83%;\n  --nc: 240 60% 83%;\n  --inc: 198 100% 12%;\n  --suc: 158 100% 10%;\n  --wac: 43 100% 11%;\n  --erc: 0 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --pc: 240 33% 14%;\n  --s: 50 94% 58%;\n  --sc: 240 33% 14%;\n  --a: 240 33% 14%;\n  --n: 240 33% 14%;\n  --b1: 0 0% 100%;\n}\n\n[data-theme=emerald] {\n  --p: 141 50% 60%;\n  --pf: 141 50% 48%;\n  --sf: 219 96% 48%;\n  --af: 10 81% 45%;\n  --nf: 219 20% 20%;\n  --b2: 0 0% 90%;\n  --b3: 0 0% 81%;\n  --in: 198 93% 60%;\n  --su: 158 64% 52%;\n  --wa: 43 96% 56%;\n  --er: 0 91% 71%;\n  --inc: 198 100% 12%;\n  --suc: 158 100% 10%;\n  --wac: 43 100% 11%;\n  --erc: 0 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --btn-text-case: uppercase;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --pc: 151 28% 19%;\n  --s: 219 96% 60%;\n  --sc: 210 20% 98%;\n  --a: 10 81% 56%;\n  --ac: 210 20% 98%;\n  --n: 219 20% 25%;\n  --nc: 210 20% 98%;\n  --b1: 0 0% 100%;\n  --bc: 219 20% 25%;\n  --animation-btn: 0;\n  --animation-input: 0;\n  --btn-focus-scale: 1;\n}\n\n[data-theme=corporate] {\n  --p: 229 96% 64%;\n  --pf: 229 96% 51%;\n  --sf: 215 26% 47%;\n  --af: 154 49% 48%;\n  --nf: 233 27% 10%;\n  --b2: 0 0% 90%;\n  --b3: 0 0% 81%;\n  --in: 198 93% 60%;\n  --su: 158 64% 52%;\n  --wa: 43 96% 56%;\n  --er: 0 91% 71%;\n  --pc: 229 100% 93%;\n  --sc: 215 100% 12%;\n  --ac: 154 100% 12%;\n  --inc: 198 100% 12%;\n  --suc: 158 100% 10%;\n  --wac: 43 100% 11%;\n  --erc: 0 100% 14%;\n  --btn-text-case: uppercase;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 215 26% 59%;\n  --a: 154 49% 60%;\n  --n: 233 27% 13%;\n  --nc: 210 38% 95%;\n  --b1: 0 0% 100%;\n  --bc: 233 27% 13%;\n  --rounded-box: 0.25rem;\n  --rounded-btn: .125rem;\n  --rounded-badge: .125rem;\n  --animation-btn: 0;\n  --animation-input: 0;\n  --btn-focus-scale: 1;\n}\n\n[data-theme=synthwave] {\n  --p: 321 70% 69%;\n  --pf: 321 70% 55%;\n  --sf: 197 87% 52%;\n  --af: 48 89% 46%;\n  --nf: 253 61% 15%;\n  --b2: 254 59% 23%;\n  --b3: 254 59% 21%;\n  --pc: 321 100% 14%;\n  --sc: 197 100% 13%;\n  --ac: 48 100% 11%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 197 87% 65%;\n  --a: 48 89% 57%;\n  --n: 253 61% 19%;\n  --nc: 260 60% 98%;\n  --b1: 254 59% 26%;\n  --bc: 260 60% 98%;\n  --in: 199 87% 64%;\n  --inc: 257 63% 17%;\n  --su: 168 74% 68%;\n  --suc: 257 63% 17%;\n  --wa: 48 89% 57%;\n  --wac: 257 63% 17%;\n  --er: 352 74% 57%;\n  --erc: 260 60% 98%;\n}\n\n[data-theme=retro] {\n  --p: 3 74% 76%;\n  --pf: 3 74% 61%;\n  --sf: 145 27% 58%;\n  --af: 49 67% 61%;\n  --nf: 42 17% 34%;\n  --inc: 221 100% 91%;\n  --suc: 142 100% 87%;\n  --wac: 32 100% 9%;\n  --erc: 0 100% 90%;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --pc: 345 5% 15%;\n  --s: 145 27% 72%;\n  --sc: 345 5% 15%;\n  --a: 49 67% 76%;\n  --ac: 345 5% 15%;\n  --n: 42 17% 42%;\n  --nc: 45 47% 80%;\n  --b1: 45 47% 80%;\n  --b2: 45 37% 72%;\n  --b3: 42 36% 65%;\n  --bc: 345 5% 15%;\n  --in: 221 83% 53%;\n  --su: 142 76% 36%;\n  --wa: 32 95% 44%;\n  --er: 0 72% 51%;\n  --rounded-box: 0.4rem;\n  --rounded-btn: 0.4rem;\n  --rounded-badge: 0.4rem;\n}\n\n[data-theme=cyberpunk] {\n  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;\n  --pf: 345 100% 58%;\n  --sf: 195 80% 56%;\n  --af: 276 74% 57%;\n  --nf: 57 100% 10%;\n  --b2: 56 100% 45%;\n  --b3: 56 100% 41%;\n  --in: 198 93% 60%;\n  --su: 158 64% 52%;\n  --wa: 43 96% 56%;\n  --er: 0 91% 71%;\n  --bc: 56 100% 10%;\n  --pc: 345 100% 15%;\n  --sc: 195 100% 14%;\n  --ac: 276 100% 14%;\n  --inc: 198 100% 12%;\n  --suc: 158 100% 10%;\n  --wac: 43 100% 11%;\n  --erc: 0 100% 14%;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --p: 345 100% 73%;\n  --s: 195 80% 70%;\n  --a: 276 74% 71%;\n  --n: 57 100% 13%;\n  --nc: 56 100% 50%;\n  --b1: 56 100% 50%;\n  --rounded-box: 0;\n  --rounded-btn: 0;\n  --rounded-badge: 0;\n  --tab-radius: 0;\n}\n\n[data-theme=valentine] {\n  --p: 353 74% 67%;\n  --pf: 353 74% 54%;\n  --sf: 254 86% 61%;\n  --af: 181 56% 56%;\n  --nf: 336 43% 38%;\n  --b2: 318 46% 80%;\n  --b3: 318 46% 72%;\n  --pc: 353 100% 13%;\n  --sc: 254 100% 15%;\n  --ac: 181 100% 14%;\n  --inc: 221 100% 91%;\n  --suc: 142 100% 87%;\n  --wac: 32 100% 9%;\n  --erc: 0 100% 90%;\n  --rounded-box: 1rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 254 86% 77%;\n  --a: 181 56% 70%;\n  --n: 336 43% 48%;\n  --nc: 318 46% 89%;\n  --b1: 318 46% 89%;\n  --bc: 344 38% 28%;\n  --in: 221 83% 53%;\n  --su: 142 76% 36%;\n  --wa: 32 95% 44%;\n  --er: 0 72% 51%;\n  --rounded-btn: 1.9rem;\n}\n\n[data-theme=halloween] {\n  --p: 32 89% 52%;\n  --pf: 32 89% 42%;\n  --sf: 271 46% 34%;\n  --af: 91 100% 26%;\n  --nf: 180 4% 9%;\n  --b2: 0 0% 12%;\n  --b3: 0 0% 10%;\n  --bc: 0 0% 83%;\n  --sc: 271 100% 88%;\n  --ac: 91 100% 7%;\n  --nc: 180 5% 82%;\n  --inc: 221 100% 91%;\n  --suc: 142 100% 87%;\n  --wac: 32 100% 9%;\n  --erc: 0 100% 90%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --pc: 180 7% 8%;\n  --s: 271 46% 42%;\n  --a: 91 100% 33%;\n  --n: 180 4% 11%;\n  --b1: 0 0% 13%;\n  --in: 221 83% 53%;\n  --su: 142 76% 36%;\n  --wa: 32 95% 44%;\n  --er: 0 72% 51%;\n}\n\n[data-theme=garden] {\n  --p: 139 16% 43%;\n  --pf: 139 16% 34%;\n  --sf: 97 37% 75%;\n  --af: 0 68% 75%;\n  --nf: 0 4% 28%;\n  --b2: 0 4% 82%;\n  --b3: 0 4% 74%;\n  --in: 198 93% 60%;\n  --su: 158 64% 52%;\n  --wa: 43 96% 56%;\n  --er: 0 91% 71%;\n  --pc: 139 100% 89%;\n  --inc: 198 100% 12%;\n  --suc: 158 100% 10%;\n  --wac: 43 100% 11%;\n  --erc: 0 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 97 37% 93%;\n  --sc: 96 32% 15%;\n  --a: 0 68% 94%;\n  --ac: 0 22% 16%;\n  --n: 0 4% 35%;\n  --nc: 0 4% 91%;\n  --b1: 0 4% 91%;\n  --bc: 0 3% 6%;\n}\n\n[data-theme=forest] {\n  --p: 141 72% 42%;\n  --pf: 141 72% 34%;\n  --sf: 141 75% 38%;\n  --af: 35 69% 42%;\n  --nf: 0 10% 5%;\n  --b2: 0 12% 7%;\n  --b3: 0 12% 7%;\n  --in: 198 93% 60%;\n  --su: 158 64% 52%;\n  --wa: 43 96% 56%;\n  --er: 0 91% 71%;\n  --bc: 0 12% 82%;\n  --pc: 141 100% 8%;\n  --sc: 141 100% 10%;\n  --ac: 35 100% 10%;\n  --nc: 0 7% 81%;\n  --inc: 198 100% 12%;\n  --suc: 158 100% 10%;\n  --wac: 43 100% 11%;\n  --erc: 0 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 141 75% 48%;\n  --a: 35 69% 52%;\n  --n: 0 10% 6%;\n  --b1: 0 12% 8%;\n  --rounded-btn: 1.9rem;\n}\n\n[data-theme=aqua] {\n  --p: 182 93% 49%;\n  --pf: 182 93% 40%;\n  --sf: 274 31% 45%;\n  --af: 47 100% 64%;\n  --nf: 205 54% 40%;\n  --b2: 219 53% 39%;\n  --b3: 219 53% 35%;\n  --bc: 219 100% 89%;\n  --sc: 274 100% 91%;\n  --ac: 47 100% 16%;\n  --nc: 205 100% 90%;\n  --inc: 221 100% 91%;\n  --suc: 142 100% 87%;\n  --wac: 32 100% 9%;\n  --erc: 0 100% 90%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --pc: 181 100% 17%;\n  --s: 274 31% 57%;\n  --a: 47 100% 80%;\n  --n: 205 54% 50%;\n  --b1: 219 53% 43%;\n  --in: 221 83% 53%;\n  --su: 142 76% 36%;\n  --wa: 32 95% 44%;\n  --er: 0 72% 51%;\n}\n\n[data-theme=lofi] {\n  --p: 0 0% 5%;\n  --pf: 0 0% 4%;\n  --sf: 0 2% 8%;\n  --af: 0 0% 12%;\n  --nf: 0 0% 0%;\n  --btn-text-case: uppercase;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --pc: 0 0% 100%;\n  --s: 0 2% 10%;\n  --sc: 0 0% 100%;\n  --a: 0 0% 15%;\n  --ac: 0 0% 100%;\n  --n: 0 0% 0%;\n  --nc: 0 0% 100%;\n  --b1: 0 0% 100%;\n  --b2: 0 0% 95%;\n  --b3: 0 2% 90%;\n  --bc: 0 0% 0%;\n  --in: 212 100% 48%;\n  --inc: 0 0% 100%;\n  --su: 137 72% 46%;\n  --suc: 0 0% 100%;\n  --wa: 5 100% 66%;\n  --wac: 0 0% 100%;\n  --er: 325 78% 49%;\n  --erc: 0 0% 100%;\n  --rounded-box: 0.25rem;\n  --rounded-btn: 0.125rem;\n  --rounded-badge: 0.125rem;\n  --animation-btn: 0;\n  --animation-input: 0;\n  --btn-focus-scale: 1;\n  --tab-radius: 0;\n}\n\n[data-theme=pastel] {\n  --p: 284 22% 80%;\n  --pf: 284 22% 64%;\n  --sf: 352 70% 70%;\n  --af: 158 55% 65%;\n  --nf: 199 44% 49%;\n  --in: 198 93% 60%;\n  --su: 158 64% 52%;\n  --wa: 43 96% 56%;\n  --er: 0 91% 71%;\n  --bc: 0 0% 20%;\n  --pc: 284 59% 16%;\n  --sc: 352 100% 18%;\n  --ac: 158 100% 16%;\n  --nc: 199 100% 12%;\n  --inc: 198 100% 12%;\n  --suc: 158 100% 10%;\n  --wac: 43 100% 11%;\n  --erc: 0 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 352 70% 88%;\n  --a: 158 55% 81%;\n  --n: 199 44% 61%;\n  --b1: 0 0% 100%;\n  --b2: 210 20% 98%;\n  --b3: 216 12% 84%;\n  --rounded-btn: 1.9rem;\n}\n\n[data-theme=fantasy] {\n  --p: 296 83% 25%;\n  --pf: 296 83% 20%;\n  --sf: 200 100% 30%;\n  --af: 31 94% 41%;\n  --nf: 215 28% 13%;\n  --b2: 0 0% 90%;\n  --b3: 0 0% 81%;\n  --in: 198 93% 60%;\n  --su: 158 64% 52%;\n  --wa: 43 96% 56%;\n  --er: 0 91% 71%;\n  --pc: 296 100% 85%;\n  --sc: 200 100% 87%;\n  --ac: 31 100% 10%;\n  --nc: 215 62% 83%;\n  --inc: 198 100% 12%;\n  --suc: 158 100% 10%;\n  --wac: 43 100% 11%;\n  --erc: 0 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 200 100% 37%;\n  --a: 31 94% 51%;\n  --n: 215 28% 17%;\n  --b1: 0 0% 100%;\n  --bc: 215 28% 17%;\n}\n\n[data-theme=wireframe] {\n  font-family: Chalkboard,comic sans ms,\"sanssecondaryerif\";\n  --pf: 0 0% 58%;\n  --sf: 0 0% 58%;\n  --af: 0 0% 58%;\n  --nf: 0 0% 74%;\n  --bc: 0 0% 20%;\n  --pc: 0 0% 14%;\n  --sc: 0 0% 14%;\n  --ac: 0 0% 14%;\n  --nc: 0 0% 18%;\n  --inc: 240 100% 90%;\n  --suc: 120 100% 85%;\n  --wac: 60 100% 10%;\n  --erc: 0 100% 90%;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --p: 0 0% 72%;\n  --s: 0 0% 72%;\n  --a: 0 0% 72%;\n  --n: 0 0% 92%;\n  --b1: 0 0% 100%;\n  --b2: 0 0% 93%;\n  --b3: 0 0% 87%;\n  --in: 240 100% 50%;\n  --su: 120 100% 25%;\n  --wa: 60 30% 50%;\n  --er: 0 100% 50%;\n  --rounded-box: 0.2rem;\n  --rounded-btn: 0.2rem;\n  --rounded-badge: 0.2rem;\n  --tab-radius: 0.2rem;\n}\n\n[data-theme=black] {\n  --p: 0 2% 20%;\n  --pf: 0 2% 16%;\n  --sf: 0 2% 16%;\n  --af: 0 2% 16%;\n  --bc: 0 0% 80%;\n  --pc: 0 5% 84%;\n  --sc: 0 5% 84%;\n  --ac: 0 5% 84%;\n  --nc: 0 3% 83%;\n  --inc: 240 100% 90%;\n  --suc: 120 100% 85%;\n  --wac: 60 100% 10%;\n  --erc: 0 100% 90%;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --s: 0 2% 20%;\n  --a: 0 2% 20%;\n  --b1: 0 0% 0%;\n  --b2: 0 0% 5%;\n  --b3: 0 2% 10%;\n  --n: 0 1% 15%;\n  --nf: 0 2% 20%;\n  --in: 240 100% 50%;\n  --su: 120 100% 25%;\n  --wa: 60 100% 50%;\n  --er: 0 100% 50%;\n  --rounded-box: 0;\n  --rounded-btn: 0;\n  --rounded-badge: 0;\n  --animation-btn: 0;\n  --animation-input: 0;\n  --btn-text-case: lowercase;\n  --btn-focus-scale: 1;\n  --tab-radius: 0;\n}\n\n[data-theme=luxury] {\n  --p: 0 0% 100%;\n  --pf: 0 0% 80%;\n  --sf: 218 54% 14%;\n  --af: 319 22% 21%;\n  --nf: 270 4% 7%;\n  --pc: 0 0% 20%;\n  --sc: 218 100% 84%;\n  --ac: 319 85% 85%;\n  --inc: 202 100% 14%;\n  --suc: 89 100% 10%;\n  --wac: 54 100% 13%;\n  --erc: 0 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 218 54% 18%;\n  --a: 319 22% 26%;\n  --n: 270 4% 9%;\n  --nc: 37 67% 58%;\n  --b1: 240 10% 4%;\n  --b2: 270 4% 9%;\n  --b3: 270 2% 18%;\n  --bc: 37 67% 58%;\n  --in: 202 100% 70%;\n  --su: 89 62% 52%;\n  --wa: 54 69% 64%;\n  --er: 0 100% 72%;\n}\n\n[data-theme=dracula] {\n  --p: 326 100% 74%;\n  --pf: 326 100% 59%;\n  --sf: 265 89% 62%;\n  --af: 31 100% 57%;\n  --nf: 230 15% 24%;\n  --b2: 231 15% 17%;\n  --b3: 231 15% 15%;\n  --pc: 326 100% 15%;\n  --sc: 265 100% 16%;\n  --ac: 31 100% 14%;\n  --nc: 230 71% 86%;\n  --inc: 191 100% 15%;\n  --suc: 135 100% 13%;\n  --wac: 65 100% 15%;\n  --erc: 0 100% 93%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 265 89% 78%;\n  --a: 31 100% 71%;\n  --n: 230 15% 30%;\n  --b1: 231 15% 18%;\n  --bc: 60 30% 96%;\n  --in: 191 97% 77%;\n  --su: 135 94% 65%;\n  --wa: 65 92% 76%;\n  --er: 0 100% 67%;\n}\n\n[data-theme=cmyk] {\n  --p: 203 83% 60%;\n  --pf: 203 83% 48%;\n  --sf: 335 78% 48%;\n  --af: 56 100% 48%;\n  --nf: 0 0% 8%;\n  --b2: 0 0% 90%;\n  --b3: 0 0% 81%;\n  --bc: 0 0% 20%;\n  --pc: 203 100% 12%;\n  --sc: 335 100% 92%;\n  --ac: 56 100% 12%;\n  --nc: 0 0% 82%;\n  --inc: 192 100% 10%;\n  --suc: 291 100% 88%;\n  --wac: 25 100% 11%;\n  --erc: 4 100% 91%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 335 78% 60%;\n  --a: 56 100% 60%;\n  --n: 0 0% 10%;\n  --b1: 0 0% 100%;\n  --in: 192 48% 52%;\n  --su: 291 48% 38%;\n  --wa: 25 85% 57%;\n  --er: 4 81% 56%;\n}\n\n[data-theme=autumn] {\n  --p: 344 96% 28%;\n  --pf: 344 96% 22%;\n  --sf: 0 63% 47%;\n  --af: 27 56% 50%;\n  --nf: 22 17% 35%;\n  --b2: 0 0% 85%;\n  --b3: 0 0% 77%;\n  --bc: 0 0% 19%;\n  --pc: 344 100% 86%;\n  --sc: 0 100% 92%;\n  --ac: 27 100% 13%;\n  --nc: 22 100% 89%;\n  --inc: 187 100% 10%;\n  --suc: 165 100% 9%;\n  --wac: 30 100% 10%;\n  --erc: 354 100% 90%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 0 63% 58%;\n  --a: 27 56% 63%;\n  --n: 22 17% 44%;\n  --b1: 0 0% 95%;\n  --in: 187 48% 50%;\n  --su: 165 34% 43%;\n  --wa: 30 84% 50%;\n  --er: 354 79% 49%;\n}\n\n[data-theme=business] {\n  --p: 210 64% 31%;\n  --pf: 210 64% 24%;\n  --sf: 200 13% 44%;\n  --af: 13 80% 48%;\n  --nf: 213 14% 13%;\n  --b2: 0 0% 11%;\n  --b3: 0 0% 10%;\n  --bc: 0 0% 83%;\n  --pc: 210 100% 86%;\n  --sc: 200 100% 11%;\n  --ac: 13 100% 12%;\n  --nc: 213 28% 83%;\n  --inc: 199 100% 88%;\n  --suc: 144 100% 11%;\n  --wac: 39 100% 12%;\n  --erc: 6 100% 89%;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 200 13% 55%;\n  --a: 13 80% 60%;\n  --n: 213 14% 16%;\n  --b1: 0 0% 13%;\n  --in: 199 100% 42%;\n  --su: 144 31% 56%;\n  --wa: 39 64% 60%;\n  --er: 6 56% 43%;\n  --rounded-box: 0.25rem;\n  --rounded-btn: .125rem;\n  --rounded-badge: .125rem;\n}\n\n[data-theme=acid] {\n  --p: 303 100% 50%;\n  --pf: 303 100% 40%;\n  --sf: 27 100% 40%;\n  --af: 72 98% 40%;\n  --nf: 238 43% 14%;\n  --b2: 0 0% 88%;\n  --b3: 0 0% 79%;\n  --bc: 0 0% 20%;\n  --pc: 303 100% 90%;\n  --sc: 27 100% 10%;\n  --ac: 72 100% 10%;\n  --nc: 238 99% 83%;\n  --inc: 210 100% 12%;\n  --suc: 149 100% 12%;\n  --wac: 53 100% 11%;\n  --erc: 1 100% 89%;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 27 100% 50%;\n  --a: 72 98% 50%;\n  --n: 238 43% 17%;\n  --b1: 0 0% 98%;\n  --in: 210 92% 58%;\n  --su: 149 50% 58%;\n  --wa: 53 93% 57%;\n  --er: 1 100% 45%;\n  --rounded-box: 1.25rem;\n  --rounded-btn: 1rem;\n  --rounded-badge: 1rem;\n}\n\n[data-theme=lemonade] {\n  --p: 89 96% 31%;\n  --pf: 89 96% 24%;\n  --sf: 60 81% 44%;\n  --af: 63 80% 71%;\n  --nf: 238 43% 14%;\n  --b2: 0 0% 90%;\n  --b3: 0 0% 81%;\n  --bc: 0 0% 20%;\n  --pc: 89 100% 86%;\n  --sc: 60 100% 11%;\n  --ac: 63 100% 18%;\n  --nc: 238 99% 83%;\n  --inc: 192 79% 17%;\n  --suc: 74 100% 16%;\n  --wac: 50 100% 15%;\n  --erc: 1 100% 17%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 60 81% 55%;\n  --a: 63 80% 88%;\n  --n: 238 43% 17%;\n  --b1: 0 0% 100%;\n  --in: 192 39% 85%;\n  --su: 74 76% 79%;\n  --wa: 50 87% 75%;\n  --er: 1 70% 83%;\n}\n\n[data-theme=night] {\n  --p: 198 93% 60%;\n  --pf: 198 93% 48%;\n  --sf: 234 89% 59%;\n  --af: 329 86% 56%;\n  --b2: 222 47% 10%;\n  --b3: 222 47% 9%;\n  --bc: 222 66% 82%;\n  --pc: 198 100% 12%;\n  --sc: 234 100% 15%;\n  --ac: 329 100% 14%;\n  --nc: 217 76% 83%;\n  --inc: 198 100% 10%;\n  --suc: 172 100% 10%;\n  --wac: 41 100% 13%;\n  --erc: 351 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 234 89% 74%;\n  --a: 329 86% 70%;\n  --n: 217 33% 17%;\n  --nf: 217 30% 22%;\n  --b1: 222 47% 11%;\n  --in: 198 90% 48%;\n  --su: 172 66% 50%;\n  --wa: 41 88% 64%;\n  --er: 351 95% 71%;\n}\n\n[data-theme=coffee] {\n  --p: 30 67% 58%;\n  --pf: 30 67% 46%;\n  --sf: 182 25% 16%;\n  --af: 194 74% 20%;\n  --nf: 300 20% 5%;\n  --b2: 306 19% 10%;\n  --b3: 306 19% 9%;\n  --pc: 30 100% 12%;\n  --sc: 182 67% 84%;\n  --ac: 194 100% 85%;\n  --nc: 300 14% 81%;\n  --inc: 171 100% 13%;\n  --suc: 93 100% 12%;\n  --wac: 43 100% 14%;\n  --erc: 10 100% 15%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 182 25% 20%;\n  --a: 194 74% 25%;\n  --n: 300 20% 6%;\n  --b1: 306 19% 11%;\n  --bc: 37 8% 42%;\n  --in: 171 37% 67%;\n  --su: 93 25% 62%;\n  --wa: 43 100% 69%;\n  --er: 10 95% 75%;\n}\n\n[data-theme=winter] {\n  --p: 212 100% 51%;\n  --pf: 212 100% 41%;\n  --sf: 247 47% 35%;\n  --af: 310 49% 42%;\n  --nf: 217 92% 8%;\n  --pc: 212 100% 90%;\n  --sc: 247 100% 89%;\n  --ac: 310 100% 90%;\n  --nc: 217 100% 82%;\n  --inc: 192 100% 16%;\n  --suc: 182 100% 13%;\n  --wac: 32 100% 17%;\n  --erc: 0 100% 14%;\n  --rounded-box: 1rem;\n  --rounded-btn: 0.5rem;\n  --rounded-badge: 1.9rem;\n  --animation-btn: 0.25s;\n  --animation-input: .2s;\n  --btn-text-case: uppercase;\n  --btn-focus-scale: 0.95;\n  --border-btn: 1px;\n  --tab-border: 1px;\n  --tab-radius: 0.5rem;\n  --s: 247 47% 43%;\n  --a: 310 49% 52%;\n  --n: 217 92% 10%;\n  --b1: 0 0% 100%;\n  --b2: 217 100% 97%;\n  --b3: 219 44% 92%;\n  --bc: 214 30% 32%;\n  --in: 192 93% 78%;\n  --su: 182 47% 66%;\n  --wa: 32 62% 84%;\n  --er: 0 63% 72%;\n}\n\n*, ::before, ::after {\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n.avatar {\n  position: relative;\n  display: inline-flex;\n}\n.avatar > div {\n  display: block;\n  aspect-ratio: 1 / 1;\n  overflow: hidden;\n}\n.avatar img {\n  height: 100%;\n  width: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.avatar.placeholder > div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.btn {\n  display: inline-flex;\n  flex-shrink: 0;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  border-color: transparent;\n  border-color: hsl(var(--n) / var(--tw-border-opacity));\n  text-align: center;\n  transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;\n  transition-duration: 200ms;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  border-radius: var(--rounded-btn, 0.5rem);\n  height: 3rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  line-height: 1em;\n  min-height: 3rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  text-transform: var(--btn-text-case, uppercase);\n  -webkit-text-decoration-line: none;\n          text-decoration-line: none;\n  border-width: var(--border-btn, 1px);\n  -webkit-animation: button-pop var(--animation-btn, 0.25s) ease-out;\n          animation: button-pop var(--animation-btn, 0.25s) ease-out;\n  --tw-border-opacity: 1;\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--n) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--nc) / var(--tw-text-opacity));\n}\n.btn-disabled, .btn[disabled] {\n  pointer-events: none;\n}\n.btn.loading, .btn.loading:hover {\n  pointer-events: none;\n}\n.btn.loading:before {\n  margin-right: 0.5rem;\n  height: 1rem;\n  width: 1rem;\n  border-radius: 9999px;\n  border-width: 2px;\n  -webkit-animation: spin 2s linear infinite;\n          animation: spin 2s linear infinite;\n  content: \"\";\n  border-top-color: transparent;\n  border-left-color: transparent;\n  border-bottom-color: currentColor;\n  border-right-color: currentColor;\n}\n@media (prefers-reduced-motion: reduce) {\n\n  .btn.loading:before {\n    -webkit-animation: spin 10s linear infinite;\n            animation: spin 10s linear infinite;\n  }\n}\n@-webkit-keyframes spin {\n\n  from {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes spin {\n\n  from {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n}\n.btn-group > input[type=\"radio\"].btn {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n.btn-group > input[type=\"radio\"].btn:before {\n  content: attr(data-title);\n}\n.footer {\n  display: grid;\n  width: 100%;\n  grid-auto-flow: row;\n  place-items: start;\n  row-gap: 2.5rem;\n  -moz-column-gap: 1rem;\n       column-gap: 1rem;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n.footer > * {\n  display: grid;\n  place-items: start;\n  gap: 0.5rem;\n}\n@media (min-width: 48rem) {\n\n  .footer {\n    grid-auto-flow: column;\n  }\n\n  .footer-center {\n    grid-auto-flow: row dense;\n  }\n}\n.avatar-group .avatar {\n  overflow: hidden;\n  border-radius: 9999px;\n  border-width: 4px;\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--b1) / var(--tw-border-opacity));\n}\n.btn-outline .badge {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--nf, var(--n)) / var(--tw-border-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--nc) / var(--tw-text-opacity));\n}\n.btn-outline.btn-primary .badge {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--p) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--p) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--pc) / var(--tw-text-opacity));\n}\n.btn-outline.btn-secondary .badge {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--s) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--s) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--sc) / var(--tw-text-opacity));\n}\n.btn-outline.btn-accent .badge {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--a) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--a) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--ac) / var(--tw-text-opacity));\n}\n.btn-outline .badge.outline {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--nf, var(--n)) / var(--tw-border-opacity));\n  background-color: transparent;\n}\n.btn-outline.btn-primary .badge-outline {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--p) / var(--tw-border-opacity));\n  background-color: transparent;\n  --tw-text-opacity: 1;\n  color: hsl(var(--p) / var(--tw-text-opacity));\n}\n.btn-outline.btn-secondary .badge-outline {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--s) / var(--tw-border-opacity));\n  background-color: transparent;\n  --tw-text-opacity: 1;\n  color: hsl(var(--s) / var(--tw-text-opacity));\n}\n.btn-outline.btn-accent .badge-outline {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--a) / var(--tw-border-opacity));\n  background-color: transparent;\n  --tw-text-opacity: 1;\n  color: hsl(var(--a) / var(--tw-text-opacity));\n}\n.btn-outline.btn-info .badge-outline {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--in) / var(--tw-border-opacity));\n  background-color: transparent;\n  --tw-text-opacity: 1;\n  color: hsl(var(--in) / var(--tw-text-opacity));\n}\n.btn-outline.btn-success .badge-outline {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--su) / var(--tw-border-opacity));\n  background-color: transparent;\n  --tw-text-opacity: 1;\n  color: hsl(var(--su) / var(--tw-text-opacity));\n}\n.btn-outline.btn-warning .badge-outline {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--wa) / var(--tw-border-opacity));\n  background-color: transparent;\n  --tw-text-opacity: 1;\n  color: hsl(var(--wa) / var(--tw-text-opacity));\n}\n.btn-outline.btn-error .badge-outline {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--er) / var(--tw-border-opacity));\n  background-color: transparent;\n  --tw-text-opacity: 1;\n  color: hsl(var(--er) / var(--tw-text-opacity));\n}\n.btn-outline:hover .badge {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--b2, var(--b1)) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--bc) / var(--tw-text-opacity));\n}\n.btn-outline:hover .badge.outline {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--b2, var(--b1)) / var(--tw-border-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--nc) / var(--tw-text-opacity));\n}\n.btn-outline.btn-primary:hover .badge {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--pc) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--pc) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--p) / var(--tw-text-opacity));\n}\n.btn-outline.btn-primary:hover .badge.outline {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--pc) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--pf, var(--p)) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--pc) / var(--tw-text-opacity));\n}\n.btn-outline.btn-secondary:hover .badge {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--sc) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--sc) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--s) / var(--tw-text-opacity));\n}\n.btn-outline.btn-secondary:hover .badge.outline {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--sc) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--sf, var(--s)) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--sc) / var(--tw-text-opacity));\n}\n.btn-outline.btn-accent:hover .badge {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--ac) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--ac) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--a) / var(--tw-text-opacity));\n}\n.btn-outline.btn-accent:hover .badge.outline {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--ac) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--af, var(--a)) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--ac) / var(--tw-text-opacity));\n}\n.btn:active:hover,\n  .btn:active:focus {\n  -webkit-animation: none;\n          animation: none;\n  transform: scale(var(--btn-focus-scale, 0.95));\n}\n.btn:hover, .btn-active {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--nf, var(--n)) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--nf, var(--n)) / var(--tw-bg-opacity));\n}\n.btn:focus-visible {\n  outline: 2px solid hsl(var(--nf));\n  outline-offset: 2px;\n}\n.btn-primary {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--p) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--p) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--pc) / var(--tw-text-opacity));\n}\n.btn-primary:hover, .btn-primary.btn-active {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--pf, var(--p)) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--pf, var(--p)) / var(--tw-bg-opacity));\n}\n.btn-primary:focus-visible {\n  outline: 2px solid hsl(var(--p));\n}\n.btn-secondary {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--s) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--s) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--sc) / var(--tw-text-opacity));\n}\n.btn-secondary:hover, .btn-secondary.btn-active {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--sf, var(--s)) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--sf, var(--s)) / var(--tw-bg-opacity));\n}\n.btn-secondary:focus-visible {\n  outline: 2px solid hsl(var(--s));\n}\n.btn.glass:hover,\n    .btn.glass.btn-active {\n  --glass-opacity: 25%;\n  --glass-border-opacity: 15%;\n}\n.btn.glass:focus-visible {\n  outline: 2px solid 0 0 2px currentColor;\n}\n.btn-outline {\n  border-color: currentColor;\n  background-color: transparent;\n  --tw-text-opacity: 1;\n  color: hsl(var(--bc) / var(--tw-text-opacity));\n}\n.btn-outline:hover {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--bc) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--bc) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--b1) / var(--tw-text-opacity));\n}\n.btn-outline.btn-primary {\n  --tw-text-opacity: 1;\n  color: hsl(var(--p) / var(--tw-text-opacity));\n}\n.btn-outline.btn-primary:hover {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--pf, var(--p)) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--pf, var(--p)) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--pc) / var(--tw-text-opacity));\n}\n.btn-outline.btn-secondary {\n  --tw-text-opacity: 1;\n  color: hsl(var(--s) / var(--tw-text-opacity));\n}\n.btn-outline.btn-secondary:hover {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--sf, var(--s)) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--sf, var(--s)) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--sc) / var(--tw-text-opacity));\n}\n.btn-outline.btn-accent {\n  --tw-text-opacity: 1;\n  color: hsl(var(--a) / var(--tw-text-opacity));\n}\n.btn-outline.btn-accent:hover {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--af, var(--a)) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--af, var(--a)) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--ac) / var(--tw-text-opacity));\n}\n.btn-outline.btn-success {\n  --tw-text-opacity: 1;\n  color: hsl(var(--su) / var(--tw-text-opacity));\n}\n.btn-outline.btn-success:hover {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--su) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--su) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--suc, var(--nc)) / var(--tw-text-opacity));\n}\n.btn-outline.btn-info {\n  --tw-text-opacity: 1;\n  color: hsl(var(--in) / var(--tw-text-opacity));\n}\n.btn-outline.btn-info:hover {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--in) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--in) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--inc, var(--nc)) / var(--tw-text-opacity));\n}\n.btn-outline.btn-warning {\n  --tw-text-opacity: 1;\n  color: hsl(var(--wa) / var(--tw-text-opacity));\n}\n.btn-outline.btn-warning:hover {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--wa) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--wa) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--wac, var(--nc)) / var(--tw-text-opacity));\n}\n.btn-outline.btn-error {\n  --tw-text-opacity: 1;\n  color: hsl(var(--er) / var(--tw-text-opacity));\n}\n.btn-outline.btn-error:hover {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--er) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--er) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--erc, var(--nc)) / var(--tw-text-opacity));\n}\n.btn-disabled, .btn-disabled:hover, .btn[disabled], .btn[disabled]:hover {\n  --tw-border-opacity: 0;\n  background-color: hsl(var(--n) / var(--tw-bg-opacity));\n  --tw-bg-opacity: 0.2;\n  color: hsl(var(--bc) / var(--tw-text-opacity));\n  --tw-text-opacity: 0.2;\n}\n.btn.loading.btn-square:before, .btn.loading.btn-circle:before {\n  margin-right: 0px;\n}\n.btn.loading.btn-xl:before, .btn.loading.btn-lg:before {\n  height: 1.25rem;\n  width: 1.25rem;\n}\n.btn.loading.btn-sm:before, .btn.loading.btn-xs:before {\n  height: 0.75rem;\n  width: 0.75rem;\n}\n.btn-group > input[type=\"radio\"]:checked.btn, .btn-group > .btn-active {\n  --tw-border-opacity: 1;\n  border-color: hsl(var(--p) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--p) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: hsl(var(--pc) / var(--tw-text-opacity));\n}\n.btn-group > input[type=\"radio\"]:checked.btn:focus-visible, .btn-group > .btn-active:focus-visible {\n  outline: 2px solid hsl(var(--p));\n}\n.btn-group > .btn:not(:first-of-type) {\n  margin-left: -1px;\n  border-top-left-radius: 0px;\n  border-bottom-left-radius: 0px;\n}\n.btn-group > .btn:not(:last-of-type) {\n  border-top-right-radius: 0px;\n  border-bottom-right-radius: 0px;\n}\n@-webkit-keyframes button-pop {\n\n  0% {\n    transform: scale(var(--btn-focus-scale, 0.95));\n  }\n\n  40% {\n    transform: scale(1.02);\n  }\n\n  100% {\n    transform: scale(1);\n  }\n}\n@keyframes button-pop {\n\n  0% {\n    transform: scale(var(--btn-focus-scale, 0.95));\n  }\n\n  40% {\n    transform: scale(1.02);\n  }\n\n  100% {\n    transform: scale(1);\n  }\n}\n@-webkit-keyframes checkmark {\n\n  0% {\n    background-position-y: 5px;\n  }\n\n  50% {\n    background-position-y: -2px;\n  }\n\n  100% {\n    background-position-y: 0;\n  }\n}\n@keyframes checkmark {\n\n  0% {\n    background-position-y: 5px;\n  }\n\n  50% {\n    background-position-y: -2px;\n  }\n\n  100% {\n    background-position-y: 0;\n  }\n}\n.drawer-toggle:focus-visible ~ .drawer-content .drawer-button.btn-primary {\n  outline: 2px solid hsl(var(--p));\n}\n.drawer-toggle:focus-visible ~ .drawer-content .drawer-button.btn-secondary {\n  outline: 2px solid hsl(var(--s));\n}\n@-webkit-keyframes progress-loading {\n\n  50% {\n    left: 107%;\n  }\n}\n@keyframes progress-loading {\n\n  50% {\n    left: 107%;\n  }\n}\n@-webkit-keyframes radiomark {\n\n  0% {\n    box-shadow: 0 0 0 12px hsl(var(--b1)) inset, 0 0 0 12px hsl(var(--b1)) inset;\n  }\n\n  50% {\n    box-shadow: 0 0 0 3px hsl(var(--b1)) inset, 0 0 0 3px hsl(var(--b1)) inset;\n  }\n\n  100% {\n    box-shadow: 0 0 0 4px hsl(var(--b1)) inset, 0 0 0 4px hsl(var(--b1)) inset;\n  }\n}\n@keyframes radiomark {\n\n  0% {\n    box-shadow: 0 0 0 12px hsl(var(--b1)) inset, 0 0 0 12px hsl(var(--b1)) inset;\n  }\n\n  50% {\n    box-shadow: 0 0 0 3px hsl(var(--b1)) inset, 0 0 0 3px hsl(var(--b1)) inset;\n  }\n\n  100% {\n    box-shadow: 0 0 0 4px hsl(var(--b1)) inset, 0 0 0 4px hsl(var(--b1)) inset;\n  }\n}\n@-webkit-keyframes rating-pop {\n\n  0% {\n    transform: translateY(-0.125em);\n  }\n\n  40% {\n    transform: translateY(-0.125em);\n  }\n\n  100% {\n    transform: translateY(0);\n  }\n}\n@keyframes rating-pop {\n\n  0% {\n    transform: translateY(-0.125em);\n  }\n\n  40% {\n    transform: translateY(-0.125em);\n  }\n\n  100% {\n    transform: translateY(0);\n  }\n}\n.btn-sm {\n  height: 2rem;\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n  min-height: 2rem;\n  font-size: 0.875rem;\n}\n.btn-square:where(.btn-sm) {\n  height: 2rem;\n  width: 2rem;\n  padding: 0px;\n}\n.btn-circle:where(.btn-sm) {\n  height: 2rem;\n  width: 2rem;\n  border-radius: 9999px;\n  padding: 0px;\n}\n.avatar.online:before {\n  content: \"\";\n  position: absolute;\n  z-index: 10;\n  display: block;\n  border-radius: 9999px;\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--su) / var(--tw-bg-opacity));\n  width: 15%;\n  height: 15%;\n  top: 7%;\n  right: 7%;\n  box-shadow: 0 0 0 2px hsl(var(--b1));\n}\n.avatar.offline:before {\n  content: \"\";\n  position: absolute;\n  z-index: 10;\n  display: block;\n  border-radius: 9999px;\n  --tw-bg-opacity: 1;\n  background-color: hsl(var(--b3, var(--b2)) / var(--tw-bg-opacity));\n  width: 15%;\n  height: 15%;\n  top: 7%;\n  right: 7%;\n  box-shadow: 0 0 0 2px hsl(var(--b1));\n}\n.mx-auto {\n  margin-left: auto;\n  margin-right: auto;\n}\n.ml-2 {\n  margin-left: 0.5rem;\n}\n.mr-3\\.5 {\n  margin-right: 0.875rem;\n}\n.mr-3 {\n  margin-right: 0.75rem;\n}\n.h-6 {\n  height: 1.5rem;\n}\n.h-3\\.5 {\n  height: 0.875rem;\n}\n.h-3 {\n  height: 0.75rem;\n}\n.w-6 {\n  width: 1.5rem;\n}\n.w-3\\.5 {\n  width: 0.875rem;\n}\n.w-3 {\n  width: 0.75rem;\n}\n.overflow-hidden {\n  overflow: hidden;\n}\n.rounded-full {\n  border-radius: 9999px;\n}\n.border-\\[1px\\] {\n  border-width: 1px;\n}\n.font-mono {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n.normal-case {\n  text-transform: none;\n}\n@media (min-width: 768px) {\n\n  .md\\:btn-md {\n    height: 3rem;\n    padding-left: 1rem;\n    padding-right: 1rem;\n    min-height: 3rem;\n    font-size: 0.875rem;\n  }\n\n  .btn-square:where(.md\\:btn-md) {\n    height: 3rem;\n    width: 3rem;\n    padding: 0px;\n  }\n\n  .btn-circle:where(.md\\:btn-md) {\n    height: 3rem;\n    width: 3rem;\n    border-radius: 9999px;\n    padding: 0px;\n  }\n\n  .md\\:mr-4 {\n    margin-right: 1rem;\n  }\n\n  .md\\:h-4 {\n    height: 1rem;\n  }\n\n  .md\\:w-4 {\n    width: 1rem;\n  }\n\n  .md\\:text-base {\n    font-size: 1rem;\n    line-height: 1.5rem;\n  }\n}";
styleInject(css_248z);

var requiredPermissions = ['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES', 'SIGNATURE', 'SIGN_TRANSACTION', 'ACCESS_PUBLIC_KEY'];
var ANSContext = /*#__PURE__*/createContext({});
function useAns() {
  var UseANSContext = useContext(ANSContext);

  if (UseANSContext === null) {
    throw new Error('useAns() can only be used inside of <AnsProvider />, ' + 'please declare it at a higher level.');
  }

  return UseANSContext;
}
var Badge = Default_Badge; //will replace later

var connector$1 = connector;
var AnsProvider = function AnsProvider(props) {
  var _React$useState = useState(false),
      walletConnected = _React$useState[0],
      setWalletConnected = _React$useState[1];

  var _React$useState2 = useState(undefined),
      address = _React$useState2[0],
      setAddress = _React$useState2[1];

  var _React$useState3 = useState(undefined),
      ansData = _React$useState3[0],
      setANSData = _React$useState3[1]; // const { t } = useTranslation()


  useEffect(function () {
    // add ArConnect event listeners
    window.addEventListener('arweaveWalletLoaded', walletLoadedEvent);
    window.addEventListener('walletSwitch', walletSwitchEvent);
    return function () {
      // remove ArConnect event listeners
      window.removeEventListener('arweaveWalletLoaded', walletLoadedEvent);
      window.removeEventListener('walletSwitch', walletSwitchEvent);
    };
  }); // wallet address change event
  // when the user switches wallets

  var walletSwitchEvent = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setAddress(e.detail.address); // setAddress("ljvCPN31XCLPkBo9FUeB7vAK0VC6-eY52-CS-6Iho8U")
              // setANSData(await getANSLabel(e.detail.address))

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function walletSwitchEvent(_x) {
      return _ref.apply(this, arguments);
    };
  }(); // ArConnect script injected event


  var walletLoadedEvent = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var addr;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return getAddr();

            case 3:
              addr = _context2.sent;
              setAddress(addr); // setAddress("ljvCPN31XCLPkBo9FUeB7vAK0VC6-eY52-CS-6Iho8U")
              // setANSData(await getANSLabel(addr))

              setWalletConnected(true);
              _context2.next = 12;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              // not connected
              setAddress(undefined);
              setWalletConnected(false);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8]]);
    }));

    return function walletLoadedEvent() {
      return _ref2.apply(this, arguments);
    };
  }();

  var installArConnectAlert = function installArConnectAlert() {
    Swal.fire({
      icon: "warning",
      title: connector$1.swal.title,
      text: connector$1.swal.text,
      footer: "<a href=\"https://arconnect.io\" rel=\"noopener noreferrer\" target=\"_blank\">" + connector$1.swal.footer + "</a>",
      customClass: "font-mono"
    });
  };

  var getAddr = function getAddr() {
    return window.arweaveWallet.getActiveAddress();
  };

  var shortenAddress = function shortenAddress(addr) {
    if (addr) {
      return addr.substring(0, 4) + '...' + addr.substring(addr.length - 4);
    }

    return addr;
  };

  useEffect(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var response, ans, address_color, currentLabel, _ans$avatar, avatar;

        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return fetch("https://ans-testnet.herokuapp.com/profile/" + address);

              case 3:
                response = _context3.sent;
                _context3.next = 6;
                return response.json();

              case 6:
                ans = _context3.sent;
                address_color = ans.address_color, currentLabel = ans.currentLabel, _ans$avatar = ans.avatar, avatar = _ans$avatar === void 0 ? "" : _ans$avatar;
                console.log({
                  address_color: address_color,
                  currentLabel: currentLabel,
                  avatar: avatar
                });
                setANSData({
                  address_color: address_color,
                  currentLabel: currentLabel,
                  avatar: avatar
                });
                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](0);
                console.error(_context3.t0);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 12]]);
      }));

      return function fetchData() {
        return _ref3.apply(this, arguments);
      };
    }();

    fetchData();
  }, [address]);

  var arconnectConnect = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!window.arweaveWallet) {
                _context4.next = 16;
                break;
              }

              _context4.prev = 1;
              _context4.next = 4;
              return window.arweaveWallet.connect(requiredPermissions);

            case 4:
              _context4.t0 = setAddress;
              _context4.next = 7;
              return getAddr();

            case 7:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1);
              setWalletConnected(true);
              _context4.next = 14;
              break;

            case 12:
              _context4.prev = 12;
              _context4.t2 = _context4["catch"](1);

            case 14:
              _context4.next = 17;
              break;

            case 16:
              installArConnectAlert();

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 12]]);
    }));

    return function arconnectConnect() {
      return _ref4.apply(this, arguments);
    };
  }();

  var arconnectDisconnect = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return window.arweaveWallet.disconnect();

            case 2:
              setWalletConnected(false);
              setAddress(undefined);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function arconnectDisconnect() {
      return _ref5.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/createElement(ANSContext.Provider, {
    value: {
      walletConnected: walletConnected,
      address: address,
      ansData: ansData,
      shortenAddress: shortenAddress,
      arconnectConnect: arconnectConnect,
      arconnectDisconnect: arconnectDisconnect
    }
  }, props.children);
};

export { ANSContext, AnsProvider, Badge, useAns };
//# sourceMappingURL=ans-for-all.esm.js.map
