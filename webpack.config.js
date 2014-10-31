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
            { test: /\.(woff|ttf|eot)$/, loader: "url-loader" },

            { test: /\.jsx$/, loader: "traceur?sourceMaps=true&runtime=true!jshint-loader!jsx-loader", exclude: [/node_modules/, /public/] },
            { test: /\.js$/, loader: "traceur?sourceMaps=true&runtime=true!jshint-loader", exclude: [/node_modules/, /public/] },

            { test: /\.json$/, loader: "json-loader"}
        ]
    },
    jshint: {
        // Env
        "browser": true,
        "node": true,
        "jquery": true,

        // Restrictions
        "bitwise": true,
        "newcap": false,
        "noempty": true,
        "esnext": true,
        "globalstrict": true,
        "freeze": true,
        "undef": true,
        "unused": true,
        "maxcomplexity": 25,
        "latedef": true,
        "smarttabs": false,
        "trailing": false,
        "laxbreak": true,

        // Style
        "maxparams": 4,

        // Loder options
        "emitErrors": false,
        "failOnHint": false,

        "globals": {
            "$": true,
            "Promise": true
        }
    }
};