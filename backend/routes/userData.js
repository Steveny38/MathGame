require("../Schemas/userDataSchema")
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const userData = mongoose.model("User Data")

const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth)

router.get("/create", async (req, res) =>{

    const {_id} = req._id
    const {username} = req.username
    const {email} = req.email
    
    try {
        await userData.create({_id,username, email, })

        return res.send("Created Data")
    } catch (error) {
        console.log(error)
    }


})

router.get("/", async (req, res)=>{
    const _id = req._id
    

    const data = await userData.findOne(_id)
    
    return res.send(data)

    

})



module.exports = router