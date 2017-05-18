var express = require('express');
var router = express.Router();

var checkLogin = require('../tool/check').checkLogin;
var post = require('../mongo/mongo').post;
// var p = require('../mongo/mongo').p;
var markdown = require('markdown').markdown;

//登出
// GET /signout 登出
router.get('/signout', checkLogin, function(req, res, next) {
  // 清空 session 中用户信息
  req.session.user = null;
  req.flash('success', '登出成功');
  // 登出成功后跳转到主页
  res.redirect('/');
});

//添加文章
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'add' });
});

router.post('/add', checkLogin, function(req, res, next) {
  var p = new post;
  //提交文章数据到数据库
  // console.log(req.body.u_title,req.body.u_content)
  p.title = req.body.u_title || '';
  p.content = req.body.u_content || '';
  p.tag = req.body.u_tag || '';
  p.date = new Date;
  p.author = req.session.user;
  p.pv = 0;
  var promise = p.save();
  // assert.ok(promise instanceof require('mpromise'));
  promise.then(function(data, err){
  	if(err) return console.log(err);
  	// console.log(data._id)
  	req.flash('success', '添加文章成功！');
  	res.redirect('/manager/detail/'+data._id);
  });
  // res.render('add', { title: 'addpost' });
});

//修改文章
router.get('/update/:id',checkLogin, function(req, res, next) {
  // console.log(req.params.id) 
  post.findOne({_id:req.params.id},function(err, data){
  	// console.log(data)
  	res.render('update', { title: '文章修改' ,post: data});
  }) 
});

router.post('/update/:id',checkLogin, function(req, res, next) {
  // console.log(req.params.id) 
  post.update({_id:req.params.id},{$set:{content:req.body.u_content,title:req.body.u_title,tag:req.body.u_tag}},function(err, data){
  	// if(err) return console.log(err);
  	// console.log(data)
  	res.redirect('/manager/detail/'+req.params.id);
  }) 
});

//展示文章列表
router.get('/list', function(req, res, next) {
  // console.log(req.body.u_pwd); 
  post.find(function(err, data){
  	// console.log(data)
  	res.render('list', { title: 'list' , posts: data});
  });  
});

//展示文章详情
router.get('/detail/:id', function(req, res, next) {
  // console.log(req.body.u_pwd); 
  // console.log(req.params.id) 
  post.findOne({_id:req.params.id},function(err, data){
  	// console.log(data)
  	console.log(markdown.toHTML(data.content));
  	var c = markdown.toHTML(data.content);
  	res.render('detail', { title: 'detail' ,post: data,c:c});
  	// data.content = markdown.toHTML(data.content);
  })  
});

//删除文章
router.get('/delete/:id', checkLogin, function(req, res, next) {
  // console.log(req.body.u_pwd); 
  // console.log(req.params.id) 
  post.remove({_id:req.params.id},function(err, data){
  	// console.log(data)
  	if(err) return console.log(err);
  	res.redirect('/manager/list');
  })  
});


module.exports = router;
