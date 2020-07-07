const Router = require('express').Router()

Router.get('/', (req, res, next) => {
    res.render("Home")
})

Router.get('/about-us', (req, res, next) => {
    res.render("About")
})

module.exports = Router