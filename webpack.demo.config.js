module.exports = {

  entry: "./demo/index.js",

  output: {
    filename: "demo.js",
    path: __dirname + '/demo',
    library: "LazyBoardDemo",
    libraryTarget: "umd"
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  }
};