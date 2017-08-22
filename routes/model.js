var express = require('express');
var router = express.Router();
var tool = require('../common/tool');
var Model = require('../entity/model');

/* GET home page. */
router.get('/', function (req, res, next) {
  Model.find({ "project_id": req.session.user.project_id }, function (err, models) {
    if (err) {
      res.render('model', { leftList: left, rightList: right });
    }

    res.render('model', { modelList: models});
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

router.post('/addproperty', function (req, res, next) {
  var id = req.body.id;
  var name = req.body.name;
  var type = req.body.type;
  if (id && name && type) {
    Model.findOneAndUpdate({ "_id": id, "project_id": req.session.user.project_id }, {
      $push: { "property": { "id": tool.ObjectId(), "name": name, "type": type } }
    }, function (err, doc) {
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

router.post('/delproperty', function (req, res, next) {
  var modelId = req.body.modelId;
  var propertyId = req.body.propertyId;
  if (modelId && propertyId) {
    Model.findOneAndUpdate({ "_id": modelId, "project_id": req.session.user.project_id }, {
      $pull: { "property": { "id": tool.ObjectId(propertyId) } }
    }, function (err, doc) {
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

router.post('/editproperty', function (req, res, next) {
  var modelId = req.body.modelId;
  var propertyId = req.body.propertyId;
  var name = req.body.name;
  var type = req.body.type;
  if (modelId && propertyId && name && type) {
    Model.findOneAndUpdate({ "_id": modelId, "project_id": req.session.user.project_id,"property.id":tool.ObjectId(propertyId) }, {
      $set: { "property.$.name":name,"property.$.type":type  }
    }, function (err, doc) {
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
