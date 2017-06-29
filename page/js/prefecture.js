//var $ = require('jquery');
var config = require('../../config/config.js');
var utils = require('utils');
var angular = require('angular');
require('angular-sanitize');
var ngModule = angular.module('prefectureModule', ['ngSanitize']);

ngModule.factory("getFlowSpecial", ["$http", "$q", function($http, $q) {
	return function(tagCode) {
		var defer = $q.defer();
		$http({
			method: "POST",
			url: config.getFlowSpecial + tagCode
		}).success(function(data, status, headers, config) {
			if (status != 200) {
				window.location.href = config.host + '/app/page/html/error/error-403.html'
			}
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
			defer.reject(data);
		});
		return defer.promise;
	}
}]);
ngModule.controller("prefectureCtrl", ["$scope", "getFlowSpecial", "$http", function ($scope, getFlowSpecial, $http) {
	$scope.state = {
		leftTabNum: 0
	}
	var tagCode = $.getUrlVar('tagCode');
	getFlowSpecial(tagCode).then(function (data) {
		if (data.resultCode != 1) {
//			alert(data.resultMsg);
			$scope.errMsg = data.resultMsg;
			return;
		}
		$scope.flowPacks = data.object;
	});
	$scope.toDetail = function(id,range,url){
        if (range == 4 && url != '' && url != null){
            window.location.href = url;
        }else {
            utils.goTo("detail.html", {
                "prodCode": id
            });
        }
	};

	angular.element(document).ready(function () {
		utils.k_init($http, config);
	});
}]);

require('../../directives/leftTabs/leftTabs.js')(ngModule);
require('../../directives/rightPanes/rightPanes.js')(ngModule);
require('../../directives/errorInfo/errorInfo.js')(ngModule);
require('../../css/constant/bootstrap.min.css');
