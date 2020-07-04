const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const validator=require('validator')
const bcrypt=require('bcryptjs')


const userSchema=mongoose.Schema({
    firstname : {
        type : String,
        trim: true,
        required : true
    },
    lastname : {
        type : String,
        trim :  true
    },
    email : {
        type : String,
        required : true,
        unique: true,
        lowercase: true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password : {
        type: String,
        required: true,
        minlength: 6,
        validate(value){
            if(value.includes("password")){
                throw new Error('Password should not contain password string')
            }
        }

    },
    phone : {
        type : Number,
        required : true,
    },

    India : {
        type : Boolean
    },
    Australia : {
        type : Boolean
    },

    tokens : [{
        token  : {
            type: String,
            required : true
        }
    }]




})

userSchema.methods.generateAuthToken = async function(){
    const user= this

   const token = jwt.sign({_id : user._id.toString() }, 'Welcometorebsoluions12345')
user.tokens= user.tokens.concat({token})
await user.save()
return token
}

userSchema.methods.toJSON = function(){
    const user=this

    const userObject= user.toObject()

    delete userObject.password
    delete userObject.tokens
    return userObject
}


userSchema.statics.findByCredentials = async (email,password)=> {
    const user = await User.findOne({email})
    if(!user)
    {
        console.log('error in email')
        throw new Error('Unable to Login')
    }

    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch)
    {
        console.log('error in password')
        throw new Error('Incorrect Password')
    }
    return user
}

userSchema.pre('save' , async function(next){
    const user=this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }
    next()
})

const User=mongoose.model('User' , userSchema)


module.exports=User
