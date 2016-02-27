module.exports = {
    entry: "./assets/js/main.js",
    output: {
        path: "./assets/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};