"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Blend = undefined;

var _Utils = require("./Utils");

var _Matrix = require("./Matrix2");

var _Matrix2 = _interopRequireDefault(_Matrix);

var _Vector = require("./Vector2");

var _Vector2 = _interopRequireDefault(_Vector);

var _EffectsLibrary = require("./EffectsLibrary");

var _EffectsLibrary2 = _interopRequireDefault(_EffectsLibrary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Blend = exports.Blend = {
  BMAlphaBlend: 3,
  BMLightBlend: 4 // check loading values are one of these

};
var g_defaultEntity = {
  _x: 0,
  _y: 0,
  _name: "",
  _oldX: 0,
  _oldY: 0,
  _wx: 0,
  _wy: 0,
  _oldWX: 0,
  _oldWY: 0,
  _z: 1.0,
  _oldZ: 1.0,
  _relative: true,
  _r: 0,
  _g: 0,
  _b: 0,
  _red: 255,
  _green: 255,
  _blue: 255,
  _oldRed: 255,
  _oldGreen: 255,
  _oldBlue: 255,
  _width: 0,
  _height: 0,
  _weight: 0,
  _gravity: 0,
  _baseWeight: 0,
  _oldWeight: 0,
  _scaleX: 1.0,
  _scaleY: 1.0,
  _sizeX: 1.0,
  _sizeY: 1.0,
  _oldScaleX: 1.0,
  _oldScaleY: 1.0,
  _speed: 0,
  _baseSpeed: 0,
  _oldSpeed: 0,
  _updateSpeed: true,
  _direction: 0,
  _directionLocked: false,
  _angle: 0,
  _oldAngle: 0,
  _relativeAngle: 0,
  _oldRelativeAngle: 0,
  _avatar: null,
  _frameOffset: 0,
  _framerate: 1.0,
  _currentFrame: 0,
  _oldCurrentFrame: 0,
  _animating: false,
  _animateOnce: false,
  _animAction: 0,
  _handleX: 0,
  _handleY: 0,
  _autoCenter: true,
  _okToRender: true,
  _dob: 0,
  _age: 0,
  _rptAgeA: 0,
  _rptAgeC: 0,
  _aCycles: 0,
  _cCycles: 0,
  _oldAge: 0,
  _dead: 0,
  _destroyed: false,
  _lifeTime: 0,
  _timediff: 0,
  _AABB_Calculate: true,
  _collisionXMin: 0,
  _collisionYMin: 0,
  _collisionXMax: 0,
  _collisionYMax: 0,
  _AABB_XMin: 0,
  _AABB_YMin: 0,
  _AABB_XMax: 0,
  _AABB_YMax: 0,
  _AABB_MaxWidth: 0,
  _AABB_MaxHeight: 0,
  _AABB_MinWidth: 0,
  _AABB_MinHeight: 0,
  _radiusCalculate: true,
  _imageRadius: 0,
  _entityRadius: 0,
  _imageDiameter: 0,
  _parent: null,
  _rootParent: null,
  _childrenOwner: true,
  _blendMode: Blend.BMAlphaBlend,
  _alpha: 1.0,
  _oldAlpha: 0,
  _runChildren: false,
  _pixelsPerSecond: 0
};

var Entity =
/*#__PURE__*/
function () {
  function Entity(other) {
    _classCallCheck(this, Entity);

    if (other) {
      for (var key in g_defaultEntity) {
        this[key] = other[key];
      }
    } else {
      for (var _key in g_defaultEntity) {
        this[_key] = g_defaultEntity[_key];
      }
    }

    this._matrix = new _Matrix2.default();
    this._speedVec = new _Vector2.default();
    this._children = [];
  }

  _createClass(Entity, [{
    key: "isDestroyed",
    value: function isDestroyed() {
      return this._destroyed;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this._name;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this._name = name;
    }
  }, {
    key: "setX",
    value: function setX(x) {
      this._x = x;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this._y = y;
    }
  }, {
    key: "setZ",
    value: function setZ(z) {
      this._z = z;
    }
  }, {
    key: "getX",
    value: function getX() {
      return this._x;
    }
  }, {
    key: "getY",
    value: function getY() {
      return this._y;
    }
  }, {
    key: "getZ",
    value: function getZ() {
      return this._z;
    }
  }, {
    key: "capture",
    value: function capture() {
      this._oldZ = this._z;
      this._oldWX = this._wx;
      this._oldWY = this._wy;
      this._oldX = this._x;
      this._oldY = this._y;
      this._oldAngle = this._angle;
      this._oldRelativeAngle = this._relativeAngle;
      this._oldScaleX = this._scaleX;
      this._oldScaleY = this._scaleY;
      this._oldCurrentFrame = this._currentFrame;
    }
  }, {
    key: "captureAll",
    value: function captureAll() {
      this.capture();

      for (var i = 0; i < this._children.length; i++) {
        this._children[i].capture();
      }
    }
  }, {
    key: "setOKtoRender",
    value: function setOKtoRender(ok) {
      this._okToRender = ok;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._parent = null;
      this._avatar = null;
      this._rootParent = null;
      this.clearChildren();
      this._destroyed = true;
    }
  }, {
    key: "removeChild",
    value: function removeChild(e) {
      (0, _Utils.removeFromList)(this._children, e);
      e._parent = null;
    }
  }, {
    key: "clearChildren",
    value: function clearChildren() {
      if (this._children) {
        for (var i = 0; i < this._children.length; i++) {
          this._children[i].destroy();
        }
      }

      this._children = [];
    }
  }, {
    key: "killChildren",
    value: function killChildren() {
      for (var i = 0; i < this._children.length; i++) {
        this._children[i].killChildren();

        this._children[i]._dead = true;
      }
    }
  }, {
    key: "getChildren",
    value: function getChildren() {
      return this._children;
    }
  }, {
    key: "update",
    value: function update() {
      var currentUpdateTime = _EffectsLibrary2.default.getCurrentUpdateTime(); // Update speed in pixels per second


      if (this._updateSpeed && this._speed) {
        this._pixelsPerSecond = this._speed / currentUpdateTime;
        this._speedVec.x = Math.sin(this._direction / 180.0 * _Utils.M_PI) * this._pixelsPerSecond;
        this._speedVec.y = Math.cos(this._direction / 180.0 * _Utils.M_PI) * this._pixelsPerSecond;
        this._x += this._speedVec.x * this._z;
        this._y -= this._speedVec.y * this._z;
      } // update the gravity


      if (this._weight !== 0) {
        this._gravity += this._weight / currentUpdateTime;
        this._y += this._gravity / currentUpdateTime * this._z;
      } // set the matrix if it is relative to the parent


      if (this._relative) {
        var radians = this._angle / 180 * _Utils.M_PI;

        this._matrix.set(Math.cos(radians), Math.sin(radians), -Math.sin(radians), Math.cos(radians));
      } // calculate where the entity is in the world


      if (this._parent && this._relative) {
        this._z = this._parent._z;

        this._matrix.transformSelf(this._parent._matrix);

        var rotVec = this._parent._matrix.transformVector(this._x, this._y);

        this._wx = this._parent._wx + rotVec.x * this._z;
        this._wy = this._parent._wy + rotVec.y * this._z;
        this._relativeAngle = this._parent._relativeAngle + this._angle;
      } else {
        // If parent setz(parent.z)
        this._wx = this._x;
        this._wy = this._y;
      }

      if (!this._parent) this._relativeAngle = this._angle; // update animation frame

      if (this._avatar && this._animating) {
        this._currentFrame += this._framerate / currentUpdateTime;

        if (this._animateOnce) {
          if (this._currentFrame > this._avatar.getFramesCount() - 1) {
            this._currentFrame = this._avatar.getFramesCount() - 1;
          } else if (this._currentFrame <= 0) {
            this._currentFrame = 0;
          }
        }
      } // update the Axis Aligned Bounding Box


      if (this._AABB_Calculate) this.updateBoundingBox(); // update the radius of influence

      if (this._radiusCalculate) this.updateEntityRadius(); // update the children

      this.updateChildren();
      return true;
    }
  }, {
    key: "updateChildren",
    value: function updateChildren() {
      for (var i = 0; i < this._children.length; i++) {
        if (!this._children[i].update()) {
          this._children.splice(i, 1);

          i--;
        }
      }
    }
  }, {
    key: "miniUpdate",
    value: function miniUpdate() {
      var radians = this._angle / 180.0 * _Utils.M_PI;

      if (isNaN(this._angle)) {
        console.log("MiniUpdate NaN");
      }

      this._matrix.set(Math.cos(radians), Math.sin(radians), -Math.sin(radians), Math.cos(radians));

      if (this._parent && this._relative) {
        this._z = this._parent._z;

        this._matrix.transformSelf(this._parent._matrix);

        var rotVec = this._parent._matrix.transformVector(this._x, this._y);

        this._wx = this._parent._wx + rotVec.x * this._z;
        this._wy = this._parent._wy + rotVec.y * this._z;
      } else {
        if (this._parent) this._z = this._parent._z;
        this._wx = this._x;
        this._wy = this._y;
      }
    }
  }, {
    key: "getChildCount",
    value: function getChildCount() {
      return this._children.length;
    }
  }, {
    key: "updateBoundingBox",
    value: function updateBoundingBox() {
      this._collisionXMin = this._AABB_MinWidth * this._scaleX * this._z;
      this._collisionYMin = this._AABB_MinHeight * this._scaleY * this._z;
      this._collisionXMax = this._AABB_MaxWidth * this._scaleX * this._z;
      this._collisionYMax = this._AABB_MaxHeight * this._scaleY * this._z;
      this._AABB_XMin = this._collisionXMin;
      this._AABB_YMin = this._collisionYMin;
      this._AABB_XMax = this._collisionXMax;
      this._AABB_YMax = this._collisionYMax;
      if (this._children.length === 0) this.updateParentBoundingBox();
    }
  }, {
    key: "updateEntityRadius",
    value: function updateEntityRadius() {
      if (this._autoCenter) {
        if (this._avatar) {
          var aMaxRadius = this._avatar.getMaxRadius();

          var aWidth = this._avatar.getWidth();

          var aHeight = this._avatar.getHeight();

          if (aMaxRadius !== 0) this._imageRadius = Math.max(aMaxRadius * this._scaleX * this._z, aMaxRadius * this._scaleY * this._z);else this._imageRadius = (0, _Utils.getDistance2D)(aWidth / 2.0 * this._scaleX * this._z, aHeight / 2.0 * this._scaleY * this._z, aWidth * this._scaleX * this._z, aHeight * this._scaleY * this._z);
        } else {
          this._imageRadius = 0;
        }
      } else {
        var _aMaxRadius = this._avatar.getMaxRadius();

        var _aWidth = this._avatar.getWidth();

        var _aHeight = this._avatar.getHeight();

        if (_aMaxRadius !== 0) this._imageRadius = (0, _Utils.getDistance2D)(this._handleX * this._scaleX * this._z, this._handleY * this._scaleY * this._z, _aWidth / 2.0 * this._scaleX * this._z, _aHeight / 2.0 * this._scaleY * this._z) + Math.max(_aMaxRadius * this._scaleX * this._z, _aMaxRadius * this._scaleY * this._z);else this._imageRadius = (0, _Utils.getDistance2D)(this._handleX * this._scaleX * this._z, this._handleY * this._scaleY * this._z, _aWidth * this._scaleX * this._z, _aHeight * this._scaleY * this._z);
      }

      this._entityRadius = this._imageRadius;
      this._imageDiameter = this._imageRadius * 2.0;
      if (this._rootParent) this.updateRootParentEntityRadius();
    }
  }, {
    key: "updateParentEntityRadius",
    value: function updateParentEntityRadius() {
      if (this._parent) {
        if (this._children.length > 0) this._parent._entityRadius += Math.max(0.0, (0, _Utils.getDistance2D)(this._wx, this._wy, this._parent._wx, this._parent._wy) + this._entityRadius - this._parent._entityRadius);else this._parent._entityRadius += Math.max(0.0, (0, _Utils.getDistance2D)(this._wx, this._wy, this._parent._wx, this._parent._wy) + this._imageRadius - this._parent._entityRadius); // DebugLog name + " - Radius: " + entity_Radius + " | Distance to Parent: " + getdistance(wx, wy, parent.wx, parent.wy)

        this._parent.updateParentEntityRadius();
      }
    }
  }, {
    key: "updateRootParentEntityRadius",
    value: function updateRootParentEntityRadius() {
      if (this._rootParent) {
        if (this._alpha !== 0) this._rootParent._entityRadius += Math.max(0.0, (0, _Utils.getDistance2D)(this._wx, this._wy, this._rootParent._wx, this._rootParent._wy) + this._imageRadius - this._rootParent._entityRadius); // DebugLog name + " - Radius: " + entity_Radius + " | Distance to Parent: " + getdistance(wx, wy, rootparent.wx, rootparent.wy)
      }
    }
  }, {
    key: "updateParentBoundingBox",
    value: function updateParentBoundingBox() {
      if (this._parent) {
        var parent = this._parent;
        parent._AABB_XMax += Math.max(0.0, this._wx - parent._wx + this._AABB_XMax - parent._AABB_XMax);
        parent._AABB_YMax += Math.max(0.0, this._wy - parent._wx + this._AABB_YMax - parent._AABB_YMax);
        parent._AABB_XMin += Math.max(0.0, this._wx - parent._wx + this._AABB_XMin - parent._AABB_XMin);
        parent._AABB_YMin += Math.max(0.0, this._wy - parent._wy + this._AABB_YMin - parent._AABB_YMin);
      }
    }
  }, {
    key: "assignRootParent",
    value: function assignRootParent(e) {
      if (this._parent) this._parent.assignRootParent(e);else e._rootParent = this;
    }
  }, {
    key: "setHandleX",
    value: function setHandleX(x) {
      this._handleX = x;
    }
  }, {
    key: "setHandleY",
    value: function setHandleY(y) {
      this._handleY = y;
    }
  }, {
    key: "setParent",
    value: function setParent(e) {
      e.addChild(this);
    }
  }, {
    key: "setRelative",
    value: function setRelative(value) {
      this._relative = value;
    }
  }, {
    key: "setEntityScale",
    value: function setEntityScale(sx, sy) {
      this._scaleX = sx;
      this._scaleY = sy;
    }
  }, {
    key: "setSpeed",
    value: function setSpeed(speed) {
      this._speed = speed;
    }
  }, {
    key: "getSpeed",
    value: function getSpeed() {
      return this._speed;
    }
  }, {
    key: "setBlendMode",
    value: function setBlendMode(mode) {
      this._blendMode = mode;
    }
  }, {
    key: "getCurrentFrame",
    value: function getCurrentFrame() {
      return this._currentFrame;
    }
  }, {
    key: "setCurrentFrame",
    value: function setCurrentFrame(frame) {
      this._currentFrame = frame;
    }
  }, {
    key: "addChild",
    value: function addChild(e) {
      this._children.push(e);

      e._parent = this;
      e._radiusCalculate = this._radiusCalculate;
      e.assignRootParent(e);
    }
  }, {
    key: "getMatrix",
    value: function getMatrix() {
      return this._matrix;
    }
  }, {
    key: "getWX",
    value: function getWX() {
      return this._wx;
    }
  }, {
    key: "getWY",
    value: function getWY() {
      return this._wy;
    }
  }, {
    key: "getRelativeAngle",
    value: function getRelativeAngle() {
      return this._relativeAngle;
    }
  }, {
    key: "setDoB",
    value: function setDoB(dob) {
      this._dob = dob;
    }
  }, {
    key: "getOldCurrentFrame",
    value: function getOldCurrentFrame() {
      return this._oldCurrentFrame;
    }
  }, {
    key: "setAvatar",
    value: function setAvatar(avatar) {
      this._avatar = avatar;
      this._AABB_MaxWidth = this._avatar.getWidth() * 0.5;
      this._AABB_MaxHeight = this._avatar.getHeight() * 0.5;
      this._AABB_MinWidth = this._avatar.getWidth() * -0.5;
      this._AABB_MinHeight = this._avatar.getHeight() * -0.5;
    }
  }, {
    key: "setAutocenter",
    value: function setAutocenter(value) {
      this._autoCenter = value;
    }
  }, {
    key: "getLifeTime",
    value: function getLifeTime() {
      return this._lifeTime;
    }
  }, {
    key: "setLifeTime",
    value: function setLifeTime(lifeTime) {
      this._lifeTime = lifeTime;
    }
  }, {
    key: "setSpeedVecX",
    value: function setSpeedVecX(x) {
      this._speedVec.x = x;
    }
  }, {
    key: "setSpeedVecY",
    value: function setSpeedVecY(y) {
      this._speedVec.y = y;
    }
  }, {
    key: "setBaseSpeed",
    value: function setBaseSpeed(speed) {
      this._baseSpeed = speed;
    }
  }, {
    key: "getBaseSpeed",
    value: function getBaseSpeed() {
      return this._baseSpeed;
    }
  }, {
    key: "setWidth",
    value: function setWidth(width) {
      this._width = width;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this._width;
    }
  }, {
    key: "setScaleX",
    value: function setScaleX(scaleX) {
      this._scaleX = scaleX;
    }
  }, {
    key: "setScaleY",
    value: function setScaleY(scaleY) {
      this._scaleY = scaleY;
    }
  }, {
    key: "getScaleX",
    value: function getScaleX() {
      return this._scaleX;
    }
  }, {
    key: "getScaleY",
    value: function getScaleY() {
      return this._scaleY;
    }
  }, {
    key: "setWidthHeightAABB",
    value: function setWidthHeightAABB(minWidth, minHeight, maxWidth, maxHeight) {
      this._AABB_MaxWidth = maxWidth;
      this._AABB_MaxHeight = maxHeight;
      this._AABB_MinWidth = minWidth;
      this._AABB_MinHeight = minHeight;
    }
  }, {
    key: "setDirectionLocked",
    value: function setDirectionLocked(value) {
      this._directionLocked = value;
    }
  }, {
    key: "isDirectionLocked",
    value: function isDirectionLocked() {
      return this._directionLocked;
    }
  }, {
    key: "getEntityDirection",
    value: function getEntityDirection() {
      return this._direction;
    }
  }, {
    key: "setEntityDirection",
    value: function setEntityDirection(direction) {
      if (isNaN(direction)) {
        console.log("SetEntityDirection NaN");
      }

      this._direction = direction;
    }
  }, {
    key: "setWeight",
    value: function setWeight(weight) {
      this._weight = weight;
    }
  }, {
    key: "getWeight",
    value: function getWeight() {
      return this._weight;
    }
  }, {
    key: "setBaseWeight",
    value: function setBaseWeight(weight) {
      this._baseWeight = weight;
    }
  }, {
    key: "getBaseWeight",
    value: function getBaseWeight() {
      return this._weight;
    }
  }, {
    key: "getRed",
    value: function getRed() {
      return this._red;
    }
  }, {
    key: "setRed",
    value: function setRed(r) {
      this._red = r;
    }
  }, {
    key: "getGreen",
    value: function getGreen() {
      return this._green;
    }
  }, {
    key: "setGreen",
    value: function setGreen(g) {
      this._green = g;
    }
  }, {
    key: "getBlue",
    value: function getBlue() {
      return this._blue;
    }
  }, {
    key: "setBlue",
    value: function setBlue(b) {
      this._blue = b;
    }
  }, {
    key: "getAge",
    value: function getAge() {
      return this._age;
    }
  }, {
    key: "setAge",
    value: function setAge(age) {
      this._age = age;
    }
  }, {
    key: "setEntityAlpha",
    value: function setEntityAlpha(alpha) {
      this._alpha = alpha;
    }
  }, {
    key: "getOldWX",
    value: function getOldWX() {
      return this._oldWX;
    }
  }, {
    key: "getOldWY",
    value: function getOldWY() {
      return this._oldWY;
    }
  }, {
    key: "getImageDiameter",
    value: function getImageDiameter() {
      return this._imageDiameter;
    }
  }, {
    key: "getOldAngle",
    value: function getOldAngle() {
      return this._oldAngle;
    }
  }, {
    key: "getOldRelativeAngle",
    value: function getOldRelativeAngle() {
      return this._oldRelativeAngle;
    }
  }, {
    key: "getAvatar",
    value: function getAvatar() {
      return this._avatar;
    }
  }, {
    key: "getHandleX",
    value: function getHandleX() {
      return this._handleX;
    }
  }, {
    key: "getHandleY",
    value: function getHandleY() {
      return this._handleY;
    }
  }, {
    key: "getBlendMode",
    value: function getBlendMode() {
      return this._blendMode;
    }
  }, {
    key: "getAngle",
    value: function getAngle() {
      return this._angle;
    }
  }, {
    key: "getOldScaleX",
    value: function getOldScaleX() {
      return this._oldScaleX;
    }
  }, {
    key: "getOldScaleY",
    value: function getOldScaleY() {
      return this._oldScaleY;
    }
  }, {
    key: "getOldZ",
    value: function getOldZ() {
      return this._oldZ;
    }
  }, {
    key: "setEntityColor",
    value: function setEntityColor(r, g, b) {
      this._red = r;
      this._green = g;
      this._blue = b;
    }
  }, {
    key: "getEntityAlpha",
    value: function getEntityAlpha() {
      return this._alpha;
    }
  }, {
    key: "getImageRadius",
    value: function getImageRadius() {
      return this._imageRadius;
    }
  }, {
    key: "getFramerate",
    value: function getFramerate() {
      return this._framerate;
    }
  }, {
    key: "setFramerate",
    value: function setFramerate(framerate) {
      this._framerate = framerate;
    }
  }, {
    key: "isAnimating",
    value: function isAnimating() {
      return this._animating;
    }
  }, {
    key: "setAnimating",
    value: function setAnimating(value) {
      this._animating = value;
    }
  }, {
    key: "isRelative",
    value: function isRelative() {
      return this._relative;
    }
  }, {
    key: "setWX",
    value: function setWX(wx) {
      this._wx = wx;
    }
  }, {
    key: "setWY",
    value: function setWY(wy) {
      this._wy = wy;
    }
  }, {
    key: "setAngle",
    value: function setAngle(degrees) {
      if (isNaN(degrees)) {
        console.log("SetAngle NaN");
      }

      this._angle = degrees;
    }
  }, {
    key: "setHeight",
    value: function setHeight(height) {
      this._height = height;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return this._height;
    }
  }, {
    key: "getParent",
    value: function getParent() {
      return this._parent;
    }
  }, {
    key: "move",
    value: function move(xamount, yamount) {
      this._x += xamount;
      this._y += yamount;
    }
  }]);

  return Entity;
}();

exports.default = Entity;