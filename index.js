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

const passport = require('passport')
require('./controllers/services/passport')(passport);

const session = require("express-session");
app.use(session({
    secret: process.env.SESSION_SECRET || 'A-REALLY-BIG-SECRET',
    resave: true,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    res.locals.session = req.session;
    next();
});

app.use('/', require('./controllers/Home.controller'))
app.use('/user/', require('./controllers/User.controller'))

const Port = process.env.PORT || 3000
app.listen(Port, console.log(`Server started on port ${Port}`))