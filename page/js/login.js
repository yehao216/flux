var angular = require('angular');
require('angular-sanitize');
var ngModule = angular.module('loginModule', ['ngSanitize']);

var utils = require('utils');
require('../../css/change/style.css');
require('../../directives/input/input.js')(ngModule);
require('../../directives/button/button.js')(ngModule);
require('../../directives/errorInfo/errorInfo.js')(ngModule);

function countDown(val, ClassDom, text) {
	var seconds = 1;
	var getVeriCode_dom = $('.' + ClassDom);

	getVeriCode_dom.css('background', '#ccc').prop('disabled', true).text('59');
	var get_CountDown = setInterval(function () {
		seconds += 1;
		if (seconds == val) {
			getVeriCode_dom.text(text).prop('disabled', false);
			getVeriCode_dom.css('background', '#93d643');
			clearInterval(get_CountDown);
		} else {
			getVeriCode_dom.text(val - seconds);
		}
	}, 1000);
}

ngModule.controller("loginController", ['$scope', '$q', '$http', function ($scope, $q, $http) {
	var config = require('../../config/config.js');

	var transform = function (data) {
		return $.param(data);
	};

	$scope.httpConfig = {
		headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		transformRequest: transform
	};

	$scope.mobileData = {
		label: '手机号',
		placeholder: '请输入手机号',
		hasBtn: true,
		model: 'phone',
		maxlength: 11,
		btnData:{
			tit: '获取验证码',
			color: 'green',
			size: 'small'
		}
	};

	$scope.messageData = {
		label: '短信验证码',
		maxlength: 5,
		placeholder: '请输入短信验证码',
		model: 'code',
		hasBtn: false
	};

	$scope.btnData = {
		tit: '登录',
		color: 'orange',
		size: 'big'
	};

	//按钮事件
	$scope.login = function(){
		var phone = $("#phone").val();
		var code = $("#code").val();
		if (phone == null || phone == "") {
//			alert('请输入手机号');
			$scope.errMsg = "请输入手机号";
			return;
		}
		if (code == null || code == "") {
//			alert('请输入短信验证码');
			$scope.errMsg = "请输入短信验证码";
			return;
		}
		if (!/^1\d{10}$/.test(phone)) {
//			alert("请输入正确的手机号码");
			$scope.errMsg = "请输入正确的手机号码";
			return;
		}
		$http.post(config.isLogin,
			{
				"phone": phone,
				"code": code
			}, $scope.httpConfig)
			.success(function (data) {
				if (data.resultCode == 1) {
					var url = $.getUrlVar('url');
					if (url) {
						utils.goTo(url);
					} else {
						utils.goTo(config.host + "/app/index.html");
					}
				}
				else if (data.resultCode == 1001) {
//					alert('验证码不存在,请确认输入是否正确');
					$scope.errMsg = "验证码不存在,请确认输入是否正确";
				}
				else if (data.resultCode == 1002) {
//					alert('验证码错误,请确认输入是否正确');
					$scope.errMsg = "验证码错误,请确认输入是否正确";
				}
				else if (data.resultCode == 1003) {
//					alert('验证码失效,请重新获取验证码');
					$scope.errMsg = "验证码失效,请重新获取验证码";
				}
				else if (data.resultCode == 1004) {
//					alert('验证码超时,请重新获取验证码');
					$scope.errMsg = "验证码超时,请重新获取验证码";
				}
				else if (data.resultCode == 1011) {
//					alert('发送验证码失败');
					$scope.errMsg = "发送验证码失败";
				}
				else if (data.resultCode == 1012) {
//					alert('发送验证码频繁');
					$scope.errMsg = "发送验证码频繁";
				}
				else {
//					alert(data.resultMsg);
					$scope.errMsg = data.resultMsg;
				}
			}).error(function () {
//			alert("服务器异常，请稍候再试");
			$scope.errMsg = "服务器异常，请稍候再试";
			
		});
	};

	//input输入组件按钮事件
	$scope.getVeriCode = function(){
		var phone = $("#phone").val();
		if (phone == null || phone == "") {
//			alert('请输入手机号');
			$scope.errMsg = '请输入手机号';
			return false;
		}
		if (!/^1\d{10}$/.test(phone)) {
//			alert("请输入正确的手机号码");
			$scope.errMsg = "请输入正确的手机号码";
			return;
		}

		$q.all({
			first: countDown(60, 'small', '获取验证码')
		}).then(function () {
			$http.post(config.getMessage,
				{
					"phone": phone
				}, $scope.httpConfig)
				.success(function (data) {
					if (data.resultCode == 1) {
					} else {
//						alert(data.resultMsg);
						$scope.errMsg = data.resultMsg;
					}
				}).error(function () {
					$scope.errMsg = "服务器异常，请稍候再试";
//				alert("服务器异常，请稍候再试");
			})
		})


	};

	angular.element(document).ready(function () {
		utils.k_init($http, config);
	});
}]);







