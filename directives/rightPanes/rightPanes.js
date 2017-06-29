module.exports = function(ngModule) {
	ngModule.directive('rightPanes', [rightPanesFn]);
	require('./rightPanes.less');

	function rightPanesFn() {
		return {
			require: '^leftTabs',
			restrict: 'E',
			transclude: true,
			scope: {
				title: '@'
			},
			link: function(scope, element, attrs, tabsCtrl) {
				tabsCtrl.addPane(scope);
			},
			template: require('./rightPanes.html')
		};
	}
}