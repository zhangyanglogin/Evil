var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/evil');

module.exports = mongoose;