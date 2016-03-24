import webpack from "webpack"
import path from "path"

const minimize = (process.argv.indexOf("--min") !== -1)
const plugins = []

if (minimize) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress : {
                warnings : false
            }
        })
    )
}

const outputFilename = `react.bootstrap.datetimepicker${ minimize ? ".min" : ""}.js`

const config = {
    plugins,
    entry : path.join(__dirname, "/src/index.js"),
    resolve : {
        extensions : ["", ".js"]
    },
    /*
    externals: {
        "react"        : "React",
        "moment"       : "moment",
        "moment-range" : "moment-range"
    },
    */
    module: {
        loaders: [
            { test : /\.js?$/, exclude: /node_modules/, loaders: ["babel-loader"] }
        ]
    },
    output : {
        path          : path.join(__dirname, "/dist/"),
        filename      : outputFilename,
        library       : "ReactBootstrapDatetimepicker",
        libraryTarget : "umd"
    }
}

export default config
