const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // Import the plugin

module.exports = {
  entry: "./src/content.js", // Your main JS file
  output: {
    filename: "content.bundle.js", // Output bundle after build
    path: path.resolve(__dirname, "build"), // Directory for the final build
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use Babel to transpile modern JavaScript
          options: {
            presets: ["@babel/preset-env"], // Ensure ES6+ compatibility
          },
        },
      },
    ],
  },
  plugins: [
    // Copy specific files to the build folder
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/popup.js", to: "popup.js" }, // Copy popup.js to build folder
        { from: "src/index.css", to: "index.css" }, // Copy index.css to build folder
        { from: "src/popup.html", to: "popup.html" }, // Copy popup.html to build folder
      ],
    }),
  ],
  mode: "production", // You can also use 'development' during development
};
