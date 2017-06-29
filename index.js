var angular = require('angular');
require('angular-sanitize');
var ngModule = angular.module('mainModule', ['ngSanitize']);

require('./css/change/style.css');

require('./directives/container/container.js')(ngModule);

require('./directives/slide/slide.js')(ngModule);

require('./directives/eflux/eflux.js')(ngModule);

require('./directives/hflux/hflux.js')(ngModule);

require('./directives/flux/flux.js')(ngModule);

require('./directives/tabs/tabs.js')(ngModule);

require('./directives/tabmenu/tabmenu.js')(ngModule);

require('./directives/tabcontent/tabcontent.js')(ngModule);

require('./directives/floor/floor.js')(ngModule);

require('./directives/product/product.js')(ngModule);

require('./directives/package/package.js')(ngModule);

require('./directives/special/special.js')(ngModule);

var con = require("./config/constant.js");

require('./directives/bottom/bottom.js')(ngModule);
require('./directives/errorInfo/errorInfo.js')(ngModule);

var config = require('./config/config.js');

ngModule.controller("mainController",["$scope","$http","$q",function($scope,$http,$q) {
	var utils = require("utils");
	utils.k_init($http,config);
	
	$scope.flowFlag = false;
	$scope.fluxFlag = false;
	$scope.efluxFlag = false;
	$scope.phoneNum = "";
	
	$q.all({
 		first:
	 		$http.post(config.index).success(function(response,status) {
		    	if(status != 200) {
					window.location.href = config.host + '/app/page/html/error/error-403.html'
		    	}
		    	if(response.resultCode != 1) {
//		    		alert(response.resultMsg);
		    		$scope.errMsg = response.resultMsg;
					return;
		    	}
		    	$scope.info = response.object;
		    	$scope.slides = $scope.info.randomPics;
		    	$scope.floor = $scope.info.blockPics;
		    	$scope.video = $scope.info.indexVideos;
		    	$scope.product = $scope.info.prodTags;
		    	$scope.speciall = $scope.info.speciallTags;
		    	
		    	$scope.bottom = con.BOTTOM_CON;
		    	
		}),
		second:
		$http.post(config.flowNum).success(function(response,status) {
		    	if(status != 200) {
					window.location.href = config.host + '/app/page/html/error/error-403.html'
		    	}
		    	if(response.resultCode == 0) {
//		    		alert(response.resultMsg);
//					$scope.errMsg = response.resultMsg;
					$scope.phoneNum = response.object;
					$scope.efluxFlag = true;
					$scope.flowFlag = false;
		    		$scope.fluxFlag = false;
		    		return;
		    	} else if(response.resultCode == 2) {
		    		$scope.efluxFlag = false;
		    		$scope.flowFlag = true;
		    		$scope.fluxFlag = false;
		    		return;
		    	}
		    	$scope.efluxFlag = false;
		    	$scope.flowFlag = false;
		    	$scope.fluxFlag = true;
		    	
		    	$scope.flux = response.object;
                $('.copyRight').show();
		  }),
		third:
		$http.post(config.getFlowKinds).success(function(response,status) {
			if(status != 200) {
				window.location.href = config.host + '/app/page/html/error/error-403.html'
	    }
			angular.forEach(response.object,function(g,i){
				if(!g.childProduct) {
					g.childProduct = [];
				}
				if(g.childType){
					angular.forEach(g.childType,function(s,j){
						g.childProduct = g.childProduct.concat(s.childProduct);
					});
				}
			});
	    	$scope.tabs = response.object;
		}),
	  	forth:
	  	$http.post(config.indexLike).success(function(response,status) {
			if(status != 200) {
				window.location.href = config.host + '/app/page/html/error/error-403.html'
	    	}
	    	$scope.guess = response.object[0].prodTagReleations;
	    	console.log($scope.guess);
		})
	});
	
	$scope.addFluxName = "流量加个油";
	$scope.videoLookName = "视频任性看";
	
	
	
	$scope.refreshFlux = function() {
		$http.post(config.flowNum).success(function(response,status) {
	    	if(status != 200) {
				window.location.href = config.host + '/app/page/html/error/error-403.html'
	    	}
	    	if(response.resultCode == 0) {
//		    		alert(response.resultMsg);
//				$scope.errMsg = response.resultMsg;
				$scope.phoneNum = response.object;
				$scope.efluxFlag = true;
				$scope.flowFlag = false;
	    		$scope.fluxFlag = false;
	    		return;
	    	} else if(response.resultCode == 2) {
	    		$scope.efluxFlag = false;
	    		$scope.flowFlag = true;
	    		$scope.fluxFlag = false;
	    		return;
	    	}
	    	$scope.efluxFlag = false;
	    	$scope.flowFlag = false;
	    	$scope.fluxFlag = true;
	    	
	    	$scope.flux = response.object;
	  })
	}
	
	
}]);





