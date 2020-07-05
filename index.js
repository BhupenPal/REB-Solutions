const express=require('express')
require('./db/mongoose')
const userRouter= require('./routes/user')
const User = require('./models/user')

const app=express()


app.use(express.json())
app.use(userRouter)



const port=process.env.PORT || 3000

app.listen(port , ()=> {
    console.log(`Server started on port ${port}`)
})

