const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    India: {
        type: Boolean
    },
    USA: {
        type: Boolean
    },
    UK: {
        type: Boolean
    },
    Gulf: {
        type: Boolean
    },
    Singapore: {
        type: Boolean
    },
    Malaysia: {
        type: Boolean
    },
    Indonasia: {
        type: Boolean
    },
    Africa: {
        type: Boolean
    }
})

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('Password')) return next();
    bcrypt.genSalt(12, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.Password = hash;
            next();
        })
    })
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

module.exports = mongoose.model('users list', UserSchema)