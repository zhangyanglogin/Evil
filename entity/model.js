var db = require('../common/db');

var Model = db.model(
    'model',
    {
        name: String,
        project_id:String,
        property:[]
    }
);

module.exports = Model;