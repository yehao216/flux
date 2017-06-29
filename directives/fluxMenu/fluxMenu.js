module.exports = function(ngModule) {
	ngModule.directive('fluxMenu', [fluxMenuFn]);
	
	require('./fluxMenu.less');
	function fluxMenuFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				fluxMenuData:'=menuData'
			},
			template: require('./fluxMenu.html'),
            link: function(scope, element, attrs,aa) {
            	var getFlux = function(f) {
//           		var flux = f >= 1024 ? ((f/1024).toFixed(2)) + "G" : f + "M"; 
					var flux = ((f/1024).toFixed(2));
             		return flux;
             	}
             	var per = scope.fluxMenuData.percentage;
             	scope.fluxMenuData.cumulationLeft = getFlux(scope.fluxMenuData.cumulationLeft);
             	if(per != 0) {
             		var wid = per * parseInt($(element).find(".fm_percent").css("width"));
             		$(element).find(".fm_percent").find(".fm_blue").animate({"width":wid},1000);
             	}
            },
            controller: function() {
            }
		}
	}
}

