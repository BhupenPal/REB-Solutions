const mongoose = require('mongoose')

const CompanySchema = mongoose.Schema({
    AgentName: String,
    CompanyName: String,
    Website: String,
    Industry: String,
    OfficeNum: String,
    CorporateEmail: String,
    Country: String,
    City: String,
    Turnover: String,
    Contact: String,
    Designation: String,
    Phone: String,
    Email: String
})

module.exports = mongoose.model('companies list', CompanySchema)