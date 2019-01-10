"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vector = require("./Vector2");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Matrix2 =
/*#__PURE__*/
function () {
  function Matrix2() {
    _classCallCheck(this, Matrix2);

    this.set(1, 0, 0, 1);
  }

  _createClass(Matrix2, [{
    key: "create",
    value: function create() {
      var aa_ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var ab_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var ba_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var bb_ = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var m = new Matrix2();
      m.set(aa_, ab_, ba_, bb_);
      return m;
    }
  }, {
    key: "set",
    value: function set() {
      var aa_ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var ab_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var ba_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var bb_ = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      this.aa = aa_;
      this.ab = ab_;
      this.ba = ba_;
      this.bb = bb_;
    }
  }, {
    key: "scale",
    value: function scale(s) {
      this.aa *= s;
      this.ab *= s;
      this.ba *= s;
      this.bb *= s;
    }
  }, {
    key: "transpose",
    value: function transpose(s) {
      var abt = this.ab;
      this.ab = this.ba;
      this.ba = abt;
    }
  }, {
    key: "transformSelf",
    value: function transformSelf(m) {
      var r_aa = this.aa * m.aa + this.ab * m.ba;
      var r_ab = this.aa * m.ab + this.ab * m.bb;
      var r_ba = this.ba * m.aa + this.bb * m.ba;
      var r_bb = this.ba * m.ab + this.bb * m.bb;
      this.set(r_aa, r_ab, r_ba, r_bb);
    }
  }, {
    key: "transformVector",
    value: function transformVector(x, y) {
      var tv = new _Vector2.default();
      tv.x = x * this.aa + y * this.ba;
      tv.y = x * this.ab + y * this.bb;
      return tv;
    }
  }]);

  return Matrix2;
}();

exports.default = Matrix2;