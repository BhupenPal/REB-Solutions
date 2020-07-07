const Router = require('express').Router()
const { getLogin } = require('../controllers/Login.controller')

Router.get('/login', getLogin)

module.exports = Router