import AnimImage from "./AnimImage";
import Effect from "./Effect";
import Entity from "./Entity";
import Emitter from "./Emitter";

class EffectsLibrary {
  public static instance: EffectsLibrary;

  public static c_particleLimit = 5000;

  public static globalPercentMin = 0;
  public static globalPercentMax = 20.0;
  public static globalPercentSteps = 100.0;

  public static globalPercentVMin = 0;
  public static globalPercentVMax = 10.0;
  public static globalPercentVSteps = 200.0;

  public static angleMin = 0;
  public static angleMax = 1080.0;
  public static angleSteps = 54.0;

  public static emissionRangeMin = 0;
  public static emissionRangeMax = 180.0;
  public static emissionRangeSteps = 30.0;

  public static dimensionsMin = 0;
  public static dimensionsMax = 200.0;
  public static dimensionsSteps = 40.0;

  public static lifeMin = 0;
  public static lifeMax = 100000.0;
  public static lifeSteps = 200.0;

  public static amountMin = 0;
  public static amountMax = 2000;
  public static amountSteps = 100;

  public static velocityMin = 0;
  public static velocityMax = 10000.0;
  public static velocitySteps = 100.0;

  public static velocityOverTimeMin = -20.0;
  public static velocityOverTimeMax = 20.0;
  public static velocityOverTimeSteps = 200;

  public static weightMin = -2500.0;
  public static weightMax = 2500.0;
  public static weightSteps = 200.0;

  public static weightVariationMin = 0;
  public static weightVariationMax = 2500.0;
  public static weightVariationSteps = 250.0;

  public static spinMin = -2000.0;
  public static spinMax = 2000.0;
  public static spinSteps = 100.0;

  public static spinVariationMin = 0;
  public static spinVariationMax = 2000.0;
  public static spinVariationSteps = 100.0;

  public static spinOverTimeMin = -20.0;
  public static spinOverTimeMax = 20.0;
  public static spinOverTimeSteps = 200.0;

  public static directionOverTimeMin = 0;
  public static directionOverTimeMax = 4320.0;
  public static directionOverTimeSteps = 216.0;

  public static framerateMin = 0;
  public static framerateMax = 200.0;
  public static framerateSteps = 100.0;

  public static maxDirectionVariation = 22.5;
  public static maxVelocityVariation = 30.0;
  public static motionVariationInterval = 30;

  //
  _lookupFrequency: number = 30.0;
  _updateTime: number = 30.0;
  _lookupFrequencyOverTime: number = 1.0;
  _updateFrequency: number = 30.0;
  _currentUpdateTime: number = 30.0;
  _shapeList: Array<AnimImage> = [];
  _name: string = "";
  _effects: { [key: string]: Effect } | Array<Effect> = [];
  _emitters: Array<Entity> = [];
  m_currentFolder: string | null = null;

  constructor() {
    if (!EffectsLibrary.instance) {
      EffectsLibrary.instance = this;
    }
    return EffectsLibrary.instance;
  }

  init() {
    this.setUpdateFrequency(30.0);
    this._lookupFrequency = this._updateTime;
    this._lookupFrequencyOverTime = 1.0;
    this.clearAll();
  }

  load(xml: any) {
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

  loadEffectElements(effects: Array<any>) {
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

  clearAll() {
    this._name = "";
    this._effects = []; // indexed by name
    this._emitters = []; // indexed by name
    this._shapeList = [];
  }

  getShapes() {
    return this._shapeList;
  }

  getImage(index: number): AnimImage {
    return this._shapeList[index];
  }

  getEffect(name: string) {
    return this._effects[name];
  }

  getEmitter(name: string) {
    return this._emitters[name];
  }

  addEffect(e: Effect) {
    let name = e.getPath();

    this._effects[name] = e;

    let emitters = e.getChildren();

    for (let i = 0; i < e.emitterCount(); i++) {
      this.addEmitter(emitters[i]);
    }
  }

  addEmitter(e: Emitter) {
    let name = e.getPath();

    this._emitters[name] = e;

    let effects = e.getEffects();
    for (let i = 0; i < effects.length; i++) {
      this.addEffect(effects[i]);
    }
  }

  setUpdateFrequency(freq: number) {
    this._updateFrequency = freq; //  fps
    this._updateTime = 1000.0 / this._updateFrequency;
    this._currentUpdateTime = this._updateFrequency;
  }

  setLookupFrequency(freq: number) {
    this._lookupFrequency = freq;
  }

  setLookupFrequencyOverTime(freq: number) {
    this._lookupFrequencyOverTime = freq;
  }

  getUpdateFrequency() {
    return this._updateFrequency;
  }
  getUpdateTime() {
    return this._updateTime;
  }
  getCurrentUpdateTime() {
    return this._currentUpdateTime;
  }
  getLookupFrequency() {
    return this._lookupFrequency;
  }
  getLookupFrequencyOverTime() {
    return this._lookupFrequencyOverTime;
  }
}

const instance = new EffectsLibrary();
// Object.freeze(instance);

export default instance;
