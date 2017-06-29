var angular = require('angular');
require('angular-sanitize');
var ngModule = angular.module('detailModule', ['ngSanitize']);

//var $ = require('jquery');
var utils = require('utils');
require('../../css/change/style.css');
require('../../directives/banner/banner.js')(ngModule);
require('../../directives/description/description.js')(ngModule);
require('../../directives/button/button.js')(ngModule);
require('../../directives/popup/popup.js')(ngModule);
require('../../directives/errorInfo/errorInfo.js')(ngModule);
require('../../directives/preventOverScroll/preventOverScroll.js')(ngModule);

var transform = function (data) {
	return $.param(data);
};

ngModule.controller("detailController", ['$scope', '$q', '$http', function ($scope, $q, $http) {
	var config = require('../../config/config.js');
	var prodCode = $.getUrlVar('prodCode');
		$scope.httpConfig = {
			headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
			transformRequest: transform
		};
	$q.all({
		first: $http.post(config.detail + prodCode).success(function (response, status) {
			if (status != 200) {
				window.location.href = config.host + '/app/page/html/error/error-403.html'
			}
				//详情数据
				$scope.trafficData = response;
                $scope.titLength = $scope.trafficData.object.prodShortDesc.length;
                if ($scope.titLength >= 7){
                    $scope.fontSize = 'sm';
                }else {
                    $scope.fontSize = 'bg';

                }
				//拼接规则数据
				$scope.ruleData = {
					tit: '生效规则',
					icon: 'clock',
					content: $scope.trafficData.object.prodEffectiveRuleDesc,
					show: true,
					arr_show:false
				};

                //拼接顺序数据
                $scope.fluxData = {
                    tit: '流量抵扣顺序',
                    icon: 'tip',
                    content: $scope.trafficData.extend.flowEffectOrder,
					show: false,
					arr_show:true
					
                };

				//拼接提示数据
				$scope.tipData = {
					tit: '温馨提示',
					icon: 'tip',
					content: $scope.trafficData.object.prodDesc,
					show: true,
					arr_show:false
				};

				//按钮数据
				$scope.btnData = {
					tit: '立即订购',
					color: 'orange',
					size: 'big'
				};

				$('body, .detail .detail_name').show();
			})
	});

	$scope.one = function () {
		var buyFun = function () {
			$http.post(config.buy, {prodCode: prodCode}, $scope.httpConfig)
				.success(function (buyData) {
					clicked = false;
					$('.loading,.mask_loading').hide();
                    $scope.liushui = buyData.object;
					if (buyData.resultCode == 1) {
//						alert("已为您提交订购需求，具体订购结果请以10001短信告知为准。");
// 						$scope.errMsg = "已为您提交订购需求，具体订购结果请以10001短信告知为准。";
// 						$('.popup').hide();
                        window.location.href = '../html/error/success.html?s='+ $scope.liushui;
                    }
					else if (buyData.resultCode == 2) {
						$scope.popData = {
							hasTitle: false,
							hasBtn: true,
							popCon: buyData.resultMsg,
							btnNum: 3,
							btnData: {
								three: {
									tit: '确认',
									color: 'orange',
									size: 'middle'
								},
								two: {
									tit: '取消',
									color: 'grey',
									size: 'middle'
								}
							}
						};
					}
					else {
//						alert(buyData.resultMsg);
						$scope.errMsg = buyData.resultMsg;
						$('.popup').hide();
					}
				})
				.error(function () {
//					alert("服务器异常，请稍候再试");
					$scope.errMsg = "服务器异常，请稍候再试";
					clicked = false;
					$('.loading,.mask_loading').hide();
					$('.popup').hide();
				});
		};
		if (!clicked) {
			clicked = true;
			$('.loading,.mask_loading').show();
			utils.init($http, config, buyFun)
		} else {
//			alert('已经下单,请耐心等待后台处理');
			$scope.errMsg = "已经下单,请耐心等待后台处理";
		}
	};
	//取消购买
	$scope.two = function () {
		$('.popup').hide();
	};

	$scope.three = function () {
		$http.post(config.confirm)
			.success(function (confirmData) {
				if (confirmData.resultCode == 1) {
//										alert("已为您提交订购需求，具体订购结果请以10001短信告知为准。");
// 					$scope.errMsg = "已为您提交订购需求，具体订购结果请以10001短信告知为准。";
// 					$('.popup').hide();
                    window.location.href = '../html/error/success.html?s='+ $scope.liushui;
				}
				else {
//										alert(confirmData.resultMsg);
					$scope.errMsg = confirmData.resultMsg;
					$('.popup').hide();
				}
			})
	};
	
	$scope.showTip = function(e) {
		if($(e.target).hasClass("tip")) {
			if($(e.currentTarget).hasClass("st")) {
				$(e.currentTarget).removeClass("st");
//				$(e.currentTarget).find(".content").hide();
			} else {
				$(e.currentTarget).addClass("st");
//				$(e.currentTarget).find(".content").show();
			}
			$scope.fluxData.show = !$scope.fluxData.show;
		}
		
	}
	
	//按钮事件
	$scope.clickEvent = function(){
		//弹窗数据(两个按钮)
        //区分包月弹窗和非包月弹窗
        // if ($scope.trafficData.object.prodType == 1){
        //     $scope.prodType = '通用'
        // }
        // else if ($scope.trafficData.object.prodType == 1){
        //     $scope.prodType = '定向'
        // }
        if ($scope.trafficData.object.prodRange == 1){
            $scope.prodRange = '全国'
        }
        else if ($scope.trafficData.object.prodRange == 2){
            $scope.prodRange = '省内'
        }
        else if ($scope.trafficData.object.prodRange == 3){
            $scope.prodRange = '本地'
        }
        if ($scope.trafficData.extend){
            if ($scope.trafficData.extend.phoneNum == 'undefined' || $scope.trafficData.extend.phoneNum == undefined || !$scope.trafficData.extend.phoneNum){
                $scope.trafficData.extend.phoneNum = '';
            }
            var popContent;
            if ($scope.trafficData.extend.monthlyPaymentMessage){
                popContent = '<div class="extend_tit">提示</div><div class="extend_con" >尊敬的<span class="extendNum" >'+ $scope.trafficData.extend.phoneNum +'</span>客户，<br>您确定订购以下流量包？</div><div class="extend_detail"><div class="extend_top" ><span class="extend_prodFlowNum">'+ $scope.trafficData.object.prodFlowNum +'</span>M</div><div class="extend_bottom"><div class="left fl"><span class="trafficDirection">包月</span> | <span class="trafficType">'+ $scope.prodRange +'</span></div><div class="right fr">￥<span class="extend_prodPrice" >'+ $scope.trafficData.object.prodPrice +'</span></div></div></div><div class="extend_message">'+$scope.trafficData.extend.monthlyPaymentMessage +'</div>'
            }
            else {
                popContent = '确认订购<br>' + '"' + $scope.trafficData.object.prodShortDesc + $scope.trafficData.object.prodName + '"?';
            }
            $scope.popData = {
                hasTitle: false,
                hasBtn: true,
                popCon: popContent,
                btnNum: 2,
                btnData: {
                    one: {
                        tit: '确认订购',
                        color: 'orange',
                        size: 'middle'
                    },
                    two: {
                        tit: '取消订购',
                        color: 'grey',
                        size: 'middle'
                    }
                }
            };
        }
        else {
            $scope.popData = {
                hasTitle: false,
                hasBtn: true,
                popCon: '确认订购<br>' + '"' + $scope.trafficData.object.prodShortDesc + $scope.trafficData.object.prodName + '"?',
                btnNum: 2,
                btnData: {
                    one: {
                        tit: '确认订购',
                        color: 'orange',
                        size: 'middle'
                    },
                    two: {
                        tit: '取消订购',
                        color: 'grey',
                        size: 'middle'
                    }
                }
            };
        }
		$('.popup').show();
	};

	//弹窗按钮事件
	//购买
	var clicked = false;
	$('.loading,.mask_loading').hide();

	angular.element(document).ready(function () {
		utils.k_init($http, config);
		$('.wrapper').css('height', $(window).height() - 143 - 50 - $('.detail_name').height() - 107 + 'px');
	});
}]);







