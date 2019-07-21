const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  watch: true,
  resolve: {
    extensions: [".js"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  }
};
