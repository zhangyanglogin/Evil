var mongoose = require('mongoose');

module.exports = {
    ObjectId:function(v){
        if (v) {
            return mongoose.Types.ObjectId(v)
        }
        else {
            return mongoose.Types.ObjectId()
        }
    }
};