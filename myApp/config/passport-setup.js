const passport = require ('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')


//saving user object in the session 
passport.use('local.register',new localStrategy({
    usernameField: 'username',
    passwordField: 'passowrd',
    passReqToCallback : true
},(req,username,passowrd,done)=>{
    console.log(req.body)

}))
