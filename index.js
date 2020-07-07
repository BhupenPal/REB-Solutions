const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use('/assets', express.static('assets'))

require('./config/database')()

require('dotenv').config({
    path: './config/.env'
})

const adminRouter = require('./controllers/Admin.controller')
app.use('/admin', adminRouter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const passport = require('passport')
require('./controllers/services/passport')(passport);

const session = require("express-session");
app.use(session({
    secret: process.env.SESSION_SECRET || 'A-REALLY-BIG-SECRET',
    resave: true,
    saveUninitialized: false
}))

const flash = require("connect-flash");
app.use(flash());

//Global variables for connect-flash
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})


app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    res.locals.session = req.session;
    next();
})

app.use('/', require('./controllers/Home.controller'))
app.use('/user/', require('./controllers/User.controller'))

const Port = process.env.PORT || 3000
app.listen(Port, console.log(`Server started on port ${Port}`))