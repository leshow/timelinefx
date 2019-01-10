"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Utils = require("./Utils");

var _EffectsLibrary = require("./EffectsLibrary");

var _EffectsLibrary2 = _interopRequireDefault(_EffectsLibrary);

var _Particle = require("./Particle");

var _Particle2 = _interopRequireDefault(_Particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ParticleManager =
/*#__PURE__*/
function () {
  function ParticleManager(drawSprite) {
    var particles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ParticleManager.c_particleLimit;
    var layers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    _classCallCheck(this, ParticleManager);

    _defineProperty(this, "_drawSprite", void 0);

    this._drawSprite = drawSprite;
    this._effectLayers = layers;
    this._originX = 0;
    this._originY = 0;
    this._originZ = 1.0;
    this._oldOriginX = 0;
    this._oldOriginY = 0;
    this._oldOriginZ = 1.0;
    this._angle = 0;
    this._oldAngle = 0;
    this._vpW = 0;
    this._vpH = 0;
    this._vpX = 0;
    this._vpY = 0;
    this._centerX = 0;
    this._centerY = 0;
    this._angleTweened = 0;
    this._globalAmountScale = 1.0;
    this._camtx = 0;
    this._camty = 0;
    this._camtz = 0;
    this._spawningAllowed = true;
    this._testCount = 0;
    this._paused = false;
    this._currentTime = 0;
    this._currentTick = 0;
    this._idleTimeLimit = 100;
    this._renderCount = 0;
    this._currentTween = 0;
    this._effectLayers = layers;
    this._inUseCount = 0;
    this._inUse = [];
    this._effects = [];

    for (var el = 0; el < layers; ++el) {
      this._inUse[el] = [];
      this._effects[el] = []; // Seems ridiculous

      for (var i = 0; i < 10; ++i) {
        this._inUse[el][i] = [];
      }
    }

    this._unused = [];

    for (var c = 0; c < particles; ++c) {
      var p = new _Particle2.default();
      p.setOKtoRender(false);

      this._unused.push(p);
    }
  }

  _createClass(ParticleManager, [{
    key: "update",
    value: function update() {
      if (!this._paused) {
        this._currentTime += _EffectsLibrary2.default.getUpdateTime();
        this._currentTick++;

        for (var i = 0; i < this._effectLayers; i++) {
          var list = this._effects[i];

          for (var j = 0; j < list.length; j++) {
            if (!list[j].update()) {
              list.splice(j, 1);
              j--;
            }
          }
        }

        this._oldOriginX = this._originX;
        this._oldOriginY = this._originY;
        this._oldOriginZ = this._originZ;
      }
    }
  }, {
    key: "grabParticle",
    value: function grabParticle(effect, pool) {
      var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (this._unused.length > 0) {
        var p = this._unused.pop();

        p.setLayer(layer);
        p.setGroupParticles(pool);
        if (pool) effect.addInUse(layer, p);else this._inUse[effect.getEffectLayer()][layer].push(p);
        this._inUseCount++;
        return p;
      }

      return null;
    }
  }, {
    key: "releaseParticle",
    value: function releaseParticle(p) {
      if (this.onParticleKilledCB) this.onParticleKilledCB(p);
      this._inUseCount--;

      this._unused.push(p);

      if (!p.isGroupParticles()) {
        var pList = this._inUse[p.getEffectLayer()][p.getLayer()];

        (0, _Utils.removeFromList)(pList, p);
      }
    }
  }, {
    key: "drawParticles",
    value: function drawParticles() {
      var tween = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;
      var layer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      // tween origin
      this._currentTween = tween;
      this._camtx = -(0, _Utils.lerp)(this._oldOriginX, this._originX, tween);
      this._camty = -(0, _Utils.lerp)(this._oldOriginY, this._originY, tween);
      this._camtz = (0, _Utils.lerp)(this._oldOriginZ, this._originZ, tween);

      if (this._angle !== 0) {
        this._angleTweened = (0, _Utils.lerp)(_oldAngle, _angle, tween);
        var a = this._angleTweened / 180.0 * M_PI; //  this._matrix.Set(cos(a), sin(a), -sin(a), cos(a));  // CHECK
      }

      var layers = 0;
      var startLayer = 0;

      if (layer == -1 || layer >= this._effectLayers) {
        layers = this._effectLayers - 1;
      } else {
        layers = layer;
        startLayer = layer;
      }

      for (var el = startLayer; el <= layers; ++el) {
        for (var i = 0; i < 10; ++i // wtf
        ) {
          var plist = this._inUse[el][i];

          for (var j = 0; j < plist.length; j++) {
            this.drawParticle(plist[j]);
          }
        }
      }

      this.drawEffects();
    }
  }, {
    key: "drawBoundingBoxes",
    value: function drawBoundingBoxes() {
      for (var el = 0; el < this._effectLayers; ++el) {
        var list = this._effects[el];

        for (var j = 0; j < list.length; j++) {
          list[j].drawBoundingBox();
        }
      }
    }
  }, {
    key: "setOrigin",
    value: function setOrigin(x, y) {
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;
      this.setOriginX(x);
      this.setOriginY(y);
      this.setOriginZ(z);
    }
  }, {
    key: "setOriginX",
    value: function setOriginX(x) {
      this._oldOriginX = this._originX;
      this._originX = x;
    }
  }, {
    key: "setOriginY",
    value: function setOriginY(y) {
      this._oldOriginY = this._originY;
      this._originY = y;
    }
  }, {
    key: "setOriginZ",
    value: function setOriginZ(z) {
      this._oldOriginZ = this._originZ;
      this._originZ = z;
    }
  }, {
    key: "setAngle",
    value: function setAngle(angle) {
      this._oldAngle = this._angle;
      this._angle = angle;
    }
  }, {
    key: "setScreenSize",
    value: function setScreenSize(w, h) {
      this._vpW = w;
      this._vpH = h;
      this._centerX = this._vpW / 2;
      this._centerY = this._vpH / 2;
    }
  }, {
    key: "setScreenPosition",
    value: function setScreenPosition(x, y) {
      this._vpX = x;
      this._vpY = y;
    }
  }, {
    key: "setIdleTimeLimit",
    value: function setIdleTimeLimit(limit) {
      this._idleTimeLimit = limit;
    }
  }, {
    key: "getOriginX",
    value: function getOriginX() {
      return this._originX;
    }
  }, {
    key: "getOriginY",
    value: function getOriginY() {
      return this._originY;
    }
  }, {
    key: "getOriginZ",
    value: function getOriginZ() {
      return this._originZ;
    }
  }, {
    key: "getGlobalAmountScale",
    value: function getGlobalAmountScale() {
      return this._globalAmountScale;
    }
  }, {
    key: "setGlobalAmountScale",
    value: function setGlobalAmountScale(scale) {
      this._globalAmountScale = scale;
    }
  }, {
    key: "getParticlesInUse",
    value: function getParticlesInUse() {
      return this._inUseCount;
    }
  }, {
    key: "getParticlesUnused",
    value: function getParticlesUnused() {
      return this._unused.length;
    }
  }, {
    key: "addPreLoadedEffect",
    value: function addPreLoadedEffect(e, frames) {
      var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      if (layer >= this._effectLayers) layer = 0;
      var tempTime = this._currentTime;
      this._currentTime -= frames * _EffectsLibrary2.default.getUpdateTime();
      e.changeDoB(this._currentTime);

      for (var i = 0; i < frames; ++i) {
        this._currentTime = (frames + 1) * _EffectsLibrary2.default.getUpdateTime();
        e.update();
        if (e.isDestroyed()) this.removeEffect(e);
      }

      this._currentTime = tempTime;
      e.setEffectLayer(layer);

      this._effects[layer].push(e);
    }
  }, {
    key: "addEffect",
    value: function addEffect(e) {
      var layer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (layer >= this._effectLayers) layer = 0;
      e.setEffectLayer(layer);

      this._effects[layer].push(e);
    }
  }, {
    key: "removeEffect",
    value: function removeEffect(e) {
      (0, _Utils.removeFromList)(this._effects[e.getEffectLayer()], e);
    }
  }, {
    key: "clearInUse",
    value: function clearInUse() {
      for (var el = 0; el < this._effectLayers; ++el) {
        for (var i = 0; i < 10; ++i) {
          var plist = this._inUse[el][i];

          for (var j = 0; j < plist.length; j++) {
            var p = plist[j];

            this._unused.push(p);

            this._inUseCount--;
            p.getEmitter().getParentEffect().removeInUse(p.getLayer(), p);
            p.reset();
          }

          this._inUse[el][i] = [];
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.clearAll();
      this.clearInUse();
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      for (var el = 0; el < this._effectLayers; ++el) {
        var elist = this._effects[el];

        for (var j = 0; j < elist.length; j++) {
          elist[j].destroy();
        }

        this._effects[el] = [];
      }
    }
  }, {
    key: "clearLayer",
    value: function clearLayer(layer) {
      var list = this._effects[layer];

      for (var i = 0; i < list.length; i++) {
        list[i].destroy();
      }

      this._effects[layer] = [];
    }
  }, {
    key: "releaseSingleParticles",
    value: function releaseSingleParticles() {
      for (var i = 0; i < this._inUse.length; i++) {
        var list = this._inUse[i];

        for (var j = 0; j < list.length; j++) {
          for (var k = 0; k < list[j].length; k++) {
            list[j][k].setReleaseSingleParticles(true);
          }
        }
      }
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      this._paused = !this._paused;
    }
  }, {
    key: "drawEffects",
    value: function drawEffects() {
      for (var el = 0; el < this._effects.length; ++el) {
        var elist = this._effects[el];

        for (var j = 0; j < elist.length; j++) {
          this.drawEffect(elist[j]);
        }
      }
    }
  }, {
    key: "drawEffect",
    value: function drawEffect(e) {
      for (var i = 0; i < 10; ++i) {
        // particle
        var plist = e.getParticles(i);

        for (var j = 0; j < plist.length; j++) {
          this.drawParticle(plist[j]); // effect

          var subeffects = plist[j].getChildren();

          for (var k = 0; k < subeffects.length; k++) {
            this.drawEffect(subeffects[k]);
          }
        }
      }
    }
  }, {
    key: "drawParticle",
    value: function drawParticle(p) {
      // p: Particle
      if (p.getAge() !== 0 || p.getEmitter().isSingleParticle()) {
        var px = (0, _Utils.lerp)(p.getOldWX(), p.getWX(), this._currentTween);
        var py = (0, _Utils.lerp)(p.getOldWY(), p.getWY(), this._currentTween);

        if (this._angle !== 0) {
          var rotVec = this._matrix.transformVector(new Vector2(px, py));

          px = rotVec.x * this._camtz + this._centerX + this._camtz * this._camtx;
          py = rotVec.y * this._camtz + this._centerY + this._camtz * this._camty;
        } else {
          px = px * this._camtz + this._centerX + this._camtz * this._camtx;
          py = py * this._camtz + this._centerY + this._camtz * this._camty;
        }

        var imageDiam = p.getImageDiameter();

        if (px > this._vpX - imageDiam && px < this._vpX + this._vpW + imageDiam && py > this._vpY - imageDiam && py < this._vpY + this._vpH + imageDiam) {
          if (p.getAvatar()) {
            var x, y;
            var sprite = p.getAvatar();

            if (p.getEmitter().isHandleCenter()) {
              x = sprite.getWidth() / 2.0;
              y = sprite.getHeight() / 2.0;
            } else {
              x = p.getHandleX();
              y = p.getHandleY();
            }

            var rotation;
            var tv = (0, _Utils.lerp)(p.getOldAngle(), p.getAngle(), this._currentTween);
            var tx = 0;

            if (p.getEmitter().isAngleRelative()) {
              if (Math.abs(p.getOldRelativeAngle() - p.getRelativeAngle()) > 180) tx = (0, _Utils.lerp)(p.getOldRelativeAngle() - 360, p.getRelativeAngle(), this._currentTween);else tx = (0, _Utils.lerp)(p.getOldRelativeAngle(), p.getRelativeAngle(), this._currentTween);
            }

            rotation = tv + tx + this._angleTweened;
            tx = (0, _Utils.lerp)(p.getOldScaleX(), p.getScaleX(), this._currentTween);
            var ty = (0, _Utils.lerp)(p.getOldScaleY(), p.getScaleY(), this._currentTween);
            var tz = (0, _Utils.lerp)(p.getOldZ(), p.getZ(), this._currentTween);
            var scaleX = tx * tz * this._camtz;
            var scaleY = ty * tz * this._camtz;
            var a = p.getEntityAlpha();
            var r = p.getRed();
            var g = p.getGreen();
            var b = p.getBlue();

            if (p.isAnimating()) {
              tv = (0, _Utils.lerp)(p.getOldCurrentFrame(), p.getCurrentFrame(), this._currentTween);

              if (tv < 0) {
                tv = p.getAvatar().getFramesCount() + (0, _Utils.fmod)(tv, p.getAvatar().getFramesCount());
                if (tv == p.getAvatar().getFramesCount()) tv = 0;
              } else {
                tv = (0, _Utils.fmod)(tv, p.getAvatar().getFramesCount());
              }
            } else {
              tv = p.getCurrentFrame();
            } // tidy with above


            tv = Math.round(tv) % p.getAvatar().getFramesCount();
            var blend = p.getEmitter().getBlendMode();

            this._drawSprite(p, sprite, px, py, tv, x, y, rotation, scaleX, scaleY, r, g, b, a, blend);
          }
        }
      }
    }
  }, {
    key: "getIdleTimeLimit",
    value: function getIdleTimeLimit() {
      return this._idleTimeLimit;
    }
  }, {
    key: "isSpawningAllowed",
    value: function isSpawningAllowed() {
      return this._spawningAllowed;
    }
  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this._currentTick * _EffectsLibrary2.default.getUpdateTime();
    }
  }]);

  return ParticleManager;
}();

_defineProperty(ParticleManager, "c_particleLimit", 5000);

exports.default = ParticleManager;