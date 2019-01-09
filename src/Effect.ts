import {
  removeFromList,
  XMLHelper,
  getXMLAttrSafe,
  forEachXMLChild,
  getNodeAttrValue
} from "./Utils";
import Entity from "./Entity";
import Emitter from "./Emitter";
import EmitterArray from "./EmitterArray";
import EffectsLibrary from "./EffectsLibrary";
import ParticleManager from "./ParticleManager";
import Particle from "./Particle";
import AnimImage from "./AnimImage";

export const TypePoint = 0;
export const TypeArea = 1;
export const TypeLine = 2;
export const TypeEllipse = 3;

export const EmInwards = 0;
export const EmOutwards = 1;
export const EmSpecified = 2;
export const EmInAndOut = 3;

export const EndKill = 0;
export const EndLoopAround = 1;
export const EndLetFree = 2;

const g_defaultEffect = {
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

class Effect extends Entity {
  _cAmount: EmitterArray;
  _cLife: EmitterArray;
  _cSizeX: EmitterArray;
  _cSizeY: EmitterArray;
  _cVelocity: EmitterArray;
  _cWeight: EmitterArray;
  _cSpin: EmitterArray;
  _cStretch: EmitterArray;
  _cGlobalZ: EmitterArray;
  _cAlpha: EmitterArray;
  _cEmissionAngle: EmitterArray;
  _cEmissionRange: EmitterArray;
  _cWidth: EmitterArray;
  _cHeight: EmitterArray;
  _cEffectAngle: EmitterArray;

  _class: number = TypePoint;
  _currentEffectFrame: number = 0;
  _handleCenter: boolean = false;
  _source: number | null = null;
  _lockAspect: boolean = true;
  _particlesCreated: boolean = false;
  _suspendTime: number = 0;
  _gx: number = 0;
  _gy: number = 0;
  _mgx: number = 0;
  _mgy: number = 0;
  _emitAtPoints: boolean = false;
  _emissionType: number = EmInwards;
  _effectLength: number = 0;
  _parentEmitter: Emitter | null = null;
  _spawnAge: number = 0;
  _index: number = 0;
  _particleCount: number = 0;
  _idleTime: number = 0;
  _traverseEdge: boolean = false;
  _endBehavior: number = EndKill;
  _distanceSetByLife: boolean = false;
  _reverseSpawn: boolean = false;
  _spawnDirection: number = 1;
  _dying: boolean = false;
  _allowSpawning: boolean = true;
  _ellipseArc: number = 360.0;
  _ellipseOffset: number = 0;
  _effectLayer: number = 0;
  _doesNotTimeout: boolean = false;

  _particleManager: ParticleManager | null = null;

  _frames: number = 32;
  _animWidth: number = 128;
  _animHeight: number = 128;
  _looped: boolean = false;
  _animX: number = 0;
  _animY: number = 0;
  _seed: number = 0;
  _zoom: number = 1.0;
  _frameOffset: number = 0;

  _bypassWeight: boolean = false;
  _isCompiled: boolean = false;
  _currentLife: number = 0;
  _currentAmount: number = 0;
  _currentSizeX: number = 0;
  _currentSizeY: number = 0;
  _currentVelocity: number = 0;
  _currentSpin: number = 0;
  _currentWeight: number = 0;
  _currentWidth: number = 0;
  _currentHeight: number = 0;
  _currentAlpha: number = 0;
  _currentEmissionAngle: number = 0;
  _currentEmissionRange: number = 0;
  _currentStretch: number = 0;
  _currentGlobalZ: number = 0;

  _overrideSize: boolean = false;
  _overrideEmissionAngle: boolean = false;
  _overrideEmissionRange: boolean = false;
  _overrideAngle: boolean = false;
  _overrideLife: boolean = false;
  _overrideAmount: boolean = false;
  _overrideVelocity: boolean = false;
  _overrideSpin: boolean = false;
  _overrideSizeX: boolean = false;
  _overrideSizeY: boolean = false;
  _overrideWeight: boolean = false;
  _overrideAlpha: boolean = false;
  _overrideStretch: boolean = false;
  _overrideGlobalZ: boolean = false;

  _particleManager: ParticleManager | undefined;
  _arrayOwner: boolean;
  _inUse: Array<Array<Entity>> = [[]];
  _children: Array<Emitter> = [];
  _path: string = "";
  _directoryEffects: Array<Effect> = [];
  _directoryEmitters: Array<Emitter> = [];

  constructor(other: Effect, particleManager: ParticleManager) {
    super(other);

    if (other === undefined) {
      for (let key in g_defaultEffect) {
        this[key] = g_defaultEffect[key];
      }

      this._arrayOwner = true;

      this._inUse = [];
      for (let i = 0; i < 10; i++) this._inUse[i] = [];

      this._cAmount = new EmitterArray(
        (EffectsLibrary as any).globalPercentMin,
        (EffectsLibrary as any).globalPercentMax
      );
      this._cLife = new EmitterArray(
        (EffectsLibrary as any).globalPercentMin,
        (EffectsLibrary as any).globalPercentMax
      );
      this._cSizeX = new EmitterArray(
        (EffectsLibrary as any).globalPercentMin,
        (EffectsLibrary as any).globalPercentMax
      );
      this._cSizeY = new EmitterArray(
        (EffectsLibrary as any).globalPercentMin,
        (EffectsLibrary as any).globalPercentMax
      );
      this._cVelocity = new EmitterArray(
        (EffectsLibrary as any).globalPercentMin,
        (EffectsLibrary as any).globalPercentMax
      );
      this._cWeight = new EmitterArray(
        (EffectsLibrary as any).globalPercentMin,
        (EffectsLibrary as any).globalPercentMax
      );
      this._cSpin = new EmitterArray(
        (EffectsLibrary as any).globalPercentMin,
        (EffectsLibrary as any).globalPercentMax
      );
      this._cStretch = new EmitterArray(
        (EffectsLibrary as any).globalPercentMin,
        (EffectsLibrary as any).globalPercentMax
      );
      this._cGlobalZ = new EmitterArray(
        (EffectsLibrary as any).globalPercentMin,
        (EffectsLibrary as any).globalPercentMax
      );
      this._cAlpha = new EmitterArray(0, 1.0);
      this._cEmissionAngle = new EmitterArray(
        (EffectsLibrary as any).angleMin,
        (EffectsLibrary as any).angleMax
      );
      this._cEmissionRange = new EmitterArray(
        (EffectsLibrary as any).emissionRangeMin,
        (EffectsLibrary as any).emissionRangeMax
      );
      this._cWidth = new EmitterArray(
        (EffectsLibrary as any).dimensionsMin,
        (EffectsLibrary as any).dimensionsMax
      );
      this._cHeight = new EmitterArray(
        (EffectsLibrary as any).dimensionsMin,
        (EffectsLibrary as any).dimensionsMax
      );
      this._cEffectAngle = new EmitterArray(
        (EffectsLibrary as any).angleMin,
        (EffectsLibrary as any).angleMax
      );
    } else {
      for (let key in g_defaultEffect) (this as any)[key] = (other as any)[key];

      this._particleManager = particleManager;
      this._arrayOwner = false;

      this._inUse = [];
      for (let i = 0; i < 10; i++) this._inUse[i] = [];

      this._cAmount = other._cAmount;
      this._cLife = other._cLife;
      this._cSizeX = other._cSizeX;
      this._cSizeY = other._cSizeY;
      this._cVelocity = other._cVelocity;
      this._cWeight = other._cWeight;
      this._cSpin = other._cSpin;
      this._cAlpha = other._cAlpha;
      this._cEmissionAngle = other._cEmissionAngle;
      this._cEmissionRange = other._cEmissionRange;
      this._cWidth = other._cWidth;
      this._cHeight = other._cHeight;
      this._cEffectAngle = other._cEffectAngle;
      this._cStretch = other._cStretch;
      this._cGlobalZ = other._cGlobalZ;

      this.setEllipseArc(other._ellipseArc);

      this._dob = particleManager.getCurrentTime();
      this.setOKtoRender(false);

      for (let i = 0; i < other._children.length; i++) {
        let e = new Emitter(other._children[i], particleManager);
        e.setParentEffect(this);
        e.setParent(this);
      }
    }
  }

  hideAll() {
    for (let i = 0; i < this._children.length; i++) {
      this._children[i].hideAll();
    }
  }

  getEffectLayer(): number {
    return this._effectLayer;
  }

  setEffectLayer(layer: number) {
    this._effectLayer = layer;
  }

  showOne(e: Emitter) {
    for (let i = 0; i < this._children.length; i++) {
      this._children[i].setVisible(false);
    }
    e.setVisible(true);
  }

  emitterCount() {
    return this._children.length;
  }

  setParticleManager(particleManager: ParticleManager) {
    this._particleManager = particleManager;
  }

  update() {
    this.capture();

    this._age = this._particleManager.getCurrentTime() - this._dob;

    if (this._spawnAge < this._age) this._spawnAge = this._age;

    if (this._effectLength > 0 && this._age > this._effectLength) {
      this._dob = this._particleManager.getCurrentTime();
      this._age = 0;
    }

    this._currentEffectFrame = this._age / EffectsLibrary.getLookupFrequency();

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
    }

    // can be optimized
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
      let parentEffect = this._parentEmitter.getParentEffect();
      if (!this._overrideLife)
        this._currentLife =
          this.getLife(this._currentEffectFrame) * parentEffect._currentLife;
      if (!this._overrideAmount)
        this._currentAmount =
          this.getAmount(this._currentEffectFrame) *
          parentEffect._currentAmount;
      if (this._lockAspect) {
        if (!this._overrideSizeX)
          this._currentSizeX =
            this.getSizeX(this._currentEffectFrame) *
            parentEffect._currentSizeX;
        if (!this._overrideSizeY)
          this._currentSizeY = this._currentSizeX * parentEffect._currentSizeY;
      } else {
        if (!this._overrideSizeX)
          this._currentSizeX =
            this.getSizeX(this._currentEffectFrame) *
            parentEffect._currentSizeX;
        if (!this._overrideSizeY)
          this._currentSizeY =
            this.getSizeY(this._currentEffectFrame) *
            parentEffect._currentSizeY;
      }
      if (!this._overrideVelocity)
        this._currentVelocity =
          this.getVelocity(this._currentEffectFrame) *
          parentEffect._currentVelocity;
      if (!this._overrideWeight)
        this._currentWeight =
          this.getWeight(this._currentEffectFrame) *
          parentEffect._currentWeight;
      if (!this._overrideSpin)
        this._currentSpin =
          this.getSpin(this._currentEffectFrame) * parentEffect._currentSpin;
      if (!this._overrideAlpha)
        this._currentAlpha =
          this.getAlpha(this._currentEffectFrame) * parentEffect._currentAlpha;
      if (!this._overrideEmissionAngle)
        this._currentEmissionAngle = this.getEmissionAngle(
          this._currentEffectFrame
        );
      if (!this._overrideEmissionRange)
        this._currentEmissionRange = this.getEmissionRange(
          this._currentEffectFrame
        );
      if (!this._overrideAngle)
        this._angle = this.getEffectAngle(this._currentEffectFrame);
      if (!this._overrideStretch)
        this._currentStretch =
          this.getStretch(this._currentEffectFrame) *
          parentEffect._currentStretch;
      if (!this._overrideGlobalZ)
        this._currentGlobalZ =
          this.getGlobalZ(this._currentEffectFrame) *
          parentEffect._currentGlobalZ;
    } else {
      if (!this._overrideLife)
        this._currentLife = this.getLife(this._currentEffectFrame);
      if (!this._overrideAmount)
        this._currentAmount = this.getAmount(this._currentEffectFrame);
      if (this._lockAspect) {
        if (!this._overrideSizeX)
          this._currentSizeX = this.getSizeX(this._currentEffectFrame);
        if (!this._overrideSizeY) this._currentSizeY = this._currentSizeX;
      } else {
        if (!this._overrideSizeX)
          this._currentSizeX = this.getSizeX(this._currentEffectFrame);
        if (!this._overrideSizeY)
          this._currentSizeY = this.getSizeY(this._currentEffectFrame);
      }
      if (!this._overrideVelocity)
        this._currentVelocity = this.getVelocity(this._currentEffectFrame);
      if (!this._overrideWeight)
        this._currentWeight = this.getWeight(this._currentEffectFrame);
      if (!this._overrideSpin)
        this._currentSpin = this.getSpin(this._currentEffectFrame);
      if (!this._overrideAlpha)
        this._currentAlpha = this.getAlpha(this._currentEffectFrame);
      if (!this._overrideEmissionAngle)
        this._currentEmissionAngle = this.getEmissionAngle(
          this._currentEffectFrame
        );
      if (!this._overrideEmissionRange)
        this._currentEmissionRange = this.getEmissionRange(
          this._currentEffectFrame
        );
      if (!this._overrideAngle)
        this._angle = this.getEffectAngle(this._currentEffectFrame);
      if (!this._overrideStretch)
        this._currentStretch = this.getStretch(this._currentEffectFrame);
      if (!this._overrideGlobalZ)
        this._currentGlobalZ = this.getGlobalZ(this._currentEffectFrame);
    }

    if (!this._overrideGlobalZ) this._z = this._currentGlobalZ;

    if (this._currentWeight === 0) this._bypassWeight = true;

    if (this._parentEmitter) this._dying = this._parentEmitter.isDying();

    super.update(); // Effect.$superp.Update.call(this);

    if (this._idleTime > this._particleManager.getIdleTimeLimit())
      this._dead = 1;

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

  hasParticles() {
    for (let i = 0; i < this._children.length; i++) {
      if (this._children[i].getChildCount() > 0) return true;
    }

    return false;
  }

  getParticleManager() {
    return this._particleManager;
  }

  getParticles(layer: number) {
    return this._inUse[layer];
  }

  isDying() {
    return this._dying;
  }

  softKill() {
    this._dying = true;
  }

  hardKill() {
    this._particleManager.removeEffect(this);
    this.destroy();
  }

  destroy(releaseChildren?: boolean) {
    this._parentEmitter = null;
    this._directoryEffects = [];
    this._directoryEmitters = [];
    for (let i = 0; i < this._inUse.length; i++) {
      while (this._inUse[i].length !== 0) {
        let p = this._inUse[i].pop();
        p.reset();
        this._particleManager.releaseParticle(p as Particle);
        this.removeInUse(i, p as Particle);
      }
      this._inUse[i] = [];
    }

    super.destroy(releaseChildren); // Effect.$superp.Destroy.call(this, releaseChildren);
  }

  setEndBehavior(behavior: number) {
    this._endBehavior = behavior;
  }

  setDistanceSetByLife(value: boolean) {
    this._distanceSetByLife = value;
  }

  setHandleCenter(center: boolean) {
    this._handleCenter = center;
  }

  setReverseSpawn(reverse: boolean) {
    this._reverseSpawn = reverse;
  }

  setSpawnDirection() {
    if (this._reverseSpawn) this._spawnDirection = -1;
    else this._spawnDirection = 1;
  }

  setAreaSize(width: number, height: number) {
    this._overrideSize = true;
    this._currentWidth = width;
    this._currentHeight = height;
  }

  setLineLength(length: number) {
    this._overrideSize = true;
    this._currentWidth = length;
  }

  setEmissionAngle(angle: number) {
    this._overrideEmissionAngle = true;
    this._currentEmissionAngle = angle;
  }

  setEffectAngle(angle: number) {
    this._overrideAngle = true;
    this._angle = angle;
  }

  setLife(life: number) {
    this._overrideLife = true;
    this._currentLife = life;
  }

  setAmount(amount: number) {
    this._overrideAmount = true;
    this._currentAmount = amount;
  }

  setVelocity(velocity: number) {
    this._overrideVelocity = true;
    this._currentVelocity = velocity;
  }

  setSpin(spin: number) {
    this._overrideSpin = true;
    this._currentSpin = spin;
  }

  setWeight(weight: number) {
    this._overrideWeight = true;
    this._currentWeight = weight;
  }

  setEffectParticleSize(sizeX: number, sizeY: number) {
    this._overrideSizeX = true;
    this._overrideSizeY = true;
    this._currentSizeX = sizeX;
    this._currentSizeY = sizeY;
  }

  setSizeX(sizeX: number) {
    this._overrideSizeX = true;
    this._currentSizeX = sizeX;
  }

  setSizeY(sizeY: number) {
    this._overrideSizeY = true;
    this._currentSizeY = sizeY;
  }

  setEffectAlpha(alpha: number) {
    this._overrideAlpha = true;
    this._currentAlpha = alpha;
  }

  setEffectEmissionRange(emissionRange: number) {
    this._overrideEmissionRange = true;
    this._currentEmissionRange = emissionRange;
  }

  setEllipseArc(degrees: number) {
    this._ellipseArc = degrees;
    this._ellipseOffset = 90 - degrees / 2;
  }

  setZ(z: number) {
    this._overrideGlobalZ = true;
    this._z = z;
  }

  setStretch(stretch: number) {
    this._overrideStretch = true;
    this._currentStretch = stretch;
  }

  setGroupParticles(v: boolean) {
    for (let i = 0; i < this._children.length; i++) {
      let e = this._children[i];

      e.setGroupParticles(v);

      let effects = e.getEffects();
      for (let j = 0; j < effects.length; j++) {
        effects[j].setGroupParticles(v);
      }
    }
  }

  addInUse(layer: number, p: Entity) {
    // the particle is managed by this Effect
    this.setGroupParticles(true);
    this._inUse[layer].push(p);
  }

  removeInUse(layer: number, p: Particle) {
    removeFromList(this._inUse[layer], p);
  }

  compileAll() {
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

    for (let i = 0; i < this._children.length; i++) {
      this._children[i].compileAll();
    }

    this._isCompiled = true;
  }

  compileQuick() {
    for (let i = 0; i < this._children.length; i++) {
      let e = this._children[i];
      e.compileQuick();
      e.resetBypassers();
    }
  }

  compileAmount() {
    this._cAmount.compile();
  }

  compileLife() {
    this._cLife.compile();
  }

  compileSizeX() {
    this._cSizeX.compile();
  }

  compileSizeY() {
    this._cSizeY.compile();
  }

  compileVelocity() {
    this._cVelocity.compile();
  }

  compileWeight() {
    this._cWeight.compile();
  }

  compileSpin() {
    this._cSpin.compile();
  }

  compileAlpha() {
    this._cAlpha.compile();
  }

  compileEmissionAngle() {
    this._cEmissionAngle.compile();
  }

  compileEmissionRange() {
    this._cEmissionRange.compile();
  }

  compileWidth() {
    this._cWidth.compile();
  }

  compileHeight() {
    this._cHeight.compile();
  }

  compileAngle() {
    this._cEffectAngle.compile();
  }

  compileStretch() {
    this._cStretch.compile();
  }

  compileGlobalZ() {
    this._cGlobalZ.compile();
    this._cGlobalZ.setCompiled(0, 1.0);
  }

  getLife(frame: number) {
    return this._cLife.get(frame);
  }

  getAmount(frame: number) {
    return this._cAmount.get(frame);
  }

  getSizeX(frame: number) {
    return this._cSizeX.get(frame);
  }

  getSizeY(frame: number) {
    return this._cSizeY.get(frame);
  }

  getVelocity(frame: number) {
    return this._cVelocity.get(frame);
  }

  getWeight(frame: number) {
    return this._cWeight.get(frame);
  }

  getSpin(frame: number) {
    return this._cSpin.get(frame);
  }

  getAlpha(frame: number) {
    return this._cAlpha.get(frame);
  }

  getEmissionAngle(frame: number) {
    return this._cEmissionAngle.get(frame);
  }

  getEmissionRange(frame: number) {
    return this._cEmissionRange.get(frame);
  }

  getWidth(frame: number) {
    return this._cWidth.get(frame);
  }

  getHeight(frame: number) {
    return this._cHeight.get(frame);
  }

  getEffectAngle(frame: number) {
    return this._cEffectAngle.get(frame);
  }

  getStretch(frame: number) {
    return this._cStretch.get(frame);
  }

  getGlobalZ(frame: number) {
    return this._cGlobalZ.get(frame);
  }

  loadFromXML(xml: any) {
    let x = new XMLHelper(xml);
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
    this._reverseSpawn = x.getAttrAsBool("REVERSE_SPAWN_DIRECTION");

    // Build path
    this._path = this._name;
    let p = xml.parentNode;
    while (p) {
      let parentName = getXMLAttrSafe(p, "NAME");
      if (parentName !== "") this._path = parentName + "/" + this._path;

      p = p.parentNode;
    }

    let animProps = xml.getElementsByTagName("ANIMATION_PROPERTIES")[0];
    if (animProps) {
      let a = new XMLHelper(animProps);
      this._frames = a.getAttrAsInt("FRAMES");
      this._animWidth = a.getAttrAsInt("WIDTH");
      this._animHeight = a.getAttrAsInt("HEIGHT");
      this._animX = a.getAttrAsInt("X");
      this._animY = a.getAttrAsInt("Y");
      this._seed = a.getAttrAsInt("SEED");
      this._looped = a.getAttrAsBool("LOOPED");
      this._zoom = a.getAttrAsFloat("ZOOM");
      this._frameOffset = a.getAttrAsInt("FRAME_OFFSET");
    }

    // todo: pass in EmitterArray instend of bound function (and remove boilerplate functions)
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

    let _this = this;

    forEachXMLChild(xml, "PARTICLE", n => {
      let emit = new Emitter();
      emit.loadFromXML(n, _this);
      _this.addChild(emit);
    });
  }

  readAttribute(xml: any, emitArray: EmitterArray, tag: string) {
    let result = false;
    forEachXMLChild(xml, tag, n => {
      let attr = emitArray.add(
        parseFloat(getNodeAttrValue(n, "FRAME")),
        parseFloat(getNodeAttrValue(n, "VALUE"))
      );
      attr.loadFromXML(n.getElementsByTagName("CURVE")[0]);
      result = true;
    });
    return result;
  }

  addStretch(f: number, v: number) {
    return this._cStretch.add(f, v);
  }

  getPath() {
    return this._path;
  }

  getLifeMaxValue() {
    return this._cLife.getMaxValue();
  }

  getCurrentAmount() {
    return this._currentAmount;
  }

  getCurrentLife() {
    return this._currentLife;
  }

  getCurrentEmissionAngle() {
    return this._currentEmissionAngle;
  }

  getCurrentEmissionRange() {
    return this._currentEmissionRange;
  }

  getClass() {
    return this._class;
  }

  setCurrentEffectFrame(frame: number) {
    this._currentEffectFrame = frame;
  }

  getCurrentEffectFrame() {
    return this._currentEffectFrame;
  }

  getTraverseEdge() {
    return this._traverseEdge;
  }

  getCurrentVelocity() {
    return this._currentVelocity;
  }

  getCurrentSizeX() {
    return this._currentSizeX;
  }

  getCurrentSizeY() {
    return this._currentSizeY;
  }

  getCurrentStretch() {
    return this._currentStretch;
  }

  getCurrentWeight() {
    return this._currentWeight;
  }

  isBypassWeight() {
    return this._bypassWeight;
  }

  getCurrentAlpha() {
    return this._currentAlpha;
  }

  setParticlesCreated(value: boolean) {
    this._particlesCreated = value;
  }

  getCurrentSpin() {
    return this._currentSpin;
  }

  getLifeLastFrame() {
    return this._cLife.getLastFrame();
  }

  setEffectLength(length: number) {
    this._effectLength = length;
  }

  setParentEmitter(emitter: Emitter) {
    this._parentEmitter = emitter;
  }

  getHandleCenter() {
    return this._handleCenter;
  }

  getEmitAtPoints() {
    return this._emitAtPoints;
  }

  getCurrentWidth() {
    return this._currentWidth;
  }

  getCurrentHeight() {
    return this._currentHeight;
  }

  getEllipseArc() {
    return this._ellipseArc;
  }

  getEllipseOffset() {
    return this._ellipseOffset;
  }

  getEmissionType() {
    return this._emissionType;
  }

  getParentEmitter() {
    return this._parentEmitter;
  }

  getMGX() {
    return this._mgx;
  }

  getMGY() {
    return this._mgy;
  }

  getImages(images: Array<AnimImage>) {
    for (let i = 0; i < this._children.length; i++) {
      this._children[i].getImages(images);
    }
  }
}

export default Effect;
