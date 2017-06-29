module.exports = function(ngModule) {
	ngModule.directive('tabs', [tabsFn]);
	
	require('./tabs.less');

	function tabsFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				tabsData:'=tabsData'
			},
			template: require('./tabs.html'),
            link: function(scope, element, attrs) {
             	
            },
            controller: function() {  
           
            }
		}
	}
}

