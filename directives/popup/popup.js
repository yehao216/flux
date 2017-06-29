/**
 * Created by xujun on 16/3/7.
 */
module.exports = function(ngModule) {
    ngModule.directive('popup', [popupFn]);

    require('./popup.less');

    function popupFn() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                popData:'=popData'
            },
            template: require('./popup.html'),
            link: function(scope, element, attrs) {
                //传递按钮事件
                scope.one = scope.$parent.one;
                scope.two = scope.$parent.two;
                scope.three = scope.$parent.three;
                scope.four = scope.$parent.four;
                scope.five = scope.$parent.five;
                scope.six = scope.$parent.six;
                scope.closePopup = function (){
                    //var $ = require('jquery');
                    $('.popup').hide();
                }
            },
            controller: function() {
                // console.log(this)
                // var fl = scope.flux;
            }
        }
    }
}

