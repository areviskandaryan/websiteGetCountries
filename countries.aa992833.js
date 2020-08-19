// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/services/favorites.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFavoriteCountries = getFavoriteCountries;

function getFavoriteCountries() {
  return localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
}
},{}],"src/helpers/request.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doPost = exports.doGet = void 0;

var request = function request(url) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";
  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var requestConfig = {
    method: method,
    headers: {// "Content-Type": "application/json;charset=utf-8",
    }
  };

  if (body) {
    requestConfig.body = JSON.stringify(body);
  }

  return fetch(url, requestConfig).then(function (r) {
    return r.json();
  });
};

var doGet = function doGet(url) {
  return request(url, "GET");
};

exports.doGet = doGet;

var doPost = function doPost(url, body) {
  return request(url, "POST", body);
};

exports.doPost = doPost;
},{}],"src/helpers/localStorage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addItemToLocalStorage = addItemToLocalStorage;

function addItemToLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
},{}],"src/helpers/array.helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEl = exports.removeEl = void 0;

var _favorites = require("../services/favorites.js");

var _localStorage = require("./localStorage.js");

var finalArr = (0, _favorites.getFavoriteCountries)();

var removeEl = function removeEl(index) {
  finalArr = finalArr.filter(function (el) {
    return el.index !== index;
  });
  (0, _localStorage.addItemToLocalStorage)('favorites', finalArr);
};

exports.removeEl = removeEl;

var addEl = function addEl(el) {
  finalArr.push(el);
  (0, _localStorage.addItemToLocalStorage)('favorites', finalArr);
};

exports.addEl = addEl;
},{"../services/favorites.js":"src/services/favorites.js","./localStorage.js":"src/helpers/localStorage.js"}],"src/helpers/createCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getErrorMessage = exports.createCard = void 0;

var _arrayHelper = require("./array.helper.js");

var createCard = function createCard(res, flag, index, page, finalArr) {
  var cardItem = document.createElement("div");
  var imgFlag = document.createElement("img");
  var cardButton = document.createElement("button");
  var infoItem = document.createElement("div");
  res.forEach(function (value) {
    imgFlag.src = flag;
    imgFlag.className = "imgFlag";
    cardItem.append(imgFlag);
    var infoName = document.createElement("p");
    infoName.textContent = value;
    infoName.className = "infoName";
    infoItem.append(infoName);
    infoItem.className = "infoItem";
    infoItem.append(cardButton);
    cardItem.className = "cardItem";
    cardItem.append(infoItem);
    cardButton.className = "card-button";

    if (page === "countries") {
      cardButton.textContent = "Add to favorites";

      if (finalArr.length > 0) {
        finalArr.forEach(function (el) {
          if (el.index == index) {
            cardButton.textContent = "Remove from favorites";
            return;
          }
        });
      }
    } else {
      cardButton.textContent = "Remove from favorites";
    }
  });
  cardButton.addEventListener("click", function () {
    cardButton.textContent === "Add to favorites" ? (0, _arrayHelper.addEl)({
      res: res,
      flag: flag,
      index: index
    }) : (0, _arrayHelper.removeEl)(index);
    cardButton.textContent = cardButton.textContent === "Add to favorites" ? "Remove from favorites" : "Add to favorites";
  });
  return cardItem;
};

exports.createCard = createCard;

var getErrorMessage = function getErrorMessage(err) {
  var errorMessage = document.createElement("p");
  errorMessage.textContent = err.message;
  errorMessage.className = "errorMessage";
  return errorMessage;
};

exports.getErrorMessage = getErrorMessage;
},{"./array.helper.js":"src/helpers/array.helper.js"}],"src/constatnts/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BASE_URL = void 0;
var BASE_URL = "https://restcountries.eu/rest/v2";
exports.BASE_URL = BASE_URL;
},{}],"src/helpers/routes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _api = require("../constatnts/api.js");

var routes = {
  getAllCountries: function getAllCountries() {
    return "".concat(_api.BASE_URL, "/all");
  },
  getCountryByName: function getCountryByName(name) {
    return "".concat(_api.BASE_URL, "/name/").concat(name);
  }
};
exports.routes = routes;
},{"../constatnts/api.js":"src/constatnts/api.js"}],"src/helpers/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = void 0;

var debounce = function debounce(fn, ms) {
  var timeout;
  return function () {
    var _arguments = arguments,
        _this = this;

    var fnCall = function fnCall() {
      fn.apply(_this, _arguments);
    };

    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

exports.debounce = debounce;
},{}],"src/countries.js":[function(require,module,exports) {
"use strict";

var _favorites = require("./services/favorites.js");

var _request = require("./helpers/request.js");

var _createCard = require("./helpers/createCard.js");

var _routes = require("./helpers/routes.js");

var _debounce = require("./helpers/debounce.js");

var page = "countries";
var divCards = document.querySelector(".divCards");
var navBarSearch = document.querySelector(".nav-bar_search");
var divtitle = document.querySelector(".title");
var finalArr = (0, _favorites.getFavoriteCountries)();
var state = {
  countryName: ""
};
navBarSearch.addEventListener("input", function (event) {
  var countryName = event.target.value;

  if (countryName.trim() !== "") {
    state.countryName = event.target.value;
  }

  effectiveSearch(state.countryName);
});

var getCountries = function getCountries(name) {
  var url = name === "" ? _routes.routes.getAllCountries() : _routes.routes.getCountryByName(name);
  divCards.innerHTML = "Loading...";
  return (0, _request.doGet)(url).then(function (res) {
    divCards.innerHTML = "";

    if (name) {
      divtitle.innerHTML = "<h1>SEARCH</h1>";
    }

    res.forEach(function (_ref, index) {
      var flag = _ref.flag,
          name = _ref.name,
          capital = _ref.capital,
          region = _ref.region;
      var newCard = (0, _createCard.createCard)([name, capital, region], flag, index, page, finalArr);
      divCards.append(newCard);
      divCards.className = "divCards";
    });
  }).catch(function (err) {
    var errorMessage = (0, _createCard.getErrorMessage)(err);
    divCards.append(errorMessage);
  });
};

getCountries(state.countryName);
var effectiveSearch = (0, _debounce.debounce)(getCountries, 500);
},{"./services/favorites.js":"src/services/favorites.js","./helpers/request.js":"src/helpers/request.js","./helpers/createCard.js":"src/helpers/createCard.js","./helpers/routes.js":"src/helpers/routes.js","./helpers/debounce.js":"src/helpers/debounce.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63668" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/countries.js"], null)
//# sourceMappingURL=/countries.aa992833.js.map