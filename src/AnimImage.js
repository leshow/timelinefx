class AnimImage {
  constructor() {
    // width/height are *frame* width/height
    this._width = 0;
    this._height = 0;
    this._maxRadius = 0;
    this._index = 0;
    this._frames = 1;
    this._imageSourceName = "";
    this._horizCells = 1;
  }

  loadFromXML(xml) {
    let attr = xml.attributes;
    this._imageSourceName = attr.getNamedItem("URL").nodeValue;
    this._width = attr.getNamedItem("WIDTH").nodeValue;
    this._height = attr.getNamedItem("HEIGHT").nodeValue;
    this._frames = attr.getNamedItem("FRAMES").nodeValue;
    this._index = attr.getNamedItem("INDEX").nodeValue;

    // Note that we don't actually know this until we load the image, as we don't have the total image dimensions
    // i.e. we have the size of each cell/frame, and the number of cells, but we don't know the arrangement (e.g. 2x4 or 1x8)
    // Must be set once the image is loaded if we have sprite sheets with different horizontal/vertical number of cells/frames
    this._horizCells = Math.sqrt(this._frames);
  }

  setMaxRadius(radius) {
    this._maxRadius = radius;
  }

  getMaxRadius() {
    return this._maxRadius;
  }

  setWidth(width) {
    this._width = width;
  }

  getWidth() {
    return this._width;
  }

  setHeight(height) {
    this._height = height;
  }

  getHeight() {
    return this._height;
  }

  getFramesCount() {
    return this._frames;
  }

  setIndex(index) {
    this._index = index;
  }

  getIndex() {
    return this._index;
  }

  getFrameX(frameIndex) {
    return this._width * (frameIndex % this._horizCells);
  }

  getFrameY(frameIndex) {
    return this._height * Math.floor(frameIndex / this._horizCells);
  }

  setFilename(filename) {
    this._imageSourceName = filename;
  }

  getFilename() {
    return this._imageSourceName;
  }

  setName(name) {
    this._name = name;
  }

  getName() {
    return this._name;
  }
}

export default AnimImage;
