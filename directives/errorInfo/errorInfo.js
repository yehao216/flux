module.exports = function(ngModule) {
	ngModule.directive('errorInfo', [errorInfoFn]);
	require('./errorInfo.less');

	function errorInfoFn() {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				errordata: '='
			},
			template: require('./errorInfo.html'),
			link: function(scope, element, attrs, ctrl) {
				scope.$watch("errordata", function(newValue, oldValue) {
					if (newValue) {
						$(element).fadeIn();
//						setTimeout(function() {
//							$(element).fadeOut();
//							scope.errordata = "";
//						}, 4000);
					}else {
						$(element).hide();
					}
				});
				$(element).find(".confirmBtn").click(function(){
					scope.$apply(function(){scope.errordata = "";});
					$(element).hide();
				});
				//				if(scope.errordata){
				//					$(element).hide();
				//				}else {
				//					$(element).fadeIn();
				//					setTimeout(function() {
				//						$(element).fadeOut();
				//					}, 2000);
				//				}
			}
		}
	}
}