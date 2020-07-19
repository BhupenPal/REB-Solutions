const mongoose = require('mongoose')

const JoinRequests = mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Countries: [{
        type: String,
        required: true
    }]
})

module.exports = mongoose.model('Joining Requests', JoinRequests)