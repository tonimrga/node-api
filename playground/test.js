var jwt = require('jsonwebtoken');

var userid=212333;
var access = 'auth';
var token = jwt.sign(userid,'abc').toString();
var token2 = jwt.sign({userid, access},'abc').toString();

if(token===token2){
console.log('yes');
}else{
  console.log('no');
}
