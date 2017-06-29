module.exports = function(ngModule) {
	ngModule.directive('searchPanes', [searchPanesFn]);
	require('./searchPanes.less');

	function searchPanesFn() {
		return {
			require: '^searchTabs',
			restrict: 'E',
			transclude: true,
			scope: {
				title: '@'
			},
			link: function(scope, element, attrs, tabsCtrl) {
				tabsCtrl.addPane(scope);
			},
			template: require('./searchPanes.html')
		};
	}
}