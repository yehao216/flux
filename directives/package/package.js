"use strict";


module.exports = function(ngModule) {
	ngModule.directive('package', [packageFn]);
	require('./package.less');
	
	var utils = require('utils');
	function packageFn() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				packageData:'=packageData'
			},
			template: require('./package.html'),
            link: function(scope, element, attrs) {
            	scope.packagehot = scope.packageData.relProdHot;
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
             	}
            },
            controller: function() {  
           
            }
		}
	}
}

