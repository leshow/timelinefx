export function removeFromList<T>(array: Array<T>, elem: T) {
  const index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}

export const M_PI = 3.14159265358979323846;
export let g_randomSeed: number = 17;

export function stripFilePath(filename: string): string {
  const index = Math.max(filename.lastIndexOf("/"), filename.lastIndexOf("\\"));
  return filename.substring(index + 1);
}

export function fmod(a: number, b: number): number {
  return Number((a - Math.floor(a / b) * b).toPrecision(8));
}

export function degrees(rad: number): number {
  return rad * (180 / Math.PI);
}

export function toRadians(deg: number): number {
  return deg * (Math.PI / 180);
}

type Map<V> = { [key: string]: V };

export class CopyHelper<T> {
  m_fromObj: Map<T>;
  m_toObj: Map<T>;
  constructor(fromObj: Map<T>, toObj: Map<T>) {
    this.m_fromObj = fromObj;
    this.m_toObj = toObj;
  }
  copy(key: string, defaultVal: T) {
    this.m_toObj[key] = this.m_fromObj ? this.m_fromObj[key] : defaultVal;
  }
}

export class XMLHelper {
  m_xml: any;
  m_attr: any;
  constructor(xml: any) {
    this.m_xml = xml;
    this.m_attr = xml.attributes;
  }
  getAttr(attrName: string) {
    const attr = this.m_attr.getNamedItem(attrName);
    return attr ? attr.nodeValue : null;
  }
  getAttrAsInt(attrName: string) {
    return parseInt(this.getAttr(attrName));
  }
  getAttrAsFloat(attrName: string) {
    return parseFloat(this.getAttr(attrName));
  }
  getAttrAsBool(attrName: string) {
    return this.getAttrAsInt(attrName) > 0;
  }

  getChildAttr(childName: string, attrName: string) {
    const childNode = this.m_xml.getElementsByTagName(childName)[0];
    if (childNode) return getXMLAttrSafe(childNode, attrName, undefined);
    return null;
  }

  hasChildAttr(childName: string, attrName: string): boolean {
    return this.getChildAttr(childName, attrName) !== null;
  }
  // TODO used to only take attrName
  getChildAttrAsInt(childName: string, attrName: string): number {
    return parseInt(this.getChildAttr(childName, attrName));
  }
  // TODO used to only take attrName
  getChildAttrAsBool(childName: string, attrName: string): boolean {
    return this.getChildAttrAsInt(childName, attrName) > 0;
  }
}

export function getNodeAttrValue(elem: any, attrName: string) {
  return elem.attributes.getNamedItem(attrName).nodeValue;
}

export function forEachInXMLNodeList<T>(
  nodelist: Array<T>,
  fn: (item: T) => void
) {
  for (let i = 0; i < nodelist.length; i++) {
    fn(nodelist[i]);
  }
}

export function forEachXMLChild(
  xmlNode: any,
  tag: string,
  fn: (item: any) => void
): void {
  const nodelist = xmlNode.getElementsByTagName(tag);
  for (let i = 0; i < nodelist.length; i++) {
    if (nodelist[i].parentElement == xmlNode) fn(nodelist[i]);
  }
}

export function getXMLAttrSafe(
  xmlNode: any,
  attrName: string,
  defaultResult: string = ""
) {
  const attr = xmlNode.attributes
    ? xmlNode.attributes.getNamedItem(attrName)
    : null;
  return attr ? attr.nodeValue : defaultResult;
}

export function lerp(a: number, b: number, fract: number): number {
  return a + fract * (b - a);
}

// http://stackoverflow.com/questions/521295/javascript-random-seeds
export function randomUnit(): number {
  const x = Math.sin(g_randomSeed++) * 10000;
  return x - Math.floor(x);
}

export function random(mag: number): number {
  return randomUnit() * mag;
}

export function randomBetween(low: number, high: number) {
  return lerp(low, high, randomUnit());
}

export function getDistance2D(
  fromx: number,
  fromy: number,
  tox: number,
  toy: number,
  fast: boolean = false
): number {
  const w = tox - fromx;
  const h = toy - fromy;

  if (fast) {
    return w * w + h * h;
  } else {
    return Math.sqrt(w * w + h * h);
  }
}

/**
 * Get the direction from 1 point to another
 * Thanks to "Snarkbait" for this little code snippit
 * @return Angle of difference
 */
export function getDirection(
  fromx: number,
  fromy: number,
  tox: number,
  toy: number
): number {
  // arcus tangens, convert to degrees, add 450 and normalize to 360.
  return fmod(
    (Math.atan2(toy - fromy, tox - fromx) / M_PI) * 180.0 + 450.0,
    360.0
  );
}

export function loadXMLDoc(filename: string) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", filename, false);
  xhttp.send();
  return xhttp.responseXML;
}

export function toHex(r: number, g: number, b: number) {
  return (r << 16) + (g << 8) + b;
}
