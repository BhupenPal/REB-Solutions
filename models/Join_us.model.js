const mongoose = require('mongoose')

const JoinUsSchema = mongoose.Schema({
   FullName : {
       type: String,
       required: true
   },
   ContactNumber : Number,
   Email: String,
   message: String
});

module.exports = mongoose.model('Join Us', JoinUsSchema)