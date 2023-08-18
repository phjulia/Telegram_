const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: ["./src/server/client/index.jsx"],
  output: {
    path: path.join(__dirname, "/build"),
    //path: path.join(__dirname, "public/activity/edit"),
    filename: "main.js",
    //   publicPath: "/activity/edit/",
  },
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/@salesforce"),
          path.resolve(
            "/layers/paketo-buildpacks_npm-install/build-modules/node_modules/"
          ),
        ],
        loader: "babel-loader",
        //use: ["babel-loader"],
        options: { presets: ["@babel/env", "@babel/preset-react"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // pass all js files through Babel
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/server/index.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3000,
  },
};
