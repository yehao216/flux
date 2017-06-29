var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
	entry: {
		index: './index.js',
		detail:'./page/js/detail.js',
		category: './page/js/category.js',
		prefecture: './page/js/prefecture.js',
		login: './page/js/login.js',
        info: './page/js/info.js'
	},
	output: {
		path: __dirname + '/bundle',
        filename: '[name].bundle.js'
	},
	module: {
		loaders: [
			{test: /\.html$/, loader: 'raw'},
			{test: /\.(png|jpg|ttf)$/, loader: 'url?limit=8192'},
			{test: /\.(css)$/,loader:'style-loader!css-loader'},
			{test: /\.less$/, loader: 'style!raw!less!'},
			{test: require.resolve("./js/constant/TouchSlide.1.1.js"), loader: "exports?TouchSlide"}
			
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
	        $: "jquery",
	        jQuery: "jquery",
	        "window.jQuery": "jquery"
	    }),
       new UglifyJsPlugin({
			compress: {
			warnings: false
			},
			mangle: {
			except: ['$super', '$', 'exports', 'require','$scope','$last','$emit','$timeout']
			}
		}),
        commonsPlugin
    ],
	resolve: {
		alias: {
			
			"touchSlide": __dirname + "/js/constant/TouchSlide.1.1.js",
			"utils": __dirname + "/utils/utils.js"
       },
       extensions:['','.js','.json']
    }
};
