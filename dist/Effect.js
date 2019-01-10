"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndLetFree = exports.EndLoopAround = exports.EndKill = exports.EmInAndOut = exports.EmSpecified = exports.EmOutwards = exports.EmInwards = exports.TypeEllipse = exports.TypeLine = exports.TypeArea = exports.TypePoint = undefined;

var _Utils = require("./Utils");

var _Entity2 = require("./Entity");

var _Entity3 = _interopRequireDefault(_Entity2);

var _Emitter = require("./Emitter");

var _Emitter2 = _interopRequireDefault(_Emitter);

var _EmitterArray = require("./EmitterArray");

var _EmitterArray2 = _interopRequireDefault(_EmitterArray);

var _EffectsLibrary = require("./EffectsLibrary");

var _EffectsLibrary2 = _interopRequireDefault(_EffectsLibrary);

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

var TypePoint = exports.TypePoint = 0;
var TypeArea = exports.TypeArea = 1;
var TypeLine = exports.TypeLine = 2;
var TypeEllipse = exports.TypeEllipse = 3;
var EmInwards = exports.EmInwards = 0;
var EmOutwards = exports.EmOutwards = 1;
var EmSpecified = exports.EmSpecified = 2;
var EmInAndOut = exports.EmInAndOut = 3;
var EndKill = exports.EndKill = 0;
var EndLoopAround = exports.EndLoopAround = 1;
var EndLetFree = exports.EndLetFree = 2;
var g_defaultEffect = {
  _class: TypePoint,
  _currentEffectFrame: 0,
  _handleCenter: false,
  _source: null,
  _lockAspect: true,
  _particlesCreated: false,
  _suspendTime: 0,
  _gx: 0,
  _gy: 0,
  _mgx: 0,
  _mgy: 0,
  _emitAtPoints: false,
  _emissionType: EmInwards,
  _effectLength: 0,
  _parentEmitter: null,
  _spawnAge: 0,
  _index: 0,
  _particleCount: 0,
  _idleTime: 0,
  _traverseEdge: false,
  _endBehavior: EndKill,
  _distanceSetByLife: false,
  _reverseSpawn: false,
  _spawnDirection: 1,
  _dying: false,
  _allowSpawning: true,
  _ellipseArc: 360.0,
  _ellipseOffset: 0,
  _effectLayer: 0,
  _doesNotTimeout: false,
  _particleManager: null,
  _frames: 32,
  _animWidth: 128,
  _animHeight: 128,
  _looped: false,
  _animX: 0,
  _animY: 0,
  _seed: 0,
  _zoom: 1.0,
  _frameOffset: 0,
  _currentLife: 0,
  _currentAmount: 0,
  _currentSizeX: 0,
  _currentSizeY: 0,
  _currentVelocity: 0,
  _currentSpin: 0,
  _currentWeight: 0,
  _currentWidth: 0,
  _currentHeight: 0,
  _currentAlpha: 0,
  _currentEmissionAngle: 0,
  _currentEmissionRange: 0,
  _currentStretch: 0,
  _currentGlobalZ: 0,
  _overrideSize: false,
  _overrideEmissionAngle: false,
  _overrideEmissionRange: false,
  _overrideAngle: false,
  _overrideLife: false,
  _overrideAmount: false,
  _overrideVelocity: false,
  _overrideSpin: false,
  _overrideSizeX: false,
  _overrideSizeY: false,
  _overrideWeight: false,
  _overrideAlpha: false,
  _overrideStretch: false,
  _overrideGlobalZ: false,
  _bypassWeight: false,
  _isCompiled: false
};

var Effect =
/*#__PURE__*/
function (_Entity) {
  _inherits(Effect, _Entity);

  function Effect(other, particleManager) {
    var _this2;

    _classCallCheck(this, Effect);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Effect).call(this, other));

    if (other === undefined) {
      for (var key in g_defaultEffect) {
        _this2[key] = g_defaultEffect[key];
      }

      _this2._arrayOwner = true;
      _this2._inUse = [];

      for (var i = 0; i < 10; i++) {
        _this2._inUse[i] = [];
      }

      _this2._cAmount = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this2._cLife = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this2._cSizeX = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this2._cSizeY = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this2._cVelocity = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this2._cWeight = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this2._cSpin = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this2._cStretch = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this2._cGlobalZ = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this2._cAlpha = new _EmitterArray2.default(0, 1.0);
      _this2._cEmissionAngle = new _EmitterArray2.default(_EffectsLibrary2.default.angleMin, _EffectsLibrary2.default.angleMax);
      _this2._cEmissionRange = new _EmitterArray2.default(_EffectsLibrary2.default.emissionRangeMin, _EffectsLibrary2.default.emissionRangeMax);
      _this2._cWidth = new _EmitterArray2.default(_EffectsLibrary2.default.dimensionsMin, _EffectsLibrary2.default.dimensionsMax);
      _this2._cHeight = new _EmitterArray2.default(_EffectsLibrary2.default.dimensionsMin, _EffectsLibrary2.default.dimensionsMax);
      _this2._cEffectAngle = new _EmitterArray2.default(_EffectsLibrary2.default.angleMin, _EffectsLibrary2.default.angleMax);
    } else {
      for (var _key in g_defaultEffect) {
        _this2[_key] = other[_key];
      }

      _this2._particleManager = particleManager;
      _this2._arrayOwner = false;
      _this2._inUse = [];

      for (var _i = 0; _i < 10; _i++) {
        _this2._inUse[_i] = [];
      }

      _this2._cAmount = other._cAmount;
      _this2._cLife = other._cLife;
      _this2._cSizeX = other._cSizeX;
      _this2._cSizeY = other._cSizeY;
      _this2._cVelocity = other._cVelocity;
      _this2._cWeight = other._cWeight;
      _this2._cSpin = other._cSpin;
      _this2._cAlpha = other._cAlpha;
      _this2._cEmissionAngle = other._cEmissionAngle;
      _this2._cEmissionRange = other._cEmissionRange;
      _this2._cWidth = other._cWidth;
      _this2._cHeight = other._cHeight;
      _this2._cEffectAngle = other._cEffectAngle;
      _this2._cStretch = other._cStretch;
      _this2._cGlobalZ = other._cGlobalZ;

      _this2.setEllipseArc(other._ellipseArc);

      _this2._dob = particleManager.getCurrentTime();

      _this2.setOKtoRender(false);

      for (var _i2 = 0; _i2 < other._children.length; _i2++) {
        var _e = new _Emitter2.default(other._children[_i2], particleManager);

        _e.setParentEffect(_assertThisInitialized(_assertThisInitialized(_this2)));

        _e.setParent(_assertThisInitialized(_assertThisInitialized(_this2)));
      }
    }

    return _this2;
  }

  _createClass(Effect, [{
    key: "hideAll",
    value: function hideAll() {
      for (var i = 0; i < this._children.length; i++) {
        this._children[i].hideAll();
      }
    }
  }, {
    key: "getEffectLayer",
    value: function getEffectLayer() {
      return this._effectLayer;
    }
  }, {
    key: "setEffectLayer",
    value: function setEffectLayer(layer) {
      this._effectLayer = layer;
    }
  }, {
    key: "showOne",
    value: function showOne(e) {
      for (var i = 0; i < this._children.length; i++) {
        this._children[i].setVisible(false);
      }

      e.setVisible(true);
    }
  }, {
    key: "emitterCount",
    value: function emitterCount() {
      return this._children.length;
    }
  }, {
    key: "setParticleManager",
    value: function setParticleManager(particleManager) {
      this._particleManager = particleManager;
    }
  }, {
    key: "update",
    value: function update() {
      this.capture();
      this._age = this._particleManager.getCurrentTime() - this._dob;
      if (this._spawnAge < this._age) this._spawnAge = this._age;

      if (this._effectLength > 0 && this._age > this._effectLength) {
        this._dob = this._particleManager.getCurrentTime();
        this._age = 0;
      }

      this._currentEffectFrame = this._age / _EffectsLibrary2.default.getLookupFrequency();

      if (!this._overrideSize) {
        switch (this._class) {
          case TypePoint:
            this._currentWidth = 0;
            this._currentHeight = 0;
            break;

          case TypeArea:
          case TypeEllipse:
            this._currentWidth = this.getWidth(this._currentEffectFrame);
            this._currentHeight = this.getHeight(this._currentEffectFrame);
            break;

          case TypeLine:
            this._currentWidth = this.getWidth(this._currentEffectFrame);
            this._currentHeight = 0;
            break;
        }
      } // can be optimized


      if (this._handleCenter && this._class !== TypePoint) {
        this._handleX = this._currentWidth * 0.5;
        this._handleY = this._currentHeight * 0.5;
      } else {
        this._handleX = 0;
        this._handleY = 0;
      }

      if (this.hasParticles() || this._doesNotTimeout) {
        this._idleTime = 0;
      } else {
        ++this._idleTime;
      }

      if (this._parentEmitter) {
        var parentEffect = this._parentEmitter.getParentEffect();

        if (!this._overrideLife) this._currentLife = this.getLife(this._currentEffectFrame) * parentEffect._currentLife;
        if (!this._overrideAmount) this._currentAmount = this.getAmount(this._currentEffectFrame) * parentEffect._currentAmount;

        if (this._lockAspect) {
          if (!this._overrideSizeX) this._currentSizeX = this.getSizeX(this._currentEffectFrame) * parentEffect._currentSizeX;
          if (!this._overrideSizeY) this._currentSizeY = this._currentSizeX * parentEffect._currentSizeY;
        } else {
          if (!this._overrideSizeX) this._currentSizeX = this.getSizeX(this._currentEffectFrame) * parentEffect._currentSizeX;
          if (!this._overrideSizeY) this._currentSizeY = this.getSizeY(this._currentEffectFrame) * parentEffect._currentSizeY;
        }

        if (!this._overrideVelocity) this._currentVelocity = this.getVelocity(this._currentEffectFrame) * parentEffect._currentVelocity;
        if (!this._overrideWeight) this._currentWeight = this.getWeight(this._currentEffectFrame) * parentEffect._currentWeight;
        if (!this._overrideSpin) this._currentSpin = this.getSpin(this._currentEffectFrame) * parentEffect._currentSpin;
        if (!this._overrideAlpha) this._currentAlpha = this.getAlpha(this._currentEffectFrame) * parentEffect._currentAlpha;
        if (!this._overrideEmissionAngle) this._currentEmissionAngle = this.getEmissionAngle(this._currentEffectFrame);
        if (!this._overrideEmissionRange) this._currentEmissionRange = this.getEmissionRange(this._currentEffectFrame);
        if (!this._overrideAngle) this._angle = this.getEffectAngle(this._currentEffectFrame);
        if (!this._overrideStretch) this._currentStretch = this.getStretch(this._currentEffectFrame) * parentEffect._currentStretch;
        if (!this._overrideGlobalZ) this._currentGlobalZ = this.getGlobalZ(this._currentEffectFrame) * parentEffect._currentGlobalZ;
      } else {
        if (!this._overrideLife) this._currentLife = this.getLife(this._currentEffectFrame);
        if (!this._overrideAmount) this._currentAmount = this.getAmount(this._currentEffectFrame);

        if (this._lockAspect) {
          if (!this._overrideSizeX) this._currentSizeX = this.getSizeX(this._currentEffectFrame);
          if (!this._overrideSizeY) this._currentSizeY = this._currentSizeX;
        } else {
          if (!this._overrideSizeX) this._currentSizeX = this.getSizeX(this._currentEffectFrame);
          if (!this._overrideSizeY) this._currentSizeY = this.getSizeY(this._currentEffectFrame);
        }

        if (!this._overrideVelocity) this._currentVelocity = this.getVelocity(this._currentEffectFrame);
        if (!this._overrideWeight) this._currentWeight = this.getWeight(this._currentEffectFrame);
        if (!this._overrideSpin) this._currentSpin = this.getSpin(this._currentEffectFrame);
        if (!this._overrideAlpha) this._currentAlpha = this.getAlpha(this._currentEffectFrame);
        if (!this._overrideEmissionAngle) this._currentEmissionAngle = this.getEmissionAngle(this._currentEffectFrame);
        if (!this._overrideEmissionRange) this._currentEmissionRange = this.getEmissionRange(this._currentEffectFrame);
        if (!this._overrideAngle) this._angle = this.getEffectAngle(this._currentEffectFrame);
        if (!this._overrideStretch) this._currentStretch = this.getStretch(this._currentEffectFrame);
        if (!this._overrideGlobalZ) this._currentGlobalZ = this.getGlobalZ(this._currentEffectFrame);
      }

      if (!this._overrideGlobalZ) this._z = this._currentGlobalZ;
      if (this._currentWeight === 0) this._bypassWeight = true;
      if (this._parentEmitter) this._dying = this._parentEmitter.isDying();

      _get(_getPrototypeOf(Effect.prototype), "update", this).call(this); //Effect.$superp.Update.call(this);


      if (this._idleTime > this._particleManager.getIdleTimeLimit()) this._dead = 1;

      if (this._dead) {
        if (this.getChildCount() === 0) {
          this.destroy();
          return false;
        } else {
          this.killChildren();
        }
      }

      return true;
    }
  }, {
    key: "hasParticles",
    value: function hasParticles() {
      for (var i = 0; i < this._children.length; i++) {
        if (this._children[i].getChildCount() > 0) return true;
      }

      return false;
    }
  }, {
    key: "getParticleManager",
    value: function getParticleManager() {
      return this._particleManager;
    }
  }, {
    key: "getParticles",
    value: function getParticles(layer) {
      return this._inUse[layer];
    }
  }, {
    key: "isDying",
    value: function isDying() {
      return this._dying;
    }
  }, {
    key: "softKill",
    value: function softKill() {
      this._dying = true;
    }
  }, {
    key: "hardKill",
    value: function hardKill() {
      this._particleManager.removeEffect(this);

      this.destroy();
    }
  }, {
    key: "destroy",
    value: function destroy(releaseChildren) {
      this._parentEmitter = null;
      this._directoryEffects = [];
      this._directoryEmitters = [];

      for (var i = 0; i < this._inUse.length; i++) {
        while (this._inUse[i].length !== 0) {
          var p = this._inUse[i].pop();

          p.reset();

          this._particleManager.releaseParticle(p);

          this.removeInUse(i, p);
        }

        this._inUse[i] = [];
      }

      _get(_getPrototypeOf(Effect.prototype), "destroy", this).call(this, releaseChildren); //Effect.$superp.Destroy.call(this, releaseChildren);

    }
  }, {
    key: "setEndBehavior",
    value: function setEndBehavior(behavior) {
      this._endBehavior = behavior;
    }
  }, {
    key: "setDistanceSetByLife",
    value: function setDistanceSetByLife(value) {
      this._distanceSetByLife = value;
    }
  }, {
    key: "setHandleCenter",
    value: function setHandleCenter(center) {
      this._handleCenter = center;
    }
  }, {
    key: "setReverseSpawn",
    value: function setReverseSpawn(reverse) {
      this._reverseSpawn = reverse;
    }
  }, {
    key: "setSpawnDirection",
    value: function setSpawnDirection() {
      if (this._reverseSpawn) this._spawnDirection = -1;else this._spawnDirection = 1;
    }
  }, {
    key: "setAreaSize",
    value: function setAreaSize(width, height) {
      this._overrideSize = true;
      this._currentWidth = width;
      this._currentHeight = height;
    }
  }, {
    key: "setLineLength",
    value: function setLineLength(length) {
      this._overrideSize = true;
      this._currentWidth = length;
    }
  }, {
    key: "setEmissionAngle",
    value: function setEmissionAngle(angle) {
      this._overrideEmissionAngle = true;
      this._currentEmissionAngle = angle;
    }
  }, {
    key: "setEffectAngle",
    value: function setEffectAngle(angle) {
      this._overrideAngle = true;
      this._angle = angle;
    }
  }, {
    key: "setLife",
    value: function setLife(life) {
      this._overrideLife = true;
      this._currentLife = life;
    }
  }, {
    key: "setAmount",
    value: function setAmount(amount) {
      this._overrideAmount = true;
      this._currentAmount = amount;
    }
  }, {
    key: "setVelocity",
    value: function setVelocity(velocity) {
      this._overrideVelocity = true;
      this._currentVelocity = velocity;
    }
  }, {
    key: "setSpin",
    value: function setSpin(spin) {
      this._overrideSpin = true;
      this._currentSpin = spin;
    }
  }, {
    key: "setWeight",
    value: function setWeight(weight) {
      this._overrideWeight = true;
      this._currentWeight = weight;
    }
  }, {
    key: "setEffectParticleSize",
    value: function setEffectParticleSize(sizeX, sizeY) {
      this._overrideSizeX = true;
      this._overrideSizeY = true;
      this._currentSizeX = sizeX;
      this._currentSizeY = sizeY;
    }
  }, {
    key: "setSizeX",
    value: function setSizeX(sizeX) {
      this._overrideSizeX = true;
      this._currentSizeX = sizeX;
    }
  }, {
    key: "setSizeY",
    value: function setSizeY(sizeY) {
      this._overrideSizeY = true;
      this._currentSizeY = sizeY;
    }
  }, {
    key: "setEffectAlpha",
    value: function setEffectAlpha(alpha) {
      this._overrideAlpha = true;
      this._currentAlpha = alpha;
    }
  }, {
    key: "setEffectEmissionRange",
    value: function setEffectEmissionRange(emissionRange) {
      this._overrideEmissionRange = true;
      this._currentEmissionRange = emissionRange;
    }
  }, {
    key: "setEllipseArc",
    value: function setEllipseArc(degrees) {
      this._ellipseArc = degrees;
      this._ellipseOffset = 90 - degrees / 2;
    }
  }, {
    key: "setZ",
    value: function setZ(z) {
      this._overrideGlobalZ = true;
      this._z = z;
    }
  }, {
    key: "setStretch",
    value: function setStretch(stretch) {
      this._overrideStretch = true;
      this._currentStretch = stretch;
    }
  }, {
    key: "setGroupParticles",
    value: function setGroupParticles(v) {
      for (var i = 0; i < this._children.length; i++) {
        var _e2 = this._children[i];

        _e2.setGroupParticles(v);

        var effects = _e2.getEffects();

        for (var j = 0; j < effects.length; j++) {
          effects[j].setGroupParticles(v);
        }
      }
    }
  }, {
    key: "addInUse",
    value: function addInUse(layer, p) {
      // the particle is managed by this Effect
      this.setGroupParticles(true);

      this._inUse[layer].push(p);
    }
  }, {
    key: "removeInUse",
    value: function removeInUse(layer, p) {
      (0, _Utils.removeFromList)(this._inUse[layer], p);
    }
  }, {
    key: "compileAll",
    value: function compileAll() {
      if (this._isCompiled) return;
      this.compileLife();
      this.compileAmount();
      this.compileSizeX();
      this.compileSizeY();
      this.compileVelocity();
      this.compileWeight();
      this.compileSpin();
      this.compileAlpha();
      this.compileEmissionAngle();
      this.compileEmissionRange();
      this.compileWidth();
      this.compileHeight();
      this.compileAngle();
      this.compileStretch();
      this.compileGlobalZ();

      for (var i = 0; i < this._children.length; i++) {
        this._children[i].compileAll();
      }

      this._isCompiled = true;
    }
  }, {
    key: "compileQuick",
    value: function compileQuick() {
      for (var i = 0; i < this._children.length; i++) {
        e = this._children[i];
        e.compileQuick();
        e.resetBypassers();
      }
    }
  }, {
    key: "compileAmount",
    value: function compileAmount() {
      this._cAmount.compile();
    }
  }, {
    key: "compileLife",
    value: function compileLife() {
      this._cLife.compile();
    }
  }, {
    key: "compileSizeX",
    value: function compileSizeX() {
      this._cSizeX.compile();
    }
  }, {
    key: "compileSizeY",
    value: function compileSizeY() {
      this._cSizeY.compile();
    }
  }, {
    key: "compileVelocity",
    value: function compileVelocity() {
      this._cVelocity.compile();
    }
  }, {
    key: "compileWeight",
    value: function compileWeight() {
      this._cWeight.compile();
    }
  }, {
    key: "compileSpin",
    value: function compileSpin() {
      this._cSpin.compile();
    }
  }, {
    key: "compileAlpha",
    value: function compileAlpha() {
      this._cAlpha.compile();
    }
  }, {
    key: "compileEmissionAngle",
    value: function compileEmissionAngle() {
      this._cEmissionAngle.compile();
    }
  }, {
    key: "compileEmissionRange",
    value: function compileEmissionRange() {
      this._cEmissionRange.compile();
    }
  }, {
    key: "compileWidth",
    value: function compileWidth() {
      this._cWidth.compile();
    }
  }, {
    key: "compileHeight",
    value: function compileHeight() {
      this._cHeight.compile();
    }
  }, {
    key: "compileAngle",
    value: function compileAngle() {
      this._cEffectAngle.compile();
    }
  }, {
    key: "compileStretch",
    value: function compileStretch() {
      this._cStretch.compile();
    }
  }, {
    key: "compileGlobalZ",
    value: function compileGlobalZ() {
      this._cGlobalZ.compile();

      this._cGlobalZ.setCompiled(0, 1.0);
    }
  }, {
    key: "getLife",
    value: function getLife(frame) {
      return this._cLife.get(frame);
    }
  }, {
    key: "getAmount",
    value: function getAmount(frame) {
      return this._cAmount.get(frame);
    }
  }, {
    key: "getSizeX",
    value: function getSizeX(frame) {
      return this._cSizeX.get(frame);
    }
  }, {
    key: "getSizeY",
    value: function getSizeY(frame) {
      return this._cSizeY.get(frame);
    }
  }, {
    key: "getVelocity",
    value: function getVelocity(frame) {
      return this._cVelocity.get(frame);
    }
  }, {
    key: "getWeight",
    value: function getWeight(frame) {
      return this._cWeight.get(frame);
    }
  }, {
    key: "getSpin",
    value: function getSpin(frame) {
      return this._cSpin.get(frame);
    }
  }, {
    key: "getAlpha",
    value: function getAlpha(frame) {
      return this._cAlpha.get(frame);
    }
  }, {
    key: "getEmissionAngle",
    value: function getEmissionAngle(frame) {
      return this._cEmissionAngle.get(frame);
    }
  }, {
    key: "getEmissionRange",
    value: function getEmissionRange(frame) {
      return this._cEmissionRange.get(frame);
    }
  }, {
    key: "getWidth",
    value: function getWidth(frame) {
      return this._cWidth.get(frame);
    }
  }, {
    key: "getHeight",
    value: function getHeight(frame) {
      return this._cHeight.get(frame);
    }
  }, {
    key: "getEffectAngle",
    value: function getEffectAngle(frame) {
      return this._cEffectAngle.get(frame);
    }
  }, {
    key: "getStretch",
    value: function getStretch(frame) {
      return this._cStretch.get(frame);
    }
  }, {
    key: "getGlobalZ",
    value: function getGlobalZ(frame) {
      return this._cGlobalZ.get(frame);
    }
  }, {
    key: "loadFromXML",
    value: function loadFromXML(xml) {
      var x = new _Utils.XMLHelper(xml);
      this._class = x.getAttrAsInt("TYPE");
      this._emitAtPoints = x.getAttrAsBool("EMITATPOINTS");
      this._mgx = x.getAttrAsInt("MAXGX");
      this._mgy = x.getAttrAsInt("MAXGY");
      this._emissionType = x.getAttrAsInt("EMISSION_TYPE");
      this._effectLength = x.getAttrAsInt("EFFECT_LENGTH");
      this._ellipseArc = x.getAttrAsFloat("ELLIPSE_ARC");
      this._handleX = x.getAttrAsInt("HANDLE_X");
      this._handleY = x.getAttrAsInt("HANDLE_Y");
      this._lockAspect = x.getAttrAsBool("UNIFORM");
      this._handleCenter = x.getAttrAsBool("HANDLE_CENTER");
      this._traverseEdge = x.getAttrAsBool("TRAVERSE_EDGE");
      this._name = x.getAttr("NAME");
      this._endBehavior = x.getAttrAsInt("END_BEHAVIOUR");
      this._distanceSetByLife = x.getAttrAsBool("DISTANCE_SET_BY_LIFE");
      this._reverseSpawn = x.getAttrAsBool("REVERSE_SPAWN_DIRECTION"); // Build path

      this._path = this._name;
      var p = xml.parentNode;

      while (p) {
        var parentName = (0, _Utils.getXMLAttrSafe)(p, "NAME");
        if (parentName !== "") this._path = parentName + "/" + this._path;
        p = p.parentNode;
      }

      var animProps = xml.getElementsByTagName("ANIMATION_PROPERTIES")[0];

      if (animProps) {
        var a = new _Utils.XMLHelper(animProps);
        this._frames = a.getAttrAsInt("FRAMES");
        this._animWidth = a.getAttrAsInt("WIDTH");
        this._animHeight = a.getAttrAsInt("HEIGHT");
        this._animX = a.getAttrAsInt("X");
        this._animY = a.getAttrAsInt("Y");
        this._seed = a.getAttrAsInt("SEED");
        this._looped = a.getAttrAsBool("LOOPED");
        this._zoom = a.getAttrAsFloat("ZOOM");
        this._frameOffset = a.getAttrAsInt("FRAME_OFFSET");
      } // todo: pass in EmitterArray instend of bound function (and remove boilerplate functions)


      this.readAttribute(xml, this._cAmount, "AMOUNT");
      this.readAttribute(xml, this._cLife, "LIFE");
      this.readAttribute(xml, this._cSizeX, "SIZEX");
      this.readAttribute(xml, this._cSizeY, "SIZEY");
      this.readAttribute(xml, this._cVelocity, "VELOCITY");
      this.readAttribute(xml, this._cWeight, "WEIGHT");
      this.readAttribute(xml, this._cSpin, "SPIN");
      this.readAttribute(xml, this._cAlpha, "ALPHA");
      this.readAttribute(xml, this._cEmissionAngle, "EMISSIONANGLE");
      this.readAttribute(xml, this._cEmissionRange, "EMISSIONRANGE");
      this.readAttribute(xml, this._cWidth, "AREA_WIDTH");
      this.readAttribute(xml, this._cHeight, "AREA_HEIGHT");
      this.readAttribute(xml, this._cEffectAngle, "ANGLE");

      if (!this.readAttribute(xml, this._cStretch, "STRETCH")) {
        this.addStretch(0, 1.0);
      }

      this.readAttribute(xml, this._cGlobalZ, "GLOBAL_ZOOM");

      var _this = this;

      (0, _Utils.forEachXMLChild)(xml, "PARTICLE", function (n) {
        var emit = new _Emitter2.default();
        emit.loadFromXML(n, _this);

        _this.addChild(emit);
      });
    }
  }, {
    key: "readAttribute",
    value: function readAttribute(xml, emitArray, tag) {
      var result = false;
      (0, _Utils.forEachXMLChild)(xml, tag, function (n) {
        var attr = emitArray.add(parseFloat((0, _Utils.getNodeAttrValue)(n, "FRAME")), parseFloat((0, _Utils.getNodeAttrValue)(n, "VALUE")));
        attr.loadFromXML(n.getElementsByTagName("CURVE")[0]);
        result = true;
      });
      return result;
    }
  }, {
    key: "addStretch",
    value: function addStretch(f, v) {
      return this._cStretch.add(f, v);
    }
  }, {
    key: "getPath",
    value: function getPath() {
      return this._path;
    }
  }, {
    key: "getLifeMaxValue",
    value: function getLifeMaxValue() {
      return this._cLife.getMaxValue();
    }
  }, {
    key: "getCurrentAmount",
    value: function getCurrentAmount() {
      return this._currentAmount;
    }
  }, {
    key: "getCurrentLife",
    value: function getCurrentLife() {
      return this._currentLife;
    }
  }, {
    key: "getCurrentEmissionAngle",
    value: function getCurrentEmissionAngle() {
      return this._currentEmissionAngle;
    }
  }, {
    key: "getCurrentEmissionRange",
    value: function getCurrentEmissionRange() {
      return this._currentEmissionRange;
    }
  }, {
    key: "getClass",
    value: function getClass() {
      return this._class;
    }
  }, {
    key: "setCurrentEffectFrame",
    value: function setCurrentEffectFrame(frame) {
      this._currentEffectFrame = frame;
    }
  }, {
    key: "getCurrentEffectFrame",
    value: function getCurrentEffectFrame() {
      return this._currentEffectFrame;
    }
  }, {
    key: "getTraverseEdge",
    value: function getTraverseEdge() {
      return this._traverseEdge;
    }
  }, {
    key: "getCurrentVelocity",
    value: function getCurrentVelocity() {
      return this._currentVelocity;
    }
  }, {
    key: "getCurrentSizeX",
    value: function getCurrentSizeX() {
      return this._currentSizeX;
    }
  }, {
    key: "getCurrentSizeY",
    value: function getCurrentSizeY() {
      return this._currentSizeY;
    }
  }, {
    key: "getCurrentStretch",
    value: function getCurrentStretch() {
      return this._currentStretch;
    }
  }, {
    key: "getCurrentWeight",
    value: function getCurrentWeight() {
      return this._currentWeight;
    }
  }, {
    key: "isBypassWeight",
    value: function isBypassWeight() {
      return this._bypassWeight;
    }
  }, {
    key: "getCurrentAlpha",
    value: function getCurrentAlpha() {
      return this._currentAlpha;
    }
  }, {
    key: "setParticlesCreated",
    value: function setParticlesCreated(value) {
      this._particlesCreated = value;
    }
  }, {
    key: "getCurrentSpin",
    value: function getCurrentSpin() {
      return this._currentSpin;
    }
  }, {
    key: "getLifeLastFrame",
    value: function getLifeLastFrame() {
      return this._cLife.getLastFrame();
    }
  }, {
    key: "setEffectLength",
    value: function setEffectLength(length) {
      this._effectLength = length;
    }
  }, {
    key: "setParentEmitter",
    value: function setParentEmitter(emitter) {
      this._parentEmitter = emitter;
    }
  }, {
    key: "getHandleCenter",
    value: function getHandleCenter() {
      return this._handleCenter;
    }
  }, {
    key: "getEmitAtPoints",
    value: function getEmitAtPoints() {
      return this._emitAtPoints;
    }
  }, {
    key: "getCurrentWidth",
    value: function getCurrentWidth() {
      return this._currentWidth;
    }
  }, {
    key: "getCurrentHeight",
    value: function getCurrentHeight() {
      return this._currentHeight;
    }
  }, {
    key: "getEllipseArc",
    value: function getEllipseArc() {
      return this._ellipseArc;
    }
  }, {
    key: "getEllipseOffset",
    value: function getEllipseOffset() {
      return this._ellipseOffset;
    }
  }, {
    key: "getEmissionType",
    value: function getEmissionType() {
      return this._emissionType;
    }
  }, {
    key: "getParentEmitter",
    value: function getParentEmitter() {
      return this._parentEmitter;
    }
  }, {
    key: "getMGX",
    value: function getMGX() {
      return this._mgx;
    }
  }, {
    key: "getMGY",
    value: function getMGY() {
      return this._mgy;
    }
  }, {
    key: "getImages",
    value: function getImages(images) {
      for (var i = 0; i < this._children.length; i++) {
        this._children[i].getImages(images);
      }
    }
  }]);

  return Effect;
}(_Entity3.default);

exports.default = Effect;