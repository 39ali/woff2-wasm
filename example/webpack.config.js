

const webpack = require("webpack");
const path = require("path");
const EncodingPlugin = require('webpack-encoding-plugin');
module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "."),
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  // This is necessary due to the fact that emscripten puts both Node and web
  // code into one file. The node part uses Node’s `fs` module to load the wasm
  // file.
  // Issue: https://github.com/kripken/emscripten/issues/6542.
  plugins: [new EncodingPlugin({
    encoding: 'utf-8'
})],
  module: {
    rules: [
      // Emscripten JS files define a global. With `exports-loader` we can 
      // load these files correctly (provided the global’s name is the same
      // as the file name).
      {
        test: /wofftwo\.js$/,
        loader: "exports-loader"
      },
      // wasm files should not be processed but just be emitted and we want
      // to have their public URL.
      {
        test: /wofftwo\.wasm$/,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          publicPath: "dist/"
        }
      }
    ]
  },
};