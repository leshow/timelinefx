import AnimImage from "./AnimImage";
import Effect from "./Effect";
import Entity from "./Entity";

class EffectsLibrary {
  static instance: EffectsLibrary;

  static c_particleLimit = 5000;

  static globalPercentMin = 0;
  static globalPercentMax = 20.0;
  static globalPercentSteps = 100.0;

  static globalPercentVMin = 0;
  static globalPercentVMax = 10.0;
  static globalPercentVSteps = 200.0;

  static angleMin = 0;
  static angleMax = 1080.0;
  static angleSteps = 54.0;

  static emissionRangeMin = 0;
  static emissionRangeMax = 180.0;
  static emissionRangeSteps = 30.0;

  static dimensionsMin = 0;
  static dimensionsMax = 200.0;
  static dimensionsSteps = 40.0;

  static lifeMin = 0;
  static lifeMax = 100000.0;
  static lifeSteps = 200.0;

  static amountMin = 0;
  static amountMax = 2000;
  static amountSteps = 100;

  static velocityMin = 0;
  static velocityMax = 10000.0;
  static velocitySteps = 100.0;

  static velocityOverTimeMin = -20.0;
  static velocityOverTimeMax = 20.0;
  static velocityOverTimeSteps = 200;

  static weightMin = -2500.0;
  static weightMax = 2500.0;
  static weightSteps = 200.0;

  static weightVariationMin = 0;
  static weightVariationMax = 2500.0;
  static weightVariationSteps = 250.0;

  static spinMin = -2000.0;
  static spinMax = 2000.0;
  static spinSteps = 100.0;

  static spinVariationMin = 0;
  static spinVariationMax = 2000.0;
  static spinVariationSteps = 100.0;

  static spinOverTimeMin = -20.0;
  static spinOverTimeMax = 20.0;
  static spinOverTimeSteps = 200.0;

  static directionOverTimeMin = 0;
  static directionOverTimeMax = 4320.0;
  static directionOverTimeSteps = 216.0;

  static framerateMin = 0;
  static framerateMax = 200.0;
  static framerateSteps = 100.0;

  static maxDirectionVariation = 22.5;
  static maxVelocityVariation = 30.0;
  static motionVariationInterval = 30;

  //
  _lookupFrequency: number = 30.0;
  _updateTime: number = 30.0;
  _lookupFrequencyOverTime: number = 1.0;
  _updateFrequency: number = 30.0;
  _currentUpdateTime: number = 30.0;
  _shapeList: Array<unknown> = [];
  _name: string = "";
  _effects: Array<Entity | Effect> = [];
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

  loadEffectElements(effects: Array<Effect>) {
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

  getImage(index: number) {
    return this._shapeList[index];
  }

  getEffect(name: number) {
    return this._effects[name];
  }

  getEmitter(name: number) {
    return this._emitters[name];
  }

  addEffect(e: Entity | Effect) {
    let name = e.getPath();

    this._effects[name] = e;

    let emitters = e.getChildren();

    for (let i = 0; i < e.emitterCount(); i++) {
      this.addEmitter(emitters[i]);
    }
  }

  addEmitter(e: Entity) {
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
