//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');              //isti kod kao i gore samo se koristi destructuring objekta


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if(err){
        return console.log('Unable to connect to db');
    }
    console.log("Connected to MongoDB!");

        db.collection('Todos').find({
          _id: new ObjectID('5ad8882f96c8d7a6d9bdb626')

        }).toArray().then((docs) => {
              console.log('Todos');
              console.log(JSON.stringify(docs, undefined, 2));
        }, (err) =>{
            console.log('unable to fetch todos', err);
                    });



      db.collection('Todos').find({

      }).count().then((count) => {
          console.log('Todos count:');
          console.log(count);
          }, (err) =>{
          console.log('unable to fetch todos', err);
          });


          db.collection('Users').find({
            name: "Toni"

          }).toArray().then((docs) => {
                console.log('Tonis');
                console.log(JSON.stringify(docs, undefined, 2));
          }, (err) =>{
              console.log('unable to fetch Tonis', err);
                      });

    //db.close();
});
