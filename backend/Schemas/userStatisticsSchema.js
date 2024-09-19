const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userStatisticsSchema = new Schema(

    {
        _id: {type: String, required: true},
        username: {type:String},
        email: {type: String},
        easyGames: {type:Number},
        medGames: {type:Number},
        hardGames: {type:Number},
        skipsUsed: {type:Number},
        maxStreak: {type:Number},
        points: {type: Number},
        numCorrect: {type: Number},
        numIncorrect: {type: Number},
        recentGame:{ type: Object}
        

    },{collection: "UserStatistics"}


)

module.exports = mongoose.model("UserStatistics", userStatisticsSchema)