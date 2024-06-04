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
})({"KwvA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.viewport = exports.variationPlacements = exports.top = exports.start = exports.right = exports.reference = exports.read = exports.popper = exports.placements = exports.modifierPhases = exports.main = exports.left = exports.end = exports.clippingParents = exports.bottom = exports.beforeWrite = exports.beforeRead = exports.beforeMain = exports.basePlacements = exports.auto = exports.afterWrite = exports.afterRead = exports.afterMain = void 0;
var top = exports.top = 'top';
var bottom = exports.bottom = 'bottom';
var right = exports.right = 'right';
var left = exports.left = 'left';
var auto = exports.auto = 'auto';
var basePlacements = exports.basePlacements = [top, bottom, right, left];
var start = exports.start = 'start';
var end = exports.end = 'end';
var clippingParents = exports.clippingParents = 'clippingParents';
var viewport = exports.viewport = 'viewport';
var popper = exports.popper = 'popper';
var reference = exports.reference = 'reference';
var variationPlacements = exports.variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = exports.placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = exports.beforeRead = 'beforeRead';
var read = exports.read = 'read';
var afterRead = exports.afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = exports.beforeMain = 'beforeMain';
var main = exports.main = 'main';
var afterMain = exports.afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = exports.beforeWrite = 'beforeWrite';
var write = exports.write = 'write';
var afterWrite = exports.afterWrite = 'afterWrite';
var modifierPhases = exports.modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
},{}],"hqUe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeName;
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}
},{}],"iP0B":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindow;
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
},{}],"lOVC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isElement = isElement;
exports.isHTMLElement = isHTMLElement;
exports.isShadowRoot = isShadowRoot;
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isElement(node) {
  var OwnElement = (0, _getWindow.default)(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = (0, _getWindow.default)(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  var OwnElement = (0, _getWindow.default)(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
},{"./getWindow.js":"iP0B"}],"pu4Q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getNodeName = _interopRequireDefault(require("../dom-utils/getNodeName.js"));
var _instanceOf = require("../dom-utils/instanceOf.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0, _instanceOf.isHTMLElement)(element) || !(0, _getNodeName.default)(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]

    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];
      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0, _instanceOf.isHTMLElement)(element) || !(0, _getNodeName.default)(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
};
},{"../dom-utils/getNodeName.js":"hqUe","../dom-utils/instanceOf.js":"lOVC"}],"yLpD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBasePlacement;
var _enums = require("../enums.js");
function getBasePlacement(placement) {
  return placement.split('-')[0];
}
},{"../enums.js":"KwvA"}],"oQre":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.round = exports.min = exports.max = void 0;
var max = exports.max = Math.max;
var min = exports.min = Math.min;
var round = exports.round = Math.round;
},{}],"TiPP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUAString;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }
  return navigator.userAgent;
}
},{}],"PUSM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLayoutViewport;
var _userAgent = _interopRequireDefault(require("../utils/userAgent.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0, _userAgent.default)());
}
},{"../utils/userAgent.js":"TiPP"}],"btCD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBoundingClientRect;
var _instanceOf = require("./instanceOf.js");
var _math = require("../utils/math.js");
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
var _isLayoutViewport = _interopRequireDefault(require("./isLayoutViewport.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && (0, _instanceOf.isHTMLElement)(element)) {
    scaleX = element.offsetWidth > 0 ? (0, _math.round)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0, _math.round)(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = (0, _instanceOf.isElement)(element) ? (0, _getWindow.default)(element) : window,
    visualViewport = _ref.visualViewport;
  var addVisualOffsets = !(0, _isLayoutViewport.default)() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}
},{"./instanceOf.js":"lOVC","../utils/math.js":"oQre","./getWindow.js":"iP0B","./isLayoutViewport.js":"PUSM"}],"bgU0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLayoutRect;
var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0, _getBoundingClientRect.default)(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}
},{"./getBoundingClientRect.js":"btCD"}],"TozG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;
var _instanceOf = require("./instanceOf.js");
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0, _instanceOf.isShadowRoot)(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      } // $FlowFixMe[prop-missing]: need a better way to handle this...

      next = next.parentNode || next.host;
    } while (next);
  } // Give up, the result is false

  return false;
}
},{"./instanceOf.js":"lOVC"}],"ro5C":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getComputedStyle;
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getComputedStyle(element) {
  return (0, _getWindow.default)(element).getComputedStyle(element);
}
},{"./getWindow.js":"iP0B"}],"t2So":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTableElement;
var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0, _getNodeName.default)(element)) >= 0;
}
},{"./getNodeName.js":"hqUe"}],"iOCj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDocumentElement;
var _instanceOf = require("./instanceOf.js");
function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0, _instanceOf.isElement)(element) ? element.ownerDocument :
  // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}
},{"./instanceOf.js":"lOVC"}],"Tyrb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getParentNode;
var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));
var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));
var _instanceOf = require("./instanceOf.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getParentNode(element) {
  if ((0, _getNodeName.default)(element) === 'html') {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot ||
    // step into the shadow DOM of the parent of a slotted node
    element.parentNode || (
    // DOM Element detected
    (0, _instanceOf.isShadowRoot)(element) ? element.host : null) ||
    // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0, _getDocumentElement.default)(element) // fallback
  );
}
},{"./getNodeName.js":"hqUe","./getDocumentElement.js":"iOCj","./instanceOf.js":"lOVC"}],"Mnay":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOffsetParent;
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));
var _getComputedStyle = _interopRequireDefault(require("./getComputedStyle.js"));
var _instanceOf = require("./instanceOf.js");
var _isTableElement = _interopRequireDefault(require("./isTableElement.js"));
var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));
var _userAgent = _interopRequireDefault(require("../utils/userAgent.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getTrueOffsetParent(element) {
  if (!(0, _instanceOf.isHTMLElement)(element) ||
  // https://github.com/popperjs/popper-core/issues/837
  (0, _getComputedStyle.default)(element).position === 'fixed') {
    return null;
  }
  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block

function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0, _userAgent.default)());
  var isIE = /Trident/i.test((0, _userAgent.default)());
  if (isIE && (0, _instanceOf.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0, _getComputedStyle.default)(element);
    if (elementCss.position === 'fixed') {
      return null;
    }
  }
  var currentNode = (0, _getParentNode.default)(element);
  if ((0, _instanceOf.isShadowRoot)(currentNode)) {
    currentNode = currentNode.host;
  }
  while ((0, _instanceOf.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0, _getNodeName.default)(currentNode)) < 0) {
    var css = (0, _getComputedStyle.default)(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.

function getOffsetParent(element) {
  var window = (0, _getWindow.default)(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && (0, _isTableElement.default)(offsetParent) && (0, _getComputedStyle.default)(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && ((0, _getNodeName.default)(offsetParent) === 'html' || (0, _getNodeName.default)(offsetParent) === 'body' && (0, _getComputedStyle.default)(offsetParent).position === 'static')) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}
},{"./getWindow.js":"iP0B","./getNodeName.js":"hqUe","./getComputedStyle.js":"ro5C","./instanceOf.js":"lOVC","./isTableElement.js":"t2So","./getParentNode.js":"Tyrb","../utils/userAgent.js":"TiPP"}],"w8hZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMainAxisFromPlacement;
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}
},{}],"bTtH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.within = within;
exports.withinMaxClamp = withinMaxClamp;
var _math = require("./math.js");
function within(min, value, max) {
  return (0, _math.max)(min, (0, _math.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}
},{"./math.js":"oQre"}],"R9OA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFreshSideObject;
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
},{}],"YlSo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergePaddingObject;
var _getFreshSideObject = _interopRequireDefault(require("./getFreshSideObject.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0, _getFreshSideObject.default)(), paddingObject);
}
},{"./getFreshSideObject.js":"R9OA"}],"ZqdX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = expandToHashMap;
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
},{}],"T3Ag":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));
var _getLayoutRect = _interopRequireDefault(require("../dom-utils/getLayoutRect.js"));
var _contains = _interopRequireDefault(require("../dom-utils/contains.js"));
var _getOffsetParent = _interopRequireDefault(require("../dom-utils/getOffsetParent.js"));
var _getMainAxisFromPlacement = _interopRequireDefault(require("../utils/getMainAxisFromPlacement.js"));
var _within = require("../utils/within.js");
var _mergePaddingObject = _interopRequireDefault(require("../utils/mergePaddingObject.js"));
var _expandToHashMap = _interopRequireDefault(require("../utils/expandToHashMap.js"));
var _enums = require("../enums.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0, _mergePaddingObject.default)(typeof padding !== 'number' ? padding : (0, _expandToHashMap.default)(padding, _enums.basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state,
    name = _ref.name,
    options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0, _getBasePlacement.default)(state.placement);
  var axis = (0, _getMainAxisFromPlacement.default)(basePlacement);
  var isVertical = [_enums.left, _enums.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';
  if (!arrowElement || !popperOffsets) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0, _getLayoutRect.default)(arrowElement);
  var minProp = axis === 'y' ? _enums.top : _enums.left;
  var maxProp = axis === 'y' ? _enums.bottom : _enums.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0, _getOffsetParent.default)(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0, _within.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}
function effect(_ref2) {
  var state = _ref2.state,
    options = _ref2.options;
  var _options$element = options.element,
    arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
  if (arrowElement == null) {
    return;
  } // CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!(0, _contains.default)(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};
},{"../utils/getBasePlacement.js":"yLpD","../dom-utils/getLayoutRect.js":"bgU0","../dom-utils/contains.js":"TozG","../dom-utils/getOffsetParent.js":"Mnay","../utils/getMainAxisFromPlacement.js":"w8hZ","../utils/within.js":"bTtH","../utils/mergePaddingObject.js":"YlSo","../utils/expandToHashMap.js":"ZqdX","../enums.js":"KwvA"}],"kB4N":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getVariation;
function getVariation(placement) {
  return placement.split('-')[1];
}
},{}],"p5kV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.mapToStyles = mapToStyles;
var _enums = require("../enums.js");
var _getOffsetParent = _interopRequireDefault(require("../dom-utils/getOffsetParent.js"));
var _getWindow = _interopRequireDefault(require("../dom-utils/getWindow.js"));
var _getDocumentElement = _interopRequireDefault(require("../dom-utils/getDocumentElement.js"));
var _getComputedStyle = _interopRequireDefault(require("../dom-utils/getComputedStyle.js"));
var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));
var _getVariation = _interopRequireDefault(require("../utils/getVariation.js"));
var _math = require("../utils/math.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
    y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0, _math.round)(x * dpr) / dpr || 0,
    y: (0, _math.round)(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper = _ref2.popper,
    popperRect = _ref2.popperRect,
    placement = _ref2.placement,
    variation = _ref2.variation,
    offsets = _ref2.offsets,
    position = _ref2.position,
    gpuAcceleration = _ref2.gpuAcceleration,
    adaptive = _ref2.adaptive,
    roundOffsets = _ref2.roundOffsets,
    isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
    x = _offsets$x === void 0 ? 0 : _offsets$x,
    _offsets$y = offsets.y,
    y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums.left;
  var sideY = _enums.top;
  var win = window;
  if (adaptive) {
    var offsetParent = (0, _getOffsetParent.default)(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';
    if (offsetParent === (0, _getWindow.default)(popper)) {
      offsetParent = (0, _getDocumentElement.default)(popper);
      if ((0, _getComputedStyle.default)(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    offsetParent = offsetParent;
    if (placement === _enums.top || (placement === _enums.left || placement === _enums.right) && variation === _enums.end) {
      sideY = _enums.bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height :
      // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === _enums.left || (placement === _enums.top || placement === _enums.bottom) && variation === _enums.end) {
      sideX = _enums.right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width :
      // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, (0, _getWindow.default)(popper)) : {
    x: x,
    y: y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state,
    options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
    gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
    _options$adaptive = options.adaptive,
    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
    _options$roundOffsets = options.roundOffsets,
    roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: (0, _getBasePlacement.default)(state.placement),
    variation: (0, _getVariation.default)(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};
},{"../enums.js":"KwvA","../dom-utils/getOffsetParent.js":"Mnay","../dom-utils/getWindow.js":"iP0B","../dom-utils/getDocumentElement.js":"iOCj","../dom-utils/getComputedStyle.js":"ro5C","../utils/getBasePlacement.js":"yLpD","../utils/getVariation.js":"kB4N","../utils/math.js":"oQre"}],"ugN3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getWindow = _interopRequireDefault(require("../dom-utils/getWindow.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state,
    instance = _ref.instance,
    options = _ref.options;
  var _options$scroll = options.scroll,
    scroll = _options$scroll === void 0 ? true : _options$scroll,
    _options$resize = options.resize,
    resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0, _getWindow.default)(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }
  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }
  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }
    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};
},{"../dom-utils/getWindow.js":"iP0B"}],"hGEW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOppositePlacement;
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
},{}],"B4ze":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOppositeVariationPlacement;
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}
},{}],"aES8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindowScroll;
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getWindowScroll(node) {
  var win = (0, _getWindow.default)(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}
},{"./getWindow.js":"iP0B"}],"pET8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindowScrollBarX;
var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));
var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));
var _getWindowScroll = _interopRequireDefault(require("./getWindowScroll.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0, _getBoundingClientRect.default)((0, _getDocumentElement.default)(element)).left + (0, _getWindowScroll.default)(element).scrollLeft;
}
},{"./getBoundingClientRect.js":"btCD","./getDocumentElement.js":"iOCj","./getWindowScroll.js":"aES8"}],"uJtB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getViewportRect;
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));
var _getWindowScrollBarX = _interopRequireDefault(require("./getWindowScrollBarX.js"));
var _isLayoutViewport = _interopRequireDefault(require("./isLayoutViewport.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getViewportRect(element, strategy) {
  var win = (0, _getWindow.default)(element);
  var html = (0, _getDocumentElement.default)(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0, _isLayoutViewport.default)();
    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width: width,
    height: height,
    x: x + (0, _getWindowScrollBarX.default)(element),
    y: y
  };
}
},{"./getWindow.js":"iP0B","./getDocumentElement.js":"iOCj","./getWindowScrollBarX.js":"pET8","./isLayoutViewport.js":"PUSM"}],"xGf3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDocumentRect;
var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));
var _getComputedStyle = _interopRequireDefault(require("./getComputedStyle.js"));
var _getWindowScrollBarX = _interopRequireDefault(require("./getWindowScrollBarX.js"));
var _getWindowScroll = _interopRequireDefault(require("./getWindowScroll.js"));
var _math = require("../utils/math.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = (0, _getDocumentElement.default)(element);
  var winScroll = (0, _getWindowScroll.default)(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0, _math.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0, _math.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0, _getWindowScrollBarX.default)(element);
  var y = -winScroll.scrollTop;
  if ((0, _getComputedStyle.default)(body || html).direction === 'rtl') {
    x += (0, _math.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}
},{"./getDocumentElement.js":"iOCj","./getComputedStyle.js":"ro5C","./getWindowScrollBarX.js":"pET8","./getWindowScroll.js":"aES8","../utils/math.js":"oQre"}],"T26w":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isScrollParent;
var _getComputedStyle2 = _interopRequireDefault(require("./getComputedStyle.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0, _getComputedStyle2.default)(element),
    overflow = _getComputedStyle.overflow,
    overflowX = _getComputedStyle.overflowX,
    overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
},{"./getComputedStyle.js":"ro5C"}],"zGGS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getScrollParent;
var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));
var _isScrollParent = _interopRequireDefault(require("./isScrollParent.js"));
var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));
var _instanceOf = require("./instanceOf.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0, _getNodeName.default)(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }
  if ((0, _instanceOf.isHTMLElement)(node) && (0, _isScrollParent.default)(node)) {
    return node;
  }
  return getScrollParent((0, _getParentNode.default)(node));
}
},{"./getParentNode.js":"Tyrb","./isScrollParent.js":"T26w","./getNodeName.js":"hqUe","./instanceOf.js":"lOVC"}],"inBY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = listScrollParents;
var _getScrollParent = _interopRequireDefault(require("./getScrollParent.js"));
var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
var _isScrollParent = _interopRequireDefault(require("./isScrollParent.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = (0, _getScrollParent.default)(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0, _getWindow.default)(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0, _isScrollParent.default)(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList :
  // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0, _getParentNode.default)(target)));
}
},{"./getScrollParent.js":"zGGS","./getParentNode.js":"Tyrb","./getWindow.js":"iP0B","./isScrollParent.js":"T26w"}],"vA8j":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rectToClientRect;
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
},{}],"MtyE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClippingRect;
var _enums = require("../enums.js");
var _getViewportRect = _interopRequireDefault(require("./getViewportRect.js"));
var _getDocumentRect = _interopRequireDefault(require("./getDocumentRect.js"));
var _listScrollParents = _interopRequireDefault(require("./listScrollParents.js"));
var _getOffsetParent = _interopRequireDefault(require("./getOffsetParent.js"));
var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));
var _getComputedStyle = _interopRequireDefault(require("./getComputedStyle.js"));
var _instanceOf = require("./instanceOf.js");
var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));
var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));
var _contains = _interopRequireDefault(require("./contains.js"));
var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));
var _rectToClientRect = _interopRequireDefault(require("../utils/rectToClientRect.js"));
var _math = require("../utils/math.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getInnerBoundingClientRect(element, strategy) {
  var rect = (0, _getBoundingClientRect.default)(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums.viewport ? (0, _rectToClientRect.default)((0, _getViewportRect.default)(element, strategy)) : (0, _instanceOf.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0, _rectToClientRect.default)((0, _getDocumentRect.default)((0, _getDocumentElement.default)(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`

function getClippingParents(element) {
  var clippingParents = (0, _listScrollParents.default)((0, _getParentNode.default)(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0, _getComputedStyle.default)(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0, _instanceOf.isHTMLElement)(element) ? (0, _getOffsetParent.default)(element) : element;
  if (!(0, _instanceOf.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414

  return clippingParents.filter(function (clippingParent) {
    return (0, _instanceOf.isElement)(clippingParent) && (0, _contains.default)(clippingParent, clipperElement) && (0, _getNodeName.default)(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents

function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0, _math.max)(rect.top, accRect.top);
    accRect.right = (0, _math.min)(rect.right, accRect.right);
    accRect.bottom = (0, _math.min)(rect.bottom, accRect.bottom);
    accRect.left = (0, _math.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
},{"../enums.js":"KwvA","./getViewportRect.js":"uJtB","./getDocumentRect.js":"xGf3","./listScrollParents.js":"inBY","./getOffsetParent.js":"Mnay","./getDocumentElement.js":"iOCj","./getComputedStyle.js":"ro5C","./instanceOf.js":"lOVC","./getBoundingClientRect.js":"btCD","./getParentNode.js":"Tyrb","./contains.js":"TozG","./getNodeName.js":"hqUe","../utils/rectToClientRect.js":"vA8j","../utils/math.js":"oQre"}],"HyU9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeOffsets;
var _getBasePlacement = _interopRequireDefault(require("./getBasePlacement.js"));
var _getVariation = _interopRequireDefault(require("./getVariation.js"));
var _getMainAxisFromPlacement = _interopRequireDefault(require("./getMainAxisFromPlacement.js"));
var _enums = require("../enums.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function computeOffsets(_ref) {
  var reference = _ref.reference,
    element = _ref.element,
    placement = _ref.placement;
  var basePlacement = placement ? (0, _getBasePlacement.default)(placement) : null;
  var variation = placement ? (0, _getVariation.default)(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case _enums.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;
    case _enums.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case _enums.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case _enums.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }
  var mainAxis = basePlacement ? (0, _getMainAxisFromPlacement.default)(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';
    switch (variation) {
      case _enums.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;
      case _enums.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}
},{"./getBasePlacement.js":"yLpD","./getVariation.js":"kB4N","./getMainAxisFromPlacement.js":"w8hZ","../enums.js":"KwvA"}],"lMQv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectOverflow;
var _getClippingRect = _interopRequireDefault(require("../dom-utils/getClippingRect.js"));
var _getDocumentElement = _interopRequireDefault(require("../dom-utils/getDocumentElement.js"));
var _getBoundingClientRect = _interopRequireDefault(require("../dom-utils/getBoundingClientRect.js"));
var _computeOffsets = _interopRequireDefault(require("./computeOffsets.js"));
var _rectToClientRect = _interopRequireDefault(require("./rectToClientRect.js"));
var _enums = require("../enums.js");
var _instanceOf = require("../dom-utils/instanceOf.js");
var _mergePaddingObject = _interopRequireDefault(require("./mergePaddingObject.js"));
var _expandToHashMap = _interopRequireDefault(require("./expandToHashMap.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    _options$placement = _options.placement,
    placement = _options$placement === void 0 ? state.placement : _options$placement,
    _options$strategy = _options.strategy,
    strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
    _options$boundary = _options.boundary,
    boundary = _options$boundary === void 0 ? _enums.clippingParents : _options$boundary,
    _options$rootBoundary = _options.rootBoundary,
    rootBoundary = _options$rootBoundary === void 0 ? _enums.viewport : _options$rootBoundary,
    _options$elementConte = _options.elementContext,
    elementContext = _options$elementConte === void 0 ? _enums.popper : _options$elementConte,
    _options$altBoundary = _options.altBoundary,
    altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
    _options$padding = _options.padding,
    padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0, _mergePaddingObject.default)(typeof padding !== 'number' ? padding : (0, _expandToHashMap.default)(padding, _enums.basePlacements));
  var altContext = elementContext === _enums.popper ? _enums.reference : _enums.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0, _getClippingRect.default)((0, _instanceOf.isElement)(element) ? element : element.contextElement || (0, _getDocumentElement.default)(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0, _getBoundingClientRect.default)(state.elements.reference);
  var popperOffsets = (0, _computeOffsets.default)({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0, _rectToClientRect.default)(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums.right, _enums.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums.top, _enums.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }
  return overflowOffsets;
}
},{"../dom-utils/getClippingRect.js":"MtyE","../dom-utils/getDocumentElement.js":"iOCj","../dom-utils/getBoundingClientRect.js":"btCD","./computeOffsets.js":"HyU9","./rectToClientRect.js":"vA8j","../enums.js":"KwvA","../dom-utils/instanceOf.js":"lOVC","./mergePaddingObject.js":"YlSo","./expandToHashMap.js":"ZqdX"}],"YB6F":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeAutoPlacement;
var _getVariation = _interopRequireDefault(require("./getVariation.js"));
var _enums = require("../enums.js");
var _detectOverflow = _interopRequireDefault(require("./detectOverflow.js"));
var _getBasePlacement = _interopRequireDefault(require("./getBasePlacement.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    placement = _options.placement,
    boundary = _options.boundary,
    rootBoundary = _options.rootBoundary,
    padding = _options.padding,
    flipVariations = _options.flipVariations,
    _options$allowedAutoP = _options.allowedAutoPlacements,
    allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums.placements : _options$allowedAutoP;
  var variation = (0, _getVariation.default)(placement);
  var placements = variation ? flipVariations ? _enums.variationPlacements : _enums.variationPlacements.filter(function (placement) {
    return (0, _getVariation.default)(placement) === variation;
  }) : _enums.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...

  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0, _detectOverflow.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0, _getBasePlacement.default)(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}
},{"./getVariation.js":"kB4N","../enums.js":"KwvA","./detectOverflow.js":"lMQv","./getBasePlacement.js":"yLpD"}],"sjJD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getOppositePlacement = _interopRequireDefault(require("../utils/getOppositePlacement.js"));
var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));
var _getOppositeVariationPlacement = _interopRequireDefault(require("../utils/getOppositeVariationPlacement.js"));
var _detectOverflow = _interopRequireDefault(require("../utils/detectOverflow.js"));
var _computeAutoPlacement = _interopRequireDefault(require("../utils/computeAutoPlacement.js"));
var _enums = require("../enums.js");
var _getVariation = _interopRequireDefault(require("../utils/getVariation.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0, _getBasePlacement.default)(placement) === _enums.auto) {
    return [];
  }
  var oppositePlacement = (0, _getOppositePlacement.default)(placement);
  return [(0, _getOppositeVariationPlacement.default)(placement), oppositePlacement, (0, _getOppositeVariationPlacement.default)(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state,
    options = _ref.options,
    name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis,
    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
    _options$altAxis = options.altAxis,
    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
    specifiedFallbackPlacements = options.fallbackPlacements,
    padding = options.padding,
    boundary = options.boundary,
    rootBoundary = options.rootBoundary,
    altBoundary = options.altBoundary,
    _options$flipVariatio = options.flipVariations,
    flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
    allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0, _getBasePlacement.default)(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0, _getOppositePlacement.default)(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0, _getBasePlacement.default)(placement) === _enums.auto ? (0, _computeAutoPlacement.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];
  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];
    var _basePlacement = (0, _getBasePlacement.default)(placement);
    var isStartVariation = (0, _getVariation.default)(placement) === _enums.start;
    var isVertical = [_enums.top, _enums.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0, _detectOverflow.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums.right : _enums.left : isStartVariation ? _enums.bottom : _enums.top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0, _getOppositePlacement.default)(mainVariationSide);
    }
    var altVariationSide = (0, _getOppositePlacement.default)(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);
        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};
},{"../utils/getOppositePlacement.js":"hGEW","../utils/getBasePlacement.js":"yLpD","../utils/getOppositeVariationPlacement.js":"B4ze","../utils/detectOverflow.js":"lMQv","../utils/computeAutoPlacement.js":"YB6F","../enums.js":"KwvA","../utils/getVariation.js":"kB4N"}],"T3oQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _enums = require("../enums.js");
var _detectOverflow = _interopRequireDefault(require("../utils/detectOverflow.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [_enums.top, _enums.right, _enums.bottom, _enums.left].some(function (side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state,
    name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0, _detectOverflow.default)(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0, _detectOverflow.default)(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};
},{"../enums.js":"KwvA","../utils/detectOverflow.js":"lMQv"}],"YSdh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.distanceAndSkiddingToXY = distanceAndSkiddingToXY;
var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));
var _enums = require("../enums.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0, _getBasePlacement.default)(placement);
  var invertDistance = [_enums.left, _enums.top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
    skidding = _ref[0],
    distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums.left, _enums.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state,
    options = _ref2.options,
    name = _ref2.name;
  var _options$offset = options.offset,
    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
    x = _data$state$placement.x,
    y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};
},{"../utils/getBasePlacement.js":"yLpD","../enums.js":"KwvA"}],"KKNB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _computeOffsets = _interopRequireDefault(require("../utils/computeOffsets.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function popperOffsets(_ref) {
  var state = _ref.state,
    name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0, _computeOffsets.default)({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};
},{"../utils/computeOffsets.js":"HyU9"}],"lz0w":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAltAxis;
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
},{}],"T716":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _enums = require("../enums.js");
var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));
var _getMainAxisFromPlacement = _interopRequireDefault(require("../utils/getMainAxisFromPlacement.js"));
var _getAltAxis = _interopRequireDefault(require("../utils/getAltAxis.js"));
var _within = require("../utils/within.js");
var _getLayoutRect = _interopRequireDefault(require("../dom-utils/getLayoutRect.js"));
var _getOffsetParent = _interopRequireDefault(require("../dom-utils/getOffsetParent.js"));
var _detectOverflow = _interopRequireDefault(require("../utils/detectOverflow.js"));
var _getVariation = _interopRequireDefault(require("../utils/getVariation.js"));
var _getFreshSideObject = _interopRequireDefault(require("../utils/getFreshSideObject.js"));
var _math = require("../utils/math.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function preventOverflow(_ref) {
  var state = _ref.state,
    options = _ref.options,
    name = _ref.name;
  var _options$mainAxis = options.mainAxis,
    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
    _options$altAxis = options.altAxis,
    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
    boundary = options.boundary,
    rootBoundary = options.rootBoundary,
    altBoundary = options.altBoundary,
    padding = options.padding,
    _options$tether = options.tether,
    tether = _options$tether === void 0 ? true : _options$tether,
    _options$tetherOffset = options.tetherOffset,
    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0, _detectOverflow.default)(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0, _getBasePlacement.default)(state.placement);
  var variation = (0, _getVariation.default)(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0, _getMainAxisFromPlacement.default)(basePlacement);
  var altAxis = (0, _getAltAxis.default)(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === 'y' ? _enums.top : _enums.left;
    var altSide = mainAxis === 'y' ? _enums.bottom : _enums.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0, _getLayoutRect.default)(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0, _getFreshSideObject.default)();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0, _within.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0, _getOffsetParent.default)(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0, _within.within)(tether ? (0, _math.min)(min, tetherMin) : min, offset, tether ? (0, _math.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === 'x' ? _enums.top : _enums.left;
    var _altSide = mainAxis === 'x' ? _enums.bottom : _enums.right;
    var _offset = popperOffsets[altAxis];
    var _len = altAxis === 'y' ? 'height' : 'width';
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [_enums.top, _enums.left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? (0, _within.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0, _within.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules
var _default = exports.default = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};
},{"../enums.js":"KwvA","../utils/getBasePlacement.js":"yLpD","../utils/getMainAxisFromPlacement.js":"w8hZ","../utils/getAltAxis.js":"lz0w","../utils/within.js":"bTtH","../dom-utils/getLayoutRect.js":"bgU0","../dom-utils/getOffsetParent.js":"Mnay","../utils/detectOverflow.js":"lMQv","../utils/getVariation.js":"kB4N","../utils/getFreshSideObject.js":"R9OA","../utils/math.js":"oQre"}],"afdv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "applyStyles", {
  enumerable: true,
  get: function () {
    return _applyStyles.default;
  }
});
Object.defineProperty(exports, "arrow", {
  enumerable: true,
  get: function () {
    return _arrow.default;
  }
});
Object.defineProperty(exports, "computeStyles", {
  enumerable: true,
  get: function () {
    return _computeStyles.default;
  }
});
Object.defineProperty(exports, "eventListeners", {
  enumerable: true,
  get: function () {
    return _eventListeners.default;
  }
});
Object.defineProperty(exports, "flip", {
  enumerable: true,
  get: function () {
    return _flip.default;
  }
});
Object.defineProperty(exports, "hide", {
  enumerable: true,
  get: function () {
    return _hide.default;
  }
});
Object.defineProperty(exports, "offset", {
  enumerable: true,
  get: function () {
    return _offset.default;
  }
});
Object.defineProperty(exports, "popperOffsets", {
  enumerable: true,
  get: function () {
    return _popperOffsets.default;
  }
});
Object.defineProperty(exports, "preventOverflow", {
  enumerable: true,
  get: function () {
    return _preventOverflow.default;
  }
});
var _applyStyles = _interopRequireDefault(require("./applyStyles.js"));
var _arrow = _interopRequireDefault(require("./arrow.js"));
var _computeStyles = _interopRequireDefault(require("./computeStyles.js"));
var _eventListeners = _interopRequireDefault(require("./eventListeners.js"));
var _flip = _interopRequireDefault(require("./flip.js"));
var _hide = _interopRequireDefault(require("./hide.js"));
var _offset = _interopRequireDefault(require("./offset.js"));
var _popperOffsets = _interopRequireDefault(require("./popperOffsets.js"));
var _preventOverflow = _interopRequireDefault(require("./preventOverflow.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./applyStyles.js":"pu4Q","./arrow.js":"T3Ag","./computeStyles.js":"p5kV","./eventListeners.js":"ugN3","./flip.js":"sjJD","./hide.js":"T3oQ","./offset.js":"YSdh","./popperOffsets.js":"KKNB","./preventOverflow.js":"T716"}],"MDXK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHTMLElementScroll;
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
},{}],"ISrc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeScroll;
var _getWindowScroll = _interopRequireDefault(require("./getWindowScroll.js"));
var _getWindow = _interopRequireDefault(require("./getWindow.js"));
var _instanceOf = require("./instanceOf.js");
var _getHTMLElementScroll = _interopRequireDefault(require("./getHTMLElementScroll.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getNodeScroll(node) {
  if (node === (0, _getWindow.default)(node) || !(0, _instanceOf.isHTMLElement)(node)) {
    return (0, _getWindowScroll.default)(node);
  } else {
    return (0, _getHTMLElementScroll.default)(node);
  }
}
},{"./getWindowScroll.js":"aES8","./getWindow.js":"iP0B","./instanceOf.js":"lOVC","./getHTMLElementScroll.js":"MDXK"}],"At1X":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCompositeRect;
var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));
var _getNodeScroll = _interopRequireDefault(require("./getNodeScroll.js"));
var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));
var _instanceOf = require("./instanceOf.js");
var _getWindowScrollBarX = _interopRequireDefault(require("./getWindowScrollBarX.js"));
var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));
var _isScrollParent = _interopRequireDefault(require("./isScrollParent.js"));
var _math = require("../utils/math.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0, _math.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0, _math.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = (0, _instanceOf.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0, _instanceOf.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0, _getDocumentElement.default)(offsetParent);
  var rect = (0, _getBoundingClientRect.default)(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0, _getNodeName.default)(offsetParent) !== 'body' ||
    // https://github.com/popperjs/popper-core/issues/1078
    (0, _isScrollParent.default)(documentElement)) {
      scroll = (0, _getNodeScroll.default)(offsetParent);
    }
    if ((0, _instanceOf.isHTMLElement)(offsetParent)) {
      offsets = (0, _getBoundingClientRect.default)(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0, _getWindowScrollBarX.default)(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
},{"./getBoundingClientRect.js":"btCD","./getNodeScroll.js":"ISrc","./getNodeName.js":"hqUe","./instanceOf.js":"lOVC","./getWindowScrollBarX.js":"pET8","./getDocumentElement.js":"iOCj","./isScrollParent.js":"T26w","../utils/math.js":"oQre"}],"ND1T":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = orderModifiers;
var _enums = require("../enums.js");
// source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
},{"../enums.js":"KwvA"}],"dSl1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }
    return pending;
  };
}
},{}],"r9N4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeByName;
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}
},{}],"hLbv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPopper = void 0;
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _detectOverflow.default;
  }
});
exports.popperGenerator = popperGenerator;
var _getCompositeRect = _interopRequireDefault(require("./dom-utils/getCompositeRect.js"));
var _getLayoutRect = _interopRequireDefault(require("./dom-utils/getLayoutRect.js"));
var _listScrollParents = _interopRequireDefault(require("./dom-utils/listScrollParents.js"));
var _getOffsetParent = _interopRequireDefault(require("./dom-utils/getOffsetParent.js"));
var _orderModifiers = _interopRequireDefault(require("./utils/orderModifiers.js"));
var _debounce = _interopRequireDefault(require("./utils/debounce.js"));
var _mergeByName = _interopRequireDefault(require("./utils/mergeByName.js"));
var _detectOverflow = _interopRequireDefault(require("./utils/detectOverflow.js"));
var _instanceOf = require("./dom-utils/instanceOf.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions,
    _generatorOptions$def = _generatorOptions.defaultModifiers,
    defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
    _generatorOptions$def2 = _generatorOptions.defaultOptions,
    defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0, _instanceOf.isElement)(reference) ? (0, _listScrollParents.default)(reference) : reference.contextElement ? (0, _listScrollParents.default)(reference.contextElement) : [],
          popper: (0, _listScrollParents.default)(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0, _orderModifiers.default)((0, _mergeByName.default)([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements,
          reference = _state$elements.reference,
          popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          return;
        } // Store the reference and popper rects to be read by modifiers

        state.rects = {
          reference: (0, _getCompositeRect.default)(reference, (0, _getOffsetParent.default)(popper), state.options.strategy === 'fixed'),
          popper: (0, _getLayoutRect.default)(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index],
            fn = _state$orderedModifie.fn,
            _state$orderedModifie2 = _state$orderedModifie.options,
            _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
            name = _state$orderedModifie.name;
          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0, _debounce.default)(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference, popper)) {
      return instance;
    }
    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref) {
        var name = _ref.name,
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {} : _ref$options,
          effect = _ref.effect;
        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });
          var noopFn = function noopFn() {};
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = exports.createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules
},{"./dom-utils/getCompositeRect.js":"At1X","./dom-utils/getLayoutRect.js":"bgU0","./dom-utils/listScrollParents.js":"inBY","./dom-utils/getOffsetParent.js":"Mnay","./utils/orderModifiers.js":"ND1T","./utils/debounce.js":"dSl1","./utils/mergeByName.js":"r9N4","./utils/detectOverflow.js":"lMQv","./dom-utils/instanceOf.js":"lOVC"}],"DvPc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultModifiers = exports.createPopper = void 0;
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _createPopper.detectOverflow;
  }
});
Object.defineProperty(exports, "popperGenerator", {
  enumerable: true,
  get: function () {
    return _createPopper.popperGenerator;
  }
});
var _createPopper = require("./createPopper.js");
var _eventListeners = _interopRequireDefault(require("./modifiers/eventListeners.js"));
var _popperOffsets = _interopRequireDefault(require("./modifiers/popperOffsets.js"));
var _computeStyles = _interopRequireDefault(require("./modifiers/computeStyles.js"));
var _applyStyles = _interopRequireDefault(require("./modifiers/applyStyles.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var defaultModifiers = exports.defaultModifiers = [_eventListeners.default, _popperOffsets.default, _computeStyles.default, _applyStyles.default];
var createPopper = exports.createPopper = /*#__PURE__*/(0, _createPopper.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules
},{"./createPopper.js":"hLbv","./modifiers/eventListeners.js":"ugN3","./modifiers/popperOffsets.js":"KKNB","./modifiers/computeStyles.js":"p5kV","./modifiers/applyStyles.js":"pu4Q"}],"xbYU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createPopper: true,
  defaultModifiers: true,
  popperGenerator: true,
  detectOverflow: true,
  createPopperLite: true
};
exports.createPopper = void 0;
Object.defineProperty(exports, "createPopperLite", {
  enumerable: true,
  get: function () {
    return _popperLite.createPopper;
  }
});
exports.defaultModifiers = void 0;
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _createPopper.detectOverflow;
  }
});
Object.defineProperty(exports, "popperGenerator", {
  enumerable: true,
  get: function () {
    return _createPopper.popperGenerator;
  }
});
var _createPopper = require("./createPopper.js");
var _eventListeners = _interopRequireDefault(require("./modifiers/eventListeners.js"));
var _popperOffsets = _interopRequireDefault(require("./modifiers/popperOffsets.js"));
var _computeStyles = _interopRequireDefault(require("./modifiers/computeStyles.js"));
var _applyStyles = _interopRequireDefault(require("./modifiers/applyStyles.js"));
var _offset = _interopRequireDefault(require("./modifiers/offset.js"));
var _flip = _interopRequireDefault(require("./modifiers/flip.js"));
var _preventOverflow = _interopRequireDefault(require("./modifiers/preventOverflow.js"));
var _arrow = _interopRequireDefault(require("./modifiers/arrow.js"));
var _hide = _interopRequireDefault(require("./modifiers/hide.js"));
var _popperLite = require("./popper-lite.js");
var _index = require("./modifiers/index.js");
Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var defaultModifiers = exports.defaultModifiers = [_eventListeners.default, _popperOffsets.default, _computeStyles.default, _applyStyles.default, _offset.default, _flip.default, _preventOverflow.default, _arrow.default, _hide.default];
var createPopper = exports.createPopper = /*#__PURE__*/(0, _createPopper.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

// eslint-disable-next-line import/no-unused-modules

// eslint-disable-next-line import/no-unused-modules
},{"./createPopper.js":"hLbv","./modifiers/eventListeners.js":"ugN3","./modifiers/popperOffsets.js":"KKNB","./modifiers/computeStyles.js":"p5kV","./modifiers/applyStyles.js":"pu4Q","./modifiers/offset.js":"YSdh","./modifiers/flip.js":"sjJD","./modifiers/preventOverflow.js":"T716","./modifiers/arrow.js":"T3Ag","./modifiers/hide.js":"T3oQ","./popper-lite.js":"DvPc","./modifiers/index.js":"afdv"}],"S1OH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  popperGenerator: true,
  detectOverflow: true,
  createPopperBase: true,
  createPopper: true,
  createPopperLite: true
};
Object.defineProperty(exports, "createPopper", {
  enumerable: true,
  get: function () {
    return _popper.createPopper;
  }
});
Object.defineProperty(exports, "createPopperBase", {
  enumerable: true,
  get: function () {
    return _createPopper.createPopper;
  }
});
Object.defineProperty(exports, "createPopperLite", {
  enumerable: true,
  get: function () {
    return _popperLite.createPopper;
  }
});
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _createPopper.detectOverflow;
  }
});
Object.defineProperty(exports, "popperGenerator", {
  enumerable: true,
  get: function () {
    return _createPopper.popperGenerator;
  }
});
var _enums = require("./enums.js");
Object.keys(_enums).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _enums[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _enums[key];
    }
  });
});
var _index = require("./modifiers/index.js");
Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
var _createPopper = require("./createPopper.js");
var _popper = require("./popper.js");
var _popperLite = require("./popper-lite.js");
},{"./enums.js":"KwvA","./modifiers/index.js":"afdv","./createPopper.js":"hLbv","./popper.js":"xbYU","./popper-lite.js":"DvPc"}],"XhER":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = exports.Toast = exports.Tab = exports.ScrollSpy = exports.Popover = exports.Offcanvas = exports.Modal = exports.Dropdown = exports.Collapse = exports.Carousel = exports.Button = exports.Alert = void 0;
var Popper = _interopRequireWildcard(require("@popperjs/core"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const elementMap = new Map();
const Data = {
  set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map());
    }
    const instanceMap = elementMap.get(element);

    // make it clear we only want one instance per element
    // can be removed later when multiple key/instances are fine to be used
    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
      return;
    }
    instanceMap.set(key, instance);
  },
  get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }
    return null;
  },
  remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }
    const instanceMap = elementMap.get(element);
    instanceMap.delete(key);

    // free up element references if there are no instances left for an element
    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const MAX_UID = 1000000;
const MILLISECONDS_MULTIPLIER = 1000;
const TRANSITION_END = 'transitionend';

/**
 * Properly escape IDs selectors to handle weird IDs
 * @param {string} selector
 * @returns {string}
 */
const parseSelector = selector => {
  if (selector && window.CSS && window.CSS.escape) {
    // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
    selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
  }
  return selector;
};

// Shout-out Angus Croll (https://goo.gl/pxwQGp)
const toType = object => {
  if (object === null || object === undefined) {
    return `${object}`;
  }
  return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
};

/**
 * Public Util API
 */

const getUID = prefix => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));
  return prefix;
};
const getTransitionDurationFromElement = element => {
  if (!element) {
    return 0;
  }

  // Get transition-duration of the element
  let {
    transitionDuration,
    transitionDelay
  } = window.getComputedStyle(element);
  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay);

  // Return 0 if element or transition duration is not found
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }

  // If multiple durations are defined, take the first
  transitionDuration = transitionDuration.split(',')[0];
  transitionDelay = transitionDelay.split(',')[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};
const triggerTransitionEnd = element => {
  element.dispatchEvent(new Event(TRANSITION_END));
};
const isElement = object => {
  if (!object || typeof object !== 'object') {
    return false;
  }
  if (typeof object.jquery !== 'undefined') {
    object = object[0];
  }
  return typeof object.nodeType !== 'undefined';
};
const getElement = object => {
  // it's a jQuery object or a node element
  if (isElement(object)) {
    return object.jquery ? object[0] : object;
  }
  if (typeof object === 'string' && object.length > 0) {
    return document.querySelector(parseSelector(object));
  }
  return null;
};
const isVisible = element => {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false;
  }
  const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
  // Handle `details` element as its content may falsie appear visible when it is closed
  const closedDetails = element.closest('details:not([open])');
  if (!closedDetails) {
    return elementIsVisible;
  }
  if (closedDetails !== element) {
    const summary = element.closest('summary');
    if (summary && summary.parentNode !== closedDetails) {
      return false;
    }
    if (summary === null) {
      return false;
    }
  }
  return elementIsVisible;
};
const isDisabled = element => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }
  if (element.classList.contains('disabled')) {
    return true;
  }
  if (typeof element.disabled !== 'undefined') {
    return element.disabled;
  }
  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
};
const findShadowRoot = element => {
  if (!document.documentElement.attachShadow) {
    return null;
  }

  // Can find the shadow root otherwise it'll return the document
  if (typeof element.getRootNode === 'function') {
    const root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }
  if (element instanceof ShadowRoot) {
    return element;
  }

  // when we don't find a shadow root
  if (!element.parentNode) {
    return null;
  }
  return findShadowRoot(element.parentNode);
};
const noop = () => {};

/**
 * Trick to restart an element's animation
 *
 * @param {HTMLElement} element
 * @return void
 *
 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */
const reflow = element => {
  element.offsetHeight; // eslint-disable-line no-unused-expressions
};
const getjQuery = () => {
  if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    return window.jQuery;
  }
  return null;
};
const DOMContentLoadedCallbacks = [];
const onDOMContentLoaded = callback => {
  if (document.readyState === 'loading') {
    // add listener on the first call when the document is in loading state
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', () => {
        for (const callback of DOMContentLoadedCallbacks) {
          callback();
        }
      });
    }
    DOMContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};
const isRTL = () => document.documentElement.dir === 'rtl';
const defineJQueryPlugin = plugin => {
  onDOMContentLoaded(() => {
    const $ = getjQuery();
    /* istanbul ignore if */
    if ($) {
      const name = plugin.NAME;
      const JQUERY_NO_CONFLICT = $.fn[name];
      $.fn[name] = plugin.jQueryInterface;
      $.fn[name].Constructor = plugin;
      $.fn[name].noConflict = () => {
        $.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};
const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
  return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue;
};
const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
  if (!waitForTransition) {
    execute(callback);
    return;
  }
  const durationPadding = 5;
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  let called = false;
  const handler = ({
    target
  }) => {
    if (target !== transitionElement) {
      return;
    }
    called = true;
    transitionElement.removeEventListener(TRANSITION_END, handler);
    execute(callback);
  };
  transitionElement.addEventListener(TRANSITION_END, handler);
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};

/**
 * Return the previous/next element of a list.
 *
 * @param {array} list    The list of elements
 * @param activeElement   The active element
 * @param shouldGetNext   Choose to get next or previous element
 * @param isCycleAllowed
 * @return {Element|elem} The proper element
 */
const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
  const listLength = list.length;
  let index = list.indexOf(activeElement);

  // if the element does not exist in the list return an element
  // depending on the direction and if cycle is allowed
  if (index === -1) {
    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
  }
  index += shouldGetNext ? 1 : -1;
  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }
  return list[Math.max(0, Math.min(index, listLength - 1))];
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
const stripNameRegex = /\..*/;
const stripUidRegex = /::\d+$/;
const eventRegistry = {}; // Events storage
let uidEvent = 1;
const customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};
const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

/**
 * Private methods
 */

function makeEventUid(element, uid) {
  return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
}
function getElementEvents(element) {
  const uid = makeEventUid(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}
function bootstrapHandler(element, fn) {
  return function handler(event) {
    hydrateObj(event, {
      delegateTarget: element
    });
    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn);
    }
    return fn.apply(element, [event]);
  };
}
function bootstrapDelegationHandler(element, selector, fn) {
  return function handler(event) {
    const domElements = element.querySelectorAll(selector);
    for (let {
      target
    } = event; target && target !== this; target = target.parentNode) {
      for (const domElement of domElements) {
        if (domElement !== target) {
          continue;
        }
        hydrateObj(event, {
          delegateTarget: target
        });
        if (handler.oneOff) {
          EventHandler.off(element, event.type, selector, fn);
        }
        return fn.apply(target, [event]);
      }
    }
  };
}
function findHandler(events, callable, delegationSelector = null) {
  return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
}
function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
  const isDelegated = typeof handler === 'string';
  // TODO: tooltip passes `false` instead of selector, so we need to check
  const callable = isDelegated ? delegationFunction : handler || delegationFunction;
  let typeEvent = getTypeEvent(originalTypeEvent);
  if (!nativeEvents.has(typeEvent)) {
    typeEvent = originalTypeEvent;
  }
  return [isDelegated, callable, typeEvent];
}
function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return;
  }
  let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

  // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
  // this prevents the handler from being dispatched the same way as mouseover or mouseout does
  if (originalTypeEvent in customEvents) {
    const wrapFunction = fn => {
      return function (event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn.call(this, event);
        }
      };
    };
    callable = wrapFunction(callable);
  }
  const events = getElementEvents(element);
  const handlers = events[typeEvent] || (events[typeEvent] = {});
  const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
  if (previousFunction) {
    previousFunction.oneOff = previousFunction.oneOff && oneOff;
    return;
  }
  const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
  const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
  fn.delegationSelector = isDelegated ? handler : null;
  fn.callable = callable;
  fn.oneOff = oneOff;
  fn.uidEvent = uid;
  handlers[uid] = fn;
  element.addEventListener(typeEvent, fn, isDelegated);
}
function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  const fn = findHandler(events[typeEvent], handler, delegationSelector);
  if (!fn) {
    return;
  }
  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
  delete events[typeEvent][fn.uidEvent];
}
function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {};
  for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
    if (handlerKey.includes(namespace)) {
      removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
    }
  }
}
function getTypeEvent(event) {
  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  event = event.replace(stripNameRegex, '');
  return customEvents[event] || event;
}
const EventHandler = {
  on(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, false);
  },
  one(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, true);
  },
  off(element, originalTypeEvent, handler, delegationFunction) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }
    const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    const inNamespace = typeEvent !== originalTypeEvent;
    const events = getElementEvents(element);
    const storeElementEvent = events[typeEvent] || {};
    const isNamespace = originalTypeEvent.startsWith('.');
    if (typeof callable !== 'undefined') {
      // Simplest case: handler is passed, remove that listener ONLY.
      if (!Object.keys(storeElementEvent).length) {
        return;
      }
      removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
      return;
    }
    if (isNamespace) {
      for (const elementEvent of Object.keys(events)) {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      }
    }
    for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
      const handlerKey = keyHandlers.replace(stripUidRegex, '');
      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  },
  trigger(element, event, args) {
    if (typeof event !== 'string' || !element) {
      return null;
    }
    const $ = getjQuery();
    const typeEvent = getTypeEvent(event);
    const inNamespace = event !== typeEvent;
    let jQueryEvent = null;
    let bubbles = true;
    let nativeDispatch = true;
    let defaultPrevented = false;
    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }
    const evt = hydrateObj(new Event(event, {
      bubbles,
      cancelable: true
    }), args);
    if (defaultPrevented) {
      evt.preventDefault();
    }
    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }
    if (evt.defaultPrevented && jQueryEvent) {
      jQueryEvent.preventDefault();
    }
    return evt;
  }
};
function hydrateObj(obj, meta = {}) {
  for (const [key, value] of Object.entries(meta)) {
    try {
      obj[key] = value;
    } catch (_unused) {
      Object.defineProperty(obj, key, {
        configurable: true,
        get() {
          return value;
        }
      });
    }
  }
  return obj;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

function normalizeData(value) {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  if (value === Number(value).toString()) {
    return Number(value);
  }
  if (value === '' || value === 'null') {
    return null;
  }
  if (typeof value !== 'string') {
    return value;
  }
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch (_unused) {
    return value;
  }
}
function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
}
const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
  },
  removeDataAttribute(element, key) {
    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
  },
  getDataAttributes(element) {
    if (!element) {
      return {};
    }
    const attributes = {};
    const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
    for (const key of bsKeys) {
      let pureKey = key.replace(/^bs/, '');
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    }
    return attributes;
  },
  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/config.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Class definition
 */

class Config {
  // Getters
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  _getConfig(config) {
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  _configAfterMerge(config) {
    return config;
  }
  _mergeConfigObj(config, element) {
    const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

    return {
      ...this.constructor.Default,
      ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
      ...(isElement(element) ? Manipulator.getDataAttributes(element) : {}),
      ...(typeof config === 'object' ? config : {})
    };
  }
  _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
    for (const [property, expectedTypes] of Object.entries(configTypes)) {
      const value = config[property];
      const valueType = isElement(value) ? 'element' : toType(value);
      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
      }
    }
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const VERSION = '5.3.3';

/**
 * Class definition
 */

class BaseComponent extends Config {
  constructor(element, config) {
    super();
    element = getElement(element);
    if (!element) {
      return;
    }
    this._element = element;
    this._config = this._getConfig(config);
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }

  // Public
  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);
    EventHandler.off(this._element, this.constructor.EVENT_KEY);
    for (const propertyName of Object.getOwnPropertyNames(this)) {
      this[propertyName] = null;
    }
  }
  _queueCallback(callback, element, isAnimated = true) {
    executeAfterTransition(callback, element, isAnimated);
  }
  _getConfig(config) {
    config = this._mergeConfigObj(config, this._element);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }

  // Static
  static getInstance(element) {
    return Data.get(getElement(element), this.DATA_KEY);
  }
  static getOrCreateInstance(element, config = {}) {
    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
  }
  static get VERSION() {
    return VERSION;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(name) {
    return `${name}${this.EVENT_KEY}`;
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const getSelector = element => {
  let selector = element.getAttribute('data-bs-target');
  if (!selector || selector === '#') {
    let hrefAttribute = element.getAttribute('href');

    // The only valid content that could double as a selector are IDs or classes,
    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    // `document.querySelector` will rightfully complain it is invalid.
    // See https://github.com/twbs/bootstrap/issues/32273
    if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
      return null;
    }

    // Just in case some CMS puts out a full URL with the anchor appended
    if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
      hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
    }
    selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
  }
  return selector ? selector.split(',').map(sel => parseSelector(sel)).join(',') : null;
};
const SelectorEngine = {
  find(selector, element = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
  },
  findOne(selector, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector);
  },
  children(element, selector) {
    return [].concat(...element.children).filter(child => child.matches(selector));
  },
  parents(element, selector) {
    const parents = [];
    let ancestor = element.parentNode.closest(selector);
    while (ancestor) {
      parents.push(ancestor);
      ancestor = ancestor.parentNode.closest(selector);
    }
    return parents;
  },
  prev(element, selector) {
    let previous = element.previousElementSibling;
    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }
      previous = previous.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(element, selector) {
    let next = element.nextElementSibling;
    while (next) {
      if (next.matches(selector)) {
        return [next];
      }
      next = next.nextElementSibling;
    }
    return [];
  },
  focusableChildren(element) {
    const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
    return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
  },
  getSelectorFromElement(element) {
    const selector = getSelector(element);
    if (selector) {
      return SelectorEngine.findOne(selector) ? selector : null;
    }
    return null;
  },
  getElementFromSelector(element) {
    const selector = getSelector(element);
    return selector ? SelectorEngine.findOne(selector) : null;
  },
  getMultipleElementsFromSelector(element) {
    const selector = getSelector(element);
    return selector ? SelectorEngine.find(selector) : [];
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/component-functions.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const enableDismissTrigger = (component, method = 'hide') => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`;
  const name = component.NAME;
  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
    const instance = component.getOrCreateInstance(target);

    // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
    instance[method]();
  });
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$f = 'alert';
const DATA_KEY$a = 'bs.alert';
const EVENT_KEY$b = `.${DATA_KEY$a}`;
const EVENT_CLOSE = `close${EVENT_KEY$b}`;
const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
const CLASS_NAME_FADE$5 = 'fade';
const CLASS_NAME_SHOW$8 = 'show';

/**
 * Class definition
 */

class Alert extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$f;
  }

  // Public
  close() {
    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
    if (closeEvent.defaultPrevented) {
      return;
    }
    this._element.classList.remove(CLASS_NAME_SHOW$8);
    const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
    this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
  }

  // Private
  _destroyElement() {
    this._element.remove();
    EventHandler.trigger(this._element, EVENT_CLOSED);
    this.dispose();
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Alert.getOrCreateInstance(this);
      if (typeof config !== 'string') {
        return;
      }
      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}

/**
 * Data API implementation
 */
exports.Alert = Alert;
enableDismissTrigger(Alert, 'close');

/**
 * jQuery
 */

defineJQueryPlugin(Alert);

/**
 * --------------------------------------------------------------------------
 * Bootstrap button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$e = 'button';
const DATA_KEY$9 = 'bs.button';
const EVENT_KEY$a = `.${DATA_KEY$9}`;
const DATA_API_KEY$6 = '.data-api';
const CLASS_NAME_ACTIVE$3 = 'active';
const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;

/**
 * Class definition
 */

class Button extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$e;
  }

  // Public
  toggle() {
    // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Button.getOrCreateInstance(this);
      if (config === 'toggle') {
        data[config]();
      }
    });
  }
}

/**
 * Data API implementation
 */
exports.Button = Button;
EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
  event.preventDefault();
  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  const data = Button.getOrCreateInstance(button);
  data.toggle();
});

/**
 * jQuery
 */

defineJQueryPlugin(Button);

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/swipe.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$d = 'swipe';
const EVENT_KEY$9 = '.bs.swipe';
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
const POINTER_TYPE_TOUCH = 'touch';
const POINTER_TYPE_PEN = 'pen';
const CLASS_NAME_POINTER_EVENT = 'pointer-event';
const SWIPE_THRESHOLD = 40;
const Default$c = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
};
const DefaultType$c = {
  endCallback: '(function|null)',
  leftCallback: '(function|null)',
  rightCallback: '(function|null)'
};

/**
 * Class definition
 */

class Swipe extends Config {
  constructor(element, config) {
    super();
    this._element = element;
    if (!element || !Swipe.isSupported()) {
      return;
    }
    this._config = this._getConfig(config);
    this._deltaX = 0;
    this._supportPointerEvents = Boolean(window.PointerEvent);
    this._initEvents();
  }

  // Getters
  static get Default() {
    return Default$c;
  }
  static get DefaultType() {
    return DefaultType$c;
  }
  static get NAME() {
    return NAME$d;
  }

  // Public
  dispose() {
    EventHandler.off(this._element, EVENT_KEY$9);
  }

  // Private
  _start(event) {
    if (!this._supportPointerEvents) {
      this._deltaX = event.touches[0].clientX;
      return;
    }
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX;
    }
  }
  _end(event) {
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX - this._deltaX;
    }
    this._handleSwipe();
    execute(this._config.endCallback);
  }
  _move(event) {
    this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const absDeltaX = Math.abs(this._deltaX);
    if (absDeltaX <= SWIPE_THRESHOLD) {
      return;
    }
    const direction = absDeltaX / this._deltaX;
    this._deltaX = 0;
    if (!direction) {
      return;
    }
    execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    if (this._supportPointerEvents) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
      EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));
      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
      EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
      EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
    }
  }
  _eventIsPointerPenTouch(event) {
    return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
  }

  // Static
  static isSupported() {
    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$c = 'carousel';
const DATA_KEY$8 = 'bs.carousel';
const EVENT_KEY$8 = `.${DATA_KEY$8}`;
const DATA_API_KEY$5 = '.data-api';
const ARROW_LEFT_KEY$1 = 'ArrowLeft';
const ARROW_RIGHT_KEY$1 = 'ArrowRight';
const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

const ORDER_NEXT = 'next';
const ORDER_PREV = 'prev';
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
const EVENT_SLID = `slid${EVENT_KEY$8}`;
const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
const CLASS_NAME_CAROUSEL = 'carousel';
const CLASS_NAME_ACTIVE$2 = 'active';
const CLASS_NAME_SLIDE = 'slide';
const CLASS_NAME_END = 'carousel-item-end';
const CLASS_NAME_START = 'carousel-item-start';
const CLASS_NAME_NEXT = 'carousel-item-next';
const CLASS_NAME_PREV = 'carousel-item-prev';
const SELECTOR_ACTIVE = '.active';
const SELECTOR_ITEM = '.carousel-item';
const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
const SELECTOR_ITEM_IMG = '.carousel-item img';
const SELECTOR_INDICATORS = '.carousel-indicators';
const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
const KEY_TO_DIRECTION = {
  [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
};
const Default$b = {
  interval: 5000,
  keyboard: true,
  pause: 'hover',
  ride: false,
  touch: true,
  wrap: true
};
const DefaultType$b = {
  interval: '(number|boolean)',
  // TODO:v6 remove boolean support
  keyboard: 'boolean',
  pause: '(string|boolean)',
  ride: '(boolean|string)',
  touch: 'boolean',
  wrap: 'boolean'
};

/**
 * Class definition
 */

class Carousel extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._interval = null;
    this._activeElement = null;
    this._isSliding = false;
    this.touchTimeout = null;
    this._swipeHelper = null;
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    this._addEventListeners();
    if (this._config.ride === CLASS_NAME_CAROUSEL) {
      this.cycle();
    }
  }

  // Getters
  static get Default() {
    return Default$b;
  }
  static get DefaultType() {
    return DefaultType$b;
  }
  static get NAME() {
    return NAME$c;
  }

  // Public
  next() {
    this._slide(ORDER_NEXT);
  }
  nextWhenVisible() {
    // FIXME TODO use `document.visibilityState`
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  }
  prev() {
    this._slide(ORDER_PREV);
  }
  pause() {
    if (this._isSliding) {
      triggerTransitionEnd(this._element);
    }
    this._clearInterval();
  }
  cycle() {
    this._clearInterval();
    this._updateInterval();
    this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (!this._config.ride) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
      return;
    }
    this.cycle();
  }
  to(index) {
    const items = this._getItems();
    if (index > items.length - 1 || index < 0) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
      return;
    }
    const activeIndex = this._getItemIndex(this._getActive());
    if (activeIndex === index) {
      return;
    }
    const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
    this._slide(order, items[index]);
  }
  dispose() {
    if (this._swipeHelper) {
      this._swipeHelper.dispose();
    }
    super.dispose();
  }

  // Private
  _configAfterMerge(config) {
    config.defaultInterval = config.interval;
    return config;
  }
  _addEventListeners() {
    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
    }
    if (this._config.pause === 'hover') {
      EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
      EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
    }
    if (this._config.touch && Swipe.isSupported()) {
      this._addTouchEventListeners();
    }
  }
  _addTouchEventListeners() {
    for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
      EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
    }
    const endCallBack = () => {
      if (this._config.pause !== 'hover') {
        return;
      }

      // If it's a touch-enabled device, mouseenter/leave are fired as
      // part of the mouse compatibility events on first tap - the carousel
      // would stop cycling until user tapped out of it;
      // here, we listen for touchend, explicitly pause the carousel
      // (as if it's the second time we tap on it, mouseenter compat event
      // is NOT fired) and after a timeout (to allow for mouse compatibility
      // events to fire) we explicitly restart cycling

      this.pause();
      if (this.touchTimeout) {
        clearTimeout(this.touchTimeout);
      }
      this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
    };
    const swipeConfig = {
      leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
      rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
      endCallback: endCallBack
    };
    this._swipeHelper = new Swipe(this._element, swipeConfig);
  }
  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }
    const direction = KEY_TO_DIRECTION[event.key];
    if (direction) {
      event.preventDefault();
      this._slide(this._directionToOrder(direction));
    }
  }
  _getItemIndex(element) {
    return this._getItems().indexOf(element);
  }
  _setActiveIndicatorElement(index) {
    if (!this._indicatorsElement) {
      return;
    }
    const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
    activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
    activeIndicator.removeAttribute('aria-current');
    const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
    if (newActiveIndicator) {
      newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
      newActiveIndicator.setAttribute('aria-current', 'true');
    }
  }
  _updateInterval() {
    const element = this._activeElement || this._getActive();
    if (!element) {
      return;
    }
    const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
    this._config.interval = elementInterval || this._config.defaultInterval;
  }
  _slide(order, element = null) {
    if (this._isSliding) {
      return;
    }
    const activeElement = this._getActive();
    const isNext = order === ORDER_NEXT;
    const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
    if (nextElement === activeElement) {
      return;
    }
    const nextElementIndex = this._getItemIndex(nextElement);
    const triggerEvent = eventName => {
      return EventHandler.trigger(this._element, eventName, {
        relatedTarget: nextElement,
        direction: this._orderToDirection(order),
        from: this._getItemIndex(activeElement),
        to: nextElementIndex
      });
    };
    const slideEvent = triggerEvent(EVENT_SLIDE);
    if (slideEvent.defaultPrevented) {
      return;
    }
    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      // TODO: change tests that use empty divs to avoid this check
      return;
    }
    const isCycling = Boolean(this._interval);
    this.pause();
    this._isSliding = true;
    this._setActiveIndicatorElement(nextElementIndex);
    this._activeElement = nextElement;
    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
    nextElement.classList.add(orderClassName);
    reflow(nextElement);
    activeElement.classList.add(directionalClassName);
    nextElement.classList.add(directionalClassName);
    const completeCallBack = () => {
      nextElement.classList.remove(directionalClassName, orderClassName);
      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
      activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
      this._isSliding = false;
      triggerEvent(EVENT_SLID);
    };
    this._queueCallback(completeCallBack, activeElement, this._isAnimated());
    if (isCycling) {
      this.cycle();
    }
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_SLIDE);
  }
  _getActive() {
    return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
  }
  _getItems() {
    return SelectorEngine.find(SELECTOR_ITEM, this._element);
  }
  _clearInterval() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
  _directionToOrder(direction) {
    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    }
    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
  }
  _orderToDirection(order) {
    if (isRTL()) {
      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Carousel.getOrCreateInstance(this, config);
      if (typeof config === 'number') {
        data.to(config);
        return;
      }
      if (typeof config === 'string') {
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}

/**
 * Data API implementation
 */
exports.Carousel = Carousel;
EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
  const target = SelectorEngine.getElementFromSelector(this);
  if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
    return;
  }
  event.preventDefault();
  const carousel = Carousel.getOrCreateInstance(target);
  const slideIndex = this.getAttribute('data-bs-slide-to');
  if (slideIndex) {
    carousel.to(slideIndex);
    carousel._maybeEnableCycle();
    return;
  }
  if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
    carousel.next();
    carousel._maybeEnableCycle();
    return;
  }
  carousel.prev();
  carousel._maybeEnableCycle();
});
EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
  for (const carousel of carousels) {
    Carousel.getOrCreateInstance(carousel);
  }
});

/**
 * jQuery
 */

defineJQueryPlugin(Carousel);

/**
 * --------------------------------------------------------------------------
 * Bootstrap collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$b = 'collapse';
const DATA_KEY$7 = 'bs.collapse';
const EVENT_KEY$7 = `.${DATA_KEY$7}`;
const DATA_API_KEY$4 = '.data-api';
const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
const CLASS_NAME_SHOW$7 = 'show';
const CLASS_NAME_COLLAPSE = 'collapse';
const CLASS_NAME_COLLAPSING = 'collapsing';
const CLASS_NAME_COLLAPSED = 'collapsed';
const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
const WIDTH = 'width';
const HEIGHT = 'height';
const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
const Default$a = {
  parent: null,
  toggle: true
};
const DefaultType$a = {
  parent: '(null|element)',
  toggle: 'boolean'
};

/**
 * Class definition
 */

class Collapse extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._isTransitioning = false;
    this._triggerArray = [];
    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
    for (const elem of toggleList) {
      const selector = SelectorEngine.getSelectorFromElement(elem);
      const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);
      if (selector !== null && filterElement.length) {
        this._triggerArray.push(elem);
      }
    }
    this._initializeChildren();
    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    }
    if (this._config.toggle) {
      this.toggle();
    }
  }

  // Getters
  static get Default() {
    return Default$a;
  }
  static get DefaultType() {
    return DefaultType$a;
  }
  static get NAME() {
    return NAME$b;
  }

  // Public
  toggle() {
    if (this._isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }
  show() {
    if (this._isTransitioning || this._isShown()) {
      return;
    }
    let activeChildren = [];

    // find active children
    if (this._config.parent) {
      activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
        toggle: false
      }));
    }
    if (activeChildren.length && activeChildren[0]._isTransitioning) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
    if (startEvent.defaultPrevented) {
      return;
    }
    for (const activeInstance of activeChildren) {
      activeInstance.hide();
    }
    const dimension = this._getDimension();
    this._element.classList.remove(CLASS_NAME_COLLAPSE);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.style[dimension] = 0;
    this._addAriaAndCollapsedClass(this._triggerArray, true);
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      this._element.style[dimension] = '';
      EventHandler.trigger(this._element, EVENT_SHOWN$6);
    };
    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;
    this._queueCallback(complete, this._element, true);
    this._element.style[dimension] = `${this._element[scrollSize]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown()) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
    if (startEvent.defaultPrevented) {
      return;
    }
    const dimension = this._getDimension();
    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
    for (const trigger of this._triggerArray) {
      const element = SelectorEngine.getElementFromSelector(trigger);
      if (element && !this._isShown(element)) {
        this._addAriaAndCollapsedClass([trigger], false);
      }
    }
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE);
      EventHandler.trigger(this._element, EVENT_HIDDEN$6);
    };
    this._element.style[dimension] = '';
    this._queueCallback(complete, this._element, true);
  }
  _isShown(element = this._element) {
    return element.classList.contains(CLASS_NAME_SHOW$7);
  }

  // Private
  _configAfterMerge(config) {
    config.toggle = Boolean(config.toggle); // Coerce string values
    config.parent = getElement(config.parent);
    return config;
  }
  _getDimension() {
    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
  }
  _initializeChildren() {
    if (!this._config.parent) {
      return;
    }
    const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
    for (const element of children) {
      const selected = SelectorEngine.getElementFromSelector(element);
      if (selected) {
        this._addAriaAndCollapsedClass([element], this._isShown(selected));
      }
    }
  }
  _getFirstLevelChildren(selector) {
    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
    // remove children if greater depth
    return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
  }
  _addAriaAndCollapsedClass(triggerArray, isOpen) {
    if (!triggerArray.length) {
      return;
    }
    for (const element of triggerArray) {
      element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
      element.setAttribute('aria-expanded', isOpen);
    }
  }

  // Static
  static jQueryInterface(config) {
    const _config = {};
    if (typeof config === 'string' && /show|hide/.test(config)) {
      _config.toggle = false;
    }
    return this.each(function () {
      const data = Collapse.getOrCreateInstance(this, _config);
      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}

/**
 * Data API implementation
 */
exports.Collapse = Collapse;
EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
    event.preventDefault();
  }
  for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
    Collapse.getOrCreateInstance(element, {
      toggle: false
    }).toggle();
  }
});

/**
 * jQuery
 */

defineJQueryPlugin(Collapse);

/**
 * --------------------------------------------------------------------------
 * Bootstrap dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$a = 'dropdown';
const DATA_KEY$6 = 'bs.dropdown';
const EVENT_KEY$6 = `.${DATA_KEY$6}`;
const DATA_API_KEY$3 = '.data-api';
const ESCAPE_KEY$2 = 'Escape';
const TAB_KEY$1 = 'Tab';
const ARROW_UP_KEY$1 = 'ArrowUp';
const ARROW_DOWN_KEY$1 = 'ArrowDown';
const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
const CLASS_NAME_SHOW$6 = 'show';
const CLASS_NAME_DROPUP = 'dropup';
const CLASS_NAME_DROPEND = 'dropend';
const CLASS_NAME_DROPSTART = 'dropstart';
const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
const SELECTOR_MENU = '.dropdown-menu';
const SELECTOR_NAVBAR = '.navbar';
const SELECTOR_NAVBAR_NAV = '.navbar-nav';
const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
const PLACEMENT_TOPCENTER = 'top';
const PLACEMENT_BOTTOMCENTER = 'bottom';
const Default$9 = {
  autoClose: true,
  boundary: 'clippingParents',
  display: 'dynamic',
  offset: [0, 2],
  popperConfig: null,
  reference: 'toggle'
};
const DefaultType$9 = {
  autoClose: '(boolean|string)',
  boundary: '(string|element)',
  display: 'string',
  offset: '(array|string|function)',
  popperConfig: '(null|object|function)',
  reference: '(string|element|object)'
};

/**
 * Class definition
 */

class Dropdown extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._popper = null;
    this._parent = this._element.parentNode; // dropdown wrapper
    // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
    this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
    this._inNavbar = this._detectNavbar();
  }

  // Getters
  static get Default() {
    return Default$9;
  }
  static get DefaultType() {
    return DefaultType$9;
  }
  static get NAME() {
    return NAME$a;
  }

  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (isDisabled(this._element) || this._isShown()) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._createPopper();

    // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
    if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.on(element, 'mouseover', noop);
      }
    }
    this._element.focus();
    this._element.setAttribute('aria-expanded', true);
    this._menu.classList.add(CLASS_NAME_SHOW$6);
    this._element.classList.add(CLASS_NAME_SHOW$6);
    EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
  }
  hide() {
    if (isDisabled(this._element) || !this._isShown()) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    this._completeHide(relatedTarget);
  }
  dispose() {
    if (this._popper) {
      this._popper.destroy();
    }
    super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar();
    if (this._popper) {
      this._popper.update();
    }
  }

  // Private
  _completeHide(relatedTarget) {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
    if (hideEvent.defaultPrevented) {
      return;
    }

    // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ('ontouchstart' in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.off(element, 'mouseover', noop);
      }
    }
    if (this._popper) {
      this._popper.destroy();
    }
    this._menu.classList.remove(CLASS_NAME_SHOW$6);
    this._element.classList.remove(CLASS_NAME_SHOW$6);
    this._element.setAttribute('aria-expanded', 'false');
    Manipulator.removeDataAttribute(this._menu, 'popper');
    EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
  }
  _getConfig(config) {
    config = super._getConfig(config);
    if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
      // Popper virtual elements require a getBoundingClientRect method
      throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    }
    return config;
  }
  _createPopper() {
    if (typeof Popper === 'undefined') {
      throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
    }
    let referenceElement = this._element;
    if (this._config.reference === 'parent') {
      referenceElement = this._parent;
    } else if (isElement(this._config.reference)) {
      referenceElement = getElement(this._config.reference);
    } else if (typeof this._config.reference === 'object') {
      referenceElement = this._config.reference;
    }
    const popperConfig = this._getPopperConfig();
    this._popper = Popper.createPopper(referenceElement, this._menu, popperConfig);
  }
  _isShown() {
    return this._menu.classList.contains(CLASS_NAME_SHOW$6);
  }
  _getPlacement() {
    const parentDropdown = this._parent;
    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
      return PLACEMENT_TOPCENTER;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
      return PLACEMENT_BOTTOMCENTER;
    }

    // We need to trim the value because custom properties can also include spaces
    const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    }
    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }
  _detectNavbar() {
    return this._element.closest(SELECTOR_NAVBAR) !== null;
  }
  _getOffset() {
    const {
      offset
    } = this._config;
    if (typeof offset === 'string') {
      return offset.split(',').map(value => Number.parseInt(value, 10));
    }
    if (typeof offset === 'function') {
      return popperData => offset(popperData, this._element);
    }
    return offset;
  }
  _getPopperConfig() {
    const defaultBsPopperConfig = {
      placement: this._getPlacement(),
      modifiers: [{
        name: 'preventOverflow',
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }]
    };

    // Disable Popper if we have a static display or Dropdown is in Navbar
    if (this._inNavbar || this._config.display === 'static') {
      Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
      defaultBsPopperConfig.modifiers = [{
        name: 'applyStyles',
        enabled: false
      }];
    }
    return {
      ...defaultBsPopperConfig,
      ...execute(this._config.popperConfig, [defaultBsPopperConfig])
    };
  }
  _selectMenuItem({
    key,
    target
  }) {
    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));
    if (!items.length) {
      return;
    }

    // if target isn't included in items (e.g. when expanding the dropdown)
    // allow cycling to get the last item in case key equals ARROW_UP_KEY
    getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Dropdown.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
  static clearMenus(event) {
    if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
      return;
    }
    const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
    for (const toggle of openToggles) {
      const context = Dropdown.getInstance(toggle);
      if (!context || context._config.autoClose === false) {
        continue;
      }
      const composedPath = event.composedPath();
      const isMenuTarget = composedPath.includes(context._menu);
      if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
        continue;
      }

      // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
      if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
        continue;
      }
      const relatedTarget = {
        relatedTarget: context._element
      };
      if (event.type === 'click') {
        relatedTarget.clickEvent = event;
      }
      context._completeHide(relatedTarget);
    }
  }
  static dataApiKeydownHandler(event) {
    // If not an UP | DOWN | ESCAPE key => not a dropdown command
    // If input/textarea && if key is other than ESCAPE => not a dropdown command

    const isInput = /input|textarea/i.test(event.target.tagName);
    const isEscapeEvent = event.key === ESCAPE_KEY$2;
    const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
    if (!isUpOrDownEvent && !isEscapeEvent) {
      return;
    }
    if (isInput && !isEscapeEvent) {
      return;
    }
    event.preventDefault();

    // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
    const instance = Dropdown.getOrCreateInstance(getToggleButton);
    if (isUpOrDownEvent) {
      event.stopPropagation();
      instance.show();
      instance._selectMenuItem(event);
      return;
    }
    if (instance._isShown()) {
      // else is escape and we check if it is shown
      event.stopPropagation();
      instance.hide();
      getToggleButton.focus();
    }
  }
}

/**
 * Data API implementation
 */
exports.Dropdown = Dropdown;
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
  event.preventDefault();
  Dropdown.getOrCreateInstance(this).toggle();
});

/**
 * jQuery
 */

defineJQueryPlugin(Dropdown);

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$9 = 'backdrop';
const CLASS_NAME_FADE$4 = 'fade';
const CLASS_NAME_SHOW$5 = 'show';
const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
const Default$8 = {
  className: 'modal-backdrop',
  clickCallback: null,
  isAnimated: false,
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: 'body' // give the choice to place backdrop under different elements
};
const DefaultType$8 = {
  className: 'string',
  clickCallback: '(function|null)',
  isAnimated: 'boolean',
  isVisible: 'boolean',
  rootElement: '(element|string)'
};

/**
 * Class definition
 */

class Backdrop extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }

  // Getters
  static get Default() {
    return Default$8;
  }
  static get DefaultType() {
    return DefaultType$8;
  }
  static get NAME() {
    return NAME$9;
  }

  // Public
  show(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._append();
    const element = this._getElement();
    if (this._config.isAnimated) {
      reflow(element);
    }
    element.classList.add(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      execute(callback);
    });
  }
  hide(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._getElement().classList.remove(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      this.dispose();
      execute(callback);
    });
  }
  dispose() {
    if (!this._isAppended) {
      return;
    }
    EventHandler.off(this._element, EVENT_MOUSEDOWN);
    this._element.remove();
    this._isAppended = false;
  }

  // Private
  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement('div');
      backdrop.className = this._config.className;
      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE$4);
      }
      this._element = backdrop;
    }
    return this._element;
  }
  _configAfterMerge(config) {
    // use getElement() with the default "body" to get a fresh Element on each instantiation
    config.rootElement = getElement(config.rootElement);
    return config;
  }
  _append() {
    if (this._isAppended) {
      return;
    }
    const element = this._getElement();
    this._config.rootElement.append(element);
    EventHandler.on(element, EVENT_MOUSEDOWN, () => {
      execute(this._config.clickCallback);
    });
    this._isAppended = true;
  }
  _emulateAnimation(callback) {
    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/focustrap.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$8 = 'focustrap';
const DATA_KEY$5 = 'bs.focustrap';
const EVENT_KEY$5 = `.${DATA_KEY$5}`;
const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
const TAB_KEY = 'Tab';
const TAB_NAV_FORWARD = 'forward';
const TAB_NAV_BACKWARD = 'backward';
const Default$7 = {
  autofocus: true,
  trapElement: null // The element to trap focus inside of
};
const DefaultType$7 = {
  autofocus: 'boolean',
  trapElement: 'element'
};

/**
 * Class definition
 */

class FocusTrap extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
    this._isActive = false;
    this._lastTabNavDirection = null;
  }

  // Getters
  static get Default() {
    return Default$7;
  }
  static get DefaultType() {
    return DefaultType$7;
  }
  static get NAME() {
    return NAME$8;
  }

  // Public
  activate() {
    if (this._isActive) {
      return;
    }
    if (this._config.autofocus) {
      this._config.trapElement.focus();
    }
    EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
    EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
    EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
    this._isActive = true;
  }
  deactivate() {
    if (!this._isActive) {
      return;
    }
    this._isActive = false;
    EventHandler.off(document, EVENT_KEY$5);
  }

  // Private
  _handleFocusin(event) {
    const {
      trapElement
    } = this._config;
    if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
      return;
    }
    const elements = SelectorEngine.focusableChildren(trapElement);
    if (elements.length === 0) {
      trapElement.focus();
    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
      elements[elements.length - 1].focus();
    } else {
      elements[0].focus();
    }
  }
  _handleKeydown(event) {
    if (event.key !== TAB_KEY) {
      return;
    }
    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
const SELECTOR_STICKY_CONTENT = '.sticky-top';
const PROPERTY_PADDING = 'padding-right';
const PROPERTY_MARGIN = 'margin-right';

/**
 * Class definition
 */

class ScrollBarHelper {
  constructor() {
    this._element = document.body;
  }

  // Public
  getWidth() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
    const documentWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
  }
  hide() {
    const width = this.getWidth();
    this._disableOverFlow();
    // give padding to element to balance the hidden scrollbar width
    this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
    // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
    this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
    this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
  }
  reset() {
    this._resetElementAttributes(this._element, 'overflow');
    this._resetElementAttributes(this._element, PROPERTY_PADDING);
    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }

  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, 'overflow');
    this._element.style.overflow = 'hidden';
  }
  _setElementAttributes(selector, styleProperty, callback) {
    const scrollbarWidth = this.getWidth();
    const manipulationCallBack = element => {
      if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
        return;
      }
      this._saveInitialAttribute(element, styleProperty);
      const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
      element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _saveInitialAttribute(element, styleProperty) {
    const actualValue = element.style.getPropertyValue(styleProperty);
    if (actualValue) {
      Manipulator.setDataAttribute(element, styleProperty, actualValue);
    }
  }
  _resetElementAttributes(selector, styleProperty) {
    const manipulationCallBack = element => {
      const value = Manipulator.getDataAttribute(element, styleProperty);
      // We only want to remove the property if the value is `null`; the value can also be zero
      if (value === null) {
        element.style.removeProperty(styleProperty);
        return;
      }
      Manipulator.removeDataAttribute(element, styleProperty);
      element.style.setProperty(styleProperty, value);
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _applyManipulationCallback(selector, callBack) {
    if (isElement(selector)) {
      callBack(selector);
      return;
    }
    for (const sel of SelectorEngine.find(selector, this._element)) {
      callBack(sel);
    }
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$7 = 'modal';
const DATA_KEY$4 = 'bs.modal';
const EVENT_KEY$4 = `.${DATA_KEY$4}`;
const DATA_API_KEY$2 = '.data-api';
const ESCAPE_KEY$1 = 'Escape';
const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
const CLASS_NAME_OPEN = 'modal-open';
const CLASS_NAME_FADE$3 = 'fade';
const CLASS_NAME_SHOW$4 = 'show';
const CLASS_NAME_STATIC = 'modal-static';
const OPEN_SELECTOR$1 = '.modal.show';
const SELECTOR_DIALOG = '.modal-dialog';
const SELECTOR_MODAL_BODY = '.modal-body';
const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
const Default$6 = {
  backdrop: true,
  focus: true,
  keyboard: true
};
const DefaultType$6 = {
  backdrop: '(boolean|string)',
  focus: 'boolean',
  keyboard: 'boolean'
};

/**
 * Class definition
 */

class Modal extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._isShown = false;
    this._isTransitioning = false;
    this._scrollBar = new ScrollBarHelper();
    this._addEventListeners();
  }

  // Getters
  static get Default() {
    return Default$6;
  }
  static get DefaultType() {
    return DefaultType$6;
  }
  static get NAME() {
    return NAME$7;
  }

  // Public
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._isTransitioning = true;
    this._scrollBar.hide();
    document.body.classList.add(CLASS_NAME_OPEN);
    this._adjustDialog();
    this._backdrop.show(() => this._showElement(relatedTarget));
  }
  hide() {
    if (!this._isShown || this._isTransitioning) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._isShown = false;
    this._isTransitioning = true;
    this._focustrap.deactivate();
    this._element.classList.remove(CLASS_NAME_SHOW$4);
    this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
  }
  dispose() {
    EventHandler.off(window, EVENT_KEY$4);
    EventHandler.off(this._dialog, EVENT_KEY$4);
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }

  // Private
  _initializeBackDrop() {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _showElement(relatedTarget) {
    // try to append dynamic modal
    if (!document.body.contains(this._element)) {
      document.body.append(this._element);
    }
    this._element.style.display = 'block';
    this._element.removeAttribute('aria-hidden');
    this._element.setAttribute('aria-modal', true);
    this._element.setAttribute('role', 'dialog');
    this._element.scrollTop = 0;
    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW$4);
    const transitionComplete = () => {
      if (this._config.focus) {
        this._focustrap.activate();
      }
      this._isTransitioning = false;
      EventHandler.trigger(this._element, EVENT_SHOWN$4, {
        relatedTarget
      });
    };
    this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
      if (event.key !== ESCAPE_KEY$1) {
        return;
      }
      if (this._config.keyboard) {
        this.hide();
        return;
      }
      this._triggerBackdropTransition();
    });
    EventHandler.on(window, EVENT_RESIZE$1, () => {
      if (this._isShown && !this._isTransitioning) {
        this._adjustDialog();
      }
    });
    EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
      // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
      EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
        if (this._element !== event.target || this._element !== event2.target) {
          return;
        }
        if (this._config.backdrop === 'static') {
          this._triggerBackdropTransition();
          return;
        }
        if (this._config.backdrop) {
          this.hide();
        }
      });
    });
  }
  _hideModal() {
    this._element.style.display = 'none';
    this._element.setAttribute('aria-hidden', true);
    this._element.removeAttribute('aria-modal');
    this._element.removeAttribute('role');
    this._isTransitioning = false;
    this._backdrop.hide(() => {
      document.body.classList.remove(CLASS_NAME_OPEN);
      this._resetAdjustments();
      this._scrollBar.reset();
      EventHandler.trigger(this._element, EVENT_HIDDEN$4);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_FADE$3);
  }
  _triggerBackdropTransition() {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const initialOverflowY = this._element.style.overflowY;
    // return if the following background transition hasn't yet completed
    if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
      return;
    }
    if (!isModalOverflowing) {
      this._element.style.overflowY = 'hidden';
    }
    this._element.classList.add(CLASS_NAME_STATIC);
    this._queueCallback(() => {
      this._element.classList.remove(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.style.overflowY = initialOverflowY;
      }, this._dialog);
    }, this._dialog);
    this._element.focus();
  }

  /**
   * The following methods are used to handle overflowing modals
   */

  _adjustDialog() {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const scrollbarWidth = this._scrollBar.getWidth();
    const isBodyOverflowing = scrollbarWidth > 0;
    if (isBodyOverflowing && !isModalOverflowing) {
      const property = isRTL() ? 'paddingLeft' : 'paddingRight';
      this._element.style[property] = `${scrollbarWidth}px`;
    }
    if (!isBodyOverflowing && isModalOverflowing) {
      const property = isRTL() ? 'paddingRight' : 'paddingLeft';
      this._element.style[property] = `${scrollbarWidth}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = '';
    this._element.style.paddingRight = '';
  }

  // Static
  static jQueryInterface(config, relatedTarget) {
    return this.each(function () {
      const data = Modal.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](relatedTarget);
    });
  }
}

/**
 * Data API implementation
 */
exports.Modal = Modal;
EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
  const target = SelectorEngine.getElementFromSelector(this);
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }
  EventHandler.one(target, EVENT_SHOW$4, showEvent => {
    if (showEvent.defaultPrevented) {
      // only register focus restorer if modal will actually get shown
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$4, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
  });

  // avoid conflict when clicking modal toggler while another one is open
  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
  if (alreadyOpen) {
    Modal.getInstance(alreadyOpen).hide();
  }
  const data = Modal.getOrCreateInstance(target);
  data.toggle(this);
});
enableDismissTrigger(Modal);

/**
 * jQuery
 */

defineJQueryPlugin(Modal);

/**
 * --------------------------------------------------------------------------
 * Bootstrap offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$6 = 'offcanvas';
const DATA_KEY$3 = 'bs.offcanvas';
const EVENT_KEY$3 = `.${DATA_KEY$3}`;
const DATA_API_KEY$1 = '.data-api';
const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
const ESCAPE_KEY = 'Escape';
const CLASS_NAME_SHOW$3 = 'show';
const CLASS_NAME_SHOWING$1 = 'showing';
const CLASS_NAME_HIDING = 'hiding';
const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
const OPEN_SELECTOR = '.offcanvas.show';
const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
const Default$5 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
const DefaultType$5 = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  scroll: 'boolean'
};

/**
 * Class definition
 */

class Offcanvas extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._isShown = false;
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._addEventListeners();
  }

  // Getters
  static get Default() {
    return Default$5;
  }
  static get DefaultType() {
    return DefaultType$5;
  }
  static get NAME() {
    return NAME$6;
  }

  // Public
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._backdrop.show();
    if (!this._config.scroll) {
      new ScrollBarHelper().hide();
    }
    this._element.setAttribute('aria-modal', true);
    this._element.setAttribute('role', 'dialog');
    this._element.classList.add(CLASS_NAME_SHOWING$1);
    const completeCallBack = () => {
      if (!this._config.scroll || this._config.backdrop) {
        this._focustrap.activate();
      }
      this._element.classList.add(CLASS_NAME_SHOW$3);
      this._element.classList.remove(CLASS_NAME_SHOWING$1);
      EventHandler.trigger(this._element, EVENT_SHOWN$3, {
        relatedTarget
      });
    };
    this._queueCallback(completeCallBack, this._element, true);
  }
  hide() {
    if (!this._isShown) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._focustrap.deactivate();
    this._element.blur();
    this._isShown = false;
    this._element.classList.add(CLASS_NAME_HIDING);
    this._backdrop.hide();
    const completeCallback = () => {
      this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      if (!this._config.scroll) {
        new ScrollBarHelper().reset();
      }
      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
    };
    this._queueCallback(completeCallback, this._element, true);
  }
  dispose() {
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }

  // Private
  _initializeBackDrop() {
    const clickCallback = () => {
      if (this._config.backdrop === 'static') {
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
        return;
      }
      this.hide();
    };

    // 'static' option will be translated to true, and booleans will keep their value
    const isVisible = Boolean(this._config.backdrop);
    return new Backdrop({
      className: CLASS_NAME_BACKDROP,
      isVisible,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: isVisible ? clickCallback : null
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
      if (event.key !== ESCAPE_KEY) {
        return;
      }
      if (this._config.keyboard) {
        this.hide();
        return;
      }
      EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
    });
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Offcanvas.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}

/**
 * Data API implementation
 */
exports.Offcanvas = Offcanvas;
EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
  const target = SelectorEngine.getElementFromSelector(this);
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  EventHandler.one(target, EVENT_HIDDEN$3, () => {
    // focus on trigger when it is closed
    if (isVisible(this)) {
      this.focus();
    }
  });

  // avoid conflict when clicking a toggler of an offcanvas, while another is open
  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
  if (alreadyOpen && alreadyOpen !== target) {
    Offcanvas.getInstance(alreadyOpen).hide();
  }
  const data = Offcanvas.getOrCreateInstance(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
  for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
    Offcanvas.getOrCreateInstance(selector).show();
  }
});
EventHandler.on(window, EVENT_RESIZE, () => {
  for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
    if (getComputedStyle(element).position !== 'fixed') {
      Offcanvas.getOrCreateInstance(element).hide();
    }
  }
});
enableDismissTrigger(Offcanvas);

/**
 * jQuery
 */

defineJQueryPlugin(Offcanvas);

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

// js-docs-start allow-list
const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
const DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  dd: [],
  div: [],
  dl: [],
  dt: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
// js-docs-end allow-list

const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

/**
 * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
 * contexts.
 *
 * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
 */
// eslint-disable-next-line unicorn/better-regex
const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
const allowedAttribute = (attribute, allowedAttributeList) => {
  const attributeName = attribute.nodeName.toLowerCase();
  if (allowedAttributeList.includes(attributeName)) {
    if (uriAttributes.has(attributeName)) {
      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
    }
    return true;
  }

  // Check if a regular expression validates the attribute.
  return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
  if (!unsafeHtml.length) {
    return unsafeHtml;
  }
  if (sanitizeFunction && typeof sanitizeFunction === 'function') {
    return sanitizeFunction(unsafeHtml);
  }
  const domParser = new window.DOMParser();
  const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
  const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
  for (const element of elements) {
    const elementName = element.nodeName.toLowerCase();
    if (!Object.keys(allowList).includes(elementName)) {
      element.remove();
      continue;
    }
    const attributeList = [].concat(...element.attributes);
    const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
    for (const attribute of attributeList) {
      if (!allowedAttribute(attribute, allowedAttributes)) {
        element.removeAttribute(attribute.nodeName);
      }
    }
  }
  return createdDocument.body.innerHTML;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/template-factory.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$5 = 'TemplateFactory';
const Default$4 = {
  allowList: DefaultAllowlist,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: '',
  html: false,
  sanitize: true,
  sanitizeFn: null,
  template: '<div></div>'
};
const DefaultType$4 = {
  allowList: 'object',
  content: 'object',
  extraClass: '(string|function)',
  html: 'boolean',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  template: 'string'
};
const DefaultContentType = {
  entry: '(string|element|function|null)',
  selector: '(string|element)'
};

/**
 * Class definition
 */

class TemplateFactory extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
  }

  // Getters
  static get Default() {
    return Default$4;
  }
  static get DefaultType() {
    return DefaultType$4;
  }
  static get NAME() {
    return NAME$5;
  }

  // Public
  getContent() {
    return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(content) {
    this._checkContent(content);
    this._config.content = {
      ...this._config.content,
      ...content
    };
    return this;
  }
  toHtml() {
    const templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
    for (const [selector, text] of Object.entries(this._config.content)) {
      this._setContent(templateWrapper, text, selector);
    }
    const template = templateWrapper.children[0];
    const extraClass = this._resolvePossibleFunction(this._config.extraClass);
    if (extraClass) {
      template.classList.add(...extraClass.split(' '));
    }
    return template;
  }

  // Private
  _typeCheckConfig(config) {
    super._typeCheckConfig(config);
    this._checkContent(config.content);
  }
  _checkContent(arg) {
    for (const [selector, content] of Object.entries(arg)) {
      super._typeCheckConfig({
        selector,
        entry: content
      }, DefaultContentType);
    }
  }
  _setContent(template, content, selector) {
    const templateElement = SelectorEngine.findOne(selector, template);
    if (!templateElement) {
      return;
    }
    content = this._resolvePossibleFunction(content);
    if (!content) {
      templateElement.remove();
      return;
    }
    if (isElement(content)) {
      this._putElementInTemplate(getElement(content), templateElement);
      return;
    }
    if (this._config.html) {
      templateElement.innerHTML = this._maybeSanitize(content);
      return;
    }
    templateElement.textContent = content;
  }
  _maybeSanitize(arg) {
    return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
  }
  _resolvePossibleFunction(arg) {
    return execute(arg, [this]);
  }
  _putElementInTemplate(element, templateElement) {
    if (this._config.html) {
      templateElement.innerHTML = '';
      templateElement.append(element);
      return;
    }
    templateElement.textContent = element.textContent;
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$4 = 'tooltip';
const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
const CLASS_NAME_FADE$2 = 'fade';
const CLASS_NAME_MODAL = 'modal';
const CLASS_NAME_SHOW$2 = 'show';
const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
const EVENT_MODAL_HIDE = 'hide.bs.modal';
const TRIGGER_HOVER = 'hover';
const TRIGGER_FOCUS = 'focus';
const TRIGGER_CLICK = 'click';
const TRIGGER_MANUAL = 'manual';
const EVENT_HIDE$2 = 'hide';
const EVENT_HIDDEN$2 = 'hidden';
const EVENT_SHOW$2 = 'show';
const EVENT_SHOWN$2 = 'shown';
const EVENT_INSERTED = 'inserted';
const EVENT_CLICK$1 = 'click';
const EVENT_FOCUSIN$1 = 'focusin';
const EVENT_FOCUSOUT$1 = 'focusout';
const EVENT_MOUSEENTER = 'mouseenter';
const EVENT_MOUSELEAVE = 'mouseleave';
const AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL() ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL() ? 'right' : 'left'
};
const Default$3 = {
  allowList: DefaultAllowlist,
  animation: true,
  boundary: 'clippingParents',
  container: false,
  customClass: '',
  delay: 0,
  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
  html: false,
  offset: [0, 6],
  placement: 'top',
  popperConfig: null,
  sanitize: true,
  sanitizeFn: null,
  selector: false,
  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
  title: '',
  trigger: 'hover focus'
};
const DefaultType$3 = {
  allowList: 'object',
  animation: 'boolean',
  boundary: '(string|element)',
  container: '(string|element|boolean)',
  customClass: '(string|function)',
  delay: '(number|object)',
  fallbackPlacements: 'array',
  html: 'boolean',
  offset: '(array|string|function)',
  placement: '(string|function)',
  popperConfig: '(null|object|function)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  selector: '(string|boolean)',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string'
};

/**
 * Class definition
 */

class Tooltip extends BaseComponent {
  constructor(element, config) {
    if (typeof Popper === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
    }
    super(element, config);

    // Private
    this._isEnabled = true;
    this._timeout = 0;
    this._isHovered = null;
    this._activeTrigger = {};
    this._popper = null;
    this._templateFactory = null;
    this._newContent = null;

    // Protected
    this.tip = null;
    this._setListeners();
    if (!this._config.selector) {
      this._fixTitle();
    }
  }

  // Getters
  static get Default() {
    return Default$3;
  }
  static get DefaultType() {
    return DefaultType$3;
  }
  static get NAME() {
    return NAME$4;
  }

  // Public
  enable() {
    this._isEnabled = true;
  }
  disable() {
    this._isEnabled = false;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (!this._isEnabled) {
      return;
    }
    this._activeTrigger.click = !this._activeTrigger.click;
    if (this._isShown()) {
      this._leave();
      return;
    }
    this._enter();
  }
  dispose() {
    clearTimeout(this._timeout);
    EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    if (this._element.getAttribute('data-bs-original-title')) {
      this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
    }
    this._disposePopper();
    super.dispose();
  }
  show() {
    if (this._element.style.display === 'none') {
      throw new Error('Please use show on visible elements');
    }
    if (!(this._isWithContent() && this._isEnabled)) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
    const shadowRoot = findShadowRoot(this._element);
    const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
    if (showEvent.defaultPrevented || !isInTheDom) {
      return;
    }

    // TODO: v6 remove this or make it optional
    this._disposePopper();
    const tip = this._getTipElement();
    this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
    const {
      container
    } = this._config;
    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      container.append(tip);
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
    }
    this._popper = this._createPopper(tip);
    tip.classList.add(CLASS_NAME_SHOW$2);

    // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
    if ('ontouchstart' in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.on(element, 'mouseover', noop);
      }
    }
    const complete = () => {
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
      if (this._isHovered === false) {
        this._leave();
      }
      this._isHovered = false;
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown()) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
    if (hideEvent.defaultPrevented) {
      return;
    }
    const tip = this._getTipElement();
    tip.classList.remove(CLASS_NAME_SHOW$2);

    // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ('ontouchstart' in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.off(element, 'mouseover', noop);
      }
    }
    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;
    this._isHovered = null; // it is a trick to support manual triggering

    const complete = () => {
      if (this._isWithActiveTrigger()) {
        return;
      }
      if (!this._isHovered) {
        this._disposePopper();
      }
      this._element.removeAttribute('aria-describedby');
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  update() {
    if (this._popper) {
      this._popper.update();
    }
  }

  // Protected
  _isWithContent() {
    return Boolean(this._getTitle());
  }
  _getTipElement() {
    if (!this.tip) {
      this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
    }
    return this.tip;
  }
  _createTipElement(content) {
    const tip = this._getTemplateFactory(content).toHtml();

    // TODO: remove this check in v6
    if (!tip) {
      return null;
    }
    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
    // TODO: v6 the following can be achieved with CSS only
    tip.classList.add(`bs-${this.constructor.NAME}-auto`);
    const tipId = getUID(this.constructor.NAME).toString();
    tip.setAttribute('id', tipId);
    if (this._isAnimated()) {
      tip.classList.add(CLASS_NAME_FADE$2);
    }
    return tip;
  }
  setContent(content) {
    this._newContent = content;
    if (this._isShown()) {
      this._disposePopper();
      this.show();
    }
  }
  _getTemplateFactory(content) {
    if (this._templateFactory) {
      this._templateFactory.changeContent(content);
    } else {
      this._templateFactory = new TemplateFactory({
        ...this._config,
        // the `content` var has to be after `this._config`
        // to override config.content in case of popover
        content,
        extraClass: this._resolvePossibleFunction(this._config.customClass)
      });
    }
    return this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [SELECTOR_TOOLTIP_INNER]: this._getTitle()
    };
  }
  _getTitle() {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
  }

  // Private
  _initializeOnDelegatedTarget(event) {
    return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
  }
  _isAnimated() {
    return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
  }
  _createPopper(tip) {
    const placement = execute(this._config.placement, [this, tip, this._element]);
    const attachment = AttachmentMap[placement.toUpperCase()];
    return Popper.createPopper(this._element, tip, this._getPopperConfig(attachment));
  }
  _getOffset() {
    const {
      offset
    } = this._config;
    if (typeof offset === 'string') {
      return offset.split(',').map(value => Number.parseInt(value, 10));
    }
    if (typeof offset === 'function') {
      return popperData => offset(popperData, this._element);
    }
    return offset;
  }
  _resolvePossibleFunction(arg) {
    return execute(arg, [this._element]);
  }
  _getPopperConfig(attachment) {
    const defaultBsPopperConfig = {
      placement: attachment,
      modifiers: [{
        name: 'flip',
        options: {
          fallbackPlacements: this._config.fallbackPlacements
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }, {
        name: 'preventOverflow',
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: 'arrow',
        options: {
          element: `.${this.constructor.NAME}-arrow`
        }
      }, {
        name: 'preSetPlacement',
        enabled: true,
        phase: 'beforeMain',
        fn: data => {
          // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
          // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
          this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
        }
      }]
    };
    return {
      ...defaultBsPopperConfig,
      ...execute(this._config.popperConfig, [defaultBsPopperConfig])
    };
  }
  _setListeners() {
    const triggers = this._config.trigger.split(' ');
    for (const trigger of triggers) {
      if (trigger === 'click') {
        EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
          const context = this._initializeOnDelegatedTarget(event);
          context.toggle();
        });
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
        const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
        EventHandler.on(this._element, eventIn, this._config.selector, event => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
          context._enter();
        });
        EventHandler.on(this._element, eventOut, this._config.selector, event => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
          context._leave();
        });
      }
    }
    this._hideModalHandler = () => {
      if (this._element) {
        this.hide();
      }
    };
    EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
  }
  _fixTitle() {
    const title = this._element.getAttribute('title');
    if (!title) {
      return;
    }
    if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
      this._element.setAttribute('aria-label', title);
    }
    this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
    this._element.removeAttribute('title');
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = true;
      return;
    }
    this._isHovered = true;
    this._setTimeout(() => {
      if (this._isHovered) {
        this.show();
      }
    }, this._config.delay.show);
  }
  _leave() {
    if (this._isWithActiveTrigger()) {
      return;
    }
    this._isHovered = false;
    this._setTimeout(() => {
      if (!this._isHovered) {
        this.hide();
      }
    }, this._config.delay.hide);
  }
  _setTimeout(handler, timeout) {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(handler, timeout);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(true);
  }
  _getConfig(config) {
    const dataAttributes = Manipulator.getDataAttributes(this._element);
    for (const dataAttribute of Object.keys(dataAttributes)) {
      if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
        delete dataAttributes[dataAttribute];
      }
    }
    config = {
      ...dataAttributes,
      ...(typeof config === 'object' && config ? config : {})
    };
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  _configAfterMerge(config) {
    config.container = config.container === false ? document.body : getElement(config.container);
    if (typeof config.delay === 'number') {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }
    if (typeof config.title === 'number') {
      config.title = config.title.toString();
    }
    if (typeof config.content === 'number') {
      config.content = config.content.toString();
    }
    return config;
  }
  _getDelegateConfig() {
    const config = {};
    for (const [key, value] of Object.entries(this._config)) {
      if (this.constructor.Default[key] !== value) {
        config[key] = value;
      }
    }
    config.selector = false;
    config.trigger = 'manual';

    // In the future can be replaced with:
    // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
    // `Object.fromEntries(keysWithDifferentValues)`
    return config;
  }
  _disposePopper() {
    if (this._popper) {
      this._popper.destroy();
      this._popper = null;
    }
    if (this.tip) {
      this.tip.remove();
      this.tip = null;
    }
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Tooltip.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}

/**
 * jQuery
 */
exports.Tooltip = Tooltip;
defineJQueryPlugin(Tooltip);

/**
 * --------------------------------------------------------------------------
 * Bootstrap popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$3 = 'popover';
const SELECTOR_TITLE = '.popover-header';
const SELECTOR_CONTENT = '.popover-body';
const Default$2 = {
  ...Tooltip.Default,
  content: '',
  offset: [0, 8],
  placement: 'right',
  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
  trigger: 'click'
};
const DefaultType$2 = {
  ...Tooltip.DefaultType,
  content: '(null|string|element|function)'
};

/**
 * Class definition
 */

class Popover extends Tooltip {
  // Getters
  static get Default() {
    return Default$2;
  }
  static get DefaultType() {
    return DefaultType$2;
  }
  static get NAME() {
    return NAME$3;
  }

  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }

  // Private
  _getContentForTemplate() {
    return {
      [SELECTOR_TITLE]: this._getTitle(),
      [SELECTOR_CONTENT]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Popover.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}

/**
 * jQuery
 */
exports.Popover = Popover;
defineJQueryPlugin(Popover);

/**
 * --------------------------------------------------------------------------
 * Bootstrap scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$2 = 'scrollspy';
const DATA_KEY$2 = 'bs.scrollspy';
const EVENT_KEY$2 = `.${DATA_KEY$2}`;
const DATA_API_KEY = '.data-api';
const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
const EVENT_CLICK = `click${EVENT_KEY$2}`;
const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
const CLASS_NAME_ACTIVE$1 = 'active';
const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
const SELECTOR_TARGET_LINKS = '[href]';
const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
const SELECTOR_NAV_LINKS = '.nav-link';
const SELECTOR_NAV_ITEMS = '.nav-item';
const SELECTOR_LIST_ITEMS = '.list-group-item';
const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
const SELECTOR_DROPDOWN = '.dropdown';
const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
const Default$1 = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: '0px 0px -25%',
  smoothScroll: false,
  target: null,
  threshold: [0.1, 0.5, 1]
};
const DefaultType$1 = {
  offset: '(number|null)',
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: 'string',
  smoothScroll: 'boolean',
  target: 'element',
  threshold: 'array'
};

/**
 * Class definition
 */

class ScrollSpy extends BaseComponent {
  constructor(element, config) {
    super(element, config);

    // this._element is the observablesContainer and config.target the menu links wrapper
    this._targetLinks = new Map();
    this._observableSections = new Map();
    this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
    this._activeTarget = null;
    this._observer = null;
    this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    };
    this.refresh(); // initialize
  }

  // Getters
  static get Default() {
    return Default$1;
  }
  static get DefaultType() {
    return DefaultType$1;
  }
  static get NAME() {
    return NAME$2;
  }

  // Public
  refresh() {
    this._initializeTargetsAndObservables();
    this._maybeEnableSmoothScroll();
    if (this._observer) {
      this._observer.disconnect();
    } else {
      this._observer = this._getNewObserver();
    }
    for (const section of this._observableSections.values()) {
      this._observer.observe(section);
    }
  }
  dispose() {
    this._observer.disconnect();
    super.dispose();
  }

  // Private
  _configAfterMerge(config) {
    // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
    config.target = getElement(config.target) || document.body;

    // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
    config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
    if (typeof config.threshold === 'string') {
      config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
    }
    return config;
  }
  _maybeEnableSmoothScroll() {
    if (!this._config.smoothScroll) {
      return;
    }

    // unregister any previous listeners
    EventHandler.off(this._config.target, EVENT_CLICK);
    EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
      const observableSection = this._observableSections.get(event.target.hash);
      if (observableSection) {
        event.preventDefault();
        const root = this._rootElement || window;
        const height = observableSection.offsetTop - this._element.offsetTop;
        if (root.scrollTo) {
          root.scrollTo({
            top: height,
            behavior: 'smooth'
          });
          return;
        }

        // Chrome 60 doesn't support `scrollTo`
        root.scrollTop = height;
      }
    });
  }
  _getNewObserver() {
    const options = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin
    };
    return new IntersectionObserver(entries => this._observerCallback(entries), options);
  }

  // The logic of selection
  _observerCallback(entries) {
    const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
    const activate = entry => {
      this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
      this._process(targetElement(entry));
    };
    const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
    const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = parentScrollTop;
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        this._activeTarget = null;
        this._clearActiveClass(targetElement(entry));
        continue;
      }
      const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      // if we are scrolling down, pick the bigger offsetTop
      if (userScrollsDown && entryIsLowerThanPrevious) {
        activate(entry);
        // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
        if (!parentScrollTop) {
          return;
        }
        continue;
      }

      // if we are scrolling up, pick the smallest offsetTop
      if (!userScrollsDown && !entryIsLowerThanPrevious) {
        activate(entry);
      }
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = new Map();
    this._observableSections = new Map();
    const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
    for (const anchor of targetLinks) {
      // ensure that the anchor has an id and is not disabled
      if (!anchor.hash || isDisabled(anchor)) {
        continue;
      }
      const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

      // ensure that the observableSection exists & is visible
      if (isVisible(observableSection)) {
        this._targetLinks.set(decodeURI(anchor.hash), anchor);
        this._observableSections.set(anchor.hash, observableSection);
      }
    }
  }
  _process(target) {
    if (this._activeTarget === target) {
      return;
    }
    this._clearActiveClass(this._config.target);
    this._activeTarget = target;
    target.classList.add(CLASS_NAME_ACTIVE$1);
    this._activateParents(target);
    EventHandler.trigger(this._element, EVENT_ACTIVATE, {
      relatedTarget: target
    });
  }
  _activateParents(target) {
    // Activate dropdown parents
    if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
      return;
    }
    for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
      // Set triggered links parents as active
      // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
      for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
        item.classList.add(CLASS_NAME_ACTIVE$1);
      }
    }
  }
  _clearActiveClass(parent) {
    parent.classList.remove(CLASS_NAME_ACTIVE$1);
    const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
    for (const node of activeNodes) {
      node.classList.remove(CLASS_NAME_ACTIVE$1);
    }
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = ScrollSpy.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}

/**
 * Data API implementation
 */
exports.ScrollSpy = ScrollSpy;
EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
  for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
    ScrollSpy.getOrCreateInstance(spy);
  }
});

/**
 * jQuery
 */

defineJQueryPlugin(ScrollSpy);

/**
 * --------------------------------------------------------------------------
 * Bootstrap tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME$1 = 'tab';
const DATA_KEY$1 = 'bs.tab';
const EVENT_KEY$1 = `.${DATA_KEY$1}`;
const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
const ARROW_LEFT_KEY = 'ArrowLeft';
const ARROW_RIGHT_KEY = 'ArrowRight';
const ARROW_UP_KEY = 'ArrowUp';
const ARROW_DOWN_KEY = 'ArrowDown';
const HOME_KEY = 'Home';
const END_KEY = 'End';
const CLASS_NAME_ACTIVE = 'active';
const CLASS_NAME_FADE$1 = 'fade';
const CLASS_NAME_SHOW$1 = 'show';
const CLASS_DROPDOWN = 'dropdown';
const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
const SELECTOR_OUTER = '.nav-item, .list-group-item';
const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

/**
 * Class definition
 */

class Tab extends BaseComponent {
  constructor(element) {
    super(element);
    this._parent = this._element.closest(SELECTOR_TAB_PANEL);
    if (!this._parent) {
      return;
      // TODO: should throw exception in v6
      // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
    }

    // Set up initial aria attributes
    this._setInitialAttributes(this._parent, this._getChildren());
    EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
  }

  // Getters
  static get NAME() {
    return NAME$1;
  }

  // Public
  show() {
    // Shows this elem and deactivate the active sibling if exists
    const innerElem = this._element;
    if (this._elemIsActive(innerElem)) {
      return;
    }

    // Search for active tab on same parent to deactivate it
    const active = this._getActiveElem();
    const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
      relatedTarget: innerElem
    }) : null;
    const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
      relatedTarget: active
    });
    if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
      return;
    }
    this._deactivate(active, innerElem);
    this._activate(innerElem, active);
  }

  // Private
  _activate(element, relatedElem) {
    if (!element) {
      return;
    }
    element.classList.add(CLASS_NAME_ACTIVE);
    this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

    const complete = () => {
      if (element.getAttribute('role') !== 'tab') {
        element.classList.add(CLASS_NAME_SHOW$1);
        return;
      }
      element.removeAttribute('tabindex');
      element.setAttribute('aria-selected', true);
      this._toggleDropDown(element, true);
      EventHandler.trigger(element, EVENT_SHOWN$1, {
        relatedTarget: relatedElem
      });
    };
    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
  }
  _deactivate(element, relatedElem) {
    if (!element) {
      return;
    }
    element.classList.remove(CLASS_NAME_ACTIVE);
    element.blur();
    this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

    const complete = () => {
      if (element.getAttribute('role') !== 'tab') {
        element.classList.remove(CLASS_NAME_SHOW$1);
        return;
      }
      element.setAttribute('aria-selected', false);
      element.setAttribute('tabindex', '-1');
      this._toggleDropDown(element, false);
      EventHandler.trigger(element, EVENT_HIDDEN$1, {
        relatedTarget: relatedElem
      });
    };
    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
  }
  _keydown(event) {
    if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
      return;
    }
    event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
    event.preventDefault();
    const children = this._getChildren().filter(element => !isDisabled(element));
    let nextActiveElement;
    if ([HOME_KEY, END_KEY].includes(event.key)) {
      nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
    } else {
      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
      nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
    }
    if (nextActiveElement) {
      nextActiveElement.focus({
        preventScroll: true
      });
      Tab.getOrCreateInstance(nextActiveElement).show();
    }
  }
  _getChildren() {
    // collection of inner elements
    return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find(child => this._elemIsActive(child)) || null;
  }
  _setInitialAttributes(parent, children) {
    this._setAttributeIfNotExists(parent, 'role', 'tablist');
    for (const child of children) {
      this._setInitialAttributesOnChild(child);
    }
  }
  _setInitialAttributesOnChild(child) {
    child = this._getInnerElement(child);
    const isActive = this._elemIsActive(child);
    const outerElem = this._getOuterElement(child);
    child.setAttribute('aria-selected', isActive);
    if (outerElem !== child) {
      this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
    }
    if (!isActive) {
      child.setAttribute('tabindex', '-1');
    }
    this._setAttributeIfNotExists(child, 'role', 'tab');

    // set attributes to the related panel too
    this._setInitialAttributesOnTargetPanel(child);
  }
  _setInitialAttributesOnTargetPanel(child) {
    const target = SelectorEngine.getElementFromSelector(child);
    if (!target) {
      return;
    }
    this._setAttributeIfNotExists(target, 'role', 'tabpanel');
    if (child.id) {
      this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
    }
  }
  _toggleDropDown(element, open) {
    const outerElem = this._getOuterElement(element);
    if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
      return;
    }
    const toggle = (selector, className) => {
      const element = SelectorEngine.findOne(selector, outerElem);
      if (element) {
        element.classList.toggle(className, open);
      }
    };
    toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
    toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
    outerElem.setAttribute('aria-expanded', open);
  }
  _setAttributeIfNotExists(element, attribute, value) {
    if (!element.hasAttribute(attribute)) {
      element.setAttribute(attribute, value);
    }
  }
  _elemIsActive(elem) {
    return elem.classList.contains(CLASS_NAME_ACTIVE);
  }

  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(elem) {
    return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
  }

  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(elem) {
    return elem.closest(SELECTOR_OUTER) || elem;
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Tab.getOrCreateInstance(this);
      if (typeof config !== 'string') {
        return;
      }
      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}

/**
 * Data API implementation
 */
exports.Tab = Tab;
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  Tab.getOrCreateInstance(this).show();
});

/**
 * Initialize on focus
 */
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
    Tab.getOrCreateInstance(element);
  }
});
/**
 * jQuery
 */

defineJQueryPlugin(Tab);

/**
 * --------------------------------------------------------------------------
 * Bootstrap toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const NAME = 'toast';
const DATA_KEY = 'bs.toast';
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
const CLASS_NAME_SHOW = 'show';
const CLASS_NAME_SHOWING = 'showing';
const DefaultType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};
const Default = {
  animation: true,
  autohide: true,
  delay: 5000
};

/**
 * Class definition
 */

class Toast extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._timeout = null;
    this._hasMouseInteraction = false;
    this._hasKeyboardInteraction = false;
    this._setListeners();
  }

  // Getters
  static get Default() {
    return Default;
  }
  static get DefaultType() {
    return DefaultType;
  }
  static get NAME() {
    return NAME;
  }

  // Public
  show() {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._clearTimeout();
    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }
    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING);
      EventHandler.trigger(this._element, EVENT_SHOWN);
      this._maybeScheduleHide();
    };
    this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown()) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
      this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
      EventHandler.trigger(this._element, EVENT_HIDDEN);
    };
    this._element.classList.add(CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout();
    if (this.isShown()) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }
    super.dispose();
  }
  isShown() {
    return this._element.classList.contains(CLASS_NAME_SHOW);
  }

  // Private

  _maybeScheduleHide() {
    if (!this._config.autohide) {
      return;
    }
    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
      return;
    }
    this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay);
  }
  _onInteraction(event, isInteracting) {
    switch (event.type) {
      case 'mouseover':
      case 'mouseout':
        {
          this._hasMouseInteraction = isInteracting;
          break;
        }
      case 'focusin':
      case 'focusout':
        {
          this._hasKeyboardInteraction = isInteracting;
          break;
        }
    }
    if (isInteracting) {
      this._clearTimeout();
      return;
    }
    const nextElement = event.relatedTarget;
    if (this._element === nextElement || this._element.contains(nextElement)) {
      return;
    }
    this._maybeScheduleHide();
  }
  _setListeners() {
    EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
    EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
  }
  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Toast.getOrCreateInstance(this, config);
      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      }
    });
  }
}

/**
 * Data API implementation
 */
exports.Toast = Toast;
enableDismissTrigger(Toast);

/**
 * jQuery
 */

defineJQueryPlugin(Toast);
},{"@popperjs/core":"S1OH"}],"Q2pJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents a slider input element.
 */
var Slider = exports.Slider = /*#__PURE__*/function () {
  /**
   * Creates a new Slider instance.
   * @param {string} id - The ID of the slider element.
   * @param {() => void} onChangeCallback - A callback function to execute when the slider value changes.
   */
  function Slider(id, onChangeCallback) {
    _classCallCheck(this, Slider);
    _defineProperty(this, "slider", void 0);
    _defineProperty(this, "onChangeCallback", void 0);
    this.slider = document.getElementById(id);
    this.slider.oninput = onChangeCallback;
    this.onChangeCallback = onChangeCallback;
  }
  /**
   * Gets the minimum value of the slider.
   * @returns {number} - The minimum value.
   */
  return _createClass(Slider, [{
    key: "getMin",
    value: function getMin() {
      return parseInt(this.slider.min);
    }
    /**
     * Gets the maximum value of the slider.
     * @returns {number} - The maximum value.
     */
  }, {
    key: "getMax",
    value: function getMax() {
      return parseInt(this.slider.max);
    }
    /**
     * Gets the current value of the slider.
     * @returns {number} - The current value.
     */
  }, {
    key: "getValue",
    value: function getValue() {
      return parseInt(this.slider.value);
    }
    /**
     * Sets the value of the slider.
     * @param {number} value - The desired value.
     */
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.slider.value = String(value);
      this.onChangeCallback();
    }
  }]);
}();
},{}],"GFaE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBox = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents a checkbox element.
 */
var CheckBox = exports.CheckBox = /*#__PURE__*/function () {
  /**
   * Creates a new CheckBox instance.
   * @param {string} id - The ID of the checkbox element.
   * @param {() => void} onChangeCallback - A callback function to execute when the checkbox value changes.
   */
  function CheckBox(id, onChangeCallback) {
    _classCallCheck(this, CheckBox);
    _defineProperty(this, "elem", void 0);
    this.elem = document.getElementById(id);
    this.elem.onchange = onChangeCallback;
  }
  /**
   * Checks whether the checkbox is currently checked.
   * @returns {boolean} - True if checked, false otherwise.
   */
  return _createClass(CheckBox, [{
    key: "isChecked",
    value: function isChecked() {
      return this.elem.checked;
    }
    /**
     * Sets the checkbox to the specified checked state.
     * @param {boolean} checked - The desired checked state (true or false).
     */
  }, {
    key: "setChecked",
    value: function setChecked(checked) {
      this.elem.checked = checked;
    }
  }]);
}();
},{}],"N3UC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Thumbnail = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents a canvas-based thumbnail for an image.
 */
var Thumbnail = exports.Thumbnail = /*#__PURE__*/function () {
  /**
   * Creates a new Thumbnail instance.
   * @param {(filename: string) => void} onClickCallback - A callback function to execute when the thumbnail is clicked.
   * @param {number} imageSize - The desired size (width and height) of the thumbnail canvas.
   */
  function Thumbnail(onClickCallback) {
    var _this = this;
    var imageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    _classCallCheck(this, Thumbnail);
    _defineProperty(this, "a", void 0);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "onClickCallback", void 0);
    _defineProperty(this, "ctx", void 0);
    _defineProperty(this, "image", new Image());
    this.onClickCallback = onClickCallback;
    this.a = document.createElement('a');
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'img-thumbnail m-2 mx-auto d-block';
    this.canvas.width = imageSize;
    this.canvas.height = imageSize;
    this.ctx = this.canvas.getContext('2d');
    this.image.onload = function () {
      return _this.draw();
    };
    this.a.href = '#';
    this.a.onclick = function (_) {
      return false;
    };
    this.a.appendChild(this.canvas);
  }
  /**
   * Sets the image source for the thumbnail.
   * @param {File} file - The image file.
   */
  return _createClass(Thumbnail, [{
    key: "setSource",
    value: function setSource(file) {
      var _this2 = this;
      var reader = new FileReader();
      reader.onload = function () {
        var result = reader.result;
        if (result) {
          _this2.image.src = result.toString();
        }
      };
      reader.readAsDataURL(file);
      this.a.onclick = function () {
        _this2.onClickCallback(file.name);
        return false;
      };
    }
    /**
     * Converts the Thumbnail to an HTML element.
     * @returns {HTMLElement} - The HTML anchor element containing the thumbnail canvas.
     */
  }, {
    key: "toHtml",
    value: function toHtml() {
      return this.a;
    }
    /**
     * Draws the image on the canvas, maintaining aspect ratio and centering it.
     */
  }, {
    key: "draw",
    value: function draw() {
      var scaleX = this.canvas.width / this.image.width;
      var scaleY = this.canvas.height / this.image.height;
      var zoomScale = scaleX < scaleY ? scaleX : scaleY;
      var offX = (this.canvas.width - this.image.width * zoomScale) / 2;
      var offY = (this.canvas.height - this.image.height * zoomScale) / 2;
      this.ctx.fillStyle = 'rgba(0,0,0,1)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.image, offX, offY, this.image.width * zoomScale, this.image.height * zoomScale);
    }
  }]);
}();
},{}],"HqYT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * A JavaScript implementation of the SHA family of hashes - defined in FIPS PUB 180-4, FIPS PUB 202,
 * and SP 800-185 - as well as the corresponding HMAC implementation as defined in FIPS PUB 198-1.
 *
 * Copyright 2008-2023 Brian Turek, 1998-2009 Paul Johnston & Contributors
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 */
const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  n = "ARRAYBUFFER not supported by this environment",
  e = "UINT8ARRAY not supported by this environment";
function r(t, n, e, r) {
  let i, s, o;
  const h = n || [0],
    u = (e = e || 0) >>> 3,
    w = -1 === r ? 3 : 0;
  for (i = 0; i < t.length; i += 1) o = i + u, s = o >>> 2, h.length <= s && h.push(0), h[s] |= t[i] << 8 * (w + r * (o % 4));
  return {
    value: h,
    binLen: 8 * t.length + e
  };
}
function i(i, s, o) {
  switch (s) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (i) {
    case "HEX":
      return function (t, n, e) {
        return function (t, n, e, r) {
          let i, s, o, h;
          if (0 != t.length % 2) throw new Error("String of HEX type must be in byte increments");
          const u = n || [0],
            w = (e = e || 0) >>> 3,
            c = -1 === r ? 3 : 0;
          for (i = 0; i < t.length; i += 2) {
            if (s = parseInt(t.substr(i, 2), 16), isNaN(s)) throw new Error("String of HEX type contains invalid characters");
            for (h = (i >>> 1) + w, o = h >>> 2; u.length <= o;) u.push(0);
            u[o] |= s << 8 * (c + r * (h % 4));
          }
          return {
            value: u,
            binLen: 4 * t.length + e
          };
        }(t, n, e, o);
      };
    case "TEXT":
      return function (t, n, e) {
        return function (t, n, e, r, i) {
          let s,
            o,
            h,
            u,
            w,
            c,
            f,
            a,
            l = 0;
          const A = e || [0],
            E = (r = r || 0) >>> 3;
          if ("UTF8" === n) for (f = -1 === i ? 3 : 0, h = 0; h < t.length; h += 1) for (s = t.charCodeAt(h), o = [], 128 > s ? o.push(s) : 2048 > s ? (o.push(192 | s >>> 6), o.push(128 | 63 & s)) : 55296 > s || 57344 <= s ? o.push(224 | s >>> 12, 128 | s >>> 6 & 63, 128 | 63 & s) : (h += 1, s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(h)), o.push(240 | s >>> 18, 128 | s >>> 12 & 63, 128 | s >>> 6 & 63, 128 | 63 & s)), u = 0; u < o.length; u += 1) {
            for (c = l + E, w = c >>> 2; A.length <= w;) A.push(0);
            A[w] |= o[u] << 8 * (f + i * (c % 4)), l += 1;
          } else for (f = -1 === i ? 2 : 0, a = "UTF16LE" === n && 1 !== i || "UTF16LE" !== n && 1 === i, h = 0; h < t.length; h += 1) {
            for (s = t.charCodeAt(h), !0 === a && (u = 255 & s, s = u << 8 | s >>> 8), c = l + E, w = c >>> 2; A.length <= w;) A.push(0);
            A[w] |= s << 8 * (f + i * (c % 4)), l += 2;
          }
          return {
            value: A,
            binLen: 8 * l + r
          };
        }(t, s, n, e, o);
      };
    case "B64":
      return function (n, e, r) {
        return function (n, e, r, i) {
          let s,
            o,
            h,
            u,
            w,
            c,
            f,
            a = 0;
          const l = e || [0],
            A = (r = r || 0) >>> 3,
            E = -1 === i ? 3 : 0,
            H = n.indexOf("=");
          if (-1 === n.search(/^[a-zA-Z0-9=+/]+$/)) throw new Error("Invalid character in base-64 string");
          if (n = n.replace(/=/g, ""), -1 !== H && H < n.length) throw new Error("Invalid '=' found in base-64 string");
          for (o = 0; o < n.length; o += 4) {
            for (w = n.substr(o, 4), u = 0, h = 0; h < w.length; h += 1) s = t.indexOf(w.charAt(h)), u |= s << 18 - 6 * h;
            for (h = 0; h < w.length - 1; h += 1) {
              for (f = a + A, c = f >>> 2; l.length <= c;) l.push(0);
              l[c] |= (u >>> 16 - 8 * h & 255) << 8 * (E + i * (f % 4)), a += 1;
            }
          }
          return {
            value: l,
            binLen: 8 * a + r
          };
        }(n, e, r, o);
      };
    case "BYTES":
      return function (t, n, e) {
        return function (t, n, e, r) {
          let i, s, o, h;
          const u = n || [0],
            w = (e = e || 0) >>> 3,
            c = -1 === r ? 3 : 0;
          for (s = 0; s < t.length; s += 1) i = t.charCodeAt(s), h = s + w, o = h >>> 2, u.length <= o && u.push(0), u[o] |= i << 8 * (c + r * (h % 4));
          return {
            value: u,
            binLen: 8 * t.length + e
          };
        }(t, n, e, o);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (t) {
        throw new Error(n);
      }
      return function (t, n, e) {
        return function (t, n, e, i) {
          return r(new Uint8Array(t), n, e, i);
        }(t, n, e, o);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (t) {
        throw new Error(e);
      }
      return function (t, n, e) {
        return r(t, n, e, o);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
}
function s(r, i, s, o) {
  switch (r) {
    case "HEX":
      return function (t) {
        return function (t, n, e, r) {
          const i = "0123456789abcdef";
          let s,
            o,
            h = "";
          const u = n / 8,
            w = -1 === e ? 3 : 0;
          for (s = 0; s < u; s += 1) o = t[s >>> 2] >>> 8 * (w + e * (s % 4)), h += i.charAt(o >>> 4 & 15) + i.charAt(15 & o);
          return r.outputUpper ? h.toUpperCase() : h;
        }(t, i, s, o);
      };
    case "B64":
      return function (n) {
        return function (n, e, r, i) {
          let s,
            o,
            h,
            u,
            w,
            c = "";
          const f = e / 8,
            a = -1 === r ? 3 : 0;
          for (s = 0; s < f; s += 3) for (u = s + 1 < f ? n[s + 1 >>> 2] : 0, w = s + 2 < f ? n[s + 2 >>> 2] : 0, h = (n[s >>> 2] >>> 8 * (a + r * (s % 4)) & 255) << 16 | (u >>> 8 * (a + r * ((s + 1) % 4)) & 255) << 8 | w >>> 8 * (a + r * ((s + 2) % 4)) & 255, o = 0; o < 4; o += 1) c += 8 * s + 6 * o <= e ? t.charAt(h >>> 6 * (3 - o) & 63) : i.b64Pad;
          return c;
        }(n, i, s, o);
      };
    case "BYTES":
      return function (t) {
        return function (t, n, e) {
          let r,
            i,
            s = "";
          const o = n / 8,
            h = -1 === e ? 3 : 0;
          for (r = 0; r < o; r += 1) i = t[r >>> 2] >>> 8 * (h + e * (r % 4)) & 255, s += String.fromCharCode(i);
          return s;
        }(t, i, s);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (t) {
        throw new Error(n);
      }
      return function (t) {
        return function (t, n, e) {
          let r;
          const i = n / 8,
            s = new ArrayBuffer(i),
            o = new Uint8Array(s),
            h = -1 === e ? 3 : 0;
          for (r = 0; r < i; r += 1) o[r] = t[r >>> 2] >>> 8 * (h + e * (r % 4)) & 255;
          return s;
        }(t, i, s);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (t) {
        throw new Error(e);
      }
      return function (t) {
        return function (t, n, e) {
          let r;
          const i = n / 8,
            s = -1 === e ? 3 : 0,
            o = new Uint8Array(i);
          for (r = 0; r < i; r += 1) o[r] = t[r >>> 2] >>> 8 * (s + e * (r % 4)) & 255;
          return o;
        }(t, i, s);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
}
const o = 4294967296,
  h = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
  u = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428],
  w = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
  c = "Chosen SHA variant is not supported",
  f = "Cannot set numRounds with MAC";
function a(t, n) {
  let e, r;
  const i = t.binLen >>> 3,
    s = n.binLen >>> 3,
    o = i << 3,
    h = 4 - i << 3;
  if (i % 4 != 0) {
    for (e = 0; e < s; e += 4) r = i + e >>> 2, t.value[r] |= n.value[e >>> 2] << o, t.value.push(0), t.value[r + 1] |= n.value[e >>> 2] >>> h;
    return (t.value.length << 2) - 4 >= s + i && t.value.pop(), {
      value: t.value,
      binLen: t.binLen + n.binLen
    };
  }
  return {
    value: t.value.concat(n.value),
    binLen: t.binLen + n.binLen
  };
}
function l(t) {
  const n = {
      outputUpper: !1,
      b64Pad: "=",
      outputLen: -1
    },
    e = t || {},
    r = "Output length must be a multiple of 8";
  if (n.outputUpper = e.outputUpper || !1, e.b64Pad && (n.b64Pad = e.b64Pad), e.outputLen) {
    if (e.outputLen % 8 != 0) throw new Error(r);
    n.outputLen = e.outputLen;
  } else if (e.shakeLen) {
    if (e.shakeLen % 8 != 0) throw new Error(r);
    n.outputLen = e.shakeLen;
  }
  if ("boolean" != typeof n.outputUpper) throw new Error("Invalid outputUpper formatting option");
  if ("string" != typeof n.b64Pad) throw new Error("Invalid b64Pad formatting option");
  return n;
}
function A(t, n, e, r) {
  const s = t + " must include a value and format";
  if (!n) {
    if (!r) throw new Error(s);
    return r;
  }
  if (void 0 === n.value || !n.format) throw new Error(s);
  return i(n.format, n.encoding || "UTF8", e)(n.value);
}
class E {
  constructor(t, n, e) {
    const r = e || {};
    if (this.t = n, this.i = r.encoding || "UTF8", this.numRounds = r.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds) throw new Error("numRounds must a integer >= 1");
    this.o = t, this.h = [], this.u = 0, this.l = !1, this.A = 0, this.H = !1, this.S = [], this.p = [];
  }
  update(t) {
    let n,
      e = 0;
    const r = this.m >>> 5,
      i = this.C(t, this.h, this.u),
      s = i.binLen,
      o = i.value,
      h = s >>> 5;
    for (n = 0; n < h; n += r) e + this.m <= s && (this.U = this.v(o.slice(n, n + r), this.U), e += this.m);
    return this.A += e, this.h = o.slice(e >>> 5), this.u = s % this.m, this.l = !0, this;
  }
  getHash(t, n) {
    let e,
      r,
      i = this.R;
    const o = l(n);
    if (this.K) {
      if (-1 === o.outputLen) throw new Error("Output length must be specified in options");
      i = o.outputLen;
    }
    const h = s(t, i, this.T, o);
    if (this.H && this.g) return h(this.g(o));
    for (r = this.F(this.h.slice(), this.u, this.A, this.L(this.U), i), e = 1; e < this.numRounds; e += 1) this.K && i % 32 != 0 && (r[r.length - 1] &= 16777215 >>> 24 - i % 32), r = this.F(r, i, 0, this.B(this.o), i);
    return h(r);
  }
  setHMACKey(t, n, e) {
    if (!this.M) throw new Error("Variant does not support HMAC");
    if (this.l) throw new Error("Cannot set MAC key after calling update");
    const r = i(n, (e || {}).encoding || "UTF8", this.T);
    this.k(r(t));
  }
  k(t) {
    const n = this.m >>> 3,
      e = n / 4 - 1;
    let r;
    if (1 !== this.numRounds) throw new Error(f);
    if (this.H) throw new Error("MAC key already set");
    for (n < t.binLen / 8 && (t.value = this.F(t.value, t.binLen, 0, this.B(this.o), this.R)); t.value.length <= e;) t.value.push(0);
    for (r = 0; r <= e; r += 1) this.S[r] = 909522486 ^ t.value[r], this.p[r] = 1549556828 ^ t.value[r];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = !0;
  }
  getHMAC(t, n) {
    const e = l(n);
    return s(t, this.R, this.T, e)(this.Y());
  }
  Y() {
    let t;
    if (!this.H) throw new Error("Cannot call getHMAC without first setting MAC key");
    const n = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return t = this.v(this.p, this.B(this.o)), t = this.F(n, this.R, this.m, t, this.R), t;
  }
}
function H(t, n) {
  return t << n | t >>> 32 - n;
}
function S(t, n) {
  return t >>> n | t << 32 - n;
}
function b(t, n) {
  return t >>> n;
}
function p(t, n, e) {
  return t ^ n ^ e;
}
function d(t, n, e) {
  return t & n ^ ~t & e;
}
function m(t, n, e) {
  return t & n ^ t & e ^ n & e;
}
function C(t) {
  return S(t, 2) ^ S(t, 13) ^ S(t, 22);
}
function y(t, n) {
  const e = (65535 & t) + (65535 & n);
  return (65535 & (t >>> 16) + (n >>> 16) + (e >>> 16)) << 16 | 65535 & e;
}
function U(t, n, e, r) {
  const i = (65535 & t) + (65535 & n) + (65535 & e) + (65535 & r);
  return (65535 & (t >>> 16) + (n >>> 16) + (e >>> 16) + (r >>> 16) + (i >>> 16)) << 16 | 65535 & i;
}
function v(t, n, e, r, i) {
  const s = (65535 & t) + (65535 & n) + (65535 & e) + (65535 & r) + (65535 & i);
  return (65535 & (t >>> 16) + (n >>> 16) + (e >>> 16) + (r >>> 16) + (i >>> 16) + (s >>> 16)) << 16 | 65535 & s;
}
function R(t) {
  return S(t, 7) ^ S(t, 18) ^ b(t, 3);
}
function K(t) {
  return S(t, 6) ^ S(t, 11) ^ S(t, 25);
}
function T(t) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
}
function g(t, n) {
  let e, r, i, s, o, h, u;
  const w = [];
  for (e = n[0], r = n[1], i = n[2], s = n[3], o = n[4], u = 0; u < 80; u += 1) w[u] = u < 16 ? t[u] : H(w[u - 3] ^ w[u - 8] ^ w[u - 14] ^ w[u - 16], 1), h = u < 20 ? v(H(e, 5), d(r, i, s), o, 1518500249, w[u]) : u < 40 ? v(H(e, 5), p(r, i, s), o, 1859775393, w[u]) : u < 60 ? v(H(e, 5), m(r, i, s), o, 2400959708, w[u]) : v(H(e, 5), p(r, i, s), o, 3395469782, w[u]), o = s, s = i, i = H(r, 30), r = e, e = h;
  return n[0] = y(e, n[0]), n[1] = y(r, n[1]), n[2] = y(i, n[2]), n[3] = y(s, n[3]), n[4] = y(o, n[4]), n;
}
function F(t, n, e, r) {
  let i;
  const s = 15 + (n + 65 >>> 9 << 4),
    h = n + e;
  for (; t.length <= s;) t.push(0);
  for (t[n >>> 5] |= 128 << 24 - n % 32, t[s] = 4294967295 & h, t[s - 1] = h / o | 0, i = 0; i < t.length; i += 16) r = g(t.slice(i, i + 16), r);
  return r;
}
let L = class extends E {
  constructor(t, n, e) {
    if ("SHA-1" !== t) throw new Error(c);
    super(t, n, e);
    const r = e || {};
    this.M = !0, this.g = this.Y, this.T = -1, this.C = i(this.t, this.i, this.T), this.v = g, this.L = function (t) {
      return t.slice();
    }, this.B = T, this.F = F, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = !1, r.hmacKey && this.k(A("hmacKey", r.hmacKey, this.T));
  }
};
function B(t) {
  let n;
  return n = "SHA-224" == t ? u.slice() : w.slice(), n;
}
function M(t, n) {
  let e, r, i, s, o, u, w, c, f, a, l;
  const A = [];
  for (e = n[0], r = n[1], i = n[2], s = n[3], o = n[4], u = n[5], w = n[6], c = n[7], l = 0; l < 64; l += 1) A[l] = l < 16 ? t[l] : U(S(E = A[l - 2], 17) ^ S(E, 19) ^ b(E, 10), A[l - 7], R(A[l - 15]), A[l - 16]), f = v(c, K(o), d(o, u, w), h[l], A[l]), a = y(C(e), m(e, r, i)), c = w, w = u, u = o, o = y(s, f), s = i, i = r, r = e, e = y(f, a);
  var E;
  return n[0] = y(e, n[0]), n[1] = y(r, n[1]), n[2] = y(i, n[2]), n[3] = y(s, n[3]), n[4] = y(o, n[4]), n[5] = y(u, n[5]), n[6] = y(w, n[6]), n[7] = y(c, n[7]), n;
}
let k = class extends E {
  constructor(t, n, e) {
    if ("SHA-224" !== t && "SHA-256" !== t) throw new Error(c);
    super(t, n, e);
    const r = e || {};
    this.g = this.Y, this.M = !0, this.T = -1, this.C = i(this.t, this.i, this.T), this.v = M, this.L = function (t) {
      return t.slice();
    }, this.B = B, this.F = function (n, e, r, i) {
      return function (t, n, e, r, i) {
        let s, h;
        const u = 15 + (n + 65 >>> 9 << 4),
          w = n + e;
        for (; t.length <= u;) t.push(0);
        for (t[n >>> 5] |= 128 << 24 - n % 32, t[u] = 4294967295 & w, t[u - 1] = w / o | 0, s = 0; s < t.length; s += 16) r = M(t.slice(s, s + 16), r);
        return h = "SHA-224" === i ? [r[0], r[1], r[2], r[3], r[4], r[5], r[6]] : r, h;
      }(n, e, r, i, t);
    }, this.U = B(t), this.m = 512, this.R = "SHA-224" === t ? 224 : 256, this.K = !1, r.hmacKey && this.k(A("hmacKey", r.hmacKey, this.T));
  }
};
class Y {
  constructor(t, n) {
    this.N = t, this.I = n;
  }
}
function N(t, n) {
  let e;
  return n > 32 ? (e = 64 - n, new Y(t.I << n | t.N >>> e, t.N << n | t.I >>> e)) : 0 !== n ? (e = 32 - n, new Y(t.N << n | t.I >>> e, t.I << n | t.N >>> e)) : t;
}
function I(t, n) {
  let e;
  return n < 32 ? (e = 32 - n, new Y(t.N >>> n | t.I << e, t.I >>> n | t.N << e)) : (e = 64 - n, new Y(t.I >>> n | t.N << e, t.N >>> n | t.I << e));
}
function X(t, n) {
  return new Y(t.N >>> n, t.I >>> n | t.N << 32 - n);
}
function z(t, n, e) {
  return new Y(t.N & n.N ^ t.N & e.N ^ n.N & e.N, t.I & n.I ^ t.I & e.I ^ n.I & e.I);
}
function x(t) {
  const n = I(t, 28),
    e = I(t, 34),
    r = I(t, 39);
  return new Y(n.N ^ e.N ^ r.N, n.I ^ e.I ^ r.I);
}
function _(t, n) {
  let e, r;
  e = (65535 & t.I) + (65535 & n.I), r = (t.I >>> 16) + (n.I >>> 16) + (e >>> 16);
  const i = (65535 & r) << 16 | 65535 & e;
  e = (65535 & t.N) + (65535 & n.N) + (r >>> 16), r = (t.N >>> 16) + (n.N >>> 16) + (e >>> 16);
  return new Y((65535 & r) << 16 | 65535 & e, i);
}
function O(t, n, e, r) {
  let i, s;
  i = (65535 & t.I) + (65535 & n.I) + (65535 & e.I) + (65535 & r.I), s = (t.I >>> 16) + (n.I >>> 16) + (e.I >>> 16) + (r.I >>> 16) + (i >>> 16);
  const o = (65535 & s) << 16 | 65535 & i;
  i = (65535 & t.N) + (65535 & n.N) + (65535 & e.N) + (65535 & r.N) + (s >>> 16), s = (t.N >>> 16) + (n.N >>> 16) + (e.N >>> 16) + (r.N >>> 16) + (i >>> 16);
  return new Y((65535 & s) << 16 | 65535 & i, o);
}
function P(t, n, e, r, i) {
  let s, o;
  s = (65535 & t.I) + (65535 & n.I) + (65535 & e.I) + (65535 & r.I) + (65535 & i.I), o = (t.I >>> 16) + (n.I >>> 16) + (e.I >>> 16) + (r.I >>> 16) + (i.I >>> 16) + (s >>> 16);
  const h = (65535 & o) << 16 | 65535 & s;
  s = (65535 & t.N) + (65535 & n.N) + (65535 & e.N) + (65535 & r.N) + (65535 & i.N) + (o >>> 16), o = (t.N >>> 16) + (n.N >>> 16) + (e.N >>> 16) + (r.N >>> 16) + (i.N >>> 16) + (s >>> 16);
  return new Y((65535 & o) << 16 | 65535 & s, h);
}
function V(t, n) {
  return new Y(t.N ^ n.N, t.I ^ n.I);
}
function Z(t) {
  const n = I(t, 19),
    e = I(t, 61),
    r = X(t, 6);
  return new Y(n.N ^ e.N ^ r.N, n.I ^ e.I ^ r.I);
}
function j(t) {
  const n = I(t, 1),
    e = I(t, 8),
    r = X(t, 7);
  return new Y(n.N ^ e.N ^ r.N, n.I ^ e.I ^ r.I);
}
function q(t) {
  const n = I(t, 14),
    e = I(t, 18),
    r = I(t, 41);
  return new Y(n.N ^ e.N ^ r.N, n.I ^ e.I ^ r.I);
}
const D = [new Y(h[0], 3609767458), new Y(h[1], 602891725), new Y(h[2], 3964484399), new Y(h[3], 2173295548), new Y(h[4], 4081628472), new Y(h[5], 3053834265), new Y(h[6], 2937671579), new Y(h[7], 3664609560), new Y(h[8], 2734883394), new Y(h[9], 1164996542), new Y(h[10], 1323610764), new Y(h[11], 3590304994), new Y(h[12], 4068182383), new Y(h[13], 991336113), new Y(h[14], 633803317), new Y(h[15], 3479774868), new Y(h[16], 2666613458), new Y(h[17], 944711139), new Y(h[18], 2341262773), new Y(h[19], 2007800933), new Y(h[20], 1495990901), new Y(h[21], 1856431235), new Y(h[22], 3175218132), new Y(h[23], 2198950837), new Y(h[24], 3999719339), new Y(h[25], 766784016), new Y(h[26], 2566594879), new Y(h[27], 3203337956), new Y(h[28], 1034457026), new Y(h[29], 2466948901), new Y(h[30], 3758326383), new Y(h[31], 168717936), new Y(h[32], 1188179964), new Y(h[33], 1546045734), new Y(h[34], 1522805485), new Y(h[35], 2643833823), new Y(h[36], 2343527390), new Y(h[37], 1014477480), new Y(h[38], 1206759142), new Y(h[39], 344077627), new Y(h[40], 1290863460), new Y(h[41], 3158454273), new Y(h[42], 3505952657), new Y(h[43], 106217008), new Y(h[44], 3606008344), new Y(h[45], 1432725776), new Y(h[46], 1467031594), new Y(h[47], 851169720), new Y(h[48], 3100823752), new Y(h[49], 1363258195), new Y(h[50], 3750685593), new Y(h[51], 3785050280), new Y(h[52], 3318307427), new Y(h[53], 3812723403), new Y(h[54], 2003034995), new Y(h[55], 3602036899), new Y(h[56], 1575990012), new Y(h[57], 1125592928), new Y(h[58], 2716904306), new Y(h[59], 442776044), new Y(h[60], 593698344), new Y(h[61], 3733110249), new Y(h[62], 2999351573), new Y(h[63], 3815920427), new Y(3391569614, 3928383900), new Y(3515267271, 566280711), new Y(3940187606, 3454069534), new Y(4118630271, 4000239992), new Y(116418474, 1914138554), new Y(174292421, 2731055270), new Y(289380356, 3203993006), new Y(460393269, 320620315), new Y(685471733, 587496836), new Y(852142971, 1086792851), new Y(1017036298, 365543100), new Y(1126000580, 2618297676), new Y(1288033470, 3409855158), new Y(1501505948, 4234509866), new Y(1607167915, 987167468), new Y(1816402316, 1246189591)];
function G(t) {
  return "SHA-384" === t ? [new Y(3418070365, u[0]), new Y(1654270250, u[1]), new Y(2438529370, u[2]), new Y(355462360, u[3]), new Y(1731405415, u[4]), new Y(41048885895, u[5]), new Y(3675008525, u[6]), new Y(1203062813, u[7])] : [new Y(w[0], 4089235720), new Y(w[1], 2227873595), new Y(w[2], 4271175723), new Y(w[3], 1595750129), new Y(w[4], 2917565137), new Y(w[5], 725511199), new Y(w[6], 4215389547), new Y(w[7], 327033209)];
}
function J(t, n) {
  let e, r, i, s, o, h, u, w, c, f, a, l;
  const A = [];
  for (e = n[0], r = n[1], i = n[2], s = n[3], o = n[4], h = n[5], u = n[6], w = n[7], a = 0; a < 80; a += 1) a < 16 ? (l = 2 * a, A[a] = new Y(t[l], t[l + 1])) : A[a] = O(Z(A[a - 2]), A[a - 7], j(A[a - 15]), A[a - 16]), c = P(w, q(o), (H = h, S = u, new Y((E = o).N & H.N ^ ~E.N & S.N, E.I & H.I ^ ~E.I & S.I)), D[a], A[a]), f = _(x(e), z(e, r, i)), w = u, u = h, h = o, o = _(s, c), s = i, i = r, r = e, e = _(c, f);
  var E, H, S;
  return n[0] = _(e, n[0]), n[1] = _(r, n[1]), n[2] = _(i, n[2]), n[3] = _(s, n[3]), n[4] = _(o, n[4]), n[5] = _(h, n[5]), n[6] = _(u, n[6]), n[7] = _(w, n[7]), n;
}
let Q = class extends E {
  constructor(t, n, e) {
    if ("SHA-384" !== t && "SHA-512" !== t) throw new Error(c);
    super(t, n, e);
    const r = e || {};
    this.g = this.Y, this.M = !0, this.T = -1, this.C = i(this.t, this.i, this.T), this.v = J, this.L = function (t) {
      return t.slice();
    }, this.B = G, this.F = function (n, e, r, i) {
      return function (t, n, e, r, i) {
        let s, h;
        const u = 31 + (n + 129 >>> 10 << 5),
          w = n + e;
        for (; t.length <= u;) t.push(0);
        for (t[n >>> 5] |= 128 << 24 - n % 32, t[u] = 4294967295 & w, t[u - 1] = w / o | 0, s = 0; s < t.length; s += 32) r = J(t.slice(s, s + 32), r);
        return h = "SHA-384" === i ? [r[0].N, r[0].I, r[1].N, r[1].I, r[2].N, r[2].I, r[3].N, r[3].I, r[4].N, r[4].I, r[5].N, r[5].I] : [r[0].N, r[0].I, r[1].N, r[1].I, r[2].N, r[2].I, r[3].N, r[3].I, r[4].N, r[4].I, r[5].N, r[5].I, r[6].N, r[6].I, r[7].N, r[7].I], h;
      }(n, e, r, i, t);
    }, this.U = G(t), this.m = 1024, this.R = "SHA-384" === t ? 384 : 512, this.K = !1, r.hmacKey && this.k(A("hmacKey", r.hmacKey, this.T));
  }
};
const W = [new Y(0, 1), new Y(0, 32898), new Y(2147483648, 32906), new Y(2147483648, 2147516416), new Y(0, 32907), new Y(0, 2147483649), new Y(2147483648, 2147516545), new Y(2147483648, 32777), new Y(0, 138), new Y(0, 136), new Y(0, 2147516425), new Y(0, 2147483658), new Y(0, 2147516555), new Y(2147483648, 139), new Y(2147483648, 32905), new Y(2147483648, 32771), new Y(2147483648, 32770), new Y(2147483648, 128), new Y(0, 32778), new Y(2147483648, 2147483658), new Y(2147483648, 2147516545), new Y(2147483648, 32896), new Y(0, 2147483649), new Y(2147483648, 2147516424)],
  $ = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
function tt(t) {
  let n;
  const e = [];
  for (n = 0; n < 5; n += 1) e[n] = [new Y(0, 0), new Y(0, 0), new Y(0, 0), new Y(0, 0), new Y(0, 0)];
  return e;
}
function nt(t) {
  let n;
  const e = [];
  for (n = 0; n < 5; n += 1) e[n] = t[n].slice();
  return e;
}
function et(t, n) {
  let e, r, i, s;
  const o = [],
    h = [];
  if (null !== t) for (r = 0; r < t.length; r += 2) n[(r >>> 1) % 5][(r >>> 1) / 5 | 0] = V(n[(r >>> 1) % 5][(r >>> 1) / 5 | 0], new Y(t[r + 1], t[r]));
  for (e = 0; e < 24; e += 1) {
    for (s = tt(), r = 0; r < 5; r += 1) o[r] = (u = n[r][0], w = n[r][1], c = n[r][2], f = n[r][3], a = n[r][4], new Y(u.N ^ w.N ^ c.N ^ f.N ^ a.N, u.I ^ w.I ^ c.I ^ f.I ^ a.I));
    for (r = 0; r < 5; r += 1) h[r] = V(o[(r + 4) % 5], N(o[(r + 1) % 5], 1));
    for (r = 0; r < 5; r += 1) for (i = 0; i < 5; i += 1) n[r][i] = V(n[r][i], h[r]);
    for (r = 0; r < 5; r += 1) for (i = 0; i < 5; i += 1) s[i][(2 * r + 3 * i) % 5] = N(n[r][i], $[r][i]);
    for (r = 0; r < 5; r += 1) for (i = 0; i < 5; i += 1) n[r][i] = V(s[r][i], new Y(~s[(r + 1) % 5][i].N & s[(r + 2) % 5][i].N, ~s[(r + 1) % 5][i].I & s[(r + 2) % 5][i].I));
    n[0][0] = V(n[0][0], W[e]);
  }
  var u, w, c, f, a;
  return n;
}
function rt(t) {
  let n,
    e,
    r = 0;
  const i = [0, 0],
    s = [4294967295 & t, t / o & 2097151];
  for (n = 6; n >= 0; n--) e = s[n >> 2] >>> 8 * n & 255, 0 === e && 0 === r || (i[r + 1 >> 2] |= e << 8 * (r + 1), r += 1);
  return r = 0 !== r ? r : 1, i[0] |= r, {
    value: r + 1 > 4 ? i : [i[0]],
    binLen: 8 + 8 * r
  };
}
function it(t) {
  return a(rt(t.binLen), t);
}
function st(t, n) {
  let e,
    r = rt(n);
  r = a(r, t);
  const i = n >>> 2,
    s = (i - r.value.length % i) % i;
  for (e = 0; e < s; e++) r.value.push(0);
  return r.value;
}
let ot = class extends E {
  constructor(t, n, e) {
    let r = 6,
      s = 0;
    super(t, n, e);
    const o = e || {};
    if (1 !== this.numRounds) {
      if (o.kmacKey || o.hmacKey) throw new Error(f);
      if ("CSHAKE128" === this.o || "CSHAKE256" === this.o) throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = i(this.t, this.i, this.T), this.v = et, this.L = nt, this.B = tt, this.U = tt(), this.K = !1, t) {
      case "SHA3-224":
        this.m = s = 1152, this.R = 224, this.M = !0, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = s = 1088, this.R = 256, this.M = !0, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = s = 832, this.R = 384, this.M = !0, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = s = 576, this.R = 512, this.M = !0, this.g = this.Y;
        break;
      case "SHAKE128":
        r = 31, this.m = s = 1344, this.R = -1, this.K = !0, this.M = !1, this.g = null;
        break;
      case "SHAKE256":
        r = 31, this.m = s = 1088, this.R = -1, this.K = !0, this.M = !1, this.g = null;
        break;
      case "KMAC128":
        r = 4, this.m = s = 1344, this.X(e), this.R = -1, this.K = !0, this.M = !1, this.g = this._;
        break;
      case "KMAC256":
        r = 4, this.m = s = 1088, this.X(e), this.R = -1, this.K = !0, this.M = !1, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = s = 1344, r = this.O(e), this.R = -1, this.K = !0, this.M = !1, this.g = null;
        break;
      case "CSHAKE256":
        this.m = s = 1088, r = this.O(e), this.R = -1, this.K = !0, this.M = !1, this.g = null;
        break;
      default:
        throw new Error(c);
    }
    this.F = function (t, n, e, i, o) {
      return function (t, n, e, r, i, s, o) {
        let h,
          u,
          w = 0;
        const c = [],
          f = i >>> 5,
          a = n >>> 5;
        for (h = 0; h < a && n >= i; h += f) r = et(t.slice(h, h + f), r), n -= i;
        for (t = t.slice(h), n %= i; t.length < f;) t.push(0);
        for (h = n >>> 3, t[h >> 2] ^= s << h % 4 * 8, t[f - 1] ^= 2147483648, r = et(t, r); 32 * c.length < o && (u = r[w % 5][w / 5 | 0], c.push(u.I), !(32 * c.length >= o));) c.push(u.N), w += 1, 0 == 64 * w % i && (et(null, r), w = 0);
        return c;
      }(t, n, 0, i, s, r, o);
    }, o.hmacKey && this.k(A("hmacKey", o.hmacKey, this.T));
  }
  O(t, n) {
    const e = function (t) {
      const n = t || {};
      return {
        funcName: A("funcName", n.funcName, 1, {
          value: [],
          binLen: 0
        }),
        customization: A("Customization", n.customization, 1, {
          value: [],
          binLen: 0
        })
      };
    }(t || {});
    n && (e.funcName = n);
    const r = a(it(e.funcName), it(e.customization));
    if (0 !== e.customization.binLen || 0 !== e.funcName.binLen) {
      const t = st(r, this.m >>> 3);
      for (let n = 0; n < t.length; n += this.m >>> 5) this.U = this.v(t.slice(n, n + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(t) {
    const n = function (t) {
      const n = t || {};
      return {
        kmacKey: A("kmacKey", n.kmacKey, 1),
        funcName: {
          value: [1128353099],
          binLen: 32
        },
        customization: A("Customization", n.customization, 1, {
          value: [],
          binLen: 0
        })
      };
    }(t || {});
    this.O(t, n.funcName);
    const e = st(it(n.kmacKey), this.m >>> 3);
    for (let t = 0; t < e.length; t += this.m >>> 5) this.U = this.v(e.slice(t, t + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = !0;
  }
  _(t) {
    const n = a({
      value: this.h.slice(),
      binLen: this.u
    }, function (t) {
      let n,
        e,
        r = 0;
      const i = [0, 0],
        s = [4294967295 & t, t / o & 2097151];
      for (n = 6; n >= 0; n--) e = s[n >> 2] >>> 8 * n & 255, 0 === e && 0 === r || (i[r >> 2] |= e << 8 * r, r += 1);
      return r = 0 !== r ? r : 1, i[r >> 2] |= r << 8 * r, {
        value: r + 1 > 4 ? i : [i[0]],
        binLen: 8 + 8 * r
      };
    }(t.outputLen));
    return this.F(n.value, n.binLen, this.A, this.L(this.U), t.outputLen);
  }
};
class ht {
  constructor(t, n, e) {
    if ("SHA-1" == t) this.P = new L(t, n, e);else if ("SHA-224" == t || "SHA-256" == t) this.P = new k(t, n, e);else if ("SHA-384" == t || "SHA-512" == t) this.P = new Q(t, n, e);else {
      if ("SHA3-224" != t && "SHA3-256" != t && "SHA3-384" != t && "SHA3-512" != t && "SHAKE128" != t && "SHAKE256" != t && "CSHAKE128" != t && "CSHAKE256" != t && "KMAC128" != t && "KMAC256" != t) throw new Error(c);
      this.P = new ot(t, n, e);
    }
  }
  update(t) {
    return this.P.update(t), this;
  }
  getHash(t, n) {
    return this.P.getHash(t, n);
  }
  setHMACKey(t, n, e) {
    this.P.setHMACKey(t, n, e);
  }
  getHMAC(t, n) {
    return this.P.getHMAC(t, n);
  }
}
exports.default = ht;
},{}],"nEA5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateSHA = calculateSHA;
exports.checkSHA = checkSHA;
var _jssha = _interopRequireDefault(require("jssha"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function calculateSHA(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      var shaObj = new _jssha.default('SHA-256', 'ARRAYBUFFER');
      shaObj.update(new Uint8Array(data));
      var hash = shaObj.getHash('HEX');
      resolve(hash);
    };
    reader.onerror = function (err) {
      reject(new Error("An error occurred while reading the file: ".concat(err)));
    };
    reader.readAsArrayBuffer(file);
  });
}
function checkSHA(_x, _x2) {
  return _checkSHA.apply(this, arguments);
}
function _checkSHA() {
  _checkSHA = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(file, expectedSHA) {
    var hash;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return calculateSHA(file);
        case 2:
          hash = _context.sent;
          return _context.abrupt("return", hash === expectedSHA);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _checkSHA.apply(this, arguments);
}
},{"jssha":"HqYT"}],"hQdi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileAnnotationHistory = void 0;
var _sha = require("../util/sha");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents a history of annotations for a specific file.
 * Keeps track of changes made to a graph of points (e.g., annotations on an image).
 * @template T - Type of the points (must extend Point2D).
 */
var FileAnnotationHistory = exports.FileAnnotationHistory = /*#__PURE__*/function () {
  /**
   * Creates a new FileAnnotationHistory instance.
   * @param {File} file - The file associated with the annotations.
   * @param {number} cacheSize - The maximum number of history entries to retain.
   */
  function FileAnnotationHistory(file, cacheSize) {
    var _this = this;
    _classCallCheck(this, FileAnnotationHistory);
    _defineProperty(this, "cacheSize", void 0);
    _defineProperty(this, "history", []);
    _defineProperty(this, "currentHistoryIndex", 0);
    _defineProperty(this, "_file", void 0);
    _defineProperty(this, "_hash", void 0);
    this._file = file;
    this.cacheSize = cacheSize;
    (0, _sha.calculateSHA)(this._file).then(function (sha) {
      return _this._hash = sha;
    });
  }
  /**
   * Gets the associated file.
   * @returns {File} - The file associated with the annotations.
   */
  return _createClass(FileAnnotationHistory, [{
    key: "file",
    get: function get() {
      return this._file;
    }
  }, {
    key: "hash",
    get: function get() {
      return this._hash;
    }
    /**
     * Adds a new annotation item to the history.
     * @param {Graph<T>} item - The graph of points representing the annotation.
     */
  }, {
    key: "add",
    value: function add(item) {
      if (this.currentHistoryIndex + 1 < this.history.length) {
        // Delete history stack when moved back and changed something
        this.history.length = this.currentHistoryIndex + 1;
      }
      if (this.cacheSize === this.history.length) {
        // Remove the first item as it is too old and cache limit is reached
        this.history.shift();
      }
      this.history.push(item.clone());
      this.currentHistoryIndex = this.history.length - 1;
    }
    /**
     * Sets the current history index to the specified value.
     * @param {number} index - The desired history index.
     */
  }, {
    key: "setIndex",
    value: function setIndex(index) {
      if (index < 0) {
        index = 0;
      } else if (index >= this.history.length) {
        index = this.history.length - 1;
      }
      this.currentHistoryIndex = index;
    }
    /**
     * Moves to the next history entry.
     */
  }, {
    key: "next",
    value: function next() {
      this.setIndex(this.currentHistoryIndex + 1);
    }
    /**
     * Moves to the previous history entry.
     */
  }, {
    key: "previous",
    value: function previous() {
      this.setIndex(this.currentHistoryIndex - 1);
    }
    /**
     * Retrieves the current annotation graph.
     * @returns {null | Graph<T>} - The current annotation graph or null if empty.
     */
  }, {
    key: "get",
    value: function get() {
      if (!this.isEmpty()) {
        return this.history[this.currentHistoryIndex];
      }
      return null;
    }
    /**
     * Checks if the history is empty.
     * @returns {boolean} - True if empty, false otherwise.
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.history.length === 0;
    }
    /**
     * Clears the entire history.
     */
  }, {
    key: "clear",
    value: function clear() {
      this.history.length = 0;
      this.currentHistoryIndex = 0;
    }
  }]);
}();
},{"../util/sha":"nEA5"}],"gDGJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point2D = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents a 2D point with an ID, coordinates, and neighbor information.
 */
var Point2D = exports.Point2D = /*#__PURE__*/function () {
  /**
   * Creates a new Point2D instance.
   * @param {number} id - The unique identifier for the point.
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   * @param {number[]} neighbourIds - An array of neighbor IDs.
   */
  function Point2D(id, x, y, neighbourIds) {
    _classCallCheck(this, Point2D);
    _defineProperty(this, "_id", void 0);
    _defineProperty(this, "neighbourIds", void 0);
    _defineProperty(this, "_selected", false);
    _defineProperty(this, "_hovered", false);
    _defineProperty(this, "_deleted", false);
    _defineProperty(this, "_x", void 0);
    _defineProperty(this, "_y", void 0);
    this._id = id;
    this._x = x;
    this._y = y;
    this.neighbourIds = neighbourIds;
  }
  return _createClass(Point2D, [{
    key: "selected",
    get:
    /**
     * Gets or sets whether the point is selected.
     * @returns {boolean} - True if selected, false otherwise.
     */
    function get() {
      return this._selected;
    },
    set: function set(value) {
      this._selected = value;
    }
  }, {
    key: "hovered",
    get:
    /**
     * Gets or sets whether the point is hovered.
     * @returns {boolean} - True if hovered, false otherwise.
     */
    function get() {
      return this._hovered;
    },
    set: function set(value) {
      this._hovered = value;
    }
  }, {
    key: "deleted",
    get:
    /**
     * Gets or sets whether the point is marked as deleted.
     * @returns {boolean} - True if deleted, false otherwise.
     */
    function get() {
      return this._deleted;
    },
    set: function set(value) {
      this._deleted = value;
    }
  }, {
    key: "x",
    get:
    /**
     * Gets or sets the x-coordinate of the point.
     * @returns {number} - The x-coordinate.
     */
    function get() {
      return this._x;
    },
    set: function set(value) {
      this._x = value;
    }
  }, {
    key: "y",
    get:
    /**
     * Gets or sets the y-coordinate of the point.
     * @returns {number} - The y-coordinate.
     */
    function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = value;
    }
    /**
     * Returns a string representation of the point.
     * @returns {string} - A formatted string with point details.
     */
  }, {
    key: "toString",
    value: function toString() {
      return "Point2D(id=".concat(this.id, ", x=").concat(this.x, ", y=").concat(this.y, ")");
    }
    /**
     * Retrieves the unique ID of the point.
     * @returns {number} - The point's ID.
     */
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
    /**
     * Retrieves a copy of the neighbor IDs.
     * @returns {number[]} - An array of neighbor IDs.
     */
  }, {
    key: "getNeighbourIds",
    value: function getNeighbourIds() {
      return _toConsumableArray(this.neighbourIds);
    }
    /**
     * Moves the point to the specified coordinates.
     * @param {Point2D} point - The target point.
     */
  }, {
    key: "moveTo",
    value: function moveTo(point) {
      this.x = point.x;
      this.y = point.y;
    }
    /**
     * Creates a shallow copy of the point.
     * @returns {Point2D} - A new Point2D instance with cloned properties.
     */
  }, {
    key: "clone",
    value: function clone() {
      var copy = new Point2D(this.id, this._x, this._y, this.neighbourIds);
      copy.hovered = this.hovered;
      copy.deleted = this.deleted;
      copy.selected = this.selected;
      return copy;
    }
    /**
     * Converts the point to a dictionary object.
     * @returns {object} - A dictionary containing point properties.
     */
  }, {
    key: "toDict",
    value: function toDict() {
      return {
        id: this.id,
        x: this.x,
        y: this.y,
        // hovered: this.hovered,
        deleted: this.deleted
        // selected: this.selected,
        // neighbourIds: this.neighbourIds
      };
    }
  }]);
}();
},{}],"n8rv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Perspective2D = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents a utility class for 2D perspective transformations.
 */
var Perspective2D = exports.Perspective2D = /*#__PURE__*/function () {
  function Perspective2D() {
    _classCallCheck(this, Perspective2D);
  }
  return _createClass(Perspective2D, null, [{
    key: "normalizedToDisplay",
    value:
    /**
     * Converts a normalized point (in the range [0, 1]) to display coordinates (pixel values).
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The normalized point.
     * @returns {Point2D} - The corresponding point in display coordinates.
     */
    function normalizedToDisplay(image, point) {
      var copy = point.clone();
      copy.x = point.x * image.width;
      copy.y = point.y * image.height;
      return copy;
    }
    /**
     * Projects a point from normalized coordinates to display coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The normalized point.
     * @returns {Point2D} - The projected point in display coordinates.
     */
  }, {
    key: "project",
    value: function project(image, point) {
      var displayedPoint = Perspective2D.normalizedToDisplay(image, point);
      var copy = point.clone();
      copy.x = displayedPoint.x;
      copy.y = displayedPoint.y;
      return copy;
    }
    /**
     * Calculates the Euclidean distance between two points in display coordinates.
     * @param {HTMLImageElement} image - The image on which the points are defined.
     * @param {Point2D} pointFrom - The starting point.
     * @param {Point2D} pointTo - The ending point.
     * @returns {number} - The distance between the two points.
     */
  }, {
    key: "distanceTo",
    value: function distanceTo(image, pointFrom, pointTo) {
      var projectPointFrom = Perspective2D.project(image, pointFrom);
      var projectPointTo = Perspective2D.project(image, pointTo);
      return Math.sqrt(Math.pow(projectPointFrom.x - projectPointTo.x, 2) + Math.pow(projectPointFrom.y - projectPointTo.y, 2));
    }
    /**
     * Checks if two points intersect within a specified delta distance.
     * @param {HTMLImageElement} image - The image on which the points are defined.
     * @param {Point2D} point - The first point.
     * @param {Point2D} pointCheck - The second point to check against.
     * @param {number} delta - The maximum allowed distance for intersection.
     * @returns {boolean} - True if the points intersect within the specified delta, false otherwise.
     */
  }, {
    key: "intersects",
    value: function intersects(image, point, pointCheck, delta) {
      return this.distanceTo(image, point, pointCheck) <= delta;
    }
    /**
     * Converts a point from display coordinates to normalized coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The point in display coordinates.
     * @returns {Point2D} - The corresponding point in normalized coordinates.
     */
  }, {
    key: "displayToNormalized",
    value: function displayToNormalized(image, point) {
      var copy = point.clone();
      copy.x = point.x / image.width;
      copy.y = point.y / image.height;
      return copy;
    }
    /**
     * Unprojects a point from display coordinates to normalized coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The point in display coordinates.
     * @returns {Point2D} - The corresponding point in normalized coordinates.
     */
  }, {
    key: "unproject",
    value: function unproject(image, point) {
      var normalizedPoint = Perspective2D.displayToNormalized(image, point);
      var copy = point.clone();
      copy.x = normalizedPoint.x;
      copy.y = normalizedPoint.y;
      return copy;
    }
  }]);
}();
},{}],"V4e4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graph = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents a graph of points in a 2D space.
 * @template P - Type of the points (must extend Point2D).
 */
var Graph = exports.Graph = /*#__PURE__*/function () {
  /**
   * Creates a new Graph instance with the given points.
   * @param {P[]} points - An array of points.
   */
  function Graph(points) {
    _classCallCheck(this, Graph);
    _defineProperty(this, "_points", void 0);
    this._points = points;
  }
  /**
   * Gets the array of points in the graph.
   * @returns {P[]} - An array of points.
   */
  return _createClass(Graph, [{
    key: "points",
    get: function get() {
      return this._points;
    }
    /**
     * Creates a Graph instance from a JSON object.
     * @param {P[]} jsonObject - An array of point objects in JSON format.
     * @param {() => P} newObject - A function to create a new point object.
     * @returns {Graph<P>} - A new Graph instance.
     */
  }, {
    key: "getById",
    value:
    /**
     * Retrieves a point from the graph by its ID.
     * @param {number} id - The ID of the point.
     * @returns {P} - The point with the specified ID.
     */
    function getById(id) {
      return this.points.find(function (p) {
        return p.id === id;
      });
    }
    /**
     * Retrieves the neighboring points of a given point.
     * @param {P} point - The point for which neighbors are requested.
     * @returns {P[]} - An array of neighboring points.
     */
  }, {
    key: "getNeighbourPointsOf",
    value: function getNeighbourPointsOf(point) {
      var _this = this;
      return point.getNeighbourIds().map(function (id) {
        return _this.getById(id);
      });
    }
    /**
     * Gets the selected point (if any) from the graph.
     * @returns {P | undefined} - The selected point or undefined if none is selected.
     */
  }, {
    key: "getSelected",
    value: function getSelected() {
      return this.points.find(function (p) {
        return p.selected && p.hovered;
      });
    }
    /**
     * Creates a shallow copy of the graph.
     * @returns {Graph<P>} - A new Graph instance with cloned points.
     */
  }, {
    key: "clone",
    value: function clone() {
      // @ts-expect-error: converting Points to abstract class
      return new Graph(this.points.map(function (p) {
        return p.clone();
      }));
    }
    /**
     * Converts the graph to an array of dictionaries.
     * @returns - An array of dictionaries representing the points.
     */
  }, {
    key: "toDictArray",
    value: function toDictArray() {
      return this.points.map(function (point) {
        return point.toDict();
      });
    }
  }], [{
    key: "fromJson",
    value: function fromJson(jsonObject, newObject) {
      return new Graph(jsonObject.map(function (dict) {
        var point = newObject(dict['id']);
        // @ts-expect-error: built in method uses readonly
        delete dict['id'];
        return Object.assign(point, dict);
      }));
    }
  }]);
}();
},{}],"J3Gj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionTaskRunner = exports.PoseLandmarker = exports.ObjectDetector = exports.MPMask = exports.MPImage = exports.InteractiveSegmenterResult = exports.InteractiveSegmenter = exports.ImageSegmenterResult = exports.ImageSegmenter = exports.ImageEmbedder = exports.ImageClassifier = exports.HolisticLandmarker = exports.HandLandmarker = exports.GestureRecognizer = exports.FilesetResolver = exports.FaceStylizer = exports.FaceLandmarker = exports.FaceDetector = exports.DrawingUtils = void 0;
var t = "undefined" != typeof self ? self : {};
function e(e) {
  t: {
    for (var n = ["CLOSURE_FLAGS"], r = t, i = 0; i < n.length; i++) if (null == (r = r[n[i]])) {
      n = null;
      break t;
    }
    n = r;
  }
  return null != (e = n && n[e]) && e;
}
function n() {
  throw Error("Invalid UTF8");
}
function r(t, e) {
  return e = String.fromCharCode.apply(null, e), null == t ? e : t + e;
}
let i, s;
const o = "undefined" != typeof TextDecoder;
let a;
const h = "undefined" != typeof TextEncoder;
function c(t) {
  if (h) t = (a ||= new TextEncoder()).encode(t);else {
    let n = 0;
    const r = new Uint8Array(3 * t.length);
    for (let i = 0; i < t.length; i++) {
      var e = t.charCodeAt(i);
      if (128 > e) r[n++] = e;else {
        if (2048 > e) r[n++] = e >> 6 | 192;else {
          if (55296 <= e && 57343 >= e) {
            if (56319 >= e && i < t.length) {
              const s = t.charCodeAt(++i);
              if (56320 <= s && 57343 >= s) {
                e = 1024 * (e - 55296) + s - 56320 + 65536, r[n++] = e >> 18 | 240, r[n++] = e >> 12 & 63 | 128, r[n++] = e >> 6 & 63 | 128, r[n++] = 63 & e | 128;
                continue;
              }
              i--;
            }
            e = 65533;
          }
          r[n++] = e >> 12 | 224, r[n++] = e >> 6 & 63 | 128;
        }
        r[n++] = 63 & e | 128;
      }
    }
    t = n === r.length ? r : r.subarray(0, n);
  }
  return t;
}
var u,
  l = e(610401301),
  d = e(188588736);
const f = t.navigator;
function p(t) {
  return !!l && !!u && u.brands.some(({
    brand: e
  }) => e && -1 != e.indexOf(t));
}
function g(e) {
  var n;
  return (n = t.navigator) && (n = n.userAgent) || (n = ""), -1 != n.indexOf(e);
}
function m() {
  return !!l && !!u && 0 < u.brands.length;
}
function y() {
  return m() ? p("Chromium") : (g("Chrome") || g("CriOS")) && !(!m() && g("Edge")) || g("Silk");
}
function _(t) {
  return _[" "](t), t;
}
u = f && f.userAgentData || null, _[" "] = function () {};
var v = !m() && (g("Trident") || g("MSIE"));
!g("Android") || y(), y(), g("Safari") && (y() || !m() && g("Coast") || !m() && g("Opera") || !m() && g("Edge") || (m() ? p("Microsoft Edge") : g("Edg/")) || m() && p("Opera"));
var E = {},
  w = null;
function T(t) {
  var e = t.length,
    n = 3 * e / 4;
  n % 3 ? n = Math.floor(n) : -1 != "=.".indexOf(t[e - 1]) && (n = -1 != "=.".indexOf(t[e - 2]) ? n - 2 : n - 1);
  var r = new Uint8Array(n),
    i = 0;
  return function (t, e) {
    function n(e) {
      for (; r < t.length;) {
        var n = t.charAt(r++),
          i = w[n];
        if (null != i) return i;
        if (!/^[\s\xa0]*$/.test(n)) throw Error("Unknown base64 encoding at char: " + n);
      }
      return e;
    }
    A();
    for (var r = 0;;) {
      var i = n(-1),
        s = n(0),
        o = n(64),
        a = n(64);
      if (64 === a && -1 === i) break;
      e(i << 2 | s >> 4), 64 != o && (e(s << 4 & 240 | o >> 2), 64 != a && e(o << 6 & 192 | a));
    }
  }(t, function (t) {
    r[i++] = t;
  }), i !== n ? r.subarray(0, i) : r;
}
function A() {
  if (!w) {
    w = {};
    for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), e = ["+/=", "+/", "-_=", "-_.", "-_"], n = 0; 5 > n; n++) {
      var r = t.concat(e[n].split(""));
      E[n] = r;
      for (var i = 0; i < r.length; i++) {
        var s = r[i];
        void 0 === w[s] && (w[s] = i);
      }
    }
  }
}
var b = "undefined" != typeof Uint8Array,
  k = !v && "function" == typeof btoa;
function x(t) {
  if (!k) {
    var e;
    void 0 === e && (e = 0), A(), e = E[e];
    var n = Array(Math.floor(t.length / 3)),
      r = e[64] || "";
    let h = 0,
      c = 0;
    for (; h < t.length - 2; h += 3) {
      var i = t[h],
        s = t[h + 1],
        o = t[h + 2],
        a = e[i >> 2];
      i = e[(3 & i) << 4 | s >> 4], s = e[(15 & s) << 2 | o >> 6], o = e[63 & o], n[c++] = a + i + s + o;
    }
    switch (a = 0, o = r, t.length - h) {
      case 2:
        o = e[(15 & (a = t[h + 1])) << 2] || r;
      case 1:
        t = t[h], n[c] = e[t >> 2] + e[(3 & t) << 4 | a >> 4] + o + r;
    }
    return n.join("");
  }
  for (e = "", n = 0, r = t.length - 10240; n < r;) e += String.fromCharCode.apply(null, t.subarray(n, n += 10240));
  return e += String.fromCharCode.apply(null, n ? t.subarray(n) : t), btoa(e);
}
const S = /[-_.]/g,
  L = {
    "-": "+",
    _: "/",
    ".": "="
  };
function F(t) {
  return L[t] || "";
}
function R(t) {
  if (!k) return T(t);
  S.test(t) && (t = t.replace(S, F)), t = atob(t);
  const e = new Uint8Array(t.length);
  for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
  return e;
}
function M(t) {
  return b && null != t && t instanceof Uint8Array;
}
let P;
function C() {
  return P ||= new Uint8Array(0);
}
var O = {};
let I;
function U(t) {
  if (t !== O) throw Error("illegal external caller");
}
function D() {
  return I ||= new B(null, O);
}
function N(t) {
  U(O);
  var e = t.g;
  return null == (e = null == e || M(e) ? e : "string" == typeof e ? R(e) : null) ? e : t.g = e;
}
var B = class {
  constructor(t, e) {
    if (U(e), this.g = t, null != t && 0 === t.length) throw Error("ByteString should be constructed with non-empty values");
  }
  h() {
    const t = N(this);
    return t ? new Uint8Array(t) : C();
  }
};
function G(t, e) {
  return Error(`Invalid wire type: ${t} (at position ${e})`);
}
function j() {
  return Error("Failed to read varint, encoding is invalid.");
}
function V(t, e) {
  return Error(`Tried to read past the end of the data ${e} > ${t}`);
}
function X(t) {
  if ("string" == typeof t) return {
    buffer: R(t),
    P: !1
  };
  if (Array.isArray(t)) return {
    buffer: new Uint8Array(t),
    P: !1
  };
  if (t.constructor === Uint8Array) return {
    buffer: t,
    P: !1
  };
  if (t.constructor === ArrayBuffer) return {
    buffer: new Uint8Array(t),
    P: !1
  };
  if (t.constructor === B) return {
    buffer: N(t) || C(),
    P: !0
  };
  if (t instanceof Uint8Array) return {
    buffer: new Uint8Array(t.buffer, t.byteOffset, t.byteLength),
    P: !1
  };
  throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
}
function H() {
  return "function" == typeof BigInt;
}
const W = "function" == typeof Uint8Array.prototype.slice;
let z,
  K = 0,
  Y = 0;
function $(t) {
  const e = 0 > t;
  let n = (t = Math.abs(t)) >>> 0;
  if (t = Math.floor((t - n) / 4294967296), e) {
    const [e, r] = rt(n, t);
    t = r, n = e;
  }
  K = n >>> 0, Y = t >>> 0;
}
function q(t) {
  const e = z ||= new DataView(new ArrayBuffer(8));
  e.setFloat32(0, +t, !0), Y = 0, K = e.getUint32(0, !0);
}
function J(t, e) {
  return 4294967296 * e + (t >>> 0);
}
function Z(t, e) {
  const n = 2147483648 & e;
  return n && (e = ~e >>> 0, 0 == (t = 1 + ~t >>> 0) && (e = e + 1 >>> 0)), t = J(t, e), n ? -t : t;
}
function Q(t, e) {
  if (t >>>= 0, 2097151 >= (e >>>= 0)) var n = "" + (4294967296 * e + t);else H() ? n = "" + (BigInt(e) << BigInt(32) | BigInt(t)) : (t = (16777215 & t) + 6777216 * (n = 16777215 & (t >>> 24 | e << 8)) + 6710656 * (e = e >> 16 & 65535), n += 8147497 * e, e *= 2, 1e7 <= t && (n += Math.floor(t / 1e7), t %= 1e7), 1e7 <= n && (e += Math.floor(n / 1e7), n %= 1e7), n = e + tt(n) + tt(t));
  return n;
}
function tt(t) {
  return t = String(t), "0000000".slice(t.length) + t;
}
function et() {
  var t = K,
    e = Y;
  if (2147483648 & e) {
    if (H()) t = "" + (BigInt(0 | e) << BigInt(32) | BigInt(t >>> 0));else {
      const [n, r] = rt(t, e);
      t = "-" + Q(n, r);
    }
  } else t = Q(t, e);
  return t;
}
function nt(t) {
  if (16 > t.length) $(Number(t));else if (H()) t = BigInt(t), K = Number(t & BigInt(4294967295)) >>> 0, Y = Number(t >> BigInt(32) & BigInt(4294967295));else {
    const e = +("-" === t[0]);
    Y = K = 0;
    const n = t.length;
    for (let r = e, i = (n - e) % 6 + e; i <= n; r = i, i += 6) {
      const e = Number(t.slice(r, i));
      Y *= 1e6, K = 1e6 * K + e, 4294967296 <= K && (Y += Math.trunc(K / 4294967296), Y >>>= 0, K >>>= 0);
    }
    if (e) {
      const [t, e] = rt(K, Y);
      K = t, Y = e;
    }
  }
}
function rt(t, e) {
  return e = ~e, t ? t = 1 + ~t : e += 1, [t, e];
}
function it(t, e) {
  let n,
    r = 0,
    i = 0,
    s = 0;
  const o = t.h;
  let a = t.g;
  do {
    n = o[a++], r |= (127 & n) << s, s += 7;
  } while (32 > s && 128 & n);
  for (32 < s && (i |= (127 & n) >> 4), s = 3; 32 > s && 128 & n; s += 7) n = o[a++], i |= (127 & n) << s;
  if (dt(t, a), 128 > n) return e(r >>> 0, i >>> 0);
  throw j();
}
function st(t) {
  let e = 0,
    n = t.g;
  const r = n + 10,
    i = t.h;
  for (; n < r;) {
    const r = i[n++];
    if (e |= r, 0 == (128 & r)) return dt(t, n), !!(127 & e);
  }
  throw j();
}
function ot(t) {
  const e = t.h;
  let n = t.g,
    r = e[n++],
    i = 127 & r;
  if (128 & r && (r = e[n++], i |= (127 & r) << 7, 128 & r && (r = e[n++], i |= (127 & r) << 14, 128 & r && (r = e[n++], i |= (127 & r) << 21, 128 & r && (r = e[n++], i |= r << 28, 128 & r && 128 & e[n++] && 128 & e[n++] && 128 & e[n++] && 128 & e[n++] && 128 & e[n++]))))) throw j();
  return dt(t, n), i;
}
function at(t) {
  return ot(t) >>> 0;
}
function ht(t) {
  var e = t.h;
  const n = t.g,
    r = e[n],
    i = e[n + 1],
    s = e[n + 2];
  return e = e[n + 3], dt(t, t.g + 4), (r << 0 | i << 8 | s << 16 | e << 24) >>> 0;
}
function ct(t) {
  var e = ht(t);
  t = 2 * (e >> 31) + 1;
  const n = e >>> 23 & 255;
  return e &= 8388607, 255 == n ? e ? NaN : 1 / 0 * t : 0 == n ? t * Math.pow(2, -149) * e : t * Math.pow(2, n - 150) * (e + Math.pow(2, 23));
}
function ut(t) {
  return ot(t);
}
function lt(t, e, {
  ca: n = !1
} = {}) {
  t.ca = n, e && (e = X(e), t.h = e.buffer, t.m = e.P, t.j = 0, t.l = t.h.length, t.g = t.j);
}
function dt(t, e) {
  if (t.g = e, e > t.l) throw V(t.l, e);
}
function ft(t, e) {
  if (0 > e) throw Error(`Tried to read a negative byte length: ${e}`);
  const n = t.g,
    r = n + e;
  if (r > t.l) throw V(e, t.l - n);
  return t.g = r, n;
}
function pt(t, e) {
  if (0 == e) return D();
  var n = ft(t, e);
  return t.ca && t.m ? n = t.h.subarray(n, n + e) : (t = t.h, n = n === (e = n + e) ? C() : W ? t.slice(n, e) : new Uint8Array(t.subarray(n, e))), 0 == n.length ? D() : new B(n, O);
}
var gt = [];
function mt(t) {
  var e = t.g;
  if (e.g == e.l) return !1;
  t.l = t.g.g;
  var n = at(t.g);
  if (e = n >>> 3, !(0 <= (n &= 7) && 5 >= n)) throw G(n, t.l);
  if (1 > e) throw Error(`Invalid field number: ${e} (at position ${t.l})`);
  return t.m = e, t.h = n, !0;
}
function yt(t) {
  switch (t.h) {
    case 0:
      0 != t.h ? yt(t) : st(t.g);
      break;
    case 1:
      dt(t = t.g, t.g + 8);
      break;
    case 2:
      if (2 != t.h) yt(t);else {
        var e = at(t.g);
        dt(t = t.g, t.g + e);
      }
      break;
    case 5:
      dt(t = t.g, t.g + 4);
      break;
    case 3:
      for (e = t.m;;) {
        if (!mt(t)) throw Error("Unmatched start-group tag: stream EOF");
        if (4 == t.h) {
          if (t.m != e) throw Error("Unmatched end-group tag");
          break;
        }
        yt(t);
      }
      break;
    default:
      throw G(t.h, t.l);
  }
}
function _t(t, e, n) {
  const r = t.g.l,
    i = at(t.g),
    s = t.g.g + i;
  let o = s - r;
  if (0 >= o && (t.g.l = s, n(e, t, void 0, void 0, void 0), o = s - t.g.g), o) throw Error(`Message parsing ended unexpectedly. Expected to read ${i} bytes, instead read ${i - o} bytes, either the data ended unexpectedly or the message misreported its own length`);
  return t.g.g = s, t.g.l = r, e;
}
function vt(t) {
  var e = at(t.g),
    a = ft(t = t.g, e);
  if (t = t.h, o) {
    var h,
      c = t;
    (h = s) || (h = s = new TextDecoder("utf-8", {
      fatal: !0
    })), e = a + e, c = 0 === a && e === c.length ? c : c.subarray(a, e);
    try {
      var u = h.decode(c);
    } catch (t) {
      if (void 0 === i) {
        try {
          h.decode(new Uint8Array([128]));
        } catch (t) {}
        try {
          h.decode(new Uint8Array([97])), i = !0;
        } catch (t) {
          i = !1;
        }
      }
      throw !i && (s = void 0), t;
    }
  } else {
    e = (u = a) + e, a = [];
    let i,
      s = null;
    for (; u < e;) {
      var l = t[u++];
      128 > l ? a.push(l) : 224 > l ? u >= e ? n() : (i = t[u++], 194 > l || 128 != (192 & i) ? (u--, n()) : a.push((31 & l) << 6 | 63 & i)) : 240 > l ? u >= e - 1 ? n() : (i = t[u++], 128 != (192 & i) || 224 === l && 160 > i || 237 === l && 160 <= i || 128 != (192 & (h = t[u++])) ? (u--, n()) : a.push((15 & l) << 12 | (63 & i) << 6 | 63 & h)) : 244 >= l ? u >= e - 2 ? n() : (i = t[u++], 128 != (192 & i) || 0 != i - 144 + (l << 28) >> 30 || 128 != (192 & (h = t[u++])) || 128 != (192 & (c = t[u++])) ? (u--, n()) : (l = (7 & l) << 18 | (63 & i) << 12 | (63 & h) << 6 | 63 & c, l -= 65536, a.push(55296 + (l >> 10 & 1023), 56320 + (1023 & l)))) : n(), 8192 <= a.length && (s = r(s, a), a.length = 0);
    }
    u = r(s, a);
  }
  return u;
}
function Et(t) {
  const e = at(t.g);
  return pt(t.g, e);
}
function wt(t, e, n) {
  var r = at(t.g);
  for (r = t.g.g + r; t.g.g < r;) n.push(e(t.g));
}
var Tt = [];
function At(t) {
  return t ? /^\d+$/.test(t) ? (nt(t), new bt(K, Y)) : null : kt ||= new bt(0, 0);
}
var bt = class {
  constructor(t, e) {
    this.h = t >>> 0, this.g = e >>> 0;
  }
};
let kt;
function xt(t) {
  return t ? /^-?\d+$/.test(t) ? (nt(t), new St(K, Y)) : null : Lt ||= new St(0, 0);
}
var St = class {
  constructor(t, e) {
    this.h = t >>> 0, this.g = e >>> 0;
  }
};
let Lt;
function Ft(t, e, n) {
  for (; 0 < n || 127 < e;) t.g.push(127 & e | 128), e = (e >>> 7 | n << 25) >>> 0, n >>>= 7;
  t.g.push(e);
}
function Rt(t, e) {
  for (; 127 < e;) t.g.push(127 & e | 128), e >>>= 7;
  t.g.push(e);
}
function Mt(t, e) {
  if (0 <= e) Rt(t, e);else {
    for (let n = 0; 9 > n; n++) t.g.push(127 & e | 128), e >>= 7;
    t.g.push(1);
  }
}
function Pt(t, e) {
  t.g.push(e >>> 0 & 255), t.g.push(e >>> 8 & 255), t.g.push(e >>> 16 & 255), t.g.push(e >>> 24 & 255);
}
function Ct(t, e) {
  0 !== e.length && (t.l.push(e), t.h += e.length);
}
function Ot(t, e, n) {
  Rt(t.g, 8 * e + n);
}
function It(t, e) {
  return Ot(t, e, 2), e = t.g.end(), Ct(t, e), e.push(t.h), e;
}
function Ut(t, e) {
  var n = e.pop();
  for (n = t.h + t.g.length() - n; 127 < n;) e.push(127 & n | 128), n >>>= 7, t.h++;
  e.push(n), t.h++;
}
function Dt(t, e, n) {
  Ot(t, e, 2), Rt(t.g, n.length), Ct(t, t.g.end()), Ct(t, n);
}
function Nt(t, e, n, r) {
  null != n && (e = It(t, e), r(n, t), Ut(t, e));
}
class Bt {
  constructor(t, e, n, r) {
    this.g = t, this.h = e, this.l = n, this.pa = r;
  }
}
function Gt(t) {
  return Array.prototype.slice.call(t);
}
function jt(t) {
  return "function" == typeof Symbol && "symbol" == typeof Symbol() ? Symbol() : t;
}
var Vt = jt(),
  Xt = jt("0di"),
  Ht = jt("2ex"),
  Wt = jt("0dg"),
  zt = Vt ? (t, e) => {
    t[Vt] |= e;
  } : (t, e) => {
    void 0 !== t.g ? t.g |= e : Object.defineProperties(t, {
      g: {
        value: e,
        configurable: !0,
        writable: !0,
        enumerable: !1
      }
    });
  },
  Kt = Vt ? (t, e) => {
    t[Vt] &= ~e;
  } : (t, e) => {
    void 0 !== t.g && (t.g &= ~e);
  };
function Yt(t, e, n) {
  return n ? t | e : t & ~e;
}
var $t = Vt ? t => 0 | t[Vt] : t => 0 | t.g,
  qt = Vt ? t => t[Vt] : t => t.g,
  Jt = Vt ? (t, e) => (t[Vt] = e, t) : (t, e) => (void 0 !== t.g ? t.g = e : Object.defineProperties(t, {
    g: {
      value: e,
      configurable: !0,
      writable: !0,
      enumerable: !1
    }
  }), t);
function Zt(t) {
  return zt(t, 34), t;
}
function Qt(t, e) {
  Jt(e, -14591 & (0 | t));
}
function te(t, e) {
  Jt(e, -14557 & (34 | t));
}
function ee(t) {
  return 0 === (t = t >> 14 & 1023) ? 536870912 : t;
}
var ne,
  re = {},
  ie = {};
function se(t) {
  return !(!t || "object" != typeof t || t.Ja !== ie);
}
function oe(t) {
  return null !== t && "object" == typeof t && !Array.isArray(t) && t.constructor === Object;
}
function ae(t, e, n) {
  if (null != t) if ("string" == typeof t) t = t ? new B(t, O) : D();else if (t.constructor !== B) if (M(t)) t = t.length ? new B(n ? t : new Uint8Array(t), O) : D();else {
    if (!e) throw Error();
    t = void 0;
  }
  return t;
}
function he(t, e, n) {
  if (!Array.isArray(t) || t.length) return !1;
  const r = $t(t);
  return !!(1 & r) || !(!e || !(Array.isArray(e) ? e.includes(n) : e.has(n))) && (Jt(t, 1 | r), !0);
}
const ce = [];
function ue(t) {
  if (2 & t) throw Error();
}
Jt(ce, 55), ne = Object.freeze(ce);
class le {
  constructor(t, e, n) {
    this.l = 0, this.g = t, this.h = e, this.m = n;
  }
  next() {
    if (this.l < this.g.length) {
      const t = this.g[this.l++];
      return {
        done: !1,
        value: this.h ? this.h.call(this.m, t) : t
      };
    }
    return {
      done: !0,
      value: void 0
    };
  }
  [Symbol.iterator]() {
    return new le(this.g, this.h, this.m);
  }
}
let de, fe, pe;
function ge(t, e) {
  (e = de ? e[de] : void 0) && (t[de] = Gt(e));
}
function me(t, e) {
  t.__closure__error__context__984382 || (t.__closure__error__context__984382 = {}), t.__closure__error__context__984382.severity = e;
}
function ye() {
  const e = Error();
  me(e, "incident"), function (e) {
    t.setTimeout(() => {
      throw e;
    }, 0);
  }(e);
}
function _e(t) {
  return me(t = Error(t), "warning"), t;
}
function ve(t) {
  return null == t || "number" == typeof t ? t : "NaN" === t || "Infinity" === t || "-Infinity" === t ? Number(t) : void 0;
}
function Ee(t) {
  return null == t || "boolean" == typeof t ? t : "number" == typeof t ? !!t : void 0;
}
Object.freeze(new class {}()), Object.freeze(new class {}());
const we = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function Te(t) {
  const e = typeof t;
  return "number" === e ? Number.isFinite(t) : "string" === e && we.test(t);
}
function Ae(t) {
  if (null == t) return t;
  if ("string" == typeof t) {
    if (!t) return;
    t = +t;
  }
  return "number" == typeof t && Number.isFinite(t) ? 0 | t : void 0;
}
function be(t) {
  if (null == t) return t;
  if ("string" == typeof t) {
    if (!t) return;
    t = +t;
  }
  return "number" == typeof t && Number.isFinite(t) ? t >>> 0 : void 0;
}
function ke(t) {
  return "-" !== t[0] && (20 > t.length || 20 === t.length && 184467 > Number(t.substring(0, 6)));
}
function xe(t) {
  return "-" === t[0] ? 20 > t.length || 20 === t.length && -922337 < Number(t.substring(0, 7)) : 19 > t.length || 19 === t.length && 922337 > Number(t.substring(0, 6));
}
function Se(t) {
  return t = Math.trunc(t), Number.isSafeInteger(t) || ($(t), t = Z(K, Y)), t;
}
function Le(t) {
  var e = Math.trunc(Number(t));
  return Number.isSafeInteger(e) ? String(e) : (-1 !== (e = t.indexOf(".")) && (t = t.substring(0, e)), xe(t) || (nt(t), t = et()), t);
}
function Fe(t) {
  return null == t ? t : Te(t) ? "number" == typeof t ? Se(t) : Le(t) : void 0;
}
function Re(t) {
  if ("string" != typeof t) throw Error();
  return t;
}
function Me(t) {
  if (null != t && "string" != typeof t) throw Error();
  return t;
}
function Pe(t) {
  return null == t || "string" == typeof t ? t : void 0;
}
function Ce(t, e, n, r) {
  if (null != t && "object" == typeof t && t.X === re) return t;
  if (!Array.isArray(t)) return n ? 2 & r ? (t = e[Xt]) ? e = t : (Zt((t = new e()).s), e = e[Xt] = t) : e = new e() : e = void 0, e;
  let i = n = $t(t);
  return 0 === i && (i |= 32 & r), i |= 2 & r, i !== n && Jt(t, i), new e(t);
}
function Oe(t, e, n) {
  if (e) {
    var r = !!r;
    if (!Te(e = t)) throw _e("int64");
    "string" == typeof e ? r = Le(e) : r ? (r = Math.trunc(e), Number.isSafeInteger(r) ? r = String(r) : xe(e = String(r)) ? r = e : ($(r), r = et())) : r = Se(e);
  } else r = Fe(t);
  return "string" == typeof (n = null == (t = r) ? n ? 0 : void 0 : t) && (r = +n, Number.isSafeInteger(r)) ? r : n;
}
let Ie, Ue, De;
function Ne(t) {
  switch (typeof t) {
    case "boolean":
      return Ue ||= [0, void 0, !0];
    case "number":
      return 0 < t ? void 0 : 0 === t ? De ||= [0, void 0] : [-t, void 0];
    case "string":
      return [0, t];
    case "object":
      return t;
  }
}
function Be(t, e) {
  return Ge(t, e[0], e[1]);
}
function Ge(t, e, n) {
  if (null == t && (t = Ie), Ie = void 0, null == t) {
    var r = 96;
    n ? (t = [n], r |= 512) : t = [], e && (r = -16760833 & r | (1023 & e) << 14);
  } else {
    if (!Array.isArray(t)) throw Error("narr");
    if (2048 & (r = $t(t))) throw Error("farr");
    if (64 & r) return t;
    if (r |= 64, n && (r |= 512, n !== t[0])) throw Error("mid");
    t: {
      const i = (n = t).length;
      if (i) {
        const t = i - 1;
        if (oe(n[t])) {
          if (1024 <= (e = t - (+!!(512 & (r |= 256)) - 1))) throw Error("pvtlmt");
          r = -16760833 & r | (1023 & e) << 14;
          break t;
        }
      }
      if (e) {
        if (1024 < (e = Math.max(e, i - (+!!(512 & r) - 1)))) throw Error("spvt");
        r = -16760833 & r | (1023 & e) << 14;
      }
    }
  }
  return Jt(t, r), t;
}
const je = {};
let Ve = function () {
  try {
    return _(new class extends Map {
      constructor() {
        super();
      }
    }()), !1;
  } catch {
    return !0;
  }
}();
class Xe {
  constructor() {
    this.g = new Map();
  }
  get(t) {
    return this.g.get(t);
  }
  set(t, e) {
    return this.g.set(t, e), this.size = this.g.size, this;
  }
  delete(t) {
    return t = this.g.delete(t), this.size = this.g.size, t;
  }
  clear() {
    this.g.clear(), this.size = this.g.size;
  }
  has(t) {
    return this.g.has(t);
  }
  entries() {
    return this.g.entries();
  }
  keys() {
    return this.g.keys();
  }
  values() {
    return this.g.values();
  }
  forEach(t, e) {
    return this.g.forEach(t, e);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
}
const He = Ve ? (Object.setPrototypeOf(Xe.prototype, Map.prototype), Object.defineProperties(Xe.prototype, {
  size: {
    value: 0,
    configurable: !0,
    enumerable: !0,
    writable: !0
  }
}), Xe) : class extends Map {
  constructor() {
    super();
  }
};
function We(t) {
  return t;
}
function ze(t) {
  if (2 & t.N) throw Error("Cannot mutate an immutable Map");
}
var Ke = class extends He {
  constructor(t, e, n = We, r = We) {
    super();
    let i = $t(t);
    i |= 64, Jt(t, i), this.N = i, this.U = e, this.S = n, this.Z = this.U ? Ye : r;
    for (let s = 0; s < t.length; s++) {
      const o = t[s],
        a = n(o[0], !1, !0);
      let h = o[1];
      e ? void 0 === h && (h = null) : h = r(o[1], !1, !0, void 0, void 0, i), super.set(a, h);
    }
  }
  oa(t = $e) {
    if (0 !== this.size) return this.Y(t);
  }
  Y(t = $e) {
    const e = [],
      n = super.entries();
    for (var r; !(r = n.next()).done;) (r = r.value)[0] = t(r[0]), r[1] = t(r[1]), e.push(r);
    return e;
  }
  clear() {
    ze(this), super.clear();
  }
  delete(t) {
    return ze(this), super.delete(this.S(t, !0, !1));
  }
  entries() {
    var t = this.na();
    return new le(t, qe, this);
  }
  keys() {
    return this.Ia();
  }
  values() {
    var t = this.na();
    return new le(t, Ke.prototype.get, this);
  }
  forEach(t, e) {
    super.forEach((n, r) => {
      t.call(e, this.get(r), r, this);
    });
  }
  set(t, e) {
    return ze(this), null == (t = this.S(t, !0, !1)) ? this : null == e ? (super.delete(t), this) : super.set(t, this.Z(e, !0, !0, this.U, !1, this.N));
  }
  Oa(t) {
    const e = this.S(t[0], !1, !0);
    t = t[1], t = this.U ? void 0 === t ? null : t : this.Z(t, !1, !0, void 0, !1, this.N), super.set(e, t);
  }
  has(t) {
    return super.has(this.S(t, !1, !1));
  }
  get(t) {
    t = this.S(t, !1, !1);
    const e = super.get(t);
    if (void 0 !== e) {
      var n = this.U;
      return n ? ((n = this.Z(e, !1, !0, n, this.ta, this.N)) !== e && super.set(t, n), n) : e;
    }
  }
  na() {
    return Array.from(super.keys());
  }
  Ia() {
    return super.keys();
  }
  [Symbol.iterator]() {
    return this.entries();
  }
};
function Ye(t, e, n, r, i, s) {
  return t = Ce(t, r, n, s), i && (t = an(t)), t;
}
function $e(t) {
  return t;
}
function qe(t) {
  return [t, this.get(t)];
}
let Je;
function Ze() {
  return Je ||= new Ke(Zt([]), void 0, void 0, void 0, je);
}
function Qe(t, e, n, r, i) {
  if (null != t) {
    if (Array.isArray(t)) t = he(t, void 0, 0) ? void 0 : i && 2 & $t(t) ? t : tn(t, e, n, void 0 !== r, i);else if (oe(t)) {
      const s = {};
      for (let o in t) s[o] = Qe(t[o], e, n, r, i);
      t = s;
    } else t = e(t, r);
    return t;
  }
}
function tn(t, e, n, r, i) {
  const s = r || n ? $t(t) : 0;
  r = r ? !!(32 & s) : void 0;
  const o = Gt(t);
  for (let t = 0; t < o.length; t++) o[t] = Qe(o[t], e, n, r, i);
  return n && (ge(o, t), n(s, o)), o;
}
function en(t) {
  return Qe(t, nn, void 0, void 0, !1);
}
function nn(t) {
  return t.X === re ? t.toJSON() : t instanceof Ke ? t.oa(en) : function (t) {
    switch (typeof t) {
      case "number":
        return isFinite(t) ? t : String(t);
      case "boolean":
        return t ? 1 : 0;
      case "object":
        if (t) if (Array.isArray(t)) {
          if (he(t, void 0, 0)) return;
        } else {
          if (M(t)) return x(t);
          if (t instanceof B) {
            const e = t.g;
            return null == e ? "" : "string" == typeof e ? e : t.g = x(e);
          }
          if (t instanceof Ke) return t.oa();
        }
    }
    return t;
  }(t);
}
function rn(t, e, n = te) {
  if (null != t) {
    if (b && t instanceof Uint8Array) return e ? t : new Uint8Array(t);
    if (Array.isArray(t)) {
      var r = $t(t);
      return 2 & r || (e &&= 0 === r || !!(32 & r) && !(64 & r || !(16 & r)), t = e ? Jt(t, -12293 & (34 | r)) : tn(t, rn, 4 & r ? te : n, !0, !0)), t;
    }
    return t.X === re ? (n = t.s, t = 2 & (r = qt(n)) ? t : sn(t, n, r, !0)) : t instanceof Ke && !(2 & t.N) && (n = Zt(t.Y(rn)), t = new Ke(n, t.U, t.S, t.Z)), t;
  }
}
function sn(t, e, n, r) {
  return t = t.constructor, Ie = e = on(e, n, r), e = new t(e), Ie = void 0, e;
}
function on(t, e, n) {
  const r = n || 2 & e ? te : Qt,
    i = !!(32 & e);
  return t = function (t, e, n) {
    const r = Gt(t);
    var i = r.length;
    const s = 256 & e ? r[i - 1] : void 0;
    for (i += s ? -1 : 0, e = 512 & e ? 1 : 0; e < i; e++) r[e] = n(r[e]);
    if (s) {
      e = r[e] = {};
      for (const t in s) e[t] = n(s[t]);
    }
    return ge(r, t), r;
  }(t, e, t => rn(t, i, r)), zt(t, 32 | (n ? 2 : 0)), t;
}
function an(t) {
  const e = t.s,
    n = qt(e);
  return 2 & n ? sn(t, e, n, !1) : t;
}
function hn(t, e, n, r) {
  return !(4 & e) || null != n && (!r && 0 === n && (4096 & e || 8192 & e) && 5 > (t.constructor[Wt] = 1 + (0 | t.constructor[Wt])) && ye(), 0 !== n && !(n & e));
}
function cn(t, e) {
  return ln(t = t.s, qt(t), e);
}
function un(t, e, n, r) {
  if (!(0 > (e = r + (+!!(512 & e) - 1)) || e >= t.length || e >= n)) return t[e];
}
function ln(t, e, n, r) {
  if (-1 === n) return null;
  const i = ee(e);
  if (!(n >= i)) {
    var s = t.length;
    return r && 256 & e && null != (r = t[s - 1][n]) ? (un(t, e, i, n) && null != Ht && (4 <= (e = (t = pe ??= {})[Ht] || 0) || (t[Ht] = e + 1, ye())), r) : un(t, e, i, n);
  }
  return 256 & e ? t[t.length - 1][n] : void 0;
}
function dn(t, e, n, r) {
  const i = t.s;
  let s = qt(i);
  return ue(s), fn(i, s, e, n, r), t;
}
function fn(t, e, n, r, i) {
  const s = ee(e);
  if (n >= s || i) {
    let o = e;
    if (256 & e) i = t[t.length - 1];else {
      if (null == r) return o;
      i = t[s + (+!!(512 & e) - 1)] = {}, o |= 256;
    }
    return i[n] = r, n < s && (t[n + (+!!(512 & e) - 1)] = void 0), o !== e && Jt(t, o), o;
  }
  return t[n + (+!!(512 & e) - 1)] = r, 256 & e && n in (t = t[t.length - 1]) && delete t[n], e;
}
function pn(t, e, n, r, i) {
  var s = 2 & e;
  let o = ln(t, e, n, i);
  Array.isArray(o) || (o = ne);
  const a = !(2 & r);
  r = !(1 & r);
  const h = !!(32 & e);
  let c = $t(o);
  return 0 !== c || !h || s || a ? 1 & c || (c |= 1, Jt(o, c)) : (c |= 33, Jt(o, c)), s ? (t = !1, 2 & c || (Zt(o), t = !!(4 & c)), (r || t) && Object.freeze(o)) : (s = !!(2 & c) || !!(2048 & c), r && s ? (o = Gt(o), r = 1, h && !a && (r |= 32), Jt(o, r), fn(t, e, n, o, i)) : a && 32 & c && !s && Kt(o, 32)), o;
}
function gn(t, e) {
  t = t.s;
  let n = qt(t);
  const r = ln(t, n, e),
    i = ve(r);
  return null != i && i !== r && fn(t, n, e, i), i;
}
function mn(t) {
  t = t.s;
  let e = qt(t);
  const n = ln(t, e, 1),
    r = ae(n, !0, !!(34 & e));
  return null != r && r !== n && fn(t, e, 1, r), r;
}
function yn(t, e, n) {
  const r = t.s;
  let i = qt(r);
  const s = 2 & i ? 1 : 2;
  let o = _n(r, i, e);
  var a = $t(o);
  if (hn(t, a, void 0, !1)) {
    (4 & a || Object.isFrozen(o)) && (o = Gt(o), a = In(a, i), i = fn(r, i, e, o));
    let s = t = 0;
    for (; t < o.length; t++) {
      const e = n(o[t]);
      null != e && (o[s++] = e);
    }
    s < t && (o.length = s), a = Yt(a = vn(a, i), 20, !0), a = Yt(a, 4096, !1), a = Yt(a, 8192, !1), Jt(o, a), 2 & a && Object.freeze(o);
  }
  return En(a) || (n = a, (a = (t = 1 === s || 4 === s && !!(32 & a)) ? Yt(a, 2, !0) : Un(a, i, !1)) !== n && Jt(o, a), t && Object.freeze(o)), 2 === s && En(a) && (o = Gt(o), a = Un(a = In(a, i), i, !1), Jt(o, a), fn(r, i, e, o)), o;
}
function _n(t, e, n) {
  return t = ln(t, e, n), Array.isArray(t) ? t : ne;
}
function vn(t, e) {
  return 0 === t && (t = In(t, e)), Yt(t, 1, !0);
}
function En(t) {
  return !!(2 & t) && !!(4 & t) || !!(2048 & t);
}
function wn(t) {
  t = Gt(t);
  for (let e = 0; e < t.length; e++) {
    const n = t[e] = Gt(t[e]);
    Array.isArray(n[1]) && (n[1] = Zt(n[1]));
  }
  return t;
}
function Tn(t, e, n) {
  {
    const a = t.s;
    let h = qt(a);
    if (ue(h), null == n) fn(a, h, e);else {
      var r,
        i = $t(n),
        s = i,
        o = !!(2 & i) || Object.isFrozen(n);
      if ((r = !o) && (r = !1), hn(t, i)) for (i = 21, o && (n = Gt(n), s = 0, i = Un(i = In(i, h), h, !0)), t = 0; t < n.length; t++) n[t] = Re(n[t]);
      r && (n = Gt(n), s = 0, i = Un(i = In(i, h), h, !0)), i !== s && Jt(n, i), fn(a, h, e, n);
    }
  }
}
function An(t, e, n, r) {
  t = t.s;
  let i = qt(t);
  ue(i), fn(t, i, e, ("0" === r ? 0 === Number(n) : n === r) ? void 0 : n);
}
function bn(t, e, n, r) {
  const i = qt(t);
  ue(i), t = pn(t, i, e, 2), r = n(r, !!(4 & (e = $t(t))) && !!(4096 & e)), t.push(r);
}
function kn(t) {
  return t;
}
function xn(t, e) {
  return Sn(t = t.s, qt(t), ws) === e ? e : -1;
}
function Sn(t, e, n) {
  let r = 0;
  for (let i = 0; i < n.length; i++) {
    const s = n[i];
    null != ln(t, e, s) && (0 !== r && (e = fn(t, e, r)), r = s);
  }
  return r;
}
function Ln(t, e, n, r) {
  let i = qt(t);
  ue(i);
  const s = ln(t, i, n, r);
  let o;
  if (null != s && s.X === re) return (e = an(s)) !== s && fn(t, i, n, e, r), e.s;
  if (Array.isArray(s)) {
    const t = $t(s);
    o = 2 & t ? on(s, t, !1) : s, o = Be(o, e);
  } else o = Be(void 0, e);
  return o !== s && fn(t, i, n, o, r), o;
}
function Fn(t, e, n, r) {
  t = t.s;
  let i = qt(t);
  const s = ln(t, i, n, r);
  return (e = Ce(s, e, !1, i)) !== s && null != e && fn(t, i, n, e, r), e;
}
function Rn(t, e, n, r = !1) {
  if (null == (e = Fn(t, e, n, r))) return e;
  t = t.s;
  let i = qt(t);
  if (!(2 & i)) {
    const s = an(e);
    s !== e && fn(t, i, n, e = s, r);
  }
  return e;
}
function Mn(t, e, n, r, i, s) {
  var o = 2,
    a = !!(2 & e);
  o = a ? 1 : o, i = !!i, s &&= !a, a = _n(t, e, r);
  var h = $t(a);
  const c = !!(4 & h);
  if (!c) {
    var u = a,
      l = e;
    const t = !!(2 & (h = vn(h, e)));
    t && (l = Yt(l, 2, !0));
    let r = !t,
      i = !0,
      s = 0,
      o = 0;
    for (; s < u.length; s++) {
      const e = Ce(u[s], n, !1, l);
      if (e instanceof n) {
        if (!t) {
          const t = !!(2 & $t(e.s));
          r &&= !t, i &&= t;
        }
        u[o++] = e;
      }
    }
    o < s && (u.length = o), h = Yt(h, 4, !0), h = Yt(h, 16, i), h = Yt(h, 8, r), Jt(u, h), t && Object.freeze(u);
  }
  if (s && !(8 & h || !a.length && (1 === o || 4 === o && 32 & h))) {
    for (En(h) && (a = Gt(a), h = In(h, e), e = fn(t, e, r, a)), n = a, s = h, u = 0; u < n.length; u++) (h = n[u]) !== (l = an(h)) && (n[u] = l);
    s = Yt(s, 8, !0), s = Yt(s, 16, !n.length), Jt(n, s), h = s;
  }
  return En(h) || (n = h, (h = (s = 1 === o || 4 === o && !!(32 & h)) ? Yt(h, !a.length || 16 & h && (!c || 32 & h) ? 2 : 2048, !0) : Un(h, e, i)) !== n && Jt(a, h), s && Object.freeze(a)), 2 === o && En(h) && (a = Gt(a), h = Un(h = In(h, e), e, i), Jt(a, h), fn(t, e, r, a)), a;
}
function Pn(t, e, n) {
  t = t.s;
  const r = qt(t);
  return Mn(t, r, e, n, !1, !(2 & r));
}
function Cn(t, e, n, r, i) {
  return null == r && (r = void 0), dn(t, n, r, i);
}
function On(t, e, n, r) {
  null == r && (r = void 0), t = t.s;
  let i = qt(t);
  ue(i), (n = Sn(t, i, n)) && n !== e && null != r && (i = fn(t, i, n)), fn(t, i, e, r);
}
function In(t, e) {
  return t = Yt(t, 2, !!(2 & e)), t = Yt(t, 32, !0), Yt(t, 2048, !1);
}
function Un(t, e, n) {
  return 32 & e && n || (t = Yt(t, 32, !1)), t;
}
function Dn(t, e, n, r) {
  t = t.s;
  const i = qt(t);
  ue(i), e = Mn(t, i, n, e, !0), n = null != r ? r : new n(), e.push(n), 2 & $t(n.s) ? Kt(e, 8) : Kt(e, 16);
}
function Nn(t, e) {
  return Ae(cn(t, e));
}
function Bn(t, e) {
  return t ?? e;
}
function Gn(t, e) {
  return Bn(gn(t, e), 0);
}
function jn(t, e) {
  return Bn(Pe(cn(t, e)), "");
}
function Vn(t, e, n) {
  if (null != n && "boolean" != typeof n) throw t = typeof n, Error(`Expected boolean but got ${"object" != t ? t : n ? Array.isArray(n) ? "array" : t : "null"}: ${n}`);
  dn(t, e, n);
}
function Xn(t, e, n) {
  if (null != n) {
    if ("number" != typeof n) throw _e("int32");
    if (!Number.isFinite(n)) throw _e("int32");
    n |= 0;
  }
  dn(t, e, n);
}
function Hn(t, e, n) {
  if (null != n && "number" != typeof n) throw Error(`Value of float/double field must be a number, found ${typeof n}: ${n}`);
  dn(t, e, n);
}
function Wn(t, e, n) {
  e.g ? e.m(t, e.g, e.h, n, !0) : e.m(t, e.h, n, !0);
}
Ke.prototype.toJSON = void 0, Ke.prototype.Ja = ie;
var zn = class {
  constructor(t, e) {
    this.s = Ge(t, e);
  }
  toJSON() {
    return Kn(this, tn(this.s, nn, void 0, void 0, !1), !0);
  }
  l() {
    var t = ko;
    return t.g ? t.l(this, t.g, t.h, !0) : t.l(this, t.h, t.defaultValue, !0);
  }
  clone() {
    const t = this.s;
    return sn(this, t, qt(t), !1);
  }
  P() {
    return !!(2 & $t(this.s));
  }
};
function Kn(t, e, n) {
  var r = d ? void 0 : t.constructor.B;
  const i = qt(n ? t.s : e);
  if (!(t = e.length)) return e;
  let s, o;
  if (oe(n = e[t - 1])) {
    t: {
      var a = n;
      let t = {},
        e = !1;
      for (var h in a) {
        let n = a[h];
        if (Array.isArray(n)) {
          let t = n;
          (he(n, r, +h) || se(n) && 0 === n.size) && (n = null), n != t && (e = !0);
        }
        null != n ? t[h] = n : e = !0;
      }
      if (e) {
        for (var c in t) {
          a = t;
          break t;
        }
        a = null;
      }
    }
    a != n && (s = !0), t--;
  }
  for (h = +!!(512 & i) - 1; 0 < t && (n = e[c = t - 1], c -= h, null == n || he(n, r, c) || se(n) && 0 === n.size); t--) o = !0;
  return s || o ? (e = Array.prototype.slice.call(e, 0, t), a && e.push(a), e) : e;
}
function Yn(t) {
  return Array.isArray(t) ? t[0] instanceof Bt ? t : [$r, t] : [t, void 0];
}
function $n(t, e) {
  if (Array.isArray(e)) {
    var n = $t(e);
    if (4 & n) return e;
    for (var r = 0, i = 0; r < e.length; r++) {
      const n = t(e[r]);
      null != n && (e[i++] = n);
    }
    return i < r && (e.length = i), Jt(e, -12289 & (5 | n)), 2 & n && Object.freeze(e), e;
  }
}
zn.prototype.X = re, zn.prototype.toString = function () {
  return Kn(this, this.s, !1).toString();
};
const qn = Symbol();
function Jn(t) {
  let e = t[qn];
  if (!e) {
    const n = sr(t),
      r = yr(t),
      i = r.l;
    e = i ? (t, e) => i(t, e, r) : (t, e) => {
      for (; mt(e) && 4 != e.h;) {
        var i = e.m,
          s = r[i];
        if (!s) {
          var o = r.ea;
          o && (o = o[i]) && (s = r[i] = Zn(o));
        }
        s && s(e, t, i) || (i = (s = e).l, yt(s), s.ia ? s = void 0 : (o = s.g.g - i, s.g.g = i, s = pt(s.g, o)), i = t, s && (de ||= Symbol(), (o = i[de]) ? o.push(s) : i[de] = [s]));
      }
      n === tr || n === er || n.j || (t[fe ||= Symbol()] = n);
    }, t[qn] = e;
  }
  return e;
}
function Zn(t) {
  const e = (t = Yn(t))[0].g;
  if (t = t[1]) {
    const n = Jn(t),
      r = yr(t).T;
    return (t, i, s) => e(t, i, s, r, n);
  }
  return e;
}
class Qn {}
let tr, er;
const nr = Symbol();
function rr(t, e, n) {
  const r = n[1];
  let i;
  if (r) {
    const n = r[nr];
    i = n ? n.T : Ne(r[0]), t[e] = n ?? r;
  }
  i && i === Ue ? (t.g || (t.g = new Set())).add(e) : n[0] && (t.h || (t.h = new Set())).add(e);
}
function ir(t, e) {
  return [t.l, !e || 0 < e[0] ? void 0 : e];
}
function sr(t) {
  var e = t[nr];
  if (e) return e;
  if (!(e = ar(t, t[nr] = new Qn(), ir, ir, rr)).ea && !e.h && !e.g) {
    let n = !0;
    for (let t in e) isNaN(t) || (n = !1);
    n ? (Ne(t[0]) === Ue ? er ? e = er : ((e = new Qn()).T = Ne(!0), e = er = e) : e = tr ||= new Qn(), e = t[nr] = e) : e.j = !0;
  }
  return e;
}
function or(t, e, n) {
  t[e] = n;
}
function ar(t, e, n, r, i = or) {
  e.T = Ne(t[0]);
  let s = 0;
  var o = t[++s];
  o && o.constructor === Object && (e.ea = o, "function" == typeof (o = t[++s]) && (e.l = o, e.m = t[++s], o = t[++s]));
  const a = {};
  for (; Array.isArray(o) && "number" == typeof o[0] && 0 < o[0];) {
    for (var h = 0; h < o.length; h++) a[o[h]] = o;
    o = t[++s];
  }
  for (h = 1; void 0 !== o;) {
    let l;
    "number" == typeof o && (h += o, o = t[++s]);
    var c = void 0;
    if (o instanceof Bt ? l = o : (l = qr, s--), l.pa) {
      o = t[++s], c = t;
      var u = s;
      "function" == typeof o && (o = o(), c[u] = o), c = o;
    }
    for (u = h + 1, "number" == typeof (o = t[++s]) && 0 > o && (u -= o, o = t[++s]); h < u; h++) {
      const t = a[h];
      i(e, h, c ? r(l, c, t) : n(l, t));
    }
  }
  return e;
}
const hr = Symbol();
function cr(t) {
  let e = t[hr];
  if (!e) {
    const n = fr(t);
    e = (t, e) => Er(t, e, n), t[hr] = e;
  }
  return e;
}
const ur = Symbol();
function lr(t) {
  return t.h;
}
function dr(t, e) {
  let n, r;
  const i = t.h;
  return (t, s, o) => i(t, s, o, r ||= fr(e).T, n ||= cr(e));
}
function fr(t) {
  let e = t[ur];
  return e || (e = ar(t, t[ur] = {}, lr, dr), _r(t), e);
}
const pr = Symbol();
function gr(t, e) {
  const n = t.g;
  return e ? (t, r, i) => n(t, r, i, e) : n;
}
function mr(t, e, n) {
  const r = t.g;
  let i, s;
  return (t, o, a) => r(t, o, a, s ||= yr(e).T, i ||= Jn(e), n);
}
function yr(t) {
  let e = t[pr];
  return e || (sr(t), e = ar(t, t[pr] = {}, gr, mr), _r(t), e);
}
function _r(t) {
  pr in t && nr in t && ur in t && (t.length = 0);
}
function vr(t, e) {
  var n = t[e];
  if (n) return n;
  if ((n = t.ea) && (n = n[e])) {
    var r = (n = Yn(n))[0].h;
    if (n = n[1]) {
      const e = cr(n),
        i = fr(n).T;
      n = (n = t.m) ? n(i, e) : (t, n, s) => r(t, n, s, i, e);
    } else n = r;
    return t[e] = n;
  }
}
function Er(t, e, n) {
  for (var r = qt(t), i = +!!(512 & r) - 1, s = t.length, o = 512 & r ? 1 : 0, a = s + (256 & r ? -1 : 0); o < a; o++) {
    const r = t[o];
    if (null == r) continue;
    const s = o - i,
      a = vr(n, s);
    a && a(e, r, s);
  }
  if (256 & r) {
    r = t[s - 1];
    for (let t in r) i = +t, Number.isNaN(i) || null != (s = r[t]) && (a = vr(n, i)) && a(e, s, i);
  }
  if (t = de ? t[de] : void 0) for (Ct(e, e.g.end()), n = 0; n < t.length; n++) Ct(e, N(t[n]) || C());
}
function wr(t, e) {
  return new Bt(t, e, !1, !1);
}
function Tr(t, e) {
  return new Bt(t, e, !0, !1);
}
function Ar(t, e) {
  return new Bt(t, e, !1, !0);
}
function br(t, e, n) {
  fn(t, qt(t), e, n);
}
var kr = Ar(function (t, e, n, r, i) {
  return 2 === t.h && (t = _t(t, Be([void 0, void 0], r), i), ue(r = qt(e)), (i = ln(e, r, n)) instanceof Ke ? 0 != (2 & i.N) ? ((i = i.Y()).push(t), fn(e, r, n, i)) : i.Oa(t) : Array.isArray(i) ? (2 & $t(i) && fn(e, r, n, i = wn(i)), i.push(t)) : fn(e, r, n, [t]), !0);
}, function (t, e, n, r, i) {
  if (e instanceof Ke) e.forEach((e, s) => {
    Nt(t, n, Be([s, e], r), i);
  });else if (Array.isArray(e)) for (let s = 0; s < e.length; s++) {
    const o = e[s];
    Array.isArray(o) && Nt(t, n, Be(o, r), i);
  }
});
function xr(t, e, n) {
  t: if (null != e) {
    if (Te(e)) {
      if ("string" == typeof e) {
        e = Le(e);
        break t;
      }
      if ("number" == typeof e) {
        e = Se(e);
        break t;
      }
    }
    e = void 0;
  }
  null != e && ("string" == typeof e && xt(e), null != e && (Ot(t, n, 0), "number" == typeof e ? (t = t.g, $(e), Ft(t, K, Y)) : (n = xt(e), Ft(t.g, n.h, n.g))));
}
function Sr(t, e, n) {
  null != (e = Ae(e)) && null != e && (Ot(t, n, 0), Mt(t.g, e));
}
function Lr(t, e, n) {
  null != (e = Ee(e)) && (Ot(t, n, 0), t.g.g.push(e ? 1 : 0));
}
function Fr(t, e, n) {
  null != (e = Pe(e)) && Dt(t, n, c(e));
}
function Rr(t, e, n, r, i) {
  Nt(t, n, e instanceof zn ? e.s : Array.isArray(e) ? Be(e, r) : void 0, i);
}
function Mr(t, e, n) {
  null != (e = null == e || "string" == typeof e || M(e) || e instanceof B ? e : void 0) && Dt(t, n, X(e).buffer);
}
function Pr(t, e, n) {
  return (5 === t.h || 2 === t.h) && (e = pn(e, qt(e), n, 2, !1), 2 == t.h ? wt(t, ct, e) : e.push(ct(t.g)), !0);
}
var Cr,
  Or = wr(function (t, e, n) {
    if (1 !== t.h) return !1;
    var r = t.g;
    t = ht(r);
    const i = ht(r);
    r = 2 * (i >> 31) + 1;
    const s = i >>> 20 & 2047;
    return t = 4294967296 * (1048575 & i) + t, br(e, n, 2047 == s ? t ? NaN : 1 / 0 * r : 0 == s ? r * Math.pow(2, -1074) * t : r * Math.pow(2, s - 1075) * (t + 4503599627370496)), !0;
  }, function (t, e, n) {
    null != (e = ve(e)) && (Ot(t, n, 1), t = t.g, (n = z ||= new DataView(new ArrayBuffer(8))).setFloat64(0, +e, !0), K = n.getUint32(0, !0), Y = n.getUint32(4, !0), Pt(t, K), Pt(t, Y));
  }),
  Ir = wr(function (t, e, n) {
    return 5 === t.h && (br(e, n, ct(t.g)), !0);
  }, function (t, e, n) {
    null != (e = ve(e)) && (Ot(t, n, 5), t = t.g, q(e), Pt(t, K));
  }),
  Ur = Tr(Pr, function (t, e, n) {
    if (null != (e = $n(ve, e))) for (let o = 0; o < e.length; o++) {
      var r = t,
        i = n,
        s = e[o];
      null != s && (Ot(r, i, 5), r = r.g, q(s), Pt(r, K));
    }
  }),
  Dr = Tr(Pr, function (t, e, n) {
    if (null != (e = $n(ve, e)) && e.length) {
      Ot(t, n, 2), Rt(t.g, 4 * e.length);
      for (let r = 0; r < e.length; r++) n = t.g, q(e[r]), Pt(n, K);
    }
  }),
  Nr = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, it(t.g, Z)), !0);
  }, xr),
  Br = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, 0 === (t = it(t.g, Z)) ? void 0 : t), !0);
  }, xr),
  Gr = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, it(t.g, J)), !0);
  }, function (t, e, n) {
    t: if (null != e) {
      if (Te(e)) {
        if ("string" == typeof e) {
          var r = Math.trunc(Number(e));
          Number.isSafeInteger(r) && 0 <= r ? e = String(r) : (-1 !== (r = e.indexOf(".")) && (e = e.substring(0, r)), ke(e) || (nt(e), e = Q(K, Y)));
          break t;
        }
        if ("number" == typeof e) {
          e = 0 <= (e = Math.trunc(e)) && Number.isSafeInteger(e) ? e : function (t) {
            if (0 > t) {
              $(t);
              const e = Q(K, Y);
              return t = Number(e), Number.isSafeInteger(t) ? t : e;
            }
            return ke(String(t)) ? t : ($(t), J(K, Y));
          }(e);
          break t;
        }
      }
      e = void 0;
    }
    null != e && ("string" == typeof e && At(e), null != e && (Ot(t, n, 0), "number" == typeof e ? (t = t.g, $(e), Ft(t, K, Y)) : (n = At(e), Ft(t.g, n.h, n.g))));
  }),
  jr = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, ot(t.g)), !0);
  }, Sr),
  Vr = Tr(function (t, e, n) {
    return (0 === t.h || 2 === t.h) && (e = pn(e, qt(e), n, 2, !1), 2 == t.h ? wt(t, ot, e) : e.push(ot(t.g)), !0);
  }, function (t, e, n) {
    if (null != (e = $n(Ae, e)) && e.length) {
      n = It(t, n);
      for (let n = 0; n < e.length; n++) Mt(t.g, e[n]);
      Ut(t, n);
    }
  }),
  Xr = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, 0 === (t = ot(t.g)) ? void 0 : t), !0);
  }, Sr),
  Hr = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, st(t.g)), !0);
  }, Lr),
  Wr = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, !1 === (t = st(t.g)) ? void 0 : t), !0);
  }, Lr),
  zr = Tr(function (t, e, n) {
    return 2 === t.h && (bn(e, n, kn, t = vt(t)), !0);
  }, function (t, e, n) {
    if (null != (e = $n(Pe, e))) for (let o = 0; o < e.length; o++) {
      var r = t,
        i = n,
        s = e[o];
      null != s && Dt(r, i, c(s));
    }
  }),
  Kr = wr(function (t, e, n) {
    return 2 === t.h && (br(e, n, "" === (t = vt(t)) ? void 0 : t), !0);
  }, Fr),
  Yr = wr(function (t, e, n) {
    return 2 === t.h && (br(e, n, vt(t)), !0);
  }, Fr),
  $r = Ar(function (t, e, n, r, i) {
    return 2 === t.h && (_t(t, Ln(e, r, n, !0), i), !0);
  }, Rr),
  qr = Ar(function (t, e, n, r, i) {
    return 2 === t.h && (_t(t, Ln(e, r, n), i), !0);
  }, Rr);
Cr = new Bt(function (t, e, n, r, i) {
  if (2 !== t.h) return !1;
  r = Be(void 0, r);
  let s = qt(e);
  ue(s);
  let o = pn(e, s, n, 3);
  return s = qt(e), 4 & $t(o) && (o = Gt(o), Jt(o, -2079 & (1 | $t(o))), fn(e, s, n, o)), o.push(r), _t(t, r, i), !0;
}, function (t, e, n, r, i) {
  if (Array.isArray(e)) for (let s = 0; s < e.length; s++) Rr(t, e[s], n, r, i);
}, !0, !0);
var Jr = Ar(function (t, e, n, r, i, s) {
    if (2 !== t.h) return !1;
    let o = qt(e);
    return ue(o), (s = Sn(e, o, s)) && n !== s && fn(e, o, s), _t(t, e = Ln(e, r, n), i), !0;
  }, Rr),
  Zr = wr(function (t, e, n) {
    return 2 === t.h && (br(e, n, Et(t)), !0);
  }, Mr),
  Qr = Tr(function (t, e, n) {
    return (0 === t.h || 2 === t.h) && (e = pn(e, qt(e), n, 2, !1), 2 == t.h ? wt(t, at, e) : e.push(at(t.g)), !0);
  }, function (t, e, n) {
    if (null != (e = $n(be, e))) for (let o = 0; o < e.length; o++) {
      var r = t,
        i = n,
        s = e[o];
      null != s && (Ot(r, i, 0), Rt(r.g, s));
    }
  }),
  ti = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, ot(t.g)), !0);
  }, function (t, e, n) {
    null != (e = Ae(e)) && (e = parseInt(e, 10), Ot(t, n, 0), Mt(t.g, e));
  }),
  ei = Tr(function (t, e, n) {
    return (0 === t.h || 2 === t.h) && (e = pn(e, qt(e), n, 2, !1), 2 == t.h ? wt(t, ut, e) : e.push(ot(t.g)), !0);
  }, function (t, e, n) {
    if (null != (e = $n(Ae, e)) && e.length) {
      n = It(t, n);
      for (let n = 0; n < e.length; n++) Mt(t.g, e[n]);
      Ut(t, n);
    }
  });
class ni {
  constructor(t, e) {
    this.h = t, this.g = e, this.l = Rn, this.m = Cn, this.defaultValue = void 0;
  }
}
function ri(t, e) {
  return new ni(t, e);
}
function ii(t, e) {
  return (n, r) => {
    if (Tt.length) {
      const t = Tt.pop();
      t.o(r), lt(t.g, n, r), n = t;
    } else n = new class {
      constructor(t, e) {
        if (gt.length) {
          const n = gt.pop();
          lt(n, t, e), t = n;
        } else t = new class {
          constructor(t, e) {
            this.h = null, this.m = !1, this.g = this.l = this.j = 0, lt(this, t, e);
          }
          clear() {
            this.h = null, this.m = !1, this.g = this.l = this.j = 0, this.ca = !1;
          }
        }(t, e);
        this.g = t, this.l = this.g.g, this.h = this.m = -1, this.o(e);
      }
      o({
        ia: t = !1
      } = {}) {
        this.ia = t;
      }
    }(n, r);
    try {
      const r = new t(),
        s = r.s;
      Jn(e)(s, n);
      var i = r;
    } finally {
      n.g.clear(), n.m = -1, n.h = -1, 100 > Tt.length && Tt.push(n);
    }
    return i;
  };
}
function si(t) {
  return function () {
    const e = new class {
      constructor() {
        this.l = [], this.h = 0, this.g = new class {
          constructor() {
            this.g = [];
          }
          length() {
            return this.g.length;
          }
          end() {
            const t = this.g;
            return this.g = [], t;
          }
        }();
      }
    }();
    Er(this.s, e, fr(t)), Ct(e, e.g.end());
    const n = new Uint8Array(e.h),
      r = e.l,
      i = r.length;
    let s = 0;
    for (let t = 0; t < i; t++) {
      const e = r[t];
      n.set(e, s), s += e.length;
    }
    return e.l = [n], n;
  };
}
var oi = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  ai = [0, Kr, wr(function (t, e, n) {
    return 2 === t.h && (br(e, n, (t = Et(t)) === D() ? void 0 : t), !0);
  }, function (t, e, n) {
    if (null != e) {
      if (e instanceof zn) {
        const r = e.Qa;
        return void (r && (e = r(e), null != e && Dt(t, n, X(e).buffer)));
      }
      if (Array.isArray(e)) return;
    }
    Mr(t, e, n);
  })],
  hi = [0, Yr],
  ci = [0, jr, ti, Hr, -1, Vr, ti, -1],
  ui = [0, Hr, -1],
  li = class extends zn {
    constructor() {
      super();
    }
  };
li.B = [6];
var di = [0, Hr, Yr, Hr, ti, -1, ei, Yr, -1, ui, ti],
  fi = [0, Yr, -2],
  pi = class extends zn {
    constructor() {
      super();
    }
  },
  gi = [0],
  mi = [0, jr, Hr, -4],
  yi = class extends zn {
    constructor(t) {
      super(t, 2);
    }
  },
  _i = {},
  vi = [-2, _i, Hr];
_i[336783863] = [0, Yr, Hr, -1, jr, [0, [1, 2, 3, 4, 5, 6], Jr, gi, Jr, di, Jr, fi, Jr, mi, Jr, ci, Jr, [0, Yr]], hi, Hr, [0, [1, 3], [2, 4], Jr, [0, Vr], -1, Jr, [0, zr], -1, Cr, [0, Yr, -1]], Yr];
var Ei = [0, Kr, Wr],
  wi = [0, Br, -1, Wr, -3, Br, Vr, Kr, Xr, Br, -1, Wr, Xr, Wr, -2, Kr],
  Ti = [-1, {}],
  Ai = [0, Yr, 1, Ti],
  bi = [0, Yr, zr, Ti];
function ki(t, e) {
  An(t, 2, Me(e), "");
}
function xi(t, e) {
  bn(t.s, 3, Re, e);
}
function Si(t, e) {
  bn(t.s, 4, Re, e);
}
var Li = class extends zn {
  constructor(t) {
    super(t, 500);
  }
  o(t) {
    return Cn(this, 0, 7, t);
  }
};
Li.B = [3, 4, 5, 6, 8, 13, 17, 1005];
var Fi = [-500, Kr, -1, zr, -3, vi, Cr, ai, Xr, -1, Ai, bi, Cr, Ei, Kr, wi, Xr, zr, 987, zr],
  Ri = [0, Kr, -1, Ti],
  Mi = [-500, Yr, -1, [-1, {}], 998, Yr],
  Pi = [-500, Yr, zr, -1, [-2, {}, Hr], 997, zr, -1],
  Ci = [-500, Yr, zr, Ti, 998, zr];
function Oi(t, e) {
  Dn(t, 1, Li, e);
}
function Ii(t, e) {
  bn(t.s, 10, Re, e);
}
function Ui(t, e) {
  bn(t.s, 15, Re, e);
}
var Di = class extends zn {
  constructor(t) {
    super(t, 500);
  }
  o(t) {
    return Cn(this, 0, 1001, t);
  }
};
Di.B = [1, 6, 7, 9, 10, 15, 16, 17, 14, 1002];
var Ni = [-500, Cr, Fi, 4, Cr, Mi, Cr, Pi, Xr, Cr, Ci, zr, Xr, Ai, bi, Cr, Ri, zr, -2, wi, Kr, -1, Wr, 979, Ti, Cr, ai],
  Bi = ii(Di, Ni);
Di.prototype.g = si(Ni);
var Gi = [0, Cr, [0, jr, -2]],
  ji = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Vi = [0, jr, Ir, Yr, -1],
  Xi = class extends zn {
    constructor(t) {
      super(t);
    }
    g() {
      return Pn(this, ji, 1);
    }
  };
Xi.B = [1];
var Hi = [0, Cr, Vi],
  Wi = ii(Xi, Hi),
  zi = [0, jr, Ir],
  Ki = [0, jr, -1, Gi],
  Yi = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  $i = [0, jr, -3],
  qi = [0, Ir, -3],
  Ji = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Zi = [0, Ir, -1, Yr, Ir],
  Qi = class extends zn {
    constructor(t) {
      super(t);
    }
    h() {
      return Rn(this, Yi, 2);
    }
    g() {
      return Pn(this, Ji, 5);
    }
  };
Qi.B = [5];
var ts = [0, ti, $i, qi, Ki, Cr, Zi],
  es = class extends zn {
    constructor(t) {
      super(t);
    }
  };
es.B = [1, 2, 3, 8, 9];
var ns = ii(es, [0, zr, Vr, Dr, ts, Yr, -1, Nr, Cr, zi, zr, Nr]),
  rs = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  is = [0, Ir, -4],
  ss = class extends zn {
    constructor(t) {
      super(t);
    }
  };
ss.B = [1];
var os = ii(ss, [0, Cr, is]),
  as = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  hs = [0, Ir, -4],
  cs = class extends zn {
    constructor(t) {
      super(t);
    }
  };
cs.B = [1];
var us = ii(cs, [0, Cr, hs]),
  ls = class extends zn {
    constructor(t) {
      super(t);
    }
  };
ls.B = [3];
var ds = [0, jr, -1, Dr, ti],
  fs = class extends zn {
    constructor() {
      super();
    }
  };
fs.prototype.g = si([0, Ir, -4, Nr]);
var ps = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  gs = [0, 1, jr, Yr, Hi],
  ms = class extends zn {
    constructor(t) {
      super(t);
    }
  };
ms.B = [1];
var ys = ii(ms, [0, Cr, gs, Nr]),
  _s = class extends zn {
    constructor(t) {
      super(t);
    }
  };
_s.B = [1];
var vs = class extends zn {
    constructor(t) {
      super(t);
    }
    qa() {
      const t = mn(this);
      return null == t ? D() : t;
    }
  },
  Es = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  ws = [1, 2],
  Ts = [0, ws, Jr, [0, Dr], Jr, [0, Zr], jr, Yr],
  As = class extends zn {
    constructor(t) {
      super(t);
    }
  };
As.B = [1];
var bs = ii(As, [0, Cr, Ts, Nr]),
  ks = class extends zn {
    constructor(t) {
      super(t);
    }
  };
ks.B = [4, 5];
var xs = [0, Yr, jr, Ir, zr, -1],
  Ss = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Ls = [0, Hr, -1],
  Fs = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Rs = [1, 2, 3, 4, 5],
  Ms = class extends zn {
    constructor(t) {
      super(t);
    }
    g() {
      return null != mn(this);
    }
    h() {
      return null != Pe(cn(this, 2));
    }
  },
  Ps = [0, Zr, Yr, [0, jr, Nr, -1], [0, Gr, Nr]],
  Cs = class extends zn {
    constructor(t) {
      super(t);
    }
    g() {
      return Ee(cn(this, 2)) ?? !1;
    }
  },
  Os = [0, Ps, Hr, [0, Rs, Jr, mi, Jr, di, Jr, ci, Jr, gi, Jr, fi], ti],
  Is = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Us = [0, Os, Ir, -1, jr],
  Ds = ri(502141897, Is);
_i[502141897] = Us;
var Ns = [0, Ps];
_i[512499200] = Ns;
var Bs = [0, Ns];
_i[515723506] = Bs;
var Gs = ii(class extends zn {
    constructor(t) {
      super(t);
    }
  }, [0, [0, ti, -1, Ur, Qr], ds]),
  js = [0, Os];
_i[508981768] = js;
var Vs = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Xs = [0, Os, Ir, js, Hr],
  Hs = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Ws = [0, Os, Us, Xs, Ir, Bs];
_i[508968149] = Xs;
var zs = ri(508968150, Hs);
_i[508968150] = Ws;
var Ks = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Ys = ri(513916220, Ks);
_i[513916220] = [0, Os, Ws, jr];
var $s = class extends zn {
    constructor(t) {
      super(t);
    }
    h() {
      return Rn(this, ks, 2);
    }
    g() {
      dn(this, 2);
    }
  },
  qs = [0, Os, xs];
_i[478825465] = qs;
var Js = [0, Os];
_i[478825422] = Js;
var Zs = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Qs = [0, Os, Js, qs, -1],
  to = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  eo = [0, Os, Ir, jr],
  no = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  ro = [0, Os, Ir],
  io = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  so = [0, Os, eo, ro, Ir],
  oo = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  ao = [0, Os, so, Qs];
_i[463370452] = Qs, _i[464864288] = eo, _i[474472470] = ro;
var ho = ri(462713202, io);
_i[462713202] = so;
var co = ri(479097054, oo);
_i[479097054] = ao;
var uo = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  lo = [0, Os],
  fo = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  po = [0, Os, Ir, -1, jr];
_i[514774813] = po;
var go = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  mo = [0, Os, Ir, Hr];
_i[518928384] = mo;
var yo = class extends zn {
  constructor() {
    super();
  }
};
yo.prototype.g = si([0, Os, ro, lo, Us, Xs, po, mo]);
var _o = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  vo = ri(456383383, _o);
_i[456383383] = [0, Os, xs];
var Eo = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  wo = ri(476348187, Eo);
_i[476348187] = [0, Os, Ls];
var To = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Ao = [0, ti, -1],
  bo = class extends zn {
    constructor(t) {
      super(t);
    }
  };
bo.B = [3];
var ko = ri(458105876, class extends zn {
  constructor(t) {
    super(t);
  }
  g() {
    var t = this.s;
    const e = qt(t);
    var n = 2 & e;
    return t = function (t, e, n) {
      var r = bo;
      const i = 2 & e;
      let s = !1;
      if (null == n) {
        if (i) return Ze();
        n = [];
      } else if (n.constructor === Ke) {
        if (0 == (2 & n.N) || i) return n;
        n = n.Y();
      } else Array.isArray(n) ? s = !!(2 & $t(n)) : n = [];
      if (i) {
        if (!n.length) return Ze();
        s || (s = !0, Zt(n));
      } else s && (s = !1, n = wn(n));
      return s || (64 & $t(n) ? Kt(n, 32) : 32 & e && zt(n, 32)), fn(t, e, 2, r = new Ke(n, r, Oe, void 0), !1), r;
    }(t, e, ln(t, e, 2)), null == t || !n && bo && (t.ta = !0), n = t;
  }
});
_i[458105876] = [0, Ao, kr, [!0, Nr, [0, Yr, -1, zr]]];
var xo = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  So = ri(458105758, xo);
_i[458105758] = [0, Os, Yr, Ao];
var Lo = class extends zn {
  constructor(t) {
    super(t);
  }
};
Lo.B = [5, 6];
var Fo = ri(443442058, Lo);
_i[443442058] = [0, Os, Yr, jr, Ir, zr, -1];
var Ro = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Mo = ri(516587230, Ro);
function Po(t, e) {
  return e = e ? e.clone() : new ks(), void 0 !== t.displayNamesLocale ? dn(e, 1, Me(t.displayNamesLocale)) : void 0 === t.displayNamesLocale && dn(e, 1), void 0 !== t.maxResults ? Xn(e, 2, t.maxResults) : "maxResults" in t && dn(e, 2), void 0 !== t.scoreThreshold ? Hn(e, 3, t.scoreThreshold) : "scoreThreshold" in t && dn(e, 3), void 0 !== t.categoryAllowlist ? Tn(e, 4, t.categoryAllowlist) : "categoryAllowlist" in t && dn(e, 4), void 0 !== t.categoryDenylist ? Tn(e, 5, t.categoryDenylist) : "categoryDenylist" in t && dn(e, 5), e;
}
function Co(t, e = -1, n = "") {
  return {
    categories: t.map(t => ({
      index: Bn(Nn(t, 1), 0) ?? -1,
      score: Gn(t, 2) ?? 0,
      categoryName: jn(t, 3) ?? "",
      displayName: jn(t, 4) ?? ""
    })),
    headIndex: e,
    headName: n
  };
}
function Oo(t) {
  var e = yn(t, 3, ve),
    n = yn(t, 2, Ae),
    r = yn(t, 1, Pe),
    i = yn(t, 9, Pe);
  const s = {
    categories: [],
    keypoints: []
  };
  for (let t = 0; t < e.length; t++) s.categories.push({
    score: e[t],
    index: n[t] ?? -1,
    categoryName: r[t] ?? "",
    displayName: i[t] ?? ""
  });
  if ((e = Rn(t, Qi, 4)?.h()) && (s.boundingBox = {
    originX: Nn(e, 1) ?? 0,
    originY: Nn(e, 2) ?? 0,
    width: Nn(e, 3) ?? 0,
    height: Nn(e, 4) ?? 0,
    angle: 0
  }), Rn(t, Qi, 4)?.g().length) for (const e of Rn(t, Qi, 4).g()) s.keypoints.push({
    x: gn(e, 1) ?? 0,
    y: gn(e, 2) ?? 0,
    score: gn(e, 4) ?? 0,
    label: Pe(cn(e, 3)) ?? ""
  });
  return s;
}
function Io(t) {
  const e = [];
  for (const n of Pn(t, as, 1)) e.push({
    x: Gn(n, 1) ?? 0,
    y: Gn(n, 2) ?? 0,
    z: Gn(n, 3) ?? 0,
    visibility: Gn(n, 4) ?? 0
  });
  return e;
}
function Uo(t) {
  const e = [];
  for (const n of Pn(t, rs, 1)) e.push({
    x: Gn(n, 1) ?? 0,
    y: Gn(n, 2) ?? 0,
    z: Gn(n, 3) ?? 0,
    visibility: Gn(n, 4) ?? 0
  });
  return e;
}
function Do(t) {
  return Array.from(t, t => 127 < t ? t - 256 : t);
}
function No(t, e) {
  if (t.length !== e.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t.length} vs. ${e.length}).`);
  let n = 0,
    r = 0,
    i = 0;
  for (let s = 0; s < t.length; s++) n += t[s] * e[s], r += t[s] * t[s], i += e[s] * e[s];
  if (0 >= r || 0 >= i) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
  return n / Math.sqrt(r * i);
}
let Bo;
_i[516587230] = [0, Os, po, mo, Ir];
const Go = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function jo() {
  if (void 0 === Bo) try {
    await WebAssembly.instantiate(Go), Bo = !0;
  } catch {
    Bo = !1;
  }
  return Bo;
}
async function Vo(t, e = "") {
  const n = (await jo()) ? "wasm_internal" : "wasm_nosimd_internal";
  return {
    wasmLoaderPath: `${e}/${t}_${n}.js`,
    wasmBinaryPath: `${e}/${t}_${n}.wasm`
  };
}
var Xo = class {};
exports.FilesetResolver = Xo;
function Ho() {
  var t = navigator;
  return "undefined" != typeof OffscreenCanvas && (!function (t = navigator) {
    return (t = t.userAgent).includes("Safari") && !t.includes("Chrome");
  }(t) || !!((t = t.userAgent.match(/Version\/([\d]+).*Safari/)) && 1 <= t.length && 17 <= Number(t[1])));
}
async function Wo(t) {
  if ("function" != typeof importScripts) {
    const e = document.createElement("script");
    return e.src = t.toString(), e.crossOrigin = "anonymous", new Promise((t, n) => {
      e.addEventListener("load", () => {
        t();
      }, !1), e.addEventListener("error", t => {
        n(t);
      }, !1), document.body.appendChild(e);
    });
  }
  importScripts(t.toString());
}
function zo(t) {
  return void 0 !== t.videoWidth ? [t.videoWidth, t.videoHeight] : void 0 !== t.naturalWidth ? [t.naturalWidth, t.naturalHeight] : void 0 !== t.displayWidth ? [t.displayWidth, t.displayHeight] : [t.width, t.height];
}
function Ko(t, e, n) {
  t.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), n(e = t.i.stringToNewUTF8(e)), t.i._free(e);
}
function Yo(t, e, n) {
  if (!t.i.canvas) throw Error("No OpenGL canvas configured.");
  if (n ? t.i._bindTextureToStream(n) : t.i._bindTextureToCanvas(), !(n = t.i.canvas.getContext("webgl2") || t.i.canvas.getContext("webgl"))) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
  t.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !0), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, e), t.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1);
  const [r, i] = zo(e);
  return !t.l || r === t.i.canvas.width && i === t.i.canvas.height || (t.i.canvas.width = r, t.i.canvas.height = i), [r, i];
}
function $o(t, e, n) {
  t.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
  const r = new Uint32Array(e.length);
  for (let n = 0; n < e.length; n++) r[n] = t.i.stringToNewUTF8(e[n]);
  e = t.i._malloc(4 * r.length), t.i.HEAPU32.set(r, e >> 2), n(e);
  for (const e of r) t.i._free(e);
  t.i._free(e);
}
function qo(t, e, n) {
  t.i.simpleListeners = t.i.simpleListeners || {}, t.i.simpleListeners[e] = n;
}
function Jo(t, e, n) {
  let r = [];
  t.i.simpleListeners = t.i.simpleListeners || {}, t.i.simpleListeners[e] = (t, e, i) => {
    e ? (n(r, i), r = []) : r.push(t);
  };
}
Xo.forVisionTasks = function (t) {
  return Vo("vision", t);
}, Xo.forTextTasks = function (t) {
  return Vo("text", t);
}, Xo.forGenAiExperimentalTasks = function (t) {
  return Vo("genai_experimental", t);
}, Xo.forGenAiTasks = function (t) {
  return Vo("genai", t);
}, Xo.forAudioTasks = function (t) {
  return Vo("audio", t);
}, Xo.isSimdSupported = function () {
  return jo();
};
async function Zo(t, e, n, r) {
  return t = await (async (t, e, n, r, i) => {
    if (e && (await Wo(e)), !self.ModuleFactory) throw Error("ModuleFactory not set.");
    if (n && (await Wo(n), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
    return self.Module && i && ((e = self.Module).locateFile = i.locateFile, i.mainScriptUrlOrBlob && (e.mainScriptUrlOrBlob = i.mainScriptUrlOrBlob)), i = await self.ModuleFactory(self.Module || i), self.ModuleFactory = self.Module = void 0, new t(i, r);
  })(t, n.wasmLoaderPath, n.assetLoaderPath, e, {
    locateFile: t => t.endsWith(".wasm") ? n.wasmBinaryPath.toString() : n.assetBinaryPath && t.endsWith(".data") ? n.assetBinaryPath.toString() : t
  }), await t.o(r), t;
}
function Qo(t, e) {
  const n = Rn(t.baseOptions, Ms, 1) || new Ms();
  "string" == typeof e ? (dn(n, 2, Me(e)), dn(n, 1)) : e instanceof Uint8Array && (dn(n, 1, ae(e, !1, !1)), dn(n, 2)), Cn(t.baseOptions, 0, 1, n);
}
function ta(t) {
  try {
    const e = t.K.length;
    if (1 === e) throw Error(t.K[0].message);
    if (1 < e) throw Error("Encountered multiple errors: " + t.K.map(t => t.message).join(", "));
  } finally {
    t.K = [];
  }
}
function ea(t, e) {
  t.J = Math.max(t.J, e);
}
function na(t, e) {
  t.C = new Li(), ki(t.C, "PassThroughCalculator"), xi(t.C, "free_memory"), Si(t.C, "free_memory_unused_out"), Ii(e, "free_memory"), Oi(e, t.C);
}
function ra(t, e) {
  xi(t.C, e), Si(t.C, e + "_unused_out");
}
function ia(t) {
  t.g.addBoolToStream(!0, "free_memory", t.J);
}
var sa = class {
  constructor(t) {
    this.g = t, this.K = [], this.J = 0, this.g.setAutoRenderToScreen(!1);
  }
  l(t, e = !0) {
    if (e) {
      const e = t.baseOptions || {};
      if (t.baseOptions?.modelAssetBuffer && t.baseOptions?.modelAssetPath) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
      if (!(Rn(this.baseOptions, Ms, 1)?.g() || Rn(this.baseOptions, Ms, 1)?.h() || t.baseOptions?.modelAssetBuffer || t.baseOptions?.modelAssetPath)) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
      if (function (t, e) {
        let n = Rn(t.baseOptions, Fs, 3);
        if (!n) {
          var r = n = new Fs(),
            i = new pi();
          On(r, 4, Rs, i);
        }
        "delegate" in e && ("GPU" === e.delegate ? (e = n, r = new li(), On(e, 2, Rs, r)) : (e = n, r = new pi(), On(e, 4, Rs, r))), Cn(t.baseOptions, 0, 3, n);
      }(this, e), e.modelAssetPath) return fetch(e.modelAssetPath.toString()).then(t => {
        if (t.ok) return t.arrayBuffer();
        throw Error(`Failed to fetch model: ${e.modelAssetPath} (${t.status})`);
      }).then(t => {
        try {
          this.g.i.FS_unlink("/model.dat");
        } catch {}
        this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(t), !0, !1, !1), Qo(this, "/model.dat"), this.m(), this.L();
      });
      if (e.modelAssetBuffer instanceof Uint8Array) Qo(this, e.modelAssetBuffer);else if (e.modelAssetBuffer) return async function (t) {
        const e = [];
        for (var n = 0;;) {
          const {
            done: r,
            value: i
          } = await t.read();
          if (r) break;
          e.push(i), n += i.length;
        }
        if (0 === e.length) return new Uint8Array(0);
        if (1 === e.length) return e[0];
        t = new Uint8Array(n), n = 0;
        for (const r of e) t.set(r, n), n += r.length;
        return t;
      }(e.modelAssetBuffer).then(t => {
        Qo(this, t), this.m(), this.L();
      });
    }
    return this.m(), this.L(), Promise.resolve();
  }
  L() {}
  fa() {
    let t;
    if (this.g.fa(e => {
      t = Bi(e);
    }), !t) throw Error("Failed to retrieve CalculatorGraphConfig");
    return t;
  }
  setGraph(t, e) {
    this.g.attachErrorListener((t, e) => {
      this.K.push(Error(e));
    }), this.g.Ma(), this.g.setGraph(t, e), this.C = void 0, ta(this);
  }
  finishProcessing() {
    this.g.finishProcessing(), ta(this);
  }
  close() {
    this.C = void 0, this.g.closeGraph();
  }
};
function oa(t, e) {
  if (!t) throw Error(`Unable to obtain required WebGL resource: ${e}`);
  return t;
}
sa.prototype.close = sa.prototype.close, function (e, n) {
  e = e.split(".");
  var r,
    i = t;
  e[0] in i || void 0 === i.execScript || i.execScript("var " + e[0]);
  for (; e.length && (r = e.shift());) e.length || void 0 === n ? i = i[r] && i[r] !== Object.prototype[r] ? i[r] : i[r] = {} : i[r] = n;
}("TaskRunner", sa);
class aa {
  constructor(t, e, n, r) {
    this.g = t, this.h = e, this.m = n, this.l = r;
  }
  bind() {
    this.g.bindVertexArray(this.h);
  }
  close() {
    this.g.deleteVertexArray(this.h), this.g.deleteBuffer(this.m), this.g.deleteBuffer(this.l);
  }
}
function ha(t, e, n) {
  const r = t.g;
  if (n = oa(r.createShader(n), "Failed to create WebGL shader"), r.shaderSource(n, e), r.compileShader(n), !r.getShaderParameter(n, r.COMPILE_STATUS)) throw Error(`Could not compile WebGL shader: ${r.getShaderInfoLog(n)}`);
  return r.attachShader(t.h, n), n;
}
function ca(t, e) {
  const n = t.g,
    r = oa(n.createVertexArray(), "Failed to create vertex array");
  n.bindVertexArray(r);
  const i = oa(n.createBuffer(), "Failed to create buffer");
  n.bindBuffer(n.ARRAY_BUFFER, i), n.enableVertexAttribArray(t.K), n.vertexAttribPointer(t.K, 2, n.FLOAT, !1, 0, 0), n.bufferData(n.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), n.STATIC_DRAW);
  const s = oa(n.createBuffer(), "Failed to create buffer");
  return n.bindBuffer(n.ARRAY_BUFFER, s), n.enableVertexAttribArray(t.J), n.vertexAttribPointer(t.J, 2, n.FLOAT, !1, 0, 0), n.bufferData(n.ARRAY_BUFFER, new Float32Array(e ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), n.STATIC_DRAW), n.bindBuffer(n.ARRAY_BUFFER, null), n.bindVertexArray(null), new aa(n, r, i, s);
}
function ua(t, e) {
  if (t.g) {
    if (e !== t.g) throw Error("Cannot change GL context once initialized");
  } else t.g = e;
}
function la(t, e, n, r) {
  return ua(t, e), t.h || (t.m(), t.D()), n ? (t.v || (t.v = ca(t, !0)), n = t.v) : (t.A || (t.A = ca(t, !1)), n = t.A), e.useProgram(t.h), n.bind(), t.l(), t = r(), n.g.bindVertexArray(null), t;
}
function da(t, e, n) {
  return ua(t, e), t = oa(e.createTexture(), "Failed to create texture"), e.bindTexture(e.TEXTURE_2D, t), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, n ?? e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, n ?? e.LINEAR), e.bindTexture(e.TEXTURE_2D, null), t;
}
function fa(t, e, n) {
  ua(t, e), t.u || (t.u = oa(e.createFramebuffer(), "Failed to create framebuffe.")), e.bindFramebuffer(e.FRAMEBUFFER, t.u), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, n, 0);
}
function pa(t) {
  t.g?.bindFramebuffer(t.g.FRAMEBUFFER, null);
}
var ga = class {
  H() {
    return "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D inputTexture;\n  void main() {\n    gl_FragColor = texture2D(inputTexture, vTex);\n  }\n ";
  }
  m() {
    const t = this.g;
    if (this.h = oa(t.createProgram(), "Failed to create WebGL program"), this.ba = ha(this, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", t.VERTEX_SHADER), this.aa = ha(this, this.H(), t.FRAGMENT_SHADER), t.linkProgram(this.h), !t.getProgramParameter(this.h, t.LINK_STATUS)) throw Error(`Error during program linking: ${t.getProgramInfoLog(this.h)}`);
    this.K = t.getAttribLocation(this.h, "aVertex"), this.J = t.getAttribLocation(this.h, "aTex");
  }
  D() {}
  l() {}
  close() {
    if (this.h) {
      const t = this.g;
      t.deleteProgram(this.h), t.deleteShader(this.ba), t.deleteShader(this.aa);
    }
    this.u && this.g.deleteFramebuffer(this.u), this.A && this.A.close(), this.v && this.v.close();
  }
};
var ma = class extends ga {
    H() {
      return "\n  precision mediump float;\n  uniform sampler2D backgroundTexture;\n  uniform sampler2D maskTexture;\n  uniform sampler2D colorMappingTexture;\n  varying vec2 vTex;\n  void main() {\n    vec4 backgroundColor = texture2D(backgroundTexture, vTex);\n    float category = texture2D(maskTexture, vTex).r;\n    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));\n    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);\n  }\n ";
    }
    D() {
      const t = this.g;
      t.activeTexture(t.TEXTURE1), this.C = da(this, t, t.LINEAR), t.activeTexture(t.TEXTURE2), this.j = da(this, t, t.NEAREST);
    }
    m() {
      super.m();
      const t = this.g;
      this.M = oa(t.getUniformLocation(this.h, "backgroundTexture"), "Uniform location"), this.V = oa(t.getUniformLocation(this.h, "colorMappingTexture"), "Uniform location"), this.L = oa(t.getUniformLocation(this.h, "maskTexture"), "Uniform location");
    }
    l() {
      super.l();
      const t = this.g;
      t.uniform1i(this.L, 0), t.uniform1i(this.M, 1), t.uniform1i(this.V, 2);
    }
    close() {
      this.C && this.g.deleteTexture(this.C), this.j && this.g.deleteTexture(this.j), super.close();
    }
  },
  ya = class extends ga {
    H() {
      return "\n  precision mediump float;\n  uniform sampler2D maskTexture;\n  uniform sampler2D defaultTexture;\n  uniform sampler2D overlayTexture;\n  varying vec2 vTex;\n  void main() {\n    float confidence = texture2D(maskTexture, vTex).r;\n    vec4 defaultColor = texture2D(defaultTexture, vTex);\n    vec4 overlayColor = texture2D(overlayTexture, vTex);\n    // Apply the alpha from the overlay and merge in the default color\n    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);\n    gl_FragColor = mix(defaultColor, overlayColor, confidence);\n  }\n ";
    }
    D() {
      const t = this.g;
      t.activeTexture(t.TEXTURE1), this.j = da(this, t), t.activeTexture(t.TEXTURE2), this.C = da(this, t);
    }
    m() {
      super.m();
      const t = this.g;
      this.L = oa(t.getUniformLocation(this.h, "defaultTexture"), "Uniform location"), this.M = oa(t.getUniformLocation(this.h, "overlayTexture"), "Uniform location"), this.I = oa(t.getUniformLocation(this.h, "maskTexture"), "Uniform location");
    }
    l() {
      super.l();
      const t = this.g;
      t.uniform1i(this.I, 0), t.uniform1i(this.L, 1), t.uniform1i(this.M, 2);
    }
    close() {
      this.j && this.g.deleteTexture(this.j), this.C && this.g.deleteTexture(this.C), super.close();
    }
  };
function _a(t, e) {
  switch (e) {
    case 0:
      return t.g.find(t => t instanceof Uint8Array);
    case 1:
      return t.g.find(t => t instanceof Float32Array);
    case 2:
      return t.g.find(t => "undefined" != typeof WebGLTexture && t instanceof WebGLTexture);
    default:
      throw Error(`Type is not supported: ${e}`);
  }
}
function va(t) {
  var e = _a(t, 1);
  if (!e) {
    if (e = _a(t, 0)) e = new Float32Array(e).map(t => t / 255);else {
      e = new Float32Array(t.width * t.height);
      const r = wa(t);
      var n = Aa(t);
      if (fa(n, r, Ea(t)), "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in self.document) {
        n = new Float32Array(t.width * t.height * 4), r.readPixels(0, 0, t.width, t.height, r.RGBA, r.FLOAT, n);
        for (let t = 0, r = 0; t < e.length; ++t, r += 4) e[t] = n[r];
      } else r.readPixels(0, 0, t.width, t.height, r.RED, r.FLOAT, e);
    }
    t.g.push(e);
  }
  return e;
}
function Ea(t) {
  let e = _a(t, 2);
  if (!e) {
    const n = wa(t);
    e = ba(t);
    const r = va(t),
      i = Ta(t);
    n.texImage2D(n.TEXTURE_2D, 0, i, t.width, t.height, 0, n.RED, n.FLOAT, r), ka(t);
  }
  return e;
}
function wa(t) {
  if (!t.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return t.h || (t.h = oa(t.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t.h;
}
function Ta(t) {
  if (t = wa(t), !xa) if (t.getExtension("EXT_color_buffer_float") && t.getExtension("OES_texture_float_linear") && t.getExtension("EXT_float_blend")) xa = t.R32F;else {
    if (!t.getExtension("EXT_color_buffer_half_float")) throw Error("GPU does not fully support 4-channel float32 or float16 formats");
    xa = t.R16F;
  }
  return xa;
}
function Aa(t) {
  return t.l || (t.l = new ga()), t.l;
}
function ba(t) {
  const e = wa(t);
  e.viewport(0, 0, t.width, t.height), e.activeTexture(e.TEXTURE0);
  let n = _a(t, 2);
  return n || (n = da(Aa(t), e, t.m ? e.LINEAR : e.NEAREST), t.g.push(n), t.j = !0), e.bindTexture(e.TEXTURE_2D, n), n;
}
function ka(t) {
  t.h.bindTexture(t.h.TEXTURE_2D, null);
}
var xa,
  Sa = class {
    constructor(t, e, n, r, i, s, o) {
      this.g = t, this.m = e, this.j = n, this.canvas = r, this.l = i, this.width = s, this.height = o, this.j && 0 === --La && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.");
    }
    Ha() {
      return !!_a(this, 0);
    }
    la() {
      return !!_a(this, 1);
    }
    R() {
      return !!_a(this, 2);
    }
    ka() {
      return (e = _a(t = this, 0)) || (e = va(t), e = new Uint8Array(e.map(t => 255 * t)), t.g.push(e)), e;
      var t, e;
    }
    ja() {
      return va(this);
    }
    O() {
      return Ea(this);
    }
    clone() {
      const t = [];
      for (const e of this.g) {
        let n;
        if (e instanceof Uint8Array) n = new Uint8Array(e);else if (e instanceof Float32Array) n = new Float32Array(e);else {
          if (!(e instanceof WebGLTexture)) throw Error(`Type is not supported: ${e}`);
          {
            const t = wa(this),
              e = Aa(this);
            t.activeTexture(t.TEXTURE1), n = da(e, t, this.m ? t.LINEAR : t.NEAREST), t.bindTexture(t.TEXTURE_2D, n);
            const r = Ta(this);
            t.texImage2D(t.TEXTURE_2D, 0, r, this.width, this.height, 0, t.RED, t.FLOAT, null), t.bindTexture(t.TEXTURE_2D, null), fa(e, t, n), la(e, t, !1, () => {
              ba(this), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.drawArrays(t.TRIANGLE_FAN, 0, 4), ka(this);
            }), pa(e), ka(this);
          }
        }
        t.push(n);
      }
      return new Sa(t, this.m, this.R(), this.canvas, this.l, this.width, this.height);
    }
    close() {
      this.j && wa(this).deleteTexture(_a(this, 2)), La = -1;
    }
  };
exports.MPMask = Sa;
Sa.prototype.close = Sa.prototype.close, Sa.prototype.clone = Sa.prototype.clone, Sa.prototype.getAsWebGLTexture = Sa.prototype.O, Sa.prototype.getAsFloat32Array = Sa.prototype.ja, Sa.prototype.getAsUint8Array = Sa.prototype.ka, Sa.prototype.hasWebGLTexture = Sa.prototype.R, Sa.prototype.hasFloat32Array = Sa.prototype.la, Sa.prototype.hasUint8Array = Sa.prototype.Ha;
var La = 250;
const Fa = {
  color: "white",
  lineWidth: 4,
  radius: 6
};
function Ra(t) {
  return {
    ...Fa,
    fillColor: (t = t || {}).color,
    ...t
  };
}
function Ma(t, e) {
  return t instanceof Function ? t(e) : t;
}
function Pa(t, e, n) {
  return Math.max(Math.min(e, n), Math.min(Math.max(e, n), t));
}
function Ca(t) {
  if (!t.l) throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.");
  return t.l;
}
function Oa(t) {
  if (!t.j) throw Error("GPU rendering requested but WebGL2RenderingContext not provided.");
  return t.j;
}
function Ia(t, e, n) {
  if (e.R()) n(e.O());else {
    const r = e.la() ? e.ja() : e.ka();
    t.m = t.m ?? new ga();
    const i = Oa(t);
    n((t = new Sa([r], e.m, !1, i.canvas, t.m, e.width, e.height)).O()), t.close();
  }
}
function Ua(t, e, n, r) {
  const i = function (t) {
      return t.g || (t.g = new ma()), t.g;
    }(t),
    s = Oa(t),
    o = Array.isArray(n) ? new ImageData(new Uint8ClampedArray(n), 1, 1) : n;
  la(i, s, !0, () => {
    !function (t, e, n, r) {
      const i = t.g;
      if (i.activeTexture(i.TEXTURE0), i.bindTexture(i.TEXTURE_2D, e), i.activeTexture(i.TEXTURE1), i.bindTexture(i.TEXTURE_2D, t.C), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, n), t.I && function (t, e) {
        if (t !== e) return !1;
        t = t.entries(), e = e.entries();
        for (const [r, i] of t) {
          t = r;
          const s = i;
          var n = e.next();
          if (n.done) return !1;
          const [o, a] = n.value;
          if (n = a, t !== o || s[0] !== n[0] || s[1] !== n[1] || s[2] !== n[2] || s[3] !== n[3]) return !1;
        }
        return !!e.next().done;
      }(t.I, r)) i.activeTexture(i.TEXTURE2), i.bindTexture(i.TEXTURE_2D, t.j);else {
        t.I = r;
        const e = Array(1024).fill(0);
        r.forEach((t, n) => {
          if (4 !== t.length) throw Error(`Color at index ${n} is not a four-channel value.`);
          e[4 * n] = t[0], e[4 * n + 1] = t[1], e[4 * n + 2] = t[2], e[4 * n + 3] = t[3];
        }), i.activeTexture(i.TEXTURE2), i.bindTexture(i.TEXTURE_2D, t.j), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, 256, 1, 0, i.RGBA, i.UNSIGNED_BYTE, new Uint8Array(e));
      }
    }(i, e, o, r), s.clearColor(0, 0, 0, 0), s.clear(s.COLOR_BUFFER_BIT), s.drawArrays(s.TRIANGLE_FAN, 0, 4);
    const t = i.g;
    t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE2), t.bindTexture(t.TEXTURE_2D, null);
  });
}
function Da(t, e, n, r) {
  const i = Oa(t),
    s = function (t) {
      return t.h || (t.h = new ya()), t.h;
    }(t),
    o = Array.isArray(n) ? new ImageData(new Uint8ClampedArray(n), 1, 1) : n,
    a = Array.isArray(r) ? new ImageData(new Uint8ClampedArray(r), 1, 1) : r;
  la(s, i, !0, () => {
    var t = s.g;
    t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, e), t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, s.j), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, o), t.activeTexture(t.TEXTURE2), t.bindTexture(t.TEXTURE_2D, s.C), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, a), i.clearColor(0, 0, 0, 0), i.clear(i.COLOR_BUFFER_BIT), i.drawArrays(i.TRIANGLE_FAN, 0, 4), i.bindTexture(i.TEXTURE_2D, null), (t = s.g).activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE2), t.bindTexture(t.TEXTURE_2D, null);
  });
}
var Na = class {
  constructor(t, e) {
    t instanceof CanvasRenderingContext2D || t instanceof OffscreenCanvasRenderingContext2D ? (this.l = t, this.j = e) : this.j = t;
  }
  Aa(t, e) {
    if (t) {
      var n = Ca(this);
      e = Ra(e), n.save();
      var r = n.canvas,
        i = 0;
      for (const s of t) n.fillStyle = Ma(e.fillColor, {
        index: i,
        from: s
      }), n.strokeStyle = Ma(e.color, {
        index: i,
        from: s
      }), n.lineWidth = Ma(e.lineWidth, {
        index: i,
        from: s
      }), (t = new Path2D()).arc(s.x * r.width, s.y * r.height, Ma(e.radius, {
        index: i,
        from: s
      }), 0, 2 * Math.PI), n.fill(t), n.stroke(t), ++i;
      n.restore();
    }
  }
  za(t, e, n) {
    if (t && e) {
      var r = Ca(this);
      n = Ra(n), r.save();
      var i = r.canvas,
        s = 0;
      for (const o of e) {
        r.beginPath(), e = t[o.start];
        const a = t[o.end];
        e && a && (r.strokeStyle = Ma(n.color, {
          index: s,
          from: e,
          to: a
        }), r.lineWidth = Ma(n.lineWidth, {
          index: s,
          from: e,
          to: a
        }), r.moveTo(e.x * i.width, e.y * i.height), r.lineTo(a.x * i.width, a.y * i.height)), ++s, r.stroke();
      }
      r.restore();
    }
  }
  wa(t, e) {
    const n = Ca(this);
    e = Ra(e), n.save(), n.beginPath(), n.lineWidth = Ma(e.lineWidth, {}), n.strokeStyle = Ma(e.color, {}), n.fillStyle = Ma(e.fillColor, {}), n.moveTo(t.originX, t.originY), n.lineTo(t.originX + t.width, t.originY), n.lineTo(t.originX + t.width, t.originY + t.height), n.lineTo(t.originX, t.originY + t.height), n.lineTo(t.originX, t.originY), n.stroke(), n.fill(), n.restore();
  }
  xa(t, e, n = [0, 0, 0, 255]) {
    this.l ? function (t, e, n, r) {
      const i = Oa(t);
      Ia(t, e, e => {
        Ua(t, e, n, r), (e = Ca(t)).drawImage(i.canvas, 0, 0, e.canvas.width, e.canvas.height);
      });
    }(this, t, n, e) : Ua(this, t.O(), n, e);
  }
  ya(t, e, n) {
    this.l ? function (t, e, n, r) {
      const i = Oa(t);
      Ia(t, e, e => {
        Da(t, e, n, r), (e = Ca(t)).drawImage(i.canvas, 0, 0, e.canvas.width, e.canvas.height);
      });
    }(this, t, e, n) : Da(this, t.O(), e, n);
  }
  close() {
    this.g?.close(), this.g = void 0, this.h?.close(), this.h = void 0, this.m?.close(), this.m = void 0;
  }
};
exports.DrawingUtils = Na;
function Ba(t, e) {
  switch (e) {
    case 0:
      return t.g.find(t => t instanceof ImageData);
    case 1:
      return t.g.find(t => "undefined" != typeof ImageBitmap && t instanceof ImageBitmap);
    case 2:
      return t.g.find(t => "undefined" != typeof WebGLTexture && t instanceof WebGLTexture);
    default:
      throw Error(`Type is not supported: ${e}`);
  }
}
function Ga(t) {
  var e = Ba(t, 0);
  if (!e) {
    e = Va(t);
    const n = Xa(t),
      r = new Uint8Array(t.width * t.height * 4);
    fa(n, e, ja(t)), e.readPixels(0, 0, t.width, t.height, e.RGBA, e.UNSIGNED_BYTE, r), pa(n), e = new ImageData(new Uint8ClampedArray(r.buffer), t.width, t.height), t.g.push(e);
  }
  return e;
}
function ja(t) {
  let e = Ba(t, 2);
  if (!e) {
    const n = Va(t);
    e = Ha(t);
    const r = Ba(t, 1) || Ga(t);
    n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, r), Wa(t);
  }
  return e;
}
function Va(t) {
  if (!t.canvas) throw Error("Conversion to different image formats require that a canvas is passed when iniitializing the image.");
  return t.h || (t.h = oa(t.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t.h;
}
function Xa(t) {
  return t.l || (t.l = new ga()), t.l;
}
function Ha(t) {
  const e = Va(t);
  e.viewport(0, 0, t.width, t.height), e.activeTexture(e.TEXTURE0);
  let n = Ba(t, 2);
  return n || (n = da(Xa(t), e), t.g.push(n), t.m = !0), e.bindTexture(e.TEXTURE_2D, n), n;
}
function Wa(t) {
  t.h.bindTexture(t.h.TEXTURE_2D, null);
}
function za(t) {
  const e = Va(t);
  return la(Xa(t), e, !0, () => function (t, e) {
    const n = t.canvas;
    if (n.width === t.width && n.height === t.height) return e();
    const r = n.width,
      i = n.height;
    return n.width = t.width, n.height = t.height, t = e(), n.width = r, n.height = i, t;
  }(t, () => {
    if (e.bindFramebuffer(e.FRAMEBUFFER, null), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), e.drawArrays(e.TRIANGLE_FAN, 0, 4), !(t.canvas instanceof OffscreenCanvas)) throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
    return t.canvas.transferToImageBitmap();
  }));
}
Na.prototype.close = Na.prototype.close, Na.prototype.drawConfidenceMask = Na.prototype.ya, Na.prototype.drawCategoryMask = Na.prototype.xa, Na.prototype.drawBoundingBox = Na.prototype.wa, Na.prototype.drawConnectors = Na.prototype.za, Na.prototype.drawLandmarks = Na.prototype.Aa, Na.lerp = function (t, e, n, r, i) {
  return Pa(r * (1 - (t - e) / (n - e)) + i * (1 - (n - t) / (n - e)), r, i);
}, Na.clamp = Pa;
var Ka = class {
  constructor(t, e, n, r, i, s, o) {
    this.g = t, this.j = e, this.m = n, this.canvas = r, this.l = i, this.width = s, this.height = o, (this.j || this.m) && 0 === --Ya && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources.");
  }
  Ga() {
    return !!Ba(this, 0);
  }
  ma() {
    return !!Ba(this, 1);
  }
  R() {
    return !!Ba(this, 2);
  }
  Ea() {
    return Ga(this);
  }
  Da() {
    var t = Ba(this, 1);
    return t || (ja(this), Ha(this), t = za(this), Wa(this), this.g.push(t), this.j = !0), t;
  }
  O() {
    return ja(this);
  }
  clone() {
    const t = [];
    for (const e of this.g) {
      let n;
      if (e instanceof ImageData) n = new ImageData(e.data, this.width, this.height);else if (e instanceof WebGLTexture) {
        const t = Va(this),
          e = Xa(this);
        t.activeTexture(t.TEXTURE1), n = da(e, t), t.bindTexture(t.TEXTURE_2D, n), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.width, this.height, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.bindTexture(t.TEXTURE_2D, null), fa(e, t, n), la(e, t, !1, () => {
          Ha(this), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.drawArrays(t.TRIANGLE_FAN, 0, 4), Wa(this);
        }), pa(e), Wa(this);
      } else {
        if (!(e instanceof ImageBitmap)) throw Error(`Type is not supported: ${e}`);
        ja(this), Ha(this), n = za(this), Wa(this);
      }
      t.push(n);
    }
    return new Ka(t, this.ma(), this.R(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && Ba(this, 1).close(), this.m && Va(this).deleteTexture(Ba(this, 2)), Ya = -1;
  }
};
exports.MPImage = Ka;
Ka.prototype.close = Ka.prototype.close, Ka.prototype.clone = Ka.prototype.clone, Ka.prototype.getAsWebGLTexture = Ka.prototype.O, Ka.prototype.getAsImageBitmap = Ka.prototype.Da, Ka.prototype.getAsImageData = Ka.prototype.Ea, Ka.prototype.hasWebGLTexture = Ka.prototype.R, Ka.prototype.hasImageBitmap = Ka.prototype.ma, Ka.prototype.hasImageData = Ka.prototype.Ga;
var Ya = 250;
function $a(...t) {
  return t.map(([t, e]) => ({
    start: t,
    end: e
  }));
}
const qa = function (t) {
  return class extends t {
    Ma() {
      this.i._registerModelResourcesGraphService();
    }
  };
}((Ja = class {
  constructor(t, e) {
    this.l = !0, this.i = t, this.g = null, this.h = 0, this.m = "function" == typeof this.i._addIntToInputStream, void 0 !== e ? this.i.canvas = e : Ho() ? this.i.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.i.canvas = document.createElement("canvas"));
  }
  async initializeGraph(t) {
    const e = await (await fetch(t)).arrayBuffer();
    t = !(t.endsWith(".pbtxt") || t.endsWith(".textproto")), this.setGraph(new Uint8Array(e), t);
  }
  setGraphFromString(t) {
    this.setGraph(new TextEncoder().encode(t), !1);
  }
  setGraph(t, e) {
    const n = t.length,
      r = this.i._malloc(n);
    this.i.HEAPU8.set(t, r), e ? this.i._changeBinaryGraph(n, r) : this.i._changeTextGraph(n, r), this.i._free(r);
  }
  configureAudio(t, e, n, r, i) {
    this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), Ko(this, r || "input_audio", r => {
      Ko(this, i = i || "audio_header", i => {
        this.i._configureAudio(r, i, t, e, n);
      });
    });
  }
  setAutoResizeCanvas(t) {
    this.l = t;
  }
  setAutoRenderToScreen(t) {
    this.i._setAutoRenderToScreen(t);
  }
  setGpuBufferVerticalFlip(t) {
    this.i.gpuOriginForWebTexturesIsBottomLeft = t;
  }
  fa(t) {
    qo(this, "__graph_config__", e => {
      t(e);
    }), Ko(this, "__graph_config__", t => {
      this.i._getGraphConfig(t, void 0);
    }), delete this.i.simpleListeners.__graph_config__;
  }
  attachErrorListener(t) {
    this.i.errorListener = t;
  }
  attachEmptyPacketListener(t, e) {
    this.i.emptyPacketListeners = this.i.emptyPacketListeners || {}, this.i.emptyPacketListeners[t] = e;
  }
  addAudioToStream(t, e, n) {
    this.addAudioToStreamWithShape(t, 0, 0, e, n);
  }
  addAudioToStreamWithShape(t, e, n, r, i) {
    const s = 4 * t.length;
    this.h !== s && (this.g && this.i._free(this.g), this.g = this.i._malloc(s), this.h = s), this.i.HEAPF32.set(t, this.g / 4), Ko(this, r, t => {
      this.i._addAudioToInputStream(this.g, e, n, t, i);
    });
  }
  addGpuBufferToStream(t, e, n) {
    Ko(this, e, e => {
      const [r, i] = Yo(this, t, e);
      this.i._addBoundTextureToStream(e, r, i, n);
    });
  }
  addBoolToStream(t, e, n) {
    Ko(this, e, e => {
      this.i._addBoolToInputStream(t, e, n);
    });
  }
  addDoubleToStream(t, e, n) {
    Ko(this, e, e => {
      this.i._addDoubleToInputStream(t, e, n);
    });
  }
  addFloatToStream(t, e, n) {
    Ko(this, e, e => {
      this.i._addFloatToInputStream(t, e, n);
    });
  }
  addIntToStream(t, e, n) {
    Ko(this, e, e => {
      this.i._addIntToInputStream(t, e, n);
    });
  }
  addUintToStream(t, e, n) {
    Ko(this, e, e => {
      this.i._addUintToInputStream(t, e, n);
    });
  }
  addStringToStream(t, e, n) {
    Ko(this, e, e => {
      Ko(this, t, t => {
        this.i._addStringToInputStream(t, e, n);
      });
    });
  }
  addStringRecordToStream(t, e, n) {
    Ko(this, e, e => {
      $o(this, Object.keys(t), r => {
        $o(this, Object.values(t), i => {
          this.i._addFlatHashMapToInputStream(r, i, Object.keys(t).length, e, n);
        });
      });
    });
  }
  addProtoToStream(t, e, n, r) {
    Ko(this, n, n => {
      Ko(this, e, e => {
        const i = this.i._malloc(t.length);
        this.i.HEAPU8.set(t, i), this.i._addProtoToInputStream(i, t.length, e, n, r), this.i._free(i);
      });
    });
  }
  addEmptyPacketToStream(t, e) {
    Ko(this, t, t => {
      this.i._addEmptyPacketToInputStream(t, e);
    });
  }
  addBoolVectorToStream(t, e, n) {
    Ko(this, e, e => {
      const r = this.i._allocateBoolVector(t.length);
      if (!r) throw Error("Unable to allocate new bool vector on heap.");
      for (const e of t) this.i._addBoolVectorEntry(r, e);
      this.i._addBoolVectorToInputStream(r, e, n);
    });
  }
  addDoubleVectorToStream(t, e, n) {
    Ko(this, e, e => {
      const r = this.i._allocateDoubleVector(t.length);
      if (!r) throw Error("Unable to allocate new double vector on heap.");
      for (const e of t) this.i._addDoubleVectorEntry(r, e);
      this.i._addDoubleVectorToInputStream(r, e, n);
    });
  }
  addFloatVectorToStream(t, e, n) {
    Ko(this, e, e => {
      const r = this.i._allocateFloatVector(t.length);
      if (!r) throw Error("Unable to allocate new float vector on heap.");
      for (const e of t) this.i._addFloatVectorEntry(r, e);
      this.i._addFloatVectorToInputStream(r, e, n);
    });
  }
  addIntVectorToStream(t, e, n) {
    Ko(this, e, e => {
      const r = this.i._allocateIntVector(t.length);
      if (!r) throw Error("Unable to allocate new int vector on heap.");
      for (const e of t) this.i._addIntVectorEntry(r, e);
      this.i._addIntVectorToInputStream(r, e, n);
    });
  }
  addUintVectorToStream(t, e, n) {
    Ko(this, e, e => {
      const r = this.i._allocateUintVector(t.length);
      if (!r) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const e of t) this.i._addUintVectorEntry(r, e);
      this.i._addUintVectorToInputStream(r, e, n);
    });
  }
  addStringVectorToStream(t, e, n) {
    Ko(this, e, e => {
      const r = this.i._allocateStringVector(t.length);
      if (!r) throw Error("Unable to allocate new string vector on heap.");
      for (const e of t) Ko(this, e, t => {
        this.i._addStringVectorEntry(r, t);
      });
      this.i._addStringVectorToInputStream(r, e, n);
    });
  }
  addBoolToInputSidePacket(t, e) {
    Ko(this, e, e => {
      this.i._addBoolToInputSidePacket(t, e);
    });
  }
  addDoubleToInputSidePacket(t, e) {
    Ko(this, e, e => {
      this.i._addDoubleToInputSidePacket(t, e);
    });
  }
  addFloatToInputSidePacket(t, e) {
    Ko(this, e, e => {
      this.i._addFloatToInputSidePacket(t, e);
    });
  }
  addIntToInputSidePacket(t, e) {
    Ko(this, e, e => {
      this.i._addIntToInputSidePacket(t, e);
    });
  }
  addUintToInputSidePacket(t, e) {
    Ko(this, e, e => {
      this.i._addUintToInputSidePacket(t, e);
    });
  }
  addStringToInputSidePacket(t, e) {
    Ko(this, e, e => {
      Ko(this, t, t => {
        this.i._addStringToInputSidePacket(t, e);
      });
    });
  }
  addProtoToInputSidePacket(t, e, n) {
    Ko(this, n, n => {
      Ko(this, e, e => {
        const r = this.i._malloc(t.length);
        this.i.HEAPU8.set(t, r), this.i._addProtoToInputSidePacket(r, t.length, e, n), this.i._free(r);
      });
    });
  }
  addBoolVectorToInputSidePacket(t, e) {
    Ko(this, e, e => {
      const n = this.i._allocateBoolVector(t.length);
      if (!n) throw Error("Unable to allocate new bool vector on heap.");
      for (const e of t) this.i._addBoolVectorEntry(n, e);
      this.i._addBoolVectorToInputSidePacket(n, e);
    });
  }
  addDoubleVectorToInputSidePacket(t, e) {
    Ko(this, e, e => {
      const n = this.i._allocateDoubleVector(t.length);
      if (!n) throw Error("Unable to allocate new double vector on heap.");
      for (const e of t) this.i._addDoubleVectorEntry(n, e);
      this.i._addDoubleVectorToInputSidePacket(n, e);
    });
  }
  addFloatVectorToInputSidePacket(t, e) {
    Ko(this, e, e => {
      const n = this.i._allocateFloatVector(t.length);
      if (!n) throw Error("Unable to allocate new float vector on heap.");
      for (const e of t) this.i._addFloatVectorEntry(n, e);
      this.i._addFloatVectorToInputSidePacket(n, e);
    });
  }
  addIntVectorToInputSidePacket(t, e) {
    Ko(this, e, e => {
      const n = this.i._allocateIntVector(t.length);
      if (!n) throw Error("Unable to allocate new int vector on heap.");
      for (const e of t) this.i._addIntVectorEntry(n, e);
      this.i._addIntVectorToInputSidePacket(n, e);
    });
  }
  addUintVectorToInputSidePacket(t, e) {
    Ko(this, e, e => {
      const n = this.i._allocateUintVector(t.length);
      if (!n) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const e of t) this.i._addUintVectorEntry(n, e);
      this.i._addUintVectorToInputSidePacket(n, e);
    });
  }
  addStringVectorToInputSidePacket(t, e) {
    Ko(this, e, e => {
      const n = this.i._allocateStringVector(t.length);
      if (!n) throw Error("Unable to allocate new string vector on heap.");
      for (const e of t) Ko(this, e, t => {
        this.i._addStringVectorEntry(n, t);
      });
      this.i._addStringVectorToInputSidePacket(n, e);
    });
  }
  attachBoolListener(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachBoolListener(t);
    });
  }
  attachBoolVectorListener(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachBoolVectorListener(t);
    });
  }
  attachIntListener(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachIntListener(t);
    });
  }
  attachIntVectorListener(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachIntVectorListener(t);
    });
  }
  attachUintListener(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachUintListener(t);
    });
  }
  attachUintVectorListener(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachUintVectorListener(t);
    });
  }
  attachDoubleListener(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachDoubleListener(t);
    });
  }
  attachDoubleVectorListener(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachDoubleVectorListener(t);
    });
  }
  attachFloatListener(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachFloatListener(t);
    });
  }
  attachFloatVectorListener(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachFloatVectorListener(t);
    });
  }
  attachStringListener(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachStringListener(t);
    });
  }
  attachStringVectorListener(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachStringVectorListener(t);
    });
  }
  attachProtoListener(t, e, n) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachProtoListener(t, n || !1);
    });
  }
  attachProtoVectorListener(t, e, n) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachProtoVectorListener(t, n || !1);
    });
  }
  attachAudioListener(t, e, n) {
    this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), qo(this, t, (t, n) => {
      t = new Float32Array(t.buffer, t.byteOffset, t.length / 4), e(t, n);
    }), Ko(this, t, t => {
      this.i._attachAudioListener(t, n || !1);
    });
  }
  finishProcessing() {
    this.i._waitUntilIdle();
  }
  closeGraph() {
    this.i._closeGraph(), this.i.simpleListeners = void 0, this.i.emptyPacketListeners = void 0;
  }
}, class extends Ja {
  get ha() {
    return this.i;
  }
  sa(t, e, n) {
    Ko(this, e, e => {
      const [r, i] = Yo(this, t, e);
      this.ha._addBoundTextureAsImageToStream(e, r, i, n);
    });
  }
  W(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.ha._attachImageListener(t);
    });
  }
  da(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.ha._attachImageVectorListener(t);
    });
  }
}));
var Ja,
  Za = class extends qa {};
async function Qa(t, e, n) {
  return async function (t, e, n, r) {
    return Zo(t, e, n, r);
  }(t, n.canvas ?? (Ho() ? void 0 : document.createElement("canvas")), e, n);
}
function th(t, e, n, r) {
  if (t.V) {
    const s = new fs();
    if (n?.regionOfInterest) {
      if (!t.ra) throw Error("This task doesn't support region-of-interest.");
      var i = n.regionOfInterest;
      if (i.left >= i.right || i.top >= i.bottom) throw Error("Expected RectF with left < right and top < bottom.");
      if (0 > i.left || 0 > i.top || 1 < i.right || 1 < i.bottom) throw Error("Expected RectF values to be in [0,1].");
      Hn(s, 1, (i.left + i.right) / 2), Hn(s, 2, (i.top + i.bottom) / 2), Hn(s, 4, i.right - i.left), Hn(s, 3, i.bottom - i.top);
    } else Hn(s, 1, .5), Hn(s, 2, .5), Hn(s, 4, 1), Hn(s, 3, 1);
    if (n?.rotationDegrees) {
      if (0 != n?.rotationDegrees % 90) throw Error("Expected rotation to be a multiple of 90°.");
      if (Hn(s, 5, -Math.PI * n.rotationDegrees / 180), 0 != n?.rotationDegrees % 180) {
        const [t, r] = zo(e);
        n = Gn(s, 3) * r / t, i = Gn(s, 4) * t / r, Hn(s, 4, n), Hn(s, 3, i);
      }
    }
    t.g.addProtoToStream(s.g(), "mediapipe.NormalizedRect", t.V, r);
  }
  t.g.sa(e, t.ba, r ?? performance.now()), t.finishProcessing();
}
function eh(t, e, n) {
  if (t.baseOptions?.g()) throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
  th(t, e, n, t.J + 1);
}
function nh(t, e, n, r) {
  if (!t.baseOptions?.g()) throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
  th(t, e, n, r);
}
function rh(t, e, n, r) {
  var i = e.data;
  const s = e.width,
    o = s * (e = e.height);
  if ((i instanceof Uint8Array || i instanceof Float32Array) && i.length !== o) throw Error("Unsupported channel count: " + i.length / o);
  return t = new Sa([i], n, !1, t.g.i.canvas, t.M, s, e), r ? t.clone() : t;
}
var ih = class extends sa {
  constructor(t, e, n, r) {
    super(t), this.g = t, this.ba = e, this.V = n, this.ra = r, this.M = new ga();
  }
  l(t, e = !0) {
    if ("runningMode" in t && Vn(this.baseOptions, 2, !!t.runningMode && "IMAGE" !== t.runningMode), void 0 !== t.canvas && this.g.i.canvas !== t.canvas) throw Error("You must create a new task to reset the canvas.");
    return super.l(t, e);
  }
  close() {
    this.M.close(), super.close();
  }
};
exports.VisionTaskRunner = ih;
ih.prototype.close = ih.prototype.close;
var sh = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect_in", !1), this.j = {
      detections: []
    }, Cn(t = this.h = new Is(), 0, 1, e = new Cs()), Hn(this.h, 2, .5), Hn(this.h, 3, .3);
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return "minDetectionConfidence" in t && Hn(this.h, 2, t.minDetectionConfidence ?? .5), "minSuppressionThreshold" in t && Hn(this.h, 3, t.minSuppressionThreshold ?? .3), this.l(t);
  }
  F(t, e) {
    return this.j = {
      detections: []
    }, eh(this, t, e), this.j;
  }
  G(t, e, n) {
    return this.j = {
      detections: []
    }, nh(this, t, n, e), this.j;
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect_in"), Ui(t, "detections");
    const e = new yi();
    Wn(e, Ds, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect_in"), Si(n, "DETECTIONS:detections"), n.o(e), Oi(t, n), this.g.attachProtoVectorListener("detections", (t, e) => {
      for (const e of t) t = ns(e), this.j.detections.push(Oo(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("detections", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.FaceDetector = sh;
sh.prototype.detectForVideo = sh.prototype.G, sh.prototype.detect = sh.prototype.F, sh.prototype.setOptions = sh.prototype.o, sh.createFromModelPath = async function (t, e) {
  return Qa(sh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, sh.createFromModelBuffer = function (t, e) {
  return Qa(sh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, sh.createFromOptions = function (t, e) {
  return Qa(sh, t, e);
};
var oh = $a([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]),
  ah = $a([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]),
  hh = $a([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]),
  ch = $a([474, 475], [475, 476], [476, 477], [477, 474]),
  uh = $a([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]),
  lh = $a([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]),
  dh = $a([469, 470], [470, 471], [471, 472], [472, 469]),
  fh = $a([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]),
  ph = [...oh, ...ah, ...hh, ...uh, ...lh, ...fh],
  gh = $a([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
function mh(t) {
  t.u = {
    faceLandmarks: [],
    faceBlendshapes: [],
    facialTransformationMatrixes: []
  };
}
var yh = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !1), this.u = {
      faceLandmarks: [],
      faceBlendshapes: [],
      facialTransformationMatrixes: []
    }, this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = !1, Cn(t = this.h = new Hs(), 0, 1, e = new Cs()), this.H = new Vs(), Cn(this.h, 0, 3, this.H), this.j = new Is(), Cn(this.h, 0, 2, this.j), Xn(this.j, 4, 1), Hn(this.j, 2, .5), Hn(this.H, 2, .5), Hn(this.h, 4, .5);
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return "numFaces" in t && Xn(this.j, 4, t.numFaces ?? 1), "minFaceDetectionConfidence" in t && Hn(this.j, 2, t.minFaceDetectionConfidence ?? .5), "minTrackingConfidence" in t && Hn(this.h, 4, t.minTrackingConfidence ?? .5), "minFacePresenceConfidence" in t && Hn(this.H, 2, t.minFacePresenceConfidence ?? .5), "outputFaceBlendshapes" in t && (this.outputFaceBlendshapes = !!t.outputFaceBlendshapes), "outputFacialTransformationMatrixes" in t && (this.outputFacialTransformationMatrixes = !!t.outputFacialTransformationMatrixes), this.l(t);
  }
  F(t, e) {
    return mh(this), eh(this, t, e), this.u;
  }
  G(t, e, n) {
    return mh(this), nh(this, t, n, e), this.u;
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect"), Ui(t, "face_landmarks");
    const e = new yi();
    Wn(e, zs, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), Si(n, "NORM_LANDMARKS:face_landmarks"), n.o(e), Oi(t, n), this.g.attachProtoVectorListener("face_landmarks", (t, e) => {
      for (const e of t) t = us(e), this.u.faceLandmarks.push(Io(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("face_landmarks", t => {
      ea(this, t);
    }), this.outputFaceBlendshapes && (Ui(t, "blendshapes"), Si(n, "BLENDSHAPES:blendshapes"), this.g.attachProtoVectorListener("blendshapes", (t, e) => {
      if (this.outputFaceBlendshapes) for (const e of t) t = Wi(e), this.u.faceBlendshapes.push(Co(t.g() ?? []));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("blendshapes", t => {
      ea(this, t);
    })), this.outputFacialTransformationMatrixes && (Ui(t, "face_geometry"), Si(n, "FACE_GEOMETRY:face_geometry"), this.g.attachProtoVectorListener("face_geometry", (t, e) => {
      if (this.outputFacialTransformationMatrixes) for (const e of t) (t = Rn(Gs(e), ls, 2)) && this.u.facialTransformationMatrixes.push({
        rows: Bn(Nn(t, 1), 0) ?? 0,
        columns: Bn(Nn(t, 2), 0) ?? 0,
        data: yn(t, 3, ve).slice() ?? []
      });
      ea(this, e);
    }), this.g.attachEmptyPacketListener("face_geometry", t => {
      ea(this, t);
    })), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.FaceLandmarker = yh;
yh.prototype.detectForVideo = yh.prototype.G, yh.prototype.detect = yh.prototype.F, yh.prototype.setOptions = yh.prototype.o, yh.createFromModelPath = function (t, e) {
  return Qa(yh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, yh.createFromModelBuffer = function (t, e) {
  return Qa(yh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, yh.createFromOptions = function (t, e) {
  return Qa(yh, t, e);
}, yh.FACE_LANDMARKS_LIPS = oh, yh.FACE_LANDMARKS_LEFT_EYE = ah, yh.FACE_LANDMARKS_LEFT_EYEBROW = hh, yh.FACE_LANDMARKS_LEFT_IRIS = ch, yh.FACE_LANDMARKS_RIGHT_EYE = uh, yh.FACE_LANDMARKS_RIGHT_EYEBROW = lh, yh.FACE_LANDMARKS_RIGHT_IRIS = dh, yh.FACE_LANDMARKS_FACE_OVAL = fh, yh.FACE_LANDMARKS_CONTOURS = ph, yh.FACE_LANDMARKS_TESSELATION = gh;
var _h = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !0), Cn(t = this.j = new Ks(), 0, 1, e = new Cs());
  }
  get baseOptions() {
    return Rn(this.j, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.j, 0, 1, t);
  }
  o(t) {
    return super.l(t);
  }
  Pa(t, e, n) {
    const r = "function" != typeof e ? e : {};
    if (this.h = "function" == typeof e ? e : n, eh(this, t, r ?? {}), !this.h) return this.u;
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect"), Ui(t, "stylized_image");
    const e = new yi();
    Wn(e, Ys, this.j);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), Si(n, "STYLIZED_IMAGE:stylized_image"), n.o(e), Oi(t, n), this.g.W("stylized_image", (t, e) => {
      var n = !this.h,
        r = t.data,
        i = t.width;
      const s = i * (t = t.height);
      if (r instanceof Uint8Array) {
        if (r.length === 3 * s) {
          const e = new Uint8ClampedArray(4 * s);
          for (let t = 0; t < s; ++t) e[4 * t] = r[3 * t], e[4 * t + 1] = r[3 * t + 1], e[4 * t + 2] = r[3 * t + 2], e[4 * t + 3] = 255;
          r = new ImageData(e, i, t);
        } else {
          if (r.length !== 4 * s) throw Error("Unsupported channel count: " + r.length / s);
          r = new ImageData(new Uint8ClampedArray(r.buffer, r.byteOffset, r.length), i, t);
        }
      } else if (!(r instanceof WebGLTexture)) throw Error(`Unsupported format: ${r.constructor.name}`);
      i = new Ka([r], !1, !1, this.g.i.canvas, this.M, i, t), this.u = n = n ? i.clone() : i, this.h && this.h(n), ea(this, e);
    }), this.g.attachEmptyPacketListener("stylized_image", t => {
      this.u = null, this.h && this.h(null), ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.FaceStylizer = _h;
_h.prototype.stylize = _h.prototype.Pa, _h.prototype.setOptions = _h.prototype.o, _h.createFromModelPath = function (t, e) {
  return Qa(_h, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, _h.createFromModelBuffer = function (t, e) {
  return Qa(_h, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, _h.createFromOptions = function (t, e) {
  return Qa(_h, t, e);
};
var vh = $a([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
function Eh(t) {
  t.gestures = [], t.landmarks = [], t.worldLandmarks = [], t.handedness = [];
}
function wh(t) {
  return 0 === t.gestures.length ? {
    gestures: [],
    landmarks: [],
    worldLandmarks: [],
    handedness: [],
    handednesses: []
  } : {
    gestures: t.gestures,
    landmarks: t.landmarks,
    worldLandmarks: t.worldLandmarks,
    handedness: t.handedness,
    handednesses: t.handedness
  };
}
function Th(t, e = !0) {
  const n = [];
  for (const i of t) {
    var r = Wi(i);
    t = [];
    for (const n of r.g()) r = e && null != Nn(n, 1) ? Bn(Nn(n, 1), 0) : -1, t.push({
      score: Gn(n, 2) ?? 0,
      index: r,
      categoryName: jn(n, 3) ?? "",
      displayName: jn(n, 4) ?? ""
    });
    n.push(t);
  }
  return n;
}
var Ah = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !1), this.gestures = [], this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Cn(t = this.v = new oo(), 0, 1, e = new Cs()), this.A = new io(), Cn(this.v, 0, 2, this.A), this.u = new no(), Cn(this.A, 0, 3, this.u), this.h = new to(), Cn(this.A, 0, 2, this.h), this.j = new Zs(), Cn(this.v, 0, 3, this.j), Hn(this.h, 2, .5), Hn(this.A, 4, .5), Hn(this.u, 2, .5);
  }
  get baseOptions() {
    return Rn(this.v, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.v, 0, 1, t);
  }
  o(t) {
    if (Xn(this.h, 3, t.numHands ?? 1), "minHandDetectionConfidence" in t && Hn(this.h, 2, t.minHandDetectionConfidence ?? .5), "minTrackingConfidence" in t && Hn(this.A, 4, t.minTrackingConfidence ?? .5), "minHandPresenceConfidence" in t && Hn(this.u, 2, t.minHandPresenceConfidence ?? .5), t.cannedGesturesClassifierOptions) {
      var e = new $s(),
        n = e,
        r = Po(t.cannedGesturesClassifierOptions, Rn(this.j, $s, 3)?.h());
      Cn(n, 0, 2, r), Cn(this.j, 0, 3, e);
    } else void 0 === t.cannedGesturesClassifierOptions && Rn(this.j, $s, 3)?.g();
    return t.customGesturesClassifierOptions ? (Cn(n = e = new $s(), 0, 2, r = Po(t.customGesturesClassifierOptions, Rn(this.j, $s, 4)?.h())), Cn(this.j, 0, 4, e)) : void 0 === t.customGesturesClassifierOptions && Rn(this.j, $s, 4)?.g(), this.l(t);
  }
  Ka(t, e) {
    return Eh(this), eh(this, t, e), wh(this);
  }
  La(t, e, n) {
    return Eh(this), nh(this, t, n, e), wh(this);
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect"), Ui(t, "hand_gestures"), Ui(t, "hand_landmarks"), Ui(t, "world_hand_landmarks"), Ui(t, "handedness");
    const e = new yi();
    Wn(e, co, this.v);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), Si(n, "HAND_GESTURES:hand_gestures"), Si(n, "LANDMARKS:hand_landmarks"), Si(n, "WORLD_LANDMARKS:world_hand_landmarks"), Si(n, "HANDEDNESS:handedness"), n.o(e), Oi(t, n), this.g.attachProtoVectorListener("hand_landmarks", (t, e) => {
      for (const e of t) {
        t = us(e);
        const n = [];
        for (const e of Pn(t, as, 1)) n.push({
          x: Gn(e, 1) ?? 0,
          y: Gn(e, 2) ?? 0,
          z: Gn(e, 3) ?? 0,
          visibility: Gn(e, 4) ?? 0
        });
        this.landmarks.push(n);
      }
      ea(this, e);
    }), this.g.attachEmptyPacketListener("hand_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoVectorListener("world_hand_landmarks", (t, e) => {
      for (const e of t) {
        t = os(e);
        const n = [];
        for (const e of Pn(t, rs, 1)) n.push({
          x: Gn(e, 1) ?? 0,
          y: Gn(e, 2) ?? 0,
          z: Gn(e, 3) ?? 0,
          visibility: Gn(e, 4) ?? 0
        });
        this.worldLandmarks.push(n);
      }
      ea(this, e);
    }), this.g.attachEmptyPacketListener("world_hand_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoVectorListener("hand_gestures", (t, e) => {
      this.gestures.push(...Th(t, !1)), ea(this, e);
    }), this.g.attachEmptyPacketListener("hand_gestures", t => {
      ea(this, t);
    }), this.g.attachProtoVectorListener("handedness", (t, e) => {
      this.handedness.push(...Th(t)), ea(this, e);
    }), this.g.attachEmptyPacketListener("handedness", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.GestureRecognizer = Ah;
function bh(t) {
  return {
    landmarks: t.landmarks,
    worldLandmarks: t.worldLandmarks,
    handednesses: t.handedness,
    handedness: t.handedness
  };
}
Ah.prototype.recognizeForVideo = Ah.prototype.La, Ah.prototype.recognize = Ah.prototype.Ka, Ah.prototype.setOptions = Ah.prototype.o, Ah.createFromModelPath = function (t, e) {
  return Qa(Ah, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Ah.createFromModelBuffer = function (t, e) {
  return Qa(Ah, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Ah.createFromOptions = function (t, e) {
  return Qa(Ah, t, e);
}, Ah.HAND_CONNECTIONS = vh;
var kh = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Cn(t = this.j = new io(), 0, 1, e = new Cs()), this.u = new no(), Cn(this.j, 0, 3, this.u), this.h = new to(), Cn(this.j, 0, 2, this.h), Xn(this.h, 3, 1), Hn(this.h, 2, .5), Hn(this.u, 2, .5), Hn(this.j, 4, .5);
  }
  get baseOptions() {
    return Rn(this.j, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.j, 0, 1, t);
  }
  o(t) {
    return "numHands" in t && Xn(this.h, 3, t.numHands ?? 1), "minHandDetectionConfidence" in t && Hn(this.h, 2, t.minHandDetectionConfidence ?? .5), "minTrackingConfidence" in t && Hn(this.j, 4, t.minTrackingConfidence ?? .5), "minHandPresenceConfidence" in t && Hn(this.u, 2, t.minHandPresenceConfidence ?? .5), this.l(t);
  }
  F(t, e) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], eh(this, t, e), bh(this);
  }
  G(t, e, n) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], nh(this, t, n, e), bh(this);
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect"), Ui(t, "hand_landmarks"), Ui(t, "world_hand_landmarks"), Ui(t, "handedness");
    const e = new yi();
    Wn(e, ho, this.j);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), Si(n, "LANDMARKS:hand_landmarks"), Si(n, "WORLD_LANDMARKS:world_hand_landmarks"), Si(n, "HANDEDNESS:handedness"), n.o(e), Oi(t, n), this.g.attachProtoVectorListener("hand_landmarks", (t, e) => {
      for (const e of t) t = us(e), this.landmarks.push(Io(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("hand_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoVectorListener("world_hand_landmarks", (t, e) => {
      for (const e of t) t = os(e), this.worldLandmarks.push(Uo(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("world_hand_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoVectorListener("handedness", (t, e) => {
      var n = this.handedness,
        r = n.push;
      const i = [];
      for (const e of t) {
        t = Wi(e);
        const n = [];
        for (const e of t.g()) n.push({
          score: Gn(e, 2) ?? 0,
          index: Bn(Nn(e, 1), 0) ?? -1,
          categoryName: jn(e, 3) ?? "",
          displayName: jn(e, 4) ?? ""
        });
        i.push(n);
      }
      r.call(n, ...i), ea(this, e);
    }), this.g.attachEmptyPacketListener("handedness", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.HandLandmarker = kh;
kh.prototype.detectForVideo = kh.prototype.G, kh.prototype.detect = kh.prototype.F, kh.prototype.setOptions = kh.prototype.o, kh.createFromModelPath = function (t, e) {
  return Qa(kh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, kh.createFromModelBuffer = function (t, e) {
  return Qa(kh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, kh.createFromOptions = function (t, e) {
  return Qa(kh, t, e);
}, kh.HAND_CONNECTIONS = vh;
var xh = $a([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
function Sh(t) {
  t.h = {
    faceLandmarks: [],
    faceBlendshapes: [],
    poseLandmarks: [],
    poseWorldLandmarks: [],
    poseSegmentationMasks: [],
    leftHandLandmarks: [],
    leftHandWorldLandmarks: [],
    rightHandLandmarks: [],
    rightHandWorldLandmarks: []
  };
}
function Lh(t) {
  try {
    if (!t.I) return t.h;
    t.I(t.h);
  } finally {
    ia(t);
  }
}
function Fh(t, e) {
  t = us(t), e.push(Io(t));
}
var Rh = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "input_frames_image", null, !1), this.h = {
      faceLandmarks: [],
      faceBlendshapes: [],
      poseLandmarks: [],
      poseWorldLandmarks: [],
      poseSegmentationMasks: [],
      leftHandLandmarks: [],
      leftHandWorldLandmarks: [],
      rightHandLandmarks: [],
      rightHandWorldLandmarks: []
    }, this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = !1, Cn(t = this.A = new yo(), 0, 1, e = new Cs()), this.u = new no(), Cn(this.A, 0, 2, this.u), this.aa = new uo(), Cn(this.A, 0, 3, this.aa), this.j = new Is(), Cn(this.A, 0, 4, this.j), this.H = new Vs(), Cn(this.A, 0, 5, this.H), this.v = new fo(), Cn(this.A, 0, 6, this.v), this.D = new go(), Cn(this.A, 0, 7, this.D), Hn(this.j, 2, .5), Hn(this.j, 3, .3), Hn(this.H, 2, .5), Hn(this.v, 2, .5), Hn(this.v, 3, .3), Hn(this.D, 2, .5), Hn(this.u, 2, .5);
  }
  get baseOptions() {
    return Rn(this.A, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.A, 0, 1, t);
  }
  o(t) {
    return "minFaceDetectionConfidence" in t && Hn(this.j, 2, t.minFaceDetectionConfidence ?? .5), "minFaceSuppressionThreshold" in t && Hn(this.j, 3, t.minFaceSuppressionThreshold ?? .3), "minFacePresenceConfidence" in t && Hn(this.H, 2, t.minFacePresenceConfidence ?? .5), "outputFaceBlendshapes" in t && (this.outputFaceBlendshapes = !!t.outputFaceBlendshapes), "minPoseDetectionConfidence" in t && Hn(this.v, 2, t.minPoseDetectionConfidence ?? .5), "minPoseSuppressionThreshold" in t && Hn(this.v, 3, t.minPoseSuppressionThreshold ?? .3), "minPosePresenceConfidence" in t && Hn(this.D, 2, t.minPosePresenceConfidence ?? .5), "outputPoseSegmentationMasks" in t && (this.outputPoseSegmentationMasks = !!t.outputPoseSegmentationMasks), "minHandLandmarksConfidence" in t && Hn(this.u, 2, t.minHandLandmarksConfidence ?? .5), this.l(t);
  }
  F(t, e, n) {
    const r = "function" != typeof e ? e : {};
    return this.I = "function" == typeof e ? e : n, Sh(this), eh(this, t, r), Lh(this);
  }
  G(t, e, n, r) {
    const i = "function" != typeof n ? n : {};
    return this.I = "function" == typeof n ? n : r, Sh(this), nh(this, t, i, e), Lh(this);
  }
  m() {
    var t = new Di();
    Ii(t, "input_frames_image"), Ui(t, "pose_landmarks"), Ui(t, "pose_world_landmarks"), Ui(t, "face_landmarks"), Ui(t, "left_hand_landmarks"), Ui(t, "left_hand_world_landmarks"), Ui(t, "right_hand_landmarks"), Ui(t, "right_hand_world_landmarks");
    const e = new yi(),
      n = new oi();
    An(n, 1, Me("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), ""), function (t, e) {
      if (null != e) if (Array.isArray(e)) dn(t, 2, tn(e, nn, void 0, void 0, !1));else {
        if (!("string" == typeof e || e instanceof B || M(e))) throw Error("invalid value in Any.value field: " + e + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
        An(t, 2, ae(e, !1, !1), D());
      }
    }(n, this.A.g());
    const r = new Li();
    ki(r, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"), Dn(r, 8, oi, n), xi(r, "IMAGE:input_frames_image"), Si(r, "POSE_LANDMARKS:pose_landmarks"), Si(r, "POSE_WORLD_LANDMARKS:pose_world_landmarks"), Si(r, "FACE_LANDMARKS:face_landmarks"), Si(r, "LEFT_HAND_LANDMARKS:left_hand_landmarks"), Si(r, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"), Si(r, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"), Si(r, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"), r.o(e), Oi(t, r), na(this, t), this.g.attachProtoListener("pose_landmarks", (t, e) => {
      Fh(t, this.h.poseLandmarks), ea(this, e);
    }), this.g.attachEmptyPacketListener("pose_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoListener("pose_world_landmarks", (t, e) => {
      var n = this.h.poseWorldLandmarks;
      t = os(t), n.push(Uo(t)), ea(this, e);
    }), this.g.attachEmptyPacketListener("pose_world_landmarks", t => {
      ea(this, t);
    }), this.outputPoseSegmentationMasks && (Si(r, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"), ra(this, "pose_segmentation_mask"), this.g.W("pose_segmentation_mask", (t, e) => {
      this.h.poseSegmentationMasks = [rh(this, t, !0, !this.I)], ea(this, e);
    }), this.g.attachEmptyPacketListener("pose_segmentation_mask", t => {
      this.h.poseSegmentationMasks = [], ea(this, t);
    })), this.g.attachProtoListener("face_landmarks", (t, e) => {
      Fh(t, this.h.faceLandmarks), ea(this, e);
    }), this.g.attachEmptyPacketListener("face_landmarks", t => {
      ea(this, t);
    }), this.outputFaceBlendshapes && (Ui(t, "extra_blendshapes"), Si(r, "FACE_BLENDSHAPES:extra_blendshapes"), this.g.attachProtoListener("extra_blendshapes", (t, e) => {
      var n = this.h.faceBlendshapes;
      this.outputFaceBlendshapes && (t = Wi(t), n.push(Co(t.g() ?? []))), ea(this, e);
    }), this.g.attachEmptyPacketListener("extra_blendshapes", t => {
      ea(this, t);
    })), this.g.attachProtoListener("left_hand_landmarks", (t, e) => {
      Fh(t, this.h.leftHandLandmarks), ea(this, e);
    }), this.g.attachEmptyPacketListener("left_hand_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoListener("left_hand_world_landmarks", (t, e) => {
      var n = this.h.leftHandWorldLandmarks;
      t = os(t), n.push(Uo(t)), ea(this, e);
    }), this.g.attachEmptyPacketListener("left_hand_world_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoListener("right_hand_landmarks", (t, e) => {
      Fh(t, this.h.rightHandLandmarks), ea(this, e);
    }), this.g.attachEmptyPacketListener("right_hand_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoListener("right_hand_world_landmarks", (t, e) => {
      var n = this.h.rightHandWorldLandmarks;
      t = os(t), n.push(Uo(t)), ea(this, e);
    }), this.g.attachEmptyPacketListener("right_hand_world_landmarks", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.HolisticLandmarker = Rh;
Rh.prototype.detectForVideo = Rh.prototype.G, Rh.prototype.detect = Rh.prototype.F, Rh.prototype.setOptions = Rh.prototype.o, Rh.createFromModelPath = function (t, e) {
  return Qa(Rh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Rh.createFromModelBuffer = function (t, e) {
  return Qa(Rh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Rh.createFromOptions = function (t, e) {
  return Qa(Rh, t, e);
}, Rh.HAND_CONNECTIONS = vh, Rh.POSE_CONNECTIONS = xh, Rh.FACE_LANDMARKS_LIPS = oh, Rh.FACE_LANDMARKS_LEFT_EYE = ah, Rh.FACE_LANDMARKS_LEFT_EYEBROW = hh, Rh.FACE_LANDMARKS_LEFT_IRIS = ch, Rh.FACE_LANDMARKS_RIGHT_EYE = uh, Rh.FACE_LANDMARKS_RIGHT_EYEBROW = lh, Rh.FACE_LANDMARKS_RIGHT_IRIS = dh, Rh.FACE_LANDMARKS_FACE_OVAL = fh, Rh.FACE_LANDMARKS_CONTOURS = ph, Rh.FACE_LANDMARKS_TESSELATION = gh;
var Mh = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "input_image", "norm_rect", !0), this.j = {
      classifications: []
    }, Cn(t = this.h = new _o(), 0, 1, e = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return Cn(this.h, 0, 2, Po(t, Rn(this.h, ks, 2))), this.l(t);
  }
  ua(t, e) {
    return this.j = {
      classifications: []
    }, eh(this, t, e), this.j;
  }
  va(t, e, n) {
    return this.j = {
      classifications: []
    }, nh(this, t, n, e), this.j;
  }
  m() {
    var t = new Di();
    Ii(t, "input_image"), Ii(t, "norm_rect"), Ui(t, "classifications");
    const e = new yi();
    Wn(e, vo, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"), xi(n, "IMAGE:input_image"), xi(n, "NORM_RECT:norm_rect"), Si(n, "CLASSIFICATIONS:classifications"), n.o(e), Oi(t, n), this.g.attachProtoListener("classifications", (t, e) => {
      this.j = function (t) {
        const e = {
          classifications: Pn(t, ps, 1).map(t => Co(Rn(t, Xi, 4)?.g() ?? [], Bn(Nn(t, 2), 0), jn(t, 3)))
        };
        return null != Fe(cn(t, 2)) && (e.timestampMs = Bn(Fe(cn(t, 2)), 0)), e;
      }(ys(t)), ea(this, e);
    }), this.g.attachEmptyPacketListener("classifications", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.ImageClassifier = Mh;
Mh.prototype.classifyForVideo = Mh.prototype.va, Mh.prototype.classify = Mh.prototype.ua, Mh.prototype.setOptions = Mh.prototype.o, Mh.createFromModelPath = function (t, e) {
  return Qa(Mh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Mh.createFromModelBuffer = function (t, e) {
  return Qa(Mh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Mh.createFromOptions = function (t, e) {
  return Qa(Mh, t, e);
};
var Ph = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !0), this.h = new Eo(), this.embeddings = {
      embeddings: []
    }, Cn(t = this.h, 0, 1, e = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    var e = this.h,
      n = Rn(this.h, Ss, 2);
    return n = n ? n.clone() : new Ss(), void 0 !== t.l2Normalize ? Vn(n, 1, t.l2Normalize) : "l2Normalize" in t && dn(n, 1), void 0 !== t.quantize ? Vn(n, 2, t.quantize) : "quantize" in t && dn(n, 2), Cn(e, 0, 2, n), this.l(t);
  }
  Ba(t, e) {
    return eh(this, t, e), this.embeddings;
  }
  Ca(t, e, n) {
    return nh(this, t, n, e), this.embeddings;
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect"), Ui(t, "embeddings_out");
    const e = new yi();
    Wn(e, wo, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), Si(n, "EMBEDDINGS:embeddings_out"), n.o(e), Oi(t, n), this.g.attachProtoListener("embeddings_out", (t, e) => {
      t = bs(t), this.embeddings = function (t) {
        return {
          embeddings: Pn(t, Es, 1).map(t => {
            const e = {
              headIndex: Bn(Nn(t, 3), 0) ?? -1,
              headName: jn(t, 4) ?? ""
            };
            if (void 0 !== Fn(t, _s, xn(t, 1))) t = yn(t = Rn(t, _s, xn(t, 1)), 1, ve), e.floatEmbedding = t.slice();else {
              const n = new Uint8Array(0);
              e.quantizedEmbedding = Rn(t, vs, xn(t, 2))?.qa()?.h() ?? n;
            }
            return e;
          }),
          timestampMs: Bn(Fe(cn(t, 2)), 0)
        };
      }(t), ea(this, e);
    }), this.g.attachEmptyPacketListener("embeddings_out", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.ImageEmbedder = Ph;
Ph.cosineSimilarity = function (t, e) {
  if (t.floatEmbedding && e.floatEmbedding) t = No(t.floatEmbedding, e.floatEmbedding);else {
    if (!t.quantizedEmbedding || !e.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
    t = No(Do(t.quantizedEmbedding), Do(e.quantizedEmbedding));
  }
  return t;
}, Ph.prototype.embedForVideo = Ph.prototype.Ca, Ph.prototype.embed = Ph.prototype.Ba, Ph.prototype.setOptions = Ph.prototype.o, Ph.createFromModelPath = function (t, e) {
  return Qa(Ph, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Ph.createFromModelBuffer = function (t, e) {
  return Qa(Ph, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Ph.createFromOptions = function (t, e) {
  return Qa(Ph, t, e);
};
var Ch = class {
  constructor(t, e, n) {
    this.confidenceMasks = t, this.categoryMask = e, this.qualityScores = n;
  }
  close() {
    this.confidenceMasks?.forEach(t => {
      t.close();
    }), this.categoryMask?.close();
  }
};
exports.ImageSegmenterResult = Ch;
function Oh(t) {
  t.categoryMask = void 0, t.confidenceMasks = void 0, t.qualityScores = void 0;
}
function Ih(t) {
  try {
    const e = new Ch(t.confidenceMasks, t.categoryMask, t.qualityScores);
    if (!t.j) return e;
    t.j(e);
  } finally {
    ia(t);
  }
}
Ch.prototype.close = Ch.prototype.close;
var Uh = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !1), this.u = [], this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new xo(), this.v = new To(), Cn(this.h, 0, 3, this.v), Cn(t = this.h, 0, 1, e = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return void 0 !== t.displayNamesLocale ? dn(this.h, 2, Me(t.displayNamesLocale)) : "displayNamesLocale" in t && dn(this.h, 2), "outputCategoryMask" in t && (this.outputCategoryMask = t.outputCategoryMask ?? !1), "outputConfidenceMasks" in t && (this.outputConfidenceMasks = t.outputConfidenceMasks ?? !0), super.l(t);
  }
  L() {
    !function (t) {
      const e = Pn(t.fa(), Li, 1).filter(t => jn(t, 1).includes("mediapipe.tasks.TensorsToSegmentationCalculator"));
      if (t.u = [], 1 < e.length) throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
      1 === e.length && (Rn(e[0], yi, 7)?.l()?.g() ?? new Map()).forEach((e, n) => {
        t.u[Number(n)] = jn(e, 1);
      });
    }(this);
  }
  ga(t, e, n) {
    const r = "function" != typeof e ? e : {};
    return this.j = "function" == typeof e ? e : n, Oh(this), eh(this, t, r), Ih(this);
  }
  Na(t, e, n, r) {
    const i = "function" != typeof n ? n : {};
    return this.j = "function" == typeof n ? n : r, Oh(this), nh(this, t, i, e), Ih(this);
  }
  Fa() {
    return this.u;
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect");
    const e = new yi();
    Wn(e, So, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), n.o(e), Oi(t, n), na(this, t), this.outputConfidenceMasks && (Ui(t, "confidence_masks"), Si(n, "CONFIDENCE_MASKS:confidence_masks"), ra(this, "confidence_masks"), this.g.da("confidence_masks", (t, e) => {
      this.confidenceMasks = t.map(t => rh(this, t, !0, !this.j)), ea(this, e);
    }), this.g.attachEmptyPacketListener("confidence_masks", t => {
      this.confidenceMasks = [], ea(this, t);
    })), this.outputCategoryMask && (Ui(t, "category_mask"), Si(n, "CATEGORY_MASK:category_mask"), ra(this, "category_mask"), this.g.W("category_mask", (t, e) => {
      this.categoryMask = rh(this, t, !1, !this.j), ea(this, e);
    }), this.g.attachEmptyPacketListener("category_mask", t => {
      this.categoryMask = void 0, ea(this, t);
    })), Ui(t, "quality_scores"), Si(n, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", (t, e) => {
      this.qualityScores = t, ea(this, e);
    }), this.g.attachEmptyPacketListener("quality_scores", t => {
      this.categoryMask = void 0, ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.ImageSegmenter = Uh;
Uh.prototype.getLabels = Uh.prototype.Fa, Uh.prototype.segmentForVideo = Uh.prototype.Na, Uh.prototype.segment = Uh.prototype.ga, Uh.prototype.setOptions = Uh.prototype.o, Uh.createFromModelPath = function (t, e) {
  return Qa(Uh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Uh.createFromModelBuffer = function (t, e) {
  return Qa(Uh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Uh.createFromOptions = function (t, e) {
  return Qa(Uh, t, e);
};
var Dh = class {
  constructor(t, e, n) {
    this.confidenceMasks = t, this.categoryMask = e, this.qualityScores = n;
  }
  close() {
    this.confidenceMasks?.forEach(t => {
      t.close();
    }), this.categoryMask?.close();
  }
};
exports.InteractiveSegmenterResult = Dh;
Dh.prototype.close = Dh.prototype.close;
var Nh = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Bh = [0, jr, -2],
  Gh = [0, Or, -3, Hr],
  jh = [0, Or, -3, Hr, Or, -1],
  Vh = [0, jh],
  Xh = [0, Vh, Bh],
  Hh = [0, jh, Bh],
  Wh = [0, jh, jr, -1],
  zh = [0, Wh, Bh],
  Kh = [0, Or, -3, Hr, Bh, -1],
  Yh = [0, Or, -3, Hr, ti],
  $h = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  qh = [0, Or, -1, Hr],
  Jh = class extends zn {
    constructor() {
      super();
    }
  };
Jh.B = [1];
var Zh = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Qh = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15],
  tc = [0, Qh, Jr, jh, Jr, Hh, Jr, Vh, Jr, Xh, Jr, qh, Jr, Yh, Jr, Gh, Jr, [0, Yr, Or, -2, Hr, jr, Hr, -1, 2, Or, Bh], Jr, Wh, Jr, zh, Or, Bh, Yr, Jr, Kh, Jr, [0, Cr, qh]],
  ec = [0, Yr, jr, -1, Hr],
  nc = class extends zn {
    constructor() {
      super();
    }
  };
nc.B = [1], nc.prototype.g = si([0, Cr, tc, Yr, ec]);
var rc = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect_in", !1), this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new xo(), this.v = new To(), Cn(this.h, 0, 3, this.v), Cn(t = this.h, 0, 1, e = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return "outputCategoryMask" in t && (this.outputCategoryMask = t.outputCategoryMask ?? !1), "outputConfidenceMasks" in t && (this.outputConfidenceMasks = t.outputConfidenceMasks ?? !0), super.l(t);
  }
  ga(t, e, n, r) {
    const i = "function" != typeof n ? n : {};
    this.j = "function" == typeof n ? n : r, this.qualityScores = this.categoryMask = this.confidenceMasks = void 0, n = this.J + 1, r = new nc();
    const s = new Zh();
    var o = new Nh();
    if (Xn(o, 1, 255), Cn(s, 0, 12, o), e.keypoint && e.scribble) throw Error("Cannot provide both keypoint and scribble.");
    if (e.keypoint) {
      var a = new $h();
      Vn(a, 3, !0), Hn(a, 1, e.keypoint.x), Hn(a, 2, e.keypoint.y), On(s, 5, Qh, a);
    } else {
      if (!e.scribble) throw Error("Must provide either a keypoint or a scribble.");
      for (a of (o = new Jh(), e.scribble)) Vn(e = new $h(), 3, !0), Hn(e, 1, a.x), Hn(e, 2, a.y), Dn(o, 1, $h, e);
      On(s, 15, Qh, o);
    }
    Dn(r, 1, Zh, s), this.g.addProtoToStream(r.g(), "drishti.RenderData", "roi_in", n), eh(this, t, i);
    t: {
      try {
        const t = new Dh(this.confidenceMasks, this.categoryMask, this.qualityScores);
        if (!this.j) {
          var h = t;
          break t;
        }
        this.j(t);
      } finally {
        ia(this);
      }
      h = void 0;
    }
    return h;
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "roi_in"), Ii(t, "norm_rect_in");
    const e = new yi();
    Wn(e, So, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"), xi(n, "IMAGE:image_in"), xi(n, "ROI:roi_in"), xi(n, "NORM_RECT:norm_rect_in"), n.o(e), Oi(t, n), na(this, t), this.outputConfidenceMasks && (Ui(t, "confidence_masks"), Si(n, "CONFIDENCE_MASKS:confidence_masks"), ra(this, "confidence_masks"), this.g.da("confidence_masks", (t, e) => {
      this.confidenceMasks = t.map(t => rh(this, t, !0, !this.j)), ea(this, e);
    }), this.g.attachEmptyPacketListener("confidence_masks", t => {
      this.confidenceMasks = [], ea(this, t);
    })), this.outputCategoryMask && (Ui(t, "category_mask"), Si(n, "CATEGORY_MASK:category_mask"), ra(this, "category_mask"), this.g.W("category_mask", (t, e) => {
      this.categoryMask = rh(this, t, !1, !this.j), ea(this, e);
    }), this.g.attachEmptyPacketListener("category_mask", t => {
      this.categoryMask = void 0, ea(this, t);
    })), Ui(t, "quality_scores"), Si(n, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", (t, e) => {
      this.qualityScores = t, ea(this, e);
    }), this.g.attachEmptyPacketListener("quality_scores", t => {
      this.categoryMask = void 0, ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.InteractiveSegmenter = rc;
rc.prototype.segment = rc.prototype.ga, rc.prototype.setOptions = rc.prototype.o, rc.createFromModelPath = function (t, e) {
  return Qa(rc, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, rc.createFromModelBuffer = function (t, e) {
  return Qa(rc, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, rc.createFromOptions = function (t, e) {
  return Qa(rc, t, e);
};
var ic = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "input_frame_gpu", "norm_rect", !1), this.j = {
      detections: []
    }, Cn(t = this.h = new Lo(), 0, 1, e = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return void 0 !== t.displayNamesLocale ? dn(this.h, 2, Me(t.displayNamesLocale)) : "displayNamesLocale" in t && dn(this.h, 2), void 0 !== t.maxResults ? Xn(this.h, 3, t.maxResults) : "maxResults" in t && dn(this.h, 3), void 0 !== t.scoreThreshold ? Hn(this.h, 4, t.scoreThreshold) : "scoreThreshold" in t && dn(this.h, 4), void 0 !== t.categoryAllowlist ? Tn(this.h, 5, t.categoryAllowlist) : "categoryAllowlist" in t && dn(this.h, 5), void 0 !== t.categoryDenylist ? Tn(this.h, 6, t.categoryDenylist) : "categoryDenylist" in t && dn(this.h, 6), this.l(t);
  }
  F(t, e) {
    return this.j = {
      detections: []
    }, eh(this, t, e), this.j;
  }
  G(t, e, n) {
    return this.j = {
      detections: []
    }, nh(this, t, n, e), this.j;
  }
  m() {
    var t = new Di();
    Ii(t, "input_frame_gpu"), Ii(t, "norm_rect"), Ui(t, "detections");
    const e = new yi();
    Wn(e, Fo, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.ObjectDetectorGraph"), xi(n, "IMAGE:input_frame_gpu"), xi(n, "NORM_RECT:norm_rect"), Si(n, "DETECTIONS:detections"), n.o(e), Oi(t, n), this.g.attachProtoVectorListener("detections", (t, e) => {
      for (const e of t) t = ns(e), this.j.detections.push(Oo(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("detections", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.ObjectDetector = ic;
ic.prototype.detectForVideo = ic.prototype.G, ic.prototype.detect = ic.prototype.F, ic.prototype.setOptions = ic.prototype.o, ic.createFromModelPath = async function (t, e) {
  return Qa(ic, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, ic.createFromModelBuffer = function (t, e) {
  return Qa(ic, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, ic.createFromOptions = function (t, e) {
  return Qa(ic, t, e);
};
var sc = class {
  constructor(t, e, n) {
    this.landmarks = t, this.worldLandmarks = e, this.segmentationMasks = n;
  }
  close() {
    this.segmentationMasks?.forEach(t => {
      t.close();
    });
  }
};
function oc(t) {
  t.landmarks = [], t.worldLandmarks = [], t.segmentationMasks = void 0;
}
function ac(t) {
  try {
    const e = new sc(t.landmarks, t.worldLandmarks, t.segmentationMasks);
    if (!t.j) return e;
    t.j(e);
  } finally {
    ia(t);
  }
}
sc.prototype.close = sc.prototype.close;
var hc = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.outputSegmentationMasks = !1, Cn(t = this.h = new Ro(), 0, 1, e = new Cs()), this.D = new go(), Cn(this.h, 0, 3, this.D), this.v = new fo(), Cn(this.h, 0, 2, this.v), Xn(this.v, 4, 1), Hn(this.v, 2, .5), Hn(this.D, 2, .5), Hn(this.h, 4, .5);
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return "numPoses" in t && Xn(this.v, 4, t.numPoses ?? 1), "minPoseDetectionConfidence" in t && Hn(this.v, 2, t.minPoseDetectionConfidence ?? .5), "minTrackingConfidence" in t && Hn(this.h, 4, t.minTrackingConfidence ?? .5), "minPosePresenceConfidence" in t && Hn(this.D, 2, t.minPosePresenceConfidence ?? .5), "outputSegmentationMasks" in t && (this.outputSegmentationMasks = t.outputSegmentationMasks ?? !1), this.l(t);
  }
  F(t, e, n) {
    const r = "function" != typeof e ? e : {};
    return this.j = "function" == typeof e ? e : n, oc(this), eh(this, t, r), ac(this);
  }
  G(t, e, n, r) {
    const i = "function" != typeof n ? n : {};
    return this.j = "function" == typeof n ? n : r, oc(this), nh(this, t, i, e), ac(this);
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect"), Ui(t, "normalized_landmarks"), Ui(t, "world_landmarks"), Ui(t, "segmentation_masks");
    const e = new yi();
    Wn(e, Mo, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), Si(n, "NORM_LANDMARKS:normalized_landmarks"), Si(n, "WORLD_LANDMARKS:world_landmarks"), n.o(e), Oi(t, n), na(this, t), this.g.attachProtoVectorListener("normalized_landmarks", (t, e) => {
      this.landmarks = [];
      for (const e of t) t = us(e), this.landmarks.push(Io(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("normalized_landmarks", t => {
      this.landmarks = [], ea(this, t);
    }), this.g.attachProtoVectorListener("world_landmarks", (t, e) => {
      this.worldLandmarks = [];
      for (const e of t) t = os(e), this.worldLandmarks.push(Uo(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("world_landmarks", t => {
      this.worldLandmarks = [], ea(this, t);
    }), this.outputSegmentationMasks && (Si(n, "SEGMENTATION_MASK:segmentation_masks"), ra(this, "segmentation_masks"), this.g.da("segmentation_masks", (t, e) => {
      this.segmentationMasks = t.map(t => rh(this, t, !0, !this.j)), ea(this, e);
    }), this.g.attachEmptyPacketListener("segmentation_masks", t => {
      this.segmentationMasks = [], ea(this, t);
    })), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.PoseLandmarker = hc;
hc.prototype.detectForVideo = hc.prototype.G, hc.prototype.detect = hc.prototype.F, hc.prototype.setOptions = hc.prototype.o, hc.createFromModelPath = function (t, e) {
  return Qa(hc, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, hc.createFromModelBuffer = function (t, e) {
  return Qa(hc, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, hc.createFromOptions = function (t, e) {
  return Qa(hc, t, e);
}, hc.POSE_CONNECTIONS = xh;
},{}],"K0kV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FACE_LANDMARKS_NOSE = exports.FACE_FEATURE_RIGHT_EYEBROW = exports.FACE_FEATURE_RIGHT_EYE = exports.FACE_FEATURE_NOSE = exports.FACE_FEATURE_LIPS = exports.FACE_FEATURE_LEFT_EYEBROW = exports.FACE_FEATURE_LEFT_EYE = exports.Connection = void 0;
exports.findNeighbourPointIds = findNeighbourPointIds;
var _tasksVision = require("@mediapipe/tasks-vision");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents a connection between two points.
 */
var Connection = exports.Connection = /*#__PURE__*/_createClass(
/**
 * Creates a new Connection instance.
 * @param {number} start - The ID of the starting point.
 * @param {number} end - The ID of the ending point.
 */
function Connection(start, end) {
  _classCallCheck(this, Connection);
  /**
   * The ID of the starting point.
   */
  _defineProperty(this, "start", void 0);
  /**
   * The ID of the ending point.
   */
  _defineProperty(this, "end", void 0);
  this.start = start;
  this.end = end;
});
/**
 * Converts an array of connections (given as pairs of start and end point IDs) into an array of Connection instances.
 * @param {...number[][]} connections - Arrays of start and end point IDs.
 * @returns {Connection[]} - An array of Connection instances.
 */
function convertToConnections() {
  for (var _len = arguments.length, connections = new Array(_len), _key = 0; _key < _len; _key++) {
    connections[_key] = arguments[_key];
  }
  return connections.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      start = _ref2[0],
      end = _ref2[1];
    return new Connection(start, end);
  });
}
/**
 * Finds neighboring point IDs recursively up to a specified depth.
 * @param {number} pointId - The ID of the starting point.
 * @param {Connection[]} connections - An array of connections.
 * @param {number} depth - The depth of neighbor search.
 * @returns {number[]} - An array of unique neighboring point IDs.
 */
function findNeighbourPointIds(pointId, connections, depth) {
  if (depth === 0) {
    return Array.from(new Set([pointId]));
  }
  var neighbours = connections.filter(function (conn) {
    return conn.start === pointId || conn.end === pointId;
  }).map(function (conn) {
    return conn.start === pointId ? conn.end : conn.start;
  });
  var neighbourIds = new Set(neighbours);
  var _iterator = _createForOfIteratorHelper(neighbours),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var neighbour = _step.value;
      var subNeighbours = findNeighbourPointIds(neighbour, connections, depth - 1);
      var _iterator2 = _createForOfIteratorHelper(subNeighbours),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var subNeighbour = _step2.value;
          neighbourIds.add(subNeighbour);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return Array.from(neighbourIds);
}
/**
 * Array of unique face feature point IDs related to lips.
 */
var FACE_FEATURE_LIPS = exports.FACE_FEATURE_LIPS = Array.from(new Set(_tasksVision.FaceLandmarker.FACE_LANDMARKS_LIPS.map(function (con) {
  return con.start;
}).concat([62, 76, 184, 183, 42, 74, 41, 73, 38, 72, 12, 11, 268, 302, 271, 303, 272, 304, 407, 408, 292, 306, 325, 307, 319, 320, 403, 404, 316, 315, 15, 16, 86, 85, 179, 180, 89, 90, 96, 77, 291, 308])));
/**
 * Array of unique face feature point IDs related to the left eye.
 */
var FACE_FEATURE_LEFT_EYE = exports.FACE_FEATURE_LEFT_EYE = Array.from(new Set(_tasksVision.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE.map(function (con) {
  return con.start;
}).concat(_tasksVision.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE.map(function (con) {
  return con.end;
})).concat(_tasksVision.FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS.map(function (con) {
  return con.start;
}).concat(_tasksVision.FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS.map(function (con) {
  return con.end;
})))));
/**
 * Array of unique face feature point IDs related to the left eyebrow.
 */
var FACE_FEATURE_LEFT_EYEBROW = exports.FACE_FEATURE_LEFT_EYEBROW = Array.from(new Set(_tasksVision.FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW.map(function (con) {
  return con.start;
}).concat(_tasksVision.FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW.map(function (con) {
  return con.end;
}))));
/**
 * Array of unique face feature point IDs related to the right eye.
 */
var FACE_FEATURE_RIGHT_EYE = exports.FACE_FEATURE_RIGHT_EYE = Array.from(new Set(_tasksVision.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE.map(function (con) {
  return con.start;
}).concat(_tasksVision.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE.map(function (con) {
  return con.end;
})).concat(_tasksVision.FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS.map(function (con) {
  return con.start;
}).concat(_tasksVision.FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS.map(function (con) {
  return con.end;
})))));
/**
 * Array of unique face feature point IDs related to the right eyebrow.
 */
var FACE_FEATURE_RIGHT_EYEBROW = exports.FACE_FEATURE_RIGHT_EYEBROW = Array.from(new Set(_tasksVision.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW.map(function (con) {
  return con.start;
}).concat(_tasksVision.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW.map(function (con) {
  return con.end;
}))));
/**
 * Array of unique face landmark point IDs related to the nose.
 */
var FACE_LANDMARKS_NOSE = exports.FACE_LANDMARKS_NOSE = convertToConnections([2, 97], [97, 98], [98, 64], [64, 48], [48, 115], [115, 220], [220, 45], [45, 4], [4, 275], [275, 440], [440, 344], [344, 278], [278, 294], [294, 327], [327, 326], [326, 2], [2, 19], [19, 1], [1, 4], [4, 5], [5, 195], [195, 197], [197, 6], [6, 168]);
/**
 * Array of unique face feature point IDs related to the nose.
 */
var FACE_FEATURE_NOSE = exports.FACE_FEATURE_NOSE = Array.from(new Set(FACE_LANDMARKS_NOSE.map(function (con) {
  return con.start;
}).concat(FACE_LANDMARKS_NOSE.map(function (con) {
  return con.end;
})).concat([102, 49, 209, 217, 174, 196, 6, 419, 399, 437, 429, 279, 331, 198, 131, 134, 236, 3, 51, 248, 281, 456, 363, 420, 360, 94, 141, 125, 44, 237, 239, 238, 241, 242, 99, 60, 75, 240, 235, 59, 166, 219, 79, 218, 370, 354, 274, 457, 438, 439, 455, 460, 328, 462, 461, 250, 458, 290, 305, 289, 392, 309, 459, 20])));
},{"@mediapipe/tasks-vision":"J3Gj"}],"rUEc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Editor2D = void 0;
var _point2d = require("./graph/point2d");
var _perspective2d = require("./graph/perspective2d");
var _graph = require("./graph/graph");
var _tasksVision = require("@mediapipe/tasks-vision");
var _face_landmarks_features = require("./graph/face_landmarks_features");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var COLOR_POINT_HOVERED = 'rgba(255,250,163,0.6)';
var COLOR_POINT_SELECTED = 'rgba(255,250,58,0.6)';
var COLOR_POINT_DEFAULT = '#0d6efd';
var COLOR_EDGES_TESSELATION = '#d5d5d5';
var COLOR_EDGES_FACE_OVAL = '#42ffef';
var COLOR_EDGES_LIPS = '#ff0883';
var COLOR_EDGES_RIGHT_EYE = '#b3ff42';
var COLOR_EDGES_RIGHT_IRIS = '#efffd8';
var COLOR_EDGES_LEFT_EYE = '#42c6ff';
var COLOR_EDGES_LEFT_IRIS = '#b5ebff';
var COLOR_EDGES_NOSE = '#eada70';
var LINE_WIDTH_DEFAULT = 2;
var POINT_WIDTH = 3;
var POINT_EXTENDED_WIDTH = 5;
var Editor2D = exports.Editor2D = /*#__PURE__*/function () {
  function Editor2D() {
    var _this = this;
    _classCallCheck(this, Editor2D);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "ctx", void 0);
    _defineProperty(this, "zoomScale", 1);
    _defineProperty(this, "offsetX", 0);
    _defineProperty(this, "offsetY", 0);
    _defineProperty(this, "prevMouseX", 0);
    _defineProperty(this, "prevMouseY", 0);
    _defineProperty(this, "mouseX", 0);
    _defineProperty(this, "mouseY", 0);
    _defineProperty(this, "isMoving", false);
    _defineProperty(this, "isPanning", false);
    _defineProperty(this, "image", new Image());
    _defineProperty(this, "onPointsEditedCallback", null);
    _defineProperty(this, "_dragDepth", 0);
    _defineProperty(this, "_graph", new _graph.Graph([]));
    _defineProperty(this, "_showTesselation", false);
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    // Size canvas
    this.clearAndFitToWindow();
    // Register event listeners
    this.canvas.addEventListener('mousedown', function (ev) {
      return _this.handleMouseDown(ev);
    });
    this.canvas.addEventListener('mousemove', function (ev) {
      return _this.handleMouseMove(ev);
    });
    this.canvas.addEventListener('mouseup', function (ev) {
      return _this.handleMouseUp(ev);
    });
    this.canvas.addEventListener('wheel', function (ev) {
      return _this.handleWheel(ev);
    });
    this.canvas.addEventListener('mouseout', function (ev) {
      return _this.handleMouseUp(ev);
    });
  }
  return _createClass(Editor2D, [{
    key: "dragDepth",
    get: function get() {
      return this._dragDepth;
    },
    set: function set(value) {
      this._dragDepth = value;
    }
  }, {
    key: "graph",
    get: function get() {
      return this._graph;
    },
    set: function set(value) {
      if (value) {
        this._graph = value.clone();
        this.draw();
      }
    }
  }, {
    key: "showTesselation",
    get: function get() {
      return this._showTesselation;
    },
    set: function set(value) {
      this._showTesselation = value;
      this.draw();
    }
  }, {
    key: "setOnBackgroundLoadedCallback",
    value: function setOnBackgroundLoadedCallback(callback) {
      var _this2 = this;
      this.image.onload = function (_) {
        return callback(_this2.image);
      };
    }
  }, {
    key: "setBackgroundSource",
    value: function setBackgroundSource(source) {
      var _this3 = this;
      var reader = new FileReader();
      reader.onload = function (_) {
        var result = reader.result;
        if (result) {
          _this3.image.src = result.toString();
        }
      };
      reader.readAsDataURL(source);
    }
  }, {
    key: "getBackgroundImage",
    value: function getBackgroundImage() {
      return this.image;
    }
  }, {
    key: "setOnPointsEditedCallback",
    value: function setOnPointsEditedCallback(callback) {
      this.onPointsEditedCallback = callback;
    }
  }, {
    key: "clearAndFitToWindow",
    value: function clearAndFitToWindow() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }, {
    key: "center",
    value: function center() {
      var scaleX = this.canvas.width / this.image.width;
      var scaleY = this.canvas.height / this.image.height;
      this.zoomScale = scaleX < scaleY ? scaleX : scaleY;
      this.offsetX = this.canvas.width / 2 - this.image.width / 2 * this.zoomScale;
      this.offsetY = this.canvas.height / 2 - this.image.height / 2 * this.zoomScale;
      // Redraw
      this.draw();
    }
  }, {
    key: "zoom",
    value: function zoom(out) {
      var dx = (this.mouseX - this.offsetX) / this.zoomScale;
      var dy = (this.mouseY - this.offsetY) / this.zoomScale;
      if (out) {
        this.canvas.style.cursor = 'zoom-out';
        this.zoomScale /= 1.1;
      } else {
        this.canvas.style.cursor = 'zoom-in';
        this.zoomScale *= 1.1;
      }
      // Ensure zoom level is within a reasonable range
      this.zoomScale = Math.min(Math.max(0.1, this.zoomScale), 50);
      // Update offsets
      this.offsetX = this.mouseX - dx * this.zoomScale;
      this.offsetY = this.mouseY - dy * this.zoomScale;
      // Redraw
      this.draw();
    }
  }, {
    key: "pan",
    value: function pan(deltaX, deltaY) {
      this.canvas.style.cursor = 'move';
      // update offsets
      this.offsetX += deltaX;
      this.offsetY += deltaY;
      // Redraw
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      this.clearAndFitToWindow();
      // Set Transformations
      this.ctx.translate(this.offsetX, this.offsetY);
      this.ctx.scale(this.zoomScale, this.zoomScale);
      // Draw Background
      this.ctx.drawImage(this.image, 0, 0);
      // Draw Mesh
      if (this.showTesselation) {
        this.drawFaceTrait(_tasksVision.FaceLandmarker.FACE_LANDMARKS_TESSELATION, COLOR_EDGES_TESSELATION);
      }
      this.drawFaceTrait(_tasksVision.FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, COLOR_EDGES_FACE_OVAL);
      this.drawFaceTrait(_tasksVision.FaceLandmarker.FACE_LANDMARKS_LIPS, COLOR_EDGES_LIPS);
      this.drawFaceTrait(_tasksVision.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, COLOR_EDGES_RIGHT_EYE);
      this.drawFaceTrait(_tasksVision.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, COLOR_EDGES_RIGHT_EYE);
      this.drawFaceTrait(_tasksVision.FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, COLOR_EDGES_RIGHT_IRIS);
      this.drawFaceTrait(_tasksVision.FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, COLOR_EDGES_LEFT_EYE);
      this.drawFaceTrait(_tasksVision.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, COLOR_EDGES_LEFT_EYE);
      this.drawFaceTrait(_tasksVision.FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, COLOR_EDGES_LEFT_IRIS);
      this.drawFaceTrait(_face_landmarks_features.FACE_LANDMARKS_NOSE, COLOR_EDGES_NOSE);
    }
  }, {
    key: "drawPoint",
    value: function drawPoint(point) {
      if (point && !point.deleted) {
        var projectedPoint = _perspective2d.Perspective2D.project(this.image, point);
        if (point.hovered) {
          this.ctx.beginPath();
          this.ctx.fillStyle = COLOR_POINT_HOVERED;
          this.ctx.arc(projectedPoint.x, projectedPoint.y, POINT_EXTENDED_WIDTH / this.zoomScale, 0, Math.PI * 2);
          // this.ctx.font = 20 / zoomScale + "px serif";
          // this.ctx.fillText(point.getId(), projectedPoint.x, projectedPoint.y);
          this.ctx.fill();
        }
        if (point.selected) {
          this.ctx.beginPath();
          this.ctx.fillStyle = COLOR_POINT_SELECTED;
          this.ctx.arc(projectedPoint.x, projectedPoint.y, POINT_EXTENDED_WIDTH / this.zoomScale, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.beginPath();
        this.ctx.fillStyle = COLOR_POINT_DEFAULT;
        this.ctx.arc(projectedPoint.x, projectedPoint.y, POINT_WIDTH / this.zoomScale, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }, {
    key: "drawFaceTrait",
    value: function drawFaceTrait(connections, color) {
      var _this4 = this;
      if (this.graph) {
        var pointPairs = connections.map(function (connection) {
          return {
            start: _this4.graph.getById(connection.start),
            end: _this4.graph.getById(connection.end)
          };
        });
        // Draw edges
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = LINE_WIDTH_DEFAULT / this.zoomScale;
        var _iterator = _createForOfIteratorHelper(pointPairs),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var connection = _step.value;
            var startPoint = connection.start;
            var endPoint = connection.end;
            if (startPoint && endPoint && !startPoint.deleted && !endPoint.deleted) {
              startPoint = _perspective2d.Perspective2D.project(this.image, startPoint);
              endPoint = _perspective2d.Perspective2D.project(this.image, endPoint);
              this.ctx.moveTo(startPoint.x, startPoint.y);
              this.ctx.lineTo(endPoint.x, endPoint.y);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this.ctx.stroke();
        // Draw points
        var _iterator2 = _createForOfIteratorHelper(pointPairs),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _connection = _step2.value;
            var _startPoint = _connection.start;
            var _endPoint = _connection.end;
            this.drawPoint(_startPoint);
            this.drawPoint(_endPoint);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      var _this5 = this;
      // Check if any normalized 3D point is clicked
      if (event.button === 0) {
        // left button
        this._graph.points.filter(function (p) {
          return p.hovered && !p.deleted;
        }).forEach(function (p) {
          p.selected = true;
          _this5.isMoving = true;
        });
      } else if (event.button === 1) {
        // wheel button
        this.isPanning = true;
      }
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      var _this6 = this;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      var relativeMouseX = (this.mouseX - this.offsetX) / this.zoomScale;
      var relativeMouseY = (this.mouseY - this.offsetY) / this.zoomScale;
      if (this.isMoving) {
        this.canvas.style.cursor = 'pointer';
        // Update normalized coordinates based on mouse position
        var alreadyUpdated = new Set();
        var relativeMouse = _perspective2d.Perspective2D.unproject(this.image, new _point2d.Point2D(-1, relativeMouseX, relativeMouseY, []));
        var selectedPoint = this.graph.getSelected();
        var neighbourPoints = [selectedPoint];
        var deltaX = relativeMouse.x - selectedPoint.x;
        var deltaY = relativeMouse.y - selectedPoint.y;
        for (var depth = 0; depth <= this.dragDepth; depth++) {
          // Go through each depth step
          var tmpPoints = [];
          var _iterator3 = _createForOfIteratorHelper(neighbourPoints),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var neigP = _step3.value;
              var influenceFactor = Math.exp(-depth);
              var newX = neigP.x + deltaX * influenceFactor;
              var newY = neigP.y + deltaY * influenceFactor;
              var newPoint = new _point2d.Point2D(-1, newX, newY, []);
              neigP.moveTo(newPoint);
              alreadyUpdated.add(neigP.id);
              // extract next depth of neighbours
              tmpPoints = tmpPoints.concat(this.graph.getNeighbourPointsOf(neigP));
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          neighbourPoints = tmpPoints.filter(function (p) {
            return !alreadyUpdated.has(p.id);
          });
        }
        // Redraw
        this.draw();
      } else if (this.isPanning) {
        this.pan(this.mouseX - this.prevMouseX, this.mouseY - this.prevMouseY);
      } else if (this.image) {
        var pointHover = false;
        var _relativeMouse = _perspective2d.Perspective2D.unproject(this.image, new _point2d.Point2D(-1, relativeMouseX, relativeMouseY, []));
        this._graph.points.forEach(function (point) {
          if (!pointHover && _perspective2d.Perspective2D.intersects(_this6.image, point, _relativeMouse, POINT_EXTENDED_WIDTH / _this6.zoomScale)) {
            point.hovered = true;
            pointHover = true;
          } else {
            pointHover || (pointHover = point.hovered); // Also update if one point gets un-hovered!
            point.hovered = false;
          }
        });
        if (pointHover) {
          this.draw();
        }
      }
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(_) {
      if (this.isMoving && this.onPointsEditedCallback) {
        this.onPointsEditedCallback(this._graph);
      }
      this.canvas.style.cursor = 'default';
      this.isPanning = false;
      this.isMoving = false;
      this._graph.points.forEach(function (point) {
        return point.selected = false;
      });
    }
  }, {
    key: "handleWheel",
    value: function handleWheel(event) {
      if (this.image && !event.shiftKey) {
        this.zoom(event.deltaY > 0);
        event.preventDefault();
      }
    }
  }]);
}();
},{"./graph/point2d":"gDGJ","./graph/perspective2d":"n8rv","./graph/graph":"V4e4","@mediapipe/tasks-vision":"J3Gj","./graph/face_landmarks_features":"K0kV"}],"KpWr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point3D = void 0;
var _point2d = require("./point2d");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents a 3D point with an ID, coordinates, and neighbor information.
 * Extends the base class Point2D.
 */
var Point3D = exports.Point3D = /*#__PURE__*/function (_Point2D) {
  /**
   * Creates a new Point3D instance.
   * @param {number} id - The unique identifier for the point.
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   * @param {number} z - The z-coordinate of the point (additional dimension).
   * @param {number[]} neighbourIds - An array of neighbor IDs.
   */
  function Point3D(id, x, y, z, neighbourIds) {
    var _this;
    _classCallCheck(this, Point3D);
    _this = _callSuper(this, Point3D, [id, x, y, neighbourIds]);
    _defineProperty(_this, "_z", void 0);
    _this._z = z;
    return _this;
  }
  _inherits(Point3D, _Point2D);
  return _createClass(Point3D, [{
    key: "z",
    get:
    /**
     * Gets or sets the z-coordinate of the point.
     * @returns {number} - The z-coordinate.
     */
    function get() {
      return this._z;
    },
    set: function set(value) {
      this._z = value;
    }
    /**
     * Returns a string representation of the 3D point.
     * @returns {string} - A formatted string with point details.
     */
  }, {
    key: "toString",
    value: function toString() {
      return "Point3D(id=".concat(this.id, ", x=").concat(this.x, ", y=").concat(this.y, ", z=").concat(this.z, ")");
    }
    /**
     * Creates a shallow copy of the 3D point.
     * @returns {Point3D} - A new Point3D instance with cloned properties.
     */
  }, {
    key: "clone",
    value: function clone() {
      var copy = new Point3D(this.id, this.x, this.y, this.z, this.getNeighbourIds());
      copy.hovered = this.hovered;
      copy.deleted = this.deleted;
      copy.selected = this.selected;
      return copy;
    }
    /**
     * Converts the point to a dictionary object.
     * @returns {object} - A dictionary containing point properties.
     */
  }, {
    key: "toDict",
    value: function toDict() {
      return {
        id: this.id,
        x: this.x,
        y: this.y,
        z: this.z,
        // hovered: this.hovered,
        deleted: this.deleted
        // selected: this.selected,
        // neighbourIds: this.neighbourIds
      };
    }
  }]);
}(_point2d.Point2D);
},{"./point2d":"gDGJ"}],"MWsf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediapipeModel = void 0;
var _graph = require("../graph/graph");
var _face_landmarks_features = require("../graph/face_landmarks_features");
var _tasksVision = require("@mediapipe/tasks-vision");
var _point3d = require("../graph/point3d");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents a model using MediaPipe for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
var MediapipeModel = exports.MediapipeModel = /*#__PURE__*/function () {
  /**
   * Creates a new MediapipeModel instance.
   */
  function MediapipeModel() {
    var _this = this;
    _classCallCheck(this, MediapipeModel);
    _defineProperty(this, "meshLandmarker", void 0);
    _tasksVision.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm').then(function (filesetResolver) {
      return _tasksVision.FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
          // When adding user model of same type -> modelAssetBuffer
          delegate: 'CPU'
        },
        minFaceDetectionConfidence: 0.3,
        minFacePresenceConfidence: 0.3,
        runningMode: 'IMAGE',
        numFaces: 1
      });
    }).then(function (landmarker) {
      return _this.meshLandmarker = landmarker;
    });
  }
  return _createClass(MediapipeModel, [{
    key: "detect",
    value: function () {
      var _detect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(imageFile) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                var image = new Image();
                image.onload = function (_) {
                  var _this2$meshLandmarker;
                  var result = (_this2$meshLandmarker = _this2.meshLandmarker) === null || _this2$meshLandmarker === void 0 ? void 0 : _this2$meshLandmarker.detect(image);
                  if (result) {
                    var graphs = result.faceLandmarks.map(function (landmarks) {
                      return landmarks.map(function (dict, idx) {
                        var ids = Array.from((0, _face_landmarks_features.findNeighbourPointIds)(idx, _tasksVision.FaceLandmarker.FACE_LANDMARKS_TESSELATION, 1));
                        return new _point3d.Point3D(idx, dict.x, dict.y, dict.z, ids);
                      }).map(function (point) {
                        return point;
                      });
                    }).map(function (landmarks) {
                      return new _graph.Graph(landmarks);
                    });
                    if (graphs) {
                      resolve(graphs[0]);
                    }
                  } else {
                    reject('Face(s) could not be detected!');
                  }
                };
                var reader = new FileReader();
                reader.onload = function (_) {
                  var result = reader.result;
                  if (result) {
                    image.src = result.toString();
                  } else {
                    reject('Image could not be read!');
                  }
                };
                reader.readAsDataURL(imageFile);
              }));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function detect(_x) {
        return _detect.apply(this, arguments);
      }
      return detect;
    }()
  }, {
    key: "uploadAnnotations",
    value: function () {
      var _uploadAnnotations = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", Promise.resolve());
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function uploadAnnotations(_x2) {
        return _uploadAnnotations.apply(this, arguments);
      }
      return uploadAnnotations;
    }()
  }]);
}();
},{"../graph/graph":"V4e4","../graph/face_landmarks_features":"K0kV","@mediapipe/tasks-vision":"J3Gj","../graph/point3d":"KpWr"}],"w2n2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelType = void 0;
/** Specifies the models in the API */
var ModelType;
(function (ModelType) {
  ModelType[ModelType["mediapipe"] = 0] = "mediapipe";
  ModelType[ModelType["custom"] = 1] = "custom";
})(ModelType || (exports.ModelType = ModelType = {}));
},{}],"Q7NS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlError = exports.WebServiceModel = void 0;
var _point2d = require("../graph/point2d");
var _graph = require("../graph/graph");
var _face_landmarks_features = require("../graph/face_landmarks_features");
var _tasksVision = require("@mediapipe/tasks-vision");
var _sha = require("../util/sha");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents a model using a WebService for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
var WebServiceModel = exports.WebServiceModel = /*#__PURE__*/function () {
  /**
   * Creates a new WebServiceModel instance.
   */
  function WebServiceModel(url) {
    _classCallCheck(this, WebServiceModel);
    _defineProperty(this, "url", void 0);
    this.url = url;
  }
  return _createClass(WebServiceModel, [{
    key: "detect",
    value: function () {
      var _detect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(imageFile) {
        var formData, request;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              formData = new FormData();
              formData.append('file', imageFile);
              request = new Request(this.url + '/detect', {
                method: 'POST',
                body: formData
              });
              return _context3.abrupt("return", fetch(request).then( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(res) {
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        if (res.ok) {
                          _context.next = 6;
                          break;
                        }
                        _context.t0 = Error;
                        _context.next = 4;
                        return res.json();
                      case 4:
                        _context.t1 = _context.sent['message'];
                        throw new _context.t0(_context.t1);
                      case 6:
                        return _context.abrupt("return", res.json());
                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }()).then( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(json) {
                  var sha;
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return (0, _sha.calculateSHA)(imageFile);
                      case 2:
                        sha = _context2.sent;
                        if (!(json['sha256'] !== sha)) {
                          _context2.next = 5;
                          break;
                        }
                        throw new Error("sha256 didn't match present file was ".concat(json['sha256'], ",  is , ").concat(sha));
                      case 5:
                        if (json['points']) {
                          _context2.next = 7;
                          break;
                        }
                        throw new Error("The request didn't return any point data.");
                      case 7:
                        return _context2.abrupt("return", json['points']);
                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }()).then(function (landmarks) {
                return landmarks.map(function (dict, idx) {
                  var ids = Array.from((0, _face_landmarks_features.findNeighbourPointIds)(idx, _tasksVision.FaceLandmarker.FACE_LANDMARKS_TESSELATION, 1));
                  return new _point2d.Point2D(idx, dict.x, dict.y, ids);
                });
              }).then(function (landmarks) {
                return new _graph.Graph(landmarks);
              }).catch(function (err) {
                console.log(err.message);
                return null;
              }));
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function detect(_x) {
        return _detect.apply(this, arguments);
      }
      return detect;
    }()
  }, {
    key: "uploadAnnotations",
    value: function () {
      var _uploadAnnotations = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(annotationsJson) {
        var headers, request;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              headers = new Headers();
              headers.set('Content-Type', 'application/json');
              headers.set('Accept', 'application/json');
              request = new Request(this.url + '/annotations', {
                method: 'POST',
                headers: headers,
                body: annotationsJson
              });
              return _context4.abrupt("return", fetch(request).then());
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function uploadAnnotations(_x4) {
        return _uploadAnnotations.apply(this, arguments);
      }
      return uploadAnnotations;
    }()
    /**
     * Verifies if a given URL is valid. Tries to connect to the endpoint.
     *
     * @param {string} url The URL to verify.
     *
     * @returns {urlError} Returns the type of URL error, if any.
     */
  }], [{
    key: "verifyUrl",
    value: (function () {
      var _verifyUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(url) {
        var pattern, request;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              pattern = new RegExp('^(https?:\\/\\/)?' +
              // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
              // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))' +
              // OR ip (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
              // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?' +
              // query string
              '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
              if (pattern.test(url)) {
                _context5.next = 3;
                break;
              }
              return _context5.abrupt("return", urlError.InvalidUrl);
            case 3:
              // try connecting to the url
              request = new Request(url, {
                method: 'HEAD'
              });
              return _context5.abrupt("return", fetch(request).then(function (_) {
                return null;
              }).catch(function (_) {
                return urlError.Unreachable;
              }));
            case 5:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function verifyUrl(_x5) {
        return _verifyUrl.apply(this, arguments);
      }
      return verifyUrl;
    }())
  }]);
}();
var urlError;
(function (urlError) {
  urlError["InvalidUrl"] = "InvalidUrl";
  urlError["Unreachable"] = "Unreachable";
})(urlError || (exports.urlError = urlError = {}));
},{"../graph/point2d":"gDGJ","../graph/graph":"V4e4","../graph/face_landmarks_features":"K0kV","@mediapipe/tasks-vision":"J3Gj","../util/sha":"nEA5"}],"YSF2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;
var bootstrap = _interopRequireWildcard(require("bootstrap"));
var _slider = require("./view/slider");
var _checkbox = require("./view/checkbox");
var _thumbnail = require("./view/thumbnail");
var _fileAnnotationHistory = require("./cache/fileAnnotationHistory");
var _point2d = require("./graph/point2d");
var _editor2d = require("./editor2d");
var _graph = require("./graph/graph");
var _face_landmarks_features = require("./graph/face_landmarks_features");
var _mediapipe = require("./model/mediapipe");
var _models = require("./model/models");
var _webservice = require("./model/webservice");
var _sha = require("./util/sha");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // import statically - don't grab it from a cdn
var App = exports.App = /*#__PURE__*/function () {
  function App(cacheSize) {
    var _this = this;
    _classCallCheck(this, App);
    _defineProperty(this, "featureDrag", void 0);
    _defineProperty(this, "viewTesselation", void 0);
    _defineProperty(this, "thumbnailGallery", void 0);
    _defineProperty(this, "numImages", void 0);
    _defineProperty(this, "fileCache", []);
    _defineProperty(this, "editor", new _editor2d.Editor2D());
    _defineProperty(this, "cacheSize", void 0);
    _defineProperty(this, "models", {
      mediapipe: {
        model: new _mediapipe.MediapipeModel(),
        selected: true
      },
      custom: {
        model: null,
        selected: false
      }
    });
    _defineProperty(this, "selectedFile", null);
    this.cacheSize = cacheSize;
    this.featureDrag = new _slider.Slider('feature_drag', function () {
      // TODO FIX Not working!
      var element = document.getElementById('num');
      element.value = _this.featureDrag.getValue().toString();
      _this.editor.dragDepth = _this.featureDrag.getValue();
    });
    this.viewTesselation = new _checkbox.CheckBox('view_tesselation', function () {
      return _this.editor.showTesselation = _this.viewTesselation.isChecked();
    });
    this.thumbnailGallery = document.getElementById('thumbnailgallery');
    this.numImages = document.getElementById('num_images');
    this.editor.setOnPointsEditedCallback(function (graph) {
      var _this$getSelectedFile;
      return (_this$getSelectedFile = _this.getSelectedFileHistory()) === null || _this$getSelectedFile === void 0 ? void 0 : _this$getSelectedFile.add(graph);
    });
    this.editor.setOnBackgroundLoadedCallback(function (_) {
      var _this$getSelectedFile2;
      if ((_this$getSelectedFile2 = _this.getSelectedFileHistory()) !== null && _this$getSelectedFile2 !== void 0 && _this$getSelectedFile2.isEmpty()) {
        _this.runDetection();
      } else {
        var _this$getSelectedFile3;
        _this.editor.graph = (_this$getSelectedFile3 = _this.getSelectedFileHistory()) === null || _this$getSelectedFile3 === void 0 ? void 0 : _this$getSelectedFile3.get();
      }
    });
  }
  return _createClass(App, [{
    key: "openImage",
    value: function openImage() {
      var _this2 = this;
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/png, image/jpeg, image/jpg';
      input.multiple = true;
      input.onchange = function () {
        if (input.files) {
          var files = Array.from(input.files);
          for (var _i = 0, _files = files; _i < _files.length; _i++) {
            var f = _files[_i];
            var history = new _fileAnnotationHistory.FileAnnotationHistory(f, _this2.cacheSize);
            _this2.fileCache.push(history);
            var thumbnail = new _thumbnail.Thumbnail(function (filename) {
              return _this2.selectThumbnail(filename);
            });
            thumbnail.setSource(f);
            _this2.thumbnailGallery.appendChild(thumbnail.toHtml());
            _this2.numImages.value = _this2.thumbnailGallery.children.length.toString();
          }
          if (files.length > 0) {
            _this2.editor.setBackgroundSource(files[0]);
            _this2.selectedFile = files[0].name;
          }
        }
      };
      input.click();
      return false;
    }
  }, {
    key: "openAnnotation",
    value: function openAnnotation() {
      var _this3 = this;
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json,application/json';
      input.onchange = function () {
        var _input$files;
        if (((_input$files = input.files) === null || _input$files === void 0 ? void 0 : _input$files.length) <= 0) {
          return;
        }
        var annotationFile = input.files[0];
        var reader = new FileReader();
        reader.onload = function (_) {
          var jsonString = JSON.parse(reader.result);
          var _loop = function _loop() {
            var filename = _Object$keys[_i2];
            var workingImage = jsonString[filename];
            // skip files without annotation
            if (Object.keys(workingImage).length == 0) {
              return 1; // continue
            }
            var graph = _graph.Graph.fromJson(workingImage['points'], function (id) {
              return new _point2d.Point2D(id, 0, 0, []);
            });
            var cache = _this3.fileCache.find(function (f) {
              return f.file.name === filename && f.hash === workingImage['sha256'];
            });
            if (cache) {
              cache.add(graph);
              if (_this3.selectedFile === filename) {
                _this3.editor.graph = graph;
              }
            }
          };
          for (var _i2 = 0, _Object$keys = Object.keys(jsonString); _i2 < _Object$keys.length; _i2++) {
            if (_loop()) continue;
          }
          _this3.editor.draw();
        };
        reader.readAsText(annotationFile);
      };
      input.click();
      return false;
    }
  }, {
    key: "saveAnnotation",
    value: function saveAnnotation() {
      var _this4 = this;
      if (this.fileCache.length > 0) {
        var result = {};
        var promises = [];
        var _iterator = _createForOfIteratorHelper(this.fileCache),
          _step;
        try {
          var _loop2 = function _loop2() {
            var c = _step.value;
            var graph = c.get();
            result[c.file.name] = {};
            if (graph) {
              result[c.file.name]['points'] = graph.toDictArray();
              var promise = (0, _sha.calculateSHA)(c.file).then(function (sha256) {
                result[c.file.name]['sha256'] = sha256;
              });
              promises.push(promise);
            }
          };
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        Promise.all(promises).then(function () {
          var jsonData = JSON.stringify(result);
          _this4.getModel().uploadAnnotations(jsonData);
          var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);
          var a = document.createElement('a');
          a.href = dataStr;
          a.download = Date.now() + '_face_mesh_annotations.json';
          a.click();
        }).catch(function (error) {
          console.error('An error occurred:', error);
        });
      }
      return false;
    }
  }, {
    key: "undo",
    value: function undo() {
      var _this$getSelectedFile4, _this$getSelectedFile5;
      (_this$getSelectedFile4 = this.getSelectedFileHistory()) === null || _this$getSelectedFile4 === void 0 || _this$getSelectedFile4.previous();
      this.editor.graph = (_this$getSelectedFile5 = this.getSelectedFileHistory()) === null || _this$getSelectedFile5 === void 0 ? void 0 : _this$getSelectedFile5.get();
      return false;
    }
  }, {
    key: "redo",
    value: function redo() {
      var _this$getSelectedFile6, _this$getSelectedFile7;
      (_this$getSelectedFile6 = this.getSelectedFileHistory()) === null || _this$getSelectedFile6 === void 0 || _this$getSelectedFile6.next();
      this.editor.graph = (_this$getSelectedFile7 = this.getSelectedFileHistory()) === null || _this$getSelectedFile7 === void 0 ? void 0 : _this$getSelectedFile7.get();
      return false;
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this$getSelectedFile8;
      (_this$getSelectedFile8 = this.getSelectedFileHistory()) === null || _this$getSelectedFile8 === void 0 || _this$getSelectedFile8.clear();
      this.runDetection();
      return false;
    }
  }, {
    key: "addFeatureDrag",
    value: function addFeatureDrag(value) {
      this.featureDrag.setValue(this.featureDrag.getValue() + value);
    }
  }, {
    key: "setModel",
    value: function setModel(name) {
      var _this5 = this;
      var btnMediapipe = document.getElementById('btnModelMediapipe');
      var btnCustom = document.getElementById('btnModelCustom');
      this.models.mediapipe.selected = false;
      this.models.custom.selected = false;
      switch (name) {
        case _models.ModelType.mediapipe:
          {
            btnMediapipe.checked = true;
            this.models.mediapipe.selected = true;
            break;
          }
        case _models.ModelType.custom:
          {
            btnCustom.checked = true;
            this.models.custom.selected = true;
            var inputBox = $('#modelurl');
            var url = String(inputBox.val());
            _webservice.WebServiceModel.verifyUrl(url).then(function (error) {
              var errorText = $('#urlErrorText');
              if (error === null) {
                _this5.models.custom.model = new _webservice.WebServiceModel(url);
                $('#modalSettingsModel').modal('hide');
                errorText.hide();
                var saveElement = $('#saveNotification')[0];
                var toast = bootstrap.Toast.getOrCreateInstance(saveElement);
                toast.show();
                var notificationText = $('#saveNotificationText');
                notificationText.text('Webservice url saved!');
                setTimeout(function () {
                  toast.hide();
                  notificationText.text();
                }, 5000);
              } else {
                // Display error:
                switch (error) {
                  case _webservice.urlError.InvalidUrl:
                    {
                      errorText.removeAttr('hidden');
                      errorText.text('Please enter a valid URL!');
                      break;
                    }
                  case _webservice.urlError.Unreachable:
                    {
                      errorText.removeAttr('hidden');
                      errorText.text("The provided endpoint wasn't reachable!");
                      break;
                    }
                }
                // shake the input window
                inputBox.addClass('wrongInput');
                setTimeout(function () {
                  inputBox.removeClass('wrongInput');
                }, 500);
              }
            });
            break;
          }
        default:
          console.error('No model "' + name + '" found to change to!');
          break;
      }
      return false;
    }
  }, {
    key: "getModel",
    value: function getModel() {
      for (var modelName in this.models) {
        if (this.models[modelName].selected) {
          return this.models[modelName].model;
        }
      }
      return undefined;
    }
  }, {
    key: "deleteFeature",
    value: function deleteFeature(feature) {
      var _this$getSelectedFile9;
      (_this$getSelectedFile9 = this.getSelectedFileHistory()) === null || _this$getSelectedFile9 === void 0 || _this$getSelectedFile9.add(this.editor.graph);
      switch (feature) {
        case 'left_eye':
          this.deletePoints(_face_landmarks_features.FACE_FEATURE_LEFT_EYE);
          break;
        case 'left_eyebrow':
          this.deletePoints(_face_landmarks_features.FACE_FEATURE_LEFT_EYEBROW);
          break;
        case 'right_eye':
          this.deletePoints(_face_landmarks_features.FACE_FEATURE_RIGHT_EYE);
          break;
        case 'right_eyebrow':
          this.deletePoints(_face_landmarks_features.FACE_FEATURE_RIGHT_EYEBROW);
          break;
        case 'nose':
          this.deletePoints(_face_landmarks_features.FACE_FEATURE_NOSE);
          break;
        case 'mouth':
          this.deletePoints(_face_landmarks_features.FACE_FEATURE_LIPS);
          break;
        default:
          console.error('No feature "' + feature + '" found to delete!');
          break;
      }
      return false;
    }
  }, {
    key: "selectThumbnail",
    value: function selectThumbnail(filename) {
      this.selectedFile = filename;
      var cache = this.getSelectedFileHistory();
      if (cache) {
        this.editor.setBackgroundSource(cache.file);
      }
    }
  }, {
    key: "resizeWindow",
    value: function resizeWindow() {
      this.editor.draw();
    }
  }, {
    key: "runDetection",
    value: function runDetection() {
      var _this$getModel,
        _this6 = this;
      (_this$getModel = this.getModel()) === null || _this$getModel === void 0 || _this$getModel.detect(this.getSelectedFileHistory().file).then(function (graph) {
        var _this6$getSelectedFil;
        if (graph === null) {
          return;
        }
        (_this6$getSelectedFil = _this6.getSelectedFileHistory()) === null || _this6$getSelectedFil === void 0 || _this6$getSelectedFil.add(graph);
        _this6.editor.center();
        _this6.editor.graph = graph;
      });
    }
  }, {
    key: "getSelectedFileHistory",
    value: function getSelectedFileHistory() {
      var _this7 = this;
      return this.fileCache.find(function (c) {
        return c.file.name === _this7.selectedFile;
      });
    }
  }, {
    key: "deletePoints",
    value: function deletePoints(pointIds) {
      var _this$getSelectedFile10;
      var graph = (_this$getSelectedFile10 = this.getSelectedFileHistory()) === null || _this$getSelectedFile10 === void 0 ? void 0 : _this$getSelectedFile10.get();
      if (graph) {
        var _iterator2 = _createForOfIteratorHelper(pointIds),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var id = _step2.value;
            graph.getById(id).deleted = true;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        this.editor.graph = graph;
      }
    }
  }]);
}(); // #####################################################################################################################
// INITIAL
// #####################################################################################################################
window.onload = function (_) {
  var elements = document.querySelectorAll('[aria-keyshortcuts]');
  elements.forEach(function (elem) {
    elem.style.cssText = 'width: 100%; text-align: start; padding: .2vw;';
    var keys = elem.ariaKeyShortcuts.split('+').map(function (k) {
      return k.replace('Control', 'CTRL').replace('Shift', 'SHIFT').replace('Wheel', 'SCROLL');
    });
    if (elem.ariaKeyShortcuts.length > 0) {
      var table = document.createElement('table');
      table.style.cssText = 'width: 100%';
      var row = document.createElement('tr');
      table.appendChild(row);
      var menuTextCol = document.createElement('td');
      menuTextCol.innerHTML = elem.innerHTML;
      row.appendChild(menuTextCol);
      var menuShortCutCol = document.createElement('td');
      menuShortCutCol.style.cssText = 'text-align: end;';
      menuShortCutCol.innerHTML = keys.map(function (k) {
        return '<kbd>' + k + '</kbd>';
      }).join('+');
      row.appendChild(menuShortCutCol);
      elem.replaceChildren(table);
    }
  });
  var app = new App(25);
  document.getElementById('openFile').onclick = function () {
    return app.openImage();
  };
  document.getElementById('openAnno').onclick = function () {
    return app.openAnnotation();
  };
  document.getElementById('saveAnno').onclick = function () {
    return app.saveAnnotation();
  };
  document.getElementById('undo').onclick = function () {
    return app.undo();
  };
  document.getElementById('redo').onclick = function () {
    return app.redo();
  };
  document.getElementById('reset').onclick = function () {
    return app.reset();
  };
  document.getElementById('btnModelMediapipe').onclick = function () {
    return app.setModel(_models.ModelType.mediapipe);
  };
  document.getElementById('btnCloseModal').onclick = function () {
    return app.setModel(_models.ModelType.mediapipe);
  };
  document.getElementById('btnCancelModal').onclick = function () {
    return app.setModel(_models.ModelType.mediapipe);
  };
  document.getElementById('btnSaveCustomModel').onclick = function () {
    return app.setModel(_models.ModelType.custom);
  };
  document.getElementById('feat_le').onclick = function (_) {
    return app.deleteFeature('left_eye');
  };
  document.getElementById('feat_leb').onclick = function (_) {
    return app.deleteFeature('left_eyebrow');
  };
  document.getElementById('feat_re').onclick = function (_) {
    return app.deleteFeature('right_eye');
  };
  document.getElementById('feat_reb').onclick = function (_) {
    return app.deleteFeature('right_eyebrow');
  };
  document.getElementById('feat_n').onclick = function (_) {
    return app.deleteFeature('nose');
  };
  document.getElementById('feat_m').onclick = function (_) {
    return app.deleteFeature('mouth');
  };
  window.onresize = function () {
    return app.resizeWindow();
  };
  window.onwheel = function (e) {
    if (e.shiftKey) {
      app.addFeatureDrag(e.deltaY / 100);
    }
  };
};
},{"bootstrap":"XhER","./view/slider":"Q2pJ","./view/checkbox":"GFaE","./view/thumbnail":"N3UC","./cache/fileAnnotationHistory":"hQdi","./graph/point2d":"gDGJ","./editor2d":"rUEc","./graph/graph":"V4e4","./graph/face_landmarks_features":"K0kV","./model/mediapipe":"MWsf","./model/models":"w2n2","./model/webservice":"Q7NS","./util/sha":"nEA5"}]},{},["YSF2"], null)
//# sourceMappingURL=app.981b2363.js.map