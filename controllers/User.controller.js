const Router = require('express').Router()
const passport = require('passport')

const { ensureAuthenticated, forwardAuthenticated } = require('./services/Helper')

Router.get('/login', forwardAuthenticated, (req, res, next) => {
    res.render('Login')
})

Router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: req.session.redirectTo || "/",
        failureRedirect: "/user/login",
        failureFlash: true,
    })(req, res, next); 
})

Router.get('/dashboard', (req, res, next) => {
    res.render('Dashboard')
})

module.exports = Router