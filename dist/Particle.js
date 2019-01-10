"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Entity2 = require("./Entity");

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Particle =
/*#__PURE__*/
function (_Entity) {
  _inherits(Particle, _Entity);

  // Class(Entity, ...)
  function Particle() {
    var _this;

    _classCallCheck(this, Particle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Particle).call(this)); // Call parent's constructor

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "m_pixiSprite", void 0);

    _this._emitter = null;
    _this._weightVariation = 0;
    _this._scaleVariationX = 0;
    _this._scaleVariationY = 0;
    _this._gSizeX = 0;
    _this._gSizeY = 0;
    _this._velVariation = 0;
    _this._spinVariation = 0;
    _this._directionVariation = 0;
    _this._timeTracker = 0;
    _this._randomDirection = 0;
    _this._randomSpeed = 0;
    _this._emissionAngle = 0;
    _this._releaseSingleParticle = false;
    _this._particleManager = null;
    _this._layer = 0;
    _this._groupParticles = false;
    _this._effectLayer = 0;
    return _this;
  }

  _createClass(Particle, [{
    key: "reset",
    value: function reset() {
      this._age = 0;
      this._wx = 0;
      this._wy = 0;
      this._z = 1.0;
      this._avatar = null;
      this._dead = 0;
      this.clearChildren();
      this._directionVariation = 0;
      this._direction = 0;
      this._directionLocked = false;
      this._randomSpeed = 0;
      this._randomDirection = 0;
      this._parent = null;
      this._rootParent = null;
      this._aCycles = 0;
      this._cCycles = 0;
      this._rptAgeA = 0;
      this._rptAgeC = 0;
      this._releaseSingleParticle = false;
      this._gravity = 0;
      this._weight = 0;
      this._emitter = null;
    }
  }, {
    key: "update",
    value: function update() {
      this.capture();
      if (this._emitter.isDying() || this._emitter.isOneShot() || this._dead) this._releaseSingleParticle = true;

      if (this._emitter.isSingleParticle() && !this._releaseSingleParticle) {
        this._age = this._particleManager.getCurrentTime() - this._dob;

        if (this._age > this._lifeTime) {
          this._age = 0;
          this._dob = this._particleManager.getCurrentTime();
        }
      } else {
        this._age = this._particleManager.getCurrentTime() - this._dob;
      }

      _get(_getPrototypeOf(Particle.prototype), "update", this).call(this); // Particle.$superp.Update.call(this);


      if (this._age > this._lifeTime || this._dead == 2) {
        // if dead=2 then that means its reached the end of the line (in kill mode) for line traversal effects
        this._dead = 1;

        if (this._children.length === 0) {
          this._particleManager.releaseParticle(this); // TODO


          if (this._emitter.isGroupParticles()) this._emitter.getParentEffect().removeInUse(this._layer, this); // TODO

          this.reset();
          return false; // RemoveChild
        } else {
          this._emitter.controlParticle(this);

          this.killChildren();
        }

        return true;
      }

      this._emitter.controlParticle(this);

      return true;
    }
  }, {
    key: "destroy",
    value: function destroy(releaseChildren) {
      this._particleManager.releaseParticle(this); // TODO


      _get(_getPrototypeOf(Particle.prototype), "destroy", this).call(this); // Particle.$superp.Destroy();


      this.reset();
    }
  }, {
    key: "setX",
    value: function setX(x) {
      this._oldX = this._age > 0 ? this._x : x;
      this._x = x;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this._oldY = this._age > 0 ? this._y : y;
      this._y = y;
    }
  }, {
    key: "setZ",
    value: function setZ(z) {
      this._oldZ = this._age > 0 ? this._z : z;
      this._z = z;
    }
  }, {
    key: "setGroupParticles",
    value: function setGroupParticles(value) {
      this._groupParticles = value;
    }
  }, {
    key: "isGroupParticles",
    value: function isGroupParticles() {
      return this._groupParticles;
    }
  }, {
    key: "setLayer",
    value: function setLayer(layer) {
      this._layer = layer;
    }
  }, {
    key: "getLayer",
    value: function getLayer() {
      return this._layer;
    }
  }, {
    key: "setEmitter",
    value: function setEmitter(e) {
      this._emitter = e;
    }
  }, {
    key: "getEmitter",
    value: function getEmitter() {
      return this._emitter;
    }
  }, {
    key: "getEffectLayer",
    value: function getEffectLayer() {
      return this._effectLayer;
    }
  }, {
    key: "setParticleManager",
    value: function setParticleManager(pm) {
      this._particleManager = pm;
    }
  }, {
    key: "setEffectLayer",
    value: function setEffectLayer(layer) {
      this._effectLayer = layer;
    }
  }, {
    key: "setVelVariation",
    value: function setVelVariation(velVariation) {
      this._velVariation = velVariation;
    }
  }, {
    key: "getVelVariation",
    value: function getVelVariation() {
      return this._velVariation;
    }
  }, {
    key: "setGSizeX",
    value: function setGSizeX(gSizeX) {
      this._gSizeX = gSizeX;
    }
  }, {
    key: "setGSizeY",
    value: function setGSizeY(gSizeY) {
      this._gSizeY = gSizeY;
    }
  }, {
    key: "getGSizeX",
    value: function getGSizeX() {
      return this._gSizeX;
    }
  }, {
    key: "getGSizeY",
    value: function getGSizeY() {
      return this._gSizeY;
    }
  }, {
    key: "setScaleVariationX",
    value: function setScaleVariationX(scaleVarX) {
      this._scaleVariationX = scaleVarX;
    }
  }, {
    key: "getScaleVariationX",
    value: function getScaleVariationX() {
      return this._scaleVariationX;
    }
  }, {
    key: "setScaleVariationY",
    value: function setScaleVariationY(scaleVarY) {
      this._scaleVariationY = scaleVarY;
    }
  }, {
    key: "getScaleVariationY",
    value: function getScaleVariationY() {
      return this._scaleVariationY;
    }
  }, {
    key: "setEmissionAngle",
    value: function setEmissionAngle(emissionAngle) {
      this._emissionAngle = emissionAngle;
    }
  }, {
    key: "getEmissionAngle",
    value: function getEmissionAngle() {
      return this._emissionAngle;
    }
  }, {
    key: "setDirectionVairation",
    value: function setDirectionVairation(dirVar) {
      this._directionVariation = dirVar;
    }
  }, {
    key: "getDirectionVariation",
    value: function getDirectionVariation() {
      return this._directionVariation;
    }
  }, {
    key: "setSpinVariation",
    value: function setSpinVariation(spinVar) {
      this._spinVariation = spinVar;
    }
  }, {
    key: "getSpinVariation",
    value: function getSpinVariation() {
      return this._spinVariation;
    }
  }, {
    key: "setWeightVariation",
    value: function setWeightVariation(weightVar) {
      this._weightVariation = weightVar;
    }
  }, {
    key: "getWeightVariation",
    value: function getWeightVariation() {
      return this._weightVariation;
    }
  }]);

  return Particle;
}(_Entity3.default);

exports.default = Particle;