const mongoose = require('mongoose')

const CompanySchema = mongoose.Schema({
   Agent : String,
   CompanyName : String,
   Website : String ,
   Industry : String,
   OfficeNum : String,
   Location : String,
   Employees : String,
   Turnover : String,
   ContactName : String,
   Designation : String,
   MobileNum : String,
   Email: String,
   CorporateEmail : String,
   OfficeMail : String
})

module.exports = mongoose.model('companies lists', CompanySchema)