"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector2 =
/*#__PURE__*/
function () {
  function Vector2(x, y) {
    _classCallCheck(this, Vector2);

    this.set(x, y);
  }

  _createClass(Vector2, [{
    key: "create",
    value: function create(x, y) {
      return new Vector2(x, y);
    }
  }, {
    key: "set",
    value: function set(vx, vy) {
      this.x = vx;
      this.y = vy;
    }
  }, {
    key: "move1",
    value: function move1(other) {
      return this.Move2(other.x, other.y);
    }
  }, {
    key: "move2",
    value: function move2(vx, vy) {
      this.x += vx;
      this.y += vy;
    }
  }, {
    key: "subtract",
    value: function subtract(v) {
      return new Vector2(x - v.x, y - v.y);
    }
  }, {
    key: "add",
    value: function add(v) {
      return new Vector2(x + v.x, y + v.y);
    }
  }, {
    key: "multiply",
    value: function multiply(v) {
      return new Vector2(x * v.x, y * v.y);
    }
  }, {
    key: "scale",
    value: function scale(_scale) {
      return new Vector2(x * _scale, y * _scale);
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(x * x + y * y);
    }
  }, {
    key: "unit",
    value: function unit() {
      var length = this.length();

      if (length > 0) {
        return new Vector2(v.x = x / length, v.y = y / length);
      }

      return new Vector2(0, 0);
    }
  }, {
    key: "normal",
    value: function normal() {
      return new Vector2(-y, x);
    }
  }, {
    key: "leftNormal",
    value: function leftNormal() {
      return new Vector2(y, -x);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var length = this.length(); // Length

      if (length > 0) {
        this.x /= length;
        this.y /= length;
      }
    }
  }, {
    key: "dotProduct",
    value: function dotProduct(v) {
      return x * v.x + y * v.y;
    }
  }]);

  return Vector2;
}();

exports.default = Vector2;