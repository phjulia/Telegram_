// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// module.exports = {
//   entry: "./src/client/index.jsx",
//   module: {
//     // exclude node_modules
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         include: [
//           path.resolve(__dirname, "src"),
//           path.resolve(__dirname, "node_modules/@salesforce"),
//           path.resolve(
//             "/layers/paketo-buildpacks_npm-install/build-modules/node_modules/"
//           ),
//         ],
//         loader: "babel-loader",
//         //use: ["babel-loader"],
//         options: { presets: ["@babel/env", "@babel/preset-react"] },
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//     ],
//   },
//   // pass all js files through Babel
//   resolve: {
//     extensions: ["*", ".js", ".jsx"],
//   },
//   output: {
//     filename: "main.js",
//     path: path.resolve(__dirname, "build"),
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     // new HtmlWebpackPlugin({
//     //   template: path.join(__dirname, "public", "index.html"),
//     //   filename: "index.html",
//     // }),

//     //new CopyWebpackPlugin([{ from: "src/client/assets", to: "assets" }]),
//   ],
//   devServer: {
//     static: {
//       directory: path.join(__dirname, "build"),
//     },
//     port: 3000,
//   },
// };
