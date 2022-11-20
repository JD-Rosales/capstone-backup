const GameLog = require('../models/gameLogModel')

const getGameLogs = async (req, res) => {
  try {

    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 7);

    const fingerspell = await GameLog.find({ "gameType": "fingerspell", createdAt: {$gte: previousDay}}).count().lean().exec()
    const spellhandsign = await GameLog.find({ "gameType": "spellhandsign", createdAt: {$gte: previousDay}}).count().lean().exec()
    const guesshandsign = await GameLog.find({ "gameType": "guesshandsign", createdAt: {$gte: previousDay}}).count().lean().exec()
    const fourpiconeword = await GameLog.find({ "gameType": "fourpiconeword", createdAt: {$gte: previousDay}}).count().lean().exec()

    const gameLogs = [fingerspell, spellhandsign, guesshandsign, fourpiconeword]
    return res.status(200).json({ gameLogs })
  } catch (error) {
    console.log(error)
    console.log(error);
    return res.status(400).json({message: "An error has occured"})
  }
}

const addGuesshandsignLog = async (req, res) => {
  try {
    const userID = req.user.id
    const gameType = req.body.gameType
    
    if(userID && gameType){
      await GameLog.create({
        user: userID,
        gameType: gameType,
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: "An error has occured"})
  }
}

module.exports = {
  getGameLogs,
  addGuesshandsignLog
}