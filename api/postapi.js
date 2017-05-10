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