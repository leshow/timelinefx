import EffectsLibrary from "./EffectsLibrary";
import AttributeNode from "./AttributeNode";

class EmitterArray {
  _life: number;
  _compiled: boolean;
  _min: number;
  _max: number;
  _changes: Array<number>;
  _attributes: Array<AttributeNode>;

  constructor(min: number, max: number) {
    this._life = 0;
    this._compiled = false;
    this._min = min;
    this._max = max;
    this._changes = [];
    this._attributes = [];
  }

  getLastFrame() {
    return this._changes.length - 1;
  }

  getCompiled(frame: number) {
    frame = Math.round(frame);
    let lastFrame = this.getLastFrame();
    if (frame <= lastFrame) {
      return this._changes[frame];
    }

    return this._changes[lastFrame];
  }

  setCompiled(frame: number, value: number) {
    this._changes[frame] = value;
  }

  getLife() {
    return this._life;
  }

  setLife(life: number) {
    this._life = life;
  }

  getLastAtrribute() {
    return this._attributes[this._attributes.length - 1];
  }

  compile() {
    if (this._attributes.length > 0) {
      let lastec = this.getLastAtrribute();
      let lookupFrequency = EffectsLibrary.getLookupFrequency();
      let frame = Math.ceil(lastec.frame / lookupFrequency);

      this._changes = new Array(frame + 1);
      frame = 0;
      let age = 0;
      while (age < lastec.frame) {
        this.setCompiled(frame, this.interpolate(age));
        ++frame;
        age = frame * lookupFrequency;
      }

      this.setCompiled(frame, lastec.value);
    } else {
      this._changes = [0];
    }

    this._compiled = true;
  }

  compileOT(longestLife: number = this.getLastAtrribute().frame) {
    if (this._attributes.length > 0) {
      //   longestLife = GetDefaultArg(longestLife, this.GetLastAtrribute().frame);

      let lastec = this.getLastAtrribute();
      let lookupFrequency = EffectsLibrary.getLookupFrequencyOverTime(); // TODO
      let frame = Math.ceil(longestLife / lookupFrequency);

      this._changes = new Array(frame + 1);
      frame = 0;
      let age = 0;
      while (age < longestLife) {
        this.setCompiled(frame, this.interpolateOT(age, longestLife));
        ++frame;
        age = frame * lookupFrequency;
      }
      this.setLife(longestLife);
      this.setCompiled(frame, lastec.value);
    } else {
      this._changes = [0];
    }
    this._compiled = true;
  }

  add(frame: number, value: number) {
    this._compiled = false;

    let e = new AttributeNode();
    e.frame = frame;
    e.value = value;
    this._attributes.push(e);
    return e;
  }

  get(frame: number, bezier: boolean = true) {
    if (this._compiled) return this.getCompiled(frame);
    else return this.interpolate(frame, bezier);
  }

  getBezierValue(
    lastec: AttributeNode,
    a: AttributeNode,
    t: number,
    yMin: number,
    yMax: number
  ) {
    if (a.isCurve) {
      let p0x = lastec.frame;
      let p0y = lastec.value;

      if (lastec.isCurve) {
        let p1x = lastec.c1x;
        let p1y = lastec.c1y;
        let p2x = a.c0x;
        let p2y = a.c0y;
        let p3x = a.frame;
        let p3y = a.value;

        return this.getCubicBezier(
          p0x,
          p0y,
          p1x,
          p1y,
          p2x,
          p2y,
          p3x,
          p3y,
          t,
          yMin,
          yMax
        ).y;
      } else {
        let p1x = a.c0x;
        let p1y = a.c0y;
        let p2x = a.frame;
        let p2y = a.value;

        return this.getQuadBezier(p0x, p0y, p1x, p1y, p2x, p2y, t, yMin, yMax)
          .y;
      }
    } else if (lastec.isCurve) {
      let p0x = lastec.frame;
      let p0y = lastec.value;
      let p1x = lastec.c1x;
      let p1y = lastec.c1y;
      let p2x = a.frame;
      let p2y = a.value;

      return this.getQuadBezier(p0x, p0y, p1x, p1y, p2x, p2y, t, yMin, yMax).y;
    } else {
      return 0;
    }
  }

  getQuadBezier(
    p0x: number,
    p0y: number,
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
    t: number,
    yMin: number,
    yMax: number,
    clamp: boolean = true
  ) {
    let x = (1 - t) * (1 - t) * p0x + 2 * t * (1 - t) * p1x + t * t * p2x;
    let y = (1 - t) * (1 - t) * p0y + 2 * t * (1 - t) * p1y + t * t * p2y;

    if (x < p0x) x = p0x;
    if (x > p2x) x = p2x;

    if (clamp) {
      if (y < yMin) y = yMin;
      if (y > yMax) y = yMax;
    }
    return { x, y };
  }

  getCubicBezier(
    p0x: number,
    p0y: number,
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
    p3x: number,
    p3y: number,
    t: number,
    yMin: number,
    yMax: number,
    clamp: boolean = true
  ) {
    let x =
      (1 - t) * (1 - t) * (1 - t) * p0x +
      3 * t * (1 - t) * (1 - t) * p1x +
      3 * t * t * (1 - t) * p2x +
      t * t * t * p3x;
    let y =
      (1 - t) * (1 - t) * (1 - t) * p0y +
      3 * t * (1 - t) * (1 - t) * p1y +
      3 * t * t * (1 - t) * p2y +
      t * t * t * p3y;

    if (x < p0x) x = p0x;
    if (x > p3x) x = p3x;

    if (clamp) {
      if (y < yMin) y = yMin;
      if (y > yMax) y = yMax;
    }

    return { x, y };
  }

  interpolate(frame: number, bezier?: boolean) {
    return this.interpolateOT(frame, 1.0, bezier);
  }

  interpolateOT(age: number, lifetime: number, bezier: boolean = true) {
    let lasty = 0;
    let lastf = 0;
    let lastec = null;

    for (let i = 0; i < this._attributes.length; i++) {
      let it = this._attributes[i];
      let frame = it.frame * lifetime;
      if (age < frame) {
        let p = (age - lastf) / (frame - lastf);
        if (bezier && lastec) {
          // TODO && lastec
          let bezierValue = this.getBezierValue(
            lastec,
            it,
            p,
            this._min,
            this._max
          );
          if (bezierValue !== 0) {
            return bezierValue;
          }
        }
        return lasty - p * (lasty - it.value);
      }
      lasty = it.value;
      lastf = frame;
      if (bezier) lastec = it;
    }
    return lasty;
  }

  getOt(age: number, lifetime: number) {
    let frame = 0;
    if (lifetime > 0) {
      frame =
        ((age / lifetime) * this._life) /
        EffectsLibrary.getLookupFrequencyOverTime(); // TODO
    }
    return this.get(frame);
  }

  getAttributesCount() {
    return this._attributes.length;
  }

  getMaxValue() {
    let max = 0;
    for (let i = 0; i < this._attributes.length; i++) {
      let val = this._attributes[i].value;
      if (val > max) max = val;
    }

    return max;
  }
}

export default EmitterArray;
