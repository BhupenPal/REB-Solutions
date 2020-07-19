const Router = require('express').Router()
const { ensureAuthenticated } = require('./services/Helper')
const UserModel = require('../models/User.model')
const CompanyModel = require('../models/Company.model')

Router.get('/', (req, res, next) => {
    res.render("Home")
})

Router.get('/join-us', (req, res, next) => {
    res.send('Join Us')
})

Router.get('/search', (req, res, next) => {
    res.render('Search', { data: null })
})

Router.post('/search', ensureAuthenticated, async (req, res) => {
    const { country, city } = req.body;
    const hasCountry = await UserModel.findOne({ [country]: true })
    if (hasCountry) {
        await CompanyModel.find({ Location: city }, (err, data) => {
            res.render('Search', { data })
        })
    } else {
        res.send(`Subscribe to get the data of ${country}`)
    }
})

module.exports = Router