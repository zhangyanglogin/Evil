var express = require('express');
var router = express.Router();
var User = require('../entity/user');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/submit', function (req, res, next) {
  var telephone = req.body.telephone;
  var password = req.body.password;
  if (telephone && password) {
    User.find({ 'telephone': telephone }, function (err, users) {
      if (err) return res.json({ "flag": false, "msg": err });

      if (users.length == 1) {
        var md5Pwd = crypto.createHash('md5').update(telephone + '@' + password, "utf8").digest('hex');
        if (md5Pwd == users[0].password) {
          var context={
            id:users[0]._id,
            telephone:users[0].telephone,
            project_id:"1"
          };
          req.session.user=context;
          res.json({ "flag": true });
        }
        else {
          res.json({ "flag": false, "msg": "用户名或密码错误" });
        }
      }
      else {
        res.json({ "flag": false, "msg": "用户不存在" });
      }
    });
  }
  else {
    res.json({ "flag": false, "msg": "用户名或密码不能为空" });
  }
});

router.get('/logout', function (req, res, next) {
  delete req.session.user;
  res.redirect('/login');
});

module.exports = router;
