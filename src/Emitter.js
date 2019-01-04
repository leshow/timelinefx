import {
  getDistance2D,
  forEachXMLChild,
  getNodeAttrValue,
  random,
  M_PI,
  lerp,
  randomBetween,
  getDirection
} from "./Utils";
import Effect, {
  TypePoint,
  TypeArea,
  TypeEllipse,
  TypeLine,
  EmInAndOut,
  EmInwards,
  EmOutwards,
  EmSpecified,
  EndKill,
  EndLetFree,
  EndLoopAround
} from "./Effect";
import EffectsLibrary from "./EffectsLibrary";
import { XMLHelper } from "./Utils";
import Entity from "./Entity";
import Matrix2 from "./Matrix2";
import EmitterArray from "./EmitterArray";

const AngAlign = 0;
const AngRandom = 1;
const AngSpecify = 2;

const g_defaultEmitter = {
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

class Emitter extends Entity {
  constructor(other, pm) {
    super(other);

    this._effects = [];
    this._childrenOwner = false; // the Particles are managing by pool
    this._matrix = new Matrix2();

    if (other) {
      for (let key in g_defaultEmitter) this[key] = other[key];

      this._dob = pm.getCurrentTime();
      this.setOKtoRender(false);
      this._arrayOwner = false;

      this._children = [];

      for (let i = 0; i < other._effects.length; i++) {
        this.addEffect(new Effect(other._effects[i], pm));
      }

      this._cAmount = other._cAmount;
      this._cLife = other._cLife;
      this._cSizeX = other._cSizeX;
      this._cSizeY = other._cSizeY;
      this._cBaseSpeed = other._cBaseSpeed;
      this._cBaseWeight = other._cBaseWeight;
      this._cBaseSpin = other._cBaseSpin;
      this._cEmissionAngle = other._cEmissionAngle;
      this._cEmissionRange = other._cEmissionRange;
      this._cSplatter = other._cSplatter;
      this._cVelVariation = other._cVelVariation;
      this._cWeightVariation = other._cWeightVariation;
      this._cLifeVariation = other._cLifeVariation;
      this._cAmountVariation = other._cAmountVariation;
      this._cSizeXVariation = other._cSizeXVariation;
      this._cSizeYVariation = other._cSizeYVariation;
      this._cSpinVariation = other._cSpinVariation;
      this._cDirectionVariation = other._cDirectionVariation;
      this._cAlpha = other._cAlpha;
      this._cR = other._cR;
      this._cG = other._cG;
      this._cB = other._cB;
      this._cScaleX = other._cScaleX;
      this._cScaleY = other._cScaleY;
      this._cSpin = other._cSpin;
      this._cVelocity = other._cVelocity;
      this._cWeight = other._cWeight;
      this._cDirection = other._cDirection;
      this._cDirectionVariationOT = other._cDirectionVariationOT;
      this._cFramerate = other._cFramerate;
      this._cStretch = other._cStretch;
      this._cGlobalVelocity = other._cGlobalVelocity;
    } else {
      for (let key in g_defaultEmitter) this[key] = g_defaultEmitter[key];

      this._arrayOwner = true;

      this._cAmount = new EmitterArray(
        EffectsLibrary.amountMin,
        EffectsLibrary.amountMax
      );
      this._cLife = new EmitterArray(
        EffectsLibrary.lifeMin,
        EffectsLibrary.lifeMax
      );
      this._cSizeX = new EmitterArray(
        EffectsLibrary.dimensionsMin,
        EffectsLibrary.dimensionsMax
      );
      this._cSizeY = new EmitterArray(
        EffectsLibrary.dimensionsMin,
        EffectsLibrary.dimensionsMax
      );
      this._cBaseSpeed = new EmitterArray(
        EffectsLibrary.velocityMin,
        EffectsLibrary.velocityMax
      );
      this._cBaseWeight = new EmitterArray(
        EffectsLibrary.weightMin,
        EffectsLibrary.weightMax
      );
      this._cBaseSpin = new EmitterArray(
        EffectsLibrary.spinMin,
        EffectsLibrary.spinMax
      );
      this._cEmissionAngle = new EmitterArray(
        EffectsLibrary.angleMin,
        EffectsLibrary.angleMax
      );
      this._cEmissionRange = new EmitterArray(
        EffectsLibrary.emissionRangeMin,
        EffectsLibrary.emissionRangeMax
      );
      this._cSplatter = new EmitterArray(
        EffectsLibrary.dimensionsMin,
        EffectsLibrary.dimensionsMax
      );
      this._cVelVariation = new EmitterArray(
        EffectsLibrary.velocityMin,
        EffectsLibrary.velocityMax
      );
      this._cWeightVariation = new EmitterArray(
        EffectsLibrary.weightVariationMin,
        EffectsLibrary.weightVariationMax
      );
      this._cLifeVariation = new EmitterArray(
        EffectsLibrary.lifeMin,
        EffectsLibrary.lifeMax
      );
      this._cAmountVariation = new EmitterArray(
        EffectsLibrary.amountMin,
        EffectsLibrary.amountMax
      );
      this._cSizeXVariation = new EmitterArray(
        EffectsLibrary.dimensionsMin,
        EffectsLibrary.dimensionsMax
      );
      this._cSizeYVariation = new EmitterArray(
        EffectsLibrary.dimensionsMin,
        EffectsLibrary.dimensionsMax
      );
      this._cSpinVariation = new EmitterArray(
        EffectsLibrary.spinVariationMin,
        EffectsLibrary.spinVariationMax
      );
      this._cDirectionVariation = new EmitterArray(
        EffectsLibrary.globalPercentMin,
        EffectsLibrary.globalPercentMax
      );
      this._cAlpha = new EmitterArray(0, 1.0);
      this._cR = new EmitterArray(0, 0);
      this._cG = new EmitterArray(0, 0);
      this._cB = new EmitterArray(0, 0);
      this._cScaleX = new EmitterArray(
        EffectsLibrary.globalPercentMin,
        EffectsLibrary.globalPercentMax
      );
      this._cScaleY = new EmitterArray(
        EffectsLibrary.globalPercentMin,
        EffectsLibrary.globalPercentMax
      );
      this._cSpin = new EmitterArray(
        EffectsLibrary.spinOverTimeMin,
        EffectsLibrary.spinOverTimeMax
      );
      this._cVelocity = new EmitterArray(
        EffectsLibrary.velocityOverTimeMin,
        EffectsLibrary.velocityOverTimeMax
      );
      this._cWeight = new EmitterArray(
        EffectsLibrary.globalPercentMin,
        EffectsLibrary.globalPercentMax
      );
      this._cDirection = new EmitterArray(
        EffectsLibrary.directionOverTimeMin,
        EffectsLibrary.directionOverTimeMax
      );
      this._cDirectionVariationOT = new EmitterArray(
        EffectsLibrary.globalPercentMin,
        EffectsLibrary.globalPercentMax
      );
      this._cFramerate = new EmitterArray(
        EffectsLibrary.framerateMin,
        EffectsLibrary.framerateMax
      );
      this._cStretch = new EmitterArray(
        EffectsLibrary.globalPercentMin,
        EffectsLibrary.globalPercentMax
      );
      this._cGlobalVelocity = new EmitterArray(
        EffectsLibrary.globalPercentMin,
        EffectsLibrary.globalPercentMax
      );
    }
  }

  loadFromXML(xml, parent) {
    let x = new XMLHelper(xml);

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
    this.setGroupParticles(x.getAttrAsBool("GROUP_PARTICLES"));

    // ?
    if (this.getAnimationDirection() === 0) this.setAnimationDirection(1);

    this.setParentEffect(parent);
    let path = parent.getPath() + "/" + this.getName();
    this.setPath(path);

    let imgNode = xml.getElementsByTagName("SHAPE_INDEX")[0];
    this.setImage(parseInt(imgNode.innerHTML));

    if (x.hasChildAttr("ANGLE_TYPE"))
      this.setAngleType(x.getChildAttrAsInt("ANGLE_TYPE", "VALUE"));
    if (x.hasChildAttr("ANGLE_OFFSET"))
      this.setAngleOffset(x.getChildAttrAsInt("ANGLE_OFFSET", "VALUE"));
    if (x.hasChildAttr("LOCKED_ANGLE"))
      this.setLockAngle(x.getChildAttrAsBool("LOCKED_ANGLE", "VALUE"));
    if (x.hasChildAttr("ANGLE_RELATIVE"))
      this.setAngleRelative(x.getChildAttrAsBool("ANGLE_RELATIVE", "VALUE"));
    if (x.hasChildAttr("USE_EFFECT_EMISSION"))
      this.setUseEffectEmission(
        x.getChildAttrAsBool("USE_EFFECT_EMISSION", "VALUE")
      );
    if (x.hasChildAttr("COLOR_REPEAT"))
      this.setColorRepeat(x.getChildAttrAsInt("COLOR_REPEAT", "VALUE"));
    if (x.hasChildAttr("ALPHA_REPEAT"))
      this.setAlphaRepeat(x.getChildAttrAsInt("ALPHA_REPEAT", "VALUE"));
    if (x.hasChildAttr("ONE_SHOT"))
      this.setOneShot(x.getChildAttrAsBool("ONE_SHOT", "VALUE"));
    if (x.hasChildAttr("HANDLE_CENTERED"))
      this.setHandleCenter(x.getChildAttrAsBool("HANDLE_CENTERED", "VALUE"));

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
    this.readAttribute(
      xml,
      this._cDirectionVariationOT,
      "DIRECTION_VARIATIONOT"
    );
    this.readAttribute(xml, this._cFramerate, "FRAMERATE_OVERTIME");
    this.readAttribute(xml, this._cStretch, "STRETCH_OVERTIME");

    this.readAttribute(xml, this._cR, "RED_OVERTIME");
    this.readAttribute(xml, this._cG, "GREEN_OVERTIME");
    this.readAttribute(xml, this._cB, "BLUE_OVERTIME");

    this.readAttribute(xml, this._cGlobalVelocity, "GLOBAL_VELOCITY");
    this.readAttribute(xml, this._cEmissionAngle, "EMISSION_ANGLE");
    this.readAttribute(xml, this._cEmissionRange, "EMISSION_RANGE");

    // This seems suspect? only one child?
    let childNode = xml.getElementsByTagName("EFFECT")[0];

    if (childNode) {
      let e = new Effect();
      e.loadFromXML(childNode);
      //e.CompileAll();

      e.setParentEmitter(this);

      this.addEffect(e);
    }
  }

  readAttribute(xml, emitArray, tag) {
    forEachXMLChild(xml, tag, function(n) {
      let attr = emitArray.add(
        parseFloat(getNodeAttrValue(n, "FRAME")),
        parseFloat(getNodeAttrValue(n, "VALUE"))
      );
      attr.loadFromXML(n.getElementsByTagName("CURVE")[0]);
    });
  }

  sortAll() {
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

  showAll() {
    this.setVisible(true);
    for (let i = 0; i < this._effects.length; i++) {
      this._effects[i].showAll();
    }
  }

  hideAll() {
    this.setVisible(false);
    for (let i = 0; i < this._effects.length; i++) {
      this._effects[i].hideAll();
    }
  }

  addEffect(effect) {
    this._effects.push(effect);
  }

  setParentEffect(parent) {
    this._parentEffect = parent;
  }

  setImage(imageIndex) {
    let image = EffectsLibrary.getImage(imageIndex);
    this._image = image;
    this._AABB_ParticleMaxWidth = image.getWidth() * 0.5;
    this._AABB_ParticleMaxHeight = image.getHeight() * 0.5;
    this._AABB_ParticleMinWidth = image.getWidth() * -0.5;
    this._AABB_ParticleMinHeight = image.getHeight() * -0.5;
  }

  setAngleOffset(offset) {
    this._angleOffset = offset;
  }

  setUniform(value) {
    this._uniform = value;
  }

  setAngleType(angleType) {
    this._angleType = angleType;
  }

  setUseEffectEmission(value) {
    this._useEffectEmission = value;
  }

  setVisible(value) {
    this._visible = value;
  }

  setSingleParticle(value) {
    this._singleParticle = value;
  }

  setRandomColor(value) {
    this._randomColor = value;
  }

  setZLayer(zLayer) {
    this._zLayer = zLayer;
  }

  setAnimate(value) {
    this._animate = value;
  }

  setRandomStartFrame(value) {
    this._randomStartFrame = value;
  }

  setAnimationDirection(direction) {
    this._animationDirection = direction;
  }

  setColorRepeat(repeat) {
    this._colorRepeat = repeat;
  }

  setAlphaRepeat(repeat) {
    this._alphaRepeat = repeat;
  }

  setOneShot(value) {
    this._oneShot = value;
  }

  setHandleCenter(value) {
    this._handleCenter = value;
  }

  setParticlesRelative(value) {
    this._particlesRelative = value;
  }

  setTweenSpawns(value) {
    this._tweenSpawns = value;
  }

  setLockAngle(value) {
    this._lockedAngle = value;
  }

  setAngleRelative(value) {
    this._angleRelative = value;
  }

  setOnce(value) {
    this._once = value;
  }

  setGroupParticles(value) {
    this._groupParticles = value;
  }

  getParentEffect() {
    return this._parentEffect;
  }

  getImage() {
    return this._image;
  }

  getAngleOffset() {
    return this._angleOffset;
  }

  isUniform() {
    return this._uniform;
  }

  getAngleType() {
    return this._angleType;
  }

  isUseEffectEmmision() {
    return this._useEffectEmission;
  }

  isVisible() {
    return this._visible;
  }

  isSingleParticle() {
    return this._singleParticle;
  }

  isRandomColor() {
    return this._randomColor;
  }

  getZLayer() {
    return this._zLayer;
  }

  isAnimate() {
    return this._animate;
  }

  isRandomStartFrame() {
    return this._randomStartFrame;
  }

  getAnimationDirection() {
    return this._animationDirection;
  }

  getColorRepeat() {
    return this._colorRepeat;
  }

  getAlphaRepeat() {
    return this._alphaRepeat;
  }

  isOneShot() {
    return this._oneShot;
  }

  isHandleCenter() {
    return this._handleCenter;
  }

  isParticlesRelative() {
    return this._particlesRelative;
  }

  isTweenSpawns() {
    return this._tweenSpawns;
  }

  isLockAngle() {
    return this._lockedAngle;
  }

  isAngleRelative() {
    return this._angleRelative;
  }

  isOnce() {
    return this._once;
  }

  isGroupParticles() {
    return this._groupParticles;
  }

  getPath() {
    return this._path;
  }

  setRadiusCalculate(value) {
    this._radiusCalculate = value;

    for (let i = 0; i < this._children.length; i++) {
      this._children[i].setRadiusCalculate(value);
    }

    for (let i = 0; i < this._effects.length; i++) {
      this._effects[i].setRadiusCalculate(value);
    }
  }

  destroy(releaseChildren) {
    this._parentEffect = null;
    this._image = null;

    for (let i = 0; i < this._effects.length; i++) {
      this._effects[i].destroy();
    }

    this._effects = [];

    super.destroy(false); // Emitter.$superp.Destroy.call(this, false);
  }

  changeDoB(dob) {
    this._dob = dob;

    for (let i = 0; i < this._effects.length; i++) {
      this._effects[i].changeDoB(dob);
    }
  }

  update() {
    this.capture();

    let radians = (this._angle / 180.0) * M_PI;
    this._matrix.set(
      Math.cos(radians),
      Math.sin(radians),
      -Math.sin(radians),
      Math.cos(radians)
    );

    if (this._parent && this._relative) {
      this.setZ(this._parent.getZ());
      this._matrix.transformSelf(this._parent.getMatrix());
      let rotvec = this._parent.getMatrix().transformVector(this._x, this._y);

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

    super.updateBoundingBox();

    if (this._radiusCalculate) super.updateEntityRadius();

    this.updateChildren();

    if (!this._dead && !this._dying) {
      if (
        this._visible &&
        this._parentEffect.getParticleManager().isSpawningAllowed()
      )
        this.updateSpawns();
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

  updateSpawns(eSingle = null) {
    let intCounter;
    let qty;
    let er;
    let e;
    let parentEffect = this._parentEffect;
    let curFrame = parentEffect.getCurrentEffectFrame();
    let pm = parentEffect.getParticleManager();

    let a1 = this.getEmitterAmount(curFrame);
    let a2 = random(this.getEmitterAmountVariation(curFrame));
    let a3 = parentEffect.getCurrentAmount();
    let a4 = pm.getGlobalAmountScale();
    qty =
      ((this.getEmitterAmount(curFrame) +
        random(this.getEmitterAmountVariation(curFrame))) *
        parentEffect.getCurrentAmount() *
        pm.getGlobalAmountScale()) /
      EffectsLibrary.getUpdateFrequency();

    if (!this._singleParticle) {
      this._counter += qty;
    }
    intCounter = Math.floor(this._counter);
    if (intCounter >= 1 || (this._singleParticle && !this._startedSpawning)) {
      if (!this._startedSpawning && this._singleParticle) {
        switch (parentEffect.getClass()) {
          case TypePoint:
            intCounter = 1;
            break;
          case TypeArea:
            intCounter = parentEffect.getMGX() * parentEffect.getMGY();
            break;
          case TypeLine:
          case TypeEllipse:
            intCounter = parentEffect.getMGX();
            break;
        }
      } else if (this._singleParticle && this._startedSpawning) {
        intCounter = 0;
      }

      // preload attributes
      this._currentLife =
        this.getEmitterLife(curFrame) * parentEffect.getCurrentLife();
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

      this._currentDirectionVariation = this.getEmitterDirectionVariation(
        curFrame
      );

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
      this._currentSizeYVariation = this.getEmitterSizeYVariation(curFrame);

      // ------------------------------
      for (let c = 1; c <= intCounter; ++c) {
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
          e.setEffectLayer(parentEffect.getEffectLayer());
          // ----------------------------------------------------
          e.setDoB(pm.getCurrentTime());

          if (
            parentEffect.getTraverseEdge() &&
            parentEffect.getClass() == TypeLine
          ) {
            this._particlesRelative = true;
          }
          e.setRelative(this._particlesRelative);

          switch (parentEffect.getClass()) {
            case TypePoint:
              if (e.isRelative()) {
                e.setX(0 - parentEffect.getHandleX());
                e.setY(0 - parentEffect.getHandleY());
              } else {
                let tween = c / intCounter;
                if (
                  parentEffect.getHandleCenter() ||
                  parentEffect.getHandleX() + parentEffect.getHandleY() === 0
                ) {
                  // @dan already set? tween = c / intCounter;
                  e.setX(lerp(this._oldWX, this._wx, tween));
                  e.setY(lerp(this._oldWY, this._wy, tween));
                  e.setWX(e.getX() - parentEffect.getHandleX() * this._z);
                  e.setWY(e.getY() - parentEffect.getHandleY() * this._z);
                } else {
                  e.setX(0 - parentEffect.getHandleX());
                  e.setY(0 - parentEffect.getHandleY());
                  let rotvec = this._parent
                    .getMatrix()
                    .transformVector(e.getX(), e.getY());
                  e.setX(lerp(this._oldWX, this._wx, tween) + rotvec.x);
                  e.setY(lerp(this._oldWY, this._wy, tween) + rotvec.y);

                  e.setWX(e.getX() * this._z);
                  e.setWY(e.getY() * this._z);
                }
              }
              break;

            case TypeArea:
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
                  e.setX(
                    (this._gx / (parentEffect.getMGX() - 1)) *
                      parentEffect.getCurrentWidth() -
                      parentEffect.getHandleX()
                  );
                } else {
                  e.setX(-parentEffect.getHandleX());
                }

                if (parentEffect.getMGY() > 1) {
                  e.setY(
                    (this._gy / (parentEffect.getMGY() - 1)) *
                      parentEffect.getCurrentHeight() -
                      parentEffect.getHandleY()
                  );
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
                e.setX(
                  random(parentEffect.getCurrentWidth()) -
                    parentEffect.getHandleX()
                );
                e.setY(
                  random(parentEffect.getCurrentHeight()) -
                    parentEffect.getHandleY()
                );
              }

              if (!e.isRelative()) {
                let parent = this._parent;
                let rotvec = parent
                  .getMatrix()
                  .transformVector(e.getX(), e.getY());

                e.setX(parent.getWX() + rotvec.x * this._z);
                e.setY(parent.getWY() + rotvec.y * this._z);
              }

              break;

            case TypeEllipse:
              {
                let tx = parentEffect.getCurrentWidth() / 2.0;
                let ty = parentEffect.getCurrentHeight() / 2.0;
                let th = 0;

                if (parentEffect.getEmitAtPoints()) {
                  if (parentEffect.getMGX() === 0) parentEffect.SetMGX(1);

                  this._gx += parentEffect._spawnDirection;
                  if (this._gx >= parentEffect.getMGX()) {
                    this._gx = 0;
                  } else if (this._gx < 0) {
                    this._gx = parentEffect.getMGX() - 1;
                  }

                  th =
                    this._gx *
                      (parentEffect.getEllipseArc() / parentEffect.getMGX()) +
                    parentEffect.getEllipseOffset();
                } else {
                  th =
                    random(parentEffect.getEllipseArc()) +
                    parentEffect.getEllipseOffset();
                }
                e.setX(
                  Math.cos((th / 180.0) * M_PI) * tx -
                    parentEffect.getHandleX() +
                    tx
                );
                e.setY(
                  -Math.sin((th / 180.0) * M_PI) * ty -
                    parentEffect.getHandleY() +
                    ty
                );

                if (!e.isRelative()) {
                  let rotvec = this._parent
                    .getMatrix()
                    .transformVector(e.getX(), e.getY());

                  e.setX(this._parent.getWX() + rotvec.x * this._z);
                  e.setY(this._parent.getWY() + rotvec.y * this._z);
                }
              }
              break;

            case TypeLine:
              if (!parentEffect.getTraverseEdge()) {
                if (parentEffect.getEmitAtPoints()) {
                  if (parentEffect._spawnDirection == -1) {
                    this._gx += parentEffect._spawnDirection;
                    if (this._gx < 0) this._gx = parentEffect.getMGX() - 1;
                  }

                  if (parentEffect.getMGX() > 1) {
                    e.setX(
                      (this._gx / (parentEffect.getMGX() - 1)) *
                        parentEffect.getCurrentWidth() -
                        parentEffect.getHandleX()
                    );
                  } else {
                    e.setX(-parentEffect.getHandleX());
                  }
                  e.setY(-parentEffect.getHandleY());

                  if (parentEffect._spawnDirection == 1) {
                    this._gx += parentEffect._spawnDirection;
                    if (this._gx >= parentEffect.getMGX()) this._gx = 0;
                  }
                } else {
                  e.setX(
                    random(parentEffect.getCurrentWidth()) -
                      parentEffect.getHandleX()
                  );
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
                      e.setX(
                        (this._gx / (parentEffect.getMGX() - 1)) *
                          parentEffect.getCurrentWidth() -
                          parentEffect.getHandleX()
                      );
                    } else {
                      e.setX(-parentEffect.getHandleX());
                    }
                    e.setY(-parentEffect.getHandleY());

                    if (parentEffect._spawnDirection == 1) {
                      this._gx += parentEffect._spawnDirection;
                      if (this._gx >= parentEffect.getMGX()) this._gx = 0;
                    }
                  } else {
                    e.setX(
                      random(parentEffect.getCurrentWidth()) -
                        parentEffect.getHandleX()
                    );
                    e.setY(-parentEffect.getHandleY());
                  }
                }
              }

              // rotate
              if (!e.isRelative()) {
                let rotvec = this._parent
                  .getMatrix()
                  .transformVector(e.getX(), e.getY());

                e.setX(this._parent.getWX() + rotvec.x * this._z);
                e.setY(this._parent.getWY() + rotvec.y * this._z);
              }
              break;
          }

          // set the zoom level
          e.setZ(this._z);

          // set up the image
          e.setAvatar(this._image);
          e.setHandleX(this._handleX);
          e.setHandleY(this._handleY);
          e.setAutocenter(this._handleCenter);

          // set lifetime properties
          e.setLifeTime(
            this._currentLife +
              randomBetween(
                -this._currentLifeVariation,
                this._currentLifeVariation
              ) *
                parentEffect.getCurrentLife()
          );

          // speed
          e.setSpeedVecX(0);
          e.setSpeedVecY(0);
          if (!this._bypassSpeed) {
            e.setSpeed(this._cVelocity.get(0));
            e.setVelVariation(
              randomBetween(
                -this._currentSpeedVariation,
                this._currentSpeedVariation
              )
            );
            e.setBaseSpeed(
              (this._currentSpeed + e.getVelVariation()) *
                parentEffect.getCurrentVelocity()
            );
            e.setSpeed(
              this._cVelocity.get(0) *
                e.getBaseSpeed() *
                this._cGlobalVelocity.get(0)
            );
          } else {
            e.setSpeed(0);
          }

          // size
          e.setGSizeX(parentEffect.getCurrentSizeX());
          e.setGSizeY(parentEffect.getCurrentSizeY());

          // width
          let scaleTemp = this._cScaleX.get(0);
          let sizeTemp = 0;
          e.setScaleVariationX(random(this._currentSizeXVariation));
          e.setWidth(e.getScaleVariationX() + this._currentSizeX);
          if (scaleTemp !== 0) {
            sizeTemp =
              (e.getWidth() / this._image.getWidth()) *
              scaleTemp *
              e.getGSizeX();
          }
          e.setScaleX(sizeTemp);

          if (this._uniform) {
            // height
            e.setScaleY(sizeTemp);

            if (!this._bypassStretch) {
              e.setScaleY(
                (this.getEmitterScaleX(0) *
                  e.getGSizeX() *
                  (e.getWidth() +
                    Math.abs(e.getSpeed()) *
                      this.getEmitterStretch(0, 0) *
                      parentEffect.getCurrentStretch())) /
                  this._image.getWidth()
              );
              if (e.getScaleY() < e.getScaleX()) e.setScaleY(e.getScaleX());
            }

            e.setWidthHeightAABB(
              this._AABB_ParticleMinWidth,
              this._AABB_ParticleMaxWidth,
              this._AABB_ParticleMinWidth,
              this._AABB_ParticleMaxWidth
            );
          } else {
            // height
            scaleTemp = this.getEmitterScaleY(0);
            sizeTemp = 0;
            e.setScaleVariationY(random(this._currentSizeYVariation));
            e.setHeight(e.getScaleVariationY() + this._currentSizeY);
            if (scaleTemp !== 0) {
              sizeTemp =
                (e.getHeight() / this._image.getHeight()) *
                scaleTemp *
                e.getGSizeY();
            }
            e.setScaleY(sizeTemp);

            if (!this._bypassStretch && e.getSpeed() !== 0) {
              e.setScaleY(
                (this.getEmitterScaleY(0) *
                  e.getGSizeY() *
                  (e.getHeight() +
                    Math.abs(e.getSpeed()) *
                      this.getEmitterStretch(0) *
                      parentEffect.getCurrentStretch())) /
                  this._image.getHeight()
              );
              if (e.getScaleY() < e.getScaleX()) e.setScaleY(e.getScaleX());
            }

            e.setWidthHeightAABB(
              this._AABB_ParticleMinWidth,
              this._AABB_ParticleMaxWidth,
              this._AABB_ParticleMinHeight,
              this._AABB_ParticleMaxHeight
            );
          }

          // splatter
          if (!this._bypassSplatter) {
            let splatterTemp = this.getEmitterSplatter(curFrame);
            let splatX = randomBetween(-splatterTemp, splatterTemp);
            let splatY = randomBetween(-splatterTemp, splatterTemp);

            while (
              getDistance2D(0, 0, splatX, splatY) >= splatterTemp &&
              splatterTemp > 0
            ) {
              splatX = randomBetween(-splatterTemp, splatterTemp);
              splatY = randomBetween(-splatterTemp, splatterTemp);
            }

            if (this._z == 1 || e.isRelative()) {
              e.move(splatX, splatY);
            } else {
              e.move(splatX * this._z, splatY * this._z);
            }
          }

          // rotation and direction of travel settings
          e.miniUpdate();
          if (
            parentEffect.getTraverseEdge() &&
            parentEffect.getClass() == TypeLine
          ) {
            e.setDirectionLocked(true);
            e.setEntityDirection(90.0);
          } else {
            if (parentEffect.getClass() != TypePoint) {
              if (!this._bypassSpeed || this._angleType == AngAlign) {
                e.setEmissionAngle(
                  this._currentEmissionAngle + randomBetween(-er, er)
                );
                switch (parentEffect.getEmissionType()) {
                  case EmInwards:
                    if (e.isRelative())
                      e.setEmissionAngle(
                        e.getEmissionAngle() +
                          getDirection(e.getX(), e.getY(), 0, 0)
                      );
                    else
                      e.setEmissionAngle(
                        e.getEmissionAngle() +
                          getDirection(
                            e.getWX(),
                            e.getWY(),
                            e.getParent().getWX(),
                            e.getParent().getWY()
                          )
                      );
                    break;

                  case EmOutwards:
                    if (e.isRelative())
                      e.setEmissionAngle(
                        e.getEmissionAngle() +
                          getDirection(0, 0, e.getX(), e.getY())
                      );
                    else
                      e.setEmissionAngle(
                        e.getEmissionAngle() +
                          getDirection(
                            e.getParent().getWX(),
                            e.getParent().getWY(),
                            e.getWX(),
                            e.getWY()
                          )
                      );
                    break;

                  case EmInAndOut:
                    if (this._dirAlternater) {
                      if (e.isRelative())
                        e.setEmissionAngle(
                          e.getEmissionAngle() +
                            getDirection(0, 0, e.getX(), e.getY())
                        );
                      else
                        e.setEmissionAngle(
                          e.getEmissionAngle() +
                            getDirection(
                              e.getParent().getWX(),
                              e.getParent().getWY(),
                              e.getWX(),
                              e.getWY()
                            )
                        );
                    } else {
                      if (e.isRelative())
                        e.setEmissionAngle(
                          e.getEmissionAngle() +
                            getDirection(e.getX(), e.getY(), 0, 0)
                        );
                      else
                        e.setEmissionAngle(
                          e.getEmissionAngle() +
                            getDirection(
                              e.getWX(),
                              e.getWY(),
                              e.getParent().getWX(),
                              e.getParent().getWY()
                            )
                        );
                    }
                    this._dirAlternater = !this._dirAlternater;
                    break;

                  case EmSpecified:
                    // nothing
                    break;
                }
              }
            } else {
              e.setEmissionAngle(
                this._currentEmissionAngle + randomBetween(-er, er)
              );
            }

            if (!this._bypassDirectionvariation) {
              e.setDirectionVairation(this._currentDirectionVariation);
              let dv =
                e.getDirectionVariation() *
                this.getEmitterDirectionVariationOt(0);
              e.setEntityDirection(
                e.getEmissionAngle() +
                  this.getEmitterDirection(0) +
                  randomBetween(-dv, dv)
              );
            } else {
              e.setEntityDirection(
                e.getEmissionAngle() + this.getEmitterDirection(0)
              );
            }
          }

          // ------ e._lockedAngle = _lockedAngle
          if (!this._bypassSpin) {
            e.setSpinVariation(
              randomBetween(
                -this._currentSpinVariation,
                this._currentSpinVariation
              ) + this._currentSpin
            );
          }

          // weight
          if (!this._bypassWeight) {
            e.setWeight(this.getEmitterWeight(0));
            e.setWeightVariation(
              randomBetween(
                -this._currentWeightVariation,
                this._currentWeightVariation
              )
            );
            e.setBaseWeight(
              (this._currentWeight + e.getWeightVariation()) *
                parentEffect.getCurrentWeight()
            );
          }

          // -------------------
          if (this._lockedAngle) {
            if (
              !this._bypassWeight &&
              !this._bypassSpeed &&
              !parentEffect.isBypassWeight()
            ) {
              e.setSpeedVecX(Math.sin((e.getEntityDirection() / 180.0) * M_PI));
              e.setSpeedVecY(Math.cos((e.getEntityDirection() / 180.0) * M_PI));
              e.setAngle(getDirection(0, 0, e._speedVec.x, -e._speedVec.y));
            } else {
              if (parentEffect.getTraverseEdge()) {
                e.SetAngle(parentEffect.getAngle() + this._angleOffset);
              } else {
                e.setAngle(
                  e.getEntityDirection() + this._angle + this._angleOffset
                );
              }
            }
          } else {
            switch (this._angleType) {
              case AngAlign:
                if (parentEffect.getTraverseEdge())
                  e.setAngle(parentEffect.getAngle() + this._angleOffset);
                else e.setAngle(e.getEntityDirection() + this._angleOffset);
                break;

              case AngRandom:
                e.setAngle(random(this._angleOffset));
                break;

              case AngSpecify:
                e.setAngle(this._angleOffset);
                break;
            }
          }

          // color settings
          if (this._randomColor) {
            let randomAge = random(this._cR.getLastFrame());
            e.setRed(this.randomizeR(e, randomAge));
            e.setGreen(this.randomizeG(e, randomAge));
            e.setBlue(this.randomizeB(e, randomAge));
          } else {
            e.setRed(this.getEmitterR(0));
            e.setGreen(this.getEmitterG(0));
            e.setBlue(this.getEmitterB(0));
          }
          e.setEntityAlpha(
            e.getEmitter().getEmitterAlpha(e.getAge(), e.getLifeTime()) *
              parentEffect.getCurrentAlpha()
          );

          // blend mode
          e._blendMode = this._blendMode;

          // animation and framerate
          e._animating = this._animate;
          e._animateOnce = this._once;
          e._framerate = this.getEmitterFramerate(0);
          if (this._randomStartFrame)
            e._currentFrame = random(e._avatar.getFramesCount());
          else e._currentFrame = this._currentFrame;

          for (let i = 0; i < this._effects.length; i++) {
            let newEffect = new Effect(this._effects[i], pm);
            newEffect.setParent(e);
            newEffect.setParentEmitter(this);
            newEffect.setEffectLayer(e._effectLayer);
          }

          parentEffect.setParticlesCreated(true);

          // get the relative angle
          if (!this._relative) {
            let radians = (e._angle / 180.0) * M_PI;
            e._matrix.set(
              Math.cos(radians),
              Math.sin(radians),
              -Math.sin(radians),
              Math.cos(radians)
            );
            e._matrix.transformSelf(this._parent.getMatrix());
          }
          e._relativeAngle = this._parent.getRelativeAngle() + e._angle;
          e.updateEntityRadius();
          e.updateBoundingBox();

          // capture old values for tweening
          e.capture();

          if (pm.onParticleSpawnCB) pm.onParticleSpawnCB(e);
        }
      }
      this._counter -= intCounter;
    }
  }

  controlParticle(e) {
    let parentEffect = this._parentEffect;
    let pm = parentEffect.getParticleManager();

    // alpha change
    if (this._alphaRepeat > 1) {
      e._rptAgeA += EffectsLibrary.getCurrentUpdateTime() * this._alphaRepeat;
      e._alpha =
        this.getEmitterAlpha(e._rptAgeA, e._lifeTime) *
        parentEffect.getCurrentAlpha();

      if (e._rptAgeA > e._lifeTime && e._aCycles < this._alphaRepeat) {
        e._rptAgeA -= e._lifeTime;
        ++e._aCycles;
      }
    } else {
      e._alpha =
        this.getEmitterAlpha(e._age, e._lifeTime) *
        parentEffect.getCurrentAlpha();
    }

    // angle changes
    if (this._lockedAngle && this._angleType == AngAlign) {
      if (e._directionLocked) {
        e._angle = parentEffect.getAngle() + this._angle + this._angleOffset;
      } else {
        if (
          (!this._bypassWeight && !parentEffect.isBypassWeight()) ||
          e._direction
        ) {
          if (e._oldWX != e._wx && e._oldWY != e._wy) {
            if (e._relative)
              e._angle = getDirection(e._oldX, e._oldY, e._x, e._y);
            else e._angle = getDirection(e._oldWX, e._oldWY, e._wx, e._wy);

            if (Math.abs(e._oldAngle - e._angle) > 180) {
              if (e._oldAngle > e._angle) e._oldAngle -= 360;
              else e._oldAngle += 360;
            }
          }
        } else {
          e._angle = e._direction + this._angle + this._angleOffset;
        }
      }
    } else {
      if (!this._bypassSpin)
        e._angle +=
          (this.getEmitterSpin(e._age, e._lifeTime) *
            e._spinVariation *
            parentEffect.getCurrentSpin()) /
          EffectsLibrary.getCurrentUpdateTime();
    }

    // direction changes and motion randomness
    if (e._directionLocked) {
      e._direction = 90;
      switch (parentEffect.getClass()) {
        case TypeLine:
          if (parentEffect._distanceSetByLife) {
            let life = e._age / e._lifeTime;
            e._x =
              life * parentEffect.getCurrentWidth() - parentEffect.getHandleX();
          } else {
            switch (parentEffect._endBehavior) {
              case EndKill:
                if (
                  e._x >
                    parentEffect.getCurrentWidth() -
                      parentEffect.getHandleX() ||
                  e._x < 0 - parentEffect.getHandleX()
                )
                  e._dead = 2;
                break;

              case EndLoopAround:
                if (
                  e._x >
                  parentEffect.getCurrentWidth() - parentEffect.getHandleX()
                ) {
                  e._x = -parentEffect.getHandleX();
                  e.miniUpdate();
                  e._oldX = e._x;
                  e._oldWX = e._wx;
                  e._oldWY = e._wy;
                } else if (e._x < 0 - parentEffect.getHandleX()) {
                  e._x =
                    parentEffect.getCurrentWidth() - parentEffect.getHandleX();
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
        let dv =
          e._directionVariation *
          this.getEmitterDirectionVariationOt(e._age, e._lifeTime);
        e._timeTracker += EffectsLibrary.getUpdateTime();
        if (e._timeTracker > EffectsLibrary.motionVariationInterval) {
          e._randomDirection +=
            EffectsLibrary.maxDirectionVariation * randomBetween(-dv, dv);
          e._randomSpeed +=
            EffectsLibrary.maxVelocityVariation * randomBetween(-dv, dv);
          e._timeTracker = 0;
        }
      }
      e._direction =
        e._emissionAngle +
        this.getEmitterDirection(e._age, e._lifeTime) +
        e._randomDirection;
    }

    // size changes
    if (!this._bypassScaleX) {
      e._scaleX =
        (this.getEmitterScaleX(e._age, e._lifeTime) * e._gSizeX * e._width) /
        this._image.getWidth();
    }
    if (this._uniform) {
      if (!this._bypassScaleX) e._scaleY = e._scaleX;
    } else {
      if (!this._bypassScaleY) {
        e._scaleY =
          (this.getEmitterScaleY(e._age, e._lifeTime) * e._gSizeY * e._height) /
          this._image.getHeight();
      }
    }

    // color changes
    if (!this._bypassColor) {
      if (!this._randomColor) {
        if (this._colorRepeat > 1) {
          e._rptAgeC +=
            EffectsLibrary.getCurrentUpdateTime() * this._colorRepeat;
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
    }

    // animation
    if (!this._bypassFramerate)
      e._framerate =
        this.getEmitterFramerate(e._age, e._lifeTime) *
        this._animationDirection;

    // speed changes
    if (!this._bypassSpeed) {
      e._speed =
        this.getEmitterVelocity(e._age, e._lifeTime) *
        e._baseSpeed *
        this.getEmitterGlobalVelocity(parentEffect.getCurrentEffectFrame());
      e._speed += e._randomSpeed;
    } else {
      e._speed = e._randomSpeed;
    }

    // stretch
    if (!this._bypassStretch) {
      if (!this._bypassWeight && !parentEffect.isBypassWeight()) {
        if (e._speed !== 0) {
          e._speedVec.x = e._speedVec.x / EffectsLibrary.getCurrentUpdateTime();
          e._speedVec.y =
            e._speedVec.y / EffectsLibrary.getCurrentUpdateTime() - e._gravity;
        } else {
          e._speedVec.x = 0;
          e._speedVec.y = -e._gravity;
        }

        if (this._uniform)
          e._scaleY =
            (this.getEmitterScaleX(e._age, e._lifeTime) *
              e._gSizeX *
              (e._width +
                Math.abs(e._speed) *
                  this.getEmitterStretch(e._age, e._lifeTime) *
                  parentEffect.getCurrentStretch())) /
            this._image.getWidth();
        else
          e._scaleY =
            (this.getEmitterScaleY(e._age, e._lifeTime) *
              e._gSizeY *
              (e._height +
                Math.abs(e._speed) *
                  this.getEmitterStretch(e._age, e._lifeTime) *
                  parentEffect.getCurrentStretch())) /
            this._image.getHeight();
      } else {
        if (this._uniform)
          e._scaleY =
            (this.getEmitterScaleX(e._age, e._lifeTime) *
              e._gSizeX *
              (e._width +
                Math.abs(e._speed) *
                  this.getEmitterStretch(e._age, e._lifeTime) *
                  parentEffect.getCurrentStretch())) /
            this._image.getWidth();
        else
          e._scaleY =
            (this.getEmitterScaleY(e._age, e._lifeTime) *
              e._gSizeY *
              (e._height +
                Math.abs(e._speed) *
                  this.getEmitterStretch(e._age, e._lifeTime) *
                  parentEffect.getCurrentStretch())) /
            this._image.getHeight();
      }

      if (e._scaleY < e._scaleX) e._scaleY = e._scaleX;
    }

    // weight changes
    if (!this._bypassWeight)
      e._weight = this.getEmitterWeight(e._age, e._lifeTime) * e._baseWeight;
  }

  randomizeR(e, randomAge) {
    return this._cR.getOt(randomAge, e.getLifeTime(), false);
  }

  randomizeG(e, randomAge) {
    return this._cG.getOt(randomAge, e.getLifeTime(), false);
  }

  randomizeB(e, randomAge) {
    return this._cB.getOt(randomAge, e.getLifeTime(), false);
  }

  drawCurrentFrame(x /*= 0*/, y /*= 0*/, w /*= 128.0*/, h /*= 128.0*/) {
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

  compileAll() {
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
    this._cDirectionVariation.compile();
    // over lifetime
    let longestLife = this.getLongestLife();
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
    this._cStretch.compileOT(longestLife);
    // global adjusters
    this._cGlobalVelocity.compile();

    for (let i = 0; i < this._effects.length; i++) {
      this._effects[i].compileAll();
    }

    this.analyseEmitter();
  }

  compileQuick() {
    let longestLife = this.getLongestLife();

    this._cAlpha.clear(1);
    this._cAlpha.setCompiled(0, this.getEmitterAlpha(0, longestLife));

    this._cR.clear(1);
    this._cG.clear(1);
    this._cB.clear(1);
    this._cR.setCompiled(0, this.GetEmitterR(0, longestLife));
    this._cG.setCompiled(0, this.GetEmitterG(0, longestLife));
    this._cB.setCompiled(0, this.GetEmitterB(0, longestLife));

    this._cScaleX.clear(1);
    this._cScaleY.clear(1);
    this._cScaleX.SetCompiled(0, this.GetEmitterScaleX(0, longestLife));
    this._cScaleY.SetCompiled(0, this.GetEmitterScaleY(0, longestLife));

    this._cVelocity.clear(1);
    this._cVelocity.SetCompiled(0, this.GetEmitterVelocity(0, longestLife));

    this._cWeight.clear(1);
    this._cWeight.SetCompiled(0, this.GetEmitterWeight(0, longestLife));

    this._cDirection.clear(1);
    this._cDirection.SetCompiled(0, this.GetEmitterDirection(0, longestLife));

    this._cDirectionVariationOT.clear(1);
    this._cDirectionVariationOT.SetCompiled(
      0,
      this.GetEmitterDirectionVariationOT(0, longestLife)
    );

    this._cFramerate.clear(1);
    this._cFramerate.SetCompiled(0, this.GetEmitterFramerate(0, longestLife));

    this._cStretch.clear(1);
    this._cStretch.SetCompiled(0, this.GetEmitterStretch(0, longestLife));

    this._cSplatter.clear(1);
    this._cSplatter.SetCompiled(0, this.GetEmitterSplatter(0));
  }

  analyseEmitter() {
    this.resetBypassers();

    if (
      !this._cLifeVariation.getLastFrame() &&
      !this.getEmitterLifeVariation(0)
    )
      this._bypassLifeVariation = true;

    if (!this.getEmitterStretch(0, 1.0)) this._bypassStretch = true;

    if (!this._cFramerate.getLastFrame() && !this.getEmitterSplatter(0))
      this._bypassFramerate = true;

    if (!this._cSplatter.getLastFrame() && !this._cSplatter.get(0))
      this._bypassSplatter = true;

    if (
      !this._cBaseWeight.getLastFrame() &&
      !this._cWeightVariation.getLastFrame() &&
      !this.getEmitterBaseWeight(0) &&
      !this.getEmitterWeightVariation(0)
    )
      this._bypassWeight = true;

    if (!this._cWeight.getLastFrame() && !this._cWeight.get(0))
      this._bypassWeight = true;

    if (
      !this._cBaseSpeed.getLastFrame() &&
      !this._cVelVariation.getLastFrame() &&
      !this.getEmitterBaseSpeed(0) &&
      !this.getEmitterVelVariation(0)
    )
      this._bypassSpeed = true;

    if (
      !this._cBaseSpin.getLastFrame() &&
      !this._cSpinVariation.getLastFrame() &&
      !this.getEmitterBaseSpin(0) &&
      !this.getEmitterSpinVariation(0)
    )
      this._bypassSpin = true;

    if (
      !this._cDirectionVariation.getLastFrame() &&
      !this.getEmitterDirectionVariation(0)
    )
      this._bypassDirectionvariation = true;

    if (this._cR.getAttributesCount() <= 1) {
      this._bRed = this.getEmitterR(0, 1.0) !== 0;
      this._bGreen = this.getEmitterG(0, 1.0) !== 0;
      this._bBlue = this.getEmitterB(0, 1.0) !== 0;
      this._bypassColor = true;
    }

    if (this._cScaleX.getAttributesCount() <= 1) this._bypassScaleX = true;

    if (this._cScaleY.getAttributesCount() <= 1) this._bypassScaleY = true;
  }

  resetBypassers() {
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

  getLongestLife() {
    let longestLife =
      (this._cLifeVariation.getMaxValue() + this._cLife.getMaxValue()) *
      this._parentEffect.getLifeMaxValue();

    return longestLife;
    // No idea what units we're supposed to be using here
    // return this._parentEffect.GetLifeMaxValue();
  }

  getEmitterLife(frame) {
    return this._cLife.get(frame);
  }

  getEmitterLifeVariation(frame) {
    return this._cLifeVariation.get(frame);
  }

  getEmitterAmount(frame) {
    return this._cAmount.get(frame);
  }

  getEmitterSizeX(frame) {
    return this._cSizeX.get(frame);
  }

  getEmitterSizeY(frame) {
    return this._cSizeY.get(frame);
  }

  getEmitterBaseSpeed(frame) {
    return this._cBaseSpeed.get(frame);
  }

  getEmitterBaseWeight(frame) {
    return this._cBaseWeight.get(frame);
  }

  getEmitterBaseSpin(frame) {
    return this._cBaseSpin.get(frame);
  }

  getEmitterEmissionAngle(frame) {
    return this._cEmissionAngle.get(frame);
  }

  getEmitterEmissionRange(frame) {
    return this._cEmissionRange.get(frame);
  }

  getEmitterSplatter(frame) {
    return this._cSplatter.get(frame);
  }

  getEmitterVelVariation(frame) {
    return this._cVelVariation.get(frame);
  }

  getEmitterWeightVariation(frame) {
    return this._cWeightVariation.get(frame);
  }

  getEmitterAmountVariation(frame) {
    return this._cAmountVariation.get(frame);
  }

  getEmitterSizeXVariation(frame) {
    return this._cSizeXVariation.get(frame);
  }

  getEmitterSizeYVariation(frame) {
    return this._cSizeYVariation.get(frame);
  }

  getEmitterSpinVariation(frame) {
    return this._cSpinVariation.get(frame);
  }

  getEmitterDirectionVariation(frame) {
    return this._cDirectionVariation.get(frame);
  }

  getEmitterAlpha(age, lifetime = 0) {
    return this._cAlpha.getOt(age, lifetime);
  }

  getEmitterR(age, lifetime = 0) {
    return this._cR.getOt(age, lifetime);
  }

  getEmitterG(age, lifetime = 0) {
    return this._cG.getOt(age, lifetime);
  }

  getEmitterB(age, lifetime = 0) {
    return this._cB.getOt(age, lifetime);
  }

  getEmitterScaleX(age, lifetime = 0) {
    return this._cScaleX.getOt(age, lifetime);
  }

  getEmitterScaleY(age, lifetime = 0) {
    return this._cScaleY.getOt(age, lifetime);
  }

  getEmitterSpin(age, lifetime = 0) {
    return this._cSpin.getOt(age, lifetime);
  }

  getEmitterVelocity(age, lifetime = 0) {
    return this._cVelocity.getOt(age, lifetime);
  }

  getEmitterWeight(age, lifetime = 0) {
    return this._cWeight.getOt(age, lifetime);
  }

  getEmitterDirection(age, lifetime = 0) {
    return this._cDirection.getOt(age, lifetime);
  }

  getEmitterDirectionVariationOt(age, lifetime = 0) {
    return this._cDirectionVariationOT.getOt(age, lifetime);
  }

  getEmitterFramerate(age, lifetime = 0) {
    return this._cFramerate.getOt(age, lifetime);
  }

  getEmitterStretch(age, lifetime = 0) {
    return this._cStretch.getOt(age, lifetime);
  }

  getEmitterGlobalVelocity(frame) {
    return this._cGlobalVelocity.get(frame);
  }

  getEffects() {
    return this._effects;
  }

  isDying() {
    return this._dying;
  }

  setPath(path) {
    this._path = path;
  }

  getImages(images) {
    if (this._image) images[this._image._index] = this._image;

    for (let i = 0; i < this._effects.length; i++) {
      this._effects[i].getImages(images);
    }
  }
}

export default Emitter;
