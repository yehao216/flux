/**
 * Created by xujun on 16/3/7.
 */
module.exports = function(ngModule) {
        ngModule.directive('btn', [buttonFn]);

    require('./button.less');
    function buttonFn() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                //chu
                buttonData:'=btnData',
                event: '=clickEvent'
            },
            template: require('./button.html'),
            link: function(scope, element, attrs) {

                //传递按钮事件
                scope.clickEvent = function(){
                    scope.event();
                }
            },
            controller: function() {
                // console.log(this)
                // var fl = scope.flux;
            }
        }
    }
}

