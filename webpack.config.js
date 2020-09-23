const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },

  devServer: {
    contentBase: "./public",
    port: 3000,
  },

  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve("./public/index.html"),
    }),
  ],
};

module.exports = config;
