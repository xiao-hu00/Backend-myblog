var express = require('express');
var router = express.Router();

var post = require('../mongo/mongo').post;
//展示文章列表
router.all('/list', function(req, res, next) {
    // console.log(req.body.u_pwd);     
    post.find(function(err, data){
	  	// console.log(data)
	  	if(err) return console.log(err);
	  	res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "X-Requested-With");
  		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  		res.header("X-Powered-By",' 3.2.1')
  		res.header("Content-Type", "application/json;charset=utf-8");
	  	res.json(data);  	    
    });  
});

//展示文章列表
router.all('/txt', function(req, res, next) {
    // console.log(req.body.u_pwd);     
      // console.log(data)
      var txt = '{"op":{"code":"Y","info":"成功"},"data":[{"mode":"JavaMode","img_link":"djyj","yun_link":"oooo","seq_no":"10","ad_type":"3","need_reg":"1","title":"urrrrrrrrrr","id":"200","img_name":"ii","create_time":"2017-04-11 11:43:21","need_login":"0","isopen":"1","cg_type":"国海资管"},{"mode":"JavaMode","show_time":"1100","img_link":"Stock.xgsg","yun_link":"https://weiwq.oss-cn-shanghai.aliyuncs.com/新股秘籍.png","seq_no":"12","ad_type":"1","need_reg":"0","title":"新股打新1","id":"229","img_name":"新股秘籍","create_time":"2017-04-17 14:40:09","need_login":"0","isopen":"1"},{"mode":"NetURL","img_link":"http://www.baidu.com","yun_link":"666888","seq_no":"24","ad_type":"3","need_reg":"0","title":"产品推广测试","id":"82","img_name":"55588","create_time":"2017-03-13 14:42:06","need_login":"0","isopen":"1","cg_type":"通知"},{"mode":"JavaMode","show_time":"3000","img_link":"ZSCFJJCController","yun_link":"https://weiwq.oss-cn-shanghai.aliyuncs.com/02特色发现更多投资机会v1.0.png","seq_no":"36","ad_type":"1","need_reg":"0","title":"竞技场1","id":"119","img_name":"02特色发现更多投资机会v1.0","create_time":"2017-03-29 09:38:48","need_login":"0","isopen":"1"},{"mode":"NetURL","img_link":"https://mall.ghzq.com.cn/m/mall/index.html#!/assetsManage/asMngInfo.html?product_id=16840","yun_link":"999","seq_no":"37","ad_type":"3","need_reg":"1","title":"金贝壳9号28天12期DE3101","id":"83","img_name":"商城","create_time":"2017-03-13 16:34:40","need_login":"0","isopen":"1","cg_type":"通知"},{"mode":"JavaMode","img_link":"http://news.ifeng.com/mil/","yun_link":"老人家","seq_no":"46","ad_type":"3","need_reg":"1","title":"路公交拉进来","id":"217","img_name":"我如果太无语","create_time":"2017-04-14 14:44:10","need_login":"1","isopen":"1","cg_type":"理财"},{"seq_no":"47","ad_type":"3","mode":"NetURL","need_reg":"0","img_link":"http://cl.ghzq.cn/dxtc","title":"打新","id":"230","img_name":"打新test","create_time":"2017-04-17 15:25:49","need_login":"0","isopen":"1","cg_type":"服务"},{"mode":"JavaMode","show_time":"1000","img_link":"ZSCFKHController","yun_link":"https://weiwq.oss-cn-shanghai.aliyuncs.com/国海banner.jpg","seq_no":"54","ad_type":"1","need_reg":"0","title":"股票开户1","id":"228","img_name":"国海banner","create_time":"2017-04-17 14:39:19","need_login":"0","isopen":"1"},{"mode":"NetURL","show_time":"1000","img_link":"http%3A%2F%2Fwww.baidu.com","yun_link":"https://weiwq.oss-cn-shanghai.aliyuncs.com/zscf/20170425111526333.jpg","seq_no":"62","ad_type":"1","need_reg":"0","title":"测试4588","id":"281","img_name":"k","create_time":"2017-04-25 11:06:54","need_login":"0","isopen":"1"},{"mode":"JavaMode","show_time":"1000","img_link":"StockTool","yun_link":"https://weiwq.oss-cn-shanghai.aliyuncs.com/357d10a42a188eac5b4b998ec6e4d4c1.jpg","seq_no":"70","ad_type":"1","need_reg":"0","title":"持仓","id":"198","img_name":"357d10a42a188eac5b4b998ec6e4d4c1","create_time":"2017-04-11 11:42:40","need_login":"0","isopen":"1"},{"mode":"JavaMode","img_link":"Stock.ch","yun_link":"123","seq_no":"72","ad_type":"3","need_reg":"1","title":"普通持仓","id":"284","img_name":"普通持仓","create_time":"2017-04-25 15:43:52","need_login":"0","isopen":"1","cg_type":"理财"},{"mode":"JavaMode","img_link":"Credit.ch","yun_link":"1234","seq_no":"73","ad_type":"3","need_reg":"0","title":"信用持仓","id":"318","img_name":"信用持仓","create_time":"2017-04-25 15:46:34","need_login":"0","isopen":"1","cg_type":"服务"},{"yun_link":"https://weiwq.oss-cn-shanghai.aliyuncs.com/zscf/20170425160628232.jpg","seq_no":"74","ad_type":"0","mode":"JavaMode","need_reg":"0","img_link":"","title":"竞技场非游客","id":"319","img_name":"big_20170425b","create_time":"2017-04-25 15:57:46","need_login":"0","isopen":"1"},{"mode":"NetURL","img_link":"http://113.16.174.140:7488/m/mall/","yun_link":"去玩儿去","seq_no":"76","ad_type":"3","need_reg":"1","title":"理财商城新","id":"322","img_name":"理财商城","create_time":"2017-04-25 18:53:59","need_login":"1","isopen":"1","cg_type":"理财"},{"mode":"NetURL","img_link":"http://113.16.174.140:7488/mall/views/assetsManage/detail/10924.html","yun_link":"1","seq_no":"78","ad_type":"3","need_reg":"0","title":"稳得利","id":"331","img_name":"商城","create_time":"2017-04-26 09:51:39","need_login":"0","isopen":"1","cg_type":"推广"},{"mode":"NetURL","img_link":"http://113.16.174.140:7488/mall/views/finan/detail/17011.html","yun_link":"1","seq_no":"85","ad_type":"3","need_reg":"1","title":"平安养老","id":"333","img_name":"商城","create_time":"2017-04-26 10:07:01","need_login":"1","isopen":"1","cg_type":"服务"},{"mode":"NetURL","img_link":"https://weiwq.oss-cn-shanghai.aliyuncs.com/zscf/web/html/1493708004514.html","yun_link":"","seq_no":"127","ad_type":"3","need_reg":"0","title":"通知测试","id":"372","img_name":"通知测试","create_time":"2017-05-02 14:29:05","need_login":"0","isopen":"1","cg_type":"通知"},{"yun_link":"https://weiwq.oss-cn-shanghai.aliyuncs.com/zscf/web/html/1493889065163.html","seq_no":"145","ad_type":"5","need_reg":"0","img_link":"","title":"啊是大阿三啊","id":"390","img_name":"1493889065163.html","create_time":"2017-05-04 17:02:21","need_login":"0","isopen":"1"},{"yun_link":"https://weiwq.oss-cn-shanghai.aliyuncs.com/zscf/web/html/1493889637035.html","seq_no":"146","ad_type":"5","need_reg":"0","img_link":"","title":"测试","id":"391","img_name":"1493889637035.html","create_time":"2017-05-04 17:11:53","need_login":"0","isopen":"1"},{"yun_link":"https://weiwq.oss-cn-shanghai.aliyuncs.com/zscf/web/html/1493890013724.html","seq_no":"147","ad_type":"5","need_reg":"0","img_link":"","title":"升级通知","id":"392","img_name":"1493890013724.html","create_time":"2017-05-04 17:18:09","need_login":"0","isopen":"1"},{"mode":"NetURL","img_link":"http://weiwq.oss-cn-shanghai.aliyuncs.com/zscf/web/am20150510.html","yun_link":"","seq_no":"148","ad_type":"3","need_reg":"0","title":"午间收评","id":"393","img_name":"每日短评","create_time":"2017-05-10 11:11:54","need_login":"0","isopen":"1","cg_type":"资讯"}],"urldata":[{"url_value":"http://113.16.174.143:10000/m/open/index.html#!/account/msgVerify.html","id":"80","name":"开户","key_name":"kh"},{"url_value":"https://h.moguyun.com/game-mobile/intf/app/entrance/appCommonEntrance?toPageUrl=hall.html","id":"81","name":"竞技场","key_name":"jjc"},{"url_value":"http://113.16.174.140:7488/m/mall","id":"82","name":"商城","key_name":"lcsc"},{"url_value":"https://h.moguyun.com/h5/html/hall.html?resourceid=app","id":"83","name":"竞技场游客","key_name":"jjcguest"}]}'
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By",' 3.2.1')
      res.header("Content-Type", "application/json;charset=utf-8");
      res.json(txt);       
});

//展示文章详情
router.all('/detail/:id', function(req, res, next) {
  // console.log(req.body.u_pwd); 
  // console.log(req.params.id) 
  post.findOne({_id:req.params.id},function(err, data){
  	// console.log(data)
  	if(err) return console.log(err);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	res.json(data);
  })  
});

module.exports = router;