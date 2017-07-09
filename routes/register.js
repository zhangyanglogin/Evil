var express = require('express');
var router = express.Router();
var User = require('../entity/user');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('register');
});

router.post('/submit', function (req, res, next) {
  var telephone = req.body.telephone;
  var password = req.body.password;
  if (telephone && password) {
    User.find({ "telephone": telephone }, function (err, users) {
      if (err) {
        res.json({ "flag": false, "msg": err });
      }

      if (users.length == 0) {
        var md5Pwd = crypto.createHash('md5').update(telephone + '@' + password, "utf8").digest('hex');
        var user = new User({ telephone: telephone, password: md5Pwd });
        user.save(function (err, user) {
          if (err) {
            res.json({ "flag": false, "msg": err });
          }

          var context = {
            id:user._id,
            telephone: user.telephone,
            project_id: "1"
          };
          req.session.user = context;

          res.json({ "flag": true });
        });
      } else {
        res.json({ "flag": false, "msg": "手机号已存在" });
      }
    });
  }
  else {
    res.json({ "flag": false, "msg": "手机号或密码格式不正确" });
  }
});

router.post('/checkTelephone', function (req, res, next) {
  var telephone = req.body.telephone;
  User.find({ "telephone": telephone }, function (err, users) {
    if (users.length == 0) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});

module.exports = router;
