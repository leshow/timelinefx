// Type definitions for vf-timelinefx 2.0
// Project: https://github.com/leshow/timelinefx (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: Evan Cameron <https://github.com/leshow>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export type SpriteFn = (
  p: Particle,
  sprite: any,
  px: number,
  py: number,
  tv: number,
  x: number,
  y: number,
  rotation: number,
  scaleX: number,
  scaleY: number,
  r: number,
  g: number,
  b: number,
  a: number,
  blendMode: number
) => void;

export class ParticleManager {
  public static c_particleLimit: number;
  private _drawSprite: SpriteFn;
  public onParticleSpawnCB: ((p: Particle) => void) | null;
  public onParticleKilledCB: ((p: Particle) => void) | null;
  constructor(drawSprite: SpriteFn, particles: number, layers: number);

  public setScreenSize(w: number, h: number): void;
  public setScreenPosition(x: number, y: number): void;
  public addEffect(e: Effect, layer?: number): void;
  public update(): void;
  public drawParticles(tween?: number, layer?: number): void;
  public destroy(): void;
}

export class AnimImage {
  public _horizCells: number;
  public _width: number;
  constructor();
  [key: string]: any;

  getWidth(): number;
  getHeight(): number;
  getFrameX(frameIndex: number): number;
  getFrameY(frameIndex: number): number;
  getFramesCount(): number;
  setMaxRadius(radius: number): void;
  getMaxRadius(): number;
  setHeight(height: number): void;
  setIndex(index: number): void;
  getIndex(): number;
  setFilename(filename: string): void;
  setName(name: string): void;
  getName(): string;
}

export class AttributeNode {
  constructor();
  compare(other: AttributeNode): boolean;
  setCurvePoints(x0: number, y0: number, x1: number, y1: number): void;
  toggleCurve(): void;
  loadFromXML(xml: XMLDocument): void;
}

export class Effect extends Entity {
  constructor(other: Entity, particleManager: ParticleManager);
  hideAll(): void;
  getEffectLayer(): number;
  setEffectLayer(layer: number): void;
  emitterCount(): number;
  showOne(e: Emitter): void;
  update(): void;
  setParticleManager(pm: ParticleManager): void;
  hasParticles(): boolean;
  getParticleManager(): ParticleManager;
  getParticles(layer: number): Array<Particle>;
  isDying(): boolean;
  softKill(): void;
  hardKill(): void;
  destroy(releaseChildren?: boolean): void;
  setEndBehaviour(behaviour: number): void;
  setDistanceSetByLife(value: boolean): void;
  setHandleCenter(center: boolean): void;
  setReverseSpawn(reverse: boolean): void;
  setSpawnDirection(): void;
  setAreaSize(w: number, h: number): void;
  setLineLength(length: number): void;
  setEmissionAngle(angle: number): void;
  setEffectAngle(angle: number): void;
  setLife(life: number): void;
  setAmount(amount: number): void;
  setVelocity(velocity: number): void;
  setSpin(spin: number): void;
  setWeight(weight: number): void;
  setEffectParticleSize(sizeX: number, sizeY: number): void;
  setSizeX(sizeX: number): void;
  setSizeY(sizeX: number): void;
  setEffectAlpha(alpha: number): void;
  setEffectEmissionRange(emissionRange: number): void;
  setEllipseArc(degrees: number): void;
  setX(z: number): void;
  setStretch(stretch: number): void;
  setGroupParticles(v: boolean): void;
  addInUse(layer: number, p: Particle): void;
  removeInUse(layer: number, p: Particle): void;
  compileAll(): void;
  compileQuick(): void;
  compileAmount(): void;
  compileLife(): void;
  compileSizeX(): void;
  compileSizeY(): void;
  compileVelocity(): void;
  compileWeight(): void;
  compileSpin(): void;
  compileAlpha(): void;
  compileEmissionAngle(): void;
  compileEmissionRange(): void;
  compileWidth(): void;
  compileHeight(): void;
  compileAngle(): void;
  compileStretch(): void;
  compileGlobalZ(): void;
  getLife(frame: number): number;
  getAmount(frame: number): number;
  getSizeX(frame: number): number;
  getSizeY(frame: number): number;
  getVelocity(frame: number): number;
  getWeight(frame: number): number;
  getSpin(frame: number): number;
  getAlpha(frame: number): number;
  getEmissionAngle(frame: number): number;
  getEmissionRange(frame: number): number;
  getWidth(frame: number): number;
  getHeight(frame: number): number;
  getEffectAngle(frame: number): number;
  getStretch(frame: number): number;
  getGlobalZ(frame: number): number;
  loadFromXML(xml: XMLDocument): number;
  readAttribute(xml: XMLDocument, emitArray: EmitterArray, tag: string): string;
  addStretch(f: number, v: number): number;
  getPath(): string;
  getLifeMaxValue(): number;
  getCurrentAmount(): number;
  getCurrentlLife(): number;
  getCurrentEmissionAngle(): number;
  getCurrentEmissionRange(): number;
  getClass(): string;
  setCurrentEffectFrame(frame: number): void;
  getTraverseEdge(): number;
  getCurrentVelocity(): number;
  getCurrentSizeX(): number;
  getCurrentSizeY(): number;
  getCurrentStretch(): number;
  getCurrentWeight(): number;
  isBypassWeight(): boolean;
  getCurrentAlpha(): number;
  setParticlesCreated(value: boolean): void;
  getCurrentSpin(): number;
  getLifeLastFrame(): number;
  setEffectLength(length: number): void;
  setParentEmitter(emitter: Emitter): void;
  getHandleCenter(): boolean;
  getEmitAtPoints(): boolean;
  getCurrentWidth(): number;
  getCurrentHeight(): number;
  getEllipseArc(): number;
  getEllipseOffset(): number;
  getEmissionType(): number;
  getParentEmitter(): Emitter | null;
  getMGX(): number;
  getMGY(): number;
  getImages(images: Array<AnimImage>): void;
}

export class EffectsLibrary {
  public static _effects: { [key: string]: any };
  constructor();
  public static init(): void;
  public static load(xml: XMLDocument): void;
}

export class Emitter extends Entity {
  constructor(other: Emitter, particleManager: ParticleManager);
  isHandleCenter(): boolean;
}

export class EmitterArray {
  constructor(min: number, max: number);
  getLastFrame(): number;
  getCompiled(frame: number): number;
  setCompiled(frame: number, value: number): void;
  getLife(): number;
  setLife(life: number): void;
  getLastAttribute(): AttributeNode;
  compile(): void;
  /**
   * @param longestLife - this.getLastAttributte().frame as default argument
   */
  compileOT(longestlife?: number): void;
  add(frame: number, value: number): void;
  /**
   *
   * @param frame - frame number
   * @param bezier - default value of `true`
   */
  get(frame: number, bezier?: boolean): void;
  getBezierValue(
    lastec: AttributeNode,
    a: AttributeNode,
    t: number,
    yMin: number,
    yMax: number
  ): number;
  /**
   *
   * @param clamp - default value of `true`
   */
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
    clamp?: boolean
  ): { x: number; y: number };
  /**
   *
   * @param clamp - default value of `true`
   */
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
    clamp?: boolean
  ): { x: number; y: number };
  /**
   *
   * @param frame
   * @param bezier - default value of `true`
   */
  interpolate(frame: number, bezier?: boolean): number;
  /**
   *
   * @param age
   * @param lifetime
   * @param bezier - default value of `true`
   */
  interpolateOT(age: number, lifetime: number, bezier?: boolean): number;
  getOt(age: number, lifetime: number): number;
  getAttributesCount(): number;
  getMaxValue(): number;
}

export class Entity {
  constructor(other?: Entity);
  getAvatar(): AnimImage | null;
  isDestroyed(): boolean;
  getName(): string;
  setName(name: string): void;
  setX(x: number): void;
  setY(x: number): void;
  setZ(x: number): void;
  getX(): number;
  getY(): number;
  getZ(): number;
  capture(): void;
  captureAll(): void;
  setOKtoRender(ok: boolean): void;
  destroy(destroyChildren?: boolean): void;
  removeChild(e: Entity): void;
  killChildren(): void;
  getChildren(): Array<Entity>;
  update(): void;
  updateChildren(): void;
  miniUpdate(): void;
  getChildCount(): number;
  updateBoundingBox(): void;
  updateEntityRadius(): void;
  updateParentEntityRadius(): void;
  updateParentRootEntityRadius(): void;
  updateParentBoundingBox(): void;
  assignRootParent(e: Entity): void;
  setHandleX(x: number): void;
  setHandleY(x: number): void;
  setParent(e: Entity): void;
  setRelative(value: boolean): void;
  setEntityScale(sx: number, sy: number): void;
  setSpeed(speed: number): void;
  setBlendMode(mode: number): void;
  getCurrentFrame(): number;
  setCurrentFrame(frame: number): void;
  addChild(e: Entity): void;
  getMatrix(): Matrix2;
  getWX(): number;
  getWY(): number;
  getRelativeAngle(): number;
  setDoB(dob: number): void;
  getOldCurrentFrame(): number;
  setAvatar(avatar: AnimImage): void;
  setAutocenter(value: boolean): void;
  getLifeTime(): number;
  setLifeTime(lifetime: number): void;
  setSpeedVecX(x: number): void;
  setSpeedVecY(y: number): void;
  setBaseSpeed(speed: number): void;
  setWidth(width: number): void;
  getWidth(frame?: number): number;
  setScaleY(scaleY: number): void;
  getScaleX(): number;
  getScaleY(): number;
  setWidthHeightAABB(
    minWidth: number,
    minHeight: number,
    maxWidth: number,
    maxHeight: number
  ): void;
  setDirectionLocked(locked: boolean): void;
  isDirectionLocked(): boolean;
  getEntityDirection(): number;
  setEntityDirection(direction: number): void;
  setWeight(weight: number): void;
  getWeight(frame?: number): number;
  setBaseWeight(weight: number): void;
  setBaseWeight(): number;
  getRed(): number;
  setRed(r: number): void;
  getGreen(): number;
  setGreen(g: number): void;
  getBlue(): number;
  getBlue(b: number): void;
  getAge(): number;
  setAge(age: number): void;
  setEntityAlpha(alpha: number): void;
  getOldWX(): number;
  getOldWY(): number;
  getImageDiameter(): number;
  getOldAngle(): number;
  getOldRelativeAngle(): number;
  getAvatar(): AnimImage | null;
  getHandleX(): number;
  getHandleY(): number;
  getBlendMode(): number;
  getAngle(): number;
  getOldScaleX(): number;
  getOldScaleY(): number;
  getOldZ(): number;
  setEntityColor(r: number, g: number, b: number): number;
  getEntityAlpha(): number;
  getImageRadius(): number;
  getFramerate(): number;
  setFramerate(framerate: number): void;
  isAnimating(): boolean;
  setAnimating(value: boolean): void;
  isRelative(): boolean;
  setWX(wx: number): void;
  setWY(wy: number): void;
  setAngle(degrees: number): void;
  setHeight(height: number): void;
  getHeight(frame?: number): number;
  getParent(): Entity | null;
  move(xamount: number, yamount: number): void;
}

export class Matrix2 {
  constructor();
  create(aa_: number, ab_: number, ba_: number, bb_: number): Matrix2;
  set(aa_: number, ab_: number, ba_: number, bb_: number): void;
  scale(s: number): void;
  transpose(): void;
  transformSelf(m: Matrix2): void;
  transformVector(x: number, y: number): Vector2;
}

export class Vector2 {
  constructor(x: number, y: number);
  create(x: number, y: number): Vector2;
  set(vx: number, vy: number): void;
  move1(other: Vector2): void;
  move2(vx: number, vy: number): void;
  subtract(v: Vector2): Vector2;
  add(v: Vector2): Vector2;
  multiply(v: Vector2): Vector2;
  scale(scale: number): Vector2;
  length(): number;
  unit(v: Vector2): Vector2;
  normal(): Vector2;
  leftNormal(): Vector2;
  normalize(): void;
  dotProduct(v: Vector2): number;
}

export class Particle extends Entity {
  [key: string]: any;
  constructor();
  getEmitter(): Emitter | null;
  reset(): void;
  update(): void;
  destroy(releaseChildren?: boolean): void;
  setGroupParticles(value: boolean): void;
  isGroupParticles(): boolean;
  setLayer(layer: number): void;
  getLayer(): number;
  setEmitter(e: Emitter): void;
  getEmitter(): Emitter;
  getEffectLayer(): number;
  setParticleManager(pm: ParticleManager): void;
  setEffectLayer(layer: number): void;
  setVelVariation(): void;
  setGSizeX(gSizeX: number): void;
  setGSizeY(gSizeY: number): void;
  getGSizeX(): number;
  getGSizeY(): number;
  getScaleVariationX(): number;
  setScaleVariationX(scale: number): void;
  getScaleVariationY(): number;
  setScaleVariationY(scale: number): void;
  getEmissionAngle(): number;
  setEmissionAngle(emissionAngle: number): void;
  setDirectionVariation(direction: number): void;
  getDirectionVariation(): number;
  setSpinVariation(spin: number): void;
  getSpinVariation(): number;
  setWeightVariation(weight: number): void;
  getWeightVariation(): number;
}

export namespace Utils {
  type Map<T> = { [key: string]: T };
  function removeFromList<T>(array: Array<T>, elem: T): void;
  const M_PI: number;
  var g_randomSeed: number;
  function stripFilePath(filename: string): string;
  function fmod(a: number, b: number): number;
  function degrees(rad: number): number;
  function toRadians(deg: number): number;
  class CopyHelper<T> {
    constructor(fromObject: Map<T>, toObj: Map<T>);
  }
  class XMLHelper {
    constructor(xml: XMLDocument);
  }
  function randomUnit(): number;
  function randomBetween(low: number, high: number): void;
  function getDirection(
    fromx: number,
    fromy: number,
    tox: number,
    toy: number
  ): number;
  function loadXMLDoc(filename: string): void;
  function toHex(r: number, g: number, b: number): number;
}
