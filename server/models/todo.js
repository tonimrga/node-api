//import mongoose modula
var mongoose = require('mongoose');

//stvaranje modela u mongoosu
var Todo = mongoose.model('Todo', {
    text: {
       type: String,
       required: true,
       minlength: 1,
       trim: true
    },
    completed:{
       type: Boolean,
       default: false
    },
    completedAt:{
       type: Number,
       default: null
    }
});

//export objekta todo koji sadržava mongoose model
module.exports = {Todo};
