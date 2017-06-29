module.exports = function(ngModule) {
	ngModule.directive('onFinishRender', ['$timeout',function ($timeout) {
		    return {
		        restrict: 'A',
		        link: function(scope, element, attr) {
		            if (scope.$last === true) {
		                $timeout(function() {
		                   TouchSlide({
								slideCell:"#focus",
								titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
								mainCell:".bd ul", 
								effect:"leftLoop", 
								autoPlay:true,//自动播放
								autoPage:true,//自动分页
								interTime:4000, // 翻页时间间隔
								switchLoad:"_src"
							});
							// var h = parseInt(window.screen.width) / 2.8;
							//
							// $("#focus").css("height",h);
							// $("#focus .bd").find("ul li").find("img").css("height",h);
		                });
		            }
		        }
		    };
		}]).directive('slide', [slideFn]);
	
	require('./slide.css');
	var TouchSlide = require('touchSlide');
	
	var utils = require('utils');
	function slideFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				slideData: '=slideData'
			},
			template: require('./slide.html'),
            link: function(scope, element, attrs) {
             	angular.forEach(scope.slideData,function(s) {
             		s.channel = utils.getUrl(s.picOwnerUrl);
             	});
            }
		}
	}
}

