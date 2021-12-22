var express = require('express');
var fs = require ('fs');
var path = require('path');
var app = express();
const mongoose = require('mongoose')
const User = require('./models/user')
const db = require ('./config/keys').MongoURI;
const passport = require('passport');
//var popup = require('popups');

// data base of the items 
var items=(JSON.parse(fs.readFileSync("items.json")));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',function(req,res){
  res.render('login',{loginfailed:"please enter username and password"})
})

//CONNECT TO DB
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true }).then(console.log('Mongo DB connected'))


app.get('/boxing',function(req,res){
  res.render('boxing')
});
app.get('/home',function(req,res){
  res.render('home')
});
app.get('/books',function(req,res){
  res.render('books')
});
app.get('/cart',function(req,res){
  res.render('cart')
});
app.get('/galaxy',function(req,res){
  res.render('galaxy')
});
app.get('/iphone',function(req,res){
  res.render('iphone')
});
app.get('/leaves',function(req,res){
  res.render('leaves')
});
app.get('/phones',function(req,res){
  res.render('phones')
});
///registration
app.post('/register',(req ,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  let errors = [];

  if (!username || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (errors.length > 0) {
    res.render('registration', {
      errors
    });
  } 
  else {
    User.findOne({username:username}).then(user => {
      if (user) {
        errors.push({ msg: 'username already exists' });
        res.render('registration', {
          errors : errors
        });
      } else {
        const newUser = new User({
          username : username,
          password:password
        });
        newUser.save().then(console.log('User added'));
        res.redirect('/')
      }
    });
  }
});


      
app.get('/registration',function(req,res){
  res.render('registration')
});

//Search field get-post
app.get('/searchresults',function(req,res){
  res.render('searchresults')
});
app.post("/search",function(req,res){
  var searching = (req.body.Search).toLowerCase();
  const searchresult = srch(searching);
  if (searchresult.length===0){
    res.render('searchresults',{searchresult:[], message2:"Item not found"})
  }
  else{
  res.render('searchresults', {searchresult:searchresult, message2 : ""})
}
});


app.get('/sports',function(req,res){
  res.render('sports')
});
app.get('/sun',function(req,res){
  res.render('sun')
});
app.get('/tennis',function(req,res){
  res.render('tennis')
});
app.post("/",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    if(!username &&	!password){
      
      //console.log("please enter username and password");
      res.render('login',{loginfailed:"please enter your username and password"});
    }
    else if (!username){
      //console.log("please enter username");
      res.render('login',{loginfailed:"loginfailed : you have not entered your username"});

    }
    else if(!password){
     //console.log("please enter password");
     res.render('login',{loginfailed:"loginfailed : you have not entered your password"});

    }
    
    else {
      User.findOne({username:username,password:password} , function (err, user) {
        if (user){
          res.redirect('/home');

        }
        else{
          res.render('login',{loginfailed:"loginfailed : incorrect username or password"});

        }
    });
  }
});
    //console.log(req.body);
  

  //function search
  function srch (text) {
    var searchresult = [];
    items.forEach(element => {
      if (element.Itemname.toLowerCase().includes(text)){
        searchresult.push(element);

      }
    })
    return searchresult ;
  }
app.listen(3000);