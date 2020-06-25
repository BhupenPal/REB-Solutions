const Router = require('express').Router()

const { 
    getHome,
    getAbout
} = require('../controllers/Home.controller')

const { 
    ensureAuthenticated,
    forwardAuthenticated
} = require('../controllers/services/Helper')

Router.get('/', getHome)
Router.get('/about-us', getAbout)

module.exports = Router