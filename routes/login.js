var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/submit', function (req, res, next) {
  if (req.body.account === 'zhangyang' && req.body.password == '1') {
    req.session.user=req.body;
    res.json({ 'flag': 'true' });
  }
  else {
    res.json(req.body);
  }

});

module.exports = router;
