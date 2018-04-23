var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tonimrga:bela6788@ds155299.mlab.com:55299/notes');

module.exports = {mongoose};
