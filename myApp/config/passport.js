const LocalStrategy = require('passport-local').Strategy;
// Load User model
const User = require('../models/user');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (password, done) => {
      // Match user
      User.findOne({
        username:username
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That username is not registered' });
        }
        if(user.password===password){
            return done(null,user)
        }
        else{
            return done(null, false, { message: 'Password incorrect' });
        }

        /*// Match password
        compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });*/
      });
    })
  );

  /*passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });*/
};