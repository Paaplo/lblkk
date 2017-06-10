const path = require('path');

module.exports = {
    entry: "./frontend-src/index.js",
    output: {
        path: path.join(__dirname, "app", "js"),
        filename: "app.js"
    },
    module: {
        loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
};