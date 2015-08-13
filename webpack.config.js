module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + '/public/static/build/',
        filename: "main.js",
        publicPath: "static/build/"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},

            { test: /\.gif$/, loader: "url-loader?limit=10000&mimetype=image/gif" },
            { test: /\.jpg$/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
            { test: /\.png$/, loader: "url-loader?limit=10000&mimetype=image/png" },
            { test: /\.svg$/, loader: "url-loader?limit=26000&mimetype=image/svg+xml" },
            { test: /\.(woff2?|ttf|eot)$/, loader: "url-loader" },

            { test: /\.jsx$/, loader: "react-hot!babel!eslint-loader", exclude: [/node_modules/, /public/] },
            { test: /\.js$/, loader: "babel!eslint-loader", exclude: [/node_modules/, /public/] },


            { test: /\.json$/, loader: "json-loader"}
        ]
    },
    eslint: {
        configFile: '.eslintrc'
    }
};
