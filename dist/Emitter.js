"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Utils = require("./Utils");

var _Effect = require("./Effect");

var _Effect2 = _interopRequireDefault(_Effect);

var _EffectsLibrary = require("./EffectsLibrary");

var _EffectsLibrary2 = _interopRequireDefault(_EffectsLibrary);

var _Entity2 = require("./Entity");

var _Entity3 = _interopRequireDefault(_Entity2);

var _Matrix = require("./Matrix2");

var _Matrix2 = _interopRequireDefault(_Matrix);

var _EmitterArray = require("./EmitterArray");

var _EmitterArray2 = _interopRequireDefault(_EmitterArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AngAlign = 0;
var AngRandom = 1;
var AngSpecify = 2;
var g_defaultEmitter = {
  _currentLife: 0,
  _uniform: true,
  _parentEffect: null,
  _image: null,
  _handleCenter: false,
  _angleOffset: 0,
  _lockedAngle: false,
  _gx: 0,
  _gy: 0,
  _counter: 0,
  _oldCounter: 0,
  _angleType: AngAlign,
  _angleRelative: false,
  _useEffectEmission: false,
  _deleted: false,
  _visible: true,
  _singleParticle: false,
  _startedSpawning: false,
  _spawned: 0,
  _randomColor: false,
  _zLayer: 0,
  _animate: false,
  _randomStartFrame: false,
  _animationDirection: 1,
  _colorRepeat: 0,
  _alphaRepeat: 0,
  _dirAlternater: false,
  _oneShot: false,
  _particlesRelative: false,
  _tweenSpawns: false,
  _once: false,
  _dying: false,
  _groupParticles: false,
  _bypassWeight: false,
  _bypassSpeed: false,
  _bypassSpin: false,
  _bypassDirectionvariation: false,
  _bypassColor: false,
  _bRed: false,
  _bGreen: false,
  _bBlue: false,
  _bypassScaleX: false,
  _bypassScaleY: false,
  _bypassLifeVariation: false,
  _bypassFramerate: false,
  _bypassStretch: false,
  _bypassSplatter: false,
  _AABB_ParticleMaxWidth: 0,
  _AABB_ParticleMaxHeight: 0,
  _AABB_ParticleMinWidth: 0,
  _AABB_ParticleMinHeight: 0,
  _currentLifeVariation: 0,
  _currentWeight: 0,
  _currentWeightVariation: 0,
  _currentSpeed: 0,
  _currentSpeedVariation: 0,
  _currentSpin: 0,
  _currentSpinVariation: 0,
  _currentDirectionVariation: 0,
  _currentEmissionAngle: 0,
  _currentEmissionRange: 0,
  _currentSizeX: 0,
  _currentSizeY: 0,
  _currentSizeXVariation: 0,
  _currentSizeYVariation: 0,
  _currentFramerate: 0
};

var Emitter =
/*#__PURE__*/
function (_Entity) {
  _inherits(Emitter, _Entity);

  function Emitter(other, pm) {
    var _this;

    _classCallCheck(this, Emitter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Emitter).call(this, other));
    _this._effects = [];
    _this._childrenOwner = false; // the Particles are managing by pool

    _this._matrix = new _Matrix2.default();

    if (other) {
      for (var key in g_defaultEmitter) {
        _this[key] = other[key];
      }

      _this._dob = pm.getCurrentTime();

      _this.setOKtoRender(false);

      _this._arrayOwner = false;
      _this._children = [];

      for (var i = 0; i < other._effects.length; i++) {
        _this.addEffect(new _Effect2.default(other._effects[i], pm));
      }

      _this._cAmount = other._cAmount;
      _this._cLife = other._cLife;
      _this._cSizeX = other._cSizeX;
      _this._cSizeY = other._cSizeY;
      _this._cBaseSpeed = other._cBaseSpeed;
      _this._cBaseWeight = other._cBaseWeight;
      _this._cBaseSpin = other._cBaseSpin;
      _this._cEmissionAngle = other._cEmissionAngle;
      _this._cEmissionRange = other._cEmissionRange;
      _this._cSplatter = other._cSplatter;
      _this._cVelVariation = other._cVelVariation;
      _this._cWeightVariation = other._cWeightVariation;
      _this._cLifeVariation = other._cLifeVariation;
      _this._cAmountVariation = other._cAmountVariation;
      _this._cSizeXVariation = other._cSizeXVariation;
      _this._cSizeYVariation = other._cSizeYVariation;
      _this._cSpinVariation = other._cSpinVariation;
      _this._cDirectionVariation = other._cDirectionVariation;
      _this._cAlpha = other._cAlpha;
      _this._cR = other._cR;
      _this._cG = other._cG;
      _this._cB = other._cB;
      _this._cScaleX = other._cScaleX;
      _this._cScaleY = other._cScaleY;
      _this._cSpin = other._cSpin;
      _this._cVelocity = other._cVelocity;
      _this._cWeight = other._cWeight;
      _this._cDirection = other._cDirection;
      _this._cDirectionVariationOT = other._cDirectionVariationOT;
      _this._cFramerate = other._cFramerate;
      _this._cStretch = other._cStretch;
      _this._cGlobalVelocity = other._cGlobalVelocity;
    } else {
      for (var _key in g_defaultEmitter) {
        _this[_key] = g_defaultEmitter[_key];
      }

      _this._arrayOwner = true;
      _this._cAmount = new _EmitterArray2.default(_EffectsLibrary2.default.amountMin, _EffectsLibrary2.default.amountMax);
      _this._cLife = new _EmitterArray2.default(_EffectsLibrary2.default.lifeMin, _EffectsLibrary2.default.lifeMax);
      _this._cSizeX = new _EmitterArray2.default(_EffectsLibrary2.default.dimensionsMin, _EffectsLibrary2.default.dimensionsMax);
      _this._cSizeY = new _EmitterArray2.default(_EffectsLibrary2.default.dimensionsMin, _EffectsLibrary2.default.dimensionsMax);
      _this._cBaseSpeed = new _EmitterArray2.default(_EffectsLibrary2.default.velocityMin, _EffectsLibrary2.default.velocityMax);
      _this._cBaseWeight = new _EmitterArray2.default(_EffectsLibrary2.default.weightMin, _EffectsLibrary2.default.weightMax);
      _this._cBaseSpin = new _EmitterArray2.default(_EffectsLibrary2.default.spinMin, _EffectsLibrary2.default.spinMax);
      _this._cEmissionAngle = new _EmitterArray2.default(_EffectsLibrary2.default.angleMin, _EffectsLibrary2.default.angleMax);
      _this._cEmissionRange = new _EmitterArray2.default(_EffectsLibrary2.default.emissionRangeMin, _EffectsLibrary2.default.emissionRangeMax);
      _this._cSplatter = new _EmitterArray2.default(_EffectsLibrary2.default.dimensionsMin, _EffectsLibrary2.default.dimensionsMax);
      _this._cVelVariation = new _EmitterArray2.default(_EffectsLibrary2.default.velocityMin, _EffectsLibrary2.default.velocityMax);
      _this._cWeightVariation = new _EmitterArray2.default(_EffectsLibrary2.default.weightVariationMin, _EffectsLibrary2.default.weightVariationMax);
      _this._cLifeVariation = new _EmitterArray2.default(_EffectsLibrary2.default.lifeMin, _EffectsLibrary2.default.lifeMax);
      _this._cAmountVariation = new _EmitterArray2.default(_EffectsLibrary2.default.amountMin, _EffectsLibrary2.default.amountMax);
      _this._cSizeXVariation = new _EmitterArray2.default(_EffectsLibrary2.default.dimensionsMin, _EffectsLibrary2.default.dimensionsMax);
      _this._cSizeYVariation = new _EmitterArray2.default(_EffectsLibrary2.default.dimensionsMin, _EffectsLibrary2.default.dimensionsMax);
      _this._cSpinVariation = new _EmitterArray2.default(_EffectsLibrary2.default.spinVariationMin, _EffectsLibrary2.default.spinVariationMax);
      _this._cDirectionVariation = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this._cAlpha = new _EmitterArray2.default(0, 1.0);
      _this._cR = new _EmitterArray2.default(0, 0);
      _this._cG = new _EmitterArray2.default(0, 0);
      _this._cB = new _EmitterArray2.default(0, 0);
      _this._cScaleX = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this._cScaleY = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this._cSpin = new _EmitterArray2.default(_EffectsLibrary2.default.spinOverTimeMin, _EffectsLibrary2.default.spinOverTimeMax);
      _this._cVelocity = new _EmitterArray2.default(_EffectsLibrary2.default.velocityOverTimeMin, _EffectsLibrary2.default.velocityOverTimeMax);
      _this._cWeight = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this._cDirection = new _EmitterArray2.default(_EffectsLibrary2.default.directionOverTimeMin, _EffectsLibrary2.default.directionOverTimeMax);
      _this._cDirectionVariationOT = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this._cFramerate = new _EmitterArray2.default(_EffectsLibrary2.default.framerateMin, _EffectsLibrary2.default.framerateMax);
      _this._cStretch = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
      _this._cGlobalVelocity = new _EmitterArray2.default(_EffectsLibrary2.default.globalPercentMin, _EffectsLibrary2.default.globalPercentMax);
    }

    return _this;
  }

  _createClass(Emitter, [{
    key: "loadFromXML",
    value: function loadFromXML(xml, parent) {
      var x = new _Utils.XMLHelper(xml);
      this.setHandleX(x.getAttrAsInt("HANDLE_X"));
      this.setHandleY(x.getAttrAsInt("HANDLE_Y"));
      this.setBlendMode(x.getAttrAsInt("BLENDMODE"));
      this.setParticlesRelative(x.getAttrAsBool("RELATIVE"));
      this.setRandomColor(x.getAttrAsBool("RANDOM_COLOR"));
      this.setZLayer(x.getAttrAsInt("LAYER"));
      this.setSingleParticle(x.getAttrAsBool("SINGLE_PARTICLE"));
      this.setName(x.getAttr("NAME"));
      this.setAnimate(x.getAttrAsBool("ANIMATE"));
      this.setOnce(x.getAttrAsBool("ANIMATE_ONCE"));
      this.setCurrentFrame(x.getAttrAsFloat("FRAME"));
      this.setRandomStartFrame(x.getAttrAsBool("RANDOM_START_FRAME"));
      this.setAnimationDirection(x.getAttrAsInt("ANIMATION_DIRECTION"));
      this.setUniform(x.getAttrAsBool("UNIFORM"));
      this.setAngleType(x.getAttrAsInt("ANGLE_TYPE"));
      this.setAngleOffset(x.getAttrAsInt("ANGLE_OFFSET"));
      this.setLockAngle(x.getAttrAsBool("LOCK_ANGLE"));
      this.setAngleRelative(x.getAttrAsBool("ANGLE_RELATIVE"));
      this.setUseEffectEmission(x.getAttrAsBool("USE_EFFECT_EMISSION"));
      this.setColorRepeat(x.getAttrAsInt("COLOR_REPEAT"));
      this.setAlphaRepeat(x.getAttrAsInt("ALPHA_REPEAT"));
      this.setOneShot(x.getAttrAsBool("ONE_SHOT"));
      this.setHandleCenter(x.getAttrAsBool("HANDLE_CENTERED"));
      this.setGroupParticles(x.getAttrAsBool("GROUP_PARTICLES")); // ?

      if (this.getAnimationDirection() === 0) this.setAnimationDirection(1);
      this.setParentEffect(parent);
      var path = parent.getPath() + "/" + this.getName();
      this.setPath(path);
      var imgNode = xml.getElementsByTagName("SHAPE_INDEX")[0];
      this.setImage(parseInt(imgNode.innerHTML));
      if (x.hasChildAttr("ANGLE_TYPE")) this.setAngleType(x.getChildAttrAsInt("ANGLE_TYPE", "VALUE"));
      if (x.hasChildAttr("ANGLE_OFFSET")) this.setAngleOffset(x.getChildAttrAsInt("ANGLE_OFFSET", "VALUE"));
      if (x.hasChildAttr("LOCKED_ANGLE")) this.setLockAngle(x.getChildAttrAsBool("LOCKED_ANGLE", "VALUE"));
      if (x.hasChildAttr("ANGLE_RELATIVE")) this.setAngleRelative(x.getChildAttrAsBool("ANGLE_RELATIVE", "VALUE"));
      if (x.hasChildAttr("USE_EFFECT_EMISSION")) this.setUseEffectEmission(x.getChildAttrAsBool("USE_EFFECT_EMISSION", "VALUE"));
      if (x.hasChildAttr("COLOR_REPEAT")) this.setColorRepeat(x.getChildAttrAsInt("COLOR_REPEAT", "VALUE"));
      if (x.hasChildAttr("ALPHA_REPEAT")) this.setAlphaRepeat(x.getChildAttrAsInt("ALPHA_REPEAT", "VALUE"));
      if (x.hasChildAttr("ONE_SHOT")) this.setOneShot(x.getChildAttrAsBool("ONE_SHOT", "VALUE"));
      if (x.hasChildAttr("HANDLE_CENTERED")) this.setHandleCenter(x.getChildAttrAsBool("HANDLE_CENTERED", "VALUE"));
      this.readAttribute(xml, this._cLife, "LIFE");
      this.readAttribute(xml, this._cAmount, "AMOUNT");
      this.readAttribute(xml, this._cBaseSpeed, "BASE_SPEED");
      this.readAttribute(xml, this._cBaseWeight, "BASE_WEIGHT");
      this.readAttribute(xml, this._cSizeX, "BASE_SIZE_X");
      this.readAttribute(xml, this._cSizeY, "BASE_SIZE_Y");
      this.readAttribute(xml, this._cBaseSpin, "BASE_SPIN");
      this.readAttribute(xml, this._cSplatter, "SPLATTER");
      this.readAttribute(xml, this._cLifeVariation, "LIFE_VARIATION");
      this.readAttribute(xml, this._cAmountVariation, "AMOUNT_VARIATION");
      this.readAttribute(xml, this._cVelVariation, "VELOCITY_VARIATION");
      this.readAttribute(xml, this._cWeightVariation, "WEIGHT_VARIATION");
      this.readAttribute(xml, this._cSizeXVariation, "SIZE_X_VARIATION");
      this.readAttribute(xml, this._cSizeYVariation, "SIZE_Y_VARIATION");
      this.readAttribute(xml, this._cSpinVariation, "SPIN_VARIATION");
      this.readAttribute(xml, this._cDirectionVariation, "DIRECTION_VARIATION");
      this.readAttribute(xml, this._cAlpha, "ALPHA_OVERTIME");
      this.readAttribute(xml, this._cVelocity, "VELOCITY_OVERTIME");
      this.readAttribute(xml, this._cWeight, "WEIGHT_OVERTIME");
      this.readAttribute(xml, this._cScaleX, "SCALE_X_OVERTIME");
      this.readAttribute(xml, this._cScaleY, "SCALE_Y_OVERTIME");
      this.readAttribute(xml, this._cSpin, "SPIN_OVERTIME");
      this.readAttribute(xml, this._cDirection, "DIRECTION");
      this.readAttribute(xml, this._cDirectionVariationOT, "DIRECTION_VARIATIONOT");
      this.readAttribute(xml, this._cFramerate, "FRAMERATE_OVERTIME");
      this.readAttribute(xml, this._cStretch, "STRETCH_OVERTIME");
      this.readAttribute(xml, this._cR, "RED_OVERTIME");
      this.readAttribute(xml, this._cG, "GREEN_OVERTIME");
      this.readAttribute(xml, this._cB, "BLUE_OVERTIME");
      this.readAttribute(xml, this._cGlobalVelocity, "GLOBAL_VELOCITY");
      this.readAttribute(xml, this._cEmissionAngle, "EMISSION_ANGLE");
      this.readAttribute(xml, this._cEmissionRange, "EMISSION_RANGE"); // This seems suspect? only one child?

      var childNode = xml.getElementsByTagName("EFFECT")[0];

      if (childNode) {
        var e = new _Effect2.default();
        e.loadFromXML(childNode); //e.CompileAll();

        e.setParentEmitter(this);
        this.addEffect(e);
      }
    }
  }, {
    key: "readAttribute",
    value: function readAttribute(xml, emitArray, tag) {
      (0, _Utils.forEachXMLChild)(xml, tag, function (n) {
        var attr = emitArray.add(parseFloat((0, _Utils.getNodeAttrValue)(n, "FRAME")), parseFloat((0, _Utils.getNodeAttrValue)(n, "VALUE")));
        attr.loadFromXML(n.getElementsByTagName("CURVE")[0]);
      });
    }
  }, {
    key: "sortAll",
    value: function sortAll() {
      this._cR.sort();

      this._cG.sort();

      this._cB.sort();

      this._cBaseSpin.sort();

      this._cSpin.sort();

      this._cSpinVariation.sort();

      this._cVelocity.sort();

      this._cBaseSpeed.sort();

      this._cVelVariation.sort();

      this._cAlpha.sort();

      this._cSizeX.sort();

      this._cSizeY.sort();

      this._cScaleX.sort();

      this._cScaleY.sort();

      this._cSizeXVariation.sort();

      this._cSizeYVariation.sort();

      this._cLifeVariation.sort();

      this._cLife.sort();

      this._cAmount.sort();

      this._cAmountVariation.sort();

      this._cEmissionAngle.sort();

      this._cEmissionRange.sort();

      this._cFramerate.sort();

      this._cStretch.sort();

      this._cGlobalVelocity.sort();
    }
  }, {
    key: "showAll",
    value: function showAll() {
      this.setVisible(true);

      for (var i = 0; i < this._effects.length; i++) {
        this._effects[i].showAll();
      }
    }
  }, {
    key: "hideAll",
    value: function hideAll() {
      this.setVisible(false);

      for (var i = 0; i < this._effects.length; i++) {
        this._effects[i].hideAll();
      }
    }
  }, {
    key: "addEffect",
    value: function addEffect(effect) {
      this._effects.push(effect);
    }
  }, {
    key: "setParentEffect",
    value: function setParentEffect(parent) {
      this._parentEffect = parent;
    }
  }, {
    key: "setImage",
    value: function setImage(imageIndex) {
      var image = _EffectsLibrary2.default.getImage(imageIndex);

      this._image = image;
      this._AABB_ParticleMaxWidth = image.getWidth() * 0.5;
      this._AABB_ParticleMaxHeight = image.getHeight() * 0.5;
      this._AABB_ParticleMinWidth = image.getWidth() * -0.5;
      this._AABB_ParticleMinHeight = image.getHeight() * -0.5;
    }
  }, {
    key: "setAngleOffset",
    value: function setAngleOffset(offset) {
      this._angleOffset = offset;
    }
  }, {
    key: "setUniform",
    value: function setUniform(value) {
      this._uniform = value;
    }
  }, {
    key: "setAngleType",
    value: function setAngleType(angleType) {
      this._angleType = angleType;
    }
  }, {
    key: "setUseEffectEmission",
    value: function setUseEffectEmission(value) {
      this._useEffectEmission = value;
    }
  }, {
    key: "setVisible",
    value: function setVisible(value) {
      this._visible = value;
    }
  }, {
    key: "setSingleParticle",
    value: function setSingleParticle(value) {
      this._singleParticle = value;
    }
  }, {
    key: "setRandomColor",
    value: function setRandomColor(value) {
      this._randomColor = value;
    }
  }, {
    key: "setZLayer",
    value: function setZLayer(zLayer) {
      this._zLayer = zLayer;
    }
  }, {
    key: "setAnimate",
    value: function setAnimate(value) {
      this._animate = value;
    }
  }, {
    key: "setRandomStartFrame",
    value: function setRandomStartFrame(value) {
      this._randomStartFrame = value;
    }
  }, {
    key: "setAnimationDirection",
    value: function setAnimationDirection(direction) {
      this._animationDirection = direction;
    }
  }, {
    key: "setColorRepeat",
    value: function setColorRepeat(repeat) {
      this._colorRepeat = repeat;
    }
  }, {
    key: "setAlphaRepeat",
    value: function setAlphaRepeat(repeat) {
      this._alphaRepeat = repeat;
    }
  }, {
    key: "setOneShot",
    value: function setOneShot(value) {
      this._oneShot = value;
    }
  }, {
    key: "setHandleCenter",
    value: function setHandleCenter(value) {
      this._handleCenter = value;
    }
  }, {
    key: "setParticlesRelative",
    value: function setParticlesRelative(value) {
      this._particlesRelative = value;
    }
  }, {
    key: "setTweenSpawns",
    value: function setTweenSpawns(value) {
      this._tweenSpawns = value;
    }
  }, {
    key: "setLockAngle",
    value: function setLockAngle(value) {
      this._lockedAngle = value;
    }
  }, {
    key: "setAngleRelative",
    value: function setAngleRelative(value) {
      this._angleRelative = value;
    }
  }, {
    key: "setOnce",
    value: function setOnce(value) {
      this._once = value;
    }
  }, {
    key: "setGroupParticles",
    value: function setGroupParticles(value) {
      this._groupParticles = value;
    }
  }, {
    key: "getParentEffect",
    value: function getParentEffect() {
      return this._parentEffect;
    }
  }, {
    key: "getImage",
    value: function getImage() {
      return this._image;
    }
  }, {
    key: "getAngleOffset",
    value: function getAngleOffset() {
      return this._angleOffset;
    }
  }, {
    key: "isUniform",
    value: function isUniform() {
      return this._uniform;
    }
  }, {
    key: "getAngleType",
    value: function getAngleType() {
      return this._angleType;
    }
  }, {
    key: "isUseEffectEmmision",
    value: function isUseEffectEmmision() {
      return this._useEffectEmission;
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this._visible;
    }
  }, {
    key: "isSingleParticle",
    value: function isSingleParticle() {
      return this._singleParticle;
    }
  }, {
    key: "isRandomColor",
    value: function isRandomColor() {
      return this._randomColor;
    }
  }, {
    key: "getZLayer",
    value: function getZLayer() {
      return this._zLayer;
    }
  }, {
    key: "isAnimate",
    value: function isAnimate() {
      return this._animate;
    }
  }, {
    key: "isRandomStartFrame",
    value: function isRandomStartFrame() {
      return this._randomStartFrame;
    }
  }, {
    key: "getAnimationDirection",
    value: function getAnimationDirection() {
      return this._animationDirection;
    }
  }, {
    key: "getColorRepeat",
    value: function getColorRepeat() {
      return this._colorRepeat;
    }
  }, {
    key: "getAlphaRepeat",
    value: function getAlphaRepeat() {
      return this._alphaRepeat;
    }
  }, {
    key: "isOneShot",
    value: function isOneShot() {
      return this._oneShot;
    }
  }, {
    key: "isHandleCenter",
    value: function isHandleCenter() {
      return this._handleCenter;
    }
  }, {
    key: "isParticlesRelative",
    value: function isParticlesRelative() {
      return this._particlesRelative;
    }
  }, {
    key: "isTweenSpawns",
    value: function isTweenSpawns() {
      return this._tweenSpawns;
    }
  }, {
    key: "isLockAngle",
    value: function isLockAngle() {
      return this._lockedAngle;
    }
  }, {
    key: "isAngleRelative",
    value: function isAngleRelative() {
      return this._angleRelative;
    }
  }, {
    key: "isOnce",
    value: function isOnce() {
      return this._once;
    }
  }, {
    key: "isGroupParticles",
    value: function isGroupParticles() {
      return this._groupParticles;
    }
  }, {
    key: "getPath",
    value: function getPath() {
      return this._path;
    }
  }, {
    key: "setRadiusCalculate",
    value: function setRadiusCalculate(value) {
      this._radiusCalculate = value;

      for (var i = 0; i < this._children.length; i++) {
        this._children[i].setRadiusCalculate(value);
      }

      for (var _i = 0; _i < this._effects.length; _i++) {
        this._effects[_i].setRadiusCalculate(value);
      }
    }
  }, {
    key: "destroy",
    value: function destroy(releaseChildren) {
      this._parentEffect = null;
      this._image = null;

      for (var i = 0; i < this._effects.length; i++) {
        this._effects[i].destroy();
      }

      this._effects = [];

      _get(_getPrototypeOf(Emitter.prototype), "destroy", this).call(this, false); // Emitter.$superp.Destroy.call(this, false);

    }
  }, {
    key: "changeDoB",
    value: function changeDoB(dob) {
      this._dob = dob;

      for (var i = 0; i < this._effects.length; i++) {
        this._effects[i].changeDoB(dob);
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.capture();
      var radians = this._angle / 180.0 * _Utils.M_PI;

      this._matrix.set(Math.cos(radians), Math.sin(radians), -Math.sin(radians), Math.cos(radians));

      if (this._parent && this._relative) {
        this.setZ(this._parent.getZ());

        this._matrix.transformSelf(this._parent.getMatrix());

        var rotvec = this._parent.getMatrix().transformVector(this._x, this._y);

        this._wx = this._parent.getWX() + rotvec.x * this._z;
        this._wy = this._parent.getWY() + rotvec.y * this._z;
        this._relativeAngle = this._parent.getRelativeAngle() + this._angle;
      } else {
        this._wx = this._x;
        this._wy = this._y;
      }

      if (!this._tweenSpawns) {
        this.capture();
        this._tweenSpawns = true;
      }

      this._dying = this._parentEffect.isDying();

      _get(_getPrototypeOf(Emitter.prototype), "updateBoundingBox", this).call(this);

      if (this._radiusCalculate) _get(_getPrototypeOf(Emitter.prototype), "updateEntityRadius", this).call(this);
      this.updateChildren();

      if (!this._dead && !this._dying) {
        if (this._visible && this._parentEffect.getParticleManager().isSpawningAllowed()) this.updateSpawns();
      } else {
        if (this._children.length === 0) {
          this.destroy();
          return false;
        } else {
          this.killChildren();
        }
      }

      return true;
    }
  }, {
    key: "updateSpawns",
    value: function updateSpawns() {
      var eSingle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var intCounter;
      var qty;
      var er;
      var e;
      var parentEffect = this._parentEffect;
      var curFrame = parentEffect.getCurrentEffectFrame();
      var pm = parentEffect.getParticleManager();
      var a1 = this.getEmitterAmount(curFrame);
      var a2 = (0, _Utils.random)(this.getEmitterAmountVariation(curFrame));
      var a3 = parentEffect.getCurrentAmount();
      var a4 = pm.getGlobalAmountScale();
      qty = (this.getEmitterAmount(curFrame) + (0, _Utils.random)(this.getEmitterAmountVariation(curFrame))) * parentEffect.getCurrentAmount() * pm.getGlobalAmountScale() / _EffectsLibrary2.default.getUpdateFrequency();

      if (!this._singleParticle) {
        this._counter += qty;
      }

      intCounter = Math.floor(this._counter);

      if (intCounter >= 1 || this._singleParticle && !this._startedSpawning) {
        if (!this._startedSpawning && this._singleParticle) {
          switch (parentEffect.getClass()) {
            case _Effect.TypePoint:
              intCounter = 1;
              break;

            case _Effect.TypeArea:
              intCounter = parentEffect.getMGX() * parentEffect.getMGY();
              break;

            case _Effect.TypeLine:
            case _Effect.TypeEllipse:
              intCounter = parentEffect.getMGX();
              break;
          }
        } else if (this._singleParticle && this._startedSpawning) {
          intCounter = 0;
        } // preload attributes


        this._currentLife = this.getEmitterLife(curFrame) * parentEffect.getCurrentLife();

        if (!this._bypassWeight) {
          this._currentWeight = this.getEmitterBaseWeight(curFrame);
          this._currentWeightVariation = this.getEmitterWeightVariation(curFrame);
        }

        if (!this._bypassSpeed) {
          this._currentSpeed = this.getEmitterBaseSpeed(curFrame);
          this._currentSpeedVariation = this.getEmitterVelVariation(curFrame);
        }

        if (!this._bypassSpin) {
          this._currentSpin = this.getEmitterBaseSpin(curFrame);
          this._currentSpinVariation = this.getEmitterSpinVariation(curFrame);
        }

        this._currentDirectionVariation = this.getEmitterDirectionVariation(curFrame);

        if (this._useEffectEmission) {
          er = parentEffect.getCurrentEmissionRange();
          this._currentEmissionAngle = parentEffect.getCurrentEmissionAngle();
        } else {
          er = this.getEmitterEmissionRange(curFrame);
          this._currentEmissionAngle = this.getEmitterEmissionAngle(curFrame);
        }

        this._currentLifeVariation = this.getEmitterLifeVariation(curFrame);
        this._currentSizeX = this.getEmitterSizeX(curFrame);
        this._currentSizeY = this.getEmitterSizeY(curFrame);
        this._currentSizeXVariation = this.getEmitterSizeXVariation(curFrame);
        this._currentSizeYVariation = this.getEmitterSizeYVariation(curFrame); // ------------------------------

        for (var c = 1; c <= intCounter; ++c) {
          this._startedSpawning = true;

          if (!eSingle) {
            e = pm.grabParticle(parentEffect, this._groupParticles, this._zLayer);
          } else {
            e = eSingle;
          }

          if (e) {
            // -----Link to its emitter and assign the control source (which is this emitter)----
            e.setEmitter(this);
            e.setParent(this);
            e.setParticleManager(pm);
            e.setEffectLayer(parentEffect.getEffectLayer()); // ----------------------------------------------------

            e.setDoB(pm.getCurrentTime());

            if (parentEffect.getTraverseEdge() && parentEffect.getClass() == _Effect.TypeLine) {
              this._particlesRelative = true;
            }

            e.setRelative(this._particlesRelative);

            switch (parentEffect.getClass()) {
              case _Effect.TypePoint:
                if (e.isRelative()) {
                  e.setX(0 - parentEffect.getHandleX());
                  e.setY(0 - parentEffect.getHandleY());
                } else {
                  var tween = c / intCounter;

                  if (parentEffect.getHandleCenter() || parentEffect.getHandleX() + parentEffect.getHandleY() === 0) {
                    // @dan already set? tween = c / intCounter;
                    e.setX((0, _Utils.lerp)(this._oldWX, this._wx, tween));
                    e.setY((0, _Utils.lerp)(this._oldWY, this._wy, tween));
                    e.setWX(e.getX() - parentEffect.getHandleX() * this._z);
                    e.setWY(e.getY() - parentEffect.getHandleY() * this._z);
                  } else {
                    e.setX(0 - parentEffect.getHandleX());
                    e.setY(0 - parentEffect.getHandleY());

                    var rotvec = this._parent.getMatrix().transformVector(e.getX(), e.getY());

                    e.setX((0, _Utils.lerp)(this._oldWX, this._wx, tween) + rotvec.x);
                    e.setY((0, _Utils.lerp)(this._oldWY, this._wy, tween) + rotvec.y);
                    e.setWX(e.getX() * this._z);
                    e.setWY(e.getY() * this._z);
                  }
                }

                break;

              case _Effect.TypeArea:
                if (parentEffect.getEmitAtPoints()) {
                  if (parentEffect._spawnDirection == -1) {
                    this._gx += parentEffect._spawnDirection;

                    if (this._gx < 0) {
                      this._gx = parentEffect.getMGX() - 1;
                      this._gy += parentEffect._spawnDirection;
                      if (this._gy < 0) this._gy = parentEffect.getMGY() - 1;
                    }
                  }

                  if (parentEffect.getMGX() > 1) {
                    e.setX(this._gx / (parentEffect.getMGX() - 1) * parentEffect.getCurrentWidth() - parentEffect.getHandleX());
                  } else {
                    e.setX(-parentEffect.getHandleX());
                  }

                  if (parentEffect.getMGY() > 1) {
                    e.setY(this._gy / (parentEffect.getMGY() - 1) * parentEffect.getCurrentHeight() - parentEffect.getHandleY());
                  } else {
                    e.setY(-parentEffect.getHandleY());
                  }

                  if (parentEffect._spawnDirection == 1) {
                    this._gx += parentEffect._spawnDirection;

                    if (this._gx >= parentEffect.getMGX()) {
                      this._gx = 0;
                      this._gy += parentEffect._spawnDirection;
                      if (this._gy >= parentEffect.getMGY()) this._gy = 0;
                    }
                  }
                } else {
                  e.setX((0, _Utils.random)(parentEffect.getCurrentWidth()) - parentEffect.getHandleX());
                  e.setY((0, _Utils.random)(parentEffect.getCurrentHeight()) - parentEffect.getHandleY());
                }

                if (!e.isRelative()) {
                  var parent = this._parent;

                  var _rotvec = parent.getMatrix().transformVector(e.getX(), e.getY());

                  e.setX(parent.getWX() + _rotvec.x * this._z);
                  e.setY(parent.getWY() + _rotvec.y * this._z);
                }

                break;

              case _Effect.TypeEllipse:
                {
                  var tx = parentEffect.getCurrentWidth() / 2.0;
                  var ty = parentEffect.getCurrentHeight() / 2.0;
                  var th = 0;

                  if (parentEffect.getEmitAtPoints()) {
                    if (parentEffect.getMGX() === 0) parentEffect.SetMGX(1);
                    this._gx += parentEffect._spawnDirection;

                    if (this._gx >= parentEffect.getMGX()) {
                      this._gx = 0;
                    } else if (this._gx < 0) {
                      this._gx = parentEffect.getMGX() - 1;
                    }

                    th = this._gx * (parentEffect.getEllipseArc() / parentEffect.getMGX()) + parentEffect.getEllipseOffset();
                  } else {
                    th = (0, _Utils.random)(parentEffect.getEllipseArc()) + parentEffect.getEllipseOffset();
                  }

                  e.setX(Math.cos(th / 180.0 * _Utils.M_PI) * tx - parentEffect.getHandleX() + tx);
                  e.setY(-Math.sin(th / 180.0 * _Utils.M_PI) * ty - parentEffect.getHandleY() + ty);

                  if (!e.isRelative()) {
                    var _rotvec2 = this._parent.getMatrix().transformVector(e.getX(), e.getY());

                    e.setX(this._parent.getWX() + _rotvec2.x * this._z);
                    e.setY(this._parent.getWY() + _rotvec2.y * this._z);
                  }
                }
                break;

              case _Effect.TypeLine:
                if (!parentEffect.getTraverseEdge()) {
                  if (parentEffect.getEmitAtPoints()) {
                    if (parentEffect._spawnDirection == -1) {
                      this._gx += parentEffect._spawnDirection;
                      if (this._gx < 0) this._gx = parentEffect.getMGX() - 1;
                    }

                    if (parentEffect.getMGX() > 1) {
                      e.setX(this._gx / (parentEffect.getMGX() - 1) * parentEffect.getCurrentWidth() - parentEffect.getHandleX());
                    } else {
                      e.setX(-parentEffect.getHandleX());
                    }

                    e.setY(-parentEffect.getHandleY());

                    if (parentEffect._spawnDirection == 1) {
                      this._gx += parentEffect._spawnDirection;
                      if (this._gx >= parentEffect.getMGX()) this._gx = 0;
                    }
                  } else {
                    e.setX((0, _Utils.random)(parentEffect.getCurrentWidth()) - parentEffect.getHandleX());
                    e.setY(-parentEffect.getHandleY());
                  }
                } else {
                  if (parentEffect._distanceSetByLife) {
                    e.setX(-parentEffect.getHandleX());
                    e.setY(-parentEffect.getHandleY());
                  } else {
                    if (parentEffect.getEmitAtPoints()) {
                      if (parentEffect._spawnDirection == -1) {
                        this._gx += parentEffect._spawnDirection;
                        if (this._gx < 0) this._gx = parentEffect.getMGX() - 1;
                      }

                      if (parentEffect.getMGX() > 1) {
                        e.setX(this._gx / (parentEffect.getMGX() - 1) * parentEffect.getCurrentWidth() - parentEffect.getHandleX());
                      } else {
                        e.setX(-parentEffect.getHandleX());
                      }

                      e.setY(-parentEffect.getHandleY());

                      if (parentEffect._spawnDirection == 1) {
                        this._gx += parentEffect._spawnDirection;
                        if (this._gx >= parentEffect.getMGX()) this._gx = 0;
                      }
                    } else {
                      e.setX((0, _Utils.random)(parentEffect.getCurrentWidth()) - parentEffect.getHandleX());
                      e.setY(-parentEffect.getHandleY());
                    }
                  }
                } // rotate


                if (!e.isRelative()) {
                  var _rotvec3 = this._parent.getMatrix().transformVector(e.getX(), e.getY());

                  e.setX(this._parent.getWX() + _rotvec3.x * this._z);
                  e.setY(this._parent.getWY() + _rotvec3.y * this._z);
                }

                break;
            } // set the zoom level


            e.setZ(this._z); // set up the image

            e.setAvatar(this._image);
            e.setHandleX(this._handleX);
            e.setHandleY(this._handleY);
            e.setAutocenter(this._handleCenter); // set lifetime properties

            e.setLifeTime(this._currentLife + (0, _Utils.randomBetween)(-this._currentLifeVariation, this._currentLifeVariation) * parentEffect.getCurrentLife()); // speed

            e.setSpeedVecX(0);
            e.setSpeedVecY(0);

            if (!this._bypassSpeed) {
              e.setSpeed(this._cVelocity.get(0));
              e.setVelVariation((0, _Utils.randomBetween)(-this._currentSpeedVariation, this._currentSpeedVariation));
              e.setBaseSpeed((this._currentSpeed + e.getVelVariation()) * parentEffect.getCurrentVelocity());
              e.setSpeed(this._cVelocity.get(0) * e.getBaseSpeed() * this._cGlobalVelocity.get(0));
            } else {
              e.setSpeed(0);
            } // size


            e.setGSizeX(parentEffect.getCurrentSizeX());
            e.setGSizeY(parentEffect.getCurrentSizeY()); // width

            var scaleTemp = this._cScaleX.get(0);

            var sizeTemp = 0;
            e.setScaleVariationX((0, _Utils.random)(this._currentSizeXVariation));
            e.setWidth(e.getScaleVariationX() + this._currentSizeX);

            if (scaleTemp !== 0) {
              sizeTemp = e.getWidth() / this._image.getWidth() * scaleTemp * e.getGSizeX();
            }

            e.setScaleX(sizeTemp);

            if (this._uniform) {
              // height
              e.setScaleY(sizeTemp);

              if (!this._bypassStretch) {
                e.setScaleY(this.getEmitterScaleX(0) * e.getGSizeX() * (e.getWidth() + Math.abs(e.getSpeed()) * this.getEmitterStretch(0, 0) * parentEffect.getCurrentStretch()) / this._image.getWidth());
                if (e.getScaleY() < e.getScaleX()) e.setScaleY(e.getScaleX());
              }

              e.setWidthHeightAABB(this._AABB_ParticleMinWidth, this._AABB_ParticleMaxWidth, this._AABB_ParticleMinWidth, this._AABB_ParticleMaxWidth);
            } else {
              // height
              scaleTemp = this.getEmitterScaleY(0);
              sizeTemp = 0;
              e.setScaleVariationY((0, _Utils.random)(this._currentSizeYVariation));
              e.setHeight(e.getScaleVariationY() + this._currentSizeY);

              if (scaleTemp !== 0) {
                sizeTemp = e.getHeight() / this._image.getHeight() * scaleTemp * e.getGSizeY();
              }

              e.setScaleY(sizeTemp);

              if (!this._bypassStretch && e.getSpeed() !== 0) {
                e.setScaleY(this.getEmitterScaleY(0) * e.getGSizeY() * (e.getHeight() + Math.abs(e.getSpeed()) * this.getEmitterStretch(0) * parentEffect.getCurrentStretch()) / this._image.getHeight());
                if (e.getScaleY() < e.getScaleX()) e.setScaleY(e.getScaleX());
              }

              e.setWidthHeightAABB(this._AABB_ParticleMinWidth, this._AABB_ParticleMaxWidth, this._AABB_ParticleMinHeight, this._AABB_ParticleMaxHeight);
            } // splatter


            if (!this._bypassSplatter) {
              var splatterTemp = this.getEmitterSplatter(curFrame);
              var splatX = (0, _Utils.randomBetween)(-splatterTemp, splatterTemp);
              var splatY = (0, _Utils.randomBetween)(-splatterTemp, splatterTemp);

              while ((0, _Utils.getDistance2D)(0, 0, splatX, splatY) >= splatterTemp && splatterTemp > 0) {
                splatX = (0, _Utils.randomBetween)(-splatterTemp, splatterTemp);
                splatY = (0, _Utils.randomBetween)(-splatterTemp, splatterTemp);
              }

              if (this._z == 1 || e.isRelative()) {
                e.move(splatX, splatY);
              } else {
                e.move(splatX * this._z, splatY * this._z);
              }
            } // rotation and direction of travel settings


            e.miniUpdate();

            if (parentEffect.getTraverseEdge() && parentEffect.getClass() == _Effect.TypeLine) {
              e.setDirectionLocked(true);
              e.setEntityDirection(90.0);
            } else {
              if (parentEffect.getClass() != _Effect.TypePoint) {
                if (!this._bypassSpeed || this._angleType == AngAlign) {
                  e.setEmissionAngle(this._currentEmissionAngle + (0, _Utils.randomBetween)(-er, er));

                  switch (parentEffect.getEmissionType()) {
                    case _Effect.EmInwards:
                      if (e.isRelative()) e.setEmissionAngle(e.getEmissionAngle() + (0, _Utils.getDirection)(e.getX(), e.getY(), 0, 0));else e.setEmissionAngle(e.getEmissionAngle() + (0, _Utils.getDirection)(e.getWX(), e.getWY(), e.getParent().getWX(), e.getParent().getWY()));
                      break;

                    case _Effect.EmOutwards:
                      if (e.isRelative()) e.setEmissionAngle(e.getEmissionAngle() + (0, _Utils.getDirection)(0, 0, e.getX(), e.getY()));else e.setEmissionAngle(e.getEmissionAngle() + (0, _Utils.getDirection)(e.getParent().getWX(), e.getParent().getWY(), e.getWX(), e.getWY()));
                      break;

                    case _Effect.EmInAndOut:
                      if (this._dirAlternater) {
                        if (e.isRelative()) e.setEmissionAngle(e.getEmissionAngle() + (0, _Utils.getDirection)(0, 0, e.getX(), e.getY()));else e.setEmissionAngle(e.getEmissionAngle() + (0, _Utils.getDirection)(e.getParent().getWX(), e.getParent().getWY(), e.getWX(), e.getWY()));
                      } else {
                        if (e.isRelative()) e.setEmissionAngle(e.getEmissionAngle() + (0, _Utils.getDirection)(e.getX(), e.getY(), 0, 0));else e.setEmissionAngle(e.getEmissionAngle() + (0, _Utils.getDirection)(e.getWX(), e.getWY(), e.getParent().getWX(), e.getParent().getWY()));
                      }

                      this._dirAlternater = !this._dirAlternater;
                      break;

                    case _Effect.EmSpecified:
                      // nothing
                      break;
                  }
                }
              } else {
                e.setEmissionAngle(this._currentEmissionAngle + (0, _Utils.randomBetween)(-er, er));
              }

              if (!this._bypassDirectionvariation) {
                e.setDirectionVairation(this._currentDirectionVariation);
                var dv = e.getDirectionVariation() * this.getEmitterDirectionVariationOt(0);
                e.setEntityDirection(e.getEmissionAngle() + this.getEmitterDirection(0) + (0, _Utils.randomBetween)(-dv, dv));
              } else {
                e.setEntityDirection(e.getEmissionAngle() + this.getEmitterDirection(0));
              }
            } // ------ e._lockedAngle = _lockedAngle


            if (!this._bypassSpin) {
              e.setSpinVariation((0, _Utils.randomBetween)(-this._currentSpinVariation, this._currentSpinVariation) + this._currentSpin);
            } // weight


            if (!this._bypassWeight) {
              e.setWeight(this.getEmitterWeight(0));
              e.setWeightVariation((0, _Utils.randomBetween)(-this._currentWeightVariation, this._currentWeightVariation));
              e.setBaseWeight((this._currentWeight + e.getWeightVariation()) * parentEffect.getCurrentWeight());
            } // -------------------


            if (this._lockedAngle) {
              if (!this._bypassWeight && !this._bypassSpeed && !parentEffect.isBypassWeight()) {
                e.setSpeedVecX(Math.sin(e.getEntityDirection() / 180.0 * _Utils.M_PI));
                e.setSpeedVecY(Math.cos(e.getEntityDirection() / 180.0 * _Utils.M_PI));
                e.setAngle((0, _Utils.getDirection)(0, 0, e._speedVec.x, -e._speedVec.y));
              } else {
                if (parentEffect.getTraverseEdge()) {
                  e.SetAngle(parentEffect.getAngle() + this._angleOffset);
                } else {
                  e.setAngle(e.getEntityDirection() + this._angle + this._angleOffset);
                }
              }
            } else {
              switch (this._angleType) {
                case AngAlign:
                  if (parentEffect.getTraverseEdge()) e.setAngle(parentEffect.getAngle() + this._angleOffset);else e.setAngle(e.getEntityDirection() + this._angleOffset);
                  break;

                case AngRandom:
                  e.setAngle((0, _Utils.random)(this._angleOffset));
                  break;

                case AngSpecify:
                  e.setAngle(this._angleOffset);
                  break;
              }
            } // color settings


            if (this._randomColor) {
              var randomAge = (0, _Utils.random)(this._cR.getLastFrame());
              e.setRed(this.randomizeR(e, randomAge));
              e.setGreen(this.randomizeG(e, randomAge));
              e.setBlue(this.randomizeB(e, randomAge));
            } else {
              e.setRed(this.getEmitterR(0));
              e.setGreen(this.getEmitterG(0));
              e.setBlue(this.getEmitterB(0));
            }

            e.setEntityAlpha(e.getEmitter().getEmitterAlpha(e.getAge(), e.getLifeTime()) * parentEffect.getCurrentAlpha()); // blend mode

            e._blendMode = this._blendMode; // animation and framerate

            e._animating = this._animate;
            e._animateOnce = this._once;
            e._framerate = this.getEmitterFramerate(0);
            if (this._randomStartFrame) e._currentFrame = (0, _Utils.random)(e._avatar.getFramesCount());else e._currentFrame = this._currentFrame;

            for (var i = 0; i < this._effects.length; i++) {
              var newEffect = new _Effect2.default(this._effects[i], pm);
              newEffect.setParent(e);
              newEffect.setParentEmitter(this);
              newEffect.setEffectLayer(e._effectLayer);
            }

            parentEffect.setParticlesCreated(true); // get the relative angle

            if (!this._relative) {
              var radians = e._angle / 180.0 * _Utils.M_PI;

              e._matrix.set(Math.cos(radians), Math.sin(radians), -Math.sin(radians), Math.cos(radians));

              e._matrix.transformSelf(this._parent.getMatrix());
            }

            e._relativeAngle = this._parent.getRelativeAngle() + e._angle;
            e.updateEntityRadius();
            e.updateBoundingBox(); // capture old values for tweening

            e.capture();
            if (pm.onParticleSpawnCB) pm.onParticleSpawnCB(e);
          }
        }

        this._counter -= intCounter;
      }
    }
  }, {
    key: "controlParticle",
    value: function controlParticle(e) {
      var parentEffect = this._parentEffect;
      var pm = parentEffect.getParticleManager(); // alpha change

      if (this._alphaRepeat > 1) {
        e._rptAgeA += _EffectsLibrary2.default.getCurrentUpdateTime() * this._alphaRepeat;
        e._alpha = this.getEmitterAlpha(e._rptAgeA, e._lifeTime) * parentEffect.getCurrentAlpha();

        if (e._rptAgeA > e._lifeTime && e._aCycles < this._alphaRepeat) {
          e._rptAgeA -= e._lifeTime;
          ++e._aCycles;
        }
      } else {
        e._alpha = this.getEmitterAlpha(e._age, e._lifeTime) * parentEffect.getCurrentAlpha();
      } // angle changes


      if (this._lockedAngle && this._angleType == AngAlign) {
        if (e._directionLocked) {
          e._angle = parentEffect.getAngle() + this._angle + this._angleOffset;
        } else {
          if (!this._bypassWeight && !parentEffect.isBypassWeight() || e._direction) {
            if (e._oldWX != e._wx && e._oldWY != e._wy) {
              if (e._relative) e._angle = (0, _Utils.getDirection)(e._oldX, e._oldY, e._x, e._y);else e._angle = (0, _Utils.getDirection)(e._oldWX, e._oldWY, e._wx, e._wy);

              if (Math.abs(e._oldAngle - e._angle) > 180) {
                if (e._oldAngle > e._angle) e._oldAngle -= 360;else e._oldAngle += 360;
              }
            }
          } else {
            e._angle = e._direction + this._angle + this._angleOffset;
          }
        }
      } else {
        if (!this._bypassSpin) e._angle += this.getEmitterSpin(e._age, e._lifeTime) * e._spinVariation * parentEffect.getCurrentSpin() / _EffectsLibrary2.default.getCurrentUpdateTime();
      } // direction changes and motion randomness


      if (e._directionLocked) {
        e._direction = 90;

        switch (parentEffect.getClass()) {
          case _Effect.TypeLine:
            if (parentEffect._distanceSetByLife) {
              var life = e._age / e._lifeTime;
              e._x = life * parentEffect.getCurrentWidth() - parentEffect.getHandleX();
            } else {
              switch (parentEffect._endBehavior) {
                case _Effect.EndKill:
                  if (e._x > parentEffect.getCurrentWidth() - parentEffect.getHandleX() || e._x < 0 - parentEffect.getHandleX()) e._dead = 2;
                  break;

                case _Effect.EndLoopAround:
                  if (e._x > parentEffect.getCurrentWidth() - parentEffect.getHandleX()) {
                    e._x = -parentEffect.getHandleX();
                    e.miniUpdate();
                    e._oldX = e._x;
                    e._oldWX = e._wx;
                    e._oldWY = e._wy;
                  } else if (e._x < 0 - parentEffect.getHandleX()) {
                    e._x = parentEffect.getCurrentWidth() - parentEffect.getHandleX();
                    e.miniUpdate();
                    e._oldX = e._x;
                    e._oldWX = e._wx;
                    e._oldWY = e._wy;
                  }

                  break;
              }
            }

        }
      } else {
        if (!this._bypassDirectionvariation) {
          var dv = e._directionVariation * this.getEmitterDirectionVariationOt(e._age, e._lifeTime);
          e._timeTracker += _EffectsLibrary2.default.getUpdateTime();

          if (e._timeTracker > _EffectsLibrary2.default.motionVariationInterval) {
            e._randomDirection += _EffectsLibrary2.default.maxDirectionVariation * (0, _Utils.randomBetween)(-dv, dv);
            e._randomSpeed += _EffectsLibrary2.default.maxVelocityVariation * (0, _Utils.randomBetween)(-dv, dv);
            e._timeTracker = 0;
          }
        }

        e._direction = e._emissionAngle + this.getEmitterDirection(e._age, e._lifeTime) + e._randomDirection;
      } // size changes


      if (!this._bypassScaleX) {
        e._scaleX = this.getEmitterScaleX(e._age, e._lifeTime) * e._gSizeX * e._width / this._image.getWidth();
      }

      if (this._uniform) {
        if (!this._bypassScaleX) e._scaleY = e._scaleX;
      } else {
        if (!this._bypassScaleY) {
          e._scaleY = this.getEmitterScaleY(e._age, e._lifeTime) * e._gSizeY * e._height / this._image.getHeight();
        }
      } // color changes


      if (!this._bypassColor) {
        if (!this._randomColor) {
          if (this._colorRepeat > 1) {
            e._rptAgeC += _EffectsLibrary2.default.getCurrentUpdateTime() * this._colorRepeat;
            e._red = this.getEmitterR(e._rptAgeC, e._lifeTime);
            e._green = this.getEmitterG(e._rptAgeC, e._lifeTime);
            e._blue = this.getEmitterB(e._rptAgeC, e._lifeTime);

            if (e._rptAgeC > e._lifeTime && e._cCycles < this._colorRepeat) {
              e._rptAgeC -= e._lifeTime;
              ++e._cCycles;
            }
          } else {
            e._red = this.getEmitterR(e._age, e._lifeTime);
            e._green = this.getEmitterG(e._age, e._lifeTime);
            e._blue = this.getEmitterB(e._age, e._lifeTime);
          }
        }
      } // animation


      if (!this._bypassFramerate) e._framerate = this.getEmitterFramerate(e._age, e._lifeTime) * this._animationDirection; // speed changes

      if (!this._bypassSpeed) {
        e._speed = this.getEmitterVelocity(e._age, e._lifeTime) * e._baseSpeed * this.getEmitterGlobalVelocity(parentEffect.getCurrentEffectFrame());
        e._speed += e._randomSpeed;
      } else {
        e._speed = e._randomSpeed;
      } // stretch


      if (!this._bypassStretch) {
        if (!this._bypassWeight && !parentEffect.isBypassWeight()) {
          if (e._speed !== 0) {
            e._speedVec.x = e._speedVec.x / _EffectsLibrary2.default.getCurrentUpdateTime();
            e._speedVec.y = e._speedVec.y / _EffectsLibrary2.default.getCurrentUpdateTime() - e._gravity;
          } else {
            e._speedVec.x = 0;
            e._speedVec.y = -e._gravity;
          }

          if (this._uniform) e._scaleY = this.getEmitterScaleX(e._age, e._lifeTime) * e._gSizeX * (e._width + Math.abs(e._speed) * this.getEmitterStretch(e._age, e._lifeTime) * parentEffect.getCurrentStretch()) / this._image.getWidth();else e._scaleY = this.getEmitterScaleY(e._age, e._lifeTime) * e._gSizeY * (e._height + Math.abs(e._speed) * this.getEmitterStretch(e._age, e._lifeTime) * parentEffect.getCurrentStretch()) / this._image.getHeight();
        } else {
          if (this._uniform) e._scaleY = this.getEmitterScaleX(e._age, e._lifeTime) * e._gSizeX * (e._width + Math.abs(e._speed) * this.getEmitterStretch(e._age, e._lifeTime) * parentEffect.getCurrentStretch()) / this._image.getWidth();else e._scaleY = this.getEmitterScaleY(e._age, e._lifeTime) * e._gSizeY * (e._height + Math.abs(e._speed) * this.getEmitterStretch(e._age, e._lifeTime) * parentEffect.getCurrentStretch()) / this._image.getHeight();
        }

        if (e._scaleY < e._scaleX) e._scaleY = e._scaleX;
      } // weight changes


      if (!this._bypassWeight) e._weight = this.getEmitterWeight(e._age, e._lifeTime) * e._baseWeight;
    }
  }, {
    key: "randomizeR",
    value: function randomizeR(e, randomAge) {
      return this._cR.getOt(randomAge, e.getLifeTime(), false);
    }
  }, {
    key: "randomizeG",
    value: function randomizeG(e, randomAge) {
      return this._cG.getOt(randomAge, e.getLifeTime(), false);
    }
  }, {
    key: "randomizeB",
    value: function randomizeB(e, randomAge) {
      return this._cB.getOt(randomAge, e.getLifeTime(), false);
    }
  }, {
    key: "drawCurrentFrame",
    value: function drawCurrentFrame(x
    /*= 0*/
    , y
    /*= 0*/
    , w
    /*= 128.0*/
    , h
    /*= 128.0*/
    ) {
      if (this._image) {
        /*
        SetAlpha(1.0);
        SetBlend(this._blendMode);
        SetImageHandle(this._image.GetImage(), 0, 0);
        SetColor(255, 255, 255);
        SetScale(w / _image.GetWidth(), _image.GetHeight());
        _image.Draw(x, y, _frame);
        */
      }
    }
  }, {
    key: "compileAll",
    value: function compileAll() {
      // base
      this._cLife.compile();

      this._cLifeVariation.compile();

      this._cAmount.compile();

      this._cSizeX.compile();

      this._cSizeY.compile();

      this._cBaseSpeed.compile();

      this._cBaseWeight.compile();

      this._cBaseSpin.compile();

      this._cEmissionAngle.compile();

      this._cEmissionRange.compile();

      this._cSplatter.compile();

      this._cVelVariation.compile();

      this._cWeightVariation.compile();

      this._cAmountVariation.compile();

      this._cSizeXVariation.compile();

      this._cSizeYVariation.compile();

      this._cSpinVariation.compile();

      this._cDirectionVariation.compile(); // over lifetime


      var longestLife = this.getLongestLife();

      this._cAlpha.compileOT(longestLife);

      this._cR.compileOT(longestLife);

      this._cG.compileOT(longestLife);

      this._cB.compileOT(longestLife);

      this._cScaleX.compileOT(longestLife);

      this._cScaleY.compileOT(longestLife);

      this._cSpin.compileOT(longestLife);

      this._cVelocity.compileOT(longestLife);

      this._cWeight.compileOT(longestLife);

      this._cDirection.compileOT(longestLife);

      this._cDirectionVariationOT.compileOT(longestLife);

      this._cFramerate.compileOT(longestLife);

      this._cStretch.compileOT(longestLife); // global adjusters


      this._cGlobalVelocity.compile();

      for (var i = 0; i < this._effects.length; i++) {
        this._effects[i].compileAll();
      }

      this.analyseEmitter();
    }
  }, {
    key: "compileQuick",
    value: function compileQuick() {
      var longestLife = this.getLongestLife();

      this._cAlpha.clear(1);

      this._cAlpha.setCompiled(0, this.getEmitterAlpha(0, longestLife));

      this._cR.clear(1);

      this._cG.clear(1);

      this._cB.clear(1);

      this._cR.setCompiled(0, this.getEmitterR(0, longestLife));

      this._cG.setCompiled(0, this.getEmitterG(0, longestLife));

      this._cB.setCompiled(0, this.getEmitterB(0, longestLife));

      this._cScaleX.clear(1);

      this._cScaleY.clear(1);

      this._cScaleX.setCompiled(0, this.getEmitterScaleX(0, longestLife));

      this._cScaleY.setCompiled(0, this.getEmitterScaleY(0, longestLife));

      this._cVelocity.clear(1);

      this._cVelocity.setCompiled(0, this.getEmitterVelocity(0, longestLife));

      this._cWeight.clear(1);

      this._cWeight.setCompiled(0, this.getEmitterWeight(0, longestLife));

      this._cDirection.clear(1);

      this._cDirection.setCompiled(0, this.getEmitterDirection(0, longestLife));

      this._cDirectionVariationOT.clear(1);

      this._cDirectionVariationOT.setCompiled(0, this.getEmitterDirectionVariationOT(0, longestLife));

      this._cFramerate.clear(1);

      this._cFramerate.setCompiled(0, this.getEmitterFramerate(0, longestLife));

      this._cStretch.clear(1);

      this._cStretch.setCompiled(0, this.getEmitterStretch(0, longestLife));

      this._cSplatter.clear(1);

      this._cSplatter.setCompiled(0, this.getEmitterSplatter(0));
    }
  }, {
    key: "analyseEmitter",
    value: function analyseEmitter() {
      this.resetBypassers();
      if (!this._cLifeVariation.getLastFrame() && !this.getEmitterLifeVariation(0)) this._bypassLifeVariation = true;
      if (!this.getEmitterStretch(0, 1.0)) this._bypassStretch = true;
      if (!this._cFramerate.getLastFrame() && !this.getEmitterSplatter(0)) this._bypassFramerate = true;
      if (!this._cSplatter.getLastFrame() && !this._cSplatter.get(0)) this._bypassSplatter = true;
      if (!this._cBaseWeight.getLastFrame() && !this._cWeightVariation.getLastFrame() && !this.getEmitterBaseWeight(0) && !this.getEmitterWeightVariation(0)) this._bypassWeight = true;
      if (!this._cWeight.getLastFrame() && !this._cWeight.get(0)) this._bypassWeight = true;
      if (!this._cBaseSpeed.getLastFrame() && !this._cVelVariation.getLastFrame() && !this.getEmitterBaseSpeed(0) && !this.getEmitterVelVariation(0)) this._bypassSpeed = true;
      if (!this._cBaseSpin.getLastFrame() && !this._cSpinVariation.getLastFrame() && !this.getEmitterBaseSpin(0) && !this.getEmitterSpinVariation(0)) this._bypassSpin = true;
      if (!this._cDirectionVariation.getLastFrame() && !this.getEmitterDirectionVariation(0)) this._bypassDirectionvariation = true;

      if (this._cR.getAttributesCount() <= 1) {
        this._bRed = this.getEmitterR(0, 1.0) !== 0;
        this._bGreen = this.getEmitterG(0, 1.0) !== 0;
        this._bBlue = this.getEmitterB(0, 1.0) !== 0;
        this._bypassColor = true;
      }

      if (this._cScaleX.getAttributesCount() <= 1) this._bypassScaleX = true;
      if (this._cScaleY.getAttributesCount() <= 1) this._bypassScaleY = true;
    }
  }, {
    key: "resetBypassers",
    value: function resetBypassers() {
      this._bypassWeight = false;
      this._bypassSpeed = false;
      this._bypassSpin = false;
      this._bypassDirectionvariation = false;
      this._bypassColor = false;
      this._bRed = false;
      this._bGreen = false;
      this._bBlue = false;
      this._bypassScaleX = false;
      this._bypassScaleY = false;
      this._bypassLifeVariation = false;
      this._bypassFramerate = false;
      this._bypassStretch = false;
      this._bypassSplatter = false;
    }
  }, {
    key: "getLongestLife",
    value: function getLongestLife() {
      var longestLife = (this._cLifeVariation.getMaxValue() + this._cLife.getMaxValue()) * this._parentEffect.getLifeMaxValue();

      return longestLife; // No idea what units we're supposed to be using here
      // return this._parentEffect.GetLifeMaxValue();
    }
  }, {
    key: "getEmitterLife",
    value: function getEmitterLife(frame) {
      return this._cLife.get(frame);
    }
  }, {
    key: "getEmitterLifeVariation",
    value: function getEmitterLifeVariation(frame) {
      return this._cLifeVariation.get(frame);
    }
  }, {
    key: "getEmitterAmount",
    value: function getEmitterAmount(frame) {
      return this._cAmount.get(frame);
    }
  }, {
    key: "getEmitterSizeX",
    value: function getEmitterSizeX(frame) {
      return this._cSizeX.get(frame);
    }
  }, {
    key: "getEmitterSizeY",
    value: function getEmitterSizeY(frame) {
      return this._cSizeY.get(frame);
    }
  }, {
    key: "getEmitterBaseSpeed",
    value: function getEmitterBaseSpeed(frame) {
      return this._cBaseSpeed.get(frame);
    }
  }, {
    key: "getEmitterBaseWeight",
    value: function getEmitterBaseWeight(frame) {
      return this._cBaseWeight.get(frame);
    }
  }, {
    key: "getEmitterBaseSpin",
    value: function getEmitterBaseSpin(frame) {
      return this._cBaseSpin.get(frame);
    }
  }, {
    key: "getEmitterEmissionAngle",
    value: function getEmitterEmissionAngle(frame) {
      return this._cEmissionAngle.get(frame);
    }
  }, {
    key: "getEmitterEmissionRange",
    value: function getEmitterEmissionRange(frame) {
      return this._cEmissionRange.get(frame);
    }
  }, {
    key: "getEmitterSplatter",
    value: function getEmitterSplatter(frame) {
      return this._cSplatter.get(frame);
    }
  }, {
    key: "getEmitterVelVariation",
    value: function getEmitterVelVariation(frame) {
      return this._cVelVariation.get(frame);
    }
  }, {
    key: "getEmitterWeightVariation",
    value: function getEmitterWeightVariation(frame) {
      return this._cWeightVariation.get(frame);
    }
  }, {
    key: "getEmitterAmountVariation",
    value: function getEmitterAmountVariation(frame) {
      return this._cAmountVariation.get(frame);
    }
  }, {
    key: "getEmitterSizeXVariation",
    value: function getEmitterSizeXVariation(frame) {
      return this._cSizeXVariation.get(frame);
    }
  }, {
    key: "getEmitterSizeYVariation",
    value: function getEmitterSizeYVariation(frame) {
      return this._cSizeYVariation.get(frame);
    }
  }, {
    key: "getEmitterSpinVariation",
    value: function getEmitterSpinVariation(frame) {
      return this._cSpinVariation.get(frame);
    }
  }, {
    key: "getEmitterDirectionVariation",
    value: function getEmitterDirectionVariation(frame) {
      return this._cDirectionVariation.get(frame);
    }
  }, {
    key: "getEmitterAlpha",
    value: function getEmitterAlpha(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cAlpha.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterR",
    value: function getEmitterR(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cR.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterG",
    value: function getEmitterG(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cG.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterB",
    value: function getEmitterB(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cB.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterScaleX",
    value: function getEmitterScaleX(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cScaleX.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterScaleY",
    value: function getEmitterScaleY(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cScaleY.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterSpin",
    value: function getEmitterSpin(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cSpin.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterVelocity",
    value: function getEmitterVelocity(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cVelocity.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterWeight",
    value: function getEmitterWeight(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cWeight.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterDirection",
    value: function getEmitterDirection(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cDirection.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterDirectionVariationOt",
    value: function getEmitterDirectionVariationOt(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cDirectionVariationOT.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterFramerate",
    value: function getEmitterFramerate(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cFramerate.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterStretch",
    value: function getEmitterStretch(age) {
      var lifetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._cStretch.getOt(age, lifetime);
    }
  }, {
    key: "getEmitterGlobalVelocity",
    value: function getEmitterGlobalVelocity(frame) {
      return this._cGlobalVelocity.get(frame);
    }
  }, {
    key: "getEffects",
    value: function getEffects() {
      return this._effects;
    }
  }, {
    key: "isDying",
    value: function isDying() {
      return this._dying;
    }
  }, {
    key: "setPath",
    value: function setPath(path) {
      this._path = path;
    }
  }, {
    key: "getImages",
    value: function getImages(images) {
      if (this._image) images[this._image._index] = this._image;

      for (var i = 0; i < this._effects.length; i++) {
        this._effects[i].getImages(images);
      }
    }
  }]);

  return Emitter;
}(_Entity3.default);

exports.default = Emitter;