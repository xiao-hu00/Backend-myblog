module.exports = {
  checkLogin: function(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录'); 
      return res.redirect('/');
    }
    next();
  },

  checkNotLogin: function(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录'); 
      return res.redirect('/manager/list');
    }
    next();
  }
};