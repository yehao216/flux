module.exports = function(ngModule) {
	ngModule.directive('floor', [floorFn]);
	

	require('./floor.css');
//	var $ = jquery = require('jquery');
//		require('bootstrap');
	var utils = require('utils');
		
	function floorFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				floorData: '=floorData'
			},
			template: require('./floor.html'),
            link: function(scope, element, attrs) {
				scope.floorClick = function (url) {
					utils.goTo(url);
            	}
            	
            	var w = $(window).width() - 24;
             	var interval = setInterval(function() {
	        		if($(".floor_fancy") && scope.floorData && $(".floor_fancy ul li").length == scope.floorData.length) {
		        		clearInterval(interval);
			          
			            var cType = scope.floorData[0].cssType;
			            	switch (cType){
			            		case 31:
			            			var h = parseFloat((w/3) * (460/345)); 
			            			break;
			            		case 32:
	                                var h = w / 2;
			            			break;
			            		case 41:
	                                var h = w / 2;
	                                break;
			            		case 42:
	                                var h = w * (1 / 2);
			            			break;
			            		case 51:
	                                var h = w * (5 / 6);
			            			break;
			            		case 52:
	                                var h = w * (3 / 4);
			            			break;
			            		case 61:
	                                var h = w * (5 / 6);
			            			break;
			            		case 62:
	                                var h = w * (3 / 4);
			            			break;
			            		case 71:
	                                var h = w * (13 / 12);
	                                break;
	                            case 72:
	                                var h = w;
	                                break;
			            		case 81:
	                                var h = w * (13 / 12);
			            			break;
			            		case 82:
	                                var h = w * (7 / 6);
	                                break;
			            		case 91:
	                                var h = w * (7 / 6);
			            			break;
			            		case 92:
	                                var h = w * (7 / 6);
			            			break;
			            		default:
			            			h = 0;
			            			break;
			            	}
			            	$(".floor_" + cType).find(".floor_fancy").css("height",h);
		           	}
	        	},100);
            },
            controller: function() {
            	
            	
            }
		}
	}
}

