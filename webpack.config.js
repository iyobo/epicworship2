module.exports = {
    entry: {
        dashboard: "./app/dashboard/dashboard.js",
        projector: "./app/projector/projector.js"
    },
    output: {
        path: "./out/",
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "assets!css" },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
            }
        ]
    }
};