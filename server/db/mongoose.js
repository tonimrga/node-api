//u ovoj datoteci se radi spajanje na bazu

//import moongoose modula
var mongoose = require('mongoose');

//postavljanje mongoose promises da zna da radimo sa promises od javascripta(es6)
mongoose.Promise = global.Promise;

//spajanje na bazu
mongoose.connect('mongodb://tonimrga:bela6788@ds155299.mlab.com:55299/notes');

//export mongoose objekta
module.exports = {mongoose};
