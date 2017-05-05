module.exports = {

  entry: "./src/index.js",

  output: {
    filename: "lazy-board.js",
    path: __dirname,
    library: "LazyBoard",
    libraryTarget: "umd"
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  }
};