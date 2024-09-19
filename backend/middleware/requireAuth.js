const jwt = require("jsonwebtoken")
const User = require("../Schemas/registerSchema")

const requireAuth = async (req, res, next) =>{

    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).send({error: "User not authorized No Auth"})
    }

    const token = authorization.split(" ")[1]

    try {
        
        const {_id} = jwt.verify(token, process.env.JWT_SECRET_TOKEN )

        req._id = await User.findOne(({_id})).select('_id')

        req.username = await User.findOne(({_id})).select('username')
        req.email = await User.findOne(({_id})).select('email')

        next()

    } catch (error) {
        console.log(error)
        res.status(401).send({error: "Request not authorized No 2"})
    }

}

module.exports = requireAuth