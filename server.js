const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use('/', express.static('assets'))

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/REBSolutions', {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1,
  useFindAndModify: !1
})

const passport = require('passport')
require('./controllers/services/passport')(passport)

const session = require("express-session")
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
  })
)

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  if (req.isAuthenticated) {
    res.locals.user = req.user || null;
  }
  next();
});

app.use("/", require("./routes/Home.routes"));
app.use("/users", require('./routes/User.routes'));

app.use((req, res, next) => {
    const err = new Error("Error 404! Not Found!");
    err.status = 404;
    next(err);
})
  
app.use((err, req, res, next) => {
    const ErrorCode = err.status;
    const ErrorMsg = err.message;
    res.render('ErrorPage', { ErrorCode, ErrorMsg })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`REB Soultions has started on PORT: ${PORT}`))