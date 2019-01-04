class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  create(x: number, y: number) {
    return new Vector2(x, y);
  }

  set(vx: number, vy: number) {
    this.x = vx;
    this.y = vy;
  }

  move1(other: Vector2) {
    return this.move2(other.x, other.y);
  }

  move2(vx: number, vy: number) {
    this.x += vx;
    this.y += vy;
  }

  subtract(v: Vector2) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  add(v: Vector2) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  multiply(v: Vector2) {
    return new Vector2(this.x * v.x, this.y * v.y);
  }

  scale(scale: number) {
    return new Vector2(this.x * scale, this.y * scale);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  unit(v: Vector2) {
    const length = this.length();

    if (length > 0) {
      return new Vector2((v.x = this.x / length), (v.y = this.y / length));
    }
    return new Vector2(0, 0);
  }

  normal() {
    return new Vector2(-this.y, this.x);
  }

  leftNormal() {
    return new Vector2(this.y, -this.x);
  }

  normalize() {
    const length = this.length(); // Length
    if (length > 0) {
      this.x /= length;
      this.y /= length;
    }
  }

  dotProduct(v: Vector2) {
    return this.x * v.x + this.y * v.y;
  }
}

export default Vector2;
