"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnimImage =
/*#__PURE__*/
function () {
  function AnimImage() {
    _classCallCheck(this, AnimImage);

    // width/height are *frame* width/height
    this._width = 0;
    this._height = 0;
    this._maxRadius = 0;
    this._index = 0;
    this._frames = 1;
    this._imageSourceName = "";
    this._horizCells = 1;
  }

  _createClass(AnimImage, [{
    key: "loadFromXML",
    value: function loadFromXML(xml) {
      var attr = xml.attributes;
      this._imageSourceName = attr.getNamedItem("URL").nodeValue;
      this._width = attr.getNamedItem("WIDTH").nodeValue;
      this._height = attr.getNamedItem("HEIGHT").nodeValue;
      this._frames = attr.getNamedItem("FRAMES").nodeValue;
      this._index = attr.getNamedItem("INDEX").nodeValue; // Note that we don't actually know this until we load the image, as we don't have the total image dimensions
      // i.e. we have the size of each cell/frame, and the number of cells, but we don't know the arrangement (e.g. 2x4 or 1x8)
      // Must be set once the image is loaded if we have sprite sheets with different horizontal/vertical number of cells/frames

      this._horizCells = Math.sqrt(this._frames);
    }
  }, {
    key: "setMaxRadius",
    value: function setMaxRadius(radius) {
      this._maxRadius = radius;
    }
  }, {
    key: "getMaxRadius",
    value: function getMaxRadius() {
      return this._maxRadius;
    }
  }, {
    key: "setWidth",
    value: function setWidth(width) {
      this._width = width;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this._width;
    }
  }, {
    key: "setHeight",
    value: function setHeight(height) {
      this._height = height;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return this._height;
    }
  }, {
    key: "getFramesCount",
    value: function getFramesCount() {
      return this._frames;
    }
  }, {
    key: "setIndex",
    value: function setIndex(index) {
      this._index = index;
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this._index;
    }
  }, {
    key: "getFrameX",
    value: function getFrameX(frameIndex) {
      return this._width * (frameIndex % this._horizCells);
    }
  }, {
    key: "getFrameY",
    value: function getFrameY(frameIndex) {
      return this._height * Math.floor(frameIndex / this._horizCells);
    }
  }, {
    key: "setFilename",
    value: function setFilename(filename) {
      this._imageSourceName = filename;
    }
  }, {
    key: "getFilename",
    value: function getFilename() {
      return this._imageSourceName;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this._name = name;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this._name;
    }
  }]);

  return AnimImage;
}();

exports.default = AnimImage;