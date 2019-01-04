import { removeFromList, getDistance2D } from "./Utils";
import Matrix2 from "./Matrix2";
import Vector2 from "./Vector2";

const Blend = {
  BMAlphaBlend: 3,
  BMLightBlend: 4
  // check loading values are one of these
};

const g_defaultEntity = {
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

class Entity {
  constructor(other) {
    if (other) {
      for (let key in g_defaultEntity) this[key] = other[key];
    } else {
      for (let key in g_defaultEntity) this[key] = g_defaultEntity[key];
    }

    this._matrix = new Matrix2();
    this._speedVec = new Vector2();

    this._children = [];
  }

  isDestroyed() {
    return this._destroyed;
  }
  getName() {
    return this._name;
  }
  setName(name) {
    this._name = name;
  }

  setX(x) {
    this._x = x;
  }

  setY(y) {
    this._y = y;
  }

  setZ(z) {
    this._z = z;
  }

  getX() {
    return this._x;
  }

  getY() {
    return this._y;
  }
  getZ() {
    return this._z;
  }

  capture() {
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

  captureAll() {
    this.capture();
    for (let i = 0; i < this._children.length; i++) {
      this._children[i].capture();
    }
  }

  setOKtoRender(ok) {
    this._okToRender = ok;
  }

  destroy() {
    this._parent = null;
    this._avatar = null;
    this._rootParent = null;
    this.clearChildren();
    this._destroyed = true;
  }

  removeChild(e) {
    removeFromList(this._children, e);
    e._parent = null;
  }

  clearChildren() {
    if (this._children) {
      for (let i = 0; i < this._children.length; i++) {
        this._children[i].destroy();
      }
    }
    this._children = [];
  }

  killChildren() {
    for (let i = 0; i < this._children.length; i++) {
      this._children[i].killChildren();
      this._children[i]._dead = true;
    }
  }

  getChildren() {
    return this._children;
  }

  update() {
    let currentUpdateTime = EffectsLibrary.getCurrentUpdateTime();

    // Update speed in pixels per second
    if (this._updateSpeed && this._speed) {
      this._pixelsPerSecond = this._speed / currentUpdateTime;
      this._speedVec.x =
        Math.sin((this._direction / 180.0) * M_PI) * this._pixelsPerSecond;
      this._speedVec.y =
        Math.cos((this._direction / 180.0) * M_PI) * this._pixelsPerSecond;

      this._x += this._speedVec.x * this._z;
      this._y -= this._speedVec.y * this._z;
    }

    // update the gravity
    if (this._weight !== 0) {
      this._gravity += this._weight / currentUpdateTime;
      this._y += (this._gravity / currentUpdateTime) * this._z;
    }

    // set the matrix if it is relative to the parent
    if (this._relative) {
      let radians = (this._angle / 180) * M_PI;
      this._matrix.set(
        Math.cos(radians),
        Math.sin(radians),
        -Math.sin(radians),
        Math.cos(radians)
      );
    }
    // calculate where the entity is in the world
    if (this._parent && this._relative) {
      this._z = this._parent._z;
      this._matrix.transformSelf(this._parent._matrix);
      let rotVec = this._parent._matrix.transformVector(this._x, this._y);

      this._wx = this._parent._wx + rotVec.x * this._z;
      this._wy = this._parent._wy + rotVec.y * this._z;

      this._relativeAngle = this._parent._relativeAngle + this._angle;
    } else {
      // If parent setz(parent.z)
      this._wx = this._x;
      this._wy = this._y;
    }

    if (!this._parent) this._relativeAngle = this._angle;

    // update animation frame
    if (this._avatar && this._animating) {
      this._currentFrame += this._framerate / currentUpdateTime;
      if (this._animateOnce) {
        if (this._currentFrame > this._avatar.getFramesCount() - 1) {
          this._currentFrame = this._avatar.getFramesCount() - 1;
        } else if (this._currentFrame <= 0) {
          this._currentFrame = 0;
        }
      }
    }

    // update the Axis Aligned Bounding Box
    if (this._AABB_Calculate) this.updateBoundingBox();

    // update the radius of influence
    if (this._radiusCalculate) this.updateEntityRadius();

    // update the children
    this.updateChildren();

    return true;
  }

  updateChildren() {
    for (let i = 0; i < this._children.length; i++) {
      if (!this._children[i].update()) {
        this._children.splice(i, 1);
        i--;
      }
    }
  }

  miniUpdate() {
    let radians = (this._angle / 180.0) * M_PI;

    if (isNaN(this._angle)) {
      console.log("MiniUpdate NaN");
    }

    this._matrix.set(
      Math.cos(radians),
      Math.sin(radians),
      -Math.sin(radians),
      Math.cos(radians)
    );

    if (this._parent && this._relative) {
      this._z = this._parent._z;
      this._matrix.transformSelf(this._parent._matrix);
      let rotVec = this._parent._matrix.transformVector(this._x, this._y);

      this._wx = this._parent._wx + rotVec.x * this._z;
      this._wy = this._parent._wy + rotVec.y * this._z;
    } else {
      if (this._parent) this._z = this._parent._z;
      this._wx = this._x;
      this._wy = this._y;
    }
  }

  getChildCount() {
    return this._children.length;
  }

  updateBoundingBox() {
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

  updateEntityRadius() {
    if (this._autoCenter) {
      if (this._avatar) {
        let aMaxRadius = this._avatar.getMaxRadius();
        let aWidth = this._avatar.getWidth();
        let aHeight = this._avatar.getHeight();

        if (aMaxRadius !== 0)
          this._imageRadius = Math.max(
            aMaxRadius * this._scaleX * this._z,
            aMaxRadius * this._scaleY * this._z
          );
        else
          this._imageRadius = getDistance2D(
            (aWidth / 2.0) * this._scaleX * this._z,
            (aHeight / 2.0) * this._scaleY * this._z,
            aWidth * this._scaleX * this._z,
            aHeight * this._scaleY * this._z
          );
      } else {
        this._imageRadius = 0;
      }
    } else {
      let aMaxRadius = this._avatar.getMaxRadius();
      let aWidth = this._avatar.getWidth();
      let aHeight = this._avatar.getHeight();

      if (aMaxRadius !== 0)
        this._imageRadius =
          getDistance2D(
            this._handleX * this._scaleX * this._z,
            this._handleY * this._scaleY * this._z,
            (aWidth / 2.0) * this._scaleX * this._z,
            (aHeight / 2.0) * this._scaleY * this._z
          ) +
          Math.max(
            aMaxRadius * this._scaleX * this._z,
            aMaxRadius * this._scaleY * this._z
          );
      else
        this._imageRadius = getDistance2D(
          this._handleX * this._scaleX * this._z,
          this._handleY * this._scaleY * this._z,
          aWidth * this._scaleX * this._z,
          aHeight * this._scaleY * this._z
        );
    }

    this._entityRadius = this._imageRadius;
    this._imageDiameter = this._imageRadius * 2.0;

    if (this._rootParent) this.updateRootParentEntityRadius();
  }

  updateParentEntityRadius() {
    if (this._parent) {
      if (this._children.length > 0)
        this._parent._entityRadius += Math.max(
          0.0,
          getDistance2D(
            this._wx,
            this._wy,
            this._parent._wx,
            this._parent._wy
          ) +
            this._entityRadius -
            this._parent._entityRadius
        );
      else
        this._parent._entityRadius += Math.max(
          0.0,
          getDistance2D(
            this._wx,
            this._wy,
            this._parent._wx,
            this._parent._wy
          ) +
            this._imageRadius -
            this._parent._entityRadius
        );
      // DebugLog name + " - Radius: " + entity_Radius + " | Distance to Parent: " + getdistance(wx, wy, parent.wx, parent.wy)
      this._parent.updateParentEntityRadius();
    }
  }

  updateRootParentEntityRadius() {
    if (this._rootParent) {
      if (this._alpha !== 0)
        this._rootParent._entityRadius += Math.max(
          0.0,
          getDistance2D(
            this._wx,
            this._wy,
            this._rootParent._wx,
            this._rootParent._wy
          ) +
            this._imageRadius -
            this._rootParent._entityRadius
        );
      // DebugLog name + " - Radius: " + entity_Radius + " | Distance to Parent: " + getdistance(wx, wy, rootparent.wx, rootparent.wy)
    }
  }

  updateParentBoundingBox() {
    if (this._parent) {
      let parent = this._parent;
      parent._AABB_XMax += Math.max(
        0.0,
        this._wx - parent._wx + this._AABB_XMax - parent._AABB_XMax
      );
      parent._AABB_YMax += Math.max(
        0.0,
        this._wy - parent._wx + this._AABB_YMax - parent._AABB_YMax
      );
      parent._AABB_XMin += Math.max(
        0.0,
        this._wx - parent._wx + this._AABB_XMin - parent._AABB_XMin
      );
      parent._AABB_YMin += Math.max(
        0.0,
        this._wy - parent._wy + this._AABB_YMin - parent._AABB_YMin
      );
    }
  }

  assignRootParent(e) {
    if (this._parent) this._parent.assignRootParent(e);
    else e._rootParent = this;
  }

  setHandleX(x) {
    this._handleX = x;
  }

  setHandleY(y) {
    this._handleY = y;
  }

  setParent(e) {
    e.addChild(this);
  }

  setRelative(value) {
    this._relative = value;
  }

  setEntityScale(sx, sy) {
    this._scaleX = sx;
    this._scaleY = sy;
  }

  setSpeed(speed) {
    this._speed = speed;
  }

  getSpeed() {
    return this._speed;
  }

  setBlendMode(mode) {
    this._blendMode = mode;
  }

  getCurrentFrame() {
    return this._currentFrame;
  }

  setCurrentFrame(frame) {
    this._currentFrame = frame;
  }

  addChild(e) {
    this._children.push(e);
    e._parent = this;
    e._radiusCalculate = this._radiusCalculate;
    e.assignRootParent(e);
  }

  getMatrix() {
    return this._matrix;
  }

  getWX() {
    return this._wx;
  }

  getWY() {
    return this._wy;
  }

  getRelativeAngle() {
    return this._relativeAngle;
  }

  setDoB(dob) {
    this._dob = dob;
  }

  getOldCurrentFrame() {
    return this._oldCurrentFrame;
  }

  setAvatar(avatar) {
    this._avatar = avatar;
    this._AABB_MaxWidth = this._avatar.getWidth() * 0.5;
    this._AABB_MaxHeight = this._avatar.getHeight() * 0.5;
    this._AABB_MinWidth = this._avatar.getWidth() * -0.5;
    this._AABB_MinHeight = this._avatar.getHeight() * -0.5;
  }

  setAutocenter(value) {
    this._autoCenter = value;
  }

  getLifeTime() {
    return this._lifeTime;
  }

  setLifeTime(lifeTime) {
    this._lifeTime = lifeTime;
  }

  setSpeedVecX(x) {
    this._speedVec.x = x;
  }

  setSpeedVecY(y) {
    this._speedVec.y = y;
  }

  setBaseSpeed(speed) {
    this._baseSpeed = speed;
  }

  getBaseSpeed() {
    return this._baseSpeed;
  }

  setWidth(width) {
    this._width = width;
  }

  getWidth() {
    return this._width;
  }

  setScaleX(scaleX) {
    this._scaleX = scaleX;
  }

  setScaleY(scaleY) {
    this._scaleY = scaleY;
  }

  getScaleX() {
    return this._scaleX;
  }

  getScaleY() {
    return this._scaleY;
  }

  setWidthHeightAABB(minWidth, minHeight, maxWidth, maxHeight) {
    this._AABB_MaxWidth = maxWidth;
    this._AABB_MaxHeight = maxHeight;
    this._AABB_MinWidth = minWidth;
    this._AABB_MinHeight = minHeight;
  }

  setDirectionLocked(value) {
    this._directionLocked = value;
  }

  isDirectionLocked() {
    return this._directionLocked;
  }

  getEntityDirection() {
    return this._direction;
  }

  setEntityDirection(direction) {
    if (isNaN(direction)) {
      console.log("SetEntityDirection NaN");
    }

    this._direction = direction;
  }

  setWeight(weight) {
    this._weight = weight;
  }

  getWeight() {
    return this._weight;
  }

  setBaseWeight(weight) {
    this._baseWeight = weight;
  }

  getBaseWeight() {
    return this._weight;
  }

  getRed() {
    return this._red;
  }

  setRed(r) {
    this._red = r;
  }

  getGreen() {
    return this._green;
  }

  setGreen(g) {
    this._green = g;
  }

  getBlue() {
    return this._blue;
  }

  setBlue(b) {
    this._blue = b;
  }

  getAge() {
    return this._age;
  }

  setAge(age) {
    this._age = age;
  }

  setEntityAlpha(alpha) {
    this._alpha = alpha;
  }

  getOldWX() {
    return this._oldWX;
  }

  getOldWY() {
    return this._oldWY;
  }

  getImageDiameter() {
    return this._imageDiameter;
  }

  getOldAngle() {
    return this._oldAngle;
  }

  getOldRelativeAngle() {
    return this._oldRelativeAngle;
  }

  getAvatar() {
    return this._avatar;
  }

  getHandleX() {
    return this._handleX;
  }

  getHandleY() {
    return this._handleY;
  }

  getBlendMode() {
    return this._blendMode;
  }

  getAngle() {
    return this._angle;
  }

  getOldScaleX() {
    return this._oldScaleX;
  }

  getOldScaleY() {
    return this._oldScaleY;
  }

  getOldZ() {
    return this._oldZ;
  }

  setEntityColor(r, g, b) {
    this._red = r;
    this._green = g;
    this._blue = b;
  }

  getEntityAlpha() {
    return this._alpha;
  }

  getImageRadius() {
    return this._imageRadius;
  }

  getFramerate() {
    return this._framerate;
  }

  setFramerate(framerate) {
    this._framerate = framerate;
  }

  isAnimating() {
    return this._animating;
  }

  setAnimating(value) {
    this._animating = value;
  }

  isRelative() {
    return this._relative;
  }

  setWX(wx) {
    this._wx = wx;
  }

  setWY(wy) {
    this._wy = wy;
  }

  setAngle(degrees) {
    if (isNaN(degrees)) {
      console.log("SetAngle NaN");
    }

    this._angle = degrees;
  }

  setHeight(height) {
    this._height = height;
  }

  getHeight() {
    return this._height;
  }

  getParent() {
    return this._parent;
  }

  move(xamount, yamount) {
    this._x += xamount;
    this._y += yamount;
  }
}

export default Entity;
