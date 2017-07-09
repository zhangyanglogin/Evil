var express = require('express');
var router = express.Router();
var Model = require('../entity/model');

/* GET home page. */
router.get('/', function (req, res, next) {
  Model.find({ "project_id": req.session.user.project_id }, function (err, models) {
    var left = [];
    var right = [];

    if (err) {
      res.render('model', { leftList: left, rightList: right });
    }

    models.forEach(function (item, index) {
      if (index % 2 == 0) {
        left.push(item);
      }
      else {
        right.push(item);
      }
    });

    res.render('model', { leftList: left, rightList: right });
  });
});

router.post('/postsave', function (req, res, next) {
  var name = req.body.name;
  if (name) {
    Model.find({ "name": name, "project_id": req.session.user.project_id }, function (err, models) {
      if (err) {
        res.json({ "flag": false, "msg": err });
      }

      if (models.length == 0) {
        var model = new Model({ name: name, project_id: req.session.user.project_id });
        model.save(function (err, model) {
          if (err) {
            res.json({ "flag": false, "msg": err });
          }

          res.json({ "flag": true });
        });
      } else {
        res.json({ "flag": false, "msg": "对象已存在" });
      }
    });
  }
  else {
    res.json({ "flag": false, "msg": "对象名称不能为空" });
  }
});

router.post('/postedit', function (req, res, next) {
  var id = req.body.id;
  var name = req.body.name;
  if (id && name) {
    Model.findOneAndUpdate({ "_id": id, "project_id": req.session.user.project_id }, { "name": name }, function (err, doc) {
      if (err) {
        res.json({ "flag": false, "msg": err });
      }

      res.json({ "flag": true });
    });
  }
  else {
    res.json({ "flag": false, "msg": "参数错误" });
  }
});

router.post('/postdelete', function (req, res, next) {
  var id = req.body.id;
  if (id) {
    Model.deleteOne({ "_id": id, "project_id": req.session.user.project_id }, function (err, doc) {
      if (err) {
        res.json({ "flag": false, "msg": err });
      }

      res.json({ "flag": true });
    });
  }
  else {
    res.json({ "flag": false, "msg": "参数错误" });
  }
});

module.exports = router;
