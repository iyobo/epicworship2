module.exports = {
    entry: {
        dashboardApp: "./app/dashboard/dashboardApp.js",
        projectorApp: "./app/projector/projectorApp.js"
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