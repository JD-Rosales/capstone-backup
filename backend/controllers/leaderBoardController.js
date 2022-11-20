const User = require('../models/userModel')
const Leaderboard = require('../models/leaderboardModel')

const addLeaderboard = async (req, res) => {
  try {
    const {gameType, difficulty, score, time} = req.body

    const auth = req.user

    await Leaderboard.findOneAndUpdate(
      { "user": auth.id, "gameType": gameType, "difficulty": difficulty },
      {
        user: auth.id,
        gameType: gameType,
        difficulty: difficulty,
        score: score,
        time: time
      },
      {new: true, upsert: true}
    )

    const leaderboards = await Leaderboard.find({"gameType": gameType, "difficulty": difficulty}).populate('user').sort({score: -1, time: -1}).limit(10)

    return res.status(200).json({leaderboards})
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const getLeaderboard = async(req, res) => {
  try {

    const {gameType, difficulty} = req.body

    const leaderboards = await Leaderboard.find({"gameType": gameType, "difficulty": difficulty}).populate('user').sort({score: -1, time: -1}).limit(10)

    return res.status(200).json({leaderboards})
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}


module.exports = {
  addLeaderboard,
  getLeaderboard
}