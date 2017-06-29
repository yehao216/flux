module.exports = function(ngModule) {
	ngModule.directive('bottom', [bottomFn]);
	
	require('./bottom.less');
	
	function bottomFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				bottomData:'=bottomData'
			},
			template: require("./bottom.html"),
            link: function(scope, element, attrs) {
             	console.log(ngModule)
            },
            controller: function() {  
           
            }
		}
	}
}

