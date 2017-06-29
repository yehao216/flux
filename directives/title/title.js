module.exports = function(ngModule) {
	ngModule.directive('title', [titleFn]);
	
	require('./title.less');
//	var $ = require('jquery');
	function titleFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				titleName:'=titleName'
			},
			template: require('./title.html'),
            link: function(scope, element, attrs) {
            	console.log(scope.titleName);
            	
            	$(element).click(function() {
            		history.go(-1);
            	});
            		
            	
             	/*var getFlux = function(f) {
             		var flux = f >= 1024 ? ((f/1024).toFixed(2)) + "G" : f + "M"; 
             		return flux;
             	}*/
				
             	//scope.fluxData.flux_country = getFlux(scope.fluxData.countryLeft);
             	
             	/*$(element).find(".flux_val").stop().animate({"width":(scope.fluxData.percentage) + "%"},"3000");*/
            },
            controller: function() {
            }
		}
	}
}

