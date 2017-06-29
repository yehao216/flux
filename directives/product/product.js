module.exports = function(ngModule) {
	ngModule.directive('product', [productFn]);
	
	require('./product.less');

	function productFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				productData:'=productData'
			},
			template: require('./product.html'),
            link: function(scope, element, attrs) {
             	
            },
            controller: function() {  
           
            }
		}
	}
}

