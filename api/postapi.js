var express = require('express');
var app = express();
var router = express.Router();
var mysql      = require('mysql');  // 模块 mysql 
var multer = require('multer'); // 上传文件的中间件
var formidable = require('formidable');
var path = require('path');     //used for file path
var fs = require('fs');       //File System - for file manipulation

//加密
const crypto = require('crypto');

const secret = 'Huwanli9999';//密码


var co = require('co');
var OSS = require('ali-oss').Wrapper;
var client = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: 'LTAIB7my2zJogSqD',
  accessKeySecret: '5n6kl0hUb1lR2emNWcrPfSqXucT1i9',
  bucket: 'myblogtt'
});

var jwt = require('jwt-simple');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'myblog'
});

var moment = require('moment')

connection.connect();

app.set('jwtTokenSecret', 'MY_TOKEN_STRING');

//登录
router.all('/login', function(req, res, next) {
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Origin,Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8"); 
  if(req.method=="OPTIONS") {/*让options请求快速返回*/
    res.send(200)
  }else{
    console.log(req.body)
    var expires = moment().add(7,'days').valueOf();
    if(req.body.username === ''){
      res.json({
        msg: "用户名错误"
      });
      return false;
    }
    if(req.body.password === '') {
      res.json({
        msg: "密码错误"
      });
      return false;
    }
    var sql    = `SELECT username, password FROM user WHERE username = '${req.body.username}'`
    let password = req.body.password;
    const hash = crypto.createHmac('sha256', password)
                       .update('I love cupcakes')
                       .digest('hex');
    console.log(hash);
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      if(typeof results[0] === 'undefined'){
        res.json({
          msg: "用户名错误"
        });
        return false;
      }
      if(results[0].password !== hash) {
        res.json({
          msg: "密码错误"
        });
        return false;
      }

      console.log('The results is: ', results);
      let user = {name:req.body.username};
      var token = jwt.encode({
        iss: results[0].id,
        exp: expires
      }, app.get('jwtTokenSecret'));

      res.json({
        token : token,
        expires: expires,
        user: user,
        msg:"ok"
      }); 
    });  
  }
   
});

//展示文章列表
router.all('/list', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Origin,Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8"); 
  if(req.method=="OPTIONS") {
    res.send(200)/*让options请求快速返回*/
  }
  else{

    let page = parseInt(req.body.page) || 1;
    let page_size = parseInt(req.body.page_size) || 10;
    let limit = (page-1)*page_size;
    var sql    = `SELECT post_title, from_unixtime(post_time,'%Y-%c-%d %h:%i:%s') AS post_time, post_author, post_id FROM post WHERE post_cate = 5  ORDER BY post_time DESC limit ${limit} ,${page_size}`
    var sql1   = 'Select count(1) from post'
    // DESC ASC
    var promise =  new Promise( (resolve, reject) => {
      connection.query(sql1, (error, results, fields) => {
        if (error) throw error;
        // console.log(results)
        resolve(results[0]['count(1)'])
      });
    })

    promise.then((data) => {
      var total = data;
      connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.json({
          data: {
            list: results,
            total
          }
        }); 
      });
    })
  }
  

});

//展示文章详情
router.all('/detail', function(req, res, next) {
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Origin,Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8"); 

  if(req.method=="OPTIONS") {res.send(200)}    /*让options请求快速返回*/
  if(req.method == "POST"){
    
    let id = parseInt(req.body.id) || 0;

    console.log(id)
    var sql    = `SELECT * FROM post WHERE post_id = ${id}`
    var sql1   = `SELECT * FROM post_pic WHERE pic_id = ${id}`
    var promise = new Promise(function(resolve, reject){
      connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        // console.log(results)
        // res.json(results);
        resolve(results)
      });
    });
    
    promise.then(function(data){
      connection.query(sql1, (error, results, fields) => {
        if (error) throw error;
        let pic_filename = '';
        if(typeof results[0] != 'undefined'){
          pic_filename = results[0].pic_filename;
        }
        res.json({data, pic_filename});
      });
    })

  }
  
  // console.log(req.body.u_pwd); 
 
});
// 删除一条数据
router.all('/delete', function(req, res, next) {
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Origin,Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8"); 

  if(req.method=="OPTIONS") {res.send(200)}    /*让options请求快速返回*/
  if(req.method == "POST"){
    
    let id = parseInt(req.body.id) || 0;

    console.log(id)
    var sql    = `DELETE FROM post WHERE post_id = ${id}`
    var sql1   = `DELETE FROM post_pic WHERE pic_id = ${id}`
    var promise = new Promise(function(resolve, reject){
      connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        resolve()
      });
    });
    
    promise.then(function(data){
      connection.query(sql1, (error, results, fields) => {
        if (error) throw error;
        let pic_filename = '';
        if(typeof results[0] != 'undefined'){
          pic_filename = results[0].pic_filename;
        }
        res.json({msg:"删除成功!"});
      });
    })
  }
 
});

// const upload = require('multer')({ dest: 'uploads/' });
// 上传图片
router.all('/uploadpic', function(req, res, next) {
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Origin,Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  console.log(req.method)
  if(req.method == "OPTIONS"){
    res.send(200)
  }else{
    var form = new formidable.IncomingForm();
        //Formidable uploads to operating systems tmp dir by default
    // form.uploadDir = "../uploads";       //set upload directory
    form.keepExtensions = true;     //keep file extension

    form.parse(req, function(err, fields, files) {
        // console.log(files);
        // console.log(files.avatar);
        //TESTING
        console.log("file size: "+JSON.stringify(files.avatar.size));
        console.log("file path: "+JSON.stringify(files.avatar.path));
        console.log("file name: "+JSON.stringify(files.avatar.name));
        console.log("file type: "+JSON.stringify(files.avatar.type));
        console.log("astModifiedDate: "+JSON.stringify(files.avatar.lastModifiedDate));

        // 上传一个文件，成功后下载这个文件
        client.put('object-pic-'+files.avatar.name, files.avatar.path)
        .then(function (val) {
          return client.signatureUrl('object-pic-'+files.avatar.name);
        }).then(function (val) {
          res.json({
            url: val,
            file_name: files.avatar.name
          })
        });
    });
    
  }
 
});

//请求图片
router.all('/getpic', function(req, res, next) {
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Origin,Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  console.log(req.method)
  if(req.method == "OPTIONS"){
    res.send(200)
  }else{
    let name = req.body.filename;
    if(!name){
      res.json({
        url: '',
      })
      return;
    }
    // 获取图片的http地址
    var url = client.signatureUrl('object-pic-'+name, {expires: 3600});
    res.json({
      url,
      file_name: name
    })
  }
 
});



//编辑 
router.all('/edit', function(req, res, next) {
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Origin,Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");

  if(req.method == "OPTIONS"){
    res.send(200)
  }
  if(req.method == "POST") {
    console.log(req.body)
    let id = parseInt(req.body.post_id);
    let post_title = req.body.post_title;
    let post_con = req.body.post_con;
    let pic_data = req.body.pic_data[0] || '';
    // 获取当前时间戳(以s为单位)
    let timestamp = Date.parse(new Date());
    let time = timestamp / 1000;
    console.log(time)

    var sql  = `UPDATE post SET post_title='${post_title}', post_con='${post_con}', post_time='${time}'  WHERE post_id = ${id}`
    var sql1  = `UPDATE post_pic SET pic_filename='${pic_data.file_name}' WHERE pic_id = ${id}`
    

    var promise = new Promise((resolve,reject) => {
      connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        console.log(results)
        resolve()
      });
    });
    
    promise.then(() => {
      connection.query(sql1, (error, results, fields) => {
        if (error) throw error;
        console.log(results)
        res.json({msg: "保存成功"});
      });
    });
    
  }
 
});

//新增 
router.all('/add', function(req, res, next) {
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Origin,Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");

  if(req.method == "OPTIONS"){
    res.send(200)
  }
  if(req.method == "POST") {
    console.log(req.body)
    let post_title = req.body.post_title;
    let post_con = req.body.post_con;
    let post_author = req.body.name;
    let post_cate = '5';
    let pic_data = req.body.pic_data[0] || '';
    // 获取当前时间戳(以s为单位)
    let timestamp = Date.parse(new Date());
    let time = timestamp / 1000;
    console.log(time)

    var sql  = `INSERT INTO post(post_title,post_con,post_time,post_cate,post_author) VALUES ('${post_title}','${post_con}', '${time}','${post_cate}', '${post_author}')`
    
    

    var promise = new Promise((resolve,reject) => {
      connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        // console.log(results)
        resolve(results.insertId)
      });
    });
    
    promise.then((id) => {
      let pic_name = '';
      if(pic_data.file_name != 'undefined'){
        pic_name = pic_data.file_name;
      }
      var sql1 = `INSERT INTO post_pic(pic_filename, pic_id) VALUES ('${pic_name}','${id}')`

      connection.query(sql1, (error, results, fields) => {
        if (error) throw error;
        console.log(results)
        res.json({msg: "保存成功"});
      });
    });
    
  }
 
});



module.exports = router;