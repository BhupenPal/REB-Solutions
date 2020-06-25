const Router = require('express').Router()

const { 
    getLogin,
    postLogin,
    getRegister,
    postRegister
} = require('../controllers/User.controller')

const { 
    ensureAuthenticated,
    forwardAuthenticated
} = require('../controllers/services/Helper')


Router.get('/login', forwardAuthenticated, getLogin)
Router.post('/login', postLogin)
Router.get('/register', forwardAuthenticated, getRegister)
Router.post('/register', postRegister)

module.exports = Router