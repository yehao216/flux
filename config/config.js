var config = config || {};
config.host = "/flow-market-web";
config.detail = config.host + "/product/get/detail/"; // 详情页
config.buy = config.host + "/product/buy"; // 购买
config.index = config.host + "/index?style=32"; // 首页数据
config.getFlowList = config.host + "/product/screen"; //获取筛选流量包列表
config.getFlowKinds = config.host + "/product/groups";//获取流量包分类列表
config.getFlowSpecial = config.host + "/product/tag/";//获取流量包专区列表
config.isLogin = config.host + "/auth/login.do"; // 登陆
config.getMessage = config.host + "/auth/getCode.do"; // 登陆
config.kinit = "/flow-market-monitor/monitor/request";
config.confirm = config.host + '/product/buy/confirm'; //确认订购
config.flowNum = config.host + '/index/flowNum'; // 首页流量
config.flowNumDetail = config.host + '/index/flowNumDetail';	//流量详情
config.indexLike = config.host + '/index/guessLike'; // 猜你喜欢
module.exports = config;