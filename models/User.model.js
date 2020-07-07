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
    Indonesia: {
        type: Boolean
    },
    Africa: {
        type: Boolean
    }
})

// UserSchema.pre('save', async function (next) {
//     var user = this;
//     if (!user.isModified('Password')) return next();
//     await bcrypt.genSalt(12, function (err, salt) {
//         if (err) return next(err);
//         bcrypt.hash(user.Password, salt, function (err, hash) {
//             if (err) return next(err);
//             user.Password = hash;
//             next(user);
//         })
//     })
// })
UserSchema.pre('save',async function(next){
    const user=this
    
   if(user.isModified('Password')){
       user.Password= await bcrypt.hash(user.Password , 8)
   }

    next()
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.Password, function (err, isMatch) {
        if (err) return err;
        cb(null, isMatch);
    })
}

module.exports = mongoose.model('users list', UserSchema)