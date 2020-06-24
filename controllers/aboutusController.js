var bodyParser=require('body-parser');

module.exports=(app => {

app.get('/AboutUS',(req,res)=>{
  res.render('aboutus');


});

});
