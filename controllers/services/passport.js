const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../../models/User.model')

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'Email', passwordField: 'Password' }, (Email, Password, done) => {
      // Match user
      UserModel.findOne({ Email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Email is not registered' })
          }

          user.comparePassword(Password, function (err, isMatch) {
            if (err) throw err
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Password incorrect' })
            }
          })
        })
    })
  )

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
      user.Password = null
      done(err, user)
    })
  })
}
