const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const userModel = require('../../models/User.model');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      userModel.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Email is not registered' });
        }

        //Activated User Check
        if(!user.active){
          return done(null, false, {message: 'Please activate your account first' })
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
