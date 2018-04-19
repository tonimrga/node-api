//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');              //isti kod kao i gore samo se koristi destructuring objekta


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if(err){
        return console.log('Unable to connect to db');
    }
    console.log("Connected to MongoDB!");

    /*
        db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result)=>{
          console.log(result);
        });

        db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=>{
          console.log(result);
        });


        db.collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((result)=>{
            console.log(result);
              });
*/

db.collection('Users').deleteMany({name: 'Toni'}).then((result)=>{
  console.log(result);
});
    //db.close();
});
