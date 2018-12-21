class Matrix2 {
  constructor() {
    this.set(1, 0, 0, 1);
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

  scale(s) {
    this.aa *= s;
    this.ab *= s;
    this.ba *= s;
    this.bb *= s;
  }

  transpose(s) {
    let abt = this.ab;
    this.ab = this.ba;
    this.ba = abt;
  }

  transformSelf(m) {
    let r_aa = this.aa * m.aa + this.ab * m.ba;
    let r_ab = this.aa * m.ab + this.ab * m.bb;
    let r_ba = this.ba * m.aa + this.bb * m.ba;
    let r_bb = this.ba * m.ab + this.bb * m.bb;

    this.setMatrix(r_aa, r_ab, r_ba, r_bb);
  }

  transformVector(x, y) {
    let tv = new Vector2();
    tv.x = x * this.aa + y * this.ba;
    tv.y = x * this.ab + y * this.bb;
    return tv;
  }
}

export default Matrix2;
