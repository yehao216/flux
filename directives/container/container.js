module.exports = function(ngModule) {
	ngModule.directive('accordion', [accordionFn]);
	require('./container.less');
	function accordionFn() {
		return {
			restrict: 'EA',
			replace:true,
			transclude:true,
			template: require('./container.html'),
			controller: function() {
				/*var expanders = [];

				this.gotOpened = function(selectedExpander) {
					angular.forEach(expanders, function(expander) {
						if(selectedExpander != expander) {
							expander.showMe = false;
						}
					})
				}

				this.addExpander = function(expander) {
					expanders.push(expander);
				}*/
			}
		}
	}
}

