//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');              //isti kod kao i gore samo se koristi destructuring objekta


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if(err){
        return console.log('Unable to connect to db');
    }
    console.log("Connected to MongoDB!");

    /*db.collection('Todos').insertOne({
      text:'Something to do',
      completed:'false'
    }, (error, result)=>{
      if(error){
        return console.log('Unable to insert to do', error);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    });*/

    /*db.collection('Users').insertOne({
      name:'Toni',
      age:'23',
      location:'Rijeka'
    }, (error, result)=>{
      if(error){
        return console.log('Unable to insert user', error);
      }
      console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    });*/

    db.close();
});
