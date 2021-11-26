var express = require('express');
var fs = require ('fs');
var path = require('path');
var app = express();

// data base of the items 
var items=(JSON.parse(fs.readFileSync("items.json")));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',function(req,res){
  res.render('login')
})



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
app.get('/registration',function(req,res){
  res.render('registration')
});
app.get('/searchresults',function(req,res){
  res.render('searchresults')
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
    var username=req.body.username;
    var password=req.body.password;
    console.log(username);
    console.log(password);
    res.redirect('/home')
  })
app.post("/search",function(req,res){
  var searching = req.body.Search;
  items.forEach(element => {
    if (element.Itemname.toLowerCase.includes(searching)){
      res.redirect('/'+element.itemvalue);
      ///hi

    }
   console.log(element.Itemname);
    
  });  
})

app.listen(3000);

