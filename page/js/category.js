//var $ = require('jquery');
var config = require('../../config/config.js');
var angular = require('angular');
var con = require("../../config/constant.js");
var utils = require('utils');

//require('./css/style.css');
require('../../css/constant/bootstrap.min.css');
require('angular-sanitize');
var ngModule = angular.module('categoryModule', ['ngSanitize']);
require('../../directives/fbTabs/fbTabs.js')(ngModule);
require('../../directives/fbPanes/fbPanes.js')(ngModule);
require('../../directives/leftTabs/leftTabs.js')(ngModule);
require('../../directives/rightPanes/rightPanes.js')(ngModule);
require('../../directives/searchTabs/searchTabs.js')(ngModule);
require('../../directives/searchPanes/searchPanes.js')(ngModule);
require('../../directives/bottom/bottom.js')(ngModule);
require('../../directives/errorInfo/errorInfo.js')(ngModule);
ngModule.factory("getFlowList", ["$http", "$q", function($http, $q) {
	return function(param) {
		var defer = $q.defer();
		$http({
			method: "POST",
			data: {
				"flowNum": param.flowNum,
				"price": param.price,
				"term": param.term,
				"range": param.range
			},
			transformRequest: function(data) {
				return $.param(data);
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			url: config.getFlowList
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
}]).factory("getFlowKinds", ["$http", "$q", function($http, $q) {
	return function(param) {
		var defer = $q.defer();
		$http({
			method: "POST",
			url: config.getFlowKinds
		}).success(function(data, status, headers, config) {
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
			defer.reject(data);
		});
		return defer.promise;
	}
}]).controller("categoryCtrl", ['$scope', 'getFlowList', 'getFlowKinds', '$http', function ($scope, getFlowList, getFlowKinds, $http) {
    $scope.param = $.extend(true, {flowNum: "", price: "", term: "", range: ""}, history.state);
	var clickable = true; //防止重复点击
	$scope.state = history.state || {};
	$scope.fptypes = [{
		title: "套餐大小",
		order: 0,
		value: ["", "0,100", "101,500", "501,1024", "1025,"]
	}, {
		title: "套餐价格",
		order: 1,
		value: ["", "0,10", "11,20", "21,50", "51,"]
	}, {
		title: "使用期限",
		order: 2,
		value: ["", "onlyThisMonth", "reorderNextMonth", "durationPackage"]
	}, {
		title: "使用区域",
		order: 3,
		value: ["", "2", "1", "3"]
	}];

	$scope.bottom = con.BOTTOM_CAT;
	$scope.searchPack = function(e, type, value) {
		//		console.log(e.target);
		//		console.log(this);
		//		console.log(type + ":" + value);
		var url = window.location.href;
		if (clickable && $(e.target).hasClass("condition")) {
			clickable = false;
			var str = e.target.innerHTML;
			this.$parent.$parent.title = e.target.innerHTML;
			$(e.target).addClass("active").parent().siblings().children().removeClass("active");
			this.$parent.$parent.selected = false;
			switch (type) {
				case "套餐大小":
					$scope.param.flowNum = value;
					$scope.state.flowNum = value;
					history.replaceState($scope.state, null, url);
					break;
				case "套餐价格":
					$scope.param.price = value;
					$scope.state.price = value;
					history.replaceState($scope.state, null, url);
					break;
				case "使用期限":
					$scope.param.term = value;
					$scope.state.term = value;
					history.replaceState($scope.state, null, url);
					break;
				case "使用区域":
					$scope.param.range = value;
					$scope.state.range = value;
					history.replaceState($scope.state, null, url);
					break;
				default:
					break;
			}
			console.log($scope.param);
			getList($scope.param);
		}
	};

	//根据条件筛选流量
	function getList(param) {
		getFlowList(param).then(function(data) {
			if (data.resultCode != 1) {
				$scope.errMsg = data.resultMsg;
				return;
			}
			$scope.flowList = data.object;
			clickable = true;
		});
	}
	getList($scope.param);

	//获取流量包分类
	getFlowKinds().then(function (data) {
		if (data.resultCode != 1) {
			$scope.errMsg = data.resultMsg;
			return;
		}
		$scope.flowKinds = data.object;
        console.log($scope.flowKinds);
	});

	$scope.toDetail = function(id,range,url) {
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
//	window.onhashchange = function () {
//		console.log(window.location.hash);
//	}

}]);

