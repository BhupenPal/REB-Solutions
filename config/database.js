const mongoose=require('mongoose')

const connectDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/REBSolutions', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}

module.exports = connectDB;