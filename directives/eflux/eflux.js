module.exports = function(ngModule) {
	ngModule.directive('eflux', [hfluxFn]);
	
	require('./eflux.less');
	require('../button/button.js');
	function hfluxFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				efluxData:'=efluxData',
                event: '=refreshFlux'
			},
			template: require('./eflux.html'),
            link: function(scope, element, attrs,aa) {
            	var utils = require('utils');
             	scope.refreshFlux = function() {
             		scope.event();
             	}
            },
            controller: function() {
            }
		}
	}
}

