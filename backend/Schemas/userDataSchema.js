const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserDataSchema = new Schema(
    {   
        _id: {type: String, required: true},
        username: {type: String},
        email: {type: String},
        age: {type: Number},

    },
    {collection: "User Data"}


)

module.exports = mongoose.model( "User Data", UserDataSchema)

