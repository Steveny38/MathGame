require("../Schemas/registerSchema")
const mongoose = require("mongoose")
require("dotenv").config()
const express = require('express')
const router = express.Router()
const User = mongoose.model("UserInfo")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




router.get('/register' , (req, res) =>{
    res.send("Reigster Page")
})

 

router.post("/register", async (req, res) =>{
   

    const {username, email, password} = req.body

    const oldEmail = await User.findOne({email:email})
    const oldUser = await User.findOne({username: username})

    if(oldUser){
        return res.status(400).send({message: "An account with that username already exists"})
    }
   

    const encryptPassword = await bcrypt.hash(password, 10)

    try{
        await User.create({
            username,
            email,
            password: encryptPassword,
        })

        const newUser = await User.findOne({username: username})

        const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET_TOKEN,{expiresIn: '7d'})

        return res.status(200).send({email: email, token: token})

    } catch(error){
       return res.status(400).send({error:error})
    }
})


router.post("/login-user", async (req, res) =>{

    const {username, password} = req.body

    const oldUser = await User.findOne({username: username}) 

 
    if(!oldUser){
        return res.status(404).send({error:"User does not exist"})
    }

    if(await bcrypt.compare(password, oldUser.password) ){
        const token = jwt.sign({_id: oldUser._id}, process.env.JWT_SECRET_TOKEN,  {expiresIn: "7d"})

        if(res.status(201)){
            return res.status(200).send({email:oldUser.email, token: token})
        } else {
            return res.send({error:"error"})
        }
    }

})



module.exports = router