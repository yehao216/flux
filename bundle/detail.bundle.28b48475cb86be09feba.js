webpackJsonp([1],[function(t,exports,n){(function($){var t=n(3);n(16);var e=t.module("detailModule",["ngSanitize"]),o=n(6);n(50),n(52)(e),n(56)(e),n(60)(e),n(64)(e),n(46)(e),n(68)(e);var i=function(t){return $.param(t)};e.controller("detailController",["$scope","$q","$http",function($scope,e,a){var r=n(2),c=$.getUrlVar("prodCode");$scope.httpConfig={headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},transformRequest:i},e.all({first:a.post(r.detail+c).success(function(t,n){200!=n&&(window.location.href=r.host+"/app/page/html/error/error-403.html"),$scope.trafficData=t,$scope.titLength=$scope.trafficData.object.prodShortDesc.length,$scope.titLength>=7?$scope.fontSize="sm":$scope.fontSize="bg",$scope.ruleData={tit:"生效规则",icon:"clock",content:$scope.trafficData.object.prodEffectiveRuleDesc,show:!0,arr_show:!1},$scope.fluxData={tit:"流量抵扣顺序",icon:"tip",content:$scope.trafficData.extend.flowEffectOrder,show:!1,arr_show:!0},$scope.tipData={tit:"温馨提示",icon:"tip",content:$scope.trafficData.object.prodDesc,show:!0,arr_show:!1},$scope.btnData={tit:"立即订购",color:"orange",size:"big"},$("body, .detail .detail_name").show()})}),$scope.one=function(){var t=function(){a.post(r.buy,{prodCode:c},$scope.httpConfig).success(function(t){s=!1,$(".loading,.mask_loading").hide(),$scope.liushui=t.object,1==t.resultCode?window.location.href="../html/error/success.html?s="+$scope.liushui:2==t.resultCode?$scope.popData={hasTitle:!1,hasBtn:!0,popCon:t.resultMsg,btnNum:3,btnData:{three:{tit:"确认",color:"orange",size:"middle"},two:{tit:"取消",color:"grey",size:"middle"}}}:($scope.errMsg=t.resultMsg,$(".popup").hide())}).error(function(){$scope.errMsg="服务器异常，请稍候再试",s=!1,$(".loading,.mask_loading").hide(),$(".popup").hide()})};s?$scope.errMsg="已经下单,请耐心等待后台处理":(s=!0,$(".loading,.mask_loading").show(),o.init(a,r,t))},$scope.two=function(){$(".popup").hide()},$scope.three=function(){a.post(r.confirm).success(function(t){1==t.resultCode?window.location.href="../html/error/success.html?s="+$scope.liushui:($scope.errMsg=t.resultMsg,$(".popup").hide())})},$scope.showTip=function(t){$(t.target).hasClass("tip")&&($(t.currentTarget).hasClass("st")?$(t.currentTarget).removeClass("st"):$(t.currentTarget).addClass("st"),$scope.fluxData.show=!$scope.fluxData.show)},$scope.clickEvent=function(){if(1==$scope.trafficData.object.prodRange?$scope.prodRange="全国":2==$scope.trafficData.object.prodRange?$scope.prodRange="省内":3==$scope.trafficData.object.prodRange&&($scope.prodRange="本地"),$scope.trafficData.extend){"undefined"!=$scope.trafficData.extend.phoneNum&&void 0!=$scope.trafficData.extend.phoneNum&&$scope.trafficData.extend.phoneNum||($scope.trafficData.extend.phoneNum="");var t;t=$scope.trafficData.extend.monthlyPaymentMessage?'<div class="extend_tit">提示</div><div class="extend_con" >尊敬的<span class="extendNum" >'+$scope.trafficData.extend.phoneNum+'</span>客户，<br>您确定订购以下流量包？</div><div class="extend_detail"><div class="extend_top" ><span class="extend_prodFlowNum">'+$scope.trafficData.object.prodFlowNum+'</span>M</div><div class="extend_bottom"><div class="left fl"><span class="trafficDirection">包月</span> | <span class="trafficType">'+$scope.prodRange+'</span></div><div class="right fr">￥<span class="extend_prodPrice" >'+$scope.trafficData.object.prodPrice+'</span></div></div></div><div class="extend_message">'+$scope.trafficData.extend.monthlyPaymentMessage+"</div>":'确认订购<br>"'+$scope.trafficData.object.prodShortDesc+$scope.trafficData.object.prodName+'"?',$scope.popData={hasTitle:!1,hasBtn:!0,popCon:t,btnNum:2,btnData:{one:{tit:"确认订购",color:"orange",size:"middle"},two:{tit:"取消订购",color:"grey",size:"middle"}}}}else $scope.popData={hasTitle:!1,hasBtn:!0,popCon:'确认订购<br>"'+$scope.trafficData.object.prodShortDesc+$scope.trafficData.object.prodName+'"?',btnNum:2,btnData:{one:{tit:"确认订购",color:"orange",size:"middle"},two:{tit:"取消订购",color:"grey",size:"middle"}}};$(".popup").show()};var s=!1;$(".loading,.mask_loading").hide(),t.element(document).ready(function(){o.k_init(a,r),$(".wrapper").css("height",$(window).height()-143-50-$(".detail_name").height()-107+"px")})}])}).call(exports,n(1))},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,exports,n){var e=n(51);"string"==typeof e&&(e=[[t.id,e,""]]);n(15)(e,{});e.locals&&(t.exports=e.locals)},function(t,exports,n){exports=t.exports=n(14)(),exports.push([t.id,'.ng-cloak,.x-ng-cloak,[data-ng-cloak],[ng-cloak],[ng\\:cloak],[x-ng-cloak]{display:none!important}body,html{padding:0;margin:0}body{background-color:#f2f2f2;font-size:14px;color:#fff;color:#1d1d26;font-family:Helvetica Neue,Helvetica,Arial,sans-serif}li,ul{list-style:none;padding:0;margin:0}.fl{float:left}.fr{float:right}.clearfix{*zoom:1}.clearfix:after,.clearfix:before{display:table;line-height:0;content:""}.clearfix:after{clear:both}#floor{margin-top:10px}#product{margin-top:20px}#index{padding-bottom:50px}#category{padding-bottom:40px}.detail{padding:5%;position:fixed;display:none}.detail>.con{background:#fff;box-shadow:0 2px 8px #ccc}.detail .detail_name{font-size:16px;padding:5%;overflow:hidden;border-bottom:1px solid #f3f3f4}.detail .trafficName{max-width:82%;color:#000;display:inline-block;height:16px}.detail .button.orange.big{position:fixed;bottom:0;left:0}.detail .price{color:red;float:right}.detail .wrapper{padding:2% 5%;width:90%;max-height:300px;overflow-y:scroll;-webkit-overflow-scrolling:touch}.detail .con{margin-bottom:10px;border-radius:3px}.detail .extend_tit{border-bottom:1px solid #ccc;font-weight:700;padding-bottom:5px;margin-bottom:5px}.detail .extend_con{color:#3e3e3e;font-size:12px}.detail .extendNum{font-size:16px;font-weight:700;color:#000}.detail .extend_detail{color:#3e3e3e;width:60%;border:1px solid #ccc;border-radius:5px;font-size:12px;margin-left:20%}.detail .extend_prodFlowNum{font-size:16px}.detail .extend_top{margin:5px 0;border-bottom:1px solid #ccc;line-height:22px}.detail .extend_bottom{overflow:hidden;padding:0 5px}.detail .extend_prodPrice{font-size:16px;color:#ff9601}.detail .extend_message{color:#50bff7;font-size:12px;line-height:16px}.spinner{margin:0 auto;width:80px;height:80px;text-align:center;font-size:10px}.spinner>div{background-color:#67cf22;height:100%;width:6px;display:inline-block;-webkit-animation:stretchdelay 1.2s infinite ease-in-out;animation:stretchdelay 1.2s infinite ease-in-out;margin:0 3px}.spinner .rect2{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.spinner .rect3{-webkit-animation-delay:-1s;animation-delay:-1s}.spinner .rect4{-webkit-animation-delay:-.9s;animation-delay:-.9s}@-webkit-keyframes stretchdelay{0%,40%,to{-webkit-transform:scaleY(.4)}20%{-webkit-transform:scaleY(1)}}@keyframes stretchdelay{0%,40%,to{transform:scaleY(.4);-webkit-transform:scaleY(.4)}20%{transform:scaleY(1);-webkit-transform:scaleY(1)}}.login .btnArea{margin:20px}.info_point{margin-top:40px;width:100%;height:200px;background-color:#f39e1a;text-align:center;color:#fff}.info_point .time{font-size:12px;padding-top:2px}.info_point .point_name{font-size:20px;padding:26px 0 2px}.info_point .my_point{font-size:56px;padding:0;margin:0}.flux_menu{margin-top:10px}.info_about{padding:18px 12px}.about_1{display:inline-block;color:#4b4b4b;padding-bottom:10px}.about_2{width:100%}.about_2,.about_3{display:inline-block;color:#7a7a7a}.about_3{line-height:18px}.con .detail_name .old_price{float:right;margin-right:5px;text-decoration:line-through;color:#999}',""])},function(t,exports,n){t.exports=function(t){function e(){return{restrict:"EA",replace:!0,transclude:!0,scope:{bannerData:"=bannerData"},template:n(55),link:function(t,n,e){},controller:function(){}}}t.directive("banner",[e]),n(53)}},function(t,exports,n){var e=n(54);"string"==typeof e&&(e=[[t.id,e,""]]);n(15)(e,{});e.locals&&(t.exports=e.locals)},function(t,exports){t.exports=".banner{color:white;line-height:0;position:relative}.banner.sm .traffic_info .traffic_num{font-size:30px}.banner img{width:100%;border-radius:3px 3px 0 0}.banner .traffic_info{line-height:50px;position:absolute;top:25%;width:100%;text-align:center;font-size:20px}.banner .traffic_info .traffic_num{font-size:60px}.banner .traffic_info .trafficDirection{margin-right:3%}.banner .traffic_info .trafficType{margin-left:3%}"},function(t,exports){t.exports='<div class="banner" id="banner">\n    <!--<img ng-src="{{bannerData.object.trafficImg}}" alt="">-->\n    <!--暂时写死产品配图-->\n    <img src="../../images/banner/banner_back.png" alt="">\n    <div class="traffic_info">\n        <div class="traffic_num {{fontSize}}"><span>{{bannerData.object.prodShortDesc}}</span></div>\n        <div class="traffic_more">\n            <span class="trafficDirection" ng-if="bannerData.object.prodType == 1">通用</span>\n            <span class="trafficDirection" ng-if="bannerData.object.prodType == 2">定向</span>\n            |\n            <span class="trafficType" ng-if="bannerData.object.prodRange == 1">全国</span>\n            <span class="trafficType" ng-if="bannerData.object.prodRange == 2">省内</span>\n            <span class="trafficType" ng-if="bannerData.object.prodRange == 3">本地</span>\n        </div>\n    </div>\n</div>'},function(t,exports,n){t.exports=function(t){function e(){return{restrict:"EA",replace:!0,transclude:!0,scope:{descriptionData:"=descriptionData"},template:n(59),link:function(t,n,e){},controller:function(){}}}t.directive("description",[e]),n(57)}},function(t,exports,n){var e=n(58);"string"==typeof e&&(e=[[t.id,e,""]]);n(15)(e,{});e.locals&&(t.exports=e.locals)},function(t,exports){t.exports='.description{color:#666;font-size:14px;padding:0 8px;line-height:20px;margin-bottom:15px}.description img{-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.description.st img{-webkit-transform:rotate(180deg);transform:rotate(180deg);-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.description .tit{color:#ff9601;border-bottom:1px solid #f3f3f4;line-height:30px;margin-bottom:5px;height:30px;padding-left:25px}.description .tit.clock{background:url("../../images/description/clock_icon.png") no-repeat 0 6px;background-size:16px auto}.description .tit.tip{background:url("../../images/description/tip_icon.png") no-repeat 0 8px;background-size:16px auto}'},function(t,exports){t.exports='<div class="description" >\n    <div class="tit {{descriptionData.icon}}">{{descriptionData.tit}}<img ng-if="descriptionData.arr_show" src="../../images/category/icon-arrow-down.png" width="14" height="8" style="float: right;margin-top: 12px;"></div>\n    <div ng-show="descriptionData.show" class="content" ng-bind-html="descriptionData.content"></div>\n</div>'},function(t,exports,n){t.exports=function(t){function e(){return{restrict:"EA",replace:!0,transclude:!0,scope:{buttonData:"=btnData",event:"=clickEvent"},template:n(63),link:function(t,n,e){t.clickEvent=function(){t.event()}},controller:function(){}}}t.directive("btn",[e]),n(61)}},function(t,exports,n){var e=n(62);"string"==typeof e&&(e=[[t.id,e,""]]);n(15)(e,{});e.locals&&(t.exports=e.locals)},function(t,exports){t.exports=".button{border:none;color:white;text-align:center;padding:0}.button.big{font-size:20px;height:50px;line-height:50px;width:100%}.button.middle{font-size:16px;height:40px;line-height:40px;width:40%}.button.orange{background:#ff9601}.button.green{background:#93d643}.button.grey{background:#d6d6d6}"},function(t,exports){t.exports='<button class="button {{buttonData.color}} {{buttonData.size}}" ng-click="clickEvent()">{{buttonData.tit}}</button>'},function(t,exports,n){(function($){t.exports=function(t){function e(){return{restrict:"EA",replace:!0,transclude:!0,scope:{popData:"=popData"},template:n(67),link:function(t,n,e){t.one=t.$parent.one,t.two=t.$parent.two,t.three=t.$parent.three,t.four=t.$parent.four,t.five=t.$parent.five,t.six=t.$parent.six,t.closePopup=function(){$(".popup").hide()}},controller:function(){}}}t.directive("popup",[e]),n(65)}}).call(exports,n(1))},function(t,exports,n){var e=n(66);"string"==typeof e&&(e=[[t.id,e,""]]);n(15)(e,{});e.locals&&(t.exports=e.locals)},function(t,exports){t.exports=".popup{display:none}.popup .mask{position:fixed;z-index:1000;background:url(../../images/popup/mask_bg.png) repeat;width:100%;height:100%;top:0;left:0}.popup .window{width:60%;position:fixed;z-index:1001;padding:10%;background:#fff;border-radius:8px;color:#1d1d26;font-size:16px;line-height:20px;left:10%;top:30%}.popup .window .content{margin-bottom:10%;min-height:40px;max-height:200px;overflow-y:auto;-webkit-overflow-scrolling:touch}.popup .window .content.center{text-align:center}.popup .window .operation .double_empty{width:10%;display:inline-block}"},function(t,exports){t.exports='<div class="popup">\n    <div class="mask" ng-click="closePopup()"></div>\n    <div class="window">\n        <div class="title" ng-if="popData.hasTitle"></div>\n        <div class="content" ng-bind-html="popData.popCon" ng-class="{\'center\': popData.btnNum !=3}">\n        </div>\n        <div class="operation" ng-if="popData.hasBtn">\n            <div class="single" ng-if="popData.btnNum==1">\n                <btn btn-data="popData.btnData.one" click-event="one"></btn>\n            </div>\n            <div class="double" ng-if="popData.btnNum==2">\n                <btn btn-data="popData.btnData.one" click-event="one"></btn>\n                <span class="double_empty"></span>\n                <btn btn-data="popData.btnData.two" click-event="two"></btn>\n            </div>\n            <div class="double" ng-if="popData.btnNum==3">\n                <btn btn-data="popData.btnData.three" click-event="three"></btn>\n                <!--<btn btn-data="popData.btnData.one" click-event="one"></btn>-->\n                <btn btn-data="popData.btnData.two" click-event="two"></btn>\n            </div>\n        </div>\n    </div>\n</div>\n'},function(t,exports,n){(function($){t.exports=function(t){function e(){return{restrict:"A",transclude:!0,replace:!0,template:n(71),link:function(t,n,e){$(n).parents("body").on("touchstart",function(t){startX=t.originalEvent.changedTouches[0].pageX,startY=t.originalEvent.changedTouches[0].pageY}),$(n).parents("body").on("touchmove",function(t){return moveEndY=t.originalEvent.changedTouches[0].pageY,Y=moveEndY-startY,$(n).has($(t.target)).length?0==$(n).scrollTop()&&Y>0?(t.preventDefault(),!1):$(n).scrollTop()+$(n).innerHeight()>=$(n)[0].scrollHeight&&Y<0?(t.preventDefault(),!1):void 0:(t.preventDefault(),!1)})},controller:function(){}}}t.directive("myScroll",[e]),n(69)}}).call(exports,n(1))},function(t,exports,n){var e=n(70);"string"==typeof e&&(e=[[t.id,e,""]]);n(15)(e,{});e.locals&&(t.exports=e.locals)},function(t,exports){t.exports=""},function(t,exports){t.exports='<div class="" ng-transclude></div>'}]);