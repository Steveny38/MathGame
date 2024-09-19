require("../Schemas/userStatisticsSchema")
const mongoose = require("mongoose")
require("dotenv").config()
const express = require("express")
const router = express.Router()
const userStats = mongoose.model("UserStatistics")
const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth)


router.get("/get",async (req, res) => {
        
    try {
        const {_id} = req._id;
        const stats = await userStats.findById(_id);
        
        res.status(200).send(stats)

    } catch (error) {
        res.status(400).send({error: error.message})
    }

} )

router.get("/setup", async (req, res) => {
    try {
        const {_id} = req._id
        const {username} = req.username
        const {email} = req.email

        await userStats.create({
            _id, username, email,
            easyGames: 0,
            medGames : 0,
            hardGames: 0,
            skipsUsed: 0,
            maxStreak: 0,
            points: 0,
            numCorrect: 0,
            numIncorrect: 0,
            recentGame: null
        })

        return res.status(200).send("Created Stats")

    } catch (error) {
        return res.status(400).send({"error": error})
    }
})

router.post("/gameEnd", async (req, res) =>{
    try {
        const {_id} = req._id
        const {points, streak, incorrect, correct,difficulty, skips, recentGame} = req.body

        switch (difficulty) {
            case "Easy":
                await userStats.findByIdAndUpdate(_id, {
                    $inc:{
                        points: points, skipsUsed: skips, numIncorrect: incorrect, easyGames: 1, numCorrect:correct
                    },
                    $set: {
                        recentGame: recentGame
                    }
        
                } )
                break;
            case "Medium":
                  await userStats.findByIdAndUpdate(_id, {
            $inc:{
                points: points, skipsUsed: skips, numIncorrect: incorrect, medGames: 1, numCorrect: correct
            },
            $set: {
                recentGame: recentGame
            }

        } )
                break;
            case "Hard":
                  await userStats.findByIdAndUpdate(_id, {
            $inc:{
                points: points, skipsUsed: skips, numIncorrect: incorrect, hardGames: 1, numCorrect: correct
            },
            $set: {
                recentGame: recentGame
            }

        } )
            default:
                break;
        }

        const user = await userStats.findById(_id)

        if(user.maxStreak < streak){
            await userStats.findByIdAndUpdate(_id, {maxStreak: streak})
        }



      
        
            
         return res.status(200).send("Updated")
        
    } catch (error) {
        return res.send({"message": error})
    }




})

module.exports = router