export function removeFromList(array, elem) {
  let index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}

export const M_PI = 3.14159265358979323846;
export var g_randomSeed = 17;

export function stripFilePath(filename) {
  let index = Math.max(filename.lastIndexOf("/"), filename.lastIndexOf("\\"));
  return filename.substring(index + 1);
}

export function fmod(a, b) {
  return Number((a - Math.floor(a / b) * b).toPrecision(8));
}

export function degrees(rad) {
  return rad * (180 / Math.PI);
}

export function toRadians(deg) {
  return deg * (Math.PI / 180);
}

export class CopyHelper {
  constructor(fromObj, toObj) {
    this.m_fromObj = fromObj;
    this.m_toObj = toObj;
  }
  copy(key, defaultVal) {
    this.m_toObj[key] = this.m_fromObj ? this.m_fromObj[key] : defaultVal;
  }
}

export class XMLHelper {
  constructor(xml) {
    this.m_xml = xml;
    this.m_attr = xml.attributes;
  }
  getAttr(attrName) {
    let attr = this.m_attr.getNamedItem(attrName);
    return attr ? attr.nodeValue : null;
  }
  getAttrAsInt(attrName) {
    return parseInt(this.getAttr(attrName));
  }
  getAttrAsFloat(attrName) {
    return parseFloat(this.getAttr(attrName));
  }
  getAttrAsBool(attrName) {
    return this.getAttrAsInt(attrName) > 0;
  }

  getChildAttr(childName, attrName) {
    let childNode = this.m_xml.getElementsByTagName(childName)[0];
    if (childNode) return getXMLAttrSafe(childNode, attrName, null);
    return null;
  }

  hasChildAttr(attrName) {
    return this.getChildAttr(attrName) !== null;
  }

  getChildAttrAsInt(attrName) {
    return parseInt(this.getChildAttr(attrName));
  }
  getChildAttrAsBool(attrName) {
    return this.getChildAttrAsInt(attrName) > 0;
  }
}

export function getNodeAttrValue(elem, attrName) {
  return elem.attributes.getNamedItem(attrName).nodeValue;
}

export function forEachInXMLNodeList(nodelist, fn) {
  for (let i = 0; i < nodelist.length; i++) {
    fn(nodelist[i]);
  }
}

export function forEachXMLChild(xmlNode, tag, fn) {
  let nodelist = xmlNode.getElementsByTagName(tag);
  for (var i = 0; i < nodelist.length; i++) {
    if (nodelist[i].parentElement == xmlNode) fn(nodelist[i]);
  }
}

export function getXMLAttrSafe(xmlNode, attrName, defaultResult = "") {
  let attr = xmlNode.attributes
    ? xmlNode.attributes.getNamedItem(attrName)
    : null;
  return attr ? attr.nodeValue : defaultResult;
}

export function lerp(a, b, fract) {
  return a + fract * (b - a);
}

// http://stackoverflow.com/questions/521295/javascript-random-seeds
export function randomUnit() {
  let x = Math.sin(g_randomSeed++) * 10000;
  return x - Math.floor(x);
}

export function random(mag) {
  return randomUnit() * mag;
}

export function randomBetween(low, high) {
  return lerp(low, high, randomUnit());
}

export function getDistance2D(fromx, fromy, tox, toy, fast = false) {
  let w = tox - fromx;
  let h = toy - fromy;

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
export function getDirection(fromx, fromy, tox, toy) {
  // arcus tangens, convert to degrees, add 450 and normalize to 360.
  return fmod(
    (Math.atan2(toy - fromy, tox - fromx) / M_PI) * 180.0 + 450.0,
    360.0
  );
}

export function loadXMLDoc(filename) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", filename, false);
  xhttp.send();
  return xhttp.responseXML;
}

export function toHex(r, g, b) {
  return (r << 16) + (g << 8) + b;
}
