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
        { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }
        ]
    }
};