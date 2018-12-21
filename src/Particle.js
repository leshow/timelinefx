import Entity from "./Entity";

class Particle extends Entity // Class(Entity, ...) {
  constructor() {
    super(this); // Call parent's constructor

    this._emitter = null;

    this._weightVariation = 0;
    this._scaleVariationX = 0;
    this._scaleVariationY = 0;
    this._gSizeX = 0;
    this._gSizeY = 0;

    this._velVariation = 0;
    this._spinVariation = 0;

    this._directionVariation = 0;
    this._timeTracker = 0;
    this._randomDirection = 0;
    this._randomSpeed = 0;
    this._emissionAngle = 0;
    this._releaseSingleParticle = false;

    this._particleManager = null;
    this._layer = 0;
    this._groupParticles = false;
    this._effectLayer = 0;
  }

  reset() {
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

  update() {
    this.capture();

    if (this._emitter.isDying() || this._emitter.isOneShot() || this._dead)
      this._releaseSingleParticle = true;

    if (this._emitter.isSingleParticle() && !this._releaseSingleParticle) {
      this._age = this._particleManager.getCurrentTime() - this._dob;
      if (this._age > this._lifeTime) {
        this._age = 0;
        this._dob = this._particleManager.getCurrentTime();
      }
    } else {
      this._age = this._particleManager.getCurrentTime() - this._dob;
    }

    super.update(); // Particle.$superp.Update.call(this);

    if (this._age > this._lifeTime || this._dead == 2) {
      // if dead=2 then that means its reached the end of the line (in kill mode) for line traversal effects
      this._dead = 1;
      if (this._children.length === 0) {
        this._particleManager.releaseParticle(this); // TODO
        if (this._emitter.isGroupParticles())
          this._emitter.getParentEffect().removeInUse(this._layer, this); // TODO

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

  destroy(releaseChildren) {
    this._particleManager.releaseParticle(this); // TODO
    super.destroy(); // Particle.$superp.Destroy();
    this.reset();
  }
  setX(x) {
    this._oldX = this._age > 0 ? this._x : x;
    this._x = x;
  }
  setY(y) {
    this._oldY = this._age > 0 ? this._y : y;
    this._y = y;
  }
  setZ(z) {
    this._oldZ = this._age > 0 ? this._z : z;
    this._z = z;
  }

  setGroupParticles(value) {
    this._groupParticles = value;
  }

  isGroupParticles() {
    return this._groupParticles;
  }

  setLayer(layer) {
    this._layer = layer;
  }

  getLayer() {
    return this._layer;
  }

  setEmitter(e) {
    this._emitter = e;
  }

  getEmitter() {
    return this._emitter;
  }

  getEffectLayer() {
    return this._effectLayer;
  }

  setParticleManager(pm) {
    this._particleManager = pm;
  }

  setEffectLayer(layer) {
    this._effectLayer = layer;
  }

  setVelVariation(velVariation) {
    this._velVariation = velVariation;
  }

  getVelVariation() {
    return this._velVariation;
  }

  setGSizeX(gSizeX) {
    this._gSizeX = gSizeX;
  }

  setGSizeY(gSizeY) {
    this._gSizeY = gSizeY;
  }

  getGSizeX() {
    return this._gSizeX;
  }

  getGSizeY() {
    return this._gSizeY;
  }

  setScaleVariationX(scaleVarX) {
    this._scaleVariationX = scaleVarX;
  }

  getScaleVariationX() {
    return this._scaleVariationX;
  }

  setScaleVariationY(scaleVarY) {
    this._scaleVariationY = scaleVarY;
  }

  getScaleVariationY() {
    return this._scaleVariationY;
  }

  setEmissionAngle(emissionAngle) {
    this._emissionAngle = emissionAngle;
  }

  getEmissionAngle() {
    return this._emissionAngle;
  }

  setDirectionVairation(dirVar) {
    this._directionVariation = dirVar;
  }

  getDirectionVariation() {
    return this._directionVariation;
  }

  setSpinVariation(spinVar) {
    this._spinVariation = spinVar;
  }

  getSpinVariation() {
    return this._spinVariation;
  }

  setWeightVariation(weightVar) {
    this._weightVariation = weightVar;
  }

  getWeightVariation() {
    return this._weightVariation;
  }
}

export default Particle;