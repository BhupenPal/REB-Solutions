var express=require('express');
var abController=require('./controllers/aboutusController');

var app=express();

//set view engine
app.set('view engine','ejs');


//static files
app.use(express.static(__dirname + '/public'));


abController(app);

app.listen(3000);
console.log('Listening now');
