var express = require('express');
var fs = require ('fs');
var path = require('path');
var app = express();
const mongoose = require('mongoose')
const User = require('./models/user')
const Cart = require('./models/cart')
const db1 = require ('./config/keys').MongoURI;
const passport = require('passport');
var currentUser ;
// data base of the items 
var items=(JSON.parse(fs.readFileSync("items.json")));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',function(req,res){
  res.render('login',{loginfailed:""})
})

//CONNECT TO DB
mongoose.connect(db1,{ useNewUrlParser: true, useUnifiedTopology: true }).then(console.log('Mongo DB connected'))
var db = mongoose.connection;


app.get('/boxing',function(req,res){
  res.render('boxing',{message4:""});
});
app.post('/boxing',function(req,res){
  const query = { username: currentUser};
  const updateDocument = {
  $push: { items: "Boxing Bag" }
  };
  const result =Cart.updateOne(query, updateDocument, function(err, res){
    if(err)
    console.log('err')
    else {
      console.log('Cart updated')
    }
  });
  res.render('boxing',{message4:'Added to Cart Succesfully'})
});
app.get('/home',function(req,res){
  res.render('home')
});
app.get('/books',function(req,res){
  res.render('books')
});
app.get('/cart',function(req,res){
  db.collection("carts").find({username:currentUser}).toArray(function(err,result){
    if (err)throw err;
    res.render('cart',{cartitems:result[0].items})
  })
});
app.get('/galaxy',function(req,res){
  res.render('galaxy',{message4:""})
});
app.post('/galaxy',function(req,res){
  const query = { username: currentUser};
  const updateDocument = {
  $push: { items: "Galaxy S21 Ultra" }
  };
  const result =Cart.updateOne(query, updateDocument, function(err, res){
    if(err)
    console.log('err')
    else {
      console.log('Cart Updated')
    }
  });
  res.render('galaxy',{message4:'Added to Cart Succesfully'})
});
app.get('/iphone',function(req,res){
  res.render('iphone',{message4:""})
});
app.post('/iphone',function(req,res){
  const query = { username: currentUser};
  const updateDocument = {
  $push: { items: "iPhone 13 Pro" }
  };
  const result =Cart.updateOne(query, updateDocument, function(err, res){
    if(err)
    console.log('err')
    else {
      console.log('Cart Updated')
    }
  });
  res.render('iphone',{message4:'Added to Cart Succesfully'})
});
app.get('/leaves',function(req,res){
  res.render('leaves',{message4:""})
});
app.post('/leaves',function(req,res){
  const query = { username: currentUser};
  const updateDocument = {
  $push: { items: "Leaves of Grass" }
  };
  const result =Cart.updateOne(query, updateDocument, function(err, res){
    if(err)
    console.log('err')
    else {
      console.log('Cart Updated')
    }
  });
  res.render('leaves',{message4:'Added to Cart Succesfully'})
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
        const newCart = new Cart({
          username :username,
          items :[]
        })
        newUser.save().then(console.log('User added'));
        newCart.save().then(console.log('cart added'))
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
  res.render('sun',{message4:""})
});
app.post('/sun',function(req,res){
  const query = { username: currentUser};
  const updateDocument = {
  $push: { items: "The sun and her flowers" }
  };
  const result =Cart.updateOne(query, updateDocument, function(err, res){
    if(err)
    console.log('err')
    else {
      console.log('Cart Updated')
    }
  });
  res.render('sun',{message4:'Added to Cart Succesfully'})
});
app.get('/tennis',function(req,res){
  res.render('tennis',{message4:''})
});
app.post('/tennis',function(req,res){
  const query = { username: currentUser};
  const updateDocument = {
  $push: { items: "Tennis Racket" }
  };
  const result =Cart.updateOne(query, updateDocument, function(err, res){
    if(err)
    console.log('err')
    else {
      console.log('Cart Updated')
    }
  });
  res.render('tennis',{message4:'Added to Cart Succesfully'})
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
          currentUser = user.username;
          res.redirect('/home');        }
        else{
          res.render('login',{loginfailed:"loginfailed : incorrect username or password"});

        }
    });
  }
});

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