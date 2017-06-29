var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var cheerio = require('cheerio');
var fs = require('fs');

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
        filename: '[name].bundle.[hash].js'
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
        commonsPlugin,
        function() {
        	this.plugin('done', function(stats) {
                fs.readFile('./index.html', function(err, data) {
                    var $ = cheerio.load(data.toString());
                    $('script[src*="bundle/index"]').attr('src', 'bundle/index.bundle.' + stats.hash+'.js');
					fs.writeFile("index.html",$.html(),function(err) {});
                });
                fs.readFile('./page/html/category.html', function(err, data) {
                    var $ = cheerio.load(data.toString());
                    $('script[src*="bundle/category"]').attr('src', '../../bundle/category.bundle.' + stats.hash+'.js');
					fs.writeFile("./page/html/category.html",$.html(),function(err) {});
                });
                fs.readFile('./page/html/detail.html', function(err, data) {
                    var $ = cheerio.load(data.toString());
                    $('script[src*="bundle/detail"]').attr('src', '../../bundle/detail.bundle.' + stats.hash+'.js');
					fs.writeFile("./page/html/detail.html",$.html(),function(err) {});
                });
                fs.readFile('./page/html/login.html', function(err, data) {
                    var $ = cheerio.load(data.toString());
                    $('script[src*="bundle/login"]').attr('src', '../../bundle/login.bundle.' + stats.hash+'.js');
					fs.writeFile("./page/html/login.html",$.html(),function(err) {});
                });
                fs.readFile('./page/html/prefecture.html', function(err, data) {
                    var $ = cheerio.load(data.toString());
                    $('script[src*="bundle/prefecture"]').attr('src', '../../bundle/prefecture.bundle.' + stats.hash+'.js');
					fs.writeFile("./page/html/prefecture.html",$.html(),function(err) {});
                });
                fs.readFile('./page/html/info.html', function(err, data) {
                    var $ = cheerio.load(data.toString());
                    $('script[src*="bundle/info"]').attr('src', '../../bundle/info.bundle.' + stats.hash+'.js');
                    fs.writeFile("./page/html/info.html",$.html(),function(err) {});
                });
            })
        }
    ],
	resolve: {
		alias: {
			
			"touchSlide": __dirname + "/js/constant/TouchSlide.1.1.js",
			"utils": __dirname + "/utils/utils.js"
       },
       extensions:['','.js','.json']
    }
};
