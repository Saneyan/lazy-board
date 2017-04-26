module.exports = {

  entry: "./src/index.js",

  output: {
    filename: "lazy-board.js",
    path: __dirname
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  }
};