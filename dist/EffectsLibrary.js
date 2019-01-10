"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AnimImage = require("./AnimImage");

var _AnimImage2 = _interopRequireDefault(_AnimImage);

var _Effect = require("./Effect");

var _Effect2 = _interopRequireDefault(_Effect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var instance = undefined;

var EffectsLibrary =
/*#__PURE__*/
function () {
  //
  function EffectsLibrary() {
    _classCallCheck(this, EffectsLibrary);

    _defineProperty(this, "_lookupFrequency", void 0);

    _defineProperty(this, "_updateTime", void 0);

    _defineProperty(this, "_lookupFrequencyOverTime", void 0);

    _defineProperty(this, "_updateFrequency", void 0);

    // if (!EffectsLibrary.instance) {
    //   EffectsLibrary.instance = this;
    // }
    // return EffectsLibrary.instance;
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  _createClass(EffectsLibrary, [{
    key: "init",
    value: function init() {
      this.setUpdateFrequency(30.0);
      this._lookupFrequency = this._updateTime;
      this._lookupFrequencyOverTime = 1.0;
      this.clearAll();
    }
  }, {
    key: "load",
    value: function load(xml) {
      //  console.log(xml);
      // Only allow loading one library
      this.clearAll();
      var shapes = xml.getElementsByTagName("SHAPES")[0];
      shapes = shapes.getElementsByTagName("IMAGE");

      for (var i = 0; i < shapes.length; i++) {
        // console.log(shapes[i].attributes.getNamedItem("URL").nodeValue);
        var img = new _AnimImage2.default();
        img.loadFromXML(shapes[i]);

        this._shapeList.push(img);
      } // Traverse top down


      this.m_currentFolder = null;
      this.loadEffectElements(xml.getElementsByTagName("EFFECTS")[0].children);
    }
  }, {
    key: "loadEffectElements",
    value: function loadEffectElements(effects) {
      for (var i = 0; i < effects.length; i++) {
        if (effects[i].tagName === "FOLDER") {
          this.loadEffectElements(effects[i].children);
        } else if (effects[i].tagName === "EFFECT") {
          var e = new _Effect2.default();
          e.loadFromXML(effects[i]);
          this.addEffect(e);
        } //console.log(effects[i].tagName);
        //console.log(effects[i].attributes.getNamedItem("NAME").nodeValue);

      }
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      this._name = "";
      this._effects = []; // indexed by name

      this._emitters = []; // indexed by name

      this._shapeList = [];
    }
  }, {
    key: "getShapes",
    value: function getShapes() {
      return this._shapeList;
    }
  }, {
    key: "getImage",
    value: function getImage(index) {
      return this._shapeList[index];
    }
  }, {
    key: "getEffect",
    value: function getEffect(name) {
      return this._effects[name];
    }
  }, {
    key: "getEmitter",
    value: function getEmitter(name) {
      return this._emitters[name];
    }
  }, {
    key: "addEffect",
    value: function addEffect(e) {
      var name = e.getPath();
      this._effects[name] = e;
      var emitters = e.getChildren();

      for (var i = 0; i < e.emitterCount(); i++) {
        this.addEmitter(emitters[i]);
      }
    }
  }, {
    key: "addEmitter",
    value: function addEmitter(e) {
      var name = e.getPath();
      this._emitters[name] = e;
      var effects = e.getEffects();

      for (var i = 0; i < effects.length; i++) {
        this.addEffect(effects[i]);
      }
    }
  }, {
    key: "setUpdateFrequency",
    value: function setUpdateFrequency(freq) {
      this._updateFrequency = freq; //  fps

      this._updateTime = 1000.0 / this._updateFrequency;
      this._currentUpdateTime = this._updateFrequency;
    }
  }, {
    key: "setLookupFrequency",
    value: function setLookupFrequency(freq) {
      this._lookupFrequency = freq;
    }
  }, {
    key: "setLookupFrequencyOverTime",
    value: function setLookupFrequencyOverTime(freq) {
      this._lookupFrequencyOverTime = freq;
    }
  }, {
    key: "getUpdateFrequency",
    value: function getUpdateFrequency() {
      return this._updateFrequency;
    }
  }, {
    key: "getUpdateTime",
    value: function getUpdateTime() {
      return this._updateTime;
    }
  }, {
    key: "getCurrentUpdateTime",
    value: function getCurrentUpdateTime() {
      return this._currentUpdateTime;
    }
  }, {
    key: "getLookupFrequency",
    value: function getLookupFrequency() {
      return this._lookupFrequency;
    }
  }, {
    key: "getLookupFrequencyOverTime",
    value: function getLookupFrequencyOverTime() {
      return this._lookupFrequencyOverTime;
    }
  }]);

  return EffectsLibrary;
}(); // let instance = new EffectsLibrary();
// Object.freeze(instance);


_defineProperty(EffectsLibrary, "c_particleLimit", 5000);

_defineProperty(EffectsLibrary, "globalPercentMin", 0);

_defineProperty(EffectsLibrary, "globalPercentMax", 20.0);

_defineProperty(EffectsLibrary, "globalPercentSteps", 100.0);

_defineProperty(EffectsLibrary, "globalPercentVMin", 0);

_defineProperty(EffectsLibrary, "globalPercentVMax", 10.0);

_defineProperty(EffectsLibrary, "globalPercentVSteps", 200.0);

_defineProperty(EffectsLibrary, "angleMin", 0);

_defineProperty(EffectsLibrary, "angleMax", 1080.0);

_defineProperty(EffectsLibrary, "angleSteps", 54.0);

_defineProperty(EffectsLibrary, "emissionRangeMin", 0);

_defineProperty(EffectsLibrary, "emissionRangeMax", 180.0);

_defineProperty(EffectsLibrary, "emissionRangeSteps", 30.0);

_defineProperty(EffectsLibrary, "dimensionsMin", 0);

_defineProperty(EffectsLibrary, "dimensionsMax", 200.0);

_defineProperty(EffectsLibrary, "dimensionsSteps", 40.0);

_defineProperty(EffectsLibrary, "lifeMin", 0);

_defineProperty(EffectsLibrary, "lifeMax", 100000.0);

_defineProperty(EffectsLibrary, "lifeSteps", 200.0);

_defineProperty(EffectsLibrary, "amountMin", 0);

_defineProperty(EffectsLibrary, "amountMax", 2000);

_defineProperty(EffectsLibrary, "amountSteps", 100);

_defineProperty(EffectsLibrary, "velocityMin", 0);

_defineProperty(EffectsLibrary, "velocityMax", 10000.0);

_defineProperty(EffectsLibrary, "velocitySteps", 100.0);

_defineProperty(EffectsLibrary, "velocityOverTimeMin", -20.0);

_defineProperty(EffectsLibrary, "velocityOverTimeMax", 20.0);

_defineProperty(EffectsLibrary, "velocityOverTimeSteps", 200);

_defineProperty(EffectsLibrary, "weightMin", -2500.0);

_defineProperty(EffectsLibrary, "weightMax", 2500.0);

_defineProperty(EffectsLibrary, "weightSteps", 200.0);

_defineProperty(EffectsLibrary, "weightVariationMin", 0);

_defineProperty(EffectsLibrary, "weightVariationMax", 2500.0);

_defineProperty(EffectsLibrary, "weightVariationSteps", 250.0);

_defineProperty(EffectsLibrary, "spinMin", -2000.0);

_defineProperty(EffectsLibrary, "spinMax", 2000.0);

_defineProperty(EffectsLibrary, "spinSteps", 100.0);

_defineProperty(EffectsLibrary, "spinVariationMin", 0);

_defineProperty(EffectsLibrary, "spinVariationMax", 2000.0);

_defineProperty(EffectsLibrary, "spinVariationSteps", 100.0);

_defineProperty(EffectsLibrary, "spinOverTimeMin", -20.0);

_defineProperty(EffectsLibrary, "spinOverTimeMax", 20.0);

_defineProperty(EffectsLibrary, "spinOverTimeSteps", 200.0);

_defineProperty(EffectsLibrary, "directionOverTimeMin", 0);

_defineProperty(EffectsLibrary, "directionOverTimeMax", 4320.0);

_defineProperty(EffectsLibrary, "directionOverTimeSteps", 216.0);

_defineProperty(EffectsLibrary, "framerateMin", 0);

_defineProperty(EffectsLibrary, "framerateMax", 200.0);

_defineProperty(EffectsLibrary, "framerateSteps", 100.0);

_defineProperty(EffectsLibrary, "maxDirectionVariation", 22.5);

_defineProperty(EffectsLibrary, "maxVelocityVariation", 30.0);

_defineProperty(EffectsLibrary, "motionVariationInterval", 30);

exports.default = instance;