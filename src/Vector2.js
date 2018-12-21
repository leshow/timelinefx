class Vector2 {
  constructor(x, y) {
    this.set(x, y);
  }

  create(x, y) {
    return new Vector2(x, y);
  }

  set(vx, vy) {
    this.x = vx;
    this.y = vy;
  }

  move1(other) {
    return this.Move2(other.x, other.y);
  }

  move2(vx, vy) {
    this.x += vx;
    this.y += vy;
  }

  subtract(v) {
    return new Vector2(x - v.x, y - v.y);
  }

  add(v) {
    return new Vector2(x + v.x, y + v.y);
  }

  multiply(v) {
    return new Vector2(x * v.x, y * v.y);
  }

  scale(scale) {
    return new Vector2(x * scale, y * scale);
  }

  length() {
    return Math.sqrt(x * x + y * y);
  }

  unit() {
    let length = this.length();

    if (length > 0) {
      return new Vector2((v.x = x / length), (v.y = y / length));
    }
    return new Vector2(0, 0);
  }

  normal() {
    return new Vector2(-y, x);
  }

  leftNormal() {
    return new Vector2(y, -x);
  }

  normalize() {
    let length = this.length(); // Length
    if (length > 0) {
      this.x /= length;
      this.y /= length;
    }
  }

  dotProduct(v) {
    return x * v.x + y * v.y;
  }
}

export default Vector2;
