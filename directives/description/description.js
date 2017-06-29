/**
 * Created by xujun on 16/3/7.
 */
module.exports = function(ngModule) {
        ngModule.directive('description', [descriptionFn]);

    require('./description.less');
    function descriptionFn() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                descriptionData:'=descriptionData'
            },
            template: require('./description.html'),
            link: function(scope, element, attrs) {
            },
            controller: function() {
                // console.log(this)
                // var fl = scope.flux;
            }
        }
    }
}

