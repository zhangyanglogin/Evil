var db = require('../common/db');

var User = db.model(
    'user',
    {
        telephone: String,
        password:String
    }
);

module.exports = User;