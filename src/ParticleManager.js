import { fmod, lerp } from "./Utils";
import { drawSprite } from "../exp/pixi_main";
import EffectsLibrary from "./EffectsLibrary";

class ParticleManager {
  static c_particleLimit = 5000;

  constructor(particles = ParticleManager.c_particleLimit, layers = 1) {
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

    for (let el = 0; el < layers; ++el) {
      this._inUse[el] = [];
      this._effects[el] = [];

      // Seems ridiculous
      for (let i = 0; i < 10; ++i) {
        this._inUse[el][i] = [];
      }
    }

    this._unused = [];
    for (let c = 0; c < particles; ++c) {
      let p = new Particle();
      p.setOKtoRender(false);
      this._unused.push(p);
    }
  }

  update() {
    if (!this._paused) {
      this._currentTime += EffectsLibrary.getUpdateTime();
      this._currentTick++;

      for (let i = 0; i < this._effectLayers; i++) {
        let list = this._effects[i];
        for (let j = 0; j < list.length; j++) {
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

  grabParticle(effect, pool, layer = 0) {
    if (this._unused.length > 0) {
      let p = this._unused.pop();

      p.setLayer(layer);
      p.setGroupParticles(pool);

      if (pool) effect.addInUse(layer, p);
      else this._inUse[effect.getEffectLayer()][layer].push(p);

      this._inUseCount++;

      return p;
    }

    return null;
  }

  releaseParticle(p) {
    if (this.onParticleKilledCB) this.onParticleKilledCB(p);

    this._inUseCount--;
    this._unused.push(p);
    if (!p.isGroupParticles()) {
      let pList = this._inUse[p.getEffectLayer()][p.getLayer()];
      removeFromList(pList, p);
    }
  }

  drawParticles(tween = 1.0, layer = -1) {
    // tween origin
    this._currentTween = tween;
    this._camtx = -lerp(this._oldOriginX, this._originX, tween);
    this._camty = -lerp(this._oldOriginY, this._originY, tween);
    this._camtz = lerp(this._oldOriginZ, this._originZ, tween);

    if (this._angle !== 0) {
      this._angleTweened = lerp(_oldAngle, _angle, tween);
      let a = (this._angleTweened / 180.0) * M_PI;
      //  this._matrix.Set(cos(a), sin(a), -sin(a), cos(a));  // CHECK
    }

    let layers = 0;
    let startLayer = 0;
    if (layer == -1 || layer >= this._effectLayers) {
      layers = this._effectLayers - 1;
    } else {
      layers = layer;
      startLayer = layer;
    }

    for (let el = startLayer; el <= layers; ++el) {
      for (
        let i = 0;
        i < 10;
        ++i // wtf
      ) {
        let plist = this._inUse[el][i];
        for (let j = 0; j < plist.length; j++) {
          this.drawParticle(plist[j]);
        }
      }
    }
    this.drawEffects();
  }

  drawBoundingBoxes() {
    for (let el = 0; el < this._effectLayers; ++el) {
      let list = this._effects[el];
      for (let j = 0; j < list.length; j++) list[j].drawBoundingBox();
    }
  }

  setOrigin(x, y, z = 1.0) {
    this.setOriginX(x);
    this.setOriginY(y);
    this.setOriginZ(z);
  }

  setOriginX(x) {
    this._oldOriginX = this._originX;
    this._originX = x;
  }

  setOriginY(y) {
    this._oldOriginY = this._originY;
    this._originY = y;
  }

  setOriginZ(z) {
    this._oldOriginZ = this._originZ;
    this._originZ = z;
  }

  setAngle(angle) {
    this._oldAngle = this._angle;
    this._angle = angle;
  }

  setScreenSize(w, h) {
    this._vpW = w;
    this._vpH = h;
    this._centerX = this._vpW / 2;
    this._centerY = this._vpH / 2;
  }

  setScreenPosition(x, y) {
    this._vpX = x;
    this._vpY = y;
  }

  setIdleTimeLimit(limit) {
    this._idleTimeLimit = limit;
  }

  getOriginX() {
    return this._originX;
  }
  getOriginY() {
    return this._originY;
  }
  getOriginZ() {
    return this._originZ;
  }

  getGlobalAmountScale() {
    return this._globalAmountScale;
  }
  setGlobalAmountScale(scale) {
    this._globalAmountScale = scale;
  }

  getParticlesInUse() {
    return this._inUseCount;
  }
  getParticlesUnused() {
    return this._unused.length;
  }

  addPreLoadedEffect(e, frames, layer = 0) {
    if (layer >= this._effectLayers) layer = 0;

    let tempTime = this._currentTime;
    this._currentTime -= frames * EffectsLibrary.getUpdateTime();
    e.changeDoB(this._currentTime);

    for (let i = 0; i < frames; ++i) {
      this._currentTime = (frames + 1) * EffectsLibrary.getUpdateTime();
      e.update();
      if (e.isDestroyed()) this.removeEffect(e);
    }
    this._currentTime = tempTime;
    e.setEffectLayer(layer);
    this._effects[layer].push(e);
  }

  addEffect(e, layer = 0) {
    if (layer >= this._effectLayers) layer = 0;
    e.selEffectLayer(layer);
    this._effects[layer].push(e);
  }

  removeEffect(e) {
    removeFromList(this._effects[e.getEffectLayer()], e);
  }

  clearInUse() {
    for (let el = 0; el < this._effectLayers; ++el) {
      for (let i = 0; i < 10; ++i) {
        let plist = this._inUse[el][i];

        for (let j = 0; j < plist.length; j++) {
          let p = plist[j];
          this._unused.push(p);
          this._inUseCount--;
          p.getEmitter()
            .getParentEffect()
            .removeInUse(p.getLayer(), p);
          p.reset();
        }

        this._inUse[el][i] = [];
      }
    }
  }

  destroy() {
    this.clearAll();
    this.clearInUse();
  }

  clearAll() {
    for (let el = 0; el < this._effectLayers; ++el) {
      let elist = this._effects[el];
      for (let j = 0; j < elist.length; j++) {
        elist[j].destroy();
      }
      this._effects[el] = [];
    }
  }

  clearLayer(layer) {
    let list = this._effects[layer];

    for (let i = 0; i < list.length; i++) list[i].destroy();

    this._effects[layer] = [];
  }

  releaseSingleParticles() {
    for (let i = 0; i < this._inUse.length; i++) {
      let list = this._inUse[i];
      for (let j = 0; j < list.length; j++) {
        for (let k = 0; k < list[j].length; k++)
          list[j][k].setReleaseSingleParticles(true);
      }
    }
  }

  togglePause() {
    this._paused = !this._paused;
  }

  drawEffects() {
    for (let el = 0; el < this._effects.length; ++el) {
      let elist = this._effects[el];
      for (let j = 0; j < elist.length; j++) this.drawEffect(elist[j]);
    }
  }

  drawEffect(e) {
    for (let i = 0; i < 10; ++i) {
      // particle
      let plist = e.getParticles(i);
      for (let j = 0; j < plist.length; j++) {
        this.drawParticle(plist[j]);
        // effect
        let subeffects = plist[j].getChildren();
        for (let k = 0; k < subeffects.length; k++) {
          this.drawEffect(subeffects[k]);
        }
      }
    }
  }

  drawParticle(p) {
    // p: Particle
    if (p.GetAge() !== 0 || p.getEmitter().isSingleParticle()) {
      let px = lerp(p.getOldWX(), p.getWX(), this._currentTween);
      let py = lerp(p.getOldWY(), p.getWY(), this._currentTween);

      if (this._angle !== 0) {
        let rotVec = this._matrix.transformVector(new Vector2(px, py));
        px = rotVec.x * this._camtz + this._centerX + this._camtz * this._camtx;
        py = rotVec.y * this._camtz + this._centerY + this._camtz * this._camty;
      } else {
        px = px * this._camtz + this._centerX + this._camtz * this._camtx;
        py = py * this._camtz + this._centerY + this._camtz * this._camty;
      }

      let imageDiam = p.getImageDiameter();
      if (
        px > this._vpX - imageDiam &&
        px < this._vpX + this._vpW + imageDiam &&
        py > this._vpY - imageDiam &&
        py < this._vpY + this._vpH + imageDiam
      ) {
        if (p.getAvatar()) {
          let x, y;
          let sprite = p.getAvatar();
          if (p.getEmitter().isHandleCenter()) {
            x = sprite.getWidth() / 2.0;
            y = sprite.getHeight() / 2.0;
          } else {
            x = p.getHandleX();
            y = p.getHandleY();
          }

          let rotation;

          let tv = lerp(p.getOldAngle(), p.getAngle(), this._currentTween);
          let tx = 0;
          if (p.getEmitter().isAngleRelative()) {
            if (Math.abs(p.getOldRelativeAngle() - p.getRelativeAngle()) > 180)
              tx = lerp(
                p.getOldRelativeAngle() - 360,
                p.getRelativeAngle(),
                this._currentTween
              );
            else
              tx = lerp(
                p.getOldRelativeAngle(),
                p.getRelativeAngle(),
                this._currentTween
              );
          }
          rotation = tv + tx + this._angleTweened;

          tx = lerp(p.getOldScaleX(), p.getScaleX(), this._currentTween);
          let ty = lerp(p.getOldScaleY(), p.getScaleY(), this._currentTween);
          let tz = lerp(p.getOldZ(), p.getZ(), this._currentTween);

          let scaleX = tx * tz * this._camtz;
          let scaleY = ty * tz * this._camtz;

          let a = p.getEntityAlpha();
          let r = p.getRed();
          let g = p.getGreen();
          let b = p.getBlue();

          if (p.isAnimating()) {
            tv = lerp(
              p.getOldCurrentFrame(),
              p.getCurrentFrame(),
              this._currentTween
            );
            if (tv < 0) {
              tv =
                p.getAvatar().getFramesCount() +
                fmod(tv, p.getAvatar().getFramesCount());
              if (tv == p.getAvatar().getFramesCount()) tv = 0;
            } else {
              tv = fmod(tv, p.getAvatar().getFramesCount());
            }
          } else {
            tv = p.getCurrentFrame();
          }
          // tidy with above
          tv = Math.round(tv) % p.getAvatar().getFramesCount();

          let blend = p.getEmitter().getBlendMode();

          DrawSprite(
            p,
            sprite,
            px,
            py,
            tv,
            x,
            y,
            rotation,
            scaleX,
            scaleY,
            r,
            g,
            b,
            a,
            blend
          );
        }
      }
    }
  }

  getIdleTimeLimit() {
    return this._idleTimeLimit;
  }
  isSpawningAllowed() {
    return this._spawningAllowed;
  }

  getCurrentTime() {
    return this._currentTick * EffectsLibrary.getUpdateTime();
  }
}

export default ParticleManager;
