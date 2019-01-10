"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EffectsLibrary = require("./EffectsLibrary");

var _EffectsLibrary2 = _interopRequireDefault(_EffectsLibrary);

var _AttributeNode = require("./AttributeNode");

var _AttributeNode2 = _interopRequireDefault(_AttributeNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EmitterArray =
/*#__PURE__*/
function () {
  function EmitterArray(min, max) {
    _classCallCheck(this, EmitterArray);

    this._life = 0;
    this._compiled = false;
    this._min = min;
    this._max = max;
    this._changes = [];
    this._attributes = [];
  }

  _createClass(EmitterArray, [{
    key: "getLastFrame",
    value: function getLastFrame() {
      return this._changes.length - 1;
    }
  }, {
    key: "getCompiled",
    value: function getCompiled(frame) {
      frame = Math.round(frame);
      var lastFrame = this.getLastFrame();

      if (frame <= lastFrame) {
        return this._changes[frame];
      }

      return this._changes[lastFrame];
    }
  }, {
    key: "setCompiled",
    value: function setCompiled(frame, value) {
      this._changes[frame] = value;
    }
  }, {
    key: "getLife",
    value: function getLife() {
      return this._life;
    }
  }, {
    key: "setLife",
    value: function setLife(life) {
      this._life = life;
    }
  }, {
    key: "getLastAtrribute",
    value: function getLastAtrribute() {
      return this._attributes[this._attributes.length - 1];
    }
  }, {
    key: "compile",
    value: function compile() {
      if (this._attributes.length > 0) {
        var lastec = this.getLastAtrribute();

        var lookupFrequency = _EffectsLibrary2.default.getLookupFrequency();

        var frame = Math.ceil(lastec.frame / lookupFrequency);
        this._changes = new Array(frame + 1);
        frame = 0;
        var age = 0;

        while (age < lastec.frame) {
          this.setCompiled(frame, this.interpolate(age));
          ++frame;
          age = frame * lookupFrequency;
        }

        this.setCompiled(frame, lastec.value);
      } else {
        this._changes = [0];
      }

      this._compiled = true;
    }
  }, {
    key: "compileOT",
    value: function compileOT() {
      var longestLife = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getLastAtrribute().frame;

      if (this._attributes.length > 0) {
        //   longestLife = GetDefaultArg(longestLife, this.GetLastAtrribute().frame);
        var lastec = this.getLastAtrribute();

        var lookupFrequency = _EffectsLibrary2.default.getLookupFrequencyOverTime(); // TODO


        var frame = Math.ceil(longestLife / lookupFrequency);
        this._changes = new Array(frame + 1);
        frame = 0;
        var age = 0;

        while (age < longestLife) {
          this.setCompiled(frame, this.interpolateOT(age, longestLife));
          ++frame;
          age = frame * lookupFrequency;
        }

        this.setLife(longestLife);
        this.setCompiled(frame, lastec.value);
      } else {
        this._changes = [0];
      }

      this._compiled = true;
    }
  }, {
    key: "add",
    value: function add(frame, value) {
      this._compiled = false;
      var e = new _AttributeNode2.default();
      e.frame = frame;
      e.value = value;

      this._attributes.push(e);

      return e;
    }
  }, {
    key: "get",
    value: function get(frame) {
      var bezier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (this._compiled) return this.getCompiled(frame);else return this.interpolate(frame, bezier);
    }
  }, {
    key: "getBezierValue",
    value: function getBezierValue(lastec, a, t, yMin, yMax) {
      if (a.isCurve) {
        var p0x = lastec.frame;
        var p0y = lastec.value;

        if (lastec.isCurve) {
          var p1x = lastec.c1x;
          var p1y = lastec.c1y;
          var p2x = a.c0x;
          var p2y = a.c0y;
          var p3x = a.frame;
          var p3y = a.value;
          return this.getCubicBezier(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, t, yMin, yMax).y;
        } else {
          var _p1x = a.c0x;
          var _p1y = a.c0y;
          var _p2x = a.frame;
          var _p2y = a.value;
          return this.getQuadBezier(p0x, p0y, _p1x, _p1y, _p2x, _p2y, t, yMin, yMax).y;
        }
      } else if (lastec.isCurve) {
        var _p0x = lastec.frame;
        var _p0y = lastec.value;
        var _p1x2 = lastec.c1x;
        var _p1y2 = lastec.c1y;
        var _p2x2 = a.frame;
        var _p2y2 = a.value;
        return this.getQuadBezier(_p0x, _p0y, _p1x2, _p1y2, _p2x2, _p2y2, t, yMin, yMax).y;
      } else {
        return 0;
      }
    }
  }, {
    key: "getQuadBezier",
    value: function getQuadBezier(p0x, p0y, p1x, p1y, p2x, p2y, t, yMin, yMax) {
      var clamp = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : true;
      var x = (1 - t) * (1 - t) * p0x + 2 * t * (1 - t) * p1x + t * t * p2x;
      var y = (1 - t) * (1 - t) * p0y + 2 * t * (1 - t) * p1y + t * t * p2y;
      if (x < p0x) x = p0x;
      if (x > p2x) x = p2x;

      if (clamp) {
        if (y < yMin) y = yMin;
        if (y > yMax) y = yMax;
      }

      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "getCubicBezier",
    value: function getCubicBezier(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, t, yMin, yMax) {
      var clamp = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : true;
      var x = (1 - t) * (1 - t) * (1 - t) * p0x + 3 * t * (1 - t) * (1 - t) * p1x + 3 * t * t * (1 - t) * p2x + t * t * t * p3x;
      var y = (1 - t) * (1 - t) * (1 - t) * p0y + 3 * t * (1 - t) * (1 - t) * p1y + 3 * t * t * (1 - t) * p2y + t * t * t * p3y;
      if (x < p0x) x = p0x;
      if (x > p3x) x = p3x;

      if (clamp) {
        if (y < yMin) y = yMin;
        if (y > yMax) y = yMax;
      }

      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "interpolate",
    value: function interpolate(frame) {
      return this.interpolateOT(frame, 1.0);
    }
  }, {
    key: "interpolateOT",
    value: function interpolateOT(age, lifetime) {
      var bezier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var lasty = 0;
      var lastf = 0;
      var lastec = null;

      for (var i = 0; i < this._attributes.length; i++) {
        var it = this._attributes[i];
        var frame = it.frame * lifetime;

        if (age < frame) {
          var p = (age - lastf) / (frame - lastf);

          if (bezier) {
            var bezierValue = this.getBezierValue(lastec, it, p, this._min, this._max);

            if (bezierValue !== 0) {
              return bezierValue;
            }
          }

          return lasty - p * (lasty - it.value);
        }

        lasty = it.value;
        lastf = frame;
        if (bezier) lastec = it;
      }

      return lasty;
    }
  }, {
    key: "getOt",
    value: function getOt(age, lifetime) {
      var frame = 0;

      if (lifetime > 0) {
        frame = age / lifetime * this._life / _EffectsLibrary2.default.getLookupFrequencyOverTime(); // TODO
      }

      return this.get(frame);
    }
  }, {
    key: "getAttributesCount",
    value: function getAttributesCount() {
      return this._attributes.length;
    }
  }, {
    key: "getMaxValue",
    value: function getMaxValue() {
      var max = 0;

      for (var i = 0; i < this._attributes.length; i++) {
        var val = this._attributes[i].value;
        if (val > max) max = val;
      }

      return max;
    }
  }]);

  return EmitterArray;
}();

exports.default = EmitterArray;