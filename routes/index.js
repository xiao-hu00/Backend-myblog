var express = require('express');
var router = express.Router();
var checkNotLogin = require('../tool/check').checkNotLogin;
var mongoose = require('mongoose');
var sha1 = require('sha1');
var userSchma = {
  name: String,
  password: String
};
var user = mongoose.model('user',userSchma);

router.get('/', checkNotLogin, function(req, res, next) {
  // console.log(req.session)
  res.render('');
});

router.post('/',checkNotLogin, function(req, res, next) {
  // console.log(req.body.u_pwd && req.body.u_pwd == '11');
  user.find({name:req.body.u_name},function(err, m){
    if(err) return console.log(err);
    // console.log(m);
    if(m.length === 0){
      res.render('index',{info:'用户名错误！'});
    }else if(sha1(req.body.u_pwd) !== m[0].password){      
      res.render('index',{info:'密码错误！'});
    }else if(sha1(req.body.u_pwd) === m[0].password){
      // 登录成功，存入cookie
      req.session.user = m[0].name;
      res.redirect('/manager/list')
    }
  });
});

module.exports = router;