const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // Import the plugin

module.exports = (env) => {
  return {
    mode: env?.mode || "production",
    entry: "./src/content.js",
    output: {
      filename: "content.bundle.js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: "src/popup/popup.js", to: "popup/popup.js" },
          {
            from: "src/popup/popupWhitelist.js",
            to: "popup/popupWhitelist.js",
          },
          { from: "src/background.js", to: "background.js" },
          { from: "src/popup/index.css", to: "popup/index.css" },
          { from: "src/popup/popup.html", to: "popup/popup.html" },
        ],
      }),
    ],
  };
};
