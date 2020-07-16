const Router = require('express').Router()
const passport = require('passport')
const companies = require('../models/Company.model')
const User = require('../models/User.model')

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

Router.get('/logout', ensureAuthenticated, (req, res, next) => {
    req.logout()
    req.session.destroy()
    res.redirect('/')
})

Router.post('/search', ensureAuthenticated, async (req, res) => {
    const country = req.body.countrylist
    const city = req.body.citylist
    const hasCountry = await User.findOne({ [country]: true })
    if (hasCountry) {
        const data = await companies.find({ Location: city })
        return res.render('result', { data })
    }
    res.send(`Subscribe to get the data of ${country}`)
})

Router.get('/search', ensureAuthenticated, (req, res, next) => {
    res.render('Search')
})

Router.get('/dashboard', ensureAuthenticated, (req, res, next) => {
    res.render('Dashboard')
})

module.exports = Router