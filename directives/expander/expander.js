module.exports = function(ngModule) {
	ngModule.directive('expander', [expanderFn]);
	require('./expander.less');
	function expanderFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			require: '^?accordion',
			scope: {
				title: '=expanderTitle'
			},
			template: require('./expander.html'),
		             link: function(scope, element, attrs, accordionController) {
		             	console.log(scope);
		             	console.log(element);
		             	console.log(attrs);
		             	console.log(accordionController);
		             	scope.showMe = false;
		             	accordionController.addExpander(scope);
		             	scope.toggle = function toggle () {
		             		scope.showMe = !scope.showMe;
		             		accordionController.gotOpened(scope);
		             	}
		             }
		}
	}
}

