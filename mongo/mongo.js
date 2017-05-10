var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var postSchma = {
  title: String, //标题
  content: String, //内容
  author: String, //作者 -- 用户名
  pv: Number,
  tag: String, // 标签
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
};
var post = mongoose.model('post',postSchma);
var p = new post;

module.exports = {
	post : post,
	p: p
}