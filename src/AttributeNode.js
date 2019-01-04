import { getNodeAttrValue } from "./Utils";

class AttributeNode {
  constructor() {
    this.frame = 0;
    this.value = 0;
    this.isCurve = false;
    this.c0x = 0;
    this.c0y = 0;
    this.c1x = 0;
    this.c1y = 0;
  }

  compare(other) {
    return this.frame > other.frame;
  }

  setCurvePoints(x0, y0, x1, y1) {
    this.c0x = x0;
    this.c0y = y0;
    this.c1x = x1;
    this.c1y = y1;
    this.isCurve = true;
  }

  toggleCurve() {
    this.isCurve = !this.isCurve;
  }

  loadFromXML(xml) {
    if (xml) {
      this.setCurvePoints(
        getNodeAttrValue(xml, "LEFT_CURVE_POINT_X"),
        getNodeAttrValue(xml, "LEFT_CURVE_POINT_Y"),
        getNodeAttrValue(xml, "RIGHT_CURVE_POINT_X"),
        getNodeAttrValue(xml, "RIGHT_CURVE_POINT_Y")
      );
    }
  }
}

export default AttributeNode;
