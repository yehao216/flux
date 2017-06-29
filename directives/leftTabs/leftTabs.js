module.exports = function(ngModule) {
	ngModule.directive('leftTabs', [leftTabsFn]);
	require('./leftTabs.less');
//	var $ = require('jquery');

	function leftTabsFn() {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
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
					$scope.state.leftTabNum = num;
                    $scope.state.panTitle = pane.title;
					window.history.replaceState($scope.state, null, url);
				};
				this.addPane = function(pane) {
                    var getQueryString = function (name) {
                        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$|#)");
                        var hurl = window.location.search;
                        hurl = hurl.replace(/%20/g, "+");
                        var r = hurl.substr(1).match(reg);
                        if (r != null)return unescape(r[2]);
                        return null;
                    };
                    var type = getQueryString('type');
                    var panTitle = (window.history.state && window.history.state.panTitle) || undefined;
                    var len = (window.history.state && window.history.state.leftTabNum) || 0;
                    if (type == 'jf'){
                        if (!panTitle){
                            if (pane.title == '积分兑'){
                                $scope.select(pane, pane.index);
                            }
                            panes.push(pane);
                            return;
                        }
                    }
                    else if (type == 'jr'){
                        if (!panTitle){
                            if (pane.title == '假日行'){
                                $scope.select(pane, pane.index);
                            }
                            panes.push(pane);
                            return;
                        }
                    }
                    if (panes.length == len) {
                        $scope.select(pane, len);
                    }
                    panes.push(pane);
				};
			}],
			template: require('./leftTabs.html'),
			link: function(scope, element, attrs, ctrl){
				 $(element).css('minHeight', $(window).height());
				// $(window).on("hashchange", function(){
				// 	console.log(window.location.hash);
				// 	var len;
				// 	if(location.hash.slice(1,2) == 'a') {
				// 		len = location.hash.slice(2);
				// 	} else {
				// 		len = 0;
				// 	}
				// 	scope.panes.forEach(function(item, index){
				// 		if(index == len){
				// 			item.selected = true;
				// 		} else {
				// 			item.selected = false;
				// 		}
				// 	});
				// 	scope.$apply();
				// });
			}
		};
	}
}