"use strict";


module.exports = function(ngModule) {
	ngModule.directive('tabmenu', ["$timeout",tabmenuFn]);
	require('./tabmenu.less');
	
	var utils = require('utils');
	function tabmenuFn($timeout) {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				tabmenuData:'=tabmenuData',
				tabguessData:'=tabguessData'
			},
			template: require('./tabmenu.html'),
            link: function(scope, element, attrs) {
            	scope.contentMenuList = [];
            	var interval = setInterval(function(){
            		if($(".tabmenu_con").length != 0 && scope.tabguessData){
            			var _len = scope.tabguessData ? scope.tabguessData.length : 0;
	            		$(".tabmenu_con").eq(0).css({"width":_len*150 + "px"});
	            		clearInterval(interval);
            		}
            	},100);
            	
            	var timeout = setTimeout(function() {
            		
//	            		var len = scope.tabmenuData ? scope.tabmenuData.length : 0;
//	            		$(".tabmenu_tit").css({"width":80*(len+1) + "px"});
	            		
            			clearTimeout(timeout);
            		
            		
            	});
            	
            	/*$timeout(function() {
            		console.log("=====scope.tabmenuData=====");
            		console.log(scope.tabmenuData);
            		setTimeout(function() {
            			console.log(scope.tabmenuData);
            		},4000);
            	});*/
            	
            	
            	/*$timeout(function() {
            		var _len = scope.tabguessData ? scope.tabguessData.length : 0;
            		$(".tabmenu_con").eq(0).css({"width":_len*150 + "px"});
            		var len = scope.tabmenuData ? scope.tabmenuData.length : 0;
            		$(element).find(".tabmenu_tit").css({"width":80*(len+1) + "px"});
            	});*/
            	
            	scope.tabChange = function(e,i) {
            		scope.contentMenuList = scope.tabmenuData[i].childProduct; // 切换重新赋值
            		$(e.target).addClass("tab_focus").siblings().removeClass("tab_focus"); // tab页切换效果
            		$(".tab_package").eq(1).addClass("tab_active").siblings().removeClass("tab_active"); // 下面内容由于第一个和其他不一样 单独切换效果
            		// 横向计算宽度
            		var len = scope.tabmenuData[i].childProduct ? scope.tabmenuData[i].childProduct.length : 0;
            		$(".tabmenu_con").css({"width":len*150 + "px"});
            		$(".scroll_container").eq(1).scrollLeft(0);
            	}
            	
            	scope.getFirstTab = function(e) {
            		$(e.target).addClass("tab_focus").siblings().removeClass("tab_focus");
            		$(".tab_package").eq(0).addClass("tab_active").siblings().removeClass("tab_active");
            		$(".tabmenu_con").eq(0).css({"width":scope.tabguessData.length*150 + "px"});
            		$(".scroll_container").eq(1).scrollLeft(0);
            	}
            	
            	scope.packageClick = function(num,node) {
            		console.log(scope.tabmenuData);
            		var sysdata = null;
            		if(num == 1) {
            			sysdata = node.productDto;
            		} else if(num == 2) {
            			sysdata = node;
            		}
                    if (sysdata.prodRange == 4 && sysdata.url != '' && sysdata.url != null){
                        var url = '/flow-market-monitor/monitor/request?action_name=国际流量包&idsite=&rec=1&r=701828&h=10&m=39&s=54&url=&urlref=&_id=0000000000000000&_idts=1466684418&_idvc=24&_idn=0&_refts=0&_viewts=1472611107&send_image=0&cookie=1&res=750x1334&cvar={"1":["prod_code","' + sysdata.prodCode + '"]}&gt_ms=14';
                        $.ajax({
                            url: url,  //请求的URL
                            timeout: 1000, //超时时间设置，单位毫秒
                            type: 'get',  //请求方式，get或post
                            data: {},  //请求所传参数，json格式
                            dataType: 'json',//返回的数据格式
                            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                                window.location.href = sysdata.url;
                            }
                        });
                    }
                    else{
                        utils.goTo("page/html/detail.html",{"prodCode":sysdata.prodCode});
                    }
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

