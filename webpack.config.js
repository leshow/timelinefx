const path = require("path");
// var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",

  entry: {
    "bundle.js": [
      path.resolve(__dirname, "src/Utils.js"),
      path.resolve(__dirname, "src/Matrix2.js"),
      path.resolve(__dirname, "src/Vector2.js"),
      path.resolve(__dirname, "src/Entity.js"),
      path.resolve(__dirname, "src/Particle.js"),
      path.resolve(__dirname, "src/Effect.js"),
      path.resolve(__dirname, "src/Emitter.js"),
      path.resolve(__dirname, "src/EmitterArray.js"),
      path.resolve(__dirname, "src/AnimImage.js"),
      path.resolve(__dirname, "src/AttributeNode.js"),
      path.resolve(__dirname, "src/ParticleManager.js"),
      path.resolve(__dirname, "src/EffectsLibrary.js")
    ]
  },

  output: {
    filename: "[name]",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  }
};
