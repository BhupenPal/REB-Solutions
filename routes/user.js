const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')
const router=new express.Router()


router.post('/users', async (req,res)=> {
    const user=new User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})

    }catch(e){
        res.status(400).send(e)

    }
})


router.post('/users/login' , async (req,res)=> {
    try{
        // console.log('Stopped 0')
        const user=await User.findByCredentials(req.body.email , req.body.password)
        // console.log('Stopped 1')
        const token = await user.generateAuthToken()
        // console.log('stopped 2')
        res.send({user , token})


    }catch(e){
        res.status(400).send({'error' : e})
    }
})

router.post('/users/logout' , auth , async (req,res)=> {
    try{
        req.user.tokens=req.user.tokens.filter((token)=> {
            return req.token !== token.token
        })

        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})


module.exports=router