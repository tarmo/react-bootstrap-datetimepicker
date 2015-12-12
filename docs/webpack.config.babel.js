import webpack from "webpack"
import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        title    : "Docs",
        template : path.join(__dirname, "/docs.html"),
        inject   : "body"
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress : {
            warnings : false
        }
    })
]

const config = {
    plugins,
    entry : {
        docs : [
            "webpack-dev-server/client?http://localhost:8080/",
            "webpack/hot/only-dev-server",
            path.join(__dirname, "/js/docs.js")
        ]
    },
    resolve : {
        extensions : ["", ".js"]
    },
    module: {
        loaders: [
            { test : /\.js?$/, exclude: /node_modules/, loaders: ["react-hot", "babel-loader"] }
        ]
    },
    output : {
        path          : path.join(__dirname, "/../gh-pages/"),
        publicPath    : "http://localhost:8080/",
        filename      : "[name].js"
    },

    devtool   : "eval-source-map",
    devServer : {
        contentBase        : path.join(__dirname, "/../gh-pages/"),
        port               : 8080,
        hot                : true,
        historyApiFallback : true
    }
}

export default config
