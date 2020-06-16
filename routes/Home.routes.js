const Router = require('express').Router()
const { getHome } = require('../controllers/Home.controller')

Router.get('/', getHome)

module.exports = Router