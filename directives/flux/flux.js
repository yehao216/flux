module.exports = function(ngModule) {
	ngModule.directive('flux', [fluxFn]);
	
	require('./flux.less');
//	var $ = require('jquery');
	function fluxFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				fluxData:'=fluxData'
			},
			template: require('./flux.html'),
            link: function(scope, element, attrs) {
             	var getFlux = function(f) {
             		var flux = f >= 1024 ? ((f/1024).toFixed(2)) + "G" : f + "M"; 
             		return flux;
             	}
				
             	scope.fluxData.flux_country = getFlux(scope.fluxData.countryLeft);
             	scope.fluxData.flux_province = getFlux(scope.fluxData.provinceLeft);
//       		scope.fluxData.all_flux = scope.fluxData.cumulationLeft;
         		scope.fluxData.local_flux = scope.fluxData.localLeft;
         		
//           	scope.fluxData.flux_all = getFlux(scope.fluxData.all_flux);
             	scope.fluxData.flux_local = getFlux(scope.fluxData.local_flux);
             	
             	$(element).find(".flux_tit").click(function() {
             		window.location.href = "page/html/info.html";
             	});
             	
//           	$(element).find(".flux_val").stop().animate({"width":(scope.fluxData.percentage) + "%"},"3000");
            },
            controller: function() {
            }
		}
	}
}

