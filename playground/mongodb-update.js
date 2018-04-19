//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');              //isti kod kao i gore samo se koristi destructuring objekta


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if(err){
        return console.log('Unable to connect to db');
    }
    console.log("Connected to MongoDB!");

    db.collection('Todos').findOneAndUpdate({
      _id: new ObjectID('5ad8882f96c8d7a6d9bdb626')
    }, {
      $set:{
        completed: false
      }
    },{
      returnOriginal: false
    }).then((result)=>
  {
    console.log(result);
  });


  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5ad862a81c65841803c98e02')
  }, {
    $set:{
      name: 'Toni'
    },
     $inc : { "age" : 1}
  },{
    returnOriginal: false
  }).then((result)=>
{
  console.log(result);
});

    //db.close();
});
