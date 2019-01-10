import AnimImage from "./AnimImage";
import Effect from "./Effect";
import Entity from "./Entity";
import Emitter from "./Emitter";

class EffectsLibrary {
  static instance: EffectsLibrary;

  public c_particleLimit = 5000;

  public globalPercentMin = 0;
  public globalPercentMax = 20.0;
  public globalPercentSteps = 100.0;

  public globalPercentVMin = 0;
  public globalPercentVMax = 10.0;
  public globalPercentVSteps = 200.0;

  public angleMin = 0;
  public angleMax = 1080.0;
  public angleSteps = 54.0;

  public emissionRangeMin = 0;
  public emissionRangeMax = 180.0;
  public emissionRangeSteps = 30.0;

  public dimensionsMin = 0;
  public dimensionsMax = 200.0;
  public dimensionsSteps = 40.0;

  public lifeMin = 0;
  public lifeMax = 100000.0;
  public lifeSteps = 200.0;

  public amountMin = 0;
  public amountMax = 2000;
  public amountSteps = 100;

  public velocityMin = 0;
  public velocityMax = 10000.0;
  public velocitySteps = 100.0;

  public velocityOverTimeMin = -20.0;
  public velocityOverTimeMax = 20.0;
  public velocityOverTimeSteps = 200;

  public weightMin = -2500.0;
  public weightMax = 2500.0;
  public weightSteps = 200.0;

  public weightVariationMin = 0;
  public weightVariationMax = 2500.0;
  public weightVariationSteps = 250.0;

  public spinMin = -2000.0;
  public spinMax = 2000.0;
  public spinSteps = 100.0;

  public spinVariationMin = 0;
  public spinVariationMax = 2000.0;
  public spinVariationSteps = 100.0;

  public spinOverTimeMin = -20.0;
  public spinOverTimeMax = 20.0;
  public spinOverTimeSteps = 200.0;

  public directionOverTimeMin = 0;
  public directionOverTimeMax = 4320.0;
  public directionOverTimeSteps = 216.0;

  public framerateMin = 0;
  public framerateMax = 200.0;
  public framerateSteps = 100.0;

  public maxDirectionVariation = 22.5;
  public maxVelocityVariation = 30.0;
  public motionVariationInterval = 30;

  //
  public static _lookupFrequency: number = 30.0;
  public static _updateTime: number = 30.0;
  public static _lookupFrequencyOverTime: number = 1.0;
  public static _updateFrequency: number = 30.0;
  public static _currentUpdateTime: number = 30.0;
  public static _shapeList: Array<AnimImage> = [];
  public static _name: string = "";
  public static _effects: { [key: string]: Entity } | Array<Entity> = [];
  public static _emitters: Array<Entity> = [];
  public static m_currentFolder: string | null = null;

  constructor() {
    if (!EffectsLibrary.instance) {
      EffectsLibrary.instance = this;
    }
    return EffectsLibrary.instance;
  }

  public static init() {
    this.setUpdateFrequency(30.0);
    this._lookupFrequency = this._updateTime;
    this._lookupFrequencyOverTime = 1.0;
    this.clearAll();
  }

  public static load(xml: any) {
    //  console.log(xml);
    // Only allow loading one library
    this.clearAll();

    let shapes = xml.getElementsByTagName("SHAPES")[0];
    shapes = shapes.getElementsByTagName("IMAGE");

    for (let i = 0; i < shapes.length; i++) {
      // console.log(shapes[i].attributes.getNamedItem("URL").nodeValue);
      let img = new AnimImage();
      img.loadFromXML(shapes[i]);
      this._shapeList.push(img);
    }

    // Traverse top down
    this.m_currentFolder = null;
    this.loadEffectElements(xml.getElementsByTagName("EFFECTS")[0].children);
  }

  public static loadEffectElements(effects: Array<any>) {
    for (let i = 0; i < effects.length; i++) {
      if (effects[i].tagName === "FOLDER") {
        this.loadEffectElements(effects[i].children);
      } else if (effects[i].tagName === "EFFECT") {
        let e = new Effect();
        e.loadFromXML(effects[i]);

        this.addEffect(e);
      }
    }
  }

  public static clearAll() {
    this._name = "";
    this._effects = []; // indexed by name
    this._emitters = []; // indexed by name
    this._shapeList = [];
  }

  public static getShapes() {
    return this._shapeList;
  }

  public static getImage(index: number): AnimImage {
    return this._shapeList[index];
  }

  public static getEffect(name: string) {
    return this._effects[name];
  }

  public static getEmitter(name: string) {
    return this._emitters[name];
  }

  public static addEffect(e: Effect) {
    let name = e.getPath();

    this._effects[name] = e;

    let emitters = e.getChildren();

    for (let i = 0; i < e.emitterCount(); i++) {
      this.addEmitter(emitters[i]);
    }
  }

  public static addEmitter(e: Emitter) {
    let name = e.getPath();

    this._emitters[name] = e;

    let effects = e.getEffects();
    for (let i = 0; i < effects.length; i++) {
      this.addEffect(effects[i]);
    }
  }

  public static setUpdateFrequency(freq: number) {
    this._updateFrequency = freq; //  fps
    this._updateTime = 1000.0 / this._updateFrequency;
    this._currentUpdateTime = this._updateFrequency;
  }

  public static setLookupFrequency(freq: number) {
    this._lookupFrequency = freq;
  }

  public static setLookupFrequencyOverTime(freq: number) {
    this._lookupFrequencyOverTime = freq;
  }

  public static getUpdateFrequency() {
    return this._updateFrequency;
  }
  public static getUpdateTime() {
    return this._updateTime;
  }
  public static getCurrentUpdateTime() {
    return this._currentUpdateTime;
  }
  public static getLookupFrequency() {
    return this._lookupFrequency;
  }
  public static getLookupFrequencyOverTime() {
    return this._lookupFrequencyOverTime;
  }
}
const instance = new EffectsLibrary();
// Object.freeze(instance);

export default instance;
