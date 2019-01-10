"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Utils = require("./Utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AttributeNode =
/*#__PURE__*/
function () {
  function AttributeNode() {
    _classCallCheck(this, AttributeNode);

    this.frame = 0;
    this.value = 0;
    this.isCurve = false;
    this.c0x = 0;
    this.c0y = 0;
    this.c1x = 0;
    this.c1y = 0;
  }

  _createClass(AttributeNode, [{
    key: "compare",
    value: function compare(other) {
      return this.frame > other.frame;
    }
  }, {
    key: "setCurvePoints",
    value: function setCurvePoints(x0, y0, x1, y1) {
      this.c0x = x0;
      this.c0y = y0;
      this.c1x = x1;
      this.c1y = y1;
      this.isCurve = true;
    }
  }, {
    key: "toggleCurve",
    value: function toggleCurve() {
      this.isCurve = !this.isCurve;
    }
  }, {
    key: "loadFromXML",
    value: function loadFromXML(xml) {
      if (xml) {
        this.setCurvePoints((0, _Utils.getNodeAttrValue)(xml, "LEFT_CURVE_POINT_X"), (0, _Utils.getNodeAttrValue)(xml, "LEFT_CURVE_POINT_Y"), (0, _Utils.getNodeAttrValue)(xml, "RIGHT_CURVE_POINT_X"), (0, _Utils.getNodeAttrValue)(xml, "RIGHT_CURVE_POINT_Y"));
      }
    }
  }]);

  return AttributeNode;
}();

exports.default = AttributeNode;