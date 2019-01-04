import Vector2 from "./Vector2";

class Matrix2 {
  aa: number;
  ab: number;
  bb: number;
  ba: number;
  constructor(aa: number = 1, ab: number = 0, ba: number = 0, bb: number = 1) {
    this.aa = aa;
    this.ab = ab;
    this.ba = ba;
    this.bb = bb;
  }

  create(aa_ = 1, ab_ = 0, ba_ = 0, bb_ = 1) {
    let m = new Matrix2();
    m.set(aa_, ab_, ba_, bb_);
    return m;
  }

  set(aa_ = 1, ab_ = 0, ba_ = 0, bb_ = 1) {
    this.aa = aa_;
    this.ab = ab_;
    this.ba = ba_;
    this.bb = bb_;
  }

  scale(s: number) {
    this.aa *= s;
    this.ab *= s;
    this.ba *= s;
    this.bb *= s;
  }

  transpose() {
    let abt = this.ab;
    this.ab = this.ba;
    this.ba = abt;
  }

  transformSelf(m: Matrix2) {
    let r_aa = this.aa * m.aa + this.ab * m.ba;
    let r_ab = this.aa * m.ab + this.ab * m.bb;
    let r_ba = this.ba * m.aa + this.bb * m.ba;
    let r_bb = this.ba * m.ab + this.bb * m.bb;

    this.set(r_aa, r_ab, r_ba, r_bb);
  }

  transformVector(x: number, y: number) {
    let tv = new Vector2();
    tv.x = x * this.aa + y * this.ba;
    tv.y = x * this.ab + y * this.bb;
    return tv;
  }
}

export default Matrix2;
