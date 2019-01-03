module.exports = api => {
  api.cache(true);

  return {
    plugins: [
      "babel-plugin-transform-es2015-modules-commonjs",
      "@babel/plugin-proposal-class-properties"
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          targets: {
            safari: "9",
            chrome: "37",
            firefox: "47",
            edge: "12",
            ie: "11",
            opera: "55"
          }
        }
      ]
    ]
  };
};
