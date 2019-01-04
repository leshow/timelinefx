import { getNodeAttrValue } from "./Utils";

class AttributeNode {
  frame: number;
  value: number;
  isCurve: boolean;
  c0x: number;
  c0y: number;
  c1x: number;
  c1y: number;

  constructor() {
    this.frame = 0;
    this.value = 0;
    this.isCurve = false;
    this.c0x = 0;
    this.c0y = 0;
    this.c1x = 0;
    this.c1y = 0;
  }

  compare(other: AttributeNode) {
    return this.frame > other.frame;
  }

  setCurvePoints(x0: number, y0: number, x1: number, y1: number) {
    this.c0x = x0;
    this.c0y = y0;
    this.c1x = x1;
    this.c1y = y1;
    this.isCurve = true;
  }

  toggleCurve() {
    this.isCurve = !this.isCurve;
  }

  loadFromXML(xml: any) {
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
