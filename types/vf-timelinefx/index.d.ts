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
  constructor(drawSprite: SpriteFn, particles: number, layers: number);
}

export class AnimImage {
  constructor();
}

export class AttributeNode {
  constructor();
}

export class Effect {
  constructor(other: Entity, particleManager: ParticleManager);
}

export class EffectsLibrary {
  constructor();
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
