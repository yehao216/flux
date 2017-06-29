module.exports = function(ngModule) {
	ngModule.directive('fbTabs', [fbTabsFn]);
	function fbTabsFn() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				state: '='
			},
			controller: ['$scope', '$window',function($scope, window) {
				var panes = $scope.panes = [];
				var url = window.location.href;
				$scope.select = function(pane, num) {
					angular.forEach(panes, function(pane) {
						pane.selected = false;
					});
					pane.selected = true;
					$scope.state.topTabNum = num;
					window.history.replaceState($scope.state, null, url);
				};
				this.addPane = function(pane) {
					var len = (window.history.state && window.history.state.topTabNum) || 0;
					if (panes.length == len) {
						$scope.select(pane, len);
					}
					panes.push(pane);
				};
			}],
			template: require('./fbTabs.html'),
			link: function(scope, element, attrs, ctrl){
//				$(window).on("hashchange", function(){
//					console.log(window.location.hash);
//					var len;
//					if(location.hash.slice(1,2) == 'b') {
//						len = location.hash.slice(2);
//					} else {
//						len = 0;
//					}
//					scope.panes.forEach(function(item, index){
//						if(index == len){
//							item.selected = true;
//						} else {
//							item.selected = false;
//						}
//					});
//					scope.$apply();
//				});
			}
		};
	}
	require('./fbTabs.less');
}