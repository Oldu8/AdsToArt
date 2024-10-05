const path = require("path");

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
  mode: "production", // You can also use 'development' during development
};
