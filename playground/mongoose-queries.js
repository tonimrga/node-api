const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

var id ='5ad9ccae1037336412945e52';
if(!ObjectID.isValid(id)) {
  console.log('Id not valid');
}


User.find({
  _id: id
}).then((users)=>{
    console.log('Users: ', users);
});

User.findOne({
  _id: id
}).then((user)=>{
    console.log('User: ', user);
});

User.findById(id).then((user)=>{
  if(!user){
    return console.log('User NOT found');
  }
    console.log('User By Id: ', user);
}).catch((e)=>console.log(e));
