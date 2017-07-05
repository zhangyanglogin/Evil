var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.isVisit) {
    req.session.isVisit++;
  } else {
    req.session.isVisit = 1;
  }

  res.render('model', { title: 'model' ,visit:req.session.isVisit});
});

module.exports = router;
