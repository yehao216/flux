/**
 * Created by xujun on 16/3/7.
 */
module.exports = function(ngModule) {
        ngModule.directive('banner', [bannerFn]);

    require('./banner.less');
    function bannerFn() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                bannerData:'=bannerData'
            },
            template: require('./banner.html'),
            link: function(scope, element, attrs) {
            },
            controller: function() {
                // console.log(this)
                // var fl = scope.flux;
            }
        }
    }
}

