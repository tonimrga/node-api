//Import modula sa NPM-a
var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');

//Import naših modula
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

//import ObjectID modula iz mongusa koji nam omogućuje manipuliranje idom
const {ObjectID} = require('mongodb');

//nova aplikacija u expressu
var app = express();

//definiranje porta na kojem će se server vrtit, lokalno je to 3000
const port = process.env.PORT || 3000;

//govori expressu da body HTTP requesta parsira u JSON
app.use(bodyParser.json());

//Route za stvaranje to-do stavki
app.post('/todos', authenticate, (req,res)=>{
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

//Route za pregled svih to-do stavki
app.get('/todos', authenticate, (req, res)=>{
    Todo.find({_creator:req.user._id}).then((todos) =>{
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

//Route za pregled samo jedne to-do stavke
app.get('/todos/:id', authenticate, (req, res)=>{

//dohvaćanje id-a iz URL-a
    var id = req.params.id;

//provjeravanje ako je taj dohvaćeni ID validni, ako nije vraća se korisniku 404
    if(!ObjectID.isValid(id)) {
    return res.status(404).send();
    }

//Dohvaćanje to-do stavke po id-u i ispis ako postoji
    Todo.findOne({
      _id:id,
      _creator: req.user._id
    }).then((todo)=>{
      if(!todo){
        return res.status(404).send();
      }
        res.send({todo});
    }).catch((e)=>res.status(400).send());
});

//Route za brisanje stavki po id-u
app.delete('/todos/:id', authenticate, (req, res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
  return res.status(404).send();
  }
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }
  ).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
      res.send({todo});
  }).catch((e)=>res.status(400).send());
});

//Route za ažuriranje stavki po idu
app.patch('/todos/:id', authenticate, (req, res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
  return res.status(404).send();
  }
//provjerava ako je polje completed boolean i ako je true, ako je onda postavlja polje completedAt na trenutni timestamp
  if(_.isBoolean(body.completed) && body.completed){
      body.completedAt = new Date().getTime();
  }else{
      body.completed = false;
      body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {
    $set: body
    // ovo new znaci da ce na kraju vratiti novi ažurirani objekt, a ne onaj stari
  }, {new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{res.status(400).send();
})
});

//ROUTE ZA STVARANJE NOVOG USERA
app.post('/users', (req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
      res.header('x-auth', token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })
  });

  //ROUTE ZA STVARANJE NOVOG USERA
  app.post('/users/login', (req,res)=>{
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
              res.header('x-auth', token).send(user);
        })
    }).catch((e)=>{
        res.status(400).send();
    });
    });

    app.delete('/users/me/token', authenticate, (req,res)=>{

        req.user.removeToken(req.token).then(()=>{
          res.status(200).send();
        }, () => {
          res.status(400).send();
        });

    });



  app.get('/users/me', authenticate, (req, res)=>{
    res.send(req.user);
  });

//pokreće server i sluša ga na portu koji je definiran gore
app.listen(port, () =>{
  console.log(`server started at port ${port}`);
});

//export app objekta da se može koristiti u drugim modulima
module.exports = {app};
