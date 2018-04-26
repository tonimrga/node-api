//import mongoose modula
var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var UserSchema = new mongoose.Schema({

  email: {
     type: String,
     required: true,
     minlength: 1,
     trim: true,
     unique: true,
     validate: {
       validator: validator.isEmail,
       message: '{VALUE} is not an email.'
      }
   },

    password: {
      type: String,
      require: true,
      minlength: 4
    },

    tokens: [{

      access : {
        type: String,
        required: true
      },

      token:{
        type: String,
        required: true
      }
    }]

});

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject,['_id', 'email']);
},

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() =>{
    return token;
  });

};

//stvaranje novog modela mongoosea za usera
var User = mongoose.model('User', UserSchema);

//export objekta usera koji u sebi sadrži mongoose model
module.exports = {User};
