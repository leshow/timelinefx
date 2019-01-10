"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFromList = removeFromList;
exports.stripFilePath = stripFilePath;
exports.fmod = fmod;
exports.degrees = degrees;
exports.toRadians = toRadians;
exports.getNodeAttrValue = getNodeAttrValue;
exports.forEachInXMLNodeList = forEachInXMLNodeList;
exports.forEachXMLChild = forEachXMLChild;
exports.getXMLAttrSafe = getXMLAttrSafe;
exports.lerp = lerp;
exports.randomUnit = randomUnit;
exports.random = random;
exports.randomBetween = randomBetween;
exports.getDistance2D = getDistance2D;
exports.getDirection = getDirection;
exports.loadXMLDoc = loadXMLDoc;
exports.toHex = toHex;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function removeFromList(array, elem) {
  var index = array.indexOf(elem);

  if (index > -1) {
    array.splice(index, 1);
  }
}

var M_PI = exports.M_PI = 3.14159265358979323846;
var g_randomSeed = exports.g_randomSeed = 17;

function stripFilePath(filename) {
  var index = Math.max(filename.lastIndexOf("/"), filename.lastIndexOf("\\"));
  return filename.substring(index + 1);
}

function fmod(a, b) {
  return Number((a - Math.floor(a / b) * b).toPrecision(8));
}

function degrees(rad) {
  return rad * (180 / Math.PI);
}

function toRadians(deg) {
  return deg * (Math.PI / 180);
}

var CopyHelper =
/*#__PURE__*/
exports.CopyHelper = function () {
  function CopyHelper(fromObj, toObj) {
    _classCallCheck(this, CopyHelper);

    this.m_fromObj = fromObj;
    this.m_toObj = toObj;
  }

  _createClass(CopyHelper, [{
    key: "copy",
    value: function copy(key, defaultVal) {
      this.m_toObj[key] = this.m_fromObj ? this.m_fromObj[key] : defaultVal;
    }
  }]);

  return CopyHelper;
}();

var XMLHelper =
/*#__PURE__*/
exports.XMLHelper = function () {
  function XMLHelper(xml) {
    _classCallCheck(this, XMLHelper);

    this.m_xml = xml;
    this.m_attr = xml.attributes;
  }

  _createClass(XMLHelper, [{
    key: "getAttr",
    value: function getAttr(attrName) {
      var attr = this.m_attr.getNamedItem(attrName);
      return attr ? attr.nodeValue : null;
    }
  }, {
    key: "getAttrAsInt",
    value: function getAttrAsInt(attrName) {
      return parseInt(this.getAttr(attrName));
    }
  }, {
    key: "getAttrAsFloat",
    value: function getAttrAsFloat(attrName) {
      return parseFloat(this.getAttr(attrName));
    }
  }, {
    key: "getAttrAsBool",
    value: function getAttrAsBool(attrName) {
      return this.getAttrAsInt(attrName) > 0;
    }
  }, {
    key: "getChildAttr",
    value: function getChildAttr(childName, attrName) {
      var childNode = this.m_xml.getElementsByTagName(childName)[0];
      if (childNode) return getXMLAttrSafe(childNode, attrName, null);
      return null;
    }
  }, {
    key: "hasChildAttr",
    value: function hasChildAttr(attrName) {
      return this.getChildAttr(attrName) !== null;
    }
  }, {
    key: "getChildAttrAsInt",
    value: function getChildAttrAsInt(attrName) {
      return parseInt(this.getChildAttr(attrName));
    }
  }, {
    key: "getChildAttrAsBool",
    value: function getChildAttrAsBool(attrName) {
      return this.getChildAttrAsInt(attrName) > 0;
    }
  }]);

  return XMLHelper;
}();

function getNodeAttrValue(elem, attrName) {
  return elem.attributes.getNamedItem(attrName).nodeValue;
}

function forEachInXMLNodeList(nodelist, fn) {
  for (var i = 0; i < nodelist.length; i++) {
    fn(nodelist[i]);
  }
}

function forEachXMLChild(xmlNode, tag, fn) {
  var nodelist = xmlNode.getElementsByTagName(tag);

  for (var i = 0; i < nodelist.length; i++) {
    if (nodelist[i].parentElement == xmlNode) fn(nodelist[i]);
  }
}

function getXMLAttrSafe(xmlNode, attrName) {
  var defaultResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var attr = xmlNode.attributes ? xmlNode.attributes.getNamedItem(attrName) : null;
  return attr ? attr.nodeValue : defaultResult;
}

function lerp(a, b, fract) {
  return a + fract * (b - a);
} // http://stackoverflow.com/questions/521295/javascript-random-seeds


function randomUnit() {
  var x = Math.sin((exports.g_randomSeed = g_randomSeed += 1, g_randomSeed - 1)) * 10000;
  return x - Math.floor(x);
}

function random(mag) {
  return randomUnit() * mag;
}

function randomBetween(low, high) {
  return lerp(low, high, randomUnit());
}

function getDistance2D(fromx, fromy, tox, toy) {
  var fast = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var w = tox - fromx;
  var h = toy - fromy;

  if (fast) {
    return w * w + h * h;
  } else {
    return Math.sqrt(w * w + h * h);
  }
}
/**
 * Get the direction from 1 point to another
 * Thanks to "Snarkbait" for this little code snippit
 * @return Angle of difference
 */


function getDirection(fromx, fromy, tox, toy) {
  // arcus tangens, convert to degrees, add 450 and normalize to 360.
  return fmod(Math.atan2(toy - fromy, tox - fromx) / M_PI * 180.0 + 450.0, 360.0);
}

function loadXMLDoc(filename) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", filename, false);
  xhttp.send();
  return xhttp.responseXML;
}

function toHex(r, g, b) {
  return (r << 16) + (g << 8) + b;
}