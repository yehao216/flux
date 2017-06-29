//var $ = require('jquery');
var Base64 = require('js-base64').Base64;
//获取当前页面URL参数,本项目不可用,因为URL不刷新
$.extend({
   getUrlVars: function () {
   var vars = [], hash;
   var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
   for (var i = 0; i < hashes.length; i++) {
   hash = hashes[i].split('=');
   vars.push(hash[0]);
   vars[hash[0]] = hash[1];
   }
   return vars;
   },
   getUrlVar: function (name) {
   return $.getUrlVars()[name];
   }
});
var transform = function(data){
    return $.param(data);
};

var httpConfig = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    transformRequest: transform
};

var utils = utils || {};
// 跳转
utils.goTo = function(url,obj) {
	if(!obj) {
		if(url.indexOf("http://") >=0 || url.indexOf(".html") >=0 || url[0] == "/") {
			window.location.href = url;
		} else {
			window.location.href = Base64.decode(url);
		}
	} else {
		var str = "";
		for (var o in obj) {
			str += "&" + o + "=" + obj[o];
		}
		if(url.indexOf("http://") >=0 || url.indexOf(".html") >=0 || url[0] == "/") {
			window.location.href = url + "?1=1" + str;
		} else {
			window.location.href = Base64.decode(url) + "?1=1" + str;
		}
		
	}
};

// 拼接路径
utils.getUrl = function(url,obj) {
	if(!obj) {
		return url;
	} else {
		var str = "";
		for (var o in obj) {
			str += "&" + o + "=" + obj[o];
		}
		return url + "?1=1" + str;
	}
	return url;
};

// $http:angular $http   config:配置  callback:回调
utils.init = function ($http,config,callback) {
	$http.post(config.isLogin).success(function(response) {
		if(response.resultCode == 0) {
    		var str = response.params;
    		if(!str) {
				utils.goTo(config.host + "/app/page/html/login.html", {"url": Base64.encodeURI(window.location.href)});

    		} else {
				var u = str + "?url=" + Base64.encodeURI(window.location.href);
    			utils.goTo(u);
    		}
    	} else {
    		if(callback) {
    			callback();
    		}
    	}
	});
};

utils.k_init = function($http,config) {
	/*var k = window.location.href;
	$http.post(config.kinit,{"k":k},httpConfig).success(function(response) {
		
	});*/

    var str = "<script>var _paq = _paq || [];_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function () {_paq.push(['setTrackerUrl', '" + config.kinit + "']);_paq.push(['setSiteId', window.location.host]);_paq.push(['setDocumentTitle', document.title]);var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];g.type = 'text/javascript';g.async = true;	g.defer = true;g.src = '" + config.host + "/app/js/change/piwik.js';s.parentNode.insertBefore(g, s);})();</script>"
    $("head").append(str);
};
/*
utils.getHash = function(url) {
	return $("script[src*='.bundle.']").attr("src").split(".")[2];
}
*/

module.exports = utils;
