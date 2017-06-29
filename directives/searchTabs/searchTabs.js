module.exports = function(ngModule) {
	ngModule.directive('searchTabs', [searchTabsFn]);
	require('./searchTabs.less');

	function searchTabsFn() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			controller: function($scope) {
				var panes = $scope.panes = [];
				$scope.select = function(pane, index) {
					angular.forEach(panes, function(value, key) {
						if(key != index){
							value.selected = false;
						}
					});
					pane.selected = !pane.selected;
				};
				this.addPane = function(pane) {
					panes.push(pane);
				};
			},
			template: require('./searchTabs.html')
		};
	}
}