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
  // [key: string]: any;

  getWidth(): number;
  getHeight(): number;
  getFrameX(): number;
  getFrameY(): number;
  getFramesCount(): number;
}

export class AttributeNode {
  constructor();
}

export class Effect {
  constructor(other: Entity, particleManager: ParticleManager);
}

export class EffectsLibrary {
  public static _effects: { [key: string]: any };
  constructor();
  public static init(): void;
  public static load(xml: any): void;
}

export class Emitter {
  constructor(other: Emitter, particleManager: ParticleManager);
}

export class EmitterArray {
  constructor(min: number, max: number);
}

export class Entity {
  constructor(other?: Entity);
}

export class Matrix2 {
  constructor();
}

export class Particle {
  public m_pixiSprite: { [key: string]: any };
  constructor();
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
    constructor(xml: any);
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
