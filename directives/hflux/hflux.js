module.exports = function(ngModule) {
	ngModule.directive('hflux', [hfluxFn]);
	
	require('./hflux.less');
	require('../button/button.js');
	function hfluxFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {},
			template: require('./hflux.html'),
            link: function(scope, element, attrs,aa) {
            	var utils = require('utils');
             	scope.clickTo = function() {
             		utils.goTo("page/html/login.html");
             	}
            },
            controller: function() {
            }
		}
	}
}

