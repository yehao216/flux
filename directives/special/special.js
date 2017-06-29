module.exports = function(ngModule) {
	ngModule.directive('special', [specialFn]);
	
	require('./special.less');
	
	var utils = require('utils');
	function specialFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				specialData:'=specialData'
			},
			template: require('./special.html'),
            link: function(scope, element, attrs) {
             	scope.specialClick = function() {
        			utils.goTo("page/html/prefecture.html",{"tagCode":scope.specialData.tagCode});
           		}
             	
             $("#special .special_img").css("height",$("#special .special_img").width());
            },
            controller: function() {  
           
            }
		}
	}
}

