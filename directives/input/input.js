/**
 * Created by xujun on 16/3/7.
 */
module.exports = function (ngModule) {
    ngModule.directive('inputsection', [inputFn]);

    require('./input.less');
    function inputFn() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                inputData: '=inputData'
            },
            template: require('./input.html'),
            link: function (scope, element, attrs) {
                scope.getVeriCode = scope.$parent.getVeriCode;
            },
            controller: function () {
            }
        }
    }
}

