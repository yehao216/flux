module.exports = function(ngModule) {
	ngModule.directive('fbPanes', [fbPanesFn]);
	require('./fbPanes.less');

	function fbPanesFn() {
		return {
			require: '^fbTabs',
			restrict: 'E',
			transclude: true,
			scope: {
				title: '@'
			},
			link: function(scope, element, attrs, tabsCtrl) {
				tabsCtrl.addPane(scope);
			},
			template: require('./fbPanes.html')
		};
	}
}