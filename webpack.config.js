module.exports = {
  entry: "./src/entry.js",
  output: {
      path: __dirname + '/dist/',
      filename: "bundle.js"
  },
  module: {
    loaders: [
      {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
          loader: "file"
      },
      {
          test: /\.scss$/,
          loaders: ["style", "css", "sass"]
      }
    ],
  }
};
