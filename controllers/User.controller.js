const Router = require('express').Router()

const { ensureAuthenticated, forwardAuthenticated } = require('./services/Helper')

Router.get('/login', forwardAuthenticated, (req, res, next) => {
    res.render('Login')
})

Router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: req.session.redirectTo || "/",
        failureRedirect: "/users/login",
        failureFlash: true,
    })(req, res, next);
})

Router.post('/dashboard', (req, res, next) => {
    res.render('Dashboard')
})

module.exports = Router