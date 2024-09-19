const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()

app.use(express.json())

app.get("/", (req, res) =>{
    res.send("Hello World")
} )

const userRouter = require('./routes/userActions')
const userData = require("./routes/userData")
const equations = require("./routes/equations")
const userStats = require("./routes/userStats")
app.use("/user", userRouter)
app.use("/data", userData)
app.use("/equations", equations)
app.use("/userStats", userStats)



mongoose.connect(process.env.MONGO_URI).then( () =>{

    console.log("Connected to MongoDB")

    app.listen(process.env.PORT, (req, res) =>{console.log("Listening on Port " + process.env.PORT )})}
    
).catch((error) =>{console.log(error)})


