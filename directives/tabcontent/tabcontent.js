"use strict";


module.exports = function(ngModule) {
	ngModule.directive('tabcontent', ["$timeout",tabcontentFn]);
	require('./tabcontent.less');
	
	var utils = require('utils');
	function tabcontentFn($timeout) {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				tabcontentData:'=tabcontentData'
			},
			template: require('./tabcontent.html'),
            link: function(scope, element, attrs) {
//          	$timeout(function() {
////          		var len = scope.tabcontentData.length;
////          		$(element).find(".tabcontent_tit").css({"width":80*(len+1) + "px"});
//					if(scope.tabcontentData) {
//						scope.contentMenuList = scope.tabcontentData[0].systemIndexPics;
//		            	var len = scope.tabcontentData[0].systemIndexPics.length;
//		            	$(".tabcontent_con").css({"width":150*len + "px"});
//					}
//	            	
//          	});
            	
            	var interval = setInterval(function(){
            		if($(".tabcontent_con").length != 0 && scope.tabcontentData){
						scope.contentMenuList = scope.tabcontentData[0].systemIndexPics;
						scope.$apply();
						console.log(scope.contentMenuList);
		            	var len = scope.tabcontentData[0].systemIndexPics.length;
		            	$(".tabcontent_con").css({"width":150*len + "px"});
						
	            		clearInterval(interval);
            		}
            	},100);
            	
            	scope.tabChange = function(e,i) {
            		scope.contentMenuList = scope.tabcontentData[i].systemIndexPics; // 切换重新赋值
            		var len = scope.tabcontentData[i].systemIndexPics.length;
	            	$(".tabcontent_con").css({"width":150*len + "px"});
            		$(e.currentTarget).addClass("tab_focus").siblings().removeClass("tab_focus"); // tab页切换效果
//          		$(".tab_package").eq(1).addClass("tab_active").siblings().removeClass("tab_active"); // 下面内容由于第一个和其他不一样 单独切换效果
            		// 横向计算宽度
//          		var len = scope.tabcontentData[i].childProduct ? scope.tabcontentData[i].childProduct.length : 0;
//          		$(".tabcontent_con").css({"width":len*150 + "px"});
					$(e.currentTarget).closest(".scroll_container").next(".scroll_container").scrollLeft(0);
//          		$(".tabs_content .scroll_container").eq(1).scrollLeft(0);
//          		$(".tabs_content .scroll_container").eq(1).scrollLeft(0);
            	}
            	
            	scope.getFirstTab = function(e) {
            		$(e.target).addClass("tab_focus").siblings().removeClass("tab_focus");
            		$(".tab_package").eq(0).addClass("tab_active").siblings().removeClass("tab_active");
            	}
            	
            	/*scope.packagehot = scope.packageData.relProdHot;
            	scope.packageData = scope.packageData.productDto;
             	scope.packageClick = function() {
                    if (scope.packageData.prodRange == 4 && scope.packageData.url != '' && scope.packageData.url != null){
                        var url = '/flow-market-monitor/monitor/request?action_name=国际流量包&idsite=&rec=1&r=701828&h=10&m=39&s=54&url=&urlref=&_id=0000000000000000&_idts=1466684418&_idvc=24&_idn=0&_refts=0&_viewts=1472611107&send_image=0&cookie=1&res=750x1334&cvar={"1":["prod_code","' + scope.packageData.prodCode + '"]}&gt_ms=14';
                        $.ajax({
                            url: url,  //请求的URL
                            timeout: 1000, //超时时间设置，单位毫秒
                            type: 'get',  //请求方式，get或post
                            data: {},  //请求所传参数，json格式
                            dataType: 'json',//返回的数据格式
                            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                                window.location.href = scope.packageData.url;
                            }
                        });
                    }
                    else{
                        utils.goTo("page/html/detail.html",{"prodCode":scope.packageData.prodCode});
                    }
             	}*/
            },
            controller: function($scope) {
            	
           		/*$scope.tabChange = function(e,i) {
           			console.log(11);
            		$(e.target).addClass(".tab_focus").siblings().removeClass(".tab_focus");
            	}*/
            }
		}
	}
}

