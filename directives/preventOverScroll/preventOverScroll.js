/**
 * Created by xujun on 16/3/7.
 */
module.exports = function(ngModule) {
        ngModule.directive('myScroll', [myScroll]);

    require('./preventOverScroll.less');
    function myScroll() {
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            template: require('./preventOverScroll.html'),
            link: function(scope, element, attrs) {
                $(element).parents('body').on("touchstart", function (e) {
                    startX = e.originalEvent.changedTouches[0].pageX,
                        startY = e.originalEvent.changedTouches[0].pageY;
                });

                $(element).parents('body').on('touchmove', function (e) {
                    moveEndY = e.originalEvent.changedTouches[0].pageY;
                    Y = moveEndY - startY;
                    if (!$(element).has($(e.target)).length)
                    {
                        e.preventDefault();
                        return false;
                    }
                    else if($(element).scrollTop() ==0 && Y>0){
                        e.preventDefault();
                        return false;
                    }
                    else if ($(element).scrollTop() + $(element).innerHeight() >= $(element)[0].scrollHeight && Y<0){
                        e.preventDefault();
                        return false;
                    }
                });
            },
            controller: function() {
                // console.log(this)
                // var fl = scope.flux;
            }
        }
    }
}

