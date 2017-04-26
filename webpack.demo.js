module.exports = {

  entry: "./demo/index.js",

  output: {
    filename: "demo.js",
    path: __dirname + '/demo'
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  }
};