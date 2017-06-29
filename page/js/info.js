var angular = require('angular');
require('angular-sanitize');
var ngModule = angular.module('infoModule', ['ngSanitize']);

//var $ = require('jquery');
var utils = require('utils');
require('../../css/change/style.css');

require('../../directives/title/title.js')(ngModule);
require('../../directives/fluxMenu/fluxMenu.js')(ngModule);
require('../../directives/errorInfo/errorInfo.js')(ngModule);

var transform = function (data) {
    return $.param(data);
};

ngModule.controller("infoController", ['$scope', '$q', '$http', function ($scope, $q, $http) {
    var config = require('../../config/config.js');
    $scope.tName = "本月流量使用明细";

    $scope.httpConfig = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: transform
    };
    
    /*$scope.fluxMenu = {
    "extend": {
        "point_num": 78800,
        "query_time": "2016-07-21 19:17:33"
    },
    "object": [
        {
            "cumulationLeft": "15360",
            "cumulationTotal": "15360",
            "endTime": "2016-08-01 00:00:00",
            "offerName": "爱玩4G定向流量包201407_0元-可选包",
            "percentage": 0,
            "relaName": "手机上网省内定向流量"
        },
        {
            "cumulationLeft": "15360",
            "cumulationTotal": "15360",
            "endTime": "2016-08-01 00:00:00",
            "offerName": "爱听4G定向流量包201407_0元-可选包",
            "percentage": 0,
            "relaName": "手机上网省内定向流量"
        },
        {
            "cumulationLeft": "15360",
            "cumulationTotal": "15360",
            "endTime": "2016-08-01 00:00:00",
            "offerName": "爱看4G定向流量包201407_0元-可选包",
            "percentage": 0,
            "relaName": "手机上网省内定向流量"
        },
        {
            "cumulationLeft": "1024",
            "cumulationTotal": "1024",
            "endTime": "2016-08-01 00:00:00",
            "offerName": "优酷视频特权包/20元包1G省内定向流量及会员特权",
            "percentage": 0,
            "relaName": "手机上网省内定向流量"
        },
        {
            "cumulationLeft": "3072",
            "cumulationTotal": "3072",
            "endTime": "2016-08-01 00:00:00",
            "offerName": "定向流量/QQ音乐/9元包3G省内流量",
            "percentage": 0,
            "relaName": "QQ音乐省内流量"
        },
        {
            "cumulationLeft": "826",
            "cumulationTotal": "826",
            "endTime": "2016-08-01 00:00:00",
            "offerName": "4G闲时流量包10元包1G省内闲时流量_201502",
            "percentage": 0,
            "relaName": "手机上网省内闲时流量"
        },
        {
            "cumulationLeft": "826",
            "cumulationTotal": "826",
            "endTime": "2016-08-01 00:00:00",
            "offerName": "多米音乐定向流量包201502_10元-可选包",
            "percentage": 0,
            "relaName": "手机上网省内定向流量"
        },
        {
            "cumulationLeft": "1024",
            "cumulationTotal": "1024",
            "endTime": "2016-08-01 00:00:00",
            "offerName": "天翼乐享4G-201406/129元",
            "percentage": 0,
            "relaName": "手机上网国内流量"
        },
        {
            "cumulationLeft": "1024",
            "cumulationTotal": "1024",
            "endTime": "2016-08-01 00:00:00",
            "offerName": "天翼乐享4G-201406/129元",
            "percentage": 0,
            "relaName": "手机上网国内流量"
        },
        {
            "cumulationLeft": "1024",
            "cumulationTotal": "1024",
            "endTime": "2016-08-01 00:00:00",
            "offerName": "视频+/天翼乐视会员流量包（15元包1G）",
            "percentage": 0,
            "relaName": "乐视视频1G定向流量"
        }
    ],
    "resultCode": "1"
}*/
    $q.all({
        first: $http.post(config.flowNumDetail,$scope.httpConfig).success(function (response) {
            if(response.resultCode == 0) {
            	$scope.errMsg = "服务器异常，请稍候再试";
            	return;
            } else if(response.resultCode == 2){
            	window.location.href = "login.html";
            } else if(response.resultCode == 1) {
            	$scope.fluxMenu = response;
            }
        })
    });

    
}]);







